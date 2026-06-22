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
        {/* Compact hero header - eyebrow + title only (no CTA button; CTA is at page bottom) */}
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

        {/* Error State - only shown when there is NO data at all */}
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

        {/* Category rails - one heading + horizontal scroll per category. No tabs. */}
        {!isPending && hasServices && (
          <div className="flex flex-col gap-10 md:gap-14">
            {CATEGORY_ORDER.map((categoryName) => {
              const services = groupedServices[categoryName] ?? [];
              if (services.length === 0) return null;

              return (
                <div key={categoryName} data-reveal>
                  {/* Category heading - white text with left teal border accent */}
                  <h2 className="text-lg md:text-xl font-semibold text-text mb-4 border-l-[3px] border-accent-secondary pl-3 leading-tight">
                    {categoryName}
                  </h2>

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
 * Brand colors: deep navy bg, teal accents, hover-to-expand with white arc.
 * Based on the services card.html reference design.
 * Mobile: permanently expanded (no hover), shows content directly.
 */
function MinimalServiceCard({ service }: { service: ServiceCatalogItem }) {
  return (
    <SmartLink
      href={serviceDetailPath(service.slug)}
      className="group snap-start flex-none w-64 md:w-72 relative overflow-hidden rounded-lg p-4 transition-all duration-400 hover:-translate-y-1.5 hover:shadow-lg"
      style={{ backgroundColor: '#2e3165' }}
    >
      {/* Background arc (hover effect) - white sweep from bottom-left */}
      <span
        className="absolute -bottom-[30%] -left-[30%] w-[160%] h-[160%] rounded-full bg-surface scale-0 origin-bottom-left transition-transform duration-500 ease-out z-0 pointer-events-none group-hover:scale-100"
        aria-hidden="true"
      />

      {/* Default content (visible by default, hidden on hover) */}
      <div className="relative z-10 flex flex-col gap-2 transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-3 group-hover:pointer-events-none">
        {/* Badge (if any) */}
        {service.badge && (
          <span className="inline-flex items-center self-start px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider rounded-full bg-accent-secondary/20 text-accent-secondary">
            {service.badge}
          </span>
        )}
        {/* Eyebrow label - light teal */}
        <span className="text-[0.65rem] font-bold uppercase tracking-wider text-accent-secondary">
          {service.category}
        </span>
        {/* Title - white */}
        <h3 className="text-sm md:text-base font-bold text-white leading-tight">
          {service.title}
        </h3>
      </div>

      {/* Expanded content (hidden by default, visible on hover) */}
      <div className="absolute inset-0 z-20 flex flex-col gap-2 p-4 opacity-0 invisible transition-all duration-300 delay-150 group-hover:opacity-100 group-hover:visible">
        {/* Eyebrow - deep teal */}
        <span className="text-[0.65rem] font-extrabold uppercase tracking-wider text-accent">
          {service.category}
        </span>
        {/* Title - dark text on white */}
        <h3 className="text-sm md:text-base font-bold text-text leading-tight mb-1">
          {service.title}
        </h3>
        {/* Description */}
        <p className="text-xs text-text-muted leading-relaxed line-clamp-3 flex-1">
          {service.short_description}
        </p>
        {/* Deliverables (first 3) with teal checkmarks */}
        {service.deliverables && service.deliverables.length > 0 && (
          <ul className="flex flex-col gap-1 mb-2">
            {service.deliverables.slice(0, 3).map((item, i) => (
              <li key={i} className="flex items-center gap-1.5 text-[0.7rem] font-semibold text-text">
                <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth={3}>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        )}
        {/* See more - deep teal */}
        <span className="inline-flex items-center gap-1 mt-auto text-xs font-bold text-accent">
          See more
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </SmartLink>
  );
}
