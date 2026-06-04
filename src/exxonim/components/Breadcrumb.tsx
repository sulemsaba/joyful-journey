import { ChevronRight } from "lucide-react";

/**
 * Breadcrumb navigation component.
 *
 * Renders an accessible `<nav>` with an ordered list of breadcrumb items.
 * Linked items use `text-text-muted hover:text-accent`, the current (last)
 * item is `text-text font-medium` with no link.
 *
 * Usage:
 * ```tsx
 * <Breadcrumb items={[
 *   { label: "Resources", href: "/resources/" },
 *   { label: "FAQ" },
 * ]} />
 * ```
 */

export interface BreadcrumbItem {
  label: string;
  /** If omitted, the item is treated as the current page (no link). */
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  if (!items.length) return null;

  return (
    <nav aria-label="Breadcrumb" className="py-3">
      <ol className="flex items-center flex-wrap gap-1 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-1">
              {index > 0 && (
                <ChevronRight
                  className="w-3.5 h-3.5 text-text-muted shrink-0"
                  aria-hidden="true"
                />
              )}

              {isLast || !item.href ? (
                <span
                  className="text-text font-medium"
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  className="text-text-muted hover:text-accent transition-colors"
                >
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
