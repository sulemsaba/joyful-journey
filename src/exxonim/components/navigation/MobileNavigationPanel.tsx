import { useState, type RefObject } from "react";
import { ChevronDown, Phone } from "lucide-react";
import type { MenuColumn, MenuItem } from "@/exxonim/components/navigation/types";
import { Button } from "@/exxonim/components/primitives/Button";
import { routes } from "@/exxonim/routes";
import { cn } from "@/exxonim/utils/cn";

/**
 * Mobile navigation panel — slide-down overlay for screens below xl breakpoint.
 *
 * MOBILE-FIRST DESIGN:
 *   - Compact link heights (36px) — touch-friendly but not bloated
 *   - Tight accordion triggers (32px) with small uppercase labels
 *   - Single-line Call Now button — icon + phone number only
 *   - Thin separators between sections
 *   - Reduced padding to keep panel within viewport height
 *
 * LAYOUT ORDER:
 *   [Home] [About] [Career] [Contact] (regular links)
 *   ── separator ──
 *   [Services ▼ accordion]
 *   [Resources ▼ accordion]
 *   ── separator ──
 *   [● Track Consultation] (highlighted)
 *   [Call Now CTA]
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
      "rounded-lg border overflow-hidden",
      isGroupActive
        ? "border-accent/30 bg-accent-soft/30"
        : "border-border-soft bg-surface-elevated"
    )}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "w-full flex items-center justify-between gap-3 px-3 py-2 text-left transition-colors",
          isGroupActive
            ? "bg-accent-soft/40"
            : "hover:bg-accent-soft/40"
        )}
      >
        <span className={cn(
          "text-[11px] font-bold tracking-[0.12em] uppercase text-accent"
        )}>
          {label}
          {isGroupActive && (
            <span className="ml-1.5 inline-flex items-center px-1 py-0.5 rounded-full bg-accent text-accent-contrast text-[0.5rem] font-bold leading-none">
              Active
            </span>
          )}
        </span>
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 text-accent transition-transform",
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
          <div className="px-3 pb-3 pt-0.5 grid gap-3">
            {columns.map((column) => (
              <div key={column.title} className="grid gap-1">
                <p className="text-[10px] font-bold tracking-wider uppercase text-text-muted">
                  {column.title}
                </p>
                <ul className="grid gap-0.5">
                  {column.items.map((item) => (
                    <li key={`${item.href}-${item.label}`}>
                      <a
                        href={item.href}
                        onClick={onClose}
                        className="block py-1 text-[13px] text-text hover:text-accent transition-colors"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border-soft">
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
                className="text-[12px] font-medium text-accent hover:underline"
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

      <div className="absolute top-[68px] right-3 left-3 sm:left-auto sm:w-[min(380px,calc(100vw-2rem))]">
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          tabIndex={-1}
          className={cn(
            "max-h-[calc(100vh-84px)] overflow-y-auto rounded-xl border border-border-soft bg-surface p-3 transition-all duration-300 ease-out",
            isOpen
              ? "translate-y-0 opacity-100 scale-100"
              : "-translate-y-2 opacity-0 scale-[0.98]"
          )}
        >
          <div className="grid gap-2">
            {/* Regular links: Home, About, Career, Contact */}
            <div className="grid gap-0.5">
              {regularLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center justify-between px-3 h-9 rounded-lg text-[13px] font-medium transition-colors",
                    isActive(link.href)
                      ? "bg-accent text-accent-contrast"
                      : "text-text hover:bg-accent-soft"
                  )}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Thin separator */}
            <div className="h-px bg-border-soft" />

            {/* Services accordion */}
            <MobileAccordion
              label="Services"
              columns={servicesColumns}
              ctaLabel="All Services"
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
              ctaLabel="All Resources"
              ctaHref={routes.resources}
              secondaryLabel="Ask a Question"
              secondaryHref={routes.contact}
              onClose={onClose}
              isActive={resourcesActive}
            />

            {/* Thin separator */}
            <div className="h-px bg-border-soft" />

            {/* Highlight link — Track Consultation */}
            <Button
              size="compact"
              variant="primary"
              href={highlightLink.href}
              onClick={onClose}
              className={cn(
                "gap-2 justify-center",
                isActive(highlightLink.href) && "bg-accent-hover ring-2 ring-accent/30"
              )}
            >
              <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-contrast opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent-contrast" />
              </span>
              {highlightLink.label}
            </Button>

            {/* Call Now CTA — compact single-line */}
            <a
              href={callHref}
              onClick={onClose}
              className="flex items-center justify-center gap-2 h-9 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors duration-200 text-[13px] font-semibold"
            >
              <Phone className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>Call {primaryPhone || brandName}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
