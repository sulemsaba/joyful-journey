import { memo } from "react";
import { Check, X, ArrowRight } from "lucide-react";
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
 * TestimonialCard — static card for the social proof wall.
 * No rotation, no auto-play. All testimonials visible at once.
 */
const TestimonialCard = memo(function TestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  return (
    <article
      className="flex h-full flex-col rounded-3xl border border-border-soft bg-surface p-6"
      aria-label={`Testimonial from ${testimonial.name}`}
    >
      <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-accent">
        {testimonial.eyebrow}
      </p>
      <h3 className="mt-2 text-lg font-semibold leading-tight text-text">
        {testimonial.headline}
      </h3>
      <p className="mt-2 text-sm text-text-muted line-clamp-2">
        {testimonial.support}
      </p>

      <div className="mt-auto pt-5 border-t border-border-soft">
        <p className="text-sm italic leading-relaxed text-text">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
        <div className="mt-3 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-contrast">
            {testimonial.initials}
          </div>
          <div>
            <p className="text-sm font-semibold text-text">{testimonial.name}</p>
            <p className="text-xs text-text-muted">{testimonial.role}</p>
          </div>
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
          ? "border-transparent bg-text text-surface shadow-card"
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
            : "bg-text text-surface hover:opacity-90 dark:bg-accent dark:text-accent-contrast dark:hover:bg-accent-hover"
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
          {/* ─── Social Proof Wall (Option B) ─── */}
          {testimonials.length > 0 && (
            <div className="mb-12 md:mb-16">
              <div className="grid gap-3 mb-6" data-reveal>
                <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-accent">
                  Client feedback
                </p>
                <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold leading-tight tracking-tight text-text">
                  What our clients say
                </h2>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {testimonials.map((testimonial) => (
                  <TestimonialCard
                    key={testimonial.id}
                    testimonial={testimonial}
                  />
                ))}
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
