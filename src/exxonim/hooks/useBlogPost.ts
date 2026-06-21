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
    staleTime: 1000 * 60 * 30,
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
