import { useEffect, useId, useRef, useState, type FocusEvent } from "react";
import { Menu, Phone, X } from "lucide-react";
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
import { Button } from "@/exxonim/components/primitives/Button";

/**
 * Navigation component — the fixed site header.
 *
 * ARCHITECTURE DECISION:
 * ──────────────────────
 * Navigation is now STATIC. It imports its structure from staticNavigation.ts
 * instead of fetching from the /navigation API. This was an intentional decision
 * because navigation items rarely change and should not depend on the backend.
 *
 * To add/remove/reorder navigation items, edit:
 *   src/exxonim/content/staticNavigation.ts
 *
 * The previous API-driven approach (navigationService.ts, usePublicShell navigation
 * query) is deprecated but kept in the codebase for reference if dynamic nav is
 * needed in the future.
 *
 * BACKEND / ADMIN INTEGRATION NOTES (FastAPI + PostgreSQL):
 * ─────────────────────────────────────────────────────
 * 1. `brand` (BrandAssets) — comes from site-settings API (key: "brand").
 *    Admin should allow uploading:
 *      - Light logo: SVG or PNG, min 140×36px, max 280×72px, aspect ratio ~3.9:1.
 *      - Dark logo: same dimensions. Must be legible on dark (#071518) backgrounds.
 *    The admin UI should validate aspect ratio and show a preview on both
 *    light and dark backgrounds before saving.
 *
 * 2. `company` (CompanyInfo) — comes from site-settings API (key: "company_info").
 *    Admin should validate:
 *      - phones[]: E.164 format preferred (e.g., "+255 747 633 497").
 *        Spaces in display format are OK — components strip them for tel: hrefs.
 *      - emails[]: valid email format.
 *      - whatsapp: full WhatsApp link (https://wa.me/255747633497).
 *        NOT just a phone number — must be a complete wa.me URL.
 *    These fields power the "Call Now" CTA and contact links in nav + footer.
 *
 * 3. Navigation structure is defined in staticNavigation.ts (see notes there).
 *    The admin does NOT manage navigation via the API in the current architecture.
 *
 * 4. Logo display uses `.logo-light` / `.logo-dark` CSS classes with opacity
 *    `@custom-variant dark` defined in globals.css. The logo <img> elements
 *    have an `onError` fallback that loads `fallbackBrand` assets when the
 *    API-sourced image fails to load.
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

/** Pages that are children of the "Resources" nav dropdown.
 *  When the user is on any of these paths, the Resources nav
 *  item should appear active — not Home or nothing. */
const RESOURCE_CHILD_PATHS = new Set([
  normalizePathname(routes.faq),
  normalizePathname(routes.support),
  normalizePathname(routes.terms),
  normalizePathname(routes.privacy),
  normalizePathname(routes.cookies),
  normalizePathname(routes.dataRights),
  normalizePathname(routes.blog),
]);

/** Check if a path is a resource page or a resource child page.
 *  Matches: /resources, /blog, /faq, /support, /terms, /privacy,
 *  /cookies, /data-rights, and any /resources/{slug} article. */
function isResourcesPath(path: string): boolean {
  if (path === normalizePathname(routes.resources)) return true;
  if (RESOURCE_CHILD_PATHS.has(path)) return true;
  // Blog article paths: /resources/{slug} or /blog/{slug}
  const segments = path.split("/").filter(Boolean);
  if (segments.length === 2 && (segments[0] === "resources" || segments[0] === "blog")) {
    return true;
  }
  return false;
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

  /* ── Scroll-based header transparency ──────────────────
   * When at the top of the home page (over the hero), the
   * header is transparent so the hero bleeds through.
   * When scrolled past the hero, it gains a solid background.
   * Only applies on the home page where a hero section exists. */
  const isHomePage = currentPath === normalizePathname(routes.home);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /** True when the header should be transparent (over hero, at scroll top).
   *  In dark mode, forces the dark logo variant (light text on dark hero).
   *  In light mode, forces the light logo variant (dark text on lighter hero). */
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
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: close menus on navigation
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
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 h-[68px] [--header-height:68px] transition-[background-color,backdrop-filter] duration-300",
          headerOverHero
            ? "bg-transparent"
            : "bg-page/95 backdrop-blur-xl"
        )}
      >
        {/* Layout: flex on mobile (logo left, actions right), grid on xl+ (logo left, nav centered, actions right) */}
        <div className="h-full w-full px-[clamp(12px,2vw,24px)] flex xl:grid xl:grid-cols-[1fr_auto_1fr] items-center justify-between xl:justify-center gap-4">
          {/* Left: Brand logo — links to Home */}
          <a
            href={routes.home}
            onClick={closeAllMenus}
            aria-label={`${brand.name} home`}
            className="relative flex items-center min-w-0"
          >
            {/* Logo crossfade — both logos always rendered, opacity
              controlled by .logo-light/.logo-dark CSS classes.
              During theme transition, they smoothly crossfade.
              Without .theme-transition, the swap is instant (no flash on load).
              BACKEND: Admin should recommend SVG or WebP format for logos.
              Min width: 140px, max height: 72px. */}
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
              className={cn("logo-light block h-11 w-auto", headerOverHero && (theme === "dark" ? "logo-force-dark" : "logo-force-light"))}
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
              className={cn("logo-dark h-11 w-auto", headerOverHero && (theme === "dark" ? "logo-force-dark" : "logo-force-light"))}
            />
          </a>

          {/* Center: Desktop navigation — perfectly centered via grid layout */}
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

          {/* Right: Actions — theme toggle, Call Now CTA, mobile menu button */}
          <div className="flex items-center gap-2 md:gap-3 justify-end">
            <ThemeToggle
              theme={theme}
              onToggleTheme={onToggleTheme}
            />

            {/* Call Now CTA — visible on md+ screens.
                BACKEND: If company.phones[] is empty, this degrades to a
                "Contact {brandName}" link pointing to /contact/. The admin
                should mark phone as a required field if this CTA is important.
                Phone format: E.164 or display format (spaces ok, we strip them for tel:). */}
            <Button
              size="hero"
              variant="ghost"
              href={callHref}
              className="hidden md:inline-flex bg-accent-soft hover:bg-accent-hover pl-3 pr-5 gap-3 justify-start"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent text-accent-contrast animate-phone-ring">
                <Phone className="w-4 h-4" aria-hidden="true" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-accent">
                  {primaryPhone ? "Call Now" : `Contact ${brandName}`}
                </span>
                <span className="text-sm font-medium text-text">
                  {primaryPhone || "Open the contact page"}
                </span>
              </div>
            </Button>

            <Button
              ref={mobileToggleRef}
              size="icon"
              variant="ghost"
              aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={mobileMenuOpen}
              aria-controls={mobileMenuId}
              onClick={() => {
                setDesktopMenu(null);
                setMobileMenuOpen((open) => !open);
              }}
              className={cn(
                "xl:hidden",
                headerOverHero
                  ? "text-white"
                  : mobileMenuOpen
                    ? "text-accent-contrast"
                    : ""
              )}
            >
              <span className="sr-only">Toggle navigation</span>
              <Menu
                className={cn("w-6 h-6", mobileMenuOpen && "hidden")}
                aria-hidden="true"
              />
              <X
                className={cn("w-6 h-6", !mobileMenuOpen && "hidden")}
                aria-hidden="true"
              />
            </Button>
          </div>
        </div>
      </header>

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
    </>
  );
}
