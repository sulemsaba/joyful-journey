'use client';

import type { ServicesFaqItem } from '@/exxonim/types';

/* ─────────────────────────────────────────────────────────────────────────────
 * ServicesFaqSection - static FAQ grid for the Services page.
 * 
 * Displays questions and answers in a simple list. No accordion/toggle.
 * ──────────────────────────────────────────────────────────────────────────── */

interface ServicesFaqSectionProps {
  items: ServicesFaqItem[];
}

export function ServicesFaqSection({ items }: ServicesFaqSectionProps) {
  return (
    <section
      aria-labelledby="services-faq-title"
      className="py-10 md:py-24"
    >
      <div className="max-w-[1240px] px-4 sm:px-6 lg:px-8 mx-auto">
        {/* ─── Section Header ─── */}
        <div className="grid gap-2.5 md:gap-3 mb-8 md:mb-14 text-center max-w-[min(52ch,90%)] mx-auto" data-reveal>
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-accent">
            Frequently asked questions
          </p>
          <h2
            id="services-faq-title"
            className="text-[clamp(1.8rem,3.2vw,2.6rem)] font-semibold leading-tight tracking-tight text-text"
          >
            Common questions about our services
          </h2>
        </div>

        {/* ─── FAQ List ─── */}
        <div className="max-w-3xl mx-auto" data-reveal>
          {items.map((item, index) => (
            <div
              key={index}
              className="border-b border-border-soft py-6"
            >
              <h3 className="text-base font-semibold text-text leading-snug mb-2">
                {item.question}
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
