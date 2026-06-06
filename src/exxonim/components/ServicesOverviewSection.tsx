'use client';

import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { Search, ArrowRight, ShieldCheck } from 'lucide-react';
import { routes } from '@/exxonim/routes';
import { Button } from '@/exxonim/components/primitives/Button';
import type { ServicesOverviewContent } from '@/exxonim/types';

interface ServicesOverviewSectionProps {
  content: ServicesOverviewContent;
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

export function ServicesOverviewSection({
  content,
}: ServicesOverviewSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Flatten all services from nav groups for search
  const allServices = useMemo(() => {
    return content.service_nav_groups.flatMap((group) =>
      group.items.map((item) => ({
        name: item,
        group: group.title,
        href: group.href,
      }))
    );
  }, [content.service_nav_groups]);

  // Filter services by search query
  const filteredServices = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return allServices.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.group.toLowerCase().includes(q)
    );
  }, [searchQuery, allServices]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    setIsDropdownOpen(true);
  }, []);

  /* ── Click-outside handler to close dropdown ──────────────────
   * Uses a document-level mousedown listener so clicking anywhere
   * outside the search container closes the dropdown. This avoids
   * the onBlur + setTimeout pattern which can destroy <a> targets
   * before the click event reaches the router.                          */
  useEffect(() => {
    function handleDocumentMouseDown(e: MouseEvent) {
      if (!searchContainerRef.current) return;
      if (!searchContainerRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleDocumentMouseDown);
    return () => document.removeEventListener('mousedown', handleDocumentMouseDown);
  }, []);

  /* ── Handle clicking a search result ──────────────────────────
   * Prevents default <a> navigation and instead scrolls to the
   * target service element programmatically. This avoids the
   * race condition where React re-renders remove the <a> from
   * the DOM before the router's click listener can process it.
   *
   * The service items in EngineSection have id={service.id}, e.g.
   * id="company-registration". We derive the same ID from the
   * service name by lowercasing and replacing spaces with hyphens.   */
  const handleResultClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, serviceName: string) => {
    e.preventDefault();

    // Derive the element ID the same way EngineSection does: service.id
    const targetId = serviceName.toLowerCase().replace(/\s+/g, '-');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    setIsDropdownOpen(false);
    setSearchQuery('');
  }, []);

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

  const hasResults = searchQuery.trim().length > 0 && filteredServices.length > 0;
  const noResults = searchQuery.trim().length > 0 && filteredServices.length === 0;
  const showDropdown = isDropdownOpen || searchQuery.trim().length > 0;

  return (
    <section
      className="relative overflow-hidden pt-6 pb-16 md:pb-20"
      aria-labelledby="services-overview-title"
    >
      <div className="w-[min(1240px,calc(100%-2rem))] mx-auto relative z-10">
        {/* Hero grid — left: headline + CTA, right: search + Google review */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-5 items-start">
          {/* ── Left column — benefit headline + single CTA ── */}
          <article
            className="rounded-[2rem] p-6 md:p-8 border border-border-soft bg-surface/82"
            data-reveal
          >
            <p className="m-0 mb-3 text-[0.78rem] font-extrabold tracking-[0.16em] uppercase text-text-soft">
              {content.eyebrow}
            </p>
            <h2
              id="services-overview-title"
              className="m-0 text-[clamp(1.9rem,4.2vw,3.2rem)] leading-[1.02] tracking-[-0.03em] text-text font-semibold"
            >
              {content.title}
            </h2>
            <p className="text-base leading-relaxed text-text-muted mt-4">
              {content.description}
            </p>

            {/* Single primary CTA — "Book a Free Consultation" */}
            <div className="mt-6">
              <Button
                size="standard"
                variant="primary"
                href={routes.contact}
              >
                Book a Free Consultation
                <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
              </Button>
            </div>

            {/* "No office visits" trust signal under CTA */}
            <div className="inline-flex items-center gap-2 mt-5 px-3 py-1.5 rounded-full bg-accent-soft/60 text-accent text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
              No office visits required
            </div>
          </article>

          {/* ── Right column — service search + Google review panel ── */}
          <div className="grid gap-5">
            {/* Service search box */}
            <div
              ref={searchContainerRef}
              className="relative rounded-[1.5rem] p-5 md:p-6 border border-border-soft bg-surface/82"
              data-reveal
            >
              <div className="relative">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-soft" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onFocus={() => setIsDropdownOpen(true)}
                  placeholder="Search for a service..."
                  aria-label="Search services"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border-soft bg-page/60 text-text text-sm placeholder:text-text-soft focus:outline-none focus:ring-2 focus:ring-accent/25 focus:border-accent/40 transition-all"
                />
              </div>

              {/* Search results dropdown */}
              {showDropdown && (
                <div id="services-search-dropdown" className="mt-3">
                  {hasResults && (
                    <ul className="grid gap-1">
                      {filteredServices.slice(0, 6).map((service) => (
                        <li key={service.name}>
                          <a
                            href={`${service.href}#${service.name.toLowerCase().replace(/\s+/g, '-')}`}
                            onClick={(e) => handleResultClick(e, service.name)}
                            className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-sm text-text hover:bg-accent-soft/50 transition-colors group"
                          >
                            <span className="flex items-center gap-2">
                              <Search className="w-3 h-3 text-text-soft group-hover:text-accent" aria-hidden="true" />
                              <span className="font-medium">{service.name}</span>
                            </span>
                            <span className="text-xs text-text-soft">{service.group}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                  {noResults && (
                    <p className="px-3 py-2 text-sm text-text-muted">
                      No services found for &ldquo;{searchQuery}&rdquo;
                    </p>
                  )}
                  {searchQuery.trim().length === 0 && (
                    <div className="grid gap-1">
                      <p className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-text-soft">
                        Popular services
                      </p>
                      {allServices.slice(0, 4).map((service) => (
                        <a
                          key={service.name}
                          href={`${service.href}#${service.name.toLowerCase().replace(/\s+/g, '-')}`}
                          onClick={(e) => handleResultClick(e, service.name)}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-text hover:bg-accent-soft/50 transition-colors"
                        >
                          <Search className="w-3 h-3 text-text-soft" aria-hidden="true" />
                          <span>{service.name}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Google review trust panel */}
            <aside
              className="rounded-[1.5rem] p-5 md:p-6 border border-border-soft bg-surface/82"
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
                  <span className="text-[1rem] tracking-[1.5px] text-star leading-none">
                    ★★★★★
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

              {/* Trust signal badges */}
              <div className="flex flex-wrap gap-2 mt-4">
                {content.service_signals.slice(0, 2).map((signal) => (
                  <span
                    key={signal.label}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-accent-soft/50 text-accent text-xs font-semibold"
                  >
                    <span className="font-extrabold">{signal.value}</span>
                    {signal.label}
                  </span>
                ))}
              </div>

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
          </div>
        </div>
      </div>
    </section>
  );
}
