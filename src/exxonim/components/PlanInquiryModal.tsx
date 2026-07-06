/**
 * PlanInquiryModal - Quick inquiry form that opens from pricing card CTA.
 *
 * UX pattern:
 *   - Desktop: centered modal with backdrop
 *   - Mobile: bottom sheet that slides up (native feel)
 *   - Only 3 fields: Name, Email, Phone (minimal friction)
 *   - Plan + segment info sent silently in the submission payload
 *
 * Design inspired by Linear / Vercel / Stripe quick-action modals:
 *   - Floating pill badge showing selected plan
 *   - Clean, spacious form with large touch targets
 *   - Success state with tracking code
 *   - Smooth enter/exit transitions
 */

import { createPortal } from "react-dom";
import { useEffect, useId, useMemo, useState, type FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { X, Star, Check } from "lucide-react";
import { submitPublicConsultation } from "@/exxonim/services/consultationService";
import type { ApiPublicConsultationSubmissionResponse } from "@/exxonim/types/api";
import { cn } from "@/exxonim/utils/cn";
import { PhoneInput } from "./PhoneInput";
import { SmartLink } from "./primitives/SmartLink";
import { routes } from "@/exxonim/routes";

/* ── Plan → service type mapping (mirrors ContactPage's PLAN_SERVICE_MAP) ── */
const PLAN_SERVICE_MAP: Record<string, { serviceCode: string; label: string; segment: string }> = {
  "starter-local-entrepreneurs":   { serviceCode: "registration", label: "Starter", segment: "Local Entrepreneurs" },
  "growth-local-entrepreneurs":    { serviceCode: "compliance",   label: "Growth",  segment: "Local Entrepreneurs" },
  "premium-local-entrepreneurs":   { serviceCode: "compliance",   label: "Premium", segment: "Local Entrepreneurs" },
  "starter-foreign-investors":     { serviceCode: "registration", label: "Starter", segment: "Foreign Investors" },
  "growth-foreign-investors":      { serviceCode: "registration", label: "Growth",  segment: "Foreign Investors" },
  "premium-foreign-investors":     { serviceCode: "compliance",   label: "Premium", segment: "Foreign Investors" },
  "starter-enterprises":           { serviceCode: "registration", label: "Starter", segment: "Enterprises" },
  "growth-enterprises":            { serviceCode: "compliance",   label: "Growth",  segment: "Enterprises" },
  "premium-enterprises":           { serviceCode: "compliance",   label: "Premium", segment: "Enterprises" },
  "starter-ngos":                  { serviceCode: "registration", label: "Starter", segment: "NGOs & Non-Profits" },
  "growth-ngos":                   { serviceCode: "compliance",   label: "Growth",  segment: "NGOs & Non-Profits" },
  "premium-ngos":                  { serviceCode: "compliance",   label: "Premium", segment: "NGOs & Non-Profits" },
};

function createIdempotencyKey() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `plan-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/* ═══════════════════════════════════════════════════════════════
 * Props
 * ═══════════════════════════════════════════════════════════════ */
interface PlanInquiryModalProps {
  /** Plan slug like "growth-local-entrepreneurs" */
  planSlug: string | null;
  /** Human-readable plan name (from static data) */
  planName?: string;
  /** Whether this is the featured/badge plan */
  featured?: boolean;
  open: boolean;
  onClose: () => void;
}

/* ═══════════════════════════════════════════════════════════════
 * Component
 * ═══════════════════════════════════════════════════════════════ */
export function PlanInquiryModal({
  planSlug,
  planName,
  featured,
  open,
  onClose,
}: PlanInquiryModalProps) {
  const nameId = useId();
  const emailId = useId();
  const phoneId = useId();

  const planInfo = planSlug ? PLAN_SERVICE_MAP[planSlug] : null;

  /* ── Form state ── */
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneValid, setPhoneValid] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submissionResult, setSubmissionResult] =
    useState<ApiPublicConsultationSubmissionResponse | null>(null);

  /* Reset form when modal opens */
  useEffect(() => {
    if (open) {
      setFullName("");
      setEmail("");
      setPhone("");
      setPhoneValid(false);
      setSubmitError(null);
      setSubmissionResult(null);
    }
  }, [open]);

  /* Lock body scroll when modal is open */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  /* Close on Escape key */
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  /* ── Submission ── */
  const submissionMutation = useMutation({ mutationFn: submitPublicConsultation });
  const isSubmitting = submissionMutation.isPending;

  const canSubmit =
    fullName.trim().length > 1 &&
    email.trim().length > 3 &&
    phoneValid &&
    !isSubmitting;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitError(null);
    try {
      const result = await submissionMutation.mutateAsync({
        full_name: fullName.trim(),
        email: email.trim(),
        phone: phone || null,  // E.164 format from PhoneInput
        company: null,
        service_type_code: planInfo?.serviceCode ?? "general_consultation",
        message: `Inquiry for ${planInfo?.label ?? planName ?? "service"} plan (${planInfo?.segment ?? "general"}). Please contact me to discuss further.`,
        idempotency_key: createIdempotencyKey(),
        source_channel: `pricing_page_${planSlug ?? "unknown"}`,
      });
      setSubmissionResult(result);
    } catch {
      setSubmitError("We couldn't send your request. Please try again.");
    }
  };

  /* ── Input styles ── */
  const inputCls =
    "w-full px-3.5 py-3 sm:px-4 sm:py-3 rounded-xl border border-border-soft bg-page-strong/40 text-text placeholder:text-text-soft focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40 transition-colors text-sm min-h-[44px]";

  /* Don't render if not open */
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-end lg:items-center justify-center">
      {/* ── Backdrop ── */}
      <div
        className="absolute inset-0 z-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* ── Modal / Bottom sheet ── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Inquiry for ${planInfo?.label ?? planName ?? "service"} plan`}
        className={cn(
          /* Base */
          "relative z-20 w-full bg-surface border border-border-soft shadow-2xl",
          /* Mobile: bottom sheet */
          "rounded-t-2xl lg:rounded-2xl",
          /* Mobile: max height - use flex so inner content scrolls, not the dialog itself */
          "max-h-[92dvh] sm:max-h-[85dvh] lg:max-h-[80dvh] flex flex-col",
          /* Width */
          "lg:max-w-md",
          /* Animation */
          "animate-in slide-in-from-bottom duration-300 lg:slide-in-from-bottom-4",
        )}
      >
        {/* ── Drag handle (mobile only) ── */}
        <div className="flex justify-center pt-3 pb-1 lg:hidden">
          <div className="w-10 h-1 rounded-full bg-border-soft" />
        </div>

        {/* ── Close button ── */}
        <button
          type="button"
          onClick={onClose}
          className={cn(
            "absolute top-4 right-4",
            "flex items-center justify-center w-8 h-8 rounded-full",
            "text-text-soft hover:text-text hover:bg-page-strong/60",
            "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
          )}
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="px-4 pb-6 pt-3 sm:px-6 sm:pb-8 sm:pt-4 lg:px-8 lg:pb-10 overflow-y-auto overscroll-contain">
          {submissionResult ? (
            /* ─── Success state ─── */
            <div className="text-center py-6">
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent-soft text-accent mb-4">
                <Check className="w-7 h-7" strokeWidth={2.5} />
              </span>
              <h3 className="text-lg font-bold text-text mb-2">
                Your request has been received.
              </h3>
              <p className="text-text-muted text-sm mb-3">
                Your tracking code is:
              </p>
              <code className="px-3 py-1.5 rounded-lg bg-accent-soft text-accent font-mono text-lg tracking-[0.2em]">
                {submissionResult.tracking_id.length === 6
                  ? `${submissionResult.tracking_id.slice(0, 2)} ${submissionResult.tracking_id.slice(2, 4)} ${submissionResult.tracking_id.slice(4)}`
                  : submissionResult.tracking_id}
              </code>
              <p className="text-text-muted text-sm mt-4">
                We&apos;ll get back to you within 1 business day.
              </p>
              <p className="text-text-soft text-xs mt-1">
                We&apos;ve also sent this code to your WhatsApp.
              </p>
              <button
                type="button"
                onClick={onClose}
                className={cn(
                  "mt-6 inline-flex items-center justify-center",
                  "px-6 py-2.5 rounded-xl",
                  "bg-accent text-accent-contrast font-semibold text-sm",
                  "hover:bg-accent-hover transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                )}
              >
                Done
              </button>
            </div>
          ) : (
            /* ─── Form state ─── */
            <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-5">
              {/* ── Header ── */}
              <div>
                <h2 className="text-base sm:text-lg font-bold text-text pr-8">
                  Get started with {planInfo?.label ?? planName ?? "this plan"}
                </h2>
                <p className="text-xs sm:text-sm text-text-muted mt-1">
                  We&apos;ll reach out within 1 business day.
                </p>
              </div>

              {/* ── Plan badge + segment ── */}
              {planInfo && (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-accent-soft/60 border border-accent/15">
                  <span className={cn(
                    "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5",
                    "text-[11px] font-bold uppercase tracking-wider whitespace-nowrap",
                    featured
                      ? "bg-accent text-accent-contrast"
                      : "bg-accent-soft text-accent border border-accent/20",
                  )}>
                    {featured && <Star className="h-3 w-3 fill-current" aria-hidden="true" />}
                    {planInfo.label}
                  </span>
                  <span className="text-sm text-text">
                    {planInfo.segment}
                  </span>
                </div>
              )}

              {/* ── Name ── */}
              <div>
                <label htmlFor={nameId} className="block text-xs sm:text-sm font-semibold text-text mb-1.5">
                  Full name<span className="text-accent ml-0.5">*</span>
                </label>
                <input
                  id={nameId}
                  type="text"
                  autoComplete="name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  placeholder="John Smith"
                  className={inputCls}
                />
              </div>

              {/* ── Email ── */}
              <div>
                <label htmlFor={emailId} className="block text-xs sm:text-sm font-semibold text-text mb-1.5">
                  Email<span className="text-accent ml-0.5">*</span>
                </label>
                <input
                  id={emailId}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="john@company.com"
                  className={inputCls}
                />
              </div>

              {/* ── Phone (with country picker) ── */}
              <PhoneInput
                value={phone}
                onChange={(e164) => {
                  setPhone(e164);
                  // Phone is valid when it has dial code + enough local digits
                  // The PhoneInput component handles formatting; we check if it's complete
                  const digits = e164.replace(/\D/g, "");
                  setPhoneValid(digits.length >= 10);
                }}
                required
              />

              {/* ── Error ── */}
              {submitError && (
                <div className="p-3 rounded-xl bg-accent-soft border border-border-soft" role="alert">
                  <p className="text-accent-hover text-sm">{submitError}</p>
                </div>
              )}

              {/* ── Submit ── */}
              <button
                type="submit"
                disabled={!canSubmit}
                className={cn(
                  "w-full py-3 rounded-xl font-semibold text-sm transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
                  canSubmit
                    ? "bg-accent text-accent-contrast hover:bg-accent-hover shadow-md shadow-accent/20"
                    : "bg-border-soft text-text-soft cursor-not-allowed",
                )}
              >
                {isSubmitting ? "Sending..." : "Submit request"}
              </button>

              {/* ── Privacy note ── */}
              <p className="text-xs text-text-soft text-center">
                By submitting this form you agree to Exxonim&apos;s{" "}
                <SmartLink href={routes.privacy} className="text-accent hover:underline">privacy policy</SmartLink>.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
