'use client';

import { Home, ArrowRight, Target, Eye, User, Building2, Globe, HeartHandshake, Landmark } from 'lucide-react';
import { Breadcrumb } from '@/exxonim/components/Breadcrumb';
import { Button } from '@/exxonim/components/primitives/Button';
import { UnifiedCtaSection } from '@/exxonim/components/UnifiedCtaSection';
import { routes } from '@/exxonim/routes';
import { usePage } from '@/exxonim/hooks/usePage';
import { useResolvedPageSeo } from '@/exxonim/hooks/useResolvedSeo';
import { StructuredData } from '@/exxonim/components/StructuredData';
import type { AboutPageContent } from '@/exxonim/types';

/* Icon map for "Who we serve" - unique icon per audience type */
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
      <div className="max-w-[1240px] px-4 sm:px-6 lg:px-8 mx-auto pt-4">
        <Breadcrumb items={[{ label: 'Home', href: routes.home, icon: Home }, { label: 'About' }]} />
      </div>

      {/* ──────────────────────────────────────────────────────────────
       *  SECTION 1: Hero - centered, no shadow, no gradient panel.
       *  Clean open text, centered to fill the width without empty space.
       * ────────────────────────────────────────────────────────────── */}
      <section
        className="relative pt-10 pb-14 md:pt-16 md:pb-20"
        aria-labelledby="about-hero-title"
      >
        <div className="max-w-[1240px] px-4 sm:px-6 lg:px-8 mx-auto text-center flex flex-col items-center" data-reveal>
          <p className="m-0 mb-5 text-[0.78rem] font-extrabold tracking-[0.16em] uppercase text-accent">
            {content.hero?.eyebrow}
          </p>
          <h1
            id="about-hero-title"
            className="m-0 text-[clamp(1.9rem,4.5vw,3.6rem)] leading-[1.08] tracking-[-0.03em] text-text font-semibold max-w-[20ch]"
          >
            {content.hero.title}
          </h1>
          <p className="text-base md:text-lg leading-relaxed text-text-muted mt-6 md:mt-8 max-w-[58ch]">
            {content.hero.description}
          </p>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
       *  SECTION 2: Who we serve - compact inline pills.
       *  Not a card grid - a tight strip of icon-pills.
       *  Mobile: horizontal scroll. Desktop: 5-col flow.
       *  Each item is compact: icon + label only, description is subtle.
       * ────────────────────────────────────────────────────────────── */}
      {audiences.length > 0 && (
        <section
          className="py-10 md:py-14 bg-surface-soft/30"
          aria-labelledby="about-audiences-title"
        >
          <div className="max-w-[1240px] px-4 sm:px-6 lg:px-8 mx-auto">
            <div className="mb-6 md:mb-8 text-center" data-reveal>
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-accent mb-2">
                Who we serve
              </p>
              <h2
                id="about-audiences-title"
                className="text-[clamp(1.4rem,2.8vw,2rem)] font-semibold leading-tight tracking-tight text-text"
              >
                Organisations of every size and type.
              </h2>
            </div>

            {/* Compact pill strip - mobile: scroll, desktop: 5-col */}
            <div
              className="flex gap-2.5 overflow-x-auto pb-2 md:pb-0 md:grid md:grid-cols-5 md:gap-3 snap-x snap-mandatory [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] md:[mask-image:none]"
              style={{ scrollbarWidth: 'none' }}
            >
              {audiences.map((audience, i) => {
                const Icon = AUDIENCE_ICONS[i % AUDIENCE_ICONS.length];
                return (
                  <div
                    key={i}
                    className="group snap-start flex-none w-36 md:w-auto flex flex-col items-center text-center gap-2 p-4 rounded-2xl bg-surface border border-border-soft/50 transition-transform duration-300 hover:border-accent/40 hover:-translate-y-0.5"
                    data-reveal
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent text-accent-contrast transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <p className="text-sm font-bold text-text leading-tight">
                      {audience.label}
                    </p>
                    <p className="text-[0.7rem] text-text-muted leading-relaxed">
                      {audience.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ──────────────────────────────────────────────────────────────
       *  SECTION 3: Mission & Vision - open split, large text.
       *  No boxes, no borders. Just large text with a vertical divider.
       *  Accent icon circles. Feels like an editorial quote spread.
       * ────────────────────────────────────────────────────────────── */}
      {mv && (
        <section
          className="py-14 md:py-24"
          aria-labelledby="about-mv-title"
        >
          <div className="max-w-[1240px] px-4 sm:px-6 lg:px-8 mx-auto">
            <div className="mb-10 md:mb-14 text-center" data-reveal>
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-accent mb-2">
                What drives us
              </p>
              <h2
                id="about-mv-title"
                className="text-[clamp(1.5rem,3vw,2.4rem)] font-semibold leading-tight tracking-tight text-text"
              >
                Mission &amp; Vision
              </h2>
            </div>

            {/* Open split - no boxes, no borders, just a divider line */}
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-0">
              {/* Mission */}
              <div className="pr-0 md:pr-12 lg:pr-16 pb-12 md:pb-0" data-reveal>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent text-accent-contrast">
                    <Target className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-accent">
                    Mission
                  </p>
                </div>
                <p className="text-xl md:text-2xl lg:text-[1.75rem] text-text leading-[1.4] font-medium tracking-tight">
                  {mv.mission}
                </p>
              </div>

              {/* Vertical divider + Vision */}
              <div className="pl-0 md:pl-12 lg:pl-16 pt-12 md:pt-0 relative">
                {/* Mobile: horizontal divider on top */}
                <div className="md:hidden absolute top-0 left-0 right-0 h-px bg-border-soft" />
                {/* Desktop: vertical divider on left */}
                <div className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-border-soft" />
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent text-accent-contrast">
                    <Eye className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-accent">
                    Vision
                  </p>
                </div>
                <p className="text-xl md:text-2xl lg:text-[1.75rem] text-text leading-[1.4] font-medium tracking-tight">
                  {mv.vision}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ──────────────────────────────────────────────────────────────
       *  SECTION 4: What sets us apart - vertical timeline.
       *  Filled accent number circles on a connecting line.
       *  Large title + description to the right.
       * ────────────────────────────────────────────────────────────── */}
      {differentiators.length > 0 && (
        <section
          className="py-14 md:py-24 bg-surface-soft/30"
          aria-labelledby="about-diff-title"
        >
          <div className="max-w-[1240px] px-4 sm:px-6 lg:px-8 mx-auto">
            <div className="mb-10 md:mb-14 text-center max-w-2xl mx-auto" data-reveal>
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-accent mb-2">
                What sets us apart
              </p>
              <h2
                id="about-diff-title"
                className="text-[clamp(1.5rem,3vw,2.4rem)] font-semibold leading-tight tracking-tight text-text"
              >
                Why organisations choose Exxonim.
              </h2>
            </div>

            {/* Vertical timeline with filled accent circles */}
            <div className="relative max-w-2xl mx-auto">
              {/* The connecting vertical line */}
              <div className="absolute left-6 top-3 bottom-3 w-0.5 bg-gradient-to-b from-accent via-accent/30 to-transparent" />

              <div className="flex flex-col gap-8 md:gap-12">
                {differentiators.map((diff, i) => (
                  <div
                    key={i}
                    className="relative pl-20 flex flex-col gap-2"
                    data-reveal
                  >
                    {/* Filled accent circle on the line */}
                    <div className="absolute left-0 top-0 flex items-center justify-center w-12 h-12 rounded-full bg-accent text-accent-contrast text-base font-bold tabular-nums shadow-lg shadow-accent/20">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-text leading-tight pt-1.5">
                      {diff.title}
                    </h3>
                    <p className="text-sm md:text-base text-text-muted leading-relaxed">
                      {diff.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ──────────────────────────────────────────────────────────────
       *  SECTION 5: CTA — unified teal banner.
       * ────────────────────────────────────────────────────────────── */}
      <UnifiedCtaSection
        ariaLabel="Get started with Exxonim"
        heading={content.cta.title}
        description={content.cta.description}
      >
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <Button size="standard" variant="inverse" href={content.cta.primary.href}>
            {content.cta.primary.label}
            <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
          </Button>
          <Button size="standard" variant="inverseOutline" href={content.cta.secondary.href}>
            {content.cta.secondary.label}
          </Button>
        </div>
      </UnifiedCtaSection>
    </>
  );
}
