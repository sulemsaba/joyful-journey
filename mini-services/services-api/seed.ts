import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Categories
const categories = [
  { name: "Business Setup", slug: "business-setup", sort_order: 1 },
  { name: "Compliance Support", slug: "compliance-support", sort_order: 2 },
  { name: "Work Permits & Foreign Investment", slug: "work-permits-foreign-investment", sort_order: 3 },
  { name: "NGOs & Non-Profits", slug: "ngos-non-profits", sort_order: 4 },
];

// Segments
const segments = [
  { name: "Local Entrepreneurs", slug: "local-entrepreneurs", sortOrder: 1 },
  { name: "Foreign Investors", slug: "foreign-investors", sortOrder: 2 },
  { name: "Enterprises", slug: "enterprises", sortOrder: 3 },
  { name: "NGOs", slug: "ngos", sortOrder: 4 },
];

// Services (15 total) — with deliverablesFull for expandable features
const services = [
  {
    title: "Company Registration",
    slug: "company-registration",
    categorySlug: "business-setup",
    segmentSlugs: ["local-entrepreneurs", "foreign-investors", "enterprises"],
    badge: "Most Popular",
    shortDescription:
      "Legally trade within 5–10 business days. We handle everything from name search to your Certificate of Incorporation.",
    deliverables: [
      "BRELA name search & reservation",
      "Certificate of Incorporation (COI)",
      "TIN Application",
      "Business License Assistance",
    ],
    deliverablesFull: [
      "Company seal production",
      "Shareholder & director register setup",
      "Notarised document package",
      "Bank account introduction support",
    ],
    ctaText: "Get Started →",
    ctaLink: "/contact?service=company-registration",
    sortOrder: 10,
  },
  {
    title: "Business Name Registration",
    slug: "business-name-registration",
    categorySlug: "business-setup",
    segmentSlugs: ["local-entrepreneurs"],
    badge: null,
    shortDescription:
      "Secure your sole proprietorship or trading name through BRELA with minimal paperwork.",
    deliverables: [
      "Sole proprietorship registration",
      "Trading name reservation",
      "BRELA filing confirmation",
      "Digital certificate copy",
    ],
    deliverablesFull: null,
    ctaText: "Get Started →",
    ctaLink: "/contact?service=business-name-registration",
    sortOrder: 20,
  },
  {
    title: "NGO Registration",
    slug: "ngo-registration",
    categorySlug: "business-setup",
    segmentSlugs: ["ngos"],
    badge: "Non-Profit Focus",
    shortDescription:
      "Complete non-profit entity setup, from constitution drafting to initial compliance guidance.",
    deliverables: [
      "NGO entity registration with authorities",
      "Constitution drafting assistance",
      "Initial governance compliance roadmap",
      "Donor-readiness pack",
    ],
    deliverablesFull: [
      "Registration with Ministry of Community Development",
      "Certificate of Registration expedited",
      "Governance policy templates",
    ],
    ctaText: "Get Started →",
    ctaLink: "/contact?service=ngo-registration",
    sortOrder: 30,
  },
  {
    title: "Trademark Registration",
    slug: "trademark-registration",
    categorySlug: "business-setup",
    segmentSlugs: ["local-entrepreneurs", "foreign-investors", "enterprises"],
    badge: "Brand Protection",
    shortDescription:
      "Protect your brand name, logo, or slogan through the BRELA intellectual property office.",
    deliverables: [
      "BRELA trademark availability search",
      "Full trademark application filing",
      "Intellectual property certificate upon registration",
      "10-year renewal tracking",
    ],
    deliverablesFull: null,
    ctaText: "Get Started →",
    ctaLink: "/contact?service=trademark-registration",
    sortOrder: 40,
  },
  {
    title: "TIN Application",
    slug: "tin-application",
    categorySlug: "business-setup",
    segmentSlugs: ["local-entrepreneurs", "foreign-investors", "enterprises"],
    badge: null,
    shortDescription:
      "Get your Tax Identification Number quickly for tax compliance and business operations.",
    deliverables: [
      "TIN application preparation & submission",
      "TRA account setup",
      "E-filing credentials",
      "Tax registration certificate",
    ],
    deliverablesFull: null,
    ctaText: "Get Started →",
    ctaLink: "/contact?service=tin-application",
    sortOrder: 50,
  },
  {
    title: "Business License Applications",
    slug: "business-license-applications",
    categorySlug: "business-setup",
    segmentSlugs: ["local-entrepreneurs", "enterprises"],
    badge: null,
    shortDescription:
      "Securing your sector-specific licence to operate fully and legally.",
    deliverables: [
      "Identification of required licences per sector",
      "Application preparation and submission",
      "Regulatory follow-up and approval tracking",
      "Post-licence compliance briefing",
    ],
    deliverablesFull: null,
    ctaText: "Get Started →",
    ctaLink: "/contact?service=business-license-applications",
    sortOrder: 60,
  },
  {
    title: "Annual Returns",
    slug: "annual-returns",
    categorySlug: "compliance-support",
    segmentSlugs: ["local-entrepreneurs", "enterprises", "ngos"],
    badge: "Deadline-Driven",
    shortDescription:
      "Never miss your BRELA annual return filing again, including beneficial ownership updates.",
    deliverables: [
      "BRELA annual return preparation & filing",
      "Beneficial ownership update submission",
      "Late filing prevention calendar",
      "Electronic filing confirmation",
    ],
    deliverablesFull: [
      "30-day advance reminders",
      "Document audit before submission",
    ],
    ctaText: "Get Started →",
    ctaLink: "/contact?service=annual-returns",
    sortOrder: 70,
  },
  {
    title: "Statutory Filings",
    slug: "statutory-filings",
    categorySlug: "compliance-support",
    segmentSlugs: ["local-entrepreneurs", "enterprises"],
    badge: null,
    shortDescription:
      "PAYE, SDL, WCF, and NSSF filings — all prepared and submitted on schedule.",
    deliverables: [
      "Payroll compliance filing (PAYE, SDL)",
      "WCF contribution filing",
      "NSSF employer return filing",
      "Deadline tracking with advance reminders",
    ],
    deliverablesFull: null,
    ctaText: "Get Started →",
    ctaLink: "/contact?service=statutory-filings",
    sortOrder: 80,
  },
  {
    title: "Regulatory Renewals",
    slug: "regulatory-renewals",
    categorySlug: "compliance-support",
    segmentSlugs: ["local-entrepreneurs", "foreign-investors", "enterprises"],
    badge: "Proactive Tracking",
    shortDescription:
      "Proactive tracking and timely processing of all your licences, permits, and regulatory renewals.",
    deliverables: [
      "Central renewal calendar for all permits",
      "60-, 30-, and 7-day advance reminders",
      "Document re-submission and fee payment coordination",
      "Renewal confirmation and updated certificates",
    ],
    deliverablesFull: null,
    ctaText: "Get Started →",
    ctaLink: "/contact?service=regulatory-renewals",
    sortOrder: 90,
  },
  {
    title: "Operational Advisory",
    slug: "operational-advisory",
    categorySlug: "compliance-support",
    segmentSlugs: ["enterprises"],
    badge: "Enterprise Tier",
    shortDescription:
      "Structured compliance guidance for teams managing multiple obligations across subsidiaries.",
    deliverables: [
      "Dedicated compliance advisor",
      "Document management system access",
      "Quarterly compliance review meetings",
      "Forward-looking compliance strategy",
    ],
    deliverablesFull: null,
    ctaText: "Discuss My Case →",
    ctaLink: "/contact?service=operational-advisory",
    sortOrder: 100,
  },
  {
    title: "Work Permit Applications",
    slug: "work-permit-applications",
    categorySlug: "work-permits-foreign-investment",
    segmentSlugs: ["foreign-investors"],
    badge: "Foreign Investors",
    shortDescription:
      "Hassle-free processing for Class A, Class B, and residence permits. Direct liaison with Ministry of Labour.",
    deliverables: [
      "Pre-application eligibility assessment",
      "Document preparation & legalisation",
      "Direct filing with immigration",
      "Real-time status tracking",
    ],
    deliverablesFull: [
      "Work permit certificate delivery",
      "Renewal coordination",
    ],
    ctaText: "Get Started →",
    ctaLink: "/contact?service=work-permit-applications",
    sortOrder: 110,
  },
  {
    title: "TIC / TISEZA Registration",
    slug: "tic-tiseza-registration",
    categorySlug: "work-permits-foreign-investment",
    segmentSlugs: ["foreign-investors"],
    badge: "Investment Focus",
    shortDescription:
      "Investment centre registration and compliance facilitation for foreign-owned entities.",
    deliverables: [
      "TIC/TISEZA registration application",
      "Sector-specific incentive identification",
      "Investment certificate processing",
      "Ongoing investment compliance tracking",
    ],
    deliverablesFull: null,
    ctaText: "Get Started →",
    ctaLink: "/contact?service=tic-tiseza-registration",
    sortOrder: 120,
  },
  {
    title: "Foreign Company Registration",
    slug: "foreign-company-registration",
    categorySlug: "work-permits-foreign-investment",
    segmentSlugs: ["foreign-investors", "enterprises"],
    badge: null,
    shortDescription:
      "Branch office or subsidiary setup for international businesses entering Tanzania.",
    deliverables: [
      "Certificate of Compliance with BRELA",
      "Cross-border document legalisation",
      "Local directorship arrangement guidance",
      "Post-registration compliance roadmap",
    ],
    deliverablesFull: null,
    ctaText: "Get Started →",
    ctaLink: "/contact?service=foreign-company-registration",
    sortOrder: 130,
  },
  {
    title: "NGO Registration (Enhanced)",
    slug: "ngo-registration-enhanced",
    categorySlug: "ngos-non-profits",
    segmentSlugs: ["ngos"],
    badge: "Donor-Ready",
    shortDescription:
      "Complete NGO setup, registration with all relevant authorities, and a compliance baseline for donor confidence.",
    deliverables: [
      "Registration with Ministry of Community Development",
      "Certificate of Registration",
      "Constitution aligned with NGO Act",
      "Initial governance & reporting framework",
    ],
    deliverablesFull: [
      "Tax exemption certificate guidance",
      "Board minute templates",
    ],
    ctaText: "Get Started →",
    ctaLink: "/contact?service=ngo-registration-enhanced",
    sortOrder: 140,
  },
  {
    title: "Compliance for NGOs",
    slug: "compliance-for-ngos",
    categorySlug: "ngos-non-profits",
    segmentSlugs: ["ngos"],
    badge: null,
    shortDescription:
      "Annual reporting, donor compliance, and governance documentation for established non-profits.",
    deliverables: [
      "Annual activity & financial report preparation",
      "Donor compliance attestation",
      "Board meeting minutes & governance file",
      "Tax exemption certificate renewal support",
    ],
    deliverablesFull: null,
    ctaText: "Get Started →",
    ctaLink: "/contact?service=compliance-for-ngos",
    sortOrder: 150,
  },
];

async function main() {
  console.log("Seeding service catalog...");

  // Clear existing data (in reverse dependency order)
  await prisma.serviceToSegment.deleteMany({});
  await prisma.service.deleteMany({});
  await prisma.serviceSegment.deleteMany({});
  await prisma.serviceCategory.deleteMany({});

  // Create categories
  console.log("Creating categories...");
  const categoryMap: Record<string, string> = {};
  for (const cat of categories) {
    const created = await prisma.serviceCategory.create({
      data: cat,
    });
    categoryMap[cat.slug] = created.id;
    console.log(`  Created category: ${cat.name} (${created.id})`);
  }

  // Create segments
  console.log("Creating segments...");
  const segmentMap: Record<string, string> = {};
  for (const seg of segments) {
    const created = await prisma.serviceSegment.create({
      data: seg,
    });
    segmentMap[seg.slug] = created.id;
    console.log(`  Created segment: ${seg.name} (${created.id})`);
  }

  // Create services
  console.log("Creating services...");
  for (const svc of services) {
    const categoryId = categoryMap[svc.categorySlug];
    if (!categoryId) {
      console.error(`  ERROR: Category not found for slug "${svc.categorySlug}"`);
      continue;
    }

    const segmentIds = svc.segmentSlugs
      .map((slug) => segmentMap[slug])
      .filter(Boolean);

    const created = await prisma.service.create({
      data: {
        title: svc.title,
        slug: svc.slug,
        categoryId,
        badge: svc.badge,
        shortDescription: svc.shortDescription,
        deliverables: JSON.stringify(svc.deliverables),
        deliverablesFull: svc.deliverablesFull ? JSON.stringify(svc.deliverablesFull) : null,
        ctaText: svc.ctaText,
        ctaLink: svc.ctaLink,
        status: "published",
        sortOrder: svc.sortOrder,
        segments: {
          create: segmentIds.map((segmentId) => ({ segmentId })),
        },
      },
    });
    console.log(`  Created service: ${svc.title} (${created.id})`);
  }

  // Verify counts
  const serviceCount = await prisma.service.count();
  const categoryCount = await prisma.serviceCategory.count();
  const segmentCount = await prisma.serviceSegment.count();

  console.log("\n--- Seed Summary ---");
  console.log(`Categories: ${categoryCount}`);
  console.log(`Segments: ${segmentCount}`);
  console.log(`Services: ${serviceCount}`);
  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
