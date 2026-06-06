import { memo } from "react";
import { Check, X } from "lucide-react";
import { LoadBoundary } from "./LoadBoundary";
import { Container } from "./primitives/Container";
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
 * The marquee displays testimonials sorted by sort_order (ascending).
 * Short quotes in tall cards are acceptable — cards have uniform height.
 */
const TestimonialCard = memo(function TestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  return (
    <article
      className="flex h-[220px] flex-col py-6 px-1"
      aria-label={`Testimonial from ${testimonial.name}`}
    >
      {/* Star rating — always 5 stars */}
      <p className="text-star text-sm tracking-wider mb-3" aria-label="5 out of 5 stars">
        ★★★★★
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

      <a
        href={routes.contact}
        className={cn(
          "mt-6 inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-extrabold transition-all hover:-translate-y-0.5",
          featured
            ? "bg-accent text-accent-contrast hover:bg-accent-hover"
            : "bg-cta-secondary text-surface hover:opacity-90"
        )}
      >
        Contact Exxonim
      </a>
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
              {/* Testimonial marquee — full-bleed with 15% edge fades, same pattern as Trusted By logos */}
              <div
                className="overflow-hidden relative w-screen -ml-[50vw] left-1/2 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]"
                aria-label="Client testimonials"
              >
                <div className="flex items-center w-max animate-testimonial-marquee hover:[animation-play-state:paused]">
                  {Array.from({ length: 3 }, () => testimonials).flat().map((testimonial, index) => (
                    <div key={`${testimonial.id}-${index}`} className="flex-none w-80">
                      <TestimonialCard testimonial={testimonial} />
                    </div>
                  ))}
                </div>
              </div>
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
