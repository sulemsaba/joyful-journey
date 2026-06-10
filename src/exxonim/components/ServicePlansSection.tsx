
/**
 * ServicePackagesSection — Segment-filtered plan tiers.
 *
 * Redesigned with a card-deck carousel on mobile:
 *   - 4 segment filter buttons at top (Local Entrepreneurs, Foreign Investors, Enterprises, NGOs)
 *   - 3 tier cards per segment (Starter, Growth, Premium)
 *   - NO prices — CTA drives to consultation instead
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
import { LoadBoundary } from "./LoadBoundary";
import { Container } from "./primitives/Container";
import { Button } from "./primitives/Button";
import { CardDeckCarousel } from "./CardDeckCarousel";
import { usePricingPlans } from "@/exxonim/hooks/usePricingPlans";
import { useTestimonials } from "@/exxonim/hooks/useTestimonials";
import { routes } from "@/exxonim/routes";
import { cn } from "@/exxonim/utils/cn";
import type { PricingPlan, Testimonial } from '@/exxonim/types';

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

/* ── Plan data per segment (static, no prices) ──────────────── */
interface SegmentPlan {
  name: string;
  badge: string | null;
  description: string;
  features: { label: string; included: boolean }[];
  cta: string;
}

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
      className="flex h-[200px] md:h-[220px] flex-col rounded-2xl border border-border-soft bg-surface py-5 md:py-6 px-4 mx-1.5"
      aria-label={`Testimonial from ${testimonial.name}`}
    >
      <p className="flex items-center gap-0.5 text-star mb-3" aria-label="5 out of 5 stars">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
        ))}
      </p>
      <p className="text-[0.9375rem] leading-relaxed text-text-muted flex-1">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <div className="mt-auto flex items-center gap-2.5">
        <div className="flex h-7 w-7 md:h-8 md:w-8 shrink-0 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-contrast">
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
 * TestimonialMarquee — unchanged from original
 * ═══════════════════════════════════════════════════════════════ */
function TestimonialMarquee({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isSliding, setIsSliding] = useState(false);
  const [showArrows, setShowArrows] = useState(false);
  const [isDraggingState, setIsDraggingState] = useState(false);

  const isPaused = useRef(false);
  const isDragging = useRef(false);
  const isVisible = useRef(false);
  const hasStarted = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const rafRef = useRef<number>(0);
  const startTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tickRef = useRef(0);
  const scrollDelta = useRef(0);
  const scrollingUntilRef = useRef(0);

  const items = [...testimonials, ...testimonials, ...testimonials];
  const CARD_WIDTH = 320;
  const BASE_SPEED = 0.3;
  const SPEED_AMPLITUDE = 0.12;
  const SPEED_PERIOD = 480;

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting;
        if (entry.isIntersecting && !hasStarted.current && !startTimerRef.current) {
          startTimerRef.current = setTimeout(() => {
            hasStarted.current = true;
            startTimerRef.current = null;
            setIsSliding(true);
          }, 1200);
        }
        if (!entry.isIntersecting && !hasStarted.current && startTimerRef.current) {
          clearTimeout(startTimerRef.current);
          startTimerRef.current = null;
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(wrapper);
    return () => {
      observer.disconnect();
      if (startTimerRef.current) {
        clearTimeout(startTimerRef.current);
        startTimerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => { scrollingUntilRef.current = performance.now() + 180; };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isSliding) return;
    const el = scrollerRef.current;
    if (!el) return;
    const getSetWidth = () => el.scrollWidth / 3;
    let lastFrame = 0;
    const FRAME_INTERVAL = 33;
    const step = (timestamp: number) => {
      if (isVisible.current && !document.hidden && timestamp - lastFrame >= FRAME_INTERVAL && timestamp >= scrollingUntilRef.current) {
        lastFrame = timestamp;
        if (!isPaused.current && !isDragging.current) {
          tickRef.current += 1;
          const speed = BASE_SPEED + SPEED_AMPLITUDE * Math.sin((2 * Math.PI * tickRef.current) / SPEED_PERIOD);
          scrollDelta.current += speed;
          const wholePixels = Math.floor(scrollDelta.current);
          if (wholePixels >= 1) {
            el.scrollLeft += wholePixels;
            scrollDelta.current -= wholePixels;
          }
          const setWidth = getSetWidth();
          if (el.scrollLeft >= setWidth) { el.scrollLeft -= setWidth; }
        }
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [isSliding]);

  const pauseAndResume = useCallback(() => {
    isPaused.current = true;
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => { isPaused.current = false; }, 3000);
  }, []);

  const handleArrowClick = useCallback((direction: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction === "left" ? -CARD_WIDTH : CARD_WIDTH, behavior: "smooth" });
    pauseAndResume();
  }, [pauseAndResume]);

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el) return;
    isDragging.current = true;
    setIsDraggingState(true);
    startX.current = e.clientX;
    scrollStart.current = el.scrollLeft;
    el.setPointerCapture(e.pointerId);
    isPaused.current = true;
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el || !isDragging.current) return;
    el.scrollLeft = scrollStart.current - (e.clientX - startX.current);
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el) return;
    isDragging.current = false;
    setIsDraggingState(false);
    el.releasePointerCapture(e.pointerId);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => { isPaused.current = false; }, 3000);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setShowArrows(true);
    isPaused.current = true;
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setShowArrows(false);
    if (!isDragging.current) {
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
      pauseTimerRef.current = setTimeout(() => { isPaused.current = false; }, 3000);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (startTimerRef.current) clearTimeout(startTimerRef.current);
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="full-bleed group relative overflow-hidden [-webkit-mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]"
      aria-label="Client testimonials"
    >
      <div
        ref={scrollerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="flex overflow-x-auto scrollbar-none select-none touch-pan-y"
        style={{ WebkitOverflowScrolling: "touch", cursor: isDraggingState ? "grabbing" : "grab" }}
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
}

/* ═══════════════════════════════════════════════════════════════
 * SegmentPlanCard — Portrait pricing card
 *
 * DESIGN NOTES (for admin-managed content):
 * - Card is designed as a vertical rectangle (portrait orientation).
 * - In the mobile carousel, width is 280px; in desktop grid, max 360px.
 * - Featured card has a full-width accent banner at top for the badge.
 * - Features list uses flex-1 to push CTA button to the bottom.
 * - Max 8 features recommended. More features = taller card.
 * - Description max ~120 chars recommended for clean layout.
 * - Badge text max ~20 chars recommended to fit the banner.
 * ═══════════════════════════════════════════════════════════════ */
function SegmentPlanCard({ plan, featured, compact }: { plan: SegmentPlan; featured: boolean; compact?: boolean }) {
  return (
    <article
      className={cn(
        "flex h-full w-full flex-col rounded-2xl border transition-all overflow-hidden",
        compact ? "p-5" : "p-5 md:p-6 lg:p-7",
        featured
          ? "border-accent/40 bg-surface"
          : "border-border-soft bg-surface"
      )}
      aria-label={`${plan.name} service package`}
    >
      {/* ── Featured badge banner (full-width strip at top) ── */}
      {plan.badge ? (
        <div className={cn(
          "-mx-5 -mt-5 mb-3 px-5 py-2 text-center",
          compact ? "-mx-5 -mt-5" : "md:-mx-6 md:-mt-6 lg:-mx-7 lg:-mt-7",
          featured
            ? "bg-accent text-accent-contrast"
            : "bg-accent-soft text-accent"
        )}>
          <span className="text-xs font-extrabold uppercase tracking-wider">
            {plan.badge}
          </span>
        </div>
      ) : null}

      {/* Plan name */}
      <h3 className={cn("font-bold mb-2", compact ? "text-base" : "text-lg", featured ? "text-accent" : "text-text")}>
        {plan.name}
      </h3>

      {/* Description — clamp to 2 lines for admin content safety */}
      <p className={cn(
        "text-sm leading-relaxed mb-3 line-clamp-2",
        featured ? "text-text" : "text-text-muted"
      )}>
        {plan.description}
      </p>

      <div className={cn("h-px mb-3", featured ? "bg-accent/20" : "bg-border-soft")} />

      {/* Features list — flex-1 pushes CTA to bottom */}
      <ul className="flex flex-1 flex-col gap-2">
        {plan.features.map((feature) => (
          <li
            key={feature.label}
            className={cn(
              "flex items-start gap-2 text-[13px] leading-snug",
              !feature.included && "opacity-40"
            )}
          >
            <span className={cn(
              "mt-0.5 flex h-4.5 w-4.5 flex-none items-center justify-center rounded-full",
              feature.included
                ? (featured ? "bg-accent text-accent-contrast" : "bg-accent-soft text-accent")
                : (featured ? "bg-accent/10 text-accent/40" : "bg-border-soft text-text-muted")
            )}>
              {feature.included ? <Check className="h-2.5 w-2.5" /> : <X className="h-2.5 w-2.5" />}
            </span>
            <span className="text-text">{feature.label}</span>
          </li>
        ))}
      </ul>

      {/* CTA button */}
      <Button
        size="standard"
        variant={featured ? "primary" : "outline"}
        href={routes.contact}
        className="mt-4 w-full"
      >
        {plan.cta}
      </Button>
    </article>
  );
}

/* ═══════════════════════════════════════════════════════════════
 * ServicePackagesSection — main export
 * ═══════════════════════════════════════════════════════════════ */
export function ServicePackagesSection({
  variant = "home",
}: ServicePackagesSectionProps) {
  const [activeSegment, setActiveSegment] = useState<SegmentKey>('local-entrepreneurs');
  const {
    data: testimonials = [],
    isPending: testimonialsPending,
    error: testimonialsError,
  } = useTestimonials();
  const {
    data: plans = [],
    isPending: plansPending,
    error: plansError,
  } = usePricingPlans();

  const currentPlans = segmentPlans[activeSegment];

  /* ── Card deck data (for mobile carousel) ── */
  const carouselCards = useMemo(
    () =>
      currentPlans.map((plan, index) => ({
        key: `${activeSegment}-${plan.name}`,
        content: (
          <SegmentPlanCard
            plan={plan}
            featured={plan.badge !== null}
            compact
          />
        ),
      })),
    [currentPlans, activeSegment]
  );

  /* ── Default to middle card (Growth / "Most Popular") ── */
  const defaultCarouselIndex = useMemo(() => {
    const idx = currentPlans.findIndex((p) => p.badge !== null);
    return idx >= 0 ? idx : Math.floor(currentPlans.length / 2);
  }, [currentPlans]);

  return (
    <LoadBoundary
      error={testimonialsError || plansError}
      errorDetail="Service plans could not be loaded right now."
      errorTitle="Unable to load plans."
      isPending={testimonialsPending || plansPending}
      isReady={testimonials.length > 0}
      loadingLabel="Loading package plans..."
      variant="section"
    >
      <section
        id={variant === "page" ? "packages" : undefined}
        aria-label="Service packages and client testimonials"
        className="py-10 md:py-24"
      >
        <Container>
          {/* ─── Social Proof ─── */}
          {testimonials.length > 0 && (
            <div className="mb-8 md:mb-12">
              <div className="mb-6 md:mb-8" data-reveal>
                <h2 className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-semibold leading-tight tracking-tight text-text">
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
              <h2 className="text-[clamp(1.3rem,3vw,2rem)] font-semibold leading-tight tracking-tight text-text">
                Choose the right level of support
              </h2>
            </div>

            {/* Segment filter buttons — compact icon+short label on mobile, full label on desktop */}
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
                      'transition-all duration-200 ease-out',
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
            <div className="hidden lg:grid gap-5 lg:grid-cols-3 lg:max-w-[1160px] lg:mx-auto">
              {currentPlans.map((plan) => (
                <div key={`${activeSegment}-${plan.name}`} className="flex justify-center">
                  <div className="w-full max-w-[360px]">
                    <SegmentPlanCard
                      plan={plan}
                      featured={plan.badge !== null}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </LoadBoundary>
  );
}

// Alias for backward compatibility
export { ServicePackagesSection as ServicePlansSection };
