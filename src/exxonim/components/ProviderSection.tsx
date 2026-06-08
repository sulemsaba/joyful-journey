import type { ProviderSectionContent } from '@/exxonim/types'
import { resolveApiBaseUrl } from '@/exxonim/shared/api/baseUrl'

interface ProviderSectionProps {
  content: ProviderSectionContent;
}

export function ProviderSection({ content }: ProviderSectionProps) {
  const apiOrigin = (() => {
    try {
      const apiUrl = (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_API_URL) || undefined;
      return new URL(resolveApiBaseUrl(apiUrl)).origin;
    } catch {
      return "";
    }
  })();

  const resolveLogoSrc = (src: string) => {
    const trimmed = src?.trim?.() ? src.trim() : "";
    if (!trimmed) return "/placeholder.svg";
    if (/^(https?:)?\/\//i.test(trimmed)) return trimmed;
    if (/^(data|blob):/i.test(trimmed)) return trimmed;
    if (
      trimmed.startsWith("/assets/") ||
      trimmed.startsWith("/src/") ||
      trimmed.startsWith("/placeholder") ||
      trimmed.startsWith("/favicon")
    ) {
      return trimmed;
    }
    if (!apiOrigin) return trimmed;
    if (
      trimmed.startsWith("/media/") ||
      trimmed.startsWith("/storage/") ||
      trimmed.startsWith("/uploads/") ||
      trimmed.startsWith("/static/")
    ) {
      return `${apiOrigin}${trimmed}`;
    }
    if (trimmed.startsWith("/")) return trimmed;
    return `${apiOrigin}/${trimmed}`;
  };

  // Repeat logos enough times for seamless infinite scroll.
  // We need at least enough copies so one set is wider than the viewport.
  // 10 logos × 4 = 40 items ensures coverage on all screen sizes.
  // Animation translates -50% so when the first half scrolls off,
  // the identical second half is in its place — no gap.
  const repeatCount = 4;
  const repeatedLogos = Array.from({ length: repeatCount }, () => content.logos).flat();

  return (
    <section
      aria-label="Trusted references"
      className="relative bg-page"
    >
      {/* ── Trust ribbon ────────────────────────────────
       *
       * Design rules:
       *
       * 1. INVISIBLE BOUNDING BOX
       *    Every logo sits inside an identical Flexbox-centered container.
       *    Guarantees mathematically identical gaps between every logo.
       *
       * 2. OPTICAL WEIGHT ADJUSTMENT
       *    Solid shapes constrained to smaller max-height so they don't
       *    overpower text-based logos.
       *
       * 3. STRICT LINEAR MOTION
       *    CSS animation timing is `linear`. Any easing would cause
       *    stutter when the loop restarts.
       *
       * 4. EDGE FADE (MASKING)
       *    15% gradient mask on each side — logos smoothly
       *    materialize and fade out.
       *
       * 5. INTERACTIVE PAUSING + COLOR REVEAL
       *    Animation pauses on hover. Logos are muted (brand color,
       *    low opacity) by default and reveal full color on hover.
       */}

      {/* Label — tiny, muted */}
      <p className="m-0 text-center text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-text-soft pt-5 pb-2">
        Trusted by
      </p>

      {/* Logo marquee — full-bleed with 15% edge fades */}
      <div
        className="full-bleed overflow-hidden relative pb-5 bg-page [-webkit-mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]"
        aria-label="Partner logos"
      >
        <div className="provider-marquee-track flex items-center w-max will-change-transform animate-provider-marquee hover:[animation-play-state:paused]">
          {repeatedLogos.map((logo, index) => {
            const isSolid = logo.opticalWeight === "solid";

            return (
              <div
                key={`${logo.alt}-${index}`}
                className="provider-logo-item group flex items-center justify-center flex-none w-20 sm:w-28 md:w-40 h-12 sm:h-14 md:h-16"
                aria-label={logo.alt}
                role="img"
              >
                <img
                  className={cn(
                    "block w-auto object-contain transition-all duration-300",
                    // Muted brand color by default, full color on hover
                    "provider-logo-img",
                    isSolid ? "max-h-8 sm:max-h-10 md:max-h-12" : "max-h-10 sm:max-h-14 md:max-h-16"
                  )}
                  src={resolveLogoSrc(logo.src)}
                  alt={`${logo.alt} logo`}
                  width="176"
                  height="64"
                  loading={index < content.logos.length ? 'eager' : 'lazy'}
                  decoding="async"
                  onError={(event) => {
                    const img = event.currentTarget;
                    if (img.dataset.fallbackApplied) return;
                    img.dataset.fallbackApplied = "true";
                    img.src = "/placeholder.svg";
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Simple classnames join — avoids importing cn for this single use. */
function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
