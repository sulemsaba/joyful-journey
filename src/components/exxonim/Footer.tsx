"use client";

import { MapPin, Mail, Phone, ArrowUp, ArrowRight } from "lucide-react";
import type {
  BrandAssets,
  CompanyInfo,
  FooterContent,
  FooterSocialLink,
  Theme,
} from "@/lib/exxonim-types";
import { Container } from "./Container";

/* ------------------------------------------------------------------ */
/* Social icon SVG paths                                               */
/* ------------------------------------------------------------------ */

const socialIcons: Record<string, { viewBox: string; path: string }> = {
  linkedin: {
    viewBox: "0 0 24 24",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  instagram: {
    viewBox: "0 0 24 24",
    path: "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.882 0 1.441 1.441 0 012.882 0z",
  },
  x: {
    viewBox: "0 0 24 24",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  twitter: {
    viewBox: "0 0 24 24",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  facebook: {
    viewBox: "0 0 24 24",
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  youtube: {
    viewBox: "0 0 24 24",
    path: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
  tiktok: {
    viewBox: "0 0 24 24",
    path: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
  },
};

function SocialIcon({ platform }: { platform: string }) {
  const icon = socialIcons[platform.toLowerCase()];
  if (!icon) return null;
  return (
    <svg
      className="w-5 h-5"
      viewBox={icon.viewBox}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d={icon.path} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Footer component                                                    */
/* ------------------------------------------------------------------ */

interface FooterProps {
  brand: BrandAssets;
  company: CompanyInfo;
  footer: FooterContent;
  theme?: Theme;
}

export function Footer({ brand, company, footer, theme = "light" }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activeSocials = footer.social_links.filter((s) => s.isActive);

  return (
    <footer
      className="relative mt-auto border-t border-border-soft bg-surface"
      role="contentinfo"
    >
      {/* Top decorative gradient border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <Container className="py-12 md:py-16">
        {/* 4-column grid — brand column spans 2 on lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand panel — spans 2 columns on lg for breathing room */}
          <div className="sm:col-span-2 lg:col-span-2">
            <a href="/" className="inline-block mb-4" aria-label={`${brand.name} — home`}>
              <img
                src={brand.lightLogoSrc}
                alt={brand.name}
                className="block h-9 w-auto"
                style={{ display: theme === "light" ? "block" : "none" }}
              />
              <img
                src={brand.darkLogoSrc}
                alt=""
                aria-hidden="true"
                className="block h-9 w-auto"
                style={{ display: theme === "dark" ? "block" : "none" }}
              />
            </a>
            {/* Animated tagline with floating effect */}
            <p className="text-sm text-text-muted leading-relaxed max-w-xs animate-tagline-float">
              {footer.tagline}
            </p>
            {/* Decorative animated line under tagline */}
            <div className="mt-3 h-px w-16 bg-accent/30 origin-left animate-tagline-line" />
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-text mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {footer.quick_links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-text-muted hover:text-accent transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Other Resources */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-text mb-4">
              Other Resources
            </h3>
            <ul className="space-y-2.5">
              {footer.other_resources.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-text-muted hover:text-accent transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-text mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              {company.address && (
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span className="text-sm text-text-muted">{company.address}</span>
                </li>
              )}
              {company.emails[0] && (
                <li>
                  <a
                    href={`mailto:${company.emails[0]}`}
                    className="flex items-start gap-2.5 text-text-muted hover:text-accent transition-colors"
                  >
                    <Mail className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm">{company.emails[0]}</span>
                  </a>
                </li>
              )}
              {company.phones[0] && (
                <li>
                  <a
                    href={`tel:${company.phones[0].replace(/[^0-9+]/g, "")}`}
                    className="flex items-start gap-2.5 text-text-muted hover:text-accent transition-colors"
                  >
                    <Phone className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm">{company.phones[0]}</span>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </Container>

      {/* Newsletter / CTA strip */}
      <div className="border-t border-border-soft bg-accent/5">
        <Container className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-text">Ready to get started?</p>
            <p className="text-xs text-text-muted">Let us help you find the right solution.</p>
          </div>
          <a
            href={footer.primary_cta.href}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-xs font-bold text-accent-contrast shadow-accent-glow transition-all hover:-translate-y-0.5 hover:bg-accent-hover"
          >
            {footer.primary_cta.label}
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </Container>
      </div>

      {/* Bottom bar — more compact */}
      <div className="border-t border-border-soft">
        <Container className="py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Copyright */}
          <p className="text-xs text-text-muted text-center sm:text-left">
            {footer.copyright}
          </p>

          {/* Social links — with hover scale + glow */}
          {activeSocials.length > 0 && (
            <div className="flex items-center gap-3">
              {activeSocials.map((social: FooterSocialLink) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label || social.platform}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-border-soft text-text-muted hover:text-accent hover:border-accent hover:scale-110 hover:shadow-accent-glow transition-all"
                >
                  <SocialIcon platform={social.platform} />
                </a>
              ))}
            </div>
          )}

          {/* Back to top — circular accent button with arrow */}
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-accent/10 text-accent hover:bg-accent hover:text-accent-contrast transition-all"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" aria-hidden="true" />
          </button>
        </Container>
      </div>
    </footer>
  );
}
