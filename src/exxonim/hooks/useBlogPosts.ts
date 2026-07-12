/**
 * CACHE ARCHITECTURE (5-layer):
 * ──────────────────────────────
 * Layer 0: TanStack memory cache (in-memory, instant, same session)
 * Layer 1: persistQueryClient (localStorage, instant, 24h max age)
 * Layer 2: Live API (FastAPI backend, background refetch)
 * Layer 3: /fallback/*.json (same server, webhook-updated)
 * Layer 4: Hardcoded placeholderData (in JS bundle, always available)
 *
 * FLOW ON REFRESH:
 *   1. Service Worker serves cached JS/CSS/images instantly
 *   2. persistQueryClient hydrates from localStorage → render instantly
 *   3. API call fires in background → updates if changed (no flicker)
 *   4. If API fails → /fallback/*.json loads → persists to localStorage
 *   5. If fallback missing → hardcoded placeholderData shows (in JS bundle)
 *
 * This file implements Layers 2-4. See queryClient.ts for Layers 0-1.
 */

/**
 * Blog posts list hook.
 *
 * ARCHITECTURE:
 *   Layer 0: Memory cache (current session)
 *   Layer 1: persistQueryClient (localStorage) - returning visitors see cache instantly
 *   Layer 2: Live API → JSON fallback (if API fails)
 *   Layer 3: Hardcoded fallback (always available, built into JS bundle)
 *
 * FALLBACK GUARANTEE:
 *   Always returns hardcoded fallback as `data` when no real data is available.
 */
import { useQuery } from "@tanstack/react-query";
import { fetchPublicBlogPostsRaw } from "@/exxonim/services/blogService";
import { fetchWithJsonFallback } from "@/exxonim/services/staticFallbackService";
import { mapBlogPost } from "@/exxonim/utils/contentMappers";
import { fallbackBlogPosts } from "@/exxonim/content/fallbackPublicContent";

export function useBlogPosts() {
  const query = useQuery({
    queryKey: ["blog", "posts"],
    // The live API and the Layer-3 snapshot share ONE raw shape
    // ({ items: [...] } from /blog/posts). Map both through mapBlogPost so a
    // populated snapshot is consumed identically to the API — previously only
    // the API path was mapped, so the snapshot silently didn't apply.
    queryFn: async () => {
      const raw = await fetchWithJsonFallback(fetchPublicBlogPostsRaw, "blog-posts");
      const items = Array.isArray(raw) ? raw : raw?.items ?? [];
      return items.map(mapBlogPost);
    },
    placeholderData: fallbackBlogPosts,
    staleTime: 1000 * 30, // 30 seconds — blog updates propagate fast
    retry: 1,
  });

  // FALLBACK GUARANTEE: the API (or JSON fallback) can resolve to an EMPTY
  // list — backend down, unseeded DB, or an empty /fallback/blog-posts.json
  // ({ "data": [] }). An empty array is not nullish, so `?? fallback` does NOT
  // catch it: the hardcoded posts (with covers) flash in, then get wiped by the
  // empty resolve — the covers appear on reload, then disappear. Keep the
  // hardcoded fallback whenever the resolved list has no posts.
  const resolved = query.data;
  const hasPosts = Array.isArray(resolved) && resolved.length > 0;

  return {
    ...query,
    data: hasPosts ? resolved : fallbackBlogPosts,
    isPending: query.isPending && !fallbackBlogPosts.length,
  };
}
