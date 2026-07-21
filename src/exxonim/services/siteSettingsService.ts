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
 * FASTAPI BACKEND ENDPOINTS:
 * ──────────────────────────
 * GET    /api/v1/site-settings               - List all site settings (admin only)
 * GET    /api/v1/site-settings/{key}         - Get single site setting by key (public)
 * PUT    /api/v1/site-settings/{key}         - Update site setting (admin only)
 *
 * PostgreSQL Tables:
 *   site_settings - id, key (UNIQUE), value (JSONB), created_at, updated_at
 *
 * Known Setting Keys:
 *   brand          - { name: str, lightLogoSrc: str, darkLogoSrc: str }
 *   company_info   - { name: str, phones: str[], emails: str[], address: str, whatsapp: str }
 *   footer         - { quickLinks: NavLink[], otherResources: NavLink[], tagline: str,
 *                      primaryCta: { label: str, href: str }, copyright: str }
 *   seo_defaults   - { robotsIndex: bool, robotsFollow: bool, canonicalBaseUrl: str,
 *                      defaultMetaDescription: str, defaultShareImageUrl: str }
 *   office_hours   - { schedule: str, timezone: str }
 *   social_links   - { links: [{ platform: str, url: str }] }
 *   policy_versions - { privacyPolicyVersion: str, termsVersion: str, cookieVersion: str }
 *   contact_map    - { embedUrl: str, latitude: float, longitude: float }
 *
 * CACHING:
 * ────────
 * TanStack Query handles caching automatically via persistQueryClient.
 * Hooks use placeholderData from fallbackShell.ts for instant rendering.
 * No manual localStorage management needed.
 */
import { api } from "@/exxonim/app/apiClient";
import { apiRoutes } from "@/exxonim/shared/api/routes";
import { mapSiteSetting } from "@/exxonim/utils/contentMappers";
import type { SiteSetting } from '@/exxonim/types';
import type { ApiSiteSetting } from "@/exxonim/types/api";

async function fetchSiteSetting<TValue = unknown>(key: string) {
  const response = await api.get<{ id: string; key: string; value: TValue; createdAt: string; updatedAt: string }>(
    apiRoutes.public.siteSettings.byKey(key)
  );
  const raw = response.data;
  return mapSiteSetting({ id: Number(raw.id), key: raw.key, value: raw.value, created_at: raw.createdAt, updated_at: raw.updatedAt }) as SiteSetting<TValue>;
}

/** Fetch a site setting by key. TanStack Query handles caching + persistence. */
export function getSiteSetting<TValue = unknown>(key: string) {
  return fetchSiteSetting<TValue>(key);
}
