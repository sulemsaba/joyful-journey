import { useQuery } from '@tanstack/react-query';
import type { ServicesResponse, ServiceSegment } from '@/exxonim/types/service-catalog';
import { fallbackServices, fallbackCategories, fallbackSegments } from '@/exxonim/content/fallbackServiceCatalog';

const API_PORT = 3031;

export function useServiceCatalog(segment?: string) {
  return useQuery({
    queryKey: ['services', segment],
    queryFn: async () => {
      try {
        const params = new URLSearchParams();
        if (segment && segment !== 'all') params.set('segment', segment);
        params.set('status', 'published');
        const resp = await fetch(`/api/services?${params.toString()}&XTransformPort=${API_PORT}`);
        if (!resp.ok) throw new Error('API error');
        return (await resp.json()) as ServicesResponse;
      } catch {
        // Fallback to static data — filter by segment locally
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
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useServiceSegments() {
  return { data: fallbackSegments as ServiceSegment[] };
}
