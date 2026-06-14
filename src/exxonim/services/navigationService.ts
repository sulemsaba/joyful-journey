/**
 * FASTAPI BACKEND ENDPOINTS:
 * ──────────────────────────
 * GET    /api/v1/navigation                   — List navigation items (public, active only)
 *
 * NOTE: Navigation is currently loaded from static configuration
 * (staticNavigation.ts). This service is kept for future API-driven
 * navigation needs.
 *
 * CACHING: TanStack Query handles caching via persistQueryClient.
 */
import { api } from "@/exxonim/app/apiClient";
import { apiRoutes } from "@/exxonim/shared/api/routes";
import { mapNavigationItem } from "@/exxonim/utils/contentMappers";
import type { NavigationItem } from '@/exxonim/types';
import type { ApiNavigationItem } from "@/exxonim/types/api";

export async function getNavigation() {
  const response = await api.get<ApiNavigationItem[]>(apiRoutes.public.navigation.list);
  return response.data.map(
    (item): NavigationItem => mapNavigationItem(item)
  );
}
