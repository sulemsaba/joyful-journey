import { useState, useMemo } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { cn } from '@/exxonim/utils/cn';
import { Container } from '@/exxonim/components/primitives/Container';
import { SegmentFilterBar } from './SegmentFilterBar';
import { ServiceCard, ServiceCardSkeleton } from './ServiceCard';
import { useServiceCatalog } from '@/exxonim/hooks/useServiceCatalog';
import type { SegmentFilter } from '@/exxonim/types/service-catalog';

export function ServiceCatalogSection() {
  const [activeSegment, setActiveSegment] = useState<SegmentFilter>('all');
  const { data, isLoading, isError, refetch } = useServiceCatalog(activeSegment);

  // Flat list of services filtered by segment (no category grouping)
  const filteredServices = useMemo(() => {
    const services = data?.data?.services ?? [];
    return services;
  }, [data]);

  return (
    <section id="service-catalog" className={cn(
      'py-10 md:py-16',
      'bg-[#F8FAFE] dark:bg-page-strong'
    )}>
      <Container>
        {/* Page Header — matching the HTML blueprint */}
        <div className="mb-8 md:mb-10">
          <h1 className={cn(
            'text-[28px] md:text-[36px] font-bold tracking-[-0.3px] mb-2',
            'text-[#0B3B5F] dark:text-accent'
          )}>
            Service catalog
          </h1>
          <p className={cn(
            'text-base max-w-[600px]',
            'text-[#4A5A6E] dark:text-text-muted'
          )}>
            Intelligent business support – registration, compliance, work permits &amp; NGO advisory. Filter by who you are.
          </p>
        </div>

        {/* Segment Filter Bar */}
        <div className="mb-6 md:mb-8">
          <SegmentFilterBar
            activeSegment={activeSegment}
            onSegmentChange={setActiveSegment}
          />
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <ServiceCardSkeleton key={`skeleton-${i}`} />
            ))}
          </div>
        )}

        {/* Error State */}
        {!isLoading && isError && (
          <div className={cn(
            'flex flex-col items-center justify-center py-16 text-center',
            'bg-white dark:bg-surface rounded-[32px]',
            'border border-[#E2E8F0] dark:border-border-soft'
          )}>
            <AlertCircle className="w-12 h-12 text-[#E67E22] mb-4" aria-hidden="true" />
            <p className="text-[#1E2A32] dark:text-text font-medium text-lg mb-2">
              We&apos;re having trouble loading our services.
            </p>
            <p className="text-[#64748B] dark:text-text-muted text-sm mb-6">
              Please refresh the page or contact support.
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className={cn(
                'inline-flex items-center justify-center gap-2 rounded-full',
                'min-h-[44px] px-6 py-2.5',
                'bg-[#0B3B5F] dark:bg-accent text-white dark:text-accent-contrast text-sm font-semibold',
                'transition-all duration-200 ease-out',
                'hover:bg-[#1E4A6F] dark:hover:bg-accent-hover'
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
            'bg-white dark:bg-surface rounded-[32px]',
            'border border-[#E2E8F0] dark:border-border-soft mt-8'
          )}>
            <span className="text-3xl mb-2">🔍</span>
            <p className="text-[#64748B] dark:text-text-muted text-base">
              No services match <strong className="text-[#1E2A32] dark:text-text">{activeSegment.replace(/-/g, ' ')}</strong> segment.
            </p>
            <button
              type="button"
              onClick={() => setActiveSegment('all')}
              className={cn(
                'inline-flex items-center justify-center gap-2 rounded-full',
                'min-h-[44px] px-5 py-2.5',
                'bg-[#0B3B5F] dark:bg-accent text-white dark:text-accent-contrast text-sm font-medium',
                'transition-all duration-200 ease-out',
                'hover:bg-[#1E4A6F] dark:hover:bg-accent-hover',
                'mt-4'
              )}
            >
              Show all services
            </button>
          </div>
        )}

        {/* Service Cards Grid — flat, no category grouping */}
        {!isLoading && !isError && filteredServices.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 mt-4">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}

        {/* Credits Footer — matching the HTML blueprint */}
        <div className="mt-12 pt-8 border-t border-[#E2E8F0] dark:border-border-soft text-center">
          <p className="text-xs text-[#94A3B8] dark:text-text-soft">
            ✅ No hidden prices — tailored consultation &bull; Trusted by businesses across Tanzania
          </p>
        </div>
      </Container>
    </section>
  );
}
