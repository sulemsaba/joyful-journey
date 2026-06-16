"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { StackItem } from "@/exxonim/types";
import { cn } from "@/exxonim/utils/cn";
import { Button } from "@/exxonim/components/primitives/Button";
import { ArrowRight } from "lucide-react";

/* ── Animation config ────────────────────────────────── */
const EASE = [0.25, 0.4, 0.25, 1] as const;
const DURATION = 0.6;
const VIEWPORT_ONCE = { once: true, margin: "-80px" } as const;

/* ── Smart video: pre-loads early, plays on visibility ── *
 *                                                       *
 * STRATEGY:                                             *
 * 1. Sources are always present in the DOM (no gate)    *
 * 2. preload="auto" tells the browser to buffer early   *
 * 3. IntersectionObserver controls PLAY/PAUSE:          *
 *    - In viewport → play (already buffered = instant)  *
 *    - Out of viewport → pause (saves CPU/battery)      *
 *    - Re-enters → resume from where it left off        *
 *                                                       *
 * WHY THIS IS BETTER:                                   *
 * - Old: Wait for scroll → start loading → wait for     *
 *   buffer → play = 3-5 second delay                    *
 * - New: Pre-loaded in background → scroll to it →      *
 *   already playing / instant start                     *
 *                                                       *
 * AUTOPLAY: We call video.play() when the video enters  *
 * the viewport. Since it's muted + playsInline, browsers*
 * allow autoplay. If blocked, we retry on interaction.  *
 *                                                       *
 * PLAYBACK RATE: 0.7x gives a cinematic slow-motion     *
 * feel — purely aesthetic, no performance impact.        */
function LazyVideo({ sources, poster, playbackRate, className, style }: { sources: { src: string; type: string }[]; poster?: string; playbackRate?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLVideoElement>(null);
  const isVisible = useRef(false);
  const hasPlayed = useRef(false);

  /* Step 1: Play/pause based on viewport visibility.
   * When the video scrolls into view, we play it.
   * When it scrolls out, we pause it.
   * This means the video is already playing (or instantly
   * starts) when the user scrolls to it. */
  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    let interactionHandler: (() => void) | null = null;
    let cancelled = false;

    const tryPlay = () => {
      if (cancelled || !video) return;
      video.play().catch(() => {
        // Autoplay blocked — retry on first user interaction
        if (cancelled) return;
        interactionHandler = () => {
          video.play().catch(() => {/* give up */});
        };
        document.addEventListener("click", interactionHandler, { once: true });
        document.addEventListener("touchstart", interactionHandler, { once: true });
        document.addEventListener("keydown", interactionHandler, { once: true });
      });
    };

    const handleVisibility = (entry: IntersectionObserverEntry) => {
      if (cancelled) return;

      if (entry.isIntersecting) {
        isVisible.current = true;
        // If video has buffered enough, play immediately
        if (video.readyState >= 3) {
          tryPlay();
        } else {
          // Wait for enough data then play
          const onReady = () => {
            if (!cancelled && isVisible.current) tryPlay();
            video.removeEventListener("canplaythrough", onReady);
            video.removeEventListener("loadeddata", onReady);
          };
          video.addEventListener("canplaythrough", onReady);
          video.addEventListener("loadeddata", onReady);
        }
      } else {
        isVisible.current = false;
        // Pause when out of view to save CPU/battery
        if (!video.paused) {
          video.pause();
          hasPlayed.current = true;
        }
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => handleVisibility(entry),
      { rootMargin: "100px", threshold: 0.05 }
    );
    observer.observe(video);

    // Also try to play on canplaythrough if already visible
    // (handles the case where video finishes loading after
    // the user has already scrolled to it)
    const onCanPlay = () => {
      if (!cancelled && isVisible.current) tryPlay();
    };
    video.addEventListener("canplaythrough", onCanPlay);

    // Apply playback rate
    if (playbackRate) {
      const applyRate = () => { video.playbackRate = playbackRate; };
      video.addEventListener("loadedmetadata", applyRate);
      if (video.readyState >= 1) applyRate();
    }

    // Safety: if video is in viewport on mount and ready, play
    if (video.readyState >= 3 && isVisible.current) {
      tryPlay();
    }

    return () => {
      cancelled = true;
      observer.disconnect();
      video.removeEventListener("canplaythrough", onCanPlay);
      if (interactionHandler) {
        document.removeEventListener("click", interactionHandler);
        document.removeEventListener("touchstart", interactionHandler);
        document.removeEventListener("keydown", interactionHandler);
      }
    };
  }, [playbackRate]);

  return (
    <video
      ref={ref}
      poster={poster}
      muted
      loop
      playsInline
      autoPlay
      disablePictureInPicture
      disableRemotePlayback
      preload="auto"
      aria-hidden="true"
      className={className}
      style={style}
    >
      {sources.map((s) => <source key={s.src} src={s.src} type={s.type} />)}
    </video>
  );
}

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
  const hasVideo = item.videoSources.length > 0;

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
        <h2 className="text-2xl font-bold tracking-tight text-text sm:text-3xl md:text-4xl">
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
          "md:[--video-width:70%] md:[--video-y-offset:5%]",
          "xl:[--video-width:50%] xl:[--video-y-offset:4%]",
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
              /* ── Actual video (lazy-loaded) ── */
              <>
                {/* Mobile: landscape, fills container */}
                <LazyVideo
                  sources={item.videoSources}
                  poster="/videos/track-consultation-poster.webp"
                  playbackRate={0.7}
                  className="pointer-events-none absolute inset-0 rounded-[20px] object-cover object-top shadow-[0px_8px_40px_0px_rgba(0,0,0,0.06)] border border-border-soft md:hidden"
                />
                {/* Desktop: phone-in-frame portrait style */}
                <LazyVideo
                  sources={item.videoSources}
                  poster="/videos/track-consultation-poster.webp"
                  playbackRate={0.7}
                  className="pointer-events-none absolute hidden md:block rounded-[20px] object-cover object-top shadow-[0px_8px_40px_0px_rgba(0,0,0,0.06)] border border-border-soft"
                  style={{
                    top: "var(--video-y-offset)",
                    left: "calc((100% - var(--video-width)) / 2)",
                    width: "var(--video-width)",
                    aspectRatio: "0.462",
                  }}
                />
              </>
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
