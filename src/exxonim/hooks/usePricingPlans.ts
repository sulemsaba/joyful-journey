/**
 * Pricing plans hook.
 *
 * ARCHITECTURE:
 *   Layer 0: Memory cache (current session)
 *   Layer 1: persistQueryClient (localStorage) - returning visitors see cache instantly
 *   Layer 2: Live API → JSON fallback (if API fails)
 *   Layer 3: Hardcoded fallback (always available, built into JS bundle)
 *
 * FALLBACK GUARANTEE:
 *   Always returns hardcoded fallback as `data` when no real data is available.
 */
import { useQuery } from "@tanstack/react-query";
import { getPricingPlans } from "@/exxonim/services/pricingService";
import { fetchWithJsonFallback } from "@/exxonim/services/staticFallbackService";
import { fallbackPricingPlans } from "@/exxonim/content/fallbackPublicContent";

export function usePricingPlans() {
  const query = useQuery({
    queryKey: ["pricing", "plans"],
    queryFn: () => fetchWithJsonFallback(getPricingPlans, "pricing-plans"),
    placeholderData: fallbackPricingPlans,
    staleTime: 1000 * 60 * 60,
    retry: 1,
  });

  return {
    ...query,
    data: query.data ?? fallbackPricingPlans,
    isPending: query.isPending && !fallbackPricingPlans.length,
  };
}
