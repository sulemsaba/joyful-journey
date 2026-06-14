import { useEffect, useId, useRef, useState, type FocusEvent } from "react";
import { Link } from "react-router-dom";
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

/**
 * Navigation component — the fixed site header.
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

const RESOURCE_CHILD_PATHS = new Set([
  normalizePathname(routes.faq),
  normalizePathname(routes.support),
  normalizePathname(routes.terms),
  normalizePathname(routes.privacy),
  normalizePathname(routes.cookies),
  normalizePathname(routes.dataRights),
  normalizePathname(routes.blog),
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
    <span className="nav-hamburger relative w-5 h-5 flex items-center justify-center">
      <span
        className={cn(
          "nav-hamburger-line absolute block w-[18px] h-[1.5px] rounded-full transition-transform duration-300 ease-[cubic-bezier(0.25,0.4,0.25,1)]",
          open ? "rotate-45" : "rotate-0"
        )}
      />
      <span
        className={cn(
          "nav-hamburger-line absolute block w-[18px] h-[1.5px] rounded-full transition-transform duration-300 ease-[cubic-bezier(0.25,0.4,0.25,1)]",
          open ? "-rotate-45" : "rotate-0 translate-y-[5px]"
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
       * solid bg + blur when scrolled — same as desktop.
       * Logo left, theme toggle + hamburger right.
       * Menu expands below the bar naturally.
       * Click outside closes the menu. */}
      <header
        data-over-hero={headerOverHero ? "" : undefined}
        className={cn(
          "xl:hidden fixed z-50 top-0 inset-x-0 h-[60px]",
          "transition-[background-color,backdrop-filter] duration-300",
          headerOverHero
            ? "bg-transparent"
            : "bg-page/95 backdrop-blur-xl"
        )}
      >
        <div className="h-full px-4 flex items-center justify-between">
          {/* Logo — matches footer size: h-8 sm:h-11 */}
          <Link
            to={routes.home}
            onClick={closeAllMenus}
            aria-label={`${brand.name} home`}
            className="relative flex items-center min-w-0"
          >
            <img
              src={brand.lightLogoSrc}
              alt={brand.name}
              width="160"
              height="44"
              onError={(event) => {
                const img = event.currentTarget;
                if (img.dataset.fallbackApplied) return;
                img.dataset.fallbackApplied = "true";
                img.src = fallbackBrand.lightLogoSrc;
              }}
              className="logo-light block h-8 sm:h-11 w-auto"
            />
            <img
              src={brand.darkLogoSrc}
              alt=""
              aria-hidden="true"
              width="160"
              height="44"
              onError={(event) => {
                const img = event.currentTarget;
                if (img.dataset.fallbackApplied) return;
                img.dataset.fallbackApplied = "true";
                img.src = fallbackBrand.darkLogoSrc;
              }}
              className="logo-dark h-8 sm:h-11 w-auto"
            />
          </Link>

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
                "flex items-center justify-center w-9 h-9",
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
           backdrop-filter creating a new containing block) ── */}
      {mobileMenuOpen && (
        <div
          className="xl:hidden fixed inset-0 top-[60px] z-40 bg-black/20 md:bg-black/10"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ═══════════════════════════════════════════════════════
       * DESKTOP: Full-width bar (xl+)
       * ───────────────────────────────────────────────────────
       * Standard header bar with centered nav, Call CTA,
       * theme toggle. */}
      <header
        data-over-hero={headerOverHero ? "" : undefined}
        className={cn(
          "hidden xl:block fixed top-0 inset-x-0 z-50 h-[68px] [--header-height:68px] transition-[background-color,backdrop-filter] duration-300",
          headerOverHero
            ? "bg-transparent"
            : "bg-page/95 backdrop-blur-xl"
        )}
      >
        <div className="h-full w-full px-[clamp(12px,2vw,24px)] grid xl:grid-cols-[1fr_auto_1fr] items-center justify-between xl:justify-center gap-4">
          {/* Left: Brand logo */}
          <Link
            to={routes.home}
            onClick={closeAllMenus}
            aria-label={`${brand.name} home`}
            className="relative flex items-center min-w-0"
          >
            <img
              src={brand.lightLogoSrc}
              alt={brand.name}
              width="176"
              height="44"
              onError={(event) => {
                const img = event.currentTarget;
                if (img.dataset.fallbackApplied) return;
                img.dataset.fallbackApplied = "true";
                img.src = fallbackBrand.lightLogoSrc;
              }}
              className="logo-light block h-11 w-auto"
            />
            <img
              src={brand.darkLogoSrc}
              alt=""
              aria-hidden="true"
              width="176"
              height="44"
              onError={(event) => {
                const img = event.currentTarget;
                if (img.dataset.fallbackApplied) return;
                img.dataset.fallbackApplied = "true";
                img.src = fallbackBrand.darkLogoSrc;
              }}
              className="logo-dark h-11 w-auto"
            />
          </Link>

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
            <a
              href={callHref}
              className="hidden md:inline-flex items-center gap-2 h-12 px-4 rounded-full bg-accent text-accent-contrast hover:bg-accent-hover transition-colors duration-200"
            >
              <Phone className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span className="text-[13px] font-semibold">{primaryPhone || `Contact ${brandName}`}</span>
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
