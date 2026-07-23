import { useEffect, useId, useRef, useState, type FocusEvent } from "react";
import { SmartLink } from "@/exxonim/components/primitives/SmartLink";
import { Phone } from "lucide-react";
import { DesktopNavigation } from "@/exxonim/components/navigation/DesktopNavigation";
import { MobileNavigationPanel } from "@/exxonim/components/navigation/MobileNavigationPanel";
import { ThemeToggle } from "@/exxonim/components/navigation/ThemeToggle";
import { staticNav } from "@/exxonim/content/staticNavigation";
import { fallbackBrand } from "@/exxonim/content/fallbackShell";
import type { MenuKey } from "@/exxonim/components/navigation/types";
import { useMobileMenuFocusTrap } from "@/exxonim/components/navigation/useMobileMenuFocusTrap";
import { normalizePathname, routes } from "@/exxonim/routes";
import type { BrandAssets, CompanyInfo, Theme } from '@/exxonim/types';
import { cn } from "@/exxonim/utils/cn";
import { useTheme } from "@/exxonim/hooks/useTheme";

/**
 * Navigation component - the fixed site header.
 *
 * ARCHITECTURE:
 * ─────────────
 * Navigation is STATIC. It imports its structure from staticNavigation.ts.
 *
 * MOBILE (< xl): Traditional full-width bar at all times.
 *   - Transparent when over hero (homepage, scroll top)
 *   - Solid bg + backdrop-blur when scrolled
 *   - Logo on the left, theme toggle + hamburger on the right
 *   - Expanded menu: full-width on phone, right-aligned card on tablet
 *
 * DESKTOP (xl+): Full-width bar with centered nav, Call CTA, theme toggle.
 */
interface NavigationProps {
  brand: BrandAssets;
  company: CompanyInfo;
  pathname: string;
  theme: Theme;
  onToggleTheme: () => void;
}

function getHrefPath(href: string) {
  return normalizePathname(href.split("#")[0]);
}

// Pages that live UNDER the Resources dropdown, so being on them highlights the
// Resources nav item. The /resources landing page and article slugs are handled
// separately in isResourcesPath(). NOTE: routes.privacy/cookies/dataRights were
// referenced here but DO NOT EXIST — normalizePathname(undefined) returned "/",
// which poisoned this set so isResourcesPath("/") was true and Resources showed
// as the active page on the HOME page. routes.terms is not in the Resources menu
// either, so it's dropped too.
const RESOURCE_CHILD_PATHS = new Set([
  normalizePathname(routes.faq),
  normalizePathname(routes.support),
]);

function isResourcesPath(path: string): boolean {
  if (path === normalizePathname(routes.resources)) return true;
  if (RESOURCE_CHILD_PATHS.has(path)) return true;
  const segments = path.split("/").filter(Boolean);
  if (segments.length === 2 && (segments[0] === "resources" || segments[0] === "blog")) {
    return true;
  }
  return false;
}

/* ── Morphing hamburger icon ──────────────────────────── */
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span className="nav-hamburger relative w-6 h-6 flex items-center justify-center">
      <span
        className={cn(
          "nav-hamburger-line absolute block w-[22px] h-[2px] rounded-full transition-transform duration-300 ease-[cubic-bezier(0.25,0.4,0.25,1)]",
          open ? "rotate-45" : "rotate-0"
        )}
      />
      <span
        className={cn(
          "nav-hamburger-line absolute block w-[22px] h-[2px] rounded-full transition-transform duration-300 ease-[cubic-bezier(0.25,0.4,0.25,1)]",
          open ? "-rotate-45" : "rotate-0 translate-y-[6px]"
        )}
      />
    </span>
  );
}

export function Navigation({
  brand,
  company,
  pathname,
  theme,
  onToggleTheme,
}: NavigationProps) {
  const brandName = company.name?.trim() || brand.name;
  const logoSrc = theme === 'dark' ? brand.darkLogoSrc : brand.lightLogoSrc;
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const servicesMenuId = useId();
  const resourcesMenuId = useId();
  const mobileMenuId = useId();

  const currentPath = normalizePathname(pathname);
  const [desktopMenu, setDesktopMenu] = useState<MenuKey | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHomePage = currentPath === normalizePathname(routes.home);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    const updateScrolledState = () => {
      frame = 0;
      const nextScrolled = window.scrollY > 10;
      setScrolled((previous) => (previous === nextScrolled ? previous : nextScrolled));
    };

    const handleScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(updateScrolledState);
    };

    updateScrolledState();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const headerOverHero = isHomePage && !scrolled;

  const primaryPhone = company.phones[0];
  const callHref = primaryPhone
    ? `tel:${primaryPhone.replace(/\s+/g, "")}`
    : routes.contact;

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", mobileMenuOpen);
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [mobileMenuOpen]);

  useMobileMenuFocusTrap(mobileMenuOpen, mobilePanelRef, mobileToggleRef);

  useEffect(() => {
    const handleViewportChange = () => {
      if (window.innerWidth >= 1280) {
        setMobileMenuOpen(false);
      }
      setDesktopMenu(null);
    };

    window.addEventListener("resize", handleViewportChange);
    window.addEventListener("orientationchange", handleViewportChange);

    return () => {
      window.removeEventListener("resize", handleViewportChange);
      window.removeEventListener("orientationchange", handleViewportChange);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDesktopMenu(null);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    setDesktopMenu(null);
    setMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => getHrefPath(href) === currentPath;
  const closeAllMenus = () => {
    setDesktopMenu(null);
    setMobileMenuOpen(false);
  };
  const handleDropdownBlur = (event: FocusEvent<HTMLDivElement>) => {
    const nextTarget = event.relatedTarget;
    if (nextTarget instanceof Node && event.currentTarget.contains(nextTarget)) {
      return;
    }
    setDesktopMenu(null);
  };

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
       * MOBILE: Traditional full-width bar (< xl)
       * ───────────────────────────────────────────────────────
       * Transparent when over hero (homepage, scroll top),
       * solid bg + blur when scrolled - same as desktop.
       * Logo left, theme toggle + hamburger right.
       * Menu expands below the bar naturally.
       * Click outside closes the menu. */}
      <header
        data-over-hero={headerOverHero ? "" : undefined}
        className={cn(
          "xl:hidden fixed z-50 top-0 inset-x-0 h-[60px]",
          "border-b transition-[background-color,border-color] duration-300",
          headerOverHero
            ? "bg-transparent border-transparent"
            : "bg-page/95 border-border-soft"
        )}
      >
        <div className="h-full px-4 flex items-center justify-between">
          {/* Logo - matches footer size: h-10 sm:h-11 */}
          <SmartLink
            href={routes.home}
            onClick={closeAllMenus}
            aria-label={`${brand.name} home`}
            className="relative flex items-center min-w-0"
          >
            <img
              src={logoSrc}
              alt={brand.name}
              width="160"
              height="44"
              loading="eager"
              onError={(event) => {
                const img = event.currentTarget;
                if (img.dataset.fallbackApplied) return;
                img.dataset.fallbackApplied = "true";
                img.src = fallbackBrand.darkLogoSrc;
              }}
              className="block h-10 sm:h-11 w-auto"
            />
          </SmartLink>

          {/* Right: Theme toggle + Hamburger */}
          <div className="flex items-center gap-0.5">
            <ThemeToggle theme={theme} onToggleTheme={onToggleTheme} compact />
            <button
              ref={mobileToggleRef}
              type="button"
              aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={mobileMenuOpen}
              aria-controls={mobileMenuId}
              onClick={() => {
                setDesktopMenu(null);
                setMobileMenuOpen((open) => !open);
              }}
              className={cn(
                "flex items-center justify-center w-11 h-11",
                "rounded-full transition-colors duration-200",
                "hover:bg-accent-soft/40",
                "text-text"
              )}
            >
              <HamburgerIcon open={mobileMenuOpen} />
            </button>
          </div>
        </div>

        {/* ── Expandable menu (dropdown from bar) ── */}
        <MobileNavigationPanel
          brandName={brandName}
          callHref={callHref}
          currentPath={currentPath}
          regularLinks={[...staticNav.leftLinks, ...staticNav.rightLinks]}
          highlightLink={staticNav.highlightLink}
          id={mobileMenuId}
          isOpen={mobileMenuOpen}
          resourcesActive={isResourcesPath(currentPath)}
          servicesActive={currentPath === normalizePathname(routes.services)}
          resourcesColumns={staticNav.resourcesColumns}
          servicesColumns={staticNav.servicesColumns}
          panelRef={mobilePanelRef}
          primaryPhone={primaryPhone}
          isActive={isActive}
          onClose={() => setMobileMenuOpen(false)}
        />
      </header>

      {/* ── Click-outside backdrop (outside header to avoid
           backdrop-filter creating a new containing block) ──
           Always mounted so it can cross-fade with the panel instead of
           popping in — the instant dim was a big part of the "abrupt open"
           feel. pointer-events-none while closed prevents ghost clicks. */}
      <div
        className={cn(
          "xl:hidden fixed inset-0 top-[60px] z-40 bg-black/20 md:bg-black/10",
          "transition-opacity duration-[400ms] motion-reduce:transition-none",
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* ═══════════════════════════════════════════════════════
       * DESKTOP: Full-width bar (xl+)
       * ───────────────────────────────────────────────────────
       * Standard header bar with centered nav, Call CTA,
       * theme toggle. */}
      <header
        data-over-hero={headerOverHero ? "" : undefined}
        className={cn(
          // Transition ONLY background-color. Animating backdrop-filter (and even
          // a static backdrop-blur) forces a full-width blur repaint on every
          // scroll frame — the main cause of scroll jank on the home page. A
          // near-opaque solid background reads the same and stays smooth.
          "hidden xl:block fixed top-0 inset-x-0 z-50 h-[68px] [--header-height:68px] border-b transition-[background-color,border-color] duration-300",
          headerOverHero
            ? "bg-transparent border-transparent"
            : "bg-page/98 border-border-soft"
        )}
      >
        <div className="h-full w-full px-[clamp(12px,2vw,24px)] grid md:grid-cols-[1fr_auto_1fr] items-center justify-between md:justify-center gap-4">
          {/* Left: Brand logo */}
          <SmartLink
            href={routes.home}
            onClick={closeAllMenus}
            aria-label={`${brand.name} home`}
            className="relative flex items-center min-w-0"
          >
            <img
              src={logoSrc}
              alt={brand.name}
              width="176"
              height="44"
              loading="eager"
              onError={(event) => {
                const img = event.currentTarget;
                if (img.dataset.fallbackApplied) return;
                img.dataset.fallbackApplied = "true";
                img.src = fallbackBrand.darkLogoSrc;
              }}
              className="block h-11 w-auto"
            />
          </SmartLink>

          {/* Center: Desktop navigation */}
          <DesktopNavigation
            brandName={brandName}
            leftLinks={staticNav.leftLinks}
            rightLinks={staticNav.rightLinks}
            highlightLink={staticNav.highlightLink}
            desktopMenu={desktopMenu}
            resourcesActive={isResourcesPath(currentPath)}
            resourcesColumns={staticNav.resourcesColumns}
            resourcesLayout={staticNav.resourcesLayout}
            resourcesFeatureBox={staticNav.resourcesFeatureBox}
            resourcesHoverFeatureMap={staticNav.resourcesHoverFeatureMap}
            resourcesFooterCta={staticNav.resourcesFooterCta}
            resourcesMenuId={resourcesMenuId}
            servicesActive={currentPath === normalizePathname(routes.services)}
            servicesColumns={staticNav.servicesColumns}
            servicesLayout={staticNav.servicesLayout}
            servicesFeatureBox={staticNav.servicesFeatureBox}
            servicesMenuId={servicesMenuId}
            closeAllMenus={closeAllMenus}
            isActive={isActive}
            onDropdownBlur={handleDropdownBlur}
            setDesktopMenu={setDesktopMenu}
          />

          {/* Right: Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 justify-end">
            <ThemeToggle
              theme={theme}
              onToggleTheme={onToggleTheme}
            />
            <SmartLink
              href={callHref}
              className="hidden md:inline-flex items-center gap-2 h-11 px-4 rounded-lg bg-accent text-accent-contrast hover:bg-accent-hover hover:shadow-accent-glow transition-[background-color,box-shadow] duration-200"
            >
              <Phone className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span className="text-sm font-bold">{primaryPhone || `Contact ${brandName}`}</span>
            </SmartLink>
          </div>
        </div>
      </header>
    </>
  );
}
