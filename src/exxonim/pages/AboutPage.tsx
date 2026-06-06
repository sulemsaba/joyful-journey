'use client';

import { Home, ArrowRight, CheckCircle, Clock, ShieldCheck, Target, Users, Eye } from 'lucide-react';
import { Breadcrumb } from '@/exxonim/components/Breadcrumb';
import { Button } from '@/exxonim/components/primitives/Button';
import { routes } from '@/exxonim/routes';
import { LoadBoundary } from '@/exxonim/components/LoadBoundary';
import { usePage } from '@/exxonim/hooks/usePage';
import { useResolvedPageSeo } from '@/exxonim/hooks/useResolvedSeo';
import type { AboutPageContent } from '@/exxonim/types';

/* ── Icon map for support profiles ───────────────────── */
const profileIcons: Record<string, React.ReactNode> = {
  'Business setup': <ShieldCheck className="h-5 w-5" />,
  'Compliance': <CheckCircle className="h-5 w-5" />,
  'Consultation tracking': <Eye className="h-5 w-5" />,
};

/* ── Icon map for operating model steps ───────────────── */
const stepIcons = [<Target className="h-5 w-5" key="0" />, <Users className="h-5 w-5" key="1" />, <ShieldCheck className="h-5 w-5" key="2" />, <Clock className="h-5 w-5" key="3" />];

export function AboutPage() {
  const { data: page, isPending, error } = usePage<AboutPageContent>('about');
  useResolvedPageSeo(page, routes.about);
  const content = page?.content;

  return (
    <LoadBoundary
      error={error}
      errorDetail="The about page content could not be loaded right now."
      errorTitle="Unable to load the about page."
      isPending={isPending}
      isReady={Boolean(content)}
      loadingLabel="Loading about page..."
    >
      {() => {
        if (!content) return null;
        return (
          <>
            {/* Breadcrumb */}
            <div className="w-[min(1240px,calc(100%-2rem))] mx-auto">
              <Breadcrumb items={[{ label: 'Home', href: routes.home, icon: Home }, { label: 'About' }]} />
            </div>

            {/* ──────────────────────────────────────────────────────────────
             *  SECTION 1: Hero — benefit headline + trust stats
             * ────────────────────────────────────────────────────────────── */}
            <section
              className="py-10 md:py-16"
              aria-labelledby="about-hero-title"
            >
              <div className="w-[min(1240px,calc(100%-2rem))] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-5 items-stretch">
                  {/* Left — headline card */}
                  <article
                    className="rounded-[2rem] p-6 md:p-8 border border-border-soft bg-surface/82"
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
                    <div className="mt-6">
                      <Button size="standard" variant="primary" href={routes.contact}>
                        Book a Free Consultation
                        <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
                      </Button>
                    </div>
                  </article>

                  {/* Right — trust stats panel */}
                  <aside
                    className="relative overflow-hidden rounded-[2rem] p-6 md:p-8 border border-border-soft bg-gradient-to-b from-accent/10 to-accent/90 text-accent-contrast"
                    data-reveal
                  >
                    {/* Decorative blur circle */}
                    <div
                      className="pointer-events-none absolute -bottom-[28%] -right-[12%] w-56 h-56 rounded-full bg-accent-secondary/20 blur-2xl"
                      aria-hidden="true"
                    />

                    <div className="relative z-10">
                      <p className="text-sm font-semibold text-accent-contrast/90 mb-5">
                        Why clients choose Exxonim
                      </p>

                      <div className="grid gap-3">
                        <article className="grid grid-cols-[auto_1fr] gap-3 items-center p-3.5 rounded-xl bg-accent-contrast/10 border border-accent-contrast/20">
                          <span className="inline-flex items-center justify-center min-h-[2.5rem] px-3 rounded-full bg-accent-contrast/15 text-accent-contrast font-extrabold text-sm">
                            120+
                          </span>
                          <div>
                            <strong className="block text-sm leading-tight">Companies registered</strong>
                            <span className="block mt-1 text-sm text-accent-contrast/75 leading-relaxed">
                              Businesses trust Exxonim for registration and compliance
                            </span>
                          </div>
                        </article>

                        <article className="grid grid-cols-[auto_1fr] gap-3 items-center p-3.5 rounded-xl bg-accent-contrast/10 border border-accent-contrast/20">
                          <span className="inline-flex items-center justify-center min-h-[2.5rem] px-3 rounded-full bg-accent-contrast/15 text-accent-contrast font-extrabold text-sm">
                            100%
                          </span>
                          <div>
                            <strong className="block text-sm leading-tight">Tracked</strong>
                            <span className="block mt-1 text-sm text-accent-contrast/75 leading-relaxed">
                              Every consultation assigned a reference ID
                            </span>
                          </div>
                        </article>

                        <article className="grid grid-cols-[auto_1fr] gap-3 items-center p-3.5 rounded-xl bg-accent-contrast/10 border border-accent-contrast/20">
                          <span className="inline-flex items-center justify-center min-h-[2.5rem] px-3 rounded-full bg-accent-contrast/15 text-accent-contrast font-extrabold text-sm">
                            4.9★
                          </span>
                          <div>
                            <strong className="block text-sm leading-tight">Google rating</strong>
                            <span className="block mt-1 text-sm text-accent-contrast/75 leading-relaxed">
                              58+ verified reviews from real clients
                            </span>
                          </div>
                        </article>
                      </div>

                      {/* No office visits badge */}
                      <div className="inline-flex items-center gap-2 mt-5 px-3 py-2 rounded-full bg-accent-contrast/10 border border-accent-contrast/20 text-accent-contrast/90 text-xs font-semibold">
                        <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                        No office visits required
                      </div>
                    </div>
                  </aside>
                </div>
              </div>
            </section>

            {/* ──────────────────────────────────────────────────────────────
             *  SECTION 2: Company Profile — who we are + working style
             * ────────────────────────────────────────────────────────────── */}
            <section
              className="py-12 md:py-20"
              aria-labelledby="about-profile-title"
            >
              <div className="w-[min(1240px,calc(100%-2rem))] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-5 items-start">
                  {/* Left — story */}
                  <article
                    className="rounded-[2rem] p-6 md:p-8 border border-border-soft bg-surface/82"
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
                    className="rounded-[2rem] p-6 md:p-8 border border-border-soft bg-surface/82"
                    data-reveal
                  >
                    {content.company_profile.working_style_label ? (
                      <p className="m-0 mb-3 text-[0.78rem] font-extrabold tracking-[0.16em] uppercase text-text-soft">
                        {content.company_profile.working_style_label}
                      </p>
                    ) : null}
                    <p className="text-[clamp(1.4rem,2.5vw,1.8rem)] font-semibold leading-tight tracking-tight text-text">
                      {content.company_profile.working_style}
                    </p>

                    {/* Core principles */}
                    <div className="grid gap-3 mt-6">
                      {[
                        { icon: <Target className="h-4 w-4" />, text: 'Every case tracked from intake to resolution' },
                        { icon: <Clock className="h-4 w-4" />, text: 'Proactive follow-up — no deadline surprises' },
                        { icon: <ShieldCheck className="h-4 w-4" />, text: 'No office visits — everything filed electronically' },
                        { icon: <Eye className="h-4 w-4" />, text: 'Transparent status updates at every milestone' },
                      ].map((item) => (
                        <div key={item.text} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-accent-soft/40">
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
                className="py-12 md:py-20"
                aria-labelledby="about-support-title"
              >
                <div className="w-[min(1240px,calc(100%-2rem))] mx-auto">
                  {/* Section header */}
                  <div className="grid gap-3 mb-10 md:mb-14 text-center max-w-[min(52ch,90%)] mx-auto" data-reveal>
                    <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-accent">
                      {content.support_profiles_section.title}
                    </p>
                    <h2
                      id="about-support-title"
                      className="text-[clamp(1.8rem,3.2vw,2.6rem)] font-semibold leading-tight tracking-tight text-text"
                    >
                      What we support
                    </h2>
                    <p className="text-text-muted text-sm leading-relaxed">
                      {content.support_profiles_section.description}
                    </p>
                  </div>

                  {/* Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {content.support_profiles.map((profile, i) => (
                      <article
                        key={profile.title}
                        className="rounded-[1.5rem] border border-border-soft bg-surface/88 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30"
                        data-reveal
                      >
                        {/* Icon */}
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent-soft text-accent mb-4">
                          {profileIcons[profile.title] ?? <ShieldCheck className="h-5 w-5" />}
                        </div>
                        <h3 className="text-lg font-semibold text-text leading-tight">
                          {profile.title}
                        </h3>
                        <p className="mt-2.5 text-sm text-text-muted leading-relaxed">
                          {profile.description}
                        </p>
                        <a
                          href={routes.services}
                          className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
                        >
                          Learn more
                          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </a>
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
                className="py-12 md:py-20"
                aria-labelledby="about-process-title"
              >
                <div className="w-[min(1240px,calc(100%-2rem))] mx-auto">
                  {/* Section header */}
                  <div className="grid gap-3 mb-10 md:mb-14 text-center max-w-[min(52ch,90%)] mx-auto" data-reveal>
                    <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-accent">
                      Our process
                    </p>
                    <h2
                      id="about-process-title"
                      className="text-[clamp(1.8rem,3.2vw,2.6rem)] font-semibold leading-tight tracking-tight text-text"
                    >
                      {content.operating_model_section.title}
                    </h2>
                    <p className="text-text-muted text-sm leading-relaxed">
                      {content.operating_model_section.description}
                    </p>
                  </div>

                  {/* Steps — horizontal on desktop, vertical on mobile */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {content.operating_model.map((item, i) => (
                      <article
                        key={item.step}
                        className="relative rounded-[1.5rem] border border-border-soft bg-surface/88 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30"
                        data-reveal
                      >
                        {/* Step number badge */}
                        <div className="flex items-center gap-3 mb-4">
                          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-accent text-accent-contrast font-extrabold text-sm">
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
                className="py-12 md:py-20"
                aria-labelledby="about-scope-title"
              >
                <div className="w-[min(1240px,calc(100%-2rem))] mx-auto">
                  {/* Section header */}
                  <div className="grid gap-3 mb-10 md:mb-14 text-center max-w-[min(52ch,90%)] mx-auto" data-reveal>
                    <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-accent">
                      Service scope
                    </p>
                    <h2
                      id="about-scope-title"
                      className="text-[clamp(1.8rem,3.2vw,2.6rem)] font-semibold leading-tight tracking-tight text-text"
                    >
                      {content.service_scope_section.title}
                    </h2>
                    <p className="text-text-muted text-sm leading-relaxed">
                      {content.service_scope_section.description}
                    </p>
                  </div>

                  {/* Scope cards — 3 cols on desktop */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {content.service_scope.map((service) => (
                      <article
                        key={service.title}
                        className="rounded-[1.35rem] border border-border-soft bg-surface/88 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30"
                        data-reveal
                      >
                        <div className="flex items-center gap-2.5 mb-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                          <h3 className="text-[0.9375rem] font-semibold text-text leading-tight">
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
                className="py-12 md:py-20"
                aria-labelledby="about-expectations-title"
              >
                <div className="w-[min(1240px,calc(100%-2rem))] mx-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-5 items-start">
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
                    <div className="grid gap-3" data-reveal>
                      {content.client_expectations.map((item) => (
                        <div
                          key={item}
                          className="flex items-start gap-3 px-4 py-3.5 rounded-xl bg-surface/88 border border-border-soft"
                        >
                          <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" aria-hidden="true" />
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
              className="py-12 md:py-20"
              aria-labelledby="about-cta-title"
            >
              <div className="w-[min(1240px,calc(100%-2rem))] mx-auto">
                <div
                  className="max-w-[42rem] mx-auto rounded-[2rem] border border-border-soft bg-surface-elevated p-8 md:p-12 text-center"
                  style={{
                    background:
                      'radial-gradient(80% 100% at 50% 0%, color-mix(in srgb, var(--color-accent) 18%, transparent), transparent 70%), var(--color-surface-elevated)',
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
      }}
    </LoadBoundary>
  );
}
