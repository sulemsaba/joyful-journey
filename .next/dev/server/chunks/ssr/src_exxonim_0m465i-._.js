module.exports = [
"[project]/src/exxonim/components/Breadcrumb.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Breadcrumb",
    ()=>Breadcrumb
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.mjs [app-ssr] (ecmascript) <export default as ChevronRight>");
;
;
function Breadcrumb({ items }) {
    if (!items.length) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        "aria-label": "Breadcrumb",
        className: "py-3",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
            className: "flex items-center flex-wrap gap-1 text-sm",
            children: items.map((item, index)=>{
                const isLast = index === items.length - 1;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                    className: "flex items-center gap-1",
                    children: [
                        index > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                            className: "w-3.5 h-3.5 text-text-muted shrink-0",
                            "aria-hidden": "true"
                        }, void 0, false, {
                            fileName: "[project]/src/exxonim/components/Breadcrumb.tsx",
                            lineNumber: 41,
                            columnNumber: 17
                        }, this),
                        isLast || !item.href ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-text font-medium",
                            "aria-current": isLast ? "page" : undefined,
                            children: item.label
                        }, void 0, false, {
                            fileName: "[project]/src/exxonim/components/Breadcrumb.tsx",
                            lineNumber: 48,
                            columnNumber: 17
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: item.href,
                            className: "text-text-muted hover:text-accent transition-colors",
                            children: item.label
                        }, void 0, false, {
                            fileName: "[project]/src/exxonim/components/Breadcrumb.tsx",
                            lineNumber: 55,
                            columnNumber: 17
                        }, this)
                    ]
                }, index, true, {
                    fileName: "[project]/src/exxonim/components/Breadcrumb.tsx",
                    lineNumber: 39,
                    columnNumber: 13
                }, this);
            })
        }, void 0, false, {
            fileName: "[project]/src/exxonim/components/Breadcrumb.tsx",
            lineNumber: 34,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/exxonim/components/Breadcrumb.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/exxonim/components/ComplianceCalendarSection.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ComplianceCalendarSection",
    ()=>ComplianceCalendarSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/routes.ts [app-ssr] (ecmascript)");
'use client';
;
;
const QUARTER_GROUPS = [
    {
        label: 'Q1',
        deadlines: [
            {
                title: 'WCF Annual Return',
                dueDate: 'Due March 31',
                description: "Workers' Compensation Fund annual filing"
            },
            {
                title: 'NSSF Employer Return',
                dueDate: 'Due March 31',
                description: 'National Social Security Fund employer contribution reconciliation'
            }
        ]
    },
    {
        label: 'Q2',
        deadlines: [
            {
                title: 'BRELA Annual Returns',
                dueDate: 'Due within 42 days of company anniversary',
                description: 'Business Registration and Licensing Agency annual filing'
            },
            {
                title: 'Business License Renewal',
                dueDate: 'Due before fiscal year start',
                description: 'Annual business license renewal with local authority'
            }
        ]
    },
    {
        label: 'Q3',
        deadlines: [
            {
                title: 'TRA Provisional Tax Return',
                dueDate: 'Due within 3 months of year-end',
                description: 'Tanzania Revenue Authority provisional tax assessment'
            },
            {
                title: 'OSHA Registration Renewal',
                dueDate: 'Due annually',
                description: 'Occupational Safety and Health Authority workplace compliance'
            }
        ]
    },
    {
        label: 'Q4',
        deadlines: [
            {
                title: 'TRA Final Tax Return',
                dueDate: 'Due 6 months after year-end',
                description: 'Final corporate income tax return filing'
            },
            {
                title: 'Beneficial Ownership Update',
                dueDate: 'Due with BRELA annual return',
                description: 'Update beneficial ownership information with BRELA'
            }
        ]
    }
];
/* ── Inline SVG icons ──────────────────────────────────────── */ function CalendarIcon({ className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: className,
        "aria-hidden": "true",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                width: "18",
                height: "18",
                x: "3",
                y: "4",
                rx: "2",
                ry: "2"
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
                lineNumber: 127,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "16",
                x2: "16",
                y1: "2",
                y2: "6"
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
                lineNumber: 128,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "8",
                x2: "8",
                y1: "2",
                y2: "6"
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
                lineNumber: 129,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "3",
                x2: "21",
                y1: "10",
                y2: "10"
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
                lineNumber: 130,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
        lineNumber: 116,
        columnNumber: 5
    }, this);
}
function BellIcon({ className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: className,
        "aria-hidden": "true",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
                lineNumber: 148,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M10.3 21a1.94 1.94 0 0 0 3.4 0"
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
                lineNumber: 149,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
        lineNumber: 137,
        columnNumber: 5
    }, this);
}
function ArrowRightIcon({ className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: className,
        "aria-hidden": "true",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M5 12h14"
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
                lineNumber: 167,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "m12 5 7 7-7 7"
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
                lineNumber: 168,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
        lineNumber: 156,
        columnNumber: 5
    }, this);
}
function ShieldCheckIcon({ className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: className,
        "aria-hidden": "true",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
                lineNumber: 186,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "m9 12 2 2 4-4"
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
                lineNumber: 187,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
        lineNumber: 175,
        columnNumber: 5
    }, this);
}
/* ── Sub-components ─────────────────────────────────────────── */ function QuarterLabel({ label }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "inline-flex items-center justify-center min-h-[2rem] min-w-[2.5rem] px-3 rounded-full bg-accent-soft text-accent text-[0.78rem] font-extrabold tracking-[0.14em] uppercase",
        children: label
    }, void 0, false, {
        fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
        lineNumber: 196,
        columnNumber: 5
    }, this);
}
function DeadlineItem({ deadline }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-start gap-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "relative z-[1] mt-1.5 flex-shrink-0 w-3 h-3 rounded-full bg-accent ring-[3px] ring-accent/20",
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
                lineNumber: 206,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 min-w-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        className: "block text-text text-[0.95rem] leading-tight font-semibold",
                        children: deadline.title
                    }, void 0, false, {
                        fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
                        lineNumber: 212,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "block mt-1 font-mono text-sm text-accent leading-relaxed",
                        children: deadline.dueDate
                    }, void 0, false, {
                        fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
                        lineNumber: 215,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "block mt-0.5 text-text-muted text-sm leading-relaxed",
                        children: deadline.description
                    }, void 0, false, {
                        fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
                        lineNumber: 218,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
                lineNumber: 211,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
        lineNumber: 204,
        columnNumber: 5
    }, this);
}
function ReminderBadge() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-accent text-[0.7rem] font-extrabold uppercase tracking-[0.1em]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BellIcon, {
                className: "h-3 w-3"
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
                lineNumber: 229,
                columnNumber: 7
            }, this),
            "Ongoing reminders"
        ]
    }, void 0, true, {
        fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
        lineNumber: 228,
        columnNumber: 5
    }, this);
}
function CTACard() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-[2rem] border border-border-soft bg-surface-elevated p-6 md:p-8 grid gap-5 content-start",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "inline-flex items-center justify-center w-10 h-10 rounded-xl bg-accent-soft text-accent flex-shrink-0",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ShieldCheckIcon, {
                            className: "h-5 w-5"
                        }, void 0, false, {
                            fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
                            lineNumber: 241,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
                        lineNumber: 240,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "m-0 text-text text-lg font-semibold leading-tight tracking-tight",
                                children: "Never miss a deadline again"
                            }, void 0, false, {
                                fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
                                lineNumber: 244,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "m-0 mt-2 text-text-muted text-sm leading-relaxed",
                                children: "We track every regulatory deadline for your business and send you advance reminders so you're always prepared — never caught off guard."
                            }, void 0, false, {
                                fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
                                lineNumber: 247,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
                        lineNumber: 243,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
                lineNumber: 239,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-px bg-border-soft",
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
                lineNumber: 256,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl bg-accent-soft/60 p-3.5 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "block text-accent text-xl font-extrabold leading-none",
                                children: "8"
                            }, void 0, false, {
                                fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
                                lineNumber: 261,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "block mt-1 text-text-muted text-xs leading-tight",
                                children: "Key deadlines tracked"
                            }, void 0, false, {
                                fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
                                lineNumber: 262,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
                        lineNumber: 260,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl bg-accent-soft/60 p-3.5 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "block text-accent text-xl font-extrabold leading-none",
                                children: "∞"
                            }, void 0, false, {
                                fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
                                lineNumber: 265,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "block mt-1 text-text-muted text-xs leading-tight",
                                children: "Unlimited reminders"
                            }, void 0, false, {
                                fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
                                lineNumber: 266,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
                        lineNumber: 264,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
                lineNumber: 259,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].contact,
                        className: "inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-extrabold text-accent-contrast transition-all hover:bg-accent-hover hover:-translate-y-0.5",
                        children: [
                            "Get compliance support",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ArrowRightIcon, {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
                                lineNumber: 277,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
                        lineNumber: 272,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].trackConsultation,
                        className: "inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border-soft bg-surface/80 px-6 text-sm font-extrabold text-text transition-all hover:bg-surface hover:-translate-y-0.5",
                        children: [
                            "Track your consultation",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ArrowRightIcon, {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
                                lineNumber: 284,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
                        lineNumber: 279,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
                lineNumber: 271,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
        lineNumber: 237,
        columnNumber: 5
    }, this);
}
function ComplianceCalendarSection() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        "aria-labelledby": "compliance-calendar-title",
        className: "py-16 md:py-24 bg-page",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-[min(1240px,calc(100%-2rem))] mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid gap-3 mb-10 md:mb-14",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[0.78rem] font-extrabold tracking-[0.16em] uppercase text-text-soft",
                                    children: "Compliance calendar"
                                }, void 0, false, {
                                    fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
                                    lineNumber: 303,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ReminderBadge, {}, void 0, false, {
                                    fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
                                    lineNumber: 306,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
                            lineNumber: 302,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            id: "compliance-calendar-title",
                            className: "m-0 text-[clamp(1.9rem,4vw,3rem)] font-medium leading-[1.05] tracking-tight text-text max-w-[28ch]",
                            children: "Compliance deadlines you can't afford to miss"
                        }, void 0, false, {
                            fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
                            lineNumber: 308,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "m-0 max-w-[42rem] text-base leading-relaxed text-text-muted",
                            children: "We track these deadlines for our clients and send timely advance reminders so you're always prepared — no time limit."
                        }, void 0, false, {
                            fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
                            lineNumber: 314,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
                    lineNumber: 301,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 lg:gap-10 items-start",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative",
                            children: [
                                QUARTER_GROUPS.map((group, qi)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: qi > 0 ? 'mt-8' : '',
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3 mb-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(QuarterLabel, {
                                                        label: group.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
                                                        lineNumber: 328,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-text-soft text-sm font-medium",
                                                        children: [
                                                            qi === 0 && 'Jan – Mar',
                                                            qi === 1 && 'Apr – Jun',
                                                            qi === 2 && 'Jul – Sep',
                                                            qi === 3 && 'Oct – Dec'
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
                                                        lineNumber: 329,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
                                                lineNumber: 327,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative ml-1.5 pl-6 border-l-2 border-accent/30",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid gap-5",
                                                    children: group.deadlines.map((deadline)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DeadlineItem, {
                                                            deadline: deadline
                                                        }, deadline.title, false, {
                                                            fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
                                                            lineNumber: 341,
                                                            columnNumber: 23
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
                                                    lineNumber: 339,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
                                                lineNumber: 338,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, group.label, true, {
                                        fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
                                        lineNumber: 325,
                                        columnNumber: 15
                                    }, this)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative ml-1.5 pl-6 border-l-2 border-accent/30 mt-2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-accent/30",
                                        "aria-hidden": "true"
                                    }, void 0, false, {
                                        fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
                                        lineNumber: 350,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
                                    lineNumber: 349,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
                            lineNumber: 323,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hidden lg:block lg:sticky lg:top-[calc(var(--header-height,68px)+1.5rem)]",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CTACard, {}, void 0, false, {
                                fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
                                lineNumber: 359,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
                            lineNumber: 358,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "lg:hidden",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CTACard, {}, void 0, false, {
                                fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
                                lineNumber: 364,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
                            lineNumber: 363,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
                    lineNumber: 321,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
            lineNumber: 299,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/exxonim/components/ComplianceCalendarSection.tsx",
        lineNumber: 295,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/exxonim/components/primitives/Button.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/utils/cn.ts [app-ssr] (ecmascript)");
;
;
function Button({ variant = 'primary', href, children, onClick, className }) {
    const baseStyles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('inline-flex items-center justify-center font-extrabold', 'h-12 px-6 rounded-full border transition-all', 'hover:-translate-y-0.5 active:translate-y-0', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent', className);
    const variantStyles = {
        primary: 'bg-accent text-accent-contrast hover:bg-accent-hover',
        ghost: 'bg-surface/80 text-text border-border-soft hover:bg-surface'
    };
    const classes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(baseStyles, variantStyles[variant]);
    if (href) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
            href: href,
            className: classes,
            children: children
        }, void 0, false, {
            fileName: "[project]/src/exxonim/components/primitives/Button.tsx",
            lineNumber: 35,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: onClick,
        className: classes,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/exxonim/components/primitives/Button.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/exxonim/components/EngineSection.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EngineSection",
    ()=>EngineSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$primitives$2f$Container$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/components/primitives/Container.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$primitives$2f$Button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/components/primitives/Button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/routes.ts [app-ssr] (ecmascript)");
;
;
;
;
function BuildingIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "20",
        height: "20",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "aria-hidden": "true",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                width: "16",
                height: "20",
                x: "4",
                y: "2",
                rx: "2",
                ry: "2"
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/EngineSection.tsx",
                lineNumber: 9,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M9 22v-4h6v4"
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/EngineSection.tsx",
                lineNumber: 10,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M8 6h.01"
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/EngineSection.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M16 6h.01"
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/EngineSection.tsx",
                lineNumber: 11,
                columnNumber: 28
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M12 6h.01"
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/EngineSection.tsx",
                lineNumber: 12,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M12 10h.01"
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/EngineSection.tsx",
                lineNumber: 12,
                columnNumber: 29
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M12 14h.01"
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/EngineSection.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M16 10h.01"
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/EngineSection.tsx",
                lineNumber: 13,
                columnNumber: 30
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M16 14h.01"
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/EngineSection.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M8 10h.01"
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/EngineSection.tsx",
                lineNumber: 14,
                columnNumber: 30
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M8 14h.01"
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/EngineSection.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/exxonim/components/EngineSection.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
function ShieldIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "20",
        height: "20",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "aria-hidden": "true",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/EngineSection.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "m9 12 2 2 4-4"
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/EngineSection.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/exxonim/components/EngineSection.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
function GlobeIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "20",
        height: "20",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "aria-hidden": "true",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "12",
                cy: "12",
                r: "10"
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/EngineSection.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/EngineSection.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M2 12h20"
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/EngineSection.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/exxonim/components/EngineSection.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
const groupIcons = [
    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BuildingIcon, {}, "0", false, {
        fileName: "[project]/src/exxonim/components/EngineSection.tsx",
        lineNumber: 39,
        columnNumber: 21
    }, ("TURBOPACK compile-time value", void 0)),
    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ShieldIcon, {}, "1", false, {
        fileName: "[project]/src/exxonim/components/EngineSection.tsx",
        lineNumber: 39,
        columnNumber: 47
    }, ("TURBOPACK compile-time value", void 0)),
    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(GlobeIcon, {}, "2", false, {
        fileName: "[project]/src/exxonim/components/EngineSection.tsx",
        lineNumber: 39,
        columnNumber: 71
    }, ("TURBOPACK compile-time value", void 0))
];
const staggerDelayClasses = [
    "[--stagger-ms:0]",
    "[--stagger-ms:80]",
    "[--stagger-ms:160]",
    "[--stagger-ms:240]",
    "[--stagger-ms:320]",
    "[--stagger-ms:400]"
];
function EngineSection({ content }) {
    const serviceGroups = content.service_groups;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "services",
        className: "py-16 md:py-24 bg-page-strong",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$primitives$2f$Container$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Container"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid gap-4 text-center max-w-[min(52ch,90%)] mx-auto mb-12 md:mb-16",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "inline-flex items-center justify-center gap-2 text-accent text-xs font-extrabold tracking-[0.14em] uppercase",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "w-1.5 h-1.5 rounded-full bg-accent"
                                }, void 0, false, {
                                    fileName: "[project]/src/exxonim/components/EngineSection.tsx",
                                    lineNumber: 64,
                                    columnNumber: 13
                                }, this),
                                content.eyebrow
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/exxonim/components/EngineSection.tsx",
                            lineNumber: 63,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "font-display text-[clamp(1.8rem,3.2vw,2.6rem)] font-medium leading-tight tracking-tight",
                            children: content.title
                        }, void 0, false, {
                            fileName: "[project]/src/exxonim/components/EngineSection.tsx",
                            lineNumber: 67,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-text-muted text-lg leading-relaxed",
                            children: content.description
                        }, void 0, false, {
                            fileName: "[project]/src/exxonim/components/EngineSection.tsx",
                            lineNumber: 70,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/exxonim/components/EngineSection.tsx",
                    lineNumber: 62,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-12",
                    children: serviceGroups.map((group, groupIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                            className: `grid gap-5 p-6 md:p-8 rounded-[22px] border border-border-soft bg-surface/88 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 [transition-delay:calc(var(--stagger-ms)*1ms)] ${staggerDelayClasses[groupIndex] ?? staggerDelayClasses[staggerDelayClasses.length - 1]}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-start gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "flex items-center justify-center w-10 h-10 rounded-full bg-accent-soft text-accent",
                                            children: groupIcons[groupIndex] ?? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BuildingIcon, {}, void 0, false, {
                                                fileName: "[project]/src/exxonim/components/EngineSection.tsx",
                                                lineNumber: 87,
                                                columnNumber: 46
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/exxonim/components/EngineSection.tsx",
                                            lineNumber: 86,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "font-display text-xl font-medium leading-tight tracking-tight",
                                                    children: group.title
                                                }, void 0, false, {
                                                    fileName: "[project]/src/exxonim/components/EngineSection.tsx",
                                                    lineNumber: 90,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-text-muted text-sm leading-relaxed mt-1",
                                                    children: group.description
                                                }, void 0, false, {
                                                    fileName: "[project]/src/exxonim/components/EngineSection.tsx",
                                                    lineNumber: 93,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/exxonim/components/EngineSection.tsx",
                                            lineNumber: 89,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/exxonim/components/EngineSection.tsx",
                                    lineNumber: 85,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "grid gap-3 pt-4 border-t border-border-soft",
                                    children: group.services.map((service)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            id: service.id,
                                            className: "grid gap-1 group",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start justify-between gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            className: "text-text font-medium",
                                                            children: service.label
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/exxonim/components/EngineSection.tsx",
                                                            lineNumber: 109,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].contact}#inquiry`,
                                                            className: "flex-shrink-0 mt-0.5 text-[0.7rem] font-extrabold uppercase tracking-[0.08em] text-accent opacity-0 group-hover:opacity-100 transition-opacity",
                                                            "aria-label": `Inquire about ${service.label}`,
                                                            children: "Inquire →"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/exxonim/components/EngineSection.tsx",
                                                            lineNumber: 112,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/exxonim/components/EngineSection.tsx",
                                                    lineNumber: 108,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-text-muted text-sm leading-relaxed",
                                                    children: service.detail
                                                }, void 0, false, {
                                                    fileName: "[project]/src/exxonim/components/EngineSection.tsx",
                                                    lineNumber: 120,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, service.id, true, {
                                            fileName: "[project]/src/exxonim/components/EngineSection.tsx",
                                            lineNumber: 103,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/exxonim/components/EngineSection.tsx",
                                    lineNumber: 101,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, group.title, true, {
                            fileName: "[project]/src/exxonim/components/EngineSection.tsx",
                            lineNumber: 78,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/exxonim/components/EngineSection.tsx",
                    lineNumber: 76,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col sm:flex-row items-center justify-center gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$primitives$2f$Button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                            href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].contact,
                            children: "Contact Exxonim"
                        }, void 0, false, {
                            fileName: "[project]/src/exxonim/components/EngineSection.tsx",
                            lineNumber: 132,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$primitives$2f$Button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                            href: "#packages",
                            variant: "ghost",
                            children: "See package plans"
                        }, void 0, false, {
                            fileName: "[project]/src/exxonim/components/EngineSection.tsx",
                            lineNumber: 135,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/exxonim/components/EngineSection.tsx",
                    lineNumber: 131,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/exxonim/components/EngineSection.tsx",
            lineNumber: 60,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/exxonim/components/EngineSection.tsx",
        lineNumber: 59,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/exxonim/components/ExxonimApartSection.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ExxonimApartSection",
    ()=>ExxonimApartSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/routes.ts [app-ssr] (ecmascript)");
'use client';
;
;
/* ─────────────────────────────────────────────────────────────────────────────
 * ExxonimApartSection — "What sets Exxonim apart" differentiator grid
 *
 * Displays 4 core differentiator cards in a 2×2 grid (1 col on mobile).
 * This section is designed for the Services page to highlight what makes
 * Exxonim Consult different from competitors.
 *
 * BACKEND / ADMIN INTEGRATION NOTES:
 * ──────────────────────────────────
 * Currently all content is static. If the CMS needs to manage these cards:
 *   - Add an "apart_section" field to the services page content type
 *   - Each card: { title, description, icon_key, link? }
 *   - Icon key maps to the inline SVG switch below
 *   - Link is optional — only "track-consultation" currently links out
 * ──────────────────────────────────────────────────────────────────────────── */ /** Checkmark-in-circle SVG icon */ function CheckCircleIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "aria-hidden": "true",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "12",
                cy: "12",
                r: "10"
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/ExxonimApartSection.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "m9 12 2 2 4-4"
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/ExxonimApartSection.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/exxonim/components/ExxonimApartSection.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
/** Bell SVG icon */ function BellIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "aria-hidden": "true",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/ExxonimApartSection.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M10.3 21a1.94 1.94 0 0 0 3.4 0"
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/ExxonimApartSection.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/exxonim/components/ExxonimApartSection.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
/** Shield/building SVG icon — represents authority liaison */ function ShieldBuildingIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "aria-hidden": "true",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/ExxonimApartSection.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M9 12h2v4"
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/ExxonimApartSection.tsx",
                lineNumber: 76,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M15 12h-2v4"
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/ExxonimApartSection.tsx",
                lineNumber: 77,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "10",
                y: "8",
                width: "4",
                height: "4",
                rx: "0.5"
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/ExxonimApartSection.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/exxonim/components/ExxonimApartSection.tsx",
        lineNumber: 64,
        columnNumber: 5
    }, this);
}
/** Clipboard-check SVG icon */ function ClipboardCheckIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "aria-hidden": "true",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                width: "8",
                height: "4",
                x: "8",
                y: "2",
                rx: "1",
                ry: "1"
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/ExxonimApartSection.tsx",
                lineNumber: 97,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/ExxonimApartSection.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "m9 14 2 2 4-4"
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/ExxonimApartSection.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/exxonim/components/ExxonimApartSection.tsx",
        lineNumber: 86,
        columnNumber: 5
    }, this);
}
/** Differentiator card data — all static content */ const differentiators = [
    {
        title: 'Live Consultation Tracking',
        description: 'Track every consultation from intake to resolution. Receive automatic updates at every milestone via WhatsApp, email, or SMS — no login required.',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CheckCircleIcon, {}, void 0, false, {
            fileName: "[project]/src/exxonim/components/ExxonimApartSection.tsx",
            lineNumber: 110,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0)),
        link: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].trackConsultation,
        linkLabel: 'Learn more'
    },
    {
        title: 'Ongoing Compliance Reminders',
        description: 'We send timely reminders ahead of every compliance deadline — BRELA returns, TRA filings, license renewals, WCF, NSSF, OSHA. No time limit, no cut-off. Never be caught off-guard.',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BellIcon, {}, void 0, false, {
            fileName: "[project]/src/exxonim/components/ExxonimApartSection.tsx",
            lineNumber: 118,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0)),
        link: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].contact,
        linkLabel: 'Get reminders'
    },
    {
        title: 'Authority Liaison',
        description: 'We communicate directly with BRELA, TRA, NSSF, WCF, OSHA and other regulators on your behalf — so you don\'t have to chase offices or wait in queues.',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ShieldBuildingIcon, {}, void 0, false, {
            fileName: "[project]/src/exxonim/components/ExxonimApartSection.tsx",
            lineNumber: 126,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0)),
        link: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].contact,
        linkLabel: 'Get started'
    },
    {
        title: 'Document Readiness Review',
        description: 'Before any filing, we review your documents for completeness and accuracy — preventing rejections, delays, and costly resubmissions.',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ClipboardCheckIcon, {}, void 0, false, {
            fileName: "[project]/src/exxonim/components/ExxonimApartSection.tsx",
            lineNumber: 134,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0)),
        link: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].contact,
        linkLabel: 'Submit documents'
    }
];
function ExxonimApartSection() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        "aria-labelledby": "exxonim-apart-title",
        className: "py-16 md:py-24 bg-page-strong",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-[min(1240px,calc(100%-2rem))] mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid gap-3 mb-10 md:mb-14 text-center max-w-[min(52ch,90%)] mx-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs font-extrabold uppercase tracking-[0.14em] text-accent",
                            children: "Our edge"
                        }, void 0, false, {
                            fileName: "[project]/src/exxonim/components/ExxonimApartSection.tsx",
                            lineNumber: 149,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            id: "exxonim-apart-title",
                            className: "text-[clamp(1.8rem,3.2vw,2.6rem)] font-semibold leading-tight tracking-tight text-text",
                            children: "What sets Exxonim apart"
                        }, void 0, false, {
                            fileName: "[project]/src/exxonim/components/ExxonimApartSection.tsx",
                            lineNumber: 152,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/exxonim/components/ExxonimApartSection.tsx",
                    lineNumber: 148,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 gap-5",
                    children: differentiators.map((card)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                            className: "rounded-[1.5rem] border border-border-soft bg-surface/88 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-center w-12 h-12 rounded-full bg-accent-soft text-accent mb-4",
                                    children: card.icon
                                }, void 0, false, {
                                    fileName: "[project]/src/exxonim/components/ExxonimApartSection.tsx",
                                    lineNumber: 168,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-semibold text-text leading-tight",
                                    children: card.title
                                }, void 0, false, {
                                    fileName: "[project]/src/exxonim/components/ExxonimApartSection.tsx",
                                    lineNumber: 173,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-2.5 text-sm text-text-muted leading-relaxed",
                                    children: card.description
                                }, void 0, false, {
                                    fileName: "[project]/src/exxonim/components/ExxonimApartSection.tsx",
                                    lineNumber: 178,
                                    columnNumber: 15
                                }, this),
                                card.link && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: card.link,
                                    className: "inline-flex items-center gap-1 mt-4 text-sm font-semibold text-accent transition-colors hover:text-accent-hover",
                                    children: [
                                        card.linkLabel,
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            "aria-hidden": "true",
                                            className: "text-base leading-none",
                                            children: "→"
                                        }, void 0, false, {
                                            fileName: "[project]/src/exxonim/components/ExxonimApartSection.tsx",
                                            lineNumber: 189,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/exxonim/components/ExxonimApartSection.tsx",
                                    lineNumber: 184,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, card.title, true, {
                            fileName: "[project]/src/exxonim/components/ExxonimApartSection.tsx",
                            lineNumber: 163,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/exxonim/components/ExxonimApartSection.tsx",
                    lineNumber: 161,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/exxonim/components/ExxonimApartSection.tsx",
            lineNumber: 146,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/exxonim/components/ExxonimApartSection.tsx",
        lineNumber: 142,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/exxonim/components/ErrorMessage.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ErrorMessage",
    ()=>ErrorMessage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function ErrorMessage({ title = "Unable to load content.", detail = "This content is unavailable right now. Please try again in a moment.", compact = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: compact ? "rounded-xl border border-border-soft bg-page p-4" : "rounded-2xl border border-border-soft bg-page p-8 text-center",
        role: "alert",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm font-semibold text-text",
                children: title
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/ErrorMessage.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
}),
"[project]/src/exxonim/components/LoadBoundary.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LoadBoundary",
    ()=>LoadBoundary
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$ErrorMessage$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/components/ErrorMessage.tsx [app-ssr] (ecmascript)");
;
;
function ContentSkeleton({ label, variant }) {
    const isSection = variant === "section";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: [
            "grid border border-border-soft animate-pulse bg-surface-elevated",
            isSection ? "gap-4 min-h-[15rem] p-5 rounded-[1.35rem] w-full" : "gap-6 min-h-[clamp(24rem,48vh,34rem)] p-8 rounded-[1.8rem] w-[min(1180px,calc(100%-2rem))] mx-auto mt-6"
        ].join(" "),
        role: "status",
        "aria-live": "polite",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-4 w-28 rounded-full bg-accent-soft"
                    }, void 0, false, {
                        fileName: "[project]/src/exxonim/components/LoadBoundary.tsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-11 w-[min(30rem,88%)] rounded-full bg-accent-soft"
                    }, void 0, false, {
                        fileName: "[project]/src/exxonim/components/LoadBoundary.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-4 w-[min(36rem,100%)] rounded-full bg-accent-soft"
                    }, void 0, false, {
                        fileName: "[project]/src/exxonim/components/LoadBoundary.tsx",
                        lineNumber: 40,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-3 gap-4",
                "aria-hidden": "true",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-h-[9rem] rounded-[1.25rem] bg-accent-soft/70 border border-accent-soft/50"
                    }, void 0, false, {
                        fileName: "[project]/src/exxonim/components/LoadBoundary.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-h-[9rem] rounded-[1.25rem] bg-accent-soft/70 border border-accent-soft/50"
                    }, void 0, false, {
                        fileName: "[project]/src/exxonim/components/LoadBoundary.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
function LoadBoundary({ children, error, errorDetail = "This section could not be loaded right now. Please try again in a moment.", errorTitle = "Unable to load content.", isPending, isReady = true, loadingLabel = "Loading content...", variant = "page" }) {
    if (isPending && !isReady) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ContentSkeleton, {
            label: loadingLabel,
            variant: variant
        }, void 0, false, {
            fileName: "[project]/src/exxonim/components/LoadBoundary.tsx",
            lineNumber: 64,
            columnNumber: 12
        }, this);
    }
    if (isReady) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: typeof children === "function" ? children() : children
        }, void 0, false);
    }
    if (error || !isReady) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$ErrorMessage$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ErrorMessage"], {
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
}),
"[project]/src/exxonim/services/pricingService.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCachedPricingPlans",
    ()=>getCachedPricingPlans,
    "getPricingPlans",
    ()=>getPricingPlans
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$app$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/app/apiClient.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$shared$2f$api$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/shared/api/routes.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$shared$2f$publicContentCache$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/shared/publicContentCache.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$contentMappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/utils/contentMappers.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$services$2f$staticFallbackService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/services/staticFallbackService.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$content$2f$fallbackPublicContent$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/exxonim/content/fallbackPublicContent.ts [app-ssr] (ecmascript) <locals>");
;
;
;
;
;
;
// Eagerly start loading the static fallback at module init time
(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$services$2f$staticFallbackService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["preloadStaticFallback"])("pricing");
const PRICING_CACHE_KEY = "pricing:plans";
const PRICING_TTL_MS = 1000 * 60 * 60 * 6;
function isPricingPlanCollection(value) {
    return Array.isArray(value) && value.length > 0;
}
async function fetchFreshPricingPlans() {
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$app$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$shared$2f$api$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiRoutes"].public.pricing.plans.list);
    return response.data.map(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$contentMappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapPricingPlan"]);
}
function getCachedPricingPlans() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$shared$2f$publicContentCache$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCachedPublicContent"])(PRICING_CACHE_KEY, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$services$2f$staticFallbackService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getStaticFallback"])("pricing") ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$content$2f$fallbackPublicContent$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fallbackPricingPlans"]);
}
async function getPricingPlans() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$shared$2f$publicContentCache$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchWithFallback"])({
        cacheKey: PRICING_CACHE_KEY,
        fallbackValue: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$services$2f$staticFallbackService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getStaticFallback"])("pricing") ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$content$2f$fallbackPublicContent$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fallbackPricingPlans"],
        fetcher: fetchFreshPricingPlans,
        ttlMs: PRICING_TTL_MS,
        validate: isPricingPlanCollection,
        warningLabel: "Using cached or default pricing plans."
    });
}
}),
"[project]/src/exxonim/hooks/usePricingPlans.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePricingPlans",
    ()=>usePricingPlans
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$services$2f$pricingService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/services/pricingService.ts [app-ssr] (ecmascript)");
;
;
function usePricingPlans() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "pricing",
            "plans"
        ],
        queryFn: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$services$2f$pricingService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPricingPlans"],
        initialData: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$services$2f$pricingService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCachedPricingPlans"],
        refetchOnMount: true,
        refetchOnReconnect: "always",
        staleTime: 1000 * 60 * 60
    });
}
}),
"[project]/src/exxonim/services/testimonialService.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCachedTestimonials",
    ()=>getCachedTestimonials,
    "getTestimonials",
    ()=>getTestimonials
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$app$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/app/apiClient.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$shared$2f$api$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/shared/api/routes.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$shared$2f$publicContentCache$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/shared/publicContentCache.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$contentMappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/utils/contentMappers.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$services$2f$staticFallbackService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/services/staticFallbackService.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$content$2f$fallbackPublicContent$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/exxonim/content/fallbackPublicContent.ts [app-ssr] (ecmascript) <locals>");
;
;
;
;
;
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$services$2f$staticFallbackService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["preloadStaticFallback"])("testimonials");
const TESTIMONIALS_CACHE_KEY = "testimonials";
const TESTIMONIALS_TTL_MS = 1000 * 60 * 60 * 24;
function isTestimonialCollection(value) {
    return Array.isArray(value) && value.length > 0;
}
async function fetchFreshTestimonials() {
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$app$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$shared$2f$api$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiRoutes"].public.testimonials.list);
    return response.data.map(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$contentMappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapTestimonial"]);
}
function getCachedTestimonials() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$shared$2f$publicContentCache$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCachedPublicContent"])(TESTIMONIALS_CACHE_KEY, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$services$2f$staticFallbackService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getStaticFallback"])("testimonials") ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$content$2f$fallbackPublicContent$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fallbackTestimonials"]);
}
async function getTestimonials() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$shared$2f$publicContentCache$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchWithFallback"])({
        cacheKey: TESTIMONIALS_CACHE_KEY,
        fallbackValue: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$services$2f$staticFallbackService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getStaticFallback"])("testimonials") ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$content$2f$fallbackPublicContent$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fallbackTestimonials"],
        fetcher: fetchFreshTestimonials,
        ttlMs: TESTIMONIALS_TTL_MS,
        validate: isTestimonialCollection,
        warningLabel: "Using cached or default testimonials."
    });
}
}),
"[project]/src/exxonim/hooks/useTestimonials.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTestimonials",
    ()=>useTestimonials
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$services$2f$testimonialService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/services/testimonialService.ts [app-ssr] (ecmascript)");
;
;
function useTestimonials() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "testimonials"
        ],
        queryFn: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$services$2f$testimonialService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getTestimonials"],
        initialData: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$services$2f$testimonialService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCachedTestimonials"],
        refetchOnMount: true,
        refetchOnReconnect: "always",
        staleTime: 1000 * 60 * 60 * 2
    });
}
}),
"[project]/src/exxonim/components/ServicePlansSection.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ServicePackagesSection",
    ()=>ServicePackagesSection,
    "ServicePlansSection",
    ()=>ServicePackagesSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.mjs [app-ssr] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.mjs [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$LoadBoundary$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/components/LoadBoundary.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$primitives$2f$Container$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/components/primitives/Container.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$hooks$2f$usePricingPlans$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/hooks/usePricingPlans.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$hooks$2f$useTestimonials$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/hooks/useTestimonials.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/routes.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/utils/cn.ts [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
/**
 * TestimonialCard — minimal, clean quote card.
 * Shows the quote, star rating, and author only — no heavy card chrome.
 */ const TestimonialCard = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["memo"])(function TestimonialCard({ testimonial }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        className: "flex h-full flex-col py-6 px-1",
        "aria-label": `Testimonial from ${testimonial.name}`,
        children: [
            testimonial.rating > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-star text-sm tracking-wider mb-3",
                "aria-label": `${testimonial.rating} out of 5 stars`,
                children: "★".repeat(Math.min(testimonial.rating, 5))
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/ServicePlansSection.tsx",
                lineNumber: 30,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[0.9375rem] leading-relaxed text-text-muted flex-1",
                children: [
                    "“",
                    testimonial.quote,
                    "”"
                ]
            }, void 0, true, {
                fileName: "[project]/src/exxonim/components/ServicePlansSection.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 flex items-center gap-2.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex h-8 w-8 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-contrast",
                        children: testimonial.initials
                    }, void 0, false, {
                        fileName: "[project]/src/exxonim/components/ServicePlansSection.tsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-semibold text-text",
                                children: testimonial.name
                            }, void 0, false, {
                                fileName: "[project]/src/exxonim/components/ServicePlansSection.tsx",
                                lineNumber: 42,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-text-muted",
                                children: testimonial.role
                            }, void 0, false, {
                                fileName: "[project]/src/exxonim/components/ServicePlansSection.tsx",
                                lineNumber: 43,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/exxonim/components/ServicePlansSection.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/exxonim/components/ServicePlansSection.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/exxonim/components/ServicePlansSection.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
});
function PlanCard({ plan, featured }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex h-full flex-col rounded-3xl border p-7 transition-all", featured ? "border-transparent bg-text text-surface" : "border-border-soft bg-surface"),
        "aria-label": `${plan.name} service package`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start justify-between gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-xl font-semibold", featured ? "text-surface" : "text-text"),
                        children: plan.name
                    }, void 0, false, {
                        fileName: "[project]/src/exxonim/components/ServicePlansSection.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this),
                    plan.badge ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider", featured ? "bg-accent text-accent-contrast" : "bg-accent-soft text-accent"),
                        children: plan.badge
                    }, void 0, false, {
                        fileName: "[project]/src/exxonim/components/ServicePlansSection.tsx",
                        lineNumber: 66,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/src/exxonim/components/ServicePlansSection.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("mt-3 text-sm", featured ? "text-surface/80" : "text-text-muted"),
                children: plan.description
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/ServicePlansSection.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("mt-2 text-xs", featured ? "text-surface/60" : "text-text-muted"),
                children: plan.notes
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/ServicePlansSection.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("my-5 h-px", featured ? "bg-surface/20" : "bg-border-soft")
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/ServicePlansSection.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "flex flex-1 flex-col gap-2.5",
                children: plan.features.map((feature)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex items-start gap-2 text-sm", !feature.included && "opacity-50"),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full", feature.included ? featured ? "bg-accent text-accent-contrast" : "bg-accent-soft text-accent" : featured ? "bg-surface/15 text-surface/60" : "bg-border-soft text-text-muted"),
                                children: feature.included ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                    className: "h-3 w-3"
                                }, void 0, false, {
                                    fileName: "[project]/src/exxonim/components/ServicePlansSection.tsx",
                                    lineNumber: 99,
                                    columnNumber: 35
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "h-3 w-3"
                                }, void 0, false, {
                                    fileName: "[project]/src/exxonim/components/ServicePlansSection.tsx",
                                    lineNumber: 99,
                                    columnNumber: 67
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/exxonim/components/ServicePlansSection.tsx",
                                lineNumber: 93,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: featured ? "text-surface" : "text-text",
                                children: feature.label
                            }, void 0, false, {
                                fileName: "[project]/src/exxonim/components/ServicePlansSection.tsx",
                                lineNumber: 101,
                                columnNumber: 13
                            }, this)
                        ]
                    }, feature.label, true, {
                        fileName: "[project]/src/exxonim/components/ServicePlansSection.tsx",
                        lineNumber: 86,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/ServicePlansSection.tsx",
                lineNumber: 84,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].contact,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("mt-6 inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-extrabold transition-all hover:-translate-y-0.5", featured ? "bg-accent text-accent-contrast hover:bg-accent-hover" : "bg-cta-secondary text-surface hover:opacity-90"),
                children: "Contact Exxonim"
            }, void 0, false, {
                fileName: "[project]/src/exxonim/components/ServicePlansSection.tsx",
                lineNumber: 108,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/exxonim/components/ServicePlansSection.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
function ServicePackagesSection({ variant = "home" }) {
    const { data: testimonials = [], isPending: testimonialsPending, error: testimonialsError } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$hooks$2f$useTestimonials$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTestimonials"])();
    const { data: plans = [], isPending: plansPending, error: plansError } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$hooks$2f$usePricingPlans$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePricingPlans"])();
    const featuredIndex = Math.max(plans.findIndex((p)=>p.recommended), 0);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$LoadBoundary$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LoadBoundary"], {
        error: testimonialsError || plansError,
        errorDetail: "Service plans could not be loaded right now.",
        errorTitle: "Unable to load plans.",
        isPending: testimonialsPending || plansPending,
        isReady: testimonials.length > 0 && plans.length > 0,
        loadingLabel: "Loading package plans...",
        variant: "section",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            id: variant === "page" ? "packages" : undefined,
            "aria-label": "Service packages and client testimonials",
            className: "py-16 md:py-24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$primitives$2f$Container$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Container"], {
                children: [
                    testimonials.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-12 md:mb-16",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-8",
                                "data-reveal": true,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-[clamp(1.25rem,2.5vw,1.75rem)] font-semibold leading-tight tracking-tight text-text",
                                    children: "What our clients say"
                                }, void 0, false, {
                                    fileName: "[project]/src/exxonim/components/ServicePlansSection.tsx",
                                    lineNumber: 159,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/exxonim/components/ServicePlansSection.tsx",
                                lineNumber: 158,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border-soft/60",
                                children: testimonials.slice(0, 3).map((testimonial)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TestimonialCard, {
                                        testimonial: testimonial
                                    }, testimonial.id, false, {
                                        fileName: "[project]/src/exxonim/components/ServicePlansSection.tsx",
                                        lineNumber: 165,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/exxonim/components/ServicePlansSection.tsx",
                                lineNumber: 163,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/exxonim/components/ServicePlansSection.tsx",
                        lineNumber: 157,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid gap-3 mb-6",
                                "data-reveal": true,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs font-extrabold uppercase tracking-[0.14em] text-accent",
                                        children: "Service packages"
                                    }, void 0, false, {
                                        fileName: "[project]/src/exxonim/components/ServicePlansSection.tsx",
                                        lineNumber: 177,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-[clamp(1.5rem,3vw,2rem)] font-semibold leading-tight tracking-tight text-text",
                                        children: "Choose the right level of support"
                                    }, void 0, false, {
                                        fileName: "[project]/src/exxonim/components/ServicePlansSection.tsx",
                                        lineNumber: 180,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/exxonim/components/ServicePlansSection.tsx",
                                lineNumber: 176,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
                                children: plans.map((plan, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PlanCard, {
                                        plan: plan,
                                        featured: i === featuredIndex
                                    }, plan.name, false, {
                                        fileName: "[project]/src/exxonim/components/ServicePlansSection.tsx",
                                        lineNumber: 186,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/exxonim/components/ServicePlansSection.tsx",
                                lineNumber: 184,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/exxonim/components/ServicePlansSection.tsx",
                        lineNumber: 175,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/exxonim/components/ServicePlansSection.tsx",
                lineNumber: 154,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/exxonim/components/ServicePlansSection.tsx",
            lineNumber: 149,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/exxonim/components/ServicePlansSection.tsx",
        lineNumber: 140,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/src/exxonim/components/ServicesOverviewSection.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ServicesOverviewSection",
    ()=>ServicesOverviewSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/routes.ts [app-ssr] (ecmascript)");
;
;
function ServicesOverviewSection({ content }) {
    const serviceSignals = content.service_signals;
    const serviceNavGroups = content.service_nav_groups;
    const serviceFlow = content.service_flow;
    const servicePromises = content.service_promises;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "relative overflow-hidden pt-4 pb-16",
            "aria-labelledby": "services-overview-title",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "pointer-events-none absolute inset-0 -z-10",
                    "aria-hidden": "true",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,var(--color-accent-soft)_0,transparent_24%),radial-gradient(circle_at_85%_14%,var(--color-accent-soft-strong)_0,transparent_22%)]"
                        }, void 0, false, {
                            fileName: "[project]/src/exxonim/components/ServicesOverviewSection.tsx",
                            lineNumber: 25,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 opacity-90 bg-[linear-gradient(180deg,var(--color-accent-soft)_0%,transparent_24%),radial-gradient(460px_circle_at_50vw_30vh,var(--color-accent-soft)_0%,transparent_58%)]"
                        }, void 0, false, {
                            fileName: "[project]/src/exxonim/components/ServicesOverviewSection.tsx",
                            lineNumber: 26,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/exxonim/components/ServicesOverviewSection.tsx",
                    lineNumber: 24,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-[min(1240px,calc(100%-2rem))] mx-auto relative z-10 grid gap-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-5 items-stretch",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                    className: "rounded-[2rem] p-6 border border-border-soft bg-surface/82",
                                    "data-reveal": true,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "m-0 mb-3 text-[0.78rem] font-extrabold tracking-[0.16em] uppercase text-text-soft",
                                            children: content.eyebrow
                                        }, void 0, false, {
                                            fileName: "[project]/src/exxonim/components/ServicesOverviewSection.tsx",
                                            lineNumber: 33,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            id: "services-overview-title",
                                            className: "m-0 max-w-[13ch] text-[clamp(2.6rem,5vw,5rem)] leading-[0.94] tracking-[-0.06em] text-text",
                                            children: content.title
                                        }, void 0, false, {
                                            fileName: "[project]/src/exxonim/components/ServicesOverviewSection.tsx",
                                            lineNumber: 36,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-4 max-w-[42rem] text-base leading-relaxed text-text-muted",
                                            children: content.description
                                        }, void 0, false, {
                                            fileName: "[project]/src/exxonim/components/ServicesOverviewSection.tsx",
                                            lineNumber: 39,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap gap-3 mt-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    className: "inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-extrabold bg-accent text-accent-contrast transition-all hover:bg-accent-hover hover:-translate-y-0.5",
                                                    href: "#packages",
                                                    children: "See package plans"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/exxonim/components/ServicesOverviewSection.tsx",
                                                    lineNumber: 44,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    className: "inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-extrabold border border-border-soft bg-surface/80 text-text transition-all hover:bg-surface hover:-translate-y-0.5",
                                                    href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].contact,
                                                    children: "Contact Exxonim"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/exxonim/components/ServicesOverviewSection.tsx",
                                                    lineNumber: 50,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/exxonim/components/ServicesOverviewSection.tsx",
                                            lineNumber: 43,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/exxonim/components/ServicesOverviewSection.tsx",
                                    lineNumber: 32,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                                    className: "relative overflow-hidden rounded-[2rem] p-6 border border-border-soft grid gap-4 content-start bg-gradient-to-b from-accent/10 to-accent/90 text-accent-contrast",
                                    "data-reveal": true,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "pointer-events-none absolute -bottom-[28%] -right-[12%] w-56 h-56 rounded-full bg-accent-secondary/20 blur-2xl",
                                            "aria-hidden": "true"
                                        }, void 0, false, {
                                            fileName: "[project]/src/exxonim/components/ServicesOverviewSection.tsx",
                                            lineNumber: 63,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative z-10",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    className: "text-lg leading-relaxed",
                                                    children: content.panel_title
                                                }, void 0, false, {
                                                    fileName: "[project]/src/exxonim/components/ServicesOverviewSection.tsx",
                                                    lineNumber: 65,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "m-0 mt-2 text-accent-contrast/80 leading-relaxed",
                                                    children: content.panel_body
                                                }, void 0, false, {
                                                    fileName: "[project]/src/exxonim/components/ServicesOverviewSection.tsx",
                                                    lineNumber: 66,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid gap-3 mt-4",
                                                    children: serviceSignals.map((signal)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                                            className: "grid grid-cols-[72px_1fr] gap-3 items-start p-3.5 rounded-xl bg-accent-contrast/10 border border-accent-contrast/20",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "inline-flex items-center justify-center min-h-[3rem] px-2.5 rounded-full bg-accent-contrast/15 text-accent-contrast font-extrabold text-sm uppercase tracking-[0.08em]",
                                                                    children: signal.value
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/exxonim/components/ServicesOverviewSection.tsx",
                                                                    lineNumber: 74,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                            className: "block text-sm leading-tight",
                                                                            children: signal.label
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/exxonim/components/ServicesOverviewSection.tsx",
                                                                            lineNumber: 78,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "block mt-1 text-sm text-accent-contrast/75 leading-relaxed",
                                                                            children: signal.detail
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/exxonim/components/ServicesOverviewSection.tsx",
                                                                            lineNumber: 79,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/exxonim/components/ServicesOverviewSection.tsx",
                                                                    lineNumber: 77,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, signal.label, true, {
                                                            fileName: "[project]/src/exxonim/components/ServicesOverviewSection.tsx",
                                                            lineNumber: 70,
                                                            columnNumber: 21
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/exxonim/components/ServicesOverviewSection.tsx",
                                                    lineNumber: 68,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/exxonim/components/ServicesOverviewSection.tsx",
                                            lineNumber: 64,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/exxonim/components/ServicesOverviewSection.tsx",
                                    lineNumber: 59,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/exxonim/components/ServicesOverviewSection.tsx",
                            lineNumber: 31,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-4",
                            children: serviceNavGroups.map((group)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    className: "grid gap-3 p-5 rounded-[1.6rem] border border-border-soft bg-surface/82 text-inherit no-underline transition-all hover:-translate-y-1 hover:border-border-strong",
                                    href: group.href,
                                    "data-reveal": true,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-start justify-between gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    className: "text-text text-base leading-tight",
                                                    children: group.title
                                                }, void 0, false, {
                                                    fileName: "[project]/src/exxonim/components/ServicesOverviewSection.tsx",
                                                    lineNumber: 98,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "inline-flex items-center justify-center w-8 h-8 rounded-full bg-accent-soft text-accent text-base flex-shrink-0",
                                                    children: "\u2192"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/exxonim/components/ServicesOverviewSection.tsx",
                                                    lineNumber: 99,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/exxonim/components/ServicesOverviewSection.tsx",
                                            lineNumber: 97,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "m-0 text-text-muted text-sm leading-relaxed",
                                            children: group.summary
                                        }, void 0, false, {
                                            fileName: "[project]/src/exxonim/components/ServicesOverviewSection.tsx",
                                            lineNumber: 103,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            className: "m-0 p-0 list-none grid gap-2",
                                            children: group.items.slice(0, 3).map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    className: "flex items-start gap-2 text-text-soft text-sm",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "w-[0.45rem] h-[0.45rem] mt-1.5 rounded-full bg-accent/50 flex-shrink-0"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/exxonim/components/ServicesOverviewSection.tsx",
                                                            lineNumber: 107,
                                                            columnNumber: 23
                                                        }, this),
                                                        item
                                                    ]
                                                }, item, true, {
                                                    fileName: "[project]/src/exxonim/components/ServicesOverviewSection.tsx",
                                                    lineNumber: 106,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/exxonim/components/ServicesOverviewSection.tsx",
                                            lineNumber: 104,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, group.title, true, {
                                    fileName: "[project]/src/exxonim/components/ServicesOverviewSection.tsx",
                                    lineNumber: 91,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/exxonim/components/ServicesOverviewSection.tsx",
                            lineNumber: 89,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 lg:grid-cols-[0.82fr_1.18fr] gap-4 items-start",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                    className: "p-5 rounded-[1.8rem] border border-border-soft bg-surface/82 grid gap-4",
                                    "data-reveal": true,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "m-0 text-[0.78rem] font-extrabold tracking-[0.16em] uppercase text-text-soft",
                                            children: "How the work moves"
                                        }, void 0, false, {
                                            fileName: "[project]/src/exxonim/components/ServicesOverviewSection.tsx",
                                            lineNumber: 119,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "m-0 text-[clamp(2rem,3vw,3rem)] leading-none tracking-[-0.05em] text-text",
                                            children: "Less friction. Better preparation. Clearer follow-through."
                                        }, void 0, false, {
                                            fileName: "[project]/src/exxonim/components/ServicesOverviewSection.tsx",
                                            lineNumber: 120,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "m-0 text-text-muted leading-relaxed",
                                            children: "Good service support is not just about submitting forms. It is about knowing the requirement, organizing the right documents, and keeping the next action visible when the process is active."
                                        }, void 0, false, {
                                            fileName: "[project]/src/exxonim/components/ServicesOverviewSection.tsx",
                                            lineNumber: 121,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid gap-2.5",
                                            children: servicePromises.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start gap-2.5 p-3 rounded-[1rem] bg-surface-strong/70 border border-border-soft text-text text-sm leading-relaxed",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "w-2 h-2 mt-1.5 rounded-full bg-accent flex-shrink-0"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/exxonim/components/ServicesOverviewSection.tsx",
                                                            lineNumber: 133,
                                                            columnNumber: 21
                                                        }, this),
                                                        item
                                                    ]
                                                }, item, true, {
                                                    fileName: "[project]/src/exxonim/components/ServicesOverviewSection.tsx",
                                                    lineNumber: 129,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/exxonim/components/ServicesOverviewSection.tsx",
                                            lineNumber: 127,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/exxonim/components/ServicesOverviewSection.tsx",
                                    lineNumber: 118,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                                    children: serviceFlow.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                            className: "p-5 rounded-[1.5rem] border border-border-soft bg-surface/82 grid gap-3 content-start",
                                            "data-reveal": true,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "inline-flex items-center justify-center w-fit min-h-[2rem] px-3 rounded-full bg-accent-soft text-accent text-[0.78rem] font-extrabold tracking-[0.14em]",
                                                    children: item.step
                                                }, void 0, false, {
                                                    fileName: "[project]/src/exxonim/components/ServicesOverviewSection.tsx",
                                                    lineNumber: 147,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    className: "text-text text-base leading-tight",
                                                    children: item.title
                                                }, void 0, false, {
                                                    fileName: "[project]/src/exxonim/components/ServicesOverviewSection.tsx",
                                                    lineNumber: 150,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "m-0 text-text-muted leading-relaxed",
                                                    children: item.detail
                                                }, void 0, false, {
                                                    fileName: "[project]/src/exxonim/components/ServicesOverviewSection.tsx",
                                                    lineNumber: 151,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, item.step, true, {
                                            fileName: "[project]/src/exxonim/components/ServicesOverviewSection.tsx",
                                            lineNumber: 142,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/exxonim/components/ServicesOverviewSection.tsx",
                                    lineNumber: 140,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/exxonim/components/ServicesOverviewSection.tsx",
                            lineNumber: 117,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/exxonim/components/ServicesOverviewSection.tsx",
                    lineNumber: 29,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/exxonim/components/ServicesOverviewSection.tsx",
            lineNumber: 19,
            columnNumber: 7
        }, this)
    }, void 0, false);
}
}),
"[project]/src/exxonim/services/pageService.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCachedPageBySlug",
    ()=>getCachedPageBySlug,
    "getPageBySlug",
    ()=>getPageBySlug
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$app$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/app/apiClient.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$shared$2f$api$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/shared/api/routes.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$shared$2f$publicContentCache$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/shared/publicContentCache.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$contentMappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/utils/contentMappers.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$services$2f$staticFallbackService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/services/staticFallbackService.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$content$2f$fallbackPublicContent$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/exxonim/content/fallbackPublicContent.ts [app-ssr] (ecmascript) <locals>");
;
;
;
;
;
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$services$2f$staticFallbackService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["preloadStaticFallback"])("pages");
const PAGE_TTL_MS = 1000 * 60 * 60 * 6;
function pageCacheKey(slug) {
    return `pages:${slug}`;
}
function isPageRecord(value) {
    return Boolean(value && typeof value.slug === "string");
}
async function fetchFreshPageBySlug(slug) {
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$app$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$shared$2f$api$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiRoutes"].public.pages.bySlug(slug));
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$utils$2f$contentMappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapPage"])(response.data);
}
function getCachedPageBySlug(slug) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$shared$2f$publicContentCache$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCachedPublicContent"])(pageCacheKey(slug), (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$services$2f$staticFallbackService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getStaticFallback"])("pages") ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$content$2f$fallbackPublicContent$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getFallbackPage"])(slug));
}
async function getPageBySlug(slug) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$shared$2f$publicContentCache$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchWithFallback"])({
        cacheKey: pageCacheKey(slug),
        fallbackValue: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$services$2f$staticFallbackService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getStaticFallback"])("pages") ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$content$2f$fallbackPublicContent$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getFallbackPage"])(slug),
        fetcher: ()=>fetchFreshPageBySlug(slug),
        ttlMs: PAGE_TTL_MS,
        validate: isPageRecord,
        warningLabel: `Using cached or default page content for "${slug}".`
    });
}
}),
"[project]/src/exxonim/hooks/usePage.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePage",
    ()=>usePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$services$2f$pageService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/services/pageService.ts [app-ssr] (ecmascript)");
;
;
function usePage(slug) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "pages",
            slug
        ],
        queryFn: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$services$2f$pageService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPageBySlug"])(slug),
        initialData: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$services$2f$pageService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCachedPageBySlug"])(slug),
        refetchOnMount: true,
        refetchOnReconnect: "always",
        staleTime: 1000 * 60 * 60
    });
}
}),
"[project]/src/exxonim/hooks/useSiteSetting.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSiteSetting",
    ()=>useSiteSetting
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$services$2f$siteSettingsService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/services/siteSettingsService.ts [app-ssr] (ecmascript)");
;
;
function useSiteSetting(key) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "site-settings",
            key
        ],
        queryFn: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$services$2f$siteSettingsService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSiteSetting"])(key),
        initialData: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$services$2f$siteSettingsService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCachedSiteSetting"])(key),
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
"[project]/src/exxonim/seo/constants.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/src/exxonim/seo/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildAbsoluteUrl",
    ()=>buildAbsoluteUrl,
    "escapeSeoValue",
    ()=>escapeSeoValue,
    "toCanonicalPath",
    ()=>toCanonicalPath
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/routes.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/seo/constants.ts [app-ssr] (ecmascript)");
;
;
function buildAbsoluteUrl(path, baseUrl = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["siteOrigin"]) {
    return new URL(path, baseUrl).toString();
}
function toCanonicalPath(pathname) {
    const normalizedPathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizePathname"])(pathname);
    if (normalizedPathname === (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizePathname"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].home)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].home;
    }
    if (normalizedPathname === (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizePathname"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].notFound)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].notFound;
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
"[project]/src/exxonim/seo/apply-seo.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applyResolvedSeo",
    ()=>applyResolvedSeo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/seo/constants.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$seo$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/seo/utils.ts [app-ssr] (ecmascript)");
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
    const canonicalUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$seo$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildAbsoluteUrl"])(seo.canonicalPath, seo.canonicalBaseUrl ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["siteOrigin"]);
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
"[project]/src/exxonim/seo/create-seo.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createBlogPostSeo",
    ()=>createBlogPostSeo,
    "createFallbackSeo",
    ()=>createFallbackSeo,
    "createPageSeo",
    ()=>createPageSeo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/routes.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/seo/constants.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$seo$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/seo/utils.ts [app-ssr] (ecmascript)");
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
    const normalizedPathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizePathname"])(pathname);
    const canonicalBaseUrl = options.canonicalBaseUrl ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["siteOrigin"];
    return {
        title: options.title ?? "Content unavailable",
        description: options.description ?? "This content is temporarily unavailable.",
        canonicalPath: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$seo$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toCanonicalPath"])(normalizedPathname),
        image: options.image ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDefaultShareImageUrl"])(canonicalBaseUrl),
        type: options.type ?? ((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getResourcePostSlug"])(normalizedPathname) ? "article" : "website"),
        robots: options.robots ?? "noindex,follow",
        canonicalBaseUrl
    };
}
function createPageSeo(page, options) {
    const canonicalBaseUrl = options.canonicalBaseUrl ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["siteOrigin"];
    return {
        title: titleWithBrand(page.metaTitle ?? page.title),
        description: page.metaDescription ?? options.defaultDescription ?? page.title,
        canonicalPath: options.canonicalPath,
        image: page.ogImageUrl ?? options.defaultImage ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDefaultShareImageUrl"])(canonicalBaseUrl),
        type: "website",
        robots: options.robots ?? "index,follow",
        canonicalBaseUrl
    };
}
function createBlogPostSeo(post, options = {}) {
    const canonicalBaseUrl = options.canonicalBaseUrl ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["siteOrigin"];
    return {
        title: titleWithBrand(post.metaTitle ?? post.title),
        description: post.metaDescription ?? post.excerpt ?? options.defaultDescription ?? post.title,
        canonicalPath: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resourceArticlePath"])(post.slug),
        image: post.coverImageSrc ?? options.defaultImage ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDefaultShareImageUrl"])(canonicalBaseUrl),
        type: "article",
        robots: options.robots ?? "index,follow",
        canonicalBaseUrl
    };
}
}),
"[project]/src/exxonim/seo/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$seo$2f$apply$2d$seo$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/seo/apply-seo.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$seo$2f$create$2d$seo$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/seo/create-seo.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$seo$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/seo/utils.ts [app-ssr] (ecmascript)");
;
;
;
;
}),
"[project]/src/exxonim/hooks/useResolvedSeo.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useResolvedBlogSeo",
    ()=>useResolvedBlogSeo,
    "useResolvedPageSeo",
    ()=>useResolvedPageSeo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$hooks$2f$useSiteSetting$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/hooks/useSiteSetting.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$seo$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/exxonim/seo/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$seo$2f$apply$2d$seo$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/seo/apply-seo.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$seo$2f$create$2d$seo$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/seo/create-seo.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/seo/constants.ts [app-ssr] (ecmascript)");
;
;
;
function toRobots(value) {
    return value ? `${value.robotsIndex ? "index" : "noindex"},${value.robotsFollow ? "follow" : "nofollow"}` : "index,follow";
}
function toCanonicalBaseUrl(value) {
    return value?.canonicalBaseUrl ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["siteOrigin"];
}
function toDefaultDescription(value) {
    return value?.defaultMetaDescription ?? undefined;
}
function toDefaultImage(value) {
    if (value?.defaultShareImageUrl) {
        return value.defaultShareImageUrl;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$seo$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDefaultShareImageUrl"])(toCanonicalBaseUrl(value));
}
function useResolvedPageSeo(page, canonicalPath) {
    const { data: seoDefaultsSetting } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$hooks$2f$useSiteSetting$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiteSetting"])("seo_defaults");
    const seoDefaults = seoDefaultsSetting?.value;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!page) {
            return;
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$seo$2f$apply$2d$seo$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["applyResolvedSeo"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$seo$2f$create$2d$seo$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPageSeo"])(page, {
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
    const { data: seoDefaultsSetting } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$hooks$2f$useSiteSetting$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiteSetting"])("seo_defaults");
    const seoDefaults = seoDefaultsSetting?.value;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!post) {
            return;
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$seo$2f$apply$2d$seo$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["applyResolvedSeo"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$seo$2f$create$2d$seo$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createBlogPostSeo"])(post, {
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
"[project]/src/exxonim/pages/ServicesPage.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ServicesPage",
    ()=>ServicesPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$Breadcrumb$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/components/Breadcrumb.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$ComplianceCalendarSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/components/ComplianceCalendarSection.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$EngineSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/components/EngineSection.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$ExxonimApartSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/components/ExxonimApartSection.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$LoadBoundary$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/components/LoadBoundary.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$ServicePlansSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/components/ServicePlansSection.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$ServicesOverviewSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/components/ServicesOverviewSection.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$hooks$2f$usePage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/hooks/usePage.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$hooks$2f$useResolvedSeo$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/hooks/useResolvedSeo.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exxonim/routes.ts [app-ssr] (ecmascript)");
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
function ServicesPage() {
    const { data: page, isPending, error } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$hooks$2f$usePage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePage"])("services");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$hooks$2f$useResolvedSeo$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useResolvedPageSeo"])(page, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].services);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$LoadBoundary$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LoadBoundary"], {
        error: error,
        errorDetail: "The services page content could not be loaded right now.",
        errorTitle: "Unable to load services.",
        isPending: isPending,
        isReady: Boolean(page),
        loadingLabel: "Loading services...",
        children: ()=>{
            if (!page) return null;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-[min(1240px,calc(100%-2rem))] mx-auto px-4 sm:px-6 lg:px-8 pt-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$Breadcrumb$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Breadcrumb"], {
                            items: [
                                {
                                    label: "Home",
                                    href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].home
                                },
                                {
                                    label: "Services"
                                }
                            ]
                        }, void 0, false, {
                            fileName: "[project]/src/exxonim/pages/ServicesPage.tsx",
                            lineNumber: 29,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/exxonim/pages/ServicesPage.tsx",
                        lineNumber: 28,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$ServicesOverviewSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ServicesOverviewSection"], {
                        content: page.content.overview
                    }, void 0, false, {
                        fileName: "[project]/src/exxonim/pages/ServicesPage.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$EngineSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EngineSection"], {
                        content: page.content.catalog
                    }, void 0, false, {
                        fileName: "[project]/src/exxonim/pages/ServicesPage.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$ExxonimApartSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ExxonimApartSection"], {}, void 0, false, {
                        fileName: "[project]/src/exxonim/pages/ServicesPage.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$ComplianceCalendarSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ComplianceCalendarSection"], {}, void 0, false, {
                        fileName: "[project]/src/exxonim/pages/ServicesPage.tsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exxonim$2f$components$2f$ServicePlansSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ServicePackagesSection"], {
                        variant: "page"
                    }, void 0, false, {
                        fileName: "[project]/src/exxonim/pages/ServicesPage.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true);
        }
    }, void 0, false, {
        fileName: "[project]/src/exxonim/pages/ServicesPage.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_exxonim_0m465i-._.js.map