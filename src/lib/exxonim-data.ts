/**
 * Fallback content data for the Exxonim public website.
 *
 * This is the offline resilience layer — when the FastAPI backend is
 * unavailable, the site uses these fallback values. This is a core
 * architectural pattern: every piece of content that would normally come
 * from the API has a local default so the site never shows blank areas.
 */

import type {
  BrandAssets,
  CompanyInfo,
  NavigationItem,
  FooterContent,
  HomePageContent,
  AboutPageContent,
  ServicesPageContent,
  CareerPageContent,
  ContactPageContent,
  FaqPageContent,
  ResourcesPageContent,
  BlogPost,
  PricingPlan,
  Testimonial,
  ApiCareerJob,
  InfoPageContent,
  BlogCategory,
  PageRecord,
} from "./exxonim-types";

/* ------------------------------------------------------------------ */
/* Routes                                                              */
/* ------------------------------------------------------------------ */

export const routes = {
  home: "/",
  about: "/about",
  faq: "/faq",
  services: "/services",
  resources: "/resources",
  career: "/career",
  contact: "/contact",
  support: "/support",
  terms: "/terms",
  privacy: "/privacy",
  cookies: "/cookies",
  dataRights: "/data-rights",
} as const;

/* ------------------------------------------------------------------ */
/* Brand & Company                                                     */
/* ------------------------------------------------------------------ */

export const fallbackBrand: BrandAssets = {
  name: "Exxonim",
  lightLogoSrc: "/branding/exxonimLogoLight.webp",
  darkLogoSrc: "/branding/logo-dark.png",
};

export const fallbackCompanyInfo: CompanyInfo = {
  name: "Exxonim Advisory",
  phones: ["+255 222 700 089", "+255 768 500 089"],
  emails: ["info@exxonim.com", "support@exxonim.com"],
  address: "Ohio Street, Exas Complex, 6th Floor, Dar es Salaam, Tanzania",
  whatsapp: "+255768500089",
};

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export const fallbackNavigationItems: NavigationItem[] = [
  {
    id: 1,
    title: "Home",
    url: "/",
    description: "Exxonim homepage",
    kind: "internal",
    order: 1,
    isActive: true,
    parentId: null,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
    children: [],
  },
  {
    id: 2,
    title: "About",
    url: "/about",
    description: "Learn about Exxonim and our team",
    kind: "internal",
    order: 2,
    isActive: true,
    parentId: null,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
    children: [],
  },
  {
    id: 3,
    title: "Services",
    url: "/services",
    description: "Business advisory and compliance services",
    kind: "internal",
    order: 3,
    isActive: true,
    parentId: null,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
    children: [],
  },
  {
    id: 4,
    title: "Resources",
    url: "/resources",
    description: "Insights, articles and media",
    kind: "internal",
    order: 4,
    isActive: true,
    parentId: null,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
    children: [],
  },
  {
    id: 5,
    title: "Career",
    url: "/career",
    description: "Join the Exxonim team",
    kind: "internal",
    order: 5,
    isActive: true,
    parentId: null,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
    children: [],
  },
  {
    id: 6,
    title: "FAQ",
    url: "/faq",
    description: "Frequently asked questions",
    kind: "internal",
    order: 6,
    isActive: true,
    parentId: null,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
    children: [],
  },
  {
    id: 7,
    title: "Contact",
    url: "/contact",
    description: "Get in touch with us",
    kind: "internal",
    order: 7,
    isActive: true,
    parentId: null,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
    children: [],
  },
];

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

export const fallbackFooter: FooterContent = {
  quick_links: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Resources", href: "/resources" },
    { label: "Career", href: "/career" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
  other_resources: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Data Rights", href: "/data-rights" },
  ],
  tagline: "Empowering businesses across Tanzania with expert advisory, compliance, and registration services.",
  primary_cta: { label: "Get Started", href: "/contact" },
  social_links: [
    { platform: "linkedin", url: "https://www.linkedin.com/company/exxonim", label: "LinkedIn", isActive: true },
    { platform: "twitter", url: "https://twitter.com/exxonim", label: "Twitter", isActive: true },
    { platform: "instagram", url: "https://instagram.com/exxonim", label: "Instagram", isActive: true },
    { platform: "facebook", url: "https://facebook.com/exxonim", label: "Facebook", isActive: true },
  ],
  copyright: `© ${new Date().getFullYear()} Exxonim Advisory. All rights reserved.`,
};

/* ------------------------------------------------------------------ */
/* Home Page                                                           */
/* ------------------------------------------------------------------ */

export const fallbackHomePage: PageRecord<HomePageContent> = {
  id: 1,
  title: "Home",
  slug: "home",
  isPublished: true,
  createdAt: "2025-01-01T00:00:00Z",
  updatedAt: "2025-01-01T00:00:00Z",
  content: {
    hero: {
      eyebrow: "Exxonim Advisory",
      title: "Your Trusted Business Partner in Tanzania",
      description:
        "We help local and international businesses navigate Tanzania's regulatory landscape with confidence — from company registration and licensing to tax compliance and ongoing advisory support.",
      cta: { label: "Start Your Journey", href: "/contact" },
      highlights: [
        { title: "500+", detail: "Businesses Registered" },
        { title: "98%", detail: "Compliance Success Rate" },
        { title: "10+", detail: "Years of Experience" },
      ],
    },
    provider_section: {
      kicker: "Trusted by leading organizations",
      title: "We work with businesses that shape Tanzania's future",
      logos: [
        { alt: "UTEC", src: "/clients/utec.webp" },
        { alt: "TRCS", src: "/clients/trcs.webp" },
        { alt: "Levo", src: "/clients/levo.webp" },
        { alt: "GET", src: "/clients/get.webp" },
      ],
    },
    stack_section: {
      items: [
        {
          title: "Company Registration",
          subtitle: "Business Formation",
          description:
            "End-to-end support for registering your company in Tanzania — from name search and document preparation to BRELA filing and certificate issuance.",
          ctaLabel: "Learn More",
          ctaHref: "/services",
          windowTitle: "Company Registration",
          windowTag: "Formation",
          videoSrc: "",
        },
        {
          title: "Business Licensing",
          subtitle: "License & Permits",
          description:
            "Navigate Tanzania's licensing requirements with ease. We handle business licenses, sector-specific permits, and regulatory approvals across all industries.",
          ctaLabel: "Learn More",
          ctaHref: "/services",
          windowTitle: "Business Licensing",
          windowTag: "Compliance",
          videoSrc: "",
        },
        {
          title: "Tax & Compliance",
          subtitle: "Ongoing Support",
          description:
            "Stay compliant with TRA requirements. We provide tax registration, filing support, audit preparation, and year-round advisory to keep your business on track.",
          ctaLabel: "Learn More",
          ctaHref: "/services",
          windowTitle: "Tax & Compliance",
          windowTag: "Advisory",
          videoSrc: "",
        },
        {
          title: "Track every consultation — automatically",
          subtitle: "Proactive updates at every milestone. You never need to call and ask what is happening.",
          description:
            "Upon engagement, you receive a unique tracking number. At every key milestone — name clearance, document submission, approval, issuance — Exxonim sends you an update via WhatsApp, email, or SMS. You can also look up your status on the website anytime, no login required.",
          ctaLabel: "Track a consultation",
          ctaHref: "/track-consultation",
          windowTitle: "Tracking",
          windowTag: "Guide",
          videoSrc: "/videos/track-consultation.mp4",
        },
      ],
      default_feature_rows: [
        {
          title: "Company Registration",
          description: "Register your business with BRELA and obtain all necessary certificates.",
          visualKey: "company-registration",
        },
        {
          title: "Business Licensing",
          description: "Secure the right licenses and permits for your industry.",
          visualKey: "business-licensing",
        },
        {
          title: "Tax Compliance",
          description: "File returns on time and stay ahead of regulatory changes.",
          visualKey: "tax-compliance",
        },
      ],
      feature_visual_content: {
        "company-registration": {
          workstreamValue: "12+ registrations per week",
          counterpartLabel: "Filing Authority",
          counterpartValue: "BRELA / Tanzania Revenue Authority",
          focusValue: "Same-day name search, 5-day incorporation",
          summaryTitle: "Fast-Track Registration",
          summaryBody:
            "Our streamlined process gets your company registered and operational faster. We handle name search, memorandum & articles, and all BRELA filings.",
        },
        "business-licensing": {
          workstreamValue: "40+ license types supported",
          counterpartLabel: "Regulatory Bodies",
          counterpartValue: "Local Government / Sector Authorities",
          focusValue: "End-to-end permit management",
          summaryTitle: "Comprehensive Licensing",
          summaryBody:
            "From general business licenses to sector-specific permits, we manage the full licensing lifecycle so you can focus on growing your business.",
        },
        "tax-compliance": {
          workstreamValue: "100% filing accuracy",
          counterpartLabel: "Tax Authority",
          counterpartValue: "Tanzania Revenue Authority (TRA)",
          focusValue: "Proactive compliance calendar",
          summaryTitle: "Always Compliant",
          summaryBody:
            "Never miss a filing deadline. Our compliance calendar and expert team ensure your tax obligations are met accurately and on time, every time.",
        },
      },
    },
    insights_section: {
      title: "Insights & Resources",
      intro:
        "Stay informed with the latest regulatory updates, business tips, and industry insights tailored for the Tanzanian market.",
      footer_copy: "Explore all resources to keep your business ahead.",
    },
  },
};

/* ------------------------------------------------------------------ */
/* About Page                                                          */
/* ------------------------------------------------------------------ */

export const fallbackAboutPage: PageRecord<AboutPageContent> = {
  id: 2,
  title: "About Exxonim",
  slug: "about",
  isPublished: true,
  createdAt: "2025-01-01T00:00:00Z",
  updatedAt: "2025-01-01T00:00:00Z",
  content: {
    hero: {
      eyebrow: "About Us",
      title: "Building Business Confidence in Tanzania",
      description:
        "Exxonim Advisory is a Tanzania-based business consulting firm dedicated to helping entrepreneurs and organizations start, grow, and maintain compliant operations across the country.",
    },
    company_profile: {
      eyebrow: "Who We Are",
      title: "A Team Committed to Your Success",
      paragraphs: [
        "Founded in Dar es Salaam, Exxonim Advisory has spent over a decade building deep expertise in Tanzania's business regulatory environment. We understand the challenges that businesses face — from navigating complex registration requirements to staying compliant with ever-changing tax laws.",
        "Our team of experienced consultants and legal professionals works closely with clients to provide tailored solutions that address their unique needs. Whether you are a local entrepreneur starting your first venture or an international corporation expanding into the Tanzanian market, we offer the guidance and support you need to succeed.",
        "We pride ourselves on transparency, reliability, and a genuine commitment to our clients' growth. Our track record of over 500 successful business registrations speaks to the trust our clients place in us.",
      ],
      working_style_label: "Our Approach",
      working_style:
        "We combine deep local knowledge with international best practices, delivering hands-on support that goes beyond paperwork — we become your long-term business partner.",
    },
    support_profiles_section: {
      title: "What We Stand For",
      description: "Our core principles guide every engagement.",
    },
    support_profiles: [
      {
        title: "Integrity",
        description: "We operate with complete transparency and honesty in every client interaction and regulatory engagement.",
      },
      {
        title: "Excellence",
        description: "We hold ourselves to the highest standards of accuracy and thoroughness in all our services.",
      },
      {
        title: "Client Focus",
        description: "Your success is our success. We tailor our approach to meet your specific business objectives and timeline.",
      },
      {
        title: "Innovation",
        description: "We continuously improve our processes and leverage technology to deliver faster, more efficient outcomes.",
      },
    ],
    service_scope_section: {
      title: "Our Service Scope",
      description: "Comprehensive business support across key areas.",
    },
    service_scope: [
      {
        title: "Business Registration & Formation",
        description: "Complete company incorporation services including name search, document preparation, BRELA filing, and certificate issuance for all entity types.",
      },
      {
        title: "Licensing & Permits",
        description: "Full licensing support from general business licenses to sector-specific permits and regulatory approvals across all Tanzanian industries.",
      },
      {
        title: "Tax Advisory & Compliance",
        description: "Tax registration, return filing, audit preparation, and year-round advisory to ensure full compliance with Tanzania Revenue Authority requirements.",
      },
      {
        title: "Regulatory Compliance",
        description: "Ongoing monitoring and management of compliance obligations across all relevant regulatory bodies and government agencies.",
      },
      {
        title: "Business Consulting",
        description: "Strategic advisory services for market entry, business planning, operational optimization, and organizational development.",
      },
      {
        title: "Legal Support",
        description: "Legal documentation, contract review, and liaison with legal practitioners for business-related legal matters.",
      },
    ],
    operating_model_section: {
      title: "How We Work",
      description: "Our proven four-step process ensures consistent results.",
    },
    operating_model: [
      {
        step: "01",
        title: "Discovery & Assessment",
        description: "We begin by understanding your business goals, current status, and regulatory requirements through a thorough consultation.",
      },
      {
        step: "02",
        title: "Strategy & Planning",
        description: "Based on our assessment, we develop a detailed action plan with clear timelines, deliverables, and milestones.",
      },
      {
        step: "03",
        title: "Execution & Filing",
        description: "Our team handles all document preparation, submissions, and follow-ups with relevant authorities on your behalf.",
      },
      {
        step: "04",
        title: "Ongoing Support",
        description: "We provide continuous monitoring, compliance alerts, and advisory support to keep your business on track long after the initial engagement.",
      },
    ],
    client_expectations_section: {
      title: "What Our Clients Can Expect",
      description: "Our commitment to every engagement.",
    },
    client_expectations: [
      "Clear, upfront communication about timelines and costs",
      "Dedicated consultant assigned to your account",
      "Regular progress updates throughout the engagement",
      "Proactive compliance reminders and deadline alerts",
      "Post-completion support and follow-up",
      "Complete confidentiality of all business information",
    ],
    cta: {
      title: "Ready to Get Started?",
      description:
        "Whether you're starting a new business or need help with compliance, our team is here to guide you every step of the way.",
      primary: { label: "Contact Us", href: "/contact" },
      secondary: { label: "View Our Services", href: "/services" },
    },
  },
};

/* ------------------------------------------------------------------ */
/* Services Page                                                       */
/* ------------------------------------------------------------------ */

export const fallbackServicesPage: PageRecord<ServicesPageContent> = {
  id: 3,
  title: "Our Services",
  slug: "services",
  isPublished: true,
  createdAt: "2025-01-01T00:00:00Z",
  updatedAt: "2025-01-01T00:00:00Z",
  content: {
    overview: {
      eyebrow: "Our Services",
      title: "Comprehensive Business Solutions for Tanzania",
      description:
        "From company formation to ongoing compliance, Exxonim provides a full spectrum of business advisory services designed to help you operate with confidence in Tanzania's regulatory environment.",
      features: [
        {
          icon: "building",
          label: "Company Registration",
          description: "Full incorporation support for all business entity types in Tanzania.",
        },
        {
          icon: "shield",
          label: "Licensing & Permits",
          description: "Navigate licensing requirements across all sectors and jurisdictions.",
        },
        {
          icon: "calculator",
          label: "Tax Compliance",
          description: "Stay compliant with TRA through accurate filing and proactive advisory.",
        },
        {
          icon: "users",
          label: "Ongoing Advisory",
          description: "Dedicated consultant support for all your business compliance needs.",
        },
      ],
    },
    catalog: {
      title: "Service Catalog",
      description: "Explore our full range of business advisory and compliance services.",
      groups: [
        {
          title: "Business Formation",
          items: [
            {
              title: "Company Registration",
              description:
                "Complete company incorporation including name search, memorandum & articles of association, BRELA filing, and certificate of incorporation.",
              cta_label: "Get Started",
              cta_href: "/contact",
            },
            {
              title: "Business Name Registration",
              description:
                "Sole proprietorship and business name registration for individual entrepreneurs and small businesses.",
              cta_label: "Get Started",
              cta_href: "/contact",
            },
            {
              title: "Foreign Company Registration",
              description:
                "Registration of foreign companies and branch offices looking to establish operations in Tanzania.",
              cta_label: "Get Started",
              cta_href: "/contact",
            },
            {
              title: "NGO & Society Registration",
              description:
                "Registration support for non-governmental organizations, societies, and other non-profit entities.",
              cta_label: "Get Started",
              cta_href: "/contact",
            },
          ],
        },
        {
          title: "Licensing & Compliance",
          items: [
            {
              title: "Business License",
              description:
                "Application and renewal of general business licenses from local government authorities.",
              cta_label: "Get Started",
              cta_href: "/contact",
            },
            {
              title: "Sector-Specific Permits",
              description:
                "Industry-specific permits including mining, telecommunications, financial services, and more.",
              cta_label: "Get Started",
              cta_href: "/contact",
            },
            {
              title: "TIN & VRN Registration",
              description:
                "Tax Identification Number and Value Added Tax registration with the Tanzania Revenue Authority.",
              cta_label: "Get Started",
              cta_href: "/contact",
            },
            {
              title: "Work Permits",
              description:
                "Work permit applications and renewals for expatriate employees and foreign directors.",
              cta_label: "Get Started",
              cta_href: "/contact",
            },
          ],
        },
        {
          title: "Tax & Financial Advisory",
          items: [
            {
              title: "Tax Return Filing",
              description:
                "Preparation and filing of all tax returns including income tax, VAT, and withholding tax.",
              cta_label: "Get Started",
              cta_href: "/contact",
            },
            {
              title: "Tax Audit Support",
              description:
                "Expert support during TRA tax audits, including documentation preparation and representation.",
              cta_label: "Get Started",
              cta_href: "/contact",
            },
            {
              title: "Transfer Pricing",
              description:
                "Transfer pricing documentation and compliance for related-party transactions.",
              cta_label: "Get Started",
              cta_href: "/contact",
            },
            {
              title: "Financial Reporting",
              description:
                "Preparation of financial statements in compliance with Tanzanian accounting standards.",
              cta_label: "Get Started",
              cta_href: "/contact",
            },
          ],
        },
        {
          title: "Ongoing Support",
          items: [
            {
              title: "Compliance Monitoring",
              description:
                "Proactive monitoring of all filing deadlines and regulatory changes affecting your business.",
              cta_label: "Get Started",
              cta_href: "/contact",
            },
            {
              title: "Annual Returns",
              description:
                "Preparation and filing of annual returns with BRELA and other regulatory bodies.",
              cta_label: "Get Started",
              cta_href: "/contact",
            },
            {
              title: "Company Secretarial",
              description:
                "Board meeting support, minute keeping, and statutory record maintenance.",
              cta_label: "Get Started",
              cta_href: "/contact",
            },
            {
              title: "Business Consulting",
              description:
                "Strategic advisory for business growth, market entry, and operational improvement.",
              cta_label: "Get Started",
              cta_href: "/contact",
            },
          ],
        },
      ],
    },
  },
};

/* ------------------------------------------------------------------ */
/* Career Page                                                         */
/* ------------------------------------------------------------------ */

export const fallbackCareerPage: PageRecord<CareerPageContent> = {
  id: 4,
  title: "Careers",
  slug: "career",
  isPublished: true,
  createdAt: "2025-01-01T00:00:00Z",
  updatedAt: "2025-01-01T00:00:00Z",
  content: {
    hero: {
      eyebrow: "Careers",
      title: "Join the Exxonim Team",
      description:
        "We're always looking for talented professionals who share our passion for helping businesses succeed in Tanzania. Explore opportunities to grow your career with us.",
    },
    focus_areas: [
      "Business Advisory & Consulting",
      "Tax & Compliance",
      "Legal & Regulatory Affairs",
      "Client Relations & Support",
      "Operations & Administration",
      "Technology & Innovation",
    ],
    status: {
      label: "We're Hiring",
      description:
        "We currently have open positions across multiple departments. If you're passionate about business advisory and want to make a difference, we'd love to hear from you.",
      primary: { label: "View Open Positions", href: "/career#positions" },
      secondary: { label: "Send Your CV", href: "/contact" },
    },
  },
};

/* ------------------------------------------------------------------ */
/* Contact Page                                                        */
/* ------------------------------------------------------------------ */

export const fallbackContactPage: PageRecord<ContactPageContent> = {
  id: 5,
  title: "Contact Us",
  slug: "contact",
  isPublished: true,
  createdAt: "2025-01-01T00:00:00Z",
  updatedAt: "2025-01-01T00:00:00Z",
  content: {
    hero: {
      eyebrow: "Contact",
      title: "Let's Start a Conversation",
      description:
        "Whether you need help with company registration, licensing, tax compliance, or any other business matter, our team is ready to assist you.",
    },
    cards: [
      {
        label: "Phone",
        value: "+255 222 700 089",
        description: "Mon–Fri, 8:00 AM – 5:00 PM EAT",
        action: { label: "Call Us", href: "tel:+255222700089" },
      },
      {
        label: "Email",
        value: "info@exxonim.com",
        description: "We typically respond within 24 hours",
        action: { label: "Send Email", href: "mailto:info@exxonim.com" },
      },
      {
        label: "Office",
        value: "Ohio Street, Exas Complex",
        description: "6th Floor, Dar es Salaam, Tanzania",
        action: { label: "Get Directions", href: "https://maps.google.com/?q=Exas+Complex+Ohio+Street+Dar+es+Salaam" },
      },
      {
        label: "WhatsApp",
        value: "+255 768 500 089",
        description: "Quick questions? Chat with us on WhatsApp",
        action: { label: "Chat Now", href: "https://wa.me/255768500089" },
      },
    ],
  },
};

/* ------------------------------------------------------------------ */
/* FAQ Page                                                            */
/* ------------------------------------------------------------------ */

export const fallbackFaqPage: PageRecord<FaqPageContent> = {
  id: 6,
  title: "Frequently Asked Questions",
  slug: "faq",
  isPublished: true,
  createdAt: "2025-01-01T00:00:00Z",
  updatedAt: "2025-01-01T00:00:00Z",
  content: {
    hero: {
      eyebrow: "FAQ",
      title: "Common Questions, Clear Answers",
      description:
        "Find answers to the most frequently asked questions about business registration, licensing, and compliance in Tanzania.",
    },
    items: [
      {
        question: "How long does it take to register a company in Tanzania?",
        answer:
          "The standard timeline for company registration is typically 5–7 business days after all documents are submitted. With our fast-track service, we can often complete registration within 3 business days. The process includes name search (1 day), document preparation (1–2 days), and BRELA filing and certificate issuance (2–4 days).",
      },
      {
        question: "What documents do I need to register a company?",
        answer:
          "For a limited liability company, you'll need: proposed company names (at least 3 options), director and shareholder details (names, addresses, ID copies), memorandum and articles of association, Form 1A (application for registration), and the prescribed filing fees. Our team will guide you through preparing all necessary documentation.",
      },
      {
        question: "Do I need a business license to operate in Tanzania?",
        answer:
          "Yes, all businesses operating in Tanzania must obtain a business license from the local government authority where the business is located. Additional sector-specific permits may also be required depending on your industry. We handle the entire licensing process for our clients.",
      },
      {
        question: "What is TIN and do I need one?",
        answer:
          "A Tax Identification Number (TIN) is a unique identifier issued by the Tanzania Revenue Authority (TRA). It is required for all registered businesses and must be used in all tax-related transactions. We assist with TIN registration as part of our company registration package or as a standalone service.",
      },
      {
        question: "What is VRN and when is it required?",
        answer:
          "A Value Added Tax Registration Number (VRN) is required for businesses with an annual turnover exceeding TZS 100 million. Businesses below this threshold may register voluntarily. VRN registration is done through TRA, and we handle the entire application process.",
      },
      {
        question: "Can a foreigner register a company in Tanzania?",
        answer:
          "Yes, foreigners can register companies in Tanzania. However, there are specific requirements including minimum capital thresholds for foreign-owned companies (typically USD 100,000 for wholly foreign-owned entities). We specialize in assisting international clients with the registration process and can advise on the most suitable entity structure.",
      },
      {
        question: "How much does company registration cost?",
        answer:
          "Costs vary depending on the type of entity and specific requirements. Our fees cover all government charges, professional fees, and incidental costs. We provide transparent, upfront pricing after understanding your specific needs. Contact us for a detailed quote.",
      },
      {
        question: "Do you provide ongoing compliance support?",
        answer:
          "Yes, we offer comprehensive ongoing compliance support including tax return filing, annual return preparation, regulatory deadline monitoring, and general advisory. Our retainer packages are designed to give you peace of mind knowing that your compliance obligations are being handled by experts.",
      },
      {
        question: "What is the difference between BRELA and TRA?",
        answer:
          "BRELA (Business Registration and Licensing Agency) handles company registration, business names, and intellectual property. TRA (Tanzania Revenue Authority) handles all tax-related matters including TIN, VAT, income tax, and customs. Both agencies are important for business compliance, and we work with both on your behalf.",
      },
      {
        question: "How do I get started with Exxonim?",
        answer:
          "Simply contact us through our website, phone, email, or WhatsApp. We'll schedule an initial consultation to understand your needs and provide a clear action plan with timelines and costs. There's no obligation — we're happy to discuss your requirements before you commit.",
      },
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Resources Page                                                      */
/* ------------------------------------------------------------------ */

export const fallbackResourcesPage: PageRecord<ResourcesPageContent> = {
  id: 7,
  title: "Resources & Insights",
  slug: "resources",
  isPublished: true,
  createdAt: "2025-01-01T00:00:00Z",
  updatedAt: "2025-01-01T00:00:00Z",
  content: {
    hero_title: "Resources & Insights",
    trending_label: "Trending",
    top_media: {
      youtube_url: "https://www.youtube.com/@exxonim",
      podcast_url: "https://anchor.fm/exxonim",
    },
    article_sidebar: {
      title: "Need Expert Guidance?",
      description:
        "Our consultants are ready to help you navigate Tanzania's business landscape with confidence.",
      primary_cta: { label: "Book a Consultation", href: "/contact" },
    },
    empty_state: {
      title: "No articles yet",
      description: "Check back soon for insightful articles and resources about doing business in Tanzania.",
    },
  },
};

/* ------------------------------------------------------------------ */
/* Blog Posts                                                          */
/* ------------------------------------------------------------------ */

export const fallbackBlogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "guide-to-company-registration-in-tanzania",
    title: "The Complete Guide to Company Registration in Tanzania",
    excerpt:
      "Everything you need to know about registering a company in Tanzania, from choosing the right entity type to navigating BRELA requirements.",
    publishedAt: "2025-01-15T00:00:00Z",
    category: { id: "guides", label: "Guides", description: "Step-by-step business guides" },
    mediaLabel: "Article",
    featuredSlot: "main",
    featuredOnHome: true,
    relatedSlugs: ["tanzania-business-license-requirements", "tin-registration-guide"],
    author: { name: "Exxonim Team", role: "Business Advisory" },
    content: {
      introduction:
        "Registering a company in Tanzania is a critical first step for any entrepreneur or business looking to operate legally in the country. This comprehensive guide walks you through every step of the process.",
      highlights: [
        "Tanzania offers several entity types including limited liability companies, partnerships, and sole proprietorships",
        "The registration process is managed by BRELA (Business Registration and Licensing Agency)",
        "Foreign investors can register companies but must meet minimum capital requirements",
        "Post-registration compliance including TIN and business license is mandatory",
      ],
      sections: [
        {
          heading: "Choosing the Right Entity Type",
          paragraphs: [
            "The most common business entity in Tanzania is the Limited Liability Company (LLC), which provides liability protection for shareholders. Other options include public limited companies, partnerships, and sole proprietorships. The right choice depends on your business size, ownership structure, and growth plans.",
          ],
        },
        {
          heading: "The Registration Process",
          paragraphs: [
            "Company registration in Tanzania involves several key steps: name search and reservation, preparation of memorandum and articles of association, completion of registration forms, and submission to BRELA. The entire process typically takes 5–7 business days when all documents are in order.",
          ],
        },
        {
          heading: "Post-Registration Requirements",
          paragraphs: [
            "After registration, you'll need to obtain a Tax Identification Number (TIN) from TRA, register for VAT if applicable, and apply for a business license from your local government authority. These are mandatory for operating legally in Tanzania.",
          ],
        },
      ],
    },
  },
  {
    id: 2,
    slug: "tanzania-business-license-requirements",
    title: "Understanding Business License Requirements in Tanzania",
    excerpt:
      "A detailed overview of the licensing landscape in Tanzania, including when you need a license, types of licenses, and how to apply.",
    publishedAt: "2025-02-01T00:00:00Z",
    category: { id: "compliance", label: "Compliance", description: "Regulatory compliance articles" },
    mediaLabel: "Article",
    featuredSlot: "side",
    featuredOnHome: true,
    relatedSlugs: ["guide-to-company-registration-in-tanzania", "tin-registration-guide"],
    author: { name: "Exxonim Team", role: "Business Advisory" },
    content: {
      introduction:
        "Operating a business in Tanzania without the proper licenses can result in significant penalties. This article explains the licensing requirements and how to stay compliant.",
      highlights: [
        "Every business in Tanzania must hold a valid business license",
        "Additional sector-specific permits may be required",
        "Business licenses must be renewed annually",
        "Operating without a license carries fines and potential closure",
      ],
      sections: [
        {
          heading: "Types of Business Licenses",
          paragraphs: [
            "Tanzania has two main categories of business licenses: the general business license issued by local government authorities, and sector-specific permits issued by relevant regulatory bodies. Most businesses need both a general license and any applicable sector permits.",
          ],
        },
        {
          heading: "Application Process",
          paragraphs: [
            "Business license applications are submitted to the local government authority where your business is located. You'll need your certificate of incorporation, TIN certificate, and any sector-specific prerequisites. Processing times vary by location and license type.",
          ],
        },
      ],
    },
  },
  {
    id: 3,
    slug: "tin-registration-guide",
    title: "TIN Registration in Tanzania: A Step-by-Step Guide",
    excerpt:
      "Learn how to register for a Tax Identification Number with TRA, including required documents and common pitfalls to avoid.",
    publishedAt: "2025-02-15T00:00:00Z",
    category: { id: "tax", label: "Tax", description: "Tax advisory articles" },
    mediaLabel: "Article",
    featuredOnHome: false,
    relatedSlugs: ["guide-to-company-registration-in-tanzania", "tanzania-business-license-requirements"],
    author: { name: "Exxonim Team", role: "Business Advisory" },
    content: {
      introduction:
        "A Tax Identification Number (TIN) is essential for conducting business in Tanzania. This guide covers everything you need to know about the TIN registration process.",
      highlights: [
        "TIN is mandatory for all registered businesses",
        "Registration is free and done through TRA",
        "Both companies and individuals can obtain a TIN",
        "TIN must be quoted on all tax-related documents",
      ],
      sections: [
        {
          heading: "What is a TIN?",
          paragraphs: [
            "A Tax Identification Number is a unique identifier assigned by the Tanzania Revenue Authority to taxpayers. It is used for all tax transactions including filing returns, paying taxes, and correspondence with TRA.",
          ],
        },
        {
          heading: "Registration Steps",
          paragraphs: [
            "To register for a TIN, visit your nearest TRA office with your certificate of incorporation, director identification documents, and a completed TIN application form. Online registration is also available through the TRA portal. Processing typically takes 1–3 business days.",
          ],
        },
      ],
    },
  },
  {
    id: 4,
    slug: "foreign-investment-tanzania-2025",
    title: "Foreign Investment in Tanzania: What You Need to Know in 2025",
    excerpt:
      "Key updates and considerations for international investors looking to establish operations in Tanzania this year.",
    publishedAt: "2025-03-01T00:00:00Z",
    category: { id: "insights", label: "Insights", description: "Industry insights and analysis" },
    mediaLabel: "Article",
    featuredOnHome: false,
    relatedSlugs: ["guide-to-company-registration-in-tanzania"],
    author: { name: "Exxonim Team", role: "Business Advisory" },
    content: {
      introduction:
        "Tanzania continues to be an attractive destination for foreign investment in East Africa. Here's what international investors should know about the current regulatory environment.",
      highlights: [
        "Minimum capital requirement for wholly foreign-owned companies is USD 100,000",
        "New investment incentives available through TIC (Tanzania Investment Centre)",
        "Sector-specific regulations may impose additional requirements",
        "Partnership with local firms can simplify market entry",
      ],
      sections: [
        {
          heading: "Regulatory Framework",
          paragraphs: [
            "Foreign investment in Tanzania is governed by the Tanzania Investment Act and various sector-specific regulations. The Tanzania Investment Centre (TIC) serves as the primary agency for facilitating foreign investment and offers various incentives for qualifying projects.",
          ],
        },
      ],
    },
  },
];

/* ------------------------------------------------------------------ */
/* Blog Categories                                                     */
/* ------------------------------------------------------------------ */

export const fallbackBlogCategories: BlogCategory[] = [
  { id: "guides", label: "Guides", description: "Step-by-step business guides" },
  { id: "compliance", label: "Compliance", description: "Regulatory compliance articles" },
  { id: "tax", label: "Tax", description: "Tax advisory articles" },
  { id: "insights", label: "Insights", description: "Industry insights and analysis" },
  { id: "news", label: "News", description: "Latest business news and updates" },
];

/* ------------------------------------------------------------------ */
/* Pricing Plans                                                       */
/* ------------------------------------------------------------------ */

export const fallbackPricingPlans: PricingPlan[] = [
  {
    id: 1,
    name: "Starter",
    badge: "",
    description: "Essential services for new businesses getting started in Tanzania.",
    notes: "Ideal for sole proprietors and small businesses",
    recommended: false,
    features: [
      { label: "Company Name Search", included: true },
      { label: "Company Registration", included: true },
      { label: "TIN Registration", included: true },
      { label: "Business License Application", included: true },
      { label: "VAT Registration", included: false },
      { label: "Annual Return Filing", included: false },
      { label: "Tax Return Filing", included: false },
      { label: "Dedicated Consultant", included: false },
      { label: "Compliance Monitoring", included: false },
    ],
  },
  {
    id: 2,
    name: "Professional",
    badge: "Most Popular",
    description: "Comprehensive support for growing businesses that need ongoing compliance assistance.",
    notes: "Best value for established businesses",
    recommended: true,
    features: [
      { label: "Company Name Search", included: true },
      { label: "Company Registration", included: true },
      { label: "TIN Registration", included: true },
      { label: "Business License Application", included: true },
      { label: "VAT Registration", included: true },
      { label: "Annual Return Filing", included: true },
      { label: "Tax Return Filing", included: true },
      { label: "Dedicated Consultant", included: false },
      { label: "Compliance Monitoring", included: false },
    ],
  },
  {
    id: 3,
    name: "Enterprise",
    badge: "Premium",
    description: "Full-service advisory with dedicated support for complex business operations.",
    notes: "For businesses requiring comprehensive ongoing support",
    recommended: false,
    features: [
      { label: "Company Name Search", included: true },
      { label: "Company Registration", included: true },
      { label: "TIN Registration", included: true },
      { label: "Business License Application", included: true },
      { label: "VAT Registration", included: true },
      { label: "Annual Return Filing", included: true },
      { label: "Tax Return Filing", included: true },
      { label: "Dedicated Consultant", included: true },
      { label: "Compliance Monitoring", included: true },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Testimonials                                                        */
/* ------------------------------------------------------------------ */

export const fallbackTestimonials: Testimonial[] = [
  {
    id: 1,
    eyebrow: "Business Registration",
    headline: "Exxonim made company registration effortless",
    support: "From name search to certificate in just 5 days",
    quote:
      "I was amazed at how smooth the registration process was with Exxonim. They handled everything from name search to filing with BRELA, and I had my certificate of incorporation within a week. Their team was responsive and kept me informed at every step.",
    name: "Amina Mbwana",
    role: "Founder, Mbwana Consulting",
    initials: "AM",
  },
  {
    id: 2,
    eyebrow: "Tax Compliance",
    headline: "Reliable tax support I can count on",
    support: "Zero missed deadlines for three consecutive years",
    quote:
      "Before working with Exxonim, I was always stressed about tax deadlines and compliance requirements. Since switching to their professional package, I haven't missed a single filing. Their compliance calendar and proactive reminders are a game-changer.",
    name: "James Katura",
    role: "Director, Katura Enterprises",
    initials: "JK",
  },
  {
    id: 3,
    eyebrow: "Foreign Investment",
    headline: "The perfect partner for entering the Tanzanian market",
    support: "Full regulatory support for our East Africa expansion",
    quote:
      "As a foreign company, navigating Tanzania's regulatory landscape seemed daunting. Exxonim guided us through every step — from company registration to licensing and tax compliance. Their deep local knowledge and professional approach gave us the confidence to invest here.",
    name: "Sarah Mitchell",
    role: "Regional Director, AfriConnect Ltd",
    initials: "SM",
  },
];

/* ------------------------------------------------------------------ */
/* Jobs                                                                */
/* ------------------------------------------------------------------ */

export const fallbackJobs: ApiCareerJob[] = [
  {
    id: 1,
    title: "Business Advisory Consultant",
    slug: "business-advisory-consultant",
    department: "Advisory",
    employment_type: "Full-time",
    location_mode: "On-site",
    city: "Dar es Salaam",
    country: "Tanzania",
    compensation_label: "Competitive",
    experience_label: "3–5 years",
    summary:
      "Join our advisory team to help clients navigate Tanzania's business regulatory environment. You'll work on company registrations, licensing, and compliance projects.",
    description:
      "We are looking for an experienced Business Advisory Consultant to join our growing team. You will be responsible for managing client engagements from initial consultation through to completion, ensuring all regulatory requirements are met accurately and on time.",
    requirements: [
      "Bachelor's degree in Business, Law, or related field",
      "3–5 years of experience in business advisory or corporate services",
      "Deep knowledge of Tanzanian business registration and licensing processes",
      "Strong communication and client management skills",
      "Attention to detail and ability to manage multiple engagements simultaneously",
    ],
    responsibilities: [
      "Manage client engagements from consultation to completion",
      "Prepare and file regulatory documents with BRELA, TRA, and other agencies",
      "Provide expert advice on business formation and compliance matters",
      "Maintain up-to-date knowledge of regulatory changes",
      "Build and maintain strong client relationships",
    ],
    status: "open",
    is_published: true,
    published_at: "2025-01-15T00:00:00Z",
    created_at: "2025-01-10T00:00:00Z",
    updated_at: "2025-01-15T00:00:00Z",
  },
  {
    id: 2,
    title: "Tax Compliance Officer",
    slug: "tax-compliance-officer",
    department: "Tax & Compliance",
    employment_type: "Full-time",
    location_mode: "On-site",
    city: "Dar es Salaam",
    country: "Tanzania",
    compensation_label: "Competitive",
    experience_label: "2–4 years",
    summary:
      "Help our clients stay compliant with TRA requirements through accurate tax filing, audit support, and proactive advisory.",
    description:
      "We are seeking a Tax Compliance Officer to join our tax and compliance department. You will handle tax return preparation, filing, and provide ongoing compliance support to our diverse client base.",
    requirements: [
      "Bachelor's degree in Accounting, Finance, or related field",
      "2–4 years of experience in tax compliance or accounting",
      "Knowledge of Tanzanian tax laws and TRA procedures",
      "CPA or equivalent certification preferred",
      "Proficiency in accounting software and MS Office",
    ],
    responsibilities: [
      "Prepare and file tax returns for individual and corporate clients",
      "Monitor compliance deadlines and send proactive reminders",
      "Assist with tax audit preparation and representation",
      "Advise clients on tax planning and optimization strategies",
      "Maintain accurate client records and documentation",
    ],
    status: "open",
    is_published: true,
    published_at: "2025-02-01T00:00:00Z",
    created_at: "2025-01-25T00:00:00Z",
    updated_at: "2025-02-01T00:00:00Z",
  },
  {
    id: 3,
    title: "Client Relations Associate",
    slug: "client-relations-associate",
    department: "Client Relations",
    employment_type: "Full-time",
    location_mode: "Hybrid",
    city: "Dar es Salaam",
    country: "Tanzania",
    compensation_label: "Competitive",
    experience_label: "1–3 years",
    summary:
      "Be the first point of contact for our clients, ensuring exceptional service and smooth onboarding experiences.",
    description:
      "We are looking for a Client Relations Associate to manage client communications, onboarding, and ongoing relationship management. This role is perfect for someone who is passionate about customer service and business development.",
    requirements: [
      "Bachelor's degree in Business Administration or related field",
      "1–3 years of experience in client services or business development",
      "Excellent communication and interpersonal skills",
      "Proficiency in CRM tools and MS Office",
      "Fluency in English and Swahili",
    ],
    responsibilities: [
      "Serve as the primary point of contact for assigned clients",
      "Manage client onboarding and documentation processes",
      "Coordinate with advisory teams to ensure timely service delivery",
      "Handle client inquiries and resolve issues promptly",
      "Contribute to business development through client referrals",
    ],
    status: "open",
    is_published: true,
    published_at: "2025-02-15T00:00:00Z",
    created_at: "2025-02-10T00:00:00Z",
    updated_at: "2025-02-15T00:00:00Z",
  },
];

/* ------------------------------------------------------------------ */
/* Info Pages — Privacy, Terms, Cookies, Data Rights                   */
/* ------------------------------------------------------------------ */

export const fallbackPrivacyPage: PageRecord<InfoPageContent> = {
  id: 10,
  title: "Privacy Policy",
  slug: "privacy",
  isPublished: true,
  createdAt: "2025-01-01T00:00:00Z",
  updatedAt: "2025-01-01T00:00:00Z",
  content: {
    hero: {
      eyebrow: "Legal",
      title: "Privacy Policy",
      description: "Your privacy is important to us. This policy explains how Exxonim Advisory collects, uses, and protects your personal information.",
    },
    sections: [
      {
        title: "Information We Collect",
        paragraphs: [
          "We collect information you provide directly to us, such as when you fill out a contact form, request a consultation, or communicate with us by email or phone. This may include your name, email address, phone number, company name, and the nature of your inquiry.",
          "We also collect certain information automatically when you visit our website, including your IP address, browser type, operating system, referring URLs, and information about how you interact with our website.",
        ],
      },
      {
        title: "How We Use Your Information",
        paragraphs: [
          "We use the information we collect to provide, maintain, and improve our services, communicate with you about your inquiries and engagements, send you important updates about regulatory changes that may affect your business, and comply with legal obligations.",
        ],
        bullets: [
          "To respond to your inquiries and provide requested services",
          "To send you updates about regulatory changes and deadlines",
          "To improve our website and services",
          "To comply with legal and regulatory requirements",
          "To protect against fraud and unauthorized activity",
        ],
      },
      {
        title: "Information Sharing",
        paragraphs: [
          "We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted third parties who assist us in operating our business, provided they agree to keep this information confidential.",
          "We may also disclose your information when required by law, regulation, or legal process, or when we believe disclosure is necessary to protect our rights or the safety of others.",
        ],
      },
      {
        title: "Data Security",
        paragraphs: [
          "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.",
        ],
      },
      {
        title: "Data Retention",
        paragraphs: [
          "We retain your personal information for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required by law. For client engagement records, we retain information for the duration of the engagement plus seven years for regulatory compliance purposes.",
        ],
      },
      {
        title: "Changes to This Policy",
        paragraphs: [
          "We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the 'Last Updated' date. Your continued use of our services after changes are posted constitutes acceptance of the updated policy.",
        ],
      },
    ],
    next_step: {
      title: "Questions About Your Privacy?",
      description: "If you have questions or concerns about how we handle your data, we're here to help.",
      primary_action: { label: "Contact Us", href: "/contact" },
      secondary_action: { label: "View Cookie Policy", href: "/cookies" },
    },
  },
};

export const fallbackCookiePage: PageRecord<InfoPageContent> = {
  id: 11,
  title: "Cookie Policy",
  slug: "cookies",
  isPublished: true,
  createdAt: "2025-01-01T00:00:00Z",
  updatedAt: "2025-01-01T00:00:00Z",
  content: {
    hero: {
      eyebrow: "Legal",
      title: "Cookie Policy",
      description: "This policy explains how Exxonim Advisory uses cookies and similar technologies on our website.",
    },
    sections: [
      {
        title: "What Are Cookies?",
        paragraphs: [
          "Cookies are small text files that are placed on your device when you visit our website. They help us improve your browsing experience, understand how you use our site, and remember your preferences.",
        ],
      },
      {
        title: "Types of Cookies We Use",
        paragraphs: [
          "We use the following types of cookies on our website:",
        ],
        bullets: [
          "Essential cookies — Required for the website to function properly",
          "Analytics cookies — Help us understand how visitors interact with our website",
          "Preference cookies — Remember your settings and preferences",
          "Marketing cookies — Used to deliver relevant content and advertisements",
        ],
      },
      {
        title: "Managing Cookies",
        paragraphs: [
          "You can control and manage cookies in your browser settings. Most browsers allow you to refuse or accept cookies, delete existing cookies, and set preferences for certain websites. Please note that disabling certain cookies may affect the functionality of our website.",
        ],
      },
      {
        title: "Third-Party Cookies",
        paragraphs: [
          "Some cookies are placed by third-party services that appear on our pages. We do not control these cookies and recommend reviewing the privacy policies of these third-party providers for more information about their use of cookies.",
        ],
      },
    ],
    next_step: {
      title: "Have Questions About Cookies?",
      description: "If you'd like to learn more about how we use cookies, please reach out.",
      primary_action: { label: "Contact Us", href: "/contact" },
      secondary_action: { label: "View Privacy Policy", href: "/privacy" },
    },
  },
};

export const fallbackDataRightsPage: PageRecord<InfoPageContent> = {
  id: 12,
  title: "Your Data Rights",
  slug: "data-rights",
  isPublished: true,
  createdAt: "2025-01-01T00:00:00Z",
  updatedAt: "2025-01-01T00:00:00Z",
  content: {
    hero: {
      eyebrow: "Legal",
      title: "Your Data Rights",
      description: "Understand your rights regarding the personal data we hold about you and how to exercise them.",
    },
    sections: [
      {
        title: "Your Rights",
        paragraphs: [
          "You have the following rights regarding your personal data:",
        ],
        bullets: [
          "Right to access — Request a copy of the personal data we hold about you",
          "Right to rectification — Request correction of inaccurate or incomplete data",
          "Right to erasure — Request deletion of your personal data in certain circumstances",
          "Right to restriction — Request that we restrict processing of your data",
          "Right to data portability — Request your data in a structured, machine-readable format",
          "Right to object — Object to processing of your data for certain purposes",
          "Right to withdraw consent — Withdraw consent where processing is based on consent",
        ],
      },
      {
        title: "How to Exercise Your Rights",
        paragraphs: [
          "To exercise any of these rights, please contact us using the details provided on our contact page. We will respond to your request within 30 days. We may need to verify your identity before processing your request.",
        ],
      },
      {
        title: "Complaints",
        paragraphs: [
          "If you believe that your data rights have been violated, you have the right to lodge a complaint with the relevant data protection authority. In Tanzania, this would be the applicable regulatory body overseeing data protection matters.",
        ],
      },
    ],
    next_step: {
      title: "Need Help Exercising Your Rights?",
      description: "Our team is ready to assist you with any data-related requests or concerns.",
      primary_action: { label: "Contact Us", href: "/contact" },
      secondary_action: { label: "View Privacy Policy", href: "/privacy" },
    },
  },
};

export const fallbackTermsPage: PageRecord<InfoPageContent> = {
  id: 13,
  title: "Terms of Service",
  slug: "terms",
  isPublished: true,
  createdAt: "2025-01-01T00:00:00Z",
  updatedAt: "2025-01-01T00:00:00Z",
  content: {
    hero: {
      eyebrow: "Legal",
      title: "Terms of Service",
      description: "These terms govern your use of Exxonim Advisory's website and services. Please read them carefully.",
    },
    sections: [
      {
        title: "Acceptance of Terms",
        paragraphs: [
          "By accessing our website or engaging our services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you should not use our website or services.",
        ],
      },
      {
        title: "Services",
        paragraphs: [
          "Exxonim Advisory provides business advisory, registration, licensing, and compliance services as described on our website and in individual service agreements. The specific scope, deliverables, and fees for each engagement will be outlined in a separate service agreement or proposal.",
        ],
      },
      {
        title: "Client Responsibilities",
        paragraphs: [
          "As a client, you are responsible for:",
        ],
        bullets: [
          "Providing accurate and complete information required for our services",
          "Responding to requests for information or approval in a timely manner",
          "Paying all fees as agreed in your service agreement",
          "Informing us of any changes that may affect the services being provided",
          "Complying with all applicable laws and regulations relevant to your business",
        ],
      },
      {
        title: "Limitation of Liability",
        paragraphs: [
          "Exxonim Advisory provides advisory and filing services based on the information provided by clients and current regulatory requirements. While we strive for accuracy and completeness, we cannot guarantee specific outcomes from regulatory authorities. Our liability is limited to the fees paid for the specific service in question.",
        ],
      },
      {
        title: "Confidentiality",
        paragraphs: [
          "We maintain strict confidentiality regarding all client information and business matters. We will not disclose any confidential information to third parties without your prior written consent, except as required by law or regulation.",
        ],
      },
      {
        title: "Intellectual Property",
        paragraphs: [
          "All content on this website, including text, graphics, logos, and images, is the property of Exxonim Advisory or its content suppliers and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.",
        ],
      },
      {
        title: "Governing Law",
        paragraphs: [
          "These Terms of Service are governed by and construed in accordance with the laws of the United Republic of Tanzania. Any disputes arising from these terms or our services shall be resolved through the courts of Tanzania.",
        ],
      },
    ],
    next_step: {
      title: "Questions About Our Terms?",
      description: "If you have questions about these terms or need clarification, please get in touch.",
      primary_action: { label: "Contact Us", href: "/contact" },
      secondary_action: { label: "View Privacy Policy", href: "/privacy" },
    },
  },
};
