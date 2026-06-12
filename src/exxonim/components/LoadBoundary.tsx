import type { ReactNode } from "react";
import { cn } from "@/exxonim/utils/cn";
import { ErrorMessage } from "./ErrorMessage";

type LoadBoundaryVariant = "page" | "section";
type LoadBoundaryChildren = ReactNode | (() => ReactNode);

interface LoadBoundaryProps {
  children: LoadBoundaryChildren;
  error?: unknown;
  errorDetail?: string;
  errorTitle?: string;
  isPending: boolean;
  isReady?: boolean;
  loadingLabel?: string;
  variant?: LoadBoundaryVariant;
}

interface SkeletonProps {
  label: string;
  variant: LoadBoundaryVariant;
}

/* ═══════════════════════════════════════════════════════════════
 * ContentSkeleton — generic fallback for any page/section.
 * Shows a card with placeholder text bars and a 3-column grid.
 * Used by LoadBoundary when no specific skeleton is provided.
 * ═══════════════════════════════════════════════════════════════ */
function ContentSkeleton({ label, variant }: SkeletonProps) {
  const isSection = variant === "section";

  return (
    <div
      className={[
        "grid border border-border-soft animate-pulse bg-surface-elevated",
        isSection
          ? "gap-4 min-h-[15rem] p-5 rounded-[1.35rem] w-full"
          : "gap-6 min-h-[clamp(24rem,48vh,34rem)] p-8 rounded-[1.8rem] w-[min(1180px,calc(100%-2rem))] mx-auto mt-6",
      ].join(" ")}
      role="status"
      aria-live="polite"
    >
      <div className="grid gap-3" aria-hidden="true">
        <div className="h-4 w-28 rounded-full bg-accent-soft" />
        <div className="h-11 w-[min(30rem,88%)] rounded-full bg-accent-soft" />
        <div className="h-4 w-[min(36rem,100%)] rounded-full bg-accent-soft" />
        <div className="h-4 w-[min(36rem,100%)] rounded-full bg-accent-soft" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4" aria-hidden="true">
        <div className="min-h-[9rem] rounded-[1.25rem] bg-accent-soft/70 border border-accent-soft/50" />
        <div className="min-h-[9rem] rounded-[1.25rem] bg-accent-soft/70 border border-accent-soft/50" />
        <div className="min-h-[9rem] rounded-[1.25rem] bg-accent-soft/70 border border-accent-soft/50" />
      </div>
      <p className="m-0 text-text-muted text-sm">{label}</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
 * HomePageSkeleton — shape-aware skeleton for the homepage.
 *
 * Mirrors the real homepage layout so the skeleton occupies the
 * same visual space and the transition to real content is seamless:
 *
 *   1. Hero area    — 94.5svh with header offset, centered
 *                      favicon pulse loader + placeholder text
 *   2. Review bar   — 5.5svh Google review peek
 *   3. Features     — Stacked card area placeholders
 *   4. Pricing      — 3 plan cards in a grid
 *   5. Blog posts   — Horizontal rail of article cards
 *   6. Newsletter   — CTA card with input placeholder
 *
 * Uses the same design tokens as the real page (bg-accent-soft,
 * rounded-full for text, rounded-3xl for cards) and the existing
 * animate-shimmer / animate-pulse animations.
 * ═══════════════════════════════════════════════════════════════ */
export function HomePageSkeleton() {
  return (
    <div role="status" aria-live="polite">
      {/* ── 1. Hero area ────────────────────────────────────
       * Matches ReferenceHero: 94.5svh, header offset, flex center.
       * Background uses bg-hero-bg (same CSS custom property as real hero).
       * Favicon pulse loader centered — identical to PageSuspenseFallback.
       */}
      <section
        aria-hidden="true"
        className={cn(
          "relative isolate overflow-hidden",
          "-mt-[60px] sm:-mt-[68px] pt-[60px] sm:pt-[68px]",
          "flex items-center",
          "bg-hero-bg",
          "hero-section"
        )}
      >
        <div className="mx-auto w-[min(1240px,calc(100%-2rem))] px-0">
          <div className="relative max-w-[640px]">
            {/* Eyebrow placeholder */}
            <div className="mb-4 h-4 w-28 rounded-full bg-accent-soft animate-pulse" />
            {/* Heading placeholder */}
            <div className="h-[clamp(2.8rem,6vw,5.5rem)] w-[min(30rem,85%)] rounded-full bg-accent-soft animate-pulse" />
            {/* Description placeholder */}
            <div className="mt-6 grid gap-2">
              <div className="h-4 w-[min(34rem,100%)] rounded-full bg-accent-soft animate-pulse" />
              <div className="h-4 w-[min(28rem,80%)] rounded-full bg-accent-soft animate-pulse" />
            </div>
            {/* CTA button placeholder */}
            <div className="mt-8 h-12 w-40 rounded-full bg-accent-soft/80 animate-pulse" />
          </div>
        </div>

        {/* Centered favicon pulse loader — same as PageSuspenseFallback */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex flex-col items-center gap-4">
            <div className="relative animate-[loader-pulse_2s_ease-in-out_infinite]">
              <img
                src="/branding/exxonim-favicon-light.png"
                alt=""
                width="48"
                height="48"
                className="logo-light block w-12 h-12 object-contain opacity-40"
              />
              <img
                src="/branding/exxonim-favicon-dark.png"
                alt=""
                width="48"
                height="48"
                className="logo-dark w-12 h-12 object-contain opacity-40"
              />
            </div>
            <div className="flex items-center opacity-30">
              <span className="font-sans text-sm font-medium text-text-muted tracking-[0.08em] uppercase">
                Loading
              </span>
              <span className="loader-dots font-sans text-sm font-medium text-text-muted">
                <span>.</span><span>.</span><span>.</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Review bar ───────────────────────────────────
       * Matches hero-review-bar: 5.5svh, min-height 48px.
       */}
      <section
        aria-hidden="true"
        className="hero-review-bar flex items-center justify-center bg-page px-8"
      >
        <div className="flex items-center gap-3">
          <div className="h-4 w-4 rounded-sm bg-accent-soft animate-pulse" />
          <div className="h-3 w-20 rounded-full bg-accent-soft animate-pulse" />
          <div className="h-3 w-14 rounded-full bg-accent-soft animate-pulse" />
        </div>
      </section>

      {/* ── 3. Trusted-by logos (ProviderSection) ──────────
       * Matches ProviderSection: "Trusted by" label + marquee track.
       */}
      <section aria-hidden="true" className="relative bg-page">
        <p className="m-0 text-center text-xs font-extrabold uppercase tracking-[0.14em] text-accent pt-8 pb-3 md:pt-12 md:pb-4">
          Trusted by
        </p>
        <div className="pb-8 md:pb-12 flex items-center justify-center gap-8 px-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-8 sm:h-10 md:h-12 w-16 sm:w-24 md:w-32 rounded-lg bg-accent-soft animate-pulse"
            />
          ))}
        </div>
      </section>

      {/* ── 4. Feature cards (StackSection) ────────────────
       * Simplified placeholder for the stacked card area.
       * The real StackSection is complex (sticky stacking), so we
       * show a representative card shape.
       */}
      <section
        aria-hidden="true"
        className="relative bg-[linear-gradient(180deg,var(--color-page)_0%,var(--color-page)_52%,var(--color-page-strong)_100%)] py-16"
      >
        <div className="max-w-[1320px] mx-auto px-4">
          <div className="rounded-3xl border border-border-soft bg-surface p-8 md:p-12 animate-pulse">
            <div className="grid gap-4">
              <div className="h-3 w-20 rounded-full bg-accent-soft" />
              <div className="h-8 w-[min(24rem,70%)] rounded-full bg-accent-soft" />
              <div className="h-4 w-[min(36rem,90%)] rounded-full bg-accent-soft" />
              <div className="h-4 w-[min(28rem,65%)] rounded-full bg-accent-soft" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Pricing plans ───────────────────────────────
       * Matches ServicePackagesSection: 3-column grid of PlanCards.
       * The middle card is "featured" (dark bg), matching the real layout.
       */}
      <section aria-hidden="true" className="py-16 md:py-24">
        <div className="mx-auto w-[min(1240px,calc(100%-2rem))]">
          {/* Section heading */}
          <div className="grid gap-3 mb-6">
            <div className="h-3 w-28 rounded-full bg-accent-soft animate-pulse" />
            <div className="h-7 w-[min(22rem,70%)] rounded-full bg-accent-soft animate-pulse" />
          </div>

          {/* 3 plan cards */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { featured: false },
              { featured: true },
              { featured: false },
            ].map((card, i) => (
              <div
                key={i}
                className={cn(
                  "flex flex-col rounded-3xl border p-7 animate-pulse",
                  card.featured
                    ? "border-transparent bg-text"
                    : "border-border-soft bg-surface"
                )}
              >
                {/* Plan name + badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className={cn(
                    "h-6 w-24 rounded-full",
                    card.featured ? "bg-surface/20" : "bg-accent-soft"
                  )} />
                  {card.featured && (
                    <div className="h-5 w-16 rounded-full bg-accent" />
                  )}
                </div>
                {/* Description */}
                <div className="mt-3 grid gap-2">
                  <div className={cn(
                    "h-3 w-full rounded-full",
                    card.featured ? "bg-surface/15" : "bg-accent-soft"
                  )} />
                  <div className={cn(
                    "h-3 w-3/4 rounded-full",
                    card.featured ? "bg-surface/15" : "bg-accent-soft"
                  )} />
                </div>
                {/* Price */}
                <div className={cn(
                  "mt-3 h-6 w-36 rounded-full",
                  card.featured ? "bg-surface/20" : "bg-accent-soft"
                )} />
                {/* Divider */}
                <div className={cn(
                  "my-5 h-px",
                  card.featured ? "bg-surface/20" : "bg-border-soft"
                )} />
                {/* Feature list */}
                <div className="grid gap-2.5">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <div className={cn(
                        "h-5 w-5 rounded-full flex-none",
                        card.featured ? "bg-accent" : "bg-accent-soft"
                      )} />
                      <div className={cn(
                        "h-3 flex-1 rounded-full",
                        card.featured ? "bg-surface/15" : "bg-accent-soft"
                      )} style={{ maxWidth: `${70 + (j * 8)}%` }} />
                    </div>
                  ))}
                </div>
                {/* CTA button */}
                <div className={cn(
                  "mt-6 h-12 w-full rounded-full",
                  card.featured ? "bg-accent" : "bg-accent-soft/80"
                )} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Blog posts rail ─────────────────────────────
       * Matches InsightsSection: heading + horizontal card rail.
       */}
      <section aria-hidden="true" className="py-[clamp(80px,10vw,124px)]">
        <div className="mx-auto w-[min(1240px,calc(100%-2rem))]">
          {/* Section header */}
          <div className="grid gap-3.5 mb-7">
            <div className="h-9 w-[min(20rem,60%)] rounded-full bg-accent-soft animate-pulse" />
            <div className="h-4 w-[min(34rem,85%)] rounded-full bg-accent-soft animate-pulse" />
          </div>

          {/* Horizontal card rail */}
          <div className="flex gap-6 overflow-hidden px-1 py-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex min-w-0 flex-col rounded-[30px] border border-border-soft bg-surface animate-pulse flex-[0_0_clamp(260px,22vw,360px)] max-sm:rounded-[24px]"
              >
                {/* Image area */}
                <div className="aspect-[16/10] bg-accent-soft/60" />
                {/* Text area */}
                <div className="flex flex-1 flex-col p-6 pb-[22px] max-md:p-5">
                  <div className="mb-3.5 h-3 w-24 rounded-full bg-accent-soft" />
                  <div className="mb-2 h-5 w-full rounded-full bg-accent-soft" />
                  <div className="h-3 w-3/4 rounded-full bg-accent-soft" />
                  {/* Author + link row */}
                  <div className="mt-auto flex items-center justify-between gap-4 pt-5">
                    <div className="flex items-center gap-2.5">
                      <div className="h-[34px] w-[34px] rounded-full bg-accent-soft flex-none" />
                      <div className="grid gap-1">
                        <div className="h-3 w-16 rounded-full bg-accent-soft" />
                        <div className="h-2.5 w-12 rounded-full bg-accent-soft/70" />
                      </div>
                    </div>
                    <div className="h-3 w-16 rounded-full bg-accent-soft" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer row */}
          <div className="mt-7 flex items-center justify-between gap-4">
            <div className="h-4 w-48 rounded-full bg-accent-soft animate-pulse" />
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-accent-soft animate-pulse" />
              <div className="h-12 w-12 rounded-full bg-accent-soft animate-pulse" />
              <div className="h-12 w-28 rounded-full bg-accent-soft animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. Newsletter section ──────────────────────────
       * Matches UnifiedCtaSection: centered CTA card with gradient glow.
       */}
      <section aria-hidden="true" className="py-10 md:py-16">
        <div className="mx-auto w-[min(1240px,calc(100%-2rem))]">
          <div className="relative overflow-hidden border border-border-soft sm:rounded-[2rem] rounded-2xl sm:p-8 md:p-12 p-5 animate-pulse text-center"
            style={{
              background:
                'radial-gradient(80% 100% at 50% 0%, var(--color-accent-gradient-subtle), transparent 70%), var(--color-surface-elevated)',
            }}
          >
            {/* Unified CTA skeleton — always centered */}
            <div className="mx-auto inline-flex h-4 w-24 rounded-full bg-accent-soft" />
            <div className="mx-auto mt-3 h-8 w-[min(18rem,50%)] rounded-full bg-accent-soft" />
            <div className="mx-auto mt-3 h-3 w-[min(26rem,60%)] rounded-full bg-accent-soft" />
            <div className="mx-auto mt-6 flex items-center justify-center gap-3">
              <div className="h-12 flex-1 max-w-[260px] rounded-full bg-accent-soft" />
              <div className="h-12 w-28 rounded-full bg-accent-soft" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function LoadBoundary({
  children,
  error,
  errorDetail = "This section could not be loaded right now. Please try again in a moment.",
  errorTitle = "Unable to load content.",
  isPending,
  isReady = true,
  loadingLabel = "Loading content...",
  variant = "page",
}: LoadBoundaryProps) {
  if (isPending && !isReady) {
    return <ContentSkeleton label={loadingLabel} variant={variant} />;
  }

  if (isReady) {
    return <>{typeof children === "function" ? children() : children}</>;
  }

  if (error || !isReady) {
    return (
      <ErrorMessage
        compact={variant === "section"}
        detail={errorDetail}
        title={errorTitle}
      />
    );
  }

  return null;
}
