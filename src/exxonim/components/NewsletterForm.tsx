'use client';

import { useState } from 'react';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from './primitives/Button';
import { subscribeToNewsletter } from '@/exxonim/services/newsletterService';

/**
 * NewsletterForm - Email subscription form for use inside UnifiedCtaSection.
 *
 * MOBILE: Single row - inline input + small subscribe button.
 * DESKTOP: Wider inline - input + button in a centered row.
 *
 * UX PATTERN:
 *   Idle → Submitting... (button disabled + spinner) → Subscribed! (inline)
 *   Error → Inline error message, user can retry
 */
export function NewsletterForm({ source }: { source?: string } = {}) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      await subscribeToNewsletter(email.trim(), source);
      setSubmitted(true);
    } catch (err) {
      const data = (err as { response?: { data?: { error?: string; detail?: string } } })?.response?.data;
      setSubmitError(data?.error || data?.detail || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setEmail('');
    setSubmitted(false);
    setSubmitError('');
  };

  if (submitted) {
    return (
      <div
        role="status"
        className="w-full sm:w-auto md:min-w-[22rem] rounded-2xl bg-surface ring-1 ring-border-soft px-6 py-5"
      >
        <div className="flex items-center gap-2 text-accent">
          <CheckCircle2 className="h-6 w-6 shrink-0" aria-hidden="true" />
          <p className="m-0 text-base font-bold text-text">You&apos;re subscribed!</p>
        </div>
        <p className="m-0 mt-1.5 text-sm leading-relaxed text-text-muted">
          Practical guides and deadline reminders will land in your inbox.
        </p>
        <button
          type="button"
          onClick={handleReset}
          className="mt-3 text-sm font-medium text-accent underline-offset-2 hover:underline transition-colors"
        >
          Use a different email
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full sm:w-auto md:min-w-[22rem]"
    >
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <div className="relative flex-1">
          <Mail
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-soft"
            aria-hidden="true"
          />
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => { setEmail(e.target.value); setSubmitError(''); }}
            disabled={isSubmitting}
            placeholder="you@company.co.tz"
            aria-invalid={submitError ? true : undefined}
            aria-describedby={submitError ? 'newsletter-email-error' : undefined}
            className="h-10 sm:h-12 w-full rounded-lg border border-border-soft bg-surface pl-9 pr-3 text-sm text-text placeholder:text-text-soft focus:outline-none focus:ring-2 focus:ring-accent/40 disabled:opacity-50"
          />
        </div>
        <Button
          size="standard"
          variant="inverse"
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
          aria-label="Subscribe to newsletter"
          className="shrink-0"
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          {!isSubmitting && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
        </Button>
      </div>

      {/* Inline error - directly below the input it belongs to, and linked to
          it via aria-describedby so screen readers announce them together. */}
      {submitError && (
        <p id="newsletter-email-error" role="alert" className="mt-1.5 text-xs text-footer-heading">
          {submitError}
        </p>
      )}
    </form>
  );
}
