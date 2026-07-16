/**
 * FASTAPI BACKEND ENDPOINTS USED BY THIS PAGE:
 * ────────────────────────────────────────────
 * Page Content (via usePage hook → pageService):
 *   GET    /api/v1/pages/contact              - Get contact page content (public)
 *
 * Consultation Submission (via submitPublicConsultation → consultationService):
 *   POST   /api/v1/consultations              - Submit a new public consultation
 *   Request: { full_name: str, email: str, phone: str | None, company: str | None,
 *             service_type_code: str, message: str, idempotency_key: str,
 *             source_channel: str }
 *   Response: { tracking_id: str, status: str, message: str }
 *   (tracking_id is a 6-char code: 5 digits + 1 uppercase letter, e.g. "11111A")
 *
 * Shell Data (via usePublicShell hook → siteSettingsService):
 *   GET    /api/v1/site-settings/brand        - Brand assets
 *   GET    /api/v1/site-settings/footer        - Footer content
 *   GET    /api/v1/site-settings/company_info  - Company info (emails, phones, whatsapp, address)
 *
 * SEO (via useResolvedPageSeo hook → siteSettingsService):
 *   GET    /api/v1/site-settings/seo_defaults  - SEO default settings
 *
 * PostgreSQL Tables:
 *   pages - id, slug, content (JSONB)
 *   cases - id, tracking_code, customer_id, service_type_id, status
 *   case_milestones - id, case_id, milestone_id, status, visible_to_client
 *   site_settings - id, key, value (JSONB)
 *
 * See service files for full endpoint documentation:
 *   src/exxonim/services/pageService.ts
 *   src/exxonim/services/consultationService.ts
 *   src/exxonim/services/siteSettingsService.ts
 */

import { useMutation } from "@tanstack/react-query";
import { Home } from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";
import { cn } from "@/exxonim/utils/cn";
import { Breadcrumb } from "@/exxonim/components/Breadcrumb";
import { Button } from "@/exxonim/components/primitives/Button";
import { PhoneInput } from "@/exxonim/components/PhoneInput";
import { usePage } from "@/exxonim/hooks/usePage";
import { usePublicShell } from "@/exxonim/hooks/usePublicShell";
import { useResolvedPageSeo } from "@/exxonim/hooks/useResolvedSeo";
import { routes } from "@/exxonim/routes";
import { SmartLink } from "@/exxonim/components/primitives/SmartLink";
import { submitPublicConsultation } from "@/exxonim/services/consultationService";
import { resolveServiceContext } from "@/exxonim/utils/serviceCta";
import type {
  ApiPublicConsultationSubmissionResponse,
} from "@/exxonim/types/api";
import type { ContactPageContent } from "@/exxonim/types";
import { StructuredData } from "@/exxonim/components/StructuredData";

/* ────────────────────────────────────────────
   Form helpers
   ──────────────────────────────────────────── */

const SERVICE_OPTIONS = [
  { label: "General consultation", value: "general_consultation" },
  { label: "Registration support", value: "registration" },
  { label: "Licensing support", value: "licensing" },
  { label: "Tax returns", value: "tax_returns" },
  { label: "Compliance support", value: "compliance" },
] as const;

/* ── Plan param → service type mapping ──
 * When user clicks CTA on pricing cards, URL becomes:
 *   /contact/?plan=growth-local-entrepreneurs
 * This maps the plan slug to a service type + human-readable name.
 * ─────────────────────────────────────── */
const PLAN_SERVICE_MAP: Record<string, { serviceCode: string; label: string; segment: string }> = {
  "starter-local-entrepreneurs":   { serviceCode: "registration", label: "Starter", segment: "Local Entrepreneurs" },
  "growth-local-entrepreneurs":    { serviceCode: "compliance",    label: "Growth", segment: "Local Entrepreneurs" },
  "premium-local-entrepreneurs":   { serviceCode: "compliance",   label: "Premium", segment: "Local Entrepreneurs" },
  "starter-foreign-investors":     { serviceCode: "registration",  label: "Starter", segment: "Foreign Investors" },
  "growth-foreign-investors":      { serviceCode: "registration",  label: "Growth", segment: "Foreign Investors" },
  "premium-foreign-investors":     { serviceCode: "compliance",   label: "Premium", segment: "Foreign Investors" },
  "starter-enterprises":           { serviceCode: "registration",  label: "Starter", segment: "Enterprises" },
  "growth-enterprises":            { serviceCode: "compliance",    label: "Growth", segment: "Enterprises" },
  "premium-enterprises":           { serviceCode: "compliance",   label: "Premium", segment: "Enterprises" },
  "starter-ngos":                  { serviceCode: "registration",  label: "Starter", segment: "NGOs & Non-Profits" },
  "growth-ngos":                   { serviceCode: "compliance",    label: "Growth", segment: "NGOs & Non-Profits" },
  "premium-ngos":                  { serviceCode: "compliance",   label: "Premium", segment: "NGOs & Non-Profits" },
};

function createSubmissionKey() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `public-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function createInitialFormState() {
  return {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    serviceTypeCode: "general_consultation",
    message: "",
    idempotencyKey: createSubmissionKey(),
  };
}

/* ────────────────────────────────────────────
   Live Business Hours - shows Open / Closed
   based on the visitor's current time (EAT).
   ──────────────────────────────────────────── */

interface BusinessHoursStatus {
  isOpen: boolean;
  label: string;
  detail: string;
}

function getBusinessHoursStatus(): BusinessHoursStatus {
  if (typeof Intl === "undefined" || typeof Intl.DateTimeFormat === "undefined") {
    return { isOpen: false, label: "Business Hours", detail: "Mon–Fri 8AM–4:30PM (EAT)" };
  }

  const now = new Date();
  const eatHour = (now.getUTCHours() + 3) % 24;
  const eatMinute = now.getUTCMinutes();
  const day = now.getUTCDay(); // 0=Sun, 6=Sat

  const currentMinutes = eatHour * 60 + eatMinute;

  let isOpen: boolean;
  let detail: string;

  if (day === 0 || day === 6) {
    isOpen = false;
    detail = day === 6
      ? "Closed today · Opens Mon 8AM"
      : "Closed today · Opens Mon 8AM";
  } else {
    isOpen = currentMinutes >= 480 && currentMinutes < 990;
    detail = isOpen
      ? "Open now · Closes at 4:30PM"
      : currentMinutes < 480
        ? "Closed · Opens at 8AM"
        : "Closed for today · Opens tomorrow 8AM";
  }

  return {
    isOpen,
    label: isOpen ? "Open" : "Closed",
    detail,
  };
}

/* ────────────────────────────────────────────
   Main ContactPage
   ──────────────────────────────────────────── */

export function ContactPage() {
  const { data: page } = usePage<ContactPageContent>("contact");
  const shell = usePublicShell();
  useResolvedPageSeo(page, routes.contact);

  const planParam = useMemo(() => {
    if (typeof window === "undefined") return null;
    return new URLSearchParams(window.location.search).get("plan");
  }, []);
  const planInfo = planParam ? PLAN_SERVICE_MAP[planParam] : null;

  /* ── Service param → pre-fill ──
   * A "Get Started" click on a service card / detail page lands here as
   *   /contact?service=company-registration
   * We already know what they want, so pre-select the support area and seed
   * the message. A plan CTA (from pricing) takes precedence if both are set. */
  const serviceParam = useMemo(() => {
    if (typeof window === "undefined") return null;
    return new URLSearchParams(window.location.search).get("service");
  }, []);
  const serviceInfo = !planInfo ? resolveServiceContext(serviceParam) : null;

  const [formValues, setFormValues] = useState(() => {
    const initial = createInitialFormState();
    if (planInfo) {
      initial.serviceTypeCode = planInfo.serviceCode;
    } else if (serviceInfo) {
      initial.serviceTypeCode = serviceInfo.supportArea;
      initial.message = `Hi, I'd like to get started with ${serviceInfo.label}. `;
    }
    return initial;
  });
  const [phoneValid, setPhoneValid] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submissionResult, setSubmissionResult] =
    useState<ApiPublicConsultationSubmissionResponse | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const submissionMutation = useMutation({
    mutationFn: submitPublicConsultation,
  });

  const isSubmitting = submissionMutation.isPending;

  const canSubmit =
    formValues.firstName.trim().length > 0 &&
    formValues.lastName.trim().length > 0 &&
    formValues.email.trim().length > 3 &&
    phoneValid &&
    formValues.message.trim().length > 12 &&
    !isSubmitting;

  const handleFieldChange = (
    field: "firstName" | "lastName" | "email" | "phone" | "company" | "serviceTypeCode" | "message",
    value: string
  ) => {
    setFormValues((current) => ({ ...current, [field]: value }));
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const validateField = (field: string, value: string): string | undefined => {
    switch (field) {
      case 'firstName':
        return value.trim().length < 1 ? 'Please enter your first name.' : undefined;
      case 'lastName':
        return value.trim().length < 1 ? 'Please enter your last name.' : undefined;
      case 'email':
        if (!value.trim()) return 'Email is required.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'Please enter a valid email address.';
        return undefined;
      case 'phone':
        const digits = value.replace(/\D/g, '');
        return digits.length < 10 ? 'Please enter a valid phone number (at least 10 digits).' : undefined;
      case 'message':
        return value.trim().length <= 12 ? 'Please tell us more about your situation (at least 13 characters).' : undefined;
      default:
        return undefined;
    }
  };

  const handleBlur = (field: string, value: string) => {
    const error = validateField(field, value);
    setFieldErrors((prev) => ({
      ...prev,
      ...(error ? { [field]: error } : {}),
    }));
  };

  const validateAll = (): boolean => {
    const errors: Record<string, string> = {};
    const fields = [
      { key: 'firstName', value: formValues.firstName },
      { key: 'lastName', value: formValues.lastName },
      { key: 'email', value: formValues.email },
      { key: 'phone', value: formValues.phone },
      { key: 'message', value: formValues.message },
    ];
    for (const field of fields) {
      const error = validateField(field.key, field.value);
      if (error) errors[field.key] = error;
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateAll()) return;
    setSubmitError(null);
    try {
      const result = await submissionMutation.mutateAsync({
        full_name: `${formValues.firstName.trim()} ${formValues.lastName.trim()}`.trim(),
        email: formValues.email.trim(),
        phone: formValues.phone || null,  // E.164 format from PhoneInput
        company: formValues.company.trim() || null,
        service_type_code: formValues.serviceTypeCode,
        message: formValues.message.trim(),
        idempotency_key: formValues.idempotencyKey,
        source_channel: planInfo || serviceInfo ? "public_consultation_form" : "public_contact_form",
      });
      setSubmissionResult(result);
      setFormValues(createInitialFormState());
    } catch {
      setSubmitError(
        "We couldn't send your request. Please try again or use one of the direct contact paths."
      );
    }
  };

  const { emails, phones, whatsapp, address } = shell.company;
  const hours = getBusinessHoursStatus();

  /* Shared input styling - using design tokens */
  /* text-base (16px) on phones prevents iOS Safari from auto-zooming on focus;
     drops to text-sm (14px) from sm up. */
  const inputCls =
    "w-full px-3.5 py-3 sm:px-4 sm:py-3 rounded-xl border border-border-soft bg-page-strong/40 text-text placeholder:text-text-soft focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40 transition-colors text-base sm:text-sm min-h-[44px]";

  /* Select-specific: hide native arrow, add custom chevron, style dropdown */
  const selectCls =
    `${inputCls} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%230f5c63%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:16px] bg-[right_12px_center] bg-no-repeat pr-10 cursor-pointer`;

  return (
    <section className="bg-page">
          <StructuredData heroTitle="Contact Exxonim Consult" heroDescription="Reach Exxonim for registration, compliance, and advisory support." breadcrumbs={[{ name: 'Contact', path: routes.contact }]} />
          {/* Breadcrumb */}
          <div className="max-w-[1240px] px-4 sm:px-6 lg:px-8 mx-auto pt-4">
            <Breadcrumb items={[{ label: "Home", href: routes.home, icon: Home }, { label: "Contact" }]} />
          </div>

          {/* ═══════════════════════════════════════════════════════
           * Two-column layout: Left = Contact info, Right = Form card
           * ────────────────────────────────────────────────────────
           * Left side sits on page bg - no card/container.
           * Right side = form in a card (bg-surface + border + shadow).
           * ═══════════════════════════════════════════════════════ */}
          <div className="max-w-[1240px] px-4 sm:px-6 lg:px-8 mx-auto pt-2 pb-8 sm:pt-4 sm:pb-12 lg:pt-6 lg:pb-14">
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-16 items-start min-w-0">

              {/* ── Left column: Contact info on page bg ── */}
              <div className="flex flex-col gap-4 sm:gap-5 lg:gap-8 min-w-0">
                {/* Page header */}
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-bold tracking-tight text-text leading-tight">
                    Get in Touch
                  </h1>
                  <p className="mt-2 sm:mt-3 text-text-muted text-[0.875rem] sm:text-[0.9375rem] leading-relaxed max-w-xl">
                    Every situation is a little different. If you&apos;re unsure which service fits you, or you just want a clear explanation before you commit, we&apos;re here to help.
                  </p>
                </div>

                {/* Contact info items - with icons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 sm:gap-x-6 sm:gap-y-4 lg:gap-x-8 lg:gap-y-5 text-sm">
                  {/* Email */}
                  <div className="flex items-start gap-2.5">
                    <svg className="w-4.5 h-4.5 text-accent shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    <div>
                      <span className="font-semibold text-text text-xs uppercase tracking-wider">Email</span>
                      <div className="mt-0.5 grid gap-0.5">
                        {emails.map((email) => (
                          <a key={email} href={`mailto:${email}`} className="text-text-muted hover:text-accent transition-colors truncate">
                            {email}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-2.5">
                    <svg className="w-4.5 h-4.5 text-accent shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <div>
                      <span className="font-semibold text-text text-xs uppercase tracking-wider">Phone</span>
                      <div className="mt-0.5 grid gap-0.5">
                        {phones.map((phone) => (
                          <a key={phone} href={`tel:${phone.replace(/\s+/g, "")}`} className="text-text-muted hover:text-accent transition-colors">
                            {phone}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Office */}
                  <div className="flex items-start gap-2.5">
                    <svg className="w-4.5 h-4.5 text-accent shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <div>
                      <span className="font-semibold text-text text-xs uppercase tracking-wider">Office</span>
                      <p className="mt-0.5 text-text-muted leading-relaxed">
                        {address || "Dar es Salaam, Tanzania"}
                      </p>
                    </div>
                  </div>

                  {/* Hours - live open/closed */}
                  <div className="flex items-start gap-2.5">
                    <svg className="w-4.5 h-4.5 text-accent shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-text text-xs uppercase tracking-wider">Hours</span>
                        <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-1.5 py-0.5 rounded-full ${
                          hours.isOpen
                            ? "bg-success-soft text-success"
                            : "bg-error-soft text-error"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${hours.isOpen ? "bg-success" : "bg-error"}`} />
                          {hours.label}
                        </span>
                      </div>
                      <p className="mt-0.5 text-text-muted leading-relaxed">
                        {hours.detail}
                      </p>
                      <p className="text-text-soft text-xs mt-0.5">
                        Mon–Fri: 8AM–4:30PM (EAT)
                      </p>
                    </div>
                  </div>
                </div>

                {/* WhatsApp link - original inline style */}
                {whatsapp && (
                  <a
                    href={whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-hover font-medium transition-colors"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                    </svg>
                    Chat on WhatsApp
                  </a>
                )}
              </div>

              {/* ── Right column: Form card ── */}
              <div
                className="bg-surface border border-border-soft rounded-2xl px-3 py-4 sm:px-6 sm:p-6 lg:px-8 lg:py-10 min-w-0"
                id="contact-form"
              >
                {submissionResult ? (
                  /* Success state */
                  <div className="text-center py-8">
                    <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent-soft text-accent mb-4">
                      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                    </span>
                    <h3 className="text-lg font-bold text-text mb-2">Your request has been received.</h3>
                    {/* Only show a tracking code when the backend actually returns one.
                        Today the submit endpoint responds without a tracking_id, so
                        reading `.length` here used to crash the success screen. */}
                    {submissionResult.tracking_id ? (
                      <>
                        <p className="text-text-muted text-sm mb-1">
                          Your tracking code is:
                        </p>
                        <code className="px-3 py-1.5 rounded-lg bg-accent-soft text-accent font-mono text-lg tracking-[0.2em]">
                          {submissionResult.tracking_id.length === 6
                            ? `${submissionResult.tracking_id.slice(0, 2)} ${submissionResult.tracking_id.slice(2, 4)} ${submissionResult.tracking_id.slice(4)}`
                            : submissionResult.tracking_id}
                        </code>
                        <p className="text-text-muted text-sm mt-3">
                          Use this code to check your status at any time on our{" "}
                          <SmartLink href={routes.trackConsultation} className="text-accent hover:underline font-medium">
                            tracking page
                          </SmartLink>. No login required.
                        </p>
                      </>
                    ) : (
                      <p className="text-text-muted text-sm mt-1">
                        Thanks — our team will get back to you within 1 business day
                        using the details you provided.
                      </p>
                    )}
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-5">
                    <h2 className="text-lg sm:text-xl font-bold text-text mb-0.5">Send us a message</h2>
                    <p className="text-text-muted text-sm mb-2">Fill out the form below and we&apos;ll get back to you.</p>

                    {/* ── Selected Plan banner (from pricing page CTA) ── */}
                    {planInfo && (
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-accent-soft border border-accent/20 mb-1">
                        <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 bg-accent text-accent-contrast text-[11px] font-bold uppercase tracking-wider">
                          {planInfo.label}
                        </span>
                        <span className="text-sm text-text">
                          {planInfo.segment}
                        </span>
                      </div>
                    )}

                    {/* ── Selected Service banner (from a service card / detail CTA) ── */}
                    {!planInfo && serviceInfo && (
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-accent-soft border border-accent/20 mb-1">
                        <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 bg-accent text-accent-contrast text-[11px] font-bold uppercase tracking-wider">
                          Selected
                        </span>
                        <span className="text-sm text-text font-medium">
                          {serviceInfo.label}
                        </span>
                      </div>
                    )}

                    {/* First name + Last name — stack on phones, side-by-side from sm up */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
                      <div>
                        <label htmlFor="contact-first-name" className="block text-xs sm:text-sm font-semibold text-text mb-1.5">
                          First name<span className="text-accent ml-0.5">*</span>
                        </label>
                      <input
                        id="contact-first-name"
                        autoComplete="given-name"
                        value={formValues.firstName}
                        onChange={(e) => handleFieldChange("firstName", e.target.value)}
                        onBlur={(e) => handleBlur("firstName", e.target.value)}
                        required
                        placeholder="John"
                        className={cn(inputCls, fieldErrors.firstName ? "border-error focus:border-error focus:ring-error/30" : "")}
                        aria-invalid={!!fieldErrors.firstName}
                        aria-describedby={fieldErrors.firstName ? "first-name-error" : undefined}
                      />
                      {fieldErrors.firstName && <p id="first-name-error" className="text-error text-xs mt-1">{fieldErrors.firstName}</p>}
                      </div>
                      <div>
                        <label htmlFor="contact-last-name" className="block text-xs sm:text-sm font-semibold text-text mb-1.5">
                          Last name<span className="text-accent ml-0.5">*</span>
                        </label>
                        <input
                          id="contact-last-name"
                          autoComplete="family-name"
                          value={formValues.lastName}
                          onChange={(e) => handleFieldChange("lastName", e.target.value)}
                          onBlur={(e) => handleBlur("lastName", e.target.value)}
                          required
                          placeholder="Smith"
                          className={cn(inputCls, fieldErrors.lastName ? "border-error focus:border-error focus:ring-error/30" : "")}
                          aria-invalid={!!fieldErrors.lastName}
                          aria-describedby={fieldErrors.lastName ? "last-name-error" : undefined}
                        />
                        {fieldErrors.lastName && <p id="last-name-error" className="text-error text-xs mt-1">{fieldErrors.lastName}</p>}
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="contact-email" className="block text-xs sm:text-sm font-semibold text-text mb-1.5">
                        Email<span className="text-accent ml-0.5">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        value={formValues.email}
                        onChange={(e) => handleFieldChange("email", e.target.value)}
                        onBlur={(e) => handleBlur("email", e.target.value)}
                        required
                        placeholder="e.g john@company.com"
                        className={cn(inputCls, fieldErrors.email ? "border-error focus:border-error focus:ring-error/30" : "")}
                        aria-invalid={!!fieldErrors.email}
                        aria-describedby={fieldErrors.email ? "email-error" : undefined}
                      />
                      {fieldErrors.email && <p id="email-error" className="text-error text-xs mt-1">{fieldErrors.email}</p>}
                    </div>

                    {/* Company */}
                    <div>
                      <label htmlFor="contact-company" className="block text-xs sm:text-sm font-semibold text-text mb-1.5">
                        Company name
                      </label>
                      <input
                        id="contact-company"
                        autoComplete="organization"
                        value={formValues.company}
                        onChange={(e) => handleFieldChange("company", e.target.value)}
                        placeholder="e.g Acme Tanzania Ltd"
                        className={inputCls}
                      />
                    </div>

                    {/* Phone (with country picker) */}
                    <PhoneInput
                      value={formValues.phone}
                      onChange={(e164) => {
                        handleFieldChange("phone", e164);
                        const digits = e164.replace(/\D/g, "");
                        setPhoneValid(digits.length >= 10);
                      }}
                      required
                    />
                    {fieldErrors.phone && <p className="text-error text-xs mt-1">{fieldErrors.phone}</p>}

                    {/* Service type */}
                    <div>
                      <label htmlFor="contact-service-type" className="block text-xs sm:text-sm font-semibold text-text mb-1.5">
                        Primary support area
                      </label>
                      <div className="relative">
                        <select
                          id="contact-service-type"
                          value={formValues.serviceTypeCode}
                          onChange={(e) => handleFieldChange("serviceTypeCode", e.target.value)}
                          className={selectCls}
                        >
                          {SERVICE_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value} className="bg-surface text-text py-2">
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="contact-message" className="block text-xs sm:text-sm font-semibold text-text mb-1.5">
                        Message<span className="text-accent ml-0.5">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        value={formValues.message}
                        onChange={(e) => handleFieldChange("message", e.target.value)}
                        onBlur={(e) => handleBlur("message", e.target.value)}
                        required
                        rows={3}
                        placeholder="Tell us about your situation..."
                        className={cn(`${inputCls} resize-y`, fieldErrors.message ? "border-error focus:border-error focus:ring-error/30" : "")}
                        aria-invalid={!!fieldErrors.message}
                        aria-describedby={fieldErrors.message ? "message-error" : undefined}
                      />
                      {fieldErrors.message && <p id="message-error" className="text-error text-xs mt-1">{fieldErrors.message}</p>}
                    </div>

                    {submitError && (
                      <div className="p-3 rounded-xl bg-accent-soft border border-border-soft" role="alert">
                        <p className="text-accent-hover text-sm">{submitError}</p>
                      </div>
                    )}

                    {/* Submit button */}
                    <Button
                      size="standard"
                      variant="primary"
                      type="submit"
                      className="rounded-xl w-full"
                      disabled={isSubmitting}
                      isLoading={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Submit request"}
                    </Button>

                    {/* Disclaimer */}
                    <p className="text-xs text-text-soft text-center">
                      By submitting this form you agree to Exxonim&rsquo;s{" "}
                      <SmartLink href={routes.privacy} className="text-accent hover:underline">privacy policy</SmartLink>.
                    </p>
                  </form>
                )}
              </div>

            </div>
          </div>

          {/* GOOGLE MAPS IFRAME - Full width */}
          <div className="w-full">
            <iframe
              title="Exxonim Consult Office Location"
              src="https://maps.google.com/maps?q=76W5%2BQV+Dar+es+Salaam&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[220px] sm:h-[280px] md:h-[340px] lg:h-[400px]"
            />
          </div>
        </section>
  );
}
