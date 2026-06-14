/**
 * FAQ items hook.
 *
 * ARCHITECTURE:
 *   Layer 0: Memory cache (current session)
 *   Layer 1: persistQueryClient (localStorage) — returning visitors see cache instantly
 *   Layer 2: Live API → JSON fallback (if API fails)
 *   Layer 3: Hardcoded fallback (empty items, always available)
 *
 * FAQ page uses usePage for full fallback content; this hook
 * provides the structured FAQ items separately.
 *
 * FALLBACK GUARANTEE:
 *   Always returns empty FAQ items as `data` when no real data is available.
 */
import { useQuery } from "@tanstack/react-query";
import { api } from "@/exxonim/app/apiClient";
import { apiRoutes } from "@/exxonim/shared/api/routes";
import { fetchWithJsonFallback } from "@/exxonim/services/staticFallbackService";

interface FaqItemFromApi {
  id: string;
  question: string;
  answer: string;
  category: string;
  sort_order: number;
  is_active: boolean;
}

interface FaqApiResponse {
  items: FaqItemFromApi[];
  total: number;
}

const EMPTY_FAQ: FaqApiResponse = { items: [], total: 0 };

async function fetchFaqItems(): Promise<FaqApiResponse> {
  const response = await api.get<FaqApiResponse>(apiRoutes.public.faq.list);
  return response.data;
}

export function useFaqItems() {
  const query = useQuery({
    queryKey: ["faq-items"],
    queryFn: () => fetchWithJsonFallback(fetchFaqItems, "faq-items"),
    placeholderData: EMPTY_FAQ,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  return {
    ...query,
    data: query.data ?? EMPTY_FAQ,
  };
}
