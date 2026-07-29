/**
 * FASTAPI BACKEND ENDPOINT:
 * ─────────────────────────
 * POST /api/v1/newsletter/subscribe   body { email, source? }  (public)
 *   → { status: "subscribed" | "already_subscribed", message: string }
 */
import { api } from "@/exxonim/app/apiClient";
import { apiRoutes } from "@/exxonim/shared/api/routes";

export interface NewsletterSubscribeResponse {
  status: "subscribed" | "already_subscribed";
  message: string;
}

export async function subscribeToNewsletter(email: string, source?: string) {
  const response = await api.post<NewsletterSubscribeResponse>(
    apiRoutes.public.newsletter.subscribe,
    { email, source }
  );
  return response.data;
}
