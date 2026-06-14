import { ChevronRight, Home } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SmartLink } from "@/exxonim/components/primitives/SmartLink";

/**
 * Breadcrumb navigation component.
 *
 * Renders an accessible `<nav>` with an ordered list of breadcrumb items.
 * Linked items use `text-text-muted hover:text-accent`, the current (last)
 * item is `text-text font-medium` with no link.
 *
 * Supports an optional `icon` on any item — when provided, the icon is
 * rendered instead of the label text. The label is still used for
 * `aria-label` and `title` for accessibility.
 *
 * Usage:
 * ```tsx
 * <Breadcrumb items={[
 *   { label: "Home", href: "/", icon: Home },
 *   { label: "Resources", href: "/resources/" },
 *   { label: "FAQ" },
 * ]} />
 * ```
 */

export interface BreadcrumbItem {
  label: string;
  /** If omitted, the item is treated as the current page (no link). */
  href?: string;
  /** Optional icon — renders instead of the label. Label used for aria/title. */
  icon?: LucideIcon;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  if (!items.length) return null;

  return (
    <nav aria-label="Breadcrumb" className="pt-3 pb-3">
      <ol className="flex items-center flex-wrap gap-1 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const Icon = item.icon;
          const content = Icon ? (
            <Icon className="w-4 h-4" aria-hidden="true" />
          ) : (
            item.label
          );

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
                  title={Icon ? item.label : undefined}
                >
                  {content}
                </span>
              ) : (
                <SmartLink
                  href={item.href}
                  className="text-text-muted hover:text-accent transition-colors inline-flex items-center gap-1"
                  aria-label={Icon ? item.label : undefined}
                  title={Icon ? item.label : undefined}
                >
                  {content}
                </SmartLink>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
