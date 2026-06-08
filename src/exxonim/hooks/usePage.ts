/**
 * FASTAPI ENDPOINT DEPENDENCY:
 * ─────────────────────────────
 * GET /api/v1/pages/{slug} — Get single page by slug (public, published only)
 *
 * See: src/exxonim/services/pageService.ts for full endpoint documentation.
 */
import { useQuery } from "@tanstack/react-query";
import { getCachedPageBySlug, getPageBySlug } from "@/exxonim/services/pageService";

export function usePage<TContent = Record<string, unknown>>(slug: string) {
  return useQuery({
    queryKey: ["pages", slug],
    queryFn: () => getPageBySlug<TContent>(slug),
    initialData: () => getCachedPageBySlug<TContent>(slug),
    refetchOnMount: true,
    refetchOnReconnect: "always",
    staleTime: 1000 * 60 * 60,
  });
}
