'use client';

import { useState } from 'react';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from './primitives/Button';

/**
 * NewsletterForm — Email subscription form for use inside UnifiedCtaSection.
 *
 * MOBILE: Single row — inline input + small subscribe button.
 * DESKTOP: Wider inline — input + button in a centered row.
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
      <div className="flex flex-col items-center gap-2">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-4 py-2 text-accent">
          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
          <span className="text-xs sm:text-sm font-semibold">Subscribed!</span>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="text-xs text-text-soft underline-offset-2 hover:underline hover:text-accent transition-colors"
        >
          Use a different email
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md mx-auto items-center gap-2 sm:gap-3"
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
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="h-10 sm:h-12 w-full rounded-full border border-border-soft bg-surface pl-9 pr-3 text-sm text-text placeholder:text-text-soft focus:outline-none focus:ring-2 focus:ring-accent/40"
        />
      </div>
      <Button
        size="standard"
        variant="primary"
        type="submit"
        aria-label="Subscribe to newsletter"
        className="shrink-0"
      >
        Subscribe
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Button>
    </form>
  );
}
