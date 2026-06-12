import { useState, type RefObject } from "react";
import { ChevronDown, Phone } from "lucide-react";
import type { MenuColumn, MenuItem } from "@/exxonim/components/navigation/types";
import { Button } from "@/exxonim/components/primitives/Button";
import { routes } from "@/exxonim/routes";
import { cn } from "@/exxonim/utils/cn";
import { ThemeToggle } from "@/exxonim/components/navigation/ThemeToggle";
import type { Theme } from "@/exxonim/types";

/**
 * Mobile navigation panel — expanding section inside the floating pill.
 *
 * MOBIN-INSPIRED PATTERN:
 *   Instead of a separate overlay or side drawer, this panel is rendered
 *   INSIDE the pill's <header>. When isOpen=true, it expands downward
 *   with a smooth grid-rows animation. The frosted glass effect comes
 *   from the parent pill's backdrop-filter: blur(48px).
 *
 * CONTENT (unchanged from previous version):
 *   [Home] [About] [Career] [Contact] (regular links)
 *   ── separator ──
 *   [Services ▼ accordion]
 *   [Resources ▼ accordion]
 *   ── separator ──
 *   [● Track Consultation] (highlighted)
 *   [Theme Toggle]
 *   [Call Now CTA]
 *
 * STYLING:
 *   - No border, no white card — the frosted pill IS the container
 *   - Links are larger and more spacious (Mobbin uses 20px/600 weight)
 *   - Accordion sections blend into the pill naturally
 *   - Separator lines are subtle (accent-soft opacity)
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
  theme: Theme;
  onToggleTheme: () => void;
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
    <div className="rounded-xl overflow-hidden bg-accent-soft/20">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "w-full flex items-center justify-between gap-3 px-4 py-2.5 text-left transition-colors",
          isGroupActive
            ? "bg-accent-soft/30"
            : "hover:bg-accent-soft/20"
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
            "w-3.5 h-3.5 text-accent transition-transform duration-300",
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
          <div className="px-4 pb-3 pt-0.5 grid gap-3">
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
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-accent-soft/30">
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
  theme,
  onToggleTheme,
}: MobileNavigationPanelProps) {
  return (
    <div
      id={id}
      aria-hidden={!isOpen}
      className={cn(
        "grid transition-all duration-300 ease-[cubic-bezier(0.25,0.4,0.25,1)]",
        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      )}
    >
      <div className="overflow-hidden">
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          tabIndex={-1}
          className="px-5 pb-5 pt-1"
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
                    "flex items-center px-4 h-11 rounded-xl text-[15px] font-semibold transition-colors",
                    isActive(link.href)
                      ? "bg-accent text-accent-contrast"
                      : "text-text hover:bg-accent-soft/30"
                  )}
                >
                  {link.label}
                </a>
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

            {/* Highlight link — Track Consultation */}
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

            {/* Theme toggle */}
            <div className="flex items-center justify-center py-1">
              <ThemeToggle theme={theme} onToggleTheme={onToggleTheme} />
            </div>

            {/* Call Now CTA */}
            <a
              href={callHref}
              onClick={onClose}
              className="flex items-center justify-center gap-2 h-11 rounded-xl bg-accent-soft/20 text-accent hover:bg-accent-soft/30 transition-colors duration-200 text-[15px] font-semibold"
            >
              <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Call {primaryPhone || brandName}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
