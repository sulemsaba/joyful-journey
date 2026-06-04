import { getResourcePostSlug, normalizePathname, resourceArticlePath } from "@/exxonim/routes";
import type { BlogPost, PageRecord } from '@/exxonim/types';
import { getDefaultShareImageUrl, siteOrigin } from "./constants";
import type { PageSeo } from "./types";
import { toCanonicalPath } from "./utils";

const BRAND_SUFFIX = " | Exxonim Consult";

/**
 * Appends the brand suffix to a title if it's not already present.
 * Keeps titles under 60 characters when possible (Moz recommendation).
 */
function titleWithBrand(title: string): string {
  if (title.includes("Exxonim Consult")) return title;
  const combined = title + BRAND_SUFFIX;
  // If combined exceeds 60 chars, truncate the title part to fit
  if (combined.length > 60) {
    const maxTitleLen = 60 - BRAND_SUFFIX.length;
    return title.slice(0, maxTitleLen).trimEnd() + BRAND_SUFFIX;
  }
  return combined;
}

export function createFallbackSeo(
  pathname: string | undefined,
  options: {
    canonicalBaseUrl?: string;
    image?: string;
    robots?: string;
    title?: string;
    description?: string;
    type?: "website" | "article";
  } = {}
): PageSeo {
  const normalizedPathname = normalizePathname(pathname);
  const canonicalBaseUrl = options.canonicalBaseUrl ?? siteOrigin;

  return {
    title: options.title ?? "Content unavailable",
    description:
      options.description ?? "This content is temporarily unavailable.",
    canonicalPath: toCanonicalPath(normalizedPathname),
    image: options.image ?? getDefaultShareImageUrl(canonicalBaseUrl),
    type:
      options.type ?? (getResourcePostSlug(normalizedPathname) ? "article" : "website"),
    robots: options.robots ?? "noindex,follow",
    canonicalBaseUrl,
  };
}

export function createPageSeo<TContent>(
  page: PageRecord<TContent>,
  options: {
    canonicalPath: string;
    canonicalBaseUrl?: string;
    defaultDescription?: string;
    defaultImage?: string;
    robots?: string;
  }
): PageSeo {
  const canonicalBaseUrl = options.canonicalBaseUrl ?? siteOrigin;

  return {
    title: titleWithBrand(page.metaTitle ?? page.title),
    description: page.metaDescription ?? options.defaultDescription ?? page.title,
    canonicalPath: options.canonicalPath,
    image:
      page.ogImageUrl ??
      options.defaultImage ??
      getDefaultShareImageUrl(canonicalBaseUrl),
    type: "website",
    robots: options.robots ?? "index,follow",
    canonicalBaseUrl,
  };
}

export function createBlogPostSeo(
  post: BlogPost,
  options: {
    canonicalBaseUrl?: string;
    defaultDescription?: string;
    defaultImage?: string;
    robots?: string;
  } = {}
): PageSeo {
  const canonicalBaseUrl = options.canonicalBaseUrl ?? siteOrigin;

  return {
    title: titleWithBrand(post.metaTitle ?? post.title),
    description: post.metaDescription ?? post.excerpt ?? options.defaultDescription ?? post.title,
    canonicalPath: resourceArticlePath(post.slug),
    image:
      post.coverImageSrc ??
      options.defaultImage ??
      getDefaultShareImageUrl(canonicalBaseUrl),
    type: "article",
    robots: options.robots ?? "index,follow",
    canonicalBaseUrl,
  };
}
