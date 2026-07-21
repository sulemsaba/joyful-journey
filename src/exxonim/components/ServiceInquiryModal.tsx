/**
 * ServiceInquiryModal — quick inquiry that opens straight from a service card's
 * "Get Started" button. We already know which service they want (it's the card
 * they clicked), so we ask for the minimum — name + phone — and create the
 * inquiry right here instead of sending them to the full contact form.
 *
 * UX:
 *   - Desktop: centered modal with backdrop
 *   - Mobile: bottom sheet that slides up
 *   - Two fields only (name + phone); the exact service rides along in the payload
 *   - Clean confirmation state (no tracking code — a pre-case inquiry doesn't have one)
 *
 * Mirrors the look of PlanInquiryModal (pricing) but is service-scoped.
 */

import { createPortal } from "react-dom";
import { useEffect, useId, useState, type FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { X, Check } from "lucide-react";
import { submitPublicConsultation } from "@/exxonim/services/consultationService";
import { resolveServiceContext } from "@/exxonim/utils/serviceCta";
import { cn } from "@/exxonim/utils/cn";
import { PhoneInput } from "./PhoneInput";
import { SmartLink } from "./primitives/SmartLink";
import { routes } from "@/exxonim/routes";

function createIdempotencyKey() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `service-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

interface ServiceInquiryModalProps {
  /** Catalog slug, e.g. "company-registration". */
  serviceSlug: string | null;
  /** Human-readable service title, e.g. "Company Registration". */
  serviceTitle: string | null;
  /** Category label shown as an eyebrow, e.g. "Business Setup". */
  serviceCategory?: string | null;
  open: boolean;
  onClose: () => void;
}

export function ServiceInquiryModal({
  serviceSlug,
  serviceTitle,
  serviceCategory,
  open,
  onClose,
}: ServiceInquiryModalProps) {
  const nameId = useId();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneValid, setPhoneValid] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  /* Reset when (re)opened */
  useEffect(() => {
    if (open) {
      setFullName("");
      setPhone("");
      setPhoneValid(false);
      setSubmitError(null);
      setSubmitted(false);
    }
  }, [open]);

  /* Lock body scroll while open */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  /* Close on Escape */
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const submissionMutation = useMutation({ mutationFn: submitPublicConsultation });
  const isSubmitting = submissionMutation.isPending;

  const label = serviceTitle || "this service";
  const canSubmit = fullName.trim().length > 1 && phoneValid && !isSubmitting;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitError(null);
    // Keep the coarse support-area code available for the admin's mapping,
    // but the exact service title is what lands on the inquiry.
    const ctx = resolveServiceContext(serviceSlug);
    try {
      await submissionMutation.mutateAsync({
        full_name: fullName.trim(),
        email: null,
        phone: phone || null, // E.164 from PhoneInput
        company: null,
        // Free-text column on the backend; the exact service title shows in the
        // admin inbox instead of a coarse 5-bucket label.
        service_type_code: serviceTitle || ctx?.supportArea || "general_consultation",
        message: `Quick inquiry from the services page — interested in ${label}.`,
        idempotency_key: createIdempotencyKey(),
        source_channel: `service_card_${serviceSlug ?? "unknown"}`,
      });
      setSubmitted(true);
      toast.success(`Request received — we'll reach out about ${label}.`);
    } catch {
      setSubmitError("We couldn't send your request. Please try again, or use the contact page.");
      toast.error("We couldn't send your request. Please try again, or use the contact page.");
    }
  };

  const inputCls =
    "w-full px-3.5 py-3 sm:px-4 sm:py-3 rounded-xl border border-border-soft bg-page-strong/40 text-text placeholder:text-text-soft focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40 transition-colors text-base sm:text-sm min-h-[44px]";

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-end lg:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 z-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal / bottom sheet */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Get started with ${label}`}
        className={cn(
          "relative z-20 w-full bg-surface border border-border-soft shadow-2xl",
          "rounded-t-2xl lg:rounded-2xl",
          "max-h-[92dvh] sm:max-h-[85dvh] lg:max-h-[80dvh] flex flex-col",
          "lg:max-w-md",
          "animate-in slide-in-from-bottom duration-300 lg:slide-in-from-bottom-4",
        )}
      >
        {/* Drag handle (mobile) */}
        <div className="flex justify-center pt-3 pb-1 lg:hidden">
          <div className="w-10 h-1 rounded-full bg-border-soft" />
        </div>

        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className={cn(
            "absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full",
            "text-text-soft hover:text-text hover:bg-page-strong/60 transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
          )}
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="px-4 pb-6 pt-3 sm:px-6 sm:pb-8 sm:pt-4 lg:px-8 lg:pb-10 overflow-y-auto overscroll-contain">
          {submitted ? (
            /* Confirmation — no tracking code (a pre-case inquiry has none) */
            <div className="text-center py-6">
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent-soft text-accent mb-4">
                <Check className="w-7 h-7" strokeWidth={2.5} />
              </span>
              <h3 className="text-lg font-bold text-text mb-2">Request received.</h3>
              <p className="text-text-muted text-sm">
                Thanks{fullName.trim() ? `, ${fullName.trim().split(" ")[0]}` : ""} — our team
                will reach out about <span className="font-semibold text-text">{label}</span>,
                usually within 1 business day.
              </p>
              <button
                type="button"
                onClick={onClose}
                className={cn(
                  "mt-6 inline-flex items-center justify-center px-6 py-2.5 rounded-xl",
                  "bg-accent text-accent-contrast font-semibold text-sm",
                  "hover:bg-accent-hover transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                )}
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4 lg:space-y-5">
              {/* Header */}
              <div>
                <h2 className="text-base sm:text-lg font-bold text-text pr-8">
                  Get started with {label}
                </h2>
                <p className="text-xs sm:text-sm text-text-muted mt-1">
                  Leave your name and number — we&apos;ll reach out within 1 business day.
                </p>
              </div>

              {/* Service badge */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-accent-soft/60 border border-accent/15">
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 bg-accent text-accent-contrast text-2xs font-bold uppercase tracking-wider whitespace-nowrap">
                  Selected
                </span>
                <span className="text-sm text-text font-medium min-w-0 truncate">
                  {serviceCategory ? `${serviceCategory} · ` : ""}{label}
                </span>
              </div>

              {/* Name */}
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

              {/* Phone */}
              <PhoneInput
                value={phone}
                onChange={(e164) => {
                  setPhone(e164);
                  const digits = e164.replace(/\D/g, "");
                  setPhoneValid(digits.length >= 10);
                }}
                required
              />

              {submitError && (
                <div className="p-3 rounded-xl bg-accent-soft border border-border-soft" role="alert">
                  <p className="text-accent-hover text-sm">{submitError}</p>
                </div>
              )}

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
                {isSubmitting ? "Sending..." : "Send request"}
              </button>

              <p className="text-xs text-text-soft text-center">
                Prefer a full form?{" "}
                <SmartLink href={`/contact?service=${serviceSlug ?? ""}`} className="text-accent hover:underline">
                  Go to the contact page
                </SmartLink>
                .
              </p>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
