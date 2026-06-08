/**
 * FASTAPI BACKEND ENDPOINTS:
 * ──────────────────────────
 * GET    /api/v1/navigation                   — List navigation items (public, active only)
 * GET    /api/v1/navigation/{id}              — Get single navigation item (admin only)
 * POST   /api/v1/navigation                   — Create navigation item (admin only)
 * PUT    /api/v1/navigation/{id}              — Update navigation item (admin only)
 * DELETE /api/v1/navigation/{id}              — Delete navigation item (admin only)
 *
 * PostgreSQL Tables:
 *   navigation_items — id, title, url, description, kind, sort_order,
 *                      is_active, parent_id, created_at, updated_at
 *
 * NOTE: Navigation is currently loaded from static configuration
 * (staticNavigation.ts). This service is deprecated but kept for
 * future API-driven navigation needs.
 *
 * Request Schema (POST/PUT):
 *   { title: str, url: str, description: str | None, kind: str,
 *     sort_order: int, is_active: bool, parent_id: int | None }
 *
 * Response Schema:
 *   { id: int, title: str, url: str, description: str | None, kind: str,
 *     order: int, isActive: bool, parentId: int | None,
 *     createdAt: datetime, updatedAt: datetime,
 *     children: NavigationItem[] }
 */
import { api } from "@/exxonim/app/apiClient";
import { apiRoutes } from "@/exxonim/shared/api/routes";
import {
  fetchWithFallbackResource,
  fetchWithFallback,
  getCachedPublicContentState,
  getCachedPublicContent,
} from "@/exxonim/shared/publicContentCache";
import { mapNavigationItem } from "@/exxonim/utils/contentMappers";
import type { NavigationItem } from '@/exxonim/types';
import type { ApiNavigationItem } from "@/exxonim/types/api";
import {
  preloadStaticFallback,
  getStaticFallback,
} from "./staticFallbackService";
import { fallbackNavigationItems } from "@/exxonim/content/fallbackPublicContent";

preloadStaticFallback<NavigationItem[]>("navigation");

const NAVIGATION_CACHE_KEY = "navigation";
const NAVIGATION_TTL_MS = 1000 * 60 * 60 * 24;

function isNavigationCollection(value: NavigationItem[]) {
  return Array.isArray(value) && value.length > 0;
}

async function fetchFreshNavigation() {
  const response = await api.get<ApiNavigationItem[]>(apiRoutes.public.navigation.list);
  return response.data.map(
    (item): NavigationItem => mapNavigationItem(item)
  );
}

export function getCachedNavigation() {
  return getCachedPublicContent<NavigationItem[]>(NAVIGATION_CACHE_KEY, getStaticFallback<NavigationItem[]>("navigation") ?? fallbackNavigationItems);
}

export function getCachedNavigationResource() {
  return getCachedPublicContentState<NavigationItem[]>(NAVIGATION_CACHE_KEY, {
    fallbackValue: getStaticFallback<NavigationItem[]>("navigation") ?? fallbackNavigationItems,
    ttlMs: NAVIGATION_TTL_MS,
  });
}

export async function getNavigation() {
  return fetchWithFallback<NavigationItem[]>({
    cacheKey: NAVIGATION_CACHE_KEY,
    fallbackValue: getStaticFallback<NavigationItem[]>("navigation") ?? fallbackNavigationItems,
    fetcher: fetchFreshNavigation,
    ttlMs: NAVIGATION_TTL_MS,
    validate: isNavigationCollection,
    warningLabel: "Using cached or default navigation content.",
  });
}

export async function getNavigationResource() {
  return fetchWithFallbackResource<NavigationItem[]>({
    cacheKey: NAVIGATION_CACHE_KEY,
    fallbackValue: getStaticFallback<NavigationItem[]>("navigation") ?? fallbackNavigationItems,
    fetcher: fetchFreshNavigation,
    ttlMs: NAVIGATION_TTL_MS,
    validate: isNavigationCollection,
    warningLabel: "Using cached or default navigation content.",
  });
}
