"use client";

import type { StackItem, FeatureRow, FeatureVisualContent } from "@/lib/exxonim-types";
import { cn } from "@/lib/cn";
import { Container } from "@/components/exxonim/Container";
import { routes } from "@/lib/exxonim-router";
import { ArrowRight } from "lucide-react";

interface StackSectionProps {
  items: StackItem[];
  defaultFeatureRows?: FeatureRow[];
  featureVisualContentMap?: Record<string, FeatureVisualContent>;
}

function StatementCard({
  item,
  index,
  variant = "desktop",
}: {
  item: StackItem;
  index: number;
  variant?: "desktop" | "mobile";
}) {
  const isDesktop = variant === "desktop";

  return (
    /* Gradient border wrapper */
    <div
      className={cn(
        "rounded-2xl p-px",
        "bg-gradient-to-br from-accent/20 via-transparent to-accent-secondary/20",
        isDesktop && "border-l-4 border-l-accent",
        variant === "mobile" &&
          "transition-all duration-300 hover:-translate-y-1 hover:shadow-panel"
      )}
    >
      <div className="rounded-2xl bg-surface p-8 md:p-10 shadow-card">
        <div className="grid gap-1 mb-4">
          {/* Prominent accent-colored badge for card number */}
          <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-accent-soft px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-accent">
            {item.windowTag} {index + 1}
          </span>
          <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-text">
            {item.title}
          </h3>
          <p className="text-text-muted text-sm">{item.subtitle}</p>
        </div>
        <p className="text-text-muted leading-relaxed mb-6">{item.description}</p>
        <a
          href={item.ctaHref}
          className={cn(
            "group inline-flex h-11 items-center justify-center rounded-full bg-accent px-6 text-sm font-extrabold text-accent-contrast",
            "hover:bg-accent-hover transition-all hover:-translate-y-0.5"
          )}
        >
          {item.ctaLabel}
          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </a>
      </div>
    </div>
  );
}

export function StackSection({
  items,
  defaultFeatureRows,
  featureVisualContentMap,
}: StackSectionProps) {
  if (!items || items.length === 0) return null;

  return (
    <section
      className={cn(
        "relative py-16 lg:py-24",
        "bg-[linear-gradient(180deg,var(--color-surface)_0%,var(--color-page)_52%,var(--color-page-strong)_100%)]"
      )}
    >
      <Container>
        {/* Section header with decorative divider */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-surface-soft px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-accent mb-4">
            Our Services
          </span>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-text">
            How We Help Your Business
          </h2>
          {/* Decorative line divider */}
          <div className="mx-auto mt-4 flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-accent/40" />
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="h-px w-8 bg-accent/40" />
          </div>
        </div>

        {/* Desktop: sticky stacking cards */}
        <div className="hidden lg:block">
          <div className="relative flex flex-col gap-6">
            {items.map((item, i) => (
              <div
                key={i}
                className="sticky"
                style={{ top: `calc(var(--header-height, 70px) + ${i * 24}px)` }}
              >
                <StatementCard item={item} index={i} variant="desktop" />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: simple vertical stack with hover lift */}
        <div className="flex flex-col gap-6 lg:hidden">
          {items.map((item, i) => (
            <StatementCard key={i} item={item} index={i} variant="mobile" />
          ))}
        </div>
      </Container>
    </section>
  );
}
