'use client';

import { Frown, FileQuestion, Clock, type LucideIcon } from 'lucide-react';
import type { ProblemFramingItem } from '@/exxonim/types';

/* ─────────────────────────────────────────────────────────────────────────────
 * ProblemFramingSection — Pain-point cards that visitors relate to before
 * seeing the services section.
 *
 * Displays 3 cards with iconic frustrations, italicized quotes, and
 * descriptions. Ends with a transition line leading into the services.
 *
 * BACKEND / ADMIN INTEGRATION NOTES:
 * ──────────────────────────────────
 * Content comes from page.content.problem_framing (ProblemFramingItem[]).
 * Each item: { icon: string, quote: string, description: string }
 * The `icon` field maps to Lucide icons: "frustrated" → Frown,
 * "documents" → FileQuestion, "clock" → Clock.
 * ──────────────────────────────────────────────────────────────────────────── */

/** Map icon string keys to Lucide icon components */
const iconMap: Record<string, LucideIcon> = {
  frustrated: Frown,
  documents: FileQuestion,
  clock: Clock,
};

interface ProblemFramingSectionProps {
  items: ProblemFramingItem[];
}

export function ProblemFramingSection({ items }: ProblemFramingSectionProps) {
  return (
    <section
      aria-labelledby="problem-framing-title"
      className="py-16 md:py-24"
    >
      <div className="w-[min(1240px,calc(100%-2rem))] mx-auto">
        {/* ─── Section Header ─── */}
        <div className="grid gap-3 mb-10 md:mb-14 text-center max-w-[min(52ch,90%)] mx-auto" data-reveal>
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-accent">
            Sound familiar?
          </p>
          <h2
            id="problem-framing-title"
            className="text-[clamp(1.8rem,3.2vw,2.6rem)] font-semibold leading-tight tracking-tight text-text"
          >
            Running a business in Tanzania shouldn&apos;t mean chasing offices
          </h2>
          <p className="text-text-muted text-sm leading-relaxed">
            These frustrations are common — but they don&apos;t have to be your normal.
          </p>
        </div>

        {/* ─── Pain-Point Cards Grid ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {items.map((item, index) => {
            const IconComponent = iconMap[item.icon] ?? Frown;
            return (
              <article
                key={index}
                className="rounded-[1.35rem] border border-border-soft bg-surface/88 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30"
                data-reveal
              >
                {/* Icon in a circle */}
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent-soft text-accent mb-4">
                  <IconComponent className="h-5 w-5" aria-hidden="true" />
                </div>

                {/* Italicized quote */}
                <p className="italic text-text-muted leading-relaxed">
                  &ldquo;{item.quote}&rdquo;
                </p>

                {/* Description */}
                <p className="mt-2.5 text-text-muted text-sm leading-relaxed">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>

        {/* ─── Transition Line ─── */}
        <p className="mt-10 md:mt-14 text-center text-accent font-semibold" data-reveal>
          Exxonim eliminates the chaos. Here&apos;s how:
        </p>
      </div>
    </section>
  );
}
