/**
 * Service packages hook (segment × tier).
 *
 * Fetches the admin-managed packages from /api/v1/pricing/packages (the same
 * `service_packages` table the admin UI writes to), with the standard
 * API → JSON-fallback plumbing.
 *
 * FALLBACK CHAIN (see staticFallbackService.ts):
 *   Layer 2  Live API /pricing/packages (fresh admin data)
 *   Layer 1  localStorage last-known-good (persistQueryClient, 24h)
 *   Layer 3  /fallback/service-packages.json — last admin-approved snapshot,
 *            regenerated from live by scripts/refresh-fallbacks.mjs; served
 *            whenever the API throws (backend/DB down). fetchWithJsonFallback
 *            loads it under the key "service-packages".
 *   Layer 4  Bundled per-segment defaults in ServicePackagesSection (last
 *            resort, only if the snapshot file is also missing).
 * Returns [] only when every layer is exhausted, so the section is never empty.
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
