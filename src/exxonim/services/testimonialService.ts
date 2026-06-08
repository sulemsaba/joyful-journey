/**
 * FASTAPI BACKEND ENDPOINTS:
 * ──────────────────────────
 * GET    /api/v1/testimonials              — List all active testimonials (public)
 * GET    /api/v1/testimonials/{id}         — Get single testimonial (public)
 * POST   /api/v1/testimonials              — Create testimonial (admin only)
 * PUT    /api/v1/testimonials/{id}         — Update testimonial (admin only)
 * DELETE /api/v1/testimonials/{id}         — Delete testimonial (admin only)
 * PATCH  /api/v1/testimonials/reorder      — Reorder testimonials (admin only, body: { id, sort_order }[])
 * POST   /api/v1/testimonials/{id}/submit  — Submit for review (admin)
 * POST   /api/v1/testimonials/{id}/approve — Approve testimonial (admin)
 * POST   /api/v1/testimonials/{id}/reject  — Reject testimonial (admin)
 * POST   /api/v1/testimonials/{id}/publish — Publish testimonial (admin)
 * POST   /api/v1/testimonials/{id}/archive — Archive testimonial (admin)
 *
 * PostgreSQL Tables:
 *   testimonials — id, name, role, quote, eyebrow, headline, support, initials,
 *                  avatar_url, sort_order, is_active, status, created_at, updated_at
 *
 * Request Schema (POST/PUT):
 *   { name: str, role: str, quote: str, eyebrow: str | None, headline: str | None,
 *     support: str | None, avatar_url: str | None, sort_order: int, is_active: bool }
 *
 * Response Schema:
 *   { id: int, name: str, role: str, quote: str, eyebrow: str | None, headline: str | None,
 *     support: str | None, initials: str, avatar_url: str | None, sort_order: int,
 *     is_active: bool, status: str, created_at: datetime, updated_at: datetime }
 *
 * Validation Rules (backend-enforced):
 *   - name: required, string, max 50 characters
 *   - role: required, string, max 80 characters
 *   - quote: required, string, max 250 characters (reject, NOT truncate)
 *   - sort_order: integer, default 0
 *   - is_active: boolean, default true
 */
import { api } from "@/exxonim/app/apiClient";
import { apiRoutes } from "@/exxonim/shared/api/routes";
import {
  fetchWithFallback,
  getCachedPublicContent,
} from "@/exxonim/shared/publicContentCache";
import { mapTestimonial } from "@/exxonim/utils/contentMappers";
import type { Testimonial } from '@/exxonim/types';
import type { ApiTestimonial } from "@/exxonim/types/api";
import {
  preloadStaticFallback,
  getStaticFallback,
} from "./staticFallbackService";
import { fallbackTestimonials } from "@/exxonim/content/fallbackPublicContent";

preloadStaticFallback<Testimonial[]>("testimonials");

const TESTIMONIALS_CACHE_KEY = "testimonials";
const TESTIMONIALS_TTL_MS = 1000 * 60 * 60 * 24;

function isTestimonialCollection(value: Testimonial[]) {
  return Array.isArray(value) && value.length > 0;
}

async function fetchFreshTestimonials() {
  const response = await api.get<ApiTestimonial[]>(apiRoutes.public.testimonials.list);
  return response.data.map(mapTestimonial) as Testimonial[];
}

export function getCachedTestimonials() {
  return getCachedPublicContent<Testimonial[]>(
    TESTIMONIALS_CACHE_KEY,
    getStaticFallback<Testimonial[]>("testimonials") ?? fallbackTestimonials
  );
}

export async function getTestimonials() {
  return fetchWithFallback<Testimonial[]>({
    cacheKey: TESTIMONIALS_CACHE_KEY,
    fallbackValue: getStaticFallback<Testimonial[]>("testimonials") ?? fallbackTestimonials,
    fetcher: fetchFreshTestimonials,
    ttlMs: TESTIMONIALS_TTL_MS,
    validate: isTestimonialCollection,
    warningLabel: "Using cached or default testimonials.",
  });
}
