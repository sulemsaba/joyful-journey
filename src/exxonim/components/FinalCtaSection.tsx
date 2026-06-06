'use client';

import { ArrowRight, Phone } from 'lucide-react';
import { Button } from '@/exxonim/components/primitives/Button';
import { routes } from '@/exxonim/routes';

/* ─────────────────────────────────────────────────────────────────────────────
 * FinalCtaSection — Strong final call-to-action block at the bottom of
 * the services page.
 *
 * Features a centered card with radial gradient accent, heading,
 * description, and two action buttons (primary + secondary with phone).
 * ──────────────────────────────────────────────────────────────────────────── */

export function FinalCtaSection() {
  return (
    <section
      aria-labelledby="final-cta-title"
      className="py-16 md:py-24"
    >
      <div className="w-[min(1240px,calc(100%-2rem))] mx-auto">
        <div
          className="max-w-[42rem] mx-auto rounded-[2rem] border border-border-soft bg-surface-elevated p-8 md:p-12 text-center"
          style={{
            background:
              'radial-gradient(80% 100% at 50% 0%, color-mix(in srgb, var(--color-accent) 18%, transparent), transparent 70%), var(--color-surface-elevated)',
          }}
          data-reveal
        >
          <h2
            id="final-cta-title"
            className="text-[clamp(1.8rem,3.2vw,2.6rem)] font-semibold leading-tight tracking-tight text-text"
          >
            Ready to get started?
          </h2>
          <p className="mt-3 text-text-muted text-sm leading-relaxed max-w-[min(48ch,90%)] mx-auto">
            Book a free consultation and receive a tracking code that keeps you informed at every step.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button size="standard" variant="primary" href={routes.contact}>
              Book a Free Consultation
              <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              size="standard"
              variant="secondary"
              href="tel:+255794689099"
            >
              <Phone className="mr-1.5 h-4 w-4" aria-hidden="true" />
              Call +255 794 689 099
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
