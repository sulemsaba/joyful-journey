/**
 * FASTAPI ENDPOINT DEPENDENCY:
 * ─────────────────────────────
 * GET /api/v1/blog/posts — List blog posts (public, published only)
 *   Query params: page, limit, category, featured_on_home, sort
 *
 * See: src/exxonim/services/blogService.ts for full endpoint documentation.
 */
import { useQuery } from "@tanstack/react-query";
import { getCachedPublicBlogPosts, listPublicBlogPosts } from "@/exxonim/services/blogService";

export function useBlogPosts() {
  return useQuery({
    queryKey: ["blog", "posts"],
    queryFn: listPublicBlogPosts,
    initialData: getCachedPublicBlogPosts,
    refetchOnMount: true,
    refetchOnReconnect: "always",
    staleTime: 1000 * 60 * 60,
  });
}
