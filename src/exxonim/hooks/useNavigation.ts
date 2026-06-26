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
 * Navigation hook.
 *
 * NOTE: Navigation is currently loaded from static configuration
 * (staticNavigation.ts). This hook is deprecated but kept for future
 * API-driven navigation needs.
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
