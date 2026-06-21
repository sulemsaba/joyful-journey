/**
 * Generic site setting hook.
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
import { getSiteSetting } from "@/exxonim/services/siteSettingsService";
import { fetchWithJsonFallback } from "@/exxonim/services/staticFallbackService";
import { getFallbackSiteSetting } from "@/exxonim/content/fallbackPublicContent";
import type { SiteSetting } from '@/exxonim/types';

export function useSiteSetting<TValue = unknown>(key: string) {
  const fallback = getFallbackSiteSetting(key) as SiteSetting<TValue> | undefined;

  const query = useQuery({
    queryKey: ["site-settings", key],
    queryFn: () =>
      fetchWithJsonFallback(
        () => getSiteSetting<TValue>(key),
        `site-settings-${key}`
      ),
    placeholderData: fallback,
    staleTime: 1000 * 60 * 60 * 4,
    retry: (failureCount, error) => {
      const status = (error as { response?: { status?: number } } | null)?.response?.status;
      if (status === 404) return false;
      return failureCount < 2;
    },
  });

  return {
    ...query,
    data: query.data ?? fallback,
    isPending: query.isPending && !fallback,
  };
}
