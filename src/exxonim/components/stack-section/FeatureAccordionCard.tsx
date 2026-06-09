import { useId, useState } from "react";
import { renderFeatureVisual } from "./ReferenceVisual";
import { Button } from "../primitives/Button";
import type { ExtendedStackItem, FeatureRow, FeatureVisualContent } from "./types";

function FeatureChevronIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false" className="w-5 h-5">
      <path
        d="M7 4.5L13 10L7 15.5"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FeatureAccordionCard({
  item,
  fallbackFeatureRows,
  featureVisuals,
}: {
  item: ExtendedStackItem;
  fallbackFeatureRows: FeatureRow[];
  featureVisuals: Record<string, FeatureVisualContent>;
}) {
  const rows =
    item.featureRows && item.featureRows.length > 0
      ? item.featureRows
      : fallbackFeatureRows;
  const accordionId = useId();
  const [selectedFeatureIndex, setSelectedFeatureIndex] = useState(0);
  const safeActiveFeatureIndex = Math.min(selectedFeatureIndex, rows.length - 1);
  const activeRow = rows[safeActiveFeatureIndex];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,620px)_1fr] items-center gap-8 lg:gap-12 h-auto w-full">
      {/* Visual — on mobile: below accordion; on desktop: left side */}
      <div className="flex items-start justify-center lg:order-1 max-w-full lg:max-w-none">
        {renderFeatureVisual(activeRow.visualKey, featureVisuals)}
      </div>

      {/* Accordion — on mobile: first (content priority); on desktop: right side */}
      <div className="grid gap-5 lg:order-2">
        <div className="grid">
          {rows.map((row, idx) => {
            const active = idx === safeActiveFeatureIndex;
            const panelId = `${accordionId}-feature-panel-${idx}`;

            return (
              <div
                key={`${row.title}-${idx}`}
                className={`border-b border-border-soft transition-colors ${
                  active ? "bg-accent/5" : "bg-transparent"
                }`}
              >
                <button
                  type="button"
                  className="w-full grid grid-cols-[38px_1fr_20px] gap-3 items-center min-h-12 py-3 text-left cursor-pointer bg-transparent border-0 hover:bg-accent/5 focus-visible:outline-2 focus-visible:outline-accent transition-colors"
                  aria-expanded={active}
                  aria-controls={panelId}
                  onClick={() => setSelectedFeatureIndex(idx)}
                >
                  <span
                    className={`inline-flex items-center justify-center w-[36px] h-[36px] rounded-[0.6rem] text-sm font-bold transition-colors ${
                      active
                        ? "bg-accent text-accent-contrast"
                        : "bg-accent/10 text-text"
                    }`}
                    aria-hidden="true"
                  >
                    {idx + 1}
                  </span>

                  <span className="min-w-0">
                    <span className="block text-[0.92rem] font-bold leading-tight transition-colors text-text">
                      {row.title}
                    </span>
                  </span>

                  <span className={`inline-flex items-center justify-center transition-colors ${
                    active ? "text-accent" : "text-text-soft"
                  }`}>
                    <span className={`inline-block transition-transform ${active ? "rotate-90" : ""}`}>
                      <FeatureChevronIcon />
                    </span>
                  </span>
                </button>

                <div
                  className={active ? "h-auto pb-[1.15rem] pl-[calc(38px+1rem)]" : "h-0 overflow-hidden"}
                  id={panelId}
                  hidden={!active}
                >
                  <div className="max-w-[34rem]">
                    <p className="m-0 text-[0.82rem] leading-relaxed text-text-soft">
                      {row.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <Button
            size="standard"
            variant="secondary"
            href={item.ctaHref || "#"}
          >
            {item.ctaLabel || "Explore Services"}
            <span className="ml-2">→</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
