/**
 * FASTAPI ENDPOINT DEPENDENCY:
 * ─────────────────────────────
 * GET /api/v1/pricing/plans — List all pricing plans (public, active only)
 *
 * See: src/exxonim/services/pricingService.ts for full endpoint documentation.
 */
import { useQuery } from "@tanstack/react-query";
import {
  getCachedPricingPlans,
  getPricingPlans,
} from "@/exxonim/services/pricingService";

export function usePricingPlans() {
  return useQuery({
    queryKey: ["pricing", "plans"],
    queryFn: getPricingPlans,
    initialData: getCachedPricingPlans,
    refetchOnMount: true,
    refetchOnReconnect: "always",
    staleTime: 1000 * 60 * 60,
  });
}
