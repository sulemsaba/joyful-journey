import { useState, type RefObject } from "react";
import { ChevronDown, Phone } from "lucide-react";
import type { MenuColumn, MenuItem } from "@/exxonim/components/navigation/types";
import { Button } from "@/exxonim/components/primitives/Button";
import { routes } from "@/exxonim/routes";
import { cn } from "@/exxonim/utils/cn";

/**
 * Mobile navigation panel — slide-down overlay for screens below xl breakpoint.
 *
 * LAYOUT ORDER:
 *   [Home] [About] [Career] [Contact] (regular links)
 *   [Services ▼ accordion]
 *   [Resources ▼ accordion]
 *   [● Track Consultation] (highlighted)
 *   [Call Now CTA]
 *
 * BACKEND / ADMIN INTEGRATION NOTES:
 * ──────────────────────────────────
 * Same as DesktopNavigation — nav structure comes from staticNavigation.ts.
 */
interface MobileNavigationPanelProps {
  brandName: string;
  callHref: string;
  currentPath: string;
  regularLinks: MenuItem[];
  highlightLink: MenuItem;
  id: string;
  isOpen: boolean;
  resourcesActive: boolean;
  servicesActive: boolean;
  resourcesColumns: MenuColumn[];
  servicesColumns: MenuColumn[];
  panelRef: RefObject<HTMLDivElement>;
  primaryPhone?: string;
  isActive: (href: string) => boolean;
  onClose: () => void;
}

interface AccordionProps {
  label: string;
  columns: MenuColumn[];
  ctaLabel: string;
  ctaHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  onClose: () => void;
  defaultOpen?: boolean;
}

function MobileAccordion({
  label,
  columns,
  ctaLabel,
  ctaHref,
  secondaryLabel,
  secondaryHref,
  onClose,
  defaultOpen = false,
  isActive: isGroupActive = false,
}: AccordionProps & { isActive?: boolean }) {
  const [open, setOpen] = useState(defaultOpen || isGroupActive);

  if (!columns.length) return null;

  return (
    <div className={cn(
      "rounded-xl border overflow-hidden",
      isGroupActive
        ? "border-accent/30 bg-accent-soft/30"
        : "border-border-soft bg-surface-elevated"
    )}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "w-full flex items-center justify-between gap-3 px-4 py-3 text-left transition-colors",
          isGroupActive
            ? "bg-accent-soft/40"
            : "hover:bg-accent-soft/40"
        )}
      >
        <span className={cn(
          "text-xs font-extrabold tracking-[0.14em] uppercase text-accent"
        )}>
          {label}
          {isGroupActive && (
            <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full bg-accent text-accent-contrast text-[0.55rem] font-bold">
              Active
            </span>
          )}
        </span>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-accent transition-transform",
            open && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>

      <div
        className={cn(
          "grid transition-all duration-300 ease-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4 pt-1 grid gap-4">
            {columns.map((column) => (
              <div key={column.title} className="grid gap-2">
                <p className="text-[11px] font-bold tracking-wider uppercase text-text-muted">
                  {column.title}
                </p>
                <ul className="grid gap-1">
                  {column.items.map((item) => (
                    <li key={`${item.href}-${item.label}`}>
                      <a
                        href={item.href}
                        onClick={onClose}
                        className="block py-1.5 text-sm text-text hover:text-accent transition-colors"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-border-soft">
              <Button
                size="compact"
                variant="primary"
                href={ctaHref}
                onClick={onClose}
              >
                {ctaLabel}
              </Button>
              <a
                href={secondaryHref}
                onClick={onClose}
                className="text-sm font-medium text-accent hover:underline"
              >
                {secondaryLabel}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MobileNavigationPanel({
  brandName,
  callHref,
  currentPath,
  regularLinks,
  highlightLink,
  id,
  isOpen,
  resourcesActive,
  servicesActive,
  resourcesColumns,
  servicesColumns,
  panelRef,
  primaryPhone,
  isActive,
  onClose,
}: MobileNavigationPanelProps) {
  return (
    <div
      id={id}
      aria-hidden={!isOpen}
      className={cn(
        "fixed inset-0 z-40 xl:hidden transition-opacity duration-200",
        isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
      )}
    >
      <button
        type="button"
        aria-label="Close navigation"
        tabIndex={isOpen ? 0 : -1}
        onClick={onClose}
        className="absolute inset-0 bg-surface-strong/60 backdrop-blur-sm"
      />

      <div className="absolute top-[70px] right-4 left-4 sm:left-auto sm:w-[min(420px,calc(100vw-2rem))]">
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          tabIndex={-1}
          className={cn(
            "max-h-[calc(100vh-100px)] overflow-y-auto rounded-2xl border border-border-soft bg-surface p-4 transition-all duration-300 ease-out",
            isOpen
              ? "translate-y-0 opacity-100 scale-100"
              : "-translate-y-3 opacity-0 scale-[0.98]"
          )}
        >
          <div className="grid gap-3">
            {/* Regular links: Home, About, Career, Contact */}
            <div className="grid gap-1">
              {regularLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center justify-between px-4 h-11 rounded-full text-sm font-medium transition-colors",
                    isActive(link.href)
                      ? "bg-accent text-accent-contrast"
                      : "text-text hover:bg-accent-soft"
                  )}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Services accordion */}
            <MobileAccordion
              label="Services"
              columns={servicesColumns}
              ctaLabel="See All Services"
              ctaHref={routes.services}
              secondaryLabel={`Contact ${brandName}`}
              secondaryHref={routes.contact}
              onClose={onClose}
              isActive={servicesActive}
            />

            {/* Resources accordion */}
            <MobileAccordion
              label="Resources"
              columns={resourcesColumns}
              ctaLabel="See All Resources"
              ctaHref={routes.resources}
              secondaryLabel="Ask a Question"
              secondaryHref={routes.contact}
              onClose={onClose}
              isActive={resourcesActive}
            />

            {/* Highlight link — Track Consultation (differentiator)
                Rendered as a distinctive accent pill with animated indicator dot.
                BACKEND: The label and href come from staticNavigation.ts highlightLink. */}
            <Button
              size="standard"
              variant="primary"
              href={highlightLink.href}
              onClick={onClose}
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

            {/* Call Now CTA */}
            <a
              href={callHref}
              onClick={onClose}
              className="flex items-center justify-center gap-3 py-3.5 rounded-full bg-accent text-accent-contrast hover:bg-accent-hover transition-all"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-accent-contrast/15">
                <Phone className="w-4 h-4 animate-phone-ring" aria-hidden="true" />
              </span>
              <span className="flex flex-col leading-none">
                <span className="text-[0.6rem] font-semibold uppercase tracking-wider opacity-80">
                  {primaryPhone ? "Call Now" : `Contact ${brandName}`}
                </span>
                {primaryPhone ? (
                  <span className="text-sm font-bold tracking-wide">{primaryPhone}</span>
                ) : (
                  <span className="text-sm font-bold tracking-wide">Get in touch</span>
                )}
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
