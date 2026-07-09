'use client';

import { useState } from 'react';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from './primitives/Button';

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
export function NewsletterForm() {
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
      // TODO: Replace with actual API call when newsletter backend is ready
      // const response = await fetch('/api/v1/newsletter/subscribe', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email: email.trim() }),
      // });
      // if (!response.ok) throw new Error('Subscription failed');

      // Simulated delay - remove when backend is wired
      await new Promise((resolve) => setTimeout(resolve, 800));

      setSubmitted(true);
    } catch {
      setSubmitError('Something went wrong. Please try again.');
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
      <div className="flex flex-col items-center gap-2 md:items-start">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-accent">
          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
          <span className="text-xs sm:text-sm font-semibold">Subscribed!</span>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="text-xs text-footer-text-muted underline-offset-2 hover:underline hover:text-footer-heading transition-colors"
        >
          Use a different email
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap w-full sm:w-auto md:min-w-[22rem] items-center gap-2 sm:gap-3"
    >
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
          placeholder="your@email.com"
          className="h-10 sm:h-12 w-full rounded-full border border-border-soft bg-surface pl-9 pr-3 text-sm text-text placeholder:text-text-soft focus:outline-none focus:ring-2 focus:ring-accent/40 disabled:opacity-50"
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

      {/* Inline error - shown below the form row */}
      {submitError && (
        <p role="alert" className="w-full text-xs text-footer-heading mt-1">
          {submitError}
        </p>
      )}
    </form>
  );
}
