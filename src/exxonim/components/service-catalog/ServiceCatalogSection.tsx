import { useState, useMemo } from 'react';
import { AlertCircle, RefreshCw, Briefcase, ShieldCheck, Plane, Heart } from 'lucide-react';
import { cn } from '@/exxonim/utils/cn';
import { Container } from '@/exxonim/components/primitives/Container';
import { SegmentFilterBar } from './SegmentFilterBar';
import { ServiceCard, ServiceCardSkeleton } from './ServiceCard';
import { useServiceCatalog } from '@/exxonim/hooks/useServiceCatalog';
import type { SegmentFilter } from '@/exxonim/types/service-catalog';

/** Category tab definition with icon */
const categoryTabs = [
  { key: 'all', label: 'All Services', icon: Briefcase },
  { key: 'Business Setup', label: 'Business Setup', icon: Briefcase },
  { key: 'Compliance Support', label: 'Compliance', icon: ShieldCheck },
  { key: 'Work Permits & Foreign Investment', label: 'Work Permits', icon: Plane },
  { key: 'NGOs & Non-Profits', label: 'NGOs & Non-Profits', icon: Heart },
] as const;

type CategoryKey = (typeof categoryTabs)[number]['key'];

export function ServiceCatalogSection() {
  const [activeSegment, setActiveSegment] = useState<SegmentFilter>('all');
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all');
  const { data, isLoading, isError, refetch } = useServiceCatalog(activeSegment);

  // Filter services by both segment and category
  const filteredServices = useMemo(() => {
    const services = data?.data?.services ?? [];
    if (activeCategory === 'all') return services;
    return services.filter((s) => s.category === activeCategory);
  }, [data, activeCategory]);

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
    <section id="service-catalog" className={cn('py-6 md:py-16')}>
      <Container>
        {/* Page Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-text mb-2">
            Our Services
          </h1>
          <p className="text-sm md:text-base max-w-xl text-text-muted">
            Registration, compliance, work permits &amp; NGO advisory. Browse by category or filter by who you are.
          </p>
        </div>

        {/* Segment Filter Bar */}
        <div className="mb-6">
          <SegmentFilterBar
            activeSegment={activeSegment}
            onSegmentChange={setActiveSegment}
          />
        </div>

        {/* Category Tabs */}
        <div className="mb-8">
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

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <ServiceCardSkeleton key={`skeleton-${i}`} />
            ))}
          </div>
        )}

        {/* Error State */}
        {!isLoading && isError && (
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
        {!isLoading && !isError && filteredServices.length === 0 && (
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
              onClick={() => { setActiveSegment('all'); setActiveCategory('all'); }}
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

        {/* Service Cards Grid */}
        {!isLoading && !isError && filteredServices.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}

        {/* Trust Footer */}
        <div className="mt-10 pt-6 border-t border-border-soft text-center">
          <p className="text-xs text-text-soft">
            No hidden prices — tailored consultation &bull; Trusted by businesses across Tanzania
          </p>
        </div>
      </Container>
    </section>
  );
}
