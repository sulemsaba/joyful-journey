import { useState, useEffect, useRef } from "react";
import { FeatureAccordionCard } from "@/exxonim/components/stack-section/FeatureAccordionCard";
import { StatementCard } from "@/exxonim/components/stack-section/StatementCard";
import {
  defaultFeatureRows,
  featureVisualContentMap,
} from "@/exxonim/components/stack-section/content";
import type {
  ExtendedStackItem,
  FeatureRow,
  FeatureVisualContent,
} from "@/exxonim/components/stack-section/types";
import type { StackItem } from '@/exxonim/types';
import { cn } from "@/exxonim/utils/cn";

interface StackSectionProps {
  items: StackItem[];
  defaultFeatureRows?: FeatureRow[];
  featureVisualContentMap?: Record<string, FeatureVisualContent>;
}

/* Desktop: larger offsets for the stacked peek effect */
const stackPositionClassesLg = [
  "[--stack-top-lg:calc(var(--header-height,70px)+0px)]",
  "[--stack-top-lg:calc(var(--header-height,70px)+40px)]",
  "[--stack-top-lg:calc(var(--header-height,70px)+80px)]",
  "[--stack-top-lg:calc(var(--header-height,70px)+120px)]",
  "[--stack-top-lg:calc(var(--header-height,70px)+160px)]",
];

/* Mobile: tighter offsets — just enough to see the stack peek */
const stackPositionClassesSm = [
  "[--stack-top-sm:calc(var(--header-height,56px)+0px)]",
  "[--stack-top-sm:calc(var(--header-height,56px)+20px)]",
  "[--stack-top-sm:calc(var(--header-height,56px)+40px)]",
  "[--stack-top-sm:calc(var(--header-height,56px)+60px)]",
  "[--stack-top-sm:calc(var(--header-height,56px)+80px)]",
];

const Z_BASE = 6;

export function StackSection({
  items,
  defaultFeatureRows: featureRowsProp,
  featureVisualContentMap: featureVisualsProp,
}: StackSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const fallbackRows = featureRowsProp?.length
    ? featureRowsProp
    : defaultFeatureRows;
  const featureVisuals =
    featureVisualsProp && Object.keys(featureVisualsProp).length > 0
      ? featureVisualsProp
      : featureVisualContentMap;
  const visibleItems = items.filter(
    (item) => !(item as ExtendedStackItem).isHidden
  );

  /* ── Scroll-driven active card tracking ───────────────────────
   * Works on ALL screen sizes. As the user scrolls, we calculate
   * which card is "on top". Covered cards get a sinking animation:
   *   - scale(0.96) — shrinks toward its top edge
   *   - translateY(16px) — slides down behind the emerging card
   *
   * Cards are completely opaque (solid bg-page) so no content
   * from below ever bleeds through.                               */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || visibleItems.length === 0) return;

    let ticking = false;

    const updateActiveCard = () => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollableHeight = section.scrollHeight - viewportHeight;

      if (scrollableHeight <= 0) {
        ticking = false;
        return;
      }

      const scrolled = Math.max(0, -rect.top);
      const progress = Math.min(1, scrolled / scrollableHeight);
      const index = Math.min(
        Math.floor(progress * visibleItems.length),
        visibleItems.length - 1
      );

      setActiveIndex((prev) => (prev !== index ? index : prev));
      ticking = false;
    };

    const handleScroll = () => {
      if (ticking) return;
      requestAnimationFrame(updateActiveCard);
      ticking = true;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateActiveCard();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleItems.length]);

  return (
    <section
      ref={sectionRef}
      aria-label="Service guidance overview"
      className="relative bg-[linear-gradient(180deg,var(--color-page)_0%,var(--color-page)_52%,var(--color-page-strong)_100%)]"
    >
      {visibleItems.map((rawItem, index) => {
        const item = rawItem as ExtendedStackItem;
        const isFeatureCard = index === 1;
        const isCovered = index < activeIndex;

        return (
          <article
            key={`${item.title}-${index}`}
            className={cn(
              "full-bleed relative overflow-x-hidden sticky",
              // Desktop top offset (larger peek)
              "lg:[top:var(--stack-top-lg)]",
              // Mobile top offset (tighter peek)
              "[top:var(--stack-top-sm)]",
              // Z-index: each card is higher than the last
              `[z-index:${Z_BASE + index}]`,
              // Desktop position overrides
              stackPositionClassesLg[index],
              stackPositionClassesSm[index],
              // Solid opaque background — zero bleed-through
              "bg-page"
            )}
          >
            {/* Inner wrapper carries the sinking transform so it
                never conflicts with sticky positioning.
                transform-origin: top keeps shrink anchored at the
                top edge where the card is pinned.                    */}
            <div
              className={cn(
                "mx-auto flex items-center justify-center",
                // Desktop: full viewport height, generous padding
                "lg:min-h-screen lg:max-w-[1320px] lg:p-[6.5rem_2rem]",
                // Mobile: shorter height, compact padding
                "min-h-[85svh] max-w-[1320px] p-8 sm:min-h-[90svh] sm:p-12",
                // Sinking animation — all screen sizes
                "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                "origin-top",
                // When covered: scale down + sink behind
                isCovered && "scale-[0.96] translate-y-4"
              )}
            >
              {isFeatureCard ? (
                <FeatureAccordionCard
                  item={item}
                  fallbackFeatureRows={fallbackRows}
                  featureVisuals={featureVisuals}
                />
              ) : (
                <StatementCard item={item} index={index} />
              )}
            </div>
          </article>
        );
      })}
    </section>
  );
}
