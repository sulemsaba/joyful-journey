import { NextRequest, NextResponse } from "next/server";
import {
  fallbackBrand,
  fallbackCompanyInfo,
  fallbackFooter,
} from "@/exxonim/content/fallbackShell";
import {
  fallbackAboutPage,
  fallbackBlogCategories,
  fallbackBlogPosts,
  fallbackCareerPage,
  fallbackContactPage,
  fallbackCookiePage,
  fallbackDataRightsPage,
  fallbackFaqPage,
  fallbackHomePage,
  fallbackJobs,
  fallbackPrivacyPage,
  fallbackResourcesPage,
  fallbackServicesPage,
  fallbackTermsPage,
  fallbackSupportPage,
  fallbackTrackConsultationPage,
} from "@/exxonim/content/fallbackPublicContent";
import { db } from "@/lib/db";

const FALLBACK_TIMESTAMP = "2026-01-01T00:00:00Z";

/* ── Site settings ────────────────────────────────────── */
const siteSettingsMap: Record<string, object> = {
  brand: {
    id: 1,
    key: "brand",
    value: {
      name: fallbackBrand.name,
      companyShortName: "Exxonim",
      tagline: "Business consulting for registration, licensing, compliance, and operational advisory.",
      lightLogoSrc: fallbackBrand.lightLogoSrc,
      darkLogoSrc: fallbackBrand.darkLogoSrc,
      brandColors: { primary: "#0f5c63", secondary: "#7fbcc1" },
    },
    created_at: FALLBACK_TIMESTAMP,
    updated_at: FALLBACK_TIMESTAMP,
  },
  company_info: {
    id: 2,
    key: "company_info",
    value: {
      name: fallbackCompanyInfo.name,
      legalCompanyName: fallbackCompanyInfo.name,
      companyShortName: "Exxonim",
      phones: fallbackCompanyInfo.phones,
      emails: fallbackCompanyInfo.emails,
      address: fallbackCompanyInfo.address,
      whatsapp: fallbackCompanyInfo.whatsapp,
    },
    created_at: FALLBACK_TIMESTAMP,
    updated_at: FALLBACK_TIMESTAMP,
  },
  footer: {
    id: 3,
    key: "footer",
    value: fallbackFooter,
    created_at: FALLBACK_TIMESTAMP,
    updated_at: FALLBACK_TIMESTAMP,
  },
  seo_defaults: {
    id: 4,
    key: "seo_defaults",
    value: {
      canonicalBaseUrl: "https://exxonim.tz",
      defaultMetaDescription:
        "Exxonim Company Limited helps organizations move through entity setup, tax and licensing, statutory filings, and operational compliance — with automated updates at every milestone.",
      defaultShareImageUrl: null,
      robotsIndex: true,
      robotsFollow: true,
    },
    created_at: FALLBACK_TIMESTAMP,
    updated_at: FALLBACK_TIMESTAMP,
  },
};

/* ── Pages ────────────────────────────────────────────── */
const pageMap: Record<string, object> = {
  home: toApiPage(fallbackHomePage),
  about: toApiPage(fallbackAboutPage),
  services: toApiPage(fallbackServicesPage),
  resources: toApiPage(fallbackResourcesPage),
  career: toApiPage(fallbackCareerPage),
  contact: toApiPage(fallbackContactPage),
  faq: toApiPage(fallbackFaqPage),
  privacy: toApiPage(fallbackPrivacyPage),
  terms: toApiPage(fallbackTermsPage),
  cookies: toApiPage(fallbackCookiePage),
  "data-rights": toApiPage(fallbackDataRightsPage),
  support: toApiPage(fallbackSupportPage),
  "track-consultation": toApiPage(fallbackTrackConsultationPage),
};

function toApiPage(page: { id: number; title: string; slug: string; content: unknown; isPublished: boolean; createdAt: string; updatedAt: string }) {
  return {
    id: page.id,
    title: page.title,
    slug: page.slug,
    content: page.content,
    status: "published" as const,
    is_published: true,
    created_at: FALLBACK_TIMESTAMP,
    updated_at: FALLBACK_TIMESTAMP,
  };
}

/* ── Blog posts (API format with snake_case) ──────────── */
function toApiBlogPost(post: (typeof fallbackBlogPosts)[number]) {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    featured_image: post.coverImageSrc ?? null,
    cover_alt: post.coverAlt ?? null,
    media_label: post.mediaLabel ?? null,
    featured_slot: post.featuredSlot ?? null,
    featured_on_home: post.featuredOnHome,
    read_time_minutes: post.readTimeMinutes ?? null,
    related_slugs: post.relatedSlugs ?? [],
    published_at: post.publishedAt ?? null,
    status: "published" as const,
    is_published: true,
    created_at: FALLBACK_TIMESTAMP,
    updated_at: FALLBACK_TIMESTAMP,
    category: post.category
      ? {
          id: 1,
          name: post.category.label,
          slug: post.category.id,
          description: post.category.description ?? null,
          created_at: FALLBACK_TIMESTAMP,
        }
      : null,
    author: post.author
      ? {
          id: 1,
          slug: post.author.id,
          name: post.author.name,
          role: post.author.role ?? null,
          avatar_src: post.author.avatarSrc ?? null,
          bio: post.author.bio ?? null,
        }
      : null,
  };
}

const apiBlogPosts = fallbackBlogPosts.map(toApiBlogPost);

const apiBlogCategories = fallbackBlogCategories.map((cat, i) => ({
  id: i + 1,
  name: cat.label,
  slug: cat.id,
  description: cat.description ?? null,
  created_at: FALLBACK_TIMESTAMP,
}));

/* ── Route handler ────────────────────────────────────── */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  const path = slug.join("/");

  // Site settings: /site-settings/{key}
  if (path.startsWith("site-settings/")) {
    const key = path.replace("site-settings/", "");
    const setting = siteSettingsMap[key];
    if (setting) {
      return NextResponse.json(setting);
    }
    return NextResponse.json({ detail: "Not found" }, { status: 404 });
  }

  // Pages: /pages/{slug}
  if (path.startsWith("pages/")) {
    const pageSlug = path.replace("pages/", "");
    const page = pageMap[pageSlug];
    if (page) {
      return NextResponse.json(page);
    }
    return NextResponse.json({ detail: "Not found" }, { status: 404 });
  }

  // Blog posts list: /blog/posts
  if (path === "blog/posts") {
    return NextResponse.json({
      items: apiBlogPosts,
      total: apiBlogPosts.length,
      page: 1,
      limit: 50,
      pages: 1,
    });
  }

  // Single blog post: /blog/posts/{slug}
  if (path.startsWith("blog/posts/")) {
    const postSlug = path.replace("blog/posts/", "");
    const post = apiBlogPosts.find((p) => p.slug === postSlug);
    if (post) {
      return NextResponse.json(post);
    }
    return NextResponse.json({ detail: "Not found" }, { status: 404 });
  }

  // Blog categories: /blog/categories
  if (path === "blog/categories") {
    return NextResponse.json(apiBlogCategories);
  }

  // Jobs: /jobs
  if (path === "jobs") {
    return NextResponse.json(fallbackJobs);
  }

  // Navigation: /navigation
  if (path === "navigation") {
    return NextResponse.json([]);
  }

  // Testimonials: /testimonials
  if (path === "testimonials") {
    return NextResponse.json([]);
  }

  // Pricing plans: /pricing/plans
  if (path === "pricing/plans") {
    return NextResponse.json({ items: [], total: 0, page: 1, limit: 50, pages: 0 });
  }

  // FAQ items: /faq
  if (path === "faq") {
    try {
      const items = await db.faqItem.findMany({
        where: { is_active: true },
        orderBy: { sort_order: "asc" },
      });
      return NextResponse.json({ items, total: items.length });
    } catch (error) {
      console.error("Failed to fetch FAQ items:", error);
      return NextResponse.json(
        { detail: "Failed to fetch FAQ items" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ detail: "Not found" }, { status: 404 });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  const path = slug.join("/");

  // Consultations: /consultations
  if (path === "consultations") {
    const trackingId = `EXX-${Math.floor(Math.random() * 90000 + 10000)}`;
    return NextResponse.json({
      consultation_id: Math.floor(Math.random() * 9000 + 1000),
      service_request_id: `sr-${Date.now()}`,
      tracking_id: trackingId,
      status: "pending",
      message: "Your consultation request has been received. We will follow up shortly.",
      received_at: new Date().toISOString(),
    });
  }

  // Privacy consent: /privacy/consent
  if (path === "privacy/consent") {
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ detail: "Not found" }, { status: 404 });
}
