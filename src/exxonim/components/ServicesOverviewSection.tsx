'use client';

import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { routes } from '@/exxonim/routes';
import { SmartLink } from '@/exxonim/components/primitives/SmartLink';
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

/* ── Trust stats data ────────────────────────────────────────── */
const TRUST_STATS = [
  { value: '120+', label: 'Companies Registered' },
  { value: '100%', label: 'Tracked & Updated' },
  { value: '4.9★', label: 'Google Rating' },
  { value: '58+', label: 'Client Reviews' },
] as const;

export function ServicesOverviewSection({
  content,
}: ServicesOverviewSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Auto-rotate the trust stats slideshow every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % TRUST_STATS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Flatten all services from nav groups for search
  const allServices = useMemo(() => {
    if (!content?.service_nav_groups) return [];
    return content.service_nav_groups.flatMap((group) =>
      (group?.items ?? []).map((item) => ({
        name: item,
        group: group.title ?? "",
        href: group.href ?? "",
      }))
    );
  }, [content?.service_nav_groups]);

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

  /* ── Click-outside handler to close dropdown ────────────────── */
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

  const handleResultClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, serviceName: string) => {
    e.preventDefault();
    const targetId = serviceName.toLowerCase().replace(/\s+/g, '-');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    setIsDropdownOpen(false);
    setSearchQuery('');
  }, []);

  const hasResults = searchQuery.trim().length > 0 && filteredServices.length > 0;
  const noResults = searchQuery.trim().length > 0 && filteredServices.length === 0;
  const showDropdown = isDropdownOpen || searchQuery.trim().length > 0;

  return (
    <section
      className="relative pt-6 pb-8 md:pt-10 md:pb-12"
      aria-labelledby="services-overview-title"
    >
      <div className="max-w-[1240px] px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        {/* ── Hero + vertical stats slideshow - 2-column layout ── */}
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:gap-12 items-center">
          {/* ── Left: Hero - open, no card, no CTA button (CTA is at bottom of page) ── */}
          <div className="text-center lg:text-left" data-reveal>
            <p className="m-0 mb-4 text-[0.78rem] font-extrabold tracking-[0.16em] uppercase text-accent">
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

        {/* ── Service search - simple inline, aligned right, no card container. ── */}
        <div
          ref={searchContainerRef}
          className="mt-8 md:mt-10 relative max-w-md ml-auto"
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
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border-soft bg-surface/50 text-text text-sm placeholder:text-text-soft focus:outline-none focus:ring-2 focus:ring-accent/25 focus:border-accent/40 focus:bg-surface transition-colors"
            />
          </div>

          {/* Search results dropdown
              ── Absolute positioned so it overlays content below instead of
              pushing it down. The parent container (searchContainerRef) is
              `relative`, so `absolute top-full left-0 right-0` anchors the
              dropdown to the search input's bounds and floats it on top of
              whatever follows (the service catalog). z-50 ensures it sits
              above sibling sections. */}
          {showDropdown && (
            <div
              id="services-search-dropdown"
              className="absolute top-full left-0 right-0 mt-2 z-50 rounded-xl border border-border-soft bg-surface shadow-xl overflow-hidden max-h-[320px] overflow-y-auto"
            >
              {hasResults && (
                <ul className="grid gap-0">
                  {filteredServices.slice(0, 6).map((service) => (
                    <li key={service.name}>
                      <SmartLink
                        href={`${service.href}#${service.name.toLowerCase().replace(/\s+/g, '-')}`}
                        onClick={(e) => handleResultClick(e, service.name)}
                        className="flex items-center justify-between gap-2 px-3 py-2.5 text-sm text-text hover:bg-accent-soft/50 transition-colors group"
                      >
                        <span className="flex items-center gap-2">
                          <Search className="w-3 h-3 text-text-soft group-hover:text-accent" aria-hidden="true" />
                          <span className="font-medium">{service.name}</span>
                        </span>
                        <span className="text-xs text-text-soft">{service.group}</span>
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              )}
              {noResults && (
                <p className="px-3 py-2.5 text-sm text-text-muted">
                  No services found for &ldquo;{searchQuery}&rdquo;
                </p>
              )}
              {searchQuery.trim().length === 0 && (
                <div className="grid gap-0">
                  <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-text-soft border-b border-border-soft">
                    Popular services
                  </p>
                  {allServices.slice(0, 4).map((service) => (
                    <SmartLink
                      key={service.name}
                      href={`${service.href}#${service.name.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={(e) => handleResultClick(e, service.name)}
                      className="flex items-center gap-2 px-3 py-2.5 text-sm text-text hover:bg-accent-soft/50 transition-colors"
                    >
                      <Search className="w-3 h-3 text-text-soft" aria-hidden="true" />
                      <span>{service.name}</span>
                    </SmartLink>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
