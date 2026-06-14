/**
 * FASTAPI BACKEND ENDPOINTS:
 * ──────────────────────────
 * GET    /api/v1/jobs                         — List published jobs (public)
 * GET    /api/v1/jobs/{slug}                  — Get single job by slug (public)
 * POST   /api/v1/jobs/{id}/apply              — Submit job application (public)
 *
 * CACHING: TanStack Query handles caching via persistQueryClient.
 * Hooks use placeholderData from fallbackPublicContent.ts.
 */
import { api } from "@/exxonim/app/apiClient";
import { apiRoutes } from "@/exxonim/shared/api/routes";
import type { ApiCareerJob } from "@/exxonim/types/api";

export async function getPublishedJobs() {
  const response = await api.get<ApiCareerJob[]>(apiRoutes.public.jobs.list);
  return response.data;
}
