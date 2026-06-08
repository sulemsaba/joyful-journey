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

  return (
    <section aria-label="Service guidance overview" className="relative bg-[linear-gradient(180deg,var(--color-page)_0%,var(--color-page)_52%,var(--color-page-strong)_100%)]">
      {visibleItems.map((rawItem, index) => {
        const item = rawItem as ExtendedStackItem;
        const isFeatureCard = index === 1;

        return (
          <article
            key={`${item.title}-${index}`}
            className={`full-bleed relative overflow-x-hidden lg:sticky max-lg:mb-8 [top:var(--stack-top)] [z-index:var(--stack-z)] ${
              stackPositionClasses[index] ??
              stackPositionClasses[stackPositionClasses.length - 1]
            } bg-page`}
          >
            <div className="max-w-[1320px] mx-auto min-h-screen flex items-center justify-center p-[6.5rem_2rem] max-lg:min-h-0 max-lg:p-6">
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
