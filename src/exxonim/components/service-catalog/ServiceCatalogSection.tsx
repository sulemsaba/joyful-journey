import { useMemo } from 'react';
import { AlertCircle, RefreshCw, ArrowRight } from 'lucide-react';
import { cn } from '@/exxonim/utils/cn';
import { Container } from '@/exxonim/components/primitives/Container';
import { SmartLink } from '@/exxonim/components/primitives/SmartLink';
import { serviceDetailPath } from '@/exxonim/routes';
import { useServiceCatalog } from '@/exxonim/hooks/useServiceCatalog';
import type { ServiceCatalogItem } from '@/exxonim/types/service-catalog';

interface ServiceCatalogSectionProps {
  /** Eyebrow text for the compact hero header */
  heroEyebrow?: string;
  /** Title for the compact hero header */
  heroTitle?: string;
}

/** Category display order (controls the order rails appear) */
const CATEGORY_ORDER = [
  'Business Setup',
  'Compliance Support',
  'Work Permits & Foreign Investment',
  'NGOs & Non-Profits',
] as const;

export function ServiceCatalogSection({ heroEyebrow, heroTitle }: ServiceCatalogSectionProps) {
  const { data, isPending, isError, refetch } = useServiceCatalog();

  const allServices = data?.data?.services ?? [];
  const hasServices = allServices.length > 0;

  // Group services by category for the horizontal rails
  const groupedServices = useMemo(() => {
    const groups: Record<string, ServiceCatalogItem[]> = {};
    for (const s of allServices) {
      if (!groups[s.category]) groups[s.category] = [];
      groups[s.category].push(s);
    }
    return groups;
  }, [allServices]);

  return (
    <section id="service-catalog" className="pt-4 pb-6 md:pt-8 md:pb-16">
      <Container>
        {/* Compact hero header — eyebrow + title only (no CTA button; CTA is at page bottom) */}
        <div className="mb-8 md:mb-12">
          {heroEyebrow && (
            <p className="m-0 mb-1.5 text-[0.72rem] font-extrabold tracking-[0.16em] uppercase text-text-soft">
              {heroEyebrow}
            </p>
          )}
          <h1 className="m-0 text-[clamp(1.6rem,3.5vw,2.5rem)] leading-[1.05] tracking-[-0.02em] text-text font-semibold max-w-xl">
            {heroTitle ?? 'Our Services'}
          </h1>
        </div>

        {/* Error State — only shown when there is NO data at all */}
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
              )}
            >
              <RefreshCw className="w-4 h-4" aria-hidden="true" />
              Retry
            </button>
          </div>
        )}

        {/* Category rails — one heading + horizontal scroll per category. No tabs. */}
        {!isPending && hasServices && (
          <div className="flex flex-col gap-10 md:gap-14">
            {CATEGORY_ORDER.map((categoryName) => {
              const services = groupedServices[categoryName] ?? [];
              if (services.length === 0) return null;

              return (
                <div key={categoryName} data-reveal>
                  {/* Category heading */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-2 w-2 rounded-full bg-accent" />
                    <h2 className="text-sm font-bold uppercase tracking-wider text-text-soft">
                      {categoryName}
                    </h2>
                    <div className="flex-1 h-px bg-border-soft" />
                    <span className="text-xs text-text-muted tabular-nums">
                      {services.length}
                    </span>
                  </div>

                  {/* Horizontal scroll rail of minimal cards */}
                  <div
                    className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory [-webkit-mask-image:linear-gradient(to_right,black,black_92%,transparent)] [mask-image:linear-gradient(to_right,black,black_92%,transparent)]"
                    style={{ scrollbarWidth: 'none' }}
                  >
                    {services.map((service) => (
                      <MinimalServiceCard key={service.id} service={service} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
}

/* ── Minimal service card for the horizontal rails ──
 * Very minimal words: title + short description + "See more" link.
 * No badge, no deliverables list, no expand button.
 * "See more" goes to the service detail page.
 */
function MinimalServiceCard({ service }: { service: ServiceCatalogItem }) {
  return (
    <SmartLink
      href={serviceDetailPath(service.slug)}
      className="group snap-start flex-none w-64 md:w-72 flex flex-col gap-2 p-4 rounded-2xl border border-border-soft bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent/30"
    >
      {/* Badge (if any) — small, inline */}
      {service.badge && (
        <span className="inline-flex items-center self-start px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider rounded-full bg-accent-soft text-accent">
          {service.badge}
        </span>
      )}
      {/* Title — minimal */}
      <h3 className="text-sm md:text-base font-bold text-text leading-tight group-hover:text-accent transition-colors">
        {service.title}
      </h3>
      {/* Short description — one line, truncated */}
      <p className="text-xs text-text-muted leading-relaxed line-clamp-2 flex-1">
        {service.short_description}
      </p>
      {/* See more — takes user to detail page */}
      <span className="inline-flex items-center gap-1 mt-1 text-xs font-medium text-accent">
        See more
        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </SmartLink>
  );
}
