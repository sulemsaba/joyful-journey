/**
 * Track Your Consultation page — Exxonim Client Case Tracking System
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * BACKEND TEAM (FastAPI + PostgreSQL) — INTEGRATION GUIDE
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * This page implements the public-facing tracking lookup per the
 * "Exxonim Client Case Tracking System — Technical Design Report v1.0"
 *
 * ── TRACKING CODE FORMAT ──
 *   6 characters: 5 digits + 1 uppercase letter
 *   Display format: "84 72 9A" (three groups of 2, space-separated)
 *   Storage format: "84729A" (no spaces, uppercase, CHAR(6) UNIQUE)
 *   Generation: cryptographically secure random (secrets.choice)
 *   Keyspace: 2.6 million (10^5 × 26), or 2.4M if I,O excluded
 *
 * ── API CONTRACT ──
 *   Endpoint: POST /api/track
 *   (Next.js mock uses POST /api/v1/track — update when FastAPI is live)
 *
 *   Request:  { "trackingNumber": "84729A" }
 *   Response (200): { status, trackingCode, serviceType, milestone,
 *                     lastUpdated, nextMilestone, message, completedSteps,
 *                     totalSteps, visibleMilestones[] }
 *   Response (404): { status: "not_found", message: "..." }
 *
 *   SECURITY: Always return the SAME 404 shape for invalid, expired,
 *   or non-existent codes to prevent information leakage.
 *
 * ── DEMO TRACKING CODES (mock API) ──
 *   84729A — Active case (Company Registration, 3/6 milestones done)
 *   53107B — Completed case (TIN Application, all 4 milestones done)
 *   46283C — On hold case (Business Licensing, awaiting client documents)
 *   Any other code matching /\d{5}[A-Z]/ → "not found"
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
  UserRoundX,
  MessageCircle,
  X,
  RotateCcw,
} from "lucide-react";
import { Breadcrumb } from "@/exxonim/components/Breadcrumb";
import { routes } from "@/exxonim/routes";
import { applyResolvedSeo, createFallbackSeo } from "@/exxonim/seo";
import { Button } from "@/exxonim/components/primitives/Button";
import { lookupTrackingCode } from "@/exxonim/services/consultationService";
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
  return /^[0-9]{5}[A-Z]$/.test(code);
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
  process.env.NEXT_PUBLIC_SHOW_DEMO_HINT === "true";

const DEMO_CODES = ["84729A", "53107B", "46283C"] as const;

/* ─────────────────────────────────────────────────────────
 * HOW IT WORKS STEPS — uses Lucide icons
 * ───────────────────────────────────────────────────────── */
const HOW_IT_WORKS_STEPS = [
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Get your tracking code",
    detail:
      "Assigned automatically when you start a consultation. Sent via WhatsApp or email.",
  },
  {
    icon: <Search className="w-8 h-8" />,
    title: "Check your status",
    detail:
      "Enter your 6-character code on this page. No login, no password, no phone number needed.",
  },
  {
    icon: <Bell className="w-8 h-8" />,
    title: "Get notified automatically",
    detail:
      "Every milestone update is sent to you via WhatsApp. You don't have to keep checking.",
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
          {/* Row 1: Tracking code + Status badge */}
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="grid gap-1">
              <span className="text-[0.68rem] font-extrabold tracking-[0.18em] uppercase text-text-muted">
                Tracking Code
              </span>
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
      <div className="flex justify-center">
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
  code,
  onReset,
}: {
  code: string;
  onReset: () => void;
}) {
  return (
    <div className="rounded-[1.35rem] border border-border-soft bg-surface-elevated p-6 md:p-8 text-center grid gap-4">
      <div className="w-14 h-14 rounded-full bg-surface-soft mx-auto flex items-center justify-center">
        <Search className="w-7 h-7 text-text-muted" />
      </div>
      <div className="grid gap-2">
        <h3 className="m-0 text-lg font-semibold text-text">
          No consultation found
        </h3>
        <p className="m-0 text-text-muted text-sm leading-relaxed max-w-[28rem] mx-auto">
          No matching consultation found. Please check your tracking code and try again.
        </p>
      </div>
      <div className="flex flex-wrap gap-3 justify-center pt-1">
        <Button
          size="hero"
          variant="primary"
          onClick={onReset}
        >
          Try Again
        </Button>
        <Button
          size="hero"
          variant="secondary"
          href={routes.contact}
        >
          Forgot Your Code?
        </Button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
 * SKELETON LOADING CARD
 * ───────────────────────────────────────────────────────── */
function TrackingSkeleton() {
  return (
    <div className="rounded-[1.35rem] border border-border-soft bg-surface-elevated overflow-hidden">
      <div className="h-1.5 bg-surface-soft">
        <div className="h-full w-1/2 bg-accent/20 animate-shimmer rounded-r-full" />
      </div>
      <div className="p-6 md:p-8 grid gap-5">
        <div className="flex items-center justify-between gap-3">
          <div className="grid gap-2">
            <div className="h-3 w-24 rounded bg-surface-soft animate-shimmer" />
            <div className="h-8 w-40 rounded bg-surface-soft animate-shimmer" />
          </div>
          <div className="h-8 w-28 rounded-full bg-surface-soft animate-shimmer" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-border-soft">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="grid gap-2">
              <div className="h-3 w-16 rounded bg-surface-soft animate-shimmer" />
              <div className="h-4 w-24 rounded bg-surface-soft animate-shimmer" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
 * TRACKING CODE INPUT — auto-formatting, paste support
 *
 * UX BEHAVIOUR:
 *   User types "84" → displays "84"
 *   User types "847" → displays "84 7" (auto-space after 2nd char)
 *   User types "8472" → displays "84 72" (auto-space after 4th char)
 *   User types "84729A" → displays "84 72 9A"
 *   User pastes "84 72 9A" → normalizes to "84729A", displays "84 72 9A"
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
      placeholder="84 72 9A"
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
      {/* ── Breadcrumb ── */}
      <div className="max-w-[min(1240px,calc(100%-2rem))] mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumb
          items={[
            { label: "Home", href: routes.home, icon: Home },
            { label: "Track Consultation" },
          ]}
        />
      </div>

      {/* ── Hero with tracking input ── */}
      <section className="relative overflow-hidden pb-16 md:pb-24">
        <div
          className="absolute inset-0 -z-10 opacity-70"
          style={{
            background:
              "radial-gradient(60% 50% at 80% 0%, color-mix(in srgb, var(--color-accent) 18%, transparent), transparent 70%), radial-gradient(40% 40% at 10% 20%, color-mix(in srgb, var(--color-accent) 10%, transparent), transparent 70%)",
          }}
        />
        <div className="w-[min(1240px,calc(100%-2rem))] mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          {/* Left: Text */}
          <div className="grid gap-6">
            <p className="inline-flex items-center gap-2 text-accent text-xs font-extrabold tracking-[0.18em] uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              Consultation Tracking
            </p>
            <h1 className="m-0 text-[clamp(2.4rem,5vw,4.4rem)] font-semibold leading-[1.05] tracking-tight text-text">
              Never ask &ldquo;What&rsquo;s happening?&rdquo; again
            </h1>
            <p className="m-0 text-text-muted text-lg max-w-[36rem]">
              Automated updates at every milestone — delivered to your WhatsApp.
              Enter your 6-character tracking code for an instant status check.
              No login, no password, no phone number required.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                size="hero"
                variant="primary"
                href={routes.contact}
              >
                Request a Consultation
              </Button>
              <Button
                size="hero"
                variant="secondary"
                href={routes.services}
              >
                View All Services
              </Button>
            </div>
          </div>

          {/* Right: Tracking lookup card */}
          <div className="relative">
            <div className="rounded-[2rem] border border-border-soft bg-surface/70 backdrop-blur p-8 grid gap-5">
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
                  size="hero"
                  variant="primary"
                  type="submit"
                  className="rounded-xl w-full"
                  disabled={isSearching || !canSearch}
                  isLoading={isSearching}
                >
                  Check Status
                </Button>
              </form>

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

              {/* Quick stats — meaningful, icon-led */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border-soft">
                <div className="grid gap-1 items-center text-center">
                  <UserRoundX className="w-5 h-5 text-accent mx-auto" />
                  <span className="text-xs text-text-muted font-semibold">
                    No Account Needed
                  </span>
                </div>
                <div className="grid gap-1 items-center text-center">
                  <Clock className="w-5 h-5 text-accent mx-auto" />
                  <span className="text-xs text-text-muted font-semibold">
                    Instant Results
                  </span>
                </div>
                <div className="grid gap-1 items-center text-center">
                  <MessageCircle className="w-5 h-5 text-accent mx-auto" />
                  <span className="text-xs text-text-muted font-semibold">
                    WhatsApp Updates
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
      </section>

      {/* ── Tracking result ── */}
      <div ref={resultRef}>
        {isSearching && (
          <section className="pb-16 md:pb-20">
            <div className="w-[min(1240px,calc(100%-2rem))] mx-auto max-w-[52rem]">
              <TrackingSkeleton />
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

        {/* ── Empty state placeholder ── */}
        {!isSearching && !lookupResult && !notFound && (
          <section className="pb-16 md:pb-20">
            <div className="w-[min(1240px,calc(100%-2rem))] mx-auto max-w-[52rem]">
              <div className="rounded-[1.35rem] border border-dashed border-border-soft bg-surface-elevated/40 p-8 text-center">
                <Search className="w-8 h-8 text-text-soft/30 mx-auto mb-3" />
                <p className="m-0 text-text-soft text-sm">
                  Your tracking result will appear here
                </p>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* ── How it works ── */}
      <section className="py-16 md:py-20 bg-surface-soft/40">
        <div className="w-[min(1240px,calc(100%-2rem))] mx-auto grid gap-10">
          <div className="grid gap-3 max-w-[42rem]">
            <span className="text-[0.72rem] font-extrabold tracking-[0.2em] uppercase text-accent">
              How it works
            </span>
            <h2 className="m-0 text-[clamp(1.8rem,3vw,2.6rem)] font-semibold tracking-tight text-text">
              Proactive updates — not a dashboard
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {HOW_IT_WORKS_STEPS.map((step, i) => (
              <article
                key={i}
                className="group relative p-6 rounded-[1.35rem] border border-border-soft bg-surface-elevated transition-all hover:-translate-y-1 hover:border-accent/40 grid gap-3"
              >
                <span className="text-accent">{step.icon}</span>
                <strong className="text-text text-base">{step.title}</strong>
                <p className="m-0 text-text-muted text-sm leading-relaxed">
                  {step.detail}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Security & privacy ── */}
      <section className="py-16 md:py-20">
        <div className="w-[min(1240px,calc(100%-2rem))] mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="grid gap-6">
            <span className="text-[0.72rem] font-extrabold tracking-[0.2em] uppercase text-accent">
              Security &amp; privacy
            </span>
            <h2 className="m-0 text-[clamp(1.8rem,3vw,2.6rem)] font-semibold tracking-tight text-text">
              Your code is all you need
            </h2>
            <p className="m-0 text-text-muted max-w-[36rem]">
              No account, no password, no phone number to look up your case.
              Your tracking code is the only key — and with over 2.6
              million possible combinations, it&rsquo;s secure by design.
            </p>
            <div className="grid gap-4">
              <SecurityPoint
                icon={<ShieldCheck className="w-5 h-5" />}
                title="2.6 million possible codes"
                description="Enough combinations to prevent random guessing while staying easy to read and share."
              />
              <SecurityPoint
                icon={<ShieldCheck className="w-5 h-5" />}
                title="Rate-limited lookups"
                description="20 failed attempts per minute triggers a temporary block. 10 failures on a single code locks it for 24 hours."
              />
              <SecurityPoint
                icon={<ShieldCheck className="w-5 h-5" />}
                title="No information leakage"
                description="Invalid, expired, and non-existent codes all return the same response. No way to tell which codes are real."
              />
            </div>
          </div>

          {/* Visual */}
          <div className="relative w-full max-w-[28rem] mx-auto aspect-[4/3] flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[70%] h-[70%] rounded-full border border-accent/10" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[45%] h-[45%] rounded-full border border-accent/20" />
            </div>
            <div className="relative flex items-center justify-center">
              <span className="absolute w-16 h-16 rounded-full bg-accent/10 animate-ping" />
              <span className="relative w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-accent-contrast" />
              </span>
            </div>
            <div className="absolute top-[18%] right-[22%]">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-elevated/80 border border-accent/20 text-[0.65rem] font-bold text-accent backdrop-blur">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Secure Lookup
              </span>
            </div>
            <div className="absolute bottom-[22%] left-[12%]">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-elevated/80 border border-border-soft text-[0.65rem] font-bold text-text-muted backdrop-blur">
                <span className="w-1.5 h-1.5 rounded-full bg-border-soft" />
                Rate Limited
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Lost your code? ── */}
      <section className="py-12 md:py-16 bg-surface-soft/40">
        <div className="w-[min(1240px,calc(100%-2rem))] mx-auto">
          <div className="rounded-[1.35rem] border border-border-soft bg-surface-elevated p-6 md:p-8 max-w-[42rem] mx-auto text-center grid gap-4">
            <h3 className="m-0 text-lg font-semibold text-text">
              Lost your tracking code?
            </h3>
            <p className="m-0 text-text-muted text-sm leading-relaxed max-w-[28rem] mx-auto">
              Check your WhatsApp messages — we send your code when your
              consultation is created. You can also contact us and we&apos;ll
              look it up for you.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button size="hero" variant="primary" href={routes.contact}>
                Contact Us
              </Button>
              <Button size="hero" variant="outline" href={routes.support}>
                Support Centre
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="pb-20">
        <div className="w-[min(1240px,calc(100%-2rem))] mx-auto">
          <div
            className="relative overflow-hidden rounded-[2rem] p-10 md:p-14 grid gap-6 text-center border border-border-soft"
            style={{
              background:
                "radial-gradient(80% 100% at 50% 0%, color-mix(in srgb, var(--color-accent) 22%, transparent), transparent 70%), var(--color-surface)",
            }}
          >
            <h2 className="m-0 text-[clamp(1.6rem,3vw,2.4rem)] font-semibold tracking-tight text-text max-w-[36rem] mx-auto">
              Ready to experience proactive consulting?
            </h2>
            <p className="m-0 text-text-muted max-w-[34rem] mx-auto">
              Contact Exxonim and receive a tracking code that keeps you
              informed at every step.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                size="hero"
                variant="primary"
                href={routes.contact}
              >
                Request a Consultation
              </Button>
              <Button
                size="hero"
                variant="secondary"
                href={routes.services}
              >
                Explore All Services
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function SecurityPoint({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-3 items-start">
      <span className="text-accent mt-0.5">{icon}</span>
      <div className="grid gap-0.5">
        <strong className="text-text text-sm">{title}</strong>
        <p className="m-0 text-text-muted text-xs leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
