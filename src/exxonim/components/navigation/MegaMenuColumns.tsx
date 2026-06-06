/**
 * MegaMenuColumns — Premium opaque dropdown content renderer.
 *
 * Supports two layout variants:
 *   - "split"   → 50/50 two-column grid, both sides contain link items
 *   - "feature" → 60/40 grid (col-span-7 / col-span-5),
 *                 left side has items, right side has feature box
 *
 * DYNAMIC FEATURE BOX:
 * ────────────────────
 * When hoverFeatureMap is provided, the feature box content changes based
 * on which menu item is being hovered. A 150ms fade transition animates
 * between content states.
 *
 * THEME ADAPTATION:
 * ─────────────────
 * Light mode: White card, teal-tinted hover (accent-soft)
 * Dark mode: Dark teal card (#0d2226), subtle teal hover (accent-soft)
 *
 * HOVER DESIGN:
 * ─────────────
 * - Items use rounded-lg (8px) for slight curve, minimal
 * - Light & Dark: bg-accent-soft (brand-aligned teal tint)
 *
 * ITEM ICONS:
 * ───────────
 * Services items: WITH icons (building, receipt, passport, etc.)
 * Resources items: NO icons (clean, minimal — just text + description)
 *
 * BACKEND / ADMIN INTEGRATION NOTES:
 * ──────────────────────────────────
 * Menu content comes from staticNavigation.ts (or future API).
 * Each MenuItem can have optional `description` and `icon`.
 * The FeatureBox is configurable, and hoverFeatureMap enables
 * dynamic content based on item hover.
 */

import { useCallback, useRef, useState } from "react";
import type { FeatureBox, HoverFeatureMap, MegaMenuLayout, MenuColumn, MenuFooterCta, NavIcon } from "./types";
import { Button } from "@/exxonim/components/primitives/Button";

/* ── Unified Icon Renderer ── */

function NavIconSvg({ icon, className = "w-5 h-5" }: { icon: NavIcon; className?: string }) {
  switch (icon) {
    case "newspaper":
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
        </svg>
      );
    case "briefcase":
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
      );
    case "chat":
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
        </svg>
      );
    case "compass":
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A8.966 8.966 0 0 1 3 12c0-1.264.26-2.467.732-3.559" />
        </svg>
      );
    case "help-circle":
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
        </svg>
      );
    case "headset":
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-5.369-8.458a6.75 6.75 0 0 1 3.18 5.708m-13.5 0a6.75 6.75 0 0 1 3.18-5.708M12 21.75a1.5 1.5 0 0 0 1.5-1.5v-1.5a1.5 1.5 0 0 0-3 0V20.25a1.5 1.5 0 0 0 1.5 1.5Z" />
        </svg>
      );
    case "mail":
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
        </svg>
      );
    case "building":
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
        </svg>
      );
    case "receipt":
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185ZM9.75 9h.008v.008H9.75V9Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm4.125 4.5h.008v.008h-.008V13.5Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
      );
    case "passport":
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
        </svg>
      );
    case "clipboard-list":
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15a2.25 2.25 0 0 1 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
        </svg>
      );
    case "refresh":
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182" />
        </svg>
      );
    case "lightbulb":
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
        </svg>
      );
    case "shield-check":
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
        </svg>
      );
    default:
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
        </svg>
      );
  }
}

/* ── Single Menu Item Link ──
 *
 * DESIGN NOTES:
 * - Hover: bg-accent-soft (brand-aligned teal tint in both light & dark)
 * - Rounded-lg (8px) for slight curve, minimal
 * - Items with icon: show icon left of text (Services)
 * - Items without icon: text-only (Resources)
 * - Icon shifts to accent color on hover
 */
function MegaMenuItem({
  item,
  onNavigate,
  onItemHover,
}: {
  item: { label: string; href: string; description?: string; icon?: NavIcon };
  onNavigate: () => void;
  onItemHover?: (href: string) => void;
}) {
  return (
    <a
      href={item.href}
      onClick={onNavigate}
      onMouseEnter={onItemHover ? () => onItemHover(item.href) : undefined}
      className="group/item flex items-start gap-3 px-3 py-2 rounded-lg
                 hover:bg-accent-soft
                 transition-colors duration-150"
    >
      {/* Icon — only shown if item has one (Services items) */}
      {item.icon ? (
        <div className="shrink-0 mt-0.5 text-text-soft
                        group-hover/item:text-accent
                        transition-colors duration-150">
          <NavIconSvg icon={item.icon} className="w-5 h-5" />
        </div>
      ) : null}

      {/* Text */}
      <div className="min-w-0">
        <p className="text-sm font-medium text-text transition-colors">
          {item.label}
        </p>
        {item.description ? (
          <p className="text-xs text-text-muted mt-0.5
                       group-hover/item:text-text-soft
                       transition-colors">
            {item.description}
          </p>
        ) : null}
      </div>
    </a>
  );
}

/* ── Column Section (header + items) ── */
function MegaMenuColumn({
  column,
  onNavigate,
  showBorder,
  onItemHover,
}: {
  column: MenuColumn;
  onNavigate: () => void;
  showBorder?: boolean;
  onItemHover?: (href: string) => void;
}) {
  return (
    <div className={`flex flex-col ${showBorder ? "pr-5 border-r border-border-soft" : "pl-2"}`}>
      <div className="px-3 pb-2">
        <span className="text-[11px] font-bold tracking-wider uppercase text-text-soft">
          {column.title}
        </span>
      </div>
      <div className="flex flex-col gap-0.5">
        {column.items.map((item, i) => (
          <MegaMenuItem
            key={`${column.title}-${item.href}-${i}`}
            item={item}
            onNavigate={onNavigate}
            onItemHover={onItemHover}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Feature Box (right side of "feature" layout) ──
 *
 * Shows dynamic content based on which item is hovered.
 * Uses warm beige background (#ebe9e1) — CONSISTENT in both
 * light and dark modes (does not change with theme).
 * Content fades in/out with smooth transition.
 */
function MegaMenuFeatureBox({
  featureBox,
  onNavigate,
}: {
  featureBox: FeatureBox;
  onNavigate: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center
                    bg-accent-soft rounded-xl p-5 relative overflow-hidden
                    h-full">
      <div className="flex flex-col items-center text-center gap-2.5">
        <div className="text-accent">
          <NavIconSvg icon={featureBox.icon} className="w-7 h-7 opacity-80" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-text mb-1">
            {featureBox.title}
          </h4>
          <p className="text-xs text-text-muted leading-relaxed max-w-[170px]">
            {featureBox.description}
          </p>
        </div>
        <a
          href={featureBox.ctaHref}
          onClick={onNavigate}
          className="mt-1 inline-flex items-center gap-1.5 px-4 py-2 rounded-full
                     bg-accent text-accent-contrast text-xs font-bold
                     hover:bg-accent-hover transition-colors duration-150"
        >
          {featureBox.ctaLabel}
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════════════════ */
interface MegaMenuColumnsProps {
  columns: MenuColumn[];
  layout: MegaMenuLayout;
  featureBox?: FeatureBox;
  /** Map from item href to FeatureBox content for dynamic feature box on hover. */
  hoverFeatureMap?: HoverFeatureMap;
  /** Footer CTA row rendered below the feature box (feature layout only). */
  footerCta?: MenuFooterCta;
  onNavigate: () => void;
}

export function MegaMenuColumns({ columns, layout, featureBox, hoverFeatureMap, footerCta, onNavigate }: MegaMenuColumnsProps) {
  /* ── Dynamic feature box state ── */
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const [featureOpacity, setFeatureOpacity] = useState(1);
  const [activeFeature, setActiveFeature] = useState<FeatureBox | undefined>(featureBox);
  const fadeRef = useRef<ReturnType<typeof setTimeout>>();

  /* Resolve the current feature box content based on hover */
  const currentFeature = activeFeature || featureBox;

  /* Handle item hover — fades feature box content in/out */
  const handleItemHover = useCallback((href: string) => {
    if (!hoverFeatureMap || !featureBox) return;

    // Already showing this item's content
    if (hoveredHref === href) return;

    // Clear any pending fade
    if (fadeRef.current) clearTimeout(fadeRef.current);

    // Fade out
    setFeatureOpacity(0);

    // After 150ms, swap content and fade in
    fadeRef.current = setTimeout(() => {
      const newFeature = hoverFeatureMap[href] || featureBox;
      setActiveFeature(newFeature);
      setHoveredHref(href);
      setFeatureOpacity(1);
    }, 150);
  }, [hoverFeatureMap, featureBox, hoveredHref]);

  /* ── SPLIT LAYOUT (50/50) ── */
  if (layout === "split") {
    return (
      <div className="grid grid-cols-2 gap-5 text-left">
        {columns.map((column, index) => (
          <MegaMenuColumn
            key={`${column.title}-${index}`}
            column={column}
            onNavigate={onNavigate}
            showBorder={index === 0 && columns.length > 1}
          />
        ))}
      </div>
    );
  }

  /* ── FEATURE LAYOUT (60/40) ── */
  return (
    <div className="grid grid-cols-12 gap-5 text-left">
      {/* Left side: link columns */}
      <div className="col-span-7 flex flex-col gap-1 pr-4 border-r border-border-soft">
        {columns.map((column, index) => (
          <div key={`${column.title}-${index}`} className={index > 0 ? "mt-2" : ""}>
            <div className="px-3 pb-2">
              <span className="text-[11px] font-bold tracking-wider uppercase text-text-soft">
                {column.title}
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              {column.items.map((item, i) => (
                <MegaMenuItem
                  key={`${column.title}-${item.href}-${i}`}
                  item={item}
                  onNavigate={onNavigate}
                  onItemHover={handleItemHover}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Right side: feature box with fade transition + footer CTA below */}
      <div className="col-span-5 flex flex-col">
        {currentFeature ? (
          <div style={{ opacity: featureOpacity, transition: "opacity 150ms ease-in-out" }}>
            <MegaMenuFeatureBox
              featureBox={currentFeature}
              onNavigate={onNavigate}
            />
          </div>
        ) : null}
        {footerCta ? (
          <div className="flex justify-end mt-auto">
            <Button
              size="compact"
              variant="primary"
              href={footerCta.primaryHref}
              onClick={onNavigate}
            >
              {footerCta.primaryLabel}
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
