module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/joyful-journey/src/exxonim/routes.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Route constants for the Exxonim public website and admin panel.
 *
 * BACKEND / ADMIN INTEGRATION NOTES (FastAPI):
 * ─────────────────────────────────────────────
 * These routes must match the URL patterns defined in the FastAPI router.
 * When the admin creates a new navigation item, the `url` field should
 * reference one of these paths OR be a valid external URL (https://...).
 *
 * IMPORTANT: All internal routes have trailing slashes. The `normalizePathname()`
 * function strips the trailing slash for comparison, so "/about/" and "/about"
 * are treated as the same route.
 *
 * If the admin adds a new page (e.g., "/partners/"), they must also:
 *   1. Add the route constant here.
 *   2. Create a page component in src/exxonim/pages/.
 *   3. Add the route to the `staticRoutes` array in src/exxonim/app/App.tsx.
 *   4. Add fallback content in src/exxonim/content/fallbackPublicContent.ts.
 * The admin UI should provide a warning that new routes require a code deploy
 * unless the page is purely content-driven (fetched from the pages API).
 */ __turbopack_context__.s([
    "getResourcePostSlug",
    ()=>getResourcePostSlug,
    "isPublicAppRoute",
    ()=>isPublicAppRoute,
    "legacyBlogArticlePath",
    ()=>legacyBlogArticlePath,
    "legacyBlogPost",
    ()=>legacyBlogPost,
    "normalizePathname",
    ()=>normalizePathname,
    "resourceArticlePath",
    ()=>resourceArticlePath,
    "resourcePost",
    ()=>resourcePost,
    "routes",
    ()=>routes,
    "staticRoutePaths",
    ()=>staticRoutePaths
]);
const routes = {
    home: "/",
    admin: "/admin/",
    adminLogin: "/admin/login/",
    about: "/about/",
    faq: "/faq/",
    services: "/services/",
    resources: "/resources/",
    blog: "/resources/",
    career: "/career/",
    contact: "/contact/",
    trackConsultation: "/track-consultation/",
    support: "/support/",
    terms: "/terms/",
    privacy: "/privacy/",
    cookies: "/cookies/",
    dataRights: "/data-rights/",
    notFound: "/404/"
};
const staticRoutePaths = Object.values(routes);
function resourceArticlePath(slug) {
    return `${routes.resources}${slug}/`;
}
function resourcePost(slug) {
    return resourceArticlePath(slug);
}
function legacyBlogArticlePath(slug) {
    return `/blog/${slug}/`;
}
function legacyBlogPost(slug) {
    return legacyBlogArticlePath(slug);
}
function normalizePathname(pathname) {
    if (!pathname || pathname === "/") {
        return "/";
    }
    return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}
function getResourcePostSlug(pathname) {
    const normalizedPathname = normalizePathname(pathname);
    const segments = normalizedPathname.split("/").filter(Boolean);
    if (segments.length === 2 && (segments[0] === "resources" || segments[0] === "blog")) {
        return segments[1];
    }
    return null;
}
function isPublicAppRoute(pathname) {
    const normalizedPathname = normalizePathname(pathname);
    if (normalizedPathname === normalizePathname(routes.admin) || normalizedPathname === normalizePathname(routes.adminLogin)) {
        return false;
    }
    return staticRoutePaths.filter((route)=>route !== routes.admin && route !== routes.adminLogin).map((route)=>normalizePathname(route)).includes(normalizedPathname) || Boolean(getResourcePostSlug(normalizedPathname));
}
}),
"[project]/joyful-journey/src/exxonim/content/fallbackShell.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fallbackBrand",
    ()=>fallbackBrand,
    "fallbackCompanyInfo",
    ()=>fallbackCompanyInfo,
    "fallbackFooter",
    ()=>fallbackFooter,
    "fallbackNavigationItems",
    ()=>fallbackNavigationItems
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/routes.ts [app-route] (ecmascript)");
;
/* BACKEND / ADMIN INTEGRATION NOTES:
 * ──────────────────────────────────
 * Asset paths here use Next.js /public/ directory references (string paths).
 * When migrating back to the Vite+React repo, replace these with:
 *   import lightLogo from "@/assets/branding/exxonimLogoLight.webp";
 *   (Vite handles content hashing and dist/ output automatically.)
 *
 * Admin should enforce:
 *   - Light logo: SVG, WebP, or PNG. Min 140×36px, max 280×72px. Aspect ratio ~3.9:1.
 *   - Dark logo: same dimensions. Must be legible on #071518 background.
 *   - Favicon light: 32×32 or 64×64 PNG. Simple design (no fine detail at small size).
 *   - Favicon dark: same. Must be legible on light browser chrome backgrounds.
 *   - All logos should be served via the /media/ API endpoint (admin upload → CDN).
 *     The BrandAssets type in the API response should contain CDN URLs, not /public/ paths.
 */ const lightLogo = "/branding/exxonimLogoLight.webp";
const darkLogo = "/branding/logo-dark.png";
const faviconLight = "/branding/exxonim-favicon-light.png";
const faviconDark = "/branding/exxonim-favicon-dark.png";
/**
 * Shell-level fallback data for navigation, branding, company contact details, and footer links.
 * These values are loaded before page content so the site chrome remains stable during API outages.
 */ const FALLBACK_TIMESTAMP = "fallback";
function createNavigationItem(id, title, url, order, options) {
    return {
        id,
        title,
        url,
        description: options?.description,
        kind: options?.kind ?? "primary",
        order,
        isActive: true,
        parentId: options?.parentId ?? null,
        createdAt: FALLBACK_TIMESTAMP,
        updatedAt: FALLBACK_TIMESTAMP,
        children: options?.children ?? []
    };
}
const servicesNavigation = createNavigationItem(100, "Services", __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routes"].services, 3, {
    children: [
        createNavigationItem(110, "Business Setup", __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routes"].services, 1, {
            kind: "group",
            parentId: 100,
            children: [
                createNavigationItem(111, "Company Registration", __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routes"].services, 1, {
                    kind: "secondary",
                    parentId: 110
                }),
                createNavigationItem(112, "TIN Application", __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routes"].services, 2, {
                    kind: "secondary",
                    parentId: 110
                }),
                createNavigationItem(113, "Business License Applications", __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routes"].services, 3, {
                    kind: "secondary",
                    parentId: 110
                })
            ]
        }),
        createNavigationItem(120, "Compliance Support", __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routes"].services, 2, {
            kind: "group",
            parentId: 100,
            children: [
                createNavigationItem(121, "Statutory Filings", __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routes"].services, 1, {
                    kind: "secondary",
                    parentId: 120
                }),
                createNavigationItem(122, "Regulatory Renewals", __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routes"].services, 2, {
                    kind: "secondary",
                    parentId: 120
                }),
                createNavigationItem(123, "Operational Advisory", __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routes"].services, 3, {
                    kind: "secondary",
                    parentId: 120
                })
            ]
        })
    ]
});
const resourcesNavigation = createNavigationItem(200, "Resources", __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routes"].resources, 4, {
    children: [
        createNavigationItem(210, "Guides", __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routes"].resources, 1, {
            kind: "group",
            parentId: 200,
            children: [
                createNavigationItem(211, "Blog", __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routes"].resources, 1, {
                    kind: "secondary",
                    parentId: 210
                }),
                createNavigationItem(212, "FAQ", __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routes"].faq, 2, {
                    kind: "secondary",
                    parentId: 210
                }),
                createNavigationItem(213, "Support", __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routes"].support, 3, {
                    kind: "secondary",
                    parentId: 210
                })
            ]
        })
    ]
});
const fallbackBrand = {
    name: "Exxonim",
    lightLogoSrc: lightLogo,
    darkLogoSrc: darkLogo
};
const fallbackCompanyInfo = {
    name: "Exxonim Company Limited",
    phones: [
        "+255 794 689 099",
        "+255 685 525 224"
    ],
    emails: [
        "info@exxonim.tz",
        "md@exxonim.tz"
    ],
    address: "House No. 9, Block H, Mbezi Beach B, Africana, Bagamoyo Road, Dar es Salaam, Tanzania",
    whatsapp: "https://wa.me/255794689099"
};
const fallbackNavigationItems = [
    createNavigationItem(0, "Home", __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routes"].home, 0),
    createNavigationItem(1, "About", __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routes"].about, 1),
    servicesNavigation,
    resourcesNavigation,
    createNavigationItem(5, "Career", __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routes"].career, 5),
    createNavigationItem(6, "Contact", __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routes"].contact, 6),
    createNavigationItem(7, "Track Consultation", __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routes"].trackConsultation, 7)
];
const fallbackFooter = {
    quick_links: [
        {
            label: "About Us",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routes"].about
        },
        {
            label: "Services",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routes"].services
        },
        {
            label: "Track Consultation",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routes"].trackConsultation
        },
        {
            label: "Careers",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routes"].career
        }
    ],
    other_resources: [
        {
            label: "Blog",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routes"].resources
        },
        {
            label: "FAQ",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routes"].faq
        },
        {
            label: "Support",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routes"].support
        },
        {
            label: "Privacy Policy",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routes"].privacy
        },
        {
            label: "Terms of Service",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routes"].terms
        }
    ],
    tagline: "Business consulting for registration, licensing, compliance, and operational advisory — with proactive tracking at every step.",
    primary_cta: {
        label: "Contact Exxonim",
        href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routes"].contact
    },
    social_links: [
        {
            platform: "linkedin",
            label: "LinkedIn",
            url: "https://www.linkedin.com/company/exxonim",
            isActive: true
        },
        {
            platform: "instagram",
            label: "Instagram",
            url: "https://www.instagram.com/exxonimtz",
            isActive: true
        },
        {
            platform: "x",
            label: "X",
            url: "https://x.com/exxonimtz",
            isActive: true
        }
    ],
    /* The year range is rendered dynamically in Footer.tsx using the current year.
   * This fallback string uses a {YEAR} placeholder that Footer replaces at render time. */ copyright: "Copyright © {YEAR} Exxonim Co Ltd, All Rights Reserved."
};
}),
"[project]/joyful-journey/src/exxonim/content/fallbackPublicContent.ts [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fallbackAboutPage",
    ()=>fallbackAboutPage,
    "fallbackBlogCategories",
    ()=>fallbackBlogCategories,
    "fallbackBlogPosts",
    ()=>fallbackBlogPosts,
    "fallbackBrandSetting",
    ()=>fallbackBrandSetting,
    "fallbackCareerPage",
    ()=>fallbackCareerPage,
    "fallbackCompanyInfoSetting",
    ()=>fallbackCompanyInfoSetting,
    "fallbackContactPage",
    ()=>fallbackContactPage,
    "fallbackCookiePage",
    ()=>fallbackCookiePage,
    "fallbackDataRightsPage",
    ()=>fallbackDataRightsPage,
    "fallbackFaqPage",
    ()=>fallbackFaqPage,
    "fallbackFooterSetting",
    ()=>fallbackFooterSetting,
    "fallbackHomePage",
    ()=>fallbackHomePage,
    "fallbackJobs",
    ()=>fallbackJobs,
    "fallbackPricingPlans",
    ()=>fallbackPricingPlans,
    "fallbackPrivacyPage",
    ()=>fallbackPrivacyPage,
    "fallbackResourcesPage",
    ()=>fallbackResourcesPage,
    "fallbackServicesPage",
    ()=>fallbackServicesPage,
    "fallbackSupportPage",
    ()=>fallbackSupportPage,
    "fallbackTermsPage",
    ()=>fallbackTermsPage,
    "fallbackTestimonials",
    ()=>fallbackTestimonials,
    "fallbackTrackConsultationPage",
    ()=>fallbackTrackConsultationPage,
    "getFallbackPage",
    ()=>getFallbackPage,
    "getFallbackSiteSetting",
    ()=>getFallbackSiteSetting
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/content/fallbackShell.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/routes.ts [app-route] (ecmascript)");
;
;
const utecLogo = "/clients/utec.webp";
const trcsLogo = "/clients/trcs.webp";
const levoLogo = "/clients/levo.webp";
const getLogo = "/clients/get.webp";
const lightLogo = "/branding/exxonimLogoLight.webp";
const darkLogo = "/branding/logo-dark.png";
/* BACKEND / ADMIN INTEGRATION NOTES (Blog cover images):
 * ─────────────────────────────────────────────────────
 * Blog cover images are served from /public/blog/ during development.
 * In production, they will come from the database via the /media/ API endpoint
 * (admin upload → CDN). The admin should enforce:
 *   - Format: WebP preferred (better compression, supports transparency).
 *   - Minimum dimensions: 1344×768px (16:9 landscape for hero cards).
 *   - Aspect ratio: 16:9 for hero/featured cards, 16:10 for grid cards.
 *     The image will be cropped via object-cover in CSS, so the key subject
 *     should be centered with some margin on all sides.
 *   - File size: max 500KB per image (WebP at 1344×768 typically 80-200KB).
 *   - Alt text: Every cover image MUST have a descriptive `coverAlt` string
 *     for accessibility. The admin should make this a required field.
 *   - Author avatars: 96×96px minimum, square, WebP or PNG.
 *     Displayed as a 38px circle (rounded-full) so center the subject.
 *
 * Database schema suggestion for blog posts:
 *   TABLE blog_posts (
 *     id              SERIAL PRIMARY KEY,
 *     slug            VARCHAR(255) UNIQUE NOT NULL,
 *     title           VARCHAR(255) NOT NULL,
 *     excerpt         TEXT NOT NULL,
 *     cover_image_url VARCHAR(512),        -- CDN URL from /media/ upload
 *     cover_alt       VARCHAR(255),        -- Accessibility description
 *     media_label     VARCHAR(255),        -- Short overlay text on hero cards
 *     published_at    TIMESTAMPTZ NOT NULL,
 *     category_id     INTEGER REFERENCES blog_categories(id),
 *     author_id       INTEGER REFERENCES blog_authors(id),
 *     featured_slot   VARCHAR(50),          -- 'hero' | 'popular' | 'editors-pick' | NULL
 *     featured_on_home BOOLEAN DEFAULT FALSE,
 *     read_time_minutes INTEGER,
 *     is_published    BOOLEAN DEFAULT TRUE,
 *     created_at      TIMESTAMPTZ DEFAULT NOW(),
 *     updated_at      TIMESTAMPTZ DEFAULT NOW()
 *   );
 *
 *   TABLE blog_authors (
 *     id              SERIAL PRIMARY KEY,
 *     name            VARCHAR(255) NOT NULL,
 *     role            VARCHAR(255),
 *     avatar_url      VARCHAR(512),         -- CDN URL from /media/ upload
 *     bio             TEXT,
 *     created_at      TIMESTAMPTZ DEFAULT NOW()
 *   );
 */ const blogCoverRegistration = "/blog/company-registration-basics.webp";
const blogCoverTin = "/blog/tin-registration-checklist.webp";
const blogCoverLicensing = "/blog/licensing-renewal-prep.webp";
const blogCoverCalendar = "/blog/compliance-calendar-basics.webp";
const blogCoverTimeline = "/blog/business-registration-timeline.webp";
const blogCoverNgo = "/blog/ngo-registration-guide.webp";
const blogCoverBizName = "/blog/business-name-registration.webp";
const blogCoverTaxReturn = "/blog/tax-return-preparation.webp";
const blogCoverRegulatory = "/blog/regulatory-compliance-framework.webp";
const blogCoverAnnualReturn = "/blog/annual-return-filing.webp";
const blogCoverImportExport = "/blog/import-export-licensing.webp";
const blogCoverBankAccount = "/blog/business-bank-account-setup.webp";
const blogCoverTraObligations = "/blog/tra-tax-obligations.webp";
const blogCoverPartnership = "/blog/partnership-registration.webp";
const blogCoverWorkPermit = "/blog/work-permit-foreign-investors.webp";
const blogCoverDigital = "/blog/digital-business-compliance.webp";
/**
 * Public API fallback records used when live content cannot be reached.
 * Keep these objects aligned with the domain types so page rendering still works offline.
 */ const FALLBACK_RECORD_ID = 0;
const FALLBACK_TIMESTAMP = "fallback";
function createFallbackPage(slug, title, content) {
    return {
        id: FALLBACK_RECORD_ID,
        title,
        slug,
        content,
        isPublished: true,
        createdAt: FALLBACK_TIMESTAMP,
        updatedAt: FALLBACK_TIMESTAMP
    };
}
function createFallbackSiteSetting(key, value) {
    return {
        id: FALLBACK_RECORD_ID,
        key,
        value,
        createdAt: FALLBACK_TIMESTAMP,
        updatedAt: FALLBACK_TIMESTAMP
    };
}
const fallbackBlogCategories = [
    {
        id: "business-setup",
        label: "Business Setup",
        description: "Foundational guidance for registrations, filings, and first-step compliance."
    },
    {
        id: "compliance",
        label: "Compliance",
        description: "Practical reminders and process notes for recurring obligations."
    },
    {
        id: "operations",
        label: "Operations",
        description: "Operational guidance for teams managing growing workloads and deadlines."
    }
];
function getFallbackCategory(id) {
    return fallbackBlogCategories.find((category)=>category.id === id);
}
const fallbackHomePage = createFallbackPage("home", "Exxonim Company Limited", {
    hero: {
        eyebrow: "Business consulting — Tanzania",
        title: "Registration, licensing, compliance, and proactive tracking for organizations that need clarity.",
        description: "Exxonim Company Limited helps organizations move through entity setup, tax and licensing, statutory filings, and operational compliance — with automated updates at every milestone so you never have to guess where your case stands.",
        cta: {
            label: "Contact Exxonim",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routes"].contact
        },
        highlights: [
            {
                title: "Entity Setup",
                detail: "Company, NGO, business name, and foreign investor registration"
            },
            {
                title: "Tax & Licensing",
                detail: "TIN, VAT, business licences, and sector-specific permits"
            },
            {
                title: "Proactive Tracking",
                detail: "Automated updates at every milestone — no need to call and ask"
            }
        ]
    },
    provider_section: {
        kicker: "Trusted workflow references",
        title: "Recognised by organisations and partners across the region.",
        logos: [
            {
                alt: "Utec",
                src: utecLogo
            },
            {
                alt: "TRCS",
                src: trcsLogo
            },
            {
                alt: "Levo",
                src: levoLogo
            },
            {
                alt: "GET",
                src: getLogo
            }
        ]
    },
    stack_section: {
        items: [
            {
                title: "Start with the right entity setup",
                subtitle: "Company, NGO, business name, or foreign investor registration — guided from start to certificate.",
                description: "Every registration journey starts with the correct entity type, ownership structure, and document set. Exxonim guides you through the sequence so the process does not stall later.",
                ctaLabel: "Discuss your case",
                ctaHref: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routes"].contact,
                windowTitle: "Setup",
                windowTag: "Guide",
                videoSrc: ""
            },
            {
                title: "Keep tax and licensing work on track",
                subtitle: "TIN, VAT, business licences, sector permits, and work permits — managed through a clear workflow.",
                description: "A practical approach to tax registration, licensing applications, and regulatory follow-through — so your team can focus on operations instead of chasing approvals.",
                ctaLabel: "Explore services",
                ctaHref: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routes"].services,
                windowTitle: "Compliance",
                windowTag: "Guide",
                videoSrc: ""
            },
            {
                title: "Track every consultation — automatically",
                subtitle: "Proactive updates at every milestone. You never need to call and ask what is happening.",
                description: "Upon engagement, you receive a unique tracking number. At every key milestone — name clearance, document submission, approval, issuance — Exxonim sends you an update via WhatsApp, email, or SMS. You can also look up your status on the website anytime, no login required.",
                ctaLabel: "Track a consultation",
                ctaHref: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routes"].trackConsultation,
                windowTitle: "Tracking",
                windowTag: "Guide",
                videoSrc: ""
            }
        ],
        default_feature_rows: [
            {
                title: "Entity registration",
                description: "Company, NGO, business name, and foreign investor setup.",
                visualKey: "registration"
            },
            {
                title: "Tax & licensing",
                description: "TIN, VAT, business licences, work permits, and sector approvals.",
                visualKey: "tax"
            },
            {
                title: "Proactive tracking",
                description: "Automated milestone updates — WhatsApp, email, or SMS.",
                visualKey: "institutional"
            }
        ],
        feature_visual_content: {
            registration: {
                workstreamValue: "Registration",
                counterpartLabel: "Client",
                counterpartValue: "Organization setup",
                focusValue: "Setup path",
                summaryTitle: "Clear process from start to submission.",
                summaryBody: "Exxonim provides structured guidance through entity registration, document preparation, and authority submissions — including TIC/TISEZA investment registration for foreign investors."
            },
            tax: {
                workstreamValue: "Compliance",
                counterpartLabel: "Client",
                counterpartValue: "Ongoing obligations",
                focusValue: "Filings and renewals",
                summaryTitle: "Stay ahead of filing deadlines.",
                summaryBody: "A practical compliance framework covering TIN, VAT, business licences, work permits, and sector-specific permits — with renewal reminders built in."
            },
            institutional: {
                workstreamValue: "Operations",
                counterpartLabel: "Client",
                counterpartValue: "Always informed",
                focusValue: "Proactive updates, compliance calendar, advisory",
                summaryTitle: "Professional support when you need it.",
                summaryBody: "Automated updates at every milestone, compliance calendar management, and operational advisory packages — monthly or quarterly retainer support available."
            },
            tracking: {
                workstreamValue: "Consultation tracking",
                counterpartLabel: "Reference",
                counterpartValue: "EXX-24091",
                focusValue: "Status checkpoints, proactive updates, and next actions",
                summaryTitle: "Know what is complete and what comes next — automatically.",
                summaryBody: "Every engagement gets a unique tracking number. You receive proactive updates via your preferred channel at every milestone, and can look up your status on the website anytime."
            }
        }
    },
    insights_section: {
        title: "Latest insights",
        intro: "Practical guidance for registration, compliance, and operational planning.",
        footer_copy: "Explore more practical articles from our resource library."
    }
});
const fallbackAboutPage = createFallbackPage("about", "About Exxonim", {
    hero: {
        eyebrow: "About Exxonim Company Limited",
        title: "Business consulting built on clarity, follow-through, and proactive communication.",
        description: "Founded in 2020, Exxonim Company Limited helps businesses, NGOs, and institutions move through registration, licensing, and regulatory compliance — with automated tracking that keeps you informed at every milestone."
    },
    company_profile: {
        eyebrow: "Who we are",
        title: "A Tanzanian advisory practice built around real operational outcomes.",
        paragraphs: [
            "Exxonim was founded to address a specific gap: organisations in Tanzania often face unclear processes, missed deadlines, and avoidable delays when navigating registration, licensing, and compliance obligations.",
            "The practice provides structured guidance through entity registration, document preparation, tax applications, licensing, and recurring regulatory follow-up — so teams can focus on operations instead of deadline recovery.",
            "Every engagement is tracked from intake to resolution, and the next action stays visible at every stage."
        ],
        working_style_label: "Working style",
        working_style: "Structured, visible, and follow-through oriented."
    },
    support_profiles_section: {
        title: "What we support",
        description: "Exxonim provides guidance across the main operational areas where organisations need reliable follow-through."
    },
    support_profiles: [
        {
            title: "Business setup",
            description: "Company, NGO, and business-name registration support — from entity type selection through to authority submission."
        },
        {
            title: "Compliance",
            description: "Licensing, renewals, and practical filing follow-up so recurring obligations do not become last-minute recovery work."
        },
        {
            title: "Consultation tracking",
            description: "Every consultation is assigned a reference ID and tracked from intake to resolution. You always know what is complete and what comes next."
        }
    ],
    service_scope_section: {
        title: "Service scope",
        description: "The areas where Exxonim provides direct, structured support."
    },
    service_scope: [
        {
            title: "Company registration",
            description: "Incorporation, entity type guidance, and first-step authority submissions for companies, NGOs, and business names."
        },
        {
            title: "TIN and tax registration",
            description: "Tax Identification Number applications and related account setup for new and existing entities."
        },
        {
            title: "Business licensing",
            description: "License applications, renewals, and regulatory approval support managed through a clear workflow."
        },
        {
            title: "Statutory filings",
            description: "Recurring filing obligations tracked, prepared, and submitted on schedule."
        },
        {
            title: "Regulatory renewals",
            description: "Proactive tracking and timely processing of renewals so obligations do not lapse."
        },
        {
            title: "Operational advisory",
            description: "Structured guidance on process, sequence, and follow-up for teams managing multiple obligations."
        }
    ],
    operating_model_section: {
        title: "How we work",
        description: "A simple, repeatable approach that keeps every engagement visible and on track."
    },
    operating_model: [
        {
            step: "01",
            title: "Intake",
            description: "We gather the details, confirm the entity type, and identify the correct filing sequence for your case."
        },
        {
            step: "02",
            title: "Preparation",
            description: "Documents are reviewed, requirements confirmed, and the submission path is mapped before anything is filed."
        },
        {
            step: "03",
            title: "Submission",
            description: "Your application is submitted to the relevant authority with supporting documents prepared and attached."
        },
        {
            step: "04",
            title: "Follow-through",
            description: "We track the status, follow up on queries, and confirm the outcome so you know where things stand."
        }
    ],
    client_expectations_section: {
        title: "What to expect",
        description: "How working with Exxonim looks in practice."
    },
    client_expectations: [
        "A clear process from the first conversation to the final delivery.",
        "A reference ID to track your consultation at every stage.",
        "Proactive follow-up so deadlines do not become surprises.",
        "Direct communication when you need to know what comes next.",
        "Structured support that fits the way your team actually works."
    ],
    cta: {
        title: "Ready to get started?",
        description: "Reach out and Exxonim will guide you through the next step for your registration, licensing, or compliance need.",
        primary: {
            label: "Contact Exxonim",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routes"].contact
        },
        secondary: {
            label: "Explore services",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routes"].services
        }
    }
});
const fallbackFaqPage = createFallbackPage("faq", "FAQ", {
    hero: {
        eyebrow: "Common questions",
        title: "Frequently asked questions",
        description: "Practical answers to the questions organisations ask most often about registration, compliance, and working with Exxonim."
    },
    items: [
        {
            question: "What types of entities can Exxonim help register?",
            answer: "Exxonim supports registration for companies, NGOs, and business names. The team guides you through entity type selection, document preparation, and authority submission."
        },
        {
            question: "How long does company registration take?",
            answer: "Timelines depend on the entity type and authority processing speed. Exxonim tracks every submission and follows up proactively so you always know where things stand."
        },
        {
            question: "What is a TIN and do I need one?",
            answer: "A Tax Identification Number is required for most registered entities in Tanzania. Exxonim handles TIN applications as part of the setup process."
        },
        {
            question: "Can I track the status of my consultation?",
            answer: "Yes. Every consultation is assigned a reference ID. You can use it to check what is complete, what is pending, and what comes next at every stage."
        },
        {
            question: "What happens after I submit a request?",
            answer: "The Exxonim team reviews your case, confirms the required documents, and prepares the filing sequence. You receive a reference ID to track progress throughout."
        },
        {
            question: "Does Exxonim handle licensing renewals?",
            answer: "Yes. Exxonim tracks renewal deadlines, prepares the required documents, and submits renewals on your behalf so obligations do not lapse."
        }
    ]
});
const fallbackServicesPage = createFallbackPage("services", "Services", {
    overview: {
        eyebrow: "Our services",
        title: "Registration, licensing, and compliance support — structured and followed through.",
        description: "Exxonim provides practical guidance across the main operational areas where organisations need reliable follow-through, from first registration to recurring obligations.",
        panel_title: "Structured support from start to finish",
        panel_body: "Every engagement is tracked from intake to resolution. You always know what is complete, what is pending, and what comes next.",
        service_signals: [
            {
                value: "3+",
                label: "Service areas",
                detail: "Registration, compliance, and tracking"
            },
            {
                value: "100%",
                label: "Tracked",
                detail: "Every consultation assigned a reference ID"
            },
            {
                value: "4",
                label: "Steps",
                detail: "Intake, preparation, submission, follow-through"
            }
        ],
        service_nav_groups: [
            {
                title: "Business Setup",
                summary: "Registration support for companies, NGOs, and business names.",
                href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routes"].services,
                items: [
                    "Company Registration",
                    "TIN Application",
                    "Business License Applications"
                ]
            },
            {
                title: "Compliance Support",
                summary: "Recurring filings, renewals, and regulatory follow-up.",
                href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routes"].services,
                items: [
                    "Statutory Filings",
                    "Regulatory Renewals",
                    "Operational Advisory"
                ]
            },
            {
                title: "Consultation Tracking",
                summary: "Track every consultation from intake to resolution.",
                href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routes"].trackConsultation,
                items: [
                    "Reference ID assignment",
                    "Status tracking",
                    "Follow-up management"
                ]
            }
        ],
        service_flow: [
            {
                step: "01",
                title: "Intake",
                detail: "We confirm the entity type, document requirements, and filing sequence."
            },
            {
                step: "02",
                title: "Preparation",
                detail: "Documents are reviewed and the submission path is mapped before filing."
            },
            {
                step: "03",
                title: "Submission",
                detail: "Your application is submitted to the relevant authority with supporting documents."
            },
            {
                step: "04",
                title: "Follow-through",
                detail: "We track the status, follow up, and confirm the outcome."
            }
        ],
        service_promises: [
            "Every case is tracked with a reference ID.",
            "Proactive follow-up on deadlines and queries.",
            "Clear communication at every stage.",
            "Structured support that fits how your team works."
        ]
    },
    catalog: {
        eyebrow: "Service catalog",
        title: "What Exxonim covers",
        description: "A structured overview of the registration, licensing, and compliance services available.",
        service_groups: [
            {
                title: "Business Setup",
                description: "End-to-end registration support for new entities.",
                services: [
                    {
                        id: "company-registration",
                        label: "Company Registration",
                        detail: "Incorporation and first-step authority submissions."
                    },
                    {
                        id: "ngo-registration",
                        label: "NGO Registration",
                        detail: "Non-profit entity setup and compliance baseline."
                    },
                    {
                        id: "tin-application",
                        label: "TIN Application",
                        detail: "Tax Identification Number registration and account setup."
                    },
                    {
                        id: "business-license",
                        label: "Business License Applications",
                        detail: "License applications and regulatory approvals."
                    }
                ]
            },
            {
                title: "Compliance Support",
                description: "Ongoing obligations managed with clear follow-through.",
                services: [
                    {
                        id: "statutory-filings",
                        label: "Statutory Filings",
                        detail: "Recurring filing obligations prepared and submitted on schedule."
                    },
                    {
                        id: "regulatory-renewals",
                        label: "Regulatory Renewals",
                        detail: "Proactive tracking and timely processing of renewals."
                    },
                    {
                        id: "operational-advisory",
                        label: "Operational Advisory",
                        detail: "Structured guidance for teams managing multiple obligations."
                    }
                ]
            },
            {
                title: "Consultation Tracking",
                description: "Visibility from intake to resolution.",
                services: [
                    {
                        id: "tracking",
                        label: "Track Your Consultation",
                        detail: "Reference ID-based tracking for every active case."
                    },
                    {
                        id: "status-updates",
                        label: "Status Updates",
                        detail: "Know what is complete, pending, and next at every stage."
                    },
                    {
                        id: "follow-up",
                        label: "Follow-Up Management",
                        detail: "Proactive follow-up with authorities on your behalf."
                    }
                ]
            }
        ]
    },
    tracking_section: {
        eyebrow: "Consultation tracking",
        title: "Track every consultation from intake to resolution",
        description: "Every consultation is assigned a unique reference ID. You can see what is complete, what is pending, and what comes next at every stage.",
        checkpoints: [
            {
                title: "Intake",
                detail: "Case details confirmed, reference ID assigned.",
                status: "complete"
            },
            {
                title: "Review",
                detail: "Documents verified, filing sequence prepared.",
                status: "complete"
            },
            {
                title: "Submission",
                detail: "Application filed with the relevant authority.",
                status: "in_progress"
            },
            {
                title: "Resolution",
                detail: "Outcome confirmed, documents delivered.",
                status: "pending"
            }
        ],
        case_examples: [
            {
                title: "Company Registration",
                detail: "EXX-24091 — In submission phase"
            },
            {
                title: "TIN Application",
                detail: "EXX-24088 — Resolved, TIN issued"
            }
        ],
        workflow_steps: [
            {
                title: "Request submitted",
                detail: "Client reaches out, Exxonim logs the inquiry."
            },
            {
                title: "Review and preparation",
                detail: "Team confirms documents and filing path."
            },
            {
                title: "Authority submission",
                detail: "Application is filed with the relevant body."
            },
            {
                title: "Resolution and delivery",
                detail: "Outcome confirmed, final documents delivered."
            }
        ]
    }
});
const fallbackResourcesPage = createFallbackPage("resources", "Resources", {
    hero_title: "Guides, updates, and practical notes for setup and compliance work",
    trending_label: "Trending reads",
    top_media: {
        hero: blogCoverRegistration,
        banner: blogCoverTin,
        trending: [
            blogCoverLicensing,
            blogCoverCalendar,
            blogCoverRegistration
        ]
    },
    article_sidebar: {
        title: "Need direct help?",
        description: "Browse the available articles or contact Exxonim directly for personalised guidance on your specific situation.",
        primary_cta: {
            label: "Contact Exxonim",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routes"].contact
        }
    },
    empty_state: {
        title: "No articles match this filter.",
        description: "Try adjusting your search or filter, or contact Exxonim directly for immediate guidance."
    }
});
const fallbackCareerPage = createFallbackPage("career", "Careers", {
    hero: {
        eyebrow: "Join the team",
        title: "Build your career at Exxonim.",
        description: "Explore current opportunities and learn about the teams Exxonim is building across client operations, compliance, and advisory work."
    },
    focus_areas: [
        "Client operations and workflow coordination",
        "Regulatory and compliance support",
        "Structured follow-up and document readiness"
    ],
    status: {
        label: "Current opportunities",
        description: "Explore open roles and send your application through the contact page. The Exxonim team reviews every submission.",
        primary: {
            label: "Contact Exxonim",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routes"].contact
        },
        secondary: {
            label: "Browse resources",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routes"].resources
        }
    }
});
const fallbackContactPage = createFallbackPage("contact", "Contact", {
    hero: {
        eyebrow: "Get in touch",
        title: "Reach Exxonim for registration, compliance, and advisory support.",
        description: "Use the contact route that works best for you — email, phone, or WhatsApp — and the Exxonim team will follow up promptly."
    },
    cards: [
        {
            label: "Email",
            value: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fallbackCompanyInfo"].emails[0] ?? "Send an email to Exxonim",
            description: "Best for sending structured details and follow-up questions.",
            action: {
                label: "Email Exxonim",
                href: `mailto:${__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fallbackCompanyInfo"].emails[0] ?? ""}`
            }
        },
        {
            label: "Phone",
            value: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fallbackCompanyInfo"].phones[0] ?? "Call Exxonim directly",
            description: "Use the direct phone path when you need a quick conversation.",
            action: {
                label: "Call Exxonim",
                href: `tel:${(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fallbackCompanyInfo"].phones[0] ?? "").replace(/\s+/g, "")}`
            }
        },
        {
            label: "WhatsApp",
            value: "Direct messaging",
            description: "Send a message through WhatsApp and the team will respond as soon as possible.",
            action: {
                label: "Open WhatsApp",
                href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fallbackCompanyInfo"].whatsapp || __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routes"].contact
            }
        }
    ]
});
const fallbackPrivacyPage = createFallbackPage("privacy", "Privacy Policy", {
    hero: {
        eyebrow: "Privacy notice",
        title: "Customer and service history lives in the database, not in browser cookies.",
        description: "Exxonim uses secure session cookies for admin access, keeps customer and service records in PostgreSQL, and limits browser-side storage to optional preferences like theme memory when you allow it."
    },
    sections: [
        {
            title: "What we store",
            paragraphs: [
                "Customer history, service records, notes, documents, inbox messages, notifications, and audit logs are stored in the backend database.",
                "We do not use cookies as the main source of truth for business records."
            ]
        },
        {
            title: "Why we store it",
            paragraphs: [
                "The platform needs operational history to manage requests, track work, notify staff, and produce internal reports grounded in real records.",
                "Retention and access are governed by internal policies and role-based permissions."
            ]
        }
    ],
    next_step: {
        title: "Need a data request?",
        description: "Use Exxonim's support or contact channels and the team will log and process the request through the admin privacy workflow.",
        primary_action: {
            label: "Contact Exxonim",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routes"].contact
        },
        secondary_action: {
            label: "Read your data rights",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routes"].dataRights
        }
    }
});
const fallbackCookiePage = createFallbackPage("cookies", "Cookie Notice", {
    hero: {
        eyebrow: "Cookie notice",
        title: "Cookies stay minimal and tied to real browser behavior.",
        description: "Necessary cookies support secure admin sessions and consent-state identification. Optional preference storage is limited to browser-side theme memory when you allow it."
    },
    sections: [
        {
            title: "Necessary storage",
            paragraphs: [
                "Admin authentication uses secure session cookies together with CSRF protection.",
                "Consent records are tied to a consent identifier so the site can remember your choice."
            ]
        },
        {
            title: "Optional preferences",
            paragraphs: [
                "Theme memory is the only browser preference storage used in this phase, and it should not be treated as a business record.",
                "Analytics and marketing cookies are not active unless the product truly starts using them in a later phase."
            ]
        }
    ],
    next_step: {
        title: "Review the full privacy details",
        description: "The privacy policy and data-rights notice explain what is stored in the system and how requests are handled.",
        primary_action: {
            label: "Privacy policy",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routes"].privacy
        },
        secondary_action: {
            label: "Data rights",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routes"].dataRights
        }
    }
});
const fallbackDataRightsPage = createFallbackPage("data-rights", "Data Rights", {
    hero: {
        eyebrow: "Data rights",
        title: "Access, correction, and deletion requests are handled through a documented internal workflow.",
        description: "Exxonim keeps privacy handling operational and auditable. Requests are logged internally, reviewed, and processed without silently deleting audit-critical history."
    },
    sections: [
        {
            title: "Available request types",
            paragraphs: [
                "You can ask for access to personal data, correction of inaccurate data, or deletion handling where legally and operationally appropriate."
            ],
            bullets: [
                "Access requests",
                "Correction requests",
                "Deletion requests with reviewed anonymization or constrained delete handling"
            ]
        },
        {
            title: "How requests are handled",
            paragraphs: [
                "Requests currently come through existing support and contact channels, then staff log them into the admin privacy-request workflow.",
                "Deletion handling avoids silent hard deletion of audit-critical records and keeps an explicit audit trail."
            ]
        }
    ],
    next_step: {
        title: "Start a request",
        description: "Use the contact or support page and Exxonim staff will log the request for verification and follow-up.",
        primary_action: {
            label: "Contact Exxonim",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routes"].contact
        },
        secondary_action: {
            label: "Support",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routes"].support
        }
    }
});
const fallbackBlogPosts = [
    {
        id: 1,
        slug: "company-registration-basics",
        title: "Company registration basics before your first filing",
        excerpt: "A short checklist for preparing incorporation details, supporting documents, and first-step authority submissions.",
        publishedAt: "2026-03-22",
        category: getFallbackCategory("business-setup"),
        author: {
            id: "author-exxonim-1",
            name: "Exxonim Advisory",
            role: "Registration Specialist",
            avatarSrc: undefined,
            bio: "Exxonim's advisory team provides structured guidance through entity registration and compliance workflows."
        },
        coverImageSrc: blogCoverRegistration,
        coverAlt: "Business professional reviewing company registration documents at a modern desk",
        mediaLabel: "Company registration basics",
        featuredSlot: "hero",
        featuredOnHome: true,
        readTimeMinutes: 5,
        relatedSlugs: [
            "tin-registration-checklist",
            "compliance-calendar-basics"
        ],
        content: {
            introduction: "Start with the exact entity type, ownership information, and document set you expect to file so the process does not stall later.",
            highlights: [
                "Confirm the legal structure first.",
                "Prepare identity and address documents before filing.",
                "Map which authority comes first in your sequence."
            ],
            sections: [
                {
                    heading: "Before you submit",
                    paragraphs: [
                        "Gather shareholder or member details, draft names, and contact records in one place.",
                        "Keep a simple filing checklist so follow-up requests do not create unnecessary delays."
                    ]
                }
            ]
        }
    },
    {
        id: 2,
        slug: "tin-registration-checklist",
        title: "TIN registration checklist for new businesses",
        excerpt: "The basic inputs teams should verify before starting tax registration and related account setup.",
        publishedAt: "2026-03-10",
        category: getFallbackCategory("compliance"),
        author: {
            id: "author-exxonim-1",
            name: "Exxonim Advisory",
            role: "Registration Specialist",
            avatarSrc: undefined,
            bio: "Exxonim's advisory team provides structured guidance through entity registration and compliance workflows."
        },
        coverImageSrc: blogCoverTin,
        coverAlt: "Tax registration forms and documents organized on a professional desk",
        mediaLabel: "TIN registration checklist",
        featuredSlot: "popular",
        featuredOnHome: true,
        readTimeMinutes: 4,
        relatedSlugs: [
            "company-registration-basics",
            "licensing-renewal-prep"
        ],
        content: {
            introduction: "Tax registration runs more smoothly when core entity details, contact records, and supporting documents are already aligned.",
            highlights: [
                "Keep legal and trading names consistent.",
                "Prepare contact and location details exactly as filed elsewhere."
            ],
            sections: [
                {
                    heading: "Consistency matters",
                    paragraphs: [
                        "Small mismatches across names, addresses, and contact points often create avoidable back-and-forth during review."
                    ]
                }
            ]
        }
    },
    {
        id: 3,
        slug: "licensing-renewal-prep",
        title: "How to prepare for licensing and renewal cycles",
        excerpt: "A practical way to track renewal dates, support files, and internal approvals before deadlines start to compress.",
        publishedAt: "2026-02-28",
        category: getFallbackCategory("compliance"),
        author: {
            id: "author-exxonim-2",
            name: "Exxonim Operations",
            role: "Compliance Lead",
            avatarSrc: undefined,
            bio: "Exxonim's operations team focuses on practical compliance tracking and deadline management."
        },
        coverImageSrc: blogCoverLicensing,
        coverAlt: "Business planner with organized calendar and scheduled reminders on a desk",
        mediaLabel: "Licensing renewal prep",
        featuredSlot: "editors-pick",
        featuredOnHome: false,
        readTimeMinutes: 6,
        relatedSlugs: [
            "tin-registration-checklist",
            "compliance-calendar-basics"
        ],
        content: {
            introduction: "Renewal work is easier when the team keeps one calendar, one document source, and one owner for each filing track.",
            highlights: [
                "Track deadlines in one place.",
                "Assign one accountable owner per renewal stream."
            ],
            sections: [
                {
                    heading: "Set the cadence",
                    paragraphs: [
                        "A shared filing calendar prevents deadlines from becoming last-minute recovery work."
                    ]
                }
            ]
        }
    },
    {
        id: 4,
        slug: "compliance-calendar-basics",
        title: "Build a simple compliance calendar your team can actually use",
        excerpt: "A lightweight operating model for recurring filings, reminders, and decision points across the year.",
        publishedAt: "2026-02-12",
        category: getFallbackCategory("operations"),
        author: {
            id: "author-exxonim-2",
            name: "Exxonim Operations",
            role: "Compliance Lead",
            avatarSrc: undefined,
            bio: "Exxonim's operations team focuses on practical compliance tracking and deadline management."
        },
        coverImageSrc: blogCoverCalendar,
        coverAlt: "Wall calendar with marked dates and a planning workspace",
        mediaLabel: "Compliance calendar basics",
        featuredOnHome: false,
        readTimeMinutes: 4,
        relatedSlugs: [
            "licensing-renewal-prep",
            "company-registration-basics"
        ],
        content: {
            introduction: "A workable calendar is short, visible, and tied to the next action rather than stored in disconnected spreadsheets.",
            highlights: [
                "Use one owner and one date per obligation.",
                "Record the next action, not just the deadline."
            ],
            sections: [
                {
                    heading: "Keep it simple",
                    paragraphs: [
                        "The calendar only helps if the team can see what is pending and who moves it forward."
                    ]
                }
            ]
        }
    },
    {
        id: 5,
        slug: "business-registration-timeline",
        title: "What to expect on the company registration timeline",
        excerpt: "A realistic overview of how long each registration stage takes and what can cause delays in Tanzania.",
        publishedAt: "2026-02-04",
        category: getFallbackCategory("business-setup"),
        author: {
            id: "author-exxonim-1",
            name: "Exxonim Advisory",
            role: "Registration Specialist",
            avatarSrc: undefined,
            bio: "Exxonim's advisory team provides structured guidance through entity registration and compliance workflows."
        },
        coverImageSrc: blogCoverTimeline,
        coverAlt: "Modern office building in Dar es Salaam business district",
        mediaLabel: "Registration timeline",
        featuredOnHome: true,
        readTimeMinutes: 5,
        relatedSlugs: [
            "company-registration-basics",
            "ngo-registration-guide"
        ],
        content: {
            introduction: "Registration timelines depend on entity type, document readiness, and authority processing speed. Understanding the typical sequence helps teams plan around realistic expectations.",
            highlights: [
                "Name reservation can take 1-3 working days.",
                "Incorporation filing typically takes 5-10 working days.",
                "Delays often come from incomplete documents, not the authority."
            ],
            sections: [
                {
                    heading: "Typical stages and durations",
                    paragraphs: [
                        "Name reservation, document preparation, incorporation filing, and certificate collection each have their own processing window.",
                        "Build buffer time into your plan so a slow stage does not block everything downstream."
                    ]
                }
            ]
        }
    },
    {
        id: 6,
        slug: "ngo-registration-guide",
        title: "NGO registration steps and compliance requirements",
        excerpt: "How non-profit organisations can navigate the registration process and maintain compliance with Tanzanian regulations.",
        publishedAt: "2026-01-20",
        category: getFallbackCategory("business-setup"),
        author: {
            id: "author-exxonim-2",
            name: "Exxonim Operations",
            role: "Compliance Lead",
            avatarSrc: undefined,
            bio: "Exxonim's operations team focuses on practical compliance tracking and deadline management."
        },
        coverImageSrc: blogCoverNgo,
        coverAlt: "Community meeting discussing NGO plans in Tanzania",
        mediaLabel: "NGO registration guide",
        featuredOnHome: true,
        readTimeMinutes: 7,
        relatedSlugs: [
            "company-registration-basics",
            "regulatory-compliance-framework"
        ],
        content: {
            introduction: "NGO registration follows a distinct path from company registration, with its own documentation requirements and compliance obligations.",
            highlights: [
                "Prepare constitution and board details before filing.",
                "Compliance obligations differ from for-profit entities.",
                "Annual returns and activity reports are recurring requirements."
            ],
            sections: [
                {
                    heading: "Key differences from company registration",
                    paragraphs: [
                        "NGOs must submit a constitution, board member details, and proof of intended activities. The review process also involves sector-specific approvals in some cases."
                    ]
                }
            ]
        }
    },
    {
        id: 7,
        slug: "business-name-registration",
        title: "Business name registration for sole proprietors",
        excerpt: "A straightforward guide for individuals registering a business name in Tanzania, from name search to certificate.",
        publishedAt: "2026-01-08",
        category: getFallbackCategory("business-setup"),
        author: {
            id: "author-exxonim-1",
            name: "Exxonim Advisory",
            role: "Registration Specialist",
            avatarSrc: undefined,
            bio: "Exxonim's advisory team provides structured guidance through entity registration and compliance workflows."
        },
        coverImageSrc: blogCoverBizName,
        coverAlt: "Entrepreneur opening a small business storefront",
        mediaLabel: "Business name registration",
        featuredOnHome: false,
        readTimeMinutes: 4,
        relatedSlugs: [
            "company-registration-basics",
            "business-registration-timeline"
        ],
        content: {
            introduction: "Business name registration is the simplest entity setup path in Tanzania, but it still requires the right documents and steps in the correct order.",
            highlights: [
                "Name availability search comes first.",
                "Sole proprietor registration is faster than company incorporation.",
                "A business name does not create a separate legal entity."
            ],
            sections: [
                {
                    heading: "The registration path",
                    paragraphs: [
                        "Start with a name search, then submit the registration form with identity documents and the prescribed fee. Processing is typically faster than company registration."
                    ]
                }
            ]
        }
    },
    {
        id: 8,
        slug: "tax-return-preparation",
        title: "How to prepare for your first tax return filing",
        excerpt: "Practical steps for new entities preparing their first tax return, including documentation, deadlines, and common mistakes.",
        publishedAt: "2025-12-18",
        category: getFallbackCategory("compliance"),
        author: {
            id: "author-exxonim-2",
            name: "Exxonim Operations",
            role: "Compliance Lead",
            avatarSrc: undefined,
            bio: "Exxonim's operations team focuses on practical compliance tracking and deadline management."
        },
        coverImageSrc: blogCoverTaxReturn,
        coverAlt: "Accountant preparing financial statements on a laptop",
        mediaLabel: "Tax return preparation",
        featuredOnHome: false,
        readTimeMinutes: 6,
        relatedSlugs: [
            "tin-registration-checklist",
            "annual-return-filing"
        ],
        content: {
            introduction: "The first tax return filing can feel complicated, but it follows a predictable structure when you have the right documents prepared.",
            highlights: [
                "Gather financial records early.",
                "Understand which return type applies to your entity.",
                "File on time to avoid penalties."
            ],
            sections: [
                {
                    heading: "Common first-time mistakes",
                    paragraphs: [
                        "Missing the filing deadline, incomplete financial statements, and inconsistent information across forms are the most common issues Exxonim sees in first-time filings."
                    ]
                }
            ]
        }
    },
    {
        id: 9,
        slug: "regulatory-compliance-framework",
        title: "Building a regulatory compliance framework for your organisation",
        excerpt: "A structured approach to identifying, tracking, and meeting your regulatory obligations across the year.",
        publishedAt: "2025-12-05",
        category: getFallbackCategory("operations"),
        author: {
            id: "author-exxonim-1",
            name: "Exxonim Advisory",
            role: "Registration Specialist",
            avatarSrc: undefined,
            bio: "Exxonim's advisory team provides structured guidance through entity registration and compliance workflows."
        },
        coverImageSrc: blogCoverRegulatory,
        coverAlt: "Compliance checklist clipboard with organized filing system",
        mediaLabel: "Compliance framework",
        featuredOnHome: true,
        readTimeMinutes: 8,
        relatedSlugs: [
            "compliance-calendar-basics",
            "licensing-renewal-prep"
        ],
        content: {
            introduction: "A compliance framework does not need to be complex. It needs to be visible, owned, and tied to the next action for each obligation.",
            highlights: [
                "List every obligation with its authority and deadline.",
                "Assign one owner per obligation.",
                "Review and update the framework quarterly."
            ],
            sections: [
                {
                    heading: "Starting the framework",
                    paragraphs: [
                        "Begin with the obligations you already know, then add new ones as they emerge. A simple spreadsheet or tracking tool is enough to start — the key is consistent review."
                    ]
                }
            ]
        }
    },
    {
        id: 10,
        slug: "annual-return-filing",
        title: "Annual return filing: what to prepare and when",
        excerpt: "A practical timeline for annual return preparation, including the documents you need and common reasons for delays.",
        publishedAt: "2025-11-22",
        category: getFallbackCategory("compliance"),
        author: {
            id: "author-exxonim-2",
            name: "Exxonim Operations",
            role: "Compliance Lead",
            avatarSrc: undefined,
            bio: "Exxonim's operations team focuses on practical compliance tracking and deadline management."
        },
        coverImageSrc: blogCoverAnnualReturn,
        coverAlt: "Annual report documents with charts and organized folders",
        mediaLabel: "Annual return filing",
        featuredOnHome: false,
        readTimeMinutes: 5,
        relatedSlugs: [
            "tax-return-preparation",
            "licensing-renewal-prep"
        ],
        content: {
            introduction: "Annual returns are a recurring compliance obligation. Preparing early and having a consistent process makes each cycle smoother.",
            highlights: [
                "Start preparing 30 days before the due date.",
                "Confirm the return type matches your entity structure.",
                "Keep financial statements consistent with prior filings."
            ],
            sections: [
                {
                    heading: "Preparation checklist",
                    paragraphs: [
                        "Verify your entity details are current, confirm the filing period, prepare the financial summary, and submit before the deadline. Late filing triggers penalties and can affect your compliance record."
                    ]
                }
            ]
        }
    },
    {
        id: 11,
        slug: "import-export-licensing",
        title: "Import and export licensing requirements in Tanzania",
        excerpt: "A clear breakdown of permits, registrations, and documentation needed to move goods across Tanzanian borders.",
        publishedAt: "2025-11-10",
        category: getFallbackCategory("operations"),
        author: {
            id: "author-exxonim-2",
            name: "Exxonim Operations",
            role: "Compliance Lead",
            avatarSrc: undefined,
            bio: "Exxonim's operations team focuses on practical compliance tracking and deadline management."
        },
        coverImageSrc: blogCoverImportExport,
        coverAlt: "Shipping containers at Dar es Salaam port with customs documentation",
        mediaLabel: "Import-export licensing",
        featuredOnHome: false,
        readTimeMinutes: 6,
        relatedSlugs: [
            "regulatory-compliance-framework",
            "business-registration-timeline"
        ],
        content: {
            introduction: "Importing and exporting goods in Tanzania requires specific licenses, permits, and registrations depending on the product category and trade direction.",
            highlights: [
                "Confirm which licenses apply to your product type.",
                "Prepare customs documentation before shipping.",
                "Track renewal dates for trade permits."
            ],
            sections: [
                {
                    heading: "Key permits and where to start",
                    paragraphs: [
                        "Most trade activities require a business license, TRA tax registration, and product-specific permits. Start with the Tanzania Revenue Authority and the relevant sector regulator before arranging logistics."
                    ]
                }
            ]
        }
    },
    {
        id: 12,
        slug: "business-bank-account-setup",
        title: "How to open a business bank account in Tanzania",
        excerpt: "Practical steps and document requirements for setting up a corporate bank account after entity registration.",
        publishedAt: "2025-10-28",
        category: getFallbackCategory("business-setup"),
        author: {
            id: "author-exxonim-1",
            name: "Exxonim Advisory",
            role: "Registration Specialist",
            avatarSrc: undefined,
            bio: "Exxonim's advisory team provides structured guidance through entity registration and compliance workflows."
        },
        coverImageSrc: blogCoverBankAccount,
        coverAlt: "Business professional at a bank counter opening a corporate account",
        mediaLabel: "Business bank account setup",
        featuredOnHome: false,
        readTimeMinutes: 5,
        relatedSlugs: [
            "company-registration-basics",
            "tin-registration-checklist"
        ],
        content: {
            introduction: "Opening a business bank account requires your registration certificate, TIN, and director identification. Each bank has its own requirements, but the core documents are consistent.",
            highlights: [
                "Bring the certificate of incorporation and TIN certificate.",
                "Prepare director and shareholder identification documents.",
                "Some banks require a board resolution to open the account."
            ],
            sections: [
                {
                    heading: "Typical document checklist",
                    paragraphs: [
                        "Certificate of incorporation, memorandum and articles of association, TIN certificate, business license (if applicable), and identification for all signatories. Having these ready before visiting the bank saves time."
                    ]
                }
            ]
        }
    },
    {
        id: 13,
        slug: "tra-tax-obligations",
        title: "Understanding your TRA tax obligations as a business",
        excerpt: "A straightforward overview of the main tax types, filing schedules, and compliance expectations from the Tanzania Revenue Authority.",
        publishedAt: "2025-10-12",
        category: getFallbackCategory("compliance"),
        author: {
            id: "author-exxonim-2",
            name: "Exxonim Operations",
            role: "Compliance Lead",
            avatarSrc: undefined,
            bio: "Exxonim's operations team focuses on practical compliance tracking and deadline management."
        },
        coverImageSrc: blogCoverTraObligations,
        coverAlt: "Tax compliance documents and TRA forms on a professional desk",
        mediaLabel: "TRA tax obligations",
        featuredOnHome: false,
        readTimeMinutes: 7,
        relatedSlugs: [
            "tax-return-preparation",
            "compliance-calendar-basics"
        ],
        content: {
            introduction: "Every registered business in Tanzania has tax obligations determined by entity type, revenue, and sector. Understanding which taxes apply and when they are due prevents penalties.",
            highlights: [
                "Corporate tax, VAT, and PAYE are the most common obligations.",
                "Filing schedules differ by tax type and entity size.",
                "Late filing triggers interest and penalties."
            ],
            sections: [
                {
                    heading: "Common tax types for businesses",
                    paragraphs: [
                        "Corporate income tax (30%), value added tax (18% for standard-rated supplies), pay-as-you-earn for employees, and skills development levy. Some sectors have additional excise or stamp duties."
                    ]
                }
            ]
        }
    },
    {
        id: 14,
        slug: "partnership-registration",
        title: "Partnership registration steps in Tanzania",
        excerpt: "How to register a general or limited partnership, including the documentation and regulatory steps involved.",
        publishedAt: "2025-09-25",
        category: getFallbackCategory("business-setup"),
        author: {
            id: "author-exxonim-1",
            name: "Exxonim Advisory",
            role: "Registration Specialist",
            avatarSrc: undefined,
            bio: "Exxonim's advisory team provides structured guidance through entity registration and compliance workflows."
        },
        coverImageSrc: blogCoverPartnership,
        coverAlt: "Two business partners reviewing registration documents together",
        mediaLabel: "Partnership registration",
        featuredOnHome: false,
        readTimeMinutes: 5,
        relatedSlugs: [
            "company-registration-basics",
            "ngo-registration-guide"
        ],
        content: {
            introduction: "Partnerships offer a simpler structure than companies, but they still require formal registration and a partnership deed. Understanding the difference between general and limited partnerships is the first step.",
            highlights: [
                "A partnership deed is essential before registration.",
                "General partnerships have unlimited liability for all partners.",
                "Limited partnerships protect some partners' liability."
            ],
            sections: [
                {
                    heading: "Registration path",
                    paragraphs: [
                        "Draft a partnership deed, register with the Business Registration and Licensing Authority (BRELA), obtain a TIN, and apply for relevant business licenses. The process is faster than company incorporation but still requires complete documentation."
                    ]
                }
            ]
        }
    },
    {
        id: 15,
        slug: "work-permit-foreign-investors",
        title: "Work permits and residency for foreign investors in Tanzania",
        excerpt: "What foreign investors need to know about work permits, residence classes, and the regulatory process for operating in Tanzania.",
        publishedAt: "2025-09-10",
        category: getFallbackCategory("operations"),
        author: {
            id: "author-exxonim-1",
            name: "Exxonim Advisory",
            role: "Registration Specialist",
            avatarSrc: undefined,
            bio: "Exxonim's advisory team provides structured guidance through entity registration and compliance workflows."
        },
        coverImageSrc: blogCoverWorkPermit,
        coverAlt: "Immigration office with work permit documents and passport",
        mediaLabel: "Work permits for investors",
        featuredOnHome: false,
        readTimeMinutes: 8,
        relatedSlugs: [
            "business-registration-timeline",
            "import-export-licensing"
        ],
        content: {
            introduction: "Foreign nationals seeking to work or invest in Tanzania must obtain the appropriate work permit and residence class. The process involves multiple government agencies and specific documentation.",
            highlights: [
                "Choose the correct residence class for your activity.",
                "Prepare supporting documents before applying.",
                "Processing times vary by permit type."
            ],
            sections: [
                {
                    heading: "Residence classes and work permits",
                    paragraphs: [
                        "Tanzania offers several residence classes for investors, professionals, and employees. Class A covers investors, Class B covers professionals, and Class C covers other employment. Each has distinct requirements and processing timelines through the Immigration Services Department."
                    ]
                }
            ]
        }
    },
    {
        id: 16,
        slug: "digital-business-compliance",
        title: "Digital business compliance and online registration in Tanzania",
        excerpt: "How digital platforms and online systems are changing the way businesses register, file, and stay compliant in Tanzania.",
        publishedAt: "2025-08-22",
        category: getFallbackCategory("operations"),
        author: {
            id: "author-exxonim-2",
            name: "Exxonim Operations",
            role: "Compliance Lead",
            avatarSrc: undefined,
            bio: "Exxonim's operations team focuses on practical compliance tracking and deadline management."
        },
        coverImageSrc: blogCoverDigital,
        coverAlt: "Laptop screen showing online business registration portal in Tanzania",
        mediaLabel: "Digital business compliance",
        featuredOnHome: false,
        readTimeMinutes: 5,
        relatedSlugs: [
            "company-registration-basics",
            "tra-tax-obligations"
        ],
        content: {
            introduction: "Tanzania is gradually digitising business registration and compliance processes. Understanding which systems are available online and which still require in-person visits saves time and reduces errors.",
            highlights: [
                "BRELA and TRA both offer online portals for key services.",
                "Not all processes are fully digitised yet.",
                "Digital submissions still require correct documentation."
            ],
            sections: [
                {
                    heading: "Current digital services",
                    paragraphs: [
                        "Name search and reservation can be done online through the BRELA portal. TIN registration, VAT registration, and some return filings are available through the TRA e-services platform. However, some steps like document verification still require physical submission."
                    ]
                }
            ]
        }
    }
];
const fallbackPricingPlans = [
    {
        id: 1,
        name: "Foundation",
        badge: "Getting started",
        description: "A practical package for registration and first-step compliance work, with expert guidance throughout.",
        notes: "Use the Exxonim contact route for the latest package guidance.",
        recommended: false,
        features: [
            {
                label: "Entity setup guidance",
                included: true
            },
            {
                label: "Document checklist review",
                included: true
            },
            {
                label: "Licensing follow-through",
                included: false
            }
        ]
    },
    {
        id: 2,
        name: "Operating",
        badge: "Recommended",
        description: "A balanced fallback plan for teams that need registration, licensing, and recurring compliance support.",
        notes: "Live package details return automatically after the next successful sync.",
        recommended: true,
        features: [
            {
                label: "Entity setup guidance",
                included: true
            },
            {
                label: "Licensing follow-through",
                included: true
            },
            {
                label: "Compliance reminders",
                included: true
            }
        ]
    },
    {
        id: 3,
        name: "Continuity",
        badge: "Extended coverage",
        description: "A higher-touch fallback outline for teams with multiple filings, renewals, and document dependencies.",
        notes: "Contact Exxonim directly for a tailored scope while the live catalog reconnects.",
        recommended: false,
        features: [
            {
                label: "Priority support coordination",
                included: true
            },
            {
                label: "Ongoing compliance planning",
                included: true
            },
            {
                label: "Multi-stream document support",
                included: true
            }
        ]
    }
];
const fallbackTestimonials = [
    {
        id: 1,
        eyebrow: "Fallback review",
        headline: "The public shell still gives visitors a clear next step.",
        support: "Exxonim helped us move through the setup phase with a clear checklist and practical follow-through at every step.",
        quote: "We knew exactly what to prepare, when to submit, and who to contact if anything was unclear.",
        name: "Operations Team",
        role: "Client reference",
        initials: "OT"
    },
    {
        id: 2,
        eyebrow: "Fallback review",
        headline: "Important public context stays visible instead of disappearing.",
        support: "The site continues to show service categories, contact paths, and core positioning even during temporary backend interruptions.",
        quote: "The experience still felt intentional because the shell stayed complete and the contact route remained obvious.",
        name: "Compliance Lead",
        role: "Client reference",
        initials: "CL"
    }
];
const fallbackJobs = [
    {
        id: 1,
        title: "Client Operations Coordinator",
        slug: "client-operations-coordinator",
        department: "Operations",
        employment_type: "Full-time",
        location_mode: "hybrid",
        city: "Dar es Salaam",
        country: "Tanzania",
        compensation_label: null,
        experience_label: "Mid-level",
        summary: "Support registration and compliance workflows while the live hiring feed reconnects.",
        description: "Coordinate internal follow-through, document readiness, and status visibility across active client work. You will be the backbone of our operations team, ensuring every client engagement moves forward efficiently and on schedule.",
        requirements: [
            "Comfort working with operational checklists",
            "Clear written communication",
            "Confidence handling structured follow-up work",
            "Bachelor's degree in Business Administration or related field"
        ],
        responsibilities: [
            "Track active workstreams across multiple client engagements",
            "Coordinate next actions with the consulting team",
            "Help keep filing and follow-up work organized",
            "Prepare status reports and maintain dashboards"
        ],
        status: "published",
        is_published: true,
        published_at: "2026-04-01T00:00:00Z",
        created_at: "2026-04-01T00:00:00Z",
        updated_at: "2026-04-01T00:00:00Z"
    },
    {
        id: 2,
        title: "Business Registration Specialist",
        slug: "business-registration-specialist",
        department: "Advisory",
        employment_type: "Full-time",
        location_mode: "on-site",
        city: "Dar es Salaam",
        country: "Tanzania",
        compensation_label: null,
        experience_label: "Senior",
        summary: "Lead entity registration and licensing engagements for domestic and international clients across Tanzania.",
        description: "As a Business Registration Specialist, you will guide clients through the full lifecycle of entity formation — from name clearance to certificate issuance. You will work closely with BRELA, TRA, and local government authorities to ensure timely and compliant registrations.",
        requirements: [
            "3+ years of experience in business registration or legal compliance in Tanzania",
            "Deep understanding of BRELA, TRA, and licensing procedures",
            "Strong attention to detail and documentation standards",
            "Law degree or equivalent professional qualification preferred"
        ],
        responsibilities: [
            "Manage end-to-end entity registration for local and foreign companies",
            "Liaise with BRELA, TRA, and regulatory bodies on behalf of clients",
            "Prepare and review incorporation documents, share structures, and compliance filings",
            "Advise clients on legal structures and regulatory requirements"
        ],
        status: "published",
        is_published: true,
        published_at: "2026-03-28T00:00:00Z",
        created_at: "2026-03-28T00:00:00Z",
        updated_at: "2026-03-28T00:00:00Z"
    },
    {
        id: 3,
        title: "Tax Compliance Analyst",
        slug: "tax-compliance-analyst",
        department: "Compliance",
        employment_type: "Full-time",
        location_mode: "hybrid",
        city: "Dodoma",
        country: "Tanzania",
        compensation_label: null,
        experience_label: "Mid-level",
        summary: "Ensure clients meet all statutory tax obligations through proactive compliance tracking and filing support.",
        description: "Join our compliance team to help businesses stay ahead of their tax obligations. You will manage filing calendars, prepare returns, and coordinate with TRA on assessments and audits. This role requires precision and a thorough understanding of Tanzanian tax law.",
        requirements: [
            "CPA(T) or equivalent professional certification",
            "2+ years in tax compliance or accounting practice",
            "Familiarity with Tanzanian tax legislation and TRA systems",
            "Proficiency in accounting software and Excel"
        ],
        responsibilities: [
            "Prepare and file monthly, quarterly, and annual tax returns for clients",
            "Maintain compliance calendars and send proactive reminders",
            "Respond to TRA queries and represent clients during audits",
            "Research and advise on tax optimization strategies"
        ],
        status: "published",
        is_published: true,
        published_at: "2026-03-25T00:00:00Z",
        created_at: "2026-03-25T00:00:00Z",
        updated_at: "2026-03-25T00:00:00Z"
    },
    {
        id: 4,
        title: "Digital Marketing Associate",
        slug: "digital-marketing-associate",
        department: "Marketing",
        employment_type: "Full-time",
        location_mode: "remote",
        city: "",
        country: "Tanzania",
        compensation_label: null,
        experience_label: "Entry-level",
        summary: "Drive brand awareness and lead generation through digital channels and content marketing initiatives.",
        description: "We are looking for a creative and data-driven Digital Marketing Associate to expand our online presence. You will manage social media, create content, run campaigns, and analyze performance metrics to optimize our marketing efforts across all digital touchpoints.",
        requirements: [
            "Degree in Marketing, Communications, or related field",
            "Experience with social media management and content creation",
            "Familiarity with analytics tools (Google Analytics, Meta Business Suite)",
            "Strong writing and visual storytelling skills"
        ],
        responsibilities: [
            "Plan and execute social media content calendars across platforms",
            "Write blog posts, case studies, and email marketing campaigns",
            "Monitor and report on digital marketing KPIs and campaign performance",
            "Manage paid advertising campaigns on social and search platforms"
        ],
        status: "published",
        is_published: true,
        published_at: "2026-03-20T00:00:00Z",
        created_at: "2026-03-20T00:00:00Z",
        updated_at: "2026-03-20T00:00:00Z"
    },
    {
        id: 5,
        title: "Senior Compliance Consultant",
        slug: "senior-compliance-consultant",
        department: "Compliance",
        employment_type: "Full-time",
        location_mode: "on-site",
        city: "Dar es Salaam",
        country: "Tanzania",
        compensation_label: null,
        experience_label: "Senior",
        summary: "Lead complex compliance engagements and mentor junior consultants while ensuring regulatory adherence for key accounts.",
        description: "As a Senior Compliance Consultant, you will oversee a portfolio of high-value clients, ensuring they meet all regulatory obligations. You will mentor junior team members, develop compliance frameworks, and serve as the primary point of contact for regulatory matters.",
        requirements: [
            "5+ years in compliance, regulatory, or legal advisory roles",
            "Professional certification in compliance or law",
            "Experience managing client portfolios and leading teams",
            "Deep knowledge of Tanzanian regulatory landscape"
        ],
        responsibilities: [
            "Lead compliance assessments and develop remediation plans for clients",
            "Manage and mentor a team of junior compliance analysts",
            "Build and maintain relationships with regulatory bodies",
            "Develop internal compliance frameworks, templates, and best practices"
        ],
        status: "published",
        is_published: true,
        published_at: "2026-03-15T00:00:00Z",
        created_at: "2026-03-15T00:00:00Z",
        updated_at: "2026-03-15T00:00:00Z"
    },
    {
        id: 6,
        title: "Human Resources Officer",
        slug: "human-resources-officer",
        department: "Operations",
        employment_type: "Full-time",
        location_mode: "hybrid",
        city: "Dar es Salaam",
        country: "Tanzania",
        compensation_label: null,
        experience_label: "Mid-level",
        summary: "Manage recruitment, employee relations, and organizational development to support Exxonim's growing team.",
        description: "We are seeking an HR Officer to build and maintain a high-performing team culture. You will handle the full employee lifecycle — from recruitment and onboarding to performance management and offboarding — while ensuring alignment with Tanzanian labor laws.",
        requirements: [
            "Degree in Human Resources, Business Administration, or related field",
            "3+ years in HR generalist or people operations roles",
            "Knowledge of Tanzanian labor law and employment regulations",
            "Strong interpersonal and conflict resolution skills"
        ],
        responsibilities: [
            "Manage end-to-end recruitment and onboarding processes",
            "Develop and implement HR policies aligned with local labor laws",
            "Coordinate performance reviews and professional development programs",
            "Handle employee relations, grievances, and disciplinary processes"
        ],
        status: "published",
        is_published: true,
        published_at: "2026-03-10T00:00:00Z",
        created_at: "2026-03-10T00:00:00Z",
        updated_at: "2026-03-10T00:00:00Z"
    },
    {
        id: 7,
        title: "Business Development Manager",
        slug: "business-development-manager",
        department: "Advisory",
        employment_type: "Full-time",
        location_mode: "on-site",
        city: "Arusha",
        country: "Tanzania",
        compensation_label: null,
        experience_label: "Senior",
        summary: "Identify and pursue new business opportunities, build strategic partnerships, and expand Exxonim's market presence.",
        description: "As a Business Development Manager, you will be responsible for growing Exxonim's client base and revenue. You will identify market opportunities, build relationships with potential clients and partners, and develop proposals that align our services with client needs.",
        requirements: [
            "5+ years in business development, sales, or strategic consulting",
            "Proven track record of meeting revenue targets",
            "Strong network within the Tanzanian business community",
            "MBA or advanced degree in Business preferred"
        ],
        responsibilities: [
            "Identify and qualify new business leads through networking and outreach",
            "Develop and present proposals and pitches to prospective clients",
            "Build and maintain strategic partnerships with law firms, banks, and industry bodies",
            "Track market trends and competitor activity to inform business strategy"
        ],
        status: "published",
        is_published: true,
        published_at: "2026-03-05T00:00:00Z",
        created_at: "2026-03-05T00:00:00Z",
        updated_at: "2026-03-05T00:00:00Z"
    },
    {
        id: 8,
        title: "IT Systems Administrator",
        slug: "it-systems-administrator",
        department: "Operations",
        employment_type: "Full-time",
        location_mode: "hybrid",
        city: "Dar es Salaam",
        country: "Tanzania",
        compensation_label: null,
        experience_label: "Mid-level",
        summary: "Maintain and optimize Exxonim's IT infrastructure, ensuring reliable systems and security for the entire organization.",
        description: "We need an IT Systems Administrator to manage our internal technology stack. You will handle server administration, network security, software deployments, and user support — ensuring our systems run smoothly and securely as we scale.",
        requirements: [
            "Degree in Computer Science, IT, or related field",
            "3+ years in systems administration or IT operations",
            "Experience with cloud platforms (AWS, Azure, or GCP)",
            "Knowledge of network security, VPNs, and backup solutions"
        ],
        responsibilities: [
            "Administer and maintain servers, networks, and cloud infrastructure",
            "Manage user accounts, access controls, and security policies",
            "Deploy and update software systems and internal tools",
            "Provide technical support and troubleshoot issues across the organization"
        ],
        status: "published",
        is_published: true,
        published_at: "2026-02-28T00:00:00Z",
        created_at: "2026-02-28T00:00:00Z",
        updated_at: "2026-02-28T00:00:00Z"
    },
    {
        id: 9,
        title: "Content Writer & Researcher",
        slug: "content-writer-researcher",
        department: "Marketing",
        employment_type: "Part-time",
        location_mode: "remote",
        city: "",
        country: "Tanzania",
        compensation_label: null,
        experience_label: "Entry-level",
        summary: "Produce high-quality written content and conduct market research to support Exxonim's thought leadership efforts.",
        description: "We are looking for a Content Writer & Researcher who can translate complex regulatory and business topics into clear, engaging content. You will write blog posts, white papers, and client guides while conducting research to support our advisory team's insights.",
        requirements: [
            "Degree in Communications, Journalism, English, or related field",
            "Excellent writing, editing, and proofreading skills",
            "Ability to research and simplify complex business/legal topics",
            "Familiarity with SEO best practices"
        ],
        responsibilities: [
            "Write and edit blog posts, articles, and client-facing guides",
            "Conduct market and regulatory research to support content creation",
            "Collaborate with subject-matter experts to ensure accuracy",
            "Optimize content for search visibility and audience engagement"
        ],
        status: "published",
        is_published: true,
        published_at: "2026-02-25T00:00:00Z",
        created_at: "2026-02-25T00:00:00Z",
        updated_at: "2026-02-25T00:00:00Z"
    },
    {
        id: 10,
        title: "Junior Advisory Analyst",
        slug: "junior-advisory-analyst",
        department: "Advisory",
        employment_type: "Full-time",
        location_mode: "on-site",
        city: "Dar es Salaam",
        country: "Tanzania",
        compensation_label: null,
        experience_label: "Entry-level",
        summary: "Support senior consultants with research, analysis, and client deliverables across advisory engagements.",
        description: "As a Junior Advisory Analyst, you will work alongside experienced consultants to deliver high-quality advisory services. You will conduct research, prepare analyses, draft client communications, and assist with project coordination — gaining hands-on experience in business consulting.",
        requirements: [
            "Recent graduate with a degree in Business, Economics, or Finance",
            "Strong analytical and quantitative skills",
            "Proficiency in Excel, PowerPoint, and data analysis tools",
            "Eagerness to learn and grow in a consulting environment"
        ],
        responsibilities: [
            "Conduct market, regulatory, and industry research for client projects",
            "Prepare analysis reports, presentations, and briefing documents",
            "Assist senior consultants with client meetings and follow-ups",
            "Maintain project documentation and track deliverable deadlines"
        ],
        status: "published",
        is_published: true,
        published_at: "2026-02-20T00:00:00Z",
        created_at: "2026-02-20T00:00:00Z",
        updated_at: "2026-02-20T00:00:00Z"
    }
];
const fallbackBrandSetting = createFallbackSiteSetting("brand", __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fallbackBrand"]);
const fallbackCompanyInfoSetting = createFallbackSiteSetting("company_info", __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fallbackCompanyInfo"]);
const fallbackFooterSetting = createFallbackSiteSetting("footer", __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fallbackFooter"]);
function getFallbackSiteSetting(key) {
    switch(key){
        case "brand":
            return fallbackBrandSetting;
        case "company_info":
            return fallbackCompanyInfoSetting;
        case "footer":
            return fallbackFooterSetting;
        default:
            return undefined;
    }
}
const fallbackTermsPage = createFallbackPage("terms", "Terms of Service", {
    hero: {
        eyebrow: "Terms of service",
        title: "These terms govern your use of Exxonim's services and website.",
        description: "By accessing this website or engaging Exxonim's services, you agree to these terms. Read them carefully before proceeding."
    },
    sections: [
        {
            title: "Service terms",
            paragraphs: [
                "Exxonim Company Limited provides business consulting services including entity registration, licensing, compliance tracking, and operational advisory. All services are subject to the terms outlined here and in any separate engagement agreement.",
                "Engagement begins when you submit a request through the contact page, email, phone, or WhatsApp. Each consultation is assigned a unique tracking reference and is managed through Exxonim's structured workflow from intake to resolution."
            ]
        },
        {
            title: "Limitations",
            paragraphs: [
                "Exxonim acts as an advisory and facilitation service. While every effort is made to ensure accurate and timely processing, final outcomes depend on the relevant government authorities and their processing timelines.",
                "Exxonim does not guarantee specific outcomes, timelines, or approvals from regulatory bodies. Fees paid cover the advisory and processing service, not the outcome itself."
            ]
        }
    ],
    next_step: {
        title: "Questions about these terms?",
        description: "Contact Exxonim for clarification on any of these terms, or review the privacy policy for information on how your data is handled.",
        primary_action: {
            label: "Contact Exxonim",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routes"].contact
        },
        secondary_action: {
            label: "Privacy policy",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routes"].privacy
        }
    }
});
const fallbackSupportPage = createFallbackPage("support", "Support", {
    hero: {
        eyebrow: "Get support",
        title: "Help when you need it.",
        description: "Browse the FAQ, reach out through the contact page, or track an ongoing consultation."
    },
    sections: [
        {
            title: "Common questions",
            paragraphs: [
                "Many questions about registration, compliance, and consultation tracking are answered in the FAQ section. It covers entity types, timelines, TIN requirements, and how tracking works.",
                "If your question is not covered there, the Exxonim team is available through direct contact channels for personalised guidance."
            ],
            bullets: [
                "What types of entities can Exxonim help register?",
                "How long does company registration take?",
                "Can I track the status of my consultation?"
            ]
        },
        {
            title: "Direct contact",
            paragraphs: [
                "For specific questions or ongoing cases, reach out through email, phone, or WhatsApp. The team follows up promptly and tracks every inquiry through the same structured workflow used for consultations.",
                "If you already have a consultation in progress, use the tracking page to look up your current status with your reference ID."
            ]
        }
    ],
    next_step: {
        title: "Need more help?",
        description: "Visit the FAQ for quick answers, or contact Exxonim directly for personalised support.",
        primary_action: {
            label: "FAQ",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routes"].faq
        },
        secondary_action: {
            label: "Contact page",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routes"].contact
        }
    }
});
const fallbackTrackConsultationPage = createFallbackPage("track-consultation", "Track Consultation", {
    hero: {
        eyebrow: "Consultation tracking",
        title: "Track your consultation from intake to resolution.",
        description: "Enter your tracking number to see what is complete, what is pending, and what comes next. No login required — just your reference ID."
    },
    sections: [
        {
            title: "How tracking works",
            paragraphs: [
                "Every consultation is assigned a unique reference ID when you engage Exxonim. At every key milestone — name clearance, document submission, approval, issuance — you receive a proactive update via your preferred channel: WhatsApp, email, or SMS.",
                "You can also look up your status on this page anytime using your tracking number. No login, no password, no dashboard — just a direct answer."
            ]
        },
        {
            title: "What to expect",
            paragraphs: [
                "Upon engagement, Exxonim assigns you a tracking number and begins the structured workflow: intake, preparation, submission, and follow-through. Each stage is tracked and communicated proactively.",
                "If you have not received a tracking number yet, contact Exxonim to start a consultation."
            ]
        }
    ],
    next_step: {
        title: "Ready to get started?",
        description: "Contact Exxonim to begin a consultation and receive your tracking number, or explore the full range of services available.",
        primary_action: {
            label: "Contact Exxonim",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routes"].contact
        },
        secondary_action: {
            label: "Explore services",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routes"].services
        }
    }
});
function getFallbackPage(slug) {
    switch(slug){
        case "home":
            return fallbackHomePage;
        case "about":
            return fallbackAboutPage;
        case "faq":
            return fallbackFaqPage;
        case "services":
            return fallbackServicesPage;
        case "career":
            return fallbackCareerPage;
        case "contact":
            return fallbackContactPage;
        case "resources":
            return fallbackResourcesPage;
        case "privacy":
            return fallbackPrivacyPage;
        case "cookies":
            return fallbackCookiePage;
        case "data-rights":
            return fallbackDataRightsPage;
        case "terms":
            return fallbackTermsPage;
        case "support":
            return fallbackSupportPage;
        case "track-consultation":
            return fallbackTrackConsultationPage;
        default:
            return undefined;
    }
}
;
}),
"[project]/joyful-journey/src/app/api/v1/[...slug]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/content/fallbackShell.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackPublicContent$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/content/fallbackPublicContent.ts [app-route] (ecmascript) <locals>");
;
;
;
const FALLBACK_TIMESTAMP = "2026-01-01T00:00:00Z";
/* ── Site settings ────────────────────────────────────── */ const siteSettingsMap = {
    brand: {
        id: 1,
        key: "brand",
        value: {
            name: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fallbackBrand"].name,
            companyShortName: "Exxonim",
            tagline: "Business consulting for registration, licensing, compliance, and operational advisory.",
            lightLogoSrc: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fallbackBrand"].lightLogoSrc,
            darkLogoSrc: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fallbackBrand"].darkLogoSrc,
            brandColors: {
                primary: "#0f5c63",
                secondary: "#7fbcc1"
            }
        },
        created_at: FALLBACK_TIMESTAMP,
        updated_at: FALLBACK_TIMESTAMP
    },
    company_info: {
        id: 2,
        key: "company_info",
        value: {
            name: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fallbackCompanyInfo"].name,
            legalCompanyName: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fallbackCompanyInfo"].name,
            companyShortName: "Exxonim",
            phones: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fallbackCompanyInfo"].phones,
            emails: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fallbackCompanyInfo"].emails,
            address: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fallbackCompanyInfo"].address,
            whatsapp: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fallbackCompanyInfo"].whatsapp
        },
        created_at: FALLBACK_TIMESTAMP,
        updated_at: FALLBACK_TIMESTAMP
    },
    footer: {
        id: 3,
        key: "footer",
        value: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fallbackFooter"],
        created_at: FALLBACK_TIMESTAMP,
        updated_at: FALLBACK_TIMESTAMP
    },
    seo_defaults: {
        id: 4,
        key: "seo_defaults",
        value: {
            canonicalBaseUrl: "https://exxonim.tz",
            defaultMetaDescription: "Exxonim Company Limited helps organizations move through entity setup, tax and licensing, statutory filings, and operational compliance — with automated updates at every milestone.",
            defaultShareImageUrl: null,
            robotsIndex: true,
            robotsFollow: true
        },
        created_at: FALLBACK_TIMESTAMP,
        updated_at: FALLBACK_TIMESTAMP
    }
};
/* ── Pages ────────────────────────────────────────────── */ const pageMap = {
    home: toApiPage(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackPublicContent$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fallbackHomePage"]),
    about: toApiPage(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackPublicContent$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fallbackAboutPage"]),
    services: toApiPage(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackPublicContent$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fallbackServicesPage"]),
    resources: toApiPage(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackPublicContent$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fallbackResourcesPage"]),
    career: toApiPage(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackPublicContent$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fallbackCareerPage"]),
    contact: toApiPage(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackPublicContent$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fallbackContactPage"]),
    faq: toApiPage(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackPublicContent$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fallbackFaqPage"]),
    privacy: toApiPage(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackPublicContent$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fallbackPrivacyPage"]),
    terms: toApiPage(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackPublicContent$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fallbackTermsPage"]),
    cookies: toApiPage(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackPublicContent$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fallbackCookiePage"]),
    "data-rights": toApiPage(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackPublicContent$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fallbackDataRightsPage"]),
    support: toApiPage(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackPublicContent$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fallbackSupportPage"]),
    "track-consultation": toApiPage(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackPublicContent$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fallbackTrackConsultationPage"])
};
function toApiPage(page) {
    return {
        id: page.id,
        title: page.title,
        slug: page.slug,
        content: page.content,
        status: "published",
        is_published: true,
        created_at: FALLBACK_TIMESTAMP,
        updated_at: FALLBACK_TIMESTAMP
    };
}
/* ── Blog posts (API format with snake_case) ──────────── */ function toApiBlogPost(post) {
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
        status: "published",
        is_published: true,
        created_at: FALLBACK_TIMESTAMP,
        updated_at: FALLBACK_TIMESTAMP,
        category: post.category ? {
            id: 1,
            name: post.category.label,
            slug: post.category.id,
            description: post.category.description ?? null,
            created_at: FALLBACK_TIMESTAMP
        } : null,
        author: post.author ? {
            id: 1,
            slug: post.author.id,
            name: post.author.name,
            role: post.author.role ?? null,
            avatar_src: post.author.avatarSrc ?? null,
            bio: post.author.bio ?? null
        } : null
    };
}
const apiBlogPosts = __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackPublicContent$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fallbackBlogPosts"].map(toApiBlogPost);
const apiBlogCategories = __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackPublicContent$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fallbackBlogCategories"].map((cat, i)=>({
        id: i + 1,
        name: cat.label,
        slug: cat.id,
        description: cat.description ?? null,
        created_at: FALLBACK_TIMESTAMP
    }));
async function GET(request, { params }) {
    const { slug } = await params;
    const path = slug.join("/");
    // Site settings: /site-settings/{key}
    if (path.startsWith("site-settings/")) {
        const key = path.replace("site-settings/", "");
        const setting = siteSettingsMap[key];
        if (setting) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(setting);
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            detail: "Not found"
        }, {
            status: 404
        });
    }
    // Pages: /pages/{slug}
    if (path.startsWith("pages/")) {
        const pageSlug = path.replace("pages/", "");
        const page = pageMap[pageSlug];
        if (page) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(page);
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            detail: "Not found"
        }, {
            status: 404
        });
    }
    // Blog posts list: /blog/posts
    if (path === "blog/posts") {
        return __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            items: apiBlogPosts,
            total: apiBlogPosts.length,
            page: 1,
            limit: 50,
            pages: 1
        });
    }
    // Single blog post: /blog/posts/{slug}
    if (path.startsWith("blog/posts/")) {
        const postSlug = path.replace("blog/posts/", "");
        const post = apiBlogPosts.find((p)=>p.slug === postSlug);
        if (post) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(post);
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            detail: "Not found"
        }, {
            status: 404
        });
    }
    // Blog categories: /blog/categories
    if (path === "blog/categories") {
        return __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(apiBlogCategories);
    }
    // Jobs: /jobs
    if (path === "jobs") {
        return __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackPublicContent$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fallbackJobs"]);
    }
    // Navigation: /navigation
    if (path === "navigation") {
        return __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json([]);
    }
    // Testimonials: /testimonials
    if (path === "testimonials") {
        return __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json([]);
    }
    // Pricing plans: /pricing/plans
    if (path === "pricing/plans") {
        return __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            items: [],
            total: 0,
            page: 1,
            limit: 50,
            pages: 0
        });
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        detail: "Not found"
    }, {
        status: 404
    });
}
async function POST(request, { params }) {
    const { slug } = await params;
    const path = slug.join("/");
    // Consultations: /consultations
    if (path === "consultations") {
        const trackingId = `EXX-${Math.floor(Math.random() * 90000 + 10000)}`;
        return __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            consultation_id: Math.floor(Math.random() * 9000 + 1000),
            service_request_id: `sr-${Date.now()}`,
            tracking_id: trackingId,
            status: "pending",
            message: "Your consultation request has been received. We will follow up shortly.",
            received_at: new Date().toISOString()
        });
    }
    // Privacy consent: /privacy/consent
    if (path === "privacy/consent") {
        return __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: true
        });
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        detail: "Not found"
    }, {
        status: 404
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__08jx3yz._.js.map