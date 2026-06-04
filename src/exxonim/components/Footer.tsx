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
          <path d="M18.9 4H21l-4.59 5.24L21.8 20h-4.78l-3.74-4.89L9 20H6.88l4.91-5.61L6.6 4h4.9l3.38 4.47L18.9 4Zm-.75 14.7h1.33L10.79 5.2H9.36l8.79 13.5Z" />
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

export function Footer({ brand, company: _company, footer }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const copyrightText = footer.copyright.replace("{YEAR}", String(currentYear));
  const socialLinks = footerSocialPlatforms
    .map((platform) =>
      (footer.social_links ?? []).find(
        (link) => link.platform === platform && link.isActive && link.url.trim()
      )
    )
    .filter((link): link is SiteSettingSocialLinkValue => Boolean(link));

  return (
    <footer
      id="site-footer"
      className="relative mt-auto border-t border-accent/20 dark:border-border-soft bg-accent dark:bg-page"
    >
      {/* pb-24 on mobile to clear the floating buttons */}
      <Container className="py-14 pb-24 md:py-20 md:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-10 pb-10 border-b border-accent-contrast/10 dark:border-border-soft">

          {/* Brand Panel */}
          <section className="grid gap-5 content-start">
            <a
              href={routes.home}
              aria-label={`${brand.name} home`}
              className="inline-flex items-center"
            >
              {/* Dark logo — used in both modes since both footer backgrounds are dark */}
              <img
                src={brand.darkLogoSrc}
                alt={brand.name}
                loading="lazy"
                onError={(event) => {
                  const img = event.currentTarget;
                  if (img.dataset.fallbackApplied) return;
                  img.dataset.fallbackApplied = "true";
                  img.src = fallbackBrand.darkLogoSrc;
                }}
                className="block max-w-[10rem] h-auto"
              />
            </a>

            <p
              className="text-accent-contrast/70 dark:text-text-soft text-[0.9375rem] leading-relaxed italic"
              style={{ fontFamily: "'Georgia', 'Times New Roman', 'Palatino', serif" }}
            >
              Where Innovation Meets Efficiency
            </p>

            {/* Follow Us */}
            <div className="grid gap-2.5">
              <h4 className="text-xs font-extrabold tracking-[0.14em] uppercase text-accent-contrast/90 dark:text-text">
                Follow Us
              </h4>
              <div className="flex items-center gap-3">
                {socialLinks.length ? (
                  socialLinks.map((link, index) => (
                    <a
                      key={`${link.platform}-${link.url}-${index}`}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`Follow us on ${link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}`}
                      title={link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}
                      className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-accent-contrast/10 text-accent-contrast/70 hover:text-accent-contrast hover:bg-accent-contrast/20 dark:bg-accent-soft dark:text-accent dark:hover:text-accent-hover dark:hover:bg-accent-soft-strong transition-all duration-200"
                    >
                      <span className="w-5 h-5 flex items-center justify-center">{renderSocialIcon(link.platform)}</span>
                    </a>
                  ))
                ) : (
                  <>
                    {/* X */}
                    <a
                      href="https://x.com/exxonim"
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label="Follow us on X"
                      className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-accent-contrast/10 text-accent-contrast/70 hover:text-accent-contrast hover:bg-accent-contrast/20 dark:bg-accent-soft dark:text-accent dark:hover:text-accent-hover dark:hover:bg-accent-soft-strong transition-all duration-200"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                    {/* LinkedIn */}
                    <a
                      href="https://linkedin.com/company/exxonim"
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label="Follow us on LinkedIn"
                      className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-accent-contrast/10 text-accent-contrast/70 hover:text-accent-contrast hover:bg-accent-contrast/20 dark:bg-accent-soft dark:text-accent dark:hover:text-accent-hover dark:hover:bg-accent-soft-strong transition-all duration-200"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                    {/* Instagram */}
                    <a
                      href="https://instagram.com/exxonim"
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label="Follow us on Instagram"
                      className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-accent-contrast/10 text-accent-contrast/70 hover:text-accent-contrast hover:bg-accent-contrast/20 dark:bg-accent-soft dark:text-accent dark:hover:text-accent-hover dark:hover:bg-accent-soft-strong transition-all duration-200"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2Zm8.37 1.73H7.88A4.15 4.15 0 0 0 3.73 7.88v8.24a4.15 4.15 0 0 0 4.15 4.15h8.24a4.15 4.15 0 0 0 4.15-4.15V7.88a4.15 4.15 0 0 0-4.15-4.15Zm-4.12 3.54A4.73 4.73 0 1 1 7.27 12 4.73 4.73 0 0 1 12 7.27Zm0 1.73A3 3 0 1 0 15 12a3 3 0 0 0-3-3Zm5.02-2.62a1.13 1.13 0 1 1-1.13 1.13 1.13 1.13 0 0 1 1.13-1.13Z" />
                      </svg>
                    </a>
                  </>
                )}
              </div>
              <p className="text-accent-contrast/50 dark:text-text-soft text-sm leading-relaxed">
                Stay connected with Exxonim Consult for the latest updates on business consulting, compliance tips, and career opportunities in Tanzania.
              </p>
            </div>
          </section>

          {/* Navigation */}
          <section>
            <h4 className="text-xs font-extrabold tracking-[0.14em] uppercase text-accent-contrast/90 dark:text-text mb-5">
              Navigation
            </h4>
            <nav aria-label="Footer navigation">
              <ul className="grid gap-3">
                {navigationLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="inline-flex items-center text-accent-contrast/60 dark:text-text-muted text-[0.9375rem] hover:text-accent-contrast dark:hover:text-accent hover:translate-x-0.5 transition-all duration-200 group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-accent-contrast/60 dark:bg-accent rounded-full mr-0 group-hover:mr-2 transition-all duration-200" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </section>

          {/* Resources & Legal */}
          <section>
            <h4 className="text-xs font-extrabold tracking-[0.14em] uppercase text-accent-contrast/90 dark:text-text mb-5">
              Resources &amp; Legal
            </h4>
            <ul className="grid gap-3">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="inline-flex items-center text-accent-contrast/60 dark:text-text-muted text-[0.9375rem] hover:text-accent-contrast dark:hover:text-accent hover:translate-x-0.5 transition-all duration-200 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-accent-contrast/60 dark:bg-accent rounded-full mr-0 group-hover:mr-2 transition-all duration-200" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {/* Contact Us */}
          <section>
            <h4 className="text-xs font-extrabold tracking-[0.14em] uppercase text-accent-contrast/90 dark:text-text mb-5">
              Contact Us
            </h4>
            <ul className="grid gap-4">
              {/* Location */}
              <li className="flex items-start gap-3">
                <svg className="w-[1.125rem] h-[1.125rem] mt-0.5 shrink-0 text-accent-contrast/50 dark:text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="text-accent-contrast/60 dark:text-text-muted text-[0.9375rem] leading-relaxed">
                  Mbezi Beach B, Africana, Bagamoyo Road, Block no H, House number 9, Dar es Salaam
                </span>
              </li>
              {/* Emails */}
              <li className="flex items-start gap-3">
                <svg className="w-[1.125rem] h-[1.125rem] mt-0.5 shrink-0 text-accent-contrast/50 dark:text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <div className="grid gap-1">
                  <a href="mailto:info@exxonim.tz" className="text-accent-contrast/60 dark:text-text-muted text-[0.9375rem] hover:text-accent-contrast dark:hover:text-accent transition-colors duration-200">
                    info@exxonim.tz
                  </a>
                  <a href="mailto:md@exxonim.tz" className="text-accent-contrast/60 dark:text-text-muted text-[0.9375rem] hover:text-accent-contrast dark:hover:text-accent transition-colors duration-200">
                    md@exxonim.tz
                  </a>
                </div>
              </li>
              {/* Phone numbers */}
              <li className="flex items-start gap-3">
                <svg className="w-[1.125rem] h-[1.125rem] mt-0.5 shrink-0 text-accent-contrast/50 dark:text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <div className="grid gap-1">
                  <a href="tel:+255794689099" className="text-accent-contrast/60 dark:text-text-muted text-[0.9375rem] hover:text-accent-contrast dark:hover:text-accent transition-colors duration-200">
                    +255 794 689 099
                  </a>
                  <a href="tel:+255685525224" className="text-accent-contrast/60 dark:text-text-muted text-[0.9375rem] hover:text-accent-contrast dark:hover:text-accent transition-colors duration-200">
                    +255 685 525 224
                  </a>
                </div>
              </li>
            </ul>
          </section>

        </div>

        {/* Bottom — copyright */}
        <p className="text-accent-contrast/40 dark:text-text-soft text-sm text-center">
          {copyrightText}
        </p>
      </Container>
    </footer>
  )
}
