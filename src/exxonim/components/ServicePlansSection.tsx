
/**
 * ServicePackagesSection - Segment-filtered plan tiers.
 *
 * Redesigned with a card-deck carousel on mobile:
 *   - 4 segment filter buttons at top (Local Entrepreneurs, Foreign Investors, Enterprises, NGOs)
 *   - 3 tier cards per segment (Starter, Growth, Premium)
 *   - NO prices - CTA drives to consultation instead
 *   - Mobile (< lg): Card deck carousel with peek/triangle-fan effect
 *   - Desktop (≥ lg): 3-column grid layout
 *
 * DESIGN CONSTRAINTS (for admin-managed content):
 * ─────────────────────────────────────────────
 * - Card width is fixed at 280px in the carousel (portrait rectangle).
 * - Max 8 features recommended per card for visual balance.
 * - Description recommended max ~120 chars for clean card layout.
 * - Badge text recommended max ~15 chars to fit the pill.
 * - CTA text recommended max ~20 chars to fit the button.
 * - When data comes from the admin API, these limits should be
 *   enforced server-side AND gracefully handled in the UI (text
 *   truncation with ellipsis for overflow).
 *
 * Also includes the testimonial marquee (unchanged).
 */

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronLeft, ChevronRight, Star, X, Users, Globe, Building2, Heart } from "lucide-react";
import { Container } from "./primitives/Container";
import { Button } from "./primitives/Button";
import { CardDeckCarousel } from "./CardDeckCarousel";
import { PlanInquiryModal } from "./PlanInquiryModal";
import { useServicePackages } from "@/exxonim/hooks/useServicePackages";
import { useTestimonials } from "@/exxonim/hooks/useTestimonials";
import { cn } from "@/exxonim/utils/cn";
import type { SegmentPackage, Testimonial } from '@/exxonim/types';

type ServicePackagesSectionProps = {
  variant?: "home" | "page";
};

/* ── Segment definitions ────────────────────────────────────── */
type SegmentKey = 'local-entrepreneurs' | 'foreign-investors' | 'enterprises' | 'ngos';

const segments: { key: SegmentKey; label: string; shortLabel: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: 'local-entrepreneurs', label: 'Local Entrepreneurs', shortLabel: 'Local', icon: Users },
  { key: 'foreign-investors', label: 'Foreign Investors', shortLabel: 'Foreign', icon: Globe },
  { key: 'enterprises', label: 'Enterprises', shortLabel: 'Enterprise', icon: Building2 },
  { key: 'ngos', label: 'NGOs & Non-Profits', shortLabel: 'NGO', icon: Heart },
];

/* ── Plan data per segment ──────────────────────────────────
 * The `segmentPlans` object below is the BUNDLED FALLBACK — it renders
 * instantly and whenever a segment has no admin-published packages, so the
 * section is never empty (empty DB or API outage). When the admin publishes
 * packages for a segment (via /admin/service-packages → /api/v1/pricing/packages),
 * those override the fallback for that segment. See resolvePlans() below. */
interface SegmentPlan {
  name: string;
  badge: string | null;
  description: string;
  features: { label: string; included: boolean }[];
  cta: string;
}

/* A plan ready to render: either a bundled fallback or an admin package,
 * with `featured` resolved (fallback: has a badge; admin: recommended flag). */
type ResolvedPlan = SegmentPlan & { featured: boolean };

const segmentPlans: Record<SegmentKey, SegmentPlan[]> = {
  'local-entrepreneurs': [
    {
      name: 'Starter',
      badge: null,
      description: 'Essential registration and compliance to get your business legally operating.',
      features: [
        { label: 'Business Name Registration', included: true },
        { label: 'TIN Application', included: true },
        { label: 'Business License (1 sector)', included: true },
        { label: 'Annual Returns Filing', included: true },
        { label: 'Statutory Filings (PAYE/SDL)', included: false },
        { label: 'Dedicated Compliance Advisor', included: false },
      ],
      cta: 'Get Started',
    },
    {
      name: 'Growth',
      badge: 'Most Popular',
      description: 'Full registration, ongoing compliance, and filing support for growing businesses.',
      features: [
        { label: 'Company Registration (COI)', included: true },
        { label: 'TIN + Business License', included: true },
        { label: 'Annual Returns + Beneficial Ownership', included: true },
        { label: 'Statutory Filings (PAYE/SDL/WCF)', included: true },
        { label: 'Regulatory Renewals Tracking', included: true },
        { label: 'Dedicated Compliance Advisor', included: false },
      ],
      cta: 'Get Started',
    },
    {
      name: 'Premium',
      badge: null,
      description: 'Complete compliance management with a dedicated advisor and proactive tracking.',
      features: [
        { label: 'Everything in Growth', included: true },
        { label: 'Trademark Registration', included: true },
        { label: 'Statutory Filings (all obligations)', included: true },
        { label: 'Regulatory Renewals + Reminders', included: true },
        { label: 'Dedicated Compliance Advisor', included: true },
        { label: 'Quarterly Compliance Review', included: true },
      ],
      cta: 'Book Consultation',
    },
  ],
  'foreign-investors': [
    {
      name: 'Starter',
      badge: null,
      description: 'Essential registration and work permit support to enter the Tanzanian market.',
      features: [
        { label: 'Company Registration (COI)', included: true },
        { label: 'TIN Application', included: true },
        { label: 'Work Permit (Class A or B)', included: true },
        { label: 'TIC/TISEZA Registration', included: false },
        { label: 'Regulatory Renewals Tracking', included: false },
        { label: 'Cross-border Document Support', included: false },
      ],
      cta: 'Get Started',
    },
    {
      name: 'Growth',
      badge: 'Most Popular',
      description: 'Full registration, work permits, and investment centre compliance.',
      features: [
        { label: 'Company Registration (COI)', included: true },
        { label: 'TIN + Business License', included: true },
        { label: 'Work Permit Application', included: true },
        { label: 'TIC/TISEZA Registration', included: true },
        { label: 'Annual Returns + Renewals', included: true },
        { label: 'Cross-border Document Support', included: false },
      ],
      cta: 'Get Started',
    },
    {
      name: 'Premium',
      badge: null,
      description: 'End-to-end foreign investment setup with ongoing compliance management.',
      features: [
        { label: 'Everything in Growth', included: true },
        { label: 'Foreign Company Registration', included: true },
        { label: 'Cross-border Document Legalisation', included: true },
        { label: 'Regulatory Renewals + Reminders', included: true },
        { label: 'Dedicated Compliance Advisor', included: true },
        { label: 'Quarterly Compliance Review', included: true },
      ],
      cta: 'Book Consultation',
    },
  ],
  'enterprises': [
    {
      name: 'Starter',
      badge: null,
      description: 'Core registration and statutory filings for established businesses.',
      features: [
        { label: 'Company Registration', included: true },
        { label: 'TIN + Business License', included: true },
        { label: 'Annual Returns Filing', included: true },
        { label: 'Statutory Filings (PAYE/SDL/WCF)', included: true },
        { label: 'Operational Advisory', included: false },
        { label: 'Dedicated Compliance Advisor', included: false },
      ],
      cta: 'Get Started',
    },
    {
      name: 'Growth',
      badge: 'Most Popular',
      description: 'Comprehensive compliance management with proactive tracking and filing support.',
      features: [
        { label: 'Full Registration Suite', included: true },
        { label: 'All Statutory Filings', included: true },
        { label: 'Annual Returns + Beneficial Ownership', included: true },
        { label: 'Regulatory Renewals Tracking', included: true },
        { label: 'Trademark Protection', included: true },
        { label: 'Dedicated Compliance Advisor', included: false },
      ],
      cta: 'Get Started',
    },
    {
      name: 'Premium',
      badge: null,
      description: 'Full-scale compliance operations with dedicated advisor and strategic guidance.',
      features: [
        { label: 'Everything in Growth', included: true },
        { label: 'Operational Advisory', included: true },
        { label: 'Dedicated Compliance Advisor', included: true },
        { label: 'Document Management System', included: true },
        { label: 'Quarterly Compliance Review', included: true },
        { label: 'Forward-looking Strategy', included: true },
      ],
      cta: 'Book Consultation',
    },
  ],
  'ngos': [
    {
      name: 'Starter',
      badge: null,
      description: 'Essential NGO registration and initial compliance for new non-profits.',
      features: [
        { label: 'NGO Registration', included: true },
        { label: 'Constitution Drafting', included: true },
        { label: 'Initial Governance Roadmap', included: true },
        { label: 'Donor-readiness Pack', included: false },
        { label: 'Tax Exemption Guidance', included: false },
        { label: 'Annual Compliance Reporting', included: false },
      ],
      cta: 'Get Started',
    },
    {
      name: 'Growth',
      badge: 'Donor-Ready',
      description: 'Complete NGO setup with donor compliance and governance documentation.',
      features: [
        { label: 'NGO Registration (Enhanced)', included: true },
        { label: 'Constitution + Governance Framework', included: true },
        { label: 'Tax Exemption Certificate Guidance', included: true },
        { label: 'Donor-readiness Pack', included: true },
        { label: 'Annual Compliance Reporting', included: true },
        { label: 'Board Meeting Templates', included: false },
      ],
      cta: 'Get Started',
    },
    {
      name: 'Premium',
      badge: null,
      description: 'Full NGO compliance management with ongoing reporting and governance support.',
      features: [
        { label: 'Everything in Growth', included: true },
        { label: 'Annual Activity & Financial Reports', included: true },
        { label: 'Donor Compliance Attestation', included: true },
        { label: 'Board Minutes & Governance File', included: true },
        { label: 'Tax Exemption Renewal Support', included: true },
        { label: 'Dedicated NGO Compliance Advisor', included: true },
      ],
      cta: 'Book Consultation',
    },
  ],
};

/* ═══════════════════════════════════════════════════════════════
 * TestimonialCard
 * ═══════════════════════════════════════════════════════════════ */
const TestimonialCard = memo(function TestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  return (
    <article
      className="flex h-[200px] md:h-[220px] flex-col rounded-2xl border border-border-soft bg-surface py-5 md:py-6 px-4 mx-1"
      aria-label={`Testimonial from ${testimonial.name}`}
    >
      <p className="flex items-center gap-0.5 text-star mb-3" aria-label="5 out of 5 stars">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
        ))}
      </p>
      <p className="text-sm leading-relaxed text-text-muted flex-1">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <div className="mt-auto flex items-center gap-2.5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-contrast">
          {testimonial.initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-text">{testimonial.name}</p>
          <p className="text-xs text-text-muted">{testimonial.role}</p>
        </div>
      </div>
    </article>
  );
});

/* ═══════════════════════════════════════════════════════════════
 * TestimonialMarquee - lightweight scroll-based marquee
 *
 * Auto-scrolls using a lightweight setInterval (not rAF).
 * No variable speed, no fractional pixel accumulation.
 * Pauses on hover/touch, resumes after 3s of inactivity.
 * Arrow buttons skip by one card width.
 * ═══════════════════════════════════════════════════════════════ */
const TestimonialMarquee = memo(function TestimonialMarquee({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [showArrows, setShowArrows] = useState(false);
  const rafIdRef = useRef<number>(0);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollingPaused = useRef(false);

  const items = [...testimonials, ...testimonials, ...testimonials];
  const CARD_WIDTH = 320;

  const startScrolling = useCallback(() => {
    if (rafIdRef.current) return;
    let lastTime = performance.now();
    const animate = (now: number) => {
      if (document.hidden) {
        rafIdRef.current = requestAnimationFrame(animate);
        return;
      }
      const delta = now - lastTime;
      if (delta >= 16 && !scrollingPaused.current) {
        lastTime = now;
        const el = trackRef.current;
        if (!el) return;
        el.scrollLeft += 0.3;
        const setWidth = el.scrollWidth / 3;
        if (el.scrollLeft >= setWidth) el.scrollLeft -= setWidth;
      }
      rafIdRef.current = requestAnimationFrame(animate);
    };
    rafIdRef.current = requestAnimationFrame(animate);
  }, []);

  const stopScrolling = useCallback(() => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = 0;
    }
  }, []);

  /* ── Pause on interaction, auto-resume after 3s ── */
  const pauseTemporarily = useCallback(() => {
    scrollingPaused.current = true;
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => { scrollingPaused.current = false; }, 3000);
  }, []);

  /* ── Arrow navigation ── */
  const handleArrowClick = useCallback((direction: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: direction === "left" ? -CARD_WIDTH : CARD_WIDTH, behavior: "smooth" });
    pauseTemporarily();
  }, [pauseTemporarily]);

  /* ── Start scrolling when component mounts ── */
  useEffect(() => {
    startScrolling();
    return stopScrolling;
  }, [startScrolling, stopScrolling]);

  useEffect(() => {
    return () => {
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    };
  }, []);

  return (
    <div
      className="full-bleed group relative overflow-hidden [-webkit-mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]"
      aria-label="Client testimonials"
      onMouseEnter={() => { setShowArrows(true); pauseTemporarily(); }}
      onMouseLeave={() => { setShowArrows(false); pauseTemporarily(); }}
    >
      <div
        ref={trackRef}
        onPointerDown={() => pauseTemporarily()}
        className="flex overflow-x-auto scrollbar-none select-none touch-pan-y"
        style={{ WebkitOverflowScrolling: "touch", cursor: "grab" }}
      >
        {items.map((testimonial, index) => (
          <div key={`${testimonial.id}-${index}`} className="flex-none w-[280px] md:w-80">
            <TestimonialCard testimonial={testimonial} />
          </div>
        ))}
      </div>
      <Button size="icon" variant="secondary"
        className={cn("shadow-md backdrop-blur-sm", "absolute left-3 md:left-4 top-1/2 -translate-y-1/2 z-10", "hidden md:flex", "opacity-0 pointer-events-none", showArrows && "md:opacity-100 md:pointer-events-auto")}
        onClick={() => handleArrowClick("left")} aria-label="Previous testimonials"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <Button size="icon" variant="secondary"
        className={cn("shadow-md backdrop-blur-sm", "absolute right-3 md:right-4 top-1/2 -translate-y-1/2 z-10", "hidden md:flex", "opacity-0 pointer-events-none", showArrows && "md:opacity-100 md:pointer-events-auto")}
        onClick={() => handleArrowClick("right")} aria-label="Next testimonials"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );
});

/* ═══════════════════════════════════════════════════════════════
 * SegmentPlanCard - Modern portrait pricing card
 *
 * Design inspired by Linear / Vercel / Stripe pricing patterns:
 *   - Floating pill badge (absolute, centered, overlaps top border)
 *   - Featured card: elevated shadow + accent border + glow
 *   - Clear visual hierarchy: plan name → description → features → CTA
 *   - Hover lift effect on all cards
 *
 * DESIGN NOTES (for admin-managed content):
 * - Card is a vertical rectangle (portrait orientation).
 * - In the mobile carousel, width is 280px; in desktop grid, max 320px.
 * - Featured card has a floating pill badge + glow + elevated shadow.
 * - Features list uses flex-1 to push CTA button to the bottom.
 * - Max 8 features recommended. More features = taller card.
 * - Description max ~120 chars recommended for clean layout.
 * - Badge text max ~20 chars recommended to fit the pill.
 * ═══════════════════════════════════════════════════════════════ */
const SegmentPlanCard = memo(function SegmentPlanCard({ plan, featured, compact, onCtaClick }: {
  plan: SegmentPlan;
  featured: boolean;
  compact?: boolean;
  onCtaClick: () => void;
}) {
  return (
    <article
      className={cn(
        "group relative flex h-full w-full flex-col rounded-2xl border transition-transform transition-shadow duration-300",
        /* ── Padding - extra top room for floating badge ── */
        compact ? "p-6 pt-8" : "p-6 pt-8 md:p-7 md:pt-9 lg:p-8 lg:pt-10",
        /* ── Featured vs normal ── */
        featured
          ? "border-accent/40 bg-surface shadow-lg shadow-accent/10 hover:shadow-xl hover:shadow-accent/15"
          : "border-border-soft bg-surface shadow-sm hover:shadow-md",
        /* ── Hover lift ── */
        "hover:-translate-y-1",
      )}
      aria-label={`${plan.name} service package`}
    >
      {/* ── Floating pill badge - centered, overlaps top border ── */}
      {plan.badge ? (
        <span
          className={cn(
            "absolute -top-3 left-1/2 -translate-x-1/2 z-10",
            "inline-flex items-center gap-1 rounded-full px-3.5 py-1",
            "text-[11px] font-bold uppercase tracking-wider whitespace-nowrap",
            "shadow-sm",
            featured
              ? "bg-accent text-accent-contrast shadow-accent/25"
              : "bg-accent-soft text-accent"
          )}
        >
          <Star className="h-3 w-3 fill-current" aria-hidden="true" />
          {plan.badge}
        </span>
      ) : null}

      {/* ── Plan name ── */}
      <h3 className={cn(
        "font-bold tracking-tight",
        compact ? "text-xl" : "text-xl md:text-2xl",
        featured ? "text-accent" : "text-text"
      )}>
        {plan.name}
      </h3>

      {/* ── Description ── */}
      <p className={cn(
        "text-sm leading-relaxed mt-2 line-clamp-2",
        featured ? "text-text/80" : "text-text-muted"
      )}>
        {plan.description}
      </p>

      {/* ── Divider ── */}
      <div className={cn("h-px my-5", featured ? "bg-accent/15" : "bg-border-soft")} />

      {/* ── Features list - flex-1 pushes CTA to bottom ── */}
      <ul className="flex flex-1 flex-col gap-3">
        {plan.features.map((feature) => (
          <li
            key={feature.label}
            className={cn(
              "flex items-start gap-3 text-sm leading-snug",
              !feature.included && "opacity-30"
            )}
          >
            <span className={cn(
              "mt-px flex h-5 w-5 flex-none items-center justify-center rounded-full",
              feature.included
                ? (featured ? "bg-accent text-accent-contrast" : "bg-accent-soft text-accent")
                : (featured ? "bg-accent/10 text-accent/30" : "bg-border-soft text-text-muted")
            )}>
              {feature.included
                ? <Check className="h-3 w-3" strokeWidth={3} />
                : <X className="h-2.5 w-2.5" />
              }
            </span>
            <span className={cn(
              feature.included ? "text-text font-medium" : "text-text-muted",
              feature.label.startsWith("Everything") && "font-semibold"
            )}>
              {feature.label}
            </span>
          </li>
        ))}
      </ul>

      {/* ── CTA button - opens inquiry modal instead of navigating ── */}
      <Button
        size="standard"
        variant={featured ? "primary" : "outline"}
        onClick={onCtaClick}
        className={cn(
          "mt-6 w-full",
          featured && "shadow-md shadow-accent/20"
        )}
      >
        {plan.cta}
      </Button>
    </article>
  );
});

/* ═══════════════════════════════════════════════════════════════
 * ServicePackagesSection - main export
 * ═══════════════════════════════════════════════════════════════ */
export function ServicePackagesSection({
  variant = "home",
}: ServicePackagesSectionProps) {
  const [activeSegment, setActiveSegment] = useState<SegmentKey>('local-entrepreneurs');
  const {
    data: testimonials = [],
  } = useTestimonials();
  /* Admin-managed packages from /api/v1/pricing/packages (service_packages
   * table). Grouped by segment slug; segments with no packages fall back to
   * the bundled `segmentPlans` defaults. */
  const {
    data: apiPackages = [],
  } = useServicePackages();

  /* ── Modal state ── */
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPlanSlug, setModalPlanSlug] = useState<string | null>(null);
  const [modalPlanName, setModalPlanName] = useState<string>("");
  const [modalFeatured, setModalFeatured] = useState(false);

  /* Ref-based active segment so openModal stays stable (React.memo depends on it) */
  const activeSegmentRef = useRef(activeSegment);
  activeSegmentRef.current = activeSegment;

  const openModal = useCallback((planName: string, featured: boolean) => {
    const seg = activeSegmentRef.current;
    setModalPlanSlug(`${planName.toLowerCase()}-${seg}`);
    setModalPlanName(planName);
    setModalFeatured(featured);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  /* Group admin packages by their segment slug. */
  const packagesBySegment = useMemo(() => {
    const map = new Map<string, SegmentPackage[]>();
    for (const pkg of apiPackages) {
      if (!pkg.segment_slug) continue;
      const arr = map.get(pkg.segment_slug);
      if (arr) arr.push(pkg);
      else map.set(pkg.segment_slug, [pkg]);
    }
    return map;
  }, [apiPackages]);

  /* Resolve the cards for a segment: admin packages if any are published,
   * otherwise the bundled fallback. Admin packages win per-segment. */
  const resolvePlans = useCallback((key: SegmentKey): ResolvedPlan[] => {
    const fromApi = packagesBySegment.get(key);
    if (fromApi && fromApi.length > 0) {
      return [...fromApi]
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((p) => ({
          name: p.name,
          badge: p.badge,
          description: p.description,
          features: p.features,
          cta: p.cta || "Get Started",
          featured: p.recommended,
        }));
    }
    return segmentPlans[key].map((p) => ({ ...p, featured: p.badge !== null }));
  }, [packagesBySegment]);

  const currentPlans = useMemo(
    () => resolvePlans(activeSegment),
    [resolvePlans, activeSegment]
  );

  /* ── Stable per-plan callbacks for memoized SegmentPlanCard ── */
  const cardCtaRefs = useRef<Map<string, () => void>>(new Map());
  const getCardCta = useCallback((planName: string, featured: boolean) => {
    const key = `${planName}-${featured}`;
    let fn = cardCtaRefs.current.get(key);
    if (!fn) {
      fn = () => openModal(planName, featured);
      cardCtaRefs.current.set(key, fn);
    }
    return fn;
  }, [openModal]);

  /* ── Card deck data (for mobile carousel) ── */
  const carouselCards = useMemo(
    () =>
      currentPlans.map((plan) => {
        const featured = plan.featured;
        return {
          key: `${activeSegment}-${plan.name}`,
          content: (
            <SegmentPlanCard
              plan={plan}
              featured={featured}
              compact
              onCtaClick={getCardCta(plan.name, featured)}
            />
          ),
        };
      }),
    [currentPlans, activeSegment, getCardCta]
  );

  /* ── Default to middle card (Growth / "Most Popular") ── */
  const defaultCarouselIndex = useMemo(() => {
    const idx = currentPlans.findIndex((p) => p.featured);
    return idx >= 0 ? idx : Math.floor(currentPlans.length / 2);
  }, [currentPlans]);

  return (
    <section
      id={variant === "page" ? "packages" : undefined}
      aria-label="Service packages and client testimonials"
      className="py-16 md:py-24"
    >
        <Container>
          {/* ─── Social Proof ─── */}
          {testimonials.length > 0 && (
            <div className="mb-8 md:mb-12">
              <div className="mb-6 md:mb-8" data-reveal>
                <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-semibold leading-tight tracking-tight text-text">
                  What our clients say
                </h2>
              </div>
              <TestimonialMarquee testimonials={testimonials} />
            </div>
          )}

          {/* ─── Package Plans ─── */}
          <div>
            <div className="mb-5 md:mb-6" data-reveal>
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-accent mb-2">
                Service packages
              </p>
              <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-semibold leading-tight tracking-tight text-text">
                Choose the right level of support
              </h2>
            </div>

            {/* Segment filter buttons - compact icon+short label on mobile, full label on desktop */}
            <div className="flex gap-1.5 sm:gap-2 justify-center mb-6 md:mb-8">
              {segments.map((seg) => {
                const isActive = activeSegment === seg.key;
                const Icon = seg.icon;
                return (
                  <button
                    key={seg.key}
                    type="button"
                    onClick={() => setActiveSegment(seg.key)}
                    className={cn(
                      'flex-shrink-0 rounded-full min-h-[40px] font-medium',
                      'transition-colors duration-200 ease-out',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                      'flex flex-col items-center justify-center gap-0.5',
                      'sm:flex-row sm:gap-2 sm:px-4 sm:py-2',
                      'px-3 py-1.5',
                      isActive
                        ? 'bg-accent text-accent-contrast shadow-sm'
                        : 'bg-surface text-text-muted border border-border-soft hover:bg-accent-soft hover:text-accent hover:border-accent/30'
                    )}
                    aria-pressed={isActive}
                    aria-label={`Show packages for ${seg.label}`}
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                    {/* Short label on mobile, full label on desktop */}
                    <span className="text-[11px] leading-none sm:text-sm sm:leading-normal">
                      <span className="sm:hidden">{seg.shortLabel}</span>
                      <span className="hidden sm:inline">{seg.label}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* ─── MOBILE: Card deck carousel ─── */}
            <CardDeckCarousel
              cards={carouselCards}
              defaultIndex={defaultCarouselIndex}
            />

            {/* ─── DESKTOP: 3-column grid with portrait cards ─── */}
            <div className="hidden lg:grid gap-6 lg:grid-cols-3 lg:max-w-[1100px] lg:mx-auto">
              {currentPlans.map((plan) => {
                const featured = plan.featured;
                return (
                <div key={`${activeSegment}-${plan.name}`} className="flex justify-center">
                  <div className="w-full max-w-[320px]">
                    <SegmentPlanCard
                      plan={plan}
                      featured={featured}
                      onCtaClick={getCardCta(plan.name, featured)}
                    />
                  </div>
                </div>
                );
              })}
            </div>
          </div>
        </Container>

        {/* ── Plan inquiry modal ── */}
        <PlanInquiryModal
          planSlug={modalPlanSlug}
          planName={modalPlanName}
          featured={modalFeatured}
          open={modalOpen}
          onClose={closeModal}
        />
      </section>
  );
}

// Alias for backward compatibility
export { ServicePackagesSection as ServicePlansSection };
