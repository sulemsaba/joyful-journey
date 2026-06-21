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
