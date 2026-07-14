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

/**
 * Raw (unmapped) fetcher — lets the fallback-aware hook run BOTH the live API
 * response and the Layer-3 snapshot (public/fallback/pages-*.json, same raw
 * shape) through one mapping step. Mapping here instead would leave the
 * snapshot in the API's snake_case shape, silently dropping metaTitle /
 * isPublished / ogImageUrl whenever the backend is unreachable.
 */
export async function fetchPageBySlugRaw<TContent = Record<string, unknown>>(
  slug: string
): Promise<ApiPage<TContent>> {
  const response = await api.get<ApiPage<TContent>>(apiRoutes.public.pages.bySlug(slug));
  return response.data;
}
