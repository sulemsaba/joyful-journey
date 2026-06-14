/**
 * FASTAPI BACKEND ENDPOINTS:
 * ──────────────────────────
 * GET    /api/v1/testimonials              — List all active testimonials (public)
 * GET    /api/v1/testimonials/{id}         — Get single testimonial (public)
 * POST   /api/v1/testimonials              — Create testimonial (admin only)
 * PUT    /api/v1/testimonials/{id}         — Update testimonial (admin only)
 * DELETE /api/v1/testimonials/{id}         — Delete testimonial (admin only)
 *
 * CACHING: TanStack Query handles caching via persistQueryClient.
 * Hooks use placeholderData from fallbackPublicContent.ts.
 */
import { api } from "@/exxonim/app/apiClient";
import { apiRoutes } from "@/exxonim/shared/api/routes";
import { mapTestimonial } from "@/exxonim/utils/contentMappers";
import type { Testimonial } from '@/exxonim/types';
import type { ApiTestimonial } from "@/exxonim/types/api";

export async function getTestimonials() {
  const response = await api.get<ApiTestimonial[]>(apiRoutes.public.testimonials.list);
  return response.data.map(mapTestimonial) as Testimonial[];
}
