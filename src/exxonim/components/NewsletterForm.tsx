'use client';

import { useState } from 'react';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from './primitives/Button';

/**
 * NewsletterForm — Email subscription form for use inside UnifiedCtaSection.
 *
 * Renders a responsive email input + subscribe button.
 * MOBILE: Stacked — full-width input, full-width button.
 * DESKTOP: Inline — input + button in a row.
 */
export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setEmail('');
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3">
        {/* Mobile success */}
        <div className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-4 py-2.5 text-accent sm:hidden">
          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
          <span className="text-xs font-semibold">Subscribed!</span>
        </div>
        {/* Desktop success */}
        <div className="hidden sm:inline-flex items-center gap-2 rounded-full bg-accent-soft px-5 py-2.5 text-sm font-semibold text-accent">
          <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
          You&apos;re subscribed!
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center min-h-12 px-3 py-2 relative before:absolute before:-top-2 before:-bottom-2 before:left-0 before:right-0 text-xs text-text-soft underline-offset-2 hover:underline hover:text-accent transition-colors"
        >
          Use a different email
        </button>
      </div>
    );
  }

  return (
    <>
      {/* ─── MOBILE LAYOUT: Stacked ─── */}
      <form onSubmit={handleSubmit} className="grid gap-2 sm:hidden">
        <label htmlFor="newsletter-email-mobile" className="sr-only">
          Email address
        </label>
        <div className="relative">
          <Mail
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-soft"
            aria-hidden="true"
          />
          <input
            id="newsletter-email-mobile"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="h-11 w-full rounded-full border border-border-soft bg-surface pl-9 pr-4 text-sm text-text placeholder:text-text-soft focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
        </div>
        <Button
          size="standard"
          variant="primary"
          type="submit"
          className="w-full rounded-xl"
          aria-label="Subscribe to newsletter"
        >
          Subscribe
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </form>

      {/* ─── DESKTOP LAYOUT: Inline ─── */}
      <form
        onSubmit={handleSubmit}
        className="hidden sm:flex w-full max-w-md mx-auto items-center gap-3"
      >
        <label htmlFor="newsletter-email-desktop" className="sr-only">
          Email address
        </label>
        <div className="relative flex-1">
          <Mail
            className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-text-soft"
            aria-hidden="true"
          />
          <input
            id="newsletter-email-desktop"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="h-12 w-full rounded-full border border-border-soft bg-surface pl-11 pr-4 text-sm text-text placeholder:text-text-soft focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
        </div>
        <Button
          size="standard"
          variant="primary"
          type="submit"
          aria-label="Subscribe to newsletter"
        >
          Subscribe
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </form>
    </>
  );
}
