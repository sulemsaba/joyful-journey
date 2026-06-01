(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/joyful-journey/src/exxonim/components/ErrorMessage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ErrorMessage",
    ()=>ErrorMessage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function ErrorMessage({ title = "Unable to load content.", detail = "This content is unavailable right now. Please try again in a moment.", compact = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: compact ? "rounded-xl border border-border-soft bg-page p-4" : "rounded-2xl border border-border-soft bg-page p-8 text-center",
        role: "alert",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm font-semibold text-text",
                children: title
            }, void 0, false, {
                fileName: "[project]/joyful-journey/src/exxonim/components/ErrorMessage.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1 text-sm text-text-muted",
                children: detail
            }, void 0, false, {
                fileName: "[project]/joyful-journey/src/exxonim/components/ErrorMessage.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/joyful-journey/src/exxonim/components/ErrorMessage.tsx",
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
"[project]/joyful-journey/src/exxonim/components/LoadBoundary.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LoadBoundary",
    ()=>LoadBoundary
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$components$2f$ErrorMessage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/components/ErrorMessage.tsx [app-client] (ecmascript)");
;
;
function ContentSkeleton({ label, variant }) {
    const isSection = variant === "section";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: [
            "grid border border-border-soft animate-pulse bg-surface-elevated",
            isSection ? "gap-4 min-h-[15rem] p-5 rounded-[1.35rem] w-full" : "gap-6 min-h-[clamp(24rem,48vh,34rem)] p-8 rounded-[1.8rem] w-[min(1180px,calc(100%-2rem))] mx-auto mt-6"
        ].join(" "),
        role: "status",
        "aria-live": "polite",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-4 w-28 rounded-full bg-accent-soft"
                    }, void 0, false, {
                        fileName: "[project]/joyful-journey/src/exxonim/components/LoadBoundary.tsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-11 w-[min(30rem,88%)] rounded-full bg-accent-soft"
                    }, void 0, false, {
                        fileName: "[project]/joyful-journey/src/exxonim/components/LoadBoundary.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-4 w-[min(36rem,100%)] rounded-full bg-accent-soft"
                    }, void 0, false, {
                        fileName: "[project]/joyful-journey/src/exxonim/components/LoadBoundary.tsx",
                        lineNumber: 40,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-4 w-[min(36rem,100%)] rounded-full bg-accent-soft"
                    }, void 0, false, {
                        fileName: "[project]/joyful-journey/src/exxonim/components/LoadBoundary.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/joyful-journey/src/exxonim/components/LoadBoundary.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-3 gap-4",
                "aria-hidden": "true",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-h-[9rem] rounded-[1.25rem] bg-accent-soft/70 border border-accent-soft/50"
                    }, void 0, false, {
                        fileName: "[project]/joyful-journey/src/exxonim/components/LoadBoundary.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-h-[9rem] rounded-[1.25rem] bg-accent-soft/70 border border-accent-soft/50"
                    }, void 0, false, {
                        fileName: "[project]/joyful-journey/src/exxonim/components/LoadBoundary.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-h-[9rem] rounded-[1.25rem] bg-accent-soft/70 border border-accent-soft/50"
                    }, void 0, false, {
                        fileName: "[project]/joyful-journey/src/exxonim/components/LoadBoundary.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/joyful-journey/src/exxonim/components/LoadBoundary.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "m-0 text-text-muted text-sm",
                children: label
            }, void 0, false, {
                fileName: "[project]/joyful-journey/src/exxonim/components/LoadBoundary.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/joyful-journey/src/exxonim/components/LoadBoundary.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
_c = ContentSkeleton;
function LoadBoundary({ children, error, errorDetail = "This section could not be loaded right now. Please try again in a moment.", errorTitle = "Unable to load content.", isPending, isReady = true, loadingLabel = "Loading content...", variant = "page" }) {
    if (isPending && !isReady) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ContentSkeleton, {
            label: loadingLabel,
            variant: variant
        }, void 0, false, {
            fileName: "[project]/joyful-journey/src/exxonim/components/LoadBoundary.tsx",
            lineNumber: 64,
            columnNumber: 12
        }, this);
    }
    if (isReady) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: typeof children === "function" ? children() : children
        }, void 0, false);
    }
    if (error || !isReady) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$components$2f$ErrorMessage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorMessage"], {
            compact: variant === "section",
            detail: errorDetail,
            title: errorTitle
        }, void 0, false, {
            fileName: "[project]/joyful-journey/src/exxonim/components/LoadBoundary.tsx",
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
"[project]/joyful-journey/src/exxonim/services/blogService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchFreshPublicBlogPosts",
    ()=>fetchFreshPublicBlogPosts,
    "getCachedPublicBlogCategories",
    ()=>getCachedPublicBlogCategories,
    "getCachedPublicBlogPostBySlug",
    ()=>getCachedPublicBlogPostBySlug,
    "getCachedPublicBlogPosts",
    ()=>getCachedPublicBlogPosts,
    "getPublicBlogPostBySlug",
    ()=>getPublicBlogPostBySlug,
    "listFeaturedPublicBlogPosts",
    ()=>listFeaturedPublicBlogPosts,
    "listPublicBlogCategories",
    ()=>listPublicBlogCategories,
    "listPublicBlogPosts",
    ()=>listPublicBlogPosts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$app$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/app/apiClient.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$shared$2f$api$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/shared/api/routes.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$shared$2f$publicContentCache$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/shared/publicContentCache.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$contentMappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/utils/contentMappers.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$staticFallbackService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/services/staticFallbackService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackPublicContent$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/content/fallbackPublicContent.ts [app-client] (ecmascript) <locals>");
;
;
;
;
;
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$staticFallbackService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["preloadStaticFallback"])("blog-posts");
(0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$staticFallbackService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["preloadStaticFallback"])("blog-categories");
const BLOG_POSTS_CACHE_KEY = "blog:posts";
const BLOG_CATEGORIES_CACHE_KEY = "blog:categories";
const BLOG_POSTS_TTL_MS = 1000 * 60 * 30;
const BLOG_CATEGORIES_TTL_MS = 1000 * 60 * 60 * 24;
const BLOG_POST_TTL_MS = 1000 * 60 * 60 * 6;
function blogPostCacheKey(slug) {
    return `blog:post:${slug}`;
}
function isBlogPostCollection(value) {
    return Array.isArray(value) && value.length > 0;
}
function isBlogCategoryCollection(value) {
    return Array.isArray(value) && value.length > 0;
}
function isBlogPostRecord(value) {
    return Boolean(value && typeof value.slug === "string");
}
function findFallbackBlogPost(slug) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackPublicContent$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fallbackBlogPosts"].find((post)=>post.slug === slug);
}
function mapPostsResponse(responseData) {
    if (Array.isArray(responseData)) {
        return responseData.map(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$contentMappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapBlogPost"]);
    }
    return responseData.items.map(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$contentMappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapBlogPost"]);
}
async function fetchFreshPublicBlogPosts() {
    const params = {
        page: 1,
        limit: 50,
        skip: 0
    };
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$app$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$shared$2f$api$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRoutes"].public.blog.posts.list, {
        params
    });
    return mapPostsResponse(response.data);
}
function getCachedPublicBlogPosts() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$shared$2f$publicContentCache$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCachedPublicContent"])(BLOG_POSTS_CACHE_KEY, (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$staticFallbackService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStaticFallback"])("blog-posts") ?? __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackPublicContent$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fallbackBlogPosts"]);
}
async function listPublicBlogPosts() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$shared$2f$publicContentCache$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchWithFallback"])({
        cacheKey: BLOG_POSTS_CACHE_KEY,
        fallbackValue: (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$staticFallbackService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStaticFallback"])("blog-posts") ?? __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackPublicContent$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fallbackBlogPosts"],
        fetcher: fetchFreshPublicBlogPosts,
        ttlMs: BLOG_POSTS_TTL_MS,
        validate: isBlogPostCollection,
        warningLabel: "Using cached or default blog posts."
    });
}
async function listFeaturedPublicBlogPosts(limit = 3) {
    const posts = await listPublicBlogPosts();
    return posts.filter((post)=>post.featuredOnHome).slice(0, limit);
}
async function getPublicBlogPostBySlug(slug) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$shared$2f$publicContentCache$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchWithFallback"])({
        cacheKey: blogPostCacheKey(slug),
        fallbackValue: findFallbackBlogPost(slug),
        fetcher: async ()=>{
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$app$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$shared$2f$api$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRoutes"].public.blog.posts.bySlug(slug));
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$contentMappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapBlogPost"])(response.data);
        },
        ttlMs: BLOG_POST_TTL_MS,
        validate: isBlogPostRecord,
        warningLabel: `Using cached or default blog article content for "${slug}".`
    });
}
function getCachedPublicBlogPostBySlug(slug) {
    const cachedPost = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$shared$2f$publicContentCache$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCachedPublicContent"])(blogPostCacheKey(slug));
    if (cachedPost) {
        return cachedPost;
    }
    const cachedPosts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$shared$2f$publicContentCache$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCachedPublicContent"])(BLOG_POSTS_CACHE_KEY, (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$staticFallbackService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStaticFallback"])("blog-posts") ?? __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackPublicContent$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fallbackBlogPosts"]);
    const cachedCollectionMatch = cachedPosts?.find((post)=>post.slug === slug);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$shared$2f$publicContentCache$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCachedPublicContent"])(blogPostCacheKey(slug), cachedCollectionMatch ?? findFallbackBlogPost(slug));
}
async function fetchFreshPublicBlogCategories() {
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$app$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$shared$2f$api$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRoutes"].public.blog.categories.list);
    return response.data.map((category)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$contentMappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapBlogCategory"])(category));
}
function getCachedPublicBlogCategories() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$shared$2f$publicContentCache$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCachedPublicContent"])(BLOG_CATEGORIES_CACHE_KEY, (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$staticFallbackService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStaticFallback"])("blog-categories") ?? __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackPublicContent$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fallbackBlogCategories"]);
}
async function listPublicBlogCategories() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$shared$2f$publicContentCache$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchWithFallback"])({
        cacheKey: BLOG_CATEGORIES_CACHE_KEY,
        fallbackValue: (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$staticFallbackService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStaticFallback"])("blog-categories") ?? __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackPublicContent$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fallbackBlogCategories"],
        fetcher: fetchFreshPublicBlogCategories,
        ttlMs: BLOG_CATEGORIES_TTL_MS,
        validate: isBlogCategoryCollection,
        warningLabel: "Using cached or default blog categories."
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/joyful-journey/src/exxonim/hooks/useBlogPost.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useBlogPost",
    ()=>useBlogPost
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$blogService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/services/blogService.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
function useBlogPost(slug) {
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "blog",
            "post",
            slug
        ],
        queryFn: {
            "useBlogPost.useQuery": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$blogService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPublicBlogPostBySlug"])(slug)
        }["useBlogPost.useQuery"],
        enabled: Boolean(slug),
        initialData: slug ? ({
            "useBlogPost.useQuery": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$blogService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCachedPublicBlogPostBySlug"])(slug)
        })["useBlogPost.useQuery"] : undefined,
        refetchOnMount: "always",
        refetchOnReconnect: "always",
        staleTime: 1000 * 60 * 30,
        retry: {
            "useBlogPost.useQuery": (failureCount, error)=>{
                const status = error?.response?.status;
                if (status === 404) {
                    return false;
                }
                return failureCount < 2;
            }
        }["useBlogPost.useQuery"]
    });
}
_s(useBlogPost, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/joyful-journey/src/exxonim/hooks/useBlogPosts.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useBlogPosts",
    ()=>useBlogPosts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$blogService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/services/blogService.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
function useBlogPosts() {
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "blog",
            "posts"
        ],
        queryFn: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$blogService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["listPublicBlogPosts"],
        initialData: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$blogService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCachedPublicBlogPosts"],
        refetchOnMount: true,
        refetchOnReconnect: "always",
        staleTime: 1000 * 60 * 60
    });
}
_s(useBlogPosts, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/joyful-journey/src/exxonim/services/pageService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCachedPageBySlug",
    ()=>getCachedPageBySlug,
    "getPageBySlug",
    ()=>getPageBySlug
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$app$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/app/apiClient.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$shared$2f$api$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/shared/api/routes.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$shared$2f$publicContentCache$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/shared/publicContentCache.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$contentMappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/utils/contentMappers.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$staticFallbackService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/services/staticFallbackService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackPublicContent$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/content/fallbackPublicContent.ts [app-client] (ecmascript) <locals>");
;
;
;
;
;
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$staticFallbackService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["preloadStaticFallback"])("pages");
const PAGE_TTL_MS = 1000 * 60 * 60 * 6;
function pageCacheKey(slug) {
    return `pages:${slug}`;
}
function isPageRecord(value) {
    return Boolean(value && typeof value.slug === "string");
}
async function fetchFreshPageBySlug(slug) {
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$app$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$shared$2f$api$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRoutes"].public.pages.bySlug(slug));
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$contentMappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapPage"])(response.data);
}
function getCachedPageBySlug(slug) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$shared$2f$publicContentCache$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCachedPublicContent"])(pageCacheKey(slug), (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$staticFallbackService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStaticFallback"])("pages") ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackPublicContent$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getFallbackPage"])(slug));
}
async function getPageBySlug(slug) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$shared$2f$publicContentCache$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchWithFallback"])({
        cacheKey: pageCacheKey(slug),
        fallbackValue: (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$staticFallbackService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStaticFallback"])("pages") ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackPublicContent$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getFallbackPage"])(slug),
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
"[project]/joyful-journey/src/exxonim/hooks/usePage.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePage",
    ()=>usePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$pageService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/services/pageService.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
function usePage(slug) {
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "pages",
            slug
        ],
        queryFn: {
            "usePage.useQuery": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$pageService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPageBySlug"])(slug)
        }["usePage.useQuery"],
        initialData: {
            "usePage.useQuery": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$pageService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCachedPageBySlug"])(slug)
        }["usePage.useQuery"],
        refetchOnMount: true,
        refetchOnReconnect: "always",
        staleTime: 1000 * 60 * 60
    });
}
_s(usePage, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/joyful-journey/src/exxonim/hooks/useSiteSetting.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSiteSetting",
    ()=>useSiteSetting
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$siteSettingsService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/services/siteSettingsService.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
function useSiteSetting(key) {
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "site-settings",
            key
        ],
        queryFn: {
            "useSiteSetting.useQuery": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$siteSettingsService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSiteSetting"])(key)
        }["useSiteSetting.useQuery"],
        initialData: {
            "useSiteSetting.useQuery": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$siteSettingsService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCachedSiteSetting"])(key)
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
        __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/joyful-journey/src/exxonim/seo/constants.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/joyful-journey/src/exxonim/seo/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildAbsoluteUrl",
    ()=>buildAbsoluteUrl,
    "escapeSeoValue",
    ()=>escapeSeoValue,
    "toCanonicalPath",
    ()=>toCanonicalPath
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/routes.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/seo/constants.ts [app-client] (ecmascript)");
;
;
function buildAbsoluteUrl(path, baseUrl = __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteOrigin"]) {
    return new URL(path, baseUrl).toString();
}
function toCanonicalPath(pathname) {
    const normalizedPathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizePathname"])(pathname);
    if (normalizedPathname === (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizePathname"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].home)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].home;
    }
    if (normalizedPathname === (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizePathname"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].notFound)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].notFound;
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
"[project]/joyful-journey/src/exxonim/seo/apply-seo.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applyResolvedSeo",
    ()=>applyResolvedSeo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/seo/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/seo/utils.ts [app-client] (ecmascript)");
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
    const canonicalUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildAbsoluteUrl"])(seo.canonicalPath, seo.canonicalBaseUrl ?? __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteOrigin"]);
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
"[project]/joyful-journey/src/exxonim/seo/create-seo.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createBlogPostSeo",
    ()=>createBlogPostSeo,
    "createFallbackSeo",
    ()=>createFallbackSeo,
    "createPageSeo",
    ()=>createPageSeo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/routes.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/seo/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/seo/utils.ts [app-client] (ecmascript)");
;
;
;
function createFallbackSeo(pathname, options = {}) {
    const normalizedPathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizePathname"])(pathname);
    const canonicalBaseUrl = options.canonicalBaseUrl ?? __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteOrigin"];
    return {
        title: options.title ?? "Content unavailable",
        description: options.description ?? "This content is temporarily unavailable.",
        canonicalPath: (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toCanonicalPath"])(normalizedPathname),
        image: options.image ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultShareImageUrl"])(canonicalBaseUrl),
        type: options.type ?? ((0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getResourcePostSlug"])(normalizedPathname) ? "article" : "website"),
        robots: options.robots ?? "noindex,follow",
        canonicalBaseUrl
    };
}
function createPageSeo(page, options) {
    const canonicalBaseUrl = options.canonicalBaseUrl ?? __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteOrigin"];
    return {
        title: page.metaTitle ?? page.title,
        description: page.metaDescription ?? options.defaultDescription ?? page.title,
        canonicalPath: options.canonicalPath,
        image: page.ogImageUrl ?? options.defaultImage ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultShareImageUrl"])(canonicalBaseUrl),
        type: "website",
        robots: options.robots ?? "index,follow",
        canonicalBaseUrl
    };
}
function createBlogPostSeo(post, options = {}) {
    const canonicalBaseUrl = options.canonicalBaseUrl ?? __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteOrigin"];
    return {
        title: post.metaTitle ?? post.title,
        description: post.metaDescription ?? post.excerpt ?? options.defaultDescription ?? post.title,
        canonicalPath: (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resourceArticlePath"])(post.slug),
        image: post.coverImageSrc ?? options.defaultImage ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultShareImageUrl"])(canonicalBaseUrl),
        type: "article",
        robots: options.robots ?? "index,follow",
        canonicalBaseUrl
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/joyful-journey/src/exxonim/seo/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$apply$2d$seo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/seo/apply-seo.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/seo/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$create$2d$seo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/seo/create-seo.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/seo/utils.ts [app-client] (ecmascript)");
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/joyful-journey/src/exxonim/hooks/useResolvedSeo.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useResolvedBlogSeo",
    ()=>useResolvedBlogSeo,
    "useResolvedPageSeo",
    ()=>useResolvedPageSeo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$hooks$2f$useSiteSetting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/hooks/useSiteSetting.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/seo/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$apply$2d$seo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/seo/apply-seo.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$create$2d$seo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/seo/create-seo.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/seo/constants.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
;
;
;
function toRobots(value) {
    return value ? `${value.robotsIndex ? "index" : "noindex"},${value.robotsFollow ? "follow" : "nofollow"}` : "index,follow";
}
function toCanonicalBaseUrl(value) {
    return value?.canonicalBaseUrl ?? __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteOrigin"];
}
function toDefaultDescription(value) {
    return value?.defaultMetaDescription ?? undefined;
}
function toDefaultImage(value) {
    if (value?.defaultShareImageUrl) {
        return value.defaultShareImageUrl;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultShareImageUrl"])(toCanonicalBaseUrl(value));
}
function useResolvedPageSeo(page, canonicalPath) {
    _s();
    const { data: seoDefaultsSetting } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$hooks$2f$useSiteSetting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSiteSetting"])("seo_defaults");
    const seoDefaults = seoDefaultsSetting?.value;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useResolvedPageSeo.useEffect": ()=>{
            if (!page) {
                return;
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$apply$2d$seo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyResolvedSeo"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$create$2d$seo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPageSeo"])(page, {
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
        __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$hooks$2f$useSiteSetting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSiteSetting"]
    ];
});
function useResolvedBlogSeo(post) {
    _s1();
    const { data: seoDefaultsSetting } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$hooks$2f$useSiteSetting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSiteSetting"])("seo_defaults");
    const seoDefaults = seoDefaultsSetting?.value;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useResolvedBlogSeo.useEffect": ()=>{
            if (!post) {
                return;
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$apply$2d$seo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyResolvedSeo"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$create$2d$seo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBlogPostSeo"])(post, {
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
        __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$hooks$2f$useSiteSetting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSiteSetting"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/joyful-journey/src/exxonim/utils/blog.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildResourcesBlogLayout",
    ()=>buildResourcesBlogLayout,
    "comparePostsNewestFirst",
    ()=>comparePostsNewestFirst,
    "getBlogArticleIntro",
    ()=>getBlogArticleIntro,
    "getFeaturedBlogPosts",
    ()=>getFeaturedBlogPosts,
    "getHomeBlogPosts",
    ()=>getHomeBlogPosts,
    "getRelatedBlogPosts",
    ()=>getRelatedBlogPosts,
    "getRenderableBlogHtml",
    ()=>getRenderableBlogHtml,
    "getRenderableBlogSections",
    ()=>getRenderableBlogSections,
    "getVisibleBlogPosts",
    ()=>getVisibleBlogPosts,
    "hasUsableBlogBody",
    ()=>hasUsableBlogBody,
    "sanitizeBlogHtml",
    ()=>sanitizeBlogHtml
]);
function toUtcDateValue(date) {
    return new Date(`${date}T00:00:00Z`).getTime();
}
function cleanText(value) {
    return typeof value === "string" ? value.trim() : "";
}
function stripHtml(value = "") {
    return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}
function sanitizeBlogHtml(value = "") {
    return value.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "").replace(/\son[a-z]+="[^"]*"/gi, "").replace(/\son[a-z]+='[^']*'/gi, "").replace(/javascript:/gi, "");
}
function hasUsableBlogBody(content) {
    if (!content) {
        return false;
    }
    if (stripHtml(cleanText(content.html)).length >= 8) {
        return true;
    }
    if (cleanText(content.introduction).length >= 8) {
        return true;
    }
    return content.sections.some((section)=>{
        if (cleanText(section.heading).length >= 2) {
            return true;
        }
        return section.paragraphs.some((paragraph)=>cleanText(paragraph).length >= 8);
    });
}
function getRenderableBlogHtml(content) {
    const html = cleanText(content?.html);
    return html ? sanitizeBlogHtml(html) : "";
}
function getRenderableBlogSections(post) {
    const content = post.content;
    if (!content) {
        return [];
    }
    if (getRenderableBlogHtml(content)) {
        return [];
    }
    if (content.sections.length > 0) {
        return content.sections;
    }
    const introParagraphs = cleanText(content.introduction).split(/\n\s*\n+/).map((paragraph)=>paragraph.trim()).filter(Boolean);
    if (!introParagraphs.length) {
        return [];
    }
    return [
        {
            heading: "Article",
            paragraphs: introParagraphs
        }
    ];
}
function getBlogArticleIntro(post) {
    const content = post.content;
    if (!content) {
        return post.excerpt || "";
    }
    const sections = getRenderableBlogSections(post);
    if (sections.length > 0) {
        return content.sections.length > 0 ? content.introduction : post.excerpt || sections[0]?.paragraphs[0] || content.introduction;
    }
    return post.excerpt || content.introduction;
}
function comparePostsNewestFirst(left, right) {
    return toUtcDateValue(right.publishedAt) - toUtcDateValue(left.publishedAt);
}
function getFeaturedBlogPosts(posts) {
    const slotOrder = [
        "hero",
        "popular",
        "editors-pick"
    ];
    return posts.filter((post)=>post.featuredSlot).sort((left, right)=>{
        const leftIndex = slotOrder.indexOf(left.featuredSlot ?? "");
        const rightIndex = slotOrder.indexOf(right.featuredSlot ?? "");
        if (leftIndex === rightIndex) {
            return comparePostsNewestFirst(left, right);
        }
        return leftIndex - rightIndex;
    });
}
function getHomeBlogPosts(posts) {
    return posts.filter((post)=>post.featuredOnHome).sort(comparePostsNewestFirst).slice(0, 4);
}
function getVisibleBlogPosts(options) {
    const { posts, categoryId = "all", limit, excludeSlugs = [] } = options;
    const blockedSlugs = new Set(excludeSlugs);
    const visiblePosts = posts.filter((post)=>{
        if (blockedSlugs.has(post.slug)) {
            return false;
        }
        if (categoryId === "all") {
            return true;
        }
        return post.category?.id === categoryId;
    }).sort(comparePostsNewestFirst);
    return typeof limit === "number" ? visiblePosts.slice(0, limit) : visiblePosts;
}
function buildResourcesBlogLayout(posts) {
    const featuredPosts = getFeaturedBlogPosts(posts);
    const allPostsNewestFirst = getVisibleBlogPosts({
        posts,
        categoryId: "all"
    });
    const explicitHeroPost = featuredPosts.find((post)=>post.featuredSlot === "hero");
    const heroPost = explicitHeroPost ?? allPostsNewestFirst[0] ?? null;
    const prioritizedTopRailPosts = featuredPosts.filter((post)=>post.slug !== heroPost?.slug);
    const fallbackTopRailPosts = allPostsNewestFirst.filter((post)=>post.slug !== heroPost?.slug);
    const topRailPosts = Array.from(new Map([
        ...prioritizedTopRailPosts,
        ...fallbackTopRailPosts
    ].map((post)=>[
            post.slug,
            post
        ])).values()).slice(0, 3);
    return {
        heroPost,
        topRailPosts,
        topSectionSlugs: heroPost ? [
            heroPost.slug,
            ...topRailPosts.map((post)=>post.slug)
        ] : []
    };
}
function getRelatedBlogPosts(currentPost, posts) {
    if (currentPost.relatedSlugs.length) {
        return currentPost.relatedSlugs.map((slug)=>posts.find((post)=>post.slug === slug)).filter((post)=>Boolean(post)).slice(0, 3);
    }
    return posts.filter((post)=>post.slug !== currentPost.slug && post.category?.id === currentPost.category?.id).sort(comparePostsNewestFirst).slice(0, 3);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ResourceArticlePage",
    ()=>ResourceArticlePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/lucide-react/dist/esm/icons/arrow-left.mjs [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/lucide-react/dist/esm/icons/calendar.mjs [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/lucide-react/dist/esm/icons/clock.mjs [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/lucide-react/dist/esm/icons/user.mjs [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/lucide-react/dist/esm/icons/heart.mjs [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$quote$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Quote$3e$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/lucide-react/dist/esm/icons/quote.mjs [app-client] (ecmascript) <export default as Quote>");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/lucide-react/dist/esm/icons/arrow-right.mjs [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/lucide-react/dist/esm/icons/phone.mjs [app-client] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/lucide-react/dist/esm/icons/mail.mjs [app-client] (ecmascript) <export default as Mail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/lucide-react/dist/esm/icons/circle-check.mjs [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$components$2f$ErrorMessage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/components/ErrorMessage.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$components$2f$LoadBoundary$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/components/LoadBoundary.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$hooks$2f$useBlogPost$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/hooks/useBlogPost.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$hooks$2f$useBlogPosts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/hooks/useBlogPosts.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$hooks$2f$usePage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/hooks/usePage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$hooks$2f$useResolvedSeo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/hooks/useResolvedSeo.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/routes.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$blog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/utils/blog.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
'use client';
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
/* ── helpers ──────────────────────────────────────────── */ function formatBlogDate(date) {
    return new Intl.DateTimeFormat('en', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC'
    }).format(new Date(`${date}T00:00:00Z`));
}
function getAuthorInitials(name) {
    return name.split(' ').slice(0, 2).map((part)=>part[0]?.toUpperCase() ?? '').join('');
}
const CATEGORY_TAGS = {
    'business-setup': [
        'Registration',
        'Compliance',
        'Tanzania',
        'Business',
        'Licenses'
    ],
    operations: [
        'Efficiency',
        'Process',
        'Management',
        'Growth',
        'Strategy'
    ],
    compliance: [
        'Regulatory',
        'Legal',
        'Tax',
        'Reporting',
        'Governance'
    ]
};
function getTagsForCategory(categoryId, categoryLabel) {
    if (categoryId && CATEGORY_TAGS[categoryId]) return CATEGORY_TAGS[categoryId];
    if (categoryLabel) {
        const key = categoryLabel.toLowerCase().replace(/\s+/g, '-');
        if (CATEGORY_TAGS[key]) return CATEGORY_TAGS[key];
    }
    return [
        'Consulting',
        'Tanzania',
        'Business',
        'Growth',
        'Strategy'
    ];
}
/* ── sub-components ──────────────────────────────────── */ function AnimatedBackButton() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].a, {
        href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].resources,
        className: "inline-flex items-center gap-2 mb-8 text-sm font-semibold text-text-muted hover:text-accent transition-colors group",
        whileHover: {
            x: -4
        },
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 20
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                className: "w-4 h-4 transition-transform group-hover:-translate-x-0.5"
            }, void 0, false, {
                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            "Back to Resources"
        ]
    }, void 0, true, {
        fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
        lineNumber: 72,
        columnNumber: 5
    }, this);
}
_c = AnimatedBackButton;
function ShareButtons({ title }) {
    _s();
    const [copied, setCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleCopy = ()=>{
        navigator.clipboard.writeText(window.location.href).then(()=>{
            setCopied(true);
            setTimeout(()=>setCopied(false), 2000);
        });
    };
    const shareUrl = ("TURBOPACK compile-time truthy", 1) ? window.location.href : "TURBOPACK unreachable";
    const encodedTitle = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(shareUrl);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "w-9 h-9 rounded-full border border-border-soft flex items-center justify-center text-text-muted hover:text-accent hover:border-accent/30 transition-colors",
                "aria-label": "Share on X",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-3.5 h-3.5",
                    fill: "currentColor",
                    viewBox: "0 0 24 24",
                    "aria-hidden": "true",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                    }, void 0, false, {
                        fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                        lineNumber: 108,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                    lineNumber: 107,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                lineNumber: 100,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "w-9 h-9 rounded-full border border-border-soft flex items-center justify-center text-text-muted hover:text-accent hover:border-accent/30 transition-colors",
                "aria-label": "Share on LinkedIn",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-3.5 h-3.5",
                    fill: "currentColor",
                    viewBox: "0 0 24 24",
                    "aria-hidden": "true",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                    }, void 0, false, {
                        fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                        lineNumber: 119,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                    lineNumber: 118,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handleCopy,
                className: "w-9 h-9 rounded-full border border-border-soft flex items-center justify-center text-text-muted hover:text-accent hover:border-accent/30 transition-colors",
                "aria-label": "Copy link",
                children: copied ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                    className: "w-3.5 h-3.5 text-accent"
                }, void 0, false, {
                    fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                    lineNumber: 128,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-3.5 h-3.5",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: 2,
                    viewBox: "0 0 24 24",
                    "aria-hidden": "true",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    }, void 0, false, {
                        fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                        lineNumber: 131,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                    lineNumber: 130,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                lineNumber: 122,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
        lineNumber: 99,
        columnNumber: 5
    }, this);
}
_s(ShareButtons, "NE86rL3vg4NVcTTWDavsT0hUBJs=");
_c1 = ShareButtons;
function LikeButton() {
    _s1();
    const [liked, setLiked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: ()=>setLiked(!liked),
        className: "flex items-center gap-1 text-text-muted hover:text-red-500 transition-colors",
        "aria-label": liked ? 'Unlike' : 'Like',
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
            className: `w-3.5 h-3.5 ${liked ? 'fill-red-500 text-red-500' : ''}`
        }, void 0, false, {
            fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
            lineNumber: 147,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
        lineNumber: 142,
        columnNumber: 5
    }, this);
}
_s1(LikeButton, "5oFMLl0KA2P+7Df5hTCAaQ+yYE8=");
_c2 = LikeButton;
function NewsletterBox() {
    _s2();
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [submitted, setSubmitted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleSubmit = (e)=>{
        e.preventDefault();
        if (email.trim()) {
            setSubmitted(true);
            setTimeout(()=>{
                setSubmitted(false);
                setEmail('');
            }, 3000);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-5 rounded-2xl border border-border-soft bg-surface",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 mb-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"], {
                        className: "w-4 h-4 text-accent"
                    }, void 0, false, {
                        fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                        lineNumber: 170,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-sm font-semibold text-text",
                        children: "Newsletter"
                    }, void 0, false, {
                        fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                        lineNumber: 171,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                lineNumber: 169,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-text-muted mb-3",
                children: "Get business insights delivered to your inbox."
            }, void 0, false, {
                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                lineNumber: 173,
                columnNumber: 7
            }, this),
            submitted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 text-xs text-accent font-medium",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                        className: "w-3.5 h-3.5"
                    }, void 0, false, {
                        fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                        lineNumber: 176,
                        columnNumber: 11
                    }, this),
                    "Subscribed!"
                ]
            }, void 0, true, {
                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                lineNumber: 175,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit,
                className: "flex gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "email",
                        value: email,
                        onChange: (e)=>setEmail(e.target.value),
                        placeholder: "Your email",
                        required: true,
                        className: "flex-1 min-w-0 h-9 px-3 text-xs rounded-lg border border-border-soft bg-page text-text placeholder:text-text-soft focus:outline-none focus:ring-1 focus:ring-accent/30"
                    }, void 0, false, {
                        fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                        lineNumber: 181,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        className: "h-9 px-3 rounded-lg bg-accent text-accent-contrast text-xs font-semibold hover:bg-accent-hover transition-colors shrink-0",
                        children: "Subscribe"
                    }, void 0, false, {
                        fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                        lineNumber: 189,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                lineNumber: 180,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
        lineNumber: 168,
        columnNumber: 5
    }, this);
}
_s2(NewsletterBox, "77YcRx86nYJXLJuPvA7ar5BPIqU=");
_c3 = NewsletterBox;
function ResourceArticlePage({ slug }) {
    _s3();
    const { data: post, isPending, error } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$hooks$2f$useBlogPost$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBlogPost"])(slug);
    const { data: posts = [] } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$hooks$2f$useBlogPosts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBlogPosts"])();
    const { data: resourcesPage } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$hooks$2f$usePage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePage"])('resources');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$hooks$2f$useResolvedSeo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useResolvedBlogSeo"])(post);
    const hasArticleBody = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$blog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasUsableBlogBody"])(post?.content);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$components$2f$LoadBoundary$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LoadBoundary"], {
        error: error,
        errorDetail: "This article could not be loaded right now.",
        errorTitle: "Unable to load the article.",
        isPending: isPending,
        isReady: Boolean(post),
        loadingLabel: "Loading article...",
        children: ()=>{
            if (!post) return null;
            return hasArticleBody ? (()=>{
                const article = post.content;
                if (!article) return null;
                const articleHtml = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$blog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRenderableBlogHtml"])(article);
                const articleSections = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$blog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRenderableBlogSections"])(post);
                const introText = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$blog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBlogArticleIntro"])(post);
                const categoryLabel = post.category?.label;
                const categoryId = post.category?.id;
                const relatedPosts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$blog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRelatedBlogPosts"])(post, posts);
                const tags = getTagsForCategory(categoryId, categoryLabel);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "bg-[linear-gradient(180deg,var(--color-surface)_0%,var(--color-page)_100%)]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "container max-w-6xl py-8 md:py-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AnimatedBackButton, {}, void 0, false, {
                                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                lineNumber: 241,
                                columnNumber: 19
                            }, this),
                            categoryLabel ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-block px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border bg-accent-soft text-accent border-accent/20 mb-4",
                                children: categoryLabel
                            }, void 0, false, {
                                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                lineNumber: 245,
                                columnNumber: 21
                            }, this) : null,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-2xl sm:text-3xl lg:text-4xl font-bold text-text leading-tight mb-4",
                                children: post.title
                            }, void 0, false, {
                                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                lineNumber: 251,
                                columnNumber: 19
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-text-muted mb-8",
                                children: [
                                    post.author ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-flex items-center gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                className: "w-3.5 h-3.5"
                                            }, void 0, false, {
                                                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                lineNumber: 259,
                                                columnNumber: 25
                                            }, this),
                                            post.author.name
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                        lineNumber: 258,
                                        columnNumber: 23
                                    }, this) : null,
                                    categoryLabel ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-flex items-center gap-1.5",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "px-2 py-0.5 rounded-full bg-accent-soft text-accent text-[10px] font-bold uppercase tracking-wider",
                                            children: categoryLabel
                                        }, void 0, false, {
                                            fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                            lineNumber: 265,
                                            columnNumber: 25
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                        lineNumber: 264,
                                        columnNumber: 23
                                    }, this) : null,
                                    post.readTimeMinutes ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-flex items-center gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                className: "w-3.5 h-3.5"
                                            }, void 0, false, {
                                                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                lineNumber: 272,
                                                columnNumber: 25
                                            }, this),
                                            post.readTimeMinutes,
                                            " min read"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                        lineNumber: 271,
                                        columnNumber: 23
                                    }, this) : null,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-flex items-center gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                className: "w-3.5 h-3.5"
                                            }, void 0, false, {
                                                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                lineNumber: 277,
                                                columnNumber: 23
                                            }, this),
                                            formatBlogDate(post.publishedAt)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                        lineNumber: 276,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ml-auto",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LikeButton, {}, void 0, false, {
                                            fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                            lineNumber: 281,
                                            columnNumber: 23
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                        lineNumber: 280,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                lineNumber: 256,
                                columnNumber: 19
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative rounded-2xl overflow-hidden mb-10 h-[250px] sm:h-[350px] lg:h-[450px] after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/10 after:to-transparent after:pointer-events-none",
                                children: post.coverImageSrc ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    className: "w-full h-full object-cover",
                                    src: post.coverImageSrc,
                                    alt: post.coverAlt ?? post.title
                                }, void 0, false, {
                                    fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                    lineNumber: 288,
                                    columnNumber: 23
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-full h-full bg-gradient-to-br from-accent/20 via-accent-soft to-surface flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xl sm:text-2xl font-bold text-accent/60 text-center px-4",
                                        children: post.mediaLabel || post.title
                                    }, void 0, false, {
                                        fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                        lineNumber: 295,
                                        columnNumber: 25
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                    lineNumber: 294,
                                    columnNumber: 23
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                lineNumber: 286,
                                columnNumber: 19
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid gap-10 lg:grid-cols-[2fr_1fr]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            introText ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-base sm:text-lg text-text/85 font-medium leading-relaxed mb-6",
                                                children: introText
                                            }, void 0, false, {
                                                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                lineNumber: 308,
                                                columnNumber: 25
                                            }, this) : null,
                                            articleHtml ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                                className: [
                                                    /* h2 */ '[&_h2]:text-xl [&_h2]:sm:text-2xl [&_h2]:font-semibold [&_h2]:text-text [&_h2]:mt-10 [&_h2]:mb-4',
                                                    /* h3 */ '[&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-text [&_h3]:mt-8 [&_h3]:mb-3',
                                                    /* p */ '[&_p]:text-sm [&_p]:sm:text-base [&_p]:text-text-muted [&_p]:leading-relaxed [&_p]:mb-4',
                                                    /* ul */ '[&_ul]:mb-4 [&_ul]:pl-5 [&_ul]:space-y-1.5',
                                                    '[&_ul_li]:text-sm [&_ul_li]:sm:text-base [&_ul_li]:text-text-muted [&_ul_li]:leading-relaxed',
                                                    '[&_ul_li]:marker:text-accent',
                                                    /* ol */ '[&_ol]:mb-4 [&_ol]:pl-5 [&_ol]:space-y-1.5',
                                                    '[&_ol_li]:text-sm [&_ol_li]:sm:text-base [&_ol_li]:text-text-muted [&_ol_li]:leading-relaxed',
                                                    '[&_ol_li]:marker:text-accent [&_ol_li]:marker:font-semibold',
                                                    /* blockquote */ '[&_blockquote]:my-8 [&_blockquote]:p-5 [&_blockquote]:sm:p-6 [&_blockquote]:rounded-xl [&_blockquote]:bg-accent/[0.04] [&_blockquote]:border [&_blockquote]:border-accent/15 [&_blockquote]:relative',
                                                    '[&_blockquote_p]:text-sm [&_blockquote_p]:sm:text-base [&_blockquote_p]:text-text-muted [&_blockquote_p]:italic [&_blockquote_p]:leading-relaxed [&_blockquote_p]:mb-0',
                                                    /* strong */ '[&_strong]:text-text [&_strong]:font-semibold',
                                                    /* a */ '[&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:text-accent-hover [&_a]:transition-colors',
                                                    /* img */ '[&_img]:rounded-xl [&_img]:my-6 [&_img]:w-full'
                                                ].join(' '),
                                                dangerouslySetInnerHTML: {
                                                    __html: articleHtml
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                lineNumber: 315,
                                                columnNumber: 25
                                            }, this) : articleSections.map((section)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                            className: "text-xl sm:text-2xl font-semibold text-text mt-10 mb-4",
                                                            children: section.heading
                                                        }, void 0, false, {
                                                            fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                            lineNumber: 346,
                                                            columnNumber: 29
                                                        }, this),
                                                        section.paragraphs.map((paragraph, idx)=>{
                                                            const isLead = idx === 0 && section === articleSections[0];
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: isLead ? 'text-base sm:text-lg text-text/85 font-medium leading-relaxed mb-4' : 'text-sm sm:text-base text-text-muted leading-relaxed mb-4',
                                                                children: paragraph
                                                            }, paragraph, false, {
                                                                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                                lineNumber: 352,
                                                                columnNumber: 33
                                                            }, this);
                                                        })
                                                    ]
                                                }, section.heading, true, {
                                                    fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                    lineNumber: 345,
                                                    columnNumber: 27
                                                }, this)),
                                            post.author ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-10 pt-8 border-t border-border-soft",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-4",
                                                    children: [
                                                        post.author.avatarSrc ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                            src: post.author.avatarSrc,
                                                            alt: post.author.name,
                                                            className: "w-12 h-12 rounded-full object-cover"
                                                        }, void 0, false, {
                                                            fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                            lineNumber: 373,
                                                            columnNumber: 31
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "flex items-center justify-center w-12 h-12 rounded-full bg-accent-soft text-accent font-bold text-lg",
                                                            "aria-hidden": "true",
                                                            children: getAuthorInitials(post.author.name)
                                                        }, void 0, false, {
                                                            fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                            lineNumber: 379,
                                                            columnNumber: 31
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                    className: "block text-text font-semibold",
                                                                    children: post.author.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                                    lineNumber: 384,
                                                                    columnNumber: 31
                                                                }, this),
                                                                post.author.role ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-sm text-text-muted",
                                                                    children: post.author.role
                                                                }, void 0, false, {
                                                                    fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                                    lineNumber: 386,
                                                                    columnNumber: 33
                                                                }, this) : null,
                                                                post.author.bio ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-text-soft mt-1 line-clamp-2",
                                                                    children: post.author.bio
                                                                }, void 0, false, {
                                                                    fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                                    lineNumber: 389,
                                                                    columnNumber: 33
                                                                }, this) : null
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                            lineNumber: 383,
                                                            columnNumber: 29
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                    lineNumber: 371,
                                                    columnNumber: 27
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                lineNumber: 370,
                                                columnNumber: 25
                                            }, this) : null
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                        lineNumber: 305,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                                        className: "lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto sidebar-scroll space-y-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-xs font-bold uppercase tracking-wider text-text-soft mb-3",
                                                        children: "Share on Social"
                                                    }, void 0, false, {
                                                        fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                        lineNumber: 401,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ShareButtons, {
                                                        title: post.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                        lineNumber: 404,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                lineNumber: 400,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-xs font-bold uppercase tracking-wider text-text-soft mb-3",
                                                        children: "Tags"
                                                    }, void 0, false, {
                                                        fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                        lineNumber: 409,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-wrap gap-2",
                                                        children: tags.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "px-2.5 py-1 rounded-full text-[11px] font-semibold bg-accent-soft text-accent border border-accent/10",
                                                                children: tag
                                                            }, tag, false, {
                                                                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                                lineNumber: 414,
                                                                columnNumber: 29
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                        lineNumber: 412,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                lineNumber: 408,
                                                columnNumber: 23
                                            }, this),
                                            relatedPosts.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-xs font-bold uppercase tracking-wider text-text-soft mb-3",
                                                        children: "Related Articles"
                                                    }, void 0, false, {
                                                        fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                        lineNumber: 427,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-3",
                                                        children: relatedPosts.map((relatedPost)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                href: (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resourceArticlePath"])(relatedPost.slug),
                                                                className: "flex gap-3 group rounded-xl p-2 -m-2 hover:bg-accent-soft/50 transition-colors",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "w-[70px] h-[60px] rounded-lg overflow-hidden shrink-0 bg-accent-soft/50",
                                                                        children: relatedPost.coverImageSrc ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                            src: relatedPost.coverImageSrc,
                                                                            alt: relatedPost.coverAlt ?? relatedPost.title,
                                                                            className: "w-full h-full object-cover"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                                            lineNumber: 439,
                                                                            columnNumber: 37
                                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "w-full h-full flex items-center justify-center text-accent/40 text-xs font-bold",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$quote$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Quote$3e$__["Quote"], {
                                                                                className: "w-4 h-4"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                                                lineNumber: 446,
                                                                                columnNumber: 39
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                                            lineNumber: 445,
                                                                            columnNumber: 37
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                                        lineNumber: 437,
                                                                        columnNumber: 33
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "min-w-0",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                                className: "text-sm font-semibold text-text leading-snug line-clamp-2 group-hover:text-accent transition-colors",
                                                                                children: relatedPost.title
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                                                lineNumber: 451,
                                                                                columnNumber: 35
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-[11px] text-text-soft mt-1 block",
                                                                                children: formatBlogDate(relatedPost.publishedAt)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                                                lineNumber: 454,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                                        lineNumber: 450,
                                                                        columnNumber: 33
                                                                    }, this)
                                                                ]
                                                            }, relatedPost.slug, true, {
                                                                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                                lineNumber: 432,
                                                                columnNumber: 31
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                        lineNumber: 430,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                lineNumber: 426,
                                                columnNumber: 25
                                            }, this) : null,
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NewsletterBox, {}, void 0, false, {
                                                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                lineNumber: 465,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                        lineNumber: 398,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                lineNumber: 303,
                                columnNumber: 19
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-16 rounded-3xl overflow-hidden min-h-[260px] sm:min-h-[300px] relative flex items-center bg-gradient-to-r from-[hsl(185,60%,26%)] via-[hsl(185,60%,26%)]/80 to-[hsl(185,60%,26%)]/40",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative z-10 px-8 py-12 sm:px-12 sm:py-16 max-w-2xl",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-2xl sm:text-3xl font-bold text-white mb-3",
                                            children: "Need Expert Business Guidance?"
                                        }, void 0, false, {
                                            fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                            lineNumber: 472,
                                            columnNumber: 23
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-white/80 text-sm sm:text-base leading-relaxed mb-6",
                                            children: "Our team of experienced consultants is ready to help you navigate Tanzania's business landscape with confidence and clarity."
                                        }, void 0, false, {
                                            fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                            lineNumber: 475,
                                            columnNumber: 23
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].contact,
                                                    className: "inline-flex items-center gap-2 h-11 px-6 rounded-full bg-white text-[hsl(185,60%,26%)] font-bold text-sm hover:bg-white/90 transition-colors",
                                                    children: [
                                                        "Contact Us",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                            className: "w-4 h-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                            lineNumber: 485,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                    lineNumber: 480,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: "tel:+255222700061",
                                                    className: "inline-flex items-center gap-2 h-11 px-6 rounded-full border-2 border-white/30 text-white font-bold text-sm hover:bg-white/10 transition-colors",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                                            className: "w-4 h-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                            lineNumber: 491,
                                                            columnNumber: 27
                                                        }, this),
                                                        "Call Us Now"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                    lineNumber: 487,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                            lineNumber: 479,
                                            columnNumber: 23
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                    lineNumber: 471,
                                    columnNumber: 21
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                lineNumber: 470,
                                columnNumber: 19
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                        lineNumber: 239,
                        columnNumber: 17
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                    lineNumber: 238,
                    columnNumber: 15
                }, this);
            })() : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$components$2f$ErrorMessage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorMessage"], {
                detail: "This article is missing its published body content.",
                title: "Article content is unavailable."
            }, void 0, false, {
                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                lineNumber: 502,
                columnNumber: 11
            }, this);
        }
    }, void 0, false, {
        fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
        lineNumber: 215,
        columnNumber: 5
    }, this);
}
_s3(ResourceArticlePage, "lkfjxu2P2PZv7Io0TX0zEjAtz+I=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$hooks$2f$useBlogPost$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBlogPost"],
        __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$hooks$2f$useBlogPosts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBlogPosts"],
        __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$hooks$2f$usePage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePage"],
        __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$hooks$2f$useResolvedSeo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useResolvedBlogSeo"]
    ];
});
_c4 = ResourceArticlePage;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "AnimatedBackButton");
__turbopack_context__.k.register(_c1, "ShareButtons");
__turbopack_context__.k.register(_c2, "LikeButton");
__turbopack_context__.k.register(_c3, "NewsletterBox");
__turbopack_context__.k.register(_c4, "ResourceArticlePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=joyful-journey_src_exxonim_0jua_or._.js.map