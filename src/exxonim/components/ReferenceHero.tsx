"use client";

import { useEffect, useRef } from "react";
import type { HomeHeroContent } from "@/exxonim/types";
import { cn } from "@/exxonim/utils/cn";
import { Button } from "@/exxonim/components/primitives/Button";

interface ReferenceHeroProps {
  content: HomeHeroContent;
}

export function ReferenceHero({ content }: ReferenceHeroProps) {
  const hasSecondaryCta = content.secondary_cta;
  const sectionRef = useRef<HTMLElement>(null);

  /* ── Smooth shrink animation ──────────────────────────
   * Uses requestAnimationFrame to throttle scroll events and
   * toggles a single CSS class instead of setting inline styles
   * on every scroll frame. This dramatically reduces main-thread
   * work (INP improvement) while keeping the smooth CSS transition.
   */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          section.classList.toggle("hero-shrunk", window.scrollY > 15);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Set initial state
    section.classList.toggle("hero-shrunk", window.scrollY > 15);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── Theme-reactive hero via CSS custom properties ────
   * All hero colors (bg, text, gradients) now use CSS custom
   * properties defined in globals.css (:root / html[data-theme="dark"]).
   * The @property registration + theme-transition class makes
   * these properties smoothly interpolate on :root during theme
   * changes. No MutationObserver or React state needed — the
   * browser handles the transition automatically.
   *
   * Benefits:
   *   - Gradient overlays using var(--color-hero-bg) smoothly update
   *   - Text colors use Tailwind tokens (text-text, text-accent, etc.)
   *   - No React re-render needed for theme change (CSS handles it)
   *   - Shrink animation is never clobbered by theme transition
   */

  return (
    <>
      {/* ── Hero Container ──────────────────────────────────
       * Structural spec: 94.5svh height (small viewport = no CLS from
       * mobile address bar), transform-origin top center,
       * shrink on scroll > 15px: scale(0.96) + rounded bottom corners.
       * Gap reveals page background (theme-adaptive canvas).
       *
       * Background: bg-hero-bg uses var(--color-hero-bg) which
       * smoothly transitions via @property registration on :root.
       */}
      <section
        ref={sectionRef}
        aria-label="Hero introduction"
        className={cn(
          "relative isolate overflow-hidden",
          "-mt-[68px] pt-[68px]",
          "flex items-center",
          "origin-top",
          "bg-hero-bg",
          "hero-section"
        )}
      >
        {/* ── Background assets ───────────────────────────── */}

        {/* Left-side fade so text always has contrast */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-[60%] lg:w-[55%]"
          style={{
            background: "linear-gradient(to right, var(--color-hero-bg), var(--color-hero-bg-fade), transparent)",
          }}
        />
        {/* Bottom fade for smooth transition to next section */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-1/3"
          style={{
            background: "linear-gradient(to top, var(--color-hero-bg), transparent)",
          }}
        />

        {/* ── Content ────────────────────────────────────── */}
        <div className="mx-auto w-[min(1240px,calc(100%-2rem))] px-0">
          <div className="relative" data-reveal>
            <div className="relative z-10 max-w-[640px]">
              <p
                className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-accent"
              >
                {content.eyebrow}
              </p>
              <h1
                className="m-0 text-[clamp(2.8rem,6vw,5.5rem)] font-semibold leading-[0.98] tracking-tight text-text"
              >
                {content.title}
              </h1>
              <p
                className="mt-6 max-w-[34rem] text-[clamp(1.05rem,1.4vw,1.2rem)] leading-relaxed text-text-muted"
              >
                {content.description}
              </p>

              {/* CTAs — primary + optional secondary */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button size="standard" variant="primary" href={content.cta.href} className="px-8">
                  {content.cta.label}
                </Button>
                {hasSecondaryCta ? (
                  <Button size="standard" variant="secondary" href={content.secondary_cta.href} className="px-8">
                    {content.secondary_cta.label}
                  </Button>
                ) : null}
              </div>

              {/* Highlight chips — temporarily hidden during design iteration */}
            </div>
          </div>
        </div>
      </section>

      {/* ── Google Review Peek Bar ──────────────────────────
       * Occupies the remaining 5.5svh of the viewport.
       * Visible at the bottom of the initial viewport as
       * above-the-fold social proof before any scroll.
       */}
      <section
        aria-label="Google reviews"
        className="hero-review-bar flex items-center justify-center bg-page px-8"
      >
        <a
          href="https://www.google.com/search?q=Exxonim+Consult+reviews"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 no-underline"
        >
          {/* Google logo SVG */}
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span className="text-[clamp(0.85rem,1.8vw,1rem)] font-medium text-text-muted">
            Google Rating
          </span>
          <span className="text-[1.1rem] tracking-[2px] text-star">
            ★★★★★
          </span>
          <span className="text-[clamp(0.85rem,1.8vw,1rem)] font-medium text-text-muted">
            5.0
          </span>

        </a>
      </section>
    </>
  );
}
