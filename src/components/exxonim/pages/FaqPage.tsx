"use client";

import { fallbackFaqPage } from "@/lib/exxonim-data";
import type { FaqPageContent } from "@/lib/exxonim-types";
import { cn } from "@/lib/cn";
import { Container } from "@/components/exxonim/Container";
import { routes } from "@/lib/exxonim-router";
import { HelpCircle } from "lucide-react";

export function FaqPage() {
  const content: FaqPageContent = fallbackFaqPage.content;
  const { hero, items } = content;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-12 md:py-20">
        {/* Hero */}
        <section className="mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-accent mb-4">
            <span className="inline-block h-px w-5 bg-accent" />
            {hero.eyebrow}
          </span>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-text mb-4">
            {hero.title}
          </h1>
          <p className="text-lg text-text-muted max-w-2xl leading-relaxed">
            {hero.description}
          </p>
        </section>

        {/* FAQ Grid */}
        {items && items.length > 0 && (
          <section className="grid gap-4 md:grid-cols-2">
            {items.map((item, i) => (
              <div
                key={i}
                className="flex flex-col gap-3 rounded-2xl border border-border-soft bg-surface p-6 shadow-card transition-all hover:border-border-strong"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent mt-0.5">
                    <HelpCircle className="h-4 w-4" />
                  </div>
                  <h3 className="text-base font-semibold text-text leading-snug">
                    {item.question}
                  </h3>
                </div>
                <p className="text-sm text-text-muted leading-relaxed pl-11">
                  {item.answer}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* Still have questions CTA */}
        <section className="mt-12 md:mt-16 text-center">
          <div className="rounded-2xl border border-border-soft bg-surface-soft p-8 md:p-10">
            <h3 className="text-xl font-semibold text-text mb-2">
              Still have questions?
            </h3>
            <p className="text-text-muted max-w-md mx-auto mb-6">
              Our team is happy to help. Get in touch and we&apos;ll provide the answers you need.
            </p>
            <a
              href={routes.contact}
              className="inline-flex h-11 items-center justify-center rounded-full bg-accent px-6 text-sm font-extrabold text-accent-contrast hover:bg-accent-hover transition-all hover:-translate-y-0.5"
            >
              Contact Us
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
