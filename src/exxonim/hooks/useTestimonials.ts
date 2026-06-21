/**
 * Testimonials hook.
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
import { getTestimonials } from "@/exxonim/services/testimonialService";
import { fetchWithJsonFallback } from "@/exxonim/services/staticFallbackService";
import { fallbackTestimonials } from "@/exxonim/content/fallbackPublicContent";

export function useTestimonials() {
  const query = useQuery({
    queryKey: ["testimonials"],
    queryFn: () => fetchWithJsonFallback(getTestimonials, "testimonials"),
    placeholderData: fallbackTestimonials,
    staleTime: 1000 * 60 * 60 * 2,
    retry: 1,
  });

  return {
    ...query,
    data: query.data ?? fallbackTestimonials,
    isPending: query.isPending && !fallbackTestimonials.length,
  };
}
