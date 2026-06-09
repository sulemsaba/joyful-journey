
/**
 * FASTAPI BACKEND ENDPOINTS USED BY THIS COMPONENT:
 * ──────────────────────────────────────────────────
 * Testimonials (via useTestimonials hook → testimonialService):
 *   GET    /api/v1/testimonials              — List all active testimonials (public)
 *
 * Pricing Plans (via usePricingPlans hook → pricingService):
 *   GET    /api/v1/pricing/plans             — List all pricing plans (public, active only)
 *
 * PostgreSQL Tables:
 *   testimonials — id, name, role, quote, eyebrow, initials, avatar_url, sort_order, is_active
 *   pricing_plans — id, name, badge, description, notes, recommended, sort_order
 *   pricing_plan_features — id, plan_id, label, included
 *
 * See service files for full request/response schemas:
 *   src/exxonim/services/testimonialService.ts
 *   src/exxonim/services/pricingService.ts
 */

import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Check, ChevronLeft, ChevronRight, Star, X } from "lucide-react";
import { LoadBoundary } from "./LoadBoundary";
import { Container } from "./primitives/Container";
import { Button } from "./primitives/Button";
import { usePricingPlans } from "@/exxonim/hooks/usePricingPlans";
import { useTestimonials } from "@/exxonim/hooks/useTestimonials";
import { routes } from "@/exxonim/routes";
import { cn } from "@/exxonim/utils/cn";
import type { PricingPlan, Testimonial } from '@/exxonim/types';

type ServicePackagesSectionProps = {
  variant?: "home" | "page";
};

/**
 * TestimonialCard — displays a single client testimonial.
 *
 * ADMIN FRONTEND / API REQUIREMENTS:
 * ─────────────────────────────────
 * API Endpoints:
 *   GET    /api/v1/testimonials           — List all testimonials (public, active only)
 *   GET    /api/v1/testimonials/:id       — Get single testimonial
 *   POST   /api/v1/testimonials           — Create testimonial (admin only)
 *   PUT    /api/v1/testimonials/:id       — Update testimonial (admin only)
 *   DELETE /api/v1/testimonials/:id       — Delete testimonial (admin only)
 *   PATCH  /api/v1/testimonials/reorder   — Reorder testimonials (admin only, body: { id, sort_order }[])
 *
 * Admin Form Fields:
 *   name       — Text input, required, max 50 chars. Auto-generates `initials` from first/last words.
 *   role       — Text input, required, max 80 chars. e.g. "Operations Team, Utec Tanzania"
 *   quote      — Textarea, required, max 250 chars. Backend MUST reject if exceeded — no UI truncation.
 *   rating     — Hidden field, always 5. Not editable by admin. All testimonials show ★★★★★.
 *   avatar_url — Optional image upload. Falls back to initials circle if empty.
 *   sort_order — Number input. Controls display order in the marquee. Lower = first.
 *   is_active  — Toggle. Only active testimonials appear on the public site.
 *
 * Validation Rules (backend-enforced):
 *   - name: required, string, max 50 characters
 *   - role: required, string, max 80 characters
 *   - quote: required, string, max 250 characters (admin must shorten if too long, NOT truncated in UI)
 *   - rating: fixed at 5 (not editable)
 *   - sort_order: integer, default 0
 *   - is_active: boolean, default true
 *
 * The carousel displays testimonials sorted by sort_order (ascending).
 * Short quotes in tall cards are acceptable — cards have uniform height.
 */
const TestimonialCard = memo(function TestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  return (
    <article
      className="flex h-[220px] flex-col rounded-2xl border border-border-soft bg-surface py-6 px-4 mx-1.5"
      aria-label={`Testimonial from ${testimonial.name}`}
    >
      {/* Star rating — always 5 stars */}
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
 * TestimonialMarquee
 *
 * Endless-looping marquee — same visual as "Trusted by" logos,
 * but with full interactivity.
 *
 * Behaviour:
 *  1. Static when visitor first scrolls it into view.
 *  2. After ~3 s, auto-slide begins via requestAnimationFrame —
 *     slides left endlessly in one direction like a cycle.
 *  3. Left / Right arrow buttons for click navigation.
 *     – Desktop: arrows fade in on hover, hidden by default.
 *     – Mobile: arrows always hidden (touch/swipe is natural).
 *  4. Drag / swipe to scroll freely (mouse + touch).
 *  5. Auto-slide pauses on hover / drag / arrow click,
 *     resumes 3 s after last interaction.
 *  6. Full-bleed with 15% / 85% edge fade masks (same as Trusted By).
 *  7. Cards are duplicated 3× so the scroll position wraps at
 *     the midpoint, creating a seamless infinite loop.
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
  const scrollDelta = useRef(0); // fractional px accumulator
  const scrollingUntilRef = useRef(0);

  // Duplicate items 3× for seamless infinite scroll.
  const items = [...testimonials, ...testimonials, ...testimonials];
  const CARD_WIDTH = 320; // w-80 = 20rem = 320px
  // Base speed ≈ 18 px/s at 60fps. Sine-wave oscillation varies
  // it between ~11 px/s (slow) and ~25 px/s (moderate) so the
  // marquee breathes naturally instead of feeling robotic.
  const BASE_SPEED = 0.3;
  const SPEED_AMPLITUDE = 0.12; // ±0.12 px/frame around BASE_SPEED
  const SPEED_PERIOD = 480; // frames per full cycle ≈ 8 s at 60fps

  // ── Visibility observer — pause when off-screen ──────────────
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
    const handleScroll = () => {
      scrollingUntilRef.current = performance.now() + 180;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── RAF-based auto-scroll (endless loop) ────────────────────
  useEffect(() => {
    if (!isSliding) return;

    const el = scrollerRef.current;
    if (!el) return;

    const getSetWidth = () => el.scrollWidth / 3;
    let lastFrame = 0;
    const FRAME_INTERVAL = 33; // ~30fps throttle

    const step = (timestamp: number) => {
      // Skip frame if not enough time has passed or off-screen
      if (
        isVisible.current &&
        !document.hidden &&
        timestamp - lastFrame >= FRAME_INTERVAL &&
        timestamp >= scrollingUntilRef.current
      ) {
        lastFrame = timestamp;

        if (!isPaused.current && !isDragging.current) {
          // Natural speed variation: gentle sine-wave oscillation
          // so the marquee breathes — sometimes slower, sometimes faster.
          tickRef.current += 1;
          const speed = BASE_SPEED + SPEED_AMPLITUDE * Math.sin((2 * Math.PI * tickRef.current) / SPEED_PERIOD);
          
          // Accumulate fractional pixels; only apply integer part to
          // scrollLeft because browsers round sub-pixel scroll values
          // to zero, which would make tiny speeds invisible.
          scrollDelta.current += speed;
          const wholePixels = Math.floor(scrollDelta.current);
          if (wholePixels >= 1) {
            el.scrollLeft += wholePixels;
            scrollDelta.current -= wholePixels;
          }

          // Seamless loop: when we've scrolled past the first set,
          // jump back by one set's width — content is identical so
          // the user sees no gap or jump.
          const setWidth = getSetWidth();
          if (el.scrollLeft >= setWidth) {
            el.scrollLeft -= setWidth;
          }
        }
      }
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isSliding]);

  // ── Pause auto-scroll, resume 3 s after last interaction ────
  const pauseAndResume = useCallback(() => {
    isPaused.current = true;
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => {
      isPaused.current = false;
    }, 3000);
  }, []);

  // ── Arrow click handler ─────────────────────────────────────
  const handleArrowClick = useCallback(
    (direction: "left" | "right") => {
      const el = scrollerRef.current;
      if (!el) return;
      el.scrollBy({
        left: direction === "left" ? -CARD_WIDTH : CARD_WIDTH,
        behavior: "smooth",
      });
      pauseAndResume();
    },
    [pauseAndResume]
  );

  // ── Drag / swipe handlers ───────────────────────────────────
  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const el = scrollerRef.current;
      if (!el) return;
      isDragging.current = true;
      setIsDraggingState(true);
      startX.current = e.clientX;
      scrollStart.current = el.scrollLeft;
      el.setPointerCapture(e.pointerId);
      // Pause immediately and cancel any pending resume timer
      isPaused.current = true;
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    },
    []
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const el = scrollerRef.current;
      if (!el || !isDragging.current) return;
      const dx = e.clientX - startX.current;
      el.scrollLeft = scrollStart.current - dx;
    },
    []
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const el = scrollerRef.current;
      if (!el) return;
      isDragging.current = false;
      setIsDraggingState(false);
      el.releasePointerCapture(e.pointerId);
      // Resume auto-scroll after 3 s of inactivity
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
      pauseTimerRef.current = setTimeout(() => {
        isPaused.current = false;
      }, 3000);
    },
    []
  );

  // ── Hover: show arrows (desktop) + pause auto-scroll ────────
  const handleMouseEnter = useCallback(() => {
    setShowArrows(true);
    isPaused.current = true;
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setShowArrows(false);
    // Only resume if not actively dragging
    if (!isDragging.current) {
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
      pauseTimerRef.current = setTimeout(() => {
        isPaused.current = false;
      }, 3000);
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
      {/* Scrollable track */}
      <div
        ref={scrollerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="flex overflow-x-auto scrollbar-none select-none touch-pan-y"
        style={{
          WebkitOverflowScrolling: "touch",
          cursor: isDraggingState ? "grabbing" : "grab",
        }}
      >
        {items.map((testimonial, index) => (
          <div
            key={`${testimonial.id}-${index}`}
            className="flex-none w-80"
          >
            <TestimonialCard testimonial={testimonial} />
          </div>
        ))}
      </div>

      {/* Left arrow — visible on hover (desktop), hidden on mobile */}
      <Button
        size="icon"
        variant="secondary"
        className={cn(
          "shadow-md backdrop-blur-sm",
          "absolute left-3 md:left-4 top-1/2 -translate-y-1/2 z-10",
          "hidden md:flex",
          "opacity-0 pointer-events-none",
          showArrows && "md:opacity-100 md:pointer-events-auto"
        )}
        onClick={() => handleArrowClick("left")}
        aria-label="Previous testimonials"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      {/* Right arrow — visible on hover (desktop), hidden on mobile */}
      <Button
        size="icon"
        variant="secondary"
        className={cn(
          "shadow-md backdrop-blur-sm",
          "absolute right-3 md:right-4 top-1/2 -translate-y-1/2 z-10",
          "hidden md:flex",
          "opacity-0 pointer-events-none",
          showArrows && "md:opacity-100 md:pointer-events-auto"
        )}
        onClick={() => handleArrowClick("right")}
        aria-label="Next testimonials"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );
}

/** Static price mapping — will be replaced by CMS data later */
const PLAN_PRICES: Record<string, string> = {
  "Foundation": "From TZS 350,000",
  "Operating": "From TZS 650,000",
  "Continuity": "From TZS 1,200,000",
};

function PlanCard({ plan, featured }: { plan: PricingPlan; featured: boolean }) {
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-3xl border p-7 transition-all",
        featured
          ? "border-transparent bg-text text-surface"
          : "border-border-soft bg-surface"
      )}
      aria-label={`${plan.name} service package`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className={cn("text-xl font-semibold", featured ? "text-surface" : "text-text")}>
          {plan.name}
        </h3>
        {plan.badge ? (
          <span className={cn(
            "rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider",
            featured ? "bg-accent text-accent-contrast" : "bg-accent-soft text-accent"
          )}>
            {plan.badge}
          </span>
        ) : null}
      </div>

      <p className={cn("mt-3 text-sm", featured ? "text-surface/80" : "text-text-muted")}>
        {plan.description}
      </p>
      <div className={cn("mt-2 text-xs", featured ? "text-surface/60" : "text-text-muted")}>
        {plan.notes}
      </div>

      {/* Price display */}
      {PLAN_PRICES[plan.name] && (
        <p className={cn("mt-3 text-xl font-bold", featured ? "text-surface" : "text-text")}>
          {PLAN_PRICES[plan.name]}
        </p>
      )}

      <div className={cn("my-5 h-px", featured ? "bg-surface/20" : "bg-border-soft")} />

      <ul className="flex flex-1 flex-col gap-2.5">
        {plan.features.map((feature) => (
          <li
            key={feature.label}
            className={cn(
              "flex items-start gap-2 text-sm",
              !feature.included && "opacity-50"
            )}
          >
            <span className={cn(
              "mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full",
              feature.included
                ? (featured ? "bg-accent text-accent-contrast" : "bg-accent-soft text-accent")
                : (featured ? "bg-surface/15 text-surface/60" : "bg-border-soft text-text-muted")
            )}>
              {feature.included ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
            </span>
            <span className={featured ? "text-surface" : "text-text"}>
              {feature.label}
            </span>
          </li>
        ))}
      </ul>

      <Button
        size="standard"
        variant={featured ? "primary" : "outline"}
        href={routes.contact}
        className="mt-6"
      >
        {featured ? 'Book a Free Consultation' : 'Get Started'}
      </Button>
    </article>
  );
}

export function ServicePackagesSection({
  variant = "home",
}: ServicePackagesSectionProps) {
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

  const featuredIndex = Math.max(plans.findIndex((p) => p.recommended), 0);

  return (
    <LoadBoundary
      error={testimonialsError || plansError}
      errorDetail="Service plans could not be loaded right now."
      errorTitle="Unable to load plans."
      isPending={testimonialsPending || plansPending}
      isReady={testimonials.length > 0 && plans.length > 0}
      loadingLabel="Loading package plans..."
      variant="section"
    >
      <section
        id={variant === "page" ? "packages" : undefined}
        aria-label="Service packages and client testimonials"
        className="py-16 md:py-24"
      >
        <Container>
          {/* ─── Social Proof ─── */}
          {testimonials.length > 0 && (
            <div className="mb-12 md:mb-16">
              <div className="mb-8" data-reveal>
                <h2 className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-semibold leading-tight tracking-tight text-text">
                  What our clients say
                </h2>
              </div>
              {/* Endless-loop marquee with arrows + drag: static on arrival,
                  slides after ~3 s, pauses on hover/drag/arrow, resumes 3 s after */}
              <TestimonialMarquee testimonials={testimonials} />
            </div>
          )}

          {/* ─── Pricing Plans ─── */}
          <div>
            <div className="grid gap-3 mb-6" data-reveal>
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-accent">
                Service packages
              </p>
              <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold leading-tight tracking-tight text-text">
                Choose the right level of support
              </h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {plans.map((plan, i) => (
                <PlanCard key={plan.name} plan={plan} featured={i === featuredIndex} />
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
