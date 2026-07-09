'use client';

import type { ReactNode } from 'react';
import { Container } from './primitives/Container';

/**
 * UnifiedCtaSection - One consistent CTA banner across all pages.
 *
 * A wide horizontal banner in the footer background colour (brand teal
 * #0f5c63 light / #152629 dark), full content width, rounded corners.
 * Copy sits on the left, the action area (newsletter form or buttons) on
 * the right; it stacks on mobile. Actions should use the Button `inverse`
 * / `inverseOutline` variants so they read against the teal.
 *
 * Only the content (eyebrow, heading, description, action area) changes per
 * page via props — the shell is identical everywhere.
 */

export interface UnifiedCtaSectionProps {
  /** Optional eyebrow label shown above the heading (e.g. "Stay Updated"). */
  eyebrow?: { icon?: ReactNode; text: string };
  /** Main CTA headline. */
  heading: string;
  /** Supporting description below the heading. */
  description?: string;
  /** Action area - email form, buttons, etc. */
  children: ReactNode;
  /** Section aria-label. */
  ariaLabel?: string;
  /** Additional section classes. */
  className?: string;
}

export function UnifiedCtaSection({
  eyebrow,
  heading,
  description,
  children,
  ariaLabel = 'Call to action',
  className,
}: UnifiedCtaSectionProps) {
  return (
    <section aria-label={ariaLabel} className={`py-8 sm:py-12 md:py-16 ${className ?? ''}`}>
      <Container>
        <div
          className="relative overflow-hidden rounded-[1.75rem] md:rounded-[2rem] bg-footer-bg px-6 py-9 sm:px-10 sm:py-11 md:px-14 md:py-12 flex flex-col gap-7 text-left md:flex-row md:items-center md:justify-between md:gap-12"
          data-reveal
        >
          {/* Soft brand glow, top-right — subtle depth without clutter */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-1/2 right-0 h-[200%] w-2/3 opacity-[0.16]"
            style={{
              background:
                'radial-gradient(55% 45% at 80% 40%, var(--color-accent-secondary), transparent 70%)',
            }}
          />

          {/* Copy */}
          <div className="relative max-w-xl">
            {eyebrow && (
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-accent-secondary">
                {eyebrow.icon}
                {eyebrow.text}
              </span>
            )}
            <h2
              className={`${eyebrow ? 'mt-2 sm:mt-3' : ''} text-[clamp(1.35rem,3.4vw,2.15rem)] font-semibold leading-tight tracking-tight text-footer-heading`}
            >
              {heading}
            </h2>
            {description && (
              <p className="mt-2 sm:mt-3 max-w-lg text-sm leading-relaxed text-footer-text-muted">
                {description}
              </p>
            )}
          </div>

          {/* Action area */}
          <div className="relative w-full md:w-auto md:shrink-0">{children}</div>
        </div>
      </Container>
    </section>
  );
}
