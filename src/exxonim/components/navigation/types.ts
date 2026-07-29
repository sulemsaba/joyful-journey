export type MenuKey = "services" | "resources";

export type MegaMenuLayout = "split" | "feature";

/** Unified icon type for navigation menu items and feature boxes. */
export type NavIcon =
  | "newspaper"
  | "briefcase"
  | "chat"
  | "compass"
  | "help-circle"
  | "headset"
  | "mail"
  | "building"
  | "receipt"
  | "passport"
  | "clipboard-list"
  | "refresh"
  | "lightbulb"
  | "shield-check";

export interface MenuItem {
  label: string;
  href: string;
  /** Optional one-line description shown below the label in the mega menu.
   *  BACKEND: Max ~50 characters. Longer text will be truncated to 2 lines via line-clamp. */
  description?: string;
  /** Optional icon shown next to the label in the mega menu.
   *  Services items use icons; Resources items do not. */
  icon?: NavIcon;
}

export interface MenuColumn {
  title: string;
  items: MenuItem[];
  /** Whether to show a left border divider (used for the right column in split layout). */
  borderLeft?: boolean;
}

/** Feature box configuration for the "feature" mega menu layout variant.
 *  Renders a solid contrasting callout box on the right side of the dropdown.
 *
 *  DYNAMIC FEATURE BOX:
 *  When hoverFeatureMap is provided, the feature box content changes based on
 *  which menu item is being hovered. The default featureBox is shown when no
 *  item is hovered.
 *
 *  BACKEND / ADMIN NOTE:
 *  The feature box is a highlighted CTA area in the dropdown menu.
 *  Admin should be able to configure the icon, title, description, and CTA link.
 *  If featureBox is undefined, the "split" layout is used instead.
 */
export interface FeatureBox {
  /** Icon name from NavIcon type */
  icon: NavIcon;
  /** Bold heading in the feature box */
  title: string;
  /** Short description text */
  description: string;
  /** CTA button label */
  ctaLabel: string;
  /** CTA button link */
  ctaHref: string;
}

/** Footer CTA row shown below the feature box inside the card (feature layout only).
 *  Thin row with no border, contains a primary button and a secondary text link. */
export interface MenuFooterCta {
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
}

/** Map from menu item href to FeatureBox content.
 *  Used for dynamic feature box that changes on item hover.
 *  Key = item href, Value = FeatureBox to display when that item is hovered. */
export type HoverFeatureMap = Record<string, FeatureBox>;
