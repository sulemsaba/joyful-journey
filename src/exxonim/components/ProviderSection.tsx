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

  // Repeat logos 3× for seamless infinite scroll
  const repeatedLogos = Array.from({ length: 3 }, () => content.logos).flat();

  return (
    <section
      aria-label="Trusted references"
      className="relative bg-page"
    >
      {/* ── Trust ribbon ────────────────────────────────
       *
       * 5 strict design rules:
       *
       * 1. INVISIBLE BOUNDING BOX
       *    Every logo sits inside an identical w-44 h-16 Flexbox-centered
       *    container. This guarantees mathematically identical gaps between
       *    every logo regardless of the logo's actual shape.
       *
       * 2. OPTICAL WEIGHT ADJUSTMENT
       *    Solid geometric shapes (squares, circles) carry more visual weight
       *    than thin wordmarks. They are constrained to max-h-12 inside the
       *    bounding box so they don't overpower text-based logos (max-h-16).
       *
       * 3. STRICT LINEAR MOTION
       *    The CSS animation timing function is strictly `linear`. Any easing
       *    would cause the strip to stutter/snap when the loop restarts.
       *
       * 4. EDGE FADE (MASKING)
       *    15% gradient mask on each side — logos never hit a hard wall.
       *    They smoothly materialize into view and gracefully fade out.
       *
       * 5. INTERACTIVE PAUSING
       *    Animation pauses on hover so users can read logos they recognize.
       */}

      {/* Label — tiny, muted */}
      <p className="m-0 text-center text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-text-soft pt-5 pb-2">
        Trusted by
      </p>

      {/* Logo marquee — full-bleed with 15% edge fades */}
      <div
        className="overflow-hidden relative w-screen -ml-[50vw] left-1/2 pb-5 bg-page [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]"
        aria-label="Partner logos"
      >
        <div className="flex items-center w-max animate-provider-marquee hover:[animation-play-state:paused]">
          {repeatedLogos.map((logo, index) => {
            const isSolid = logo.opticalWeight === "solid";

            return (
              <div
                key={`${logo.alt}-${index}`}
                className="flex items-center justify-center flex-none w-20 sm:w-28 md:w-40 h-12 sm:h-14 md:h-16"
                aria-label={logo.alt}
                role="img"
              >
                <img
                  className={cn(
                    "block w-auto object-contain",
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
