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
    refetchOnMount: true,
    refetchOnReconnect: "always",
    staleTime: 1000 * 60 * 60 * 2,
  });
}
