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

const stackPositionClasses = [
  "[--stack-top:calc(var(--header-height,70px)+0px)] [--stack-z:6]",
  "[--stack-top:calc(var(--header-height,70px)+40px)] [--stack-z:7]",
  "[--stack-top:calc(var(--header-height,70px)+80px)] [--stack-z:8]",
  "[--stack-top:calc(var(--header-height,70px)+120px)] [--stack-z:9]",
  "[--stack-top:calc(var(--header-height,70px)+160px)] [--stack-z:10]",
];

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
   * As the user scrolls through the section, we calculate which
   * card is "on top" based on scroll progress. When a card is
   * covered by the next one, it gets a sinking animation:
   *   - scale(0.96) — shrinks slightly toward its top edge
   *   - translateY(16px) — slides down behind the emerging card
   *
   * The animation is purely CSS-driven (transition on transform),
   * so it's smooth and GPU-accelerated. We only toggle a class
   * via JavaScript — the browser handles the interpolation.
   *
   * Cards are completely opaque (solid bg-page background) so
   * no content from below ever bleeds through.                             */
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
    updateActiveCard(); // Set initial state

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
              "full-bleed relative overflow-x-hidden lg:sticky max-lg:mb-8",
              "[top:var(--stack-top)] [z-index:var(--stack-z)]",
              stackPositionClasses[index] ??
                stackPositionClasses[stackPositionClasses.length - 1],
              // Solid opaque background — no content from below bleeds through
              "bg-page"
            )}
          >
            {/* Inner wrapper carries the sinking transform so it
                never conflicts with the article's sticky positioning.
                transform-origin: top keeps the shrink anchored at the
                top edge where the card is pinned.                         */}
            <div
              className={cn(
                "max-w-[1320px] mx-auto min-h-screen flex items-center justify-center",
                "p-[6.5rem_2rem] max-lg:min-h-0 max-lg:p-6",
                // Smooth sinking animation — desktop only
                "lg:transition-transform lg:duration-700 lg:ease-[cubic-bezier(0.22,1,0.36,1)]",
                "lg:origin-top",
                // When covered: scale down + sink behind the emerging card
                isCovered && "lg:scale-[0.96] lg:translate-y-4"
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
