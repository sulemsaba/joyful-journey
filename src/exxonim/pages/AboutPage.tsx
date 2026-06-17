'use client';

import { Home, ArrowRight, Target, Eye, User, Building2, Globe, HeartHandshake, Landmark } from 'lucide-react';
import { Breadcrumb } from '@/exxonim/components/Breadcrumb';
import { Button } from '@/exxonim/components/primitives/Button';
import { routes } from '@/exxonim/routes';
import { usePage } from '@/exxonim/hooks/usePage';
import { useResolvedPageSeo } from '@/exxonim/hooks/useResolvedSeo';
import { StructuredData } from '@/exxonim/components/StructuredData';
import type { AboutPageContent } from '@/exxonim/types';

/* Icon map for "Who we serve" — unique icon per audience type */
const AUDIENCE_ICONS = [User, Building2, Globe, HeartHandshake, Landmark];

export function AboutPage() {
  const { data: page } = usePage<AboutPageContent>('about');
  useResolvedPageSeo(page, routes.about);
  const content = page?.content;

  if (!content) return null;

  const mv = content.mission_vision;
  const audiences = content.who_we_serve ?? [];
  const differentiators = content.differentiators ?? [];

  return (
    <>
      <StructuredData
        heroTitle={content.hero.title}
        heroDescription={content.hero.description}
        breadcrumbs={[{ name: 'About', path: routes.about }]}
      />

      {/* Breadcrumb */}
      <div className="w-[min(1240px,calc(100%-2rem))] mx-auto">
        <Breadcrumb items={[{ label: 'Home', href: routes.home, icon: Home }, { label: 'About' }]} />
      </div>

      {/* ──────────────────────────────────────────────────────────────
       *  SECTION 1: Hero — open, no card. Clean text on page background.
       * ────────────────────────────────────────────────────────────── */}
      <section
        className="relative pt-8 pb-12 md:pt-16 md:pb-24"
        aria-labelledby="about-hero-title"
      >
        <div className="w-[min(1240px,calc(100%-2rem))] mx-auto" data-reveal>
          <p className="m-0 mb-5 text-[0.78rem] font-extrabold tracking-[0.16em] uppercase text-accent">
            {content.hero.eyebrow}
          </p>
          <h1
            id="about-hero-title"
            className="m-0 text-[clamp(1.9rem,4.5vw,3.6rem)] leading-[1.08] tracking-[-0.03em] text-text font-semibold max-w-[18ch]"
          >
            {content.hero.title}
          </h1>
          <p className="text-base md:text-lg leading-relaxed text-text-muted mt-6 md:mt-8 max-w-[58ch]">
            {content.hero.description}
          </p>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
       *  SECTION 2: Who we serve — creative icon grid, NO boxes.
       *  5 audience types in an open grid with large icons + labels.
       *  Unique editorial feel, not card-based.
       * ────────────────────────────────────────────────────────────── */}
      {audiences.length > 0 && (
        <section
          className="py-12 md:py-20 border-t border-border-soft"
          aria-labelledby="about-audiences-title"
        >
          <div className="w-[min(1240px,calc(100%-2rem))] mx-auto">
            <div className="mb-10 md:mb-14" data-reveal>
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-accent mb-3">
                Who we serve
              </p>
              <h2
                id="about-audiences-title"
                className="text-[clamp(1.6rem,3.2vw,2.6rem)] font-semibold leading-tight tracking-tight text-text max-w-[20ch]"
              >
                We work with organisations of every size and type.
              </h2>
            </div>

            {/* Open icon grid — no cards, no borders. Just icons + text. */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-8 md:gap-y-10">
              {audiences.map((audience, i) => {
                const Icon = AUDIENCE_ICONS[i % AUDIENCE_ICONS.length];
                return (
                  <div
                    key={i}
                    className="group flex flex-col items-start gap-3"
                    data-reveal
                  >
                    <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-accent-soft text-accent transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-accent-contrast">
                      <Icon className="h-6 w-6 md:h-7 md:w-7" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm md:text-base font-bold text-text leading-tight">
                        {audience.label}
                      </p>
                      <p className="text-xs md:text-sm text-text-muted leading-relaxed mt-1">
                        {audience.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ──────────────────────────────────────────────────────────────
       *  SECTION 3: Mission & Vision — boxed side-by-side columns.
       *  Desktop: 2-col. Mobile: stacked. Boxes make sense here.
       * ────────────────────────────────────────────────────────────── */}
      {mv && (
        <section
          className="py-12 md:py-20 border-t border-border-soft"
          aria-labelledby="about-mv-title"
        >
          <div className="w-[min(1240px,calc(100%-2rem))] mx-auto">
            <div className="mb-10 md:mb-14" data-reveal>
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-accent mb-3">
                What drives us
              </p>
              <h2
                id="about-mv-title"
                className="text-[clamp(1.6rem,3.2vw,2.6rem)] font-semibold leading-tight tracking-tight text-text"
              >
                Mission &amp; Vision
              </h2>
            </div>

            {/* 2 boxed columns — side-by-side on desktop, stacked on mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <article
                className="rounded-2xl md:rounded-[1.5rem] border border-border-soft bg-surface p-6 md:p-8 lg:p-10 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30"
                data-reveal
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-accent-soft text-accent">
                    <Target className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-text-soft">
                    Mission
                  </p>
                </div>
                <p className="text-base md:text-lg text-text leading-relaxed">
                  {mv.mission}
                </p>
              </article>

              <article
                className="rounded-2xl md:rounded-[1.5rem] border border-border-soft bg-surface p-6 md:p-8 lg:p-10 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30"
                data-reveal
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-accent-soft text-accent">
                    <Eye className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-text-soft">
                    Vision
                  </p>
                </div>
                <p className="text-base md:text-lg text-text leading-relaxed">
                  {mv.vision}
                </p>
              </article>
            </div>
          </div>
        </section>
      )}

      {/* ──────────────────────────────────────────────────────────────
       *  SECTION 4: What sets us apart — open numbered list, NO boxes.
       *  Editorial feel: large numbers + bold titles + short text.
       * ────────────────────────────────────────────────────────────── */}
      {differentiators.length > 0 && (
        <section
          className="py-12 md:py-20 border-t border-border-soft"
          aria-labelledby="about-diff-title"
        >
          <div className="w-[min(1240px,calc(100%-2rem))] mx-auto">
            <div className="mb-10 md:mb-14" data-reveal>
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-accent mb-3">
                What sets us apart
              </p>
              <h2
                id="about-diff-title"
                className="text-[clamp(1.6rem,3.2vw,2.6rem)] font-semibold leading-tight tracking-tight text-text"
              >
                Why organisations choose Exxonim.
              </h2>
            </div>

            {/* Open numbered list — no cards, no borders */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {differentiators.map((diff, i) => (
                <div key={i} className="flex flex-col gap-3" data-reveal>
                  <span className="text-[clamp(2.5rem,5vw,3.5rem)] font-bold leading-none text-accent/30 tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-text leading-tight">
                    {diff.title}
                  </h3>
                  <p className="text-sm md:text-base text-text-muted leading-relaxed">
                    {diff.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ──────────────────────────────────────────────────────────────
       *  SECTION 5: CTA — the one card element. Accent gradient.
       * ────────────────────────────────────────────────────────────── */}
      <section
        className="py-12 md:py-20"
        aria-labelledby="about-cta-title"
      >
        <div className="w-[min(1240px,calc(100%-2rem))] mx-auto">
          <div
            className="max-w-[42rem] mx-auto rounded-2xl md:rounded-[2rem] border border-border-soft bg-surface-elevated p-6 md:p-12 text-center"
            style={{
              background:
                'radial-gradient(80% 100% at 50% 0%, var(--color-accent-gradient-subtle), transparent 70%), var(--color-surface-elevated)',
            }}
            data-reveal
          >
            <h2
              id="about-cta-title"
              className="text-[clamp(1.8rem,3.2vw,2.6rem)] font-semibold leading-tight tracking-tight text-text"
            >
              {content.cta.title}
            </h2>
            <p className="mt-3 text-text-muted text-sm leading-relaxed max-w-[min(48ch,90%)] mx-auto">
              {content.cta.description}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button size="standard" variant="primary" href={content.cta.primary.href}>
                {content.cta.primary.label}
                <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
              </Button>
              <Button size="standard" variant="secondary" href={content.cta.secondary.href}>
                {content.cta.secondary.label}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
