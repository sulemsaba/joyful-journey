
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
 * The `segmentPlans` object below is the LAST-RESORT (Layer 4) fallback — it
 * renders instantly and whenever a segment has no admin-published packages, so
 * the section is never empty. When the admin publishes packages for a segment
 * (via /admin/service-packages → /api/v1/pricing/packages) those override this
 * per segment (resolvePlans() below). The real "last admin-approved snapshot"
 * fallback is the Layer 3 file public/fallback/service-packages.json, generated
 * from live data by scripts/refresh-fallbacks.mjs and served whenever the API
 * throws (backend/DB down); this bundled object only shows if that file is also
 * missing (e.g. a fresh deploy before the first snapshot).
 *
 * KEEP IN SYNC WITH THE BACKEND SEED: these values mirror
 * exxonim_backend/app/seed_data.py SERVICE_SEGMENTS (same features, included
 * flags, badges, and CTA rule — recommended → "Book a Consultation", else
 * "Get Started") so the last-resort content matches the live baseline and
 * never silently drifts from what visitors see when the backend is up. */
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
        { label: 'Statutory Filings (PAYE/SDL)', included: true },
        { label: 'Dedicated Compliance Advisor', included: true },
      ],
      cta: 'Get Started',
    },
    {
      name: 'Growth',
      badge: 'Most Popular',
      description: 'Full registration, ongoing compliance, and filing support for growing businesses.',
      features: [
        { label: 'Company Registration (COI)', included: true },
        { label: 'TIN plus Business License', included: true },
        { label: 'Annual Returns and Beneficial Ownership', included: true },
        { label: 'Dedicated Compliance Advisor', included: false },
      ],
      cta: 'Book a Consultation',
    },
    {
      name: 'Premium',
      badge: null,
      description: 'Complete compliance management with a dedicated advisor and proactive tracking.',
      features: [
        { label: 'Everything in Growth', included: true },
        { label: 'Trademark Registration', included: true },
        { label: 'Statutory Filings (all obligations)', included: true },
        { label: 'Regulatory Renewals and Reminders', included: true },
        { label: 'Dedicated Compliance Advisor', included: true },
        { label: 'Quarterly Compliance Review', included: true },
      ],
      cta: 'Get Started',
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
        { label: 'TIN plus Business License', included: true },
        { label: 'Work Permit Application', included: true },
        { label: 'TIC/TISEZA Registration', included: true },
        { label: 'Annual Returns and Renewals', included: true },
        { label: 'Cross-border Document Support', included: false },
      ],
      cta: 'Book a Consultation',
    },
    {
      name: 'Premium',
      badge: null,
      description: 'End-to-end foreign investment setup with ongoing compliance management.',
      features: [
        { label: 'Everything in Growth', included: true },
        { label: 'Foreign Company Registration', included: true },
        { label: 'Cross-border Document Legalisation', included: true },
        { label: 'Regulatory Renewals and Reminders', included: true },
        { label: 'Dedicated Compliance Advisor', included: true },
        { label: 'Quarterly Compliance Review', included: true },
      ],
      cta: 'Get Started',
    },
  ],
  'enterprises': [
    {
      name: 'Starter',
      badge: null,
      description: 'Core registration and statutory filings for established businesses.',
      features: [
        { label: 'Company Registration', included: true },
        { label: 'TIN plus Business License', included: true },
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
        { label: 'Annual Returns and Beneficial Ownership', included: true },
        { label: 'Regulatory Renewals Tracking', included: true },
        { label: 'Trademark Protection', included: true },
        { label: 'Dedicated Compliance Advisor', included: false },
      ],
      cta: 'Book a Consultation',
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
      cta: 'Get Started',
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
        { label: 'Constitution plus Governance Framework', included: true },
        { label: 'Tax Exemption Certificate Guidance', included: true },
        { label: 'Donor-readiness Pack', included: true },
        { label: 'Annual Compliance Reporting', included: true },
        { label: 'Board Meeting Templates', included: false },
      ],
      cta: 'Book a Consultation',
    },
    {
      name: 'Premium',
      badge: null,
      description: 'Full NGO compliance management with ongoing reporting and governance support.',
      features: [
        { label: 'Everything in Growth', included: true },
        { label: 'Annual Activity and Financial Reports', included: true },
        { label: 'Donor Compliance Attestation', included: true },
        { label: 'Board Minutes and Governance File', included: true },
        { label: 'Tax Exemption Renewal Support', included: true },
        { label: 'Dedicated NGO Compliance Advisor', included: true },
      ],
      cta: 'Get Started',
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

  /* ── Auto-scroll ONLY while the marquee is on-screen ──
   * The loop does el.scrollLeft += 0.3 every frame, which forces a layout each
   * frame. Left running while off-screen it competed for the main thread and
   * janked the whole page during scroll (e.g. made the trusted-by logos above it
   * look like they were stepping). An IntersectionObserver starts it when it
   * enters the viewport and stops it when it leaves. */
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) startScrolling();
        else stopScrolling();
      },
      { threshold: 0 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      stopScrolling();
    };
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
        /* ── Portrait height floor: keeps short cards tall (never squat) while the
         *    grid still stretches all three to the tallest as features are added.
         *    Width is capped by the wrapper (SHARED_CARD_WIDTH) so growth is vertical. ── */
        !compact && "min-h-[540px]",
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
              "line-clamp-2 min-w-0",
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

            {/* Segment filter — a clean, even 2×2 grid of equal pills on phones
                (full-width columns, 44px tap targets, 14px labels), switching to
                a centered pill row from sm up. Replaces the old wrapping row
                whose pills were different widths and only 40px tall. */}
            <div className="grid grid-cols-2 gap-2 mb-6 md:mb-8 sm:flex sm:flex-wrap sm:justify-center">
              {segments.map((seg) => {
                const isActive = activeSegment === seg.key;
                const Icon = seg.icon;
                return (
                  <button
                    key={seg.key}
                    type="button"
                    onClick={() => setActiveSegment(seg.key)}
                    className={cn(
                      'min-h-[44px] rounded-full font-medium',
                      'transition-colors duration-200 ease-out',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                      'flex flex-row items-center justify-center gap-2',
                      'px-3 py-2 sm:px-4',
                      isActive
                        ? 'bg-accent text-accent-contrast shadow-sm'
                        : 'bg-surface text-text-muted border border-border-soft hover:bg-accent-soft hover:text-accent hover:border-accent/30'
                    )}
                    aria-pressed={isActive}
                    aria-label={`Show packages for ${seg.label}`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                    {/* Short label on phones (grid-sized pills), full label sm+ */}
                    <span className="text-sm leading-none">
                      <span className="sm:hidden">{seg.shortLabel}</span>
                      <span className="hidden sm:inline">{seg.label}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* ─── PHONES (< md / 768px): uniform-height portrait cards ───
             * A horizontal scroll-snap rail of the SAME portrait SegmentPlanCard
             * used on desktop. `items-stretch` + the card's `h-full` + its
             * `min-h-[540px]` floor make every card the SAME height and shape as
             * the desktop grid (the old deck let each card size to its own
             * content, so heights were uneven and cards didn't read as portrait).
             * -mx-4/px-4 lets the rail scroll edge-to-edge while cards stay aligned. */}
            <div className="md:hidden -mx-4 flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto px-4 pt-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {currentPlans.map((plan) => (
                <div
                  key={`${activeSegment}-${plan.name}`}
                  className="flex w-[82vw] max-w-[330px] shrink-0 snap-center"
                >
                  <SegmentPlanCard
                    plan={plan}
                    featured={plan.featured}
                    onCtaClick={getCardCta(plan.name, plan.featured)}
                  />
                </div>
              ))}
            </div>

            {/* ─── TABLET + DESKTOP (≥ md / 768px): 3-column grid ───
             * Tighter gap on tablet, full 8pt gap on desktop. */}
            <div className="hidden md:grid gap-6 lg:gap-8 md:grid-cols-3 md:max-w-[1180px] md:mx-auto">
              {currentPlans.map((plan) => {
                const featured = plan.featured;
                return (
                <div key={`${activeSegment}-${plan.name}`} className="flex justify-center">
                  {/* SHARED_CARD_WIDTH = 360px — the portrait width cap. Keep this IDENTICAL
                      to the admin card (consult-admin package preview/editor) so what you
                      edit is the exact size that ships. Growth is vertical, never wider. */}
                  <div className="w-full max-w-[360px]">
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
