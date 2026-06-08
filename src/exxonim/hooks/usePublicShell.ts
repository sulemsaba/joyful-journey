/**
 * FASTAPI ENDPOINT DEPENDENCIES:
 * ────────────────────────────────
 * GET /api/v1/site-settings/brand         — Get brand assets (public)
 * GET /api/v1/site-settings/footer        — Get footer content (public)
 * GET /api/v1/site-settings/company_info  — Get company info (public)
 *
 * See: src/exxonim/services/siteSettingsService.ts for full endpoint documentation.
 */
import { useQuery } from "@tanstack/react-query";
import {
  getCachedSiteSettingResource,
  getSiteSettingResource,
} from "@/exxonim/services/siteSettingsService";
import type { SiteSettingFooterValue } from "@/exxonim/types/api";
import type { BrandAssets, CompanyInfo, SiteSetting } from '@/exxonim/types';
import {
  fallbackBrand as defaultBrand,
  fallbackCompanyInfo as defaultCompanyInfo,
  fallbackFooter as defaultFooter,
} from "@/exxonim/content/fallbackShell";

/**
 * Shell data hook — loads brand, company info, and footer from the site-settings API.
 *
 * ARCHITECTURE NOTE:
 * ──────────────────
 * Navigation was previously loaded here via the /navigation API, but it has been
 * moved to a static configuration (staticNavigation.ts). The Navigation component
 * now imports its data directly instead of receiving it as a prop.
 *
 * The navigation query and navigationService.ts are deprecated but kept in the
 * codebase for reference. If API-driven navigation is needed in the future,
 * re-enable the navigation query here and pass navigationItems as a prop to
 * the Navigation component.
 */

interface PublicShellData {
  brand: BrandAssets;
  company: CompanyInfo;
  footer: SiteSettingFooterValue;
}

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

export function usePublicShell(): PublicShellData {
  const brandQuery = useQuery({
    queryKey: ["public-shell", "site-settings", "brand"],
    queryFn: () => getSiteSettingResource<BrandAssets>("brand"),
    initialData: () => getCachedSiteSettingResource<BrandAssets>("brand"),
    refetchOnMount: false,
    refetchOnReconnect: "always",
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60 * 60 * 4,
  });
  const footerQuery = useQuery({
    queryKey: ["public-shell", "site-settings", "footer"],
    queryFn: () => getSiteSettingResource<SiteSettingFooterValue>("footer"),
    initialData: () => getCachedSiteSettingResource<SiteSettingFooterValue>("footer"),
    refetchOnMount: false,
    refetchOnReconnect: "always",
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60 * 60 * 4,
  });
  const companyQuery = useQuery({
    queryKey: ["public-shell", "site-settings", "company_info"],
    queryFn: () => getSiteSettingResource<CompanyInfo>("company_info"),
    initialData: () => getCachedSiteSettingResource<CompanyInfo>("company_info"),
    refetchOnMount: false,
    refetchOnReconnect: "always",
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60 * 60 * 4,
  });

  const brand = hasSiteSettingValue(brandQuery.data?.data)
    ? sanitizeBrandAssets(brandQuery.data.data.value)
    : defaultBrand;
  const footer = hasSiteSettingValue(footerQuery.data?.data)
    ? footerQuery.data.data.value
    : defaultFooter;
  const company = hasSiteSettingValue(companyQuery.data?.data)
    ? sanitizeCompanyInfo(companyQuery.data.data.value)
    : defaultCompanyInfo;

  return {
    brand,
    footer,
    company,
  };
}
