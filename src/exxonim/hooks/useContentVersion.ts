/**
 * Content Version Hook — event-driven cache invalidation.
 *
 * Polls the backend /api/v1/content-version endpoint every 30 seconds
 * and compares the returned version against the previously known value.
 *
 * When the version CHANGES (admin published new content), this hook:
 *   1. Invalidates ALL TanStack Query caches → forces refetch on next read
 *   2. Clears the localStorage persisted cache → next page load gets fresh data
 *   3. Stores the new version for future comparison
 *
 * The version is the maximum updated_at timestamp across all content tables
 * (pages, site_settings, blog_posts, faq_items, jobs, packaging_plans, testimonials).
 * Any admin save on any of these tables bumps the version.
 *
 * Combined with the 30s default staleTime, this ensures:
 *   - Active users see changes within 30s (background refetch)
 *   - Users returning after a gap see changes immediately (version mismatch → cache bust)
 *   - API downtime doesn't break the site (5 fallback layers)
 */
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

interface ContentVersionResponse {
  version: string | null;
  tables_checked: string[];
}

let storedVersion: string | null = null;

function fetchContentVersion(): Promise<ContentVersionResponse> {
  return fetch("/api/v1/content-version").then((res) => {
    if (!res.ok) throw new Error("Failed to fetch content version");
    return res.json() as Promise<ContentVersionResponse>;
  });
}

export function useContentVersion() {
  const queryClient = useQueryClient();
  const initialized = useRef(false);

  const query = useQuery({
    queryKey: ["content-version"],
    queryFn: fetchContentVersion,
    // Poll aggressively — 30s matches the default staleTime
    refetchInterval: 1000 * 30,
    // Don't cache this in localStorage — we want fresh version on every load
    gcTime: 0,
    staleTime: 0,
    // Don't retry on failure — just wait for next poll interval
    retry: false,
  });

  const currentVersion = query.data?.version ?? null;

  useEffect(() => {
    if (!query.data?.version) return;

    // First successful fetch — just store the version, no busting needed
    if (!initialized.current) {
      initialized.current = true;
      storedVersion = query.data.version;
      return;
    }

    // Version changed — admin published new content
    if (storedVersion !== null && storedVersion !== currentVersion) {
      // 1. Invalidate ALL queries — triggers background refetch
      queryClient.invalidateQueries();

      // 2. Clear localStorage cache — next page load gets fresh data
      try {
        localStorage.removeItem("exxonim-query-cache");
      } catch {
        // localStorage unavailable — ignore
      }

      // 3. Store the new version
      storedVersion = currentVersion;

      // 4. Force immediate refetch of active queries
      queryClient.refetchQueries({ type: "active" });
    }
  }, [currentVersion, query.data?.version, queryClient]);
}
