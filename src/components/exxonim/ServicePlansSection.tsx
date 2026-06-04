"use client";

import type { PricingPlan, Testimonial } from "@/lib/exxonim-types";
import { cn } from "@/lib/cn";
import { Container } from "@/components/exxonim/Container";
import { routes } from "@/lib/exxonim-router";
import { fallbackPricingPlans, fallbackTestimonials } from "@/lib/exxonim-data";
import { Check, X, ArrowRight, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

export function ServicePlansSection() {
  const plans = fallbackPricingPlans;
  const testimonials = fallbackTestimonials;

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const nextTestimonial = useCallback(() => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevTestimonial = useCallback(() => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 4800);
    return () => clearInterval(interval);
  }, [nextTestimonial]);

  const currentTestimonial = testimonials[activeTestimonial];

  return (
    <section className="relative py-16 lg:py-24 bg-page">
      <Container>
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-surface-soft px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-accent mb-4">
            Service Packages
          </span>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-text">
            Choose the Right Plan for Your Business
          </h2>
          <p className="mt-3 text-text-muted max-w-lg mx-auto">
            From initial registration to ongoing compliance, we have a package
            that fits your needs.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(280px,360px)_1fr]">
          {/* ── Left: Testimonial card with gradient background ── */}
          <div className="flex flex-col rounded-2xl border border-border-soft border-l-4 border-l-accent p-6 md:p-8 shadow-card bg-gradient-to-br from-accent-soft/30 via-surface to-surface">
            {/* Larger, more decorative quote icon */}
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft">
              <Quote className="h-6 w-6 text-accent" />
            </div>

            {currentTestimonial && (
              <div className="flex flex-1 flex-col">
                {/* Eyebrow */}
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-accent mb-2">
                  {currentTestimonial.eyebrow}
                </span>

                {/* Headline */}
                <h3 className="text-lg font-semibold text-text mb-1">
                  {currentTestimonial.headline}
                </h3>
                <p className="text-sm text-text-muted mb-4">
                  {currentTestimonial.support}
                </p>

                {/* Quote */}
                <p className="text-sm leading-relaxed text-text-muted flex-1 mb-6">
                  &ldquo;{currentTestimonial.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 mt-auto">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-contrast text-xs font-bold">
                    {currentTestimonial.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text">
                      {currentTestimonial.name}
                    </p>
                    <p className="text-xs text-text-muted">
                      {currentTestimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation with improved dot indicators */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-border-soft">
              <div className="flex items-center gap-1.5">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      i === activeTestimonial
                        ? "w-6 bg-accent"
                        : "w-2 bg-border-strong hover:bg-text-soft"
                    )}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={prevTestimonial}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-border-soft text-text-muted hover:text-accent hover:border-accent transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-border-soft text-text-muted hover:text-accent hover:border-accent transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* ── Right: Plan cards ── */}
          <div className="grid gap-4 sm:grid-cols-3">
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function PlanCard({ plan }: { plan: PricingPlan }) {
  const isFeatured = plan.recommended;

  if (isFeatured) {
    return (
      /* Featured card with gradient border wrapper and glow */
      <div className="relative rounded-2xl p-px bg-gradient-to-br from-accent via-accent-secondary to-accent shadow-panel">
        {/* Subtle glow effect */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-accent/20 via-transparent to-accent-secondary/20 blur-sm -z-10" />

        <div className="flex flex-col rounded-2xl bg-text p-6 md:p-8 text-surface">
          {/* Badge with shimmer */}
          {plan.badge && (
            <span className="inline-flex self-start rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-contrast mb-3 overflow-hidden relative">
              {plan.badge}
              {/* Shimmer effect */}
              <span className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </span>
          )}

          {/* Plan name */}
          <h3 className="text-xl font-semibold text-surface mb-1">
            {plan.name}
          </h3>

          {/* Description */}
          <p className="text-sm mb-4 flex-1 text-text-soft">
            {plan.description}
          </p>

          {/* Features with alternating subtle backgrounds */}
          <ul className="flex flex-col gap-0 mb-6 rounded-xl overflow-hidden">
            {plan.features.map((feature, i) => (
              <li
                key={i}
                className={cn(
                  "flex items-start gap-2 py-2 px-3",
                  i % 2 === 0 ? "bg-white/5" : "bg-transparent"
                )}
              >
                {feature.included ? (
                  <Check className="h-4 w-4 shrink-0 mt-0.5 text-accent" />
                ) : (
                  <X className="h-4 w-4 shrink-0 mt-0.5 text-text-soft" />
                )}
                <span
                  className={cn(
                    "text-sm",
                    feature.included
                      ? "text-surface"
                      : "text-text-soft line-through"
                  )}
                >
                  {feature.label}
                </span>
              </li>
            ))}
          </ul>

          {/* Notes */}
          {plan.notes && (
            <p className="text-xs mb-4 text-text-soft">
              {plan.notes}
            </p>
          )}

          {/* CTA - surface bg with accent text for featured */}
          <a
            href={routes.contact}
            className="group inline-flex h-11 items-center justify-center rounded-full bg-surface px-6 text-sm font-extrabold text-accent hover:bg-surface-soft transition-all hover:-translate-y-0.5"
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    );
  }

  /* Non-featured card with hover lift and border color change */
  return (
    <div className="flex flex-col rounded-2xl border border-border-soft bg-surface p-6 md:p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-panel">
      {/* Badge */}
      {plan.badge && (
        <span className="inline-flex self-start rounded-full bg-accent-soft px-3 py-1 text-xs font-bold text-accent mb-3">
          {plan.badge}
        </span>
      )}

      {/* Plan name */}
      <h3 className="text-xl font-semibold text-text mb-1">
        {plan.name}
      </h3>

      {/* Description */}
      <p className="text-sm text-text-muted mb-4 flex-1">
        {plan.description}
      </p>

      {/* Features with alternating subtle backgrounds */}
      <ul className="flex flex-col gap-0 mb-6 rounded-xl overflow-hidden">
        {plan.features.map((feature, i) => (
          <li
            key={i}
            className={cn(
              "flex items-start gap-2 py-2 px-3",
              i % 2 === 0 ? "bg-surface-soft" : "bg-transparent"
            )}
          >
            {feature.included ? (
              <Check className="h-4 w-4 shrink-0 mt-0.5 text-accent" />
            ) : (
              <X className="h-4 w-4 shrink-0 mt-0.5 text-text-soft" />
            )}
            <span
              className={cn(
                "text-sm",
                feature.included ? "text-text" : "text-text-soft line-through"
              )}
            >
              {feature.label}
            </span>
          </li>
        ))}
      </ul>

      {/* Notes */}
      {plan.notes && (
        <p className="text-xs mb-4 text-text-soft">
          {plan.notes}
        </p>
      )}

      {/* CTA - accent bg for non-featured */}
      <a
        href={routes.contact}
        className="group inline-flex h-11 items-center justify-center rounded-full bg-accent px-6 text-sm font-extrabold text-accent-contrast hover:bg-accent-hover transition-all hover:-translate-y-0.5"
      >
        Get Started
        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      </a>
    </div>
  );
}
