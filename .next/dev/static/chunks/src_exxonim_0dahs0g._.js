(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/exxonim/components/ErrorMessage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ErrorMessage",
    ()=>ErrorMessage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function ErrorMessage({ title = "Unable to load content.", detail = "This content is unavailable right now. Please try again in a moment.", compact = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: compact ? "rounded-xl border border-border-soft bg-page p-4" : "rounded-2xl border border-border-soft bg-page p-8 text-center",
        role: "alert",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm font-semibold text-text",
                children: title
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/ErrorMessage.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1 text-sm text-text-muted",
                children: detail
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/ErrorMessage.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/exxonim/components/ErrorMessage.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = ErrorMessage;
var _c;
__turbopack_context__.k.register(_c, "ErrorMessage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/exxonim/components/LoadBoundary.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LoadBoundary",
    ()=>LoadBoundary
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$ErrorMessage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/components/ErrorMessage.tsx [app-client] (ecmascript)");
;
;
function ContentSkeleton({ label, variant }) {
    const isSection = variant === "section";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: [
            "grid border border-border-soft animate-pulse bg-surface-elevated",
            isSection ? "gap-4 min-h-[15rem] p-5 rounded-[1.35rem] w-full" : "gap-6 min-h-[clamp(24rem,48vh,34rem)] p-8 rounded-[1.8rem] w-[min(1180px,calc(100%-2rem))] mx-auto mt-6"
        ].join(" "),
        role: "status",
        "aria-live": "polite",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-4 w-28 rounded-full bg-accent-soft"
                    }, void 0, false, {
                        fileName: "[project]/src/exxonim/components/LoadBoundary.tsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-11 w-[min(30rem,88%)] rounded-full bg-accent-soft"
                    }, void 0, false, {
                        fileName: "[project]/src/exxonim/components/LoadBoundary.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-4 w-[min(36rem,100%)] rounded-full bg-accent-soft"
                    }, void 0, false, {
                        fileName: "[project]/src/exxonim/components/LoadBoundary.tsx",
                        lineNumber: 40,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-4 w-[min(36rem,100%)] rounded-full bg-accent-soft"
                    }, void 0, false, {
                        fileName: "[project]/src/exxonim/components/LoadBoundary.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/exxonim/components/LoadBoundary.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-3 gap-4",
                "aria-hidden": "true",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-h-[9rem] rounded-[1.25rem] bg-accent-soft/70 border border-accent-soft/50"
                    }, void 0, false, {
                        fileName: "[project]/src/exxonim/components/LoadBoundary.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-h-[9rem] rounded-[1.25rem] bg-accent-soft/70 border border-accent-soft/50"
                    }, void 0, false, {
                        fileName: "[project]/src/exxonim/components/LoadBoundary.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-h-[9rem] rounded-[1.25rem] bg-accent-soft/70 border border-accent-soft/50"
                    }, void 0, false, {
                        fileName: "[project]/src/exxonim/components/LoadBoundary.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/exxonim/components/LoadBoundary.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "m-0 text-text-muted text-sm",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/LoadBoundary.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/exxonim/components/LoadBoundary.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
_c = ContentSkeleton;
function LoadBoundary({ children, error, errorDetail = "This section could not be loaded right now. Please try again in a moment.", errorTitle = "Unable to load content.", isPending, isReady = true, loadingLabel = "Loading content...", variant = "page" }) {
    if (isPending && !isReady) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ContentSkeleton, {
            label: loadingLabel,
            variant: variant
        }, void 0, false, {
            fileName: "[project]/src/exxonim/components/LoadBoundary.tsx",
            lineNumber: 64,
            columnNumber: 12
        }, this);
    }
    if (isReady) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: typeof children === "function" ? children() : children
        }, void 0, false);
    }
    if (error || !isReady) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$ErrorMessage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorMessage"], {
            compact: variant === "section",
            detail: errorDetail,
            title: errorTitle
        }, void 0, false, {
            fileName: "[project]/src/exxonim/components/LoadBoundary.tsx",
            lineNumber: 73,
            columnNumber: 7
        }, this);
    }
    return null;
}
_c1 = LoadBoundary;
var _c, _c1;
__turbopack_context__.k.register(_c, "ContentSkeleton");
__turbopack_context__.k.register(_c1, "LoadBoundary");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/exxonim/services/pageService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCachedPageBySlug",
    ()=>getCachedPageBySlug,
    "getPageBySlug",
    ()=>getPageBySlug
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
(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$services$2f$staticFallbackService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["preloadStaticFallback"])("pages");
const PAGE_TTL_MS = 1000 * 60 * 60 * 6;
function pageCacheKey(slug) {
    return `pages:${slug}`;
}
function isPageRecord(value) {
    return Boolean(value && typeof value.slug === "string");
}
async function fetchFreshPageBySlug(slug) {
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$app$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$shared$2f$api$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRoutes"].public.pages.bySlug(slug));
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$contentMappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapPage"])(response.data);
}
function getCachedPageBySlug(slug) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$shared$2f$publicContentCache$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCachedPublicContent"])(pageCacheKey(slug), (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$services$2f$staticFallbackService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStaticFallback"])("pages") ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$content$2f$fallbackPublicContent$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getFallbackPage"])(slug));
}
async function getPageBySlug(slug) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$shared$2f$publicContentCache$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchWithFallback"])({
        cacheKey: pageCacheKey(slug),
        fallbackValue: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$services$2f$staticFallbackService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStaticFallback"])("pages") ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$content$2f$fallbackPublicContent$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getFallbackPage"])(slug),
        fetcher: ()=>fetchFreshPageBySlug(slug),
        ttlMs: PAGE_TTL_MS,
        validate: isPageRecord,
        warningLabel: `Using cached or default page content for "${slug}".`
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/exxonim/hooks/usePage.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePage",
    ()=>usePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$services$2f$pageService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/services/pageService.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
function usePage(slug) {
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "pages",
            slug
        ],
        queryFn: {
            "usePage.useQuery": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$services$2f$pageService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPageBySlug"])(slug)
        }["usePage.useQuery"],
        initialData: {
            "usePage.useQuery": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$services$2f$pageService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCachedPageBySlug"])(slug)
        }["usePage.useQuery"],
        refetchOnMount: true,
        refetchOnReconnect: "always",
        staleTime: 1000 * 60 * 60
    });
}
_s(usePage, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/exxonim/hooks/useSiteSetting.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSiteSetting",
    ()=>useSiteSetting
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$services$2f$siteSettingsService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/services/siteSettingsService.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
function useSiteSetting(key) {
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "site-settings",
            key
        ],
        queryFn: {
            "useSiteSetting.useQuery": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$services$2f$siteSettingsService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSiteSetting"])(key)
        }["useSiteSetting.useQuery"],
        initialData: {
            "useSiteSetting.useQuery": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$services$2f$siteSettingsService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCachedSiteSetting"])(key)
        }["useSiteSetting.useQuery"],
        refetchOnMount: "always",
        refetchOnReconnect: "always",
        retry: {
            "useSiteSetting.useQuery": (failureCount, error)=>{
                const status = error?.response?.status;
                if (status === 404) {
                    return false;
                }
                return failureCount < 2;
            }
        }["useSiteSetting.useQuery"]
    });
}
_s(useSiteSetting, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/exxonim/seo/constants.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getDefaultShareImageUrl",
    ()=>getDefaultShareImageUrl,
    "siteOrigin",
    ()=>siteOrigin
]);
const fallbackShareImage = "/branding/exxonimLogoLight.webp";
const siteOrigin = "https://exxonim.tz";
function getDefaultShareImageUrl(baseUrl = siteOrigin) {
    return new URL(fallbackShareImage, baseUrl).toString();
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/exxonim/seo/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildAbsoluteUrl",
    ()=>buildAbsoluteUrl,
    "escapeSeoValue",
    ()=>escapeSeoValue,
    "toCanonicalPath",
    ()=>toCanonicalPath
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/routes.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/seo/constants.ts [app-client] (ecmascript)");
;
;
function buildAbsoluteUrl(path, baseUrl = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteOrigin"]) {
    return new URL(path, baseUrl).toString();
}
function toCanonicalPath(pathname) {
    const normalizedPathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizePathname"])(pathname);
    if (normalizedPathname === (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizePathname"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].home)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].home;
    }
    if (normalizedPathname === (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizePathname"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].notFound)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].notFound;
    }
    return `${normalizedPathname}/`;
}
function escapeHtmlAttribute(value) {
    return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function escapeSeoValue(value) {
    return escapeHtmlAttribute(value);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/exxonim/seo/apply-seo.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applyResolvedSeo",
    ()=>applyResolvedSeo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/seo/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$seo$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/seo/utils.ts [app-client] (ecmascript)");
;
;
function ensureMetaTag(selector, setup) {
    let meta = document.querySelector(selector);
    if (!meta) {
        meta = document.createElement("meta");
        setup(meta);
        document.head.appendChild(meta);
    }
    return meta;
}
function ensureLinkTag(selector, setup) {
    let link = document.querySelector(selector);
    if (!link) {
        link = document.createElement("link");
        setup(link);
        document.head.appendChild(link);
    }
    return link;
}
function applyResolvedSeo(seo) {
    const canonicalUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$seo$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildAbsoluteUrl"])(seo.canonicalPath, seo.canonicalBaseUrl ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteOrigin"]);
    document.title = seo.title;
    const metaDescription = ensureMetaTag('meta[name="description"]', (meta)=>{
        meta.name = "description";
        meta.setAttribute("data-exxonim", "description");
    });
    metaDescription.content = seo.description;
    const robotsMeta = ensureMetaTag('meta[name="robots"]', (meta)=>{
        meta.name = "robots";
        meta.setAttribute("data-exxonim", "robots");
    });
    robotsMeta.content = seo.robots;
    const ogTitle = ensureMetaTag('meta[property="og:title"]', (meta)=>{
        meta.setAttribute("property", "og:title");
        meta.setAttribute("data-exxonim", "og:title");
    });
    ogTitle.content = seo.title;
    const ogDescription = ensureMetaTag('meta[property="og:description"]', (meta)=>{
        meta.setAttribute("property", "og:description");
        meta.setAttribute("data-exxonim", "og:description");
    });
    ogDescription.content = seo.description;
    const ogType = ensureMetaTag('meta[property="og:type"]', (meta)=>{
        meta.setAttribute("property", "og:type");
        meta.setAttribute("data-exxonim", "og:type");
    });
    ogType.content = seo.type;
    const ogUrl = ensureMetaTag('meta[property="og:url"]', (meta)=>{
        meta.setAttribute("property", "og:url");
        meta.setAttribute("data-exxonim", "og:url");
    });
    ogUrl.content = canonicalUrl;
    const ogImage = ensureMetaTag('meta[property="og:image"]', (meta)=>{
        meta.setAttribute("property", "og:image");
        meta.setAttribute("data-exxonim", "og:image");
    });
    ogImage.content = seo.image;
    const twitterCard = ensureMetaTag('meta[name="twitter:card"]', (meta)=>{
        meta.name = "twitter:card";
        meta.setAttribute("data-exxonim", "twitter:card");
    });
    twitterCard.content = "summary_large_image";
    const twitterTitle = ensureMetaTag('meta[name="twitter:title"]', (meta)=>{
        meta.name = "twitter:title";
        meta.setAttribute("data-exxonim", "twitter:title");
    });
    twitterTitle.content = seo.title;
    const twitterDescription = ensureMetaTag('meta[name="twitter:description"]', (meta)=>{
        meta.name = "twitter:description";
        meta.setAttribute("data-exxonim", "twitter:description");
    });
    twitterDescription.content = seo.description;
    const twitterImage = ensureMetaTag('meta[name="twitter:image"]', (meta)=>{
        meta.name = "twitter:image";
        meta.setAttribute("data-exxonim", "twitter:image");
    });
    twitterImage.content = seo.image;
    const ogSiteName = ensureMetaTag('meta[property="og:site_name"]', (meta)=>{
        meta.setAttribute("property", "og:site_name");
        meta.setAttribute("data-exxonim", "og:site_name");
    });
    ogSiteName.content = "Exxonim Consult";
    const twitterSite = ensureMetaTag('meta[name="twitter:site"]', (meta)=>{
        meta.name = "twitter:site";
        meta.setAttribute("data-exxonim", "twitter:site");
    });
    twitterSite.content = "@exxonim";
    const canonicalLink = ensureLinkTag('link[rel="canonical"][data-exxonim="canonical"]', (link)=>{
        link.rel = "canonical";
        link.setAttribute("data-exxonim", "canonical");
    });
    canonicalLink.href = canonicalUrl;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/exxonim/seo/create-seo.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createBlogPostSeo",
    ()=>createBlogPostSeo,
    "createFallbackSeo",
    ()=>createFallbackSeo,
    "createPageSeo",
    ()=>createPageSeo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/routes.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/seo/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$seo$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/seo/utils.ts [app-client] (ecmascript)");
;
;
;
const BRAND_SUFFIX = " | Exxonim Consult";
/**
 * Appends the brand suffix to a title if it's not already present.
 * Keeps titles under 60 characters when possible (Moz recommendation).
 */ function titleWithBrand(title) {
    if (title.includes("Exxonim Consult")) return title;
    const combined = title + BRAND_SUFFIX;
    // If combined exceeds 60 chars, truncate the title part to fit
    if (combined.length > 60) {
        const maxTitleLen = 60 - BRAND_SUFFIX.length;
        return title.slice(0, maxTitleLen).trimEnd() + BRAND_SUFFIX;
    }
    return combined;
}
function createFallbackSeo(pathname, options = {}) {
    const normalizedPathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizePathname"])(pathname);
    const canonicalBaseUrl = options.canonicalBaseUrl ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteOrigin"];
    return {
        title: options.title ?? "Content unavailable",
        description: options.description ?? "This content is temporarily unavailable.",
        canonicalPath: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$seo$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toCanonicalPath"])(normalizedPathname),
        image: options.image ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultShareImageUrl"])(canonicalBaseUrl),
        type: options.type ?? ((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getResourcePostSlug"])(normalizedPathname) ? "article" : "website"),
        robots: options.robots ?? "noindex,follow",
        canonicalBaseUrl
    };
}
function createPageSeo(page, options) {
    const canonicalBaseUrl = options.canonicalBaseUrl ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteOrigin"];
    return {
        title: titleWithBrand(page.metaTitle ?? page.title),
        description: page.metaDescription ?? options.defaultDescription ?? page.title,
        canonicalPath: options.canonicalPath,
        image: page.ogImageUrl ?? options.defaultImage ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultShareImageUrl"])(canonicalBaseUrl),
        type: "website",
        robots: options.robots ?? "index,follow",
        canonicalBaseUrl
    };
}
function createBlogPostSeo(post, options = {}) {
    const canonicalBaseUrl = options.canonicalBaseUrl ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteOrigin"];
    return {
        title: titleWithBrand(post.metaTitle ?? post.title),
        description: post.metaDescription ?? post.excerpt ?? options.defaultDescription ?? post.title,
        canonicalPath: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resourceArticlePath"])(post.slug),
        image: post.coverImageSrc ?? options.defaultImage ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultShareImageUrl"])(canonicalBaseUrl),
        type: "article",
        robots: options.robots ?? "index,follow",
        canonicalBaseUrl
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/exxonim/seo/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$seo$2f$apply$2d$seo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/seo/apply-seo.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/seo/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$seo$2f$create$2d$seo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/seo/create-seo.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$seo$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/seo/utils.ts [app-client] (ecmascript)");
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/exxonim/hooks/useResolvedSeo.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useResolvedBlogSeo",
    ()=>useResolvedBlogSeo,
    "useResolvedPageSeo",
    ()=>useResolvedPageSeo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$hooks$2f$useSiteSetting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/hooks/useSiteSetting.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$seo$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/exxonim/seo/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$seo$2f$apply$2d$seo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/seo/apply-seo.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$seo$2f$create$2d$seo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/seo/create-seo.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/seo/constants.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
;
;
;
function toRobots(value) {
    return value ? `${value.robotsIndex ? "index" : "noindex"},${value.robotsFollow ? "follow" : "nofollow"}` : "index,follow";
}
function toCanonicalBaseUrl(value) {
    return value?.canonicalBaseUrl ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteOrigin"];
}
function toDefaultDescription(value) {
    return value?.defaultMetaDescription ?? undefined;
}
function toDefaultImage(value) {
    if (value?.defaultShareImageUrl) {
        return value.defaultShareImageUrl;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultShareImageUrl"])(toCanonicalBaseUrl(value));
}
function useResolvedPageSeo(page, canonicalPath) {
    _s();
    const { data: seoDefaultsSetting } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$hooks$2f$useSiteSetting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSiteSetting"])("seo_defaults");
    const seoDefaults = seoDefaultsSetting?.value;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useResolvedPageSeo.useEffect": ()=>{
            if (!page) {
                return;
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$seo$2f$apply$2d$seo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyResolvedSeo"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$seo$2f$create$2d$seo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPageSeo"])(page, {
                canonicalPath,
                canonicalBaseUrl: toCanonicalBaseUrl(seoDefaults),
                defaultDescription: toDefaultDescription(seoDefaults),
                defaultImage: toDefaultImage(seoDefaults),
                robots: toRobots(seoDefaults)
            }));
        }
    }["useResolvedPageSeo.useEffect"], [
        canonicalPath,
        page,
        seoDefaults
    ]);
}
_s(useResolvedPageSeo, "892LvfBgT+KWqv5+3KXIEutrMIU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$hooks$2f$useSiteSetting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSiteSetting"]
    ];
});
function useResolvedBlogSeo(post) {
    _s1();
    const { data: seoDefaultsSetting } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$hooks$2f$useSiteSetting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSiteSetting"])("seo_defaults");
    const seoDefaults = seoDefaultsSetting?.value;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useResolvedBlogSeo.useEffect": ()=>{
            if (!post) {
                return;
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$seo$2f$apply$2d$seo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyResolvedSeo"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$seo$2f$create$2d$seo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBlogPostSeo"])(post, {
                canonicalBaseUrl: toCanonicalBaseUrl(seoDefaults),
                defaultDescription: toDefaultDescription(seoDefaults),
                defaultImage: toDefaultImage(seoDefaults),
                robots: toRobots(seoDefaults)
            }));
        }
    }["useResolvedBlogSeo.useEffect"], [
        post,
        seoDefaults
    ]);
}
_s1(useResolvedBlogSeo, "892LvfBgT+KWqv5+3KXIEutrMIU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$hooks$2f$useSiteSetting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSiteSetting"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/exxonim/pages/AboutPage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AboutPage",
    ()=>AboutPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/routes.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$LoadBoundary$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/components/LoadBoundary.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$hooks$2f$usePage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/hooks/usePage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$hooks$2f$useResolvedSeo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/hooks/useResolvedSeo.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
function AboutPage() {
    _s();
    const { data: page, isPending, error } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$hooks$2f$usePage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePage"])("about");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$hooks$2f$useResolvedSeo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useResolvedPageSeo"])(page, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].about);
    const content = page?.content;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$LoadBoundary$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LoadBoundary"], {
        error: error,
        errorDetail: "The about page content could not be loaded right now.",
        errorTitle: "Unable to load the about page.",
        isPending: isPending,
        isReady: Boolean(content),
        loadingLabel: "Loading about page...",
        children: ()=>{
            if (!content) return null;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pt-4 md:pt-8 pb-12 md:pb-20",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "mb-16",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-elevated text-xs font-bold tracking-widest uppercase text-text-muted",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-2 h-2 rounded-full bg-accent"
                                            }, void 0, false, {
                                                fileName: "[project]/src/exxonim/pages/AboutPage.tsx",
                                                lineNumber: 28,
                                                columnNumber: 17
                                            }, this),
                                            content.hero.eyebrow
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/exxonim/pages/AboutPage.tsx",
                                        lineNumber: 27,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "mt-6 text-4xl md:text-6xl font-bold tracking-tight text-text",
                                        children: content.hero.title
                                    }, void 0, false, {
                                        fileName: "[project]/src/exxonim/pages/AboutPage.tsx",
                                        lineNumber: 31,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-4 text-lg text-text-muted max-w-3xl",
                                        children: content.hero.description
                                    }, void 0, false, {
                                        fileName: "[project]/src/exxonim/pages/AboutPage.tsx",
                                        lineNumber: 32,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/exxonim/pages/AboutPage.tsx",
                                lineNumber: 26,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-24",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                        className: "grid md:grid-cols-[1.1fr_0.9fr] gap-10 items-start",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs font-bold tracking-widest uppercase text-text-soft mb-4",
                                                        children: content.company_profile.eyebrow
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/exxonim/pages/AboutPage.tsx",
                                                        lineNumber: 38,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        className: "text-3xl md:text-4xl font-bold tracking-tight text-text mb-6",
                                                        children: content.company_profile.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/exxonim/pages/AboutPage.tsx",
                                                        lineNumber: 41,
                                                        columnNumber: 19
                                                    }, this),
                                                    content.company_profile.paragraphs.map((paragraph)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-text-muted leading-relaxed mb-4",
                                                            children: paragraph
                                                        }, paragraph, false, {
                                                            fileName: "[project]/src/exxonim/pages/AboutPage.tsx",
                                                            lineNumber: 43,
                                                            columnNumber: 21
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/exxonim/pages/AboutPage.tsx",
                                                lineNumber: 37,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-8 rounded-2xl border border-border-soft bg-surface/60 backdrop-blur-sm",
                                                children: [
                                                    content.company_profile.working_style_label ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        className: "block text-xs font-bold tracking-widest uppercase text-text-soft mb-2",
                                                        children: content.company_profile.working_style_label
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/exxonim/pages/AboutPage.tsx",
                                                        lineNumber: 49,
                                                        columnNumber: 21
                                                    }, this) : null,
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-2xl font-bold text-text",
                                                        children: content.company_profile.working_style
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/exxonim/pages/AboutPage.tsx",
                                                        lineNumber: 51,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/exxonim/pages/AboutPage.tsx",
                                                lineNumber: 47,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/exxonim/pages/AboutPage.tsx",
                                        lineNumber: 36,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                        children: [
                                            content.support_profiles_section ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mb-10",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        className: "text-3xl font-bold tracking-tight text-text mb-4",
                                                        children: content.support_profiles_section.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/exxonim/pages/AboutPage.tsx",
                                                        lineNumber: 58,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-text-muted max-w-2xl",
                                                        children: content.support_profiles_section.description
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/exxonim/pages/AboutPage.tsx",
                                                        lineNumber: 59,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/exxonim/pages/AboutPage.tsx",
                                                lineNumber: 57,
                                                columnNumber: 19
                                            }, this) : null,
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
                                                children: content.support_profiles.map((profile)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                                        className: "p-6 rounded-2xl border border-border-soft bg-surface/60 backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-panel",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                className: "text-xl font-bold text-text",
                                                                children: profile.title
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/exxonim/pages/AboutPage.tsx",
                                                                lineNumber: 66,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "mt-3 text-text-muted leading-relaxed",
                                                                children: profile.description
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/exxonim/pages/AboutPage.tsx",
                                                                lineNumber: 67,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, profile.title, true, {
                                                        fileName: "[project]/src/exxonim/pages/AboutPage.tsx",
                                                        lineNumber: 65,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/exxonim/pages/AboutPage.tsx",
                                                lineNumber: 63,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/exxonim/pages/AboutPage.tsx",
                                        lineNumber: 55,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                        children: [
                                            content.service_scope_section ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mb-10",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        className: "text-3xl font-bold tracking-tight text-text mb-4",
                                                        children: content.service_scope_section.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/exxonim/pages/AboutPage.tsx",
                                                        lineNumber: 76,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-text-muted max-w-2xl",
                                                        children: content.service_scope_section.description
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/exxonim/pages/AboutPage.tsx",
                                                        lineNumber: 77,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/exxonim/pages/AboutPage.tsx",
                                                lineNumber: 75,
                                                columnNumber: 19
                                            }, this) : null,
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
                                                children: content.service_scope.map((service)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                                        className: "p-6 rounded-2xl border border-border-soft bg-surface/60 backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-panel",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                className: "text-xl font-bold text-text",
                                                                children: service.title
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/exxonim/pages/AboutPage.tsx",
                                                                lineNumber: 84,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "mt-3 text-text-muted leading-relaxed",
                                                                children: service.description
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/exxonim/pages/AboutPage.tsx",
                                                                lineNumber: 85,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, service.title, true, {
                                                        fileName: "[project]/src/exxonim/pages/AboutPage.tsx",
                                                        lineNumber: 83,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/exxonim/pages/AboutPage.tsx",
                                                lineNumber: 81,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/exxonim/pages/AboutPage.tsx",
                                        lineNumber: 73,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                        children: [
                                            content.operating_model_section ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mb-10",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        className: "text-3xl font-bold tracking-tight text-text mb-4",
                                                        children: content.operating_model_section.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/exxonim/pages/AboutPage.tsx",
                                                        lineNumber: 94,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-text-muted max-w-2xl",
                                                        children: content.operating_model_section.description
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/exxonim/pages/AboutPage.tsx",
                                                        lineNumber: 95,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/exxonim/pages/AboutPage.tsx",
                                                lineNumber: 93,
                                                columnNumber: 19
                                            }, this) : null,
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid gap-6 md:grid-cols-2",
                                                children: content.operating_model.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                                        className: "flex gap-5 p-6 rounded-2xl border border-border-soft bg-surface/60 backdrop-blur-sm",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "flex items-center justify-center w-10 h-10 rounded-xl bg-accent/10 text-accent font-bold text-sm shrink-0",
                                                                children: item.step
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/exxonim/pages/AboutPage.tsx",
                                                                lineNumber: 102,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                        className: "text-xl font-bold text-text",
                                                                        children: item.title
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/exxonim/pages/AboutPage.tsx",
                                                                        lineNumber: 104,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "mt-2 text-text-muted leading-relaxed",
                                                                        children: item.description
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/exxonim/pages/AboutPage.tsx",
                                                                        lineNumber: 105,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/exxonim/pages/AboutPage.tsx",
                                                                lineNumber: 103,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, item.step, true, {
                                                        fileName: "[project]/src/exxonim/pages/AboutPage.tsx",
                                                        lineNumber: 101,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/exxonim/pages/AboutPage.tsx",
                                                lineNumber: 99,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/exxonim/pages/AboutPage.tsx",
                                        lineNumber: 91,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                        children: [
                                            content.client_expectations_section ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mb-10",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        className: "text-3xl font-bold tracking-tight text-text mb-4",
                                                        children: content.client_expectations_section.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/exxonim/pages/AboutPage.tsx",
                                                        lineNumber: 115,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-text-muted max-w-2xl",
                                                        children: content.client_expectations_section.description
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/exxonim/pages/AboutPage.tsx",
                                                        lineNumber: 116,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/exxonim/pages/AboutPage.tsx",
                                                lineNumber: 114,
                                                columnNumber: 19
                                            }, this) : null,
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3",
                                                children: content.client_expectations.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                                        className: "p-5 rounded-2xl border border-border-soft bg-surface/60 backdrop-blur-sm",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex gap-4 items-start",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "flex items-center justify-center w-8 h-8 rounded-full bg-accent/10 text-accent font-bold text-lg shrink-0",
                                                                    children: "+"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/exxonim/pages/AboutPage.tsx",
                                                                    lineNumber: 124,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-text-muted leading-relaxed",
                                                                    children: item
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/exxonim/pages/AboutPage.tsx",
                                                                    lineNumber: 125,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/exxonim/pages/AboutPage.tsx",
                                                            lineNumber: 123,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, item, false, {
                                                        fileName: "[project]/src/exxonim/pages/AboutPage.tsx",
                                                        lineNumber: 122,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/exxonim/pages/AboutPage.tsx",
                                                lineNumber: 120,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/exxonim/pages/AboutPage.tsx",
                                        lineNumber: 112,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                        className: "p-8 md:p-12 rounded-3xl border border-border-soft bg-gradient-to-br from-accent/5 to-accent/10 backdrop-blur-sm text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-3xl md:text-4xl font-bold tracking-tight text-text mb-4",
                                                children: content.cta.title
                                            }, void 0, false, {
                                                fileName: "[project]/src/exxonim/pages/AboutPage.tsx",
                                                lineNumber: 133,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-text-muted max-w-2xl mx-auto mb-8",
                                                children: content.cta.description
                                            }, void 0, false, {
                                                fileName: "[project]/src/exxonim/pages/AboutPage.tsx",
                                                lineNumber: 134,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap justify-center gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        className: "inline-flex items-center justify-center min-h-[3.25rem] px-7 py-3 rounded-full bg-accent text-accent-contrast font-bold shadow-panel transition-all hover:bg-accent-hover hover:-translate-y-0.5",
                                                        href: content.cta.primary.href,
                                                        children: content.cta.primary.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/exxonim/pages/AboutPage.tsx",
                                                        lineNumber: 136,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        className: "inline-flex items-center justify-center min-h-[3.25rem] px-7 py-3 rounded-full border border-border-soft bg-surface/80 text-text font-bold transition-all hover:bg-surface",
                                                        href: content.cta.secondary.href,
                                                        children: content.cta.secondary.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/exxonim/pages/AboutPage.tsx",
                                                        lineNumber: 142,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/exxonim/pages/AboutPage.tsx",
                                                lineNumber: 135,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/exxonim/pages/AboutPage.tsx",
                                        lineNumber: 132,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/exxonim/pages/AboutPage.tsx",
                                lineNumber: 35,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/exxonim/pages/AboutPage.tsx",
                        lineNumber: 25,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/exxonim/pages/AboutPage.tsx",
                    lineNumber: 24,
                    columnNumber: 1
                }, this)
            }, void 0, false);
        }
    }, void 0, false, {
        fileName: "[project]/src/exxonim/pages/AboutPage.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_s(AboutPage, "t10M1knnlPrzSQ+nIXgyA3MP7/s=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$hooks$2f$usePage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePage"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$hooks$2f$useResolvedSeo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useResolvedPageSeo"]
    ];
});
_c = AboutPage;
var _c;
__turbopack_context__.k.register(_c, "AboutPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_exxonim_0dahs0g._.js.map