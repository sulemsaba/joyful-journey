import type { SiteSettingFooterValue } from "@/exxonim/types/api";

import type { BrandAssets, CompanyInfo } from '@/exxonim/types';
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

/**
 * Shell-level fallback data for branding, company contact details, and footer links.
 * These values are loaded before page content so the site chrome remains stable during API outages.
 *
 * NOTE: Navigation is now managed statically via staticNavigation.ts.
 * The old fallbackNavigationItems array and related helpers have been removed.
 */
const FALLBACK_TIMESTAMP = "fallback";

/* BACKEND: The BrandAssets type has a `faviconUrl` field in the API contract
 * (src/shared/contracts/site-settings.ts → SiteSettingBrandValue.favicon_url).
 * When the admin uploads a favicon, this should be served via CDN and the
 * useTheme hook should handle favicon swapping.
 * Currently favicons are wired in index.html via <link> tags with
 * prefers-color-scheme media, pointing at the two surviving brand assets
 * (exxonimLogoLight.webp / logo-dark.png). When admin uploads a real favicon,
 * useTheme.ts will swap those <link> hrefs to the CDN URL.
 */
export const fallbackBrand: BrandAssets = {
  name: "Exxonim Consult",
  lightLogoSrc: lightLogo,
  darkLogoSrc: darkLogo,
};

/* BACKEND: CompanyInfo powers the "Call Now" CTA, contact page, and footer.
 * Admin should validate:
 *   - phones[]: at least one phone recommended. E.164 preferred ("+255XXXXXXXXX").
 *     The display format can include spaces (e.g., "+255 794 689 099") - the
 *     Navigation and Footer components strip spaces for the tel: href automatically.
 *   - emails[]: at least one email recommended. Valid email format.
 *   - whatsapp: full WhatsApp link (https://wa.me/255794689099). NOT just a phone
 *     number - must be a complete wa.me URL. The WhatsApp floating button only
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
  ],
  tagline:
    "Business consulting for registration, licensing, compliance, and operational advisory - with proactive tracking at every step.",
  primary_cta: {
    label: "Contact Exxonim",
    href: routes.contact,
  },
  social_links: [],
  /* Dynamic year: Footer.tsx replaces {YEAR} with new Date().getFullYear() at render time. */
  copyright: "© {YEAR} Exxonim Company Limited",
};
