"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Upload, FileText, CheckCircle2 } from "lucide-react";
import type { ApiCareerJob } from "@/exxonim/types/api";

interface JobApplyModalProps {
  job: ApiCareerJob | null;
  open: boolean;
  onClose: () => void;
}

export function JobApplyModal({ job, open, onClose }: JobApplyModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetForm = useCallback(() => {
    setFullName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setFileName(null);
    setSubmitted(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const handleClose = useCallback(() => {
    onClose();
    // Reset after animation completes
    setTimeout(resetForm, 300);
  }, [onClose, resetForm]);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      setFileName(file?.name ?? null);
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitted(true);
    },
    []
  );

  return (
    <AnimatePresence>
      {open && job && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-overlay backdrop-blur-sm z-[9900]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-[9901] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="relative w-full max-w-lg rounded-[1.35rem] border border-border-soft bg-surface-elevated shadow-2xl overflow-hidden"
              initial={{ scale: 0.92, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 24 }}
              transition={{ type: "spring", damping: 28, stiffness: 380 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={`Apply for ${job.title}`}
            >
              {/* Header */}
              <div className="flex items-start justify-between p-6 pb-4 border-b border-border-soft">
                <div className="grid gap-1 pr-8">
                  <h3 className="m-0 text-lg font-semibold text-text leading-tight">
                    Apply for this role
                  </h3>
                  <p className="m-0 text-sm text-text-muted">
                    {job.title} &middot; {job.department}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex items-center justify-center w-8 h-8 rounded-full border border-border-soft bg-surface text-text-muted hover:text-text hover:bg-accent-soft transition-colors shrink-0 mt-0.5"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 max-h-[70vh] overflow-y-auto">
                {submitted ? (
                  <div className="grid gap-4 py-8 text-center">
                    <div className="flex justify-center">
                      <CheckCircle2 className="w-12 h-12 text-accent" />
                    </div>
                    <h4 className="m-0 text-lg font-semibold text-text">
                      Application submitted
                    </h4>
                    <p className="m-0 text-text-muted text-sm max-w-[24rem] mx-auto">
                      Thank you for applying for {job.title}. Our team will
                      review your application and get back to you soon.
                    </p>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="inline-flex items-center justify-center min-h-[2.75rem] px-6 rounded-full bg-accent text-accent-contrast text-sm font-extrabold shadow-accent-glow transition-all hover:-translate-y-0.5 hover:bg-accent-hover mx-auto mt-2"
                    >
                      Done
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="grid gap-5">
                    {/* Full name */}
                    <div className="grid gap-1.5">
                      <label
                        htmlFor="apply-name"
                        className="text-sm font-semibold text-text"
                      >
                        Full name <span className="text-error">*</span>
                      </label>
                      <input
                        id="apply-name"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full h-11 px-4 rounded-xl border border-border-soft bg-surface text-text placeholder:text-text-muted/50 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/60 transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div className="grid gap-1.5">
                      <label
                        htmlFor="apply-email"
                        className="text-sm font-semibold text-text"
                      >
                        Email <span className="text-error">*</span>
                      </label>
                      <input
                        id="apply-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full h-11 px-4 rounded-xl border border-border-soft bg-surface text-text placeholder:text-text-muted/50 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/60 transition-colors"
                      />
                    </div>

                    {/* Phone */}
                    <div className="grid gap-1.5">
                      <label
                        htmlFor="apply-phone"
                        className="text-sm font-semibold text-text"
                      >
                        Phone
                      </label>
                      <input
                        id="apply-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+255 7XX XXX XXX"
                        className="w-full h-11 px-4 rounded-xl border border-border-soft bg-surface text-text placeholder:text-text-muted/50 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/60 transition-colors"
                      />
                    </div>

                    {/* Cover letter / Message */}
                    <div className="grid gap-1.5">
                      <label
                        htmlFor="apply-message"
                        className="text-sm font-semibold text-text"
                      >
                        Cover letter / Message
                      </label>
                      <textarea
                        id="apply-message"
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us why you are a great fit for this role..."
                        className="w-full px-4 py-3 rounded-xl border border-border-soft bg-surface text-text placeholder:text-text-muted/50 text-sm resize-y min-h-[5rem] focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/60 transition-colors"
                      />
                    </div>

                    {/* CV / Resume upload */}
                    <div className="grid gap-1.5">
                      <label className="text-sm font-semibold text-text">
                        CV / Resume
                      </label>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-3 w-full h-14 px-4 rounded-xl border border-dashed border-border-strong bg-surface hover:bg-accent-soft/30 transition-colors cursor-pointer"
                      >
                        {fileName ? (
                          <>
                            <FileText className="w-5 h-5 text-accent shrink-0" />
                            <span className="text-sm text-text truncate">
                              {fileName}
                            </span>
                            <CheckCircle2 className="w-4 h-4 text-accent ml-auto shrink-0" />
                          </>
                        ) : (
                          <>
                            <Upload className="w-5 h-5 text-text-muted shrink-0" />
                            <span className="text-sm text-text-muted">
                              Click to upload your CV or resume
                            </span>
                          </>
                        )}
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.doc,.docx,.txt"
                        onChange={handleFileChange}
                        className="hidden"
                        aria-label="Upload CV or resume"
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center min-h-[3rem] px-6 rounded-full bg-accent text-accent-contrast text-sm font-extrabold shadow-accent-glow transition-all hover:-translate-y-0.5 hover:bg-accent-hover w-full"
                    >
                      Submit application
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
