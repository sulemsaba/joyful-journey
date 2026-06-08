/**
 * FASTAPI BACKEND ENDPOINTS:
 * ──────────────────────────
 * GET    /api/v1/jobs                         — List published jobs (public)
 * GET    /api/v1/jobs/{slug}                  — Get single job by slug (public)
 * POST   /api/v1/jobs                         — Create job posting (admin only)
 * PUT    /api/v1/jobs/{slug}                  — Update job posting (admin only)
 * DELETE /api/v1/jobs/{slug}                  — Delete job posting (admin only)
 * POST   /api/v1/jobs/{id}/apply              — Submit job application (public, multipart/form-data)
 *
 * PostgreSQL Tables:
 *   jobs — id, slug (UNIQUE), title, department, employment_type, location_mode,
 *          city, country, summary, description, requirements (JSONB),
 *          responsibilities (JSONB), compensation_label, experience_label,
 *          is_published, published_at, created_at, updated_at
 *   job_applications — id, job_id, name, email, phone, cover_note,
 *                      resume_url, academics_url, cover_letter_url,
 *                      status, created_at
 *
 * Request Schema — Apply (POST /api/v1/jobs/{id}/apply, multipart/form-data):
 *   name: str (required), email: str (required), phone: str,
 *   cover_note: str, resume: File (required), academics: File, cover_letter: File
 *
 * Response Schema — Job List:
 *   [{ id: str, slug: str, title: str, department: str, employment_type: str,
 *      location_mode: str, city: str, country: str, summary: str,
 *      requirements: str[], responsibilities: str[],
 *      compensation_label: str | None, experience_label: str | None,
 *      published_at: datetime | None, description: str | None }]
 *
 * Response Schema — Job Application:
 *   { id: int, status: str, message: str }
 */
import { api } from "@/exxonim/app/apiClient";
import { apiRoutes } from "@/exxonim/shared/api/routes";
import {
  fetchWithFallback,
  getCachedPublicContent,
} from "@/exxonim/shared/publicContentCache";
import type { ApiCareerJob } from "@/exxonim/types/api";
import {
  preloadStaticFallback,
  getStaticFallback,
} from "./staticFallbackService";
import { fallbackJobs } from "@/exxonim/content/fallbackPublicContent";

preloadStaticFallback<ApiCareerJob[]>("jobs");

const JOBS_CACHE_KEY = "jobs:published";
const JOBS_TTL_MS = 1000 * 60 * 30;

function isJobCollection(value: ApiCareerJob[]) {
  return Array.isArray(value) && value.length > 0;
}

async function fetchFreshPublishedJobs() {
  const response = await api.get<ApiCareerJob[]>(apiRoutes.public.jobs.list);
  return response.data;
}

export function getCachedPublishedJobs() {
  return getCachedPublicContent<ApiCareerJob[]>(JOBS_CACHE_KEY, getStaticFallback<ApiCareerJob[]>("jobs") ?? fallbackJobs);
}

export async function getPublishedJobs() {
  return fetchWithFallback<ApiCareerJob[]>({
    cacheKey: JOBS_CACHE_KEY,
    fallbackValue: getStaticFallback<ApiCareerJob[]>("jobs") ?? fallbackJobs,
    fetcher: fetchFreshPublishedJobs,
    ttlMs: JOBS_TTL_MS,
    validate: isJobCollection,
    warningLabel: "Using cached or default published jobs.",
  });
}
