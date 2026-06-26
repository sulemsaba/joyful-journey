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
