'use client';

import { CheckCircle, Bell, ShieldCheck, ClipboardCheck, Globe } from 'lucide-react';
import { routes } from '@/exxonim/routes';

/* ─────────────────────────────────────────────────────────────────────────────
 * ExxonimApartSection — "What sets Exxonim apart" differentiator grid
 *
 * Displays 5 core differentiator cards in a responsive grid (1 col on mobile,
 * 2 on tablet, 3 on desktop). This section is designed for the Services page
 * to highlight what makes Exxonim Consult different from competitors.
 *
 * BACKEND / ADMIN INTEGRATION NOTES:
 * ──────────────────────────────────
 * Currently all content is static. If the CMS needs to manage these cards:
 *   - Add an "apart_section" field to the services page content type
 *   - Each card: { title, description, icon_key, link? }
 *   - Icon key maps to the Lucide icon switch below
 *   - Link is optional — only "track-consultation" currently links out
 * ──────────────────────────────────────────────────────────────────────────── */

/** Differentiator card data — all static content */
const differentiators = [
  {
    title: 'Live Consultation Tracking',
    description:
      'Track every consultation from intake to resolution. Receive automatic updates at every milestone via WhatsApp, email, or SMS — no login required.',
    icon: <CheckCircle className="h-6 w-6" />,
    link: routes.trackConsultation,
    linkLabel: 'Learn more',
  },
  {
    title: 'Ongoing Compliance Reminders',
    description:
      'We send timely reminders ahead of every compliance deadline — BRELA returns, TRA filings, license renewals, WCF, NSSF, OSHA. No time limit, no cut-off. Never be caught off-guard.',
    icon: <Bell className="h-6 w-6" />,
    link: routes.contact,
    linkLabel: 'Get reminders',
  },
  {
    title: 'Authority Liaison',
    description:
      'We communicate directly with BRELA, TRA, NSSF, WCF, OSHA and other regulators on your behalf — so you don\'t have to chase offices or wait in queues.',
    icon: <ShieldCheck className="h-6 w-6" />,
    link: routes.contact,
    linkLabel: 'Get started',
  },
  {
    title: 'Document Readiness Review',
    description:
      'Before any filing, we review your documents for completeness and accuracy — preventing rejections, delays, and costly resubmissions.',
    icon: <ClipboardCheck className="h-6 w-6" />,
    link: routes.contact,
    linkLabel: 'Submit documents',
  },
  {
    title: 'No Office Visits Required',
    description:
      'We file everything electronically and keep you updated via WhatsApp. Our team liaises with BRELA, TRA, NSSF, WCF, and OSHA on your behalf — no queues, no travel, no wasted time.',
    icon: <Globe className="h-6 w-6" />,
    link: routes.contact,
    linkLabel: 'Work remotely with us',
  },
] as const;

export function ExxonimApartSection() {
  return (
    <section
      aria-labelledby="exxonim-apart-title"
      className="py-10 md:py-24"
    >
      <div className="w-[min(1240px,calc(100%-2rem))] mx-auto">
        {/* ─── Section Header ─── */}
        <div className="grid gap-2.5 md:gap-3 mb-8 md:mb-14 text-center max-w-[min(52ch,90%)] mx-auto">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {differentiators.map((card) => (
            <article
              key={card.title}
              className="rounded-2xl md:rounded-[1.5rem] border border-border-soft bg-surface p-5 md:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30"
            >
              {/* Icon */}
              <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-accent-soft text-accent mb-3 md:mb-4">
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
