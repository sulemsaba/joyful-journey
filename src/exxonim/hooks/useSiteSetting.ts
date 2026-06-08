/**
 * FASTAPI ENDPOINT DEPENDENCY:
 * ─────────────────────────────
 * GET /api/v1/site-settings/{key} — Get single site setting by key (public)
 *
 * Known keys: brand, company_info, footer, seo_defaults, office_hours,
 * social_links, policy_versions, contact_map
 *
 * See: src/exxonim/services/siteSettingsService.ts for full endpoint documentation.
 */
import { useQuery } from "@tanstack/react-query";
import { getCachedSiteSetting, getSiteSetting } from "@/exxonim/services/siteSettingsService";

export function useSiteSetting<TValue = unknown>(key: string) {
  return useQuery({
    queryKey: ["site-settings", key],
    queryFn: () => getSiteSetting<TValue>(key),
    initialData: () => getCachedSiteSetting<TValue>(key),
    refetchOnMount: "always",
    refetchOnReconnect: "always",
    retry: (failureCount, error) => {
      const status = (error as { response?: { status?: number } } | null)?.response?.status;
      if (status === 404) {
        return false;
      }
      return failureCount < 2;
    },
  });
}
