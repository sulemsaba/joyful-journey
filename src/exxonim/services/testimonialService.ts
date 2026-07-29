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
 * GET    /api/v1/testimonials              - List all active testimonials (public)
 * GET    /api/v1/testimonials/{id}         - Get single testimonial (public)
 * POST   /api/v1/testimonials              - Create testimonial (admin only)
 * PUT    /api/v1/testimonials/{id}         - Update testimonial (admin only)
 * DELETE /api/v1/testimonials/{id}         - Delete testimonial (admin only)
 *
 * CACHING: TanStack Query handles caching via persistQueryClient.
 * Hooks use placeholderData from fallbackPublicContent.ts.
 */
import { api } from "@/exxonim/app/apiClient";
import { apiRoutes } from "@/exxonim/shared/api/routes";
import type { ApiTestimonial } from "@/exxonim/types/api";

/** Raw (unmapped) fetcher so the API response and the Layer-3 snapshot
 * (public/fallback/testimonials.json) share one mapping step. */
export async function fetchTestimonialsRaw(): Promise<ApiTestimonial[]> {
  const response = await api.get<ApiTestimonial[]>(apiRoutes.public.testimonials.list);
  return response.data;
}
