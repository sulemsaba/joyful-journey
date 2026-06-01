module.exports = [
"[project]/joyful-journey/src/exxonim/components/Breadcrumb.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Breadcrumb",
    ()=>Breadcrumb
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/lucide-react/dist/esm/icons/chevron-right.mjs [app-ssr] (ecmascript) <export default as ChevronRight>");
;
;
function Breadcrumb({ items }) {
    if (!items.length) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        "aria-label": "Breadcrumb",
        className: "py-3",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
            className: "flex items-center flex-wrap gap-1 text-sm",
            children: items.map((item, index)=>{
                const isLast = index === items.length - 1;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                    className: "flex items-center gap-1",
                    children: [
                        index > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                            className: "w-3.5 h-3.5 text-text-muted shrink-0",
                            "aria-hidden": "true"
                        }, void 0, false, {
                            fileName: "[project]/joyful-journey/src/exxonim/components/Breadcrumb.tsx",
                            lineNumber: 41,
                            columnNumber: 17
                        }, this),
                        isLast || !item.href ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-text font-medium",
                            "aria-current": isLast ? "page" : undefined,
                            children: item.label
                        }, void 0, false, {
                            fileName: "[project]/joyful-journey/src/exxonim/components/Breadcrumb.tsx",
                            lineNumber: 48,
                            columnNumber: 17
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: item.href,
                            className: "text-text-muted hover:text-accent transition-colors",
                            children: item.label
                        }, void 0, false, {
                            fileName: "[project]/joyful-journey/src/exxonim/components/Breadcrumb.tsx",
                            lineNumber: 55,
                            columnNumber: 17
                        }, this)
                    ]
                }, index, true, {
                    fileName: "[project]/joyful-journey/src/exxonim/components/Breadcrumb.tsx",
                    lineNumber: 39,
                    columnNumber: 13
                }, this);
            })
        }, void 0, false, {
            fileName: "[project]/joyful-journey/src/exxonim/components/Breadcrumb.tsx",
            lineNumber: 34,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/joyful-journey/src/exxonim/components/Breadcrumb.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
}),
"[project]/joyful-journey/src/exxonim/components/ErrorMessage.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ErrorMessage",
    ()=>ErrorMessage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function ErrorMessage({ title = "Unable to load content.", detail = "This content is unavailable right now. Please try again in a moment.", compact = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: compact ? "rounded-xl border border-border-soft bg-page p-4" : "rounded-2xl border border-border-soft bg-page p-8 text-center",
        role: "alert",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm font-semibold text-text",
                children: title
            }, void 0, false, {
                fileName: "[project]/joyful-journey/src/exxonim/components/ErrorMessage.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
}),
"[project]/joyful-journey/src/exxonim/components/LoadBoundary.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LoadBoundary",
    ()=>LoadBoundary
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$components$2f$ErrorMessage$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/components/ErrorMessage.tsx [app-ssr] (ecmascript)");
;
;
function ContentSkeleton({ label, variant }) {
    const isSection = variant === "section";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: [
            "grid border border-border-soft animate-pulse bg-surface-elevated",
            isSection ? "gap-4 min-h-[15rem] p-5 rounded-[1.35rem] w-full" : "gap-6 min-h-[clamp(24rem,48vh,34rem)] p-8 rounded-[1.8rem] w-[min(1180px,calc(100%-2rem))] mx-auto mt-6"
        ].join(" "),
        role: "status",
        "aria-live": "polite",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-4 w-28 rounded-full bg-accent-soft"
                    }, void 0, false, {
                        fileName: "[project]/joyful-journey/src/exxonim/components/LoadBoundary.tsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-11 w-[min(30rem,88%)] rounded-full bg-accent-soft"
                    }, void 0, false, {
                        fileName: "[project]/joyful-journey/src/exxonim/components/LoadBoundary.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-4 w-[min(36rem,100%)] rounded-full bg-accent-soft"
                    }, void 0, false, {
                        fileName: "[project]/joyful-journey/src/exxonim/components/LoadBoundary.tsx",
                        lineNumber: 40,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-3 gap-4",
                "aria-hidden": "true",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-h-[9rem] rounded-[1.25rem] bg-accent-soft/70 border border-accent-soft/50"
                    }, void 0, false, {
                        fileName: "[project]/joyful-journey/src/exxonim/components/LoadBoundary.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-h-[9rem] rounded-[1.25rem] bg-accent-soft/70 border border-accent-soft/50"
                    }, void 0, false, {
                        fileName: "[project]/joyful-journey/src/exxonim/components/LoadBoundary.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
function LoadBoundary({ children, error, errorDetail = "This section could not be loaded right now. Please try again in a moment.", errorTitle = "Unable to load content.", isPending, isReady = true, loadingLabel = "Loading content...", variant = "page" }) {
    if (isPending && !isReady) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ContentSkeleton, {
            label: loadingLabel,
            variant: variant
        }, void 0, false, {
            fileName: "[project]/joyful-journey/src/exxonim/components/LoadBoundary.tsx",
            lineNumber: 64,
            columnNumber: 12
        }, this);
    }
    if (isReady) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: typeof children === "function" ? children() : children
        }, void 0, false);
    }
    if (error || !isReady) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$components$2f$ErrorMessage$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ErrorMessage"], {
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
}),
"[project]/joyful-journey/src/exxonim/components/NewsletterSection.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NewsletterSection",
    ()=>NewsletterSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/lucide-react/dist/esm/icons/mail.mjs [app-ssr] (ecmascript) <export default as Mail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/lucide-react/dist/esm/icons/arrow-right.mjs [app-ssr] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/lucide-react/dist/esm/icons/circle-check.mjs [app-ssr] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/lucide-react/dist/esm/icons/sparkles.mjs [app-ssr] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$components$2f$primitives$2f$Container$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/components/primitives/Container.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function NewsletterSection() {
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [submitted, setSubmitted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleSubmit = (e)=>{
        e.preventDefault();
        if (!email.trim()) return;
        setSubmitted(true);
    };
    const handleReset = ()=>{
        setEmail('');
        setSubmitted(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        "aria-label": "Newsletter subscription",
        className: "py-10 md:py-16",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$components$2f$primitives$2f$Container$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Container"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative overflow-hidden border border-border-soft sm:rounded-[2rem] rounded-2xl sm:p-8 md:p-12 p-5 bg-[radial-gradient(circle_at_50%_0%,var(--color-accent-soft-strong),transparent_55%),linear-gradient(180deg,var(--color-surface-soft),var(--color-surface))] sm:bg-[radial-gradient(circle_at_50%_30%,var(--color-accent-soft-strong),transparent_50%),linear-gradient(180deg,var(--color-surface-soft),var(--color-surface))] ",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        "aria-hidden": "true",
                        className: "pointer-events-none absolute -left-10 -top-10 hidden h-40 w-40 rounded-full bg-accent/5 sm:block"
                    }, void 0, false, {
                        fileName: "[project]/joyful-journey/src/exxonim/components/NewsletterSection.tsx",
                        lineNumber: 42,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        "aria-hidden": "true",
                        className: "pointer-events-none absolute -bottom-12 -right-12 hidden h-48 w-48 rounded-full bg-accent/5 sm:block"
                    }, void 0, false, {
                        fileName: "[project]/joyful-journey/src/exxonim/components/NewsletterSection.tsx",
                        lineNumber: 46,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        "aria-hidden": "true",
                        className: "pointer-events-none absolute bottom-16 left-12 hidden h-20 w-20 rounded-full bg-accent/3 sm:block"
                    }, void 0, false, {
                        fileName: "[project]/joyful-journey/src/exxonim/components/NewsletterSection.tsx",
                        lineNumber: 50,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-4 sm:hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-flex items-center gap-1 text-[0.65rem] font-extrabold uppercase tracking-[0.14em] text-accent",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                className: "h-3 w-3",
                                                "aria-hidden": "true"
                                            }, void 0, false, {
                                                fileName: "[project]/joyful-journey/src/exxonim/components/NewsletterSection.tsx",
                                                lineNumber: 60,
                                                columnNumber: 17
                                            }, this),
                                            "Stay Updated"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/joyful-journey/src/exxonim/components/NewsletterSection.tsx",
                                        lineNumber: 59,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-semibold leading-tight text-text",
                                        children: "Get the latest from Exxonim"
                                    }, void 0, false, {
                                        fileName: "[project]/joyful-journey/src/exxonim/components/NewsletterSection.tsx",
                                        lineNumber: 63,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs leading-relaxed text-text-muted",
                                        children: "Business insights, regulatory updates, and compliance tips delivered to your inbox."
                                    }, void 0, false, {
                                        fileName: "[project]/joyful-journey/src/exxonim/components/NewsletterSection.tsx",
                                        lineNumber: 66,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/joyful-journey/src/exxonim/components/NewsletterSection.tsx",
                                lineNumber: 58,
                                columnNumber: 13
                            }, this),
                            submitted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-center gap-1.5 rounded-full bg-accent-soft py-2.5 text-accent",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                        className: "h-4 w-4",
                                        "aria-hidden": "true"
                                    }, void 0, false, {
                                        fileName: "[project]/joyful-journey/src/exxonim/components/NewsletterSection.tsx",
                                        lineNumber: 74,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-semibold",
                                        children: "Subscribed!"
                                    }, void 0, false, {
                                        fileName: "[project]/joyful-journey/src/exxonim/components/NewsletterSection.tsx",
                                        lineNumber: 75,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/joyful-journey/src/exxonim/components/NewsletterSection.tsx",
                                lineNumber: 73,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                onSubmit: handleSubmit,
                                className: "grid gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "newsletter-email-mobile",
                                        className: "sr-only",
                                        children: "Email address"
                                    }, void 0, false, {
                                        fileName: "[project]/joyful-journey/src/exxonim/components/NewsletterSection.tsx",
                                        lineNumber: 79,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"], {
                                                className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-soft",
                                                "aria-hidden": "true"
                                            }, void 0, false, {
                                                fileName: "[project]/joyful-journey/src/exxonim/components/NewsletterSection.tsx",
                                                lineNumber: 83,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                id: "newsletter-email-mobile",
                                                type: "email",
                                                required: true,
                                                value: email,
                                                onChange: (e)=>setEmail(e.target.value),
                                                placeholder: "your@email.com",
                                                className: "h-11 w-full rounded-full border border-border-soft bg-surface pl-9 pr-4 text-sm text-text placeholder:text-text-soft focus:outline-none focus:ring-2 focus:ring-accent/40"
                                            }, void 0, false, {
                                                fileName: "[project]/joyful-journey/src/exxonim/components/NewsletterSection.tsx",
                                                lineNumber: 87,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/joyful-journey/src/exxonim/components/NewsletterSection.tsx",
                                        lineNumber: 82,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        className: "inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-extrabold text-accent-contrast transition-colors hover:bg-accent-hover",
                                        "aria-label": "Subscribe to newsletter",
                                        children: [
                                            "Subscribe",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                className: "h-4 w-4",
                                                "aria-hidden": "true"
                                            }, void 0, false, {
                                                fileName: "[project]/joyful-journey/src/exxonim/components/NewsletterSection.tsx",
                                                lineNumber: 103,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/joyful-journey/src/exxonim/components/NewsletterSection.tsx",
                                        lineNumber: 97,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/joyful-journey/src/exxonim/components/NewsletterSection.tsx",
                                lineNumber: 78,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/joyful-journey/src/exxonim/components/NewsletterSection.tsx",
                        lineNumber: 56,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden sm:block text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-accent",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                        className: "h-3.5 w-3.5",
                                        "aria-hidden": "true"
                                    }, void 0, false, {
                                        fileName: "[project]/joyful-journey/src/exxonim/components/NewsletterSection.tsx",
                                        lineNumber: 113,
                                        columnNumber: 15
                                    }, this),
                                    "Stay Updated"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/joyful-journey/src/exxonim/components/NewsletterSection.tsx",
                                lineNumber: 112,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "mt-3 text-[clamp(1.5rem,3vw,2rem)] font-semibold leading-tight tracking-tight text-text",
                                children: "Get the latest from Exxonim"
                            }, void 0, false, {
                                fileName: "[project]/joyful-journey/src/exxonim/components/NewsletterSection.tsx",
                                lineNumber: 118,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mx-auto mt-3 max-w-lg text-sm leading-relaxed text-text-muted",
                                children: "Business insights, regulatory updates, and practical compliance tips delivered to your inbox."
                            }, void 0, false, {
                                fileName: "[project]/joyful-journey/src/exxonim/components/NewsletterSection.tsx",
                                lineNumber: 123,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-6 flex items-center justify-center",
                                children: submitted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "inline-flex items-center gap-2 rounded-full bg-accent-soft px-5 py-2.5 text-sm font-semibold text-accent",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                    className: "h-5 w-5",
                                                    "aria-hidden": "true"
                                                }, void 0, false, {
                                                    fileName: "[project]/joyful-journey/src/exxonim/components/NewsletterSection.tsx",
                                                    lineNumber: 133,
                                                    columnNumber: 21
                                                }, this),
                                                "You're subscribed!"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/joyful-journey/src/exxonim/components/NewsletterSection.tsx",
                                            lineNumber: 132,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: handleReset,
                                            className: "text-xs text-text-soft underline-offset-2 hover:underline hover:text-accent transition-colors",
                                            children: "Use a different email"
                                        }, void 0, false, {
                                            fileName: "[project]/joyful-journey/src/exxonim/components/NewsletterSection.tsx",
                                            lineNumber: 136,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/joyful-journey/src/exxonim/components/NewsletterSection.tsx",
                                    lineNumber: 131,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                    onSubmit: handleSubmit,
                                    className: "flex w-full max-w-md items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "newsletter-email-desktop",
                                            className: "sr-only",
                                            children: "Email address"
                                        }, void 0, false, {
                                            fileName: "[project]/joyful-journey/src/exxonim/components/NewsletterSection.tsx",
                                            lineNumber: 149,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative flex-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"], {
                                                    className: "pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-text-soft",
                                                    "aria-hidden": "true"
                                                }, void 0, false, {
                                                    fileName: "[project]/joyful-journey/src/exxonim/components/NewsletterSection.tsx",
                                                    lineNumber: 153,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    id: "newsletter-email-desktop",
                                                    type: "email",
                                                    required: true,
                                                    value: email,
                                                    onChange: (e)=>setEmail(e.target.value),
                                                    placeholder: "your@email.com",
                                                    className: "h-12 w-full rounded-full border border-border-soft bg-surface pl-11 pr-4 text-sm text-text placeholder:text-text-soft focus:outline-none focus:ring-2 focus:ring-accent/40"
                                                }, void 0, false, {
                                                    fileName: "[project]/joyful-journey/src/exxonim/components/NewsletterSection.tsx",
                                                    lineNumber: 157,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/joyful-journey/src/exxonim/components/NewsletterSection.tsx",
                                            lineNumber: 152,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "submit",
                                            className: "inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-extrabold text-accent-contrast shadow-button transition-all hover:-translate-y-0.5 hover:bg-accent-hover",
                                            "aria-label": "Subscribe to newsletter",
                                            children: [
                                                "Subscribe",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                    className: "h-4 w-4",
                                                    "aria-hidden": "true"
                                                }, void 0, false, {
                                                    fileName: "[project]/joyful-journey/src/exxonim/components/NewsletterSection.tsx",
                                                    lineNumber: 173,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/joyful-journey/src/exxonim/components/NewsletterSection.tsx",
                                            lineNumber: 167,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/joyful-journey/src/exxonim/components/NewsletterSection.tsx",
                                    lineNumber: 145,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/joyful-journey/src/exxonim/components/NewsletterSection.tsx",
                                lineNumber: 129,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/joyful-journey/src/exxonim/components/NewsletterSection.tsx",
                        lineNumber: 110,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/joyful-journey/src/exxonim/components/NewsletterSection.tsx",
                lineNumber: 35,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/joyful-journey/src/exxonim/components/NewsletterSection.tsx",
            lineNumber: 33,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/joyful-journey/src/exxonim/components/NewsletterSection.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
}),
"[project]/joyful-journey/src/exxonim/services/blogService.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
(0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$staticFallbackService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["preloadStaticFallback"])("blog-posts");
(0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$staticFallbackService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["preloadStaticFallback"])("blog-categories");
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
    return __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackPublicContent$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fallbackBlogPosts"].find((post)=>post.slug === slug);
}
function mapPostsResponse(responseData) {
    if (Array.isArray(responseData)) {
        return responseData.map(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$contentMappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapBlogPost"]);
    }
    return responseData.items.map(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$contentMappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapBlogPost"]);
}
async function fetchFreshPublicBlogPosts() {
    const params = {
        page: 1,
        limit: 50,
        skip: 0
    };
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$app$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].get(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$shared$2f$api$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiRoutes"].public.blog.posts.list, {
        params
    });
    return mapPostsResponse(response.data);
}
function getCachedPublicBlogPosts() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$shared$2f$publicContentCache$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCachedPublicContent"])(BLOG_POSTS_CACHE_KEY, (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$staticFallbackService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getStaticFallback"])("blog-posts") ?? __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackPublicContent$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fallbackBlogPosts"]);
}
async function listPublicBlogPosts() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$shared$2f$publicContentCache$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchWithFallback"])({
        cacheKey: BLOG_POSTS_CACHE_KEY,
        fallbackValue: (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$staticFallbackService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getStaticFallback"])("blog-posts") ?? __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackPublicContent$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fallbackBlogPosts"],
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
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$shared$2f$publicContentCache$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchWithFallback"])({
        cacheKey: blogPostCacheKey(slug),
        fallbackValue: findFallbackBlogPost(slug),
        fetcher: async ()=>{
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$app$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].get(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$shared$2f$api$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiRoutes"].public.blog.posts.bySlug(slug));
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$contentMappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapBlogPost"])(response.data);
        },
        ttlMs: BLOG_POST_TTL_MS,
        validate: isBlogPostRecord,
        warningLabel: `Using cached or default blog article content for "${slug}".`
    });
}
function getCachedPublicBlogPostBySlug(slug) {
    const cachedPost = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$shared$2f$publicContentCache$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCachedPublicContent"])(blogPostCacheKey(slug));
    if (cachedPost) {
        return cachedPost;
    }
    const cachedPosts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$shared$2f$publicContentCache$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCachedPublicContent"])(BLOG_POSTS_CACHE_KEY, (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$staticFallbackService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getStaticFallback"])("blog-posts") ?? __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackPublicContent$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fallbackBlogPosts"]);
    const cachedCollectionMatch = cachedPosts?.find((post)=>post.slug === slug);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$shared$2f$publicContentCache$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCachedPublicContent"])(blogPostCacheKey(slug), cachedCollectionMatch ?? findFallbackBlogPost(slug));
}
async function fetchFreshPublicBlogCategories() {
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$app$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].get(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$shared$2f$api$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiRoutes"].public.blog.categories.list);
    return response.data.map((category)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$contentMappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapBlogCategory"])(category));
}
function getCachedPublicBlogCategories() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$shared$2f$publicContentCache$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCachedPublicContent"])(BLOG_CATEGORIES_CACHE_KEY, (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$staticFallbackService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getStaticFallback"])("blog-categories") ?? __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackPublicContent$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fallbackBlogCategories"]);
}
async function listPublicBlogCategories() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$shared$2f$publicContentCache$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchWithFallback"])({
        cacheKey: BLOG_CATEGORIES_CACHE_KEY,
        fallbackValue: (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$staticFallbackService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getStaticFallback"])("blog-categories") ?? __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackPublicContent$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fallbackBlogCategories"],
        fetcher: fetchFreshPublicBlogCategories,
        ttlMs: BLOG_CATEGORIES_TTL_MS,
        validate: isBlogCategoryCollection,
        warningLabel: "Using cached or default blog categories."
    });
}
}),
"[project]/joyful-journey/src/exxonim/hooks/useBlogPost.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useBlogPost",
    ()=>useBlogPost
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$blogService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/services/blogService.ts [app-ssr] (ecmascript)");
;
;
function useBlogPost(slug) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "blog",
            "post",
            slug
        ],
        queryFn: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$blogService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPublicBlogPostBySlug"])(slug),
        enabled: Boolean(slug),
        initialData: slug ? ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$blogService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCachedPublicBlogPostBySlug"])(slug) : undefined,
        refetchOnMount: "always",
        refetchOnReconnect: "always",
        staleTime: 1000 * 60 * 30,
        retry: (failureCount, error)=>{
            const status = error?.response?.status;
            if (status === 404) {
                return false;
            }
            return failureCount < 2;
        }
    });
}
}),
"[project]/joyful-journey/src/exxonim/hooks/useBlogPosts.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useBlogPosts",
    ()=>useBlogPosts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$blogService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/services/blogService.ts [app-ssr] (ecmascript)");
;
;
function useBlogPosts() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "blog",
            "posts"
        ],
        queryFn: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$blogService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["listPublicBlogPosts"],
        initialData: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$blogService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCachedPublicBlogPosts"],
        refetchOnMount: true,
        refetchOnReconnect: "always",
        staleTime: 1000 * 60 * 60
    });
}
}),
"[project]/joyful-journey/src/exxonim/services/pageService.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCachedPageBySlug",
    ()=>getCachedPageBySlug,
    "getPageBySlug",
    ()=>getPageBySlug
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
(0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$staticFallbackService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["preloadStaticFallback"])("pages");
const PAGE_TTL_MS = 1000 * 60 * 60 * 6;
function pageCacheKey(slug) {
    return `pages:${slug}`;
}
function isPageRecord(value) {
    return Boolean(value && typeof value.slug === "string");
}
async function fetchFreshPageBySlug(slug) {
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$app$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].get(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$shared$2f$api$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiRoutes"].public.pages.bySlug(slug));
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$contentMappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapPage"])(response.data);
}
function getCachedPageBySlug(slug) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$shared$2f$publicContentCache$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCachedPublicContent"])(pageCacheKey(slug), (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$staticFallbackService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getStaticFallback"])("pages") ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackPublicContent$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getFallbackPage"])(slug));
}
async function getPageBySlug(slug) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$shared$2f$publicContentCache$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchWithFallback"])({
        cacheKey: pageCacheKey(slug),
        fallbackValue: (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$staticFallbackService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getStaticFallback"])("pages") ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$content$2f$fallbackPublicContent$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getFallbackPage"])(slug),
        fetcher: ()=>fetchFreshPageBySlug(slug),
        ttlMs: PAGE_TTL_MS,
        validate: isPageRecord,
        warningLabel: `Using cached or default page content for "${slug}".`
    });
}
}),
"[project]/joyful-journey/src/exxonim/hooks/usePage.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePage",
    ()=>usePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$pageService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/services/pageService.ts [app-ssr] (ecmascript)");
;
;
function usePage(slug) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "pages",
            slug
        ],
        queryFn: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$pageService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPageBySlug"])(slug),
        initialData: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$pageService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCachedPageBySlug"])(slug),
        refetchOnMount: true,
        refetchOnReconnect: "always",
        staleTime: 1000 * 60 * 60
    });
}
}),
"[project]/joyful-journey/src/exxonim/hooks/useSiteSetting.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSiteSetting",
    ()=>useSiteSetting
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$siteSettingsService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/services/siteSettingsService.ts [app-ssr] (ecmascript)");
;
;
function useSiteSetting(key) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "site-settings",
            key
        ],
        queryFn: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$siteSettingsService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSiteSetting"])(key),
        initialData: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$services$2f$siteSettingsService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCachedSiteSetting"])(key),
        refetchOnMount: "always",
        refetchOnReconnect: "always",
        retry: (failureCount, error)=>{
            const status = error?.response?.status;
            if (status === 404) {
                return false;
            }
            return failureCount < 2;
        }
    });
}
}),
"[project]/joyful-journey/src/exxonim/seo/constants.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/joyful-journey/src/exxonim/seo/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildAbsoluteUrl",
    ()=>buildAbsoluteUrl,
    "escapeSeoValue",
    ()=>escapeSeoValue,
    "toCanonicalPath",
    ()=>toCanonicalPath
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/routes.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/seo/constants.ts [app-ssr] (ecmascript)");
;
;
function buildAbsoluteUrl(path, baseUrl = __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["siteOrigin"]) {
    return new URL(path, baseUrl).toString();
}
function toCanonicalPath(pathname) {
    const normalizedPathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizePathname"])(pathname);
    if (normalizedPathname === (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizePathname"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].home)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].home;
    }
    if (normalizedPathname === (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizePathname"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].notFound)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].notFound;
    }
    return `${normalizedPathname}/`;
}
function escapeHtmlAttribute(value) {
    return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function escapeSeoValue(value) {
    return escapeHtmlAttribute(value);
}
}),
"[project]/joyful-journey/src/exxonim/seo/apply-seo.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applyResolvedSeo",
    ()=>applyResolvedSeo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/seo/constants.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/seo/utils.ts [app-ssr] (ecmascript)");
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
    const canonicalUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildAbsoluteUrl"])(seo.canonicalPath, seo.canonicalBaseUrl ?? __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["siteOrigin"]);
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
}),
"[project]/joyful-journey/src/exxonim/seo/create-seo.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createBlogPostSeo",
    ()=>createBlogPostSeo,
    "createFallbackSeo",
    ()=>createFallbackSeo,
    "createPageSeo",
    ()=>createPageSeo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/routes.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/seo/constants.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/seo/utils.ts [app-ssr] (ecmascript)");
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
    const normalizedPathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizePathname"])(pathname);
    const canonicalBaseUrl = options.canonicalBaseUrl ?? __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["siteOrigin"];
    return {
        title: options.title ?? "Content unavailable",
        description: options.description ?? "This content is temporarily unavailable.",
        canonicalPath: (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toCanonicalPath"])(normalizedPathname),
        image: options.image ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDefaultShareImageUrl"])(canonicalBaseUrl),
        type: options.type ?? ((0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getResourcePostSlug"])(normalizedPathname) ? "article" : "website"),
        robots: options.robots ?? "noindex,follow",
        canonicalBaseUrl
    };
}
function createPageSeo(page, options) {
    const canonicalBaseUrl = options.canonicalBaseUrl ?? __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["siteOrigin"];
    return {
        title: titleWithBrand(page.metaTitle ?? page.title),
        description: page.metaDescription ?? options.defaultDescription ?? page.title,
        canonicalPath: options.canonicalPath,
        image: page.ogImageUrl ?? options.defaultImage ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDefaultShareImageUrl"])(canonicalBaseUrl),
        type: "website",
        robots: options.robots ?? "index,follow",
        canonicalBaseUrl
    };
}
function createBlogPostSeo(post, options = {}) {
    const canonicalBaseUrl = options.canonicalBaseUrl ?? __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["siteOrigin"];
    return {
        title: titleWithBrand(post.metaTitle ?? post.title),
        description: post.metaDescription ?? post.excerpt ?? options.defaultDescription ?? post.title,
        canonicalPath: (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resourceArticlePath"])(post.slug),
        image: post.coverImageSrc ?? options.defaultImage ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDefaultShareImageUrl"])(canonicalBaseUrl),
        type: "article",
        robots: options.robots ?? "index,follow",
        canonicalBaseUrl
    };
}
}),
"[project]/joyful-journey/src/exxonim/seo/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$apply$2d$seo$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/seo/apply-seo.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$create$2d$seo$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/seo/create-seo.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/seo/utils.ts [app-ssr] (ecmascript)");
;
;
;
;
}),
"[project]/joyful-journey/src/exxonim/hooks/useResolvedSeo.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useResolvedBlogSeo",
    ()=>useResolvedBlogSeo,
    "useResolvedPageSeo",
    ()=>useResolvedPageSeo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$hooks$2f$useSiteSetting$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/hooks/useSiteSetting.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/seo/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$apply$2d$seo$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/seo/apply-seo.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$create$2d$seo$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/seo/create-seo.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/seo/constants.ts [app-ssr] (ecmascript)");
;
;
;
function toRobots(value) {
    return value ? `${value.robotsIndex ? "index" : "noindex"},${value.robotsFollow ? "follow" : "nofollow"}` : "index,follow";
}
function toCanonicalBaseUrl(value) {
    return value?.canonicalBaseUrl ?? __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["siteOrigin"];
}
function toDefaultDescription(value) {
    return value?.defaultMetaDescription ?? undefined;
}
function toDefaultImage(value) {
    if (value?.defaultShareImageUrl) {
        return value.defaultShareImageUrl;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDefaultShareImageUrl"])(toCanonicalBaseUrl(value));
}
function useResolvedPageSeo(page, canonicalPath) {
    const { data: seoDefaultsSetting } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$hooks$2f$useSiteSetting$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiteSetting"])("seo_defaults");
    const seoDefaults = seoDefaultsSetting?.value;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!page) {
            return;
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$apply$2d$seo$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["applyResolvedSeo"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$create$2d$seo$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPageSeo"])(page, {
            canonicalPath,
            canonicalBaseUrl: toCanonicalBaseUrl(seoDefaults),
            defaultDescription: toDefaultDescription(seoDefaults),
            defaultImage: toDefaultImage(seoDefaults),
            robots: toRobots(seoDefaults)
        }));
    }, [
        canonicalPath,
        page,
        seoDefaults
    ]);
}
function useResolvedBlogSeo(post) {
    const { data: seoDefaultsSetting } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$hooks$2f$useSiteSetting$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiteSetting"])("seo_defaults");
    const seoDefaults = seoDefaultsSetting?.value;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!post) {
            return;
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$apply$2d$seo$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["applyResolvedSeo"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$create$2d$seo$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createBlogPostSeo"])(post, {
            canonicalBaseUrl: toCanonicalBaseUrl(seoDefaults),
            defaultDescription: toDefaultDescription(seoDefaults),
            defaultImage: toDefaultImage(seoDefaults),
            robots: toRobots(seoDefaults)
        }));
    }, [
        post,
        seoDefaults
    ]);
}
}),
"[project]/joyful-journey/src/exxonim/utils/blog.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ResourceArticlePage",
    ()=>ResourceArticlePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
/**
 * Resource Article Detail Page — Jotofa-inspired 2-column layout.
 *
 * LAYOUT:
 * ─────────
 * ┌───────────────────────────────────────────────────────────┐
 * │  ← Back to Resources                                      │
 * ├─────────────────────────────────────┬─────────────────────┤
 * │  MAIN (3fr)                         │  SIDEBAR (1fr)      │
 * │  [Category badge]                   │  Share on Social    │
 * │  Title (h1)                         │  [𝕏] [in] [🔗]     │
 * │  Meta: Author · Read · Date         │  ──────────────     │
 * │  ┌───────────────────────────────┐  │  Tags               │
 * │  │ Hero Image (rounded)          │  │  [pill] [pill] ...  │
 * │  └───────────────────────────────┘  │                     │
 * │  Article Body                       │                     │
 * │  • Lead paragraph                   │                     │
 * │  • H2 subheadings                   │                     │
 * │  • Bullet lists                     │                     │
 * │  • Pull quote blockquote            │                     │
 * │  Author Card                        │                     │
 * ├─────────────────────────────────────┴─────────────────────┤
 * │  RELATED ARTICLES (compact, 2-3 items, horizontal)        │
 * ├───────────────────────────────────────────────────────────┤
 * │  NEWSLETTER CARD (full-width, the one user liked)         │
 * ├───────────────────────────────────────────────────────────┤
 * │  CTA BANNER (compact, accent-tinted)                      │
 * └───────────────────────────────────────────────────────────┘
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$components$2f$Breadcrumb$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/components/Breadcrumb.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$components$2f$ErrorMessage$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/components/ErrorMessage.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$components$2f$LoadBoundary$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/components/LoadBoundary.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$components$2f$NewsletterSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/components/NewsletterSection.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$hooks$2f$useBlogPost$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/hooks/useBlogPost.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$hooks$2f$useBlogPosts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/hooks/useBlogPosts.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$hooks$2f$usePage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/hooks/usePage.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$hooks$2f$useResolvedSeo$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/hooks/useResolvedSeo.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/routes.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/seo/constants.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$blog$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/utils/blog.ts [app-ssr] (ecmascript)");
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
/** Renders BlogPosting JSON-LD structured data for Google rich results. */ function ArticleStructuredData({ post }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        image: post.coverImageSrc ? `${__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["siteOrigin"]}${post.coverImageSrc}` : undefined,
        datePublished: post.publishedAt,
        author: post.author ? {
            "@type": "Person",
            name: post.author.name,
            jobTitle: post.author.role
        } : undefined,
        publisher: {
            "@type": "Organization",
            name: "Exxonim Consult",
            url: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["siteOrigin"]
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["siteOrigin"]}/resources/${post.slug}/`
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("script", {
        type: "application/ld+json",
        dangerouslySetInnerHTML: {
            __html: JSON.stringify(schema)
        }
    }, void 0, false, {
        fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
        lineNumber: 72,
        columnNumber: 5
    }, this);
}
;
/* ── Helpers ── */ function formatBlogDate(date) {
    return new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC"
    }).format(new Date(`${date}T00:00:00Z`));
}
function getAuthorInitials(name) {
    return name.split(" ").slice(0, 2).map((part)=>part[0]?.toUpperCase() ?? "").join("");
}
/* ── Social Share Buttons ── */ function SocialShareButtons() {
    const [copied, setCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleCopyLink = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(()=>setCopied(false), 2000);
        } catch  {}
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex gap-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>{
                    const url = encodeURIComponent(window.location.href);
                    const text = encodeURIComponent(document.title);
                    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
                },
                className: "w-9 h-9 rounded-full border border-border-soft flex items-center justify-center text-text-muted hover:bg-accent-soft hover:border-accent/30 hover:text-accent transition-all duration-200",
                "aria-label": "Share on X",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-4 h-4",
                    viewBox: "0 0 24 24",
                    fill: "currentColor",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                    }, void 0, false, {
                        fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                        lineNumber: 131,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                    lineNumber: 130,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                lineNumber: 119,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>{
                    const url = encodeURIComponent(window.location.href);
                    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
                },
                className: "w-9 h-9 rounded-full border border-border-soft flex items-center justify-center text-text-muted hover:bg-accent-soft hover:border-accent/30 hover:text-accent transition-all duration-200",
                "aria-label": "Share on LinkedIn",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-4 h-4",
                    viewBox: "0 0 24 24",
                    fill: "currentColor",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                    }, void 0, false, {
                        fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                        lineNumber: 147,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                    lineNumber: 146,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                lineNumber: 136,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>{
                    const url = encodeURIComponent(window.location.href);
                    const text = encodeURIComponent(document.title);
                    window.open(`https://wa.me/?text=${text}%20${url}`, "_blank");
                },
                className: "w-9 h-9 rounded-full border border-border-soft flex items-center justify-center text-text-muted hover:bg-accent-soft hover:border-accent/30 hover:text-accent transition-all duration-200",
                "aria-label": "Share on WhatsApp",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-4 h-4",
                    viewBox: "0 0 24 24",
                    fill: "currentColor",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M12.01 2.014a9.96 9.96 0 0 0-8.52 15.11L2 22l4.985-1.465a9.961 9.961 0 1 0 5.025-18.52Zm0 18.067a8.093 8.093 0 0 1-4.14-1.134l-.297-.176-3.082.906.924-2.977-.193-.306A8.098 8.098 0 1 1 12.01 20.08Zm4.437-6.042c-.244-.122-1.439-.711-1.662-.793-.223-.081-.385-.122-.547.122-.162.244-.628.793-.77.955-.142.162-.284.183-.528.061-1.18-.56-2.072-1.1-2.884-2.522-.083-.146-.01-.223.111-.345.11-.11.244-.284.366-.427.122-.142.162-.244.244-.407.081-.162.041-.305-.02-.427-.061-.122-.547-1.32-.75-1.808-.198-.475-.399-.411-.547-.419-.142-.008-.305-.008-.468-.008-.162 0-.427.061-.65.305-.223.244-.852.833-.852 2.032s.873 2.358.995 2.522c.122.162 1.714 2.628 4.153 3.67.58.24 1.033.383 1.385.49.582.185 1.112.158 1.531.096.47-.07 1.439-.588 1.642-1.157.203-.569.203-1.056.142-1.157-.061-.101-.223-.162-.468-.284Z"
                    }, void 0, false, {
                        fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                        lineNumber: 164,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                    lineNumber: 163,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                lineNumber: 152,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handleCopyLink,
                className: "w-9 h-9 rounded-full border border-border-soft flex items-center justify-center text-text-muted hover:bg-accent-soft hover:border-accent/30 hover:text-accent transition-all duration-200",
                "aria-label": "Copy link",
                children: copied ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-4 h-4 text-accent",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M20 6L9 17l-5-5"
                    }, void 0, false, {
                        fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                        lineNumber: 178,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                    lineNumber: 177,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-4 h-4",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"
                        }, void 0, false, {
                            fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                            lineNumber: 182,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"
                        }, void 0, false, {
                            fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                            lineNumber: 183,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                    lineNumber: 181,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                lineNumber: 169,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
        lineNumber: 117,
        columnNumber: 5
    }, this);
}
/* ── Compact Related Articles ── */ function CompactRelatedArticles({ posts }) {
    if (!posts.length) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "mx-auto max-w-[1200px] px-4 sm:px-6 pb-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-sm font-semibold text-text-muted uppercase tracking-wider mb-4",
                children: "Continue reading"
            }, void 0, false, {
                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                lineNumber: 196,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
                children: posts.slice(0, 3).map((relatedPost)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resourceArticlePath"])(relatedPost.slug),
                        className: "group flex gap-3 p-3 rounded-xl border border-border-soft bg-surface/50 hover:bg-surface-elevated hover:border-accent/30 transition-all duration-200",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-[56px] h-[56px] rounded-lg overflow-hidden shrink-0 bg-accent/5",
                                children: relatedPost.coverImageSrc ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: relatedPost.coverImageSrc,
                                    alt: relatedPost.coverAlt ?? relatedPost.title,
                                    className: "w-full h-full object-cover",
                                    loading: "lazy"
                                }, void 0, false, {
                                    fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                    lineNumber: 209,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-full h-full flex items-center justify-center bg-[radial-gradient(circle,var(--color-accent-soft-strong),var(--color-page-strong))]",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "w-4 h-4 text-accent",
                                        viewBox: "0 0 24 24",
                                        fill: "none",
                                        stroke: "currentColor",
                                        strokeWidth: 1.5,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                                        }, void 0, false, {
                                            fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                            lineNumber: 218,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                        lineNumber: 217,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                    lineNumber: 216,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                lineNumber: 207,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "min-w-0 flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "text-sm font-medium text-text leading-snug mb-1 group-hover:text-accent transition-colors line-clamp-2",
                                        children: relatedPost.title
                                    }, void 0, false, {
                                        fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                        lineNumber: 224,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[11px] text-text-muted",
                                        children: [
                                            formatBlogDate(relatedPost.publishedAt),
                                            relatedPost.readTimeMinutes ? ` · ${relatedPost.readTimeMinutes} min` : ""
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                        lineNumber: 228,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                lineNumber: 223,
                                columnNumber: 13
                            }, this)
                        ]
                    }, relatedPost.slug, true, {
                        fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                        lineNumber: 201,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                lineNumber: 199,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
        lineNumber: 195,
        columnNumber: 5
    }, this);
}
/* ── Bottom CTA Banner (compact) ── */ function BottomCTABanner() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mx-auto max-w-[1200px] px-4 sm:px-6 pb-12",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative rounded-2xl overflow-hidden flex items-center px-6 sm:px-8 py-6 sm:py-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0 bg-gradient-to-r from-accent/[0.10] via-accent/[0.05] to-transparent"
                }, void 0, false, {
                    fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                    lineNumber: 246,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0 bg-surface-elevated",
                    style: {
                        zIndex: -1
                    }
                }, void 0, false, {
                    fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                    lineNumber: 247,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 min-w-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-base sm:text-lg font-bold text-text mb-1",
                                    children: "Need help with compliance?"
                                }, void 0, false, {
                                    fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                    lineNumber: 251,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs sm:text-sm text-text-muted leading-relaxed",
                                    children: "Get tailored support from Exxonim Consult. We respond during business hours."
                                }, void 0, false, {
                                    fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                    lineNumber: 254,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                            lineNumber: 250,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap gap-2.5 shrink-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].contact,
                                    className: "inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-accent text-accent-contrast font-semibold text-xs sm:text-sm hover:bg-accent-hover transition-all duration-200 hover:shadow-lg",
                                    children: [
                                        "Contact Us",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "w-3.5 h-3.5",
                                            viewBox: "0 0 24 24",
                                            fill: "none",
                                            stroke: "currentColor",
                                            strokeWidth: 2,
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M5 12h14M12 5l7 7-7 7"
                                            }, void 0, false, {
                                                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                lineNumber: 267,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                            lineNumber: 266,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                    lineNumber: 259,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "tel:+255794689099",
                                    className: "inline-flex items-center gap-1.5 px-5 py-2 rounded-full border border-border-soft text-text font-medium text-xs sm:text-sm hover:bg-accent-soft transition-all duration-200",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "w-3.5 h-3.5",
                                            viewBox: "0 0 24 24",
                                            fill: "none",
                                            stroke: "currentColor",
                                            strokeWidth: 2,
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
                                            }, void 0, false, {
                                                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                lineNumber: 277,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                            lineNumber: 276,
                                            columnNumber: 15
                                        }, this),
                                        "Call Us"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                    lineNumber: 270,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                            lineNumber: 258,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                    lineNumber: 249,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
            lineNumber: 244,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
        lineNumber: 243,
        columnNumber: 5
    }, this);
}
function ResourceArticlePage({ slug }) {
    const { data: post, isPending, error } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$hooks$2f$useBlogPost$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBlogPost"])(slug);
    const { data: posts = [] } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$hooks$2f$useBlogPosts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBlogPosts"])();
    const { data: resourcesPage } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$hooks$2f$usePage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePage"])("resources");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$hooks$2f$useResolvedSeo$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useResolvedBlogSeo"])(post);
    const hasArticleBody = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$blog$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hasUsableBlogBody"])(post?.content);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$components$2f$LoadBoundary$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LoadBoundary"], {
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
                const articleHtml = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$blog$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getRenderableBlogHtml"])(article);
                const articleSections = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$blog$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getRenderableBlogSections"])(post);
                const introText = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$blog$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBlogArticleIntro"])(post);
                const categoryLabel = post.category?.label;
                const relatedPosts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$utils$2f$blog$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getRelatedBlogPosts"])(post, posts);
                // Derive tags from category + highlights
                const tags = [];
                if (categoryLabel) tags.push(categoryLabel);
                if (article.highlights?.length) {
                    article.highlights.forEach((h)=>{
                        const shortTag = h.split(/\s+/).slice(0, 3).join(" ");
                        if (shortTag.length <= 30 && !tags.includes(shortTag)) tags.push(shortTag);
                    });
                }
                const displayTags = tags.slice(0, 6);
                const metaParts = [
                    formatBlogDate(post.publishedAt)
                ];
                if (post.readTimeMinutes) {
                    metaParts.push(`${post.readTimeMinutes} min read`);
                }
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "min-h-screen",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ArticleStructuredData, {
                            post: post
                        }, void 0, false, {
                            fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                            lineNumber: 342,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mx-auto max-w-[1200px] px-4 sm:px-6 pt-6 sm:pt-10",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].resources,
                                    className: "inline-flex items-center gap-2 text-sm font-medium text-text-muted hover:text-accent transition-colors mb-4 group",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200",
                                            viewBox: "0 0 24 24",
                                            fill: "none",
                                            stroke: "currentColor",
                                            strokeWidth: 2,
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M19 12H5M12 19l-7-7 7-7"
                                            }, void 0, false, {
                                                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                lineNumber: 351,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                            lineNumber: 350,
                                            columnNumber: 19
                                        }, this),
                                        "Back to Resources"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                    lineNumber: 345,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$components$2f$Breadcrumb$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Breadcrumb"], {
                                    items: [
                                        {
                                            label: "Resources",
                                            href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].resources
                                        },
                                        {
                                            label: post.title
                                        }
                                    ]
                                }, void 0, false, {
                                    fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                    lineNumber: 355,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                            lineNumber: 344,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mx-auto max-w-[1200px] px-4 sm:px-6 pt-6 sm:pt-8 pb-12",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-8 lg:gap-14",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                                        className: "min-w-0",
                                        children: [
                                            categoryLabel ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "inline-block px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 bg-accent/10 border border-accent/20 text-accent",
                                                children: categoryLabel
                                            }, void 0, false, {
                                                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                lineNumber: 366,
                                                columnNumber: 23
                                            }, this) : null,
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                className: "text-2xl sm:text-3xl lg:text-[2.5rem] font-bold text-text leading-tight mb-5",
                                                children: post.title
                                            }, void 0, false, {
                                                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                lineNumber: 373,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap items-center gap-4 text-xs sm:text-sm text-text-muted mb-7",
                                                children: [
                                                    post.author ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "flex items-center gap-1.5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                className: "w-3.5 h-3.5",
                                                                viewBox: "0 0 24 24",
                                                                fill: "none",
                                                                stroke: "currentColor",
                                                                strokeWidth: 1.5,
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    d: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                                    lineNumber: 382,
                                                                    columnNumber: 29
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                                lineNumber: 381,
                                                                columnNumber: 27
                                                            }, this),
                                                            post.author.name
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                        lineNumber: 380,
                                                        columnNumber: 25
                                                    }, this) : null,
                                                    post.readTimeMinutes ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "flex items-center gap-1.5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                className: "w-3.5 h-3.5",
                                                                viewBox: "0 0 24 24",
                                                                fill: "none",
                                                                stroke: "currentColor",
                                                                strokeWidth: 1.5,
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    d: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                                    lineNumber: 390,
                                                                    columnNumber: 29
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                                lineNumber: 389,
                                                                columnNumber: 27
                                                            }, this),
                                                            post.readTimeMinutes,
                                                            " min read"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                        lineNumber: 388,
                                                        columnNumber: 25
                                                    }, this) : null,
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "flex items-center gap-1.5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                className: "w-3.5 h-3.5",
                                                                viewBox: "0 0 24 24",
                                                                fill: "none",
                                                                stroke: "currentColor",
                                                                strokeWidth: 1.5,
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    d: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                                    lineNumber: 397,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                                lineNumber: 396,
                                                                columnNumber: 25
                                                            }, this),
                                                            metaParts[0]
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                        lineNumber: 395,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                lineNumber: 378,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative w-full rounded-2xl overflow-hidden mb-8",
                                                children: post.coverImageSrc ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                            src: post.coverImageSrc,
                                                            alt: post.coverAlt ?? post.title,
                                                            className: "w-full h-[250px] sm:h-[350px] lg:h-[460px] object-cover",
                                                            loading: "eager"
                                                        }, void 0, false, {
                                                            fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                            lineNumber: 407,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"
                                                        }, void 0, false, {
                                                            fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                            lineNumber: 413,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-full h-[250px] sm:h-[350px] lg:h-[460px] flex items-center justify-center bg-[radial-gradient(circle_at_15%_18%,var(--color-accent-soft-strong),transparent_28%),radial-gradient(circle_at_88%_82%,var(--color-surface-elevated),transparent_24%),linear-gradient(150deg,var(--color-accent-soft),var(--color-page-strong))]",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 text-accent",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            className: "w-8 h-8",
                                                            viewBox: "0 0 24 24",
                                                            fill: "none",
                                                            stroke: "currentColor",
                                                            strokeWidth: 1.5,
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                d: "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                                                            }, void 0, false, {
                                                                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                                lineNumber: 419,
                                                                columnNumber: 31
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                            lineNumber: 418,
                                                            columnNumber: 29
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                        lineNumber: 417,
                                                        columnNumber: 27
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                    lineNumber: 416,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                lineNumber: 404,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "article-body",
                                                children: articleHtml ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm sm:text-base text-text-muted leading-relaxed max-w-none [&_h2]:text-xl [&_h2]:sm:text-2xl [&_h2]:font-semibold [&_h2]:text-text [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-text [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:mb-4 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_ol]:space-y-2 [&_li]:text-text-muted [&_li]:leading-relaxed [&_blockquote]:my-8 [&_blockquote]:p-5 [&_blockquote]:rounded-xl [&_blockquote]:bg-accent/[0.04] [&_blockquote]:border [&_blockquote]:border-accent/15 [&_a]:text-accent [&_a]:font-medium [&_a]:hover:text-accent-hover [&_a]:underline [&_a]:decoration-accent/30 [&_a]:underline-offset-2 [&_strong]:text-text [&_strong]:font-semibold [&_img]:rounded-xl [&_img]:my-6",
                                                    dangerouslySetInnerHTML: {
                                                        __html: articleHtml
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                    lineNumber: 429,
                                                    columnNumber: 25
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-base sm:text-lg text-text/85 leading-relaxed mb-6 font-medium",
                                                            children: introText
                                                        }, void 0, false, {
                                                            fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                            lineNumber: 446,
                                                            columnNumber: 27
                                                        }, this),
                                                        articleSections.map((section)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                                        className: "text-xl sm:text-2xl font-semibold text-text mb-4 mt-10",
                                                                        children: section.heading
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                                        lineNumber: 453,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    section.paragraphs.map((paragraph)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-sm sm:text-base text-text-muted leading-relaxed mb-4",
                                                                            children: paragraph
                                                                        }, paragraph, false, {
                                                                            fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                                            lineNumber: 457,
                                                                            columnNumber: 33
                                                                        }, this))
                                                                ]
                                                            }, section.heading, true, {
                                                                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                                lineNumber: 452,
                                                                columnNumber: 29
                                                            }, this))
                                                    ]
                                                }, void 0, true)
                                            }, void 0, false, {
                                                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                lineNumber: 427,
                                                columnNumber: 21
                                            }, this),
                                            post.author ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-10 pt-8 border-t border-border-soft flex items-center gap-4",
                                                children: [
                                                    post.author.avatarSrc ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        className: "w-12 h-12 rounded-full object-cover",
                                                        src: post.author.avatarSrc,
                                                        alt: post.author.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                        lineNumber: 471,
                                                        columnNumber: 27
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 text-accent font-bold text-lg",
                                                        "aria-hidden": "true",
                                                        children: getAuthorInitials(post.author.name)
                                                    }, void 0, false, {
                                                        fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                        lineNumber: 473,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                className: "block text-text font-semibold",
                                                                children: post.author.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                                lineNumber: 478,
                                                                columnNumber: 27
                                                            }, this),
                                                            post.author.role ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-sm text-text-muted",
                                                                children: post.author.role
                                                            }, void 0, false, {
                                                                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                                lineNumber: 479,
                                                                columnNumber: 47
                                                            }, this) : null
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                        lineNumber: 477,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                lineNumber: 469,
                                                columnNumber: 23
                                            }, this) : null
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                        lineNumber: 363,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                                        className: "space-y-8 lg:sticky lg:top-20 lg:self-start lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto lg:pr-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-border-soft [&::-webkit-scrollbar-thumb]:rounded-full",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        className: "text-xs uppercase tracking-wider text-text-muted font-semibold mb-3",
                                                        children: "Share on Social Media"
                                                    }, void 0, false, {
                                                        fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                        lineNumber: 494,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SocialShareButtons, {}, void 0, false, {
                                                        fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                        lineNumber: 497,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                lineNumber: 493,
                                                columnNumber: 21
                                            }, this),
                                            displayTags.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        className: "text-xs uppercase tracking-wider text-text-muted font-semibold mb-3",
                                                        children: "Tags"
                                                    }, void 0, false, {
                                                        fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                        lineNumber: 503,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-wrap gap-2",
                                                        children: displayTags.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "px-3 py-1.5 rounded-full text-xs font-medium border border-border-soft bg-surface/50 text-text-muted hover:bg-accent-soft hover:border-accent/20 hover:text-accent transition-all duration-200 cursor-default",
                                                                children: tag
                                                            }, tag, false, {
                                                                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                                lineNumber: 508,
                                                                columnNumber: 29
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                        lineNumber: 506,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                                lineNumber: 502,
                                                columnNumber: 23
                                            }, this) : null
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                        lineNumber: 486,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                                lineNumber: 360,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                            lineNumber: 359,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CompactRelatedArticles, {
                            posts: relatedPosts
                        }, void 0, false, {
                            fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                            lineNumber: 525,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$components$2f$NewsletterSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NewsletterSection"], {
                            variant: "card",
                            heading: "Stay updated on compliance changes",
                            description: "Get practical guides and regulatory updates delivered to your inbox. No spam — just what matters for your business in Tanzania."
                        }, void 0, false, {
                            fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                            lineNumber: 528,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BottomCTABanner, {}, void 0, false, {
                            fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                            lineNumber: 535,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                    lineNumber: 341,
                    columnNumber: 13
                }, this);
            })() : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$components$2f$ErrorMessage$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ErrorMessage"], {
                detail: "This article is missing its published body content.",
                title: "Article content is unavailable."
            }, void 0, false, {
                fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
                lineNumber: 540,
                columnNumber: 11
            }, this);
        }
    }, void 0, false, {
        fileName: "[project]/joyful-journey/src/exxonim/pages/ResourceArticlePage.tsx",
        lineNumber: 304,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=joyful-journey_src_exxonim_0t3gd85._.js.map