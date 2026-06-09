/**
 * FASTAPI ENDPOINT DEPENDENCY:
 * ─────────────────────────────
 * GET /api/v1/testimonials — List all active testimonials (public)
 *
 * See: src/exxonim/services/testimonialService.ts for full endpoint documentation.
 */
import { useQuery } from "@tanstack/react-query";
import {
  getCachedTestimonials,
  getTestimonials,
} from "@/exxonim/services/testimonialService";

export function useTestimonials() {
  return useQuery({
    queryKey: ["testimonials"],
    queryFn: getTestimonials,
    initialData: getCachedTestimonials,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 60 * 2,
  });
}
