import { useMemo } from 'react';
import { AlertCircle, RefreshCw, ArrowRight, Briefcase } from 'lucide-react';
import { cn } from '@/exxonim/utils/cn';
import { Container } from '@/exxonim/components/primitives/Container';
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

        {!isPending && hasServices && (
          <div className="flex flex-col gap-10 md:gap-20">
            {CATEGORY_ORDER.map((categoryName) => {
              const services = groupedServices[categoryName] ?? [];
              if (services.length === 0) return null;

              return (
                <div key={categoryName} data-reveal>
                  {/* Category title — exact match to HTML reference */}
                  <h2
                    className="text-text font-semibold mb-8"
                    style={{
                      fontSize: 'clamp(1.6rem, 3vw, 2rem)',
                      letterSpacing: '0.5px',
                      lineHeight: 1.2,
                      borderLeft: '5px solid var(--color-accent-secondary)',
                      paddingLeft: '1.2rem',
                    }}
                  >
                    {categoryName}
                  </h2>

                  {/* Grid — exact match to HTML reference */}
                  <div
                    className="grid gap-7"
                    style={{
                      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    }}
                  >
                    {services.map((service) => (
                      <ServiceCardExact key={service.id} service={service} />
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
 * - 380px height, navy bg (#2e3165), 12px radius, 32px padding
 * - Icon top-left, default label + title at bottom
 * - Hover: white arc sweeps in, content swaps to expanded view
 * - Expanded: label, title, 3 deliverables (teal checkmarks), 2 buttons
 * - Mobile: permanently expanded, white bg, no hover
 * ═══════════════════════════════════════════════════════════════ */
function ServiceCardExact({ service }: { service: ServiceCatalogItem }) {
  const ctaLink = service.cta_link || '/contact';
  const ctaText = service.cta_text || 'Get Started';
  const detailLink = serviceDetailPath(service.slug);
  const deliverables = (service.deliverables ?? []).slice(0, 3);

  return (
    <div
      className="service-card-exact group relative overflow-hidden cursor-default"
      style={{
        height: '380px',
        backgroundColor: '#2e3165',
        borderRadius: '12px',
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
        transition: 'transform 0.4s ease, box-shadow 0.4s ease',
      }}
    >
      {/* Background arc — white sweep from bottom-left on hover */}
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
          zIndex: 0,
        }}
      />

      {/* Default content — visible by default, hidden on hover */}
      <div className="service-card-default relative z-10">
        {/* Icon — top-left, larger with subtle circular bg */}
        <div
          className="absolute flex items-center justify-center rounded-xl"
          style={{
            top: '28px',
            left: '28px',
            width: '56px',
            height: '56px',
            backgroundColor: 'rgba(127, 188, 193, 0.15)',
          }}
        >
          <Briefcase
            style={{ width: '28px', height: '28px', stroke: '#7fbcc1', strokeWidth: 1.5, fill: 'none' }}
            aria-hidden="true"
          />
        </div>
        {/* Default label — light teal, uppercase */}
        <span
          className="block mb-2"
          style={{
            fontSize: '12px',
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
            fontSize: '24px',
            fontWeight: 700,
            lineHeight: 1.3,
            maxWidth: '90%',
          }}
        >
          {service.title}
        </h3>
      </div>

      {/* Expanded content — hidden by default, visible on hover */}
      <div
        className="service-card-expanded absolute inset-0 flex flex-col"
        style={{
          zIndex: 2,
          padding: '36px 32px',
          opacity: 0,
          visibility: 'hidden',
          transition: 'opacity 0.4s ease 0.15s, visibility 0.4s',
          justifyContent: 'flex-start',
        }}
      >
        {/* Expanded label — deep teal */}
        <span
          className="block mb-2"
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
          className="m-0 mb-6"
          style={{
            color: '#08181b',
            fontSize: '22px',
            fontWeight: 800,
            lineHeight: 1.2,
          }}
        >
          {service.title}
        </h3>
        {/* Benefits list — 3 deliverables with teal checkmarks */}
        {deliverables.length > 0 && (
          <ul className="list-none m-0 mb-8 flex flex-col gap-3">
            {deliverables.map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-2.5"
                style={{
                  fontSize: '15px',
                  color: '#2c3052',
                  fontWeight: 600,
                }}
              >
                <svg
                  className="shrink-0"
                  style={{ width: '20px', height: '20px', stroke: '#0f5c63', fill: 'none', strokeWidth: 3 }}
                  viewBox="0 0 24 24"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        )}
        {/* Button group — HORIZONTAL: one filled + one outlined */}
        <div className="mt-auto flex flex-row gap-2.5">
          {/* Primary button — filled deep teal */}
          <SmartLink
            href={ctaLink}
            className="service-btn-primary inline-flex items-center justify-center text-center no-underline"
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '14px',
              backgroundColor: '#0f5c63',
              color: '#f7fbfb',
              boxShadow: '0 4px 12px rgba(15, 92, 99, 0.25)',
              transition: 'background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',
            }}
          >
            {ctaText}
          </SmartLink>
          {/* Secondary button — outlined */}
          <SmartLink
            href={detailLink}
            className="service-btn-secondary inline-flex items-center justify-center text-center no-underline"
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '14px',
              backgroundColor: 'transparent',
              color: '#0f5c63',
              border: '2px solid rgba(15, 92, 99, 0.2)',
              transition: 'border-color 0.2s ease, background-color 0.2s ease',
            }}
          >
            See Details
          </SmartLink>
        </div>
      </div>
    </div>
  );
}
