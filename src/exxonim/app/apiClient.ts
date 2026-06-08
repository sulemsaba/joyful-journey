import { resolveApiBaseUrl } from "@/exxonim/shared/api/baseUrl";
import { createHttpClient } from "@/exxonim/shared/api/http";

/**
 * API client for communicating with the FastAPI backend.
 *
 * FASTAPI BACKEND INTEGRATION:
 * ──────────────────────────────
 * The API URL is resolved in this order:
 *   1. VITE_API_URL environment variable (set in .env)
 *   2. Auto-detected from current hostname (same host, port 8000)
 *   3. Fallback: http://127.0.0.1:8000/api/v1
 *
 * When deploying, set VITE_API_URL to your FastAPI server URL:
 *   VITE_API_URL=https://api.exxonim.tz/api/v1
 *
 * FastAPI endpoints used by the frontend:
 *   GET  /api/v1/site-settings/brand
 *   GET  /api/v1/site-settings/company_info
 *   GET  /api/v1/site-settings/footer
 *   GET  /api/v1/site-settings/seo_defaults
 *   GET  /api/v1/navigation
 *   GET  /api/v1/pages?slug={slug}
 *   GET  /api/v1/blog/posts
 *   GET  /api/v1/blog/posts?slug={slug}
 *   GET  /api/v1/blog/categories
 *   GET  /api/v1/testimonials
 *   GET  /api/v1/pricing
 *   GET  /api/v1/jobs
 *   GET  /api/v1/faq
 *   POST /api/v1/consultations
 *   GET  /api/v1/consultations/{id}/track
 *   POST /api/v1/contact
 *   GET  /api/v1/privacy/consent
 *   POST /api/v1/privacy/consent
 */
function getApiUrl(): string | undefined {
  return import.meta.env.VITE_API_URL || undefined;
}

export const api = createHttpClient(resolveApiBaseUrl(getApiUrl()));
