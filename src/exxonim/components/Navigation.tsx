import { useEffect, useId, useRef, useState, type FocusEvent } from "react";
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
 * ARCHITECTURE DECISION:
 * ──────────────────────
 * Navigation is STATIC. It imports its structure from staticNavigation.ts
 * instead of fetching from the /navigation API.
 *
 * MOBILE NAVBAR — DUAL MODE:
 * ───────────────────────────
 * On mobile (< xl), there are TWO mobile headers:
 *
 * 1. FLOATING PILL (over hero): When at the top of the homepage, a
 *    frosted-glass pill with blur(48px) floats over the hero. This
 *    matches the Mobbin pattern — minimal, elegant, content-first.
 *    The pill has: Logo | ThemeToggle | Hamburger
 *    When expanded, the pill grows downward to reveal nav links.
 *
 * 2. TRADITIONAL FULL-WIDTH BAR (after scroll): Once the user scrolls
 *    past the hero, the pill morphs into a conventional full-width bar
 *    with logo on the left and hamburger on the right. This is more
 *    practical for navigation-heavy sections below the hero.
 *
 * On tablet (md–xl), the expanded menu is right-aligned and doesn't
 * cover the full screen.
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

/** Pages that are children of the "Resources" nav dropdown. */
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

/* ── Logo sub-component (shared between pill & bar) ──── */
function NavLogo({ brand, size = "sm", onClick }: { brand: BrandAssets; size?: "sm" | "lg"; onClick?: () => void }) {
  const h = size === "sm" ? "h-7" : "h-11";
  return (
    <a
      href={routes.home}
      onClick={onClick}
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
        className={`logo-light block ${h} w-auto`}
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
        className={`logo-dark ${h} w-auto`}
      />
    </a>
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

  /** True when the header should be transparent (over hero, at scroll top). */
  const headerOverHero = isHomePage && !scrolled;

  /** Whether to show the floating pill or the traditional bar */
  const showPill = headerOverHero;

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

  /* ── Shared mobile panel props ──────────────────────── */
  const mobilePanelProps = {
    brandName,
    callHref,
    currentPath,
    regularLinks: [...staticNav.leftLinks, ...staticNav.rightLinks],
    highlightLink: staticNav.highlightLink,
    id: mobileMenuId,
    isOpen: mobileMenuOpen,
    resourcesActive: isResourcesPath(currentPath),
    servicesActive: currentPath === normalizePathname(routes.services),
    resourcesColumns: staticNav.resourcesColumns,
    servicesColumns: staticNav.servicesColumns,
    panelRef: mobilePanelRef,
    primaryPhone,
    isActive,
    onClose: () => setMobileMenuOpen(false),
  };

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
       * MOBILE: FLOATING PILL (only over hero on homepage)
       * ───────────────────────────────────────────────────────
       * A frosted-glass capsule that sits over the hero.
       * Contains: Logo | ThemeToggle | Hamburger
       * When expanded, the pill grows downward with nav links.
       * Theme toggle is ALWAYS visible in the pill bar. */}
      <header
        data-over-hero=""
        className={cn(
          "xl:hidden fixed z-50 top-2 left-6 right-6",
          "rounded-[28px]",
          "transition-[background-color,backdrop-filter,opacity,transform] duration-300",
          "nav-pill",
          /* Hide pill when not over hero — fade out, slide up */
          !showPill && "opacity-0 pointer-events-none -translate-y-2"
        )}
        style={{
          backdropFilter: "blur(48px)",
          WebkitBackdropFilter: "blur(48px)",
        }}
      >
        {/* ── Pill bar (always visible when pill is shown) ── */}
        <div className={cn(
          "flex items-center justify-between gap-2",
          "px-4 py-3",
        )}>
          {/* Logo */}
          <NavLogo brand={brand} size="sm" onClick={closeAllMenus} />

          {/* Right: Theme toggle + Hamburger — always visible */}
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
                "dark-header-icon"
              )}
            >
              <HamburgerIcon open={mobileMenuOpen} />
            </button>
          </div>
        </div>

        {/* ── Expandable menu (inside the pill) ── */}
        <MobileNavigationPanel
          {...mobilePanelProps}
          variant="pill"
        />
      </header>

      {/* ═══════════════════════════════════════════════════════
       * MOBILE: TRADITIONAL FULL-WIDTH BAR (after scrolling)
       * ───────────────────────────────────────────────────────
       * Standard full-width header bar with logo on left,
       * theme toggle + hamburger on right. Appears once the
       * user scrolls past the hero section. */}
      <header
        data-over-hero={headerOverHero ? "" : undefined}
        className={cn(
          "xl:hidden fixed z-50 top-0 inset-x-0 h-[56px]",
          "transition-[background-color,backdrop-filter,opacity,transform] duration-300",
          headerOverHero
            ? "bg-transparent"
            : "bg-page/95 backdrop-blur-xl border-b border-border-soft",
          /* Show bar only when pill is NOT showing — fade in, slide down */
          showPill && "opacity-0 pointer-events-none -translate-y-1"
        )}
      >
        <div className="h-full px-4 flex items-center justify-between">
          {/* Logo */}
          <NavLogo brand={brand} size="sm" onClick={closeAllMenus} />

          {/* Right: Theme toggle + Hamburger */}
          <div className="flex items-center gap-0.5">
            <ThemeToggle theme={theme} onToggleTheme={onToggleTheme} compact />
            <button
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
                headerOverHero
                  ? "text-white dark-header-icon"
                  : "text-text"
              )}
            >
              <HamburgerIcon open={mobileMenuOpen} />
            </button>
          </div>
        </div>

        {/* ── Expandable menu (dropdown from bar) ── */}
        <MobileNavigationPanel
          {...mobilePanelProps}
          variant="bar"
        />
      </header>

      {/* ═══════════════════════════════════════════════════════
       * DESKTOP: Full-width bar (xl+)
       * ───────────────────────────────────────────────────────
       * Standard header bar with centered nav, Call CTA,
       * theme toggle. Unchanged from previous version. */}
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
          <a
            href={routes.home}
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
          </a>

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
