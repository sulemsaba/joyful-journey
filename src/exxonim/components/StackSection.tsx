"use client";

import { motion } from "framer-motion";
import type { StackItem } from "@/exxonim/types";
import { cn } from "@/exxonim/utils/cn";
import { Button } from "@/exxonim/components/primitives/Button";
import { ArrowRight } from "lucide-react";

/* ── Animation config ────────────────────────────────── */
const EASE = [0.25, 0.4, 0.25, 1] as const;
const DURATION = 0.6;
const VIEWPORT_ONCE = { once: true, margin: "-80px" } as const;

interface StackSectionProps {
  items: StackItem[];
  defaultFeatureRows?: unknown[];
  featureVisualContentMap?: Record<string, unknown>;
}

export function StackSection({ items }: StackSectionProps) {
  const visibleItems = items.filter(Boolean);

  if (visibleItems.length === 0) return null;

  return (
    <section
      aria-label="Service guidance overview"
      className="px-6 py-16 md:py-24 bg-page"
    >
      <div className="mx-auto max-w-[1280px] space-y-20 md:space-y-28">
        {visibleItems.map((item, index) => {
          const isReversed = index % 2 === 1;
          return (
            <StackItemRow
              key={`${item.title}-${index}`}
              item={item}
              index={index}
              isReversed={isReversed}
            />
          );
        })}
      </div>
    </section>
  );
}

/* ── Single row: text half + video surface half ─────── */

interface StackItemRowProps {
  item: StackItem;
  index: number;
  isReversed: boolean;
}

function StackItemRow({ item, index, isReversed }: StackItemRowProps) {
  const badge = item.windowTag || undefined;
  const hasVideo = Boolean(item.videoSrc);

  return (
    <div
      className={cn(
        "grid items-center gap-12 md:grid-cols-2 xl:gap-20",
        isReversed && "md:[direction:rtl]"
      )}
    >
      {/* ── Text Half ── Slides up from below */}
      <motion.div
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: DURATION, ease: EASE }}
        className={cn(
          "space-y-6 md:pr-4",
          isReversed && "md:[direction:ltr]"
        )}
      >
        {/* Badge pill */}
        {badge && (
          <div className="inline-flex items-center rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent ring-1 ring-inset ring-accent/20">
            {badge}
          </div>
        )}

        {/* Heading */}
        <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
          {item.title}
        </h2>

        {/* Subtitle */}
        {item.subtitle && (
          <p className="text-lg leading-relaxed text-accent font-medium">
            {item.subtitle}
          </p>
        )}

        {/* Description */}
        <p className="text-base leading-relaxed text-text-muted sm:text-lg">
          {item.description}
        </p>

        {/* CTA */}
        <div className="flex items-center gap-3 pt-2">
          <Button
            size="standard"
            variant="primary"
            href={item.ctaHref || "/contact/"}
          >
            {item.ctaLabel || "Learn More"}
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </motion.div>

      {/* ── Video Surface Half ── Fades in like going beneath the text card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 12 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: DURATION + 0.15, ease: EASE }}
        className={cn(
          "relative w-full",
          /* CSS custom properties for responsive video positioning */
          "[--video-width:80%] [--video-y-offset:8%]",
          "md:[--video-width:65%] md:[--video-y-offset:8%]",
          "xl:[--video-width:42%] xl:[--video-y-offset:9%]",
          isReversed && "md:[direction:ltr]"
        )}
      >
        {/* Surface (background container) */}
        <div
          className={cn(
            "relative w-full overflow-hidden rounded-2xl ring-1 ring-border-soft",
            "bg-page",
            /* NO portrait on mobile — landscape always */
            "aspect-[1.22]",
            "md:aspect-[1.22]",
            "xl:aspect-[1.22]"
          )}
        >
          <div className="relative size-full">
            {hasVideo ? (
              /* ── Actual video ── Single <video>, responsive positioning */
              <video
                autoPlay
                muted
                loop
                playsInline
                disablePictureInPicture
                disableRemotePlayback
                preload="metadata"
                poster="/videos/track-consultation-poster.webp"
                aria-hidden="true"
                className="pointer-events-none absolute rounded-[20px] object-cover object-top shadow-[0px_8px_40px_0px_rgba(0,0,0,0.06)] border border-border-soft
                  /* Mobile: centered portrait, 60% width */
                  left-[20%] top-[4%] w-[60%] aspect-[9/16]
                  /* Desktop: same portrait positioning via CSS vars */
                  md:left-[calc((100%-var(--video-width))/2)] md:top-[var(--video-y-offset)] md:w-[var(--video-width)] md:aspect-[0.462]"
              >
                <source src={item.videoSrc} type="video/mp4" />
              </video>
            ) : (
              /* ── Placeholder surface — no video ── */
              <>
                {/* Mobile: landscape, fills container */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-[20px] border border-border-soft bg-page shadow-[0px_8px_40px_0px_rgba(0,0,0,0.06)] overflow-hidden md:hidden"
                >
                  <PlaceholderGraphic index={index} label={item.windowTitle || item.title} />
                </div>
                {/* Desktop: phone-in-frame portrait style */}
                <div
                  className="pointer-events-none absolute hidden md:block rounded-[20px] border border-border-soft bg-page shadow-[0px_8px_40px_0px_rgba(0,0,0,0.06)] overflow-hidden"
                  style={{
                    top: "var(--video-y-offset)",
                    left: "calc((100% - var(--video-width)) / 2)",
                    width: "var(--video-width)",
                    aspectRatio: "0.462",
                  }}
                >
                  <PlaceholderGraphic index={index} label={item.windowTitle || item.title} />
                </div>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Placeholder graphic for when no video is available ── */

function PlaceholderGraphic({ index, label }: { index: number; label: string }) {
  /* Three distinct visual patterns for the 3 stack items */
  const patterns = [
    /* Item 0: Stacked cards illusion */
    <div key="0" className="flex flex-col items-center justify-center h-full gap-3 p-4">
      <div className="w-3/4 h-3 rounded-full bg-accent/20" />
      <div className="w-full space-y-2.5">
        <div className="h-2 rounded-full bg-accent/10 w-full" />
        <div className="h-2 rounded-full bg-accent/10 w-4/5" />
        <div className="h-2 rounded-full bg-accent/10 w-3/5" />
      </div>
      <div className="mt-auto w-full space-y-2">
        <div className="flex gap-2">
          <div className="h-6 rounded-md bg-accent/15 flex-1" />
          <div className="h-6 rounded-md bg-accent/10 flex-1" />
        </div>
        <div className="h-8 rounded-lg bg-accent/20 w-full" />
      </div>
    </div>,

    /* Item 1: Checklist illusion */
    <div key="1" className="flex flex-col items-center justify-start h-full gap-2.5 p-4 pt-6">
      <div className="w-2/3 h-2.5 rounded-full bg-accent/20 mb-2" />
      {[1, 2, 3].map((i) => (
        <div key={i} className="w-full flex items-center gap-2">
          <div className="w-4 h-4 rounded border-2 border-accent/30 shrink-0 flex items-center justify-center">
            {i < 3 && <div className="w-2 h-2 rounded-sm bg-accent/40" />}
          </div>
          <div className="h-2 rounded-full bg-accent/10 flex-1" />
        </div>
      ))}
      <div className="mt-4 w-full space-y-2">
        <div className="h-2 rounded-full bg-accent/10 w-full" />
        <div className="h-2 rounded-full bg-accent/10 w-3/4" />
      </div>
      <div className="mt-auto w-full">
        <div className="h-7 rounded-lg bg-accent/20 w-full" />
      </div>
    </div>,

    /* Item 2: Progress/track illusion */
    <div key="2" className="flex flex-col items-center justify-start h-full gap-3 p-4 pt-6">
      <div className="w-1/2 h-2.5 rounded-full bg-accent/20" />
      <div className="w-full space-y-3 mt-2">
        {["Intake", "Review", "Submit", "Done"].map((step, i) => (
          <div key={step} className="flex items-center gap-2.5">
            <div className={cn(
              "w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold shrink-0",
              i < 2 ? "bg-accent/25 text-accent" : "bg-accent/10 text-text-muted"
            )}>
              {i + 1}
            </div>
            <div className="flex-1">
              <div className="h-2 rounded-full bg-accent/10 w-2/3" />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-auto w-full">
        <div className="h-7 rounded-lg bg-accent/20 w-full" />
      </div>
    </div>,
  ];

  return (
    <div className="w-full h-full bg-page relative">
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
        aria-hidden="true"
      />
      {patterns[index % 3]}
    </div>
  );
}
