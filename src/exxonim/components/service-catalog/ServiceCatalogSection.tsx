import { lazy, Suspense, useMemo, useState } from 'react';
import { AlertCircle, RefreshCw, ArrowRight, Check, Briefcase, ShieldCheck, Plane, Heart } from 'lucide-react';
import { Container } from '@/exxonim/components/primitives/Container';
import { SmartLink } from '@/exxonim/components/primitives/SmartLink';
/* Lazy: keeps PhoneInput + country flags out of this section's chunk until a
   visitor opens an inquiry. */
const ServiceInquiryModal = lazy(() =>
  import('@/exxonim/components/ServiceInquiryModal').then((m) => ({ default: m.ServiceInquiryModal })),
);
import { serviceAnchorId } from '@/exxonim/components/ServiceSearchBox';
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

  /* Which service's quick-inquiry modal is open (null = closed). Lifted here so a
     single modal instance serves every card. */
  const [inquiryService, setInquiryService] = useState<ServiceCatalogItem | null>(null);

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

  // Show the four known categories first (in their fixed order), then ANY other
  // category that appears in the data — so a newly-added category shows up here
  // automatically instead of being hidden by a hard-coded list.
  const categoryList = useMemo(() => {
    const known = CATEGORY_ORDER.filter((c) => (groupedServices[c] ?? []).length > 0);
    const extra = Object.keys(groupedServices).filter((c) => !(CATEGORY_ORDER as readonly string[]).includes(c));
    return [...known, ...extra];
  }, [groupedServices]);

  return (
    <section id="service-catalog" className="pt-4 pb-6 md:pt-8 md:pb-16">
      <Container>
        <div className="mb-8 md:mb-12">
          {heroEyebrow && (
            <p className="m-0 mb-1.5 text-2xs font-extrabold tracking-[0.16em] uppercase text-text-soft">
              {heroEyebrow}
            </p>
          )}
          <h1 className="m-0 text-[clamp(1.6rem,3.5vw,2.5rem)] leading-[1.05] tracking-[-0.02em] text-text font-semibold max-w-xl">
            {heroTitle ?? 'Browse Services'}
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
          <div className="flex flex-col gap-10 md:gap-14">
            {categoryList.map((categoryName) => {
              const services = groupedServices[categoryName] ?? [];
              if (services.length === 0) return null;
              const Icon = CATEGORY_ICONS[categoryName] ?? Briefcase;

              return (
                <div key={categoryName} data-reveal>
                  {/* Category heading — left teal rule */}
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

                  {/* Horizontal scroll rail — cards keep full, auto-height content
                      (no clipped deliverables); they just scroll sideways. */}
                  <div
                    className="flex gap-6 overflow-x-auto pb-3 snap-x snap-mandatory"
                    style={{ scrollbarWidth: 'none' }}
                  >
                    {services.map((service) => (
                      <ServiceCard
                        key={service.id}
                        service={service}
                        Icon={Icon}
                        onGetStarted={() => setInquiryService(service)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Container>

      {/* One shared quick-inquiry modal, opened by any card's "Get Started". */}
      {inquiryService !== null && (
        <Suspense fallback={null}>
          <ServiceInquiryModal
            open={inquiryService !== null}
            serviceSlug={inquiryService?.slug ?? null}
            serviceTitle={inquiryService?.title ?? null}
            serviceCategory={inquiryService?.category ?? null}
            onClose={() => setInquiryService(null)}
          />
        </Suspense>
      )}
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
 * ServiceCard — always-visible card (icon + category + title + blurb +
 * up to 4 deliverables + Get Started / Details). Auto height so nothing
 * clips; the whole card links to the detail page, buttons sit above it.
 * ═══════════════════════════════════════════════════════════════ */
function ServiceCard({
  service,
  Icon,
  onGetStarted,
}: {
  service: ServiceCatalogItem;
  Icon: typeof Briefcase;
  onGetStarted: () => void;
}) {
  const ctaText = service.cta_text || 'Get Started';
  const detailLink = serviceDetailPath(service.slug);
  const blurb = service.short_description || service.hover_hint || service.card_preview || '';
  const deliverables = (service.deliverables ?? []).filter(Boolean).slice(0, 4);

  return (
    <div
      id={serviceAnchorId(service.title)}
      data-service-title={service.title}
      className="group relative flex w-[340px] shrink-0 snap-start flex-col scroll-mt-24 transition-transform duration-300 hover:-translate-y-1"
      style={{ backgroundColor: '#08181b', borderRadius: 14, padding: 26, boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }}
    >
      {/* Whole-card link → service detail (buttons sit above it). */}
      <SmartLink
        to={detailLink}
        aria-label={`${service.title} — view details`}
        className="absolute inset-0 z-0 rounded-[14px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7fbcc1] focus-visible:ring-inset"
      >
        <span />
      </SmartLink>

      {service.badge && (
        <span
          className="absolute top-5 right-5 z-10 rounded-full px-2.5 py-1 pointer-events-none"
          style={{ background: 'rgba(127,188,193,0.16)', color: '#7fbcc1', fontSize: 10.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}
        >
          {service.badge}
        </span>
      )}

      <div className="pointer-events-none relative z-10 flex flex-1 flex-col">
        <Icon style={{ width: 38, height: 38, color: '#7fbcc1', strokeWidth: 1.5 }} aria-hidden="true" />
        <span className="mt-4 block" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#7fbcc1' }}>
          {service.category}
        </span>
        <h3 className="m-0 mt-1" style={{ color: '#ffffff', fontSize: 20, fontWeight: 700, lineHeight: 1.3 }}>
          {service.title}
        </h3>
        {blurb && (
          <p className="m-0 mt-2 text-sm" style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.55 }}>{blurb}</p>
        )}
        {deliverables.length > 0 && (
          <ul className="mt-4 mb-0 flex flex-col gap-2 list-none p-0">
            {deliverables.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.9)', lineHeight: 1.4 }}>
                <Check className="shrink-0" style={{ width: 16, height: 16, color: '#7fbcc1', strokeWidth: 3, marginTop: 2 }} aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Buttons — above the whole-card link. */}
      <div className="pointer-events-auto relative z-[1] mt-6 flex gap-2.5">
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onGetStarted(); }}
          className="flex-1 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
          style={{ background: '#7fbcc1', color: '#08181b', padding: '10px 0' }}
        >
          {ctaText}
        </button>
        <SmartLink
          to={detailLink}
          className="flex-1 inline-flex items-center justify-center gap-1 rounded-lg border border-white/30 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
        >
          Details
          <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
        </SmartLink>
      </div>
    </div>
  );
}
