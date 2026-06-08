/**
 * FASTAPI ENDPOINT DEPENDENCY:
 * ─────────────────────────────
 * GET /api/v1/navigation — List navigation items (public, active only)
 *
 * NOTE: Navigation is currently loaded from static configuration
 * (staticNavigation.ts). This hook is deprecated but kept for future
 * API-driven navigation needs.
 *
 * See: src/exxonim/services/navigationService.ts for full endpoint documentation.
 */
import { useQuery } from "@tanstack/react-query";
import { getCachedNavigation, getNavigation } from "@/exxonim/services/navigationService";

export function useNavigation() {
  return useQuery({
    queryKey: ["navigation"],
    queryFn: getNavigation,
    initialData: getCachedNavigation,
    refetchOnMount: "always",
    refetchOnReconnect: "always",
  });
}
