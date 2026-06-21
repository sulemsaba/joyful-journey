import { useState, useEffect, useMemo } from 'react';
import { ArrowRight, AlertCircle, RefreshCw, Briefcase, ShieldCheck, Plane, Heart } from 'lucide-react';
import { cn } from '@/exxonim/utils/cn';
import { Container } from '@/exxonim/components/primitives/Container';
import { ServiceCard, ServiceCardSkeleton } from './ServiceCard';
import { Button } from '@/exxonim/components/primitives/Button';
import { SmartLink } from '@/exxonim/components/primitives/SmartLink';
import { routes, serviceDetailPath } from '@/exxonim/routes';
import { useServiceCatalog } from '@/exxonim/hooks/useServiceCatalog';

/** Category tab definition with icon */
const categoryTabs = [
  { key: 'all', label: 'All Services', icon: Briefcase },
  { key: 'Business Setup', label: 'Business Setup', icon: Briefcase },
  { key: 'Compliance Support', label: 'Compliance', icon: ShieldCheck },
  { key: 'Work Permits & Foreign Investment', label: 'Work Permits', icon: Plane },
  { key: 'NGOs & Non-Profits', label: 'NGOs & Non-Profits', icon: Heart },
] as const;

type CategoryKey = (typeof categoryTabs)[number]['key'];

interface ServiceCatalogSectionProps {
  /** Eyebrow text for the compact hero header */
  heroEyebrow?: string;
  /** Title for the compact hero header */
  heroTitle?: string;
}

export function ServiceCatalogSection({ heroEyebrow, heroTitle }: ServiceCatalogSectionProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all');
  const { data, isPending, isError, refetch } = useServiceCatalog('all');

  // With the fallback guarantee in useServiceCatalog, `data` always has
  // fallback content. Only show the error state if there are truly no
  // services to display (should never happen with hardcoded fallback).
  const hasServices = (data?.data?.services?.length ?? 0) > 0;

  // Progressive disclosure: show only 6 cards on mobile unless expanded
  const [showAll, setShowAll] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 640px)');
    setIsDesktop(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  // Filter services by category only
  const filteredServices = useMemo(() => {
    const services = data?.data?.services ?? [];
    if (activeCategory === 'all') return services;
    return services.filter((s) => s.category === activeCategory);
  }, [data, activeCategory]);

  // Visible services: limit on mobile unless expanded
  const visibleServices = (isDesktop || showAll)
    ? filteredServices
    : filteredServices.slice(0, 6);
  const hasMore = !isDesktop && !showAll && filteredServices.length > 6;

  // Group services by category when "All Services" is selected
  const groupedServices = useMemo(() => {
    if (activeCategory !== 'all') return null;
    const groups: Record<string, typeof filteredServices> = {};
    for (const s of visibleServices) {
      if (!groups[s.category]) groups[s.category] = [];
      groups[s.category].push(s);
    }
    return groups;
  }, [visibleServices, activeCategory]);

  // Count services per category for the tab badges
  const allServices = data?.data?.services ?? [];
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: allServices.length };
    for (const s of allServices) {
      counts[s.category] = (counts[s.category] || 0) + 1;
    }
    return counts;
  }, [allServices]);

  return (
    <section id="service-catalog" className={cn('pt-4 pb-6 md:pt-8 md:pb-16')}>
      <Container>
        {/* Compact hero header — eyebrow + title + CTA in one block */}
        <div className="mb-6 md:mb-8">
          {heroEyebrow && (
            <p className="m-0 mb-1.5 text-[0.72rem] font-extrabold tracking-[0.16em] uppercase text-text-soft">
              {heroEyebrow}
            </p>
          )}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h1 className="m-0 text-[clamp(1.6rem,3.5vw,2.5rem)] leading-[1.05] tracking-[-0.02em] text-text font-semibold max-w-xl">
              {heroTitle ?? 'Our Services'}
            </h1>
            <Button
              size="standard"
              variant="primary"
              href={routes.contact}
              className="shrink-0"
            >
              Book a Free Consultation
              <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mb-6">
          <div className="flex gap-1 overflow-x-auto scrollbar-none pb-1 border-b border-border-soft">
            {categoryTabs.map((tab) => {
              const isActive = activeCategory === tab.key;
              const Icon = tab.icon;
              const count = categoryCounts[tab.key] ?? 0;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveCategory(tab.key)}
                  className={cn(
                    'flex-shrink-0 inline-flex items-center gap-2 px-4 py-3 text-sm font-medium',
                    'transition-all duration-200 ease-out whitespace-nowrap border-b-2 -mb-px',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                    isActive
                      ? 'border-accent text-accent'
                      : 'border-transparent text-text-soft hover:text-text hover:border-border-strong'
                  )}
                  aria-pressed={isActive}
                  aria-label={`Show ${tab.label} services`}
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                  <span>{tab.label}</span>
                  <span
                    className={cn(
                      'text-xs font-semibold px-1.5 py-0.5 rounded-full',
                      isActive
                        ? 'bg-accent text-accent-contrast'
                        : 'bg-surface-soft text-text-soft'
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Loading State — DISABLED (loader extermination).
         * ServiceCardSkeleton returns null now anyway.
         * isPending is always false with fallback data. */}
        {/* {isPending && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <ServiceCardSkeleton key={`skeleton-${i}`} />
            ))}
          </div>
        )} */}

        {/* Error State — only shown when there is NO data at all (fallback exhausted) */}
        {!isPending && isError && !hasServices && (
          <div className={cn(
            'flex flex-col items-center justify-center py-16 text-center',
            'bg-surface rounded-2xl',
            'border border-border-soft'
          )}>
            <AlertCircle className="w-10 h-10 text-error mb-4" aria-hidden="true" />
            <p className="text-text font-medium text-lg mb-1">
              We&apos;re having trouble loading our services.
            </p>
            <p className="text-text-muted text-sm mb-6">
              Please refresh the page or contact support.
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className={cn(
                'inline-flex items-center justify-center gap-2 rounded-full',
                'min-h-[44px] px-6 py-2.5',
                'bg-accent text-accent-contrast text-sm font-semibold',
                'transition-all duration-200 ease-out',
                'hover:bg-accent-hover',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'
              )}
            >
              <RefreshCw className="w-4 h-4" aria-hidden="true" />
              Retry
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isPending && !isError && !hasServices && filteredServices.length === 0 && (
          <div className={cn(
            'flex flex-col items-center justify-center py-16 text-center',
            'bg-surface rounded-2xl',
            'border border-border-soft'
          )}>
            <p className="text-text-muted text-base mb-4">
              No services match the current filters.
            </p>
            <button
              type="button"
              onClick={() => { setActiveCategory('all'); }}
              className={cn(
                'inline-flex items-center justify-center gap-2 rounded-full',
                'min-h-[44px] px-5 py-2.5',
                'bg-accent text-accent-contrast text-sm font-medium',
                'transition-all duration-200 ease-out',
                'hover:bg-accent-hover',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'
              )}
            >
              Show all services
            </button>
          </div>
        )}

        {/* Service Cards Grid — shown with fallback data even when API errors */}
        {!isPending && filteredServices.length > 0 && (
          <>
            {groupedServices ? (
              /* "All Services" view — compact category list, NOT a card grid.
               * Shows 4 category groups with service names as text links.
               * Avoids card overload (was 15 cards; now 0 cards on All view).
               * Users click a service name → detail page. */
              <div className="mt-6 flex flex-col gap-8 md:gap-10">
                {Object.entries(groupedServices).map(([categoryName, services]) => (
                  <div key={categoryName}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-2 w-2 rounded-full bg-accent" />
                      <h2 className="text-sm font-bold uppercase tracking-wider text-text-soft">{categoryName}</h2>
                      <div className="flex-1 h-px bg-border-soft" />
                      <span className="text-xs text-text-muted tabular-nums">{services.length}</span>
                    </div>
                    {/* Compact list: service name + short description + Learn more link */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">
                      {services.map((service) => (
                        <SmartLink
                          key={service.id}
                          href={serviceDetailPath(service.slug)}
                          className="group flex flex-col gap-1 py-2 border-b border-border-soft/50 last:border-0 hover:border-accent/30 transition-colors"
                        >
                          <span className="text-sm md:text-base font-bold text-text leading-tight group-hover:text-accent transition-colors">
                            {service.title}
                          </span>
                          <span className="text-xs text-text-muted leading-relaxed line-clamp-1">
                            {service.short_description}
                          </span>
                        </SmartLink>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Flat grid: single category selected (3-4 cards, manageable) */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {visibleServices.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            )}

            {/* Show More Button (mobile progressive disclosure) */}
            {hasMore && (
              <div className="flex justify-center mt-8">
                <button
                  type="button"
                  onClick={() => setShowAll(true)}
                  className={cn(
                    'inline-flex items-center justify-center gap-2 rounded-full',
                    'min-h-[44px] px-6 py-2.5',
                    'bg-accent text-accent-contrast text-sm font-semibold',
                    'transition-all duration-200 ease-out',
                    'hover:bg-accent-hover',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'
                  )}
                >
                  Show more services
                </button>
              </div>
            )}
          </>
        )}
      </Container>
    </section>
  );
}
