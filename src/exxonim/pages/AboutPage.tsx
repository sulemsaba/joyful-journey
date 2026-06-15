'use client';

import { Home, ArrowRight, CheckCircle, Clock, ShieldCheck, Target, Users, Eye, Star } from 'lucide-react';
import { Breadcrumb } from '@/exxonim/components/Breadcrumb';
import { Button } from '@/exxonim/components/primitives/Button';
import { SmartLink } from '@/exxonim/components/primitives/SmartLink';
import { routes } from '@/exxonim/routes';
import { usePage } from '@/exxonim/hooks/usePage';
import { useResolvedPageSeo } from '@/exxonim/hooks/useResolvedSeo';
import { StructuredData } from '@/exxonim/components/StructuredData';
import type { AboutPageContent } from '@/exxonim/types';

/* ── Google logo SVG (official 4-color) ──────────────────────── */
function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

/* ── Icon map for support profiles ───────────────────── */
const profileIcons: Record<string, React.ReactNode> = {
  'Business setup': <ShieldCheck className="h-5 w-5" />,
  'Compliance': <CheckCircle className="h-5 w-5" />,
  'Consultation tracking': <Eye className="h-5 w-5" />,
};

/**
 * About page — instant rendering, no full-page loader.
 * usePage guarantees fallback data (data: query.data ?? fallback).
 */
export function AboutPage() {
  const { data: page } = usePage<AboutPageContent>('about');
  useResolvedPageSeo(page, routes.about);
  const content = page?.content;

  /* ─────────────────────────────────────────────────────────────────────────────
   * GOOGLE REVIEW DATA
   * ────────────────────────────────────────────
   * The review count below is currently hardcoded.
   * BACKEND INTEGRATION: Replace this with a live value fetched from
   * Google Business Profile API (or your backend proxy endpoint).
   * Suggested API: GET /api/v1/google-reviews/stats
   * Response shape: { rating: number, review_count: number }
   * When integrated, replace the hardcoded number with the API value.
   * ──────────────────────────────────────────────────────────────────────────── */
  const GOOGLE_REVIEW_RATING = 4.9;
  // REVIEW_COUNT: Hardcoded fallback — replace with API value on integration.
  // Example: const REVIEW_COUNT = googleReviewData?.review_count ?? 58;
  const REVIEW_COUNT = 58;

  if (!content) return null;

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
             *  SECTION 1: Hero — clean headline + Google review panel
             *  No gradients, no blur circles, no accent-contrast panels.
             *  Clean surface/82 cards with border-soft — matches services page.
             * ────────────────────────────────────────────────────────────── */}
            <section
              className="relative overflow-hidden pt-4 pb-12 md:pt-6 md:pb-20"
              aria-labelledby="about-hero-title"
            >
              <div className="w-[min(1240px,calc(100%-2rem))] mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-4 md:gap-5 items-start">
                  {/* Left — benefit headline + CTA */}
                  <article
                    className="rounded-2xl md:rounded-[2rem] p-5 md:p-8 border border-border-soft bg-surface"
                    data-reveal
                  >
                    <p className="m-0 mb-3 text-[0.78rem] font-extrabold tracking-[0.16em] uppercase text-text-soft">
                      {content.hero.eyebrow}
                    </p>
                    <h1
                      id="about-hero-title"
                      className="m-0 text-[clamp(1.9rem,4.2vw,3.2rem)] leading-[1.02] tracking-[-0.03em] text-text font-semibold"
                    >
                      {content.hero.title}
                    </h1>
                    <p className="text-base leading-relaxed text-text-muted mt-4">
                      {content.hero.description}
                    </p>

                    {/* Single primary CTA */}
                    <div className="mt-5 md:mt-6">
                      <Button size="standard" variant="primary" href={routes.contact}>
                        Book a Free Consultation
                        <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
                      </Button>
                    </div>

                    {/* "No office visits" trust signal under CTA */}
                    <div className="inline-flex items-center gap-2 mt-4 px-3 py-1.5 rounded-full bg-accent-soft/60 text-accent text-xs font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                      No office visits required
                    </div>
                  </article>

                  {/* Right — Google review panel + key stats */}
                  <div className="grid gap-4 md:gap-5">
                    {/* Google review trust panel */}
                    <aside
                      className="rounded-2xl md:rounded-[1.5rem] p-5 md:p-6 border border-border-soft bg-surface"
                      data-reveal
                    >
                      {/* Google branding row */}
                      <div className="flex items-center gap-2.5 mb-3">
                        <GoogleLogo className="h-5 w-5 flex-shrink-0" />
                        <span className="text-sm font-semibold text-text">
                          Google Reviews
                        </span>
                      </div>

                      {/* Rating + stars + count */}
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl font-bold text-text leading-none">
                          {GOOGLE_REVIEW_RATING}
                        </span>
                        <div className="flex flex-col gap-0.5">
                          <span className="flex items-center gap-0.5 text-star leading-none">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                            ))}
                          </span>
                          {/* REVIEW_COUNT: This "+N" display is sourced from the hardcoded
                              REVIEW_COUNT constant above. When integrating with Google
                              Business Profile API, this will auto-update from the live data.
                              API suggestion: GET /api/v1/google-reviews/stats → { review_count } */}
                          <span className="text-xs text-text-muted">
                            {REVIEW_COUNT}+ reviews
                          </span>
                        </div>
                      </div>

                      {/* Selling word — trust headline */}
                      <p className="text-sm font-semibold text-text leading-snug">
                        Trusted by businesses across Tanzania
                      </p>
                      <p className="text-xs text-text-muted mt-1 leading-relaxed">
                        Real reviews from real clients on Google
                      </p>

                      {/* CTA to see reviews */}
                      <a
                        href="https://www.google.com/search?q=Exxonim+Consult+reviews"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
                      >
                        See all reviews
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                    </aside>

                    {/* Key company stats */}
                    <aside
                      className="rounded-2xl md:rounded-[1.5rem] p-5 md:p-6 border border-border-soft bg-surface"
                      data-reveal
                    >
                      <p className="text-sm font-semibold text-text mb-3 md:mb-4">
                        Why clients choose Exxonim
                      </p>
                      <div className="grid gap-2.5 md:gap-3">
                        <div className="flex items-center gap-3 px-3 py-2.5 md:px-3.5 md:py-3 rounded-xl bg-accent-soft/40">
                          <span className="inline-flex items-center justify-center h-9 w-9 md:h-9 md:w-9 px-1.5 rounded-full bg-accent text-accent-contrast font-extrabold text-xs flex-shrink-0">
                            120+
                          </span>
                          <div className="min-w-0">
                            <strong className="block text-sm leading-tight text-text">Companies registered</strong>
                            <span className="block mt-0.5 text-xs text-text-muted leading-relaxed">
                              Businesses trust Exxonim for registration and compliance
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 px-3 py-2.5 md:px-3.5 md:py-3 rounded-xl bg-accent-soft/40">
                          <span className="inline-flex items-center justify-center h-9 w-9 md:h-9 md:w-9 px-1.5 rounded-full bg-accent text-accent-contrast font-extrabold text-xs flex-shrink-0">
                            100%
                          </span>
                          <div className="min-w-0">
                            <strong className="block text-sm leading-tight text-text">Tracked</strong>
                            <span className="block mt-0.5 text-xs text-text-muted leading-relaxed">
                              Every consultation assigned a reference ID
                            </span>
                          </div>
                        </div>
                      </div>
                    </aside>
                  </div>
                </div>
              </div>
            </section>

            {/* ──────────────────────────────────────────────────────────────
             *  SECTION 2: Company Profile — who we are + working style
             * ────────────────────────────────────────────────────────────── */}
            <section
              className="py-10 md:py-20"
              aria-labelledby="about-profile-title"
            >
              <div className="w-[min(1240px,calc(100%-2rem))] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-4 md:gap-5 items-start">
                  {/* Left — story */}
                  <article
                    className="rounded-2xl md:rounded-[2rem] p-5 md:p-8 border border-border-soft bg-surface"
                    data-reveal
                  >
                    <p className="m-0 mb-3 text-[0.78rem] font-extrabold tracking-[0.16em] uppercase text-accent">
                      {content.company_profile.eyebrow}
                    </p>
                    <h2
                      id="about-profile-title"
                      className="m-0 text-[clamp(1.8rem,3.2vw,2.6rem)] font-semibold leading-tight tracking-tight text-text"
                    >
                      {content.company_profile.title}
                    </h2>
                    <div className="mt-5 grid gap-4">
                      {content.company_profile.paragraphs.map((paragraph) => (
                        <p key={paragraph} className="text-text-muted leading-relaxed">{paragraph}</p>
                      ))}
                    </div>
                  </article>

                  {/* Right — working style card */}
                  <article
                    className="rounded-2xl md:rounded-[2rem] p-5 md:p-8 border border-border-soft bg-surface"
                    data-reveal
                  >
                    {content.company_profile.working_style_label ? (
                      <p className="m-0 mb-3 text-[0.78rem] font-extrabold tracking-[0.16em] uppercase text-text-soft">
                        {content.company_profile.working_style_label}
                      </p>
                    ) : null}
                    <p className="text-[clamp(1.3rem,2.5vw,1.8rem)] font-semibold leading-tight tracking-tight text-text">
                      {content.company_profile.working_style}
                    </p>

                    {/* Core principles */}
                    <div className="grid gap-2.5 md:gap-3 mt-5 md:mt-6">
                      {[
                        { icon: <Target className="h-4 w-4" />, text: 'Every case tracked from intake to resolution' },
                        { icon: <Clock className="h-4 w-4" />, text: 'Proactive follow-up — no deadline surprises' },
                        { icon: <ShieldCheck className="h-4 w-4" />, text: 'No office visits — everything filed electronically' },
                        { icon: <Eye className="h-4 w-4" />, text: 'Transparent status updates at every milestone' },
                      ].map((item) => (
                        <div key={item.text} className="flex items-center gap-3 px-3 py-2.5 md:px-4 md:py-3 rounded-xl bg-accent-soft/40">
                          <span className="text-accent flex-shrink-0">{item.icon}</span>
                          <span className="text-sm text-text font-medium">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </article>
                </div>
              </div>
            </section>

            {/* ──────────────────────────────────────────────────────────────
             *  SECTION 3: What We Support — 3 capability cards
             * ────────────────────────────────────────────────────────────── */}
            {content.support_profiles_section && (
              <section
                className="py-10 md:py-20"
                aria-labelledby="about-support-title"
              >
                <div className="w-[min(1240px,calc(100%-2rem))] mx-auto">
                  {/* Section header */}
                  <div className="grid gap-2.5 md:gap-3 mb-8 md:mb-14 text-center max-w-[min(52ch,90%)] mx-auto" data-reveal>
                    <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-accent">
                      {content.support_profiles_section.title}
                    </p>
                    <h2
                      id="about-support-title"
                      className="text-[clamp(1.6rem,3.2vw,2.6rem)] font-semibold leading-tight tracking-tight text-text"
                    >
                      What we support
                    </h2>
                    <p className="text-text-muted text-sm leading-relaxed">
                      {content.support_profiles_section.description}
                    </p>
                  </div>

                  {/* Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                    {content.support_profiles.map((profile) => (
                      <article
                        key={profile.title}
                        className="rounded-2xl md:rounded-[1.5rem] border border-border-soft bg-surface p-5 md:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30"
                        data-reveal
                      >
                        {/* Icon */}
                        <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-accent-soft text-accent mb-3 md:mb-4">
                          {profileIcons[profile.title] ?? <ShieldCheck className="h-5 w-5" />}
                        </div>
                        <h3 className="text-lg font-semibold text-text leading-tight">
                          {profile.title}
                        </h3>
                        <p className="mt-2.5 text-sm text-text-muted leading-relaxed">
                          {profile.description}
                        </p>
                        <SmartLink
                          href={routes.services}
                          className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
                        >
                          Learn more
                          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </SmartLink>
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* ──────────────────────────────────────────────────────────────
             *  SECTION 4: How We Work — 4-step process
             * ────────────────────────────────────────────────────────────── */}
            {content.operating_model_section && (
              <section
                className="py-10 md:py-20"
                aria-labelledby="about-process-title"
              >
                <div className="w-[min(1240px,calc(100%-2rem))] mx-auto">
                  {/* Section header */}
                  <div className="grid gap-2.5 md:gap-3 mb-8 md:mb-14 text-center max-w-[min(52ch,90%)] mx-auto" data-reveal>
                    <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-accent">
                      Our process
                    </p>
                    <h2
                      id="about-process-title"
                      className="text-[clamp(1.6rem,3.2vw,2.6rem)] font-semibold leading-tight tracking-tight text-text"
                    >
                      {content.operating_model_section.title}
                    </h2>
                    <p className="text-text-muted text-sm leading-relaxed">
                      {content.operating_model_section.description}
                    </p>
                  </div>

                  {/* Steps — horizontal on desktop, vertical on mobile */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                    {content.operating_model.map((item, i) => (
                      <article
                        key={item.step}
                        className="relative rounded-2xl md:rounded-[1.5rem] border border-border-soft bg-surface p-5 md:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30"
                        data-reveal
                      >
                        {/* Step number badge */}
                        <div className="flex items-center gap-3 mb-3 md:mb-4">
                          <span className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-accent text-accent-contrast font-extrabold text-sm">
                            {item.step}
                          </span>
                          {/* Connector line (desktop only) */}
                          {i < content.operating_model.length - 1 && (
                            <span className="hidden lg:block absolute top-10 -right-[10px] w-5 h-0.5 bg-accent/30" aria-hidden="true" />
                          )}
                        </div>
                        <h3 className="text-lg font-semibold text-text leading-tight">
                          {item.title}
                        </h3>
                        <p className="mt-2.5 text-sm text-text-muted leading-relaxed">
                          {item.description}
                        </p>
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* ──────────────────────────────────────────────────────────────
             *  SECTION 5: Service Scope — what we cover
             * ────────────────────────────────────────────────────────────── */}
            {content.service_scope_section && (
              <section
                className="py-10 md:py-20"
                aria-labelledby="about-scope-title"
              >
                <div className="w-[min(1240px,calc(100%-2rem))] mx-auto">
                  {/* Section header */}
                  <div className="grid gap-2.5 md:gap-3 mb-8 md:mb-14 text-center max-w-[min(52ch,90%)] mx-auto" data-reveal>
                    <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-accent">
                      Service scope
                    </p>
                    <h2
                      id="about-scope-title"
                      className="text-[clamp(1.6rem,3.2vw,2.6rem)] font-semibold leading-tight tracking-tight text-text"
                    >
                      {content.service_scope_section.title}
                    </h2>
                    <p className="text-text-muted text-sm leading-relaxed">
                      {content.service_scope_section.description}
                    </p>
                  </div>

                  {/* Scope cards — 3 cols on desktop */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
                    {content.service_scope.map((service) => (
                      <article
                        key={service.title}
                        className="rounded-2xl md:rounded-[1.5rem] border border-border-soft border-l-4 border-l-accent bg-surface backdrop-blur-sm shadow-card p-5 md:p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-accent-glow"
                        data-reveal
                      >
                        <div className="flex items-center gap-2.5 mb-3">
                          <span className="w-2 h-2 rounded-full bg-accent" />
                          <h3 className="text-base font-semibold text-text leading-tight">
                            {service.title}
                          </h3>
                        </div>
                        <p className="text-sm text-text-muted leading-relaxed">
                          {service.description}
                        </p>
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* ──────────────────────────────────────────────────────────────
             *  SECTION 6: What to Expect — client promises
             * ────────────────────────────────────────────────────────────── */}
            {content.client_expectations_section && (
              <section
                className="py-10 md:py-20"
                aria-labelledby="about-expectations-title"
              >
                <div className="w-[min(1240px,calc(100%-2rem))] mx-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-4 md:gap-5 items-start">
                    {/* Left — section header */}
                    <div data-reveal>
                      <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-accent mb-3">
                        What to expect
                      </p>
                      <h2
                        id="about-expectations-title"
                        className="text-[clamp(1.8rem,3.2vw,2.6rem)] font-semibold leading-tight tracking-tight text-text"
                      >
                        {content.client_expectations_section.title}
                      </h2>
                      <p className="text-text-muted leading-relaxed mt-3">
                        {content.client_expectations_section.description}
                      </p>
                    </div>

                    {/* Right — promise cards */}
                    <div className="grid gap-2.5 md:gap-3" data-reveal>
                      {content.client_expectations.map((item) => (
                        <div
                          key={item}
                          className="flex items-start gap-3.5 px-4 py-3.5 md:px-5 md:py-4 rounded-2xl bg-surface border border-border-soft shadow-card hover:-translate-y-0.5 hover:border-accent/20 hover:shadow-accent-glow transition-all duration-300"
                        >
                          <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <p className="text-sm text-text leading-relaxed font-medium">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* ──────────────────────────────────────────────────────────────
             *  SECTION 7: Final CTA
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
