import { siteOrigin } from "./constants";
import type { PageSeo } from "./types";
import { buildAbsoluteUrl } from "./utils";

function ensureMetaTag(selector: string, setup: (meta: HTMLMetaElement) => void) {
  let meta = document.querySelector(selector) as HTMLMetaElement | null;

  if (!meta) {
    meta = document.createElement("meta");
    setup(meta);
    document.head.appendChild(meta);
  }

  return meta;
}

function ensureLinkTag(selector: string, setup: (link: HTMLLinkElement) => void) {
  let link = document.querySelector(selector) as HTMLLinkElement | null;

  if (!link) {
    link = document.createElement("link");
    setup(link);
    document.head.appendChild(link);
  }

  return link;
}

export function applyResolvedSeo(seo: PageSeo) {
  const canonicalUrl = buildAbsoluteUrl(
    seo.canonicalPath,
    seo.canonicalBaseUrl ?? siteOrigin
  );

  document.title = seo.title;

  const metaDescription = ensureMetaTag(
    'meta[name="description"]',
    (meta) => {
      meta.name = "description";
      meta.setAttribute("data-exxonim", "description");
    }
  );
  metaDescription.content = seo.description;

  const robotsMeta = ensureMetaTag('meta[name="robots"]', (meta) => {
    meta.name = "robots";
    meta.setAttribute("data-exxonim", "robots");
  });
  robotsMeta.content = seo.robots;

  const ogTitle = ensureMetaTag('meta[property="og:title"]', (meta) => {
    meta.setAttribute("property", "og:title");
    meta.setAttribute("data-exxonim", "og:title");
  });
  ogTitle.content = seo.title;

  const ogDescription = ensureMetaTag(
    'meta[property="og:description"]',
    (meta) => {
      meta.setAttribute("property", "og:description");
      meta.setAttribute("data-exxonim", "og:description");
    }
  );
  ogDescription.content = seo.description;

  const ogType = ensureMetaTag('meta[property="og:type"]', (meta) => {
    meta.setAttribute("property", "og:type");
    meta.setAttribute("data-exxonim", "og:type");
  });
  ogType.content = seo.type;

  const ogUrl = ensureMetaTag('meta[property="og:url"]', (meta) => {
    meta.setAttribute("property", "og:url");
    meta.setAttribute("data-exxonim", "og:url");
  });
  ogUrl.content = canonicalUrl;

  const ogImage = ensureMetaTag('meta[property="og:image"]', (meta) => {
    meta.setAttribute("property", "og:image");
    meta.setAttribute("data-exxonim", "og:image");
  });
  ogImage.content = seo.image;

  const twitterCard = ensureMetaTag('meta[name="twitter:card"]', (meta) => {
    meta.name = "twitter:card";
    meta.setAttribute("data-exxonim", "twitter:card");
  });
  twitterCard.content = "summary_large_image";

  const twitterTitle = ensureMetaTag('meta[name="twitter:title"]', (meta) => {
    meta.name = "twitter:title";
    meta.setAttribute("data-exxonim", "twitter:title");
  });
  twitterTitle.content = seo.title;

  const twitterDescription = ensureMetaTag(
    'meta[name="twitter:description"]',
    (meta) => {
      meta.name = "twitter:description";
      meta.setAttribute("data-exxonim", "twitter:description");
    }
  );
  twitterDescription.content = seo.description;

  const twitterImage = ensureMetaTag('meta[name="twitter:image"]', (meta) => {
    meta.name = "twitter:image";
    meta.setAttribute("data-exxonim", "twitter:image");
  });
  twitterImage.content = seo.image;

  const ogSiteName = ensureMetaTag('meta[property="og:site_name"]', (meta) => {
    meta.setAttribute("property", "og:site_name");
    meta.setAttribute("data-exxonim", "og:site_name");
  });
  ogSiteName.content = "Exxonim Consult";

  const twitterSite = ensureMetaTag('meta[name="twitter:site"]', (meta) => {
    meta.name = "twitter:site";
    meta.setAttribute("data-exxonim", "twitter:site");
  });
  twitterSite.content = "@exxonim";

  const canonicalLink = ensureLinkTag(
    'link[rel="canonical"][data-exxonim="canonical"]',
    (link) => {
      link.rel = "canonical";
      link.setAttribute("data-exxonim", "canonical");
    }
  );
  canonicalLink.href = canonicalUrl;
}
