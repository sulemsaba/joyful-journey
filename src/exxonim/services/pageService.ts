/**
 * FASTAPI BACKEND ENDPOINTS:
 * ──────────────────────────
 * GET    /api/v1/pages                       — List all pages (public, published only)
 * GET    /api/v1/pages/{slug}                — Get single page by slug (public, published only)
 * POST   /api/v1/pages                       — Create page (admin only)
 * PUT    /api/v1/pages/{id}                  — Update page (admin only)
 * DELETE /api/v1/pages/{id}                  — Delete page (admin only)
 * POST   /api/v1/pages/{id}/submit           — Submit for review (admin)
 * POST   /api/v1/pages/{id}/approve          — Approve page (admin)
 * POST   /api/v1/pages/{id}/reject           — Reject page (admin)
 * POST   /api/v1/pages/{id}/publish          — Publish page (admin)
 * POST   /api/v1/pages/{id}/archive          — Archive page (admin)
 *
 * PostgreSQL Tables:
 *   pages — id, title, slug (UNIQUE), content (JSONB), meta_title, meta_description,
 *           og_image_url, is_published, status, created_at, updated_at
 *
 * Request Schema (POST/PUT):
 *   { title: str, slug: str, content: dict, meta_title: str | None,
 *     meta_description: str | None, og_image_url: str | None }
 *
 * Response Schema:
 *   { id: int, title: str, slug: str, content: dict, meta_title: str | None,
 *     meta_description: str | None, og_image_url: str | None,
 *     is_published: bool, status: str, created_at: datetime, updated_at: datetime }
 */
import { api } from "@/exxonim/app/apiClient";
import { apiRoutes } from "@/exxonim/shared/api/routes";
import {
  fetchWithFallback,
  getCachedPublicContent,
} from "@/exxonim/shared/publicContentCache";
import { mapPage } from "@/exxonim/utils/contentMappers";
import type { PageRecord } from '@/exxonim/types';
import type { ApiPage } from "@/exxonim/types/api";
import {
  preloadStaticFallback,
  getStaticFallback,
} from "./staticFallbackService";
import { getFallbackPage } from "@/exxonim/content/fallbackPublicContent";

preloadStaticFallback<Record<string, unknown>[]>("pages");

const PAGE_TTL_MS = 1000 * 60 * 60 * 6;

function pageCacheKey(slug: string) {
  return `pages:${slug}`;
}

function isPageRecord<TContent>(
  value: PageRecord<TContent> | undefined
): value is PageRecord<TContent> {
  return Boolean(value && typeof value.slug === "string");
}

async function fetchFreshPageBySlug<TContent = Record<string, unknown>>(slug: string) {
  const response = await api.get<ApiPage<TContent>>(apiRoutes.public.pages.bySlug(slug));
  return mapPage(response.data) as PageRecord<TContent>;
}

export function getCachedPageBySlug<TContent = Record<string, unknown>>(slug: string) {
  return getCachedPublicContent<PageRecord<TContent> | undefined>(
    pageCacheKey(slug),
    getStaticFallback<PageRecord<TContent>>("pages") ??
      (getFallbackPage(slug) as PageRecord<TContent> | undefined)
  );
}

export async function getPageBySlug<TContent = Record<string, unknown>>(slug: string) {
  return fetchWithFallback<PageRecord<TContent>>({
    cacheKey: pageCacheKey(slug),
    fallbackValue:
      getStaticFallback<PageRecord<TContent>>("pages") ??
      (getFallbackPage(slug) as PageRecord<TContent> | undefined),
    fetcher: () => fetchFreshPageBySlug<TContent>(slug),
    ttlMs: PAGE_TTL_MS,
    validate: isPageRecord,
    warningLabel: `Using cached or default page content for "${slug}".`,
  });
}
