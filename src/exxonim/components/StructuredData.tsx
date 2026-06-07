import { siteOrigin } from "@/exxonim/seo/constants";

interface BreadcrumbItem {
  name: string;
  path?: string;
}

interface StructuredDataProps {
  heroTitle?: string;
  heroDescription?: string;
  /** Page-specific breadcrumbs. First item is always "Home". If omitted, only "Home" is included. */
  breadcrumbs?: BreadcrumbItem[];
  /** Page type for schema.org WebPage. Defaults to "WebPage". */
  pageType?: string;
  /** Page name override. If omitted, uses heroTitle. */
  pageName?: string;
}

/**
 * Renders JSON-LD structured data (schema.org) for any page.
 * Helps search engines understand the organization, services, and content hierarchy.
 *
 * On the homepage, includes Organization, ProfessionalService, WebSite, and BreadcrumbList.
 * On other pages, includes WebPage and page-specific BreadcrumbList.
 */
export function StructuredData({
  heroTitle,
  heroDescription,
  breadcrumbs,
  pageType = "WebPage",
  pageName,
}: StructuredDataProps) {
  const isHome = !breadcrumbs || breadcrumbs.length === 0;
  const schemas: object[] = [];

  /* ── Organization schema (homepage only) ─────────────────── */
  if (isHome) {
    schemas.push({
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
    });

    schemas.push({
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
    });

    schemas.push({
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
    });
  } else {
    /* ── WebPage schema (non-homepage) ──────────────────────── */
    const breadcrumbItems = breadcrumbs ?? [];
    const lastBreadcrumb = breadcrumbItems[breadcrumbItems.length - 1];
    const pageUrl = lastBreadcrumb?.path
      ? `${siteOrigin}${lastBreadcrumb.path}`
      : siteOrigin;

    schemas.push({
      "@context": "https://schema.org",
      "@type": pageType,
      name: pageName ?? heroTitle ?? "Exxonim Consult",
      description: heroDescription ?? "",
      url: pageUrl,
      isPartOf: {
        "@type": "WebSite",
        name: "Exxonim Consult",
        url: siteOrigin,
      },
    });
  }

  /* ── BreadcrumbList schema (all pages) ───────────────────── */
  const breadcrumbEntries = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: siteOrigin,
    },
  ];

  if (breadcrumbs) {
    breadcrumbs.forEach((crumb, index) => {
      breadcrumbEntries.push({
        "@type": "ListItem",
        position: index + 2,
        name: crumb.name,
        ...(crumb.path ? { item: `${siteOrigin}${crumb.path}` } : {}),
      });
    });
  }

  schemas.push({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbEntries,
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemas),
      }}
    />
  );
}
