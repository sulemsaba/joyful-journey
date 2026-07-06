/**
 * Desktop navigation - rendered as a centered pill inside the header.
 *
 * LAYOUT ORDER (explicit, not API-driven):
 *   [Home] [About] [Services ▼] [Resources ▼] [Career] [Contact] [● Track Consultation]
 *
 * MEGA MENU DROPDOWN:
 * ────────────────────
 * Both Services and Resources dropdowns use a premium opaque mega menu
 * design with React-state-controlled visibility:
 *
 *   1. The parent <nav> is `relative` - dropdowns are positioned
 *      relative to it, centered with `left-1/2 -translate-x-1/2`
 *   2. A `pt-3` (12px) invisible bridge keeps the mouse within the
 *      nav's descendant tree while traveling to the dropdown
 *   3. Dropdown visibility is controlled by React state (`desktopMenu`),
 *      NOT CSS group-hover:
 *      - desktopMenu matches → visible, opacity-100, scale-100
 *      - desktopMenu doesn't match → invisible, opacity-0, scale-95
 *   4. `onMouseLeave` on <nav> closes all menus when mouse leaves
 *      the entire nav area (including dropdowns)
 *
 * CENTERING:
 * ──────────
 * Dropdowns are centered on the navigation bar, not on individual
 * trigger items. Both dropdowns have the same width and min-height
 * for visual consistency.
 *
 * CLICK-NOT-CLOSING BUG FIX:
 * ──────────────────────────
 * Clicking an item → closeAllMenus() → desktopMenu = null → dropdown hides.
 * Since visibility is React-state-controlled (not CSS :hover), clicking
 * a nav item immediately closes the dropdown.
 *
 * THEME ADAPTATION:
 *   Light mode → White card, teal-tinted hover
 *   Dark mode → Dark teal card (#0d2226), subtle teal hover
 *
 * BACKEND / ADMIN INTEGRATION NOTES:
 * ──────────────────────────────────
 * Nav structure is defined in staticNavigation.ts. To change the items,
 * order, or labels, edit that file - NOT this component.
 */

import { useEffect, useRef, useState, type FocusEvent } from "react";
import { SmartLink } from "@/exxonim/components/primitives/SmartLink";
import { ChevronDown } from "lucide-react";
import { MegaMenuColumns } from "@/exxonim/components/navigation/MegaMenuColumns";
import { Button } from "@/exxonim/components/primitives/Button";
import type { FeatureBox, HoverFeatureMap, MegaMenuLayout, MenuColumn, MenuFooterCta, MenuKey, MenuItem } from "@/exxonim/components/navigation/types";
import { routes } from "@/exxonim/routes";
import { normalizePathname } from "@/exxonim/routes";
import { cn } from "@/exxonim/utils/cn";
import { preloadRoute } from "@/exxonim/preloadRoutes";

interface DesktopNavigationProps {
  brandName: string;
  leftLinks: MenuItem[];
  rightLinks: MenuItem[];
  highlightLink: MenuItem;
  desktopMenu: MenuKey | null;
  resourcesActive: boolean;
  resourcesColumns: MenuColumn[];
  resourcesLayout: MegaMenuLayout;
  resourcesFeatureBox?: FeatureBox;
  resourcesHoverFeatureMap?: HoverFeatureMap;
  resourcesFooterCta?: MenuFooterCta;
  resourcesMenuId: string;
  servicesActive: boolean;
  servicesColumns: MenuColumn[];
  servicesLayout: MegaMenuLayout;
  servicesFeatureBox?: FeatureBox;
  servicesMenuId: string;
  closeAllMenus: () => void;
  isActive: (href: string) => boolean;
  onDropdownBlur: (event: FocusEvent<HTMLDivElement>) => void;
  setDesktopMenu: (menu: MenuKey | null) => void;
}

const navLinkBase =
  "relative inline-flex items-center justify-center h-9 px-3.5 text-[0.8rem] font-medium tracking-wide text-text rounded-full transition-colors hover:bg-accent-soft";
const navLinkActive = "bg-accent-soft text-accent";

/** Shared dropdown card classes - both menus have same width, radius, and min-height */
const dropdownCardBase =
  "relative overflow-visible w-[620px] rounded-2xl border p-5 min-h-[250px] " +
  "bg-surface border-border-soft";

export function DesktopNavigation({
  brandName,
  leftLinks,
  rightLinks,
  highlightLink,
  desktopMenu,
  resourcesActive,
  resourcesColumns,
  resourcesLayout,
  resourcesFeatureBox,
  resourcesHoverFeatureMap,
  resourcesFooterCta,
  resourcesMenuId,
  servicesActive,
  servicesColumns,
  servicesLayout,
  servicesFeatureBox,
  servicesMenuId,
  closeAllMenus,
  isActive,
  onDropdownBlur,
  setDesktopMenu,
}: DesktopNavigationProps) {
  /* ── Triangle connector positioning ──
   *
   * Calculates the horizontal offset from the dropdown center to the
   * active trigger's center, so the caret points at the right nav link. */
  const navRef = useRef<HTMLElement>(null);
  const servicesTriggerRef = useRef<HTMLDivElement>(null);
  const resourcesTriggerRef = useRef<HTMLDivElement>(null);
  const [triangleOffset, setTriangleOffset] = useState(0);

  useEffect(() => {
    if (!desktopMenu || !navRef.current) return;
    const nav = navRef.current;
    const triggerEl = desktopMenu === "services" ? servicesTriggerRef.current : resourcesTriggerRef.current;
    if (!triggerEl) return;
    const navCenter = nav.offsetWidth / 2;
    const triggerCenter = triggerEl.offsetLeft + triggerEl.offsetWidth / 2;
    setTriangleOffset(triggerCenter - navCenter);
  }, [desktopMenu]);

  return (
    <div className="hidden md:flex items-center">
      <nav
        ref={navRef}
        className="relative inline-flex items-center gap-1 p-1.5 rounded-full border border-border-soft overflow-visible"
        aria-label="Primary navigation"
        onMouseLeave={() => setDesktopMenu(null)}
        onBlur={onDropdownBlur}
      >
        {/* Left links (Home, About) */}
        {leftLinks.map((link) => (
          <SmartLink
            key={link.href}
            href={link.href}
            aria-current={isActive(link.href) ? "page" : undefined}
            onClick={closeAllMenus}
            className={cn(navLinkBase, isActive(link.href) && navLinkActive)}
          >
            {link.label}
          </SmartLink>
        ))}

        {/* ═══════════════════════════════════════════════════════
         * SERVICES TRIGGER
         * ═══════════════════════════════════════════════════════
         * Only the trigger lives here - the dropdown panel is
         * rendered as a direct child of <nav> for centering. */}
        <div
          ref={servicesTriggerRef}
          onMouseEnter={() => {
            setDesktopMenu("services");
            preloadRoute(normalizePathname(routes.services));
          }}
          onFocusCapture={() => setDesktopMenu("services")}
        >
          <SmartLink
            href={routes.services}
            aria-expanded={desktopMenu === "services"}
            aria-controls={servicesMenuId}
            aria-current={servicesActive ? "page" : undefined}
            onClick={closeAllMenus}
            className={cn(navLinkBase, servicesActive && navLinkActive)}
          >
            Services
            <ChevronDown
              className={cn(
                "ml-1 w-3.5 h-3.5 transition-transform duration-200",
                desktopMenu === "services" && "rotate-180"
              )}
              aria-hidden="true"
            />
          </SmartLink>
        </div>

        {/* ═══════════════════════════════════════════════════════
         * RESOURCES TRIGGER
         * ═══════════════════════════════════════════════════════ */}
        <div
          ref={resourcesTriggerRef}
          onMouseEnter={() => {
            setDesktopMenu("resources");
            preloadRoute(normalizePathname(routes.resources));
          }}
          onFocusCapture={() => setDesktopMenu("resources")}
        >
          <SmartLink
            href={routes.resources}
            aria-expanded={desktopMenu === "resources"}
            aria-controls={resourcesMenuId}
            aria-current={resourcesActive ? "page" : undefined}
            onClick={closeAllMenus}
            className={cn(navLinkBase, resourcesActive && navLinkActive)}
          >
            Resources
            <ChevronDown
              className={cn(
                "ml-1 w-3.5 h-3.5 transition-transform duration-200",
                desktopMenu === "resources" && "rotate-180"
              )}
              aria-hidden="true"
            />
          </SmartLink>
        </div>

        {/* Right links (Career, Contact) */}
        {rightLinks.map((link) => (
          <SmartLink
            key={link.href}
            href={link.href}
            aria-current={isActive(link.href) ? "page" : undefined}
            onClick={closeAllMenus}
            className={cn(navLinkBase, isActive(link.href) && navLinkActive)}
          >
            {link.label}
          </SmartLink>
        ))}

        {/* Highlight link - Track Consultation (differentiator) */}
        <Button
          size="compact"
          variant="primary"
          href={highlightLink.href}
          onClick={closeAllMenus}
          onMouseEnter={() => preloadRoute(normalizePathname(highlightLink.href))}
          aria-current={isActive(highlightLink.href) ? "page" : undefined}
          className={cn(
            "gap-2",
            isActive(highlightLink.href) && "bg-accent-hover ring-2 ring-accent/30"
          )}
        >
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-contrast opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-contrast" />
          </span>
          {highlightLink.label}
        </Button>

        {/* ═══════════════════════════════════════════════════════
         * DROPDOWN PANELS - centered on <nav>
         * ═══════════════════════════════════════════════════════
         * Both panels are direct children of <nav>, positioned
         * absolutely with `left-1/2 -translate-x-1/2` to center
         * them on the navigation bar.
         *
         * `pt-3` creates the hover bridge - when the mouse moves
         * from a trigger down to the dropdown, it stays within the
         * nav's descendant tree, so onMouseLeave on <nav> doesn't
         * fire.
         *
         * `pointer-events-none` when hidden prevents ghost clicks. */}

        {/* Services dropdown */}
        <div
          id={servicesMenuId}
          aria-hidden={desktopMenu !== "services"}
          className={cn(
            "absolute top-full left-1/2 -translate-x-1/2 pt-3 origin-top transition-opacity duration-200 z-50",
            desktopMenu === "services"
              ? "visible opacity-100 scale-100 pointer-events-auto"
              : "invisible opacity-0 scale-95 pointer-events-none"
          )}
        >
          <div className={dropdownCardBase}>
            {/* Triangle connector - points up toward the Services nav link */}
            <div
              className="absolute -top-[11px] left-1/2 pointer-events-none -translate-x-1/2"
              style={{ marginLeft: `${triangleOffset}px` }}
            >
              <svg width="18" height="11" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 0L18 11H0L9 0Z" fill="var(--color-surface)" stroke="var(--color-border-strong)" strokeWidth="1.5" />
              </svg>
            </div>

            <MegaMenuColumns
              columns={servicesColumns}
              layout={servicesLayout}
              featureBox={servicesFeatureBox}
              onNavigate={closeAllMenus}
            />

            {/* Footer CTA row - text link left, button right edge */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-border-soft">
              <SmartLink
                href={routes.contact}
                onClick={closeAllMenus}
                className="text-xs font-medium text-text-muted hover:text-accent transition-colors"
              >
                Contact {brandName}
              </SmartLink>
              <Button
                size="compact"
                variant="primary"
                href={routes.services}
                onClick={closeAllMenus}
              >
                See All Services
              </Button>
            </div>
          </div>
        </div>

        {/* Resources dropdown */}
        <div
          id={resourcesMenuId}
          aria-hidden={desktopMenu !== "resources"}
          className={cn(
            "absolute top-full left-1/2 -translate-x-1/2 pt-3 origin-top transition-opacity duration-200 z-50",
            desktopMenu === "resources"
              ? "visible opacity-100 scale-100 pointer-events-auto"
              : "invisible opacity-0 scale-95 pointer-events-none"
          )}
        >
          <div className={dropdownCardBase}>
            {/* Triangle connector - points up toward the Resources nav link */}
            <div
              className="absolute -top-[11px] left-1/2 pointer-events-none -translate-x-1/2"
              style={{ marginLeft: `${triangleOffset}px` }}
            >
              <svg width="18" height="11" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 0L18 11H0L9 0Z" fill="var(--color-surface)" stroke="var(--color-border-strong)" strokeWidth="1.5" />
              </svg>
            </div>

            <MegaMenuColumns
              columns={resourcesColumns}
              layout={resourcesLayout}
              featureBox={resourcesFeatureBox}
              hoverFeatureMap={resourcesHoverFeatureMap}
              footerCta={resourcesFooterCta}
              onNavigate={closeAllMenus}
            />
          </div>
        </div>
      </nav>
    </div>
  );
}
