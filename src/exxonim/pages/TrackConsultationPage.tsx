/**
 * Track Your Consultation page - Exxonim Client Case Tracking System
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * FASTAPI BACKEND ENDPOINTS USED BY THIS PAGE
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Tracking Lookup (via lookupTrackingCode → consultationService):
 *   POST   /api/v1/track                      - Look up a case by tracking code
 *   Request: { trackingNumber: "11111A" }
 *   Response (200): { status, trackingCode, serviceType, milestone,
 *                     lastUpdated, nextMilestone, message, completedSteps,
 *                     totalSteps, visibleMilestones[] }
 *   Response (404): { status: "not_found", message: "..." }
 *
 * Consultation Creation (from Contact page, referenced here):
 *   POST   /api/v1/consultations              - Submit a new consultation
 *
 * PostgreSQL Tables:
 *   cases - id, tracking_code (CHAR(6) UNIQUE), customer_id, service_type_id,
 *           status (active | completed | on_hold), created_at, updated_at
 *   case_milestones - id, case_id, milestone_id, status (completed | current | pending),
 *                     visible_to_client, completed_at
 *   milestones - id, service_type_id, label, sort_order
 *   service_types - id, code, name, description
 *   customers - id, full_name, email, phone, company
 *
 * See: src/exxonim/services/consultationService.ts for full endpoint documentation.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * BACKEND TEAM (FastAPI + PostgreSQL) - INTEGRATION GUIDE
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * This page implements the public-facing tracking lookup per the
 * "Exxonim Client Case Tracking System - Technical Design Report v1.0"
 *
 * ── TRACKING CODE FORMAT ──
 *   6 characters: 5 digits + 1 uppercase letter (letter can be in any position)
 *   Display format: "11 11 1A" or "A1 11 11" (three groups of 2, space-separated)
 *   Storage format: "11111A" or "A11111" (no spaces, uppercase, CHAR(6) UNIQUE)
 *   Generation: cryptographically secure random (secrets.choice)
 *
 * ── API CONTRACT ──
 *   Endpoint: POST /api/track
 *   (Next.js mock uses POST /api/v1/track - update when FastAPI is live)
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
 *   A11111 - Active consultation (Company Registration, 3/6 milestones done)
 *   22A222 - Completed consultation (TIN Application, all 4 milestones done)
 *   333A33 - On hold consultation (Business Licensing, awaiting client documents)
 *   4444A4 - Active consultation (Work Permit Application, 4/7 milestones done)
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
  X,
  RotateCcw,
  Check,
} from "lucide-react";
import { Breadcrumb } from "@/exxonim/components/Breadcrumb";
import { routes } from "@/exxonim/routes";
import { SmartLink } from "@/exxonim/components/primitives/SmartLink";
import { applyResolvedSeo, createFallbackSeo } from "@/exxonim/seo";
import { Button } from "@/exxonim/components/primitives/Button";
import { lookupTrackingCode } from "@/exxonim/services/consultationService";
import { StructuredData } from "@/exxonim/components/StructuredData";
import { WhatsAppIcon } from "@/exxonim/components/WhatsAppIcon";
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
    if (!isoString || isNaN(d.getTime())) return "recently";
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

/* ─────────────────────────────────────────────────────────
 * DEMO CODES - env-gated
 * ───────────────────────────────────────────────────────── */
const SHOW_DEMO_HINT =
  typeof import.meta !== "undefined" &&
  (import.meta as { env?: Record<string, string | undefined> }).env?.VITE_SHOW_DEMO_HINT === "true";

const DEMO_CODES = ["A11111", "22A222", "333A33", "4444A4"] as const;

/* ─────────────────────────────────────────────────────────
 * HOW IT WORKS STEPS - uses Lucide icons
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
      "Enter your code here - no login, no account needed.",
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
/* Confetti burst for the completed celebration - a canvas overlay over its
 * parent. Runs once when `active` becomes true; skipped for reduced-motion. */
function useCelebration(active: boolean) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!active) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const cv = ref.current;
    const parent = cv?.parentElement;
    if (!cv || !parent) return;
    const rect = parent.getBoundingClientRect();
    cv.width = rect.width;
    cv.height = rect.height;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const cols = ["#1a8f5a", "#0f5c63", "#7fbcc1", "#f0b429", "#e8617d", "#3f8f95"];
    const parts = Array.from({ length: 90 }, (_, i) => ({
      x: cv.width / 2 + Math.sin(i) * 40,
      y: cv.height * 0.22,
      vx: (i % 2 ? 1 : -1) * (1 + Math.cos(i) * 3.2),
      vy: -(4 + (i % 7)) * 1.1,
      g: 0.16 + (i % 3) * 0.03,
      s: 5 + (i % 4) * 2,
      rot: i,
      vr: (i % 2 ? 1 : -1) * 0.2,
      c: cols[i % cols.length],
      life: 0,
    }));
    let raf = 0;
    const loop = () => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      let alive = false;
      for (const p of parts) {
        p.vy += p.g;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        p.life++;
        if (p.y < cv.height + 20) alive = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = Math.max(0, 1 - p.life / 120);
        ctx.fillStyle = p.c;
        ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 0.6);
        ctx.restore();
      }
      if (alive) raf = requestAnimationFrame(loop);
      else ctx.clearRect(0, 0, cv.width, cv.height);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [active]);
  return ref;
}

const WA_HREF = "https://wa.me/255794689099";

function TrackingResultCard({
  result,
  onReset,
}: {
  result: ApiTrackingLookupResponse;
  onReset: () => void;
}) {
  const isCompleted = result.status === "completed";
  const isOnHold = result.status === "on_hold";
  const hasMilestones =
    !!result.visibleMilestones && result.visibleMilestones.length > 0;
  const completedCount = result.completedSteps ?? 0;
  const totalCount = result.totalSteps ?? 0;
  const progressPercent =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // ── Behavioral polish ───────────────────────────────────────────────
  // Zeigarnik effect: an in-progress journey needs a visible ACTIVE step to
  // pull the eye forward. When the data hasn't flagged a "current" milestone
  // (common for a freshly opened case), promote the first upcoming one so the
  // timeline is never a lifeless row of grey dots.
  const rawMilestones = result.visibleMilestones ?? [];
  const displayMilestones =
    isCompleted || rawMilestones.some((m) => m.status === "current")
      ? rawMilestones
      : (() => {
          const i = rawMilestones.findIndex((m) => m.status === "upcoming");
          if (i === -1) return rawMilestones;
          return rawMilestones.map((m, idx) =>
            idx === i ? { ...m, status: "current" as const } : m,
          );
        })();

  // Endowed-progress + goal-gradient: an open case has already *started*, so we
  // never render a demotivating 0%. We floor the bar at a small head start and
  // frame progress as distance travelled toward the goal (more motivating than
  // "% done"), with encouragement that intensifies as the finish nears.
  const displayPercent = isCompleted
    ? 100
    : totalCount > 0
      ? Math.max(progressPercent, 8)
      : 0;
  const momentum = isCompleted
    ? ""
    : displayPercent >= 67
      ? "Almost there. The finish line is in sight."
      : displayPercent >= 34
        ? "Good momentum. This is moving."
        : "Underway. We've got it from here.";

  const confettiRef = useCelebration(isCompleted);
  const [popped, setPopped] = useState(false);
  useEffect(() => {
    if (!isCompleted) return;
    const t = setTimeout(() => setPopped(true), 60);
    return () => clearTimeout(t);
  }, [isCompleted]);

  // Plain-language "what's happening now": prefer the real backend message,
  // otherwise template it from the current + next milestone.
  const plainStatus =
    result.message ||
    (result.milestone
      ? `We're working on ${result.milestone}.${result.nextMilestone ? ` Next up: ${result.nextMilestone}.` : ""}`
      : "Your case is open and moving through our process. We'll update this the moment each step is reached.");

  const timeline = hasMilestones ? (
    <div className="rounded-[1.35rem] border border-border-soft bg-surface-elevated p-6 md:p-7 shadow-lg shadow-black/5">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="m-0 text-base font-semibold text-text">Your journey</h3>
        <span className="font-mono text-xs text-text-muted">
          {completedCount}/{totalCount}
        </span>
      </div>
      <div className="grid gap-0">
        {displayMilestones.map((milestone, index) => (
          <MilestoneItem
            key={milestone.label}
            milestone={milestone}
            isLast={index === displayMilestones.length - 1}
            prevCompleted={
              index > 0 ? displayMilestones[index - 1].status === "completed" : false
            }
          />
        ))}
      </div>
    </div>
  ) : null;

  return (
    <div className="grid gap-6 track-cascade">
      {isCompleted ? (
        /* ─────────── COMPLETED - the cheerful payoff ─────────── */
        <>
          <div className="relative overflow-hidden rounded-[1.5rem] border border-success/25 bg-gradient-to-b from-success-soft/40 to-surface-elevated p-8 text-center md:p-12">
            <canvas
              ref={confettiRef}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
            />
            <div className="relative">
              <div
                className={`mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-success text-white shadow-lg shadow-success/30 transition-all duration-500 ease-out ${
                  popped ? "scale-100 opacity-100" : "scale-50 opacity-0"
                }`}
              >
                <Check className="h-10 w-10" strokeWidth={3} />
              </div>
              <h2 className="m-0 text-3xl font-bold tracking-tight text-text md:text-4xl">
                It&rsquo;s done!
              </h2>
              <p className="mt-2 text-lg text-text-muted">
                Your{" "}
                <span className="font-semibold text-text">
                  {result.serviceType ?? "consultation"}
                </span>{" "}
                is ready.
              </p>
              <p className="mt-1 text-sm text-text-soft">
                All {totalCount} steps completed
                {result.trackingCode ? ` · ${formatTrackingCode(result.trackingCode)}` : ""}
              </p>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <a
                  href={WA_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 text-sm font-bold text-white transition-colors hover:bg-[#1ebe57]"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Get your documents
                </a>
                <Button size="standard" variant="outline" href={routes.contact}>
                  Talk about what&rsquo;s next
                </Button>
              </div>
              <p className="mt-6 text-sm text-text-soft">
                Thank you for trusting Exxonim with your paperwork.
              </p>
            </div>
          </div>
          {timeline}
          {/* Gentle next-step nudge - keep the relationship going past the win. */}
          <div className="rounded-[1.35rem] border border-border-soft bg-surface-elevated p-6 md:p-7 shadow-lg shadow-black/5">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-accent-soft text-accent">
                <Bell className="h-5 w-5" />
              </span>
              <div>
                <p className="m-0 text-sm font-bold text-text">Keep it that way</p>
                <p className="m-0 mt-0.5 text-sm text-text-muted">
                  Staying compliant means annual filings and renewals. We can handle those too,
                  and remind you before every deadline.
                </p>
              </div>
            </div>
            <Button size="standard" variant="outline" href={routes.services} className="mt-4">
              See ongoing compliance
            </Button>
          </div>
        </>
      ) : (
        /* ─────────── ACTIVE / ON HOLD - calm &amp; reassuring ─────────── */
        <>
          {/* Status hero */}
          <div
            className={`relative overflow-hidden rounded-[1.5rem] border bg-surface-elevated p-6 md:p-8 shadow-xl shadow-black/5 ${
              isOnHold ? "border-warning/25" : "border-success/25"
            }`}
          >
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full blur-3xl animate-pulse motion-reduce:animate-none ${
                isOnHold ? "bg-warning/15" : "bg-success/15"
              }`}
            />
            <div className="relative flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="m-0 text-sm text-text-muted">
                  {result.serviceType ?? "Your consultation"}
                </p>
                <div className="mt-1.5 flex items-center gap-2.5">
                  <span className="relative flex h-3 w-3">
                    {!isOnHold && (
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success/70" />
                    )}
                    <span
                      className={`relative inline-flex h-3 w-3 rounded-full ${isOnHold ? "bg-warning" : "bg-success"}`}
                    />
                  </span>
                  <h2 className="m-0 text-2xl font-bold tracking-tight text-text md:text-3xl">
                    {isOnHold ? "Paused for now" : "On track"}
                  </h2>
                </div>
                <p className="m-0 mt-1.5 text-xs text-text-soft">
                  Updated {formatDate(result.lastUpdated)}
                </p>
              </div>
              <span
                className="inline-flex items-center rounded-full bg-accent/10 px-3.5 py-1.5 font-mono text-sm font-bold tracking-[0.15em] text-accent"
                title={formatAbsoluteDate(result.lastUpdated)}
              >
                {result.trackingCode ? formatTrackingCode(result.trackingCode) : "-- -- --"}
              </span>
            </div>
          </div>

          {/* The hero answer: do I need to do anything? */}
          <div
            className={`flex items-center gap-3.5 rounded-[1.35rem] border p-4 md:p-5 ${
              isOnHold
                ? "border-warning/25 bg-warning-soft/30"
                : "border-success/25 bg-success-soft/30"
            }`}
          >
            <span
              className={`flex h-11 w-11 flex-none items-center justify-center rounded-xl text-white ${isOnHold ? "bg-warning" : "bg-success"}`}
            >
              {isOnHold ? <Bell className="h-5 w-5" /> : <Check className="h-5 w-5" strokeWidth={3} />}
            </span>
            <div>
              <p className="m-0 text-base font-bold text-text">
                {isOnHold ? "We may need something from you" : "Nothing needed from you right now"}
              </p>
              <p className="m-0 text-xs text-text-muted">
                {isOnHold
                  ? "See the note below or message us. We'll sort it fast."
                  : "We'll message you the moment anything changes."}
              </p>
            </div>
          </div>

          {/* Details + timeline - two columns on large screens, stacked below */}
          <div className="grid items-start gap-6 lg:grid-cols-2">
            <div className="grid gap-6">
              <div className="rounded-[1.35rem] border border-border-soft bg-surface-elevated p-6 md:p-7 shadow-lg shadow-black/5">
                <p className="m-0 mb-2 text-2xs font-extrabold uppercase tracking-[0.16em] text-text-muted">
                  What&rsquo;s happening now
                </p>
                <p className="m-0 text-base leading-relaxed text-text">{plainStatus}</p>
              </div>

              {totalCount > 0 && (
                <div className="rounded-[1.35rem] border border-border-soft bg-surface-elevated p-6 md:p-7 shadow-lg shadow-black/5">
                  <div className="mb-2.5 flex items-center justify-between text-xs font-semibold">
                    <span className="text-text-muted">
                      Step {Math.min(completedCount + 1, totalCount)} of {totalCount}
                    </span>
                    <span className="text-accent">{displayPercent}% of the way there</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-accent-soft">
                    <div
                      className="relative h-full overflow-hidden rounded-full bg-gradient-to-r from-accent to-accent-hover transition-[width] duration-1000 ease-out"
                      style={{ width: `${displayPercent}%` }}
                    >
                      <span
                        aria-hidden="true"
                        className="absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-white/30 blur-[2px] animate-progress-sheen motion-reduce:animate-none"
                      />
                    </div>
                  </div>
                  {momentum && (
                    <p className="m-0 mt-2.5 text-xs text-text-muted">{momentum}</p>
                  )}
                </div>
              )}

              <div className="grid gap-4 rounded-[1.35rem] border border-border-soft bg-surface-elevated p-6 md:p-7 shadow-lg shadow-black/5">
                <a
                  href={WA_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#25D366] text-sm font-bold text-white transition-colors hover:bg-[#1ebe57]"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Message us on WhatsApp
                </a>
                <p className="m-0 flex items-center gap-2.5 text-sm text-text-muted">
                  <Bell className="h-4 w-4 flex-none text-accent" />
                  We&rsquo;ll WhatsApp you at every step. No need to keep checking.
                </p>
              </div>
            </div>

            {timeline}
          </div>
        </>
      )}

      {/* Look up another code */}
      <div className="flex justify-center pt-1">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
        >
          <RotateCcw className="h-4 w-4" />
          Look up another code
        </button>
      </div>
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
          className={`w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center border-2 transition-colors ${
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
            <span className="text-2xs font-extrabold tracking-[0.12em] uppercase px-2 py-0.5 rounded-full bg-accent-soft text-accent">
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
 * SECURITY: Generic message - no format hints or pattern leakage.
 * ───────────────────────────────────────────────────────── */
function TrackingNotFound({
  code,
  onReset,
}: {
  code: string;
  onReset: () => void;
}) {
  const entered = normalizeTrackingCode(code);
  return (
    <div className="relative mx-auto grid max-w-[32rem] gap-6 overflow-hidden rounded-[1.75rem] border border-border-soft bg-surface-elevated p-8 text-center shadow-xl shadow-black/5 ring-1 ring-black/[0.03] md:p-10 animate-page-enter motion-reduce:animate-none">
      {/* Soft warning glow behind the icon */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-warning/10 blur-3xl"
      />
      <div className="relative grid justify-items-center gap-4">
        {/* Icon medallion with concentric halo rings */}
        <div className="relative flex h-20 w-20 items-center justify-center">
          <span aria-hidden="true" className="absolute inset-0 rounded-full border border-warning/15" />
          <span aria-hidden="true" className="absolute inset-[7px] rounded-full border border-warning/20" />
          <span className="relative flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-full bg-warning-soft/50 text-warning ring-1 ring-warning/25">
            <Search className="h-7 w-7" />
          </span>
        </div>
        <h3 className="m-0 text-2xl font-bold tracking-tight text-text md:text-[1.75rem]">
          We couldn&rsquo;t find that code
        </h3>
        {/* One plain sentence + next step (best practice). Kept vague on *why* -
            wrong / expired / never existed all read the same - so codes can't be
            guessed. */}
        <p className="m-0 max-w-[34ch] text-base leading-relaxed text-text-muted">
          Double-check the 6-character code from your WhatsApp and try again.
        </p>
        {entered.length === 6 ? (
          <div className="mt-0.5 inline-flex items-center gap-2 rounded-full border border-border-soft bg-surface px-4 py-1.5">
            <span className="text-2xs font-semibold uppercase tracking-[0.16em] text-text-soft">You entered</span>
            <span className="font-mono text-sm font-bold tracking-[0.18em] text-text">{formatTrackingCode(entered)}</span>
          </div>
        ) : (
          <p className="m-0 text-xs text-text-soft">
            A code looks like{" "}
            <span className="font-mono font-semibold text-text-muted">11&nbsp;11&nbsp;1A</span>{" "}
            (5 numbers and 1 letter).
          </p>
        )}
      </div>

      <div className="relative grid gap-2.5">
        <a
          href={WA_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#25D366] text-sm font-bold text-white transition-colors hover:bg-[#1ebe57]"
        >
          <WhatsAppIcon className="h-4 w-4" />
          Message us and we&rsquo;ll find it for you
        </a>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
        >
          <RotateCcw className="h-4 w-4" />
          Try another code
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
 * TRACKING CODE INPUT - auto-formatting, paste support
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
      aria-describedby="tracking-help"
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
    // Small delay to allow React to render the result, then move keyboard focus
    // to the result region (announced via aria-live) and scroll it into view.
    requestAnimationFrame(() => {
      resultRef.current?.focus({ preventScroll: true });
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  const handleLookup = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const normalized = normalizeTrackingCode(rawCode);
      if (!normalized) return;

      // Validate the FORMAT client-side (5 digits + 1 letter) BEFORE calling the
      // API. Mistyped codes used to hit the server and get a 400 (which then
      // surfaced as a misleading "our server had a problem" error, and spammed
      // the backend). Now they never leave the browser - the inline hint under
      // the field turns into a specific, friendly correction instead.
      if (!isValidTrackingCode(normalized)) {
        setNotFound(false);
        setLookupResult(null);
        setSearchError(null);
        return;
      }

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
      } catch (err) {
        // The service crafts user-friendly messages (e.g. a network-failure
        // hint or a backend-provided detail); surface it when present, and fall
        // back to the generic line only when there's nothing meaningful.
        setSearchError(
          err instanceof Error && err.message
            ? err.message
            : "We couldn't check your tracking code right now. Please try again in a moment."
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

  // Only allow submit when the FORMAT is genuinely valid (5 digits + 1 letter),
  // not merely 6 characters - so invalid codes can't reach the server.
  const canSearch = isValidTrackingCode(normalizeTrackingCode(rawCode));
  // 6 characters typed but the format is off → show a gentle, specific hint.
  const formatLooksOff =
    rawCode.length === 6 && !isValidTrackingCode(normalizeTrackingCode(rawCode));

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
        {/* Gradient background - layered teal wash for depth */}
        <div
          className="absolute inset-0 -z-10 opacity-90"
          style={{
            background:
              "radial-gradient(55% 55% at 82% -8%, var(--color-accent-gradient-subtle), transparent 66%), radial-gradient(45% 45% at 6% 12%, var(--color-accent-gradient-weak), transparent 70%), radial-gradient(60% 65% at 55% 108%, var(--color-accent-gradient-weak), transparent 72%)",
          }}
        />
        {/* Subtle dot-grid texture - masked so it only reads near the top */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-[8] pointer-events-none opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, var(--color-accent-gradient-subtle) 1px, transparent 1.6px)",
            backgroundSize: "26px 26px",
            maskImage: "radial-gradient(75% 55% at 55% 12%, #000 20%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(75% 55% at 55% 12%, #000 20%, transparent 100%)",
          }}
        />
        {/* Top fade: page bg → hero gradient - soft transition instead of hard line */}
        <div
          className="absolute top-0 left-0 right-0 h-24 -z-[5] pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, var(--color-page) 0%, var(--color-page) 10%, transparent 100%)",
          }}
        />
        {/* Breadcrumb - now inside hero for seamless fade */}
        <div className="max-w-[1240px] px-4 sm:px-6 lg:px-8 mx-auto pt-4">
          <Breadcrumb
            items={[
              { label: "Home", href: routes.home, icon: Home },
              { label: "Track Consultation" },
            ]}
          />
        </div>
        <div className="max-w-[1240px] px-4 sm:px-6 lg:px-8 mx-auto pt-8 md:pt-12 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          {/* Left: Text - on mobile renders AFTER the tracking card */}
          <div className="grid gap-6" style={{ order: 2 }}>
            <p className="inline-flex items-center gap-2 text-accent text-xs font-extrabold tracking-[0.18em] uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              Consultation Tracking
            </p>
            <h1 className="m-0 text-[clamp(2.4rem,5vw,4.4rem)] font-semibold leading-[1.05] tracking-tight text-text">
              Where does your file stand?
            </h1>
            <p className="m-0 text-text-muted text-lg max-w-[36rem]">
              Enter the code from your WhatsApp and see exactly where things stand:
              your full timeline, in real time. No login, no waiting on hold. And we
              message you at every step, so you never have to wonder.
            </p>
            <ul className="m-0 grid gap-2.5 p-0 list-none">
              {[
                "See your whole journey, step by step, with dates",
                "We handle the authorities; you just watch the progress",
                "Updates come to your WhatsApp automatically",
              ].map((line) => (
                <li key={line} className="flex items-start gap-2.5 text-text-muted text-base">
                  <Check className="mt-0.5 h-4 w-4 flex-none text-accent" strokeWidth={3} />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Tracking lookup card - on mobile renders FIRST */}
          <div className="relative" style={{ order: 1 }}>
            <div className="relative rounded-[2rem] border border-border-soft bg-surface/80 backdrop-blur-xl p-6 md:p-8 grid gap-5 shadow-2xl shadow-accent/10 ring-1 ring-black/[0.03]">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <Search className="h-5 w-5" />
                </span>
                <div className="grid gap-0.5">
                  <span className="text-2xs font-extrabold tracking-[0.2em] uppercase text-accent">
                    Look up your consultation
                  </span>
                  <p className="m-0 text-sm text-text-muted">
                    No account, no password. Just the code from your WhatsApp.
                  </p>
                </div>
              </div>
              <form onSubmit={handleLookup} className="grid gap-3">
                <label htmlFor="tracking-code" className="text-sm font-semibold text-text">
                  Your tracking code
                </label>
                <TrackingCodeInput
                  value={rawCode}
                  onChange={handleCodeChange}
                  disabled={isSearching}
                  inputRef={inputRef}
                />
                {formatLooksOff ? (
                  <p id="tracking-help" role="alert" className="m-0 flex items-start gap-1.5 text-xs text-warning">
                    <span aria-hidden="true">↳</span>
                    <span>
                      That code doesn&rsquo;t look right. Double-check the one from
                      your WhatsApp and try again.
                    </span>
                  </p>
                ) : (
                  <p id="tracking-help" className="m-0 text-xs text-text-muted">
                    Enter the 6-character code from your WhatsApp.
                    {canSearch && !isSearching ? " Press Enter to check." : ""}
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

              {/* Error state - dismissible */}
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

              {/* Quick stats - only unique value props */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border-soft">
                <div className="grid gap-1 items-center text-center">
                  <Clock className="w-5 h-5 text-accent mx-auto" />
                  <span className="text-xs text-text-muted font-semibold">
                    Always Current
                  </span>
                </div>
                <div className="grid gap-1 items-center text-center">
                  <WhatsAppIcon className="w-5 h-5 text-accent mx-auto" />
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

              {/* Demo hint - env-gated, clickable chips, no pattern text */}
              {SHOW_DEMO_HINT && (
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <span className="text-2xs text-text-soft/60">Demo:</span>
                  {DEMO_CODES.map((code) => (
                    <button
                      key={code}
                      type="button"
                      onClick={() => handleDemoFill(code)}
                      className="text-2xs font-mono text-accent hover:bg-accent-soft px-1.5 py-0.5 rounded transition-colors"
                    >
                      {formatTrackingCode(code)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Bottom fade: hero gradient → page bg - soft transition to content below */}
        <div
          className="absolute bottom-0 left-0 right-0 h-20 -z-[5] pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, var(--color-page) 0%, var(--color-page) 10%, transparent 100%)",
          }}
        />
      </section>

      {/* ── Tracking result ── */}
      <div
        ref={resultRef}
        tabIndex={-1}
        aria-live="polite"
        className="scroll-mt-28 focus:outline-none"
      >

        {/* Inline search indicator - subtle, in the result area only.
         * NOT a full-page loader. Shows a minimal "Searching..." message
         * inside the result panel so users know the lookup is in progress. */}
        {isSearching && (
          <section className="pb-16 md:pb-20">
            <div className="max-w-[1240px] px-4 sm:px-6 lg:px-8 mx-auto max-w-[52rem]">
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
            <div className="max-w-[64rem] px-4 sm:px-6 lg:px-8 mx-auto">
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

      {/* First-time / explainer content - hidden once a result (or not-found)
          is shown, so a visitor who already got their answer isn't buried under
          "how to track" + "lost your code" content. */}
      {!lookupResult && !notFound && (
        <>
      {/* ── How it works ── */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1240px] px-4 sm:px-6 lg:px-8 mx-auto grid gap-10">
          <div className="grid gap-3 max-w-[42rem]">
            <span className="text-2xs font-extrabold tracking-[0.2em] uppercase text-accent">
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
                className="group relative p-6 rounded-[1.35rem] border border-footer-border bg-footer-bg transition-transform hover:-translate-y-1 hover:border-white/25 grid gap-3"
              >
                <span className="inline-flex items-center gap-2.5">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/10 text-footer-heading text-xs font-bold">{i + 1}</span>
                  <span className="text-white/85">{step.icon}</span>
                </span>
                <strong className="text-footer-heading text-base">{step.title}</strong>
                <p className="m-0 text-footer-text text-sm leading-relaxed">
                  {step.detail}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Privacy + Lost code - combined to reduce redundancy ── */}
      <section id="lost-code" className="py-16 md:py-20 scroll-mt-8">
        <div className="max-w-[1240px] px-4 sm:px-6 lg:px-8 mx-auto max-w-[42rem] grid gap-4">
          <div className="flex items-start gap-4 p-5 rounded-[1.35rem] border border-border-soft bg-surface-elevated">
            <span className="text-accent mt-0.5 flex-shrink-0"><WhatsAppIcon className="w-5 h-5" /></span>
            <div className="grid gap-0.5">
              <strong className="text-text text-sm">Lost your code?</strong>
              <p className="m-0 text-text-muted text-xs leading-relaxed">
                Check your WhatsApp - we send it when your consultation starts. Or{" "}
                <SmartLink href={routes.contact} className="text-accent hover:text-accent-hover font-semibold transition-colors">contact us</SmartLink> and we&rsquo;ll look it up.
              </p>
            </div>
          </div>
        </div>
      </section>
        </>
      )}
    </main>
  );
}

