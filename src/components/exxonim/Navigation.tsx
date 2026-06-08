"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Phone, Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import type {
  BrandAssets,
  CompanyInfo,
  NavigationItem,
  Theme,
} from "@/lib/exxonim-types";
import { cn } from "@/lib/cn";
import { Container } from "./Container";
import { ThemeToggle } from "./ThemeToggle";

/* ------------------------------------------------------------------ */
/* Helper types & functions                                            */
/* ------------------------------------------------------------------ */

interface NavLinkItem {
  label: string;
  href: string;
}

interface MenuColumn {
  title: string;
  items: NavLinkItem[];
  borderLeft?: boolean;
}

function getNavigationRoot(items: NavigationItem[], title: string) {
  return items.find((item) => item.title === title);
}

function getPrimaryLinks(items: NavigationItem[]): NavLinkItem[] {
  return items
    .filter((item) => item.kind === "primary" && !item.children.length)
    .sort((a, b) => a.order - b.order)
    .map((item) => ({ label: item.title, href: item.url }));
}

function getNavigationColumns(root?: NavigationItem): MenuColumn[] {
  if (!root) return [];
  return root.children
    .sort((a, b) => a.order - b.order)
    .map((group, index) => ({
      title: group.title,
      borderLeft: index > 0,
      items: group.children
        .sort((a, b) => a.order - b.order)
        .map((item) => ({
          label: item.title,
          href: item.url,
        })),
    }));
}

/* ------------------------------------------------------------------ */
/* Dropdown menu for desktop                                           */
/* ------------------------------------------------------------------ */

interface DesktopDropdownProps {
  label: string;
  href: string;
  columns: MenuColumn[];
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

function DesktopDropdown({
  label,
  href,
  columns,
  isOpen,
  onToggle,
  onClose,
}: DesktopDropdownProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (columns.length === 0) return null;

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          "inline-flex items-center gap-1 text-sm font-medium transition-all duration-200",
          isOpen ? "text-accent" : "text-text-muted hover:text-text"
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {label}
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 animate-dropdown-enter">
          <div className="bg-surface border border-border-soft rounded-2xl shadow-panel p-6 min-w-[560px] shadow-accent-glow/20">
            <div className="flex gap-6">
              {columns.map((col) => (
                <div
                  key={col.title}
                  className={cn(
                    "flex-1",
                    col.borderLeft && "pl-6 border-l border-border-soft"
                  )}
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">
                    {col.title}
                  </p>
                  <ul className="space-y-1">
                    {col.items.map((item) => (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          onClick={onClose}
                          className="group flex items-center gap-2 text-sm text-text-soft hover:text-accent transition-colors duration-150 py-1 px-2 -mx-2 rounded-md hover:bg-accent-soft/50 border-l-2 border-transparent hover:border-accent"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-border-soft">
              <a
                href={href}
                onClick={onClose}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-hover transition-colors duration-150"
              >
                View all {label}
                <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile expandable section                                           */
/* ------------------------------------------------------------------ */

interface MobileExpandableProps {
  label: string;
  href: string;
  columns: MenuColumn[];
  isOpen: boolean;
  onToggle: () => void;
  onClosePanel: () => void;
}

function MobileExpandable({
  label,
  href,
  columns,
  isOpen,
  onToggle,
  onClosePanel,
}: MobileExpandableProps) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center justify-between w-full py-3 text-base font-medium text-text transition-colors duration-150"
        aria-expanded={isOpen}
      >
        {label}
        <ChevronDown
          className={cn(
            "w-4 h-4 text-text-muted transition-transform duration-200",
            isOpen && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-out",
          isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="pl-4 pb-3 border-l-2 border-accent-soft ml-1">
          {columns.map((col, colIdx) => (
            <div key={col.title} className={cn("mb-3", colIdx > 0 && "pt-3 border-t border-border-soft")}>
              <p className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                {col.title}
              </p>
              <ul className="space-y-1">
                {col.items.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={onClosePanel}
                      className="block text-sm text-text-soft hover:text-accent transition-colors duration-150 py-1"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <a
            href={href}
            onClick={onClosePanel}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-hover transition-colors duration-150 mt-1"
          >
            View all {label}
            <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Navigation component                                                */
/* ------------------------------------------------------------------ */

interface NavigationProps {
  brand: BrandAssets;
  company: CompanyInfo;
  navigationItems: NavigationItem[];
  pathname: string;
  theme: Theme;
  onToggleTheme: () => void;
}

export function Navigation({
  brand,
  company,
  navigationItems,
  pathname,
  theme,
  onToggleTheme,
}: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileVisible, setMobileVisible] = useState(false);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Derive navigation structure
  const primaryLinks = getPrimaryLinks(navigationItems);
  const servicesRoot = getNavigationRoot(navigationItems, "Services");
  const resourcesRoot = getNavigationRoot(navigationItems, "Resources");
  const servicesColumns = getNavigationColumns(servicesRoot);
  const resourcesColumns = getNavigationColumns(resourcesRoot);

  // Dropdown items with children
  const dropdownItems: {
    title: string;
    href: string;
    columns: MenuColumn[];
  }[] = [];
  if (servicesRoot && servicesColumns.length > 0) {
    dropdownItems.push({
      title: servicesRoot.title,
      href: servicesRoot.url,
      columns: servicesColumns,
    });
  }
  if (resourcesRoot && resourcesColumns.length > 0) {
    dropdownItems.push({
      title: resourcesRoot.title,
      href: resourcesRoot.url,
      columns: resourcesColumns,
    });
  }

  const closeMobile = useCallback(() => {
    setMobileVisible(false);
    // Delay actual close to allow slide-out animation
    setTimeout(() => {
      setMobileOpen(false);
      setMobileExpanded(null);
    }, 300);
  }, []);

  const closeDropdown = useCallback(() => {
    setOpenDropdown(null);
  }, []);

  // Scroll listener for shadow effect
  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Show mobile panel with animation after mount
  useEffect(() => {
    if (mobileOpen) {
      // Trigger slide-in on next frame
      requestAnimationFrame(() => {
        setMobileVisible(true);
      });
    }
  }, [mobileOpen]);

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Escape key to close mobile menu
  useEffect(() => {
    if (!mobileOpen) return;
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") closeMobile();
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [mobileOpen, closeMobile]);

  // Focus trap in mobile panel
  useEffect(() => {
    if (!mobileOpen || !mobileVisible) return;
    const panel = mobilePanelRef.current;
    if (!panel) return;

    const focusable = panel.querySelectorAll<HTMLElement>(
      'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length > 0) {
      focusable[0].focus();
    }

    function handleTab(e: KeyboardEvent) {
      if (e.key !== "Tab") return;
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [mobileOpen, mobileVisible]);

  // Primary phone number for CTA
  const primaryPhone = company.phones[0] ?? "";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 h-[70px] bg-surface/86 backdrop-blur-xl border-b border-border-soft transition-all duration-300 [--header-height:70px] relative",
          "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-accent/20 after:to-transparent",
          scrolled && "shadow-card"
        )}
      >
        <div className="h-full w-full px-[clamp(12px,2vw,24px)] flex items-center justify-between gap-4">
          {/* Logo */}
          <a
            href="/"
            className="flex-shrink-0 transition-opacity duration-200 hover:opacity-80"
            aria-label={`${brand.name} — home`}
          >
            <img
              src={brand.lightLogoSrc}
              alt={brand.name}
              className="block h-9 lg:h-10 w-auto"
              style={{ display: theme === "light" ? "block" : "none" }}
            />
            <img
              src={brand.darkLogoSrc}
              alt=""
              aria-hidden="true"
              className="block h-9 lg:h-10 w-auto"
              style={{ display: theme === "dark" ? "block" : "none" }}
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
            {primaryLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative text-sm font-medium transition-all duration-200 py-1",
                    "hover:text-text",
                    isActive
                      ? "text-accent"
                      : "text-text-muted"
                  )}
                >
                  {link.label}
                  {/* Active dot indicator */}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />
                  )}
                  {/* Underline on hover */}
                  <span
                    className={cn(
                      "absolute bottom-0 left-0 h-px bg-accent transition-all duration-200",
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    )}
                  />
                </a>
              );
            })}

            {dropdownItems.map((item) => (
              <DesktopDropdown
                key={item.title}
                label={item.title}
                href={item.href}
                columns={item.columns}
                isOpen={openDropdown === item.title}
                onToggle={() =>
                  setOpenDropdown((prev) =>
                    prev === item.title ? null : item.title
                  )
                }
                onClose={closeDropdown}
              />
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <ThemeToggle theme={theme} onToggleTheme={onToggleTheme} />
            </div>

            {/* Call CTA — desktop only */}
            {primaryPhone && (
              <a
                href={`tel:${primaryPhone.replace(/[^0-9+]/g, "")}`}
                className="hidden md:inline-flex items-center gap-2.5 py-3 px-5 rounded-full bg-accent text-accent-contrast hover:bg-accent-hover transition-all duration-200 relative overflow-hidden group shadow-accent-glow/30 hover:shadow-accent-glow/50"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative flex items-center justify-center w-7 h-7 rounded-full bg-accent-contrast/15">
                  <Phone className="w-3.5 h-3.5 animate-phone-ring" aria-hidden="true" />
                </span>
                <span className="relative flex flex-col leading-none">
                  <span className="text-[0.6rem] font-semibold uppercase tracking-wider opacity-80">Call Now</span>
                  <span className="text-xs font-bold tracking-wide">{primaryPhone}</span>
                </span>
              </a>
            )}

            {/* Mobile menu button */}
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-border-soft bg-surface text-text hover:border-accent hover:text-accent transition-all duration-200"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true" aria-label="Navigation menu">
          {/* Overlay */}
          <div
            className={cn(
              "absolute inset-0 bg-overlay transition-opacity duration-300",
              mobileVisible ? "opacity-100" : "opacity-0"
            )}
            onClick={closeMobile}
            aria-hidden="true"
          />

          {/* Slide-out panel */}
          <div
            ref={mobilePanelRef}
            className={cn(
              "absolute top-0 right-0 bottom-0 w-[min(360px,85vw)] bg-surface border-l border-border-soft shadow-panel overflow-y-auto transition-transform duration-300 ease-out",
              mobileVisible ? "translate-x-0" : "translate-x-full"
            )}
          >
            <div className="flex flex-col h-full">
              {/* Panel header */}
              <div className="flex items-center justify-between px-6 h-[70px] border-b border-border-soft">
                <span className="text-lg font-semibold text-text">Menu</span>
                <button
                  type="button"
                  onClick={closeMobile}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-border-soft text-text-muted hover:text-text hover:border-accent transition-all duration-200"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              {/* Panel body */}
              <nav className="flex-1 px-6 py-5 space-y-1" aria-label="Mobile navigation">
                {primaryLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={closeMobile}
                      className={cn(
                        "block py-2.5 text-base font-medium transition-colors duration-150 border-l-2 -ml-2 pl-2",
                        isActive
                          ? "text-accent border-accent"
                          : "text-text-muted hover:text-text border-transparent hover:border-accent-soft"
                      )}
                    >
                      {link.label}
                    </a>
                  );
                })}

                {/* Divider between primary links and expandable sections */}
                {dropdownItems.length > 0 && (
                  <div className="pt-3 mt-2 border-t border-border-soft" />
                )}

                {dropdownItems.map((item) => (
                  <MobileExpandable
                    key={item.title}
                    label={item.title}
                    href={item.href}
                    columns={item.columns}
                    isOpen={mobileExpanded === item.title}
                    onToggle={() =>
                      setMobileExpanded((prev) =>
                        prev === item.title ? null : item.title
                      )
                    }
                    onClosePanel={closeMobile}
                  />
                ))}
              </nav>

              {/* Mobile theme toggle */}
              <div className="px-6 py-3 border-t border-border-soft">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-muted">
                    {theme === "dark" ? "Dark" : "Light"} mode
                  </span>
                  <ThemeToggle theme={theme} onToggleTheme={onToggleTheme} />
                </div>
              </div>

              {/* Panel footer — CTA */}
              {primaryPhone && (
                <div className="px-6 py-5 border-t border-border-soft">
                  <a
                    href={`tel:${primaryPhone.replace(/[^0-9+]/g, "")}`}
                    className="flex items-center justify-center gap-3 w-full py-3.5 rounded-full bg-accent text-accent-contrast hover:bg-accent-hover transition-all duration-200 shadow-accent-glow/30"
                  >
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-accent-contrast/15">
                      <Phone className="w-4 h-4 animate-phone-ring" aria-hidden="true" />
                    </span>
                    <span className="flex flex-col leading-none">
                      <span className="text-[0.6rem] font-semibold uppercase tracking-wider opacity-80">Call Now</span>
                      <span className="text-sm font-bold tracking-wide">{primaryPhone}</span>
                    </span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Spacer to push content below the fixed header */}
      <div className="h-[70px]" aria-hidden="true" />
    </>
  );
}
