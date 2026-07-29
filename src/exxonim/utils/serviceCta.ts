/**
 * Service → Contact-form bridge.
 * ──────────────────────────────
 * When a visitor clicks "Get Started" on a service card (or a service detail
 * page), we already know which service they want. These helpers make that
 * intent survive the trip to /contact:
 *
 *   1. `contactLinkWithService()` guarantees a contact CTA carries
 *      `?service=<slug>` — even if the catalog's stored `cta_link` was edited
 *      down to a bare "/contact".
 *   2. `resolveServiceContext()` reads that slug back on the contact page and
 *      returns a human label ("Company Registration") + the coarse support-area
 *      code the form's "Primary support area" select understands.
 */

import { fallbackServices } from '@/exxonim/content/fallbackServiceCatalog';

/** The 5 "Primary support area" codes the contact form + backend accept. */
export type SupportAreaCode =
  | 'general_consultation'
  | 'registration'
  | 'licensing'
  | 'tax_returns'
  | 'compliance';

/**
 * Catalog slug → the closest support-area bucket. The catalog has ~15 services
 * but the form only offers 5 buckets, so several slugs collapse onto one code.
 * Unknown slugs (e.g. a brand-new service from the live API) fall back to
 * 'general_consultation'.
 */
const SLUG_TO_SUPPORT_AREA: Record<string, SupportAreaCode> = {
  'company-registration': 'registration',
  'business-name-registration': 'registration',
  'ngo-registration': 'registration',
  'trademark-registration': 'registration',
  'tin-application': 'registration',
  'tic-registration': 'registration',
  'foreign-company-reg': 'registration',
  'ngo-registration-enhanced': 'registration',
  'business-license': 'licensing',
  'work-permit': 'licensing',
  'annual-returns': 'compliance',
  'statutory-filings': 'compliance',
  'regulatory-renewals': 'compliance',
  'operational-advisory': 'compliance',
  'ngo-compliance': 'compliance',
};

/** slug → catalog title, for a friendly banner label without a network round-trip. */
const SLUG_TO_TITLE: Record<string, string> = Object.fromEntries(
  fallbackServices.map((s) => [s.slug, s.title]),
);

/** "company-registration" → "Company Registration" (fallback when slug is unknown). */
function titleCaseSlug(slug: string): string {
  return slug
    .split(/[-_]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

/**
 * Ensure a service's contact CTA carries `?service=<slug>` so the contact form
 * can pre-select it. Leaves `tel:`/`mailto:`/external links and non-contact
 * internal links untouched, and never double-appends the param.
 */
export function contactLinkWithService(
  ctaLink: string | null | undefined,
  slug: string | null | undefined,
): string {
  const base = (ctaLink && ctaLink.trim()) || '/contact';
  if (!slug) return base;

  const path = base.split(/[?#]/)[0];
  const isContact = path === '/contact' || path === '/contact/';
  if (!isContact) return base;
  if (/[?&]service=/.test(base)) return base;

  const sep = base.includes('?') ? '&' : '?';
  return `${base}${sep}service=${encodeURIComponent(slug)}`;
}

export interface ServiceContext {
  slug: string;
  /** Human-readable title for the banner + message pre-fill. */
  label: string;
  /** Closest "Primary support area" the form/backend understands. */
  supportArea: SupportAreaCode;
}

/**
 * Resolve a `?service=<slug>` value into the label + support-area code the
 * contact form uses. Returns null for an empty/whitespace slug.
 */
export function resolveServiceContext(
  slug: string | null | undefined,
): ServiceContext | null {
  if (!slug || !slug.trim()) return null;
  const clean = slug.trim();
  return {
    slug: clean,
    label: SLUG_TO_TITLE[clean] ?? titleCaseSlug(clean),
    supportArea: SLUG_TO_SUPPORT_AREA[clean] ?? 'general_consultation',
  };
}
