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
 * Shell data hook - loads brand, company info, and footer.
 *
 * ARCHITECTURE:
 *   Layer 0: Memory cache (current session)
 *   Layer 1: persistQueryClient (localStorage) - returning visitors see cache instantly
 *   Layer 2: Live API → JSON fallback (if API fails)
 *   Layer 3: placeholderData (hardcoded) - shown during initial load
 *
 * Using placeholderData (not initialData):
 *   - Returning visitors: cached data from localStorage renders instantly.
 *     No flicker, no content jumping.
 *   - First visitors: placeholderData shows briefly, then API data replaces it.
 *   - API fails + JSON works: JSON data gets cached for next visit.
 *   - Everything fails: component falls back to hardcoded defaults via ternary.
 */
import { useQuery } from "@tanstack/react-query";
import { getSiteSetting } from "@/exxonim/services/siteSettingsService";
import { fetchWithJsonFallback } from "@/exxonim/services/staticFallbackService";
import type { SiteSettingFooterValue } from "@/exxonim/types/api";
import type { BrandAssets, CompanyInfo, SiteSetting } from '@/exxonim/types';
import {
  fallbackBrand as defaultBrand,
  fallbackCompanyInfo as defaultCompanyInfo,
  fallbackFooter as defaultFooter,
} from "@/exxonim/content/fallbackShell";

function hasText(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function sanitizeBrandAssets(value: BrandAssets): BrandAssets {
  return {
    name: hasText(value.name) ? value.name.trim() : defaultBrand.name,
    lightLogoSrc: hasText(value.lightLogoSrc)
      ? value.lightLogoSrc
      : defaultBrand.lightLogoSrc,
    darkLogoSrc: hasText(value.darkLogoSrc)
      ? value.darkLogoSrc
      : defaultBrand.darkLogoSrc,
  };
}

function sanitizeCompanyInfo(value: CompanyInfo): CompanyInfo {
  return {
    ...value,
    name: hasText(value.name) ? value.name.trim() : defaultCompanyInfo.name,
  };
}

function hasSiteSettingValue<TValue>(
  setting: SiteSetting<TValue> | undefined
): setting is SiteSetting<TValue> {
  return Boolean(setting?.value);
}

/** Wrap fallback data in the SiteSetting shape so the rest of the code works the same */
function asFallbackSetting<TValue>(key: string, value: TValue): SiteSetting<TValue> {
  return { id: 0, key, value, createdAt: "fallback", updatedAt: "fallback" };
}

/* ── Module-level placeholderData (stable references, no re-render churn) ── */
const PLACEHOLDER_BRAND = asFallbackSetting("brand", defaultBrand);
const PLACEHOLDER_FOOTER = asFallbackSetting("footer", defaultFooter);
const PLACEHOLDER_COMPANY = asFallbackSetting("company_info", defaultCompanyInfo);

export function usePublicShell() {
  const brandQuery = useQuery({
    queryKey: ["site-settings", "brand"],
    queryFn: () =>
      fetchWithJsonFallback(
        () => getSiteSetting<BrandAssets>("brand"),
        "site-settings-brand"
      ),
    placeholderData: PLACEHOLDER_BRAND,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  const footerQuery = useQuery({
    queryKey: ["site-settings", "footer"],
    queryFn: () =>
      fetchWithJsonFallback(
        () => getSiteSetting<SiteSettingFooterValue>("footer"),
        "site-settings-footer"
      ),
    placeholderData: PLACEHOLDER_FOOTER,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  const companyQuery = useQuery({
    queryKey: ["site-settings", "company_info"],
    queryFn: () =>
      fetchWithJsonFallback(
        () => getSiteSetting<CompanyInfo>("company_info"),
        "site-settings-company_info"
      ),
    placeholderData: PLACEHOLDER_COMPANY,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  const brand = hasSiteSettingValue(brandQuery.data)
    ? sanitizeBrandAssets(brandQuery.data.value)
    : defaultBrand;

  const footer = hasSiteSettingValue(footerQuery.data)
    ? footerQuery.data.value
    : defaultFooter;

  const company = hasSiteSettingValue(companyQuery.data)
    ? sanitizeCompanyInfo(companyQuery.data.value)
    : defaultCompanyInfo;

  return {
    brand,
    footer,
    company,
  };
}
