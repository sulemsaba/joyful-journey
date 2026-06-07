/**
 * Career Page — Exxonim Consult
 *
 * ══════════════════════════════════════════════════════════════
 * BACKEND / ADMIN INTEGRATION NOTES
 * ══════════════════════════════════════════════════════════════
 *
 * 1. BANNER IMAGE
 *    - Hero banner comes from `content.hero.banner_image`.
 *    - Admin uploads a 1344×768px WebP via CMS. Fallback: /careers/banner-enhanced.png.
 *    - Dark overlay gradient applied via CSS for text readability.
 *
 * 2. JOB DATA (ApiCareerJob)
 *    - Fetched from `/api/public/jobs` via jobsService.
 *    - Required: title, department, employment_type, location_mode,
 *      city, country, summary, requirements[], responsibilities[].
 *    - Optional: compensation_label, experience_label, published_at, description.
 *    - Jobs are NEVER auto-filtered out — they stay visible even if only 1 exists.
 *    - When admin deletes a job (unpublishes), it disappears from the API response.
 *    - Compensation/salary is NOT displayed on the public career page.
 *
 * 3. DEPARTMENT PILLS
 *    - `department` = primary pill (e.g., "Accounting", "IT", "Compliance").
 *    - `employment_type` = secondary pill (e.g., "Full-time", "Part-time").
 *    - `experience_label` = tertiary pill if present.
 *
 * 4. SEARCH + FILTERS
 *    - Keyword search: filters by title, department, employment_type, summary.
 *    - Department dropdown: filters by department value from job data.
 *    - All jobs visible by default — filters only narrow the list.
 *    - "Clear" button resets all filters.
 *
 * 5. JOB CARDS — Single card container
 *    - All jobs are inside ONE large card with consistent rounded corners.
 *    - Each job is a row within the card, separated by dividers.
 *    - Three expand states: collapsed → preview → full details.
 *    - Collapsed: title, pills, location, posted date, "Apply Now".
 *    - Preview: adds summary, "Apply Now" + "Read More".
 *    - Full details: description, meta, responsibilities, requirements, actions.
 *    - NO salary/compensation displayed.
 *    - NO "72h+ posted" indicators — posted date only.
 *
 * 6. APPLY NOW MODAL (NOT the contact page)
 *    - "Apply Now" opens an application modal.
 *    - Close ONLY via X button (no backdrop click close).
 *    - Form fields: Full name*, Email*, Phone, Cover note (optional textarea or file upload).
 *    - File uploads: CV/Resume*, Academic certificates (optional).
 *    - On submit: POST /api/public/jobs/{id}/apply
 *    - z-index above footer to prevent overlap.
 *
 * 7. EMPTY STATE
 *    - When no jobs at all: "No positions available" with CTA to contact.
 *    - When filters match nothing: "No positions found" with "View All" button.
 *
 * 8. SHARE FUNCTIONALITY
 *    - Social share buttons on the hero banner (X, LinkedIn, WhatsApp, Copy Link).
 *    - Per-job share button in full details mode.
 *
 * 9. PAGINATION
 *    - Configurable page size (10, 25, 50).
 *    - Page numbers + prev/next navigation.
 *
 * 10. MOBILE-FIRST DESIGN
 *    - Designed for mobile first, then enhanced for desktop.
 *    - Most visitors use mobile devices.
 */

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Home } from "lucide-react";
import { Breadcrumb } from "@/exxonim/components/Breadcrumb";
import { LoadBoundary } from "@/exxonim/components/LoadBoundary";
import { NewsletterSection } from "@/exxonim/components/NewsletterSection";
import { routes } from "@/exxonim/routes";
import { usePage } from "@/exxonim/hooks/usePage";
import { useResolvedPageSeo } from "@/exxonim/hooks/useResolvedSeo";
import {
  getCachedPublishedJobs,
  getPublishedJobs,
} from "@/exxonim/services/jobsService";
import type { ApiCareerJob, CareerPageContent } from "@/exxonim/types";
import { StructuredData } from "@/exxonim/components/StructuredData";
import { Button } from "@/exxonim/components/primitives/Button";

/* ── Constants ── */
const FALLBACK_BANNER = "/careers/banner-enhanced.png";
const PAGE_SIZE_OPTIONS = [10, 25, 50] as const;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ".pdf,.doc,.docx";

/* ── Helpers ── */
function uniqueSorted(values: string[]) {
  return Array.from(new Set(values.filter(Boolean))).sort((a, b) =>
    a.localeCompare(b)
  );
}

function formatJobLocation(city: string, country: string, mode: string) {
  const label = [city, country].filter(Boolean).join(", ");
  return label || mode.replace(/-/g, " ");
}

function formatJobDate(date: string) {
  if (!date) return "";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}

/* ══════════════════════════════════════════════════════════════
   SOCIAL SHARE BUTTONS (Hero — dark bg)
   ══════════════════════════════════════════════════════════════ */
function SocialShareButtons() {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* fallback */
    }
  }, []);

  return (
    <div className="flex gap-2">
      <Button
        size="icon"
        variant="ghost"
        aria-label="Share on X"
        className="border border-accent-contrast/20 text-accent-contrast/60 hover:bg-accent-contrast/10 hover:text-accent-contrast"
        onClick={() => {
          const url = encodeURIComponent(window.location.href);
          const text = encodeURIComponent(document.title);
          window.open(
            `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
            "_blank"
          );
        }}
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </Button>
      <Button
        size="icon"
        variant="ghost"
        aria-label="Share on LinkedIn"
        className="border border-accent-contrast/20 text-accent-contrast/60 hover:bg-accent-contrast/10 hover:text-accent-contrast"
        onClick={() => {
          const url = encodeURIComponent(window.location.href);
          window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
            "_blank"
          );
        }}
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </Button>
      <Button
        size="icon"
        variant="ghost"
        aria-label="Share on WhatsApp"
        className="border border-accent-contrast/20 text-accent-contrast/60 hover:bg-accent-contrast/10 hover:text-accent-contrast"
        onClick={() => {
          const url = encodeURIComponent(window.location.href);
          const text = encodeURIComponent(document.title);
          window.open(`https://wa.me/?text=${text}%20${url}`, "_blank");
        }}
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.01 2.014a9.96 9.96 0 0 0-8.52 15.11L2 22l4.985-1.465a9.961 9.961 0 1 0 5.025-18.52Zm0 18.067a8.093 8.093 0 0 1-4.14-1.134l-.297-.176-3.082.906.924-2.977-.193-.306A8.098 8.098 0 1 1 12.01 20.08Zm4.437-6.042c-.244-.122-1.439-.711-1.662-.793-.223-.081-.385-.122-.547.122-.162.244-.628.793-.77.955-.142.162-.284.183-.528.061-1.18-.56-2.072-1.1-2.884-2.522-.083-.146-.01-.223.111-.345.11-.11.244-.284.366-.427.122-.142.162-.244.244-.407.081-.162.041-.305-.02-.427-.061-.122-.547-1.32-.75-1.808-.198-.475-.399-.411-.547-.419-.142-.008-.305-.008-.468-.008-.162 0-.427.061-.65.305-.223.244-.852.833-.852 2.032s.873 2.358.995 2.522c.122.162 1.714 2.628 4.153 3.67.58.24 1.033.383 1.385.49.582.185 1.112.158 1.531.096.47-.07 1.439-.588 1.642-1.157.203-.569.203-1.056.142-1.157-.061-.101-.223-.162-.468-.284Z" />
        </svg>
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={handleCopyLink}
        aria-label="Copy link"
        className="border border-accent-contrast/20 text-accent-contrast/60 hover:bg-accent-contrast/10 hover:text-accent-contrast"
      >
        {copied ? (
          <svg className="w-3.5 h-3.5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
        ) : (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
          </svg>
        )}
      </Button>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   CTA BANNER
   ══════════════════════════════════════════════════════════════ */
function CareerCTABanner({
  primary,
  secondary,
}: {
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
}) {
  return (
    <div className="mx-auto max-w-[1200px] px-4 sm:px-6 pb-12">
      <div className="relative rounded-2xl overflow-hidden flex items-center px-6 sm:px-8 py-6 sm:py-8">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/[0.10] via-accent/[0.05] to-transparent" />
        <div className="absolute inset-0 bg-surface-elevated" style={{ zIndex: -1 }} />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full">
          <div className="flex-1 min-w-0">
            <h2 className="text-base sm:text-lg font-bold text-text mb-1">
              Don&rsquo;t see the right role?
            </h2>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
              We keep an open pipeline for talented people who share our standards.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5 shrink-0">
            <Button
              size="standard"
              variant="primary"
              href={primary.href}
            >
              {primary.label}
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Button>
            <Button
              size="standard"
              variant="outline"
              href={secondary.href}
            >
              {secondary.label}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   APPLY NOW MODAL
   ══════════════════════════════════════════════════════════════ */
interface ApplyModalProps {
  job: ApiCareerJob;
  onClose: () => void;
}

function ApplyModal({ job, onClose }: ApplyModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [coverNote, setCoverNote] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [academicsFile, setAcademicsFile] = useState<File | null>(null);
  const [coverNoteFile, setCoverNoteFile] = useState<File | null>(null);
  const [cvError, setCvError] = useState("");
  const [academicsError, setAcademicsError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const cvInputRef = useRef<HTMLInputElement>(null);
  const academicsInputRef = useRef<HTMLInputElement>(null);
  const coverNoteInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  /* Lock body scroll when modal is open */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  const validateFile = useCallback((f: File): string | null => {
    if (f.size > MAX_FILE_SIZE) return "File must be under 5MB.";
    const ext = f.name.split(".").pop()?.toLowerCase();
    if (!ext || !["pdf", "doc", "docx"].includes(ext))
      return "Only PDF, DOC, or DOCX files are accepted.";
    return null;
  }, []);

  const handleCvChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCvError("");
    const f = e.target.files?.[0];
    if (!f) { setCvFile(null); return; }
    const err = validateFile(f);
    if (err) { setCvError(err); setCvFile(null); return; }
    setCvFile(f);
  }, [validateFile]);

  const handleAcademicsChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAcademicsError("");
    const f = e.target.files?.[0];
    if (!f) { setAcademicsFile(null); return; }
    const err = validateFile(f);
    if (err) { setAcademicsError(err); setAcademicsFile(null); return; }
    setAcademicsFile(f);
  }, [validateFile]);

  const handleCoverNoteFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) { setCoverNoteFile(null); return; }
    const err = validateFile(f);
    if (err) { setCoverNoteFile(null); return; }
    setCoverNoteFile(f);
  }, [validateFile]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !cvFile) return;
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("email", email.trim());
      formData.append("phone", phone.trim());
      formData.append("cover_note", coverNote.trim());
      formData.append("resume", cvFile);
      if (academicsFile) formData.append("academics", academicsFile);
      if (coverNoteFile) formData.append("cover_letter", coverNoteFile);

      // TODO: Replace with actual API call when backend is ready
      // const response = await fetch(`/api/public/jobs/${job.id}/apply`, {
      //   method: "POST",
      //   body: formData,
      // });

      // Simulate API call for now
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log(`[Apply Modal] Application for "${job.title}" (ID: ${job.id})`, {
        name, email, phone, coverNote,
        cvFileName: cvFile?.name,
        academicsFileName: academicsFile?.name,
        coverNoteFileName: coverNoteFile?.name,
      });

      setIsSuccess(true);
    } catch {
      setSubmitError("Something went wrong. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  }, [name, email, phone, coverNote, cvFile, academicsFile, coverNoteFile, job.id, job.title]);

  /* Shared file upload zone component */
  const FileUploadZone = ({
    label,
    required,
    file,
    error,
    inputRef,
    onChange,
    onClear,
  }: {
    label: string;
    required?: boolean;
    file: File | null;
    error: string;
    inputRef: React.RefObject<HTMLInputElement | null>;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClear: () => void;
  }) => (
    <div>
      <label className="block text-sm font-medium text-text mb-1.5">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      <div
        onClick={() => inputRef.current?.click()}
        className={`relative rounded-xl border-2 border-dashed p-4 text-center cursor-pointer
                   transition-all duration-200 hover:border-accent/40 hover:bg-accent/[0.02]
                   ${file ? "border-accent/30 bg-accent/[0.03]" : "border-border-soft"}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_FILE_TYPES}
          onChange={onChange}
          className="hidden"
        />
        {file ? (
          <div className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5 text-accent shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
            <span className="text-sm font-medium text-text truncate max-w-[140px] sm:max-w-xs">{file.name}</span>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onClear(); if (inputRef.current) inputRef.current.value = ""; }}
              className="ml-1 w-6 h-6 rounded-full flex items-center justify-center hover:bg-accent-soft text-text-muted hover:text-accent transition-colors shrink-0"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        ) : (
          <>
            <svg className="w-7 h-7 text-text-muted mx-auto mb-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            <p className="text-sm text-text-muted">
              <span className="text-accent font-medium">Click to upload</span>
            </p>
            <p className="text-xs text-text-soft mt-0.5">PDF, DOC, DOCX — max 5MB</p>
          </>
        )}
      </div>
      {error && <p className="text-xs text-accent-hover mt-1">{error}</p>}
    </div>
  );

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center pb-safe">
      {/* Backdrop — click does NOT close modal */}
      <div className="absolute inset-0 bg-overlay backdrop-blur-sm" />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative w-full sm:max-w-xl bg-surface-elevated rounded-t-2xl sm:rounded-2xl
                    border border-border-soft max-h-[92vh] sm:max-h-[88vh] overflow-y-auto
                    animate-in slide-in-from-bottom-4 duration-300 pb-env"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header — close ONLY with X */}
        <div className="sticky top-0 z-10 bg-surface-elevated border-b border-border-soft px-5 sm:px-7 py-4 flex items-center justify-between rounded-t-2xl">
          <div className="min-w-0 pr-4">
            <h2 className="text-base sm:text-lg font-bold text-text">Apply for this role</h2>
            <p className="text-sm text-text-muted mt-0.5 truncate">{job.title}</p>
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={onClose}
            aria-label="Close application form"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M6 18L18 6M6 6l12 12" /></svg>
          </Button>
        </div>

        {isSuccess ? (
          /* Success State */
          <div className="px-5 sm:px-7 py-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-soft border border-accent/20 mb-5">
              <svg className="w-8 h-8 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
            </div>
            <h3 className="text-xl font-bold text-text mb-2">Application submitted</h3>
            <p className="text-sm text-text-muted max-w-sm mx-auto leading-relaxed">
              Thank you for applying for {job.title}. The Exxonim team will review your application and follow up.
            </p>
            <Button
              size="standard"
              variant="primary"
              onClick={onClose}
              className="mt-6"
            >
              Done
            </Button>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} className="px-5 sm:px-7 py-5 space-y-5">
            {/* Name + Email side by side on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text mb-1.5">
                  Full name <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full px-4 py-2.5 rounded-xl border border-border-soft bg-surface text-sm
                             text-text placeholder:text-text-soft focus:outline-none
                             focus:ring-2 focus:ring-accent/20 focus:border-accent/40 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1.5">
                  Email address <span className="text-accent">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-border-soft bg-surface text-sm
                             text-text placeholder:text-text-soft focus:outline-none
                             focus:ring-2 focus:ring-accent/20 focus:border-accent/40 transition-all"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">
                Phone number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+255 7XX XXX XXX"
                className="w-full px-4 py-2.5 rounded-xl border border-border-soft bg-surface text-sm
                           text-text placeholder:text-text-soft focus:outline-none
                           focus:ring-2 focus:ring-accent/20 focus:border-accent/40 transition-all"
              />
            </div>

            {/* CV Upload */}
            <FileUploadZone
              label="CV / Resume"
              required
              file={cvFile}
              error={cvError}
              inputRef={cvInputRef}
              onChange={handleCvChange}
              onClear={() => setCvFile(null)}
            />

            {/* Academic Certificates Upload */}
            <FileUploadZone
              label="Academic certificates"
              file={academicsFile}
              error={academicsError}
              inputRef={academicsInputRef}
              onChange={handleAcademicsChange}
              onClear={() => setAcademicsFile(null)}
            />

            {/* Cover Note — textarea OR file upload */}
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">
                Cover note <span className="text-text-soft font-normal">(optional)</span>
              </label>
              <textarea
                value={coverNote}
                onChange={(e) => setCoverNote(e.target.value)}
                placeholder="Tell us briefly why you are interested in this role and what makes you a good fit..."
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl border border-border-soft bg-surface text-sm
                           text-text placeholder:text-text-soft focus:outline-none
                           focus:ring-2 focus:ring-accent/20 focus:border-accent/40 transition-all resize-y"
              />
              <p className="text-xs text-text-soft mt-1.5 mb-2">Or upload a cover letter file:</p>
              <FileUploadZone
                label=""
                file={coverNoteFile}
                error=""
                inputRef={coverNoteInputRef}
                onChange={handleCoverNoteFileChange}
                onClear={() => setCoverNoteFile(null)}
              />
            </div>

            {/* Error */}
            {submitError && (
              <p className="text-sm text-accent-hover text-center">{submitError}</p>
            )}

            {/* Submit */}
            <Button
              size="standard"
              variant="primary"
              type="submit"
              isLoading={isSubmitting}
              disabled={!name.trim() || !email.trim() || !cvFile}
              className="rounded-xl w-full"
            >
              Submit Application
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════════════════ */
export function CareerPage() {
  const { data: page, isPending, error } = usePage<CareerPageContent>("career");
  const jobsQuery = useQuery({
    queryKey: ["career-jobs"],
    queryFn: getPublishedJobs,
    initialData: getCachedPublishedJobs,
    refetchOnMount: "always",
    refetchOnReconnect: "always",
    staleTime: 1000 * 60 * 30,
  });
  useResolvedPageSeo(page, routes.career);

  const content = page?.content;
  const allJobs = jobsQuery.data ?? [];

  /* ── State ── */
  const [activeTab, setActiveTab] = useState("all");
  const [keyword, setKeyword] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [expandedFullJob, setExpandedFullJob] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [showDeptDropdown, setShowDeptDropdown] = useState(false);
  const [applyJob, setApplyJob] = useState<ApiCareerJob | null>(null);

  /* ── Department tabs from job data ── */
  const departmentTabs = useMemo(() => {
    const depts = uniqueSorted(allJobs.map((j) => j.department));
    return [
      { key: "all", label: "All Jobs" },
      ...depts.map((d) => ({ key: d.toLowerCase().replace(/\s+/g, "-"), label: d, deptName: d })),
    ];
  }, [allJobs]);

  /* ── Department list for dropdown ── */
  const departments = useMemo(
    () => ["All Departments", ...uniqueSorted(allJobs.map((j) => j.department))],
    [allJobs]
  );

  /* ── Filtered Jobs ── */
  const filteredJobs = useMemo(() => {
    let result = [...allJobs];
    if (activeTab !== "all") {
      const tab = departmentTabs.find((t) => t.key === activeTab);
      if (tab?.deptName) result = result.filter((j) => j.department === tab.deptName);
    }
    if (keyword.trim()) {
      const kw = keyword.toLowerCase();
      result = result.filter(
        (j) =>
          j.title.toLowerCase().includes(kw) ||
          j.department.toLowerCase().includes(kw) ||
          j.employment_type.toLowerCase().includes(kw) ||
          j.summary.toLowerCase().includes(kw)
      );
    }
    if (selectedDepartment !== "All Departments") {
      result = result.filter((j) => j.department === selectedDepartment);
    }
    return result;
  }, [activeTab, keyword, selectedDepartment, departmentTabs, allJobs]);

  /* ── Pagination ── */
  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / pageSize));
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  /* ── Handlers ── */
  const resetExpansion = useCallback(() => {
    setExpandedJob(null);
    setExpandedFullJob(null);
  }, []);
  const resetAndGoToPage1 = useCallback(() => {
    setCurrentPage(1);
    resetExpansion();
  }, [resetExpansion]);

  const handleTabChange = useCallback(
    (tab: string) => {
      setActiveTab(tab);
      resetAndGoToPage1();
    },
    [resetAndGoToPage1]
  );
  const handleKeywordChange = useCallback((val: string) => {
    setKeyword(val);
    setCurrentPage(1);
  }, []);
  const handleDepartmentSelect = useCallback(
    (dept: string) => {
      setSelectedDepartment(dept);
      setShowDeptDropdown(false);
      resetAndGoToPage1();
    },
    [resetAndGoToPage1]
  );
  const handlePageSizeChange = useCallback((size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  }, []);
  const clearFilters = useCallback(() => {
    setSelectedDepartment("All Departments");
    setKeyword("");
    setActiveTab("all");
    setCurrentPage(1);
    resetExpansion();
  }, [resetExpansion]);

  const hasActiveFilters =
    selectedDepartment !== "All Departments" || keyword.trim() || activeTab !== "all";

  const openApplyModal = useCallback((job: ApiCareerJob) => {
    setApplyJob(job);
  }, []);

  const closeApplyModal = useCallback(() => {
    setApplyJob(null);
  }, []);

  return (
    <LoadBoundary
      error={error}
      errorDetail="The careers page content could not be loaded right now."
      errorTitle="Unable to load the career page."
      isPending={isPending}
      isReady={Boolean(content)}
      loadingLabel="Loading career page..."
    >
      {() => {
        if (!content) return null;

        const bannerImage = content.hero.banner_image || FALLBACK_BANNER;

        return (
          <div className="min-h-screen overflow-x-hidden" onClick={() => setShowDeptDropdown(false)}>
            <StructuredData heroTitle={content.hero.title} heroDescription={content.hero.description} breadcrumbs={[{ name: 'Careers', path: routes.career }]} pageType="CollectionPage" />
            {/* ── Breadcrumb ── */}
            <div className="max-w-[min(1240px,calc(100%-2rem))] mx-auto px-4 sm:px-6 lg:px-8 pt-4">
              <Breadcrumb items={[{ label: "Home", href: routes.home, icon: Home }, { label: "Career" }]} />
            </div>

            {/* ═══ 1. HERO BANNER ═══ */}
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-4">
              <div className="relative w-full h-[180px] sm:h-[220px] rounded-2xl overflow-hidden">
                <img
                  src={bannerImage}
                  alt="Exxonim Consult — Career opportunities"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-page/95 via-page/80 to-page/55" />
                <div className="relative z-10 flex items-center h-full px-5 sm:px-8">
                  <div className="flex items-center gap-4 sm:gap-5 flex-1">
                    <div>
                      <h1 className="text-xl sm:text-2xl font-bold text-accent-contrast tracking-tight mb-1">
                        Exxonim Consult
                      </h1>
                      <p className="text-xs sm:text-sm text-accent-contrast/70 leading-snug max-w-md">
                        {content.hero.description}
                      </p>
                      <div className="flex items-center gap-2 sm:gap-3 mt-1.5 flex-wrap">
                        <span className="flex items-center gap-1.5 text-accent-contrast/50 text-xs">
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          {allJobs.length} Open {allJobs.length === 1 ? "Role" : "Roles"}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-accent-contrast/40" />
                        <span className="flex items-center gap-1.5 text-accent-contrast/50 text-xs">
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" /><path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          Tanzania
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="ml-auto flex items-center gap-3">
                    <SocialShareButtons />
                    <Button
                      size="standard"
                      variant="outline"
                      href={routes.about}
                      className="hidden md:inline-flex border-accent-contrast/30 text-accent-contrast hover:bg-accent-contrast/10"
                    >
                      About Exxonim
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* ═══ 2. DEPARTMENT TABS ═══ */}
            {allJobs.length > 0 && (
              <div className="bg-surface-elevated border-b border-border-soft mt-6 relative">
                <div className="mx-auto max-w-5xl px-2 sm:px-6 lg:px-8 relative">
                  {/* Fade indicators for scroll */}
                  <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-surface-elevated to-transparent z-10 pointer-events-none sm:hidden" />
                  <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-surface-elevated to-transparent z-10 pointer-events-none sm:hidden" />
                  <div className="flex items-center overflow-x-auto -mx-1 py-0" style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}>
                    <style>{`[style*="scrollbar-width:none"]::-webkit-scrollbar{display:none}`}</style>
                    {departmentTabs.map((tab) => {
                      const isActive = activeTab === tab.key;
                      return (
                        <button
                          key={tab.key}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTabChange(tab.key);
                          }}
                          className={`relative flex items-center gap-2 px-3 sm:px-4 py-3 text-[13px] sm:text-sm font-medium whitespace-nowrap transition-colors shrink-0 ${
                            isActive
                              ? "text-text"
                              : "text-text-muted/40 hover:text-text"
                          }`}
                        >
                          <span>{tab.label}</span>
                          {isActive && (
                            <span className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-accent" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ═══ 3. SEARCH CARD ═══ */}
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-6">
              <div className="bg-surface-elevated rounded-2xl p-3 sm:p-5 border border-border-soft">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex-1 relative">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search jobs..."
                      value={keyword}
                      onChange={(e) => handleKeywordChange(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 sm:py-2.5 rounded-full border border-border-soft bg-surface text-sm
                                 text-text placeholder:text-text-soft focus:outline-none
                                 focus:ring-2 focus:ring-accent/20 focus:border-accent/40 transition-all"
                    />
                  </div>
                  <div className="relative shrink-0" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => setShowDeptDropdown(!showDeptDropdown)}
                      className="flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full border border-border-soft bg-surface text-xs sm:text-sm text-text hover:border-accent/30 transition-colors"
                    >
                      <span className="truncate max-w-[5rem] sm:max-w-none">
                        {selectedDepartment === "All Departments" ? "Dept" : selectedDepartment}
                      </span>
                      <svg className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-text-muted shrink-0 transition-transform ${showDeptDropdown ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </button>
                    {showDeptDropdown && (
                      <div className="absolute top-full right-0 mt-1 bg-surface-elevated rounded-lg border border-border-soft z-50 max-h-60 overflow-y-auto min-w-[10rem]">
                        {departments.map((dept) => (
                          <button
                            key={dept}
                            onClick={() => handleDepartmentSelect(dept)}
                            className={`w-full text-left px-4 py-2.5 text-sm hover:bg-accent-soft transition-colors ${
                              selectedDepartment === dept ? "text-accent font-medium" : "text-text"
                            }`}
                          >
                            {dept}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <Button
                    size="standard"
                    variant="primary"
                    onClick={() => resetAndGoToPage1()}
                    className="shrink-0"
                  >
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                    <span className="hidden sm:inline">Find Jobs</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* ═══ 4. FILTER BAR ═══ */}
            {hasActiveFilters && (
              <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-4">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1.5 text-sm font-medium text-text-muted">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" /></svg>
                    <span>Filters</span>
                  </div>
                  {activeTab !== "all" && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent-soft text-xs font-medium text-accent">
                      {departmentTabs.find((t) => t.key === activeTab)?.label}
                    </span>
                  )}
                  {selectedDepartment !== "All Departments" && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent-soft text-xs font-medium text-accent">
                      {selectedDepartment}
                    </span>
                  )}
                  {keyword.trim() && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent-soft text-xs font-medium text-accent">
                      &ldquo;{keyword.trim()}&rdquo;
                    </span>
                  )}
                  <button
                    onClick={clearFilters}
                    className="text-xs font-medium text-accent hover:underline ml-1"
                  >
                    Clear all
                  </button>
                </div>
              </div>
            )}

            {/* ═══ 5. JOB LISTINGS — ONE HUGE CARD ═══ */}
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-6 mb-12">
              <LoadBoundary
                error={jobsQuery.error}
                errorDetail="The careers page copy is available, but the job listing feed is not responding right now."
                errorTitle="Unable to load current job openings."
                isPending={jobsQuery.isPending}
                loadingLabel="Loading open roles..."
                variant="section"
              >
                {filteredJobs.length > 0 ? (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-sm text-text-muted">
                        <span className="font-semibold text-text">{filteredJobs.length}</span>{" "}
                        Position{filteredJobs.length !== 1 ? "s" : ""} Found
                      </p>
                    </div>

                    {/* Single big card wrapping all jobs */}
                    <div className="bg-surface-elevated rounded-2xl border border-border-soft overflow-hidden">
                      {paginatedJobs.map((job, index) => {
                        const isPreview = expandedJob === String(job.id);
                        const isFullExpanded = expandedFullJob === String(job.id);
                        const isExpanded = isPreview || isFullExpanded;
                        const locationLabel = formatJobLocation(job.city, job.country, job.location_mode);
                        const postedDate = job.published_at ? formatJobDate(job.published_at) : "";
                        const isLast = index === paginatedJobs.length - 1;

                        return (
                          <div
                            key={job.id}
                            className={`${isExpanded ? "bg-accent/[0.02]" : ""} ${
                              !isLast ? "border-b border-border-soft" : ""
                            }`}
                          >
                            {/* ─── COLLAPSED ROW ─── */}
                            <div
                              className="flex items-start gap-3.5 px-4 sm:px-7 py-4 sm:py-5 cursor-pointer"
                              onClick={() => {
                                if (isFullExpanded) { setExpandedFullJob(null); setExpandedJob(null); }
                                else if (isPreview) { setExpandedJob(null); }
                                else { setExpandedJob(String(job.id)); setExpandedFullJob(null); }
                              }}
                            >
                              {/* Chevron */}
                              <div className="shrink-0 mt-1">
                                {isExpanded ? (
                                  <svg className="w-5 h-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                                ) : (
                                  <svg className="w-5 h-5 text-text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                                )}
                              </div>

                              {/* Content + Actions */}
                              <div className="flex-1 min-w-0">
                                {/* Title row */}
                                <div className="mb-1">
                                  <span className="text-base sm:text-lg font-semibold text-text leading-tight">
                                    {job.title}
                                  </span>
                                </div>

                                {/* Pills — separate row for clean wrapping */}
                                <div className="flex flex-wrap items-center gap-1.5 mb-2">
                                  <span className="inline-flex items-center px-2 py-0.5 text-[10px] sm:text-[11px] font-medium rounded-full bg-accent-soft text-accent border border-accent/20">
                                    {job.department}
                                  </span>
                                  <span className="inline-flex items-center px-2 py-0.5 text-[10px] sm:text-[11px] font-medium rounded-full border border-border-soft text-text-muted">
                                    {job.employment_type}
                                  </span>
                                  {job.experience_label && (
                                    <span className="inline-flex items-center px-2 py-0.5 text-[10px] sm:text-[11px] font-medium rounded-full border border-border-soft text-text-muted">
                                      {job.experience_label}
                                    </span>
                                  )}
                                </div>

                                {/* Meta + Apply — side by side on all sizes */}
                                <div className="flex items-center justify-between gap-3 flex-wrap">
                                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                    {postedDate && (
                                      <span className="text-[11px] sm:text-xs text-text-muted">
                                        Posted {postedDate}
                                      </span>
                                    )}
                                    <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs text-text-muted">
                                      <svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                                      {locationLabel}
                                    </span>
                                  </div>

                                  {!isExpanded && (
                                    <Button
                                      size="standard"
                                      variant="primary"
                                      onClick={(e) => { e.stopPropagation(); openApplyModal(job); }}
                                      className="shrink-0"
                                    >
                                      Apply Now
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* ─── PREVIEW MODE ─── */}
                            {isPreview && !isFullExpanded && (
                              <div className="border-t border-border-soft">
                                <div className="px-4 sm:px-7 py-4 sm:py-5 pl-12 sm:pl-[3.25rem]">
                                  <p className="text-sm text-text-muted leading-relaxed mb-5">
                                    {job.summary || job.description}
                                  </p>
                                  <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                                    <Button
                                      size="standard"
                                      variant="primary"
                                      onClick={(e) => { e.stopPropagation(); openApplyModal(job); }}
                                    >
                                      Apply Now
                                    </Button>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setExpandedFullJob(String(job.id));
                                      }}
                                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-accent hover:underline"
                                    >
                                      Read More
                                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* ─── FULL DETAILS MODE ─── */}
                            {isFullExpanded && (
                              <div className="border-t border-border-soft">
                                <div className="px-4 sm:px-7 py-5 sm:py-7 pl-12 sm:pl-[3.25rem]">
                                  {/* Description */}
                                  {job.description && (
                                    <p className="text-sm text-text-muted leading-relaxed mb-6 border-l-2 border-accent/20 pl-4">
                                      {job.description}
                                    </p>
                                  )}

                                  {/* Meta grid */}
                                  <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6 p-3 sm:p-4 rounded-xl bg-surface-soft/50">
                                    <div>
                                      <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-text-muted font-medium block mb-0.5">Location</span>
                                      <span className="text-xs sm:text-sm text-text font-medium">{locationLabel}</span>
                                    </div>
                                    <div>
                                      <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-text-muted font-medium block mb-0.5">Department</span>
                                      <span className="text-xs sm:text-sm text-text font-medium">{job.department}</span>
                                    </div>
                                    <div>
                                      <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-text-muted font-medium block mb-0.5">Type</span>
                                      <span className="text-xs sm:text-sm text-text font-medium">{job.employment_type}</span>
                                    </div>
                                  </div>

                                  {/* Responsibilities */}
                                  {job.responsibilities?.length > 0 && (
                                    <div className="mb-6">
                                      <h4 className="text-sm font-semibold text-text mb-3 flex items-center gap-2">
                                        <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                                          <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
                                        </div>
                                        Responsibilities
                                      </h4>
                                      <ul className="space-y-2.5">
                                        {job.responsibilities.map((r, i) => (
                                          <li key={i} className="flex items-start gap-3">
                                            <span className="w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                                              {i + 1}
                                            </span>
                                            <span className="text-sm text-text-muted leading-relaxed">{r}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}

                                  {/* Requirements */}
                                  {job.requirements?.length > 0 && (
                                    <div className="mb-6">
                                      <h4 className="text-sm font-semibold text-text mb-3 flex items-center gap-2">
                                        <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                                          <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
                                        </div>
                                        Requirements
                                      </h4>
                                      <ul className="space-y-2.5">
                                        {job.requirements.map((r, i) => (
                                          <li key={i} className="flex items-start gap-3">
                                            <span className="w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                                              {i + 1}
                                            </span>
                                            <span className="text-sm text-text-muted leading-relaxed">{r}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}

                                  {/* Action buttons */}
                                  <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2">
                                    <Button
                                      size="standard"
                                      variant="primary"
                                      onClick={(e) => { e.stopPropagation(); openApplyModal(job); }}
                                    >
                                      Apply Now
                                    </Button>
                                    <Button
                                      size="standard"
                                      variant="secondary"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (navigator.share) {
                                          navigator.share({
                                            title: `${job.title} | Exxonim Consult`,
                                            text: `Check out this role: ${job.title} | Exxonim Consult`,
                                            url: window.location.href,
                                          }).catch(() => {});
                                        } else {
                                          navigator.clipboard.writeText(window.location.href);
                                        }
                                      }}
                                    >
                                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" /></svg>
                                      Share
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* ═══ PAGINATION ═══ */}
                    {totalPages > 1 && (
                      <div className="flex flex-col gap-3 mt-6 pt-4 border-t border-border-soft">
                        {/* Top row: count + page size */}
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs sm:text-sm text-text-muted">
                            {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, filteredJobs.length)} of {filteredJobs.length}
                          </span>
                          <div className="flex items-center gap-2 text-xs sm:text-sm text-text-muted">
                            <span>Per page:</span>
                            <select
                              value={pageSize}
                              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                              className="px-2 py-1 text-xs sm:text-sm rounded border border-border-soft bg-surface text-text focus:outline-none focus:ring-1 focus:ring-accent/20"
                            >
                              {PAGE_SIZE_OPTIONS.map((size) => (
                                <option key={size} value={size}>{size}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        {/* Bottom row: prev / page numbers / next */}
                        <div className="flex items-center justify-center gap-1 overflow-x-auto">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="rounded-lg shrink-0"
                          >
                            <svg className="w-4 h-4 text-text" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                          </Button>
                          {Array.from({ length: totalPages }, (_, i) => i + 1)
                            .filter((p) => {
                              /* Show first, last, current ±1; hide the rest as "…" */
                              if (totalPages <= 5) return true;
                              if (p === 1 || p === totalPages) return true;
                              if (Math.abs(p - currentPage) <= 1) return true;
                              return false;
                            })
                            .reduce<(number | "ellipsis")[]>((acc, p, i, arr) => {
                              if (i > 0 && p - (arr[i - 1] as number) > 1) acc.push("ellipsis");
                              acc.push(p);
                              return acc;
                            }, [])
                            .map((item, i) =>
                              item === "ellipsis" ? (
                                <span key={`ellipsis-${i}`} className="w-8 h-8 flex items-center justify-center text-text-muted text-sm">…</span>
                              ) : (
                                <Button
                                  key={item}
                                  size="icon"
                                  variant={currentPage === item ? "primary" : "ghost"}
                                  onClick={() => setCurrentPage(item)}
                                  className="text-sm font-medium rounded-lg shrink-0"
                                >
                                  {item}
                                </Button>
                              )
                            )}
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="rounded-lg shrink-0"
                          >
                            <svg className="w-4 h-4 text-text" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* ── Empty State ── */
                  <div className="bg-surface-elevated rounded-2xl border border-border-soft p-10 sm:p-16 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-soft mb-5">
                      <svg className="w-8 h-8 text-text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                    </div>
                    <h3 className="text-xl font-bold text-text mb-2">
                      {hasActiveFilters ? "No positions found" : "No positions available"}
                    </h3>
                    <p className="text-sm text-text-muted max-w-md mx-auto mb-6 leading-relaxed">
                      {hasActiveFilters
                        ? "We couldn't find any positions matching your criteria. Try adjusting your filters or search terms."
                        : "There are no open positions at the moment. New roles are posted regularly — check back soon or reach out to express your interest."}
                    </p>
                    {hasActiveFilters ? (
                      <Button
                        size="standard"
                        variant="primary"
                        onClick={clearFilters}
                      >
                        View All Positions
                      </Button>
                    ) : (
                      <Button
                        size="standard"
                        variant="primary"
                        href={content.status.primary.href}
                      >
                        Contact Exxonim
                      </Button>
                    )}
                  </div>
                )}
              </LoadBoundary>
            </div>

            {/* ── Newsletter Card ── */}
            <NewsletterSection
              variant="card"
              heading="Never miss a new role"
              description="Subscribe to get notified when Exxonim publishes new career opportunities. No spam — just job alerts that matter."
              label="Job alerts"
            />

            {/* ── CTA Banner ── */}
            <CareerCTABanner primary={content.status.primary} secondary={content.status.secondary} />

            {/* ── Apply Modal ── */}
            {applyJob && <ApplyModal job={applyJob} onClose={closeApplyModal} />}
          </div>
        );
      }}
    </LoadBoundary>
  );
}
