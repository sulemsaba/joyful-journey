import { Container } from './primitives/Container'
import { routes } from '@/exxonim/routes'
import { fallbackBrand } from '@/exxonim/content/fallbackShell'
import type { BrandAssets, CompanyInfo } from '@/exxonim/types'
import type { SiteSettingFooterValue, SiteSettingSocialLinkValue } from '@/exxonim/types/api'

const footerSocialPlatforms: SiteSettingSocialLinkValue["platform"][] = [
  "x",
  "linkedin",
  "instagram",
];

function renderSocialIcon(platform: SiteSettingSocialLinkValue["platform"]) {
  switch (platform) {
    case "instagram":
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2Zm8.37 1.73H7.88A4.15 4.15 0 0 0 3.73 7.88v8.24a4.15 4.15 0 0 0 4.15 4.15h8.24a4.15 4.15 0 0 0 4.15-4.15V7.88a4.15 4.15 0 0 0-4.15-4.15Zm-4.12 3.54A4.73 4.73 0 1 1 7.27 12 4.73 4.73 0 0 1 12 7.27Zm0 1.73A3 3 0 1 0 15 12a3 3 0 0 0-3-3Zm5.02-2.62a1.13 1.13 0 1 1-1.13 1.13 1.13 1.13 0 0 1 1.13-1.13Z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.94 8.5A1.69 1.69 0 1 0 6.9 5.12a1.69 1.69 0 0 0 .04 3.38ZM5.47 18.88h2.86V9.72H5.47v9.16Zm4.46 0h2.85v-5.11c0-1.35.26-2.66 1.93-2.66 1.65 0 1.67 1.54 1.67 2.75v5.02h2.86v-5.61c0-2.76-.59-4.88-3.82-4.88-1.55 0-2.58.85-3.01 1.65h-.04V9.72H9.93c.04.73 0 9.16 0 9.16Z" />
        </svg>
      );
    case "x":
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    default:
      return null;
  }
}

interface FooterProps {
  brand: BrandAssets;
  company: CompanyInfo;
  footer: SiteSettingFooterValue;
}

const navigationLinks = [
  { label: "About", href: routes.about },
  { label: "Services", href: routes.services },
  { label: "Track Consultation", href: routes.trackConsultation },
  { label: "Careers", href: routes.career },
];

const resourceLinks = [
  { label: "Resources", href: routes.resources },
  { label: "FAQ", href: routes.faq },
  { label: "Support", href: routes.support },
  { label: "Privacy Policy", href: routes.privacy },
  { label: "Terms of Service", href: routes.terms },
];

/* ── Social circle link ── */
function SocialCircleLink({ platform, url }: { platform: string; url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={`Follow us on ${platform.charAt(0).toUpperCase() + platform.slice(1)}`}
      title={platform.charAt(0).toUpperCase() + platform.slice(1)}
      className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-footer-border text-footer-text-muted hover:text-footer-heading hover:bg-footer-border transition-all duration-200"
    >
      <span className="w-3.5 h-3.5 flex items-center justify-center">
        {renderSocialIcon(platform as SiteSettingSocialLinkValue["platform"])}
      </span>
    </a>
  );
}

/* ── Link item with hover dot animation ── */
function FooterLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center py-1 text-footer-text text-[0.8rem] sm:text-[0.875rem] hover:text-footer-heading hover:translate-x-0.5 transition-all duration-200 group"
    >
      <span className="w-0 group-hover:w-2 h-0.5 bg-footer-heading rounded-full mr-0 group-hover:mr-2 transition-all duration-200" />
      {label}
    </a>
  );
}

export function Footer({ brand, company: _company, footer: _footer }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const socialLinks = footerSocialPlatforms
    .map((platform) =>
      (_footer.social_links ?? []).find(
        (link) => link.platform === platform && link.isActive && link.url.trim()
      )
    )
    .filter((link): link is SiteSettingSocialLinkValue => Boolean(link));

  const fallbackSocials = [
    { platform: "x", url: "https://x.com/exxonim" },
    { platform: "linkedin", url: "https://linkedin.com/company/exxonim" },
    { platform: "instagram", url: "https://instagram.com/exxonim" },
  ];
  const activeSocials = socialLinks.length > 0
    ? socialLinks.map((l) => ({ platform: l.platform, url: l.url }))
    : fallbackSocials;

  return (
    <footer
      id="site-footer"
      className="relative mt-auto border-t border-footer-border bg-footer-bg"
    >
      <Container className="py-8 pb-[4.5rem] md:py-12 md:pb-10">
        {/* ── True 2×2 grid on mobile → 4-col on desktop ──
         *  Row 1: Brand        | Navigation
         *  Row 2: Resources    | Contact
         *  No section spans full width — every column equal
         */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6 lg:gap-8 mb-6 pb-6 border-b border-footer-border">

          {/* Brand Panel */}
          <section className="grid gap-2.5 content-start">
            <a
              href={routes.home}
              aria-label={`${brand.name} home`}
              className="inline-flex items-center"
            >
              <img
                src={brand.darkLogoSrc}
                alt={brand.name}
                width={160}
                height={44}
                loading="lazy"
                onError={(event) => {
                  const img = event.currentTarget;
                  if (img.dataset.fallbackApplied) return;
                  img.dataset.fallbackApplied = "true";
                  img.src = fallbackBrand.darkLogoSrc;
                }}
                className="block h-8 sm:h-11 w-auto"
              />
            </a>

            <p
              className="text-footer-text-muted text-xs sm:text-sm leading-relaxed italic"
              style={{ fontFamily: "'Georgia', 'Times New Roman', 'Palatino', serif" }}
            >
              Where Innovation Meets Efficiency
            </p>

            <div className="flex items-center gap-2">
              {activeSocials.map((s) => (
                <SocialCircleLink key={s.platform} platform={s.platform} url={s.url} />
              ))}
            </div>
          </section>

          {/* Navigation */}
          <section>
            <h4 className="text-xs font-extrabold tracking-[0.14em] uppercase text-footer-heading mb-2">
              Navigation
            </h4>
            <nav aria-label="Footer navigation">
              <ul className="grid gap-0">
                {navigationLinks.map((link) => (
                  <li key={link.label}>
                    <FooterLink label={link.label} href={link.href} />
                  </li>
                ))}
              </ul>
            </nav>
          </section>

          {/* Resources & Legal */}
          <section>
            <h4 className="text-xs font-extrabold tracking-[0.14em] uppercase text-footer-heading mb-2">
              Resources &amp; Legal
            </h4>
            <ul className="grid gap-0">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <FooterLink label={link.label} href={link.href} />
                </li>
              ))}
            </ul>
          </section>

          {/* Contact Us — same column treatment as Nav & Resources */}
          <section>
            <h4 className="text-xs font-extrabold tracking-[0.14em] uppercase text-footer-heading mb-2">
              Contact Us
            </h4>
            <ul className="grid gap-2">
              {/* Location */}
              <li className="flex items-start gap-2">
                <svg className="w-3.5 h-3.5 mt-0.5 shrink-0 text-footer-text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="text-footer-text text-[0.75rem] sm:text-[0.875rem] leading-relaxed">
                  Mbezi Beach B, Dar es Salaam
                </span>
              </li>
              {/* Emails */}
              <li className="flex items-start gap-2">
                <svg className="w-3.5 h-3.5 mt-0.5 shrink-0 text-footer-text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <div className="grid gap-0.5">
                  <a href="mailto:info@exxonim.tz" className="text-footer-text text-[0.75rem] sm:text-[0.875rem] hover:text-footer-heading transition-colors duration-200">
                    info@exxonim.tz
                  </a>
                  <a href="mailto:md@exxonim.tz" className="text-footer-text text-[0.75rem] sm:text-[0.875rem] hover:text-footer-heading transition-colors duration-200">
                    md@exxonim.tz
                  </a>
                </div>
              </li>
              {/* Phone numbers */}
              <li className="flex items-start gap-2">
                <svg className="w-3.5 h-3.5 mt-0.5 shrink-0 text-footer-text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <div className="grid gap-0.5">
                  <a href="tel:+255794689099" className="text-footer-text text-[0.75rem] sm:text-[0.875rem] hover:text-footer-heading transition-colors duration-200">
                    +255 794 689 099
                  </a>
                  <a href="tel:+255685525224" className="text-footer-text text-[0.75rem] sm:text-[0.875rem] hover:text-footer-heading transition-colors duration-200">
                    +255 685 525 224
                  </a>
                </div>
              </li>
            </ul>
          </section>
        </div>

        {/* Copyright & Credit — left-aligned + right-pad on mobile to avoid floating-button overlap */}
        <div className="text-left pr-16 md:pr-0 md:text-center grid gap-0.5">
          <p className="text-footer-text-muted text-xs sm:text-sm">
            © {currentYear} Exxonim Company Limited
          </p>
          <p className="text-footer-text-muted text-[0.65rem] sm:text-xs">
            Designed &amp; Built by{' '}
            <a
              href="https://exxonim.tz"
              target="_blank"
              rel="noreferrer noopener"
              className="text-footer-text hover:text-footer-heading transition-colors duration-200"
            >
              exxonim.tz
            </a>
          </p>
        </div>
      </Container>
    </footer>
  )
}
