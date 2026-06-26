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
 * Page content hook.
 *
 * ARCHITECTURE:
 *   Layer 0: Memory cache (current session)
 *   Layer 1: persistQueryClient (localStorage) - returning visitors see cache instantly
 *   Layer 2: Live API → JSON fallback (if API fails)
 *   Layer 3: Hardcoded fallback (always available, built into JS bundle)
 *
 * FALLBACK GUARANTEE:
 *   Unlike placeholderData (which is discarded when the query errors),
 *   this hook always returns the hardcoded fallback as `data` when no
 *   real data is available. This ensures pages ALWAYS render content
 *   even when the API is completely unavailable.
 *
 *   - When API succeeds, real data replaces the fallback and gets cached
 *   - When API fails but JSON fallback works, JSON data replaces the fallback
 *   - When both API and JSON fallback fail, hardcoded fallback persists
 *   - Returning visitors with cached data never see the hardcoded fallback
 *   - This eliminates the triple-render flicker (hardcoded → cache → API)
 */
import { useQuery } from "@tanstack/react-query";
import { getPageBySlug } from "@/exxonim/services/pageService";
import { fetchWithJsonFallback } from "@/exxonim/services/staticFallbackService";
import { getFallbackPage } from "@/exxonim/content/fallbackPublicContent";
import type { PageRecord } from '@/exxonim/types';

export function usePage<TContent = Record<string, unknown>>(slug: string) {
  const fallback = getFallbackPage(slug) as PageRecord<TContent> | undefined;

  const query = useQuery({
    queryKey: ["pages", slug],
    queryFn: () =>
      fetchWithJsonFallback(
        () => getPageBySlug<TContent>(slug),
        `pages-${slug}`
      ),
    placeholderData: fallback,
    staleTime: 1000 * 60 * 60,
    retry: (failureCount, error) => {
      const status = (error as { response?: { status?: number } } | null)?.response?.status;
      if (status === 404) return false;
      return failureCount < 2;
    },
  });

  // FALLBACK GUARANTEE: When the query has no real data (e.g., API is down
  // and JSON fallback files are missing), always return the hardcoded fallback.
  // This prevents pages from showing "Unable to load" error states when
  // the hardcoded content is perfectly valid and always available.
  const data = query.data ?? fallback;

  return {
    ...query,
    data,
    // isPending should be false if we have fallback data to show, even
    // if the query is still loading. This prevents LoadBoundary from
    // showing a loading spinner when fallback content is already available.
    isPending: query.isPending && !fallback,
  };
}
