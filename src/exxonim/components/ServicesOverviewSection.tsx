'use client';

import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { ServiceSearchBox, type FlatService } from '@/exxonim/components/ServiceSearchBox';
import type { ServicesOverviewContent } from '@/exxonim/types';

interface ServicesOverviewSectionProps {
  content: ServicesOverviewContent;
  /** Searchable services — fed by the page from the live catalog so the
   * search always matches the rendered cards. */
  services: FlatService[];
}

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

/* ── Trust stats data ────────────────────────────────────────── */
const TRUST_STATS = [
  { value: '120+', label: 'Companies Registered' },
  { value: '100%', label: 'Tracked & Updated' },
  { value: '4.9★', label: 'Google Rating' },
  { value: '58+', label: 'Client Reviews' },
] as const;

export function ServicesOverviewSection({
  content,
  services,
}: ServicesOverviewSectionProps) {
  const [currentStat, setCurrentStat] = useState(0);

  // Auto-rotate the trust stats slideshow every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % TRUST_STATS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="services-overview"
      className="relative pt-6 pb-8 md:pt-10 md:pb-12"
      aria-labelledby="services-overview-title"
    >
      <div className="max-w-[1240px] px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        {/* ── Hero + vertical stats slideshow - 2-column layout ── */}
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:gap-12 items-center">
          {/* ── Left: Hero - open, no card, no CTA button (CTA is at bottom of page) ── */}
          <div className="text-center lg:text-left" data-reveal>
            <p className="m-0 mb-4 text-xs font-extrabold tracking-[0.16em] uppercase text-accent">
              {content?.eyebrow}
            </p>
            <h2
              id="services-overview-title"
              className="m-0 text-[clamp(1.9rem,4.2vw,3.2rem)] leading-[1.05] tracking-[-0.03em] text-text font-semibold"
            >
              {content.title}
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-text-muted mt-5 max-w-[58ch] mx-auto lg:mx-0">
              {content.description}
            </p>
          </div>

          {/* ── Right: Vertical trust stats slideshow ── */}
          <div
            className="flex flex-col items-center lg:items-end gap-3"
            data-reveal
          >
            <div className="relative h-20 w-48 overflow-hidden">
              {TRUST_STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ${
                    i === currentStat
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4 pointer-events-none'
                  }`}
                >
                  <p className="text-3xl md:text-4xl font-bold text-accent leading-none">
                    {stat.value}
                  </p>
                  <p className="text-xs md:text-sm text-text-muted mt-1.5 leading-snug">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
            {/* Slide indicators */}
            <div className="flex gap-1.5">
              {TRUST_STATS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentStat(i)}
                  className={`h-1.5 rounded-full transition-colors ${
                    i === currentStat ? 'w-6 bg-accent' : 'w-1.5 bg-border-soft hover:bg-accent/50'
                  }`}
                  aria-label={`Show stat ${i + 1}`}
                />
              ))}
            </div>
            {/* Google review footer */}
            <div className="flex items-center gap-2 mt-1">
              <GoogleLogo className="h-4 w-4 shrink-0" />
              <span className="text-xs text-text-muted">Trusted by businesses across Tanzania</span>
              <a
                href="https://www.google.com/search?q=Exxonim+Consult+reviews"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-0.5 text-xs font-semibold text-accent shrink-0 transition-colors hover:text-accent-hover"
              >
                See all
                <ArrowRight className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* ── Service search - simple inline, aligned right, no card container.
            Shared with the sticky mobile bar (StickyServiceSearch). ── */}
        <div className="mt-8 md:mt-10 max-w-md ml-auto" data-reveal>
          <ServiceSearchBox services={services} />
        </div>
      </div>
    </section>
  );
}
