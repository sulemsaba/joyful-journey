/**
 * FASTAPI ENDPOINT DEPENDENCY:
 * ─────────────────────────────
 * GET /api/v1/blog/categories — List blog categories (public)
 *
 * See: src/exxonim/services/blogService.ts for full endpoint documentation.
 */
import { useQuery } from "@tanstack/react-query";
import {
  getCachedPublicBlogCategories,
  listPublicBlogCategories,
} from "@/exxonim/services/blogService";

export function useBlogCategories() {
  return useQuery({
    queryKey: ["blog", "categories"],
    queryFn: listPublicBlogCategories,
    initialData: getCachedPublicBlogCategories,
    refetchOnMount: "always",
    refetchOnReconnect: "always",
    staleTime: 1000 * 60 * 60,
  });
}
