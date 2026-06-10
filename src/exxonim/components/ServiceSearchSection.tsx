'use client';

import { useState, useMemo } from 'react';
import { routes } from '@/exxonim/routes';
import type { ServicesCatalogContent } from '@/exxonim/types';

/* ── Inline SVG icons ──────────────────────────────────────── */

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" /><path d="M16 6h.01" />
      <path d="M12 6h.01" /><path d="M12 10h.01" />
      <path d="M12 14h.01" /><path d="M16 10h.01" />
      <path d="M16 14h.01" /><path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

const groupIcons = [<BuildingIcon key="0" />, <ShieldIcon key="1" />, <GlobeIcon key="2" />];

/* ── Filter category type ──────────────────────────────────── */

interface FilterOption {
  key: string;
  label: string;
}

const FILTER_ALL = 'all';

/* ── Component ─────────────────────────────────────────────── */

interface ServiceSearchSectionProps {
  content: ServicesCatalogContent;
}

export function ServiceSearchSection({ content }: ServiceSearchSectionProps) {
  const serviceGroups = content.service_groups;

  // Build flat list of all services with their group info
  const allServices = useMemo(() => {
    return serviceGroups.flatMap((group) =>
      group.services.map((service) => ({
        ...service,
        groupTitle: group.title,
        groupDescription: group.description,
        groupIndex: serviceGroups.indexOf(group),
      }))
    );
  }, [serviceGroups]);

  // Build filter options from groups
  const filterOptions: FilterOption[] = useMemo(() => [
    { key: FILTER_ALL, label: 'All Services' },
    ...serviceGroups.map((group, i) => ({
      key: String(i),
      label: group.title,
    })),
  ], [serviceGroups]);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState(FILTER_ALL);

  // Filter services
  const filteredServices = useMemo(() => {
    let result = allServices;

    // Apply category filter
    if (activeFilter !== FILTER_ALL) {
      result = result.filter((s) => String(s.groupIndex) === activeFilter);
    }

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (s) =>
          s.label.toLowerCase().includes(query) ||
          s.detail.toLowerCase().includes(query) ||
          (s.outcome && s.outcome.toLowerCase().includes(query)) ||
          (s.tags && s.tags.some((tag) => tag.toLowerCase().includes(query))) ||
          s.groupTitle.toLowerCase().includes(query)
      );
    }

    return result;
  }, [allServices, searchQuery, activeFilter]);

  // Group filtered services by group for display
  const groupedResults = useMemo(() => {
    const map = new Map<number, typeof allServices>();
    filteredServices.forEach((service) => {
      const existing = map.get(service.groupIndex) ?? [];
      existing.push(service);
      map.set(service.groupIndex, existing);
    });
    return map;
  }, [filteredServices]);

  return (
    <section
      id="services"
      className="py-16 md:py-24 bg-page-strong"
      aria-labelledby="service-search-title"
    >
      <div className="w-[min(1240px,calc(100%-2rem))] mx-auto">
        {/* Section Header */}
        <div className="grid gap-4 max-w-[min(52ch,90%)] mx-auto text-center mb-10 md:mb-14">
          <p className="inline-flex items-center justify-center gap-2 text-accent text-xs font-extrabold tracking-[0.14em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            {content.eyebrow}
          </p>
          <h2
            id="service-search-title"
            className="font-display text-[clamp(1.8rem,3.2vw,2.6rem)] font-medium leading-tight tracking-tight"
          >
            {content.title}
          </h2>
          <p className="text-text-muted text-lg leading-relaxed">
            {content.description}
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-soft pointer-events-none" />
            <input
              type="search"
              placeholder="Search services — e.g. company registration, TIN, work permit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 md:h-14 pl-12 pr-4 rounded-full border border-border-soft bg-surface text-text text-sm md:text-base placeholder:text-text-soft focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/40 transition-all"
              aria-label="Search services"
            />
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 md:mb-10 scrollbar-none -mx-4 px-4 md:mx-0 md:px-0 md:justify-center">
          {filterOptions.map((option) => (
            <button
              key={option.key}
              onClick={() => setActiveFilter(option.key)}
              className={`flex-shrink-0 inline-flex items-center h-10 px-5 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                activeFilter === option.key
                  ? 'bg-accent text-accent-contrast'
                  : 'bg-surface border border-border-soft text-text-muted hover:text-text hover:border-accent/30'
              }`}
              aria-pressed={activeFilter === option.key}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Service Cards — grouped by category */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-muted text-lg">No services match your search.</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveFilter(FILTER_ALL); }}
              className="mt-3 text-accent text-sm font-semibold hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid gap-8">
            {Array.from(groupedResults.entries()).map(([groupIndex, services]) => {
              const group = serviceGroups[groupIndex];
              if (!group) return null;

              return (
                <div key={groupIndex}>
                  {/* Group Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-accent-soft text-accent">
                      {groupIcons[groupIndex] ?? <BuildingIcon />}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-text leading-tight">{group.title}</h3>
                      <p className="text-sm text-text-muted">{group.description}</p>
                    </div>
                  </div>

                  {/* Service Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {services.map((service) => (
                      <article
                        key={service.id}
                        id={service.id}
                        className="rounded-[1.4rem] border border-border-soft bg-surface/88 p-5 grid gap-3 content-start transition-all duration-300 hover:-translate-y-1 hover:border-accent/30"
                      >
                        {/* Tags */}
                        {service.tags && service.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {service.tags.map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center h-6 px-2.5 rounded-full bg-accent-soft text-accent text-[0.68rem] font-bold uppercase tracking-[0.06em]"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Title */}
                        <h4 className="text-base font-semibold text-text leading-tight">
                          {service.label}
                        </h4>

                        {/* Outcome (if available) */}
                        {service.outcome && (
                          <p className="text-sm font-medium text-accent leading-relaxed">
                            → {service.outcome}
                          </p>
                        )}

                        {/* Detail */}
                        <p className="text-sm text-text-muted leading-relaxed">
                          {service.detail}
                        </p>

                        {/* CTA — always visible on mobile */}
                        <a
                          href={`${routes.contact}#inquiry`}
                          className="inline-flex items-center gap-1.5 mt-1 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
                          aria-label={`Ask about ${service.label}`}
                        >
                          Ask a Question
                          <span aria-hidden="true" className="text-base leading-none">→</span>
                        </a>
                      </article>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
          <a
            href={routes.contact}
            className="inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-extrabold bg-accent text-accent-contrast transition-all hover:bg-accent-hover hover:-translate-y-0.5"
          >
            Ask a Question — Free
          </a>
          <a
            href="#packages"
            className="inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-extrabold border border-border-soft bg-surface/80 text-text transition-all hover:bg-surface hover:-translate-y-0.5"
          >
            See package plans
          </a>
        </div>
      </div>
    </section>
  );
}
