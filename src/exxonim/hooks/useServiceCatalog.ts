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
 * Service catalog hook.
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
import { useQuery } from '@tanstack/react-query';
import type { ServicesResponse } from '@/exxonim/types/service-catalog';
import { fetchWithPublicSnapshotFallback } from '@/exxonim/services/staticFallbackService';

// Empty initial state — the catalog is 100% admin-driven (live API → committed
// /snapshot/services/services.json). No hardcoded/fabricated services.
const EMPTY_RESPONSE: ServicesResponse = {
  success: true,
  data: { services: [], total: 0, categories: [] },
};

async function fetchServices(segment?: string): Promise<ServicesResponse> {
  const params = new URLSearchParams();
  if (segment && segment !== 'all') params.set('segment', segment);
  const resp = await fetch(`/api/v1/services?${params.toString()}`);
  if (!resp.ok) throw new Error('API error');
  return (await resp.json()) as ServicesResponse;
}

export function useServiceCatalog(segment?: string) {
  const query = useQuery({
    queryKey: ['services', segment],
    queryFn: () =>
      fetchWithPublicSnapshotFallback(
        () => fetchServices(segment),
        'services',
        'services'
      ),
    placeholderData: EMPTY_RESPONSE,
    staleTime: 5 * 60 * 1000,
  });

  const apiData = query.data;
  const normalizedData: ServicesResponse =
    apiData?.data ? (apiData as unknown as ServicesResponse) : EMPTY_RESPONSE;

  return { ...query, data: normalizedData };
}
