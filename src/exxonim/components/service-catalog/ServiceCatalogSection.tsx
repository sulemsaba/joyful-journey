import { useMemo } from 'react';
import { AlertCircle, RefreshCw, ArrowRight, Briefcase, ShieldCheck, Plane, Heart, Check } from 'lucide-react';
import { cn } from '@/exxonim/utils/cn';
import { Container } from '@/exxonim/components/primitives/Container';
import { Button } from '@/exxonim/components/primitives/Button';
import { SmartLink } from '@/exxonim/components/primitives/SmartLink';
import { serviceDetailPath } from '@/exxonim/routes';
import { useServiceCatalog } from '@/exxonim/hooks/useServiceCatalog';
import type { ServiceCatalogItem } from '@/exxonim/types/service-catalog';

interface ServiceCatalogSectionProps {
  heroEyebrow?: string;
  heroTitle?: string;
}

const CATEGORY_ORDER = [
  'Business Setup',
  'Compliance Support',
  'Work Permits & Foreign Investment',
  'NGOs & Non-Profits',
] as const;

const CATEGORY_ICONS: Record<string, typeof Briefcase> = {
  'Business Setup': Briefcase,
  'Compliance Support': ShieldCheck,
  'Work Permits & Foreign Investment': Plane,
  'NGOs & Non-Profits': Heart,
};

export function ServiceCatalogSection({ heroEyebrow, heroTitle }: ServiceCatalogSectionProps) {
  const { data, isPending, isError, refetch } = useServiceCatalog();

  const allServices = data?.data?.services ?? [];
  const hasServices = allServices.length > 0;

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

        {!isPending && isError && !hasServices && (
          <div className="flex flex-col items-center justify-center py-16 text-center bg-surface rounded-2xl border border-border-soft">
            <AlertCircle className="w-10 h-10 text-error mb-4" aria-hidden="true" />
            <p className="text-text font-medium text-lg mb-1">We&apos;re having trouble loading our services.</p>
            <p className="text-text-muted text-sm mb-6">Please refresh the page or contact support.</p>
            <button
              type="button"
              onClick={() => refetch()}
              className="inline-flex items-center justify-center gap-2 rounded-full min-h-[44px] px-6 py-2.5 bg-accent text-accent-contrast text-sm font-semibold transition-all hover:bg-accent-hover"
            >
              <RefreshCw className="w-4 h-4" aria-hidden="true" />
              Retry
            </button>
          </div>
        )}

        {!isPending && hasServices && (
          <div className="flex flex-col gap-10 md:gap-14">
            {CATEGORY_ORDER.map((categoryName) => {
              const services = groupedServices[categoryName] ?? [];
              if (services.length === 0) return null;
              const Icon = CATEGORY_ICONS[categoryName] ?? Briefcase;

              return (
                <div key={categoryName} data-reveal>
                  {/* Category heading - white text with left teal border */}
                  <h2
                    className="text-text font-semibold mb-4 md:mb-6"
                    style={{
                      fontSize: 'clamp(1.4rem, 2.5vw, 1.875rem)',
                      letterSpacing: '0.5px',
                      lineHeight: 1.2,
                      borderLeft: '4px solid var(--color-accent-secondary)',
                      paddingLeft: '1rem',
                    }}
                  >
                    {categoryName}
                  </h2>

                  {/* Horizontal scroll rail on desktop/tablet.
                      Mobile: cards stack in a 1-col grid (handled by CSS). */}
                  <div
                    className="service-card-rail flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory md:gap-5"
                    style={{ scrollbarWidth: 'none' }}
                  >
                    {services.map((service) => (
                      <ServiceCard
                        key={service.id}
                        service={service}
                        Icon={Icon}
                      />
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

/* ═══════════════════════════════════════════════════════════════
 * ServiceCard — matches our design system.
 *
 * DESIGN DECISIONS (based on existing components):
 * - Card bg: bg-surface with border-border-soft (same as blog cards)
 * - Border radius: rounded-[8px] (same as blog cards)
 * - No fixed height — content flows naturally (no dead space)
 * - Icon: 44px chip with bg-accent-soft text-accent (same pattern as
 *   pricing cards, About page "Who we serve")
 * - Buttons: our Button primitive (variant="primary" + variant="outline")
 *   sized standard, rounded-full — same as everywhere on the site
 * - Hover: subtle lift + border color change (same as blog cards)
 *
 * Desktop/Tablet: horizontal scroll rail (flex-none w-72 cards)
 * Mobile: stacks in a 1-col grid (via CSS media query)
 * ═══════════════════════════════════════════════════════════════ */
function ServiceCard({
  service,
  Icon,
}: {
  service: ServiceCatalogItem;
  Icon: typeof Briefcase;
}) {
  const ctaLink = service.cta_link || '/contact';
  const ctaText = service.cta_text || 'Get Started';
  const detailLink = serviceDetailPath(service.slug);
  const deliverables = (service.deliverables ?? []).slice(0, 3);

  return (
    <article
      className="service-card group relative flex min-w-0 flex-col overflow-hidden rounded-[8px] border border-border-soft bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent/30"
    >
      {/* Top section: icon + eyebrow + title + description */}
      <div className="flex flex-col gap-3 p-5 md:p-6 flex-1">
        {/* Icon chip - same pattern as pricing/About cards */}
        <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-accent-soft text-accent transition-transform duration-300 group-hover:scale-110">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>

        {/* Eyebrow - light teal, uppercase */}
        <span className="text-[0.7rem] font-extrabold uppercase tracking-[0.14em] text-accent">
          {service.category}
        </span>

        {/* Title */}
        <h3 className="m-0 text-base md:text-lg font-bold text-text leading-tight group-hover:text-accent transition-colors">
          {service.title}
        </h3>

        {/* Short description */}
        <p className="m-0 text-sm text-text-muted leading-relaxed line-clamp-2">
          {service.short_description}
        </p>

        {/* Deliverables (first 3) with teal checkmarks */}
        {deliverables.length > 0 && (
          <ul className="list-none m-0 mt-1 flex flex-col gap-1.5">
            {deliverables.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-text leading-relaxed">
                <Check className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Bottom: CTA buttons - horizontal, using our Button primitive */}
      <div className="flex flex-row gap-2 p-4 md:p-5 pt-0">
        <Button
          size="standard"
          variant="primary"
          href={ctaLink}
          className="flex-1"
        >
          {ctaText}
        </Button>
        <Button
          size="standard"
          variant="outline"
          href={detailLink}
          className="flex-1"
        >
          Details
          <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </article>
  );
}
