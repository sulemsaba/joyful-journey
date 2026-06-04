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
