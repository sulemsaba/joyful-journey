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
    <div className="grid grid-cols-[1.05fr_minmax(0,560px)] items-center gap-16 h-full max-lg:grid-cols-1 max-lg:gap-10 max-lg:h-auto">
      <div className="grid gap-6 justify-items-start">
        <h2 className="m-0 text-[clamp(2.2rem,3.6vw,3rem)] leading-[1.04] font-semibold text-text">
          {item.title}
        </h2>
        {item.subtitle ? (
          <p className="m-0 text-[clamp(1rem,1.3vw,1.15rem)] font-medium text-text-soft">
            {item.subtitle}
          </p>
        ) : null}
        <p className="m-0 max-w-[38rem] text-[0.94rem] leading-relaxed text-text-soft">
          {item.description}
        </p>
        {item.emphasis ? (
          <p className="m-0 text-[0.94rem] leading-relaxed text-text-soft italic border-l-2 border-accent-soft pl-4">
            {item.emphasis}
          </p>
        ) : null}

        <div className="flex items-center gap-3 flex-wrap mt-4">
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

      <ReferenceVisual index={index} />
    </div>
  );
}
