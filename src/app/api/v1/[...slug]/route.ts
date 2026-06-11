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

/* ═══════════════════════════════════════════════════════════════════════════
 * TRACKING CODE GENERATOR (Mock)
 * ═══════════════════════════════════════════════════════════════════════════
 * BACKEND TEAM (FastAPI): Replace this with the real implementation:
 *
 *   import secrets, string
 *   DIGITS = string.digits          # 0-9
 *   LETTERS = string.ascii_uppercase # A-Z (exclude I, O optionally)
 *   def generate_tracking_code(active_codes: set) -> str:
 *       while True:
 *           digits_part = ''.join(secrets.choice(DIGITS) for _ in range(5))
 *           letter_part = secrets.choice(LETTERS)
 *           code = digits_part + letter_part
 *           if code not in active_codes:
 *               return code
 *
 * Format: 5 digits + 1 uppercase letter = 6 characters total
 * Display format: "11 11 1A" (three groups of 2, space-separated)
 * Storage format: "11111A" (no spaces, uppercase, CHAR(6) UNIQUE)
 *
 * Keyspace: 10^5 × 24 = 2,400,000 (with ambiguous letters I, O excluded)
 * ═══════════════════════════════════════════════════════════════════════════ */
const TRACKING_DIGITS = "0123456789";
const TRACKING_LETTERS = "ABCDEFGHJKLMNPQRSTUVWXYZ"; // 24 chars, no I/O
function generateMockTrackingCode(): string {
  // Generate 4 random digits + 1 random letter
  let code = "";
  for (let i = 0; i < 5; i++) {
    code += TRACKING_DIGITS[Math.floor(Math.random() * TRACKING_DIGITS.length)];
  }
  code += TRACKING_LETTERS[Math.floor(Math.random() * TRACKING_LETTERS.length)];
  return code;
}

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

  // ═══════════════════════════════════════════════════════════════════
  // Public tracking lookup: POST /track
  //
  // BACKEND TEAM (FastAPI): This is the core public endpoint.
  // Spec: POST /api/track  →  { trackingNumber: "84729A" }
  //
  // Response shapes:
  //   200 — ApiTrackingLookupResponse (see consultations.ts)
  //   404 — ApiTrackingNotFoundResponse (generic, no info leakage)
  //
  // RATE LIMITING (enforced by backend):
  //   - Per IP: 20 failed lookups/min → IP blocked 5 min
  //   - Per tracking code: 10 failed attempts total → code locked 24h
  //
  // SECURITY: Always return the same 404 shape for invalid/expired/
  // not-found codes. Never distinguish "code doesn't exist" from
  // "code exists but case is closed/blocked".
  // ═══════════════════════════════════════════════════════════════════
  if (path === "track") {
    let body: { trackingNumber?: string };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { status: "not_found", message: "No matching consultation found. Please check your tracking number." },
        { status: 404 }
      );
    }

    const raw = (body.trackingNumber ?? "").replace(/\s/g, "").toUpperCase();
    // Format: 5 digits followed by 1 uppercase letter (e.g., "11111A")
    const isValid = /^[0-9]{5}[A-Z]$/.test(raw);

    if (!isValid) {
      return NextResponse.json(
        { status: "not_found", message: "No matching consultation found. Please check your tracking number." },
        { status: 404 }
      );
    }

    /* ── Mock demo data ──────────────────────────────────────────────
     * BACKEND: Replace this entire block with a real database query:
     *
     *   case = db.query("SELECT * FROM cases WHERE tracking_code = $1 AND status != 'closed'", [raw])
     *   if not case:
     *       return 404 { status: "not_found", message: "..." }
     *
     *   milestones = db.query("""
     *       SELECT m.name, m.client_label, m.visible_to_client, cm.completed_at
     *       FROM milestones m
     *       LEFT JOIN case_milestones cm ON cm.milestone_id = m.id AND cm.case_id = $1
     *       WHERE m.service_type = $2
     *       ORDER BY m.sequence_order ASC
     *   """, [case.id, case.service_type])
     *
     *   visible = [m for m in milestones if m.visible_to_client]
     *   ─────────────────────────────────────────────────────────────── */
    const mockCases: Record<string, {
      status: "active" | "completed" | "on_hold";
      serviceType: string;
      milestone: string;
      lastUpdated: string;
      nextMilestone: string | null;
      message?: string;
      completedSteps: number;
      totalSteps: number;
      visibleMilestones: Array<{ label: string; status: "completed" | "current" | "upcoming"; date: string | null }>;
    }> = {
      // Demo codes — format: 5 digits + 1 letter (e.g., "11111A")
      // Display format: "11 11 1A" (three groups of 2, space-separated)
      "11111A": {
        status: "active",
        serviceType: "Company Registration",
        milestone: "Document Verification",
        lastUpdated: "2026-06-04T09:42:00Z",
        nextMilestone: "Submission to BRELA",
        completedSteps: 3,
        totalSteps: 6,
        visibleMilestones: [
          { label: "Consultation Received", status: "completed", date: "2026-05-20" },
          { label: "Name Clearance Filed", status: "completed", date: "2026-05-22" },
          { label: "Name Approved", status: "completed", date: "2026-05-28" },
          { label: "Document Verification", status: "current", date: null },
          { label: "Submission to BRELA", status: "upcoming", date: null },
          { label: "Certificate Issued", status: "upcoming", date: null },
        ],
      },
      "22222A": {
        status: "completed",
        serviceType: "TIN Application",
        milestone: "All processes completed",
        lastUpdated: "2026-05-30T14:30:00Z",
        nextMilestone: null,
        message: "Your TIN application is complete. Contact us if you have any questions.",
        completedSteps: 4,
        totalSteps: 4,
        visibleMilestones: [
          { label: "Consultation Received", status: "completed", date: "2026-05-10" },
          { label: "Document Preparation", status: "completed", date: "2026-05-15" },
          { label: "TRA Submission", status: "completed", date: "2026-05-22" },
          { label: "TIN Certificate Issued", status: "completed", date: "2026-05-30" },
        ],
      },
      "33333A": {
        status: "on_hold",
        serviceType: "Business Licensing",
        milestone: "Awaiting Client Documents",
        lastUpdated: "2026-06-01T11:00:00Z",
        nextMilestone: "Document Verification",
        message: "Your consultation is on hold pending additional documents. Please check your WhatsApp for details.",
        completedSteps: 1,
        totalSteps: 5,
        visibleMilestones: [
          { label: "Consultation Received", status: "completed", date: "2026-05-25" },
          { label: "Awaiting Client Documents", status: "current", date: null },
          { label: "Document Verification", status: "upcoming", date: null },
          { label: "Licence Application", status: "upcoming", date: null },
          { label: "Licence Issued", status: "upcoming", date: null },
        ],
      },
      "44444A": {
        status: "active",
        serviceType: "Work Permit Application",
        milestone: "Labour Committee Review",
        lastUpdated: "2026-06-03T16:15:00Z",
        nextMilestone: "Immigration Submission",
        completedSteps: 4,
        totalSteps: 7,
        visibleMilestones: [
          { label: "Consultation Received", status: "completed", date: "2026-05-12" },
          { label: "Document Collection", status: "completed", date: "2026-05-14" },
          { label: "Employer Verification", status: "completed", date: "2026-05-20" },
          { label: "Labour Committee Review", status: "current", date: null },
          { label: "Immigration Submission", status: "upcoming", date: null },
          { label: "Permit Approval", status: "upcoming", date: null },
          { label: "Permit Issued", status: "upcoming", date: null },
        ],
      },
    };

    const mockCase = mockCases[raw];
    if (!mockCase) {
      return NextResponse.json(
        { status: "not_found", message: "No matching consultation found. Please check your tracking number." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: mockCase.status,
      trackingCode: raw,
      serviceType: mockCase.serviceType,
      milestone: mockCase.milestone,
      lastUpdated: mockCase.lastUpdated,
      nextMilestone: mockCase.nextMilestone,
      message: mockCase.message ?? null,
      completedSteps: mockCase.completedSteps,
      totalSteps: mockCase.totalSteps,
      visibleMilestones: mockCase.visibleMilestones,
    });
  }

  // Consultations: /consultations
  //
  // BACKEND TEAM (FastAPI): When a consultation is created via the public
  // contact form, generate a tracking code (5 digits + 1 letter).
  // The code is sent to the client via WhatsApp:
  //   "Your tracking number is 84 72 9A. Check your file status anytime at exxonim.tz/track."
  //
  // Also send via email if the client provided one.
  //
  // Database: INSERT INTO cases (tracking_code, ...) VALUES (generate_tracking_code(active_codes), ...)
  if (path === "consultations") {
    const trackingCode = generateMockTrackingCode();
    return NextResponse.json({
      consultation_id: Math.floor(Math.random() * 9000 + 1000),
      service_request_id: `sr-${Date.now()}`,
      tracking_id: trackingCode,
      /**
       * BACKEND: The tracking_id field is now a 6-character code (5 digits + 1 letter).
       * Format: CHAR(6), uppercase, no spaces in storage. Example: "84729A"
       * Display format: "84 72 9A" (three groups of 2, space-separated).
       * The frontend formats this for display automatically.
       */
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
