/**
 * Service packages hook (segment × tier).
 *
 * Fetches the admin-managed packages from /api/v1/pricing/packages (the same
 * `service_packages` table the admin UI writes to), with the standard
 * API → JSON-fallback plumbing.
 *
 * FALLBACK GUARANTEE:
 *   Returns [] when there is no data. The ServicePackagesSection then falls
 *   back to its bundled per-segment defaults, so the section is never empty
 *   even with an empty database or an API outage.
 */
import { useQuery } from "@tanstack/react-query";
import { getServicePackages } from "@/exxonim/services/pricingService";
import { fetchWithJsonFallback } from "@/exxonim/services/staticFallbackService";
import type { SegmentPackage } from "@/exxonim/types";

const EMPTY: SegmentPackage[] = [];

export function useServicePackages() {
  const query = useQuery({
    queryKey: ["pricing", "packages"],
    queryFn: () => fetchWithJsonFallback(getServicePackages, "service-packages"),
    placeholderData: EMPTY,
    staleTime: 1000 * 60 * 5, // 5 minutes — pricing changes propagate quickly
    retry: 1,
  });

  return {
    ...query,
    data: query.data ?? EMPTY,
  };
}
