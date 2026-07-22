/**
 * CACHE ARCHITECTURE (5-layer):
 * ──────────────────────────────
 * Layer 0: TanStack memory cache (in-memory, instant, same session)
 * Layer 1: persistQueryClient (localStorage, instant, 24h max age)
 * Layer 2: Live API (FastAPI backend, background refetch)
 * Layer 3: /snapshot/{domain}/{key}.json (backend-generated on every admin save)
 * Layer 4: Hardcoded placeholderData (in JS bundle, always available)
 *
 * FLOW ON REFRESH:
 *   1. Service Worker serves cached JS/CSS/images instantly
 *   2. persistQueryClient hydrates from localStorage → render instantly
 *   3. API call fires in background → updates if changed (no flicker)
 *   4. If API fails → /snapshot/{domain}/{key}.json loads → persists to localStorage
 *   5. If snapshot missing → component falls back to hardcoded defaults
 *
 * This file implements Layer 3. See queryClient.ts for Layers 0-1.
 */

/* ── Legacy JSON fallback (/fallback/{key}.json) ─────────────── */

/**
 * Load a static fallback JSON file from /fallback/{key}.json.
 * Used internally by fetchWithJsonFallback. Kept for hooks that have
 * not yet migrated to the public snapshot architecture.
 */
async function loadStaticFallback<T>(
  key: string,
  timeoutMs = 800
): Promise<T | undefined> {
  const cache = new Map<string, unknown>();
  if (cache.has(key)) {
    return cache.get(key) as T;
  }

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const response = await fetch(`/fallback/${key}.json`, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });
    clearTimeout(timer);

    if (!response.ok) return undefined;

    const raw = (await response.json()) as {
      _meta?: { generatedAt?: string; source?: string };
      data?: T;
    } | T;

    const data =
      raw && typeof raw === "object" && "data" in raw && "_meta" in raw
        ? (raw as { data: T }).data
        : (raw as T);

    cache.set(key, data);
    return data;
  } catch {
    return undefined;
  }
}

export async function fetchWithJsonFallback<T>(
  apiFn: () => Promise<T>,
  fallbackKey: string
): Promise<T> {
  try {
    return await apiFn();
  } catch {
    const raw = await loadStaticFallback<T>(fallbackKey);
    if (raw !== undefined) return raw;
    throw new Error(`API and JSON fallback both failed for: ${fallbackKey}`);
  }
}

/* ── Public snapshot fallback (new architecture) ────────────── */

const snapshotCaches = new Map<string, Map<string, unknown>>();

/**
 * Load a public snapshot from /snapshot/{domain}/{key}.json.
 * Snapshots are written by the backend to public/snapshot/{domain}/
 * every time an admin save mutates the data.
 */
async function loadPublicSnapshot<T>(
  domain: string,
  key: string,
  timeoutMs = 800
): Promise<T | undefined> {
  const cacheKey = `${domain}/${key}`;
  const domainCache = snapshotCaches.get(domain) ?? new Map<string, unknown>();
  snapshotCaches.set(domain, domainCache);

  if (domainCache.has(key)) {
    return domainCache.get(key) as T;
  }

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const response = await fetch(`/snapshot/${domain}/${key}.json`, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });
    clearTimeout(timer);

    if (!response.ok) return undefined;

    const raw = (await response.json()) as {
      _meta?: { generatedAt?: string; source?: string };
      data?: T;
    } | T;

    // Support both envelope format ({ _meta, data }) and raw format
    const data =
      raw && typeof raw === "object" && "data" in raw && "_meta" in raw
        ? (raw as { data: T }).data
        : (raw as T);

    domainCache.set(key, data);
    return data;
  } catch {
    return undefined;
  }
}

/**
 * Fetch with public snapshot fallback — the new base for all public content.
 *
 * Tries the live API first. If the API fails, falls back to the
 * snapshot at /snapshot/{domain}/{key}.json. If both fail, throws.
 *
 * Snapshots are written by the backend whenever the corresponding admin
 * mutation succeeds (publish, update, delete, etc.). They are auto-cleaned
 * for domain types that have per-item slugs (blog post slugs).
 *
 * @example
 * ```ts
 * // Blog
 * queryFn: () => fetchWithPublicSnapshotFallback(
 *   () => fetchPublicBlogPostsRaw(),
 *   "blog", "blog-posts"
 * ),
 *
 * // Testimonials
 * queryFn: () => fetchWithPublicSnapshotFallback(
 *   () => fetchTestimonialsRaw(),
 *   "testimonials", "testimonials"
 * ),
 * ```
 */
export async function fetchWithPublicSnapshotFallback<T>(
  apiFn: () => Promise<T>,
  domain: string,
  snapshotKey: string
): Promise<T> {
  try {
    return await apiFn();
  } catch {
    const snapshot = await loadPublicSnapshot<T>(domain, snapshotKey);
    if (snapshot !== undefined) return snapshot;
    throw new Error(
      `API and ${domain}/${snapshotKey} snapshot both failed`
    );
  }
}

/* ── Blog specialization (backward compat) ─────────────────── */

/**
 * @deprecated Use fetchWithPublicSnapshotFallback(apiFn, "blog", key) instead.
 * Kept for gradual migration of blog hooks.
 */
export async function fetchWithBlogSnapshotFallback<T>(
  apiFn: () => Promise<T>,
  snapshotKey: string
): Promise<T> {
  return fetchWithPublicSnapshotFallback(apiFn, "blog", snapshotKey);
}

/**
 * @deprecated Use loadPublicSnapshot(domain, key) instead.
 * Kept for backward compatibility.
 */
export async function loadBlogSnapshot<T>(
  key: string,
  timeoutMs = 800
): Promise<T | undefined> {
  return loadPublicSnapshot<T>("blog", key, timeoutMs);
}
