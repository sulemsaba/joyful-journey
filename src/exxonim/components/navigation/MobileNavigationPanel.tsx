import { useState, type RefObject } from "react";
import { ChevronDown, Phone, ArrowRight } from "lucide-react";
import { SmartLink } from "@/exxonim/components/primitives/SmartLink";
import type { MenuColumn, MenuItem } from "@/exxonim/components/navigation/types";
import { Button } from "@/exxonim/components/primitives/Button";
import { routes } from "@/exxonim/routes";
import { cn } from "@/exxonim/utils/cn";

/**
 * Mobile navigation panel - dropdown from the traditional full-width bar.
 *
 * LAYOUT:
 * ───────
 * - Phone: full-width panel below the bar, flush left/right
 * - Tablet (md–xl): right-aligned card with max-width 360px,
 *   so it doesn't cover the whole screen
 *
 * FEATURES:
 * ─────────
 * - Scrollable content with overscroll-contain (page doesn't scroll behind)
 * - Custom thin scrollbar
 * - Accordion sub-links with dot indicators and hover arrows
 * - Generous padding and hit targets
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
    <div className="rounded-xl overflow-hidden bg-accent-soft/15 ring-1 ring-accent-soft/20">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "w-full flex items-center justify-between gap-3 px-4 py-3 text-left transition-colors",
          isGroupActive
            ? "bg-accent-soft/25"
            : "hover:bg-accent-soft/20"
        )}
      >
        <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-accent">
          {label}
          {isGroupActive && (
            <span className="ml-1.5 inline-flex items-center px-1.5 py-0.5 rounded-full bg-accent text-accent-contrast text-[0.5rem] font-bold leading-none">
              Active
            </span>
          )}
        </span>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-accent transition-transform duration-300",
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
          <div className="px-3 pb-3 pt-1 grid gap-3">
            {columns.map((column) => (
              <div key={column.title} className="grid gap-1.5">
                <p className="text-[10px] font-bold tracking-wider uppercase text-text-muted px-1">
                  {column.title}
                </p>
                <ul className="grid gap-1">
                  {column.items.map((item) => (
                    <li key={`${item.href}-${item.label}`}>
                      <SmartLink
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "group flex items-center gap-3 px-3 py-2.5 rounded-lg",
                          "text-[13px] font-medium text-text",
                          "hover:bg-accent-soft/25 transition-colors duration-150",
                        )}
                      >
                        <span className="w-1 h-1 rounded-full bg-accent/60 shrink-0 group-hover:bg-accent transition-colors" aria-hidden="true" />
                        <span className="flex-1">{item.label}</span>
                        <ArrowRight className="w-3 h-3 text-text-muted/50 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-150" aria-hidden="true" />
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-accent-soft/25">
              <Button
                size="compact"
                variant="primary"
                href={ctaHref}
                onClick={onClose}
              >
                {ctaLabel}
              </Button>
              <SmartLink
                href={secondaryHref}
                onClick={onClose}
                className="text-[12px] font-medium text-accent hover:underline"
              >
                {secondaryLabel}
              </SmartLink>
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
        /* Show/hide via hidden (no layout animation).
         * The old grid-rows-[0fr→1fr] transition was retired because it
         * forces layout recalculation on every animation frame — on low-end
         * devices this added hundreds of ms to the hamburger INP. */
        `${isOpen ? '' : 'hidden'} relative z-50 md:absolute md:right-0 md:top-full md:w-[360px]`
      )}
    >
      <div className="overflow-hidden">
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          tabIndex={-1}
          className={cn(
            "px-4 pb-5 pt-2 bg-page",
            "md:px-5 md:py-4 md:mt-1 md:rounded-2xl md:shadow-xl md:ring-1 md:ring-border-soft"
          )}
        >
          {/* ── Scrollable content area ──────────────────── */}
          <div
            className={cn(
              "grid gap-2.5 overflow-y-auto overscroll-contain",
              "max-h-[min(70vh,560px)]",
              "pr-1 -mr-1",
              "scrollbar-thin"
            )}
          >
            {/* Regular links: Home, About, Career, Contact */}
            <div className="grid gap-0.5">
              {regularLinks.map((link) => (
                <SmartLink
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center px-4 h-11 rounded-xl text-[15px] font-semibold transition-colors",
                    isActive(link.href)
                      ? "bg-accent text-accent-contrast"
                      : "text-text hover:bg-accent-soft/30"
                  )}
                >
                  {link.label}
                </SmartLink>
              ))}
            </div>

            {/* Thin separator */}
            <div className="h-px bg-accent-soft/30" />

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
            <div className="h-px bg-accent-soft/30" />

            {/* Highlight link - Track Consultation */}
            <Button
              size="compact"
              variant="primary"
              href={highlightLink.href}
              onClick={onClose}
              className={cn(
                "gap-2 justify-center h-11 rounded-xl text-[15px] font-semibold",
                isActive(highlightLink.href) && "bg-accent-hover ring-2 ring-accent/30"
              )}
            >
              <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-contrast opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent-contrast" />
              </span>
              {highlightLink.label}
            </Button>

            {/* Call Now CTA */}
            <SmartLink
              href={callHref}
              onClick={onClose}
              className="flex items-center justify-center gap-2 h-11 rounded-xl bg-accent-soft/20 text-accent hover:bg-accent-soft/30 transition-colors duration-200 text-[15px] font-semibold"
            >
              <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Call {primaryPhone || brandName}</span>
            </SmartLink>
          </div>
        </div>
      </div>
    </div>
  );
}
