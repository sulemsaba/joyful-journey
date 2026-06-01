(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TrackConsultationPage",
    ()=>TrackConsultationPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * Track Your Consultation page — Exxonim's CORE DIFFERENTIATOR.
 *
 * BACKEND / ADMIN INTEGRATION NOTES (FastAPI + PostgreSQL):
 * ─────────────────────────────────────────────────────
 * This page describes Exxonim's automated consultation tracking system.
 * It is NOT a self-service dashboard — there is no login, no password.
 *
 * The system works like this:
 *   1. Upon engagement, the client receives a unique consultation tracking number (e.g., EXX-24091).
 *   2. At every key milestone (name clearance, document submission, under review,
 *      approval, issuance, renewal reminders), the system sends a proactive update
 *      via WhatsApp, email, or SMS — the client chooses their preferred channel.
 *   3. The client never needs to call the office to ask "What's happening?"
 *   4. If a client wants to check status independently, they can visit the Exxonim
 *      website, enter their tracking number, and receive a direct response with the
 *      current status — no login required.
 *
 * WHY THIS WINS:
 *   It removes the number-one frustration in Tanzanian government processes:
 *   silence and uncertainty. No competitor in Tanzania advertises any form of
 *   proactive client tracking or status lookup.
 *
 * PLANNED BACKEND ENDPOINTS:
 *   GET /api/v1/consultations/{reference_id}
 *     → Returns: { status, current_stage, milestones: [...], next_action, last_updated }
 *   POST /api/v1/consultations/lookup
 *     → Body: { reference_id: string }
 *     → Returns: same as above (for the website lookup form)
 *
 * When the admin panel is built, this page's text content should be manageable
 * via the pages API (like other pages). The tracking number lookup form will
 * connect to the FastAPI endpoint above.
 *
 * Image requirements (when adding visuals):
 *   - Hero illustration: SVG or WebP, max 600×400px, aspect ratio 3:2.
 *   - Step icons: SVG, 24×24px viewbox, single-color (uses currentColor).
 *   - All images served via CDN (/media/ endpoint from admin upload).
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/joyful-journey/src/exxonim/routes.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
function getMockTrackingResult(id) {
    const normalized = id.trim().toUpperCase();
    return {
        trackingId: normalized,
        serviceType: "Company Registration",
        status: "In Progress",
        currentStage: "Document Review",
        preferredChannel: "WhatsApp",
        submittedDate: "2026-02-18",
        estimatedCompletion: "2026-03-15",
        lastUpdated: "2026-03-04 09:42 AM",
        nextAction: "Awaiting BRELA name clearance approval. You will receive a WhatsApp notification once approved.",
        milestones: [
            {
                label: "Consultation Received",
                detail: "Your consultation was received and a tracking number was assigned.",
                date: "18 Feb 2026",
                status: "completed"
            },
            {
                label: "Name Clearance Filed",
                detail: "Application for company name clearance submitted to BRELA.",
                date: "20 Feb 2026",
                status: "completed"
            },
            {
                label: "Name Approved",
                detail: 'Company name "Alak Ventures Ltd" approved by BRELA.',
                date: "26 Feb 2026",
                status: "completed"
            },
            {
                label: "Document Review",
                detail: "Memorandum & Articles of Association prepared and submitted for internal review.",
                date: "02 Mar 2026",
                status: "current"
            },
            {
                label: "BRELA Submission",
                detail: "Incorporation documents to be filed with BRELA.",
                date: "—",
                status: "upcoming"
            },
            {
                label: "Certificate Issued",
                detail: "Certificate of Incorporation issued and delivered to you.",
                date: "—",
                status: "upcoming"
            }
        ]
    };
}
/* ─────────────────────────────────────────────────────────
 * STATIC CONTENT
 * ───────────────────────────────────────────────────────── */ const STEPS = [
    {
        step: "01",
        title: "Receive your tracking number",
        description: "Upon engagement, Exxonim assigns you a unique reference ID (e.g., EXX-24091). This number follows your case from start to resolution."
    },
    {
        step: "02",
        title: "Get proactive updates automatically",
        description: "At every milestone — name clearance, document submission, under review, approval, issuance — Exxonim sends you an update via your preferred channel: WhatsApp, email, or SMS."
    },
    {
        step: "03",
        title: "Look up your status anytime",
        description: "Want to check independently? Enter your tracking number on this page and get an instant status update. No login, no password, no dashboard — just a direct answer."
    },
    {
        step: "04",
        title: "Receive your documents",
        description: "Once the authority approves and issues your documents, Exxonim confirms the outcome and delivers the final registration certificate, licence, or filing confirmation."
    }
];
const CHANNELS = [
    {
        icon: "💬",
        label: "WhatsApp",
        detail: "Instant messages to your number"
    },
    {
        icon: "📧",
        label: "Email",
        detail: "Structured updates with documents attached"
    },
    {
        icon: "📱",
        label: "SMS",
        detail: "Brief status notifications on the go"
    }
];
/* ─────────────────────────────────────────────────────────
 * TRACKING RESULT COMPONENT
 * ───────────────────────────────────────────────────────── */ function TrackingResult({ result }) {
    const completedCount = result.milestones.filter((m)=>m.status === "completed").length;
    const totalCount = result.milestones.length;
    const progressPercent = Math.round(completedCount / totalCount * 100);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid gap-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-[1.35rem] border border-border-soft bg-surface-elevated overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-1.5 bg-surface-soft",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-full bg-accent transition-all duration-700 ease-out rounded-r-full",
                            style: {
                                width: `${progressPercent}%`
                            }
                        }, void 0, false, {
                            fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                            lineNumber: 193,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                        lineNumber: 192,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-6 md:p-8 grid gap-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-start justify-between gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[0.68rem] font-extrabold tracking-[0.18em] uppercase text-text-muted",
                                                children: "Tracking Number"
                                            }, void 0, false, {
                                                fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                                lineNumber: 203,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-2xl md:text-3xl font-mono font-bold text-text tracking-tight",
                                                children: result.trackingId
                                            }, void 0, false, {
                                                fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                                lineNumber: 206,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                        lineNumber: 202,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-soft text-accent text-sm font-extrabold",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "relative flex h-2 w-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"
                                                    }, void 0, false, {
                                                        fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                                        lineNumber: 212,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "relative inline-flex rounded-full h-2 w-2 bg-accent"
                                                    }, void 0, false, {
                                                        fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                                        lineNumber: 213,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                                lineNumber: 211,
                                                columnNumber: 15
                                            }, this),
                                            result.status
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                        lineNumber: 210,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                lineNumber: 201,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-border-soft",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DetailItem, {
                                        label: "Service",
                                        value: result.serviceType
                                    }, void 0, false, {
                                        fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                        lineNumber: 221,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DetailItem, {
                                        label: "Current Stage",
                                        value: result.currentStage
                                    }, void 0, false, {
                                        fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                        lineNumber: 222,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DetailItem, {
                                        label: "Submitted",
                                        value: formatDate(result.submittedDate)
                                    }, void 0, false, {
                                        fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                        lineNumber: 223,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DetailItem, {
                                        label: "Est. Completion",
                                        value: formatDate(result.estimatedCompletion)
                                    }, void 0, false, {
                                        fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                        lineNumber: 227,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                lineNumber: 220,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid gap-2 p-4 rounded-xl bg-accent-soft/40 border border-accent/10",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[0.68rem] font-extrabold tracking-[0.16em] uppercase text-accent",
                                        children: "Next Action"
                                    }, void 0, false, {
                                        fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                        lineNumber: 235,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "m-0 text-text text-sm leading-relaxed",
                                        children: result.nextAction
                                    }, void 0, false, {
                                        fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                        lineNumber: 238,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                lineNumber: 234,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center justify-between gap-3 text-xs text-text-muted",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-flex items-center gap-1.5",
                                        children: [
                                            result.preferredChannel === "WhatsApp" && "💬",
                                            result.preferredChannel === "Email" && "📧",
                                            result.preferredChannel === "SMS" && "📱",
                                            "Updates via ",
                                            result.preferredChannel
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                        lineNumber: 245,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "Last updated: ",
                                            result.lastUpdated
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                        lineNumber: 251,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                lineNumber: 244,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                        lineNumber: 199,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                lineNumber: 190,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-[1.35rem] border border-border-soft bg-surface-elevated p-6 md:p-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "m-0 text-lg font-semibold text-text",
                                children: "Consultation Timeline"
                            }, void 0, false, {
                                fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                lineNumber: 259,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-text-muted font-mono",
                                children: [
                                    completedCount,
                                    "/",
                                    totalCount,
                                    " complete"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                lineNumber: 262,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                        lineNumber: 258,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-0",
                        children: result.milestones.map((milestone, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MilestoneItem, {
                                milestone: milestone,
                                isLast: index === result.milestones.length - 1
                            }, milestone.label, false, {
                                fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                lineNumber: 269,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                        lineNumber: 267,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                lineNumber: 257,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
        lineNumber: 188,
        columnNumber: 5
    }, this);
}
_c = TrackingResult;
function DetailItem({ label, value }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid gap-0.5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[0.68rem] font-extrabold tracking-[0.14em] uppercase text-text-muted",
                children: label
            }, void 0, false, {
                fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                lineNumber: 284,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-sm font-semibold text-text",
                children: value
            }, void 0, false, {
                fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                lineNumber: 287,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
        lineNumber: 283,
        columnNumber: 5
    }, this);
}
_c1 = DetailItem;
function MilestoneItem({ milestone, isLast }) {
    const isCompleted = milestone.status === "completed";
    const isCurrent = milestone.status === "current";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex gap-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center border-2 transition-all ${isCompleted ? "bg-accent border-accent" : isCurrent ? "bg-accent/20 border-accent" : "bg-surface-soft border-border-soft"}`,
                        children: [
                            isCompleted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-2.5 h-2.5 text-accent-contrast",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                stroke: "currentColor",
                                strokeWidth: 3,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    d: "M5 13l4 4L19 7"
                                }, void 0, false, {
                                    fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                    lineNumber: 323,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                lineNumber: 316,
                                columnNumber: 13
                            }, this),
                            isCurrent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "w-2 h-2 rounded-full bg-accent animate-pulse"
                            }, void 0, false, {
                                fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                lineNumber: 331,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                        lineNumber: 306,
                        columnNumber: 9
                    }, this),
                    !isLast && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `w-0.5 flex-1 min-h-[2rem] ${isCompleted ? "bg-accent/40" : "bg-border-soft"}`
                    }, void 0, false, {
                        fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                        lineNumber: 335,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                lineNumber: 305,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `pb-6 ${isLast ? "pb-0" : ""}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `text-sm font-semibold ${isCompleted ? "text-text" : isCurrent ? "text-accent" : "text-text-muted"}`,
                                children: milestone.label
                            }, void 0, false, {
                                fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                lineNumber: 346,
                                columnNumber: 11
                            }, this),
                            isCurrent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[0.62rem] font-extrabold tracking-[0.12em] uppercase px-2 py-0.5 rounded-full bg-accent-soft text-accent",
                                children: "Current"
                            }, void 0, false, {
                                fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                lineNumber: 358,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                        lineNumber: 345,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: `m-0 mt-1 text-sm leading-relaxed ${isCompleted || isCurrent ? "text-text-muted" : "text-text-soft"}`,
                        children: milestone.detail
                    }, void 0, false, {
                        fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                        lineNumber: 363,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `text-xs mt-1 inline-block font-mono ${isCompleted || isCurrent ? "text-text-muted/70" : "text-text-soft/50"}`,
                        children: milestone.date
                    }, void 0, false, {
                        fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                        lineNumber: 370,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                lineNumber: 344,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
        lineNumber: 303,
        columnNumber: 5
    }, this);
}
_c2 = MilestoneItem;
function formatDate(dateStr) {
    try {
        const d = new Date(dateStr + "T00:00:00");
        return d.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    } catch  {
        return dateStr;
    }
}
/* ─────────────────────────────────────────────────────────
 * NOT FOUND COMPONENT
 * ───────────────────────────────────────────────────────── */ function TrackingNotFound({ id }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-[1.35rem] border border-border-soft bg-surface-elevated p-6 md:p-8 text-center grid gap-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-14 h-14 rounded-full bg-surface-soft mx-auto flex items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-7 h-7 text-text-muted",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    strokeWidth: 1.5,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    }, void 0, false, {
                        fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                        lineNumber: 409,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                    lineNumber: 402,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                lineNumber: 401,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "m-0 text-lg font-semibold text-text",
                        children: "No consultation found"
                    }, void 0, false, {
                        fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                        lineNumber: 417,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "m-0 text-text-muted text-sm leading-relaxed max-w-[28rem] mx-auto",
                        children: [
                            "We couldn’t find a consultation with tracking number",
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                className: "font-mono text-text",
                                children: id.toUpperCase()
                            }, void 0, false, {
                                fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                lineNumber: 422,
                                columnNumber: 11
                            }, this),
                            ". Please double-check the number and try again. If the issue persists, contact Exxonim directly for assistance."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                        lineNumber: 420,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                lineNumber: 416,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap gap-3 justify-center pt-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].contact,
                        className: "inline-flex items-center justify-center min-h-[2.75rem] px-5 rounded-full bg-accent text-accent-contrast text-sm font-extrabold transition-all hover:bg-accent-hover",
                        children: "Contact Exxonim"
                    }, void 0, false, {
                        fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                        lineNumber: 428,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].support,
                        className: "inline-flex items-center justify-center min-h-[2.75rem] px-5 rounded-full border border-border-soft bg-surface text-text text-sm font-extrabold transition-all hover:bg-accent-soft",
                        children: "Get Support"
                    }, void 0, false, {
                        fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                        lineNumber: 434,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                lineNumber: 427,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
        lineNumber: 400,
        columnNumber: 5
    }, this);
}
_c3 = TrackingNotFound;
function TrackConsultationPage() {
    _s();
    const [trackingId, setTrackingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [lookupResult, setLookupResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [notFound, setNotFound] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSearching, setIsSearching] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleLookup = (e)=>{
        e.preventDefault();
        const trimmed = trackingId.trim();
        if (!trimmed) return;
        setIsSearching(true);
        setNotFound(false);
        setLookupResult(null);
        // BACKEND: Replace this setTimeout with a real API call:
        // POST /api/v1/consultations/lookup { reference_id: trimmed }
        // On 404 → setNotFound(true), on success → setLookupResult(data)
        setTimeout(()=>{
            // Demo: show a realistic mock result for any tracking number entered
            const result = getMockTrackingResult(trimmed);
            setLookupResult(result);
            setIsSearching(false);
        }, 800);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 -z-10 opacity-70",
                        style: {
                            background: "radial-gradient(60% 50% at 80% 0%, hsl(var(--accent) / 0.18), transparent 70%), radial-gradient(40% 40% at 10% 20%, hsl(var(--accent) / 0.10), transparent 70%)"
                        }
                    }, void 0, false, {
                        fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                        lineNumber: 480,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-[min(1240px,calc(100%-2rem))] mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid gap-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "inline-flex items-center gap-2 text-accent text-xs font-extrabold tracking-[0.18em] uppercase",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "relative flex h-2 w-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"
                                                    }, void 0, false, {
                                                        fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                                        lineNumber: 491,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "relative inline-flex rounded-full h-2 w-2 bg-accent"
                                                    }, void 0, false, {
                                                        fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                                        lineNumber: 492,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                                lineNumber: 490,
                                                columnNumber: 15
                                            }, this),
                                            "Consultation Tracking"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                        lineNumber: 489,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "m-0 text-[clamp(2.4rem,5vw,4.4rem)] font-semibold leading-[1.05] tracking-tight text-text",
                                        children: "Never ask “What’s happening?” again"
                                    }, void 0, false, {
                                        fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                        lineNumber: 496,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "m-0 text-text-muted text-lg max-w-[36rem]",
                                        children: "Exxonim’s automated tracking system sends you proactive updates at every milestone — via WhatsApp, email, or SMS. No need to call the office. Just enter your tracking number for an instant status check."
                                    }, void 0, false, {
                                        fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                        lineNumber: 499,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap gap-3 pt-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                className: "inline-flex items-center justify-center min-h-[3.25rem] px-6 rounded-full bg-accent text-accent-contrast text-sm font-extrabold shadow-accent-glow transition-all hover:-translate-y-0.5 hover:bg-accent-hover",
                                                href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].contact,
                                                children: "Request a Consultation"
                                            }, void 0, false, {
                                                fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                                lineNumber: 506,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                className: "inline-flex items-center justify-center min-h-[3.25rem] px-6 rounded-full border border-border-soft bg-surface/60 backdrop-blur text-text text-sm font-extrabold transition-all hover:-translate-y-0.5 hover:bg-accent-soft",
                                                href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].services,
                                                children: "View All Services"
                                            }, void 0, false, {
                                                fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                                lineNumber: 512,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                        lineNumber: 505,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                lineNumber: 488,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-[2rem] border border-border-soft bg-surface/70 backdrop-blur p-8 grid gap-5 shadow-button",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[0.72rem] font-extrabold tracking-[0.2em] uppercase text-accent",
                                            children: "Look up your consultation"
                                        }, void 0, false, {
                                            fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                            lineNumber: 524,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                            onSubmit: handleLookup,
                                            className: "grid gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    htmlFor: "tracking-id",
                                                    className: "sr-only",
                                                    children: "Tracking number"
                                                }, void 0, false, {
                                                    fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                                    lineNumber: 528,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    id: "tracking-id",
                                                    type: "text",
                                                    value: trackingId,
                                                    onChange: (e)=>{
                                                        setTrackingId(e.target.value);
                                                        setLookupResult(null);
                                                        setNotFound(false);
                                                    },
                                                    placeholder: "e.g., EXX-24091",
                                                    className: "w-full h-12 px-4 rounded-xl border border-border-soft bg-surface text-text text-sm font-mono placeholder:text-text-soft/50 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
                                                }, void 0, false, {
                                                    fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                                    lineNumber: 531,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "submit",
                                                    disabled: isSearching || !trackingId.trim(),
                                                    className: "w-full inline-flex items-center justify-center min-h-[2.75rem] rounded-xl bg-accent text-accent-contrast text-sm font-extrabold transition-all hover:bg-accent-hover disabled:opacity-60 disabled:cursor-not-allowed",
                                                    children: isSearching ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "inline-flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                className: "animate-spin h-4 w-4",
                                                                viewBox: "0 0 24 24",
                                                                fill: "none",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                                        className: "opacity-25",
                                                                        cx: "12",
                                                                        cy: "12",
                                                                        r: "10",
                                                                        stroke: "currentColor",
                                                                        strokeWidth: "4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                                                        lineNumber: 555,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        className: "opacity-75",
                                                                        fill: "currentColor",
                                                                        d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                                                        lineNumber: 563,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                                                lineNumber: 550,
                                                                columnNumber: 23
                                                            }, this),
                                                            "Checking…"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                                        lineNumber: 549,
                                                        columnNumber: 21
                                                    }, this) : "Check Status"
                                                }, void 0, false, {
                                                    fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                                    lineNumber: 543,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                            lineNumber: 527,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-3 gap-3 pt-4 border-t border-border-soft",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            className: "text-[1.5rem] leading-none text-text",
                                                            children: "4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                                            lineNumber: 578,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs text-text-muted",
                                                            children: "Stages"
                                                        }, void 0, false, {
                                                            fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                                            lineNumber: 581,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                                    lineNumber: 577,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            className: "text-[1.5rem] leading-none text-text",
                                                            children: "3"
                                                        }, void 0, false, {
                                                            fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                                            lineNumber: 584,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs text-text-muted",
                                                            children: "Channels"
                                                        }, void 0, false, {
                                                            fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                                            lineNumber: 587,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                                    lineNumber: 583,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            className: "text-[1.5rem] leading-none text-accent",
                                                            children: "0"
                                                        }, void 0, false, {
                                                            fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                                            lineNumber: 590,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs text-text-muted",
                                                            children: "Logins needed"
                                                        }, void 0, false, {
                                                            fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                                            lineNumber: 593,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                                    lineNumber: 589,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                            lineNumber: 576,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                    lineNumber: 523,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                lineNumber: 522,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                        lineNumber: 487,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                lineNumber: 479,
                columnNumber: 7
            }, this),
            (lookupResult || notFound) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "pb-16 md:pb-20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-[min(1240px,calc(100%-2rem))] mx-auto max-w-[52rem]",
                    children: [
                        lookupResult && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TrackingResult, {
                            result: lookupResult
                        }, void 0, false, {
                            fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                            lineNumber: 605,
                            columnNumber: 30
                        }, this),
                        notFound && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TrackingNotFound, {
                            id: trackingId
                        }, void 0, false, {
                            fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                            lineNumber: 606,
                            columnNumber: 26
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                    lineNumber: 604,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                lineNumber: 603,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-16 md:py-20 bg-surface-soft/40",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-[min(1240px,calc(100%-2rem))] mx-auto grid gap-10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-3 max-w-[42rem]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[0.72rem] font-extrabold tracking-[0.2em] uppercase text-accent",
                                    children: "How it works"
                                }, void 0, false, {
                                    fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                    lineNumber: 615,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "m-0 text-[clamp(1.8rem,3vw,2.6rem)] font-semibold tracking-tight text-text",
                                    children: "Automated updates — not a dashboard, not a portal"
                                }, void 0, false, {
                                    fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                    lineNumber: 618,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "m-0 text-text-muted max-w-[36rem]",
                                    children: "This is not software you log into. It is Exxonim’s operating backbone — included free with every engagement. You receive proactive updates automatically, and can check your status on the website anytime."
                                }, void 0, false, {
                                    fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                    lineNumber: 621,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                            lineNumber: 614,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
                            children: STEPS.map((step)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                    className: "group relative p-6 rounded-[1.35rem] border border-border-soft bg-surface-elevated transition-all hover:-translate-y-1 hover:border-accent/40",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[2.5rem] leading-none font-mono text-text-muted/30",
                                            children: step.step
                                        }, void 0, false, {
                                            fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                            lineNumber: 634,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            className: "block mt-3 text-text text-base",
                                            children: step.title
                                        }, void 0, false, {
                                            fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                            lineNumber: 637,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "m-0 mt-2 text-text-muted text-sm leading-relaxed",
                                            children: step.description
                                        }, void 0, false, {
                                            fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                            lineNumber: 640,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, step.step, true, {
                                    fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                    lineNumber: 630,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                            lineNumber: 628,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                    lineNumber: 613,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                lineNumber: 612,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-16 md:py-20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-[min(1240px,calc(100%-2rem))] mx-auto grid gap-10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-3 max-w-[42rem]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[0.72rem] font-extrabold tracking-[0.2em] uppercase text-accent",
                                    children: "Your preferred channel"
                                }, void 0, false, {
                                    fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                    lineNumber: 653,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "m-0 text-[clamp(1.8rem,3vw,2.6rem)] font-semibold tracking-tight text-text",
                                    children: "Choose how you receive updates"
                                }, void 0, false, {
                                    fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                    lineNumber: 656,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "m-0 text-text-muted max-w-[36rem]",
                                    children: "At engagement, you choose one preferred channel. Every milestone update is delivered there automatically — you never need to check a portal or log into a system."
                                }, void 0, false, {
                                    fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                    lineNumber: 659,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                            lineNumber: 652,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 sm:grid-cols-3 gap-4",
                            children: CHANNELS.map((channel)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                    className: "p-6 rounded-[1.35rem] border border-border-soft bg-surface-elevated transition-all hover:-translate-y-1 hover:border-accent/40",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-3xl",
                                            "aria-hidden": "true",
                                            children: channel.icon
                                        }, void 0, false, {
                                            fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                            lineNumber: 671,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            className: "block mt-3 text-text text-base",
                                            children: channel.label
                                        }, void 0, false, {
                                            fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                            lineNumber: 674,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "m-0 mt-1.5 text-text-muted text-sm",
                                            children: channel.detail
                                        }, void 0, false, {
                                            fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                            lineNumber: 677,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, channel.label, true, {
                                    fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                    lineNumber: 667,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                            lineNumber: 665,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                    lineNumber: 651,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                lineNumber: 650,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-16 md:py-20 bg-surface-soft/40",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-[min(1240px,calc(100%-2rem))] mx-auto grid gap-8 max-w-[54rem] text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[0.72rem] font-extrabold tracking-[0.2em] uppercase text-accent",
                            children: "Why this wins"
                        }, void 0, false, {
                            fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                            lineNumber: 689,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "m-0 text-[clamp(1.8rem,3vw,2.6rem)] font-semibold tracking-tight text-text",
                            children: "The number-one frustration in Tanzanian government processes is silence."
                        }, void 0, false, {
                            fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                            lineNumber: 692,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "m-0 text-text-muted text-lg leading-relaxed max-w-[42rem] mx-auto",
                            children: "No competitor in Tanzania advertises proactive client tracking or application status lookup. Exxonim’s automated system removes the uncertainty — you know what is complete, what is pending, and what comes next at every stage. This positions Exxonim as uniquely transparent, accountable, and professional."
                        }, void 0, false, {
                            fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                            lineNumber: 696,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                    lineNumber: 688,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                lineNumber: 687,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "pb-20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-[min(1240px,calc(100%-2rem))] mx-auto",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative overflow-hidden rounded-[2rem] p-10 md:p-14 grid gap-6 text-center border border-border-soft",
                        style: {
                            background: "radial-gradient(80% 100% at 50% 0%, hsl(var(--accent) / 0.22), transparent 70%), hsl(var(--surface))"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "m-0 text-[clamp(1.6rem,3vw,2.4rem)] font-semibold tracking-tight text-text max-w-[36rem] mx-auto",
                                children: "Ready to experience proactive consulting?"
                            }, void 0, false, {
                                fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                lineNumber: 716,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "m-0 text-text-muted max-w-[34rem] mx-auto",
                                children: "Contact Exxonim and receive a tracking number that keeps you informed at every step — automatically."
                            }, void 0, false, {
                                fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                lineNumber: 719,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-3 justify-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        className: "inline-flex items-center justify-center min-h-[3.25rem] px-6 rounded-full bg-accent text-accent-contrast text-sm font-extrabold shadow-accent-glow transition-all hover:-translate-y-0.5 hover:bg-accent-hover",
                                        href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].contact,
                                        children: "Request a Consultation"
                                    }, void 0, false, {
                                        fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                        lineNumber: 724,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        className: "inline-flex items-center justify-center min-h-[3.25rem] px-6 rounded-full border border-border-soft bg-surface/70 text-text text-sm font-extrabold transition-all hover:-translate-y-0.5 hover:bg-accent-soft",
                                        href: __TURBOPACK__imported__module__$5b$project$5d2f$joyful$2d$journey$2f$src$2f$exxonim$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].services,
                                        children: "Explore All Services"
                                    }, void 0, false, {
                                        fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                        lineNumber: 730,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                                lineNumber: 723,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                        lineNumber: 709,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                    lineNumber: 708,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/joyful-journey/src/exxonim/pages/TrackConsultationPage.tsx",
                lineNumber: 707,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(TrackConsultationPage, "DVhdudvcKG4hmwKo83MNIJ8jwqc=");
_c4 = TrackConsultationPage;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "TrackingResult");
__turbopack_context__.k.register(_c1, "DetailItem");
__turbopack_context__.k.register(_c2, "MilestoneItem");
__turbopack_context__.k.register(_c3, "TrackingNotFound");
__turbopack_context__.k.register(_c4, "TrackConsultationPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=joyful-journey_src_exxonim_pages_TrackConsultationPage_tsx_0kcq-le._.js.map