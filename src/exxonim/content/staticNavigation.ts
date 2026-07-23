/**
 * Static navigation configuration for the Exxonim public website.
 *
 * BACKEND / ADMIN INTEGRATION NOTES (FastAPI + PostgreSQL):
 * ─────────────────────────────────────────────────────────────
 * Navigation is HARDCODED and does NOT require API calls.
 * To add, remove, or reorder navigation items, edit this file and redeploy.
 *
 * In a future phase, if the admin panel needs to manage navigation dynamically,
 * the FastAPI backend should expose a GET /navigation endpoint that returns a
 * structure matching the types used here (MenuItem, MenuColumn, FeatureBox),
 * and the Navigation component can be updated to fetch from that API with this
 * config as the fallback. See the deprecated navigationService.ts for the
 * previous API integration pattern.
 *
 * Guidelines for nav structure:
 * ─────────────────────────────
 * - Max 4–5 regular links (leftLinks + rightLinks combined) to avoid overflow
 *   on desktop. The nav pill uses `hidden xl:flex` so it only shows on ≥1280px.
 * - Max 2 dropdown groups per menu (Services, Resources).
 * - Max 5 items per dropdown group (keeps dropdowns compact).
 * - Dropdown item `href` values should point to valid routes defined in routes.ts
 *   OR be valid external URLs (https://...).
 * - The `highlightLink` is for the primary differentiator service. It renders
 *   with a distinctive accent-colored pill and animated indicator dot so it
 *   stands out from regular links.
 * - When adding a new page route, also update:
 *     1. routes.ts - add the route constant
 *     2. src/exxonim/pages/ - create the page component
 *     3. src/exxonim/app/App.tsx - add the static route entry
 *   The admin UI should warn that new routes require a code deploy.
 *
 * MEGA MENU LAYOUT:
 * ─────────────────
 * Each dropdown supports two layout variants:
 *   - "split"  → 50/50 two-column grid, both sides contain link items
 *   - "feature" → 60/40 grid, left side has items, right side has a
 *                 solid contrasting feature box (CTA card)
 *
 * DYNAMIC FEATURE BOX (Resources):
 * ────────────────────────────────
 * The Resources dropdown has a feature box that changes content based on
 * which menu item is hovered. The hoverFeatureMap maps each item's href
 * to a FeatureBox configuration. When no item is hovered, the default
 * resourcesFeatureBox is shown.
 *
 * BACKEND: To make menu content dynamic, create a `navigation_menus` table:
 *   TABLE navigation_menus (
 *     id            SERIAL PRIMARY KEY,
 *     key           VARCHAR(50) UNIQUE NOT NULL,  -- 'services' | 'resources'
 *     layout        VARCHAR(20) NOT NULL DEFAULT 'split',  -- 'split' | 'feature'
 *     columns       JSONB NOT NULL,       -- Array of MenuColumn objects
 *     feature_box   JSONB,                -- FeatureBox object or NULL
 *     updated_at    TIMESTAMPTZ DEFAULT NOW()
 *   );
 */

import { routes } from "@/exxonim/routes";
import type { FeatureBox, HoverFeatureMap, MegaMenuLayout, MenuColumn, MenuFooterCta, MenuItem } from "@/exxonim/components/navigation/types";

export const staticNav = {
  /** Links rendered before the dropdown menus (left side of nav pill) */
  leftLinks: [
    { label: "Home", href: routes.home },
    { label: "About", href: routes.about },
  ] as MenuItem[],

  /* ═══════════════════════════════════════════════════════════
   * SERVICES MEGA MENU - Split layout (50/50)
   * ═══════════════════════════════════════════════════════════
   *
   * BACKEND: These reflect Exxonim's 5 core service areas:
   *   1. Entity Setup & Registration
   *   2. Tax & Licensing
   *   3. Work Permits & Immigration
   *   4. Compliance & Statutory Filings
   *   5. Operational Advisory
   *
   * Split into 2 columns for the split layout:
   *   Column 1 - Registration & Setup (3 items, WITH icons)
   *   Column 2 - Compliance & Operations (3 items, WITH icons)
   */
  servicesLayout: "split" as MegaMenuLayout,
  servicesColumns: [
    {
      title: "Registration & Setup",
      items: [
        {
          label: "Entity Registration",
          href: `${routes.services}company-registration/`,
          description: "Company, NGO, and business name registration",
          icon: "building" as const,
        },
        {
          label: "Licensing ",
          href: `${routes.services}tin-application/`,
          description: "TIN, and business licence applications & Update",
          icon: "receipt" as const,
        },
        {
          label: "Work Permits",
          href: `${routes.services}work-permit/`,
          description: "Foreign investor and work permit processing",
          icon: "passport" as const,
        },
      ],
    },
    {
      title: "Compliance & Operations",
      borderLeft: true,
      items: [
        {
          label: "Statutory Filings",
          href: `${routes.services}statutory-filings/`,
          description: "Recurring filing obligations on schedule",
          icon: "clipboard-list" as const,
        },
        {
          label: "Regulatory Renewals",
          href: `${routes.services}regulatory-renewals/`,
          description: "Proactive tracking and timely renewals",
          icon: "refresh" as const,
        },
        {
          label: "Operational Advisory",
          href: `${routes.services}operational-advisory/`,
          description: "Structured guidance for managing obligations",
          icon: "compass" as const,
        },
      ],
    },
  ] as MenuColumn[],
  servicesFeatureBox: undefined as FeatureBox | undefined,

  /* ═══════════════════════════════════════════════════════════
   * RESOURCES MEGA MENU - Feature layout (60/40)
   * ═══════════════════════════════════════════════════════════
   *
   * Left side (7 cols): Two sections of links - "Learn" and "Get Help"
   *   - NO icons on items (clean, minimal)
   *   - Items trigger dynamic feature box on hover
   * Right side (5 cols): Feature box CTA card
   *   - Content changes based on which item is hovered
   *   - Default: "Latest insights" (Blog)
   * Below feature box: Footer CTA row (thin, no border)
   */
  resourcesLayout: "feature" as MegaMenuLayout,
  resourcesColumns: [
    {
      title: "Learn",
      items: [
        {
          label: "Blog",
          href: routes.blog,
          description: "Practical guides and compliance updates",
        },
        {
          label: "FAQ",
          href: routes.faq,
          description: "Common registration and compliance questions",
        },
      ],
    },
    {
      title: "Get Help",
      borderLeft: true,
      items: [
        {
          label: "Support",
          href: routes.support,
          description: "Get help from the Exxonim team",
        },
        {
          label: "Contact Us",
          href: routes.contact,
          description: "Reach out for personalised guidance",
        },
      ],
    },
  ] as MenuColumn[],

  /** Default feature box - shown when no item is hovered */
  resourcesFeatureBox: {
    icon: "newspaper",
    title: "Latest insights",
    description: "Practical compliance updates and registration walkthroughs.",
    ctaLabel: "Browse all resources",
    ctaHref: routes.resources,
  } as FeatureBox,

  /** Dynamic feature box content - changes based on hovered item.
   *  Key = item href, Value = FeatureBox to display.
   *  When an item is hovered, the feature box fades to its mapped content.
   *  When no item is hovered, falls back to resourcesFeatureBox. */
  resourcesHoverFeatureMap: {
    [routes.blog]: {
      icon: "newspaper",
      title: "Latest insights",
      description: "Practical guides and compliance updates.",
      ctaLabel: "Read the blog",
      ctaHref: routes.blog,
    },
    [routes.faq]: {
      icon: "help-circle",
      title: "Common questions",
      description: "Quick answers to registration and compliance topics.",
      ctaLabel: "View all FAQs",
      ctaHref: routes.faq,
    },
    [routes.support]: {
      icon: "headset",
      title: "Get help",
      description: "Connect with the Exxonim team for guidance.",
      ctaLabel: "Go to support",
      ctaHref: routes.support,
    },
    [routes.contact]: {
      icon: "mail",
      title: "Reach out",
      description: "Personalised guidance for your business needs.",
      ctaLabel: "Contact us",
      ctaHref: routes.contact,
    },
  } as HoverFeatureMap,

  /** Footer CTA row below the feature box (Resources only).
   *  Thin row with no border, inside the card. */
  resourcesFooterCta: {
    primaryLabel: "Browse Resources",
    primaryHref: routes.resources,
    secondaryLabel: "Ask a Question",
    secondaryHref: routes.contact,
  } as MenuFooterCta,

  /** Links rendered after the dropdown menus (right side of nav pill) */
  rightLinks: [
    { label: "Career", href: routes.career },
    { label: "Contact", href: routes.contact },
  ] as MenuItem[],

  /**
   * Prominent highlighted link - Track Consultation is Exxonim's CORE DIFFERENTIATOR.
   *
   * This is not just another service - it's the automated tracking system that
   * sets Exxonim apart from every competitor in Tanzania. No other consultancy
   * advertises proactive client updates or application tracking.
   *
   * How it works:
   *   - Every engagement gets a unique tracking number (e.g., EXX-24091).
   *   - At every milestone, the system sends proactive updates via WhatsApp,
   *     email, or SMS - the client chooses their preferred channel.
   *   - The client never needs to call to ask "What's happening?"
   *   - No login, no dashboard - just enter a tracking number on the website
   *     for an instant status lookup.
   *
   * BACKEND: If the admin renames or re-points this link in the future,
   * update the label and href here. The visual treatment (accent pill + dot)
   * is hardcoded in DesktopNavigation.tsx and MobileNavigationPanel.tsx.
   */
  highlightLink: {
    label: "Track Consultation",
    href: routes.trackConsultation,
  } as MenuItem,
};
