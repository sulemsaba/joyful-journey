/**
 * FASTAPI BACKEND ENDPOINTS USED BY THIS COMPONENT:
 * ──────────────────────────────────────────────────
 * Client Logos / Navigation (via page content → ProviderSectionContent):
 *   Logos are currently embedded in the page content (via the homepage page record),
 *   not fetched from a dedicated API endpoint. Logo image URLs may reference:
 *     - Static assets: /clients/*.webp (served from public/)
 *     - CDN/Backend paths: /media/*, /storage/*, /uploads/* (resolved via API origin)
 *
 * Related endpoints that populate this data:
 *   GET    /api/v1/pages/home                 - Homepage content including provider_section.logos
 *   GET    /api/v1/navigation                 - Navigation items (currently static, future API)
 *   GET    /api/v1/site-settings/brand        - Brand assets (logos, company name)
 *
 * PostgreSQL Tables:
 *   pages - id, slug, content (JSONB containing provider_section.logos[])
 *   navigation_items - id, title, url, kind, sort_order, is_active
 *   site_settings - id, key, value (JSONB)
 *
 * Future: A dedicated /api/v1/client-logos endpoint could be added to manage
 * partner/client logos independently from page content, with admin CRUD.
 */

import type { ProviderSectionContent } from '@/exxonim/types'
import { resolveApiBaseUrl } from '@/exxonim/shared/api/baseUrl'

interface ProviderSectionProps {
  content: ProviderSectionContent;
}

/* ── API origin: computed once at module level, not per render ── */
const ORIGIN_API = (() => {
  try {
    const apiUrl = (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_API_URL) || undefined;
    return new URL(resolveApiBaseUrl(apiUrl)).origin;
  } catch {
    return "";
  }
})();

function resolveLogoSrc(src: string): string {
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
  if (!ORIGIN_API) return trimmed;
  if (
    trimmed.startsWith("/media/") ||
    trimmed.startsWith("/storage/") ||
    trimmed.startsWith("/uploads/") ||
    trimmed.startsWith("/static/")
  ) {
    return `${ORIGIN_API}${trimmed}`;
  }
  if (trimmed.startsWith("/")) return trimmed;
  return `${ORIGIN_API}/${trimmed}`;
}

export function ProviderSection({ content }: ProviderSectionProps) {
  // Repeat logos for seamless infinite scroll.
  // 10 logos × 3 = 30 items — guarantees the first half (15 items)
  // exceeds any viewport width so translateX(-50%) never shows a gap,
  // even on ultrawide monitors.
  const repeatCount = 3;
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
       *    15% gradient mask on each side - logos smoothly
       *    materialize and fade out.
       *
       * 5. INTERACTIVE PAUSING + COLOR REVEAL
       *    Animation pauses on hover. Logos are muted (brand color,
       *    low opacity) by default and reveal full color on hover.
       */}

      {/* Label - tiny, muted */}
      <p className="m-0 text-center text-xs font-extrabold uppercase tracking-[0.14em] text-accent pt-6 pb-2 md:pt-10 md:pb-3">
        Trusted by 120+
      </p>

      {/* Logo marquee - full-bleed with 12% edge fades.
       *
       * SPACING STRATEGY (padding-based, not gap-based):
       * Each logo container uses `px-*` (horizontal padding) instead of a
       * fixed width. This ensures consistent visual spacing around every
       * logo regardless of its aspect ratio. A small logo doesn't leave
       * dead space in a wide fixed-width box — it shrink-wraps naturally.
       *
       * The `gap-*` on the track is removed because the padding on each
       * container already provides the inter-logo spacing. Together, the
       * right-padding of logo A + left-padding of logo B = the gap.
       *
       * Reference: Linear, Vercel, Figma, and Intercom all use padding-
       * based spacing for their logo trust bars for this exact reason. */}
      <div
        className="full-bleed overflow-hidden relative pb-6 md:pb-8 bg-page"
        aria-label="Partner logos"
      >
        <div className="provider-marquee-track flex items-center w-max animate-provider-marquee hover:[animation-play-state:paused]">
          {repeatedLogos.map((logo, index) => {
            return (
              <div
                key={`${logo.alt}-${index}`}
                className={cn(
                  "provider-logo-item group flex items-center justify-center flex-none",
                  logo.opticalWeight === "solid"
                    ? "h-8 sm:h-10 md:h-12 px-3 md:px-5"
                    : "h-10 sm:h-12 md:h-16 px-4 md:px-6"
                )}
                aria-label={logo.alt}
                role="img"
              >
                <img
                  className={cn(
                    "block w-auto max-h-full object-contain transition-opacity duration-300",
                    // Muted by default, full color on hover
                    "provider-logo-img"
                  )}
                  src={resolveLogoSrc(logo.src)}
                  alt={`${logo.alt} logo`}
                  width="176"
                  height="64"
                  loading="lazy"
                  fetchPriority="low"
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

        {/* Edge fades as overlays instead of mask-image. A mask over the moving
            track de-composites it (main-thread re-raster each frame → stutter);
            gradient overlays keep the track on its own GPU layer. from-page
            matches the section background in both themes. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-[12%] bg-gradient-to-r from-page to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-[12%] bg-gradient-to-l from-page to-transparent"
        />
      </div>
    </section>
  );
}

/** Simple classnames join - avoids importing cn for this single use. */
function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
