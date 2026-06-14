/**
 * Track Your Consultation page — Exxonim Client Case Tracking System
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * FASTAPI BACKEND ENDPOINTS USED BY THIS PAGE
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Tracking Lookup (via lookupTrackingCode → consultationService):
 *   POST   /api/v1/track                      — Look up a case by tracking code
 *   Request: { trackingNumber: "11111A" }
 *   Response (200): { status, trackingCode, serviceType, milestone,
 *                     lastUpdated, nextMilestone, message, completedSteps,
 *                     totalSteps, visibleMilestones[] }
 *   Response (404): { status: "not_found", message: "..." }
 *
 * Consultation Creation (from Contact page, referenced here):
 *   POST   /api/v1/consultations              — Submit a new consultation
 *
 * PostgreSQL Tables:
 *   cases — id, tracking_code (CHAR(6) UNIQUE), customer_id, service_type_id,
 *           status (active | completed | on_hold), created_at, updated_at
 *   case_milestones — id, case_id, milestone_id, status (completed | current | pending),
 *                     visible_to_client, completed_at
 *   milestones — id, service_type_id, label, sort_order
 *   service_types — id, code, name, description
 *   customers — id, full_name, email, phone, company
 *
 * See: src/exxonim/services/consultationService.ts for full endpoint documentation.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * BACKEND TEAM (FastAPI + PostgreSQL) — INTEGRATION GUIDE
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * This page implements the public-facing tracking lookup per the
 * "Exxonim Client Case Tracking System — Technical Design Report v1.0"
 *
 * ── TRACKING CODE FORMAT ──
 *   6 characters: 5 digits + 1 uppercase letter (letter can be in any position)
 *   Display format: "11 11 1A" or "A1 11 11" (three groups of 2, space-separated)
 *   Storage format: "11111A" or "A11111" (no spaces, uppercase, CHAR(6) UNIQUE)
 *   Generation: cryptographically secure random (secrets.choice)
 *
 * ── API CONTRACT ──
 *   Endpoint: POST /api/track
 *   (Next.js mock uses POST /api/v1/track — update when FastAPI is live)
 *
 *   Request:  { "trackingNumber": "11111A" }
 *   Response (200): { status, trackingCode, serviceType, milestone,
 *                     lastUpdated, nextMilestone, message, completedSteps,
 *                     totalSteps, visibleMilestones[] }
 *   Response (404): { status: "not_found", message: "..." }
 *
 *   SECURITY: Always return the SAME 404 shape for invalid, expired,
 *   or non-existent codes to prevent information leakage.
 *
 * ── DEMO TRACKING CODES (mock API) ──
 *   A11111 — Active consultation (Company Registration, 3/6 milestones done)
 *   22A222 — Completed consultation (TIN Application, all 4 milestones done)
 *   333A33 — On hold consultation (Business Licensing, awaiting client documents)
 *   4444A4 — Active consultation (Work Permit Application, 4/7 milestones done)
 *   Any other code matching 5 digits + 1 letter (any position) → "not found"
 *
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { useEffect, useState, useCallback, useRef } from "react";
import {
  Home,
  Search,
  ShieldCheck,
  Bell,
  Clock,
  MessageCircle,
  X,
  RotateCcw,
} from "lucide-react";
import { Breadcrumb } from "@/exxonim/components/Breadcrumb";
import { routes } from "@/exxonim/routes";
import { SmartLink } from "@/exxonim/components/primitives/SmartLink";
import { applyResolvedSeo, createFallbackSeo } from "@/exxonim/seo";
import { Button } from "@/exxonim/components/primitives/Button";
import { lookupTrackingCode } from "@/exxonim/services/consultationService";
import { StructuredData } from "@/exxonim/components/StructuredData";
import type {
  ApiTrackingLookupResponse,
  ApiTrackingNotFoundResponse,
  ApiTrackingMilestone,
  ApiTrackingCaseStatus,
} from "@/exxonim/types/api";

/* ─────────────────────────────────────────────────────────
 * TRACKING CODE HELPERS
 * ───────────────────────────────────────────────────────── */

function normalizeTrackingCode(raw: string): string {
  return raw.replace(/\s/g, "").toUpperCase();
}

function isValidTrackingCode(code: string): boolean {
  if (code.length !== 6) return false;
  const digits = (code.match(/[0-9]/g) || []).length;
  const letters = (code.match(/[A-Z]/g) || []).length;
  return digits === 5 && letters === 1;
}

function formatTrackingCode(code: string): string {
  if (code.length !== 6) return code;
  return `${code.slice(0, 2)} ${code.slice(2, 4)} ${code.slice(4)}`;
}

/**
 * Formats an ISO 8601 timestamp into a human-readable date string.
 * Shows relative time for dates within the last 7 days, absolute otherwise.
 */
function formatDate(isoString: string): string {
  try {
    const d = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return isoString;
  }
}

/**
 * Returns absolute date string for tooltip display.
 */
function formatAbsoluteDate(isoString: string): string {
  try {
    const d = new Date(isoString);
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return isoString;
  }
}

/** Returns progress bar color class based on case status. */
function getProgressBarClass(status: ApiTrackingCaseStatus): string {
  switch (status) {
    case "completed":
      return "bg-success";
    case "on_hold":
      return "bg-warning";
    case "active":
    default:
      return "bg-accent";
  }
}

function getStatusDisplay(
  status: ApiTrackingCaseStatus
): { label: string; colorClass: string; dotClass: string } {
  switch (status) {
    case "active":
      return {
        label: "In Progress",
        colorClass: "bg-accent-soft text-accent",
        dotClass: "bg-accent",
      };
    case "completed":
      return {
        label: "Completed",
        colorClass: "bg-success-soft text-success",
        dotClass: "bg-success",
      };
    case "on_hold":
      return {
        label: "On Hold",
        colorClass: "bg-warning-soft text-warning",
        dotClass: "bg-warning",
      };
  }
}

/* ─────────────────────────────────────────────────────────
 * DEMO CODES — env-gated
 * ───────────────────────────────────────────────────────── */
const SHOW_DEMO_HINT =
  typeof window !== "undefined" &&
  ((typeof process !== "undefined" && process.env?.NEXT_PUBLIC_SHOW_DEMO_HINT === "true") ||
   (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_SHOW_DEMO_HINT === "true"));

const DEMO_CODES = ["A11111", "22A222", "333A33", "4444A4"] as const;

/* ─────────────────────────────────────────────────────────
 * HOW IT WORKS STEPS — uses Lucide icons
 * ───────────────────────────────────────────────────────── */
const HOW_IT_WORKS_STEPS = [
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Receive your code",
    detail:
      "Sent to your WhatsApp when you start a consultation.",
  },
  {
    icon: <Search className="w-8 h-8" />,
    title: "Check instantly",
    detail:
      "Enter your code here — no login, no account needed.",
  },
  {
    icon: <Bell className="w-8 h-8" />,
    title: "Stay updated",
    detail:
      "WhatsApp updates at every milestone. No need to keep checking.",
  },
];

/* ─────────────────────────────────────────────────────────
 * TRACKING RESULT COMPONENT
 * ───────────────────────────────────────────────────────── */
function TrackingResultCard({
  result,
  onReset,
}: {
  result: ApiTrackingLookupResponse;
  onReset: () => void;
}) {
  const statusDisplay = getStatusDisplay(result.status);
  const hasMilestones =
    result.visibleMilestones && result.visibleMilestones.length > 0;
  const completedCount = result.completedSteps ?? 0;
  const totalCount = result.totalSteps ?? 0;
  const progressPercent =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="grid gap-6">
      {/* ── Status header card ── */}
      <div className="rounded-[1.35rem] border border-border-soft bg-surface-elevated overflow-hidden">
        {/* Progress bar — color matches status */}
        {totalCount > 0 && (
          <div className="h-1.5 bg-surface-soft">
            <div
              className={`h-full ${getProgressBarClass(result.status)} transition-all duration-700 ease-out rounded-r-full`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}

        <div className="p-6 md:p-8 grid gap-5">
          {/* Row 1: Tracking code + Status badge + Instant badge */}
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="grid gap-1">
              <div className="flex items-center gap-2">
                <span className="text-[0.68rem] font-extrabold tracking-[0.18em] uppercase text-text-muted">
                  Tracking Code
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/10 text-[0.58rem] font-bold text-accent tracking-wide uppercase">
                  <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  Instant Result
                </span>
              </div>
              <span className="text-2xl md:text-3xl font-mono font-bold text-text tracking-[0.15em]">
                {result.trackingCode
                  ? formatTrackingCode(result.trackingCode)
                  : "—— —— ——"}
              </span>
            </div>
            <span
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-extrabold ${statusDisplay.colorClass}`}
            >
              {result.status === "active" && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                </span>
              )}
              {result.status !== "active" && (
                <span
                  className={`w-2 h-2 rounded-full ${statusDisplay.dotClass}`}
                />
              )}
              {statusDisplay.label}
            </span>
          </div>

          {/* Row 2: Key details — responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-border-soft">
            {result.serviceType && (
              <DetailItem label="Service" value={result.serviceType} />
            )}
            <DetailItem label="Current Stage" value={result.milestone} />
            <DetailItem
              label="Last Updated"
              value={formatDate(result.lastUpdated)}
              tooltip={formatAbsoluteDate(result.lastUpdated)}
            />
            <DetailItem
              label="Next Step"
              value={result.nextMilestone ?? "—"}
            />
          </div>

          {/* Row 3: Message (on_hold or completed) */}
          {result.message && (
            <div
              className={`grid gap-2 p-4 rounded-xl border ${
                result.status === "on_hold"
                  ? "bg-warning-soft/30 border-warning/10"
                  : result.status === "completed"
                    ? "bg-success-soft/30 border-success/10"
                    : "bg-accent-soft/40 border-accent/10"
              }`}
            >
              <span
                className={`text-[0.68rem] font-extrabold tracking-[0.16em] uppercase ${
                  result.status === "on_hold"
                    ? "text-warning"
                    : result.status === "completed"
                      ? "text-success"
                      : "text-accent"
                }`}
              >
                {result.status === "on_hold"
                  ? "Action Needed"
                  : result.status === "completed"
                    ? "Completed"
                    : "Update"}
              </span>
              <p className="m-0 text-text text-sm leading-relaxed">
                {result.message}
              </p>
              {result.status === "on_hold" && (
                <a
                  href="https://wa.me/255794689099"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-1 px-4 py-2 rounded-xl bg-[#25D366] text-white text-sm font-semibold hover:bg-[#1ebe57] transition-colors w-fit"
                >
                  <MessageCircle className="w-4 h-4" />
                  Message us on WhatsApp
                </a>
              )}
            </div>
          )}

          {/* Row 4: Progress summary */}
          {totalCount > 0 && (
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-text-muted">
              <span>
                {completedCount} of {totalCount} steps completed
              </span>
              <span>{progressPercent}% done</span>
            </div>
          )}
        </div>
      </div>

      {/* ── Milestone timeline ── */}
      {hasMilestones && (
        <div className="rounded-[1.35rem] border border-border-soft bg-surface-elevated p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="m-0 text-lg font-semibold text-text">Timeline</h3>
            <span className="text-xs text-text-muted font-mono">
              {completedCount}/{totalCount}
            </span>
          </div>
          <div className="grid gap-0">
            {result.visibleMilestones!.map((milestone, index) => (
              <MilestoneItem
                key={milestone.label}
                milestone={milestone}
                isLast={index === result.visibleMilestones!.length - 1}
                /** Track whether the previous milestone was completed for connector style */
                prevCompleted={
                  index > 0
                    ? result.visibleMilestones![index - 1].status === "completed"
                    : false
                }
              />
            ))}
          </div>
        </div>
      )}

      {/* ── Look up another code ── */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Look up another code
        </button>
      </div>
    </div>
  );
}

function DetailItem({
  label,
  value,
  tooltip,
}: {
  label: string;
  value: string;
  tooltip?: string;
}) {
  return (
    <div className="grid gap-0.5">
      <span className="text-[0.68rem] font-extrabold tracking-[0.14em] uppercase text-text-muted">
        {label}
      </span>
      <span
        className="text-sm font-semibold text-text"
        title={tooltip}
      >
        {value}
      </span>
    </div>
  );
}

function MilestoneItem({
  milestone,
  isLast,
  prevCompleted,
}: {
  milestone: ApiTrackingMilestone;
  isLast: boolean;
  prevCompleted: boolean;
}) {
  const isCompleted = milestone.status === "completed";
  const isCurrent = milestone.status === "current";

  /** Connector between previous and current: intermediate style for "in progress" */
  function getConnectorClass(): string {
    if (isCompleted) return "bg-accent/40";
    // Connector from the last completed node to the current node
    if (isCurrent && prevCompleted) return "bg-accent/20 border-l border-dashed border-accent/30";
    return "bg-border-soft";
  }

  return (
    <div className="flex gap-4">
      {/* Timeline column */}
      <div className="flex flex-col items-center">
        <div
          className={`w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center border-2 transition-all ${
            isCompleted
              ? "bg-accent border-accent"
              : isCurrent
                ? "bg-accent/20 border-accent"
                : "bg-surface-soft border-border-soft"
          }`}
        >
          {isCompleted && (
            <svg
              className="w-2.5 h-2.5 text-accent-contrast"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
          {isCurrent && (
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          )}
        </div>
        {!isLast && (
          <div
            className={`w-0.5 flex-1 min-h-[2rem] ${getConnectorClass()}`}
          />
        )}
      </div>

      {/* Content */}
      <div className={`pb-6 ${isLast ? "pb-0" : ""}`}>
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`text-sm font-semibold ${
              isCompleted
                ? "text-text"
                : isCurrent
                  ? "text-accent"
                  : "text-text-muted"
            }`}
          >
            {milestone.label}
          </span>
          {isCurrent && (
            <span className="text-[0.62rem] font-extrabold tracking-[0.12em] uppercase px-2 py-0.5 rounded-full bg-accent-soft text-accent">
              Current
            </span>
          )}
        </div>
        {milestone.date && (
          <span
            className="text-xs mt-0.5 inline-block font-mono text-text-muted"
            title={formatAbsoluteDate(milestone.date)}
          >
            {formatDate(milestone.date)}
          </span>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
 * NOT FOUND COMPONENT
 *
 * SECURITY: Generic message — no format hints or pattern leakage.
 * ───────────────────────────────────────────────────────── */
function TrackingNotFound({
  onReset,
}: {
  code: string;
  onReset: () => void;
}) {
  return (
    <div className="rounded-[1.35rem] border border-border-soft bg-surface-elevated p-6 md:p-8 grid gap-6">
      <div className="text-center grid gap-3">
        <div className="w-14 h-14 rounded-full bg-surface-soft mx-auto flex items-center justify-center">
          <Search className="w-7 h-7 text-text-muted" />
        </div>
        <div className="grid gap-2">
          <h3 className="m-0 text-lg font-semibold text-text">
            No consultation found
          </h3>
          <p className="m-0 text-text-muted text-sm leading-relaxed max-w-[28rem] mx-auto">
            Double-check your code and try again. Your code is 6 characters — 5 digits and 1 letter.
          </p>
        </div>
      </div>
      <div className="rounded-xl border border-border-soft bg-surface-soft/50 p-4 grid gap-3">
        <span className="text-[0.68rem] font-extrabold tracking-[0.14em] uppercase text-accent">
          Can&rsquo;t find your code?
        </span>
        <div className="grid gap-2 text-sm text-text-muted">
          <div className="flex items-start gap-2">
            <MessageCircle className="w-4 h-4 text-[#25D366] mt-0.5 flex-shrink-0" />
            <span>Check your WhatsApp — we send your code when your consultation starts.</span>
          </div>
          <div className="flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
            <span>Only you can see your code. We never share it.</span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-3 justify-center">
        <Button
          size="standard"
          variant="primary"
          onClick={onReset}
        >
          Try Again
        </Button>
        <Button
          size="standard"
          variant="outline"
          href={routes.contact}
        >
          Contact Us
        </Button>
      </div>
    </div>
  );
}

/* ─── L9: TRACKING_SKELETON ────────────────────────────────────────────
 * LABEL:    TRACKING_SKELETON
 * POSITION: Track Consultation page — replaces tracking result card during loading
 * APPEARANCE: Shimmer-animated card with progress bar, header row,
 *             and 4-column stats grid
 * STATUS:   disabled — returns null
 * CSS REQUIRED: .animate-shimmer + @keyframes shimmer (add to globals.css)
 * USED BY:  TrackConsultationPage (lines ~940-944, also disabled)
 * RE-ENABLE: Uncomment JSX below + add .animate-shimmer CSS to globals.css
 * ───────────────────────────────────────────────────────── */
function TrackingSkeleton() {
  return null;
  // return (
  //   <div className="rounded-[1.35rem] overflow-hidden">
  //     <div className="h-1.5 bg-accent-soft/30">
  //       <div className="h-full w-1/2 bg-accent/20 animate-shimmer rounded-r-full" />
  //     </div>
  //     <div className="p-6 md:p-8 grid gap-5">
  //       <div className="flex items-center justify-between gap-3">
  //         <div className="grid gap-2">
  //           <div className="h-3 w-24 rounded bg-accent-soft/50 animate-shimmer" />
  //           <div className="h-8 w-40 rounded bg-accent-soft/50 animate-shimmer" />
  //         </div>
  //         <div className="h-8 w-28 rounded-full bg-accent-soft/50 animate-shimmer" />
  //       </div>
  //       <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4">
  //         {Array.from({ length: 4 }).map((_, i) => (
  //           <div key={i} className="grid gap-2">
  //             <div className="h-3 w-16 rounded bg-accent-soft/50 animate-shimmer" />
  //             <div className="h-4 w-24 rounded bg-accent-soft/50 animate-shimmer" />
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   </div>
  // );
}

/* ─────────────────────────────────────────────────────────
 * TRACKING CODE INPUT — auto-formatting, paste support
 *
 * UX BEHAVIOUR:
 *   User types "84" → displays "84"
 *   User types "847" → displays "84 7" (auto-space after 2nd char)
 *   User types "8472" → displays "84 72" (auto-space after 4th char)
 *   User types "11111A" → displays "11 11 1A"
 *   User pastes "11 11 1A" → normalizes to "11111A", displays "11 11 1A"
 *
 * SECURITY: No format validation messages are shown.
 * The button enables only when input length = 6 after stripping spaces.
 * ───────────────────────────────────────────────────────── */
function TrackingCodeInput({
  value,
  onChange,
  disabled,
  inputRef,
}: {
  value: string;
  onChange: (raw: string) => void;
  disabled: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
}) {
  const displayValue = (() => {
    const raw = normalizeTrackingCode(value);
    if (raw.length <= 2) return raw;
    if (raw.length <= 4) return `${raw.slice(0, 2)} ${raw.slice(2)}`;
    return `${raw.slice(0, 2)} ${raw.slice(2, 4)} ${raw.slice(4)}`;
  })();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const cleaned = input.replace(/[^A-Za-z0-9\s]/g, "");
    const raw = normalizeTrackingCode(cleaned);
    const capped = raw.slice(0, 6);
    onChange(capped);
  };

  return (
    <input
      ref={inputRef}
      id="tracking-code"
      type="text"
      value={displayValue}
      onChange={handleChange}
      placeholder="11 11 1A"
      disabled={disabled}
      autoComplete="off"
      className="w-full h-14 px-5 rounded-xl border border-border-soft bg-surface text-text text-lg font-mono tracking-[0.2em] placeholder:text-text-soft/40 placeholder:tracking-[0.15em] focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent text-center disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label="Enter your 6-character tracking code"
    />
  );
}

/* ─────────────────────────────────────────────────────────
 * MAIN PAGE COMPONENT
 * ───────────────────────────────────────────────────────── */
export function TrackConsultationPage() {
  const [rawCode, setRawCode] = useState("");
  const [lookupResult, setLookupResult] =
    useState<ApiTrackingLookupResponse | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // SEO
  useEffect(() => {
    applyResolvedSeo(
      createFallbackSeo(routes.trackConsultation, {
        title: "Track Your Consultation | Exxonim Consult",
        description:
          "Look up your Exxonim Consult consultation status anytime using your tracking code. No login required.",
        robots: "index,follow",
      })
    );
  }, []);

  const scrollToResult = useCallback(() => {
    // Small delay to allow React to render the result
    requestAnimationFrame(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  const handleLookup = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const normalized = normalizeTrackingCode(rawCode);
      if (!normalized) return;

      setIsSearching(true);
      setNotFound(false);
      setLookupResult(null);
      setSearchError(null);

      try {
        const result = await lookupTrackingCode({
          trackingNumber: normalized,
        });

        if ("status" in result && result.status === "not_found") {
          setNotFound(true);
        } else {
          setLookupResult(result as ApiTrackingLookupResponse);
        }
        scrollToResult();
      } catch {
        setSearchError(
          "We couldn't check your tracking code right now. Please try again in a moment."
        );
      } finally {
        setIsSearching(false);
      }
    },
    [rawCode, scrollToResult]
  );

  const handleCodeChange = useCallback((newCode: string) => {
    setRawCode(newCode);
    setLookupResult(null);
    setNotFound(false);
    setSearchError(null);
  }, []);

  const handleReset = useCallback(() => {
    setRawCode("");
    setLookupResult(null);
    setNotFound(false);
    setSearchError(null);
    // Focus the input after state clears
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
    // Scroll back to the input card
    inputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  const handleDismissError = useCallback(() => {
    setSearchError(null);
  }, []);

  const canSearch = rawCode.length === 6;

  /** Fill the input with a demo code */
  const handleDemoFill = useCallback(
    (code: string) => {
      setRawCode(code);
      setLookupResult(null);
      setNotFound(false);
      setSearchError(null);
      // Auto-focus after fill
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    },
    []
  );

  return (
    <main>
      <StructuredData heroTitle="Track Your Consultation" heroDescription="Check the status of your consultation with Exxonim using your tracking code." breadcrumbs={[{ name: 'Track Consultation', path: routes.trackConsultation }]} />
      {/* ── Hero with tracking input (breadcrumb inside for smooth fade) ── */}
      <section className="relative overflow-hidden pb-16 md:pb-24">
        {/* Gradient background */}
        <div
          className="absolute inset-0 -z-10 opacity-70"
          style={{
            background:
              "radial-gradient(60% 50% at 80% 0%, var(--color-accent-gradient-subtle), transparent 70%), radial-gradient(40% 40% at 10% 20%, var(--color-accent-gradient-weak), transparent 70%)",
          }}
        />
        {/* Top fade: page bg → hero gradient — soft transition instead of hard line */}
        <div
          className="absolute top-0 left-0 right-0 h-24 -z-[5] pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, var(--color-page) 0%, var(--color-page) 10%, transparent 100%)",
          }}
        />
        {/* Breadcrumb — now inside hero for seamless fade */}
        <div className="max-w-[min(1240px,calc(100%-2rem))] mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <Breadcrumb
            items={[
              { label: "Home", href: routes.home, icon: Home },
              { label: "Track Consultation" },
            ]}
          />
        </div>
        <div className="w-[min(1240px,calc(100%-2rem))] mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          {/* Left: Text — on mobile renders AFTER the tracking card */}
          <div className="grid gap-6" style={{ order: 2 }}>
            <p className="inline-flex items-center gap-2 text-accent text-xs font-extrabold tracking-[0.18em] uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              Consultation Tracking
            </p>
            <h1 className="m-0 text-[clamp(2.4rem,5vw,4.4rem)] font-semibold leading-[1.05] tracking-tight text-text">
              Track Your Consultation
            </h1>
            <p className="m-0 text-text-muted text-lg max-w-[36rem]">
              One code. Full timeline. WhatsApp updates at every step.
            </p>

          </div>

          {/* Right: Tracking lookup card — on mobile renders FIRST */}
          <div className="relative" style={{ order: 1 }}>
            <div className="rounded-[2rem] border border-border-soft bg-surface/70 backdrop-blur p-6 md:p-8 grid gap-5">
              <span className="text-[0.72rem] font-extrabold tracking-[0.2em] uppercase text-accent">
                Look up your consultation
              </span>
              <form onSubmit={handleLookup} className="grid gap-3">
                <label htmlFor="tracking-code" className="sr-only">
                  Tracking code
                </label>
                <TrackingCodeInput
                  value={rawCode}
                  onChange={handleCodeChange}
                  disabled={isSearching}
                  inputRef={inputRef}
                />
                {canSearch && !isSearching && (
                  <p className="text-[0.65rem] text-text-soft text-center">
                    Press Enter to check
                  </p>
                )}
                <Button
                  size="standard"
                  variant="primary"
                  type="submit"
                  className="rounded-xl w-full"
                  disabled={isSearching || !canSearch}
                  isLoading={isSearching}
                >
                  {isSearching ? "Searching..." : "Check Status"}
                </Button>
              </form>
              <a
                href="#lost-code"
                className="text-xs text-text-muted hover:text-accent transition-colors text-center -mt-1"
              >
                Lost your code?
              </a>

              {/* Error state — dismissible */}
              {searchError && (
                <div
                  className="p-3 rounded-xl bg-error-soft/30 border border-error/10 text-error text-sm flex items-start justify-between gap-2"
                  role="alert"
                >
                  <span>{searchError}</span>
                  <button
                    type="button"
                    onClick={handleDismissError}
                    className="text-error/60 hover:text-error transition-colors flex-shrink-0 mt-0.5"
                    aria-label="Dismiss error"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Quick stats — only unique value props */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border-soft">
                <div className="grid gap-1 items-center text-center">
                  <Clock className="w-5 h-5 text-accent mx-auto" />
                  <span className="text-xs text-text-muted font-semibold">
                    Always Current
                  </span>
                </div>
                <div className="grid gap-1 items-center text-center">
                  <MessageCircle className="w-5 h-5 text-accent mx-auto" />
                  <span className="text-xs text-text-muted font-semibold">
                    WhatsApp Updates
                  </span>
                </div>
                <div className="grid gap-1 items-center text-center">
                  <ShieldCheck className="w-5 h-5 text-accent mx-auto" />
                  <span className="text-xs text-text-muted font-semibold">
                    No Account Needed
                  </span>
                </div>
              </div>

              {/* Demo hint — env-gated, clickable chips, no pattern text */}
              {SHOW_DEMO_HINT && (
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <span className="text-[0.65rem] text-text-soft/60">Demo:</span>
                  {DEMO_CODES.map((code) => (
                    <button
                      key={code}
                      type="button"
                      onClick={() => handleDemoFill(code)}
                      className="text-[0.65rem] font-mono text-accent hover:bg-accent-soft px-1.5 py-0.5 rounded transition-colors"
                    >
                      {formatTrackingCode(code)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Bottom fade: hero gradient → page bg — soft transition to content below */}
        <div
          className="absolute bottom-0 left-0 right-0 h-20 -z-[5] pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, var(--color-page) 0%, var(--color-page) 10%, transparent 100%)",
          }}
        />
      </section>

      {/* ── Tracking result ── */}
      <div ref={resultRef}>
        {/* Inline search indicator — subtle, in the result area only.
         * NOT a full-page loader. Shows a minimal "Searching..." message
         * inside the result panel so users know the lookup is in progress. */}
        {isSearching && (
          <section className="pb-16 md:pb-20">
            <div className="w-[min(1240px,calc(100%-2rem))] mx-auto max-w-[52rem]">
              <div className="rounded-2xl border border-border-soft bg-surface/70 backdrop-blur p-6 md:p-8">
                <div className="flex items-center justify-center gap-3 py-8 text-text-muted">
                  <svg
                    className="animate-spin h-5 w-5 text-accent"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <span className="text-sm font-medium">Searching for your consultation...</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {!isSearching && (lookupResult || notFound) && (
          <section className="pb-16 md:pb-20">
            <div className="w-[min(1240px,calc(100%-2rem))] mx-auto max-w-[52rem]">
              {lookupResult && (
                <TrackingResultCard
                  result={lookupResult}
                  onReset={handleReset}
                />
              )}
              {notFound && (
                <TrackingNotFound
                  code={rawCode}
                  onReset={handleReset}
                />
              )}
            </div>
          </section>
        )}
      </div>

      {/* ── How it works ── */}
      <section className="py-16 md:py-20">
        <div className="w-[min(1240px,calc(100%-2rem))] mx-auto grid gap-10">
          <div className="grid gap-3 max-w-[42rem]">
            <span className="text-[0.72rem] font-extrabold tracking-[0.2em] uppercase text-accent">
              How it works
            </span>
            <h2 className="m-0 text-[clamp(1.8rem,3vw,2.6rem)] font-semibold tracking-tight text-text">
              Your timeline is your dashboard
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {HOW_IT_WORKS_STEPS.map((step, i) => (
              <article
                key={i}
                className="group relative p-6 rounded-[1.35rem] border border-border-soft bg-surface-elevated transition-all hover:-translate-y-1 hover:border-accent/40 grid gap-3"
              >
                <span className="inline-flex items-center gap-2.5">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-accent/10 text-accent text-xs font-bold">{i + 1}</span>
                  <span className="text-accent">{step.icon}</span>
                </span>
                <strong className="text-text text-base">{step.title}</strong>
                <p className="m-0 text-text-muted text-sm leading-relaxed">
                  {step.detail}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Privacy + Lost code — combined to reduce redundancy ── */}
      <section id="lost-code" className="py-16 md:py-20 scroll-mt-8">
        <div className="w-[min(1240px,calc(100%-2rem))] mx-auto max-w-[42rem] grid gap-4">
          <div className="flex items-start gap-4 p-5 rounded-[1.35rem] border border-border-soft bg-surface-elevated">
            <span className="text-accent mt-0.5 flex-shrink-0"><ShieldCheck className="w-5 h-5" /></span>
            <div className="grid gap-0.5">
              <strong className="text-text text-sm">Your code is all you need</strong>
              <p className="m-0 text-text-muted text-xs leading-relaxed">
                No account, no password, no phone number. Only you can look up your consultation.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-5 rounded-[1.35rem] border border-border-soft bg-surface-elevated">
            <span className="text-accent mt-0.5 flex-shrink-0"><MessageCircle className="w-5 h-5" /></span>
            <div className="grid gap-0.5">
              <strong className="text-text text-sm">Lost your code?</strong>
              <p className="m-0 text-text-muted text-xs leading-relaxed">
                Check your WhatsApp — we send it when your consultation starts. Or{" "}
                <SmartLink href={routes.contact} className="text-accent hover:text-accent-hover font-semibold transition-colors">contact us</SmartLink> and we&rsquo;ll look it up.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

