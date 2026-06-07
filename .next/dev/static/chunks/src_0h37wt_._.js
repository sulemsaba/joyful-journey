(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/exxonim/utils/cn.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/exxonim/components/primitives/Container.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Container",
    ()=>Container
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/utils/cn.ts [app-client] (ecmascript)");
;
;
function Container({ children, className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('w-[min(1240px,calc(100%-2rem))] mx-auto', className),
        children: children
    }, void 0, false, {
        fileName: "[project]/src/exxonim/components/primitives/Container.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
_c = Container;
var _c;
__turbopack_context__.k.register(_c, "Container");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/exxonim/routes.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/exxonim/content/fallbackShell.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/routes.ts [app-client] (ecmascript)");
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
const servicesNavigation = createNavigationItem(100, "Services", __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].services, 3, {
    children: [
        createNavigationItem(110, "Business Setup", __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].services, 1, {
            kind: "group",
            parentId: 100,
            children: [
                createNavigationItem(111, "Company Registration", __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].services, 1, {
                    kind: "secondary",
                    parentId: 110
                }),
                createNavigationItem(112, "TIN Application", __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].services, 2, {
                    kind: "secondary",
                    parentId: 110
                }),
                createNavigationItem(113, "Business License Applications", __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].services, 3, {
                    kind: "secondary",
                    parentId: 110
                })
            ]
        }),
        createNavigationItem(120, "Compliance Support", __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].services, 2, {
            kind: "group",
            parentId: 100,
            children: [
                createNavigationItem(121, "Statutory Filings", __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].services, 1, {
                    kind: "secondary",
                    parentId: 120
                }),
                createNavigationItem(122, "Regulatory Renewals", __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].services, 2, {
                    kind: "secondary",
                    parentId: 120
                }),
                createNavigationItem(123, "Operational Advisory", __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].services, 3, {
                    kind: "secondary",
                    parentId: 120
                })
            ]
        })
    ]
});
const resourcesNavigation = createNavigationItem(200, "Resources", __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].resources, 4, {
    children: [
        createNavigationItem(210, "Guides", __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].resources, 1, {
            kind: "group",
            parentId: 200,
            children: [
                createNavigationItem(211, "Blog", __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].resources, 1, {
                    kind: "secondary",
                    parentId: 210
                }),
                createNavigationItem(212, "FAQ", __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].faq, 2, {
                    kind: "secondary",
                    parentId: 210
                }),
                createNavigationItem(213, "Support", __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].support, 3, {
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
    createNavigationItem(0, "Home", __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].home, 0),
    createNavigationItem(1, "About", __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].about, 1),
    servicesNavigation,
    resourcesNavigation,
    createNavigationItem(5, "Career", __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].career, 5),
    createNavigationItem(6, "Contact", __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].contact, 6),
    createNavigationItem(7, "Track Consultation", __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].trackConsultation, 7)
];
const fallbackFooter = {
    quick_links: [
        {
            label: "About",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].about
        },
        {
            label: "Services",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].services
        },
        {
            label: "Track Consultation",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].trackConsultation
        },
        {
            label: "Resources",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].resources
        },
        {
            label: "Career",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].career
        },
        {
            label: "Contact",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].contact
        }
    ],
    other_resources: [
        {
            label: "FAQ",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].faq
        },
        {
            label: "Support",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].support
        },
        {
            label: "Terms",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].terms
        },
        {
            label: "Privacy",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].privacy
        }
    ],
    tagline: "Business consulting for registration, licensing, compliance, and operational advisory — with proactive tracking at every step.",
    primary_cta: {
        label: "Contact Exxonim",
        href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].contact
    },
    social_links: [],
    /* Dynamic year: Footer.tsx replaces {YEAR} with new Date().getFullYear() at render time. */ copyright: "© {YEAR} Exxonim Company Limited. Registered Data Controller under Act No. 11 of 2022 (PDPC)."
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/exxonim/components/Footer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Footer",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$primitives$2f$Container$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/components/primitives/Container.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/routes.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/content/fallbackShell.ts [app-client] (ecmascript)");
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
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                "aria-hidden": "true",
                viewBox: "0 0 24 24",
                fill: "currentColor",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2Zm8.37 1.73H7.88A4.15 4.15 0 0 0 3.73 7.88v8.24a4.15 4.15 0 0 0 4.15 4.15h8.24a4.15 4.15 0 0 0 4.15-4.15V7.88a4.15 4.15 0 0 0-4.15-4.15Zm-4.12 3.54A4.73 4.73 0 1 1 7.27 12 4.73 4.73 0 0 1 12 7.27Zm0 1.73A3 3 0 1 0 15 12a3 3 0 0 0-3-3Zm5.02-2.62a1.13 1.13 0 1 1-1.13 1.13 1.13 1.13 0 0 1 1.13-1.13Z"
                }, void 0, false, {
                    fileName: "[project]/src/exxonim/components/Footer.tsx",
                    lineNumber: 18,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/Footer.tsx",
                lineNumber: 17,
                columnNumber: 9
            }, this);
        case "linkedin":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                "aria-hidden": "true",
                viewBox: "0 0 24 24",
                fill: "currentColor",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M6.94 8.5A1.69 1.69 0 1 0 6.9 5.12a1.69 1.69 0 0 0 .04 3.38ZM5.47 18.88h2.86V9.72H5.47v9.16Zm4.46 0h2.85v-5.11c0-1.35.26-2.66 1.93-2.66 1.65 0 1.67 1.54 1.67 2.75v5.02h2.86v-5.61c0-2.76-.59-4.88-3.82-4.88-1.55 0-2.58.85-3.01 1.65h-.04V9.72H9.93c.04.73 0 9.16 0 9.16Z"
                }, void 0, false, {
                    fileName: "[project]/src/exxonim/components/Footer.tsx",
                    lineNumber: 24,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/Footer.tsx",
                lineNumber: 23,
                columnNumber: 9
            }, this);
        case "x":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                "aria-hidden": "true",
                viewBox: "0 0 24 24",
                fill: "currentColor",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M18.9 4H21l-4.59 5.24L21.8 20h-4.78l-3.74-4.89L9 20H6.88l4.91-5.61L6.6 4h4.9l3.38 4.47L18.9 4Zm-.75 14.7h1.33L10.79 5.2H9.36l8.79 13.5Z"
                }, void 0, false, {
                    fileName: "[project]/src/exxonim/components/Footer.tsx",
                    lineNumber: 30,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/Footer.tsx",
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
        href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].about
    },
    {
        label: "Services",
        href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].services
    },
    {
        label: "Track Consultation",
        href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].trackConsultation
    },
    {
        label: "Careers",
        href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].career
    }
];
const resourceLinks = [
    {
        label: "Resources",
        href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].resources
    },
    {
        label: "FAQ",
        href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].faq
    },
    {
        label: "Support",
        href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].support
    },
    {
        label: "Privacy Policy",
        href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].privacy
    },
    {
        label: "Terms of Service",
        href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].terms
    }
];
function Footer({ brand, company: _company, footer }) {
    const currentYear = new Date().getFullYear();
    const copyrightText = footer.copyright.replace("{YEAR}", String(currentYear));
    const socialLinks = footerSocialPlatforms.map((platform)=>(footer.social_links ?? []).find((link)=>link.platform === platform && link.isActive && link.url.trim())).filter((link)=>Boolean(link));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        id: "site-footer",
        className: "relative mt-auto border-t border-footer-border bg-footer-bg",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$primitives$2f$Container$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
            className: "py-14 pb-24 md:py-20 md:pb-16",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-10 pb-10 border-b border-footer-border",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: "grid gap-5 content-start",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].home,
                                    "aria-label": `${brand.name} home`,
                                    className: "inline-flex items-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: brand.darkLogoSrc,
                                        alt: brand.name,
                                        loading: "lazy",
                                        onError: (event)=>{
                                            const img = event.currentTarget;
                                            if (img.dataset.fallbackApplied) return;
                                            img.dataset.fallbackApplied = "true";
                                            img.src = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fallbackBrand"].darkLogoSrc;
                                        },
                                        className: "block max-w-[10rem] h-auto"
                                    }, void 0, false, {
                                        fileName: "[project]/src/exxonim/components/Footer.tsx",
                                        lineNumber: 87,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/exxonim/components/Footer.tsx",
                                    lineNumber: 81,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-footer-text-muted text-[0.9375rem] leading-relaxed italic",
                                    style: {
                                        fontFamily: "'Georgia', 'Times New Roman', 'Palatino', serif"
                                    },
                                    children: "Where Innovation Meets Efficiency"
                                }, void 0, false, {
                                    fileName: "[project]/src/exxonim/components/Footer.tsx",
                                    lineNumber: 101,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid gap-2.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "text-xs font-extrabold tracking-[0.14em] uppercase text-footer-heading",
                                            children: "Follow Us"
                                        }, void 0, false, {
                                            fileName: "[project]/src/exxonim/components/Footer.tsx",
                                            lineNumber: 110,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3",
                                            children: socialLinks.length ? socialLinks.map((link, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: link.url,
                                                    target: "_blank",
                                                    rel: "noreferrer noopener",
                                                    "aria-label": `Follow us on ${link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}`,
                                                    title: link.platform.charAt(0).toUpperCase() + link.platform.slice(1),
                                                    className: "inline-flex items-center justify-center w-11 h-11 rounded-full bg-footer-border text-footer-text-muted hover:text-footer-heading hover:bg-footer-border transition-all duration-200",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "w-5 h-5 flex items-center justify-center",
                                                        children: renderSocialIcon(link.platform)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/exxonim/components/Footer.tsx",
                                                        lineNumber: 125,
                                                        columnNumber: 23
                                                    }, this)
                                                }, `${link.platform}-${link.url}-${index}`, false, {
                                                    fileName: "[project]/src/exxonim/components/Footer.tsx",
                                                    lineNumber: 116,
                                                    columnNumber: 21
                                                }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: "https://x.com/exxonim",
                                                        target: "_blank",
                                                        rel: "noreferrer noopener",
                                                        "aria-label": "Follow us on X",
                                                        className: "inline-flex items-center justify-center w-11 h-11 rounded-full bg-footer-border text-footer-text-muted hover:text-footer-heading hover:bg-footer-border transition-all duration-200",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            className: "w-5 h-5",
                                                            viewBox: "0 0 24 24",
                                                            fill: "currentColor",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/exxonim/components/Footer.tsx",
                                                                lineNumber: 139,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/exxonim/components/Footer.tsx",
                                                            lineNumber: 138,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/exxonim/components/Footer.tsx",
                                                        lineNumber: 131,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: "https://linkedin.com/company/exxonim",
                                                        target: "_blank",
                                                        rel: "noreferrer noopener",
                                                        "aria-label": "Follow us on LinkedIn",
                                                        className: "inline-flex items-center justify-center w-11 h-11 rounded-full bg-footer-border text-footer-text-muted hover:text-footer-heading hover:bg-footer-border transition-all duration-200",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            className: "w-5 h-5",
                                                            viewBox: "0 0 24 24",
                                                            fill: "currentColor",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/exxonim/components/Footer.tsx",
                                                                lineNumber: 151,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/exxonim/components/Footer.tsx",
                                                            lineNumber: 150,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/exxonim/components/Footer.tsx",
                                                        lineNumber: 143,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: "https://instagram.com/exxonim",
                                                        target: "_blank",
                                                        rel: "noreferrer noopener",
                                                        "aria-label": "Follow us on Instagram",
                                                        className: "inline-flex items-center justify-center w-11 h-11 rounded-full bg-footer-border text-footer-text-muted hover:text-footer-heading hover:bg-footer-border transition-all duration-200",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            className: "w-5 h-5",
                                                            viewBox: "0 0 24 24",
                                                            fill: "currentColor",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                d: "M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2Zm8.37 1.73H7.88A4.15 4.15 0 0 0 3.73 7.88v8.24a4.15 4.15 0 0 0 4.15 4.15h8.24a4.15 4.15 0 0 0 4.15-4.15V7.88a4.15 4.15 0 0 0-4.15-4.15Zm-4.12 3.54A4.73 4.73 0 1 1 7.27 12 4.73 4.73 0 0 1 12 7.27Zm0 1.73A3 3 0 1 0 15 12a3 3 0 0 0-3-3Zm5.02-2.62a1.13 1.13 0 1 1-1.13 1.13 1.13 1.13 0 0 1 1.13-1.13Z"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/exxonim/components/Footer.tsx",
                                                                lineNumber: 163,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/exxonim/components/Footer.tsx",
                                                            lineNumber: 162,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/exxonim/components/Footer.tsx",
                                                        lineNumber: 155,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true)
                                        }, void 0, false, {
                                            fileName: "[project]/src/exxonim/components/Footer.tsx",
                                            lineNumber: 113,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-footer-text-muted text-sm leading-relaxed",
                                            children: "Stay connected with Exxonim Consult for the latest updates on business consulting, compliance tips, and career opportunities in Tanzania."
                                        }, void 0, false, {
                                            fileName: "[project]/src/exxonim/components/Footer.tsx",
                                            lineNumber: 169,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/exxonim/components/Footer.tsx",
                                    lineNumber: 109,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/exxonim/components/Footer.tsx",
                            lineNumber: 80,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "text-xs font-extrabold tracking-[0.14em] uppercase text-footer-heading mb-5",
                                    children: "Navigation"
                                }, void 0, false, {
                                    fileName: "[project]/src/exxonim/components/Footer.tsx",
                                    lineNumber: 177,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                    "aria-label": "Footer navigation",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "grid gap-3",
                                        children: navigationLinks.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: link.href,
                                                    className: "inline-flex items-center text-footer-text text-[0.9375rem] hover:text-footer-heading hover:translate-x-0.5 transition-all duration-200 group",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "w-0 group-hover:w-2 h-0.5 bg-footer-heading rounded-full mr-0 group-hover:mr-2 transition-all duration-200"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/exxonim/components/Footer.tsx",
                                                            lineNumber: 188,
                                                            columnNumber: 23
                                                        }, this),
                                                        link.label
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/exxonim/components/Footer.tsx",
                                                    lineNumber: 184,
                                                    columnNumber: 21
                                                }, this)
                                            }, link.label, false, {
                                                fileName: "[project]/src/exxonim/components/Footer.tsx",
                                                lineNumber: 183,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/exxonim/components/Footer.tsx",
                                        lineNumber: 181,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/exxonim/components/Footer.tsx",
                                    lineNumber: 180,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/exxonim/components/Footer.tsx",
                            lineNumber: 176,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "text-xs font-extrabold tracking-[0.14em] uppercase text-footer-heading mb-5",
                                    children: "Resources & Legal"
                                }, void 0, false, {
                                    fileName: "[project]/src/exxonim/components/Footer.tsx",
                                    lineNumber: 199,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "grid gap-3",
                                    children: resourceLinks.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: link.href,
                                                className: "inline-flex items-center text-footer-text text-[0.9375rem] hover:text-footer-heading hover:translate-x-0.5 transition-all duration-200 group",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "w-0 group-hover:w-2 h-0.5 bg-footer-heading rounded-full mr-0 group-hover:mr-2 transition-all duration-200"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/exxonim/components/Footer.tsx",
                                                        lineNumber: 209,
                                                        columnNumber: 21
                                                    }, this),
                                                    link.label
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/exxonim/components/Footer.tsx",
                                                lineNumber: 205,
                                                columnNumber: 19
                                            }, this)
                                        }, link.label, false, {
                                            fileName: "[project]/src/exxonim/components/Footer.tsx",
                                            lineNumber: 204,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/exxonim/components/Footer.tsx",
                                    lineNumber: 202,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/exxonim/components/Footer.tsx",
                            lineNumber: 198,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "text-xs font-extrabold tracking-[0.14em] uppercase text-footer-heading mb-5",
                                    children: "Contact Us"
                                }, void 0, false, {
                                    fileName: "[project]/src/exxonim/components/Footer.tsx",
                                    lineNumber: 219,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "grid gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "flex items-start gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "w-[1.125rem] h-[1.125rem] mt-0.5 shrink-0 text-footer-text-muted",
                                                    viewBox: "0 0 24 24",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    strokeWidth: "2",
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            d: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/exxonim/components/Footer.tsx",
                                                            lineNumber: 226,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                            cx: "12",
                                                            cy: "10",
                                                            r: "3"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/exxonim/components/Footer.tsx",
                                                            lineNumber: 227,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/exxonim/components/Footer.tsx",
                                                    lineNumber: 225,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-footer-text text-[0.9375rem] leading-relaxed",
                                                    children: "Mbezi Beach B, Africana, Bagamoyo Road, Block no H, House number 9, Dar es Salaam"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/exxonim/components/Footer.tsx",
                                                    lineNumber: 229,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/exxonim/components/Footer.tsx",
                                            lineNumber: 224,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "flex items-start gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "w-[1.125rem] h-[1.125rem] mt-0.5 shrink-0 text-footer-text-muted",
                                                    viewBox: "0 0 24 24",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    strokeWidth: "2",
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                            width: "20",
                                                            height: "16",
                                                            x: "2",
                                                            y: "4",
                                                            rx: "2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/exxonim/components/Footer.tsx",
                                                            lineNumber: 236,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/exxonim/components/Footer.tsx",
                                                            lineNumber: 237,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/exxonim/components/Footer.tsx",
                                                    lineNumber: 235,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: "mailto:info@exxonim.tz",
                                                            className: "text-footer-text text-[0.9375rem] hover:text-footer-heading transition-colors duration-200",
                                                            children: "info@exxonim.tz"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/exxonim/components/Footer.tsx",
                                                            lineNumber: 240,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: "mailto:md@exxonim.tz",
                                                            className: "text-footer-text text-[0.9375rem] hover:text-footer-heading transition-colors duration-200",
                                                            children: "md@exxonim.tz"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/exxonim/components/Footer.tsx",
                                                            lineNumber: 243,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/exxonim/components/Footer.tsx",
                                                    lineNumber: 239,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/exxonim/components/Footer.tsx",
                                            lineNumber: 234,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "flex items-start gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "w-[1.125rem] h-[1.125rem] mt-0.5 shrink-0 text-footer-text-muted",
                                                    viewBox: "0 0 24 24",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    strokeWidth: "2",
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/exxonim/components/Footer.tsx",
                                                        lineNumber: 251,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/exxonim/components/Footer.tsx",
                                                    lineNumber: 250,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: "tel:+255794689099",
                                                            className: "text-footer-text text-[0.9375rem] hover:text-footer-heading transition-colors duration-200",
                                                            children: "+255 794 689 099"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/exxonim/components/Footer.tsx",
                                                            lineNumber: 254,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: "tel:+255685525224",
                                                            className: "text-footer-text text-[0.9375rem] hover:text-footer-heading transition-colors duration-200",
                                                            children: "+255 685 525 224"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/exxonim/components/Footer.tsx",
                                                            lineNumber: 257,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/exxonim/components/Footer.tsx",
                                                    lineNumber: 253,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/exxonim/components/Footer.tsx",
                                            lineNumber: 249,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/exxonim/components/Footer.tsx",
                                    lineNumber: 222,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/exxonim/components/Footer.tsx",
                            lineNumber: 218,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/exxonim/components/Footer.tsx",
                    lineNumber: 77,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-footer-text-muted text-sm text-center",
                    children: copyrightText
                }, void 0, false, {
                    fileName: "[project]/src/exxonim/components/Footer.tsx",
                    lineNumber: 268,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/exxonim/components/Footer.tsx",
            lineNumber: 76,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/exxonim/components/Footer.tsx",
        lineNumber: 71,
        columnNumber: 5
    }, this);
}
_c = Footer;
var _c;
__turbopack_context__.k.register(_c, "Footer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MegaMenuColumns",
    ()=>MegaMenuColumns
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * MegaMenuColumns — Premium opaque dropdown content renderer.
 *
 * Supports two layout variants:
 *   - "split"   → 50/50 two-column grid, both sides contain link items
 *   - "feature" → 60/40 grid (col-span-7 / col-span-5),
 *                 left side has items, right side has feature box
 *
 * DYNAMIC FEATURE BOX:
 * ────────────────────
 * When hoverFeatureMap is provided, the feature box content changes based
 * on which menu item is being hovered. A 150ms fade transition animates
 * between content states.
 *
 * THEME ADAPTATION:
 * ─────────────────
 * Light mode: White card, teal-tinted hover (accent-soft)
 * Dark mode: Dark teal card (#0d2226), subtle teal hover (accent-soft)
 *
 * HOVER DESIGN:
 * ─────────────
 * - Items use rounded-lg (8px) for slight curve, minimal
 * - Light & Dark: bg-accent-soft (brand-aligned teal tint)
 *
 * ITEM ICONS:
 * ───────────
 * Services items: WITH icons (building, receipt, passport, etc.)
 * Resources items: NO icons (clean, minimal — just text + description)
 *
 * BACKEND / ADMIN INTEGRATION NOTES:
 * ──────────────────────────────────
 * Menu content comes from staticNavigation.ts (or future API).
 * Each MenuItem can have optional `description` and `icon`.
 * The FeatureBox is configurable, and hoverFeatureMap enables
 * dynamic content based on item hover.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
/* ── Unified Icon Renderer ── */ function NavIconSvg({ icon, className = "w-5 h-5" }) {
    switch(icon){
        case "newspaper":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: className,
                fill: "none",
                stroke: "currentColor",
                strokeWidth: 1.5,
                viewBox: "0 0 24 24",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
                }, void 0, false, {
                    fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                    lineNumber: 48,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                lineNumber: 47,
                columnNumber: 9
            }, this);
        case "briefcase":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: className,
                fill: "none",
                stroke: "currentColor",
                strokeWidth: 1.5,
                viewBox: "0 0 24 24",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0"
                }, void 0, false, {
                    fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                    lineNumber: 54,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                lineNumber: 53,
                columnNumber: 9
            }, this);
        case "chat":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: className,
                fill: "none",
                stroke: "currentColor",
                strokeWidth: 1.5,
                viewBox: "0 0 24 24",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                }, void 0, false, {
                    fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                    lineNumber: 60,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                lineNumber: 59,
                columnNumber: 9
            }, this);
        case "compass":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: className,
                fill: "none",
                stroke: "currentColor",
                strokeWidth: 1.5,
                viewBox: "0 0 24 24",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A8.966 8.966 0 0 1 3 12c0-1.264.26-2.467.732-3.559"
                }, void 0, false, {
                    fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                    lineNumber: 66,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                lineNumber: 65,
                columnNumber: 9
            }, this);
        case "help-circle":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: className,
                fill: "none",
                stroke: "currentColor",
                strokeWidth: 1.5,
                viewBox: "0 0 24 24",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                }, void 0, false, {
                    fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                    lineNumber: 72,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                lineNumber: 71,
                columnNumber: 9
            }, this);
        case "headset":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: className,
                fill: "none",
                stroke: "currentColor",
                strokeWidth: 1.5,
                viewBox: "0 0 24 24",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-5.369-8.458a6.75 6.75 0 0 1 3.18 5.708m-13.5 0a6.75 6.75 0 0 1 3.18-5.708M12 21.75a1.5 1.5 0 0 0 1.5-1.5v-1.5a1.5 1.5 0 0 0-3 0V20.25a1.5 1.5 0 0 0 1.5 1.5Z"
                }, void 0, false, {
                    fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                    lineNumber: 78,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                lineNumber: 77,
                columnNumber: 9
            }, this);
        case "mail":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: className,
                fill: "none",
                stroke: "currentColor",
                strokeWidth: 1.5,
                viewBox: "0 0 24 24",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                }, void 0, false, {
                    fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                    lineNumber: 84,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                lineNumber: 83,
                columnNumber: 9
            }, this);
        case "building":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: className,
                fill: "none",
                stroke: "currentColor",
                strokeWidth: 1.5,
                viewBox: "0 0 24 24",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
                }, void 0, false, {
                    fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                    lineNumber: 90,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                lineNumber: 89,
                columnNumber: 9
            }, this);
        case "receipt":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: className,
                fill: "none",
                stroke: "currentColor",
                strokeWidth: 1.5,
                viewBox: "0 0 24 24",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185ZM9.75 9h.008v.008H9.75V9Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm4.125 4.5h.008v.008h-.008V13.5Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                }, void 0, false, {
                    fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                    lineNumber: 96,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                lineNumber: 95,
                columnNumber: 9
            }, this);
        case "passport":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: className,
                fill: "none",
                stroke: "currentColor",
                strokeWidth: 1.5,
                viewBox: "0 0 24 24",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
                }, void 0, false, {
                    fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                    lineNumber: 102,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                lineNumber: 101,
                columnNumber: 9
            }, this);
        case "clipboard-list":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: className,
                fill: "none",
                stroke: "currentColor",
                strokeWidth: 1.5,
                viewBox: "0 0 24 24",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15a2.25 2.25 0 0 1 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                }, void 0, false, {
                    fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                    lineNumber: 108,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                lineNumber: 107,
                columnNumber: 9
            }, this);
        case "refresh":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: className,
                fill: "none",
                stroke: "currentColor",
                strokeWidth: 1.5,
                viewBox: "0 0 24 24",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182"
                }, void 0, false, {
                    fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                    lineNumber: 114,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                lineNumber: 113,
                columnNumber: 9
            }, this);
        case "lightbulb":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: className,
                fill: "none",
                stroke: "currentColor",
                strokeWidth: 1.5,
                viewBox: "0 0 24 24",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                }, void 0, false, {
                    fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                    lineNumber: 120,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                lineNumber: 119,
                columnNumber: 9
            }, this);
        case "shield-check":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: className,
                fill: "none",
                stroke: "currentColor",
                strokeWidth: 1.5,
                viewBox: "0 0 24 24",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                }, void 0, false, {
                    fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                    lineNumber: 126,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                lineNumber: 125,
                columnNumber: 9
            }, this);
        default:
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: className,
                fill: "none",
                stroke: "currentColor",
                strokeWidth: 1.5,
                viewBox: "0 0 24 24",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
                }, void 0, false, {
                    fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                    lineNumber: 132,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                lineNumber: 131,
                columnNumber: 9
            }, this);
    }
}
_c = NavIconSvg;
/* ── Single Menu Item Link ──
 *
 * DESIGN NOTES:
 * - Hover: bg-accent-soft (brand-aligned teal tint in both light & dark)
 * - Rounded-lg (8px) for slight curve, minimal
 * - Items with icon: show icon left of text (Services)
 * - Items without icon: text-only (Resources)
 * - Icon shifts to accent color on hover
 */ function MegaMenuItem({ item, onNavigate, onItemHover }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
        href: item.href,
        onClick: onNavigate,
        onMouseEnter: onItemHover ? ()=>onItemHover(item.href) : undefined,
        className: "group/item flex items-start gap-3 px-3 py-2 rounded-lg hover:bg-accent-soft transition-colors duration-150",
        children: [
            item.icon ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "shrink-0 mt-0.5 text-text-soft group-hover/item:text-accent transition-colors duration-150",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavIconSvg, {
                    icon: item.icon,
                    className: "w-5 h-5"
                }, void 0, false, {
                    fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                    lineNumber: 170,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                lineNumber: 167,
                columnNumber: 9
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-w-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm font-medium text-text transition-colors",
                        children: item.label
                    }, void 0, false, {
                        fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                        lineNumber: 176,
                        columnNumber: 9
                    }, this),
                    item.description ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-text-muted mt-0.5 group-hover/item:text-text-soft transition-colors",
                        children: item.description
                    }, void 0, false, {
                        fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                        lineNumber: 180,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                lineNumber: 175,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
        lineNumber: 157,
        columnNumber: 5
    }, this);
}
_c1 = MegaMenuItem;
/* ── Column Section (header + items) ── */ function MegaMenuColumn({ column, onNavigate, showBorder, onItemHover }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `flex flex-col ${showBorder ? "pr-5 border-r border-border-soft" : "pl-2"}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-3 pb-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-[11px] font-bold tracking-wider uppercase text-text-soft",
                    children: column.title
                }, void 0, false, {
                    fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                    lineNumber: 206,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                lineNumber: 205,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-0.5",
                children: column.items.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MegaMenuItem, {
                        item: item,
                        onNavigate: onNavigate,
                        onItemHover: onItemHover
                    }, `${column.title}-${item.href}-${i}`, false, {
                        fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                        lineNumber: 212,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                lineNumber: 210,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
        lineNumber: 204,
        columnNumber: 5
    }, this);
}
_c2 = MegaMenuColumn;
/* ── Feature Box (right side of "feature" layout) ──
 *
 * Shows dynamic content based on which item is hovered.
 * Uses warm beige background (#ebe9e1) — CONSISTENT in both
 * light and dark modes (does not change with theme).
 * Content fades in/out with smooth transition.
 */ function MegaMenuFeatureBox({ featureBox, onNavigate }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center justify-center bg-accent-soft rounded-xl p-5 relative overflow-hidden h-full",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center text-center gap-2.5",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-accent",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavIconSvg, {
                        icon: featureBox.icon,
                        className: "w-7 h-7 opacity-80"
                    }, void 0, false, {
                        fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                        lineNumber: 244,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                    lineNumber: 243,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                            className: "text-sm font-bold text-text mb-1",
                            children: featureBox.title
                        }, void 0, false, {
                            fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                            lineNumber: 247,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-text-muted leading-relaxed max-w-[170px]",
                            children: featureBox.description
                        }, void 0, false, {
                            fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                            lineNumber: 250,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                    lineNumber: 246,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    href: featureBox.ctaHref,
                    onClick: onNavigate,
                    className: "mt-1 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-accent text-accent-contrast text-xs font-bold hover:bg-accent-hover transition-colors duration-150",
                    children: [
                        featureBox.ctaLabel,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            className: "w-3 h-3",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            strokeWidth: 2.5,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M5 12h14M12 5l7 7-7 7"
                            }, void 0, false, {
                                fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                                lineNumber: 263,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                            lineNumber: 262,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                    lineNumber: 254,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
            lineNumber: 242,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
        lineNumber: 239,
        columnNumber: 5
    }, this);
}
_c3 = MegaMenuFeatureBox;
function MegaMenuColumns({ columns, layout, featureBox, hoverFeatureMap, footerCta, onNavigate }) {
    _s();
    /* ── Dynamic feature box state ── */ const [hoveredHref, setHoveredHref] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [featureOpacity, setFeatureOpacity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [activeFeature, setActiveFeature] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(featureBox);
    const fadeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])();
    /* Resolve the current feature box content based on hover */ const currentFeature = activeFeature || featureBox;
    /* Handle item hover — fades feature box content in/out */ const handleItemHover = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MegaMenuColumns.useCallback[handleItemHover]": (href)=>{
            if (!hoverFeatureMap || !featureBox) return;
            // Already showing this item's content
            if (hoveredHref === href) return;
            // Clear any pending fade
            if (fadeRef.current) clearTimeout(fadeRef.current);
            // Fade out
            setFeatureOpacity(0);
            // After 150ms, swap content and fade in
            fadeRef.current = setTimeout({
                "MegaMenuColumns.useCallback[handleItemHover]": ()=>{
                    const newFeature = hoverFeatureMap[href] || featureBox;
                    setActiveFeature(newFeature);
                    setHoveredHref(href);
                    setFeatureOpacity(1);
                }
            }["MegaMenuColumns.useCallback[handleItemHover]"], 150);
        }
    }["MegaMenuColumns.useCallback[handleItemHover]"], [
        hoverFeatureMap,
        featureBox,
        hoveredHref
    ]);
    /* ── SPLIT LAYOUT (50/50) ── */ if (layout === "split") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-2 gap-5 text-left",
            children: columns.map((column, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MegaMenuColumn, {
                    column: column,
                    onNavigate: onNavigate,
                    showBorder: index === 0 && columns.length > 1
                }, `${column.title}-${index}`, false, {
                    fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                    lineNumber: 322,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
            lineNumber: 320,
            columnNumber: 7
        }, this);
    }
    /* ── FEATURE LAYOUT (60/40) ── */ return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-12 gap-5 text-left",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "col-span-7 flex flex-col gap-1 pr-4 border-r border-border-soft",
                children: columns.map((column, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: index > 0 ? "mt-2" : "",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-3 pb-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[11px] font-bold tracking-wider uppercase text-text-soft",
                                    children: column.title
                                }, void 0, false, {
                                    fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                                    lineNumber: 341,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                                lineNumber: 340,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-0.5",
                                children: column.items.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MegaMenuItem, {
                                        item: item,
                                        onNavigate: onNavigate,
                                        onItemHover: handleItemHover
                                    }, `${column.title}-${item.href}-${i}`, false, {
                                        fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                                        lineNumber: 347,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                                lineNumber: 345,
                                columnNumber: 13
                            }, this)
                        ]
                    }, `${column.title}-${index}`, true, {
                        fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                        lineNumber: 339,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                lineNumber: 337,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "col-span-5 flex flex-col",
                children: [
                    currentFeature ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            opacity: featureOpacity,
                            transition: "opacity 150ms ease-in-out"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MegaMenuFeatureBox, {
                            featureBox: currentFeature,
                            onNavigate: onNavigate
                        }, void 0, false, {
                            fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                            lineNumber: 363,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                        lineNumber: 362,
                        columnNumber: 11
                    }, this) : null,
                    footerCta ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-end mt-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: footerCta.primaryHref,
                            onClick: onNavigate,
                            className: "inline-flex items-center justify-center h-8 px-4 rounded-full bg-accent text-accent-contrast text-xs font-bold hover:bg-accent-hover transition-all",
                            children: footerCta.primaryLabel
                        }, void 0, false, {
                            fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                            lineNumber: 371,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                        lineNumber: 370,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
                lineNumber: 360,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx",
        lineNumber: 335,
        columnNumber: 5
    }, this);
}
_s(MegaMenuColumns, "QbHxcnZFuvqDC3CgfUAFa2Rd3YI=");
_c4 = MegaMenuColumns;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "NavIconSvg");
__turbopack_context__.k.register(_c1, "MegaMenuItem");
__turbopack_context__.k.register(_c2, "MegaMenuColumn");
__turbopack_context__.k.register(_c3, "MegaMenuFeatureBox");
__turbopack_context__.k.register(_c4, "MegaMenuColumns");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/exxonim/components/navigation/DesktopNavigation.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DesktopNavigation",
    ()=>DesktopNavigation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * Desktop navigation — rendered as a centered pill inside the header.
 *
 * LAYOUT ORDER (explicit, not API-driven):
 *   [Home] [About] [Services ▼] [Resources ▼] [Career] [Contact] [● Track Consultation]
 *
 * MEGA MENU DROPDOWN:
 * ────────────────────
 * Both Services and Resources dropdowns use a premium opaque mega menu
 * design with React-state-controlled visibility:
 *
 *   1. The parent <nav> is `relative` — dropdowns are positioned
 *      relative to it, centered with `left-1/2 -translate-x-1/2`
 *   2. A `pt-3` (12px) invisible bridge keeps the mouse within the
 *      nav's descendant tree while traveling to the dropdown
 *   3. Dropdown visibility is controlled by React state (`desktopMenu`),
 *      NOT CSS group-hover:
 *      - desktopMenu matches → visible, opacity-100, scale-100
 *      - desktopMenu doesn't match → invisible, opacity-0, scale-95
 *   4. `onMouseLeave` on <nav> closes all menus when mouse leaves
 *      the entire nav area (including dropdowns)
 *
 * CENTERING:
 * ──────────
 * Dropdowns are centered on the navigation bar, not on individual
 * trigger items. Both dropdowns have the same width and min-height
 * for visual consistency.
 *
 * CLICK-NOT-CLOSING BUG FIX:
 * ──────────────────────────
 * Clicking an item → closeAllMenus() → desktopMenu = null → dropdown hides.
 * Since visibility is React-state-controlled (not CSS :hover), clicking
 * a nav item immediately closes the dropdown.
 *
 * THEME ADAPTATION:
 *   Light mode → White card, teal-tinted hover
 *   Dark mode → Dark teal card (#0d2226), subtle teal hover
 *
 * BACKEND / ADMIN INTEGRATION NOTES:
 * ──────────────────────────────────
 * Nav structure is defined in staticNavigation.ts. To change the items,
 * order, or labels, edit that file — NOT this component.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.mjs [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$navigation$2f$MegaMenuColumns$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/components/navigation/MegaMenuColumns.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/routes.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/utils/cn.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
const navLinkBase = "relative inline-flex items-center justify-center h-9 px-3.5 text-[0.8rem] font-medium tracking-wide text-text rounded-full transition-all hover:bg-accent-soft";
const navLinkActive = "bg-accent-soft text-accent";
/** Shared dropdown card classes — both menus have same width, radius, and min-height */ const dropdownCardBase = "relative overflow-visible w-[620px] rounded-2xl border p-5 min-h-[250px] " + "bg-surface border-border-soft";
function DesktopNavigation({ brandName, leftLinks, rightLinks, highlightLink, desktopMenu, resourcesActive, resourcesColumns, resourcesLayout, resourcesFeatureBox, resourcesHoverFeatureMap, resourcesFooterCta, resourcesMenuId, servicesActive, servicesColumns, servicesLayout, servicesFeatureBox, servicesMenuId, closeAllMenus, isActive, onDropdownBlur, setDesktopMenu }) {
    _s();
    /* ── Triangle connector positioning ──
   *
   * Calculates the horizontal offset from the dropdown center to the
   * active trigger's center, so the caret points at the right nav link. */ const navRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const servicesTriggerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const resourcesTriggerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [triangleOffset, setTriangleOffset] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DesktopNavigation.useEffect": ()=>{
            if (!desktopMenu || !navRef.current) return;
            const nav = navRef.current;
            const triggerEl = desktopMenu === "services" ? servicesTriggerRef.current : resourcesTriggerRef.current;
            if (!triggerEl) return;
            const navCenter = nav.offsetWidth / 2;
            const triggerCenter = triggerEl.offsetLeft + triggerEl.offsetWidth / 2;
            setTriangleOffset(triggerCenter - navCenter);
        }
    }["DesktopNavigation.useEffect"], [
        desktopMenu
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "hidden xl:flex items-center",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
            ref: navRef,
            className: "relative inline-flex items-center gap-1 p-1.5 rounded-full border border-border-soft overflow-visible",
            "aria-label": "Primary navigation",
            onMouseLeave: ()=>setDesktopMenu(null),
            onBlur: onDropdownBlur,
            children: [
                leftLinks.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: link.href,
                        "aria-current": isActive(link.href) ? "page" : undefined,
                        onClick: closeAllMenus,
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(navLinkBase, isActive(link.href) && navLinkActive),
                        children: link.label
                    }, link.href, false, {
                        fileName: "[project]/src/exxonim/components/navigation/DesktopNavigation.tsx",
                        lineNumber: 138,
                        columnNumber: 11
                    }, this)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ref: servicesTriggerRef,
                    onMouseEnter: ()=>setDesktopMenu("services"),
                    onFocusCapture: ()=>setDesktopMenu("services"),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].services,
                        "aria-expanded": desktopMenu === "services",
                        "aria-controls": servicesMenuId,
                        "aria-current": servicesActive ? "page" : undefined,
                        onClick: closeAllMenus,
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(navLinkBase, servicesActive && navLinkActive),
                        children: [
                            "Services",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("ml-1 w-3.5 h-3.5 transition-transform duration-200", desktopMenu === "services" && "rotate-180"),
                                "aria-hidden": "true"
                            }, void 0, false, {
                                fileName: "[project]/src/exxonim/components/navigation/DesktopNavigation.tsx",
                                lineNumber: 168,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/exxonim/components/navigation/DesktopNavigation.tsx",
                        lineNumber: 159,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/exxonim/components/navigation/DesktopNavigation.tsx",
                    lineNumber: 154,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ref: resourcesTriggerRef,
                    onMouseEnter: ()=>setDesktopMenu("resources"),
                    onFocusCapture: ()=>setDesktopMenu("resources"),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].resources,
                        "aria-expanded": desktopMenu === "resources",
                        "aria-controls": resourcesMenuId,
                        "aria-current": resourcesActive ? "page" : undefined,
                        onClick: closeAllMenus,
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(navLinkBase, resourcesActive && navLinkActive),
                        children: [
                            "Resources",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("ml-1 w-3.5 h-3.5 transition-transform duration-200", desktopMenu === "resources" && "rotate-180"),
                                "aria-hidden": "true"
                            }, void 0, false, {
                                fileName: "[project]/src/exxonim/components/navigation/DesktopNavigation.tsx",
                                lineNumber: 195,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/exxonim/components/navigation/DesktopNavigation.tsx",
                        lineNumber: 186,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/exxonim/components/navigation/DesktopNavigation.tsx",
                    lineNumber: 181,
                    columnNumber: 9
                }, this),
                rightLinks.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: link.href,
                        "aria-current": isActive(link.href) ? "page" : undefined,
                        onClick: closeAllMenus,
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(navLinkBase, isActive(link.href) && navLinkActive),
                        children: link.label
                    }, link.href, false, {
                        fileName: "[project]/src/exxonim/components/navigation/DesktopNavigation.tsx",
                        lineNumber: 207,
                        columnNumber: 11
                    }, this)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    href: highlightLink.href,
                    onClick: closeAllMenus,
                    "aria-current": isActive(highlightLink.href) ? "page" : undefined,
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative inline-flex items-center gap-2 h-9 px-3.5 rounded-full text-[0.8rem] font-extrabold transition-all", isActive(highlightLink.href) ? "bg-accent-hover text-accent-contrast ring-2 ring-accent/30" : "bg-accent text-accent-contrast hover:bg-accent-hover"),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "relative flex h-2 w-2",
                            "aria-hidden": "true",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-contrast opacity-75"
                                }, void 0, false, {
                                    fileName: "[project]/src/exxonim/components/navigation/DesktopNavigation.tsx",
                                    lineNumber: 231,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "relative inline-flex rounded-full h-2 w-2 bg-accent-contrast"
                                }, void 0, false, {
                                    fileName: "[project]/src/exxonim/components/navigation/DesktopNavigation.tsx",
                                    lineNumber: 232,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/exxonim/components/navigation/DesktopNavigation.tsx",
                            lineNumber: 230,
                            columnNumber: 11
                        }, this),
                        highlightLink.label
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/exxonim/components/navigation/DesktopNavigation.tsx",
                    lineNumber: 219,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    id: servicesMenuId,
                    "aria-hidden": desktopMenu !== "services",
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute top-full left-1/2 -translate-x-1/2 pt-3 origin-top transition-all duration-200 z-50", desktopMenu === "services" ? "visible opacity-100 scale-100 pointer-events-auto" : "invisible opacity-0 scale-95 pointer-events-none"),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: dropdownCardBase,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute -top-[11px] left-1/2 pointer-events-none -translate-x-1/2",
                                style: {
                                    marginLeft: `${triangleOffset}px`
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "18",
                                    height: "11",
                                    viewBox: "0 0 18 11",
                                    fill: "none",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M9 0L18 11H0L9 0Z",
                                        fill: "var(--color-surface)",
                                        stroke: "var(--color-border-strong)",
                                        strokeWidth: "1.5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/exxonim/components/navigation/DesktopNavigation.tsx",
                                        lineNumber: 269,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/exxonim/components/navigation/DesktopNavigation.tsx",
                                    lineNumber: 268,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/exxonim/components/navigation/DesktopNavigation.tsx",
                                lineNumber: 264,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$navigation$2f$MegaMenuColumns$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MegaMenuColumns"], {
                                columns: servicesColumns,
                                layout: servicesLayout,
                                featureBox: servicesFeatureBox,
                                onNavigate: closeAllMenus
                            }, void 0, false, {
                                fileName: "[project]/src/exxonim/components/navigation/DesktopNavigation.tsx",
                                lineNumber: 273,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mt-4 pt-3 border-t border-border-soft",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].contact,
                                        onClick: closeAllMenus,
                                        className: "text-xs font-medium text-text-muted hover:text-accent transition-colors",
                                        children: [
                                            "Contact ",
                                            brandName
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/exxonim/components/navigation/DesktopNavigation.tsx",
                                        lineNumber: 282,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].services,
                                        onClick: closeAllMenus,
                                        className: "inline-flex items-center justify-center h-8 px-4 rounded-full bg-accent text-accent-contrast text-xs font-bold hover:bg-accent-hover transition-all",
                                        children: "See All Services"
                                    }, void 0, false, {
                                        fileName: "[project]/src/exxonim/components/navigation/DesktopNavigation.tsx",
                                        lineNumber: 289,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/exxonim/components/navigation/DesktopNavigation.tsx",
                                lineNumber: 281,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/exxonim/components/navigation/DesktopNavigation.tsx",
                        lineNumber: 262,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/exxonim/components/navigation/DesktopNavigation.tsx",
                    lineNumber: 252,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    id: resourcesMenuId,
                    "aria-hidden": desktopMenu !== "resources",
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute top-full left-1/2 -translate-x-1/2 pt-3 origin-top transition-all duration-200 z-50", desktopMenu === "resources" ? "visible opacity-100 scale-100 pointer-events-auto" : "invisible opacity-0 scale-95 pointer-events-none"),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: dropdownCardBase,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute -top-[11px] left-1/2 pointer-events-none -translate-x-1/2",
                                style: {
                                    marginLeft: `${triangleOffset}px`
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "18",
                                    height: "11",
                                    viewBox: "0 0 18 11",
                                    fill: "none",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M9 0L18 11H0L9 0Z",
                                        fill: "var(--color-surface)",
                                        stroke: "var(--color-border-strong)",
                                        strokeWidth: "1.5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/exxonim/components/navigation/DesktopNavigation.tsx",
                                        lineNumber: 318,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/exxonim/components/navigation/DesktopNavigation.tsx",
                                    lineNumber: 317,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/exxonim/components/navigation/DesktopNavigation.tsx",
                                lineNumber: 313,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$navigation$2f$MegaMenuColumns$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MegaMenuColumns"], {
                                columns: resourcesColumns,
                                layout: resourcesLayout,
                                featureBox: resourcesFeatureBox,
                                hoverFeatureMap: resourcesHoverFeatureMap,
                                footerCta: resourcesFooterCta,
                                onNavigate: closeAllMenus
                            }, void 0, false, {
                                fileName: "[project]/src/exxonim/components/navigation/DesktopNavigation.tsx",
                                lineNumber: 322,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/exxonim/components/navigation/DesktopNavigation.tsx",
                        lineNumber: 311,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/exxonim/components/navigation/DesktopNavigation.tsx",
                    lineNumber: 301,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/exxonim/components/navigation/DesktopNavigation.tsx",
            lineNumber: 129,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/exxonim/components/navigation/DesktopNavigation.tsx",
        lineNumber: 128,
        columnNumber: 5
    }, this);
}
_s(DesktopNavigation, "ELeknudCA5BQPuNBP0piShIsTSU=");
_c = DesktopNavigation;
var _c;
__turbopack_context__.k.register(_c, "DesktopNavigation");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/exxonim/components/navigation/MobileNavigationPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MobileNavigationPanel",
    ()=>MobileNavigationPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.mjs [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/phone.mjs [app-client] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/routes.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/utils/cn.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
function MobileAccordion({ label, columns, ctaLabel, ctaHref, secondaryLabel, secondaryHref, onClose, defaultOpen = false, isActive: isGroupActive = false }) {
    _s();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultOpen || isGroupActive);
    if (!columns.length) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-xl border overflow-hidden", isGroupActive ? "border-accent/30 bg-accent-soft/30" : "border-border-soft bg-surface-elevated"),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                "aria-expanded": open,
                onClick: ()=>setOpen((value)=>!value),
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-full flex items-center justify-between gap-3 px-4 py-3 text-left transition-colors", isGroupActive ? "bg-accent-soft/40" : "hover:bg-accent-soft/40"),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-xs font-extrabold tracking-[0.14em] uppercase text-accent"),
                        children: [
                            label,
                            isGroupActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full bg-accent text-accent-contrast text-[0.55rem] font-bold",
                                children: "Active"
                            }, void 0, false, {
                                fileName: "[project]/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                                lineNumber: 88,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                        lineNumber: 83,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-4 h-4 text-accent transition-transform", open && "rotate-180"),
                        "aria-hidden": "true"
                    }, void 0, false, {
                        fileName: "[project]/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                        lineNumber: 93,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("grid transition-all duration-300 ease-out", open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "overflow-hidden",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-4 pb-4 pt-1 grid gap-4",
                        children: [
                            columns.map((column)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[11px] font-bold tracking-wider uppercase text-text-muted",
                                            children: column.title
                                        }, void 0, false, {
                                            fileName: "[project]/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                                            lineNumber: 112,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            className: "grid gap-1",
                                            children: column.items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: item.href,
                                                        onClick: onClose,
                                                        className: "block py-1.5 text-sm text-text hover:text-accent transition-colors",
                                                        children: item.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                                                        lineNumber: 118,
                                                        columnNumber: 23
                                                    }, this)
                                                }, `${item.href}-${item.label}`, false, {
                                                    fileName: "[project]/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                                                    lineNumber: 117,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                                            lineNumber: 115,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, column.title, true, {
                                    fileName: "[project]/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                                    lineNumber: 111,
                                    columnNumber: 15
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center gap-3 pt-3 border-t border-border-soft",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: ctaHref,
                                        onClick: onClose,
                                        className: "inline-flex items-center justify-center h-9 px-4 rounded-full bg-accent text-accent-contrast text-sm font-extrabold hover:bg-accent-hover transition-all",
                                        children: ctaLabel
                                    }, void 0, false, {
                                        fileName: "[project]/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                                        lineNumber: 131,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: secondaryHref,
                                        onClick: onClose,
                                        className: "text-sm font-medium text-accent hover:underline",
                                        children: secondaryLabel
                                    }, void 0, false, {
                                        fileName: "[project]/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                                        lineNumber: 138,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                                lineNumber: 130,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                        lineNumber: 109,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                    lineNumber: 108,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                lineNumber: 102,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
_s(MobileAccordion, "RNgcJOcKhIApyALTl0+bA102KBo=");
_c = MobileAccordion;
function MobileNavigationPanel({ brandName, callHref, currentPath, regularLinks, highlightLink, id, isOpen, resourcesActive, servicesActive, resourcesColumns, servicesColumns, panelRef, primaryPhone, isActive, onClose }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        id: id,
        "aria-hidden": !isOpen,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("fixed inset-0 z-40 xl:hidden transition-opacity duration-200", isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                "aria-label": "Close navigation",
                tabIndex: isOpen ? 0 : -1,
                onClick: onClose,
                className: "absolute inset-0 bg-surface-strong/60 backdrop-blur-sm"
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                lineNumber: 179,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-[70px] right-4 left-4 sm:left-auto sm:w-[min(420px,calc(100vw-2rem))]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ref: panelRef,
                    role: "dialog",
                    "aria-modal": "true",
                    "aria-label": "Site navigation",
                    tabIndex: -1,
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("max-h-[calc(100vh-100px)] overflow-y-auto rounded-2xl border border-border-soft bg-surface p-4 transition-all duration-300 ease-out", isOpen ? "translate-y-0 opacity-100 scale-100" : "-translate-y-3 opacity-0 scale-[0.98]"),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid gap-1",
                                children: regularLinks.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: link.href,
                                        onClick: onClose,
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center justify-between px-4 h-11 rounded-full text-sm font-medium transition-colors", isActive(link.href) ? "bg-accent text-accent-contrast" : "text-text hover:bg-accent-soft"),
                                        children: link.label
                                    }, link.href, false, {
                                        fileName: "[project]/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                                        lineNumber: 205,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                                lineNumber: 203,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MobileAccordion, {
                                label: "Services",
                                columns: servicesColumns,
                                ctaLabel: "See All Services",
                                ctaHref: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].services,
                                secondaryLabel: `Contact ${brandName}`,
                                secondaryHref: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].contact,
                                onClose: onClose,
                                isActive: servicesActive
                            }, void 0, false, {
                                fileName: "[project]/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                                lineNumber: 222,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MobileAccordion, {
                                label: "Resources",
                                columns: resourcesColumns,
                                ctaLabel: "See All Resources",
                                ctaHref: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].resources,
                                secondaryLabel: "Ask a Question",
                                secondaryHref: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].contact,
                                onClose: onClose,
                                isActive: resourcesActive
                            }, void 0, false, {
                                fileName: "[project]/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                                lineNumber: 234,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: highlightLink.href,
                                onClick: onClose,
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center justify-center gap-2 h-11 rounded-full font-extrabold text-sm transition-all", isActive(highlightLink.href) ? "bg-accent-hover text-accent-contrast ring-2 ring-accent/30" : "bg-accent text-accent-contrast hover:bg-accent-hover"),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "relative flex h-2 w-2",
                                        "aria-hidden": "true",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-contrast opacity-75"
                                            }, void 0, false, {
                                                fileName: "[project]/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                                                lineNumber: 259,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "relative inline-flex rounded-full h-2 w-2 bg-accent-contrast"
                                            }, void 0, false, {
                                                fileName: "[project]/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                                                lineNumber: 260,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                                        lineNumber: 258,
                                        columnNumber: 15
                                    }, this),
                                    highlightLink.label
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                                lineNumber: 248,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: callHref,
                                onClick: onClose,
                                className: "flex items-center justify-center gap-3 h-14 rounded-full bg-accent text-accent-contrast hover:bg-accent-hover transition-all",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                        className: "w-5 h-5 animate-phone-ring",
                                        "aria-hidden": "true"
                                    }, void 0, false, {
                                        fileName: "[project]/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                                        lineNumber: 271,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-extrabold",
                                        children: primaryPhone ? "Call Now" : `Contact ${brandName}`
                                    }, void 0, false, {
                                        fileName: "[project]/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                                        lineNumber: 272,
                                        columnNumber: 15
                                    }, this),
                                    primaryPhone ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-accent-contrast/80 text-sm",
                                        children: primaryPhone
                                    }, void 0, false, {
                                        fileName: "[project]/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                                        lineNumber: 276,
                                        columnNumber: 17
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                                lineNumber: 266,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                        lineNumber: 201,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                    lineNumber: 188,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
                lineNumber: 187,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/exxonim/components/navigation/MobileNavigationPanel.tsx",
        lineNumber: 171,
        columnNumber: 5
    }, this);
}
_c1 = MobileNavigationPanel;
var _c, _c1;
__turbopack_context__.k.register(_c, "MobileAccordion");
__turbopack_context__.k.register(_c1, "MobileNavigationPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/exxonim/components/navigation/ThemeToggle.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeToggle",
    ()=>ThemeToggle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/moon.mjs [app-client] (ecmascript) <export default as Moon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sun.mjs [app-client] (ecmascript) <export default as Sun>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/utils/cn.ts [app-client] (ecmascript)");
;
;
;
function ThemeToggle({ className, theme, onToggleTheme }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative inline-flex items-center justify-center w-12 h-7 rounded-full border border-border-soft bg-surface-soft transition-all", "hover:border-accent/50", className),
        type: "button",
        "aria-pressed": theme === "dark",
        onClick: onToggleTheme,
        "aria-label": `Toggle theme. Current theme is ${theme}.`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute top-1 w-5 h-5 rounded-full bg-surface transition-transform duration-300 flex items-center justify-center", theme === "dark" ? "translate-x-2.5" : "-translate-x-2.5"),
            "aria-hidden": "true",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__["Sun"], {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-3 h-3 text-accent transition-opacity", theme === "dark" ? "opacity-0" : "opacity-100")
                }, void 0, false, {
                    fileName: "[project]/src/exxonim/components/navigation/ThemeToggle.tsx",
                    lineNumber: 35,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__["Moon"], {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute w-3 h-3 text-accent transition-opacity", theme === "dark" ? "opacity-100" : "opacity-0")
                }, void 0, false, {
                    fileName: "[project]/src/exxonim/components/navigation/ThemeToggle.tsx",
                    lineNumber: 41,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/exxonim/components/navigation/ThemeToggle.tsx",
            lineNumber: 28,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/exxonim/components/navigation/ThemeToggle.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
_c = ThemeToggle;
var _c;
__turbopack_context__.k.register(_c, "ThemeToggle");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/exxonim/content/staticNavigation.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "staticNav",
    ()=>staticNav
]);
/**
 * Static navigation configuration for the Exxonim public website.
 *
 * BACKEND / ADMIN INTEGRATION NOTES (FastAPI + PostgreSQL):
 * ─────────────────────────────────────────────────────────────
 * Navigation is HARDCODED and does NOT require API calls.
 * To add, remove, or reorder navigation items, edit this file and redeploy.
 *
 * In a future phase, if the admin panel needs to manage navigation dynamically,
 * the FastAPI backend should expose a GET /navigation endpoint that returns a
 * structure matching the types used here (MenuItem, MenuColumn, FeatureBox),
 * and the Navigation component can be updated to fetch from that API with this
 * config as the fallback. See the deprecated navigationService.ts for the
 * previous API integration pattern.
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
 *
 * MEGA MENU LAYOUT:
 * ─────────────────
 * Each dropdown supports two layout variants:
 *   - "split"  → 50/50 two-column grid, both sides contain link items
 *   - "feature" → 60/40 grid, left side has items, right side has a
 *                 solid contrasting feature box (CTA card)
 *
 * DYNAMIC FEATURE BOX (Resources):
 * ────────────────────────────────
 * The Resources dropdown has a feature box that changes content based on
 * which menu item is hovered. The hoverFeatureMap maps each item's href
 * to a FeatureBox configuration. When no item is hovered, the default
 * resourcesFeatureBox is shown.
 *
 * BACKEND: To make menu content dynamic, create a `navigation_menus` table:
 *   TABLE navigation_menus (
 *     id            SERIAL PRIMARY KEY,
 *     key           VARCHAR(50) UNIQUE NOT NULL,  -- 'services' | 'resources'
 *     layout        VARCHAR(20) NOT NULL DEFAULT 'split',  -- 'split' | 'feature'
 *     columns       JSONB NOT NULL,       -- Array of MenuColumn objects
 *     feature_box   JSONB,                -- FeatureBox object or NULL
 *     updated_at    TIMESTAMPTZ DEFAULT NOW()
 *   );
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/routes.ts [app-client] (ecmascript)");
;
const staticNav = {
    /** Links rendered before the dropdown menus (left side of nav pill) */ leftLinks: [
        {
            label: "Home",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].home
        },
        {
            label: "About",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].about
        }
    ],
    /* ═══════════════════════════════════════════════════════════
   * SERVICES MEGA MENU — Split layout (50/50)
   * ═══════════════════════════════════════════════════════════
   *
   * BACKEND: These reflect Exxonim's 5 core service areas:
   *   1. Entity Setup & Registration
   *   2. Tax & Licensing
   *   3. Work Permits & Immigration
   *   4. Compliance & Statutory Filings
   *   5. Operational Advisory
   *
   * Split into 2 columns for the split layout:
   *   Column 1 — Registration & Setup (3 items, WITH icons)
   *   Column 2 — Compliance & Operations (3 items, WITH icons)
   */ servicesLayout: "split",
    servicesColumns: [
        {
            title: "Registration & Setup",
            items: [
                {
                    label: "Entity Registration",
                    href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].services,
                    description: "Company, NGO, and business name registration",
                    icon: "building"
                },
                {
                    label: "Tax & Licensing",
                    href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].services,
                    description: "TIN, VAT, and business licence applications",
                    icon: "receipt"
                },
                {
                    label: "Work Permits",
                    href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].services,
                    description: "Foreign investor and work permit processing",
                    icon: "passport"
                }
            ]
        },
        {
            title: "Compliance & Operations",
            borderLeft: true,
            items: [
                {
                    label: "Statutory Filings",
                    href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].services,
                    description: "Recurring filing obligations on schedule",
                    icon: "clipboard-list"
                },
                {
                    label: "Regulatory Renewals",
                    href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].services,
                    description: "Proactive tracking and timely renewals",
                    icon: "refresh"
                },
                {
                    label: "Operational Advisory",
                    href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].services,
                    description: "Structured guidance for managing obligations",
                    icon: "compass"
                }
            ]
        }
    ],
    servicesFeatureBox: undefined,
    /* ═══════════════════════════════════════════════════════════
   * RESOURCES MEGA MENU — Feature layout (60/40)
   * ═══════════════════════════════════════════════════════════
   *
   * Left side (7 cols): Two sections of links — "Learn" and "Get Help"
   *   - NO icons on items (clean, minimal)
   *   - Items trigger dynamic feature box on hover
   * Right side (5 cols): Feature box CTA card
   *   - Content changes based on which item is hovered
   *   - Default: "Latest insights" (Blog)
   * Below feature box: Footer CTA row (thin, no border)
   */ resourcesLayout: "feature",
    resourcesColumns: [
        {
            title: "Learn",
            items: [
                {
                    label: "Blog",
                    href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].blog,
                    description: "Practical guides and compliance updates"
                },
                {
                    label: "FAQ",
                    href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].faq,
                    description: "Common registration and compliance questions"
                }
            ]
        },
        {
            title: "Get Help",
            borderLeft: true,
            items: [
                {
                    label: "Support",
                    href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].support,
                    description: "Get help from the Exxonim team"
                },
                {
                    label: "Contact Us",
                    href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].contact,
                    description: "Reach out for personalised guidance"
                }
            ]
        }
    ],
    /** Default feature box — shown when no item is hovered */ resourcesFeatureBox: {
        icon: "newspaper",
        title: "Latest insights",
        description: "Practical compliance updates and registration walkthroughs.",
        ctaLabel: "Browse all resources",
        ctaHref: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].resources
    },
    /** Dynamic feature box content — changes based on hovered item.
   *  Key = item href, Value = FeatureBox to display.
   *  When an item is hovered, the feature box fades to its mapped content.
   *  When no item is hovered, falls back to resourcesFeatureBox. */ resourcesHoverFeatureMap: {
        [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].blog]: {
            icon: "newspaper",
            title: "Latest insights",
            description: "Practical guides and compliance updates.",
            ctaLabel: "Read the blog",
            ctaHref: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].blog
        },
        [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].faq]: {
            icon: "help-circle",
            title: "Common questions",
            description: "Quick answers to registration and compliance topics.",
            ctaLabel: "View all FAQs",
            ctaHref: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].faq
        },
        [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].support]: {
            icon: "headset",
            title: "Get help",
            description: "Connect with the Exxonim team for guidance.",
            ctaLabel: "Go to support",
            ctaHref: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].support
        },
        [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].contact]: {
            icon: "mail",
            title: "Reach out",
            description: "Personalised guidance for your business needs.",
            ctaLabel: "Contact us",
            ctaHref: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].contact
        }
    },
    /** Footer CTA row below the feature box (Resources only).
   *  Thin row with no border, inside the card. */ resourcesFooterCta: {
        primaryLabel: "Browse Resources",
        primaryHref: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].resources,
        secondaryLabel: "Ask a Question",
        secondaryHref: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].contact
    },
    /** Links rendered after the dropdown menus (right side of nav pill) */ rightLinks: [
        {
            label: "Career",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].career
        },
        {
            label: "Contact",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].contact
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
        href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].trackConsultation
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/exxonim/components/navigation/useMobileMenuFocusTrap.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useMobileMenuFocusTrap",
    ()=>useMobileMenuFocusTrap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
function getFocusableElements(node) {
    return Array.from(node.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter((element)=>!element.hasAttribute("disabled"));
}
function useMobileMenuFocusTrap(isOpen, panelRef, fallbackRef) {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useMobileMenuFocusTrap.useEffect": ()=>{
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
            const handleKeyDown = {
                "useMobileMenuFocusTrap.useEffect.handleKeyDown": (event)=>{
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
                }
            }["useMobileMenuFocusTrap.useEffect.handleKeyDown"];
            document.addEventListener("keydown", handleKeyDown);
            return ({
                "useMobileMenuFocusTrap.useEffect": ()=>{
                    document.removeEventListener("keydown", handleKeyDown);
                    if (previousActiveElement && typeof previousActiveElement.focus === "function") {
                        previousActiveElement.focus();
                    } else {
                        fallbackRef.current?.focus();
                    }
                }
            })["useMobileMenuFocusTrap.useEffect"];
        }
    }["useMobileMenuFocusTrap.useEffect"], [
        fallbackRef,
        isOpen,
        panelRef
    ]);
}
_s(useMobileMenuFocusTrap, "OD7bBpZva5O2jO+Puf00hKivP7c=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/exxonim/components/Navigation.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Navigation",
    ()=>Navigation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.mjs [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/phone.mjs [app-client] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.mjs [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$navigation$2f$DesktopNavigation$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/components/navigation/DesktopNavigation.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$navigation$2f$MobileNavigationPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/components/navigation/MobileNavigationPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$navigation$2f$ThemeToggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/components/navigation/ThemeToggle.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$content$2f$staticNavigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/content/staticNavigation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/content/fallbackShell.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$navigation$2f$useMobileMenuFocusTrap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/components/navigation/useMobileMenuFocusTrap.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/routes.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/utils/cn.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizePathname"])(href.split("#")[0]);
}
/** Pages that are children of the "Resources" nav dropdown.
 *  When the user is on any of these paths, the Resources nav
 *  item should appear active — not Home or nothing. */ const RESOURCE_CHILD_PATHS = new Set([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizePathname"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].faq),
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizePathname"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].support),
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizePathname"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].terms),
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizePathname"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].privacy),
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizePathname"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].cookies),
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizePathname"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].dataRights),
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizePathname"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].blog)
]);
/** Check if a path is a resource page or a resource child page.
 *  Matches: /resources, /blog, /faq, /support, /terms, /privacy,
 *  /cookies, /data-rights, and any /resources/{slug} article. */ function isResourcesPath(path) {
    if (path === (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizePathname"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].resources)) return true;
    if (RESOURCE_CHILD_PATHS.has(path)) return true;
    // Blog article paths: /resources/{slug} or /blog/{slug}
    const segments = path.split("/").filter(Boolean);
    if (segments.length === 2 && (segments[0] === "resources" || segments[0] === "blog")) {
        return true;
    }
    return false;
}
function Navigation({ brand, company, pathname, theme, onToggleTheme }) {
    _s();
    const brandName = company.name?.trim() || brand.name;
    const mobilePanelRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mobileToggleRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const servicesMenuId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"])();
    const resourcesMenuId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"])();
    const mobileMenuId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"])();
    const currentPath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizePathname"])(pathname);
    const [desktopMenu, setDesktopMenu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [mobileMenuOpen, setMobileMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    /* ── Scroll-based header transparency ──────────────────
   * When at the top of the home page (over the hero), the
   * header is transparent so the hero bleeds through.
   * When scrolled past the hero, it gains a solid background.
   * Only applies on the home page where a hero section exists. */ const isHomePage = currentPath === (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizePathname"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].home);
    const [scrolled, setScrolled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Navigation.useEffect": ()=>{
            const handleScroll = {
                "Navigation.useEffect.handleScroll": ()=>{
                    setScrolled(window.scrollY > 10);
                }
            }["Navigation.useEffect.handleScroll"];
            handleScroll();
            window.addEventListener("scroll", handleScroll, {
                passive: true
            });
            return ({
                "Navigation.useEffect": ()=>window.removeEventListener("scroll", handleScroll)
            })["Navigation.useEffect"];
        }
    }["Navigation.useEffect"], []);
    /** True when the header should be transparent (over hero, at scroll top).
   *  In dark mode, forces the dark logo variant (light text on dark hero).
   *  In light mode, forces the light logo variant (dark text on lighter hero). */ const headerOverHero = isHomePage && !scrolled;
    const primaryPhone = company.phones[0];
    const callHref = primaryPhone ? `tel:${primaryPhone.replace(/\s+/g, "")}` : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].contact;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Navigation.useEffect": ()=>{
            document.body.classList.toggle("overflow-hidden", mobileMenuOpen);
            return ({
                "Navigation.useEffect": ()=>{
                    document.body.classList.remove("overflow-hidden");
                }
            })["Navigation.useEffect"];
        }
    }["Navigation.useEffect"], [
        mobileMenuOpen
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$navigation$2f$useMobileMenuFocusTrap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMobileMenuFocusTrap"])(mobileMenuOpen, mobilePanelRef, mobileToggleRef);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Navigation.useEffect": ()=>{
            const handleViewportChange = {
                "Navigation.useEffect.handleViewportChange": ()=>{
                    if (window.innerWidth >= 1280) {
                        setMobileMenuOpen(false);
                    }
                    setDesktopMenu(null);
                }
            }["Navigation.useEffect.handleViewportChange"];
            window.addEventListener("resize", handleViewportChange);
            window.addEventListener("orientationchange", handleViewportChange);
            return ({
                "Navigation.useEffect": ()=>{
                    window.removeEventListener("resize", handleViewportChange);
                    window.removeEventListener("orientationchange", handleViewportChange);
                }
            })["Navigation.useEffect"];
        }
    }["Navigation.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Navigation.useEffect": ()=>{
            const handleKeyDown = {
                "Navigation.useEffect.handleKeyDown": (event)=>{
                    if (event.key === "Escape") {
                        setDesktopMenu(null);
                        setMobileMenuOpen(false);
                    }
                }
            }["Navigation.useEffect.handleKeyDown"];
            document.addEventListener("keydown", handleKeyDown);
            return ({
                "Navigation.useEffect": ()=>document.removeEventListener("keydown", handleKeyDown)
            })["Navigation.useEffect"];
        }
    }["Navigation.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Navigation.useEffect": ()=>{
            // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: close menus on navigation
            setDesktopMenu(null);
            setMobileMenuOpen(false);
        }
    }["Navigation.useEffect"], [
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("fixed top-0 inset-x-0 z-50 h-[68px] [--header-height:68px] transition-[background-color,backdrop-filter] duration-300", headerOverHero ? "bg-transparent" : "bg-page/95 backdrop-blur-xl"),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-full w-full px-[clamp(12px,2vw,24px)] flex xl:grid xl:grid-cols-[1fr_auto_1fr] items-center justify-between xl:justify-center gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].home,
                            onClick: closeAllMenus,
                            "aria-label": `${brand.name} home`,
                            className: "relative flex items-center min-w-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: brand.lightLogoSrc,
                                    alt: brand.name,
                                    width: "176",
                                    height: "44",
                                    onError: (event)=>{
                                        const img = event.currentTarget;
                                        if (img.dataset.fallbackApplied) return;
                                        img.dataset.fallbackApplied = "true";
                                        img.src = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fallbackBrand"].lightLogoSrc;
                                    },
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("logo-light block h-11 w-auto", headerOverHero && (theme === "dark" ? "logo-force-dark" : "logo-force-light"))
                                }, void 0, false, {
                                    fileName: "[project]/src/exxonim/components/Navigation.tsx",
                                    lineNumber: 222,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: brand.darkLogoSrc,
                                    alt: "",
                                    "aria-hidden": "true",
                                    width: "176",
                                    height: "44",
                                    onError: (event)=>{
                                        const img = event.currentTarget;
                                        if (img.dataset.fallbackApplied) return;
                                        img.dataset.fallbackApplied = "true";
                                        img.src = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fallbackBrand"].darkLogoSrc;
                                    },
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("logo-dark h-11 w-auto", headerOverHero && (theme === "dark" ? "logo-force-dark" : "logo-force-light"))
                                }, void 0, false, {
                                    fileName: "[project]/src/exxonim/components/Navigation.tsx",
                                    lineNumber: 235,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/exxonim/components/Navigation.tsx",
                            lineNumber: 210,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$navigation$2f$DesktopNavigation$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DesktopNavigation"], {
                            brandName: brandName,
                            leftLinks: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$content$2f$staticNavigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["staticNav"].leftLinks,
                            rightLinks: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$content$2f$staticNavigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["staticNav"].rightLinks,
                            highlightLink: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$content$2f$staticNavigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["staticNav"].highlightLink,
                            desktopMenu: desktopMenu,
                            resourcesActive: isResourcesPath(currentPath),
                            resourcesColumns: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$content$2f$staticNavigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["staticNav"].resourcesColumns,
                            resourcesLayout: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$content$2f$staticNavigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["staticNav"].resourcesLayout,
                            resourcesFeatureBox: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$content$2f$staticNavigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["staticNav"].resourcesFeatureBox,
                            resourcesHoverFeatureMap: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$content$2f$staticNavigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["staticNav"].resourcesHoverFeatureMap,
                            resourcesFooterCta: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$content$2f$staticNavigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["staticNav"].resourcesFooterCta,
                            resourcesMenuId: resourcesMenuId,
                            servicesActive: currentPath === (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizePathname"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].services),
                            servicesColumns: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$content$2f$staticNavigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["staticNav"].servicesColumns,
                            servicesLayout: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$content$2f$staticNavigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["staticNav"].servicesLayout,
                            servicesFeatureBox: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$content$2f$staticNavigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["staticNav"].servicesFeatureBox,
                            servicesMenuId: servicesMenuId,
                            closeAllMenus: closeAllMenus,
                            isActive: isActive,
                            onDropdownBlur: handleDropdownBlur,
                            setDesktopMenu: setDesktopMenu
                        }, void 0, false, {
                            fileName: "[project]/src/exxonim/components/Navigation.tsx",
                            lineNumber: 252,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 md:gap-3 justify-end",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$navigation$2f$ThemeToggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeToggle"], {
                                    theme: theme,
                                    onToggleTheme: onToggleTheme
                                }, void 0, false, {
                                    fileName: "[project]/src/exxonim/components/Navigation.tsx",
                                    lineNumber: 278,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: callHref,
                                    className: "hidden md:inline-flex items-center gap-3 h-12 pl-3 pr-5 rounded-full bg-accent-soft hover:bg-accent-hover transition-all",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-center w-8 h-8 rounded-full bg-accent text-accent-contrast animate-phone-ring",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                                className: "w-4 h-4",
                                                "aria-hidden": "true"
                                            }, void 0, false, {
                                                fileName: "[project]/src/exxonim/components/Navigation.tsx",
                                                lineNumber: 293,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/exxonim/components/Navigation.tsx",
                                            lineNumber: 292,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[10px] font-extrabold uppercase tracking-wider text-accent",
                                                    children: primaryPhone ? "Call Now" : `Contact ${brandName}`
                                                }, void 0, false, {
                                                    fileName: "[project]/src/exxonim/components/Navigation.tsx",
                                                    lineNumber: 296,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm font-medium text-text",
                                                    children: primaryPhone || "Open the contact page"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/exxonim/components/Navigation.tsx",
                                                    lineNumber: 299,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/exxonim/components/Navigation.tsx",
                                            lineNumber: 295,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/exxonim/components/Navigation.tsx",
                                    lineNumber: 288,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    ref: mobileToggleRef,
                                    type: "button",
                                    "aria-expanded": mobileMenuOpen,
                                    "aria-controls": mobileMenuId,
                                    "aria-label": mobileMenuOpen ? "Close navigation" : "Open navigation",
                                    onClick: ()=>{
                                        setDesktopMenu(null);
                                        setMobileMenuOpen((open)=>!open);
                                    },
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-flex xl:hidden items-center justify-center w-10 h-10 transition-colors duration-300", headerOverHero ? "text-white" : mobileMenuOpen ? "text-accent-contrast" : "text-text"),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "sr-only",
                                            children: "Toggle navigation"
                                        }, void 0, false, {
                                            fileName: "[project]/src/exxonim/components/Navigation.tsx",
                                            lineNumber: 324,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-6 h-6", mobileMenuOpen && "hidden"),
                                            "aria-hidden": "true"
                                        }, void 0, false, {
                                            fileName: "[project]/src/exxonim/components/Navigation.tsx",
                                            lineNumber: 325,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-6 h-6", !mobileMenuOpen && "hidden"),
                                            "aria-hidden": "true"
                                        }, void 0, false, {
                                            fileName: "[project]/src/exxonim/components/Navigation.tsx",
                                            lineNumber: 329,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/exxonim/components/Navigation.tsx",
                                    lineNumber: 305,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/exxonim/components/Navigation.tsx",
                            lineNumber: 277,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/exxonim/components/Navigation.tsx",
                    lineNumber: 208,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/Navigation.tsx",
                lineNumber: 199,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$navigation$2f$MobileNavigationPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MobileNavigationPanel"], {
                brandName: brandName,
                callHref: callHref,
                currentPath: currentPath,
                regularLinks: [
                    ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$content$2f$staticNavigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["staticNav"].leftLinks,
                    ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$content$2f$staticNavigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["staticNav"].rightLinks
                ],
                highlightLink: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$content$2f$staticNavigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["staticNav"].highlightLink,
                id: mobileMenuId,
                isOpen: mobileMenuOpen,
                resourcesActive: isResourcesPath(currentPath),
                servicesActive: currentPath === (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizePathname"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].services),
                resourcesColumns: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$content$2f$staticNavigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["staticNav"].resourcesColumns,
                servicesColumns: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$content$2f$staticNavigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["staticNav"].servicesColumns,
                panelRef: mobilePanelRef,
                primaryPhone: primaryPhone,
                isActive: isActive,
                onClose: ()=>setMobileMenuOpen(false)
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/Navigation.tsx",
                lineNumber: 338,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(Navigation, "NHa+uUKCHYHZFDftTLMb0vTBuLs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$navigation$2f$useMobileMenuFocusTrap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMobileMenuFocusTrap"]
    ];
});
_c = Navigation;
var _c;
__turbopack_context__.k.register(_c, "Navigation");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/exxonim/components/PageLoader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PageLoader",
    ()=>PageLoader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
/* ── Full-screen page loader ──────────────────────────
 * Uses the actual Exxonim favicon image with a smooth
 * scale-in/scale-out pulse — no rotation. The light
 * favicon shows in light mode, dark favicon in dark mode,
 * matching the same crossfade pattern as the nav logos.
 *
 * SPEED: Dismisses the instant the app is ready — no
 * artificial delay. A fast 250ms fade-out keeps it smooth.
 *
 * TIMEOUT: After 5 seconds, shows a "Try Again" button
 * so the user is never stuck loading forever.
 */ const LOADER_TIMEOUT = 5_000; // 5 seconds
const FADE_OUT_MS = 250;
function PageLoader({ isLoading = true }) {
    _s();
    const [showLoader, setShowLoader] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(isLoading);
    const [isHidden, setIsHidden] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [timedOut, setTimedOut] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const removeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    /* Dismiss loader immediately with fast fade-out */ const dismissLoader = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PageLoader.useCallback[dismissLoader]": ()=>{
            setIsHidden(true);
            removeRef.current = setTimeout({
                "PageLoader.useCallback[dismissLoader]": ()=>{
                    setShowLoader(false);
                    setTimedOut(false);
                }
            }["PageLoader.useCallback[dismissLoader]"], FADE_OUT_MS);
        }
    }["PageLoader.useCallback[dismissLoader]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PageLoader.useEffect": ()=>{
            if (!isLoading) {
                /* Dismiss on the next animation frame — no artificial delay.
       * requestAnimationFrame ensures we sync with the browser's
       * paint cycle so the fade-out looks smooth. */ const raf = requestAnimationFrame({
                    "PageLoader.useEffect.raf": ()=>{
                        dismissLoader();
                    }
                }["PageLoader.useEffect.raf"]);
                return ({
                    "PageLoader.useEffect": ()=>{
                        cancelAnimationFrame(raf);
                        if (removeRef.current) clearTimeout(removeRef.current);
                    }
                })["PageLoader.useEffect"];
            } else {
                // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: show loader when loading starts
                setShowLoader(true);
                setIsHidden(false);
                setTimedOut(false);
            }
        }
    }["PageLoader.useEffect"], [
        isLoading,
        dismissLoader
    ]);
    /* Timeout watchdog — if loading takes too long, show retry */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PageLoader.useEffect": ()=>{
            if (!isLoading) return;
            const timer = setTimeout({
                "PageLoader.useEffect.timer": ()=>{
                    setTimedOut(true);
                }
            }["PageLoader.useEffect.timer"], LOADER_TIMEOUT);
            return ({
                "PageLoader.useEffect": ()=>clearTimeout(timer)
            })["PageLoader.useEffect"];
        }
    }["PageLoader.useEffect"], [
        isLoading
    ]);
    /* Handle retry */ const handleRetry = ()=>{
        setTimedOut(false);
        window.location.reload();
    };
    if (!showLoader) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `fixed inset-0 z-[9999] flex items-center justify-center bg-[linear-gradient(135deg,var(--color-page)_0%,var(--color-page-strong)_100%)] transition-opacity duration-250 ease-[cubic-bezier(0.25,1,0.25,1)] ${isHidden ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"}`,
        "aria-hidden": isHidden,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center gap-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative animate-[loader-pulse_2s_ease-in-out_infinite]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: "/branding/exxonim-favicon-light.png",
                            alt: "",
                            width: "56",
                            height: "56",
                            className: "logo-light block w-14 h-14 object-contain"
                        }, void 0, false, {
                            fileName: "[project]/src/exxonim/components/PageLoader.tsx",
                            lineNumber: 85,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: "/branding/exxonim-favicon-dark.png",
                            alt: "",
                            width: "56",
                            height: "56",
                            className: "logo-dark w-14 h-14 object-contain"
                        }, void 0, false, {
                            fileName: "[project]/src/exxonim/components/PageLoader.tsx",
                            lineNumber: 93,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/exxonim/components/PageLoader.tsx",
                    lineNumber: 83,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-sans text-sm font-medium text-text-muted tracking-[0.08em] uppercase",
                            children: "Loading"
                        }, void 0, false, {
                            fileName: "[project]/src/exxonim/components/PageLoader.tsx",
                            lineNumber: 104,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "loader-dots font-sans text-sm font-medium text-text-muted",
                            "aria-hidden": "true",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "."
                                }, void 0, false, {
                                    fileName: "[project]/src/exxonim/components/PageLoader.tsx",
                                    lineNumber: 106,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "."
                                }, void 0, false, {
                                    fileName: "[project]/src/exxonim/components/PageLoader.tsx",
                                    lineNumber: 106,
                                    columnNumber: 27
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "."
                                }, void 0, false, {
                                    fileName: "[project]/src/exxonim/components/PageLoader.tsx",
                                    lineNumber: 106,
                                    columnNumber: 41
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/exxonim/components/PageLoader.tsx",
                            lineNumber: 105,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/exxonim/components/PageLoader.tsx",
                    lineNumber: 103,
                    columnNumber: 9
                }, this),
                timedOut && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col items-center gap-3 animate-[loader-fade_0.4s_ease_forwards]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-text-soft",
                            children: "Taking longer than expected"
                        }, void 0, false, {
                            fileName: "[project]/src/exxonim/components/PageLoader.tsx",
                            lineNumber: 113,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: handleRetry,
                            className: "inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-xs font-semibold text-accent-contrast transition-colors hover:bg-accent-hover",
                            children: "Try Again"
                        }, void 0, false, {
                            fileName: "[project]/src/exxonim/components/PageLoader.tsx",
                            lineNumber: 114,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/exxonim/components/PageLoader.tsx",
                    lineNumber: 112,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/exxonim/components/PageLoader.tsx",
            lineNumber: 81,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/exxonim/components/PageLoader.tsx",
        lineNumber: 77,
        columnNumber: 5
    }, this);
}
_s(PageLoader, "7r873fsiwbyUnGgv7YFcLmoJVWE=");
_c = PageLoader;
var _c;
__turbopack_context__.k.register(_c, "PageLoader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/exxonim/shared/api/baseUrl.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resolveApiBaseUrl",
    ()=>resolveApiBaseUrl
]);
function resolveApiBaseUrl(explicitBaseUrl) {
    if (explicitBaseUrl) {
        return explicitBaseUrl;
    }
    if ("TURBOPACK compile-time truthy", 1) {
        const { protocol, hostname } = window.location;
        return `${protocol}//${hostname}:8000/api/v1`;
    }
    //TURBOPACK unreachable
    ;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/exxonim/shared/api/http.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createHttpClient",
    ()=>createHttpClient,
    "setAuthorizationHeader",
    ()=>setAuthorizationHeader,
    "setRequestHeader",
    ()=>setRequestHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/axios/index.js [app-client] (ecmascript) <locals>");
;
function createHttpClient(baseURL, timeout = 5000) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
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
        config.headers = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["AxiosHeaders"]();
    }
    if ("set" in config.headers) {
        config.headers.set(headerName, value);
        return;
    }
    config.headers[headerName] = value;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/exxonim/app/apiClient.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "api",
    ()=>api
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$shared$2f$api$2f$baseUrl$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/shared/api/baseUrl.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$shared$2f$api$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/shared/api/http.ts [app-client] (ecmascript)");
;
;
function getApiUrl() {
    if (typeof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] !== "undefined" && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env?.NEXT_PUBLIC_API_URL) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_URL;
    }
    return undefined;
}
const api = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$shared$2f$api$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createHttpClient"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$shared$2f$api$2f$baseUrl$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveApiBaseUrl"])(getApiUrl()));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/exxonim/shared/api/routes.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/exxonim/services/privacyService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PRIVACY_CONSENT_EVENT",
    ()=>PRIVACY_CONSENT_EVENT,
    "getPrivacyConsent",
    ()=>getPrivacyConsent,
    "updatePrivacyConsent",
    ()=>updatePrivacyConsent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$app$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/app/apiClient.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$shared$2f$api$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/shared/api/routes.ts [app-client] (ecmascript)");
;
;
const PRIVACY_CONSENT_EVENT = "exxonim:privacy-consent";
function dispatchConsentEvent(consent) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    window.dispatchEvent(new CustomEvent(PRIVACY_CONSENT_EVENT, {
        detail: {
            preferencesEnabled: consent.categories.preferences
        }
    }));
}
async function getPrivacyConsent() {
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$app$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$shared$2f$api$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRoutes"].public.privacy.consent, {
        withCredentials: true
    });
    dispatchConsentEvent(response.data);
    return response.data;
}
async function updatePrivacyConsent(payload) {
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$app$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$shared$2f$api$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRoutes"].public.privacy.consent, payload, {
        withCredentials: true
    });
    dispatchConsentEvent(response.data);
    return response.data;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/exxonim/components/PrivacyConsentBanner.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PrivacyConsentBanner",
    ()=>PrivacyConsentBanner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$services$2f$privacyService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/services/privacyService.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
function PrivacyConsentBanner({ pathname }) {
    _s();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    const consentQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "public",
            "privacy",
            "consent"
        ],
        queryFn: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$services$2f$privacyService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPrivacyConsent"],
        staleTime: 60_000
    });
    const consentMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$services$2f$privacyService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updatePrivacyConsent"],
        onSuccess: {
            "PrivacyConsentBanner.useMutation[consentMutation]": async (data)=>{
                queryClient.setQueryData([
                    "public",
                    "privacy",
                    "consent"
                ], data);
            }
        }["PrivacyConsentBanner.useMutation[consentMutation]"]
    });
    if (consentQuery.isPending || consentQuery.isError || consentQuery.data?.consent_recorded) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
            className: "fixed inset-x-4 bottom-4 z-50 max-w-[min(42rem,calc(100vw-2rem))] ml-auto grid gap-4 p-5 rounded-2xl border border-border-soft bg-surface-elevated",
            "aria-live": "polite",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "m-0 text-[0.82rem] tracking-[0.12em] uppercase text-text-soft",
                            children: "Privacy & cookies"
                        }, void 0, false, {
                            fileName: "[project]/src/exxonim/components/PrivacyConsentBanner.tsx",
                            lineNumber: 35,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "m-0 text-base leading-relaxed text-text",
                            children: "We only use browser storage for session handling, consent state, and optional preferences like theme memory."
                        }, void 0, false, {
                            fileName: "[project]/src/exxonim/components/PrivacyConsentBanner.tsx",
                            lineNumber: 38,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "m-0 text-sm leading-relaxed text-text-muted",
                            children: "Business records such as customer history, service history, notes, and documents stay in the database. You can keep only necessary storage or allow preference storage too."
                        }, void 0, false, {
                            fileName: "[project]/src/exxonim/components/PrivacyConsentBanner.tsx",
                            lineNumber: 41,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap gap-3 text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "/privacy/",
                                    className: "text-accent no-underline",
                                    children: "Privacy policy"
                                }, void 0, false, {
                                    fileName: "[project]/src/exxonim/components/PrivacyConsentBanner.tsx",
                                    lineNumber: 45,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "/cookies/",
                                    className: "text-accent no-underline",
                                    children: "Cookie notice"
                                }, void 0, false, {
                                    fileName: "[project]/src/exxonim/components/PrivacyConsentBanner.tsx",
                                    lineNumber: 46,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "/data-rights/",
                                    className: "text-accent no-underline",
                                    children: "Data rights"
                                }, void 0, false, {
                                    fileName: "[project]/src/exxonim/components/PrivacyConsentBanner.tsx",
                                    lineNumber: 47,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/exxonim/components/PrivacyConsentBanner.tsx",
                            lineNumber: 44,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/exxonim/components/PrivacyConsentBanner.tsx",
                    lineNumber: 34,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-wrap gap-3 justify-end",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "inline-flex h-10 items-center justify-center rounded-full px-5 text-sm font-extrabold border border-border-soft bg-surface/80 text-text transition-all hover:bg-surface hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0",
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
                            fileName: "[project]/src/exxonim/components/PrivacyConsentBanner.tsx",
                            lineNumber: 52,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-extrabold bg-accent text-accent-contrast transition-all hover:bg-accent-hover hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0",
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
                            fileName: "[project]/src/exxonim/components/PrivacyConsentBanner.tsx",
                            lineNumber: 65,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/exxonim/components/PrivacyConsentBanner.tsx",
                    lineNumber: 51,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/exxonim/components/PrivacyConsentBanner.tsx",
            lineNumber: 30,
            columnNumber: 7
        }, this)
    }, void 0, false);
}
_s(PrivacyConsentBanner, "9lK33NcIVbPFc/b6j+yvjPVUaoM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
_c = PrivacyConsentBanner;
var _c;
__turbopack_context__.k.register(_c, "PrivacyConsentBanner");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/exxonim/components/ShellStatusNotice.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
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
_c = ShellStatusNotice;
var _c;
__turbopack_context__.k.register(_c, "ShellStatusNotice");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/exxonim/components/WhatsAppButton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WhatsAppButton",
    ()=>WhatsAppButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/utils/cn.ts [app-client] (ecmascript)");
;
;
function WhatsAppButton({ phoneNumber, className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
        href: phoneNumber,
        target: "_blank",
        rel: "noreferrer",
        "aria-label": "Chat on WhatsApp",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(// WhatsApp button target classes
        // Layout
        "fixed bottom-6 right-6 z-[30] inline-flex h-14 w-14 items-center justify-center", // Appearance
        "rounded-full border border-border-soft bg-accent text-accent-contrast", // Effects
        "transition-transform duration-150 ease-out hover:scale-110 hover:bg-accent-hover", className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute inset-0 rounded-full bg-accent/35 animate-whatsapp-pulse",
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/WhatsAppButton.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "relative z-10 w-[1.9rem] h-[1.9rem]",
                viewBox: "0 0 24 24",
                fill: "currentColor",
                "aria-hidden": "true",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M12.01 2.014a9.96 9.96 0 0 0-8.52 15.11L2 22l4.985-1.465a9.961 9.961 0 1 0 5.025-18.52Zm0 18.067a8.093 8.093 0 0 1-4.14-1.134l-.297-.176-3.082.906.924-2.977-.193-.306A8.098 8.098 0 1 1 12.01 20.08Zm4.437-6.042c-.244-.122-1.439-.711-1.662-.793-.223-.081-.385-.122-.547.122-.162.244-.628.793-.77.955-.142.162-.284.183-.528.061-1.18-.56-2.072-1.1-2.884-2.522-.083-.146-.01-.223.111-.345.11-.11.244-.284.366-.427.122-.142.162-.244.244-.407.081-.162.041-.305-.02-.427-.061-.122-.547-1.32-.75-1.808-.198-.475-.399-.411-.547-.419-.142-.008-.305-.008-.468-.008-.162 0-.427.061-.65.305-.223.244-.852.833-.852 2.032s.873 2.358.995 2.522c.122.162 1.714 2.628 4.153 3.67.58.24 1.033.383 1.385.49.582.185 1.112.158 1.531.096.47-.07 1.439-.588 1.642-1.157.203-.569.203-1.056.142-1.157-.061-.101-.223-.162-.468-.284Z"
                }, void 0, false, {
                    fileName: "[project]/src/exxonim/components/WhatsAppButton.tsx",
                    lineNumber: 43,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/WhatsAppButton.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/exxonim/components/WhatsAppButton.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_c = WhatsAppButton;
var _c;
__turbopack_context__.k.register(_c, "WhatsAppButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/exxonim/components/ScrollToTopButton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScrollToTopButton",
    ()=>ScrollToTopButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function ScrollToTopButton() {
    _s();
    const [visible, setVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ScrollToTopButton.useEffect": ()=>{
            function onScroll() {
                setVisible(window.scrollY > 400);
            }
            window.addEventListener("scroll", onScroll, {
                passive: true
            });
            onScroll();
            return ({
                "ScrollToTopButton.useEffect": ()=>window.removeEventListener("scroll", onScroll)
            })["ScrollToTopButton.useEffect"];
        }
    }["ScrollToTopButton.useEffect"], []);
    if (!visible) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: ()=>window.scrollTo({
                top: 0,
                behavior: "smooth"
            }),
        "aria-label": "Back to top",
        title: "Back to top",
        className: "fixed bottom-24 right-6 z-[30] inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-soft bg-surface-soft text-text-muted transition-all duration-200 hover:bg-accent-soft hover:text-accent hover:scale-110",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            className: "w-5 h-5",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "m18 15-6-6-6 6"
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/ScrollToTopButton.tsx",
                lineNumber: 33,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/exxonim/components/ScrollToTopButton.tsx",
            lineNumber: 32,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/exxonim/components/ScrollToTopButton.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
_s(ScrollToTopButton, "cz/DzCD06IMMsoBJ0A1IgCy1P5M=");
_c = ScrollToTopButton;
var _c;
__turbopack_context__.k.register(_c, "ScrollToTopButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/exxonim/components/ErrorBoundary.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ErrorBoundary",
    ()=>ErrorBoundary
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/utils/cn.ts [app-client] (ecmascript)");
;
;
;
class ErrorBoundary extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Component"] {
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
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("c-error-boundary", // Layout
                "flex items-center justify-center min-h-[60vh] px-6", // Visuals
                "bg-page text-text"),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-lg text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(// Layout
                            "inline-flex items-center justify-center mb-6", // Sizing
                            "w-16 h-16 rounded-full", // Visuals
                            "bg-accent-soft text-accent"),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "currentColor",
                                strokeWidth: 1.5,
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                className: "w-8 h-8",
                                "aria-hidden": "true",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                                }, void 0, false, {
                                    fileName: "[project]/src/exxonim/components/ErrorBoundary.tsx",
                                    lineNumber: 82,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/exxonim/components/ErrorBoundary.tsx",
                                lineNumber: 72,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/exxonim/components/ErrorBoundary.tsx",
                            lineNumber: 62,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-2xl font-bold text-text mb-3",
                            children: "Something went wrong"
                        }, void 0, false, {
                            fileName: "[project]/src/exxonim/components/ErrorBoundary.tsx",
                            lineNumber: 86,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-text-muted leading-relaxed mb-8",
                            children: "An unexpected error occurred while rendering this page. You can try again or reload the site."
                        }, void 0, false, {
                            fileName: "[project]/src/exxonim/components/ErrorBoundary.tsx",
                            lineNumber: 89,
                            columnNumber: 13
                        }, this),
                        this.state.error && typeof this.state.error.message === "string" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                            className: "mb-6 p-4 rounded-xl border border-border-soft bg-surface-soft text-xs text-text-muted text-left overflow-x-auto max-h-32",
                            children: this.state.error.message
                        }, void 0, false, {
                            fileName: "[project]/src/exxonim/components/ErrorBoundary.tsx",
                            lineNumber: 95,
                            columnNumber: 15
                        }, this) : null,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap justify-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: this.handleReset,
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-flex items-center justify-center", "h-10 px-5 rounded-full", "border border-border-soft bg-surface/80 text-text font-extrabold text-sm", "transition-all hover:bg-surface hover:-translate-y-0.5"),
                                    children: "Try again"
                                }, void 0, false, {
                                    fileName: "[project]/src/exxonim/components/ErrorBoundary.tsx",
                                    lineNumber: 101,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: this.handleReload,
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-flex items-center justify-center", "h-12 px-6 rounded-full", "bg-accent text-accent-contrast font-extrabold text-sm", "transition-all hover:bg-accent-hover hover:-translate-y-0.5"),
                                    children: "Reload page"
                                }, void 0, false, {
                                    fileName: "[project]/src/exxonim/components/ErrorBoundary.tsx",
                                    lineNumber: 113,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/exxonim/components/ErrorBoundary.tsx",
                            lineNumber: 100,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/exxonim/components/ErrorBoundary.tsx",
                    lineNumber: 61,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/ErrorBoundary.tsx",
                lineNumber: 52,
                columnNumber: 9
            }, this);
        }
        return this.props.children;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/exxonim/app/usePublicRouter.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePublicRouter",
    ()=>usePublicRouter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/routes.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
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
    _s();
    const [pathname, setPathname] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "usePublicRouter.useState": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizePathname"])(("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : window.location.pathname)
    }["usePublicRouter.useState"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "usePublicRouter.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const handlePopState = {
                "usePublicRouter.useEffect.handlePopState": ()=>{
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startTransition"])({
                        "usePublicRouter.useEffect.handlePopState": ()=>{
                            setPathname((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizePathname"])(window.location.pathname));
                        }
                    }["usePublicRouter.useEffect.handlePopState"]);
                }
            }["usePublicRouter.useEffect.handlePopState"];
            const handleDocumentClick = {
                "usePublicRouter.useEffect.handleDocumentClick": (event)=>{
                    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
                        return;
                    }
                    const target = event.target;
                    if (!(target instanceof Element)) {
                        return;
                    }
                    const anchor = target.closest("a[href]");
                    if (!(anchor instanceof HTMLAnchorElement)) {
                        return;
                    }
                    if (!shouldHandleClientNavigation(anchor)) {
                        return;
                    }
                    const nextUrl = new URL(anchor.href, window.location.href);
                    if (nextUrl.origin !== window.location.origin) {
                        return;
                    }
                    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isPublicAppRoute"])(nextUrl.pathname)) {
                        return;
                    }
                    const nextPathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizePathname"])(nextUrl.pathname);
                    const samePath = nextPathname === (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizePathname"])(window.location.pathname);
                    if (samePath && nextUrl.hash) {
                        return;
                    }
                    event.preventDefault();
                    const nextHref = `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`;
                    window.history.pushState({}, "", nextHref);
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startTransition"])({
                        "usePublicRouter.useEffect.handleDocumentClick": ()=>{
                            setPathname(nextPathname);
                        }
                    }["usePublicRouter.useEffect.handleDocumentClick"]);
                    if (!nextUrl.hash) {
                        window.scrollTo({
                            top: 0,
                            behavior: "auto"
                        });
                    }
                }
            }["usePublicRouter.useEffect.handleDocumentClick"];
            window.addEventListener("popstate", handlePopState);
            document.addEventListener("click", handleDocumentClick);
            return ({
                "usePublicRouter.useEffect": ()=>{
                    window.removeEventListener("popstate", handlePopState);
                    document.removeEventListener("click", handleDocumentClick);
                }
            })["usePublicRouter.useEffect"];
        }
    }["usePublicRouter.useEffect"], []);
    return {
        pathname
    };
}
_s(usePublicRouter, "GEcGImjvk3ykksoSTjJMM/S4iM0=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/exxonim/shared/publicContentCache.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
    return ("TURBOPACK compile-time value", "object") !== "undefined" && typeof window.localStorage !== "undefined";
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
    try {
        const rawValue = window.localStorage.getItem(toStorageKey(cacheKey));
        if (!rawValue) {
            return null;
        }
        const parsed = JSON.parse(rawValue);
        if (!parsed || typeof parsed !== "object" || !("value" in parsed)) {
            return null;
        }
        return {
            version: 1,
            cachedAt: typeof parsed.cachedAt === "string" ? parsed.cachedAt : new Date().toISOString(),
            expiresAt: typeof parsed.expiresAt === "string" || parsed.expiresAt === null ? parsed.expiresAt : null,
            value: parsed.value
        };
    } catch  {
        return null;
    }
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
    try {
        let oldestKey = null;
        let oldestTime = Infinity;
        for(let i = 0; i < window.localStorage.length; i++){
            const key = window.localStorage.key(i);
            if (!key || !key.startsWith(PUBLIC_CONTENT_CACHE_PREFIX + ":")) {
                continue;
            }
            try {
                const raw = window.localStorage.getItem(key);
                if (!raw) continue;
                const parsed = JSON.parse(raw);
                const cachedAt = typeof parsed.cachedAt === "string" ? parsed.cachedAt : undefined;
                if (cachedAt) {
                    const time = new Date(cachedAt).getTime();
                    if (time < oldestTime) {
                        oldestTime = time;
                        oldestKey = key;
                    }
                } else {
                    // No cachedAt – treat as infinitely old so it gets evicted first.
                    oldestKey = key;
                    oldestTime = -Infinity;
                }
            } catch  {
                // Malformed entry – evict it immediately.
                oldestKey = key;
                oldestTime = -Infinity;
            }
        }
        if (oldestKey) {
            window.localStorage.removeItem(oldestKey);
        }
    } catch  {
    // Ignore eviction failures.
    }
}
function countCacheEntries() {
    if (!hasLocalStorage()) {
        return 0;
    }
    let count = 0;
    for(let i = 0; i < window.localStorage.length; i++){
        const key = window.localStorage.key(i);
        if (key && key.startsWith(PUBLIC_CONTENT_CACHE_PREFIX + ":")) {
            count++;
        }
    }
    return count;
}
function cachePublicContent(cacheKey, value, options = {}) {
    if (!hasLocalStorage()) {
        return value;
    }
    try {
        const payload = {
            version: 1,
            cachedAt: new Date().toISOString(),
            expiresAt: resolveExpiry(options.ttlMs),
            value
        };
        window.localStorage.setItem(toStorageKey(cacheKey), JSON.stringify(payload));
        // Evict oldest entries if we've exceeded the maximum cache size.
        while(countCacheEntries() > MAX_CACHE_ENTRIES){
            evictOldestCacheEntry();
        }
    } catch  {
    // Ignore cache write failures so public rendering never hard-fails on storage.
    }
    return value;
}
function warnWithFallback(label, error) {
    if (("TURBOPACK compile-time value", "object") !== "undefined" && typeof console !== "undefined" && typeof console.warn === "function") {
        console.warn(label, error);
    }
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/exxonim/utils/contentMappers.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/exxonim/services/staticFallbackService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/exxonim/content/fallbackPublicContent.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/content/fallbackShell.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/routes.ts [app-client] (ecmascript)");
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
const fallbackHomePage = createFallbackPage("home", "Exxonim Consult | Business Registration & Compliance Tanzania", {
    hero: {
        eyebrow: "Business consulting — Tanzania",
        title: "Your obligations, handled and tracked.",
        description: "Exxonim guides you through registration, licensing, and compliance — with proactive updates at every milestone.",
        cta: {
            label: "Get Started",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].contact
        },
        secondary_cta: {
            label: "Explore Services",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].services
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
                src: utecLogo,
                opticalWeight: "solid"
            },
            {
                alt: "TRCS",
                src: trcsLogo,
                opticalWeight: "solid"
            },
            {
                alt: "Levo",
                src: levoLogo,
                opticalWeight: "wordmark"
            },
            {
                alt: "GET",
                src: getLogo,
                opticalWeight: "wordmark"
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
                ctaHref: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].contact,
                windowTitle: "Setup",
                windowTag: "Guide",
                videoSrc: ""
            },
            {
                title: "Keep tax and licensing work on track",
                subtitle: "TIN, VAT, business licences, sector permits, and work permits — managed through a clear workflow.",
                description: "A practical approach to tax registration, licensing applications, and regulatory follow-through — so your team can focus on operations instead of chasing approvals.",
                ctaLabel: "Explore services",
                ctaHref: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].services,
                windowTitle: "Compliance",
                windowTag: "Guide",
                videoSrc: ""
            },
            {
                title: "Track every consultation — automatically",
                subtitle: "Proactive updates at every milestone. You never need to call and ask what is happening.",
                description: "Upon engagement, you receive a unique tracking number. At every key milestone — name clearance, document submission, approval, issuance — Exxonim sends you an update via WhatsApp, email, or SMS. You can also look up your status on the website anytime, no login required.",
                ctaLabel: "Track a consultation",
                ctaHref: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].trackConsultation,
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
}, undefined, "Exxonim Consult helps businesses, NGOs, and institutions with company registration, business name registration, trademark protection, licensing, tax compliance, annual returns, and proactive consultation tracking from intake to resolution.");
const fallbackAboutPage = createFallbackPage("about", "About Exxonim Consult | Tanzania Business Advisory", {
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
            href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].contact
        },
        secondary: {
            label: "Explore services",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].services
        }
    }
}, undefined, "Founded in 2020, Exxonim Consult provides structured business registration, business name and trademark registration, licensing, compliance, and work permit advisory with proactive tracking at every milestone.");
const fallbackFaqPage = createFallbackPage("faq", "FAQ | Registration, Licensing & Compliance Questions", {
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
                value: "4+",
                label: "Service areas",
                detail: "Registration, compliance, foreign investment, and tracking"
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
                summary: "Registration support for companies, business names, NGOs, and trademarks.",
                href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].services,
                items: [
                    "Company Registration",
                    "Business Name Registration",
                    "Trademark Registration",
                    "TIN Application"
                ]
            },
            {
                title: "Compliance Support",
                summary: "Annual returns, recurring filings, renewals, and regulatory follow-up.",
                href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].services,
                items: [
                    "Annual Returns",
                    "Statutory Filings",
                    "Regulatory Renewals",
                    "Operational Advisory"
                ]
            },
            {
                title: "Work Permits & Foreign Investment",
                summary: "Support for international investors and expatriate workers.",
                href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].services,
                items: [
                    "Work Permit Applications",
                    "TIC / TISEZA Registration",
                    "Foreign Company Registration"
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
                        id: "business-name-registration",
                        label: "Business Name Registration",
                        detail: "Sole proprietorship and trading name registration through BRELA."
                    },
                    {
                        id: "ngo-registration",
                        label: "NGO Registration",
                        detail: "Non-profit entity setup and compliance baseline."
                    },
                    {
                        id: "trademark-registration",
                        label: "Trademark Registration",
                        detail: "Brand and trade name protection through BRELA intellectual property office."
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
                        id: "annual-returns",
                        label: "Annual Returns",
                        detail: "BRELA annual return filing and beneficial ownership updates."
                    },
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
                title: "Work Permits & Foreign Investment",
                description: "Support for international investors and expatriate workers.",
                services: [
                    {
                        id: "work-permit",
                        label: "Work Permit Applications",
                        detail: "Residence and work permit processing for foreign investors and employees."
                    },
                    {
                        id: "tic-registration",
                        label: "TIC / TISEZA Registration",
                        detail: "Investment centre registration and compliance for foreign-owned entities."
                    },
                    {
                        id: "foreign-company-reg",
                        label: "Foreign Company Registration",
                        detail: "Branch office and subsidiary setup for international businesses."
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
}, undefined, "Business registration, business name registration, trademark registration, TIN applications, licensing, annual returns, statutory filings, compliance, and work permit support services from Exxonim Consult.");
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
            href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].contact
        }
    },
    empty_state: {
        title: "No articles match this filter.",
        description: "Try adjusting your search or filter, or contact Exxonim directly for immediate guidance."
    }
}, "Guides, Compliance Updates & Articles | Exxonim Consult", "Practical guides, compliance updates, and articles on business registration, licensing, and regulatory requirements in Tanzania.");
const fallbackCareerPage = createFallbackPage("career", "Careers at Exxonim Consult | Tanzania", {
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
            href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].contact
        },
        secondary: {
            label: "Browse resources",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].resources
        }
    }
}, undefined, "Explore career opportunities at Exxonim Consult in Tanzania. Roles in client operations, compliance support, and regulatory advisory.");
const fallbackContactPage = createFallbackPage("contact", "Contact Exxonim Consult | Business Advisory Tanzania", {
    hero: {
        eyebrow: "Get in touch",
        title: "Reach Exxonim for registration, compliance, and advisory support.",
        description: "Use the contact route that works best for you — email, phone, or WhatsApp — and the Exxonim team will follow up promptly."
    },
    cards: [
        {
            label: "Email",
            value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fallbackCompanyInfo"].emails[0] ?? "Send an email to Exxonim",
            description: "Best for sending structured details and follow-up questions.",
            action: {
                label: "Email Exxonim",
                href: `mailto:${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fallbackCompanyInfo"].emails[0] ?? ""}`
            }
        },
        {
            label: "Phone",
            value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fallbackCompanyInfo"].phones[0] ?? "Call Exxonim directly",
            description: "Use the direct phone path when you need a quick conversation.",
            action: {
                label: "Call Exxonim",
                href: `tel:${(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fallbackCompanyInfo"].phones[0] ?? "").replace(/\s+/g, "")}`
            }
        },
        {
            label: "WhatsApp",
            value: "Direct messaging",
            description: "Send a message through WhatsApp and the team will respond as soon as possible.",
            action: {
                label: "Open WhatsApp",
                href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fallbackCompanyInfo"].whatsapp || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].contact
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
            href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].contact
        },
        secondary_action: {
            label: "Read your data rights",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].dataRights
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
            href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].privacy
        },
        secondary_action: {
            label: "Data rights",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].dataRights
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
            href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].contact
        },
        secondary_action: {
            label: "Support",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].support
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
        readTimeMinutes: 9,
        relatedSlugs: [
            "tin-registration-checklist",
            "compliance-calendar-basics"
        ],
        content: {
            introduction: "Start with the exact entity type, ownership information, and document set you expect to file so the process does not stall later.",
            highlights: [
                "Confirm the legal structure first.",
                "Prepare identity and address documents before filing.",
                "Map which authority comes first in your sequence.",
                "Tanzania registration process."
            ],
            html: `<p>Starting a company in Tanzania involves several sequential steps that, when followed correctly, lead to a smooth registration process. Whether you are registering a limited liability company, a branch office, or a business name, the foundational requirements remain largely the same.</p>

<h2>Choose the right entity type</h2>
<p>The first and most important decision is selecting the correct legal structure for your business. In Tanzania, the main entity types are:</p>
<ul>
<li><strong>Private Limited Company</strong> — The most common structure for local and foreign investors. Requires at least one director and one shareholder. Liability is limited to share capital.</li>
<li><strong>Public Limited Company</strong> — Suitable for larger operations planning to raise capital publicly. Requires at least three directors and seven shareholders.</li>
<li><strong>Business Name Registration</strong> — For sole proprietors or partnerships operating under a trade name. Simpler registration, but no limited liability protection.</li>
<li><strong>NGO Registration</strong> — For non-profit organisations. Registered through the Ministry of Health, Community Development, Gender, Elderly and Children or the Vice President's Office.</li>
</ul>
<p>Choosing the wrong entity type early on can cause delays later when you discover that your structure does not support the activities you planned. Take time to confirm the right fit before moving forward.</p>

<h2>Gather your documents before filing</h2>
<p>Document readiness is the single biggest factor in whether a registration proceeds smoothly or stalls. Before you approach any authority, make sure you have the following prepared:</p>
<ol>
<li>Copy of national ID or passport for each director and shareholder</li>
<li>Passport-size photographs of each director</li>
<li>Proof of registered office address (lease agreement or utility bill)</li>
<li>Draft memorandum and articles of association</li>
<li>Proposed company names (at least three alternatives, in order of preference)</li>
<li>Share capital details and allocation among shareholders</li>
</ol>
<p>Missing even one document can mean a return trip to the authority. A simple filing checklist prevents these avoidable delays.</p>

<blockquote><p>The most common reason registrations stall is not the authority processing time — it is incomplete document submissions. Prepare thoroughly before your first filing.</p></blockquote>

<h2>Understand the filing sequence</h2>
<p>Registration in Tanzania follows a specific sequence. Attempting to skip steps or file out of order almost always creates additional work:</p>
<p><strong>Step 1: Name reservation</strong> — Submit your proposed names to BRELA (Business Registration and Licensing Agency). Name clearance typically takes 1 to 3 working days. Once approved, the name is reserved for 30 days.</p>
<p><strong>Step 2: Document preparation</strong> — With a reserved name, prepare the memorandum and articles of association, Form 1A (application for incorporation), and all supporting documents.</p>
<p><strong>Step 3: Incorporation filing</strong> — Submit the complete package to BRELA. Processing typically takes 5 to 10 working days, though this can vary based on workload and completeness of your submission.</p>
<p><strong>Step 4: Certificate collection</strong> — Once approved, collect your Certificate of Incorporation. This document is required for every subsequent step, including TIN registration, bank account opening, and business license applications.</p>

<h2>Common mistakes that delay registration</h2>
<p>After guiding hundreds of registrations, the same issues come up repeatedly. Being aware of these in advance can save weeks of delay:</p>
<ul>
<li><strong>Name conflicts</strong> — Choosing names that are too similar to existing companies. Always prepare multiple alternatives.</li>
<li><strong>Inconsistent information</strong> — Names, addresses, and ID numbers must match exactly across all documents. Even minor discrepancies trigger queries.</li>
<li><strong>Missing share capital details</strong> — The minimum share capital for a limited company must be stated clearly. Ambiguity here causes rejection.</li>
<li><strong>Incorrect forms</strong> — Using outdated or wrong BRELA forms. Always verify the current form version before submission.</li>
</ul>

<h2>What happens after registration</h2>
<p>Receiving your Certificate of Incorporation is the beginning, not the end. Immediately after registration, you need to address several follow-on requirements:</p>
<ol>
<li><strong>TIN Registration</strong> — Apply for a Tax Identification Number with TRA (Tanzania Revenue Authority). Required for all registered entities.</li>
<li><strong>Business License</strong> — Apply through your local government authority or the Online Business Registration Portal (BRIS).</li>
<li><strong>Bank Account</strong> — Open a corporate bank account using your certificate and TIN.</li>
<li><strong>VAT Registration</strong> — If your projected turnover exceeds the threshold, register for VAT within 30 days.</li>
<li><strong>Sector-specific permits</strong> — Depending on your industry, additional permits may be required (e.g., TCIA for construction, TFDA for food and pharmaceuticals).</li>
</ol>
<p>Each of these steps has its own document requirements and processing times. Planning them in sequence — rather than discovering them reactively — keeps your business operational on schedule.</p>

<blockquote><p>A successful registration is one where every step after incorporation has already been planned before the certificate is issued. That is what structured preparation looks like.</p></blockquote>`,
            sections: []
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
        readTimeMinutes: 7,
        relatedSlugs: [
            "company-registration-basics",
            "licensing-renewal-prep"
        ],
        content: {
            introduction: "Tax registration runs more smoothly when core entity details, contact records, and supporting documents are already aligned.",
            highlights: [
                "Keep legal and trading names consistent.",
                "Prepare contact and location details exactly as filed elsewhere.",
                "TIN application requirements."
            ],
            html: `<p>A Tax Identification Number (TIN) is required for virtually every registered entity in Tanzania. Whether you are a newly incorporated company or an existing business formalising your tax position, the TRA registration process follows a defined set of steps that reward preparation.</p>

<h2>What you need before applying</h2>
<p>Before visiting the TRA office or using the online portal, ensure you have the following documents ready:</p>
<ul>
<li><strong>Certificate of Incorporation</strong> — Original and one certified copy</li>
<li><strong>Memorandum and Articles of Association</strong> — Certified copy</li>
<li><strong>Directors' IDs</strong> — National ID or passport copies for all directors</li>
<li><strong>Proof of business address</strong> — Lease agreement, utility bill, or title deed</li>
<li><strong>Bank introduction letter</strong> — From your corporate bank confirming account opening</li>
</ul>
<p>Missing any of these documents will result in your application being returned. TRA does not accept partial submissions.</p>

<h2>Common consistency issues</h2>
<p>The most frequent cause of TIN application rejection is inconsistency between documents. Small mismatches create avoidable back-and-forth during review:</p>
<ul>
<li>Company name spelling differences between the certificate and the application form</li>
<li>Director names that do not match across ID documents and company records</li>
<li>Address formats that differ between the lease agreement and the TRA form</li>
<li>TIN numbers for existing directors that are recorded incorrectly</li>
</ul>
<p>Double-check every field against your source documents before submission. A 15-minute review can prevent a two-week delay.</p>

<blockquote><p>Consistency across documents is not optional — it is the difference between a one-visit registration and a multi-visit correction cycle.</p></blockquote>

<h2>Online vs. in-person registration</h2>
<p>TRA now supports both online and in-person TIN applications. Each method has its own considerations:</p>
<p><strong>Online registration</strong> through the TRA portal is faster for straightforward cases. Upload scanned documents, fill in the forms, and receive your TIN electronically. Processing typically takes 2 to 5 working days.</p>
<p><strong>In-person registration</strong> at your local TRA office is better for complex cases, such as entities with foreign directors or those requiring additional clarification. You can address queries immediately rather than waiting for online correspondence.</p>
<p>Choose the method that matches your situation. For most standard registrations, the online process is efficient and sufficient.</p>

<h2>After you receive your TIN</h2>
<p>Once your TIN is issued, several follow-up obligations take effect immediately:</p>
<ol>
<li>Update your bank account records with the TIN</li>
<li>Include the TIN on all official invoices and receipts</li>
<li>File your first tax return by the applicable deadline (even if no tax is due)</li>
<li>Register for VAT if your turnover exceeds the threshold</li>
<li>Set up electronic filing access through the TRA portal</li>
</ol>
<p>A TIN is not a one-time registration — it creates an ongoing relationship with the tax authority. Understanding your obligations from day one prevents compliance issues later.</p>`,
            sections: []
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
        readTimeMinutes: 8,
        relatedSlugs: [
            "tin-registration-checklist",
            "compliance-calendar-basics"
        ],
        content: {
            introduction: "Renewal work is easier when the team keeps one calendar, one document source, and one owner for each filing track.",
            highlights: [
                "Track deadlines in one place.",
                "Assign one accountable owner per renewal stream.",
                "Licensing renewal best practices."
            ],
            html: `<p>Business licences in Tanzania are not perpetual — they require periodic renewal, and missed deadlines can result in penalties, operational disruption, or even licence revocation. A structured approach to renewal management prevents these outcomes.</p>

<h2>Types of licences that require renewal</h2>
<p>Most businesses in Tanzania hold multiple licences, each with its own renewal cycle:</p>
<ul>
<li><strong>Business Licence</strong> — Annual renewal through the local government authority or BRIS portal</li>
<li><strong>Professional Licences</strong> — Sector-specific permits (e.g., engineering, legal, medical) with varying renewal periods</li>
<li><strong>Import/Export Permits</strong> — Typically annual, managed through TRA and relevant sector authorities</li>
<li><strong>Occupational Licences</strong> — Health and safety permits, fire safety certificates, environmental compliance permits</li>
</ul>
<p>Each licence has a different renewal authority, different document requirements, and different processing times. Tracking them in one place is essential.</p>

<h2>Build a renewal calendar</h2>
<p>The foundation of effective renewal management is a single, visible calendar that captures every licence, its expiry date, and the lead time required for renewal. A practical renewal calendar includes:</p>
<ol>
<li><strong>Licence name and issuing authority</strong> — So you know where to go</li>
<li><strong>Expiry date</strong> — The hard deadline</li>
<li><strong>Internal reminder date</strong> — 60 days before expiry to begin preparation</li>
<li><strong>Document checklist</strong> — What you need to submit</li>
<li><strong>Assigned owner</strong> — One person accountable for tracking each renewal</li>
</ol>
<p>A shared filing calendar prevents deadlines from becoming last-minute recovery work. The calendar only helps if the team can see what is pending and who moves it forward.</p>

<h2>Assign ownership per renewal stream</h2>
<p>Without clear ownership, renewals fall through the cracks. Assign one person as the accountable owner for each renewal stream. Their responsibilities include:</p>
<ul>
<li>Monitoring the renewal calendar and triggering preparation at the reminder date</li>
<li>Collecting and verifying all required documents before submission</li>
<li>Following up with the issuing authority if processing takes longer than expected</li>
<li>Confirming the renewal is completed and updating the calendar for the next cycle</li>
</ul>
<p>When multiple people share responsibility without clear accountability, everyone assumes someone else is handling it. One owner per stream eliminates this gap.</p>

<blockquote><p>The cost of a missed renewal is always higher than the cost of preparation. Late fees, operational downtime, and reputational damage compound quickly.</p></blockquote>

<h2>Common renewal pitfalls</h2>
<p>After managing renewal cycles across dozens of organisations, the same patterns emerge:</p>
<ul>
<li><strong>Starting too late</strong> — 30 days is not enough for most renewals. Start at 60 days to accommodate document gathering and processing time.</li>
<li><strong>Missing prerequisite updates</strong> — Some renewals require an up-to-date TIN certificate or tax clearance. If these have expired, the renewal itself will be delayed.</li>
<li><strong>Ignoring processing delays</strong> — Authorities do not always process renewals on schedule. Build buffer into your timeline.</li>
<li><strong>Not retaining proof</strong> — Always keep copies of submitted documents and receipts. If the authority loses your submission, you have evidence of timely filing.</li>
</ul>

<h2>When to seek professional support</h2>
<p>For organisations with multiple licence types or those operating across different jurisdictions, professional compliance support can reduce risk and save time. Consider engaging support when:</p>
<ul>
<li>You hold more than five distinct licence types</li>
<li>Your licences span multiple authorities or sectors</li>
<li>You have experienced a missed renewal in the past 12 months</li>
<li>Your team does not have a dedicated compliance function</li>
</ul>
<p>Professional support is not about outsourcing responsibility — it is about adding structure and visibility to a process that directly affects your ability to operate.</p>`,
            sections: []
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
        readTimeMinutes: 6,
        relatedSlugs: [
            "licensing-renewal-prep",
            "company-registration-basics"
        ],
        content: {
            introduction: "A workable calendar is short, visible, and tied to the next action rather than stored in disconnected spreadsheets.",
            highlights: [
                "Use one owner and one date per obligation.",
                "Record the next action, not just the deadline.",
                "Compliance calendar framework."
            ],
            html: `<p>A compliance calendar is only useful if your team actually refers to it. The most effective calendars are simple, visible, and action-oriented — not comprehensive lists of every possible obligation buried in a spreadsheet nobody opens.</p>

<h2>What makes a compliance calendar work</h2>
<p>Three principles separate calendars that get used from calendars that get ignored:</p>
<ol>
<li><strong>Visibility</strong> — The calendar must be accessible to everyone who needs it, without requiring special software access or login credentials. A shared document or dashboard that updates in real time works best.</li>
<li><strong>Action-orientation</strong> — Each entry should describe the next action, not just the deadline. "Submit VAT return by March 25" is more useful than "VAT due Q1."</li>
<li><strong>Single ownership</strong> — Every entry has one person responsible. If two people are listed, neither feels fully accountable.</li>
</ol>
<p>When these three elements are in place, the calendar becomes a working tool rather than a reference document.</p>

<h2>Key dates to include</h2>
<p>At minimum, your compliance calendar should capture the following recurring obligations:</p>
<ul>
<li><strong>VAT returns</strong> — Monthly or quarterly, depending on your registration status</li>
<li><strong>PAYE remittances</strong> — Monthly, by the 9th of the following month</li>
<li><strong>Corporate tax instalments</strong> — Quarterly, based on estimated annual tax</li>
<li><strong>Business licence renewals</strong> — Annual, typically aligned with your registration anniversary</li>
<li><strong>Annual return filing</strong> — Within 30 days of the company's anniversary of incorporation</li>
<li><strong>Statutory audits</strong> — For companies meeting the turnover threshold, annually</li>
</ul>
<p>Each entry should include the authority, the document requirements, and the contact point for queries.</p>

<blockquote><p>The calendar only helps if the team can see what is pending and who moves it forward. A hidden calendar is a useless calendar.</p></blockquote>

<h2>Tools and formats</h2>
<p>The format of your calendar matters less than whether people use it. Common options include:</p>
<ul>
<li><strong>Shared spreadsheet</strong> — Simple, familiar, easy to set up. Works for small teams with fewer than 20 obligations.</li>
<li><strong>Project management tool</strong> — Asana, Monday, or similar platforms add reminders, assignees, and progress tracking. Better for larger teams.</li>
<li><strong>Dedicated compliance platform</strong> — Purpose-built tools with regulatory content pre-loaded. Suitable for organisations with complex compliance landscapes.</li>
</ul>
<p>Start with the simplest tool that your team will actually use. You can always upgrade later — the priority is getting the calendar into daily use.</p>

<h2>Review and maintain</h2>
<p>A compliance calendar is a living document. Schedule a monthly review to:</p>
<ol>
<li>Confirm upcoming deadlines are still accurate</li>
<li>Update any changes in document requirements or processing times</li>
<li>Mark completed items and carry forward any missed deadlines</li>
<li>Add new obligations that have emerged from regulatory changes</li>
</ol>
<p>Without regular maintenance, the calendar drifts out of date and loses credibility. A 30-minute monthly review keeps it accurate and trusted.</p>`,
            sections: []
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
        description: "Registration and first-step compliance — ideal for new entities getting set up.",
        notes: "Use the Exxonim contact route for the latest package guidance.",
        recommended: false,
        features: [
            {
                label: "Company or business name registration filed on your behalf",
                included: true
            },
            {
                label: "TIN application included",
                included: true
            },
            {
                label: "Document checklist and readiness review",
                included: true
            },
            {
                label: "Consultation tracking with milestone updates",
                included: true
            },
            {
                label: "Annual return filing",
                included: false
            },
            {
                label: "Compliance reminders",
                included: false
            }
        ]
    },
    {
        id: 2,
        name: "Operating",
        badge: "Recommended",
        description: "Registration, licensing, and recurring compliance support for active businesses.",
        notes: "Live package details return automatically after the next successful sync.",
        recommended: true,
        features: [
            {
                label: "Company or business name registration filed on your behalf",
                included: true
            },
            {
                label: "TIN application included",
                included: true
            },
            {
                label: "Business license application",
                included: true
            },
            {
                label: "Annual return filing",
                included: true
            },
            {
                label: "Ongoing compliance reminders",
                included: true
            },
            {
                label: "Trademark registration",
                included: false
            }
        ]
    },
    {
        id: 3,
        name: "Continuity",
        badge: "Extended coverage",
        description: "Full-service support — registration, compliance, work permits, and ongoing advisory.",
        notes: "Contact Exxonim directly for a tailored scope while the live catalog reconnects.",
        recommended: false,
        features: [
            {
                label: "Everything in Operating",
                included: true
            },
            {
                label: "Trademark registration and protection",
                included: true
            },
            {
                label: "Work permit and TIC registration support",
                included: true
            },
            {
                label: "Priority support coordination",
                included: true
            },
            {
                label: "Multi-stream document management",
                included: true
            },
            {
                label: "Quarterly compliance review and planning",
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
const fallbackBrandSetting = createFallbackSiteSetting("brand", __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fallbackBrand"]);
const fallbackCompanyInfoSetting = createFallbackSiteSetting("company_info", __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fallbackCompanyInfo"]);
const fallbackFooterSetting = createFallbackSiteSetting("footer", __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fallbackFooter"]);
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
                "Our team responds during East African business hours (Mon–Fri, 8:00–16:30)."
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
            href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].contact
        },
        secondary_action: {
            label: "Track consultation",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].trackConsultation
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
            href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].contact
        },
        secondary_action: {
            label: "Privacy policy",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].privacy
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
        case "track-consultation":
            return fallbackTrackConsultationPage;
        default:
            return undefined;
    }
}
const fallbackTrackConsultationPage = createFallbackPage("track-consultation", "Track Your Consultation | Exxonim Consult", {
    hero: {
        eyebrow: "Consultation tracking",
        title: "Never ask \"What's happening?\" again",
        description: "Automated updates at every milestone — via WhatsApp, email, or SMS. Enter your tracking number for an instant status check."
    },
    sections: [
        {
            title: "How it works",
            paragraphs: [
                "Every consultation is assigned a unique tracking number. At every key milestone, Exxonim sends you an update via your preferred channel.",
                "You can also look up your status on the website anytime, no login required."
            ]
        },
        {
            title: "Update channels",
            paragraphs: [
                "Choose how you receive updates: WhatsApp, email, or SMS. Every milestone update is delivered there automatically."
            ]
        }
    ],
    next_step: {
        title: "Ready to experience proactive consulting?",
        description: "Contact Exxonim and receive a tracking number that keeps you informed at every step.",
        primary_action: {
            label: "Request a Consultation",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].contact
        },
        secondary_action: {
            label: "View All Services",
            href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].services
        }
    }
}, "Track Your Consultation | Exxonim Consult", "Look up your Exxonim Consult consultation status anytime using your tracking reference ID. No login required.");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/exxonim/services/siteSettingsService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$app$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/app/apiClient.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$shared$2f$api$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/shared/api/routes.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$shared$2f$publicContentCache$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/shared/publicContentCache.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$contentMappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/utils/contentMappers.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$services$2f$staticFallbackService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/services/staticFallbackService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$content$2f$fallbackPublicContent$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/exxonim/content/fallbackPublicContent.ts [app-client] (ecmascript) <locals>");
;
;
;
;
;
;
// Eagerly load known site-setting fallback files at module init
(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$services$2f$staticFallbackService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["preloadStaticFallback"])("site-settings-brand");
(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$services$2f$staticFallbackService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["preloadStaticFallback"])("site-settings-company-info");
(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$services$2f$staticFallbackService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["preloadStaticFallback"])("site-settings-footer");
const SHELL_SITE_SETTING_TTL_MS = 1000 * 60 * 60 * 24;
function siteSettingCacheKey(key) {
    return `site-settings:${key}`;
}
function isSiteSettingRecord(value) {
    return Boolean(value && typeof value.key === "string");
}
async function fetchFreshSiteSetting(key) {
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$app$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$shared$2f$api$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRoutes"].public.siteSettings.byKey(key));
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$contentMappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapSiteSetting"])(response.data);
}
/* ── Resolve a site-setting fallback ──────────────────────
 *  1. Check the static fallback JSON (build-time snapshot)
 *  2. Fall through to the hardcoded TypeScript default
 */ function resolveFallbackSiteSetting(key) {
    const staticKey = `site-settings-${key}`;
    const fromStatic = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$services$2f$staticFallbackService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStaticFallback"])(staticKey);
    if (fromStatic) return fromStatic;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$content$2f$fallbackPublicContent$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getFallbackSiteSetting"])(key);
}
function getCachedSiteSetting(key) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$shared$2f$publicContentCache$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCachedPublicContent"])(siteSettingCacheKey(key), resolveFallbackSiteSetting(key));
}
function getCachedSiteSettingResource(key) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$shared$2f$publicContentCache$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCachedPublicContentState"])(siteSettingCacheKey(key), {
        fallbackValue: resolveFallbackSiteSetting(key),
        ttlMs: SHELL_SITE_SETTING_TTL_MS
    });
}
async function getSiteSetting(key) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$shared$2f$publicContentCache$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchWithFallback"])({
        cacheKey: siteSettingCacheKey(key),
        fallbackValue: resolveFallbackSiteSetting(key),
        fetcher: ()=>fetchFreshSiteSetting(key),
        ttlMs: SHELL_SITE_SETTING_TTL_MS,
        validate: isSiteSettingRecord,
        warningLabel: `Using cached or default site setting for "${key}".`
    });
}
async function getSiteSettingResource(key) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$shared$2f$publicContentCache$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchWithFallbackResource"])({
        cacheKey: siteSettingCacheKey(key),
        fallbackValue: resolveFallbackSiteSetting(key),
        fetcher: ()=>fetchFreshSiteSetting(key),
        ttlMs: SHELL_SITE_SETTING_TTL_MS,
        validate: isSiteSettingRecord,
        warningLabel: `Using cached or default site setting for "${key}".`
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/exxonim/hooks/usePublicShell.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePublicShell",
    ()=>usePublicShell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$services$2f$siteSettingsService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/services/siteSettingsService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/content/fallbackShell.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
function hasText(value) {
    return typeof value === "string" && value.trim().length > 0;
}
function sanitizeBrandAssets(value) {
    return {
        name: hasText(value.name) ? value.name.trim() : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fallbackBrand"].name,
        lightLogoSrc: hasText(value.lightLogoSrc) ? value.lightLogoSrc : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fallbackBrand"].lightLogoSrc,
        darkLogoSrc: hasText(value.darkLogoSrc) ? value.darkLogoSrc : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fallbackBrand"].darkLogoSrc
    };
}
function sanitizeCompanyInfo(value) {
    return {
        ...value,
        name: hasText(value.name) ? value.name.trim() : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fallbackCompanyInfo"].name
    };
}
function hasSiteSettingValue(setting) {
    return Boolean(setting?.value);
}
function usePublicShell() {
    _s();
    const brandQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "public-shell",
            "site-settings",
            "brand"
        ],
        queryFn: {
            "usePublicShell.useQuery[brandQuery]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$services$2f$siteSettingsService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSiteSettingResource"])("brand")
        }["usePublicShell.useQuery[brandQuery]"],
        initialData: {
            "usePublicShell.useQuery[brandQuery]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$services$2f$siteSettingsService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCachedSiteSettingResource"])("brand")
        }["usePublicShell.useQuery[brandQuery]"],
        refetchOnMount: false,
        refetchOnReconnect: "always",
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 1000 * 60 * 60 * 4
    });
    const footerQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "public-shell",
            "site-settings",
            "footer"
        ],
        queryFn: {
            "usePublicShell.useQuery[footerQuery]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$services$2f$siteSettingsService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSiteSettingResource"])("footer")
        }["usePublicShell.useQuery[footerQuery]"],
        initialData: {
            "usePublicShell.useQuery[footerQuery]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$services$2f$siteSettingsService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCachedSiteSettingResource"])("footer")
        }["usePublicShell.useQuery[footerQuery]"],
        refetchOnMount: false,
        refetchOnReconnect: "always",
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 1000 * 60 * 60 * 4
    });
    const companyQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "public-shell",
            "site-settings",
            "company_info"
        ],
        queryFn: {
            "usePublicShell.useQuery[companyQuery]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$services$2f$siteSettingsService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSiteSettingResource"])("company_info")
        }["usePublicShell.useQuery[companyQuery]"],
        initialData: {
            "usePublicShell.useQuery[companyQuery]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$services$2f$siteSettingsService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCachedSiteSettingResource"])("company_info")
        }["usePublicShell.useQuery[companyQuery]"],
        refetchOnMount: false,
        refetchOnReconnect: "always",
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 1000 * 60 * 60 * 4
    });
    const brand = hasSiteSettingValue(brandQuery.data?.data) ? sanitizeBrandAssets(brandQuery.data.data.value) : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fallbackBrand"];
    const footer = hasSiteSettingValue(footerQuery.data?.data) ? footerQuery.data.data.value : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fallbackFooter"];
    const company = hasSiteSettingValue(companyQuery.data?.data) ? sanitizeCompanyInfo(companyQuery.data.data.value) : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$content$2f$fallbackShell$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fallbackCompanyInfo"];
    return {
        brand,
        footer,
        company
    };
}
_s(usePublicShell, "HNwDBYBJUjwpriXYKkCCILYgMG4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/exxonim/hooks/useRevealOnScroll.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useRevealOnScroll",
    ()=>useRevealOnScroll
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
function useRevealOnScroll() {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useRevealOnScroll.useEffect": ()=>{
            if (!("IntersectionObserver" in window)) {
                // No IntersectionObserver support — show everything immediately
                document.querySelectorAll("[data-reveal]").forEach({
                    "useRevealOnScroll.useEffect": (el)=>{
                        el.classList.add("revealed");
                    }
                }["useRevealOnScroll.useEffect"]);
                return;
            }
            const observer = new IntersectionObserver({
                "useRevealOnScroll.useEffect": (entries)=>{
                    entries.forEach({
                        "useRevealOnScroll.useEffect": (entry)=>{
                            if (entry.isIntersecting) {
                                entry.target.classList.add("revealed");
                                observer.unobserve(entry.target);
                            }
                        }
                    }["useRevealOnScroll.useEffect"]);
                }
            }["useRevealOnScroll.useEffect"], {
                threshold: 0.15
            });
            // Scan for elements already in the DOM
            const scanAndObserve = {
                "useRevealOnScroll.useEffect.scanAndObserve": ()=>{
                    document.querySelectorAll("[data-reveal]").forEach({
                        "useRevealOnScroll.useEffect.scanAndObserve": (el)=>{
                            // If already visible in viewport, reveal immediately (no animation delay)
                            const rect = el.getBoundingClientRect();
                            const inViewport = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
                            if (inViewport) {
                                // Use requestAnimationFrame to avoid layout thrashing
                                requestAnimationFrame({
                                    "useRevealOnScroll.useEffect.scanAndObserve": ()=>{
                                        el.classList.add("revealed");
                                    }
                                }["useRevealOnScroll.useEffect.scanAndObserve"]);
                            } else {
                                observer.observe(el);
                            }
                        }
                    }["useRevealOnScroll.useEffect.scanAndObserve"]);
                }
            }["useRevealOnScroll.useEffect.scanAndObserve"];
            scanAndObserve();
            // Lightweight DOM mutation scan — only for new nodes (e.g., lazy-loaded pages)
            // Much cheaper than the old MutationObserver that scanned all attribute changes
            const mutationObserver = new MutationObserver({
                "useRevealOnScroll.useEffect": (mutations)=>{
                    let hasNewNodes = false;
                    for (const mutation of mutations){
                        if (mutation.addedNodes.length > 0) {
                            hasNewNodes = true;
                            break;
                        }
                    }
                    if (hasNewNodes) {
                        // Defer scan to avoid synchronous layout during mutation
                        requestAnimationFrame(scanAndObserve);
                    }
                }
            }["useRevealOnScroll.useEffect"]);
            mutationObserver.observe(document.body, {
                childList: true,
                subtree: true
            });
            return ({
                "useRevealOnScroll.useEffect": ()=>{
                    mutationObserver.disconnect();
                    observer.disconnect();
                }
            })["useRevealOnScroll.useEffect"];
        }
    }["useRevealOnScroll.useEffect"], []);
}
_s(useRevealOnScroll, "OD7bBpZva5O2jO+Puf00hKivP7c=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/exxonim/hooks/useTheme.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTheme",
    ()=>useTheme
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$services$2f$privacyService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/services/privacyService.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
const STORAGE_KEY = "exxonim-theme";
const LEGACY_STORAGE_KEY = "koro-theme";
const TRANSITION_CLASS = "theme-transition";
const TRANSITION_DURATION = 400; // ms — must match globals.css
function getStoredTheme() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const storedTheme = localStorage.getItem(STORAGE_KEY) ?? localStorage.getItem(LEGACY_STORAGE_KEY);
        return storedTheme === "dark" || storedTheme === "light" ? storedTheme : null;
    } catch  {
        return null;
    }
}
function clearStoredTheme() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(LEGACY_STORAGE_KEY);
    } catch  {
    // Ignore storage failures and continue with in-memory theme state.
    }
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
    _s();
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(getInitialTheme);
    const [canPersistPreference, setCanPersistPreference] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useTheme.useEffect": ()=>{
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
        }
    }["useTheme.useEffect"], [
        theme
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useTheme.useEffect": ()=>{
            const handleConsentChange = {
                "useTheme.useEffect.handleConsentChange": (event)=>{
                    const customEvent = event;
                    const preferencesEnabled = Boolean(customEvent.detail?.preferencesEnabled);
                    setCanPersistPreference(preferencesEnabled);
                    if (!preferencesEnabled) {
                        clearStoredTheme();
                    }
                }
            }["useTheme.useEffect.handleConsentChange"];
            window.addEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$services$2f$privacyService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PRIVACY_CONSENT_EVENT"], handleConsentChange);
            return ({
                "useTheme.useEffect": ()=>{
                    window.removeEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$services$2f$privacyService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PRIVACY_CONSENT_EVENT"], handleConsentChange);
                }
            })["useTheme.useEffect"];
        }
    }["useTheme.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useTheme.useEffect": ()=>{
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
        }
    }["useTheme.useEffect"], [
        canPersistPreference,
        theme
    ]);
    return {
        theme,
        toggleTheme: ()=>{
            const next = theme === "dark" ? "light" : "dark";
            // Smooth theme switch using CSS transitions instead of View Transitions.
            // We temporarily add a class that enables color transitions on ALL
            // elements, change the theme, then remove the class after the
            // transition completes. This way every element — toggle knob,
            // text, buttons, backgrounds — smoothly morphs to the new colors.
            const root = document.documentElement;
            // Add transition class — enables smooth color interpolation
            root.classList.add(TRANSITION_CLASS);
            // Apply the theme change
            setTheme(next);
            // Remove the class after transition completes so it doesn't
            // interfere with hover effects, animations, or the hero shrink
            setTimeout(()=>{
                root.classList.remove(TRANSITION_CLASS);
            }, TRANSITION_DURATION);
        }
    };
}
_s(useTheme, "xUYOOZKeprYDk3cgtKpHCdIYETs=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/exxonim/app/App.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "App",
    ()=>App
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$Footer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/components/Footer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$Navigation$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/components/Navigation.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$PageLoader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/components/PageLoader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$PrivacyConsentBanner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/components/PrivacyConsentBanner.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$ShellStatusNotice$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/components/ShellStatusNotice.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$WhatsAppButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/components/WhatsAppButton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$ScrollToTopButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/components/ScrollToTopButton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$ErrorBoundary$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/components/ErrorBoundary.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$app$2f$usePublicRouter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/app/usePublicRouter.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$hooks$2f$usePublicShell$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/hooks/usePublicShell.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$hooks$2f$useRevealOnScroll$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/hooks/useRevealOnScroll.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$hooks$2f$useTheme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/hooks/useTheme.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/routes.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
 */ const HomePage = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lazy"])(_c = ()=>__turbopack_context__.A("[project]/src/exxonim/pages/HomePage.tsx [app-client] (ecmascript, async loader)").then((m)=>({
            default: m.HomePage
        })));
_c1 = HomePage;
const AboutPage = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lazy"])(_c2 = ()=>__turbopack_context__.A("[project]/src/exxonim/pages/AboutPage.tsx [app-client] (ecmascript, async loader)").then((m)=>({
            default: m.AboutPage
        })));
_c3 = AboutPage;
const CareerPage = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lazy"])(_c4 = ()=>__turbopack_context__.A("[project]/src/exxonim/pages/CareerPage.tsx [app-client] (ecmascript, async loader)").then((m)=>({
            default: m.CareerPage
        })));
_c5 = CareerPage;
const ContactPage = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lazy"])(_c6 = ()=>__turbopack_context__.A("[project]/src/exxonim/pages/ContactPage.tsx [app-client] (ecmascript, async loader)").then((m)=>({
            default: m.ContactPage
        })));
_c7 = ContactPage;
const FaqPage = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lazy"])(_c8 = ()=>__turbopack_context__.A("[project]/src/exxonim/pages/FaqPage.tsx [app-client] (ecmascript, async loader)").then((m)=>({
            default: m.FaqPage
        })));
_c9 = FaqPage;
const NotFoundPage = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lazy"])(()=>__turbopack_context__.A("[project]/src/exxonim/pages/NotFoundPage.tsx [app-client] (ecmascript, async loader)").then((m)=>({
            default: m.NotFoundPage
        })));
_c10 = NotFoundPage;
const ResourceArticlePage = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lazy"])(()=>__turbopack_context__.A("[project]/src/exxonim/pages/ResourceArticlePage.tsx [app-client] (ecmascript, async loader)").then((m)=>({
            default: m.ResourceArticlePage
        })));
_c11 = ResourceArticlePage;
const ResourcesPage = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lazy"])(_c12 = ()=>__turbopack_context__.A("[project]/src/exxonim/pages/ResourcesPage.tsx [app-client] (ecmascript, async loader)").then((m)=>({
            default: m.ResourcesPage
        })));
_c13 = ResourcesPage;
const ServicesPage = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lazy"])(_c14 = ()=>__turbopack_context__.A("[project]/src/exxonim/pages/ServicesPage.tsx [app-client] (ecmascript, async loader)").then((m)=>({
            default: m.ServicesPage
        })));
_c15 = ServicesPage;
const InfoPages = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lazy"])(_c16 = ()=>__turbopack_context__.A("[project]/src/exxonim/pages/InfoPages.tsx [app-client] (ecmascript, async loader)").then((m)=>({
            default: function InfoPagesWrapper() {
                // InfoPages exports multiple components; the route map handles which one to render
                return null;
            }
        })));
_c17 = InfoPages;
const SupportPage = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lazy"])(_c18 = ()=>__turbopack_context__.A("[project]/src/exxonim/pages/InfoPages.tsx [app-client] (ecmascript, async loader)").then((m)=>({
            default: m.SupportPage
        })));
_c19 = SupportPage;
const TermsPage = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lazy"])(_c20 = ()=>__turbopack_context__.A("[project]/src/exxonim/pages/InfoPages.tsx [app-client] (ecmascript, async loader)").then((m)=>({
            default: m.TermsPage
        })));
_c21 = TermsPage;
const PrivacyPage = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lazy"])(_c22 = ()=>__turbopack_context__.A("[project]/src/exxonim/pages/InfoPages.tsx [app-client] (ecmascript, async loader)").then((m)=>({
            default: m.PrivacyPage
        })));
_c23 = PrivacyPage;
const CookiePage = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lazy"])(_c24 = ()=>__turbopack_context__.A("[project]/src/exxonim/pages/InfoPages.tsx [app-client] (ecmascript, async loader)").then((m)=>({
            default: m.CookiePage
        })));
_c25 = CookiePage;
const DataRightsPage = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lazy"])(_c26 = ()=>__turbopack_context__.A("[project]/src/exxonim/pages/InfoPages.tsx [app-client] (ecmascript, async loader)").then((m)=>({
            default: m.DataRightsPage
        })));
_c27 = DataRightsPage;
const TrackConsultationPage = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lazy"])(_c28 = ()=>__turbopack_context__.A("[project]/src/exxonim/pages/TrackConsultationPage.tsx [app-client] (ecmascript, async loader)").then((m)=>({
            default: m.TrackConsultationPage
        })));
_c29 = TrackConsultationPage;
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
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(match.component, {}, void 0, false, {
            fileName: "[project]/src/exxonim/app/App.tsx",
            lineNumber: 109,
            columnNumber: 12
        }, this);
    }
    const articleSlug = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getResourcePostSlug"])(pathname);
    if (articleSlug) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ResourceArticlePage, {
            slug: articleSlug
        }, void 0, false, {
            fileName: "[project]/src/exxonim/app/App.tsx",
            lineNumber: 114,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NotFoundPage, {
        pathname: pathname
    }, void 0, false, {
        fileName: "[project]/src/exxonim/app/App.tsx",
        lineNumber: 117,
        columnNumber: 10
    }, this);
}
/* ── Page-level Suspense fallback ──────────────────────
 * Same visual language as the full-screen PageLoader
 * (favicon image + animated dots), but rendered inline
 * inside <main> so the shell (nav + footer) stays visible.
 */ function PageSuspenseFallback() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-center min-h-[60vh]",
        role: "status",
        "aria-live": "polite",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center gap-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative animate-[loader-pulse_2s_ease-in-out_infinite]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: "/branding/exxonim-favicon-light.png",
                            alt: "",
                            width: "40",
                            height: "40",
                            className: "logo-light block w-10 h-10 object-contain"
                        }, void 0, false, {
                            fileName: "[project]/src/exxonim/app/App.tsx",
                            lineNumber: 136,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: "/branding/exxonim-favicon-dark.png",
                            alt: "",
                            width: "40",
                            height: "40",
                            className: "logo-dark w-10 h-10 object-contain"
                        }, void 0, false, {
                            fileName: "[project]/src/exxonim/app/App.tsx",
                            lineNumber: 144,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/exxonim/app/App.tsx",
                    lineNumber: 134,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-sans text-sm font-medium text-text-muted tracking-[0.08em] uppercase",
                            children: "Loading"
                        }, void 0, false, {
                            fileName: "[project]/src/exxonim/app/App.tsx",
                            lineNumber: 155,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "loader-dots font-sans text-sm font-medium text-text-muted",
                            "aria-hidden": "true",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "."
                                }, void 0, false, {
                                    fileName: "[project]/src/exxonim/app/App.tsx",
                                    lineNumber: 157,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "."
                                }, void 0, false, {
                                    fileName: "[project]/src/exxonim/app/App.tsx",
                                    lineNumber: 157,
                                    columnNumber: 27
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "."
                                }, void 0, false, {
                                    fileName: "[project]/src/exxonim/app/App.tsx",
                                    lineNumber: 157,
                                    columnNumber: 41
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/exxonim/app/App.tsx",
                            lineNumber: 156,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/exxonim/app/App.tsx",
                    lineNumber: 154,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/exxonim/app/App.tsx",
            lineNumber: 132,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/exxonim/app/App.tsx",
        lineNumber: 127,
        columnNumber: 5
    }, this);
}
_c30 = PageSuspenseFallback;
function App({ initialPathname }) {
    _s();
    const { theme, toggleTheme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$hooks$2f$useTheme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    const { pathname } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$app$2f$usePublicRouter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePublicRouter"])({
        initialPathname
    });
    const shell = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$hooks$2f$usePublicShell$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePublicShell"])();
    const [isPageLoading, setIsPageLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$hooks$2f$useRevealOnScroll$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRevealOnScroll"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "App.useEffect": ()=>{
            document.documentElement.classList.add("js");
            // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: dismiss page loader after first paint
            setIsPageLoading(false);
        }
    }["App.useEffect"], []);
    const whatsappUrl = shell.company.whatsapp;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$ErrorBoundary$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorBoundary"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex flex-col bg-page text-text",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$PageLoader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PageLoader"], {
                    isLoading: isPageLoading
                }, void 0, false, {
                    fileName: "[project]/src/exxonim/app/App.tsx",
                    lineNumber: 189,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    href: "#top",
                    className: "pointer-events-none opacity-0 focus:pointer-events-auto focus:opacity-100 fixed left-4 top-2 z-[100] inline-flex h-12 items-center rounded-full bg-accent px-6 text-sm font-extrabold text-accent-contrast transition-all focus:outline-2 focus:outline-accent",
                    children: "Skip to content"
                }, void 0, false, {
                    fileName: "[project]/src/exxonim/app/App.tsx",
                    lineNumber: 191,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$Navigation$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Navigation"], {
                    brand: shell.brand,
                    company: shell.company,
                    onToggleTheme: toggleTheme,
                    pathname: pathname,
                    theme: theme
                }, void 0, false, {
                    fileName: "[project]/src/exxonim/app/App.tsx",
                    lineNumber: 198,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$ShellStatusNotice$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShellStatusNotice"], {}, void 0, false, {
                    fileName: "[project]/src/exxonim/app/App.tsx",
                    lineNumber: 206,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                    id: "top",
                    className: "relative isolate overflow-x-clip flex-1 pt-[68px]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$ErrorBoundary$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorBoundary"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                            fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PageSuspenseFallback, {}, void 0, false, {
                                fileName: "[project]/src/exxonim/app/App.tsx",
                                lineNumber: 210,
                                columnNumber: 33
                            }, this),
                            children: resolvePage(pathname)
                        }, void 0, false, {
                            fileName: "[project]/src/exxonim/app/App.tsx",
                            lineNumber: 210,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/exxonim/app/App.tsx",
                        lineNumber: 209,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/exxonim/app/App.tsx",
                    lineNumber: 208,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$Footer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Footer"], {
                    brand: shell.brand,
                    company: shell.company,
                    footer: shell.footer
                }, void 0, false, {
                    fileName: "[project]/src/exxonim/app/App.tsx",
                    lineNumber: 216,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$PrivacyConsentBanner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PrivacyConsentBanner"], {
                    pathname: pathname
                }, void 0, false, {
                    fileName: "[project]/src/exxonim/app/App.tsx",
                    lineNumber: 222,
                    columnNumber: 9
                }, this),
                whatsappUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$WhatsAppButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WhatsAppButton"], {
                    phoneNumber: whatsappUrl
                }, void 0, false, {
                    fileName: "[project]/src/exxonim/app/App.tsx",
                    lineNumber: 224,
                    columnNumber: 25
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$ScrollToTopButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollToTopButton"], {}, void 0, false, {
                    fileName: "[project]/src/exxonim/app/App.tsx",
                    lineNumber: 225,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/exxonim/app/App.tsx",
            lineNumber: 188,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/exxonim/app/App.tsx",
        lineNumber: 187,
        columnNumber: 5
    }, this);
}
_s(App, "u+kp43KJcOFyirly1JciCdASkfk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$hooks$2f$useTheme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$app$2f$usePublicRouter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePublicRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$hooks$2f$usePublicShell$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePublicShell"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$hooks$2f$useRevealOnScroll$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRevealOnScroll"]
    ];
});
_c31 = App;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11, _c12, _c13, _c14, _c15, _c16, _c17, _c18, _c19, _c20, _c21, _c22, _c23, _c24, _c25, _c26, _c27, _c28, _c29, _c30, _c31;
__turbopack_context__.k.register(_c, "HomePage$lazy");
__turbopack_context__.k.register(_c1, "HomePage");
__turbopack_context__.k.register(_c2, "AboutPage$lazy");
__turbopack_context__.k.register(_c3, "AboutPage");
__turbopack_context__.k.register(_c4, "CareerPage$lazy");
__turbopack_context__.k.register(_c5, "CareerPage");
__turbopack_context__.k.register(_c6, "ContactPage$lazy");
__turbopack_context__.k.register(_c7, "ContactPage");
__turbopack_context__.k.register(_c8, "FaqPage$lazy");
__turbopack_context__.k.register(_c9, "FaqPage");
__turbopack_context__.k.register(_c10, "NotFoundPage");
__turbopack_context__.k.register(_c11, "ResourceArticlePage");
__turbopack_context__.k.register(_c12, "ResourcesPage$lazy");
__turbopack_context__.k.register(_c13, "ResourcesPage");
__turbopack_context__.k.register(_c14, "ServicesPage$lazy");
__turbopack_context__.k.register(_c15, "ServicesPage");
__turbopack_context__.k.register(_c16, "InfoPages$lazy");
__turbopack_context__.k.register(_c17, "InfoPages");
__turbopack_context__.k.register(_c18, "SupportPage$lazy");
__turbopack_context__.k.register(_c19, "SupportPage");
__turbopack_context__.k.register(_c20, "TermsPage$lazy");
__turbopack_context__.k.register(_c21, "TermsPage");
__turbopack_context__.k.register(_c22, "PrivacyPage$lazy");
__turbopack_context__.k.register(_c23, "PrivacyPage");
__turbopack_context__.k.register(_c24, "CookiePage$lazy");
__turbopack_context__.k.register(_c25, "CookiePage");
__turbopack_context__.k.register(_c26, "DataRightsPage$lazy");
__turbopack_context__.k.register(_c27, "DataRightsPage");
__turbopack_context__.k.register(_c28, "TrackConsultationPage$lazy");
__turbopack_context__.k.register(_c29, "TrackConsultationPage");
__turbopack_context__.k.register(_c30, "PageSuspenseFallback");
__turbopack_context__.k.register(_c31, "App");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/exxonim/app/queryClient.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "queryClient",
    ()=>queryClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/query-core/build/modern/queryClient.js [app-client] (ecmascript)");
;
const queryClient = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryClient"]({
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/exxonim/app/providers/AppProviders.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppProviders",
    ()=>AppProviders
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$app$2f$queryClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/app/queryClient.ts [app-client] (ecmascript)");
;
;
;
function AppProviders({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryClientProvider"], {
        client: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$app$2f$queryClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryClient"],
        children: children
    }, void 0, false, {
        fileName: "[project]/src/exxonim/app/providers/AppProviders.tsx",
        lineNumber: 6,
        columnNumber: 10
    }, this);
}
_c = AppProviders;
var _c;
__turbopack_context__.k.register(_c, "AppProviders");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/[[...slug]]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CatchAllPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$app$2f$App$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/app/App.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$app$2f$providers$2f$AppProviders$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/app/providers/AppProviders.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
function CatchAllPage({ params }) {
    // In Next.js 16, params is a Promise — we read it via React.use()
    // during the server render. On the client, window.location is the
    // source of truth, so initialPathname is only used for SSR.
    const { slug } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].use(params);
    const initialPathname = slug ? `/${slug.join("/")}` : "/";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$app$2f$providers$2f$AppProviders$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AppProviders"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$app$2f$App$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["App"], {
            initialPathname: initialPathname
        }, void 0, false, {
            fileName: "[project]/src/app/[[...slug]]/page.tsx",
            lineNumber: 33,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/[[...slug]]/page.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
_c = CatchAllPage;
var _c;
__turbopack_context__.k.register(_c, "CatchAllPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_0h37wt_._.js.map