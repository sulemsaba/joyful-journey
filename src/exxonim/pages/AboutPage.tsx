'use client';

import { Home, ArrowRight, Target, Eye, Globe, Compass } from 'lucide-react';
import { Breadcrumb } from '@/exxonim/components/Breadcrumb';
import { Button } from '@/exxonim/components/primitives/Button';
import { routes } from '@/exxonim/routes';
import { usePage } from '@/exxonim/hooks/usePage';
import { useResolvedPageSeo } from '@/exxonim/hooks/useResolvedSeo';
import { StructuredData } from '@/exxonim/components/StructuredData';
import type { AboutPageContent } from '@/exxonim/types';

/**
 * About page — minimal design.
 * Only 3 sections: About Us (hero), Mission/Vision (local + global), CTA.
 * No team, no founding year, no service scope, no process, no testimonials.
 * Those live on the Home and Services pages.
 */
export function AboutPage() {
  const { data: page } = usePage<AboutPageContent>('about');
  useResolvedPageSeo(page, routes.about);
  const content = page?.content;

  if (!content) return null;

  const mv = content.mission_vision;

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
       *  SECTION 1: About Us — Hero
       *  One bold statement + one supporting paragraph.
       *  No photos, no stats (those are on home page).
       * ────────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden pt-4 pb-12 md:pt-8 md:pb-20"
        aria-labelledby="about-hero-title"
      >
        <div className="w-[min(1240px,calc(100%-2rem))] mx-auto relative z-10">
          <article
            className="rounded-2xl md:rounded-[2rem] p-6 md:p-12 lg:p-16 border border-border-soft bg-surface"
            data-reveal
          >
            <p className="m-0 mb-4 text-[0.78rem] font-extrabold tracking-[0.16em] uppercase text-text-soft">
              {content.hero.eyebrow}
            </p>
            <h1
              id="about-hero-title"
              className="m-0 text-[clamp(1.9rem,4.5vw,3.4rem)] leading-[1.05] tracking-[-0.03em] text-text font-semibold max-w-[20ch]"
            >
              {content.hero.title}
            </h1>
            <p className="text-base md:text-lg leading-relaxed text-text-muted mt-5 md:mt-6 max-w-[58ch]">
              {content.hero.description}
            </p>
          </article>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
       *  SECTION 2: Mission & Vision
       *  4 cards: Mission | Vision | Global Mission | Global Vision
       *  Clean grid, minimal words, each card answers one question.
       * ────────────────────────────────────────────────────────────── */}
      {mv && (
        <section
          className="py-10 md:py-16"
          aria-labelledby="about-mv-title"
        >
          <div className="w-[min(1240px,calc(100%-2rem))] mx-auto">
            {/* Section header */}
            <div className="text-center max-w-[min(52ch,90%)] mx-auto mb-8 md:mb-14" data-reveal>
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

            {/* 4 cards — 2x2 on tablet, 4-col on desktop, stacked on mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {/* Mission */}
              <article
                className="rounded-2xl md:rounded-[1.5rem] border border-border-soft bg-surface p-5 md:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30"
                data-reveal
              >
                <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-accent-soft text-accent mb-4">
                  <Target className="h-5 w-5" aria-hidden="true" />
                </div>
                <p className="text-[0.7rem] font-extrabold uppercase tracking-[0.14em] text-text-soft mb-2">
                  Mission
                </p>
                <p className="text-sm text-text leading-relaxed">
                  {mv.mission}
                </p>
              </article>

              {/* Vision */}
              <article
                className="rounded-2xl md:rounded-[1.5rem] border border-border-soft bg-surface p-5 md:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30"
                data-reveal
              >
                <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-accent-soft text-accent mb-4">
                  <Eye className="h-5 w-5" aria-hidden="true" />
                </div>
                <p className="text-[0.7rem] font-extrabold uppercase tracking-[0.14em] text-text-soft mb-2">
                  Vision
                </p>
                <p className="text-sm text-text leading-relaxed">
                  {mv.vision}
                </p>
              </article>

              {/* Global Mission */}
              <article
                className="rounded-2xl md:rounded-[1.5rem] border border-border-soft bg-surface p-5 md:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30"
                data-reveal
              >
                <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-accent-soft text-accent mb-4">
                  <Compass className="h-5 w-5" aria-hidden="true" />
                </div>
                <p className="text-[0.7rem] font-extrabold uppercase tracking-[0.14em] text-text-soft mb-2">
                  Global Mission
                </p>
                <p className="text-sm text-text leading-relaxed">
                  {mv.global_mission}
                </p>
              </article>

              {/* Global Vision */}
              <article
                className="rounded-2xl md:rounded-[1.5rem] border border-border-soft bg-surface p-5 md:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30"
                data-reveal
              >
                <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-accent-soft text-accent mb-4">
                  <Globe className="h-5 w-5" aria-hidden="true" />
                </div>
                <p className="text-[0.7rem] font-extrabold uppercase tracking-[0.14em] text-text-soft mb-2">
                  Global Vision
                </p>
                <p className="text-sm text-text leading-relaxed">
                  {mv.global_vision}
                </p>
              </article>
            </div>
          </div>
        </section>
      )}

      {/* ──────────────────────────────────────────────────────────────
       *  SECTION 3: CTA
       * ────────────────────────────────────────────────────────────── */}
      <section
        className="py-10 md:py-20"
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
