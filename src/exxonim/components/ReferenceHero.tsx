
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
          "-mt-[60px] xl:-mt-[68px] pt-[60px] xl:pt-[68px]",
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
                {content.eyebrow}
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

              {/* ── Trust signal row ──────────────────────────
               * Compact social proof below CTAs: Google rating + key
               * promise. World-class hero pattern (cf. Stripe, Notion). */}
              <div className="mt-8 md:mt-10 flex items-center gap-4 md:gap-6 flex-wrap">
                <a
                  href="https://www.google.com/search?q=Exxonim+Consult+reviews"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 no-underline text-text-muted hover:text-text transition-colors"
                >
                  <span className="flex items-center gap-0.5 text-star">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                    ))}
                  </span>
                  <span className="text-xs sm:text-sm font-medium">5.0 Google Rating</span>
                </a>
                <span className="hidden sm:block w-px h-4 bg-border-soft" aria-hidden="true" />
                <span className="text-xs sm:text-sm text-text-muted">
                  TIN, VAT, BRELA &amp; Business Licences — handled.
                </span>
              </div>

              {/* Highlight chips - temporarily hidden during design iteration */}
            </div>
          </div>

          {/* ── Scroll-down indicator ─────────────────────────
           * Bouncing chevron anchored at the bottom-LEFT of the hero content
           * (matches the left-anchored layout). Fades out when the user
           * scrolls (hero-shrunk state).
           * Uses .hero-scroll-indicator CSS for the hide-on-scroll.
           */}
          <div
            className="hero-scroll-indicator absolute bottom-6 left-6 sm:left-8 lg:left-12 z-20 flex flex-col items-center gap-1 pointer-events-none select-none"
            aria-hidden="true"
          >
            <ChevronDown className="h-5 w-5 text-text-muted/60 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ── Hero footer bar ─────────────────────────────────
       * Slim divider strip below the hero. Originally held the Google
       * rating; that now lives inside the hero trust row (above), so this
       * bar is a compact "marquee" of key promises — visible above the
       * fold as a closing signal before the next section. */}
      <section
        aria-label="Why Exxonim"
        className="hero-review-bar flex items-center justify-center bg-page px-6"
      >
        <div className="flex items-center gap-4 md:gap-8 text-text-muted text-xs sm:text-sm flex-wrap justify-center">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-success" aria-hidden="true" />
            <span className="font-medium">5–10 day turnaround</span>
          </span>
          <span className="hidden sm:block w-px h-3 bg-border-soft" aria-hidden="true" />
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
            <span className="font-medium">SMS, WhatsApp &amp; email updates</span>
          </span>
          <span className="hidden md:block w-px h-3 bg-border-soft" aria-hidden="true" />
          <span className="hidden md:flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-star" aria-hidden="true" />
            <span className="font-medium">Real-time case tracking</span>
          </span>
        </div>
      </section>
    </>
  );
}
