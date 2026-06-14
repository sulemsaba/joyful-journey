/**
 * Navigation hook.
 *
 * NOTE: Navigation is currently loaded from static configuration
 * (staticNavigation.ts). This hook is deprecated but kept for future
 * API-driven navigation needs.
 *
 * ARCHITECTURE:
 *   Layer 0: Memory cache (current session)
 *   Layer 1: persistQueryClient (localStorage) — returning visitors see cache instantly
 *   Layer 2: Live API → JSON fallback (if API fails)
 *   Layer 3: Hardcoded fallback (always available, built into JS bundle)
 *
 * FALLBACK GUARANTEE:
 *   Always returns hardcoded fallback as `data` when no real data is available.
 */
import { useQuery } from "@tanstack/react-query";
import { getNavigation } from "@/exxonim/services/navigationService";
import { fetchWithJsonFallback } from "@/exxonim/services/staticFallbackService";
import { fallbackNavigationItems } from "@/exxonim/content/fallbackPublicContent";

export function useNavigation() {
  const query = useQuery({
    queryKey: ["navigation"],
    queryFn: () => fetchWithJsonFallback(getNavigation, "navigation"),
    placeholderData: fallbackNavigationItems,
    staleTime: 1000 * 60 * 60 * 24,
    retry: 1,
  });

  return {
    ...query,
    data: query.data ?? fallbackNavigationItems,
    isPending: query.isPending && !fallbackNavigationItems.length,
  };
}
