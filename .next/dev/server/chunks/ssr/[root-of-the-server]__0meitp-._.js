module.exports = [
"[project]/joyful-journey/src/exxonim/utils/cn.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
}),
"[project]/joyful-journey/src/exxonim/components/primitives/Container.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Container",
    ()=>Container
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/utils/cn.ts [app-ssr] (ecmascript)");
;
;
function Container({ children, className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('w-[min(1240px,calc(100%-2rem))] mx-auto', className),
        children: children
    }, void 0, false, {
        fileName: "[project]/joyful-journey/src/exxonim/components/primitives/Container.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
}),
"[project]/joyful-journey/src/exxonim/routes.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/joyful-journey/src/exxonim/content/fallbackShell.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/routes.ts [app-ssr] (ecmascript)");
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
const servicesNavigation = createNavigationItem(100, "Services", __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].services, 3, {
    children: [
        createNavigationItem(110, "Business Setup", __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].services, 1, {
            kind: "group",
            parentId: 100,
            children: [
                createNavigationItem(111, "Company Registration", __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].services, 1, {
                    kind: "secondary",
                    parentId: 110
                }),
                createNavigationItem(112, "TIN Application", __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].services, 2, {
                    kind: "secondary",
                    parentId: 110
                }),
                createNavigationItem(113, "Business License Applications", __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].services, 3, {
                    kind: "secondary",
                    parentId: 110
                })
            ]
        }),
        createNavigationItem(120, "Compliance Support", __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].services, 2, {
            kind: "group",
            parentId: 100,
            children: [
                createNavigationItem(121, "Statutory Filings", __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].services, 1, {
                    kind: "secondary",
                    parentId: 120
                }),
                createNavigationItem(122, "Regulatory Renewals", __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].services, 2, {
                    kind: "secondary",
                    parentId: 120
                }),
                createNavigationItem(123, "Operational Advisory", __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].services, 3, {
                    kind: "secondary",
                    parentId: 120
                })
            ]
        })
    ]
});
const resourcesNavigation = createNavigationItem(200, "Resources", __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].resources, 4, {
    children: [
        createNavigationItem(210, "Guides", __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].resources, 1, {
            kind: "group",
            parentId: 200,
            children: [
                createNavigationItem(211, "Blog", __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].resources, 1, {
                    kind: "secondary",
                    parentId: 210
                }),
                createNavigationItem(212, "FAQ", __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].faq, 2, {
                    kind: "secondary",
                    parentId: 210
                }),
                createNavigationItem(213, "Support", __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].support, 3, {
                    kind: "secondary",
                    parentId: 210
                })
            ]
        })
    ]
});
const fallbackBrand = {
    name: "Exxonim Consult",
    lightLogoSrc: lightLogo,
    darkLogoSrc: darkLogo
};
const fallbackCompanyInfo = {
    name: "Exxonim Consult",
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
    createNavigationItem(0, "Home", __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].home, 0),
    createNavigationItem(1, "About", __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].about, 1),
    servicesNavigation,
    resourcesNavigation,
    createNavigationItem(5, "Career", __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].career, 5),
    createNavigationItem(6, "Contact", __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].contact, 6),
    createNavigationItem(7, "Track Consultation", __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].trackConsultation, 7)
];
const fallbackFooter = {
    quick_links: [
        {
            label: "About",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].about
        },
        {
            label: "Services",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].services
        },
        {
            label: "Track Consultation",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].trackConsultation
        },
        {
            label: "Resources",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].resources
        },
        {
            label: "Career",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].career
        },
        {
            label: "Contact",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].contact
        }
    ],
    other_resources: [
        {
            label: "FAQ",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].faq
        },
        {
            label: "Support",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].support
        },
        {
            label: "Terms",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].terms
        },
        {
            label: "Privacy",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].privacy
        }
    ],
    tagline: "Business consulting for registration, licensing, compliance, and operational advisory — with proactive tracking at every step.",
    primary_cta: {
        label: "Contact Exxonim",
        href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].contact
    },
    social_links: [],
    /* Dynamic year: Footer.tsx replaces {YEAR} with new Date().getFullYear() at render time. */ copyright: "© {YEAR} Exxonim Company Limited. Registered Data Controller under Act No. 11 of 2022 (PDPC)."
};
}),
"[project]/joyful-journey/src/exxonim/components/Footer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Footer",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$components$2f$primitives$2f$Container$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/components/primitives/Container.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/routes.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/content/fallbackShell.ts [app-ssr] (ecmascript)");
;
;
;
;
const footerSocialPlatforms = [
    "x",
    "linkedin",
    "instagram"
];
function renderSocialIcon(platform) {
    switch(platform){
        case "instagram":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                "aria-hidden": "true",
                viewBox: "0 0 24 24",
                fill: "currentColor",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2Zm8.37 1.73H7.88A4.15 4.15 0 0 0 3.73 7.88v8.24a4.15 4.15 0 0 0 4.15 4.15h8.24a4.15 4.15 0 0 0 4.15-4.15V7.88a4.15 4.15 0 0 0-4.15-4.15Zm-4.12 3.54A4.73 4.73 0 1 1 7.27 12 4.73 4.73 0 0 1 12 7.27Zm0 1.73A3 3 0 1 0 15 12a3 3 0 0 0-3-3Zm5.02-2.62a1.13 1.13 0 1 1-1.13 1.13 1.13 1.13 0 0 1 1.13-1.13Z"
                }, void 0, false, {
                    fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                    lineNumber: 18,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                lineNumber: 17,
                columnNumber: 9
            }, this);
        case "linkedin":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                "aria-hidden": "true",
                viewBox: "0 0 24 24",
                fill: "currentColor",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M6.94 8.5A1.69 1.69 0 1 0 6.9 5.12a1.69 1.69 0 0 0 .04 3.38ZM5.47 18.88h2.86V9.72H5.47v9.16Zm4.46 0h2.85v-5.11c0-1.35.26-2.66 1.93-2.66 1.65 0 1.67 1.54 1.67 2.75v5.02h2.86v-5.61c0-2.76-.59-4.88-3.82-4.88-1.55 0-2.58.85-3.01 1.65h-.04V9.72H9.93c.04.73 0 9.16 0 9.16Z"
                }, void 0, false, {
                    fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                    lineNumber: 24,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                lineNumber: 23,
                columnNumber: 9
            }, this);
        case "x":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                "aria-hidden": "true",
                viewBox: "0 0 24 24",
                fill: "currentColor",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M18.9 4H21l-4.59 5.24L21.8 20h-4.78l-3.74-4.89L9 20H6.88l4.91-5.61L6.6 4h4.9l3.38 4.47L18.9 4Zm-.75 14.7h1.33L10.79 5.2H9.36l8.79 13.5Z"
                }, void 0, false, {
                    fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                    lineNumber: 30,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                lineNumber: 29,
                columnNumber: 9
            }, this);
        default:
            return null;
    }
}
const navigationLinks = [
    {
        label: "About",
        href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].about
    },
    {
        label: "Services",
        href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].services
    },
    {
        label: "Track Consultation",
        href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].trackConsultation
    },
    {
        label: "Careers",
        href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].career
    }
];
const resourceLinks = [
    {
        label: "Resources",
        href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].resources
    },
    {
        label: "FAQ",
        href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].faq
    },
    {
        label: "Support",
        href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].support
    },
    {
        label: "Privacy Policy",
        href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].privacy
    },
    {
        label: "Terms of Service",
        href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].terms
    }
];
function Footer({ brand, company: _company, footer }) {
    const currentYear = new Date().getFullYear();
    const copyrightText = footer.copyright.replace("{YEAR}", String(currentYear));
    const socialLinks = footerSocialPlatforms.map((platform)=>(footer.social_links ?? []).find((link)=>link.platform === platform && link.isActive && link.url.trim())).filter((link)=>Boolean(link));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        id: "site-footer",
        className: "relative mt-auto border-t border-white/10 dark:border-border-soft bg-[hsl(185,60%,26%)] dark:bg-page",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$components$2f$primitives$2f$Container$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Container"], {
            className: "py-14 pb-24 md:py-20 md:pb-16",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-10 pb-10 border-b border-white/10 dark:border-border-soft",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: "grid gap-5 content-start",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].home,
                                    "aria-label": `${brand.name} home`,
                                    className: "inline-flex items-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: brand.darkLogoSrc,
                                        alt: brand.name,
                                        loading: "lazy",
                                        onError: (event)=>{
                                            const img = event.currentTarget;
                                            if (img.dataset.fallbackApplied) return;
                                            img.dataset.fallbackApplied = "true";
                                            img.src = __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fallbackBrand"].darkLogoSrc;
                                        },
                                        className: "block max-w-[10rem] h-auto"
                                    }, void 0, false, {
                                        fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                                        lineNumber: 87,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                                    lineNumber: 81,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-white/70 dark:text-text-soft text-[0.9375rem] leading-relaxed italic",
                                    style: {
                                        fontFamily: "'Georgia', 'Times New Roman', 'Palatino', serif"
                                    },
                                    children: "Where Innovation Meets Efficiency"
                                }, void 0, false, {
                                    fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                                    lineNumber: 101,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid gap-2.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "text-xs font-extrabold tracking-[0.14em] uppercase text-white/90 dark:text-text",
                                            children: "Follow Us"
                                        }, void 0, false, {
                                            fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                                            lineNumber: 110,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3",
                                            children: socialLinks.length ? socialLinks.map((link, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: link.url,
                                                    target: "_blank",
                                                    rel: "noreferrer noopener",
                                                    "aria-label": `Follow us on ${link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}`,
                                                    title: link.platform.charAt(0).toUpperCase() + link.platform.slice(1),
                                                    className: "inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/10 text-white/70 hover:text-white hover:bg-white/20 dark:bg-accent-soft dark:text-accent dark:hover:text-accent-hover dark:hover:bg-accent-soft-strong transition-all duration-200",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "w-5 h-5 flex items-center justify-center",
                                                        children: renderSocialIcon(link.platform)
                                                    }, void 0, false, {
                                                        fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                                                        lineNumber: 125,
                                                        columnNumber: 23
                                                    }, this)
                                                }, `${link.platform}-${link.url}-${index}`, false, {
                                                    fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                                                    lineNumber: 116,
                                                    columnNumber: 21
                                                }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: "https://x.com/exxonim",
                                                        target: "_blank",
                                                        rel: "noreferrer noopener",
                                                        "aria-label": "Follow us on X",
                                                        className: "inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/10 text-white/70 hover:text-white hover:bg-white/20 dark:bg-accent-soft dark:text-accent dark:hover:text-accent-hover dark:hover:bg-accent-soft-strong transition-all duration-200",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            className: "w-5 h-5",
                                                            viewBox: "0 0 24 24",
                                                            fill: "currentColor",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                                                            }, void 0, false, {
                                                                fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                                                                lineNumber: 139,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                                                            lineNumber: 138,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                                                        lineNumber: 131,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: "https://linkedin.com/company/exxonim",
                                                        target: "_blank",
                                                        rel: "noreferrer noopener",
                                                        "aria-label": "Follow us on LinkedIn",
                                                        className: "inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/10 text-white/70 hover:text-white hover:bg-white/20 dark:bg-accent-soft dark:text-accent dark:hover:text-accent-hover dark:hover:bg-accent-soft-strong transition-all duration-200",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            className: "w-5 h-5",
                                                            viewBox: "0 0 24 24",
                                                            fill: "currentColor",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                                                            }, void 0, false, {
                                                                fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                                                                lineNumber: 151,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                                                            lineNumber: 150,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                                                        lineNumber: 143,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: "https://instagram.com/exxonim",
                                                        target: "_blank",
                                                        rel: "noreferrer noopener",
                                                        "aria-label": "Follow us on Instagram",
                                                        className: "inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/10 text-white/70 hover:text-white hover:bg-white/20 dark:bg-accent-soft dark:text-accent dark:hover:text-accent-hover dark:hover:bg-accent-soft-strong transition-all duration-200",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            className: "w-5 h-5",
                                                            viewBox: "0 0 24 24",
                                                            fill: "currentColor",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                d: "M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2Zm8.37 1.73H7.88A4.15 4.15 0 0 0 3.73 7.88v8.24a4.15 4.15 0 0 0 4.15 4.15h8.24a4.15 4.15 0 0 0 4.15-4.15V7.88a4.15 4.15 0 0 0-4.15-4.15Zm-4.12 3.54A4.73 4.73 0 1 1 7.27 12 4.73 4.73 0 0 1 12 7.27Zm0 1.73A3 3 0 1 0 15 12a3 3 0 0 0-3-3Zm5.02-2.62a1.13 1.13 0 1 1-1.13 1.13 1.13 1.13 0 0 1 1.13-1.13Z"
                                                            }, void 0, false, {
                                                                fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                                                                lineNumber: 163,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                                                            lineNumber: 162,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                                                        lineNumber: 155,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true)
                                        }, void 0, false, {
                                            fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                                            lineNumber: 113,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-white/50 dark:text-text-soft text-sm leading-relaxed",
                                            children: "Stay connected with Exxonim Consult for the latest updates on business consulting, compliance tips, and career opportunities in Tanzania."
                                        }, void 0, false, {
                                            fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                                            lineNumber: 169,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                                    lineNumber: 109,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                            lineNumber: 80,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "text-xs font-extrabold tracking-[0.14em] uppercase text-white/90 dark:text-text mb-5",
                                    children: "Navigation"
                                }, void 0, false, {
                                    fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                                    lineNumber: 177,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                    "aria-label": "Footer navigation",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "grid gap-3",
                                        children: navigationLinks.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: link.href,
                                                    className: "inline-flex items-center text-white/60 dark:text-text-muted text-[0.9375rem] hover:text-white dark:hover:text-accent hover:translate-x-0.5 transition-all duration-200 group",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "w-0 group-hover:w-2 h-0.5 bg-white/60 dark:bg-accent rounded-full mr-0 group-hover:mr-2 transition-all duration-200"
                                                        }, void 0, false, {
                                                            fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                                                            lineNumber: 188,
                                                            columnNumber: 23
                                                        }, this),
                                                        link.label
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                                                    lineNumber: 184,
                                                    columnNumber: 21
                                                }, this)
                                            }, link.label, false, {
                                                fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                                                lineNumber: 183,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                                        lineNumber: 181,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                                    lineNumber: 180,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                            lineNumber: 176,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "text-xs font-extrabold tracking-[0.14em] uppercase text-white/90 dark:text-text mb-5",
                                    children: "Resources & Legal"
                                }, void 0, false, {
                                    fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                                    lineNumber: 199,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "grid gap-3",
                                    children: resourceLinks.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: link.href,
                                                className: "inline-flex items-center text-white/60 dark:text-text-muted text-[0.9375rem] hover:text-white dark:hover:text-accent hover:translate-x-0.5 transition-all duration-200 group",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "w-0 group-hover:w-2 h-0.5 bg-white/60 dark:bg-accent rounded-full mr-0 group-hover:mr-2 transition-all duration-200"
                                                    }, void 0, false, {
                                                        fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                                                        lineNumber: 209,
                                                        columnNumber: 21
                                                    }, this),
                                                    link.label
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                                                lineNumber: 205,
                                                columnNumber: 19
                                            }, this)
                                        }, link.label, false, {
                                            fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                                            lineNumber: 204,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                                    lineNumber: 202,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                            lineNumber: 198,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "text-xs font-extrabold tracking-[0.14em] uppercase text-white/90 dark:text-text mb-5",
                                    children: "Contact Us"
                                }, void 0, false, {
                                    fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                                    lineNumber: 219,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "grid gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "flex items-start gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "w-[1.125rem] h-[1.125rem] mt-0.5 shrink-0 text-white/50 dark:text-accent",
                                                    viewBox: "0 0 24 24",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    strokeWidth: "2",
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            d: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"
                                                        }, void 0, false, {
                                                            fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                                                            lineNumber: 226,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                            cx: "12",
                                                            cy: "10",
                                                            r: "3"
                                                        }, void 0, false, {
                                                            fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                                                            lineNumber: 227,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                                                    lineNumber: 225,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-white/60 dark:text-text-muted text-[0.9375rem] leading-relaxed",
                                                    children: "Mbezi Beach B, Africana, Bagamoyo Road, Block no H, House number 9, Dar es Salaam"
                                                }, void 0, false, {
                                                    fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                                                    lineNumber: 229,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                                            lineNumber: 224,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "flex items-start gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "w-[1.125rem] h-[1.125rem] mt-0.5 shrink-0 text-white/50 dark:text-accent",
                                                    viewBox: "0 0 24 24",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    strokeWidth: "2",
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                            width: "20",
                                                            height: "16",
                                                            x: "2",
                                                            y: "4",
                                                            rx: "2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                                                            lineNumber: 236,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
                                                        }, void 0, false, {
                                                            fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                                                            lineNumber: 237,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                                                    lineNumber: 235,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: "mailto:info@exxonim.tz",
                                                            className: "text-white/60 dark:text-text-muted text-[0.9375rem] hover:text-white dark:hover:text-accent transition-colors duration-200",
                                                            children: "info@exxonim.tz"
                                                        }, void 0, false, {
                                                            fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                                                            lineNumber: 240,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: "mailto:md@exxonim.tz",
                                                            className: "text-white/60 dark:text-text-muted text-[0.9375rem] hover:text-white dark:hover:text-accent transition-colors duration-200",
                                                            children: "md@exxonim.tz"
                                                        }, void 0, false, {
                                                            fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                                                            lineNumber: 243,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                                                    lineNumber: 239,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                                            lineNumber: 234,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "flex items-start gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "w-[1.125rem] h-[1.125rem] mt-0.5 shrink-0 text-white/50 dark:text-accent",
                                                    viewBox: "0 0 24 24",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    strokeWidth: "2",
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                                                    }, void 0, false, {
                                                        fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                                                        lineNumber: 251,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                                                    lineNumber: 250,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: "tel:+255794689099",
                                                            className: "text-white/60 dark:text-text-muted text-[0.9375rem] hover:text-white dark:hover:text-accent transition-colors duration-200",
                                                            children: "+255 794 689 099"
                                                        }, void 0, false, {
                                                            fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                                                            lineNumber: 254,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: "tel:+255685525224",
                                                            className: "text-white/60 dark:text-text-muted text-[0.9375rem] hover:text-white dark:hover:text-accent transition-colors duration-200",
                                                            children: "+255 685 525 224"
                                                        }, void 0, false, {
                                                            fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                                                            lineNumber: 257,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                                                    lineNumber: 253,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                                            lineNumber: 249,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                                    lineNumber: 222,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                            lineNumber: 218,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                    lineNumber: 77,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-white/40 dark:text-text-soft text-sm text-center",
                    children: copyrightText
                }, void 0, false, {
                    fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
                    lineNumber: 268,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
            lineNumber: 76,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/joyful-journey/src/exxonim/components/Footer.tsx",
        lineNumber: 71,
        columnNumber: 5
    }, this);
}
}),
"[project]/joyful-journey/src/exxonim/components/navigation/MenuColumns.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MenuColumns",
    ()=>MenuColumns
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/utils/cn.ts [app-ssr] (ecmascript)");
;
;
function MenuColumns({ columns, onNavigate }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: columns.map((column, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex-1 min-w-[140px]", column.borderLeft && index > 0 && "pl-6 border-l border-border-soft"),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-xs font-extrabold tracking-[0.14em] uppercase text-accent mb-4",
                        children: column.title
                    }, void 0, false, {
                        fileName: "[project]/joyful-journey/src/exxonim/components/navigation/MenuColumns.tsx",
                        lineNumber: 20,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "grid gap-2.5",
                        children: column.items.map((item, itemIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    className: "text-sm text-text-muted hover:text-accent transition-colors",
                                    href: item.href,
                                    onClick: onNavigate,
                                    children: item.label
                                }, void 0, false, {
                                    fileName: "[project]/joyful-journey/src/exxonim/components/navigation/MenuColumns.tsx",
                                    lineNumber: 26,
                                    columnNumber: 17
                                }, this)
                            }, `${column.title}-${item.href}-${itemIndex}`, false, {
                                fileName: "[project]/joyful-journey/src/exxonim/components/navigation/MenuColumns.tsx",
                                lineNumber: 25,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/joyful-journey/src/exxonim/components/navigation/MenuColumns.tsx",
                        lineNumber: 23,
                        columnNumber: 11
                    }, this)
                ]
            }, `${column.title}-${index}`, true, {
                fileName: "[project]/joyful-journey/src/exxonim/components/navigation/MenuColumns.tsx",
                lineNumber: 13,
                columnNumber: 9
            }, this))
    }, void 0, false);
}
}),
"[project]/joyful-journey/src/exxonim/components/navigation/DesktopNavigation.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DesktopNavigation",
    ()=>DesktopNavigation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/lucide-react/dist/esm/icons/chevron-down.mjs [app-ssr] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$components$2f$navigation$2f$MenuColumns$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/components/navigation/MenuColumns.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/routes.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/utils/cn.ts [app-ssr] (ecmascript)");
;
;
;
;
;
const navLinkBase = "relative inline-flex items-center justify-center h-10 px-4 text-sm font-medium text-text rounded-full transition-all hover:bg-accent-soft";
const navLinkActive = "bg-accent-soft text-accent";
function DesktopNavigation({ brandName, leftLinks, rightLinks, highlightLink, desktopMenu, resourcesActive, resourcesColumns, resourcesMenuId, servicesActive, servicesColumns, servicesMenuId, closeAllMenus, isActive, onDropdownBlur, setDesktopMenu }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "hidden xl:flex items-center",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
            className: "inline-flex items-center gap-1 p-1.5 rounded-full bg-surface-soft border border-border-soft",
            "aria-label": "Primary navigation",
            children: [
                leftLinks.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: link.href,
                        "aria-current": isActive(link.href) ? "page" : undefined,
                        onClick: closeAllMenus,
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(navLinkBase, isActive(link.href) && navLinkActive),
                        children: link.label
                    }, link.href, false, {
                        fileName: "[project]/joyful-journey/src/exxonim/components/navigation/DesktopNavigation.tsx",
                        lineNumber: 74,
                        columnNumber: 11
                    }, this)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative",
                    onMouseEnter: ()=>setDesktopMenu("services"),
                    onMouseLeave: ()=>setDesktopMenu(null),
                    onFocusCapture: ()=>setDesktopMenu("services"),
                    onBlur: onDropdownBlur,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].services,
                            "aria-expanded": desktopMenu === "services",
                            "aria-controls": servicesMenuId,
                            "aria-current": servicesActive ? "page" : undefined,
                            onClick: closeAllMenus,
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(navLinkBase, servicesActive && navLinkActive, "group"),
                            children: [
                                "Services",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("ml-1 w-4 h-4 transition-transform", desktopMenu === "services" && "rotate-180"),
                                    "aria-hidden": "true"
                                }, void 0, false, {
                                    fileName: "[project]/joyful-journey/src/exxonim/components/navigation/DesktopNavigation.tsx",
                                    lineNumber: 102,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/joyful-journey/src/exxonim/components/navigation/DesktopNavigation.tsx",
                            lineNumber: 93,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            id: servicesMenuId,
                            "aria-hidden": desktopMenu !== "services",
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all", desktopMenu === "services" ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 pointer-events-none"),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 rounded-2xl bg-surface border border-border-soft shadow-popover min-w-[360px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-4",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$components$2f$navigation$2f$MenuColumns$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuColumns"], {
                                            columns: servicesColumns,
                                            onNavigate: closeAllMenus
                                        }, void 0, false, {
                                            fileName: "[project]/joyful-journey/src/exxonim/components/navigation/DesktopNavigation.tsx",
                                            lineNumber: 123,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/joyful-journey/src/exxonim/components/navigation/DesktopNavigation.tsx",
                                        lineNumber: 122,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3 mt-4 pt-4 border-t border-border-soft",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].services,
                                                onClick: closeAllMenus,
                                                className: "inline-flex items-center justify-center h-10 px-5 rounded-full bg-accent text-accent-contrast text-sm font-extrabold hover:bg-accent-hover transition-all",
                                                children: "See More Services"
                                            }, void 0, false, {
                                                fileName: "[project]/joyful-journey/src/exxonim/components/navigation/DesktopNavigation.tsx",
                                                lineNumber: 126,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].contact,
                                                onClick: closeAllMenus,
                                                className: "text-sm font-medium text-accent hover:underline",
                                                children: [
                                                    "Contact ",
                                                    brandName
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/joyful-journey/src/exxonim/components/navigation/DesktopNavigation.tsx",
                                                lineNumber: 133,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/joyful-journey/src/exxonim/components/navigation/DesktopNavigation.tsx",
                                        lineNumber: 125,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/joyful-journey/src/exxonim/components/navigation/DesktopNavigation.tsx",
                                lineNumber: 121,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/joyful-journey/src/exxonim/components/navigation/DesktopNavigation.tsx",
                            lineNumber: 111,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/joyful-journey/src/exxonim/components/navigation/DesktopNavigation.tsx",
                    lineNumber: 86,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative",
                    onMouseEnter: ()=>setDesktopMenu("resources"),
                    onMouseLeave: ()=>setDesktopMenu(null),
                    onFocusCapture: ()=>setDesktopMenu("resources"),
                    onBlur: onDropdownBlur,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].resources,
                            "aria-expanded": desktopMenu === "resources",
                            "aria-controls": resourcesMenuId,
                            "aria-current": resourcesActive ? "page" : undefined,
                            onClick: closeAllMenus,
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(navLinkBase, resourcesActive && navLinkActive, "group"),
                            children: [
                                "Resources",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("ml-1 w-4 h-4 transition-transform", desktopMenu === "resources" && "rotate-180"),
                                    "aria-hidden": "true"
                                }, void 0, false, {
                                    fileName: "[project]/joyful-journey/src/exxonim/components/navigation/DesktopNavigation.tsx",
                                    lineNumber: 162,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/joyful-journey/src/exxonim/components/navigation/DesktopNavigation.tsx",
                            lineNumber: 153,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            id: resourcesMenuId,
                            "aria-hidden": desktopMenu !== "resources",
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all", desktopMenu === "resources" ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 pointer-events-none"),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 rounded-2xl bg-surface border border-border-soft shadow-popover min-w-[280px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-4",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$components$2f$navigation$2f$MenuColumns$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuColumns"], {
                                            columns: resourcesColumns,
                                            onNavigate: closeAllMenus
                                        }, void 0, false, {
                                            fileName: "[project]/joyful-journey/src/exxonim/components/navigation/DesktopNavigation.tsx",
                                            lineNumber: 183,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/joyful-journey/src/exxonim/components/navigation/DesktopNavigation.tsx",
                                        lineNumber: 182,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3 mt-4 pt-4 border-t border-border-soft",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].resources,
                                                onClick: closeAllMenus,
                                                className: "inline-flex items-center justify-center h-10 px-5 rounded-full bg-accent text-accent-contrast text-sm font-extrabold hover:bg-accent-hover transition-all",
                                                children: "See More"
                                            }, void 0, false, {
                                                fileName: "[project]/joyful-journey/src/exxonim/components/navigation/DesktopNavigation.tsx",
                                                lineNumber: 186,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].contact,
                                                onClick: closeAllMenus,
                                                className: "text-sm font-medium text-accent hover:underline",
                                                children: "Ask a Question"
                                            }, void 0, false, {
                                                fileName: "[project]/joyful-journey/src/exxonim/components/navigation/DesktopNavigation.tsx",
                                                lineNumber: 193,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/joyful-journey/src/exxonim/components/navigation/DesktopNavigation.tsx",
                                        lineNumber: 185,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/joyful-journey/src/exxonim/components/navigation/DesktopNavigation.tsx",
                                lineNumber: 181,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/joyful-journey/src/exxonim/components/navigation/DesktopNavigation.tsx",
                            lineNumber: 171,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/joyful-journey/src/exxonim/components/navigation/DesktopNavigation.tsx",
                    lineNumber: 146,
                    columnNumber: 9
                }, this),
                rightLinks.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: link.href,
                        "aria-current": isActive(link.href) ? "page" : undefined,
                        onClick: closeAllMenus,
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(navLinkBase, isActive(link.href) && navLinkActive),
                        children: link.label
                    }, link.href, false, {
                        fileName: "[project]/joyful-journey/src/exxonim/components/navigation/DesktopNavigation.tsx",
                        lineNumber: 207,
                        columnNumber: 11
                    }, this)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    href: highlightLink.href,
                    onClick: closeAllMenus,
                    "aria-current": isActive(highlightLink.href) ? "page" : undefined,
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("relative inline-flex items-center gap-2 h-10 px-4 rounded-full text-sm font-extrabold transition-all", isActive(highlightLink.href) ? "bg-accent-hover text-accent-contrast ring-2 ring-accent/30" : "bg-accent text-accent-contrast hover:bg-accent-hover"),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "relative flex h-2 w-2",
                            "aria-hidden": "true",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-contrast opacity-75"
                                }, void 0, false, {
                                    fileName: "[project]/joyful-journey/src/exxonim/components/navigation/DesktopNavigation.tsx",
                                    lineNumber: 234,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "relative inline-flex rounded-full h-2 w-2 bg-accent-contrast"
                                }, void 0, false, {
                                    fileName: "[project]/joyful-journey/src/exxonim/components/navigation/DesktopNavigation.tsx",
                                    lineNumber: 235,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/joyful-journey/src/exxonim/components/navigation/DesktopNavigation.tsx",
                            lineNumber: 233,
                            columnNumber: 11
                        }, this),
                        highlightLink.label
                    ]
                }, void 0, true, {
                    fileName: "[project]/joyful-journey/src/exxonim/components/navigation/DesktopNavigation.tsx",
                    lineNumber: 222,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/joyful-journey/src/exxonim/components/navigation/DesktopNavigation.tsx",
            lineNumber: 68,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/joyful-journey/src/exxonim/components/navigation/DesktopNavigation.tsx",
        lineNumber: 67,
        columnNumber: 5
    }, this);
}
}),
"[project]/joyful-journey/src/exxonim/components/navigation/MobileNavigationPanel.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MobileNavigationPanel",
    ()=>MobileNavigationPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/lucide-react/dist/esm/icons/chevron-down.mjs [app-ssr] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/lucide-react/dist/esm/icons/phone.mjs [app-ssr] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/routes.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/utils/cn.ts [app-ssr] (ecmascript)");
;
;
;
;
;
function MobileAccordion({ label, columns, ctaLabel, ctaHref, secondaryLabel, secondaryHref, onClose, defaultOpen = false, isActive: isGroupActive = false }) {
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(defaultOpen || isGroupActive);
    if (!columns.length) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("rounded-xl border overflow-hidden", isGroupActive ? "border-accent/30 bg-accent-soft/30" : "border-border-soft bg-surface-elevated"),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                "aria-expanded": open,
                onClick: ()=>setOpen((value)=>!value),
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("w-full flex items-center justify-between gap-3 px-4 py-3 text-left transition-colors", isGroupActive ? "bg-accent-soft/40" : "hover:bg-accent-soft/40"),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-xs font-extrabold tracking-[0.14em] uppercase text-accent"),
                        children: [
                            label,
                            isGroupActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full bg-accent text-accent-contrast text-[0.55rem] font-bold",
                                children: "Active"
                            }, void 0, false, {
                                fileName: "[project]/joyful-journey/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                                lineNumber: 88,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/joyful-journey/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                        lineNumber: 83,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("w-4 h-4 text-accent transition-transform", open && "rotate-180"),
                        "aria-hidden": "true"
                    }, void 0, false, {
                        fileName: "[project]/joyful-journey/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                        lineNumber: 93,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/joyful-journey/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("grid transition-all duration-300 ease-out", open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "overflow-hidden",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-4 pb-4 pt-1 grid gap-4",
                        children: [
                            columns.map((column)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[11px] font-bold tracking-wider uppercase text-text-muted",
                                            children: column.title
                                        }, void 0, false, {
                                            fileName: "[project]/joyful-journey/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                                            lineNumber: 112,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            className: "grid gap-1",
                                            children: column.items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: item.href,
                                                        onClick: onClose,
                                                        className: "block py-1.5 text-sm text-text hover:text-accent transition-colors",
                                                        children: item.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/joyful-journey/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                                                        lineNumber: 118,
                                                        columnNumber: 23
                                                    }, this)
                                                }, `${item.href}-${item.label}`, false, {
                                                    fileName: "[project]/joyful-journey/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                                                    lineNumber: 117,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/joyful-journey/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                                            lineNumber: 115,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, column.title, true, {
                                    fileName: "[project]/joyful-journey/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                                    lineNumber: 111,
                                    columnNumber: 15
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center gap-3 pt-3 border-t border-border-soft",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: ctaHref,
                                        onClick: onClose,
                                        className: "inline-flex items-center justify-center h-9 px-4 rounded-full bg-accent text-accent-contrast text-sm font-extrabold hover:bg-accent-hover transition-all",
                                        children: ctaLabel
                                    }, void 0, false, {
                                        fileName: "[project]/joyful-journey/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                                        lineNumber: 131,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: secondaryHref,
                                        onClick: onClose,
                                        className: "text-sm font-medium text-accent hover:underline",
                                        children: secondaryLabel
                                    }, void 0, false, {
                                        fileName: "[project]/joyful-journey/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                                        lineNumber: 138,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/joyful-journey/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                                lineNumber: 130,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/joyful-journey/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                        lineNumber: 109,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/joyful-journey/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                    lineNumber: 108,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/joyful-journey/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                lineNumber: 102,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/joyful-journey/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
function MobileNavigationPanel({ brandName, callHref, currentPath, regularLinks, highlightLink, id, isOpen, resourcesActive, servicesActive, resourcesColumns, servicesColumns, panelRef, primaryPhone, isActive, onClose }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        id: id,
        "aria-hidden": !isOpen,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("fixed inset-0 z-40 xl:hidden transition-opacity duration-200", isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                "aria-label": "Close navigation",
                tabIndex: isOpen ? 0 : -1,
                onClick: onClose,
                className: "absolute inset-0 bg-surface-strong/60 backdrop-blur-sm"
            }, void 0, false, {
                fileName: "[project]/joyful-journey/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                lineNumber: 179,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-[78px] right-4 left-4 sm:left-auto sm:w-[min(420px,calc(100vw-2rem))]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ref: panelRef,
                    role: "dialog",
                    "aria-modal": "true",
                    "aria-label": "Site navigation",
                    tabIndex: -1,
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("max-h-[calc(100vh-100px)] overflow-y-auto rounded-2xl border border-border-soft bg-surface p-4 shadow-popover transition-all duration-300 ease-out", isOpen ? "translate-y-0 opacity-100 scale-100" : "-translate-y-3 opacity-0 scale-[0.98]"),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid gap-1",
                                children: regularLinks.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: link.href,
                                        onClick: onClose,
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex items-center justify-between px-4 h-11 rounded-full text-sm font-medium transition-colors", isActive(link.href) ? "bg-accent text-accent-contrast" : "text-text hover:bg-accent-soft"),
                                        children: link.label
                                    }, link.href, false, {
                                        fileName: "[project]/joyful-journey/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                                        lineNumber: 205,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/joyful-journey/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                                lineNumber: 203,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MobileAccordion, {
                                label: "Services",
                                columns: servicesColumns,
                                ctaLabel: "See All Services",
                                ctaHref: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].services,
                                secondaryLabel: `Contact ${brandName}`,
                                secondaryHref: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].contact,
                                onClose: onClose,
                                isActive: servicesActive
                            }, void 0, false, {
                                fileName: "[project]/joyful-journey/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                                lineNumber: 222,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MobileAccordion, {
                                label: "Resources",
                                columns: resourcesColumns,
                                ctaLabel: "See All Resources",
                                ctaHref: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].resources,
                                secondaryLabel: "Ask a Question",
                                secondaryHref: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].contact,
                                onClose: onClose,
                                isActive: resourcesActive
                            }, void 0, false, {
                                fileName: "[project]/joyful-journey/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                                lineNumber: 234,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: highlightLink.href,
                                onClick: onClose,
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex items-center justify-center gap-2 h-11 rounded-full font-extrabold text-sm transition-all", isActive(highlightLink.href) ? "bg-accent-hover text-accent-contrast ring-2 ring-accent/30" : "bg-accent text-accent-contrast hover:bg-accent-hover"),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "relative flex h-2 w-2",
                                        "aria-hidden": "true",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-contrast opacity-75"
                                            }, void 0, false, {
                                                fileName: "[project]/joyful-journey/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                                                lineNumber: 259,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "relative inline-flex rounded-full h-2 w-2 bg-accent-contrast"
                                            }, void 0, false, {
                                                fileName: "[project]/joyful-journey/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                                                lineNumber: 260,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/joyful-journey/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                                        lineNumber: 258,
                                        columnNumber: 15
                                    }, this),
                                    highlightLink.label
                                ]
                            }, void 0, true, {
                                fileName: "[project]/joyful-journey/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                                lineNumber: 248,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: callHref,
                                onClick: onClose,
                                className: "flex items-center justify-center gap-3 h-14 rounded-full bg-accent text-accent-contrast hover:bg-accent-hover transition-all",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                        className: "w-5 h-5 animate-phone-ring",
                                        "aria-hidden": "true"
                                    }, void 0, false, {
                                        fileName: "[project]/joyful-journey/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                                        lineNumber: 271,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-extrabold",
                                        children: primaryPhone ? "Call Now" : `Contact ${brandName}`
                                    }, void 0, false, {
                                        fileName: "[project]/joyful-journey/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                                        lineNumber: 272,
                                        columnNumber: 15
                                    }, this),
                                    primaryPhone ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-accent-contrast/80 text-sm",
                                        children: primaryPhone
                                    }, void 0, false, {
                                        fileName: "[project]/joyful-journey/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                                        lineNumber: 276,
                                        columnNumber: 17
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/joyful-journey/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                                lineNumber: 266,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/joyful-journey/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                        lineNumber: 201,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/joyful-journey/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                    lineNumber: 188,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/joyful-journey/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                lineNumber: 187,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/joyful-journey/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
        lineNumber: 171,
        columnNumber: 5
    }, this);
}
}),
"[project]/joyful-journey/src/exxonim/components/navigation/ThemeToggle.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeToggle",
    ()=>ThemeToggle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/lucide-react/dist/esm/icons/moon.mjs [app-ssr] (ecmascript) <export default as Moon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/lucide-react/dist/esm/icons/sun.mjs [app-ssr] (ecmascript) <export default as Sun>");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/utils/cn.ts [app-ssr] (ecmascript)");
;
;
;
function ThemeToggle({ className, theme, onToggleTheme }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("relative inline-flex items-center justify-center w-12 h-7 rounded-full border border-border-soft bg-surface-soft transition-all", "hover:border-accent/50", className),
        type: "button",
        "data-theme": theme,
        "aria-pressed": theme === "dark",
        onClick: onToggleTheme,
        "aria-label": `Toggle theme. Current theme is ${theme}.`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("absolute top-1 w-5 h-5 rounded-full bg-surface shadow-md transition-transform duration-300 flex items-center justify-center", theme === "dark" ? "translate-x-2.5" : "-translate-x-2.5"),
            "aria-hidden": "true",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__["Sun"], {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("w-3 h-3 text-accent transition-opacity", theme === "dark" ? "opacity-0" : "opacity-100")
                }, void 0, false, {
                    fileName: "[project]/joyful-journey/src/exxonim/components/navigation/ThemeToggle.tsx",
                    lineNumber: 36,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__["Moon"], {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("absolute w-3 h-3 text-accent transition-opacity", theme === "dark" ? "opacity-100" : "opacity-0")
                }, void 0, false, {
                    fileName: "[project]/joyful-journey/src/exxonim/components/navigation/ThemeToggle.tsx",
                    lineNumber: 42,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/joyful-journey/src/exxonim/components/navigation/ThemeToggle.tsx",
            lineNumber: 29,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/joyful-journey/src/exxonim/components/navigation/ThemeToggle.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
}),
"[project]/joyful-journey/src/exxonim/content/staticNavigation.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "staticNav",
    ()=>staticNav
]);
/**
 * Static navigation configuration for the Exxonim public website.
 *
 * BACKEND / ADMIN INTEGRATION NOTES (FastAPI + PostgreSQL):
 * ─────────────────────────────────────────────────────
 * Navigation is HARDCODED and does NOT require API calls.
 * To add, remove, or reorder navigation items, edit this file and redeploy.
 *
 * In a future phase, if the admin panel needs to manage navigation dynamically,
 * the FastAPI backend should expose a GET /navigation endpoint that returns a
 * structure matching the types used here (MenuItem, MenuColumn), and the
 * Navigation component can be updated to fetch from that API with this config
 * as the fallback. See the deprecated navigationService.ts for the previous
 * API integration pattern.
 *
 * Guidelines for nav structure:
 * ─────────────────────────────
 * - Max 4–5 regular links (leftLinks + rightLinks combined) to avoid overflow
 *   on desktop. The nav pill uses `hidden xl:flex` so it only shows on ≥1280px.
 * - Max 2 dropdown groups per menu (Services, Resources).
 * - Max 5 items per dropdown group (keeps dropdowns compact).
 * - Dropdown item `href` values should point to valid routes defined in routes.ts
 *   OR be valid external URLs (https://...).
 * - The `highlightLink` is for the primary differentiator service. It renders
 *   with a distinctive accent-colored pill and animated indicator dot so it
 *   stands out from regular links.
 * - When adding a new page route, also update:
 *     1. routes.ts — add the route constant
 *     2. src/exxonim/pages/ — create the page component
 *     3. src/exxonim/app/App.tsx — add the static route entry
 *   The admin UI should warn that new routes require a code deploy.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/routes.ts [app-ssr] (ecmascript)");
;
const staticNav = {
    /** Links rendered before the dropdown menus (left side of nav pill) */ leftLinks: [
        {
            label: "Home",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].home
        },
        {
            label: "About",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].about
        }
    ],
    /** Services dropdown columns — rendered as a hover/focus dropdown
   *
   * BACKEND: These reflect Exxonim's 5 core service areas:
   *   1. Entity Setup & Registration
   *   2. Tax & Licensing
   *   3. Work Permits & Immigration
   *   4. Compliance & Statutory Filings
   *   5. Operational Advisory
   *
   * Split into 2 columns for the dropdown layout:
   *   Column 1 — Registration & Setup (3 items)
   *   Column 2 — Compliance & Operations (3 items)
   */ servicesColumns: [
        {
            title: "Registration & Setup",
            items: [
                {
                    label: "Entity Registration",
                    href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].services
                },
                {
                    label: "Tax & Licensing",
                    href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].services
                },
                {
                    label: "Work Permits & Immigration",
                    href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].services
                }
            ]
        },
        {
            title: "Compliance & Operations",
            borderLeft: true,
            items: [
                {
                    label: "Statutory Filings",
                    href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].services
                },
                {
                    label: "Regulatory Renewals",
                    href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].services
                },
                {
                    label: "Operational Advisory",
                    href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].services
                }
            ]
        }
    ],
    /** Resources dropdown columns — rendered as a hover/focus dropdown */ resourcesColumns: [
        {
            title: "Guides",
            items: [
                {
                    label: "Blog",
                    href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].blog
                },
                {
                    label: "FAQ",
                    href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].faq
                },
                {
                    label: "Support",
                    href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].support
                }
            ]
        }
    ],
    /** Links rendered after the dropdown menus (right side of nav pill) */ rightLinks: [
        {
            label: "Career",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].career
        },
        {
            label: "Contact",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].contact
        }
    ],
    /**
   * Prominent highlighted link — Track Consultation is Exxonim's CORE DIFFERENTIATOR.
   *
   * This is not just another service — it's the automated tracking system that
   * sets Exxonim apart from every competitor in Tanzania. No other consultancy
   * advertises proactive client updates or application tracking.
   *
   * How it works:
   *   - Every engagement gets a unique tracking number (e.g., EXX-24091).
   *   - At every milestone, the system sends proactive updates via WhatsApp,
   *     email, or SMS — the client chooses their preferred channel.
   *   - The client never needs to call to ask "What's happening?"
   *   - No login, no dashboard — just enter a tracking number on the website
   *     for an instant status lookup.
   *
   * BACKEND: If the admin renames or re-points this link in the future,
   * update the label and href here. The visual treatment (accent pill + dot)
   * is hardcoded in DesktopNavigation.tsx and MobileNavigationPanel.tsx.
   */ highlightLink: {
        label: "Track Consultation",
        href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].trackConsultation
    }
};
}),
"[project]/joyful-journey/src/exxonim/components/navigation/useMobileMenuFocusTrap.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useMobileMenuFocusTrap",
    ()=>useMobileMenuFocusTrap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
function getFocusableElements(node) {
    return Array.from(node.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter((element)=>!element.hasAttribute("disabled"));
}
function useMobileMenuFocusTrap(isOpen, panelRef, fallbackRef) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isOpen) {
            return;
        }
        const panel = panelRef.current;
        const previousActiveElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        if (!panel) {
            return;
        }
        const focusableElements = getFocusableElements(panel);
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        if (firstElement) {
            firstElement.focus();
        } else {
            panel.focus();
        }
        const handleKeyDown = (event)=>{
            if (event.key !== "Tab") {
                return;
            }
            if (!focusableElements.length) {
                event.preventDefault();
                panel.focus();
                return;
            }
            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            } else if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return ()=>{
            document.removeEventListener("keydown", handleKeyDown);
            if (previousActiveElement && typeof previousActiveElement.focus === "function") {
                previousActiveElement.focus();
            } else {
                fallbackRef.current?.focus();
            }
        };
    }, [
        fallbackRef,
        isOpen,
        panelRef
    ]);
}
}),
"[project]/joyful-journey/src/exxonim/components/Navigation.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Navigation",
    ()=>Navigation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/lucide-react/dist/esm/icons/menu.mjs [app-ssr] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/lucide-react/dist/esm/icons/phone.mjs [app-ssr] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/lucide-react/dist/esm/icons/x.mjs [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$components$2f$navigation$2f$DesktopNavigation$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/components/navigation/DesktopNavigation.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$components$2f$navigation$2f$MobileNavigationPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/components/navigation/MobileNavigationPanel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$components$2f$navigation$2f$ThemeToggle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/components/navigation/ThemeToggle.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$staticNavigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/content/staticNavigation.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/content/fallbackShell.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$components$2f$navigation$2f$useMobileMenuFocusTrap$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/components/navigation/useMobileMenuFocusTrap.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/routes.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/utils/cn.ts [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
function getHrefPath(href) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizePathname"])(href.split("#")[0]);
}
/** Pages that are children of the "Resources" nav dropdown.
 *  When the user is on any of these paths, the Resources nav
 *  item should appear active — not Home or nothing. */ const RESOURCE_CHILD_PATHS = new Set([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizePathname"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].faq),
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizePathname"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].support),
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizePathname"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].terms),
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizePathname"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].privacy),
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizePathname"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].cookies),
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizePathname"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].dataRights),
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizePathname"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].blog)
]);
/** Check if a path is a resource page or a resource child page.
 *  Matches: /resources, /blog, /faq, /support, /terms, /privacy,
 *  /cookies, /data-rights, and any /resources/{slug} article. */ function isResourcesPath(path) {
    if (path === (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizePathname"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].resources)) return true;
    if (RESOURCE_CHILD_PATHS.has(path)) return true;
    // Blog article paths: /resources/{slug} or /blog/{slug}
    const segments = path.split("/").filter(Boolean);
    if (segments.length === 2 && (segments[0] === "resources" || segments[0] === "blog")) {
        return true;
    }
    return false;
}
function Navigation({ brand, company, pathname, theme, onToggleTheme }) {
    const brandName = company.name?.trim() || brand.name;
    const mobilePanelRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mobileToggleRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const servicesMenuId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useId"])();
    const resourcesMenuId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useId"])();
    const mobileMenuId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useId"])();
    const currentPath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizePathname"])(pathname);
    const [desktopMenu, setDesktopMenu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [mobileMenuOpen, setMobileMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const primaryPhone = company.phones[0];
    const callHref = primaryPhone ? `tel:${primaryPhone.replace(/\s+/g, "")}` : __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].contact;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        document.body.classList.toggle("overflow-hidden", mobileMenuOpen);
        return ()=>{
            document.body.classList.remove("overflow-hidden");
        };
    }, [
        mobileMenuOpen
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$components$2f$navigation$2f$useMobileMenuFocusTrap$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMobileMenuFocusTrap"])(mobileMenuOpen, mobilePanelRef, mobileToggleRef);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleViewportChange = ()=>{
            if (window.innerWidth >= 1280) {
                setMobileMenuOpen(false);
            }
            setDesktopMenu(null);
        };
        window.addEventListener("resize", handleViewportChange);
        window.addEventListener("orientationchange", handleViewportChange);
        return ()=>{
            window.removeEventListener("resize", handleViewportChange);
            window.removeEventListener("orientationchange", handleViewportChange);
        };
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleKeyDown = (event)=>{
            if (event.key === "Escape") {
                setDesktopMenu(null);
                setMobileMenuOpen(false);
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return ()=>document.removeEventListener("keydown", handleKeyDown);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: close menus on navigation
        setDesktopMenu(null);
        setMobileMenuOpen(false);
    }, [
        pathname
    ]);
    const isActive = (href)=>getHrefPath(href) === currentPath;
    const closeAllMenus = ()=>{
        setDesktopMenu(null);
        setMobileMenuOpen(false);
    };
    const handleDropdownBlur = (event)=>{
        const nextTarget = event.relatedTarget;
        if (nextTarget instanceof Node && event.currentTarget.contains(nextTarget)) {
            return;
        }
        setDesktopMenu(null);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                "data-theme": theme,
                className: "fixed top-0 inset-x-0 z-50 h-[70px] bg-surface/86 backdrop-blur-xl border-b border-border-soft transition-all [--header-height:70px]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-full w-full px-[clamp(12px,2vw,24px)] flex xl:grid xl:grid-cols-[1fr_auto_1fr] items-center justify-between xl:justify-center gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].home,
                            onClick: closeAllMenus,
                            "aria-label": `${brand.name} home`,
                            className: "flex items-center min-w-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: brand.lightLogoSrc,
                                    alt: brand.name,
                                    onError: (event)=>{
                                        const img = event.currentTarget;
                                        if (img.dataset.fallbackApplied) return;
                                        img.dataset.fallbackApplied = "true";
                                        img.src = __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fallbackBrand"].lightLogoSrc;
                                    },
                                    className: "block h-9 w-auto dark:hidden"
                                }, void 0, false, {
                                    fileName: "[project]/joyful-journey/src/exxonim/components/Navigation.tsx",
                                    lineNumber: 193,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: brand.darkLogoSrc,
                                    alt: "",
                                    "aria-hidden": "true",
                                    onError: (event)=>{
                                        const img = event.currentTarget;
                                        if (img.dataset.fallbackApplied) return;
                                        img.dataset.fallbackApplied = "true";
                                        img.src = __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fallbackBrand"].darkLogoSrc;
                                    },
                                    className: "hidden h-9 w-auto dark:block"
                                }, void 0, false, {
                                    fileName: "[project]/joyful-journey/src/exxonim/components/Navigation.tsx",
                                    lineNumber: 206,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/joyful-journey/src/exxonim/components/Navigation.tsx",
                            lineNumber: 184,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$components$2f$navigation$2f$DesktopNavigation$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DesktopNavigation"], {
                            brandName: brandName,
                            leftLinks: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$staticNavigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["staticNav"].leftLinks,
                            rightLinks: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$staticNavigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["staticNav"].rightLinks,
                            highlightLink: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$staticNavigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["staticNav"].highlightLink,
                            desktopMenu: desktopMenu,
                            resourcesActive: isResourcesPath(currentPath),
                            resourcesColumns: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$staticNavigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["staticNav"].resourcesColumns,
                            resourcesMenuId: resourcesMenuId,
                            servicesActive: currentPath === (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizePathname"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].services),
                            servicesColumns: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$staticNavigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["staticNav"].servicesColumns,
                            servicesMenuId: servicesMenuId,
                            closeAllMenus: closeAllMenus,
                            isActive: isActive,
                            onDropdownBlur: handleDropdownBlur,
                            setDesktopMenu: setDesktopMenu
                        }, void 0, false, {
                            fileName: "[project]/joyful-journey/src/exxonim/components/Navigation.tsx",
                            lineNumber: 221,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 md:gap-3 justify-end",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$components$2f$navigation$2f$ThemeToggle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ThemeToggle"], {
                                    theme: theme,
                                    onToggleTheme: onToggleTheme
                                }, void 0, false, {
                                    fileName: "[project]/joyful-journey/src/exxonim/components/Navigation.tsx",
                                    lineNumber: 241,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: callHref,
                                    className: "hidden md:inline-flex items-center gap-3 h-12 pl-3 pr-5 rounded-full bg-accent-soft hover:bg-accent-hover transition-all",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-center w-8 h-8 rounded-full bg-accent text-accent-contrast animate-phone-ring",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                                className: "w-4 h-4",
                                                "aria-hidden": "true"
                                            }, void 0, false, {
                                                fileName: "[project]/joyful-journey/src/exxonim/components/Navigation.tsx",
                                                lineNumber: 256,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/joyful-journey/src/exxonim/components/Navigation.tsx",
                                            lineNumber: 255,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[10px] font-extrabold uppercase tracking-wider text-accent",
                                                    children: primaryPhone ? "Call Now" : `Contact ${brandName}`
                                                }, void 0, false, {
                                                    fileName: "[project]/joyful-journey/src/exxonim/components/Navigation.tsx",
                                                    lineNumber: 259,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm font-medium text-text",
                                                    children: primaryPhone || "Open the contact page"
                                                }, void 0, false, {
                                                    fileName: "[project]/joyful-journey/src/exxonim/components/Navigation.tsx",
                                                    lineNumber: 262,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/joyful-journey/src/exxonim/components/Navigation.tsx",
                                            lineNumber: 258,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/joyful-journey/src/exxonim/components/Navigation.tsx",
                                    lineNumber: 251,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    ref: mobileToggleRef,
                                    type: "button",
                                    "aria-expanded": mobileMenuOpen,
                                    "aria-controls": mobileMenuId,
                                    "aria-label": mobileMenuOpen ? "Close navigation" : "Open navigation",
                                    onClick: ()=>{
                                        setDesktopMenu(null);
                                        setMobileMenuOpen((open)=>!open);
                                    },
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("inline-flex xl:hidden items-center justify-center w-11 h-11 rounded-full border transition-all", mobileMenuOpen ? "bg-accent text-accent-contrast border-accent" : "bg-surface text-text border-border-soft hover:border-accent"),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "sr-only",
                                            children: "Toggle navigation"
                                        }, void 0, false, {
                                            fileName: "[project]/joyful-journey/src/exxonim/components/Navigation.tsx",
                                            lineNumber: 285,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("w-6 h-6", mobileMenuOpen && "hidden"),
                                            "aria-hidden": "true"
                                        }, void 0, false, {
                                            fileName: "[project]/joyful-journey/src/exxonim/components/Navigation.tsx",
                                            lineNumber: 286,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("w-6 h-6", !mobileMenuOpen && "hidden"),
                                            "aria-hidden": "true"
                                        }, void 0, false, {
                                            fileName: "[project]/joyful-journey/src/exxonim/components/Navigation.tsx",
                                            lineNumber: 290,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/joyful-journey/src/exxonim/components/Navigation.tsx",
                                    lineNumber: 268,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/joyful-journey/src/exxonim/components/Navigation.tsx",
                            lineNumber: 240,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/joyful-journey/src/exxonim/components/Navigation.tsx",
                    lineNumber: 182,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/joyful-journey/src/exxonim/components/Navigation.tsx",
                lineNumber: 177,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$components$2f$navigation$2f$MobileNavigationPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MobileNavigationPanel"], {
                brandName: brandName,
                callHref: callHref,
                currentPath: currentPath,
                regularLinks: [
                    ...__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$staticNavigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["staticNav"].leftLinks,
                    ...__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$staticNavigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["staticNav"].rightLinks
                ],
                highlightLink: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$staticNavigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["staticNav"].highlightLink,
                id: mobileMenuId,
                isOpen: mobileMenuOpen,
                resourcesActive: isResourcesPath(currentPath),
                servicesActive: currentPath === (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizePathname"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].services),
                resourcesColumns: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$staticNavigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["staticNav"].resourcesColumns,
                servicesColumns: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$staticNavigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["staticNav"].servicesColumns,
                panelRef: mobilePanelRef,
                primaryPhone: primaryPhone,
                isActive: isActive,
                onClose: ()=>setMobileMenuOpen(false)
            }, void 0, false, {
                fileName: "[project]/joyful-journey/src/exxonim/components/Navigation.tsx",
                lineNumber: 299,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/joyful-journey/src/exxonim/components/PageLoader.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PageLoader",
    ()=>PageLoader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
function PageLoader({ isLoading = true, delay = 300 }) {
    const [showLoader, setShowLoader] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(isLoading);
    const [isHidden, setIsHidden] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isLoading) {
            const hideTimer = setTimeout(()=>{
                setIsHidden(true);
                const removeTimer = setTimeout(()=>{
                    setShowLoader(false);
                }, 500);
                return ()=>clearTimeout(removeTimer);
            }, delay);
            return ()=>clearTimeout(hideTimer);
        } else {
            // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: show loader when loading starts
            setShowLoader(true);
            setIsHidden(false);
        }
    }, [
        isLoading,
        delay
    ]);
    if (!showLoader) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `fixed inset-0 z-[9999] flex items-center justify-center bg-[linear-gradient(135deg,var(--color-page)_0%,var(--color-page-strong)_100%)] transition-opacity duration-500 ease-[cubic-bezier(0.25,1,0.25,1)] ${isHidden ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"}`,
        "aria-hidden": isHidden,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center gap-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative w-12 h-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 rounded-full border-[3px] border-transparent border-t-accent border-r-accent-secondary animate-[page-loader-spin_1.2s_linear_infinite]"
                        }, void 0, false, {
                            fileName: "[project]/joyful-journey/src/exxonim/components/PageLoader.tsx",
                            lineNumber: 39,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-[8px] rounded-full border-[3px] border-transparent border-t-accent-secondary animate-[page-loader-spin_1.8s_linear_infinite_reverse]"
                        }, void 0, false, {
                            fileName: "[project]/joyful-journey/src/exxonim/components/PageLoader.tsx",
                            lineNumber: 40,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-[16px] rounded-full border-[3px] border-transparent border-t-accent animate-[page-loader-spin_2.4s_linear_infinite]"
                        }, void 0, false, {
                            fileName: "[project]/joyful-journey/src/exxonim/components/PageLoader.tsx",
                            lineNumber: 41,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/joyful-journey/src/exxonim/components/PageLoader.tsx",
                    lineNumber: 38,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "font-sans text-sm font-medium text-text-muted tracking-[0.08em] uppercase animate-[page-loader-fade_1.6s_ease-in-out_infinite]",
                    children: "Loading"
                }, void 0, false, {
                    fileName: "[project]/joyful-journey/src/exxonim/components/PageLoader.tsx",
                    lineNumber: 43,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/joyful-journey/src/exxonim/components/PageLoader.tsx",
            lineNumber: 37,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/joyful-journey/src/exxonim/components/PageLoader.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
}),
"[project]/joyful-journey/src/exxonim/shared/api/baseUrl.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resolveApiBaseUrl",
    ()=>resolveApiBaseUrl
]);
function resolveApiBaseUrl(explicitBaseUrl) {
    if (explicitBaseUrl) {
        return explicitBaseUrl;
    }
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return "http://127.0.0.1:8000/api/v1";
}
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/tty [external] (tty, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/http2 [external] (http2, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http2", () => require("http2"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[project]/joyful-journey/src/exxonim/shared/api/http.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createHttpClient",
    ()=>createHttpClient,
    "setAuthorizationHeader",
    ()=>setAuthorizationHeader,
    "setRequestHeader",
    ()=>setRequestHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$axios$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/axios/index.js [app-ssr] (ecmascript) <locals>");
;
function createHttpClient(baseURL, timeout = 5000) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].create({
        baseURL,
        timeout
    });
}
function setAuthorizationHeader(config, token) {
    setRequestHeader(config, "Authorization", `Bearer ${token}`);
}
function setRequestHeader(config, headerName, value) {
    if (config.headers && "set" in config.headers) {
        config.headers.set(headerName, value);
        return;
    }
    if (!config.headers) {
        config.headers = new __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$axios$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["AxiosHeaders"]();
    }
    if ("set" in config.headers) {
        config.headers.set(headerName, value);
        return;
    }
    config.headers[headerName] = value;
}
}),
"[project]/joyful-journey/src/exxonim/app/apiClient.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "api",
    ()=>api
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$shared$2f$api$2f$baseUrl$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/shared/api/baseUrl.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$shared$2f$api$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/shared/api/http.ts [app-ssr] (ecmascript)");
;
;
function getApiUrl() {
    if (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_API_URL) {
        return process.env.NEXT_PUBLIC_API_URL;
    }
    return undefined;
}
const api = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$shared$2f$api$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createHttpClient"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$shared$2f$api$2f$baseUrl$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveApiBaseUrl"])(getApiUrl()));
}),
"[project]/joyful-journey/src/exxonim/shared/api/routes.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "apiRoutes",
    ()=>apiRoutes
]);
const apiRoutes = {
    admin: {
        auth: {
            login: "/admin/auth/login",
            refresh: "/admin/auth/refresh",
            logout: "/admin/auth/logout",
            me: "/admin/auth/me"
        },
        blog: {
            posts: {
                list: "/admin/blog/posts",
                byId: (id)=>`/admin/blog/posts/${id}`,
                submit: (id)=>`/admin/blog/posts/${id}/submit`,
                approve: (id)=>`/admin/blog/posts/${id}/approve`,
                reject: (id)=>`/admin/blog/posts/${id}/reject`,
                publish: (id)=>`/admin/blog/posts/${id}/publish`,
                archive: (id)=>`/admin/blog/posts/${id}/archive`,
                previewToken: (id)=>`/admin/blog/posts/${id}/preview-token`
            },
            categories: {
                list: "/admin/blog/categories",
                byId: (id)=>`/admin/blog/categories/${id}`
            },
            authors: {
                list: "/admin/blog/authors",
                byId: (id)=>`/admin/blog/authors/${id}`,
                me: "/admin/blog/authors/me"
            }
        },
        media: {
            list: "/admin/media",
            byId: (id)=>`/admin/media/${id}`,
            upload: "/admin/media/upload"
        },
        pages: {
            list: "/admin/pages",
            byId: (id)=>`/admin/pages/${id}`,
            submit: (id)=>`/admin/pages/${id}/submit`,
            approve: (id)=>`/admin/pages/${id}/approve`,
            reject: (id)=>`/admin/pages/${id}/reject`,
            publish: (id)=>`/admin/pages/${id}/publish`,
            archive: (id)=>`/admin/pages/${id}/archive`
        },
        navigation: {
            list: "/admin/navigation",
            byId: (id)=>`/admin/navigation/${id}`
        },
        pricing: {
            plans: {
                list: "/admin/pricing/plans",
                byId: (id)=>`/admin/pricing/plans/${id}`
            }
        },
        testimonials: {
            list: "/admin/testimonials",
            byId: (id)=>`/admin/testimonials/${id}`,
            submit: (id)=>`/admin/testimonials/${id}/submit`,
            approve: (id)=>`/admin/testimonials/${id}/approve`,
            reject: (id)=>`/admin/testimonials/${id}/reject`,
            publish: (id)=>`/admin/testimonials/${id}/publish`,
            archive: (id)=>`/admin/testimonials/${id}/archive`
        },
        jobs: {
            list: "/admin/jobs",
            bySlug: (slug)=>`/admin/jobs/${slug}`
        },
        consultations: {
            list: "/admin/consultations",
            byId: (id)=>`/admin/consultations/${id}`
        },
        serviceTypes: "/admin/service-types",
        customers: {
            list: "/admin/customers",
            byId: (id)=>`/admin/customers/${id}`,
            timeline: (id)=>`/admin/customers/${id}/timeline`
        },
        serviceRequests: {
            list: "/admin/service-requests",
            byId: (id)=>`/admin/service-requests/${id}`,
            markRead: (id)=>`/admin/service-requests/${id}/mark-read`,
            status: (id)=>`/admin/service-requests/${id}/status`,
            bulkMarkRead: "/admin/service-requests/bulk/mark-read",
            bulkStatus: "/admin/service-requests/bulk/status",
            bulkAssign: "/admin/service-requests/bulk/assign",
            bulkPriority: "/admin/service-requests/bulk/priority",
            assignments: (id)=>`/admin/service-requests/${id}/assignments`,
            assignmentById: (id, assignmentId)=>`/admin/service-requests/${id}/assignments/${assignmentId}`,
            threads: (id)=>`/admin/service-requests/${id}/threads`,
            messages: (id)=>`/admin/service-requests/${id}/messages`,
            notes: (id)=>`/admin/service-requests/${id}/notes`,
            documents: (id)=>`/admin/service-requests/${id}/documents`
        },
        worklists: "/admin/dashboard/worklists",
        reviewQueue: "/admin/review-queue",
        notifications: {
            list: "/admin/notifications",
            byId: (id)=>`/admin/notifications/${id}`,
            markRead: (id)=>`/admin/notifications/${id}/read`,
            markAllRead: "/admin/notifications/mark-all-read",
            preferences: "/admin/notifications/preferences"
        },
        documents: {
            download: (id)=>`/admin/documents/${id}/download`
        },
        staff: "/admin/staff",
        dashboard: {
            summary: "/admin/dashboard/summary"
        },
        reports: {
            operations: "/admin/reports/operations",
            adminActivity: "/admin/reports/activity/admin",
            contentActivity: "/admin/reports/activity/content"
        },
        siteSettings: {
            list: "/admin/site-settings",
            byKey: (key)=>`/admin/site-settings/${key}`
        },
        privacyRequests: {
            list: "/admin/privacy-requests",
            byId: (id)=>`/admin/privacy-requests/${id}`
        },
        access: {
            users: {
                list: "/admin/users",
                byId: (id)=>`/admin/users/${id}`,
                role: (id)=>`/admin/users/${id}/role`,
                status: (id)=>`/admin/users/${id}/status`
            },
            roles: "/admin/roles"
        }
    },
    public: {
        consultations: {
            create: "/consultations"
        },
        blog: {
            posts: {
                list: "/blog/posts",
                bySlug: (slug)=>`/blog/posts/${slug}`
            },
            categories: {
                list: "/blog/categories"
            },
            authors: {
                list: "/blog/authors",
                bySlug: (slug)=>`/blog/authors/${slug}`
            }
        },
        pages: {
            list: "/pages",
            bySlug: (slug)=>`/pages/${slug}`
        },
        jobs: {
            list: "/jobs",
            bySlug: (slug)=>`/jobs/${slug}`
        },
        navigation: {
            list: "/navigation"
        },
        pricing: {
            plans: {
                list: "/pricing/plans"
            }
        },
        testimonials: {
            list: "/testimonials"
        },
        siteSettings: {
            byKey: (key)=>`/site-settings/${key}`
        },
        privacy: {
            consent: "/privacy/consent"
        }
    }
};
}),
"[project]/joyful-journey/src/exxonim/services/privacyService.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PRIVACY_CONSENT_EVENT",
    ()=>PRIVACY_CONSENT_EVENT,
    "getPrivacyConsent",
    ()=>getPrivacyConsent,
    "updatePrivacyConsent",
    ()=>updatePrivacyConsent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$app$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/app/apiClient.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$shared$2f$api$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/shared/api/routes.ts [app-ssr] (ecmascript)");
;
;
const PRIVACY_CONSENT_EVENT = "exxonim:privacy-consent";
function dispatchConsentEvent(consent) {
    if ("TURBOPACK compile-time truthy", 1) {
        return;
    }
    //TURBOPACK unreachable
    ;
}
async function getPrivacyConsent() {
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$app$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].get(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$shared$2f$api$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiRoutes"].public.privacy.consent, {
        withCredentials: true
    });
    dispatchConsentEvent(response.data);
    return response.data;
}
async function updatePrivacyConsent(payload) {
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$app$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].post(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$shared$2f$api$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiRoutes"].public.privacy.consent, payload, {
        withCredentials: true
    });
    dispatchConsentEvent(response.data);
    return response.data;
}
}),
"[project]/joyful-journey/src/exxonim/components/PrivacyConsentBanner.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PrivacyConsentBanner",
    ()=>PrivacyConsentBanner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$privacyService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/services/privacyService.ts [app-ssr] (ecmascript)");
;
;
;
function PrivacyConsentBanner({ pathname }) {
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    const consentQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "public",
            "privacy",
            "consent"
        ],
        queryFn: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$privacyService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPrivacyConsent"],
        staleTime: 60_000
    });
    const consentMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$privacyService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updatePrivacyConsent"],
        onSuccess: async (data)=>{
            queryClient.setQueryData([
                "public",
                "privacy",
                "consent"
            ], data);
        }
    });
    if (consentQuery.isPending || consentQuery.isError || consentQuery.data?.consent_recorded) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
            className: "fixed inset-x-4 bottom-4 z-50 max-w-[min(42rem,calc(100vw-2rem))] ml-auto grid gap-4 p-5 rounded-2xl border border-border-soft bg-surface-elevated shadow-popover",
            "aria-live": "polite",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "m-0 text-[0.82rem] tracking-[0.12em] uppercase text-text-soft",
                            children: "Privacy & cookies"
                        }, void 0, false, {
                            fileName: "[project]/joyful-journey/src/exxonim/components/PrivacyConsentBanner.tsx",
                            lineNumber: 35,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "m-0 text-base leading-relaxed text-text",
                            children: "We only use browser storage for session handling, consent state, and optional preferences like theme memory."
                        }, void 0, false, {
                            fileName: "[project]/joyful-journey/src/exxonim/components/PrivacyConsentBanner.tsx",
                            lineNumber: 38,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "m-0 text-sm leading-relaxed text-text-muted",
                            children: "Business records such as customer history, service history, notes, and documents stay in the database. You can keep only necessary storage or allow preference storage too."
                        }, void 0, false, {
                            fileName: "[project]/joyful-journey/src/exxonim/components/PrivacyConsentBanner.tsx",
                            lineNumber: 41,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap gap-3 text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "/privacy/",
                                    className: "text-accent no-underline",
                                    children: "Privacy policy"
                                }, void 0, false, {
                                    fileName: "[project]/joyful-journey/src/exxonim/components/PrivacyConsentBanner.tsx",
                                    lineNumber: 45,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "/cookies/",
                                    className: "text-accent no-underline",
                                    children: "Cookie notice"
                                }, void 0, false, {
                                    fileName: "[project]/joyful-journey/src/exxonim/components/PrivacyConsentBanner.tsx",
                                    lineNumber: 46,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "/data-rights/",
                                    className: "text-accent no-underline",
                                    children: "Data rights"
                                }, void 0, false, {
                                    fileName: "[project]/joyful-journey/src/exxonim/components/PrivacyConsentBanner.tsx",
                                    lineNumber: 47,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/joyful-journey/src/exxonim/components/PrivacyConsentBanner.tsx",
                            lineNumber: 44,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/joyful-journey/src/exxonim/components/PrivacyConsentBanner.tsx",
                    lineNumber: 34,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-wrap gap-3 justify-end",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "rounded-full px-5 py-3 text-sm font-medium border-0 cursor-pointer bg-surface-soft text-text transition-transform hover:-translate-y-0.5",
                            type: "button",
                            onClick: ()=>{
                                consentMutation.mutate({
                                    preferences: false,
                                    source_path: pathname
                                });
                            },
                            disabled: consentMutation.isPending,
                            children: "Necessary only"
                        }, void 0, false, {
                            fileName: "[project]/joyful-journey/src/exxonim/components/PrivacyConsentBanner.tsx",
                            lineNumber: 52,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "rounded-full px-5 py-3 text-sm font-medium border-0 cursor-pointer bg-accent text-accent-contrast shadow-accent-glow transition-transform hover:-translate-y-0.5",
                            type: "button",
                            onClick: ()=>{
                                consentMutation.mutate({
                                    preferences: true,
                                    source_path: pathname
                                });
                            },
                            disabled: consentMutation.isPending,
                            children: "Allow preferences"
                        }, void 0, false, {
                            fileName: "[project]/joyful-journey/src/exxonim/components/PrivacyConsentBanner.tsx",
                            lineNumber: 65,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/joyful-journey/src/exxonim/components/PrivacyConsentBanner.tsx",
                    lineNumber: 51,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/joyful-journey/src/exxonim/components/PrivacyConsentBanner.tsx",
            lineNumber: 30,
            columnNumber: 7
        }, this)
    }, void 0, false);
}
}),
"[project]/joyful-journey/src/exxonim/components/ShellStatusNotice.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// ShellStatusNotice — no longer shown.
// The site always renders as stable with authoritative content.
// This component is kept as a no-op to avoid breaking imports.
__turbopack_context__.s([
    "ShellStatusNotice",
    ()=>ShellStatusNotice
]);
function ShellStatusNotice() {
    return null;
}
}),
"[project]/joyful-journey/src/exxonim/components/WhatsAppButton.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WhatsAppButton",
    ()=>WhatsAppButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/utils/cn.ts [app-ssr] (ecmascript)");
;
;
function WhatsAppButton({ phoneNumber, className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
        href: phoneNumber,
        target: "_blank",
        rel: "noreferrer",
        "aria-label": "Chat on WhatsApp",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(// WhatsApp button target classes
        // Layout
        "fixed bottom-6 right-6 z-[30] inline-flex h-14 w-14 items-center justify-center", // Appearance
        "rounded-full border border-border-soft bg-accent text-accent-contrast", // Effects
        "shadow-accent-glow transition-transform duration-150 ease-out hover:scale-110 hover:bg-accent-hover", className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute inset-0 rounded-full bg-accent/35 animate-whatsapp-pulse",
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/joyful-journey/src/exxonim/components/WhatsAppButton.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "relative z-10 w-[1.9rem] h-[1.9rem]",
                viewBox: "0 0 24 24",
                fill: "currentColor",
                "aria-hidden": "true",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M12.01 2.014a9.96 9.96 0 0 0-8.52 15.11L2 22l4.985-1.465a9.961 9.961 0 1 0 5.025-18.52Zm0 18.067a8.093 8.093 0 0 1-4.14-1.134l-.297-.176-3.082.906.924-2.977-.193-.306A8.098 8.098 0 1 1 12.01 20.08Zm4.437-6.042c-.244-.122-1.439-.711-1.662-.793-.223-.081-.385-.122-.547.122-.162.244-.628.793-.77.955-.142.162-.284.183-.528.061-1.18-.56-2.072-1.1-2.884-2.522-.083-.146-.01-.223.111-.345.11-.11.244-.284.366-.427.122-.142.162-.244.244-.407.081-.162.041-.305-.02-.427-.061-.122-.547-1.32-.75-1.808-.198-.475-.399-.411-.547-.419-.142-.008-.305-.008-.468-.008-.162 0-.427.061-.65.305-.223.244-.852.833-.852 2.032s.873 2.358.995 2.522c.122.162 1.714 2.628 4.153 3.67.58.24 1.033.383 1.385.49.582.185 1.112.158 1.531.096.47-.07 1.439-.588 1.642-1.157.203-.569.203-1.056.142-1.157-.061-.101-.223-.162-.468-.284Z"
                }, void 0, false, {
                    fileName: "[project]/joyful-journey/src/exxonim/components/WhatsAppButton.tsx",
                    lineNumber: 43,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/joyful-journey/src/exxonim/components/WhatsAppButton.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/joyful-journey/src/exxonim/components/WhatsAppButton.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
}),
"[project]/joyful-journey/src/exxonim/components/ScrollToTopButton.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScrollToTopButton",
    ()=>ScrollToTopButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function ScrollToTopButton() {
    const [visible, setVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        function onScroll() {
            setVisible(window.scrollY > 400);
        }
        window.addEventListener("scroll", onScroll, {
            passive: true
        });
        onScroll();
        return ()=>window.removeEventListener("scroll", onScroll);
    }, []);
    if (!visible) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: ()=>window.scrollTo({
                top: 0,
                behavior: "smooth"
            }),
        "aria-label": "Back to top",
        title: "Back to top",
        className: "fixed bottom-24 right-6 z-[30] inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-soft bg-surface-soft text-text-muted shadow-md transition-all duration-200 hover:bg-accent-soft hover:text-accent hover:scale-110",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            className: "w-5 h-5",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "m18 15-6-6-6 6"
            }, void 0, false, {
                fileName: "[project]/joyful-journey/src/exxonim/components/ScrollToTopButton.tsx",
                lineNumber: 33,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/joyful-journey/src/exxonim/components/ScrollToTopButton.tsx",
            lineNumber: 32,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/joyful-journey/src/exxonim/components/ScrollToTopButton.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
}),
"[project]/joyful-journey/src/exxonim/components/ErrorBoundary.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ErrorBoundary",
    ()=>ErrorBoundary
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/utils/cn.ts [app-ssr] (ecmascript)");
;
;
;
class ErrorBoundary extends __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Component"] {
    constructor(props){
        super(props);
        this.state = {
            hasError: false,
            error: null
        };
    }
    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error
        };
    }
    componentDidCatch(error, errorInfo) {
        if (typeof console !== "undefined" && typeof console.error === "function") {
            console.error("[ErrorBoundary] Uncaught render error:", error, errorInfo);
        }
    }
    handleReset = ()=>{
        this.setState({
            hasError: false,
            error: null
        });
    };
    handleReload = ()=>{
        window.location.reload();
    };
    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("c-error-boundary", // Layout
                "flex items-center justify-center min-h-[60vh] px-6", // Visuals
                "bg-page text-text"),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-lg text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(// Layout
                            "inline-flex items-center justify-center mb-6", // Sizing
                            "w-16 h-16 rounded-full", // Visuals
                            "bg-accent-soft text-accent"),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "currentColor",
                                strokeWidth: 1.5,
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                className: "w-8 h-8",
                                "aria-hidden": "true",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                                }, void 0, false, {
                                    fileName: "[project]/joyful-journey/src/exxonim/components/ErrorBoundary.tsx",
                                    lineNumber: 82,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/joyful-journey/src/exxonim/components/ErrorBoundary.tsx",
                                lineNumber: 72,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/joyful-journey/src/exxonim/components/ErrorBoundary.tsx",
                            lineNumber: 62,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-2xl font-bold text-text mb-3",
                            children: "Something went wrong"
                        }, void 0, false, {
                            fileName: "[project]/joyful-journey/src/exxonim/components/ErrorBoundary.tsx",
                            lineNumber: 86,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-text-muted leading-relaxed mb-8",
                            children: "An unexpected error occurred while rendering this page. You can try again or reload the site."
                        }, void 0, false, {
                            fileName: "[project]/joyful-journey/src/exxonim/components/ErrorBoundary.tsx",
                            lineNumber: 89,
                            columnNumber: 13
                        }, this),
                        this.state.error && typeof this.state.error.message === "string" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                            className: "mb-6 p-4 rounded-xl border border-border-soft bg-surface-soft text-xs text-text-muted text-left overflow-x-auto max-h-32",
                            children: this.state.error.message
                        }, void 0, false, {
                            fileName: "[project]/joyful-journey/src/exxonim/components/ErrorBoundary.tsx",
                            lineNumber: 95,
                            columnNumber: 15
                        }, this) : null,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap justify-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: this.handleReset,
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("inline-flex items-center justify-center", "min-h-[2.75rem] px-6 py-2.5 rounded-full", "border border-border-soft bg-surface text-text font-bold text-sm", "transition-all hover:bg-surface-soft hover:-translate-y-0.5"),
                                    children: "Try again"
                                }, void 0, false, {
                                    fileName: "[project]/joyful-journey/src/exxonim/components/ErrorBoundary.tsx",
                                    lineNumber: 101,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: this.handleReload,
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("inline-flex items-center justify-center", "min-h-[2.75rem] px-6 py-2.5 rounded-full", "bg-accent text-accent-contrast font-bold text-sm", "shadow-accent-glow transition-all hover:bg-accent-hover hover:-translate-y-0.5"),
                                    children: "Reload page"
                                }, void 0, false, {
                                    fileName: "[project]/joyful-journey/src/exxonim/components/ErrorBoundary.tsx",
                                    lineNumber: 113,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/joyful-journey/src/exxonim/components/ErrorBoundary.tsx",
                            lineNumber: 100,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/joyful-journey/src/exxonim/components/ErrorBoundary.tsx",
                    lineNumber: 61,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/joyful-journey/src/exxonim/components/ErrorBoundary.tsx",
                lineNumber: 52,
                columnNumber: 9
            }, this);
        }
        return this.props.children;
    }
}
}),
"[project]/joyful-journey/src/exxonim/app/usePublicRouter.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePublicRouter",
    ()=>usePublicRouter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/routes.ts [app-ssr] (ecmascript)");
;
;
function shouldHandleClientNavigation(anchor) {
    const href = anchor.getAttribute("href");
    if (!href || href.startsWith("#")) {
        return false;
    }
    if (anchor.hasAttribute("download") || href.startsWith("mailto:") || href.startsWith("tel:")) {
        return false;
    }
    if (anchor.target && anchor.target !== "_self") {
        return false;
    }
    const rel = anchor.getAttribute("rel");
    if (rel && /\bexternal\b/i.test(rel)) {
        return false;
    }
    return true;
}
function usePublicRouter({ initialPathname } = {}) {
    const [pathname, setPathname] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizePathname"])(("TURBOPACK compile-time truthy", 1) ? initialPathname : "TURBOPACK unreachable"));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time truthy", 1) {
            return;
        }
        //TURBOPACK unreachable
        ;
        const handlePopState = undefined;
        const handleDocumentClick = undefined;
    }, []);
    return {
        pathname
    };
}
}),
"[project]/joyful-journey/src/exxonim/shared/publicContentCache.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cachePublicContent",
    ()=>cachePublicContent,
    "fetchWithFallback",
    ()=>fetchWithFallback,
    "fetchWithFallbackResource",
    ()=>fetchWithFallbackResource,
    "getCachedPublicContent",
    ()=>getCachedPublicContent,
    "getCachedPublicContentState",
    ()=>getCachedPublicContentState
]);
const PUBLIC_CONTENT_CACHE_PREFIX = "exxonim-public-content";
const MAX_CACHE_ENTRIES = 50;
function hasLocalStorage() {
    return ("TURBOPACK compile-time value", "undefined") !== "undefined" && typeof window.localStorage !== "undefined";
}
function toStorageKey(cacheKey) {
    return `${PUBLIC_CONTENT_CACHE_PREFIX}:${cacheKey}`;
}
function resolveExpiry(ttlMs) {
    if (!ttlMs || ttlMs <= 0) {
        return null;
    }
    return new Date(Date.now() + ttlMs).toISOString();
}
function readCachedEnvelope(cacheKey) {
    if (!hasLocalStorage()) {
        return null;
    }
    //TURBOPACK unreachable
    ;
}
function getCachedPublicContentState(cacheKey, options = {}) {
    const { fallbackValue } = options;
    const cached = readCachedEnvelope(cacheKey);
    if (cached) {
        const isStale = Boolean(cached.expiresAt && new Date(cached.expiresAt).getTime() <= Date.now());
        return {
            data: cached.value,
            source: "cache",
            isDegraded: true,
            isStale,
            cachedAt: cached.cachedAt,
            expiresAt: cached.expiresAt
        };
    }
    return {
        data: fallbackValue,
        source: "fallback",
        isDegraded: typeof fallbackValue !== "undefined",
        isStale: true
    };
}
function getCachedPublicContent(cacheKey, fallbackValue) {
    return getCachedPublicContentState(cacheKey, {
        fallbackValue
    }).data;
}
/**
 * Scans all `exxonim-public-content:*` keys in localStorage, finds the entry
 * with the oldest `cachedAt` timestamp, and removes it.
 */ function evictOldestCacheEntry() {
    if (!hasLocalStorage()) {
        return;
    }
    //TURBOPACK unreachable
    ;
}
function countCacheEntries() {
    if (!hasLocalStorage()) {
        return 0;
    }
    //TURBOPACK unreachable
    ;
    let count;
    let i;
}
function cachePublicContent(cacheKey, value, options = {}) {
    if (!hasLocalStorage()) {
        return value;
    }
    //TURBOPACK unreachable
    ;
}
function warnWithFallback(label, error) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
}
async function fetchWithFallbackResource(options) {
    const { cacheKey, fallbackValue, fetcher, ttlMs, validate, warningLabel } = options;
    try {
        const value = await fetcher();
        if (validate && !validate(value)) {
            throw new Error(`Live public content for "${cacheKey}" failed validation.`);
        }
        const cachedValue = cachePublicContent(cacheKey, value, {
            ttlMs
        });
        const cachedAt = new Date().toISOString();
        const expiresAt = resolveExpiry(ttlMs);
        return {
            data: cachedValue,
            source: "live",
            isDegraded: false,
            isStale: false,
            cachedAt,
            expiresAt
        };
    } catch (error) {
        const fallback = getCachedPublicContentState(cacheKey, {
            fallbackValue,
            ttlMs
        });
        if (typeof fallback.data !== "undefined") {
            warnWithFallback(warningLabel ?? `Using cached or default public content for ${cacheKey}.`, error);
            return {
                ...fallback,
                error
            };
        }
        throw error;
    }
}
async function fetchWithFallback(options) {
    const resource = await fetchWithFallbackResource(options);
    return resource.data;
}
}),
"[project]/joyful-journey/src/exxonim/utils/contentMappers.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "mapBlogAuthor",
    ()=>mapBlogAuthor,
    "mapBlogCategory",
    ()=>mapBlogCategory,
    "mapBlogPost",
    ()=>mapBlogPost,
    "mapNavigationItem",
    ()=>mapNavigationItem,
    "mapPage",
    ()=>mapPage,
    "mapPricingPlan",
    ()=>mapPricingPlan,
    "mapSiteSetting",
    ()=>mapSiteSetting,
    "mapTestimonial",
    ()=>mapTestimonial
]);
function toDateOnly(value) {
    if (!value) {
        return "";
    }
    return new Date(value).toISOString().slice(0, 10);
}
function mapBlogAuthor(author) {
    if (!author) {
        return undefined;
    }
    return {
        id: author.slug,
        name: author.name,
        role: author.role ?? undefined,
        avatarSrc: author.avatar_src ?? undefined,
        bio: author.bio ?? undefined
    };
}
function mapBlogCategory(category) {
    if (!category) {
        return undefined;
    }
    return {
        id: category.slug,
        label: category.name,
        description: category.description ?? undefined
    };
}
function mapBlogPost(post) {
    return {
        id: post.id,
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt ?? "",
        publishedAt: toDateOnly(post.published_at),
        category: mapBlogCategory(post.category),
        author: mapBlogAuthor(post.author),
        coverImageSrc: post.featured_image ?? undefined,
        coverAlt: post.cover_alt ?? undefined,
        mediaLabel: post.media_label ?? post.title,
        featuredSlot: post.featured_slot ?? undefined,
        featuredOnHome: post.featured_on_home,
        readTimeMinutes: post.read_time_minutes ?? undefined,
        relatedSlugs: post.related_slugs ?? [],
        metaTitle: post.meta_title ?? undefined,
        metaDescription: post.meta_description ?? undefined,
        content: post.content
    };
}
function mapPage(page) {
    return {
        id: page.id,
        title: page.title,
        slug: page.slug,
        content: page.content,
        metaTitle: page.meta_title ?? undefined,
        metaDescription: page.meta_description ?? undefined,
        ogImageUrl: page.og_image_url ?? undefined,
        isPublished: page.status === "published" || page.is_published === true,
        createdAt: page.created_at,
        updatedAt: page.updated_at
    };
}
function mapNavigationItem(item) {
    return {
        id: item.id,
        title: item.title,
        url: item.url,
        description: item.description ?? undefined,
        kind: item.kind,
        order: item.order,
        isActive: item.status === "published" || item.is_active === true,
        parentId: item.parent_id ?? null,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
        children: item.children.map(mapNavigationItem)
    };
}
function mapPricingPlan(plan) {
    return {
        id: plan.id,
        name: plan.name,
        badge: plan.badge ?? undefined,
        description: plan.description ?? "",
        notes: plan.notes ?? "",
        recommended: plan.recommended,
        features: plan.features ?? []
    };
}
function mapTestimonial(testimonial) {
    return {
        id: testimonial.id,
        eyebrow: testimonial.eyebrow ?? "",
        headline: testimonial.headline ?? "",
        support: testimonial.support ?? "",
        quote: testimonial.content,
        name: testimonial.author,
        role: testimonial.author_role ?? "",
        initials: testimonial.initials ?? ""
    };
}
function mapSiteSetting(setting) {
    return {
        id: setting.id,
        key: setting.key,
        value: setting.value,
        createdAt: setting.created_at,
        updatedAt: setting.updated_at
    };
}
}),
"[project]/joyful-journey/src/exxonim/services/staticFallbackService.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getStaticFallback",
    ()=>getStaticFallback,
    "preloadStaticFallback",
    ()=>preloadStaticFallback
]);
/**
 * Client-side loader for pre-built static fallback JSON files.
 *
 * At build time, `scripts/fetchFallbackAssets.mjs` fetches the latest API
 * content and writes it to `public/fallback/<key>.json`. This service loads
 * those files when the live API is unavailable.
 *
 * No cache, no service worker, no prior visit required — the file is served
 * as a static asset from the same origin.
 */ /* ── Module-level cache ──────────────────────────────── */ // Once a static fallback file has been fetched successfully, its parsed value
// is held here so subsequent reads are synchronous.
const loaded = new Map();
/* ── Eager preload map ────────────────────────────────── */ // Services register their key + a promise here at module-init time. The
// fetch starts immediately (while the app hydrates) so the value is ready
// by the time a fallback is actually needed.
const preloads = new Map();
function preloadStaticFallback(key) {
    const existing = preloads.get(key);
    if (existing) return existing;
    const promise = doLoadStaticFallback(key).then((val)=>{
        if (typeof val !== "undefined") {
            loaded.set(key, val);
        }
        return val;
    });
    preloads.set(key, promise);
    return promise;
}
function getStaticFallback(key) {
    return loaded.get(key);
}
/**
 * Load a static fallback file, with an optional timeout.
 * This is the core fetch — it's called by `preloadStaticFallback` and can
 * also be called directly if eager preload isn't used.
 */ async function doLoadStaticFallback(key, timeoutMs = 4_000) {
    // Already in module cache
    if (loaded.has(key)) {
        return loaded.get(key);
    }
    try {
        const controller = new AbortController();
        const timer = setTimeout(()=>controller.abort(), timeoutMs);
        const response = await fetch(`/fallback/${key}.json`, {
            signal: controller.signal,
            headers: {
                Accept: "application/json"
            }
        });
        clearTimeout(timer);
        if (!response.ok) {
            // 404 means the build script didn't generate this file — not an error
            if (response.status === 404) return undefined;
            return undefined;
        }
        const data = await response.json();
        loaded.set(key, data);
        return data;
    } catch  {
        // Network error, timeout, or invalid JSON — return undefined so the
        // caller falls back to the hardcoded TypeScript default.
        return undefined;
    }
}
}),
"[project]/joyful-journey/src/exxonim/content/fallbackPublicContent.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
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
    "getFallbackPage",
    ()=>getFallbackPage,
    "getFallbackSiteSetting",
    ()=>getFallbackSiteSetting
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/content/fallbackShell.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/routes.ts [app-ssr] (ecmascript)");
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
function createFallbackPage(slug, title, content, metaTitle, metaDescription) {
    return {
        id: FALLBACK_RECORD_ID,
        title,
        slug,
        content,
        metaTitle,
        metaDescription,
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
const fallbackHomePage = createFallbackPage("home", "Exxonim Consult — Business Registration & Compliance Tanzania", {
    hero: {
        eyebrow: "Business consulting — Tanzania",
        title: "Your obligations, handled and tracked.",
        description: "Exxonim guides you through registration, licensing, and compliance — with proactive updates at every milestone.",
        cta: {
            label: "Get Started",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].contact
        },
        secondary_cta: {
            label: "Explore Services",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].services
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
                ctaHref: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].contact,
                windowTitle: "Setup",
                windowTag: "Guide",
                videoSrc: ""
            },
            {
                title: "Keep tax and licensing work on track",
                subtitle: "TIN, VAT, business licences, sector permits, and work permits — managed through a clear workflow.",
                description: "A practical approach to tax registration, licensing applications, and regulatory follow-through — so your team can focus on operations instead of chasing approvals.",
                ctaLabel: "Explore services",
                ctaHref: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].services,
                windowTitle: "Compliance",
                windowTag: "Guide",
                videoSrc: ""
            },
            {
                title: "Track every consultation — automatically",
                subtitle: "Proactive updates at every milestone. You never need to call and ask what is happening.",
                description: "Upon engagement, you receive a unique tracking number. At every key milestone — name clearance, document submission, approval, issuance — Exxonim sends you an update via WhatsApp, email, or SMS. You can also look up your status on the website anytime, no login required.",
                ctaLabel: "Track a consultation",
                ctaHref: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].trackConsultation,
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
}, undefined, "Exxonim Consult helps businesses, NGOs, and institutions in Tanzania with company registration, licensing, tax compliance, and proactive consultation tracking from intake to resolution.");
const fallbackAboutPage = createFallbackPage("about", "About Exxonim Consult — Tanzania Business Advisory", {
    hero: {
        eyebrow: "About Exxonim Consult",
        title: "Business consulting built on clarity, follow-through, and proactive communication.",
        description: "Founded in 2020, Exxonim Consult helps businesses, NGOs, and institutions move through registration, licensing, and regulatory compliance — with automated tracking that keeps you informed at every milestone."
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
            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].contact
        },
        secondary: {
            label: "Explore services",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].services
        }
    }
}, undefined, "Founded in 2020, Exxonim Consult provides structured business registration, licensing, and compliance advisory in Tanzania with proactive tracking at every milestone.");
const fallbackFaqPage = createFallbackPage("faq", "FAQ — Registration, Licensing & Compliance Questions", {
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
}, undefined, "Answers to common questions about business registration, TIN applications, licensing renewals, and consultation tracking with Exxonim Consult in Tanzania.");
const fallbackServicesPage = createFallbackPage("services", "Business Registration, Licensing & Compliance Services", {
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
                href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].services,
                items: [
                    "Company Registration",
                    "TIN Application",
                    "Business License Applications"
                ]
            },
            {
                title: "Compliance Support",
                summary: "Recurring filings, renewals, and regulatory follow-up.",
                href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].services,
                items: [
                    "Statutory Filings",
                    "Regulatory Renewals",
                    "Operational Advisory"
                ]
            },
            {
                title: "Consultation Tracking",
                summary: "Track every consultation from intake to resolution.",
                href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].trackConsultation,
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
}, undefined, "Business registration, company incorporation, TIN applications, licensing, statutory filings, and compliance support services in Tanzania from Exxonim Consult.");
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
            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].contact
        }
    },
    empty_state: {
        title: "No articles match this filter.",
        description: "Try adjusting your search or filter, or contact Exxonim directly for immediate guidance."
    }
}, "Guides, Compliance Updates & Articles | Exxonim Consult", "Practical guides, compliance updates, and articles on business registration, licensing, and regulatory requirements in Tanzania.");
const fallbackCareerPage = createFallbackPage("career", "Careers at Exxonim Consult — Tanzania", {
    hero: {
        eyebrow: "Join the team",
        title: "Build your career at Exxonim.",
        description: "Explore current opportunities and learn about the teams Exxonim is building across client operations, compliance, and advisory work.",
        banner_image: "/careers/banner-enhanced.png"
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
            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].contact
        },
        secondary: {
            label: "Browse resources",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].resources
        }
    }
}, undefined, "Explore career opportunities at Exxonim Consult in Tanzania. Roles in client operations, compliance support, and regulatory advisory.");
const fallbackContactPage = createFallbackPage("contact", "Contact Exxonim Consult — Business Advisory Tanzania", {
    hero: {
        eyebrow: "Get in touch",
        title: "Reach Exxonim for registration, compliance, and advisory support.",
        description: "Use the contact route that works best for you — email, phone, or WhatsApp — and the Exxonim team will follow up promptly."
    },
    cards: [
        {
            label: "Email",
            value: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fallbackCompanyInfo"].emails[0] ?? "Send an email to Exxonim",
            description: "Best for sending structured details and follow-up questions.",
            action: {
                label: "Email Exxonim",
                href: `mailto:${__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fallbackCompanyInfo"].emails[0] ?? ""}`
            }
        },
        {
            label: "Phone",
            value: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fallbackCompanyInfo"].phones[0] ?? "Call Exxonim directly",
            description: "Use the direct phone path when you need a quick conversation.",
            action: {
                label: "Call Exxonim",
                href: `tel:${(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fallbackCompanyInfo"].phones[0] ?? "").replace(/\s+/g, "")}`
            }
        },
        {
            label: "WhatsApp",
            value: "Direct messaging",
            description: "Send a message through WhatsApp and the team will respond as soon as possible.",
            action: {
                label: "Open WhatsApp",
                href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fallbackCompanyInfo"].whatsapp || __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].contact
            }
        }
    ]
}, undefined, "Contact Exxonim Consult by email, phone, or WhatsApp for business registration, licensing, and compliance advisory in Tanzania.");
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
            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].contact
        },
        secondary_action: {
            label: "Read your data rights",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].dataRights
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
            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].privacy
        },
        secondary_action: {
            label: "Data rights",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].dataRights
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
            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].contact
        },
        secondary_action: {
            label: "Support",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].support
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
        eyebrow: "Business setup",
        headline: "Clear process from the first conversation.",
        support: "Exxonim helped us move through the setup phase with a clear checklist and practical follow-through at every step.",
        quote: "We knew exactly what to prepare, when to submit, and who to contact if anything was unclear.",
        name: "Operations Team",
        role: "Client reference",
        initials: "OT"
    },
    {
        id: 2,
        eyebrow: "Compliance support",
        headline: "Deadlines never caught us off guard.",
        support: "Proactive reminders and structured follow-up meant our licensing renewals and filings were always on schedule.",
        quote: "The experience felt intentional because the process stayed visible and the next step was always clear.",
        name: "Compliance Lead",
        role: "Client reference",
        initials: "CL"
    },
    {
        id: 3,
        eyebrow: "Consultation tracking",
        headline: "We always knew where things stood.",
        support: "Every consultation came with a tracking reference and milestone updates — no need to call and ask for status.",
        quote: "Getting a WhatsApp update when our certificate was issued saved us days of back-and-forth.",
        name: "Programme Coordinator",
        role: "Client reference",
        initials: "PC"
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
        summary: "Coordinate internal follow-through, document readiness, and status visibility across active client work.",
        description: "Coordinate internal follow-through, document readiness, and status visibility across active client work. You will be the connective tissue between case managers, compliance officers, and clients — making sure nothing falls through the cracks.",
        requirements: [
            "Comfort working with operational checklists",
            "Clear written communication",
            "Confidence handling structured follow-up work"
        ],
        responsibilities: [
            "Track active workstreams",
            "Coordinate next actions with the team",
            "Help keep filing and follow-up work organized"
        ],
        status: "published",
        is_published: true,
        published_at: "2026-04-01T00:00:00Z",
        created_at: "2026-04-01T00:00:00Z",
        updated_at: "2026-04-01T00:00:00Z"
    },
    {
        id: 2,
        title: "Compliance Support Analyst",
        slug: "compliance-support-analyst",
        department: "Compliance",
        employment_type: "Full-time",
        location_mode: "on-site",
        city: "Dar es Salaam",
        country: "Tanzania",
        compensation_label: null,
        experience_label: "Entry-level",
        summary: "Assist with regulatory filings, license renewals, and compliance deadline tracking for Exxonim clients.",
        description: "Support the compliance team by preparing filing documents, tracking renewal deadlines, and following up with regulatory bodies. Ideal for someone starting their career in regulatory operations.",
        requirements: [
            "Degree in business, law, or related field",
            "Attention to detail and deadline awareness",
            "Ability to follow structured processes"
        ],
        responsibilities: [
            "Prepare and review filing documents",
            "Track compliance deadlines and send reminders",
            "Follow up with regulatory authorities on pending applications"
        ],
        status: "published",
        is_published: true,
        published_at: "2026-04-02T00:00:00Z",
        created_at: "2026-04-02T00:00:00Z",
        updated_at: "2026-04-02T00:00:00Z"
    },
    {
        id: 3,
        title: "Tax & Filing Assistant",
        slug: "tax-filing-assistant",
        department: "Accounting",
        employment_type: "Full-time",
        location_mode: "on-site",
        city: "Dar es Salaam",
        country: "Tanzania",
        compensation_label: null,
        experience_label: "Entry-level",
        summary: "Support TIN applications, VAT filings, and tax registration workflows for new and existing entities.",
        description: "Work alongside the accounting team to process tax registration applications, prepare VAT returns, and maintain accurate filing records. A great starting role for someone interested in Tanzanian tax operations.",
        requirements: [
            "Basic understanding of tax concepts (TIN, VAT)",
            "Organized and comfortable with numbers",
            "Willingness to learn TRA processes"
        ],
        responsibilities: [
            "Process TIN and VAT registration applications",
            "Prepare monthly VAT return drafts",
            "Maintain filing records and client tax schedules"
        ],
        status: "published",
        is_published: true,
        published_at: "2026-04-03T00:00:00Z",
        created_at: "2026-04-03T00:00:00Z",
        updated_at: "2026-04-03T00:00:00Z"
    },
    {
        id: 4,
        title: "Business Setup Consultant",
        slug: "business-setup-consultant",
        department: "Advisory",
        employment_type: "Full-time",
        location_mode: "hybrid",
        city: "Dar es Salaam",
        country: "Tanzania",
        compensation_label: null,
        experience_label: "Senior",
        summary: "Lead entity registration engagements — from entity type selection through to authority submission and certificate delivery.",
        description: "Guide clients through company, NGO, and business name registration from start to certificate. You will manage the full engagement cycle, advise on entity structures, and ensure every submission is complete and timely.",
        requirements: [
            "3+ years in business registration or legal advisory",
            "Deep knowledge of Tanzanian entity types and registration procedures",
            "Strong client communication and case management skills"
        ],
        responsibilities: [
            "Advise clients on entity type and registration path",
            "Manage end-to-end registration engagements",
            "Review all submissions before authority filing"
        ],
        status: "published",
        is_published: true,
        published_at: "2026-03-28T00:00:00Z",
        created_at: "2026-03-28T00:00:00Z",
        updated_at: "2026-03-28T00:00:00Z"
    },
    {
        id: 5,
        title: "Systems & Tools Coordinator",
        slug: "systems-tools-coordinator",
        department: "IT",
        employment_type: "Part-time",
        location_mode: "remote",
        city: "Dar es Salaam",
        country: "Tanzania",
        compensation_label: null,
        experience_label: "Mid-level",
        summary: "Maintain internal tools, manage system workflows, and support digital operations across the consulting team.",
        description: "Keep Exxonim's digital tools running smoothly — from case tracking systems to internal dashboards. You will coordinate with vendors, troubleshoot issues, and help improve how the team uses technology day-to-day.",
        requirements: [
            "Experience with SaaS tools and workflow automation",
            "Problem-solving mindset and clear communication",
            "Comfort working independently in a remote setup"
        ],
        responsibilities: [
            "Maintain and configure internal tools and dashboards",
            "Troubleshoot technical issues and coordinate with vendors",
            "Document workflows and suggest process improvements"
        ],
        status: "published",
        is_published: true,
        published_at: "2026-04-04T00:00:00Z",
        created_at: "2026-04-04T00:00:00Z",
        updated_at: "2026-04-04T00:00:00Z"
    },
    {
        id: 6,
        title: "Document Readiness Associate",
        slug: "document-readiness-associate",
        department: "Operations",
        employment_type: "Full-time",
        location_mode: "on-site",
        city: "Dar es Salaam",
        country: "Tanzania",
        compensation_label: null,
        experience_label: "Entry-level",
        summary: "Ensure client documents are complete, properly formatted, and ready for submission before filing deadlines.",
        description: "Review incoming client documents for completeness, flag missing items, and prepare document packages for the filing team. A detail-oriented role ideal for someone who enjoys structured, methodical work.",
        requirements: [
            "Strong attention to detail",
            "Comfort reviewing and organizing paperwork",
            "Reliable and consistent follow-through"
        ],
        responsibilities: [
            "Review client documents for completeness and accuracy",
            "Flag missing or incorrect items for follow-up",
            "Prepare organized document packages for submission"
        ],
        status: "published",
        is_published: true,
        published_at: "2026-04-05T00:00:00Z",
        created_at: "2026-04-05T00:00:00Z",
        updated_at: "2026-04-05T00:00:00Z"
    },
    {
        id: 7,
        title: "Regulatory Renewals Officer",
        slug: "regulatory-renewals-officer",
        department: "Compliance",
        employment_type: "Full-time",
        location_mode: "hybrid",
        city: "Dar es Salaam",
        country: "Tanzania",
        compensation_label: null,
        experience_label: "Mid-level",
        summary: "Own the renewals pipeline — track deadlines, prepare submissions, and ensure no client obligation lapses.",
        description: "Manage Exxonim's renewals pipeline end-to-end: track upcoming deadlines across all clients, prepare renewal applications, submit on time, and confirm outcomes. You will be the person who makes sure nothing expires unnoticed.",
        requirements: [
            "1-2 years in compliance, licensing, or regulatory operations",
            "Strong organizational and deadline management skills",
            "Comfort working with government portals and processes"
        ],
        responsibilities: [
            "Track all upcoming license and permit renewals",
            "Prepare and submit renewal applications on schedule",
            "Confirm outcomes and update client records"
        ],
        status: "published",
        is_published: true,
        published_at: "2026-04-06T00:00:00Z",
        created_at: "2026-04-06T00:00:00Z",
        updated_at: "2026-04-06T00:00:00Z"
    }
];
const fallbackBrandSetting = createFallbackSiteSetting("brand", __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fallbackBrand"]);
const fallbackCompanyInfoSetting = createFallbackSiteSetting("company_info", __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fallbackCompanyInfo"]);
const fallbackFooterSetting = createFallbackSiteSetting("footer", __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fallbackFooter"]);
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
const fallbackSupportPage = createFallbackPage("support", "Support", {
    hero: {
        eyebrow: "Support",
        title: "Get direct help from Exxonim Consult.",
        description: "Reach out via WhatsApp, email, or phone during business hours. We respond promptly to every inquiry."
    },
    sections: [
        {
            title: "How to reach us",
            paragraphs: [
                "Use WhatsApp for quick questions, email for structured details, or phone when you need a direct conversation.",
                "Our team responds during East African business hours (Mon–Fri, 8:00–17:00)."
            ]
        },
        {
            title: "What happens after you reach out",
            paragraphs: [
                "Your inquiry is logged, reviewed, and you receive a reference ID to track your consultation from intake to resolution.",
                "Proactive updates are sent via your preferred channel at every milestone."
            ]
        }
    ],
    next_step: {
        title: "Need immediate help?",
        description: "Contact us directly and the Exxonim Consult team will follow up promptly.",
        primary_action: {
            label: "Contact Exxonim",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].contact
        },
        secondary_action: {
            label: "Track consultation",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].trackConsultation
        }
    }
});
const fallbackTermsPage = createFallbackPage("terms", "Terms of Service", {
    hero: {
        eyebrow: "Terms",
        title: "Terms governing the use of Exxonim Consult services.",
        description: "These terms outline the responsibilities and expectations for clients engaging Exxonim Consult for registration, licensing, and compliance support."
    },
    sections: [
        {
            title: "Service scope",
            paragraphs: [
                "Exxonim Consult provides advisory and operational support for business registration, tax applications, licensing, and compliance follow-through.",
                "Services are structured around clear milestones with proactive tracking and communication at every stage."
            ]
        },
        {
            title: "Client responsibilities",
            paragraphs: [
                "Clients are expected to provide accurate information and required documents in a timely manner to avoid unnecessary delays.",
                "Exxonim Consult is not liable for delays caused by incomplete or incorrect client submissions."
            ]
        }
    ],
    next_step: {
        title: "Questions about these terms?",
        description: "Reach out and the Exxonim Consult team will clarify any details.",
        primary_action: {
            label: "Contact Exxonim",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].contact
        },
        secondary_action: {
            label: "Privacy policy",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].privacy
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
        case "support":
            return fallbackSupportPage;
        case "terms":
            return fallbackTermsPage;
        default:
            return undefined;
    }
}
;
}),
"[project]/joyful-journey/src/exxonim/services/siteSettingsService.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCachedSiteSetting",
    ()=>getCachedSiteSetting,
    "getCachedSiteSettingResource",
    ()=>getCachedSiteSettingResource,
    "getSiteSetting",
    ()=>getSiteSetting,
    "getSiteSettingResource",
    ()=>getSiteSettingResource
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$app$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/app/apiClient.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$shared$2f$api$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/shared/api/routes.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$shared$2f$publicContentCache$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/shared/publicContentCache.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$contentMappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/utils/contentMappers.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$staticFallbackService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/services/staticFallbackService.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackPublicContent$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/content/fallbackPublicContent.ts [app-ssr] (ecmascript) <locals>");
;
;
;
;
;
;
// Eagerly load known site-setting fallback files at module init
(0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$staticFallbackService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["preloadStaticFallback"])("site-settings-brand");
(0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$staticFallbackService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["preloadStaticFallback"])("site-settings-company-info");
(0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$staticFallbackService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["preloadStaticFallback"])("site-settings-footer");
const SHELL_SITE_SETTING_TTL_MS = 1000 * 60 * 60 * 24;
function siteSettingCacheKey(key) {
    return `site-settings:${key}`;
}
function isSiteSettingRecord(value) {
    return Boolean(value && typeof value.key === "string");
}
async function fetchFreshSiteSetting(key) {
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$app$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].get(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$shared$2f$api$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiRoutes"].public.siteSettings.byKey(key));
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$contentMappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapSiteSetting"])(response.data);
}
/* ── Resolve a site-setting fallback ──────────────────────
 *  1. Check the static fallback JSON (build-time snapshot)
 *  2. Fall through to the hardcoded TypeScript default
 */ function resolveFallbackSiteSetting(key) {
    const staticKey = `site-settings-${key}`;
    const fromStatic = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$staticFallbackService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getStaticFallback"])(staticKey);
    if (fromStatic) return fromStatic;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackPublicContent$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getFallbackSiteSetting"])(key);
}
function getCachedSiteSetting(key) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$shared$2f$publicContentCache$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCachedPublicContent"])(siteSettingCacheKey(key), resolveFallbackSiteSetting(key));
}
function getCachedSiteSettingResource(key) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$shared$2f$publicContentCache$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCachedPublicContentState"])(siteSettingCacheKey(key), {
        fallbackValue: resolveFallbackSiteSetting(key),
        ttlMs: SHELL_SITE_SETTING_TTL_MS
    });
}
async function getSiteSetting(key) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$shared$2f$publicContentCache$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchWithFallback"])({
        cacheKey: siteSettingCacheKey(key),
        fallbackValue: resolveFallbackSiteSetting(key),
        fetcher: ()=>fetchFreshSiteSetting(key),
        ttlMs: SHELL_SITE_SETTING_TTL_MS,
        validate: isSiteSettingRecord,
        warningLabel: `Using cached or default site setting for "${key}".`
    });
}
async function getSiteSettingResource(key) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$shared$2f$publicContentCache$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchWithFallbackResource"])({
        cacheKey: siteSettingCacheKey(key),
        fallbackValue: resolveFallbackSiteSetting(key),
        fetcher: ()=>fetchFreshSiteSetting(key),
        ttlMs: SHELL_SITE_SETTING_TTL_MS,
        validate: isSiteSettingRecord,
        warningLabel: `Using cached or default site setting for "${key}".`
    });
}
}),
"[project]/joyful-journey/src/exxonim/hooks/usePublicShell.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePublicShell",
    ()=>usePublicShell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$siteSettingsService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/services/siteSettingsService.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/content/fallbackShell.ts [app-ssr] (ecmascript)");
;
;
;
function hasText(value) {
    return typeof value === "string" && value.trim().length > 0;
}
function sanitizeBrandAssets(value) {
    return {
        name: hasText(value.name) ? value.name.trim() : __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fallbackBrand"].name,
        lightLogoSrc: hasText(value.lightLogoSrc) ? value.lightLogoSrc : __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fallbackBrand"].lightLogoSrc,
        darkLogoSrc: hasText(value.darkLogoSrc) ? value.darkLogoSrc : __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fallbackBrand"].darkLogoSrc
    };
}
function sanitizeCompanyInfo(value) {
    return {
        ...value,
        name: hasText(value.name) ? value.name.trim() : __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fallbackCompanyInfo"].name
    };
}
function hasSiteSettingValue(setting) {
    return Boolean(setting?.value);
}
function usePublicShell() {
    const brandQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "public-shell",
            "site-settings",
            "brand"
        ],
        queryFn: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$siteSettingsService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSiteSettingResource"])("brand"),
        initialData: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$siteSettingsService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCachedSiteSettingResource"])("brand"),
        refetchOnMount: true,
        refetchOnReconnect: "always",
        retry: false,
        staleTime: 1000 * 60 * 60 * 4
    });
    const footerQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "public-shell",
            "site-settings",
            "footer"
        ],
        queryFn: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$siteSettingsService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSiteSettingResource"])("footer"),
        initialData: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$siteSettingsService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCachedSiteSettingResource"])("footer"),
        refetchOnMount: true,
        refetchOnReconnect: "always",
        retry: false,
        staleTime: 1000 * 60 * 60 * 4
    });
    const companyQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "public-shell",
            "site-settings",
            "company_info"
        ],
        queryFn: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$siteSettingsService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSiteSettingResource"])("company_info"),
        initialData: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$siteSettingsService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCachedSiteSettingResource"])("company_info"),
        refetchOnMount: true,
        refetchOnReconnect: "always",
        retry: false,
        staleTime: 1000 * 60 * 60 * 4
    });
    const brand = hasSiteSettingValue(brandQuery.data?.data) ? sanitizeBrandAssets(brandQuery.data.data.value) : __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fallbackBrand"];
    const footer = hasSiteSettingValue(footerQuery.data?.data) ? footerQuery.data.data.value : __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fallbackFooter"];
    const company = hasSiteSettingValue(companyQuery.data?.data) ? sanitizeCompanyInfo(companyQuery.data.data.value) : __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fallbackCompanyInfo"];
    return {
        brand,
        footer,
        company
    };
}
}),
"[project]/joyful-journey/src/exxonim/hooks/useRevealOnScroll.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useRevealOnScroll",
    ()=>useRevealOnScroll
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
function useRevealOnScroll() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const hiddenClasses = [
            "opacity-0",
            "translate-y-4"
        ];
        const visibleClasses = [
            "opacity-100",
            "translate-y-0"
        ];
        const transitionClasses = [
            "transition-all",
            "duration-[620ms]",
            "ease-out"
        ];
        const applyInvisible = (el)=>{
            if (el instanceof HTMLElement) {
                el.classList.add(...hiddenClasses, ...transitionClasses);
                el.classList.remove(...visibleClasses);
            }
        };
        const applyVisible = (el)=>{
            if (el instanceof HTMLElement) {
                el.classList.add(...visibleClasses, ...transitionClasses);
                el.classList.remove(...hiddenClasses);
            }
        };
        if (!("IntersectionObserver" in window)) {
            document.querySelectorAll("[data-reveal]").forEach((el)=>{
                applyVisible(el);
            });
            return;
        }
        const observer = new IntersectionObserver((entries)=>{
            entries.forEach((entry)=>{
                if (entry.isIntersecting) {
                    applyVisible(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });
        const observeNode = (node)=>{
            if (node instanceof HTMLElement) {
                applyInvisible(node);
                observer.observe(node);
            }
        };
        const scanNodes = (root = document)=>{
            if (root instanceof Element && root.matches("[data-reveal]")) {
                observeNode(root);
            }
            root.querySelectorAll?.("[data-reveal]").forEach((node)=>observeNode(node));
        };
        // Check if already visible
        const isAlreadyVisible = (node)=>{
            const rect = node.getBoundingClientRect();
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
            return rect.top < viewportHeight * 0.92 && rect.bottom > 0;
        };
        scanNodes();
        const mutationObserver = new MutationObserver((mutations)=>{
            mutations.forEach((mutation)=>{
                mutation.addedNodes.forEach((node)=>{
                    if (node instanceof Element) {
                        scanNodes(node);
                    }
                });
            });
        });
        mutationObserver.observe(document.body, {
            childList: true,
            subtree: true
        });
        return ()=>{
            mutationObserver.disconnect();
            observer.disconnect();
        };
    }, []);
}
}),
"[project]/joyful-journey/src/exxonim/hooks/useTheme.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTheme",
    ()=>useTheme
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$privacyService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/services/privacyService.ts [app-ssr] (ecmascript)");
;
;
const STORAGE_KEY = "exxonim-theme";
const LEGACY_STORAGE_KEY = "koro-theme";
function getStoredTheme() {
    if ("TURBOPACK compile-time truthy", 1) {
        return null;
    }
    //TURBOPACK unreachable
    ;
}
function clearStoredTheme() {
    if ("TURBOPACK compile-time truthy", 1) {
        return;
    }
    //TURBOPACK unreachable
    ;
}
function getInitialTheme() {
    if (typeof document === "undefined") {
        return "dark";
    }
    const storedTheme = getStoredTheme();
    if (storedTheme) {
        return storedTheme;
    }
    return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}
function useTheme() {
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(getInitialTheme);
    const [canPersistPreference, setCanPersistPreference] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        document.documentElement.dataset.theme = theme;
        // The favicon follows the system/browser theme (prefers-color-scheme),
        // NOT the website's manual theme toggle. The <head> contains two <link>
        // elements: #favicon-light (no media query) and #favicon-dark
        // (media="(prefers-color-scheme: dark)"). The browser automatically picks
        // the right one based on OS preference. We restore the original attributes
        // so the media-query switching stays active.
        const faviconLight = document.getElementById("favicon-light");
        const faviconDark = document.getElementById("favicon-dark");
        if (faviconLight && faviconDark) {
            // Restore original favicon config so browser media-query handles it
            faviconLight.href = "/branding/exxonim-favicon-light.png";
            faviconLight.media = "";
            faviconDark.href = "/branding/exxonim-favicon-dark.png";
            faviconDark.media = "(prefers-color-scheme: dark)";
        }
    }, [
        theme
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleConsentChange = (event)=>{
            const customEvent = event;
            const preferencesEnabled = Boolean(customEvent.detail?.preferencesEnabled);
            setCanPersistPreference(preferencesEnabled);
            if (!preferencesEnabled) {
                clearStoredTheme();
            }
        };
        window.addEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$privacyService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PRIVACY_CONSENT_EVENT"], handleConsentChange);
        return ()=>{
            window.removeEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$privacyService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PRIVACY_CONSENT_EVENT"], handleConsentChange);
        };
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!canPersistPreference) {
            clearStoredTheme();
            return;
        }
        try {
            localStorage.setItem(STORAGE_KEY, theme);
            localStorage.removeItem(LEGACY_STORAGE_KEY);
        } catch  {
        // Ignore storage failures and keep the active theme in memory.
        }
    }, [
        canPersistPreference,
        theme
    ]);
    return {
        theme,
        toggleTheme: ()=>{
            const next = theme === "dark" ? "light" : "dark";
            // Use View Transitions API for a smooth crossfade when available.
            // Directly update the DOM attribute inside the transition callback so the
            // browser captures the new state, then sync React state.
            if (typeof document !== "undefined" && "startViewTransition" in document) {
                document.startViewTransition(()=>{
                    document.documentElement.dataset.theme = next;
                    setTheme(next);
                });
            } else {
                setTheme(next);
            }
        }
    };
}
}),
"[project]/joyful-journey/src/exxonim/app/App.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "App",
    ()=>App
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$components$2f$Footer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/components/Footer.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$components$2f$Navigation$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/components/Navigation.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$components$2f$PageLoader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/components/PageLoader.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$components$2f$PrivacyConsentBanner$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/components/PrivacyConsentBanner.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$components$2f$ShellStatusNotice$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/components/ShellStatusNotice.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$components$2f$WhatsAppButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/components/WhatsAppButton.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$components$2f$ScrollToTopButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/components/ScrollToTopButton.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$components$2f$ErrorBoundary$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/components/ErrorBoundary.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$app$2f$usePublicRouter$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/app/usePublicRouter.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$hooks$2f$usePublicShell$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/hooks/usePublicShell.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$hooks$2f$useRevealOnScroll$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/hooks/useRevealOnScroll.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$hooks$2f$useTheme$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/hooks/useTheme.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/routes.ts [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
/* ── Code-split page components ────────────────────────
 * Each page is loaded on demand so the initial bundle only
 * contains the shell (nav + footer) and the active page.
 */ const HomePage = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lazy"])(()=>__turbopack_context__.A("[project]/joyful-journey/src/exxonim/pages/HomePage.tsx [app-ssr] (ecmascript, async loader)").then((m)=>({
            default: m.HomePage
        })));
const AboutPage = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lazy"])(()=>__turbopack_context__.A("[project]/joyful-journey/src/exxonim/pages/AboutPage.tsx [app-ssr] (ecmascript, async loader)").then((m)=>({
            default: m.AboutPage
        })));
const CareerPage = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lazy"])(()=>__turbopack_context__.A("[project]/joyful-journey/src/exxonim/pages/CareerPage.tsx [app-ssr] (ecmascript, async loader)").then((m)=>({
            default: m.CareerPage
        })));
const ContactPage = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lazy"])(()=>__turbopack_context__.A("[project]/joyful-journey/src/exxonim/pages/ContactPage.tsx [app-ssr] (ecmascript, async loader)").then((m)=>({
            default: m.ContactPage
        })));
const FaqPage = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lazy"])(()=>__turbopack_context__.A("[project]/joyful-journey/src/exxonim/pages/FaqPage.tsx [app-ssr] (ecmascript, async loader)").then((m)=>({
            default: m.FaqPage
        })));
const NotFoundPage = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lazy"])(()=>__turbopack_context__.A("[project]/joyful-journey/src/exxonim/pages/NotFoundPage.tsx [app-ssr] (ecmascript, async loader)").then((m)=>({
            default: m.NotFoundPage
        })));
const ResourceArticlePage = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lazy"])(()=>__turbopack_context__.A("[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx [app-ssr] (ecmascript, async loader)").then((m)=>({
            default: m.ResourceArticlePage
        })));
const ResourcesPage = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lazy"])(()=>__turbopack_context__.A("[project]/joyful-journey/src/exxonim/pages/ResourcesPage.tsx [app-ssr] (ecmascript, async loader)").then((m)=>({
            default: m.ResourcesPage
        })));
const ServicesPage = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lazy"])(()=>__turbopack_context__.A("[project]/joyful-journey/src/exxonim/pages/ServicesPage.tsx [app-ssr] (ecmascript, async loader)").then((m)=>({
            default: m.ServicesPage
        })));
const InfoPages = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lazy"])(()=>__turbopack_context__.A("[project]/joyful-journey/src/exxonim/pages/InfoPages.tsx [app-ssr] (ecmascript, async loader)").then((m)=>({
            default: function InfoPagesWrapper() {
                // InfoPages exports multiple components; the route map handles which one to render
                return null;
            }
        })));
const SupportPage = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lazy"])(()=>__turbopack_context__.A("[project]/joyful-journey/src/exxonim/pages/InfoPages.tsx [app-ssr] (ecmascript, async loader)").then((m)=>({
            default: m.SupportPage
        })));
const TermsPage = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lazy"])(()=>__turbopack_context__.A("[project]/joyful-journey/src/exxonim/pages/InfoPages.tsx [app-ssr] (ecmascript, async loader)").then((m)=>({
            default: m.TermsPage
        })));
const PrivacyPage = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lazy"])(()=>__turbopack_context__.A("[project]/joyful-journey/src/exxonim/pages/InfoPages.tsx [app-ssr] (ecmascript, async loader)").then((m)=>({
            default: m.PrivacyPage
        })));
const CookiePage = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lazy"])(()=>__turbopack_context__.A("[project]/joyful-journey/src/exxonim/pages/InfoPages.tsx [app-ssr] (ecmascript, async loader)").then((m)=>({
            default: m.CookiePage
        })));
const DataRightsPage = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lazy"])(()=>__turbopack_context__.A("[project]/joyful-journey/src/exxonim/pages/InfoPages.tsx [app-ssr] (ecmascript, async loader)").then((m)=>({
            default: m.DataRightsPage
        })));
const TrackConsultationPage = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lazy"])(()=>__turbopack_context__.A("[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx [app-ssr] (ecmascript, async loader)").then((m)=>({
            default: m.TrackConsultationPage
        })));
const staticRoutes = [
    {
        pathname: "/",
        component: HomePage
    },
    {
        pathname: "/about",
        component: AboutPage
    },
    {
        pathname: "/faq",
        component: FaqPage
    },
    {
        pathname: "/services",
        component: ServicesPage
    },
    {
        pathname: "/resources",
        component: ResourcesPage
    },
    {
        pathname: "/blog",
        component: ResourcesPage
    },
    {
        pathname: "/career",
        component: CareerPage
    },
    {
        pathname: "/contact",
        component: ContactPage
    },
    {
        pathname: "/support",
        component: SupportPage
    },
    {
        pathname: "/terms",
        component: TermsPage
    },
    {
        pathname: "/privacy",
        component: PrivacyPage
    },
    {
        pathname: "/cookies",
        component: CookiePage
    },
    {
        pathname: "/data-rights",
        component: DataRightsPage
    },
    {
        pathname: "/track-consultation",
        component: TrackConsultationPage
    }
];
function resolvePage(pathname) {
    const match = staticRoutes.find((route)=>route.pathname === pathname);
    if (match) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(match.component, {}, void 0, false, {
            fileName: "[project]/joyful-journey/src/exxonim/app/App.tsx",
            lineNumber: 109,
            columnNumber: 12
        }, this);
    }
    const articleSlug = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getResourcePostSlug"])(pathname);
    if (articleSlug) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ResourceArticlePage, {
            slug: articleSlug
        }, void 0, false, {
            fileName: "[project]/joyful-journey/src/exxonim/app/App.tsx",
            lineNumber: 114,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(NotFoundPage, {
        pathname: pathname
    }, void 0, false, {
        fileName: "[project]/joyful-journey/src/exxonim/app/App.tsx",
        lineNumber: 117,
        columnNumber: 10
    }, this);
}
/* ── Page-level Suspense fallback ────────────────────── */ function PageSuspenseFallback() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-center min-h-[60vh]",
        role: "status",
        "aria-live": "polite",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center gap-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-10 w-10 animate-spin rounded-full border-4 border-accent-soft border-t-accent"
                }, void 0, false, {
                    fileName: "[project]/joyful-journey/src/exxonim/app/App.tsx",
                    lineNumber: 129,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm text-text-muted",
                    children: "Loading page…"
                }, void 0, false, {
                    fileName: "[project]/joyful-journey/src/exxonim/app/App.tsx",
                    lineNumber: 130,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/joyful-journey/src/exxonim/app/App.tsx",
            lineNumber: 128,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/joyful-journey/src/exxonim/app/App.tsx",
        lineNumber: 123,
        columnNumber: 5
    }, this);
}
function App({ initialPathname }) {
    const { theme, toggleTheme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$hooks$2f$useTheme$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTheme"])();
    const { pathname } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$app$2f$usePublicRouter$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePublicRouter"])({
        initialPathname
    });
    const shell = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$hooks$2f$usePublicShell$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePublicShell"])();
    const [isPageLoading, setIsPageLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$hooks$2f$useRevealOnScroll$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRevealOnScroll"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        document.documentElement.classList.add("js");
        // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: dismiss page loader after first paint
        setIsPageLoading(false);
    }, []);
    const whatsappUrl = shell.company.whatsapp;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$components$2f$ErrorBoundary$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ErrorBoundary"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex flex-col bg-page text-text",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$components$2f$PageLoader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PageLoader"], {
                    isLoading: isPageLoading,
                    delay: 300
                }, void 0, false, {
                    fileName: "[project]/joyful-journey/src/exxonim/app/App.tsx",
                    lineNumber: 160,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    href: "#top",
                    className: "pointer-events-none opacity-0 focus:pointer-events-auto focus:opacity-100 fixed left-4 top-2 z-[100] inline-flex h-12 items-center rounded-full bg-accent px-6 text-sm font-extrabold text-accent-contrast shadow-accent-glow transition-all focus:outline-2 focus:outline-accent",
                    children: "Skip to content"
                }, void 0, false, {
                    fileName: "[project]/joyful-journey/src/exxonim/app/App.tsx",
                    lineNumber: 162,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$components$2f$Navigation$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Navigation"], {
                    brand: shell.brand,
                    company: shell.company,
                    onToggleTheme: toggleTheme,
                    pathname: pathname,
                    theme: theme
                }, void 0, false, {
                    fileName: "[project]/joyful-journey/src/exxonim/app/App.tsx",
                    lineNumber: 169,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$components$2f$ShellStatusNotice$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ShellStatusNotice"], {}, void 0, false, {
                    fileName: "[project]/joyful-journey/src/exxonim/app/App.tsx",
                    lineNumber: 177,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                    id: "top",
                    className: "relative isolate overflow-x-clip flex-1 pt-[70px]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$components$2f$ErrorBoundary$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ErrorBoundary"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Suspense"], {
                            fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PageSuspenseFallback, {}, void 0, false, {
                                fileName: "[project]/joyful-journey/src/exxonim/app/App.tsx",
                                lineNumber: 181,
                                columnNumber: 33
                            }, this),
                            children: resolvePage(pathname)
                        }, void 0, false, {
                            fileName: "[project]/joyful-journey/src/exxonim/app/App.tsx",
                            lineNumber: 181,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/joyful-journey/src/exxonim/app/App.tsx",
                        lineNumber: 180,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/joyful-journey/src/exxonim/app/App.tsx",
                    lineNumber: 179,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$components$2f$Footer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Footer"], {
                    brand: shell.brand,
                    company: shell.company,
                    footer: shell.footer
                }, void 0, false, {
                    fileName: "[project]/joyful-journey/src/exxonim/app/App.tsx",
                    lineNumber: 187,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$components$2f$PrivacyConsentBanner$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PrivacyConsentBanner"], {
                    pathname: pathname
                }, void 0, false, {
                    fileName: "[project]/joyful-journey/src/exxonim/app/App.tsx",
                    lineNumber: 193,
                    columnNumber: 9
                }, this),
                whatsappUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$components$2f$WhatsAppButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WhatsAppButton"], {
                    phoneNumber: whatsappUrl
                }, void 0, false, {
                    fileName: "[project]/joyful-journey/src/exxonim/app/App.tsx",
                    lineNumber: 195,
                    columnNumber: 25
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$components$2f$ScrollToTopButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollToTopButton"], {}, void 0, false, {
                    fileName: "[project]/joyful-journey/src/exxonim/app/App.tsx",
                    lineNumber: 196,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/joyful-journey/src/exxonim/app/App.tsx",
            lineNumber: 159,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/joyful-journey/src/exxonim/app/App.tsx",
        lineNumber: 158,
        columnNumber: 5
    }, this);
}
}),
"[project]/joyful-journey/src/exxonim/app/queryClient.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "queryClient",
    ()=>queryClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/@tanstack/query-core/build/modern/queryClient.js [app-ssr] (ecmascript)");
;
const queryClient = new __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QueryClient"]({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            gcTime: 1000 * 60 * 60,
            refetchOnWindowFocus: false,
            retry: (failureCount, error)=>{
                const status = error?.response?.status;
                if (status === 404) {
                    return false;
                }
                return failureCount < 2;
            }
        }
    }
});
}),
"[project]/joyful-journey/src/exxonim/app/providers/AppProviders.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppProviders",
    ()=>AppProviders
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$app$2f$queryClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/app/queryClient.ts [app-ssr] (ecmascript)");
;
;
;
function AppProviders({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QueryClientProvider"], {
        client: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$app$2f$queryClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["queryClient"],
        children: children
    }, void 0, false, {
        fileName: "[project]/joyful-journey/src/exxonim/app/providers/AppProviders.tsx",
        lineNumber: 6,
        columnNumber: 10
    }, this);
}
}),
"[project]/joyful-journey/src/app/[[...slug]]/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CatchAllPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$app$2f$App$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/app/App.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$app$2f$providers$2f$AppProviders$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/app/providers/AppProviders.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
function CatchAllPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$app$2f$providers$2f$AppProviders$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AppProviders"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$app$2f$App$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["App"], {}, void 0, false, {
            fileName: "[project]/joyful-journey/src/app/[[...slug]]/page.tsx",
            lineNumber: 17,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/joyful-journey/src/app/[[...slug]]/page.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0meitp-._.js.map