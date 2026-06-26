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
import type { ServicesResponse, ServiceSegment } from '@/exxonim/types/service-catalog';
import { fallbackServices, fallbackCategories, fallbackSegments } from '@/exxonim/content/fallbackServiceCatalog';
import { fetchWithJsonFallback } from '@/exxonim/services/staticFallbackService';

const API_PORT = 3031;

const FALLBACK_RESPONSE: ServicesResponse = {
  success: true,
  data: {
    services: fallbackServices,
    total: fallbackServices.length,
    categories: fallbackCategories,
  },
};

async function fetchServices(segment?: string): Promise<ServicesResponse> {
  const params = new URLSearchParams();
  if (segment && segment !== 'all') params.set('segment', segment);
  params.set('status', 'published');
  const resp = await fetch(`/api/services?${params.toString()}&XTransformPort=${API_PORT}`);
  if (!resp.ok) throw new Error('API error');
  return (await resp.json()) as ServicesResponse;
}

function filterFallbackBySegment(segment?: string): ServicesResponse {
  const filtered =
    segment && segment !== 'all'
      ? fallbackServices.filter((s) =>
          s.primary_segment.some(
            (seg) => seg.toLowerCase().replace(/\s+/g, '-') === segment
          )
        )
      : fallbackServices;

  return {
    success: true,
    data: {
      services: filtered,
      total: filtered.length,
      categories: fallbackCategories,
    },
  };
}

export function useServiceCatalog(segment?: string) {
  const fallback = filterFallbackBySegment(segment);

  const query = useQuery({
    queryKey: ['services', segment],
    queryFn: () =>
      fetchWithJsonFallback(
        () => fetchServices(segment),
        'services'
      ),
    placeholderData: fallback,
    staleTime: 5 * 60 * 1000,
  });

  return {
    ...query,
    data: query.data ?? fallback,
    isPending: query.isPending && !fallback.data.services.length,
  };
}

export function useServiceSegments() {
  return { data: fallbackSegments as ServiceSegment[] };
}
