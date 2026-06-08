/**
 * FASTAPI ENDPOINT DEPENDENCY:
 * ─────────────────────────────
 * GET /api/v1/faq — List all active FAQ items (public)
 *
 * PostgreSQL Tables:
 *   faq_items — id, question, answer, category, sort_order, is_active
 *
 * Response Schema:
 *   { items: [{ id: str, question: str, answer: str, category: str,
 *               sort_order: int, is_active: bool }], total: int }
 */
import { useQuery } from "@tanstack/react-query";
import { api } from "@/exxonim/app/apiClient";
import { apiRoutes } from "@/exxonim/shared/api/routes";

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

export function useFaqItems() {
  return useQuery({
    queryKey: ["faq-items"],
    queryFn: async () => {
      const response = await api.get<FaqApiResponse>(apiRoutes.public.faq.list);
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
