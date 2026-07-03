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
 * Single blog post hook.
 *
 * ARCHITECTURE:
 *   Layer 0: Memory cache (current session)
 *   Layer 1: persistQueryClient (localStorage) - previously viewed posts cached
 *   Layer 2: Live API → JSON fallback (if API fails)
 *   Layer 3: Hardcoded fallback (for known slugs, built into JS bundle)
 *
 * For slugs not in the hardcoded fallback, no fallback data (shows loading state).
 * persistQueryClient ensures previously viewed posts are cached in localStorage.
 *
 * FALLBACK GUARANTEE:
 *   Returns hardcoded fallback as `data` for known slugs when no real data is available.
 */
import { useQuery } from "@tanstack/react-query";
import { getPublicBlogPostBySlug } from "@/exxonim/services/blogService";
import { fetchWithJsonFallback } from "@/exxonim/services/staticFallbackService";
import { fallbackBlogPosts } from "@/exxonim/content/fallbackPublicContent";

function findFallbackBlogPost(slug: string) {
  return fallbackBlogPosts.find((post) => post.slug === slug);
}

export function useBlogPost(slug: string | null) {
  const fallback = slug ? findFallbackBlogPost(slug) : undefined;

  const query = useQuery({
    queryKey: ["blog", "post", slug],
    queryFn: () =>
      fetchWithJsonFallback(
        () => getPublicBlogPostBySlug(slug as string),
        `blog-post-${slug}`
      ),
    enabled: Boolean(slug),
    placeholderData: fallback,
    staleTime: 1000 * 30, // 30 seconds
    retry: (failureCount, error) => {
      const status = (error as { response?: { status?: number } } | null)?.response?.status;
      if (status === 404) return false;
      return failureCount < 2;
    },
  });

  return {
    ...query,
    data: query.data ?? fallback,
    isPending: query.isPending && !fallback,
  };
}
