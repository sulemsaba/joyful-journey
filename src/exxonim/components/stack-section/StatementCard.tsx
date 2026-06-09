import type { ExtendedStackItem } from "./types";
import { ReferenceVisual } from "./ReferenceVisual";
import { Button } from "../primitives/Button";

export function StatementCard({
  item,
  index,
}: {
  item: ExtendedStackItem;
  index: number;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_minmax(0,560px)] items-center gap-6 lg:gap-16 w-full">
      {/* Text content — always first, always full width on mobile */}
      <div className="grid gap-3 sm:gap-5 justify-items-start">
        <h2 className="m-0 text-[clamp(1.6rem,5vw,3rem)] leading-[1.08] font-semibold text-text">
          {item.title}
        </h2>
        {item.subtitle ? (
          <p className="m-0 text-[clamp(0.85rem,2.5vw,1.15rem)] font-medium text-text-soft">
            {item.subtitle}
          </p>
        ) : null}
        <p className="m-0 max-w-[38rem] text-[0.88rem] sm:text-[0.94rem] leading-relaxed text-text-soft">
          {item.description}
        </p>
        {item.emphasis ? (
          <p className="m-0 text-[0.88rem] sm:text-[0.94rem] leading-relaxed text-text-soft italic border-l-2 border-accent-soft pl-4">
            {item.emphasis}
          </p>
        ) : null}

        <div className="flex items-center gap-3 flex-wrap mt-1 sm:mt-3">
          <Button
            size="standard"
            variant="secondary"
            href={item.ctaHref || "/contact/"}
          >
            {item.ctaLabel || "Contact Exxonim"}
            <span className="ml-2">→</span>
          </Button>
        </div>
      </div>

      {/* Visual — below text on mobile, beside text on desktop */}
      <ReferenceVisual index={index} />
    </div>
  );
}
