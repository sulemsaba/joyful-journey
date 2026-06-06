"use client";

import { useState, useCallback } from "react";
import { Breadcrumb } from "@/exxonim/components/Breadcrumb";
import { Button } from "@/exxonim/components/primitives/Button";
import { LoadBoundary } from "@/exxonim/components/LoadBoundary";
import { NewsletterSection } from "@/exxonim/components/NewsletterSection";
import { usePage } from "@/exxonim/hooks/usePage";
import { useResolvedPageSeo } from "@/exxonim/hooks/useResolvedSeo";
import { routes } from "@/exxonim/routes";
import { Home } from "lucide-react";
import type { FaqPageContent } from '@/exxonim/types';

/* ═══════════════════════════════════════════════════════════════
 * FaqStructuredData — JSON-LD for Google rich results
 * ═══════════════════════════════════════════════════════════════ */
function FaqStructuredData({ items }: { items: Array<{ question: string; answer: string }> }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════
 * FaqAccordionItem — single expandable FAQ item
 *
 * Design: Clean card with + / × toggle, smooth height animation,
 * and a subtle accent line on the left when expanded.
 * ═══════════════════════════════════════════════════════════════ */
function FaqAccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={cn(
        "group rounded-2xl border transition-all duration-300",
        isOpen
          ? "border-border-strong bg-surface shadow-sm"
          : "border-border-soft bg-surface/40 hover:border-border-strong hover:bg-surface/70"
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer"
        aria-expanded={isOpen}
      >
        <h3
          className={cn(
            "text-[0.9375rem] sm:text-base leading-snug transition-colors duration-200",
            isOpen ? "font-semibold text-text" : "font-medium text-text-muted group-hover:text-text"
          )}
        >
          {question}
        </h3>
        <span
          className={cn(
            "flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300",
            isOpen
              ? "bg-accent text-accent-contrast rotate-0"
              : "bg-accent-soft text-accent group-hover:bg-accent group-hover:text-accent-contrast"
          )}
          aria-hidden="true"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="transition-transform duration-300"
            style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
          >
            <line x1="7" y1="1" x2="7" y2="13" />
            <line x1="1" y1="7" x2="13" y2="7" />
          </svg>
        </span>
      </button>

      {/* Expandable answer */}
      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
            <div className="h-px bg-border-soft mb-4" />
            <p className="text-sm sm:text-[0.9375rem] leading-relaxed text-text-muted">
              {answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Utility — merge class names */
function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

/* ═══════════════════════════════════════════════════════════════
 * FaqPage — Full page with hero, accordion, and CTA
 * ═══════════════════════════════════════════════════════════════ */
export function FaqPage() {
  const { data: page, isPending, error } = usePage<FaqPageContent>("faq");
  useResolvedPageSeo(page, routes.faq);

  const content = page?.content;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <LoadBoundary
      error={error}
      errorDetail="The FAQ content could not be loaded right now."
      errorTitle="Unable to load the FAQ."
      isPending={isPending}
      isReady={Boolean(content)}
      loadingLabel="Loading FAQ..."
    >
      {() => {
        if (!content) return null;
        return (
          <>
            <FaqStructuredData items={content.items} />

            {/* ─── Hero Section ─── */}
            <section className="relative pt-4 md:pt-8 pb-0">
              <div className="w-[min(1240px,calc(100%-2rem))] mx-auto px-4 sm:px-6 lg:px-8 pt-4">
                <Breadcrumb items={[{ label: "Home", href: routes.home, icon: Home }, { label: "Resources", href: routes.resources }, { label: "FAQ" }]} />
              </div>

              <div className="w-[min(1240px,calc(100%-2rem))] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20" data-reveal>
                <div className="max-w-2xl">
                  <p className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-soft text-[0.7rem] font-extrabold uppercase tracking-[0.14em] text-accent mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {content.hero.eyebrow}
                  </p>
                  <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-bold tracking-tight text-text leading-[1.1]">
                    {content.hero.title}
                  </h1>
                  <p className="mt-5 text-base sm:text-lg text-text-muted leading-relaxed max-w-xl">
                    {content.hero.description}
                  </p>
                </div>
              </div>
            </section>

            {/* ─── FAQ Accordion Section ─── */}
            <section className="pb-16 md:pb-24">
              <div className="w-[min(1240px,calc(100%-2rem))] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-16">
                  {/* ─── Left Sidebar (desktop) ─── */}
                  <aside className="hidden lg:block">
                    <div className="sticky top-28">
                      <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-accent mb-4">
                        Topics
                      </p>
                      <nav className="flex flex-col gap-1" aria-label="FAQ categories">
                        <span className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-accent-soft text-sm font-semibold text-accent">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                          General questions
                        </span>
                      </nav>

                      {/* Contact CTA in sidebar */}
                      <div className="mt-10 p-5 rounded-2xl bg-accent/5 border border-accent-soft">
                        <p className="text-sm font-semibold text-text mb-2">
                          Can&apos;t find your answer?
                        </p>
                        <p className="text-xs text-text-muted mb-4 leading-relaxed">
                          Reach out to our team and we&apos;ll get back to you within one business day.
                        </p>
                        <Button size="compact" variant="primary" href={routes.contact}>
                          Contact Exxonim
                        </Button>
                      </div>
                    </div>
                  </aside>

                  {/* ─── Mobile: Contact CTA ─── */}
                  <div className="lg:hidden mb-8 p-4 rounded-2xl bg-accent/5 border border-accent-soft">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-text">
                          Can&apos;t find your answer?
                        </p>
                        <p className="text-xs text-text-muted mt-0.5">
                          Our team responds within one business day.
                        </p>
                      </div>
                      <Button size="compact" variant="primary" href={routes.contact} className="shrink-0">
                        Contact us
                      </Button>
                    </div>
                  </div>

                  {/* ─── FAQ Accordion List ─── */}
                  <div className="flex flex-col gap-3">
                    {/* Mobile category label */}
                    <p className="lg:hidden text-xs font-extrabold uppercase tracking-[0.14em] text-accent mb-2">
                      General questions
                    </p>

                    {content.items.map((item, index) => (
                      <FaqAccordionItem
                        key={item.question}
                        question={item.question}
                        answer={item.answer}
                        isOpen={openIndex === index}
                        onToggle={() => handleToggle(index)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ─── Newsletter / Still have questions ─── */}
            <section className="pb-16 md:pb-24">
              <div className="w-[min(1240px,calc(100%-2rem))] mx-auto px-4 sm:px-6 lg:px-8">
                <NewsletterSection
                  heading="Still have questions?"
                  description="Get answers to new compliance questions delivered to your inbox as we publish them. No spam — just what matters for your business in Tanzania."
                />
              </div>
            </section>
          </>
        );
      }}
    </LoadBoundary>
  );
}
