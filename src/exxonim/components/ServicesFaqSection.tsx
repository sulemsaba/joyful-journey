'use client';

import { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { Button } from '@/exxonim/components/primitives/Button';
import type { ServicesFaqItem } from '@/exxonim/types';

/* ─────────────────────────────────────────────────────────────────────────────
 * ServicesFaqSection - FAQ accordion with micro-CTAs after each answer.
 *
 * Displays an accordion list of questions/answers. Only one item can be
 * open at a time. Each answer can optionally include a micro-CTA button.
 *
 * BACKEND / ADMIN INTEGRATION NOTES:
 * ──────────────────────────────────
 * Content comes from page.content.faq (ServicesFaqItem[]).
 * Each item: { question, answer, cta?: { label, href } }
 * ──────────────────────────────────────────────────────────────────────────── */

interface ServicesFaqSectionProps {
  items: ServicesFaqItem[];
}

export function ServicesFaqSection({ items }: ServicesFaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      aria-labelledby="services-faq-title"
      className="py-10 md:py-24"
    >
      <div className="w-[min(1240px,calc(100%-2rem))] mx-auto">
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

        {/* ─── Accordion List ─── */}
        <div className="max-w-3xl mx-auto" data-reveal>
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border-b border-border-soft"
              >
                {/* Question row */}
                <button
                  type="button"
                  onClick={() => handleToggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={`services-faq-answer-${index}`}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-accent"
                >
                  <span className="text-[0.9375rem] font-semibold text-text leading-snug">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-text-muted transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>

                {/* Answer (collapsible) */}
                <div
                  id={`services-faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`services-faq-question-${index}`}
                  className={`grid transition-all duration-200 ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="pb-5">
                      <p className="text-sm text-text-muted leading-relaxed">
                        {item.answer}
                      </p>
                      {item.cta && (
                        <div className="mt-4">
                          <Button
                            size="standard"
                            variant="primary"
                            href={item.cta.href}
                          >
                            {item.cta.label}
                            <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
