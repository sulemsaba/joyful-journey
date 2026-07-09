
import { useEffect, useRef } from "react";
import { ArrowRight, Star, ChevronDown } from "lucide-react";
import type { HomeHeroContent } from "@/exxonim/types";
import { cn } from "@/exxonim/utils/cn";
import { Button } from "@/exxonim/components/primitives/Button";
import { SmartLink } from "@/exxonim/components/primitives/SmartLink";
import { HeroAurora } from "@/exxonim/components/HeroAurora";

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
    let isShrunk = window.scrollY > 15;

    const applyShrinkState = () => {
      const nextIsShrunk = window.scrollY > 15;
      if (nextIsShrunk !== isShrunk) {
        isShrunk = nextIsShrunk;
        section.classList.toggle("hero-shrunk", nextIsShrunk);
      }
    };

    const handleScroll = () => {
      if (ticking) return;
      requestAnimationFrame(() => {
        applyShrinkState();
        ticking = false;
      });
      ticking = true;
    };

    // Set initial state
    section.classList.toggle("hero-shrunk", isShrunk);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── Theme-reactive hero via CSS custom properties ────
   * All hero colors (bg, text, gradients) now use CSS custom
   * properties defined in globals.css (:root / html[data-theme="dark"]).
   * The @property registration + theme-transition class makes
   * these properties smoothly interpolate on :root during theme
   * changes. No MutationObserver or React state needed - the
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
          "relative isolate overflow-x-clip",
          "-mt-[60px] md:-mt-[68px] pt-[60px] md:pt-[68px]",
          "flex items-center",
          "origin-top",
          "bg-hero-bg",
          "hero-section"
        )}
      >
        {/* ── Background assets ───────────────────────────── */}

        {/* Animated aurora canvas - flowing curtain-like lines.
            Theme-reactive: adapts colors and opacity for light/dark.
            Opacity controlled by .hero-aurora-canvas CSS class. */}
        <HeroAurora />

        {/* Left-side fade so text always has contrast over the aurora */}
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

        {/* ── Content ──────────────────────────────────────
         * Left-anchored layout: content sits at the true left edge of the
         * viewport (with responsive horizontal padding), NOT centered in a
         * centered container. This is the "world-class" hero pattern used by
         * Stripe, Linear, Vercel — content hugs the left, aurora breathes on
         * the right. The container is still max-w-[1240px] mx-auto so on
         * ultra-wide screens the content doesn't drift too far right, but
         * within that container the content is left-aligned (no mx-auto on
         * the content block itself). */}
        <div className="mx-auto max-w-[1240px] w-full px-6 sm:px-8 lg:px-12">
          <div className="relative" data-reveal>
            <div className="relative z-10 max-w-[640px] sm:max-w-[680px] md:max-w-[760px] lg:max-w-[820px] xl:max-w-[880px] pt-6 md:pt-10 xl:pt-14">
              <p
                className="mb-5 md:mb-6 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-accent"
              >
                {content?.eyebrow}
              </p>
              <h1
                className="m-0 text-[clamp(2rem,5.2vw,4.75rem)] font-semibold leading-[1.08] tracking-tight text-text"
                style={{ textWrap: "balance" }}
              >
                {content.title.split("\n").map((line, i) => (
                  <span key={i}>
                    {i > 0 && <br />}
                    {line}
                  </span>
                ))}
              </h1>
              <p
                className="mt-5 md:mt-7 max-w-[30rem] sm:max-w-[32rem] md:max-w-[36rem] text-[clamp(1rem,1.35vw,1.1875rem)] leading-relaxed text-text-muted"
                style={{ textWrap: "pretty" }}
              >
                {content.description}
              </p>

              {/* CTAs - Hick's Law: ONE dominant primary CTA, secondary demoted to text link */}
              <div className="mt-7 md:mt-9 flex flex-wrap items-center gap-4">
                <Button size="hero" variant="primary" href={content.cta.href} className="px-7 md:px-8">
                  {content.cta.label}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
                {hasSecondaryCta ? (
                  <SmartLink
                    href={content.secondary_cta.href}
                    className="inline-flex items-center gap-1.5 min-h-12 px-3 py-2 relative before:absolute before:-top-2 before:-bottom-2 before:left-0 before:right-0 text-sm font-medium text-text-muted hover:text-accent transition-colors group"
                  >
                    <span className="border-b border-current/40 group-hover:border-current pb-0.5 transition-colors">
                      {content.secondary_cta.label}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </SmartLink>
                ) : null}
              </div>

              {/* Highlight chips - temporarily hidden during design iteration */}
            </div>
          </div>

          {/* ── Scroll-down indicator ─────────────────────────
           * Vertical scroll indicator anchored to the LEFT EDGE of the hero,
           * at the BOTTOM of the 94.5svh hero section (near the bottom of
           * the device viewport). Consists of a thin vertical track with a
           * bouncing chevron at the bottom — a premium "world-class" pattern
           * that signals "scroll down" without cluttering the content.
           * Fades out when the user scrolls (hero-shrunk state).
           * Uses .hero-scroll-indicator CSS for the hide-on-scroll.
           *
           * Positioned at the true left edge of the viewport (left-4 on
           * mobile, left-6 sm, left-8 lg) at the bottom of the hero. */}
          <div
            className="hero-scroll-indicator absolute bottom-8 left-4 sm:left-6 lg:left-8 z-20 flex flex-col items-center gap-2 pointer-events-none select-none"
            aria-hidden="true"
          >
            {/* Vertical track */}
            <span className="block w-px h-10 bg-text-muted/30" />
            {/* Bouncing chevron at the bottom of the track */}
            <ChevronDown className="h-4 w-4 text-text-muted/60 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ── Google Review Peek Bar ──────────────────────────
       * Occupies the remaining 5.5svh of the viewport.
       * Visible at the bottom of the initial viewport as
       * above-the-fold social proof before any scroll.
       * Centered Google logo + rating + stars + 5.0. */}
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
          <span className="flex items-center gap-0.5 text-star">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
            ))}
          </span>
          <span className="text-[clamp(0.85rem,1.8vw,1rem)] font-medium text-text-muted">
            5.0
          </span>
        </a>
      </section>
    </>
  );
}
