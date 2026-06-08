/**
 * FASTAPI ENDPOINT DEPENDENCY:
 * ─────────────────────────────
 * GET /api/v1/site-settings/seo_defaults — Get SEO default settings (public)
 *
 * Used to resolve canonical URLs, default meta descriptions, robots directives,
 * and default share images for page and blog post SEO.
 *
 * See: src/exxonim/services/siteSettingsService.ts for full endpoint documentation.
 */
import { useEffect } from "react";
import type { SiteSettingSeoDefaultsValue } from "@/exxonim/types/api";
import { useSiteSetting } from "./useSiteSetting";
import {
  applyResolvedSeo,
  createBlogPostSeo,
  createPageSeo,
  getDefaultShareImageUrl,
  siteOrigin,
} from '@/exxonim/seo';
import type { BlogPost, PageRecord } from '@/exxonim/types';

function toRobots(value?: SiteSettingSeoDefaultsValue | null) {
  return value
    ? `${value.robotsIndex ? "index" : "noindex"},${value.robotsFollow ? "follow" : "nofollow"}`
    : "index,follow";
}

function toCanonicalBaseUrl(value?: SiteSettingSeoDefaultsValue | null) {
  return value?.canonicalBaseUrl ?? siteOrigin;
}

function toDefaultDescription(value?: SiteSettingSeoDefaultsValue | null) {
  return value?.defaultMetaDescription ?? undefined;
}

function toDefaultImage(value?: SiteSettingSeoDefaultsValue | null) {
  if (value?.defaultShareImageUrl) {
    return value.defaultShareImageUrl;
  }

  return getDefaultShareImageUrl(toCanonicalBaseUrl(value));
}

export function useResolvedPageSeo<TContent>(
  page: PageRecord<TContent> | null | undefined,
  canonicalPath: string
) {
  const { data: seoDefaultsSetting } =
    useSiteSetting<SiteSettingSeoDefaultsValue>("seo_defaults");
  const seoDefaults = seoDefaultsSetting?.value;

  useEffect(() => {
    if (!page) {
      return;
    }

    applyResolvedSeo(
      createPageSeo(page, {
        canonicalPath,
        canonicalBaseUrl: toCanonicalBaseUrl(seoDefaults),
        defaultDescription: toDefaultDescription(seoDefaults),
        defaultImage: toDefaultImage(seoDefaults),
        robots: toRobots(seoDefaults),
      })
    );
  }, [canonicalPath, page, seoDefaults]);
}

export function useResolvedBlogSeo(post: BlogPost | null | undefined) {
  const { data: seoDefaultsSetting } =
    useSiteSetting<SiteSettingSeoDefaultsValue>("seo_defaults");
  const seoDefaults = seoDefaultsSetting?.value;

  useEffect(() => {
    if (!post) {
      return;
    }

    applyResolvedSeo(
      createBlogPostSeo(post, {
        canonicalBaseUrl: toCanonicalBaseUrl(seoDefaults),
        defaultDescription: toDefaultDescription(seoDefaults),
        defaultImage: toDefaultImage(seoDefaults),
        robots: toRobots(seoDefaults),
      })
    );
  }, [post, seoDefaults]);
}
