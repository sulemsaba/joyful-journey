import { siteOrigin } from "@/exxonim/seo/constants";

interface StructuredDataProps {
  heroTitle?: string;
  heroDescription?: string;
}

/**
 * Renders JSON-LD structured data (schema.org) for the homepage.
 * Helps search engines understand the organization and content.
 */
export function StructuredData({ heroTitle, heroDescription }: StructuredDataProps) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Exxonim Consult",
    url: siteOrigin,
    description:
      heroDescription ??
      "Business registration, compliance, licensing, and advisory support in Tanzania.",
    slogan:
      "Clarity and follow-through for business setup and compliance.",
    foundingLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: "TZ",
      },
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: "+255794689099",
      email: "info@exxonim.tz",
      url: `${siteOrigin}/contact/`,
    },
    sameAs: [
      "https://x.com/exxonim",
      "https://linkedin.com/company/exxonim",
      "https://instagram.com/exxonim",
    ],
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Exxonim Consult",
    description:
      heroDescription ??
      "Business registration, compliance, licensing, and advisory support in Tanzania.",
    url: siteOrigin,
    telephone: "+255794689099",
    email: "info@exxonim.tz",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Dar es Salaam",
      addressLocality: "Dar es Salaam",
      addressRegion: "Dar es Salaam",
      addressCountry: "TZ",
    },
    geographicArea: {
      "@type": "Place",
      name: "Tanzania",
    },
    serviceType: [
      "Business Registration",
      "Company Incorporation",
      "Tax Registration",
      "Business Licensing",
      "Compliance Advisory",
      "Regulatory Renewals",
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Exxonim Consult",
    url: siteOrigin,
    description: heroTitle ?? "Business setup and compliance support for organizations.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteOrigin}/resources/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteOrigin,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([organization, localBusiness, website, breadcrumb]),
      }}
    />
  );
}
