import type { SiteSettingFooterValue } from "@/exxonim/types/api";

import type { BrandAssets, CompanyInfo, NavigationItem } from '@/exxonim/types';
import { routes } from "@/exxonim/routes";
/* BACKEND / ADMIN INTEGRATION NOTES:
 * ──────────────────────────────────
 * Asset paths here use Next.js /public/ directory references (string paths).
 * When migrating back to the Vite+React repo, replace these with:
 *   import lightLogo from "@/assets/branding/exxonimLogoLight.webp";
 *   (Vite handles content hashing and dist/ output automatically.)
 *
 * Admin should enforce:
 *   - Light logo: SVG, WebP, or PNG. Min 140×36px, max 280×72px. Aspect ratio ~3.9:1.
 *   - Dark logo: same dimensions. Must be legible on #071518 background.
 *   - Favicon light: 32×32 or 64×64 PNG. Simple design (no fine detail at small size).
 *   - Favicon dark: same. Must be legible on light browser chrome backgrounds.
 *   - All logos should be served via the /media/ API endpoint (admin upload → CDN).
 *     The BrandAssets type in the API response should contain CDN URLs, not /public/ paths.
 */
const lightLogo = "/branding/exxonimLogoLight.webp";
const darkLogo = "/branding/logo-dark.png";
const faviconLight = "/branding/exxonim-favicon-light.png";
const faviconDark = "/branding/exxonim-favicon-dark.png";

/**
 * Shell-level fallback data for navigation, branding, company contact details, and footer links.
 * These values are loaded before page content so the site chrome remains stable during API outages.
 */
const FALLBACK_TIMESTAMP = "fallback";

function createNavigationItem(
  id: number,
  title: string,
  url: string,
  order: number,
  options?: {
    kind?: string;
    parentId?: number | null;
    description?: string;
    children?: NavigationItem[];
  }
): NavigationItem {
  return {
    id,
    title,
    url,
    description: options?.description,
    kind: options?.kind ?? "primary",
    order,
    isActive: true,
    parentId: options?.parentId ?? null,
    createdAt: FALLBACK_TIMESTAMP,
    updatedAt: FALLBACK_TIMESTAMP,
    children: options?.children ?? [],
  };
}

const servicesNavigation = createNavigationItem(100, "Services", routes.services, 3, {
  children: [
    createNavigationItem(110, "Business Setup", routes.services, 1, {
      kind: "group",
      parentId: 100,
      children: [
        createNavigationItem(111, "Company Registration", routes.services, 1, {
          kind: "secondary",
          parentId: 110,
        }),
        createNavigationItem(112, "TIN Application", routes.services, 2, {
          kind: "secondary",
          parentId: 110,
        }),
        createNavigationItem(113, "Business License Applications", routes.services, 3, {
          kind: "secondary",
          parentId: 110,
        }),
      ],
    }),
    createNavigationItem(120, "Compliance Support", routes.services, 2, {
      kind: "group",
      parentId: 100,
      children: [
        createNavigationItem(121, "Statutory Filings", routes.services, 1, {
          kind: "secondary",
          parentId: 120,
        }),
        createNavigationItem(122, "Regulatory Renewals", routes.services, 2, {
          kind: "secondary",
          parentId: 120,
        }),
        createNavigationItem(123, "Operational Advisory", routes.services, 3, {
          kind: "secondary",
          parentId: 120,
        }),
      ],
    }),
  ],
});

const resourcesNavigation = createNavigationItem(
  200,
  "Resources",
  routes.resources,
  4,
  {
    children: [
      createNavigationItem(210, "Guides", routes.resources, 1, {
        kind: "group",
        parentId: 200,
        children: [
          createNavigationItem(211, "Blog", routes.resources, 1, {
            kind: "secondary",
            parentId: 210,
          }),
          createNavigationItem(212, "FAQ", routes.faq, 2, {
            kind: "secondary",
            parentId: 210,
          }),
          createNavigationItem(213, "Support", routes.support, 3, {
            kind: "secondary",
            parentId: 210,
          }),
        ],
      }),
    ],
  }
);

/* BACKEND: The BrandAssets type has a `faviconUrl` field in the API contract
 * (src/shared/contracts/site-settings.ts → SiteSettingBrandValue.favicon_url).
 * When the admin uploads a favicon, this should be served via CDN and the
 * useTheme hook should handle favicon swapping.
 * Currently faviconLight/faviconDark are declared above but not used here —
 * they're used in layout.tsx via <link> tags with prefers-color-scheme media.
 */
export const fallbackBrand: BrandAssets = {
  name: "Exxonim Consult",
  lightLogoSrc: lightLogo,
  darkLogoSrc: darkLogo,
};

/* BACKEND: CompanyInfo powers the "Call Now" CTA, contact page, and footer.
 * Admin should validate:
 *   - phones[]: at least one phone recommended. E.164 preferred ("+255XXXXXXXXX").
 *     The display format can include spaces (e.g., "+255 794 689 099") — the
 *     Navigation and Footer components strip spaces for the tel: href automatically.
 *   - emails[]: at least one email recommended. Valid email format.
 *   - whatsapp: full WhatsApp link (https://wa.me/255794689099). NOT just a phone
 *     number — must be a complete wa.me URL. The WhatsApp floating button only
 *     appears when this field is non-empty.
 *   - address: free text. Used in footer and contact page.
 * When these are empty, the UI degrades gracefully (e.g., CTA shows
 * "Contact Exxonim" instead of "Call Now").
 *
 * Current values are real Exxonim contact details (verified 2026).
 * Admin can update these via the site-settings API when they change.
 */
export const fallbackCompanyInfo: CompanyInfo = {
  name: "Exxonim Consult",
  phones: ["+255 794 689 099", "+255 685 525 224"],
  emails: ["info@exxonim.tz", "md@exxonim.tz"],
  address: "House No. 9, Block H, Mbezi Beach B, Africana, Bagamoyo Road, Dar es Salaam, Tanzania",
  whatsapp: "https://wa.me/255794689099",
};

/* BACKEND / ADMIN INTEGRATION NOTES:
 * ──────────────────────────────────
 * DEPRECATED: Navigation is now managed statically via staticNavigation.ts.
 * This fallbackNavigationItems array is kept for backward compatibility with
 * navigationService.ts (which is also deprecated). The Navigation component
 * now imports directly from staticNavigation.ts.
 *
 * If you need to add/remove/reorder navigation items, edit:
 *   src/exxonim/content/staticNavigation.ts
 *
 * Original notes (for reference if API-driven nav is re-enabled):
 *   Navigation tree structure (3-level hierarchy):
 *     Level 1 (kind="primary"): Top-bar links. `order` controls left→right position.
 *     Level 2 (kind="group"): Dropdown column headers inside a parent.
 *     Level 3 (kind="secondary"): Individual links inside a column.
 *   API contract: see src/shared/contracts/navigation.ts → ApiNavigationItem.
 *   Mapper: see src/utils/contentMappers.ts → mapNavigationItem().
 */
export const fallbackNavigationItems: NavigationItem[] = [
  createNavigationItem(0, "Home", routes.home, 0),
  createNavigationItem(1, "About", routes.about, 1),
  servicesNavigation,
  resourcesNavigation,
  createNavigationItem(5, "Career", routes.career, 5),
  createNavigationItem(6, "Contact", routes.contact, 6),
  createNavigationItem(7, "Track Consultation", routes.trackConsultation, 7),
];

export const fallbackFooter: SiteSettingFooterValue = {
  quick_links: [
    { label: "About", href: routes.about },
    { label: "Services", href: routes.services },
    { label: "Track Consultation", href: routes.trackConsultation },
    { label: "Resources", href: routes.resources },
    { label: "Career", href: routes.career },
    { label: "Contact", href: routes.contact },
  ],
  other_resources: [
    { label: "FAQ", href: routes.faq },
    { label: "Support", href: routes.support },
    { label: "Terms", href: routes.terms },
    { label: "Privacy", href: routes.privacy },
  ],
  tagline:
    "Business consulting for registration, licensing, compliance, and operational advisory — with proactive tracking at every step.",
  primary_cta: {
    label: "Contact Exxonim",
    href: routes.contact,
  },
  social_links: [],
  /* Dynamic year: Footer.tsx replaces {YEAR} with new Date().getFullYear() at render time. */
  copyright: "© {YEAR} Exxonim Company Limited",
};
