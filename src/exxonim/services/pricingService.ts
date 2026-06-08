/**
 * FASTAPI BACKEND ENDPOINTS:
 * ──────────────────────────
 * GET    /api/v1/pricing/plans                — List all pricing plans (public, active only)
 * GET    /api/v1/pricing/plans/{id}           — Get single pricing plan (admin only)
 * POST   /api/v1/pricing/plans                — Create pricing plan (admin only)
 * PUT    /api/v1/pricing/plans/{id}           — Update pricing plan (admin only)
 * DELETE /api/v1/pricing/plans/{id}           — Delete pricing plan (admin only)
 *
 * PostgreSQL Tables:
 *   pricing_plans — id, name, badge, description, notes, recommended,
 *                   sort_order, is_active, created_at, updated_at
 *   pricing_plan_features — id, plan_id, label, included, sort_order
 *
 * Request Schema (POST/PUT):
 *   { name: str, badge: str | None, description: str, notes: str,
 *     recommended: bool, sort_order: int, is_active: bool,
 *     features: [{ label: str, included: bool, sort_order: int }] }
 *
 * Response Schema:
 *   { id: int, name: str, badge: str | None, description: str, notes: str,
 *     recommended: bool, features: [{ label: str, included: bool }],
 *     created_at: datetime, updated_at: datetime }
 */
import { api } from "@/exxonim/app/apiClient";
import { apiRoutes } from "@/exxonim/shared/api/routes";
import {
  fetchWithFallback,
  getCachedPublicContent,
} from "@/exxonim/shared/publicContentCache";
import { mapPricingPlan } from "@/exxonim/utils/contentMappers";
import type { PricingPlan } from '@/exxonim/types';
import type { ApiPricingPlan } from "@/exxonim/types/api";
import {
  preloadStaticFallback,
  getStaticFallback,
} from "./staticFallbackService";
import { fallbackPricingPlans } from "@/exxonim/content/fallbackPublicContent";

// Eagerly start loading the static fallback at module init time
preloadStaticFallback<PricingPlan[]>("pricing");

const PRICING_CACHE_KEY = "pricing:plans";
const PRICING_TTL_MS = 1000 * 60 * 60 * 6;

function isPricingPlanCollection(value: PricingPlan[]) {
  return Array.isArray(value) && value.length > 0;
}

async function fetchFreshPricingPlans() {
  const response = await api.get<ApiPricingPlan[]>(apiRoutes.public.pricing.plans.list);
  return response.data.map(mapPricingPlan) as PricingPlan[];
}

export function getCachedPricingPlans() {
  return getCachedPublicContent<PricingPlan[]>(
    PRICING_CACHE_KEY,
    getStaticFallback<PricingPlan[]>("pricing") ?? fallbackPricingPlans
  );
}

export async function getPricingPlans() {
  return fetchWithFallback<PricingPlan[]>({
    cacheKey: PRICING_CACHE_KEY,
    fallbackValue: getStaticFallback<PricingPlan[]>("pricing") ?? fallbackPricingPlans,
    fetcher: fetchFreshPricingPlans,
    ttlMs: PRICING_TTL_MS,
    validate: isPricingPlanCollection,
    warningLabel: "Using cached or default pricing plans.",
  });
}
