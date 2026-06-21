/**
 * Blog categories hook.
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
import { listPublicBlogCategories } from "@/exxonim/services/blogService";
import { fetchWithJsonFallback } from "@/exxonim/services/staticFallbackService";
import { fallbackBlogCategories } from "@/exxonim/content/fallbackPublicContent";

export function useBlogCategories() {
  const query = useQuery({
    queryKey: ["blog", "categories"],
    queryFn: () => fetchWithJsonFallback(listPublicBlogCategories, "blog-categories"),
    placeholderData: fallbackBlogCategories,
    staleTime: 1000 * 60 * 60,
    retry: 1,
  });

  return {
    ...query,
    data: query.data ?? fallbackBlogCategories,
    isPending: query.isPending && !fallbackBlogCategories.length,
  };
}
