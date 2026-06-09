import { useState, useMemo } from 'react';
import { AlertCircle, RefreshCw, RotateCcw } from 'lucide-react';
import { cn } from '@/exxonim/utils/cn';
import { Container } from '@/exxonim/components/primitives/Container';
import { SegmentFilterBar } from './SegmentFilterBar';
import { ServiceCard, ServiceCardSkeleton } from './ServiceCard';
import { useServiceCatalog } from '@/exxonim/hooks/useServiceCatalog';
import { fallbackCategories } from '@/exxonim/content/fallbackServiceCatalog';
import type { SegmentFilter, ServiceCatalogItem } from '@/exxonim/types/service-catalog';

export function ServiceCatalogSection() {
  const [activeSegment, setActiveSegment] = useState<SegmentFilter>('all');
  const { data, isLoading, isError, refetch } = useServiceCatalog(activeSegment);

  // Group services by category, preserving fallback category order
  const groupedServices = useMemo(() => {
    const services = data?.data?.services ?? [];
    const categories = data?.data?.categories ?? fallbackCategories;

    // Build a map of category -> services
    const categoryMap = new Map<string, ServiceCatalogItem[]>();
    for (const cat of categories) {
      categoryMap.set(cat, []);
    }
    for (const svc of services) {
      const existing = categoryMap.get(svc.category);
      if (existing) {
        existing.push(svc);
      } else {
        // Category not in the predefined list — add it
        categoryMap.set(svc.category, [svc]);
      }
    }

    // Return only categories that have services, in order
    const result: { category: string; services: ServiceCatalogItem[] }[] = [];
    for (const cat of categories) {
      const svcs = categoryMap.get(cat);
      if (svcs && svcs.length > 0) {
        result.push({ category: cat, services: svcs });
      }
    }
    return result;
  }, [data]);

  return (
    <section id="service-catalog" className="py-16 md:py-24">
      <Container>
        {/* Section Header */}
        <div className="grid gap-4 text-center max-w-[min(52ch,90%)] mx-auto mb-8 md:mb-12">
          <h2 className="font-display text-[clamp(1.375rem,3.2vw,1.75rem)] font-medium leading-tight tracking-tight text-text">
            Our Services
          </h2>
          <p className="text-text-muted text-base sm:text-lg leading-relaxed">
            Explore our comprehensive range of business registration, compliance, and advisory
            services tailored for your needs.
          </p>
        </div>

        {/* Segment Filter Bar */}
        <div className="mb-8 md:mb-12">
          <SegmentFilterBar
            activeSegment={activeSegment}
            onSegmentChange={setActiveSegment}
          />
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <ServiceCardSkeleton key={`skeleton-${i}`} />
            ))}
          </div>
        )}

        {/* Error State */}
        {!isLoading && isError && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <AlertCircle className="w-12 h-12 text-[#E67E22] mb-4" aria-hidden="true" />
            <p className="text-text font-medium text-lg mb-2">
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
                'bg-[#0B3B5F] text-white text-sm font-semibold',
                'transition-all duration-200 ease-out',
                'hover:bg-[#1E4A6F]',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B3B5F]',
                'dark:bg-accent dark:text-accent-contrast dark:hover:bg-accent-hover'
              )}
            >
              <RefreshCw className="w-4 h-4" aria-hidden="true" />
              Retry
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && groupedServices.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-text font-medium text-lg mb-2">No services match your filter.</p>
            <p className="text-text-muted text-sm mb-6">
              Try selecting a different segment or view all services.
            </p>
            <button
              type="button"
              onClick={() => setActiveSegment('all')}
              className={cn(
                'inline-flex items-center justify-center gap-2 rounded-full',
                'min-h-[44px] px-6 py-2.5',
                'bg-[#0B3B5F] text-white text-sm font-semibold',
                'transition-all duration-200 ease-out',
                'hover:bg-[#1E4A6F]',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B3B5F]',
                'dark:bg-accent dark:text-accent-contrast dark:hover:bg-accent-hover'
              )}
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              View All Services
            </button>
          </div>
        )}

        {/* Data: Category-grouped cards */}
        {!isLoading && !isError && groupedServices.length > 0 && (
          <div className="grid gap-10 md:gap-12">
            {groupedServices.map((group) => (
              <div key={group.category}>
                {/* Category heading with accent line */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px flex-1 bg-[#0B3B5F]/20 dark:bg-accent/20" />
                  <h3 className="font-display text-lg sm:text-xl font-medium text-[#0B3B5F] dark:text-accent whitespace-nowrap tracking-tight">
                    {group.category}
                  </h3>
                  <div className="h-px flex-1 bg-[#0B3B5F]/20 dark:bg-accent/20" />
                </div>

                {/* Card grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                  {group.services.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
