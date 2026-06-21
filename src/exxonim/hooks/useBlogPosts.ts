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
import { listPublicBlogPosts } from "@/exxonim/services/blogService";
import { fetchWithJsonFallback } from "@/exxonim/services/staticFallbackService";
import { fallbackBlogPosts } from "@/exxonim/content/fallbackPublicContent";

export function useBlogPosts() {
  const query = useQuery({
    queryKey: ["blog", "posts"],
    queryFn: () => fetchWithJsonFallback(listPublicBlogPosts, "blog-posts"),
    placeholderData: fallbackBlogPosts,
    staleTime: 1000 * 60 * 60,
    retry: 1,
  });

  return {
    ...query,
    data: query.data ?? fallbackBlogPosts,
    isPending: query.isPending && !fallbackBlogPosts.length,
  };
}
