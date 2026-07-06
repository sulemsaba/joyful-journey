"use client";

import { useEffect, useRef, useState } from "react";
import type { StackItem } from "@/exxonim/types";
import { cn } from "@/exxonim/utils/cn";
import { Button } from "@/exxonim/components/primitives/Button";
import { ArrowRight } from "lucide-react";

/* ── Animation is handled by the existing [data-reveal] CSS system ──
 * (globals.css: html.js [data-reveal]:not(.revealed) → reveal-up transition)
 * No JS animation library needed — GPU-composited CSS transitions. */

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
 * feel - purely aesthetic, no performance impact.        */
function LazyVideo({ sources, poster, playbackRate, className, mobileStyle, desktopStyle }: { sources: { src: string; type: string }[]; poster?: string; playbackRate?: number; className?: string; mobileStyle?: React.CSSProperties; desktopStyle?: React.CSSProperties }) {
  const ref = useRef<HTMLVideoElement>(null);
  const isVisible = useRef(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    let cancelled = false;
    let interactionHandler: (() => void) | null = null;

    const tryPlay = () => {
      if (cancelled || !video) return;
      if (video.paused) {
        video.play().catch(() => {
          // Autoplay blocked - retry on first user interaction
          if (cancelled) return;
          interactionHandler = () => { video.play().catch(() => {}); };
          document.addEventListener("click", interactionHandler, { once: true });
          document.addEventListener("touchstart", interactionHandler, { once: true });
        });
      }
    };

    // Play when video can play + is visible
    const onCanPlay = () => {
      if (!cancelled && isVisible.current) tryPlay();
    };
    video.addEventListener("canplay", onCanPlay);

    // IntersectionObserver: load + play when visible, pause when not
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (cancelled) return;

        if (entry.isIntersecting) {
          isVisible.current = true;
          // If already ready, play immediately
          if (video.readyState >= 3) {
            tryPlay();
          }
          // Otherwise, onCanPlay will handle it
        } else {
          isVisible.current = false;
          if (!video.paused) video.pause();
        }
      },
      { rootMargin: "100px", threshold: 0.05 }
    );
    observer.observe(video);

    // Apply playback rate once metadata loads
    if (playbackRate) {
      const applyRate = () => { video.playbackRate = playbackRate; };
      video.addEventListener("loadedmetadata", applyRate);
      if (video.readyState >= 1) applyRate();
    }

    return () => {
      cancelled = true;
      observer.disconnect();
      video.removeEventListener("canplay", onCanPlay);
      if (interactionHandler) {
        document.removeEventListener("click", interactionHandler);
        document.removeEventListener("touchstart", interactionHandler);
      }
    };
  }, [playbackRate]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const activeStyle = isMobile ? (mobileStyle ?? {}) : (desktopStyle ?? {});

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
      preload="metadata"
      aria-hidden="true"
      className={className}
      style={activeStyle}
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

  // Mobile copy (falls back to desktop copy if not set)
  const mobileTitle = item.mobileTitle || item.title;
  const mobileDescription = item.mobileDescription || item.description;
  const mobileCtaLabel = item.mobileCtaLabel || item.ctaLabel;

  return (
    <div
      className={cn(
        "grid items-center gap-12 md:grid-cols-2 xl:gap-20",
        isReversed && "md:[direction:rtl]"
      )}
    >
      {/* ── Text Half ── Reveals up on scroll via CSS [data-reveal] */}
      <div
        data-reveal
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

        {/* Heading — mobile copy on small screens, desktop copy on md+ */}
        <h2 className="text-2xl font-bold tracking-tight text-text sm:text-3xl md:text-4xl">
          <span className="md:hidden">{mobileTitle}</span>
          <span className="hidden md:inline">{item.title}</span>
        </h2>

        {/* Subtitle — desktop only, bold accent color for attention */}
        {item.subtitle && (
          <p className="hidden md:block text-lg leading-relaxed text-accent font-bold">
            {item.subtitle}
          </p>
        )}

        {/* Description — mobile copy on small screens, desktop copy on md+ */}
        <p className="text-base leading-relaxed text-text-muted sm:text-lg">
          <span className="md:hidden">{mobileDescription}</span>
          <span className="hidden md:inline">{item.description}</span>
        </p>

        {/* CTA — mobile label on small screens, desktop label on md+ */}
        <div className="flex items-center gap-3 pt-2">
          <Button
            size="standard"
            variant="primary"
            href={item.ctaHref || "/contact/"}
          >
            <span className="md:hidden">{mobileCtaLabel}</span>
            <span className="hidden md:inline">{item.ctaLabel}</span>
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>

      {/* ── Video Surface Half ── Reveals on scroll via CSS [data-reveal] with stagger */}
      <div
        data-reveal
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
            /* NO portrait on mobile - landscape always */
            "aspect-[1.22]",
            "md:aspect-[1.22]",
            "xl:aspect-[1.22]"
          )}
        >
          <div className="relative size-full contain-paint">
            {hasVideo ? (
              <LazyVideo
                sources={item.videoSources}
                poster="/videos/track-consultation-poster.webp"
                playbackRate={0.7}
                className="pointer-events-none absolute rounded-[20px] object-cover object-top shadow-[0px_8px_40px_0px_rgba(0,0,0,0.06)] border border-border-soft"
                mobileStyle={{
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
                desktopStyle={{
                  top: "var(--video-y-offset)",
                  left: "calc((100% - var(--video-width)) / 2)",
                  width: "var(--video-width)",
                  aspectRatio: "0.462",
                }}
              />
            ) : (
              /* ── Placeholder surface - no video ── */
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
      </div>
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
