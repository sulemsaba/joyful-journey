'use client';

import { useState } from 'react';
import { Mail, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { Container } from './primitives/Container';
import { Button } from './primitives/Button';

/**
 * NewsletterSection — dual-layout newsletter CTA card.
 *
 * MOBILE (< sm / 640px): Stacked layout — label+heading on top, email
 * input below with full width, subscribe button full width.
 *
 * DESKTOP (≥ sm): Centered card with eyebrow, heading, description,
 * decorative accent circles, and a centered email+subscribe row.
 */
export function NewsletterSection() {
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

  return (
    <section aria-label="Newsletter subscription" className="py-10 md:py-16">
      <Container>
        {/* ─── Outer card wrapper ─── */}
        <div
          className="relative overflow-hidden border border-border-soft sm:rounded-[2rem] rounded-2xl sm:p-8 md:p-12 p-5
            bg-surface
          "
        >

          {/* ─── MOBILE LAYOUT: Stacked ─── */}
          <div className="grid gap-4 sm:hidden">
            {/* Top: label + heading */}
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1 text-[0.65rem] font-extrabold uppercase tracking-[0.14em] text-accent">
                <Sparkles className="h-3 w-3" aria-hidden="true" />
                Stay Updated
              </span>
              <p className="text-sm font-semibold leading-tight text-text">
                Get the latest from Exxonim
              </p>
              <p className="text-xs leading-relaxed text-text-muted">
                Business insights, regulatory updates, and compliance tips delivered to your inbox.
              </p>
            </div>

            {/* Bottom: input + button */}
            {submitted ? (
              <div className="flex items-center justify-center gap-1.5 rounded-full bg-accent-soft py-2.5 text-accent">
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                <span className="text-xs font-semibold">Subscribed!</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-2">
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
            )}
          </div>

          {/* ─── DESKTOP LAYOUT: Centered CTA ─── */}
          <div className="hidden sm:block text-center">
            {/* Eyebrow */}
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-accent">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Stay Updated
            </span>

            {/* Heading */}
            <h2 className="mt-3 text-[clamp(1.5rem,3vw,2rem)] font-semibold leading-tight tracking-tight text-text">
              Get the latest from Exxonim
            </h2>

            {/* Description */}
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-text-muted">
              Business insights, regulatory updates, and practical compliance
              tips delivered to your inbox.
            </p>

            {/* Email form */}
            <div className="mt-6 flex items-center justify-center">
              {submitted ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-5 py-2.5 text-sm font-semibold text-accent">
                    <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                    You&apos;re subscribed!
                  </div>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-xs text-text-soft underline-offset-2 hover:underline hover:text-accent transition-colors"
                  >
                    Use a different email
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex w-full max-w-md items-center gap-3"
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
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
