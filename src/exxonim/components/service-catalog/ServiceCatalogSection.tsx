import { useMemo } from 'react';
import { AlertCircle, RefreshCw, ArrowRight, Briefcase, ShieldCheck, Plane, Heart } from 'lucide-react';
import { cn } from '@/exxonim/utils/cn';
import { Container } from '@/exxonim/components/primitives/Container';
import { Button } from '@/exxonim/components/primitives/Button';
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
              className="inline-flex items-center justify-center gap-2 rounded-full min-h-[44px] px-6 py-2.5 bg-accent text-accent-contrast text-sm font-semibold transition-colors hover:bg-accent-hover"
            >
              <RefreshCw className="w-4 h-4" aria-hidden="true" />
              Retry
            </button>
          </div>
        )}

        {!isPending && hasServices && (
          <div className="flex flex-col gap-10 md:gap-16">
            {CATEGORY_ORDER.map((categoryName) => {
              const services = groupedServices[categoryName] ?? [];
              if (services.length === 0) return null;
              const Icon = CATEGORY_ICONS[categoryName] ?? Briefcase;

              return (
                <div key={categoryName} data-reveal>
                  {/* Category heading - white text with left teal border */}
                  <h2
                    className="text-text font-semibold mb-6"
                    style={{
                      fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                      letterSpacing: '0.5px',
                      lineHeight: 1.2,
                      borderLeft: '5px solid #7fbcc1',
                      paddingLeft: '1.2rem',
                    }}
                  >
                    {categoryName}
                  </h2>

                  {/* Horizontal scroll rail on desktop/tablet.
                      Mobile: cards stack in a 1-col grid (via CSS). */}
                  <div
                    className="service-card-rail flex gap-7 overflow-x-auto pb-2 snap-x snap-mandatory"
                    style={{ scrollbarWidth: 'none' }}
                  >
                    {services.map((service) => (
                      <ServiceCardExact
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
 * ServiceCardExact — EXACT replica of the HTML reference card.
 *
 * - 380px height, navy bg (#2e3165), 12px radius, 32px padding
 * - Icon top-left, default label + title at bottom
 * - Hover: white arc sweeps in, content swaps to expanded view
 *   (color changes: light teal → deep teal, white → dark text)
 * - Expanded: label, title, 3 deliverables (teal checkmarks), 2 buttons
 * - Mobile: permanently expanded, white bg, no hover
 * - Buttons use our Button primitive (horizontal side-by-side)
 * ═══════════════════════════════════════════════════════════════ */
function ServiceCardExact({
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
    <div
      className="service-card-exact group relative overflow-hidden cursor-default"
      style={{
        height: '320px',
        backgroundColor: '#08181b',
        borderRadius: '12px',
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
        transition: 'transform 0.4s ease, box-shadow 0.4s ease',
      }}
    >
      {/* Background arc — white sweep from bottom-left on hover.
          Also a solid white bg that fades in to cover the full card
          (so top corners stay rounded, not box-like). */}
      <span
        className="service-card-bg-fade absolute inset-0 pointer-events-none"
        style={{
          backgroundColor: '#f7fbfb',
          opacity: 0,
          transition: 'opacity 0.3s ease',
          zIndex: 1,
          borderRadius: '12px',
        }}
      />
      <span
        className="service-card-arc absolute pointer-events-none"
        style={{
          bottom: '-30%',
          left: '-30%',
          width: '160%',
          height: '160%',
          backgroundColor: '#f7fbfb',
          borderRadius: '50%',
          transform: 'scale(0)',
          transformOrigin: 'bottom left',
          transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          zIndex: 2,
        }}
      />

      {/* Default content — visible by default, hidden on hover.
          Icon is in-flow (NOT absolute) so it never overlaps the title. */}
      <div className="service-card-default relative z-10 flex flex-col gap-3">
        {/* Icon — in-flow, top of content. Color set on wrapper so currentColor works */}
        <div style={{ color: '#7fbcc1' }}>
          <Icon
            style={{ width: '40px', height: '40px', strokeWidth: 1.5 }}
            aria-hidden="true"
          />
        </div>
        {/* Default label — light teal, uppercase */}
        <span
          className="block"
          style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            color: '#7fbcc1',
          }}
        >
          {service.category}
        </span>
        {/* Default title — white */}
        <h3
          className="m-0"
          style={{
            color: '#ffffff',
            fontSize: '20px',
            fontWeight: 700,
            lineHeight: 1.3,
          }}
        >
          {service.title}
        </h3>
      </div>

      {/* Expanded content — hidden by default, visible on hover.
          overflow-y: auto so long deliverable lists scroll instead of clipping. */}
      <div
        className="service-card-expanded absolute inset-0 flex flex-col"
        style={{
          zIndex: 3,
          padding: '28px',
          opacity: 0,
          visibility: 'hidden',
          transition: 'opacity 0.4s ease 0.15s, visibility 0.4s',
          justifyContent: 'flex-start',
          overflowY: 'auto',
          scrollbarWidth: 'thin',
        }}
      >
        {/* Expanded label — deep teal */}
        <span
          className="block mb-2 shrink-0"
          style={{
            fontSize: '11px',
            fontWeight: 800,
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            color: '#0f5c63',
          }}
        >
          {service.category}
        </span>
        {/* Expanded title — dark text */}
        <h3
          className="m-0 mb-5 shrink-0"
          style={{
            color: '#08181b',
            fontSize: '22px',
            fontWeight: 800,
            lineHeight: 1.2,
          }}
        >
          {service.title}
        </h3>
        {/* Benefits list — 3 deliverables with teal checkmarks.
            overflow-y: auto on parent handles scrolling if too long. */}
        {deliverables.length > 0 && (
          <ul className="list-none m-0 mb-6 flex flex-col gap-2.5">
            {deliverables.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5"
                style={{
                  fontSize: '14px',
                  color: '#102529',
                  fontWeight: 600,
                  lineHeight: 1.4,
                }}
              >
                <svg
                  className="shrink-0 mt-0.5"
                  style={{ width: '18px', height: '18px', stroke: '#0f5c63', fill: 'none', strokeWidth: 3 }}
                  viewBox="0 0 24 24"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
        {/* Button group — HORIZONTAL: deep teal bg (not theme accent) for white arc bg.
            Using inline style override because Button primitive uses theme colors
            which resolve to light teal in dark mode — wrong for the white card bg. */}
        <div className="mt-auto flex flex-row gap-2.5 shrink-0">
          <Button
            size="standard"
            variant="primary"
            href={ctaLink}
            className="flex-1 service-card-btn-primary"
          >
            {ctaText}
          </Button>
          <Button
            size="standard"
            variant="outline"
            href={detailLink}
            className="flex-1 service-card-btn-secondary"
          >
            Details
            <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
}
