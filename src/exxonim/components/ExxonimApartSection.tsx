'use client';

import { routes } from '@/exxonim/routes';

/* ─────────────────────────────────────────────────────────────────────────────
 * ExxonimApartSection — "What sets Exxonim apart" differentiator grid
 *
 * Displays 4 core differentiator cards in a 2×2 grid (1 col on mobile).
 * This section is designed for the Services page to highlight what makes
 * Exxonim Consult different from competitors.
 *
 * BACKEND / ADMIN INTEGRATION NOTES:
 * ──────────────────────────────────
 * Currently all content is static. If the CMS needs to manage these cards:
 *   - Add an "apart_section" field to the services page content type
 *   - Each card: { title, description, icon_key, link? }
 *   - Icon key maps to the inline SVG switch below
 *   - Link is optional — only "track-consultation" currently links out
 * ──────────────────────────────────────────────────────────────────────────── */

/** Checkmark-in-circle SVG icon */
function CheckCircleIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

/** Bell SVG icon */
function BellIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

/** Shield/building SVG icon — represents authority liaison */
function ShieldBuildingIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12h2v4" />
      <path d="M15 12h-2v4" />
      <rect x="10" y="8" width="4" height="4" rx="0.5" />
    </svg>
  );
}

/** Clipboard-check SVG icon */
function ClipboardCheckIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="m9 14 2 2 4-4" />
    </svg>
  );
}

/** Differentiator card data — all static content */
const differentiators = [
  {
    title: 'Live Consultation Tracking',
    description:
      'Track every consultation from intake to resolution. Receive automatic updates at every milestone via WhatsApp, email, or SMS — no login required.',
    icon: <CheckCircleIcon />,
    link: routes.trackConsultation,
    linkLabel: 'Learn more',
  },
  {
    title: '5-Month Compliance Reminders',
    description:
      'We notify you 5 months before every compliance deadline — BRELA returns, TRA filings, license renewals, WCF, NSSF, OSHA. Never be caught off-guard again.',
    icon: <BellIcon />,
    link: undefined,
    linkLabel: undefined,
  },
  {
    title: 'Authority Liaison',
    description:
      'We communicate directly with BRELA, TRA, NSSF, WCF, OSHA and other regulators on your behalf — so you don\'t have to chase offices or wait in queues.',
    icon: <ShieldBuildingIcon />,
    link: undefined,
    linkLabel: undefined,
  },
  {
    title: 'Document Readiness Review',
    description:
      'Before any filing, we review your documents for completeness and accuracy — preventing rejections, delays, and costly resubmissions.',
    icon: <ClipboardCheckIcon />,
    link: undefined,
    linkLabel: undefined,
  },
] as const;

export function ExxonimApartSection() {
  return (
    <section
      aria-labelledby="exxonim-apart-title"
      className="py-16 md:py-24 bg-page-strong"
    >
      <div className="w-[min(1240px,calc(100%-2rem))] mx-auto">
        {/* ─── Section Header ─── */}
        <div className="grid gap-3 mb-10 md:mb-14 text-center max-w-[min(52ch,90%)] mx-auto">
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-accent">
            Our edge
          </p>
          <h2
            id="exxonim-apart-title"
            className="text-[clamp(1.8rem,3.2vw,2.6rem)] font-semibold leading-tight tracking-tight text-text"
          >
            What sets Exxonim apart
          </h2>
        </div>

        {/* ─── Differentiator Cards Grid ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {differentiators.map((card) => (
            <article
              key={card.title}
              className="rounded-[1.5rem] border border-border-soft bg-surface/88 shadow-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30"
            >
              {/* Icon */}
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent-soft text-accent mb-4">
                {card.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-text leading-tight">
                {card.title}
              </h3>

              {/* Description */}
              <p className="mt-2.5 text-sm text-text-muted leading-relaxed">
                {card.description}
              </p>

              {/* Optional "Learn more" link */}
              {card.link && (
                <a
                  href={card.link}
                  className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
                >
                  {card.linkLabel}
                  <span aria-hidden="true" className="text-base leading-none">
                    &rarr;
                  </span>
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
