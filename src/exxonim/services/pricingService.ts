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
 * GET    /api/v1/pricing/plans                - List all pricing plans (public, active only)
 * GET    /api/v1/pricing/plans/{id}           - Get single pricing plan (admin only)
 * POST   /api/v1/pricing/plans                - Create pricing plan (admin only)
 * PUT    /api/v1/pricing/plans/{id}           - Update pricing plan (admin only)
 * DELETE /api/v1/pricing/plans/{id}           - Delete pricing plan (admin only)
 *
 * CACHING: TanStack Query handles caching via persistQueryClient.
 * Hooks use placeholderData from fallbackPublicContent.ts.
 */
import { api } from "@/exxonim/app/apiClient";
import { apiRoutes } from "@/exxonim/shared/api/routes";
import { mapPricingPlan } from "@/exxonim/utils/contentMappers";
import type { PricingPlan } from '@/exxonim/types';
import type { ApiPricingPlan } from "@/exxonim/types/api";

export async function getPricingPlans() {
  const response = await api.get<ApiPricingPlan[]>(apiRoutes.public.pricing.plans.list);
  return response.data.map(mapPricingPlan) as PricingPlan[];
}
