'use client';

import type { ReactNode } from 'react';
import { Container } from './primitives/Container';

/**
 * UnifiedCtaSection — One consistent CTA card design across all pages.
 *
 * Same shell everywhere: full-width card with teal radial gradient glow,
 * border, rounded corners. Only the content (eyebrow, heading,
 * description, action area) changes per page via props.
 *
 * Brand accent: #0f5c63 teal — the radial gradient glow at the top
 * of the card is the signature brand element.
 */

export interface UnifiedCtaSectionProps {
  /** Optional eyebrow label shown above the heading (e.g. "Stay Updated"). */
  eyebrow?: { icon?: ReactNode; text: string };
  /** Main CTA headline. */
  heading: string;
  /** Supporting description below the heading. */
  description?: string;
  /** Action area — email form, buttons, etc. */
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
    <section aria-label={ariaLabel} className={`py-10 md:py-16 ${className ?? ''}`}>
      <Container>
        <div
          className="relative overflow-hidden border border-border-soft rounded-2xl sm:rounded-[2rem] p-5 sm:p-8 md:p-12 text-center"
          style={{
            background:
              'radial-gradient(80% 100% at 50% 0%, color-mix(in srgb, var(--color-accent) 18%, transparent), transparent 70%), var(--color-surface-elevated)',
          }}
          data-reveal
        >
          {/* Eyebrow */}
          {eyebrow && (
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-accent">
              {eyebrow.icon}
              {eyebrow.text}
            </span>
          )}

          {/* Heading */}
          <h2
            className={`${eyebrow ? 'mt-3' : ''} text-[clamp(1.5rem,3vw,2rem)] font-semibold leading-tight tracking-tight text-text`}
          >
            {heading}
          </h2>

          {/* Description */}
          {description && (
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-text-muted">
              {description}
            </p>
          )}

          {/* Action area */}
          <div className="mt-6">{children}</div>
        </div>
      </Container>
    </section>
  );
}
