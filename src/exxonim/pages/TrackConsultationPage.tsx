/**
 * Track Your Consultation page — Exxonim's CORE DIFFERENTIATOR.
 *
 * ═══════════════════════════════════════════════════════════
 * BACKEND / ADMIN INTEGRATION NOTES (FastAPI + PostgreSQL)
 * ═══════════════════════════════════════════════════════════
 *
 * ── TRACKING NUMBER FORMAT ──
 *   Format: EXX-{SVC}-{SEQ}
 *   - SVC = 3-letter service code (see below)
 *   - SEQ = 5-digit sequential number, auto-incremented per service code
 *   - Generated automatically when admin creates a new consultation
 *
 *   Service codes:
 *     REG = Company Registration     LIC = Business Licensing
 *     TIN = TIN Application          COM = Compliance Support
 *     WPK = Work Permit              OPS = Operational Advisory
 *     GEN = General Consultation
 *
 *   Examples: EXX-REG-00001, EXX-LIC-00042, EXX-GEN-00103
 *
 * ── ADMIN WORKFLOW ──
 *   1. Consultation is created either:
 *      a) Client submits the public contact form (auto-creates a consultation)
 *      b) Admin creates manually in the admin panel (proxy application)
 *
 *   2. When creating, admin selects:
 *      - Service type → determines milestone template AND tracking number prefix
 *      - Client's preferred update channel (WhatsApp / Email / SMS)
 *        → Asked during the initial consultation conversation
 *        → Can be changed later by admin if client requests
 *      - Client contact details (name, email, phone)
 *
 *   3. System auto-generates tracking number: EXX-{SVC}-{next_seq}
 *
 *   4. Each service type has PREDEFINED milestone stages in the DB:
 *      e.g., Company Registration stages:
 *        1. Consultation Received
 *        2. Name Clearance Filed
 *        3. Name Approved
 *        4. Document Review
 *        5. BRELA Submission
 *        6. Certificate Issued
 *
 *   5. Admin advances milestones by selecting the next stage from a dropdown.
 *      - Date auto-fills to NOW() when admin selects the stage
 *      - Admin CAN override the date if needed (e.g., backdating)
 *
 *   6. When a milestone is advanced, the system automatically sends a
 *      proactive update to the client via their chosen channel.
 *
 * ── PROXY APPLICATIONS ──
 *   Admin can start an application on behalf of a client (e.g., when a
 *   family member or friend provides the information). This is just a
 *   normal consultation created by admin in the panel. The tracking
 *   updates go to whatever contact details are provided. The client
 *   does not need to have submitted the form themselves.
 *
 * ── PREFERRED CHANNEL ──
 *   The client's preferred update channel is collected:
 *   - On the public contact form (as a dropdown selector)
 *   - Or by the admin during the initial conversation
 *   It defaults to WhatsApp (most common in Tanzania).
 *   Admin can update it at any time from the consultation detail view.
 *
 * ── PLANNED BACKEND ENDPOINTS ──
 *   POST /api/v1/consultations/lookup
 *     → Body: { reference_id: string }
 *     → Returns: TrackingLookupResult (see interface below)
 *
 *   GET /api/v1/consultations/{reference_id}
 *     → Same response shape (for direct links)
 *
 * ═══════════════════════════════════════════════════════════ */

import { useEffect, useState } from "react";
import { Breadcrumb } from "@/exxonim/components/Breadcrumb";
import { routes } from "@/exxonim/routes";
import { applyResolvedSeo, createFallbackSeo } from '@/exxonim/seo';

/* ─────────────────────────────────────────────────────────
 * SVG ICON COMPONENTS (replacing emojis — professional look)
 * ───────────────────────────────────────────────────────── */
function WhatsAppIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.01 2.014a9.96 9.96 0 0 0-8.52 15.11L2 22l4.985-1.465a9.961 9.961 0 1 0 5.025-18.52Zm0 18.067a8.093 8.093 0 0 1-4.14-1.134l-.297-.176-3.082.906.924-2.977-.193-.306A8.098 8.098 0 1 1 12.01 20.08Zm4.437-6.042c-.244-.122-1.439-.711-1.662-.793-.223-.081-.385-.122-.547.122-.162.244-.628.793-.77.955-.142.162-.284.183-.528.061-1.18-.56-2.072-1.1-2.884-2.522-.083-.146-.01-.223.111-.345.11-.11.244-.284.366-.427.122-.142.162-.244.244-.407.081-.162.041-.305-.02-.427-.061-.122-.547-1.32-.75-1.808-.198-.475-.399-.411-.547-.419-.142-.008-.305-.008-.468-.008-.162 0-.427.061-.65.305-.223.244-.852.833-.852 2.032s.873 2.358.995 2.522c.122.162 1.714 2.628 4.153 3.67.58.24 1.033.383 1.385.49.582.185 1.112.158 1.531.096.47-.07 1.439-.588 1.642-1.157.203-.569.203-1.056.142-1.157-.061-.101-.223-.162-.468-.284Z" />
    </svg>
  );
}

function EmailIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="3" />
      <path d="M22 7l-10 6L2 7" />
    </svg>
  );
}

function SmsIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="3" />
      <path d="M7 10h0M12 10h0M17 10h0" />
    </svg>
  );
}

function SearchIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  );
}

function ChannelIcon({ channel, className }: { channel: string; className?: string }) {
  switch (channel) {
    case "WhatsApp":
      return <WhatsAppIcon className={className} />;
    case "Email":
      return <EmailIcon className={className} />;
    case "SMS":
      return <SmsIcon className={className} />;
    default:
      return null;
  }
}

/* ─────────────────────────────────────────────────────────
 * MOCK TRACKING DATA
 * ────────────────────────────────────────────────────────
 * BACKEND: Replace with real API call:
 *   POST /api/v1/consultations/lookup { reference_id: trackingId }
 *   → Returns TrackingLookupResult shape.
 *
 * Demo: any tracking number returns this realistic mock response.
 * ───────────────────────────────────────────────────────── */
interface TrackingMilestone {
  label: string;
  detail: string;
  date: string;
  status: "completed" | "current" | "upcoming";
}

interface TrackingLookupResult {
  trackingId: string;
  serviceType: string;
  status: "In Progress" | "Completed" | "Pending Review" | "Submitted";
  currentStage: string;
  preferredChannel: "WhatsApp" | "Email" | "SMS";
  submittedDate: string;
  estimatedCompletion: string;
  lastUpdated: string;
  nextAction: string;
  milestones: TrackingMilestone[];
}

/**
 * Valid service codes used in tracking numbers.
 * BACKEND: Replace with lookup from the database.
 */
const VALID_SERVICE_CODES = ["REG", "LIC", "TIN", "COM", "WPK", "OPS", "GEN"];

/**
 * Validates whether a tracking ID matches the expected format: EXX-{SVC}-{SEQ}
 * where SVC is a 3-letter service code and SEQ is a 5-digit number.
 *
 * BACKEND: Replace this with the real API response.
 * The API should return 404 for non-existent / expired tracking numbers,
 * and the frontend should set `notFound = true` in that case.
 */
function isValidTrackingFormat(id: string): boolean {
  const normalized = id.trim().toUpperCase();
  const pattern = /^EXX-([A-Z]{3})-(\d{5})$/;
  const match = pattern.exec(normalized);
  if (!match) return false;
  const serviceCode = match[1];
  return VALID_SERVICE_CODES.includes(serviceCode);
}

function getMockTrackingResult(id: string): TrackingLookupResult | null {
  /* Validate the tracking number format first.
   * Invalid format → return null → shows "not found" state.
   *
   * BACKEND: Replace this entire function with:
   *   POST /api/v1/consultations/lookup { reference_id: id }
   *   → 200 with TrackingLookupResult, or 404 → setNotFound(true)
   */
  if (!isValidTrackingFormat(id)) return null;

  const normalized = id.trim().toUpperCase();
  return {
    trackingId: normalized,
    serviceType: "Company Registration",
    status: "In Progress",
    currentStage: "Document Review",
    preferredChannel: "WhatsApp",
    submittedDate: "2026-02-18",
    estimatedCompletion: "2026-03-15",
    lastUpdated: "4 Mar 2026, 09:42 AM",
    nextAction:
      "Awaiting BRELA name clearance. You'll receive a WhatsApp update once approved.",
    milestones: [
      {
        label: "Consultation Received",
        detail: "Tracking number assigned.",
        date: "18 Feb",
        status: "completed",
      },
      {
        label: "Name Clearance Filed",
        detail: "Submitted to BRELA.",
        date: "20 Feb",
        status: "completed",
      },
      {
        label: "Name Approved",
        detail: "Company name cleared.",
        date: "26 Feb",
        status: "completed",
      },
      {
        label: "Document Review",
        detail: "Memorandum & Articles under review.",
        date: "2 Mar",
        status: "current",
      },
      {
        label: "BRELA Submission",
        detail: "Incorporation documents to be filed.",
        date: "—",
        status: "upcoming",
      },
      {
        label: "Certificate Issued",
        detail: "Certificate of Incorporation delivered.",
        date: "—",
        status: "upcoming",
      },
    ],
  };
}

/* ─────────────────────────────────────────────────────────
 * STATIC CONTENT — How it Works steps (tight, visual)
 * ───────────────────────────────────────────────────────── */
const STEPS = [
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "Get your tracking number",
    detail: "Assigned automatically when your consultation starts.",
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
      </svg>
    ),
    title: "Receive proactive updates",
    detail: "Every milestone — WhatsApp, email, or SMS. You choose.",
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
    title: "Look up anytime",
    detail: "Enter your number on this page. No login, no password.",
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
    title: "Get your documents",
    detail: "Certificate, licence, or filing — delivered to you.",
  },
];

const CHANNELS = [
  {
    icon: <WhatsAppIcon className="w-7 h-7" />,
    label: "WhatsApp",
    detail: "Instant messages to your number",
  },
  {
    icon: <EmailIcon className="w-7 h-7" />,
    label: "Email",
    detail: "Structured updates with attachments",
  },
  {
    icon: <SmsIcon className="w-7 h-7" />,
    label: "SMS",
    detail: "Brief status notifications",
  },
];

/* ─────────────────────────────────────────────────────────
 * TRACKING RESULT COMPONENT
 * ───────────────────────────────────────────────────────── */
function TrackingResult({ result }: { result: TrackingLookupResult }) {
  const completedCount = result.milestones.filter(
    (m) => m.status === "completed"
  ).length;
  const totalCount = result.milestones.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="grid gap-6">
      {/* Status header card */}
      <div className="rounded-[1.35rem] border border-border-soft bg-surface-elevated overflow-hidden">
        {/* Progress bar */}
        <div className="h-1.5 bg-surface-soft">
          <div
            className="h-full bg-accent transition-all duration-700 ease-out rounded-r-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="p-6 md:p-8 grid gap-5">
          {/* Row 1: Tracking ID + Status */}
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="grid gap-1">
              <span className="text-[0.68rem] font-extrabold tracking-[0.18em] uppercase text-text-muted">
                Tracking Number
              </span>
              <span className="text-2xl md:text-3xl font-mono font-bold text-text tracking-tight">
                {result.trackingId}
              </span>
            </div>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-soft text-accent text-sm font-extrabold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              {result.status}
            </span>
          </div>

          {/* Row 2: Key details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-border-soft">
            <DetailItem label="Service" value={result.serviceType} />
            <DetailItem label="Current Stage" value={result.currentStage} />
            <DetailItem label="Submitted" value={formatDate(result.submittedDate)} />
            <DetailItem label="Est. Completion" value={formatDate(result.estimatedCompletion)} />
          </div>

          {/* Row 3: Next action */}
          <div className="grid gap-2 p-4 rounded-xl bg-accent-soft/40 border border-accent/10">
            <span className="text-[0.68rem] font-extrabold tracking-[0.16em] uppercase text-accent">
              Next Action
            </span>
            <p className="m-0 text-text text-sm leading-relaxed">
              {result.nextAction}
            </p>
          </div>

          {/* Row 4: Channel + Last Updated */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-text-muted">
            <span className="inline-flex items-center gap-1.5">
              <ChannelIcon channel={result.preferredChannel} className="w-4 h-4" />
              Updates via {result.preferredChannel}
            </span>
            <span>Last updated: {result.lastUpdated}</span>
          </div>
        </div>
      </div>

      {/* Milestone timeline */}
      <div className="rounded-[1.35rem] border border-border-soft bg-surface-elevated p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="m-0 text-lg font-semibold text-text">
            Timeline
          </h3>
          <span className="text-xs text-text-muted font-mono">
            {completedCount}/{totalCount}
          </span>
        </div>
        <div className="grid gap-0">
          {result.milestones.map((milestone, index) => (
            <MilestoneItem
              key={milestone.label}
              milestone={milestone}
              isLast={index === result.milestones.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-0.5">
      <span className="text-[0.68rem] font-extrabold tracking-[0.14em] uppercase text-text-muted">
        {label}
      </span>
      <span className="text-sm font-semibold text-text">{value}</span>
    </div>
  );
}

function MilestoneItem({
  milestone,
  isLast,
}: {
  milestone: TrackingMilestone;
  isLast: boolean;
}) {
  const isCompleted = milestone.status === "completed";
  const isCurrent = milestone.status === "current";

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
            <svg className="w-2.5 h-2.5 text-accent-contrast" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
          {isCurrent && <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />}
        </div>
        {!isLast && (
          <div className={`w-0.5 flex-1 min-h-[2rem] ${isCompleted ? "bg-accent/40" : "bg-border-soft"}`} />
        )}
      </div>

      {/* Content */}
      <div className={`pb-6 ${isLast ? "pb-0" : ""}`}>
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`text-sm font-semibold ${
              isCompleted ? "text-text" : isCurrent ? "text-accent" : "text-text-muted"
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
        <p className={`m-0 mt-0.5 text-sm leading-relaxed ${isCompleted || isCurrent ? "text-text-muted" : "text-text-soft"}`}>
          {milestone.detail}
        </p>
        <span className={`text-xs mt-0.5 inline-block font-mono ${isCompleted || isCurrent ? "text-text-muted/70" : "text-text-soft/50"}`}>
          {milestone.date}
        </span>
      </div>
    </div>
  );
}

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return dateStr;
  }
}

/* ─────────────────────────────────────────────────────────
 * NOT FOUND COMPONENT
 * ───────────────────────────────────────────────────────── */
function TrackingNotFound({ id }: { id: string }) {
  const isValidFormat = isValidTrackingFormat(id);

  return (
    <div className="rounded-[1.35rem] border border-border-soft bg-surface-elevated p-6 md:p-8 text-center grid gap-4">
      <div className="w-14 h-14 rounded-full bg-surface-soft mx-auto flex items-center justify-center">
        <SearchIcon className="w-7 h-7 text-text-muted" />
      </div>
      <div className="grid gap-2">
        <h3 className="m-0 text-lg font-semibold text-text">
          No consultation found
        </h3>
        <p className="m-0 text-text-muted text-sm leading-relaxed max-w-[28rem] mx-auto">
          We couldn&rsquo;t find a consultation with tracking number{" "}
          <strong className="font-mono text-text">{id.toUpperCase()}</strong>.
          {isValidFormat
            ? " This number may have expired or not been activated yet."
            : " The format doesn't match our tracking numbers."
          }
        </p>
      </div>
      {!isValidFormat && (
        <div className="rounded-xl bg-surface-soft/60 border border-border-soft p-4 text-left max-w-[28rem] mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-text-soft">
            Correct format
          </span>
          <p className="m-0 mt-1 text-sm font-mono text-text">
            EXX-<span className="text-accent">SVC</span>-00000
          </p>
          <p className="m-0 mt-1.5 text-xs text-text-muted leading-relaxed">
            Where <strong className="text-text">SVC</strong> is the service code (REG, LIC, TIN, COM, WPK, OPS, GEN) and the last 5 digits are your unique sequence number.
          </p>
          <p className="m-0 mt-2 text-xs text-text-muted">
            Example: <span className="font-mono text-text">EXX-REG-00001</span>
          </p>
        </div>
      )}
      <div className="flex flex-wrap gap-3 justify-center pt-1">
        <a
          href={routes.contact}
          className="inline-flex items-center justify-center min-h-[2.75rem] px-5 rounded-full bg-accent text-accent-contrast text-sm font-extrabold transition-all hover:bg-accent-hover"
        >
          Contact Exxonim
        </a>
        <a
          href={routes.support}
          className="inline-flex items-center justify-center min-h-[2.75rem] px-5 rounded-full border border-border-soft bg-surface text-text text-sm font-extrabold transition-all hover:bg-accent-soft"
        >
          Get Support
        </a>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
 * DECORATIVE ILLUSTRATION — replaces wall of text
 * A simple, branded visual that communicates "tracking" visually
 * ───────────────────────────────────────────────────────── */
function TrackingVisual() {
  return (
    <div className="relative w-full max-w-[28rem] mx-auto aspect-[4/3] flex items-center justify-center">
      {/* Background circles */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[70%] h-[70%] rounded-full border border-accent/10" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[45%] h-[45%] rounded-full border border-accent/20" />
      </div>

      {/* Center pulsing dot */}
      <div className="relative flex items-center justify-center">
        <span className="absolute w-16 h-16 rounded-full bg-accent/10 animate-ping" />
        <span className="relative w-10 h-10 rounded-full bg-accent flex items-center justify-center shadow-accent-glow">
          <svg className="w-5 h-5 text-accent-contrast" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </span>
      </div>

      {/* Floating milestone dots */}
      <div className="absolute top-[18%] right-[22%]">
        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-elevated/80 border border-accent/20 text-[0.65rem] font-bold text-accent backdrop-blur">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          Name Cleared
        </span>
      </div>
      <div className="absolute bottom-[22%] left-[12%]">
        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-elevated/80 border border-border-soft text-[0.65rem] font-bold text-text-muted backdrop-blur">
          <span className="w-1.5 h-1.5 rounded-full bg-border-soft" />
          BRELA Filing
        </span>
      </div>
      <div className="absolute top-[12%] left-[18%]">
        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-elevated/80 border border-accent/20 text-[0.65rem] font-bold text-accent backdrop-blur">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          Submitted
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
 * MAIN PAGE COMPONENT
 * ───────────────────────────────────────────────────────── */
export function TrackConsultationPage() {
  const [trackingId, setTrackingId] = useState("");
  const [lookupResult, setLookupResult] = useState<TrackingLookupResult | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // SEO: Optimized title tag for search engines and browser tabs
  useEffect(() => {
    applyResolvedSeo(
      createFallbackSeo(routes.trackConsultation, {
        title: "Track Your Consultation | Exxonim Consult",
        description: "Look up your Exxonim Consult consultation status anytime using your tracking reference ID. No login required.",
        robots: "index,follow",
      })
    );
  }, []);

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = trackingId.trim();
    if (!trimmed) return;

    setIsSearching(true);
    setNotFound(false);
    setLookupResult(null);

    // BACKEND: Replace with real API call:
    // POST /api/v1/consultations/lookup { reference_id: trimmed }
    // → 200 with TrackingLookupResult, or 404 → setNotFound(true)
    setTimeout(() => {
      const result = getMockTrackingResult(trimmed);
      if (result) {
        setLookupResult(result);
      } else {
        setNotFound(true);
      }
      setIsSearching(false);
    }, 800);
  };

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-4 pb-20 md:pt-8 md:pb-28">
        <div
          className="absolute inset-0 -z-10 opacity-70"
          style={{
            background:
              "radial-gradient(60% 50% at 80% 0%, hsl(var(--accent) / 0.18), transparent 70%), radial-gradient(40% 40% at 10% 20%, hsl(var(--accent) / 0.10), transparent 70%)",
          }}
        />
        <div className="max-w-[min(1240px,calc(100%-2rem))] mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <Breadcrumb items={[{ label: "Home", href: routes.home }, { label: "Track Consultation" }]} />
        </div>
        <div className="w-[min(1240px,calc(100%-2rem))] mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
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
              Automated updates at every milestone — via WhatsApp, email, or
              SMS. Enter your tracking number for an instant status check.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                className="inline-flex items-center justify-center min-h-[3.25rem] px-6 rounded-full bg-highlight text-accent-contrast text-sm font-extrabold shadow-accent-glow transition-all hover:-translate-y-0.5 hover:bg-highlight-hover"
                href={routes.contact}
              >
                Request a Consultation
              </a>
              <a
                className="inline-flex items-center justify-center min-h-[3.25rem] px-6 rounded-full border border-border-soft bg-surface/60 backdrop-blur text-text text-sm font-extrabold transition-all hover:-translate-y-0.5 hover:bg-accent-soft"
                href={routes.services}
              >
                View All Services
              </a>
            </div>
          </div>

          {/* Tracking lookup card */}
          <div className="relative">
            <div className="rounded-[2rem] border border-border-soft bg-surface/70 backdrop-blur p-8 grid gap-5 shadow-button">
              <span className="text-[0.72rem] font-extrabold tracking-[0.2em] uppercase text-accent">
                Look up your consultation
              </span>
              <form onSubmit={handleLookup} className="grid gap-3">
                <label htmlFor="tracking-id" className="sr-only">
                  Tracking number
                </label>
                <input
                  id="tracking-id"
                  type="text"
                  value={trackingId}
                  onChange={(e) => {
                    setTrackingId(e.target.value);
                    setLookupResult(null);
                    setNotFound(false);
                  }}
                  placeholder="e.g., EXX-REG-00001"
                  className="w-full h-12 px-4 rounded-xl border border-border-soft bg-surface text-text text-sm font-mono placeholder:text-text-soft/50 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
                />
                <button
                  type="submit"
                  disabled={isSearching || !trackingId.trim()}
                  className="w-full inline-flex items-center justify-center min-h-[2.75rem] rounded-xl bg-accent text-accent-contrast text-sm font-extrabold transition-all hover:bg-accent-hover disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSearching ? (
                    <span className="inline-flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Checking…
                    </span>
                  ) : (
                    "Check Status"
                  )}
                </button>
              </form>
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border-soft">
                <div className="grid gap-1">
                  <strong className="text-[1.5rem] leading-none text-text">4</strong>
                  <span className="text-xs text-text-muted">Stages</span>
                </div>
                <div className="grid gap-1">
                  <strong className="text-[1.5rem] leading-none text-text">3</strong>
                  <span className="text-xs text-text-muted">Channels</span>
                </div>
                <div className="grid gap-1">
                  <strong className="text-[1.5rem] leading-none text-accent">0</strong>
                  <span className="text-xs text-text-muted">Logins needed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tracking result ── */}
      {(lookupResult || notFound) && (
        <section className="pb-16 md:pb-20">
          <div className="w-[min(1240px,calc(100%-2rem))] mx-auto max-w-[52rem]">
            {lookupResult && <TrackingResult result={lookupResult} />}
            {notFound && <TrackingNotFound id={trackingId} />}
          </div>
        </section>
      )}

      {/* ── How it works — visual, icon-led, minimal text ── */}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STEPS.map((step, i) => (
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

      {/* ── Update channels — icons, not emojis ── */}
      <section className="py-16 md:py-20">
        <div className="w-[min(1240px,calc(100%-2rem))] mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="grid gap-6">
            <span className="text-[0.72rem] font-extrabold tracking-[0.2em] uppercase text-accent">
              Your preferred channel
            </span>
            <h2 className="m-0 text-[clamp(1.8rem,3vw,2.6rem)] font-semibold tracking-tight text-text">
              Choose how you receive updates
            </h2>
            <p className="m-0 text-text-muted max-w-[36rem]">
              At engagement, you pick one channel. Every milestone update
              is delivered there automatically — no portal, no login.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {CHANNELS.map((channel) => (
                <article
                  key={channel.label}
                  className="p-5 rounded-[1.35rem] border border-border-soft bg-surface-elevated transition-all hover:-translate-y-1 hover:border-accent/40 grid gap-2"
                >
                  <span className="text-accent">{channel.icon}</span>
                  <strong className="text-text text-sm">{channel.label}</strong>
                  <p className="m-0 text-text-muted text-xs">{channel.detail}</p>
                </article>
              ))}
            </div>
          </div>

          {/* Visual illustration — replaces "Why this matters" wall of text */}
          <TrackingVisual />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="pb-20">
        <div className="w-[min(1240px,calc(100%-2rem))] mx-auto">
          <div
            className="relative overflow-hidden rounded-[2rem] p-10 md:p-14 grid gap-6 text-center border border-border-soft"
            style={{
              background:
                "radial-gradient(80% 100% at 50% 0%, hsl(var(--accent) / 0.22), transparent 70%), hsl(var(--surface))",
            }}
          >
            <h2 className="m-0 text-[clamp(1.6rem,3vw,2.4rem)] font-semibold tracking-tight text-text max-w-[36rem] mx-auto">
              Ready to experience proactive consulting?
            </h2>
            <p className="m-0 text-text-muted max-w-[34rem] mx-auto">
              Contact Exxonim and receive a tracking number that keeps you
              informed at every step.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                className="inline-flex items-center justify-center min-h-[3.25rem] px-6 rounded-full bg-highlight text-accent-contrast text-sm font-extrabold shadow-accent-glow transition-all hover:-translate-y-0.5 hover:bg-highlight-hover"
                href={routes.contact}
              >
                Request a Consultation
              </a>
              <a
                className="inline-flex items-center justify-center min-h-[3.25rem] px-6 rounded-full border border-border-soft bg-surface/70 text-text text-sm font-extrabold transition-all hover:-translate-y-0.5 hover:bg-accent-soft"
                href={routes.services}
              >
                Explore All Services
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
