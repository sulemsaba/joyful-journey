/**
 * FASTAPI BACKEND ENDPOINTS:
 * ──────────────────────────
 * GET    /api/v1/pages                       - List all pages (public, published only)
 * GET    /api/v1/pages/{slug}                - Get single page by slug (public, published only)
 *
 * CACHING: TanStack Query handles caching via persistQueryClient.
 * Hooks use placeholderData from fallbackPublicContent.ts.
 */
import { api } from "@/exxonim/app/apiClient";
import { apiRoutes } from "@/exxonim/shared/api/routes";
import { mapPage } from "@/exxonim/utils/contentMappers";
import type { PageRecord } from '@/exxonim/types';
import type { ApiPage } from "@/exxonim/types/api";

export async function getPageBySlug<TContent = Record<string, unknown>>(slug: string) {
  const response = await api.get<ApiPage<TContent>>(apiRoutes.public.pages.bySlug(slug));
  return mapPage(response.data) as PageRecord<TContent>;
}
