import type {
  AboutPageContent,
  BlogCategory,
  BlogPost,
  CareerPageContent,
  ContactPageContent,
  FaqPageContent,
  HomePageContent,
  InfoPageContent,
  PageRecord,
  PricingPlan,
  ResourcesPageContent,
  ServicesPageContent,
  SiteSetting,
  Testimonial,
} from '@/exxonim/types';
import type { BrandAssets, CompanyInfo } from '@/exxonim/types';
import type { ApiCareerJob, SiteSettingFooterValue } from "@/exxonim/types/api";
import {
  fallbackBrand,
  fallbackCompanyInfo,
  fallbackFooter,
  fallbackNavigationItems,
} from "./fallbackShell";
import { routes } from "@/exxonim/routes";
const utecLogo = "/clients/utec.webp";
const trcsLogo = "/clients/trcs.webp";
const levoLogo = "/clients/levo.webp";
const getLogo = "/clients/get.webp";
const bpoLogo = "/clients/bpo.webp";
const famaLogo = "/clients/fama.webp";
const jotofaLogo = "/clients/jotofa.webp";
const jkmLogo = "/clients/jkm.webp";
const djemaLogo = "/clients/djema_consult.webp";
const exxonimLogo = "/clients/exxonim-logo.webp";
const lightLogo = "/branding/exxonimLogoLight.webp";
const darkLogo = "/branding/logo-dark.png";

/* BACKEND / ADMIN INTEGRATION NOTES (Blog cover images):
 * ─────────────────────────────────────────────────────
 * Blog cover images are served from /public/blog/ during development.
 * In production, they will come from the database via the /media/ API endpoint
 * (admin upload → CDN). The admin should enforce:
 *   - Format: WebP preferred (better compression, supports transparency).
 *   - Minimum dimensions: 1344×768px (16:9 landscape for hero cards).
 *   - Aspect ratio: 16:9 for hero/featured cards, 16:10 for grid cards.
 *     The image will be cropped via object-cover in CSS, so the key subject
 *     should be centered with some margin on all sides.
 *   - File size: max 500KB per image (WebP at 1344×768 typically 80-200KB).
 *   - Alt text: Every cover image MUST have a descriptive `coverAlt` string
 *     for accessibility. The admin should make this a required field.
 *   - Author avatars: 96×96px minimum, square, WebP or PNG.
 *     Displayed as a 38px circle (rounded-full) so center the subject.
 *
 * Database schema suggestion for blog posts:
 *   TABLE blog_posts (
 *     id              SERIAL PRIMARY KEY,
 *     slug            VARCHAR(255) UNIQUE NOT NULL,
 *     title           VARCHAR(255) NOT NULL,
 *     excerpt         TEXT NOT NULL,
 *     cover_image_url VARCHAR(512),        -- CDN URL from /media/ upload
 *     cover_alt       VARCHAR(255),        -- Accessibility description
 *     media_label     VARCHAR(255),        -- Short overlay text on hero cards
 *     published_at    TIMESTAMPTZ NOT NULL,
 *     category_id     INTEGER REFERENCES blog_categories(id),
 *     author_id       INTEGER REFERENCES blog_authors(id),
 *     featured_slot   VARCHAR(50),          -- 'hero' | 'popular' | 'editors-pick' | NULL
 *     featured_on_home BOOLEAN DEFAULT FALSE,
 *     read_time_minutes INTEGER,
 *     is_published    BOOLEAN DEFAULT TRUE,
 *     created_at      TIMESTAMPTZ DEFAULT NOW(),
 *     updated_at      TIMESTAMPTZ DEFAULT NOW()
 *   );
 *
 *   TABLE blog_authors (
 *     id              SERIAL PRIMARY KEY,
 *     name            VARCHAR(255) NOT NULL,
 *     role            VARCHAR(255),
 *     avatar_url      VARCHAR(512),         -- CDN URL from /media/ upload
 *     bio             TEXT,
 *     created_at      TIMESTAMPTZ DEFAULT NOW()
 *   );
 */
const blogCoverRegistration = "/blog/company-registration-basics.webp";
const blogCoverTin = "/blog/tin-registration-checklist.webp";
const blogCoverLicensing = "/blog/licensing-renewal-prep.webp";
const blogCoverCalendar = "/blog/compliance-calendar-basics.webp";
const blogCoverTimeline = "/blog/business-registration-timeline.webp";
const blogCoverNgo = "/blog/ngo-registration-guide.webp";
const blogCoverBizName = "/blog/business-name-registration.webp";
const blogCoverTaxReturn = "/blog/tax-return-preparation.webp";
const blogCoverRegulatory = "/blog/regulatory-compliance-framework.webp";
const blogCoverAnnualReturn = "/blog/annual-return-filing.webp";
const blogCoverImportExport = "/blog/import-export-licensing.webp";
const blogCoverBankAccount = "/blog/business-bank-account-setup.webp";
const blogCoverTraObligations = "/blog/tra-tax-obligations.webp";
const blogCoverPartnership = "/blog/partnership-registration.webp";
const blogCoverWorkPermit = "/blog/work-permit-foreign-investors.webp";
const blogCoverDigital = "/blog/digital-business-compliance.webp";

/**
 * Public API fallback records used when live content cannot be reached.
 * Keep these objects aligned with the domain types so page rendering still works offline.
 */
const FALLBACK_RECORD_ID = 0;
const FALLBACK_TIMESTAMP = "fallback";

function createFallbackPage<TContent>(
  slug: string,
  title: string,
  content: TContent,
  metaTitle?: string,
  metaDescription?: string
): PageRecord<TContent> {
  return {
    id: FALLBACK_RECORD_ID,
    title,
    slug,
    content,
    metaTitle,
    metaDescription,
    isPublished: true,
    createdAt: FALLBACK_TIMESTAMP,
    updatedAt: FALLBACK_TIMESTAMP,
  };
}

function createFallbackSiteSetting<TValue>(
  key: string,
  value: TValue
): SiteSetting<TValue> {
  return {
    id: FALLBACK_RECORD_ID,
    key,
    value,
    createdAt: FALLBACK_TIMESTAMP,
    updatedAt: FALLBACK_TIMESTAMP,
  };
}

const fallbackBlogCategories: BlogCategory[] = [
  {
    id: "business-setup",
    label: "Business Setup",
    description: "Foundational guidance for registrations, filings, and first-step compliance.",
  },
  {
    id: "compliance",
    label: "Compliance",
    description: "Practical reminders and process notes for recurring obligations.",
  },
  {
    id: "operations",
    label: "Operations",
    description: "Operational guidance for teams managing growing workloads and deadlines.",
  },
];

function getFallbackCategory(id: string) {
  return fallbackBlogCategories.find((category) => category.id === id);
}

export const fallbackHomePage: PageRecord<HomePageContent> = createFallbackPage(
  "home",
  "Exxonim Consult | Business Setup, Compliance & Permits Tanzania",
  {
    hero: {
      eyebrow: "Business Setup, Compliance & Permits, Tanzania",
      title: "Stop chasing offices.\nWe handle it all\nfrom registration\nto compliance.",
      description:
        "Registration, licensing, permits, and compliance — all handled. Stay updated by WhatsApp, email, or SMS.",
      cta: {
        label: "Get Started",
        href: routes.contact,
      },
      secondary_cta: {
        label: "See All Services",
        href: routes.services,
      },
      highlights: [
        {
          title: "Business Setup",
          detail: "Company, NGO, business name, trademark, and foreign investor registration",
        },
        {
          title: "Tax & Licensing",
          detail: "TIN, VAT, business licences, work permits, and annual returns",
        },
        {
          title: "Live Tracking",
          detail: "WhatsApp, email, or SMS updates at every step, no login needed",
        },
      ],
    },
    provider_section: {
      kicker: "Trusted by organisations across Tanzania",
      title: "We work with businesses, NGOs, and institutions nationwide.",
      logos: [
        { alt: "Utec", src: utecLogo, opticalWeight: "solid" },
        { alt: "TRCS", src: trcsLogo, opticalWeight: "solid" },
        { alt: "Levo", src: levoLogo, opticalWeight: "wordmark" },
        { alt: "GET", src: getLogo, opticalWeight: "wordmark" },
        { alt: "BPO", src: bpoLogo, opticalWeight: "solid" },
        { alt: "FAMA", src: famaLogo, opticalWeight: "solid" },
        { alt: "Jotofa", src: jotofaLogo, opticalWeight: "wordmark" },
        { alt: "JKM", src: jkmLogo, opticalWeight: "solid" },
        { alt: "Djema Consult", src: djemaLogo, opticalWeight: "wordmark" },
        { alt: "Exxonim", src: exxonimLogo, opticalWeight: "wordmark" },
      ],
    },
    stack_section: {
      items: [
        {
          title: "Everything you need to start operating in Tanzania",
          subtitle: "From company registration and TIN to business licences, work permits, and NGO setup.",
          description:
            "We guide you through the full setup: pick the right business type, prepare all documents, and submit to BRELA, TRA, and local authorities. You get your certificates without office visits.",
          ctaLabel: "Start Your Setup",
          ctaHref: routes.contact,
          windowTitle: "Setup",
          windowTag: "Guide",
          videoSources: [],
        },
        {
          title: "We\u00A0let you focus on your business",
          subtitle: "We\u00A0handle all from statutory filings, licence renewals, annual returns, to compliance deadlines for you.",
          description:
            "No more chasing approvals or missing deadlines. We prepare and submit everything on schedule, with reminders before each deadline so nothing falls through the cracks.",
          ctaLabel: "See All Services",
          ctaHref: routes.services,
          windowTitle: "Compliance",
          windowTag: "Guide",
          videoSources: [],
        },
        {
          title: "Never wonder what's happening with your case",
          subtitle: "Get updates by WhatsApp, email, or SMS at every milestone.",
          description:
            "You get a tracking code. Every time something happens, name clearance, submission, approval, we send you a message. You can also check online anytime, no login needed, 99.99% fast & secure.",
          ctaLabel: "Track a Consultation",
          ctaHref: routes.trackConsultation,
          windowTitle: "Tracking",
          windowTag: "Guide",
          videoSources: [
            { src: "/videos/track-consultation.webm?v=2", type: "video/webm" },
            { src: "/videos/track-consultation.mp4?v=2", type: "video/mp4" },
          ],
        },
      ],
      default_feature_rows: [
        {
          title: "Business registration",
          description: "Company, NGO, business name, trademark, and foreign investor setup.",
          visualKey: "registration",
        },
        {
          title: "Tax & licensing",
          description: "TIN, VAT, business licences, work permits, annual returns, and renewals.",
          visualKey: "tax",
        },
        {
          title: "Live tracking",
          description: "WhatsApp, email, or SMS updates at every step, no login needed.",
          visualKey: "institutional",
        },
      ],
      feature_visual_content: {
        registration: {
          workstreamValue: "Registration",
          counterpartLabel: "Client",
          counterpartValue: "Business setup",
          focusValue: "Setup path",
          summaryTitle: "From first step to your certificate.",
          summaryBody:
            "We guide you through company, NGO, business name, trademark, and foreign investor registration, including TIC/TISEZA for investors entering Tanzania.",
        },
        tax: {
          workstreamValue: "Compliance",
          counterpartLabel: "Client",
          counterpartValue: "Ongoing requirements",
          focusValue: "Filings and renewals",
          summaryTitle: "Never miss a deadline again.",
          summaryBody:
            "We manage TIN, VAT, business licences, work permits, statutory filings, and annual returns, with reminders before every deadline so nothing lapses.",
        },
        institutional: {
          workstreamValue: "Operations",
          counterpartLabel: "Client",
          counterpartValue: "Always informed",
          focusValue: "Live updates, compliance calendar, advisory",
          summaryTitle: "Support when you need it.",
          summaryBody:
            "Automatic updates at every milestone, a compliance calendar to track deadlines, and advisory packages available monthly or quarterly.",
        },
        tracking: {
          workstreamValue: "Consultation tracking",
          counterpartLabel: "Reference",
          counterpartValue: "EXX-24091",
          focusValue: "Status checkpoints, live updates, and next actions",
          summaryTitle: "Know what is done and what comes next, automatically.",
          summaryBody:
            "Every engagement gets a tracking code. You receive updates via WhatsApp, email, or SMS at every milestone, and can check your status online anytime, no login required.",
        },
      },
    },
    insights_section: {
      title: "Latest insights",
      intro: "Practical guides on registration, compliance, and running a business in Tanzania.",
      footer_copy: "Read more articles from our resource library.",
    },
  },
  undefined,
  "Exxonim Consult helps businesses, NGOs, and institutions with company registration, business name registration, trademark protection, licensing, tax compliance, work permits, annual returns, and live consultation tracking from start to certificate."
);

/* BACKEND / ADMIN INTEGRATION NOTES:
 * ──────────────────────────────────
 * About page content. The admin should be able to edit all text fields.
 * Optional sections (support_profiles_section, service_scope_section,
 * operating_model_section, client_expectations_section) can be hidden
 * by setting them to null/undefined in the admin panel.
 *
 * Image requirements (if photos are added in future):
 *   - Team/office photos: WebP, 800×600px, aspect ratio 4:3.
 *   - All images served via CDN (/media/ endpoint from admin upload).
 */
export const fallbackAboutPage: PageRecord<AboutPageContent> = createFallbackPage(
  "about",
  "About Exxonim Consult | Tanzania Business Advisory",
  {
    hero: {
      eyebrow: "About Exxonim Consult",
      title: "Many years of experience standing between organisations and government authorities.",
      description:
        "We handle registrations, filings, and compliance — so you never chase an office, miss a deadline, or wonder what's happening.",
    },
    company_profile: {
      eyebrow: "Who we are",
      title: "We handle the authorities so you can handle your business.",
      paragraphs: [
        "With many years of experience in business registration, licensing, and regulatory compliance, Exxonim Consult stands between organisations and government authorities \u2014 handling every filing, deadline, and authority interaction on our clients\u2019 behalf.",
        "We are not generalists. We are specialists in the regulatory interface \u2014 the space between an organisation and the authorities it must answer to. If the authority is the gate, we walk through it for you.",
      ],
      working_style_label: "How we work",
      working_style: "Structured. Visible. Follow-through oriented.",
    },
    mission_vision: {
      mission:
        "To make registration and compliance effortless for every organisation in Tanzania.",
      vision:
        "To be Tanzania's most trusted compliance partner — no business ever chases an office.",
      global_mission:
        "To become the regulatory interface for businesses operating across East Africa and beyond \u2014 one trusted partner for every jurisdiction, every filing, every milestone.",
      global_vision:
        "A world where any business can operate in any country without regulatory friction \u2014 where compliance is invisible, tracked, and handled.",
    },
    who_we_serve: [
      { label: "Individuals", description: "Entrepreneurs and professionals starting their first business." },
      { label: "Companies", description: "Local businesses managing registration, tax, and compliance." },
      { label: "Foreign Businesses", description: "Investors entering Tanzania — permits, registration, setup." },
      { label: "NGOs & Non-Profits", description: "Organisations handling registration and statutory obligations." },
      { label: "Institutions", description: "Public and private institutions with regulatory obligations." },
    ],
    differentiators: [
      { title: "Specialists, not generalists", description: "We focus on the regulatory interface — the space between you and the authorities." },
      { title: "Visibility at every step", description: "WhatsApp, email, or SMS updates at every milestone. Never wonder what's happening." },
      { title: "One partner, every filing", description: "Registration to compliance, all under one roof. No chasing multiple offices." },
    ],
    support_profiles_section: undefined,
    support_profiles: [],
    service_scope_section: undefined,
    service_scope: [],
    operating_model_section: undefined,
    operating_model: [],
    client_expectations_section: undefined,
    client_expectations: [],
    cta: {
      title: "Ready to work with us?",
      description:
        "Get a tracking code on day one and stay informed at every milestone \u2014 from intake to resolution.",
      primary: {
        label: "Book a Free Consultation",
        href: routes.contact,
      },
      secondary: {
        label: "Explore services",
        href: routes.services,
      },
    },
  },
  undefined,
  "Exxonim Consult is a Tanzania-based business registration and compliance firm with many years of experience handling filings, registrations, and regulatory obligations on behalf of businesses, NGOs, and institutions."
);

/* BACKEND / ADMIN INTEGRATION NOTES:
 * ──────────────────────────────────
 * FAQ page content. The admin should be able to add, edit, reorder, and
 * delete FAQ items. Suggested guidelines:
 *   - Keep questions short (max ~80 characters).
 *   - Keep answers practical and concise (2–3 sentences).
 *   - Max 12 items recommended (avoids overwhelming the 2-column grid).
 *   - Order controls the display sequence.
 */
export const fallbackFaqPage: PageRecord<FaqPageContent> = createFallbackPage(
  "faq",
  "FAQ | Registration, Licensing & Compliance Questions",
  {
    hero: {
      eyebrow: "Common questions",
      title: "Frequently asked questions",
      description:
        "Practical answers to the questions organisations ask most often about registration, compliance, and working with Exxonim.",
    },
    items: [
      {
        question: "What types of entities can Exxonim help register?",
        answer:
          "Exxonim supports registration for companies, NGOs, and business names. The team guides you through entity type selection, document preparation, and authority submission.",
      },
      {
        question: "How long does company registration take?",
        answer:
          "Timelines depend on the entity type and authority processing speed. Exxonim tracks every submission and follows up proactively so you always know where things stand.",
      },
      {
        question: "What is a TIN and do I need one?",
        answer:
          "A Tax Identification Number is required for most registered entities in Tanzania. Exxonim handles TIN applications as part of the setup process.",
      },
      {
        question: "Can I track the status of my consultation?",
        answer:
          "Yes. Every consultation is assigned a reference ID. You can use it to check what is complete, what is pending, and what comes next at every stage.",
      },
      {
        question: "What happens after I submit a request?",
        answer:
          "The Exxonim team reviews your case, confirms the required documents, and prepares the filing sequence. You receive a reference ID to track progress throughout.",
      },
      {
        question: "Does Exxonim handle licensing renewals?",
        answer:
          "Yes. Exxonim tracks renewal deadlines, prepares the required documents, and submits renewals on your behalf so obligations do not lapse.",
      },
    ],
  },
  undefined,
  "Answers to common questions about business registration, TIN applications, licensing renewals, and consultation tracking with Exxonim Consult in Tanzania."
);

/* BACKEND / ADMIN INTEGRATION NOTES:
 * ──────────────────────────────────
 * Services page content. The admin should be able to:
 *   - Edit overview text (eyebrow, title, description, panel)
 *   - Manage service_signals (the 3 metric badges): value should be short
 *     (e.g., "3+", "100%"), label concise, detail one sentence.
 *   - Manage service_nav_groups (the navigation cards): title, summary,
 *     href, and items list. Max 3 groups recommended.
 *   - Manage service_flow (the step-by-step flow): step is a short label
 *     (e.g., "01"), title and detail are 1–2 sentences each. Max 4 steps.
 *   - Manage service_promises (bullet list): max 4 items.
 *   - Manage catalog: eyebrow, title, description, service_groups.
 *     Each group has title, description, and services list.
 *     Max 3 groups, max 6 services per group.
 *   - Manage tracking_section: checkpoints, case_examples, workflow_steps.
 * Image requirements:
 *   - Service icons: SVG, 24×24px viewbox, single-color (uses currentColor).
 *   - Catalog illustrations: WebP, 400×300px, aspect ratio 4:3.
 */
export const fallbackServicesPage: PageRecord<ServicesPageContent> = createFallbackPage(
  "services",
  "Business Registration, Licensing & Compliance Services",
  {
    overview: {
      eyebrow: "Registration & Compliance",
      title: "Your business, registered and kept compliant — without the office visits",
      description:
        "From first registration to recurring filings, Exxonim handles every step so you can focus on running your business. No office visits required — we file everything electronically and keep you updated via WhatsApp.",
      panel_title: "Trusted by businesses across Tanzania",
      panel_body:
        "Every engagement is tracked from intake to resolution. You always know what is complete, what is pending, and what comes next.",
      service_signals: [
        { value: "120+", label: "Companies registered", detail: "Businesses trust Exxonim for registration and compliance" },
        { value: "100%", label: "Tracked", detail: "Every consultation assigned a reference ID" },
        { value: "58+", label: "Google reviews", detail: "Verified reviews from real clients on Google" },
      ],
      service_nav_groups: [
        {
          title: "Business Setup",
          summary: "Registration support for companies, business names, NGOs, and trademarks.",
          href: routes.services,
          items: ["Company Registration", "Business Name Registration", "Trademark Registration", "TIN Application"],
        },
        {
          title: "Compliance Support",
          summary: "Annual returns, recurring filings, renewals, and regulatory follow-up.",
          href: routes.services,
          items: ["Annual Returns", "Statutory Filings", "Regulatory Renewals", "Operational Advisory"],
        },
        {
          title: "Work Permits & Foreign Investment",
          summary: "Support for international investors and expatriate workers.",
          href: routes.services,
          items: ["Work Permit Applications", "TIC / TISEZA Registration", "Foreign Company Registration"],
        },
      ],
      service_flow: [
        { step: "01", title: "Intake", detail: "We confirm the entity type, document requirements, and filing sequence." },
        { step: "02", title: "Preparation", detail: "Documents are reviewed and the submission path is mapped before filing." },
        { step: "03", title: "Submission", detail: "Your application is submitted to the relevant authority with supporting documents." },
        { step: "04", title: "Follow-through", detail: "We track the status, follow up, and confirm the outcome." },
      ],
      service_promises: [
        "Every case is tracked with a reference ID.",
        "Proactive follow-up on deadlines and queries.",
        "Clear communication at every stage.",
        "Structured support that fits how your team works.",
      ],
    },
    catalog: {
      eyebrow: "Service catalog",
      title: "What Exxonim covers",
      description:
        "A structured overview of the registration, licensing, and compliance services available.",
      service_groups: [
        {
          title: "Business Setup",
          description: "End-to-end registration support for new entities.",
          benefitHeadline: "Legally trade within 5–10 business days",
          services: [
            { id: "company-registration", label: "Company Registration", detail: "Incorporation and first-step authority submissions.", startingPrice: "From TZS 350,000" },
            { id: "business-name-registration", label: "Business Name Registration", detail: "Sole proprietorship and trading name registration through BRELA.", startingPrice: "From TZS 150,000" },
            { id: "ngo-registration", label: "NGO Registration", detail: "Non-profit entity setup and compliance baseline.", startingPrice: "From TZS 500,000" },
            { id: "trademark-registration", label: "Trademark Registration", detail: "Brand and trade name protection through BRELA intellectual property office.", startingPrice: "From TZS 200,000" },
            { id: "tin-application", label: "TIN Application", detail: "Tax Identification Number registration and account setup.", startingPrice: "From TZS 100,000" },
            { id: "business-license", label: "Business License Applications", detail: "License applications and regulatory approvals." },
          ],
        },
        {
          title: "Compliance Support",
          description: "Ongoing obligations managed with clear follow-through.",
          benefitHeadline: "Never miss a filing deadline again",
          services: [
            { id: "annual-returns", label: "Annual Returns", detail: "BRELA annual return filing and beneficial ownership updates.", startingPrice: "From TZS 150,000" },
            { id: "statutory-filings", label: "Statutory Filings", detail: "Recurring filing obligations prepared and submitted on schedule.", startingPrice: "From TZS 100,000" },
            { id: "regulatory-renewals", label: "Regulatory Renewals", detail: "Proactive tracking and timely processing of renewals.", startingPrice: "From TZS 100,000" },
            { id: "operational-advisory", label: "Operational Advisory", detail: "Structured guidance for teams managing multiple obligations." },
          ],
        },
        {
          title: "Work Permits & Foreign Investment",
          description: "Support for international investors and expatriate workers.",
          benefitHeadline: "Set up in Tanzania without leaving home",
          services: [
            { id: "work-permit", label: "Work Permit Applications", detail: "Residence and work permit processing for foreign investors and employees.", startingPrice: "From TZS 500,000" },
            { id: "tic-registration", label: "TIC / TISEZA Registration", detail: "Investment centre registration and compliance for foreign-owned entities.", startingPrice: "From TZS 800,000" },
            { id: "foreign-company-reg", label: "Foreign Company Registration", detail: "Branch office and subsidiary setup for international businesses.", startingPrice: "From TZS 600,000" },
          ],
        },
      ],
    },
    problem_framing: [
      {
        icon: "frustrated",
        quote: "I spent 3 days going back and forth to BRELA...",
        description: "Multiple office visits, unclear requirements, and long queues waste time you don't have.",
      },
      {
        icon: "documents",
        quote: "I never know which documents are right until they get rejected.",
        description: "Incomplete submissions mean rejections, delays, and costly resubmissions.",
      },
      {
        icon: "clock",
        quote: "I missed the BRELA return deadline again.",
        description: "Deadline surprises lead to penalties and compliance risks you could have avoided.",
      },
    ],
    faq: [
      {
        question: "Do I need to visit any office in person?",
        answer: "No. We file everything electronically and keep you updated via WhatsApp. Our team liaises with all regulators — BRELA, TRA, NSSF, WCF, OSHA — on your behalf.",
        cta: { label: "Book a free consultation", href: routes.contact },
      },
      {
        question: "How long does company registration take?",
        answer: "Typically 5–10 business days from when we receive your complete documents. Delays can occur if BRELA requests additional information, but we follow up proactively.",
        cta: { label: "Get started with registration", href: routes.contact },
      },
      {
        question: "What documents do I need to get started?",
        answer: "It depends on the service. For company registration, you'll need director details, a proposed company name, and a registered office address. We'll send you a clear checklist after your consultation.",
        cta: { label: "Request a consultation", href: routes.contact },
      },
      {
        question: "Can I track my consultation status?",
        answer: "Yes — every engagement gets a 6-character tracking code. Enter it on our Track Your Consultation page for an instant status check. No login required.",
        cta: { label: "Track your consultation", href: routes.trackConsultation },
      },
      {
        question: "What's included in the compliance reminders?",
        answer: "We track all major compliance deadlines — BRELA returns, TRA filings, WCF, NSSF, OSHA renewals — and send you advance reminders via WhatsApp. No time limit, no cut-off.",
        cta: { label: "Get compliance support", href: routes.contact },
      },
      {
        question: "Do you handle work permits for foreign employees?",
        answer: "Yes. We process work permits, residence permits, and TIC/TISEZA registration for foreign investors and employees. Everything is handled remotely — no office visits needed.",
        cta: { label: "Apply for a work permit", href: routes.contact },
      },
      {
        question: "What are your service fees?",
        answer: "Fees vary by service. Company registration starts from TZS 350,000. We provide a clear quote before any work begins — no hidden charges, no surprises.",
        cta: { label: "Get a quote", href: routes.contact },
      },
      {
        question: "What happens after I submit an inquiry?",
        answer: "You'll receive a tracking code via WhatsApp within one business day. Use it to check your status anytime. We also send milestone updates automatically.",
        cta: { label: "Submit an inquiry", href: routes.contact },
      },
    ],
    tracking_section: {
      eyebrow: "Consultation tracking",
      title: "Track every consultation from intake to resolution",
      description:
        "Every consultation is assigned a unique reference ID. You can see what is complete, what is pending, and what comes next at every stage.",
      checkpoints: [
        { title: "Intake", detail: "Case details confirmed, reference ID assigned.", status: "complete" },
        { title: "Review", detail: "Documents verified, filing sequence prepared.", status: "complete" },
        { title: "Submission", detail: "Application filed with the relevant authority.", status: "in_progress" },
        { title: "Resolution", detail: "Outcome confirmed, documents delivered.", status: "pending" },
      ],
      case_examples: [
        { title: "Company Registration", detail: "EXX-24091 — In submission phase" },
        { title: "TIN Application", detail: "EXX-24088 — Resolved, TIN issued" },
      ],
      workflow_steps: [
        { title: "Request submitted", detail: "Client reaches out, Exxonim logs the inquiry." },
        { title: "Review and preparation", detail: "Team confirms documents and filing path." },
        { title: "Authority submission", detail: "Application is filed with the relevant body." },
        { title: "Resolution and delivery", detail: "Outcome confirmed, final documents delivered." },
      ],
    },
  },
  undefined,
  "Business registration, business name registration, trademark registration, TIN applications, licensing, annual returns, statutory filings, compliance, and work permit support services from Exxonim Consult."
);

/* BACKEND / ADMIN INTEGRATION NOTES (Resources/Blog page):
 * ────────────────────────────────────────────────────────
 * The Resources page displays a hero post + trending rail + category grid.
 * The `top_media` object provides fallback images for the hero banner and
 * trending section when posts don't have coverImageSrc. In production,
 * these will come from the blog API and the post's own coverImageSrc.
 *
 * Image specs for top_media:
 *   - hero: 1344×768px WebP, landscape, used as the featured post cover.
 *   - banner: 1008×336px WebP, wide landscape, used as the trending header.
 *   - trending[]: 288×240px WebP, used as thumbnails in the trending rail.
 * All images served via CDN (/media/ endpoint) in production.
 */
export const fallbackResourcesPage: PageRecord<ResourcesPageContent> =
  createFallbackPage("resources", "Resources", {
    hero_title: "Guides, updates, and practical notes for setup and compliance work",
    trending_label: "Trending reads",
    top_media: {
      hero: blogCoverRegistration,
      banner: blogCoverTin,
      trending: [
        blogCoverLicensing,
        blogCoverCalendar,
        blogCoverRegistration,
      ],
    },
    article_sidebar: {
      title: "Need direct help?",
      description:
        "Browse the available articles or contact Exxonim directly for personalised guidance on your specific situation.",
      primary_cta: {
        label: "Contact Exxonim",
        href: routes.contact,
      },
    },
    empty_state: {
      title: "No articles match this filter.",
      description:
        "Try adjusting your search or filter, or contact Exxonim directly for immediate guidance.",
    },
  },
  "Guides, Compliance Updates & Articles | Exxonim Consult",
  "Practical guides, compliance updates, and articles on business registration, licensing, and regulatory requirements in Tanzania."
);

export const fallbackCareerPage: PageRecord<CareerPageContent> = createFallbackPage(
  "career",
  "Careers at Exxonim Consult | Tanzania",
  {
    hero: {
      eyebrow: "Join the team",
      title: "Build your career at Exxonim.",
      description:
        "Explore current opportunities and learn about the teams Exxonim is building across client operations, compliance, and advisory work.",
      banner_image: "/careers/banner-enhanced.png",
    },
    focus_areas: [
      "Client operations and workflow coordination",
      "Regulatory and compliance support",
      "Structured follow-up and document readiness",
    ],
    status: {
      label: "Current opportunities",
      description:
        "Explore open roles and send your application through the contact page. The Exxonim team reviews every submission.",
      primary: {
        label: "Contact Exxonim",
        href: routes.contact,
      },
      secondary: {
        label: "Browse resources",
        href: routes.resources,
      },
    },
  },
  undefined,
  "Explore career opportunities at Exxonim Consult in Tanzania. Roles in client operations, compliance support, and regulatory advisory."
);

export const fallbackContactPage: PageRecord<ContactPageContent> = createFallbackPage(
  "contact",
  "Contact Exxonim Consult | Business Advisory Tanzania",
  {
    hero: {
      eyebrow: "Get in touch",
      title: "Reach Exxonim for registration, compliance, and advisory support.",
      description:
        "Use the contact route that works best for you — email, phone, or WhatsApp — and the Exxonim team will follow up promptly.",
    },
    cards: [
      {
        label: "Email",
        value: fallbackCompanyInfo.emails[0] ?? "Send an email to Exxonim",
        description: "Best for sending structured details and follow-up questions.",
        action: {
          label: "Email Exxonim",
          href: `mailto:${fallbackCompanyInfo.emails[0] ?? ""}`,
        },
      },
      {
        label: "Phone",
        value: fallbackCompanyInfo.phones[0] ?? "Call Exxonim directly",
        description: "Use the direct phone path when you need a quick conversation.",
        action: {
          label: "Call Exxonim",
          href: `tel:${(fallbackCompanyInfo.phones[0] ?? "").replace(/\s+/g, "")}`,
        },
      },
      {
        label: "WhatsApp",
        value: "Direct messaging",
        description: "Send a message through WhatsApp and the team will respond as soon as possible.",
        action: {
          label: "Open WhatsApp",
          href: fallbackCompanyInfo.whatsapp || routes.contact,
        },
      },
    ],
  },
  undefined,
  "Contact Exxonim Consult by email, phone, or WhatsApp for business registration, licensing, and compliance advisory in Tanzania."
);

export const fallbackPrivacyPage: PageRecord<InfoPageContent> = createFallbackPage(
  "privacy",
  "Privacy Policy",
  {
    hero: {
      eyebrow: "Privacy notice",
      title: "Customer and service history lives in the database, not in browser cookies.",
      description:
        "Exxonim uses secure session cookies for admin access, keeps customer and service records in PostgreSQL, and limits browser-side storage to optional preferences like theme memory when you allow it.",
    },
    sections: [
      {
        title: "What we store",
        paragraphs: [
          "Customer history, service records, notes, documents, inbox messages, notifications, and audit logs are stored in the backend database.",
          "We do not use cookies as the main source of truth for business records.",
        ],
      },
      {
        title: "Why we store it",
        paragraphs: [
          "The platform needs operational history to manage requests, track work, notify staff, and produce internal reports grounded in real records.",
          "Retention and access are governed by internal policies and role-based permissions.",
        ],
      },
    ],
    next_step: {
      title: "Need a data request?",
      description:
        "Use Exxonim's support or contact channels and the team will log and process the request through the admin privacy workflow.",
      primary_action: {
        label: "Contact Exxonim",
        href: routes.contact,
      },
      secondary_action: {
        label: "Read your data rights",
        href: routes.dataRights,
      },
    },
  }
);

export const fallbackCookiePage: PageRecord<InfoPageContent> = createFallbackPage(
  "cookies",
  "Cookie Notice",
  {
    hero: {
      eyebrow: "Cookie notice",
      title: "Cookies stay minimal and tied to real browser behavior.",
      description:
        "Necessary cookies support secure admin sessions and consent-state identification. Optional preference storage is limited to browser-side theme memory when you allow it.",
    },
    sections: [
      {
        title: "Necessary storage",
        paragraphs: [
          "Admin authentication uses secure session cookies together with CSRF protection.",
          "Consent records are tied to a consent identifier so the site can remember your choice.",
        ],
      },
      {
        title: "Optional preferences",
        paragraphs: [
          "Theme memory is the only browser preference storage used in this phase, and it should not be treated as a business record.",
          "Analytics and marketing cookies are not active unless the product truly starts using them in a later phase.",
        ],
      },
    ],
    next_step: {
      title: "Review the full privacy details",
      description:
        "The privacy policy and data-rights notice explain what is stored in the system and how requests are handled.",
      primary_action: {
        label: "Privacy policy",
        href: routes.privacy,
      },
      secondary_action: {
        label: "Data rights",
        href: routes.dataRights,
      },
    },
  }
);

export const fallbackDataRightsPage: PageRecord<InfoPageContent> = createFallbackPage(
  "data-rights",
  "Data Rights",
  {
    hero: {
      eyebrow: "Data rights",
      title: "Access, correction, and deletion requests are handled through a documented internal workflow.",
      description:
        "Exxonim keeps privacy handling operational and auditable. Requests are logged internally, reviewed, and processed without silently deleting audit-critical history.",
    },
    sections: [
      {
        title: "Available request types",
        paragraphs: [
          "You can ask for access to personal data, correction of inaccurate data, or deletion handling where legally and operationally appropriate.",
        ],
        bullets: [
          "Access requests",
          "Correction requests",
          "Deletion requests with reviewed anonymization or constrained delete handling",
        ],
      },
      {
        title: "How requests are handled",
        paragraphs: [
          "Requests currently come through existing support and contact channels, then staff log them into the admin privacy-request workflow.",
          "Deletion handling avoids silent hard deletion of audit-critical records and keeps an explicit audit trail.",
        ],
      },
    ],
    next_step: {
      title: "Start a request",
      description:
        "Use the contact or support page and Exxonim staff will log the request for verification and follow-up.",
      primary_action: {
        label: "Contact Exxonim",
        href: routes.contact,
      },
      secondary_action: {
        label: "Support",
        href: routes.support,
      },
    },
  }
);

/* BACKEND / ADMIN INTEGRATION NOTES (Fallback blog posts):
 * ──────────────────────────────────────────────────────────
 * These 4 fallback posts are used when the blog API is unavailable.
 * They demonstrate the full BlogPost type including coverImageSrc, author,
 * and featuredSlot. The admin should create real posts matching this structure.
 *
 * Image paths: During development, images are served from /public/blog/.
 * In production, coverImageSrc will contain CDN URLs from the /media/ endpoint.
 * The admin upload flow should:
 *   1. Accept WebP, PNG, or JPEG uploads.
 *   2. Auto-generate a WebP version at 1344×768px for the cover.
 *   3. Auto-generate a 400×250px thumbnail for grid cards.
 *   4. Store the CDN URL in the blog_posts.cover_image_url column.
 *   5. Require cover_alt text (accessibility) — min 10 characters.
 *
 * Author data: In production, author info comes from the blog_authors table.
 * The admin should manage author profiles with name, role, and avatar.
 * Avatar: 96×96px square, WebP or PNG. Centered subject (displayed as 38px circle).
 */
export const fallbackBlogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "company-registration-basics",
    title: "Company registration basics before your first filing",
    excerpt:
      "A short checklist for preparing incorporation details, supporting documents, and first-step authority submissions.",
    publishedAt: "2026-03-22",
    category: getFallbackCategory("business-setup"),
    author: {
      id: "author-exxonim-1",
      name: "Exxonim Advisory",
      role: "Registration Specialist",
      avatarSrc: undefined,
      bio: "Exxonim's advisory team provides structured guidance through entity registration and compliance workflows.",
    },
    coverImageSrc: blogCoverRegistration,
    coverAlt: undefined,
    mediaLabel: "Company registration basics",
    featuredSlot: "hero",
    featuredOnHome: true,
    readTimeMinutes: 9,
    relatedSlugs: ["tin-registration-checklist", "compliance-calendar-basics"],
    content: {
      introduction:
        "Start with the exact entity type, ownership information, and document set you expect to file so the process does not stall later.",
      highlights: [
        "Confirm the legal structure first.",
        "Prepare identity and address documents before filing.",
        "Map which authority comes first in your sequence.",
        "Tanzania registration process.",
      ],
      html: `<p>Starting a company in Tanzania involves several sequential steps that, when followed correctly, lead to a smooth registration process. Whether you are registering a limited liability company, a branch office, or a business name, the foundational requirements remain largely the same.</p>

<h2>Choose the right entity type</h2>
<p>The first and most important decision is selecting the correct legal structure for your business. In Tanzania, the main entity types are:</p>
<ul>
<li><strong>Private Limited Company</strong> — The most common structure for local and foreign investors. Requires at least one director and one shareholder. Liability is limited to share capital.</li>
<li><strong>Public Limited Company</strong> — Suitable for larger operations planning to raise capital publicly. Requires at least three directors and seven shareholders.</li>
<li><strong>Business Name Registration</strong> — For sole proprietors or partnerships operating under a trade name. Simpler registration, but no limited liability protection.</li>
<li><strong>NGO Registration</strong> — For non-profit organisations. Registered through the Ministry of Health, Community Development, Gender, Elderly and Children or the Vice President's Office.</li>
</ul>
<p>Choosing the wrong entity type early on can cause delays later when you discover that your structure does not support the activities you planned. Take time to confirm the right fit before moving forward.</p>

<h2>Gather your documents before filing</h2>
<p>Document readiness is the single biggest factor in whether a registration proceeds smoothly or stalls. Before you approach any authority, make sure you have the following prepared:</p>
<ol>
<li>Copy of national ID or passport for each director and shareholder</li>
<li>Passport-size photographs of each director</li>
<li>Proof of registered office address (lease agreement or utility bill)</li>
<li>Draft memorandum and articles of association</li>
<li>Proposed company names (at least three alternatives, in order of preference)</li>
<li>Share capital details and allocation among shareholders</li>
</ol>
<p>Missing even one document can mean a return trip to the authority. A simple filing checklist prevents these avoidable delays.</p>

<blockquote><p>The most common reason registrations stall is not the authority processing time — it is incomplete document submissions. Prepare thoroughly before your first filing.</p></blockquote>

<h2>Understand the filing sequence</h2>
<p>Registration in Tanzania follows a specific sequence. Attempting to skip steps or file out of order almost always creates additional work:</p>
<p><strong>Step 1: Name reservation</strong> — Submit your proposed names to BRELA (Business Registration and Licensing Agency). Name clearance typically takes 1 to 3 working days. Once approved, the name is reserved for 30 days.</p>
<p><strong>Step 2: Document preparation</strong> — With a reserved name, prepare the memorandum and articles of association, Form 1A (application for incorporation), and all supporting documents.</p>
<p><strong>Step 3: Incorporation filing</strong> — Submit the complete package to BRELA. Processing typically takes 5 to 10 working days, though this can vary based on workload and completeness of your submission.</p>
<p><strong>Step 4: Certificate collection</strong> — Once approved, collect your Certificate of Incorporation. This document is required for every subsequent step, including TIN registration, bank account opening, and business license applications.</p>

<h2>Common mistakes that delay registration</h2>
<p>After guiding hundreds of registrations, the same issues come up repeatedly. Being aware of these in advance can save weeks of delay:</p>
<ul>
<li><strong>Name conflicts</strong> — Choosing names that are too similar to existing companies. Always prepare multiple alternatives.</li>
<li><strong>Inconsistent information</strong> — Names, addresses, and ID numbers must match exactly across all documents. Even minor discrepancies trigger queries.</li>
<li><strong>Missing share capital details</strong> — The minimum share capital for a limited company must be stated clearly. Ambiguity here causes rejection.</li>
<li><strong>Incorrect forms</strong> — Using outdated or wrong BRELA forms. Always verify the current form version before submission.</li>
</ul>

<h2>What happens after registration</h2>
<p>Receiving your Certificate of Incorporation is the beginning, not the end. Immediately after registration, you need to address several follow-on requirements:</p>
<ol>
<li><strong>TIN Registration</strong> — Apply for a Tax Identification Number with TRA (Tanzania Revenue Authority). Required for all registered entities.</li>
<li><strong>Business License</strong> — Apply through your local government authority or the Online Business Registration Portal (BRIS).</li>
<li><strong>Bank Account</strong> — Open a corporate bank account using your certificate and TIN.</li>
<li><strong>VAT Registration</strong> — If your projected turnover exceeds the threshold, register for VAT within 30 days.</li>
<li><strong>Sector-specific permits</strong> — Depending on your industry, additional permits may be required (e.g., TCIA for construction, TFDA for food and pharmaceuticals).</li>
</ol>
<p>Each of these steps has its own document requirements and processing times. Planning them in sequence — rather than discovering them reactively — keeps your business operational on schedule.</p>

<blockquote><p>A successful registration is one where every step after incorporation has already been planned before the certificate is issued. That is what structured preparation looks like.</p></blockquote>`,
      sections: [],
    },
  },
  {
    id: 2,
    slug: "tin-registration-checklist",
    title: "TIN registration checklist for new businesses",
    excerpt:
      "The basic inputs teams should verify before starting tax registration and related account setup.",
    publishedAt: "2026-03-10",
    category: getFallbackCategory("compliance"),
    author: {
      id: "author-exxonim-1",
      name: "Exxonim Advisory",
      role: "Registration Specialist",
      avatarSrc: undefined,
      bio: "Exxonim's advisory team provides structured guidance through entity registration and compliance workflows.",
    },
    coverImageSrc: blogCoverTin,
    coverAlt: "Tax registration forms and documents organized on a professional desk",
    mediaLabel: "TIN registration checklist",
    featuredSlot: "popular",
    featuredOnHome: true,
    readTimeMinutes: 7,
    relatedSlugs: ["company-registration-basics", "licensing-renewal-prep"],
    content: {
      introduction:
        "Tax registration runs more smoothly when core entity details, contact records, and supporting documents are already aligned.",
      highlights: [
        "Keep legal and trading names consistent.",
        "Prepare contact and location details exactly as filed elsewhere.",
        "TIN application requirements.",
      ],
      html: `<p>A Tax Identification Number (TIN) is required for virtually every registered entity in Tanzania. Whether you are a newly incorporated company or an existing business formalising your tax position, the TRA registration process follows a defined set of steps that reward preparation.</p>

<h2>What you need before applying</h2>
<p>Before visiting the TRA office or using the online portal, ensure you have the following documents ready:</p>
<ul>
<li><strong>Certificate of Incorporation</strong> — Original and one certified copy</li>
<li><strong>Memorandum and Articles of Association</strong> — Certified copy</li>
<li><strong>Directors' IDs</strong> — National ID or passport copies for all directors</li>
<li><strong>Proof of business address</strong> — Lease agreement, utility bill, or title deed</li>
<li><strong>Bank introduction letter</strong> — From your corporate bank confirming account opening</li>
</ul>
<p>Missing any of these documents will result in your application being returned. TRA does not accept partial submissions.</p>

<h2>Common consistency issues</h2>
<p>The most frequent cause of TIN application rejection is inconsistency between documents. Small mismatches create avoidable back-and-forth during review:</p>
<ul>
<li>Company name spelling differences between the certificate and the application form</li>
<li>Director names that do not match across ID documents and company records</li>
<li>Address formats that differ between the lease agreement and the TRA form</li>
<li>TIN numbers for existing directors that are recorded incorrectly</li>
</ul>
<p>Double-check every field against your source documents before submission. A 15-minute review can prevent a two-week delay.</p>

<blockquote><p>Consistency across documents is not optional — it is the difference between a one-visit registration and a multi-visit correction cycle.</p></blockquote>

<h2>Online vs. in-person registration</h2>
<p>TRA now supports both online and in-person TIN applications. Each method has its own considerations:</p>
<p><strong>Online registration</strong> through the TRA portal is faster for straightforward cases. Upload scanned documents, fill in the forms, and receive your TIN electronically. Processing typically takes 2 to 5 working days.</p>
<p><strong>In-person registration</strong> at your local TRA office is better for complex cases, such as entities with foreign directors or those requiring additional clarification. You can address queries immediately rather than waiting for online correspondence.</p>
<p>Choose the method that matches your situation. For most standard registrations, the online process is efficient and sufficient.</p>

<h2>After you receive your TIN</h2>
<p>Once your TIN is issued, several follow-up obligations take effect immediately:</p>
<ol>
<li>Update your bank account records with the TIN</li>
<li>Include the TIN on all official invoices and receipts</li>
<li>File your first tax return by the applicable deadline (even if no tax is due)</li>
<li>Register for VAT if your turnover exceeds the threshold</li>
<li>Set up electronic filing access through the TRA portal</li>
</ol>
<p>A TIN is not a one-time registration — it creates an ongoing relationship with the tax authority. Understanding your obligations from day one prevents compliance issues later.</p>`,
      sections: [],
    },
  },
  {
    id: 3,
    slug: "licensing-renewal-prep",
    title: "How to prepare for licensing and renewal cycles",
    excerpt:
      "A practical way to track renewal dates, support files, and internal approvals before deadlines start to compress.",
    publishedAt: "2026-02-28",
    category: getFallbackCategory("compliance"),
    author: {
      id: "author-exxonim-2",
      name: "Exxonim Operations",
      role: "Compliance Lead",
      avatarSrc: undefined,
      bio: "Exxonim's operations team focuses on practical compliance tracking and deadline management.",
    },
    coverImageSrc: blogCoverLicensing,
    coverAlt: "Business planner with organized calendar and scheduled reminders on a desk",
    mediaLabel: "Licensing renewal prep",
    featuredSlot: "editors-pick",
    featuredOnHome: false,
    readTimeMinutes: 8,
    relatedSlugs: ["tin-registration-checklist", "compliance-calendar-basics"],
    content: {
      introduction:
        "Renewal work is easier when the team keeps one calendar, one document source, and one owner for each filing track.",
      highlights: [
        "Track deadlines in one place.",
        "Assign one accountable owner per renewal stream.",
        "Licensing renewal best practices.",
      ],
      html: `<p>Business licences in Tanzania are not perpetual — they require periodic renewal, and missed deadlines can result in penalties, operational disruption, or even licence revocation. A structured approach to renewal management prevents these outcomes.</p>

<h2>Types of licences that require renewal</h2>
<p>Most businesses in Tanzania hold multiple licences, each with its own renewal cycle:</p>
<ul>
<li><strong>Business Licence</strong> — Annual renewal through the local government authority or BRIS portal</li>
<li><strong>Professional Licences</strong> — Sector-specific permits (e.g., engineering, legal, medical) with varying renewal periods</li>
<li><strong>Import/Export Permits</strong> — Typically annual, managed through TRA and relevant sector authorities</li>
<li><strong>Occupational Licences</strong> — Health and safety permits, fire safety certificates, environmental compliance permits</li>
</ul>
<p>Each licence has a different renewal authority, different document requirements, and different processing times. Tracking them in one place is essential.</p>

<h2>Build a renewal calendar</h2>
<p>The foundation of effective renewal management is a single, visible calendar that captures every licence, its expiry date, and the lead time required for renewal. A practical renewal calendar includes:</p>
<ol>
<li><strong>Licence name and issuing authority</strong> — So you know where to go</li>
<li><strong>Expiry date</strong> — The hard deadline</li>
<li><strong>Internal reminder date</strong> — 60 days before expiry to begin preparation</li>
<li><strong>Document checklist</strong> — What you need to submit</li>
<li><strong>Assigned owner</strong> — One person accountable for tracking each renewal</li>
</ol>
<p>A shared filing calendar prevents deadlines from becoming last-minute recovery work. The calendar only helps if the team can see what is pending and who moves it forward.</p>

<h2>Assign ownership per renewal stream</h2>
<p>Without clear ownership, renewals fall through the cracks. Assign one person as the accountable owner for each renewal stream. Their responsibilities include:</p>
<ul>
<li>Monitoring the renewal calendar and triggering preparation at the reminder date</li>
<li>Collecting and verifying all required documents before submission</li>
<li>Following up with the issuing authority if processing takes longer than expected</li>
<li>Confirming the renewal is completed and updating the calendar for the next cycle</li>
</ul>
<p>When multiple people share responsibility without clear accountability, everyone assumes someone else is handling it. One owner per stream eliminates this gap.</p>

<blockquote><p>The cost of a missed renewal is always higher than the cost of preparation. Late fees, operational downtime, and reputational damage compound quickly.</p></blockquote>

<h2>Common renewal pitfalls</h2>
<p>After managing renewal cycles across dozens of organisations, the same patterns emerge:</p>
<ul>
<li><strong>Starting too late</strong> — 30 days is not enough for most renewals. Start at 60 days to accommodate document gathering and processing time.</li>
<li><strong>Missing prerequisite updates</strong> — Some renewals require an up-to-date TIN certificate or tax clearance. If these have expired, the renewal itself will be delayed.</li>
<li><strong>Ignoring processing delays</strong> — Authorities do not always process renewals on schedule. Build buffer into your timeline.</li>
<li><strong>Not retaining proof</strong> — Always keep copies of submitted documents and receipts. If the authority loses your submission, you have evidence of timely filing.</li>
</ul>

<h2>When to seek professional support</h2>
<p>For organisations with multiple licence types or those operating across different jurisdictions, professional compliance support can reduce risk and save time. Consider engaging support when:</p>
<ul>
<li>You hold more than five distinct licence types</li>
<li>Your licences span multiple authorities or sectors</li>
<li>You have experienced a missed renewal in the past 12 months</li>
<li>Your team does not have a dedicated compliance function</li>
</ul>
<p>Professional support is not about outsourcing responsibility — it is about adding structure and visibility to a process that directly affects your ability to operate.</p>`,
      sections: [],
    },
  },
  {
    id: 4,
    slug: "compliance-calendar-basics",
    title: "Build a simple compliance calendar your team can actually use",
    excerpt:
      "A lightweight operating model for recurring filings, reminders, and decision points across the year.",
    publishedAt: "2026-02-12",
    category: getFallbackCategory("operations"),
    author: {
      id: "author-exxonim-2",
      name: "Exxonim Operations",
      role: "Compliance Lead",
      avatarSrc: undefined,
      bio: "Exxonim's operations team focuses on practical compliance tracking and deadline management.",
    },
    coverImageSrc: blogCoverCalendar,
    coverAlt: "Wall calendar with marked dates and a planning workspace",
    mediaLabel: "Compliance calendar basics",
    featuredOnHome: false,
    readTimeMinutes: 6,
    relatedSlugs: ["licensing-renewal-prep", "company-registration-basics"],
    content: {
      introduction:
        "A workable calendar is short, visible, and tied to the next action rather than stored in disconnected spreadsheets.",
      highlights: [
        "Use one owner and one date per obligation.",
        "Record the next action, not just the deadline.",
        "Compliance calendar framework.",
      ],
      html: `<p>A compliance calendar is only useful if your team actually refers to it. The most effective calendars are simple, visible, and action-oriented — not comprehensive lists of every possible obligation buried in a spreadsheet nobody opens.</p>

<h2>What makes a compliance calendar work</h2>
<p>Three principles separate calendars that get used from calendars that get ignored:</p>
<ol>
<li><strong>Visibility</strong> — The calendar must be accessible to everyone who needs it, without requiring special software access or login credentials. A shared document or dashboard that updates in real time works best.</li>
<li><strong>Action-orientation</strong> — Each entry should describe the next action, not just the deadline. "Submit VAT return by March 25" is more useful than "VAT due Q1."</li>
<li><strong>Single ownership</strong> — Every entry has one person responsible. If two people are listed, neither feels fully accountable.</li>
</ol>
<p>When these three elements are in place, the calendar becomes a working tool rather than a reference document.</p>

<h2>Key dates to include</h2>
<p>At minimum, your compliance calendar should capture the following recurring obligations:</p>
<ul>
<li><strong>VAT returns</strong> — Monthly or quarterly, depending on your registration status</li>
<li><strong>PAYE remittances</strong> — Monthly, by the 9th of the following month</li>
<li><strong>Corporate tax instalments</strong> — Quarterly, based on estimated annual tax</li>
<li><strong>Business licence renewals</strong> — Annual, typically aligned with your registration anniversary</li>
<li><strong>Annual return filing</strong> — Within 30 days of the company's anniversary of incorporation</li>
<li><strong>Statutory audits</strong> — For companies meeting the turnover threshold, annually</li>
</ul>
<p>Each entry should include the authority, the document requirements, and the contact point for queries.</p>

<blockquote><p>The calendar only helps if the team can see what is pending and who moves it forward. A hidden calendar is a useless calendar.</p></blockquote>

<h2>Tools and formats</h2>
<p>The format of your calendar matters less than whether people use it. Common options include:</p>
<ul>
<li><strong>Shared spreadsheet</strong> — Simple, familiar, easy to set up. Works for small teams with fewer than 20 obligations.</li>
<li><strong>Project management tool</strong> — Asana, Monday, or similar platforms add reminders, assignees, and progress tracking. Better for larger teams.</li>
<li><strong>Dedicated compliance platform</strong> — Purpose-built tools with regulatory content pre-loaded. Suitable for organisations with complex compliance landscapes.</li>
</ul>
<p>Start with the simplest tool that your team will actually use. You can always upgrade later — the priority is getting the calendar into daily use.</p>

<h2>Review and maintain</h2>
<p>A compliance calendar is a living document. Schedule a monthly review to:</p>
<ol>
<li>Confirm upcoming deadlines are still accurate</li>
<li>Update any changes in document requirements or processing times</li>
<li>Mark completed items and carry forward any missed deadlines</li>
<li>Add new obligations that have emerged from regulatory changes</li>
</ol>
<p>Without regular maintenance, the calendar drifts out of date and loses credibility. A 30-minute monthly review keeps it accurate and trusted.</p>`,
      sections: [],
    },
  },
  {
    id: 5,
    slug: "business-registration-timeline",
    title: "What to expect on the company registration timeline",
    excerpt:
      "A realistic overview of how long each registration stage takes and what can cause delays in Tanzania.",
    publishedAt: "2026-02-04",
    category: getFallbackCategory("business-setup"),
    author: {
      id: "author-exxonim-1",
      name: "Exxonim Advisory",
      role: "Registration Specialist",
      avatarSrc: undefined,
      bio: "Exxonim's advisory team provides structured guidance through entity registration and compliance workflows.",
    },
    coverImageSrc: blogCoverTimeline,
    coverAlt: "Modern office building in Dar es Salaam business district",
    mediaLabel: "Registration timeline",
    featuredOnHome: true,
    readTimeMinutes: 5,
    relatedSlugs: ["company-registration-basics", "ngo-registration-guide"],
    content: {
      introduction:
        "Registration timelines depend on entity type, document readiness, and authority processing speed. Understanding the typical sequence helps teams plan around realistic expectations.",
      highlights: [
        "Name reservation can take 1-3 working days.",
        "Incorporation filing typically takes 5-10 working days.",
        "Delays often come from incomplete documents, not the authority.",
      ],
      sections: [
        {
          heading: "Typical stages and durations",
          paragraphs: [
            "Name reservation, document preparation, incorporation filing, and certificate collection each have their own processing window.",
            "Build buffer time into your plan so a slow stage does not block everything downstream.",
          ],
        },
      ],
    },
  },
  {
    id: 6,
    slug: "ngo-registration-guide",
    title: "NGO registration steps and compliance requirements",
    excerpt:
      "How non-profit organisations can navigate the registration process and maintain compliance with Tanzanian regulations.",
    publishedAt: "2026-01-20",
    category: getFallbackCategory("business-setup"),
    author: {
      id: "author-exxonim-2",
      name: "Exxonim Operations",
      role: "Compliance Lead",
      avatarSrc: undefined,
      bio: "Exxonim's operations team focuses on practical compliance tracking and deadline management.",
    },
    coverImageSrc: blogCoverNgo,
    coverAlt: "Community meeting discussing NGO plans in Tanzania",
    mediaLabel: "NGO registration guide",
    featuredOnHome: true,
    readTimeMinutes: 7,
    relatedSlugs: ["company-registration-basics", "regulatory-compliance-framework"],
    content: {
      introduction:
        "NGO registration follows a distinct path from company registration, with its own documentation requirements and compliance obligations.",
      highlights: [
        "Prepare constitution and board details before filing.",
        "Compliance obligations differ from for-profit entities.",
        "Annual returns and activity reports are recurring requirements.",
      ],
      sections: [
        {
          heading: "Key differences from company registration",
          paragraphs: [
            "NGOs must submit a constitution, board member details, and proof of intended activities. The review process also involves sector-specific approvals in some cases.",
          ],
        },
      ],
    },
  },
  {
    id: 7,
    slug: "business-name-registration",
    title: "Business name registration for sole proprietors",
    excerpt:
      "A straightforward guide for individuals registering a business name in Tanzania, from name search to certificate.",
    publishedAt: "2026-01-08",
    category: getFallbackCategory("business-setup"),
    author: {
      id: "author-exxonim-1",
      name: "Exxonim Advisory",
      role: "Registration Specialist",
      avatarSrc: undefined,
      bio: "Exxonim's advisory team provides structured guidance through entity registration and compliance workflows.",
    },
    coverImageSrc: blogCoverBizName,
    coverAlt: "Entrepreneur opening a small business storefront",
    mediaLabel: "Business name registration",
    featuredOnHome: false,
    readTimeMinutes: 4,
    relatedSlugs: ["company-registration-basics", "business-registration-timeline"],
    content: {
      introduction:
        "Business name registration is the simplest entity setup path in Tanzania, but it still requires the right documents and steps in the correct order.",
      highlights: [
        "Name availability search comes first.",
        "Sole proprietor registration is faster than company incorporation.",
        "A business name does not create a separate legal entity.",
      ],
      sections: [
        {
          heading: "The registration path",
          paragraphs: [
            "Start with a name search, then submit the registration form with identity documents and the prescribed fee. Processing is typically faster than company registration.",
          ],
        },
      ],
    },
  },
  {
    id: 8,
    slug: "tax-return-preparation",
    title: "How to prepare for your first tax return filing",
    excerpt:
      "Practical steps for new entities preparing their first tax return, including documentation, deadlines, and common mistakes.",
    publishedAt: "2025-12-18",
    category: getFallbackCategory("compliance"),
    author: {
      id: "author-exxonim-2",
      name: "Exxonim Operations",
      role: "Compliance Lead",
      avatarSrc: undefined,
      bio: "Exxonim's operations team focuses on practical compliance tracking and deadline management.",
    },
    coverImageSrc: blogCoverTaxReturn,
    coverAlt: "Accountant preparing financial statements on a laptop",
    mediaLabel: "Tax return preparation",
    featuredOnHome: false,
    readTimeMinutes: 6,
    relatedSlugs: ["tin-registration-checklist", "annual-return-filing"],
    content: {
      introduction:
        "The first tax return filing can feel complicated, but it follows a predictable structure when you have the right documents prepared.",
      highlights: [
        "Gather financial records early.",
        "Understand which return type applies to your entity.",
        "File on time to avoid penalties.",
      ],
      sections: [
        {
          heading: "Common first-time mistakes",
          paragraphs: [
            "Missing the filing deadline, incomplete financial statements, and inconsistent information across forms are the most common issues Exxonim sees in first-time filings.",
          ],
        },
      ],
    },
  },
  {
    id: 9,
    slug: "regulatory-compliance-framework",
    title: "Building a regulatory compliance framework for your organisation",
    excerpt:
      "A structured approach to identifying, tracking, and meeting your regulatory obligations across the year.",
    publishedAt: "2025-12-05",
    category: getFallbackCategory("operations"),
    author: {
      id: "author-exxonim-1",
      name: "Exxonim Advisory",
      role: "Registration Specialist",
      avatarSrc: undefined,
      bio: "Exxonim's advisory team provides structured guidance through entity registration and compliance workflows.",
    },
    coverImageSrc: blogCoverRegulatory,
    coverAlt: "Compliance checklist clipboard with organized filing system",
    mediaLabel: "Compliance framework",
    featuredOnHome: true,
    readTimeMinutes: 8,
    relatedSlugs: ["compliance-calendar-basics", "licensing-renewal-prep"],
    content: {
      introduction:
        "A compliance framework does not need to be complex. It needs to be visible, owned, and tied to the next action for each obligation.",
      highlights: [
        "List every obligation with its authority and deadline.",
        "Assign one owner per obligation.",
        "Review and update the framework quarterly.",
      ],
      sections: [
        {
          heading: "Starting the framework",
          paragraphs: [
            "Begin with the obligations you already know, then add new ones as they emerge. A simple spreadsheet or tracking tool is enough to start — the key is consistent review.",
          ],
        },
      ],
    },
  },
  {
    id: 10,
    slug: "annual-return-filing",
    title: "Annual return filing: what to prepare and when",
    excerpt:
      "A practical timeline for annual return preparation, including the documents you need and common reasons for delays.",
    publishedAt: "2025-11-22",
    category: getFallbackCategory("compliance"),
    author: {
      id: "author-exxonim-2",
      name: "Exxonim Operations",
      role: "Compliance Lead",
      avatarSrc: undefined,
      bio: "Exxonim's operations team focuses on practical compliance tracking and deadline management.",
    },
    coverImageSrc: blogCoverAnnualReturn,
    coverAlt: "Annual report documents with charts and organized folders",
    mediaLabel: "Annual return filing",
    featuredOnHome: false,
    readTimeMinutes: 5,
    relatedSlugs: ["tax-return-preparation", "licensing-renewal-prep"],
    content: {
      introduction:
        "Annual returns are a recurring compliance obligation. Preparing early and having a consistent process makes each cycle smoother.",
      highlights: [
        "Start preparing 30 days before the due date.",
        "Confirm the return type matches your entity structure.",
        "Keep financial statements consistent with prior filings.",
      ],
      sections: [
        {
          heading: "Preparation checklist",
          paragraphs: [
            "Verify your entity details are current, confirm the filing period, prepare the financial summary, and submit before the deadline. Late filing triggers penalties and can affect your compliance record.",
          ],
        },
      ],
    },
  },
  {
    id: 11,
    slug: "import-export-licensing",
    title: "Import and export licensing requirements in Tanzania",
    excerpt:
      "A clear breakdown of permits, registrations, and documentation needed to move goods across Tanzanian borders.",
    publishedAt: "2025-11-10",
    category: getFallbackCategory("operations"),
    author: {
      id: "author-exxonim-2",
      name: "Exxonim Operations",
      role: "Compliance Lead",
      avatarSrc: undefined,
      bio: "Exxonim's operations team focuses on practical compliance tracking and deadline management.",
    },
    coverImageSrc: blogCoverImportExport,
    coverAlt: "Shipping containers at Dar es Salaam port with customs documentation",
    mediaLabel: "Import-export licensing",
    featuredOnHome: false,
    readTimeMinutes: 6,
    relatedSlugs: ["regulatory-compliance-framework", "business-registration-timeline"],
    content: {
      introduction:
        "Importing and exporting goods in Tanzania requires specific licenses, permits, and registrations depending on the product category and trade direction.",
      highlights: [
        "Confirm which licenses apply to your product type.",
        "Prepare customs documentation before shipping.",
        "Track renewal dates for trade permits.",
      ],
      sections: [
        {
          heading: "Key permits and where to start",
          paragraphs: [
            "Most trade activities require a business license, TRA tax registration, and product-specific permits. Start with the Tanzania Revenue Authority and the relevant sector regulator before arranging logistics.",
          ],
        },
      ],
    },
  },
  {
    id: 12,
    slug: "business-bank-account-setup",
    title: "How to open a business bank account in Tanzania",
    excerpt:
      "Practical steps and document requirements for setting up a corporate bank account after entity registration.",
    publishedAt: "2025-10-28",
    category: getFallbackCategory("business-setup"),
    author: {
      id: "author-exxonim-1",
      name: "Exxonim Advisory",
      role: "Registration Specialist",
      avatarSrc: undefined,
      bio: "Exxonim's advisory team provides structured guidance through entity registration and compliance workflows.",
    },
    coverImageSrc: blogCoverBankAccount,
    coverAlt: "Business professional at a bank counter opening a corporate account",
    mediaLabel: "Business bank account setup",
    featuredOnHome: false,
    readTimeMinutes: 5,
    relatedSlugs: ["company-registration-basics", "tin-registration-checklist"],
    content: {
      introduction:
        "Opening a business bank account requires your registration certificate, TIN, and director identification. Each bank has its own requirements, but the core documents are consistent.",
      highlights: [
        "Bring the certificate of incorporation and TIN certificate.",
        "Prepare director and shareholder identification documents.",
        "Some banks require a board resolution to open the account.",
      ],
      sections: [
        {
          heading: "Typical document checklist",
          paragraphs: [
            "Certificate of incorporation, memorandum and articles of association, TIN certificate, business license (if applicable), and identification for all signatories. Having these ready before visiting the bank saves time.",
          ],
        },
      ],
    },
  },
  {
    id: 13,
    slug: "tra-tax-obligations",
    title: "Understanding your TRA tax obligations as a business",
    excerpt:
      "A straightforward overview of the main tax types, filing schedules, and compliance expectations from the Tanzania Revenue Authority.",
    publishedAt: "2025-10-12",
    category: getFallbackCategory("compliance"),
    author: {
      id: "author-exxonim-2",
      name: "Exxonim Operations",
      role: "Compliance Lead",
      avatarSrc: undefined,
      bio: "Exxonim's operations team focuses on practical compliance tracking and deadline management.",
    },
    coverImageSrc: blogCoverTraObligations,
    coverAlt: "Tax compliance documents and TRA forms on a professional desk",
    mediaLabel: "TRA tax obligations",
    featuredOnHome: false,
    readTimeMinutes: 7,
    relatedSlugs: ["tax-return-preparation", "compliance-calendar-basics"],
    content: {
      introduction:
        "Every registered business in Tanzania has tax obligations determined by entity type, revenue, and sector. Understanding which taxes apply and when they are due prevents penalties.",
      highlights: [
        "Corporate tax, VAT, and PAYE are the most common obligations.",
        "Filing schedules differ by tax type and entity size.",
        "Late filing triggers interest and penalties.",
      ],
      sections: [
        {
          heading: "Common tax types for businesses",
          paragraphs: [
            "Corporate income tax (30%), value added tax (18% for standard-rated supplies), pay-as-you-earn for employees, and skills development levy. Some sectors have additional excise or stamp duties.",
          ],
        },
      ],
    },
  },
  {
    id: 14,
    slug: "partnership-registration",
    title: "Partnership registration steps in Tanzania",
    excerpt:
      "How to register a general or limited partnership, including the documentation and regulatory steps involved.",
    publishedAt: "2025-09-25",
    category: getFallbackCategory("business-setup"),
    author: {
      id: "author-exxonim-1",
      name: "Exxonim Advisory",
      role: "Registration Specialist",
      avatarSrc: undefined,
      bio: "Exxonim's advisory team provides structured guidance through entity registration and compliance workflows.",
    },
    coverImageSrc: blogCoverPartnership,
    coverAlt: "Two business partners reviewing registration documents together",
    mediaLabel: "Partnership registration",
    featuredOnHome: false,
    readTimeMinutes: 5,
    relatedSlugs: ["company-registration-basics", "ngo-registration-guide"],
    content: {
      introduction:
        "Partnerships offer a simpler structure than companies, but they still require formal registration and a partnership deed. Understanding the difference between general and limited partnerships is the first step.",
      highlights: [
        "A partnership deed is essential before registration.",
        "General partnerships have unlimited liability for all partners.",
        "Limited partnerships protect some partners' liability.",
      ],
      sections: [
        {
          heading: "Registration path",
          paragraphs: [
            "Draft a partnership deed, register with the Business Registration and Licensing Authority (BRELA), obtain a TIN, and apply for relevant business licenses. The process is faster than company incorporation but still requires complete documentation.",
          ],
        },
      ],
    },
  },
  {
    id: 15,
    slug: "work-permit-foreign-investors",
    title: "Work permits and residency for foreign investors in Tanzania",
    excerpt:
      "What foreign investors need to know about work permits, residence classes, and the regulatory process for operating in Tanzania.",
    publishedAt: "2025-09-10",
    category: getFallbackCategory("operations"),
    author: {
      id: "author-exxonim-1",
      name: "Exxonim Advisory",
      role: "Registration Specialist",
      avatarSrc: undefined,
      bio: "Exxonim's advisory team provides structured guidance through entity registration and compliance workflows.",
    },
    coverImageSrc: blogCoverWorkPermit,
    coverAlt: "Immigration office with work permit documents and passport",
    mediaLabel: "Work permits for investors",
    featuredOnHome: false,
    readTimeMinutes: 8,
    relatedSlugs: ["business-registration-timeline", "import-export-licensing"],
    content: {
      introduction:
        "Foreign nationals seeking to work or invest in Tanzania must obtain the appropriate work permit and residence class. The process involves multiple government agencies and specific documentation.",
      highlights: [
        "Choose the correct residence class for your activity.",
        "Prepare supporting documents before applying.",
        "Processing times vary by permit type.",
      ],
      sections: [
        {
          heading: "Residence classes and work permits",
          paragraphs: [
            "Tanzania offers several residence classes for investors, professionals, and employees. Class A covers investors, Class B covers professionals, and Class C covers other employment. Each has distinct requirements and processing timelines through the Immigration Services Department.",
          ],
        },
      ],
    },
  },
  {
    id: 16,
    slug: "digital-business-compliance",
    title: "Digital business compliance and online registration in Tanzania",
    excerpt:
      "How digital platforms and online systems are changing the way businesses register, file, and stay compliant in Tanzania.",
    publishedAt: "2025-08-22",
    category: getFallbackCategory("operations"),
    author: {
      id: "author-exxonim-2",
      name: "Exxonim Operations",
      role: "Compliance Lead",
      avatarSrc: undefined,
      bio: "Exxonim's operations team focuses on practical compliance tracking and deadline management.",
    },
    coverImageSrc: blogCoverDigital,
    coverAlt: "Laptop screen showing online business registration portal in Tanzania",
    mediaLabel: "Digital business compliance",
    featuredOnHome: false,
    readTimeMinutes: 5,
    relatedSlugs: ["company-registration-basics", "tra-tax-obligations"],
    content: {
      introduction:
        "Tanzania is gradually digitising business registration and compliance processes. Understanding which systems are available online and which still require in-person visits saves time and reduces errors.",
      highlights: [
        "BRELA and TRA both offer online portals for key services.",
        "Not all processes are fully digitised yet.",
        "Digital submissions still require correct documentation.",
      ],
      sections: [
        {
          heading: "Current digital services",
          paragraphs: [
            "Name search and reservation can be done online through the BRELA portal. TIN registration, VAT registration, and some return filings are available through the TRA e-services platform. However, some steps like document verification still require physical submission.",
          ],
        },
      ],
    },
  },
];

export const fallbackPricingPlans: PricingPlan[] = [
  {
    id: 1,
    name: "Foundation",
    badge: "Getting started",
    description: "Registration and first-step compliance — ideal for new entities getting set up.",
    notes: "Use the Exxonim contact route for the latest package guidance.",
    recommended: false,
    features: [
      { label: "Company or business name registration filed on your behalf", included: true },
      { label: "TIN application included", included: true },
      { label: "Document checklist and readiness review", included: true },
      { label: "Consultation tracking with milestone updates", included: true },
      { label: "Annual return filing", included: false },
      { label: "Compliance reminders", included: false },
    ],
  },
  {
    id: 2,
    name: "Operating",
    badge: "Recommended",
    description: "Registration, licensing, and recurring compliance support for active businesses.",
    notes: "Live package details return automatically after the next successful sync.",
    recommended: true,
    features: [
      { label: "Company or business name registration filed on your behalf", included: true },
      { label: "TIN application included", included: true },
      { label: "Business license application", included: true },
      { label: "Annual return filing", included: true },
      { label: "Ongoing compliance reminders", included: true },
      { label: "Trademark registration", included: false },
    ],
  },
  {
    id: 3,
    name: "Continuity",
    badge: "Extended coverage",
    description: "Full-service support — registration, compliance, work permits, and ongoing advisory.",
    notes: "Contact Exxonim directly for a tailored scope while the live catalog reconnects.",
    recommended: false,
    features: [
      { label: "Everything in Operating", included: true },
      { label: "Trademark registration and protection", included: true },
      { label: "Work permit and TIC registration support", included: true },
      { label: "Priority support coordination", included: true },
      { label: "Multi-stream document management", included: true },
      { label: "Quarterly compliance review and planning", included: true },
    ],
  },
];

export const fallbackTestimonials: Testimonial[] = [
  {
    id: 1,
    eyebrow: "Business setup",
    headline: "Clear process from the first conversation.",
    support:
      "Exxonim helped us move through the setup phase with a clear checklist and practical follow-through at every step.",
    quote:
      "We knew exactly what to prepare, when to submit, and who to contact if anything was unclear.",
    name: "Operations Team",
    role: "Client reference",
    initials: "OT",
  },
  {
    id: 2,
    eyebrow: "Compliance support",
    headline: "Deadlines never caught us off guard.",
    support:
      "Proactive reminders and structured follow-up meant our licensing renewals and filings were always on schedule.",
    quote:
      "The experience felt intentional because the process stayed visible and the next step was always clear.",
    name: "Compliance Lead",
    role: "Client reference",
    initials: "CL",
  },
  {
    id: 3,
    eyebrow: "Consultation tracking",
    headline: "We always knew where things stood.",
    support:
      "Every consultation came with a tracking reference and milestone updates — no need to call and ask for status.",
    quote:
      "Getting a WhatsApp update when our certificate was issued saved us days of back-and-forth.",
    name: "Programme Coordinator",
    role: "Client reference",
    initials: "PC",
  },
];

/* BACKEND / ADMIN INTEGRATION NOTES (Job listings):
 * ──────────────────────────────────────────────────────────
 * These 7 fallback jobs are used when the jobs API is unavailable.
 * The admin should create real jobs matching the ApiCareerJob structure.
 *
 * Key fields for admin:
 *   - title: Clear, specific role title (max ~60 chars)
 *   - department: Short, 1-2 words (used for pills and filtering)
 *   - employment_type: "Full-time" | "Part-time" | "Contract" | "Internship"
 *   - experience_label: "Entry-level" | "Mid-level" | "Senior" | "Lead"
 *   - location_mode: "on-site" | "hybrid" | "remote"
 *   - city/country: Physical location for the role
 *   - compensation_label: Optional salary range (e.g., "TZS 1.5M–2.5M/mo")
 *   - summary: 1-sentence overview (shown in collapsed/preview)
 *   - description: 1-2 sentence full description (shown in full details)
 *   - responsibilities[]: 3-5 action-oriented bullet points
 *   - requirements[]: 3-5 qualification bullet points
 *   - published_at: ISO date string — used for "Posted X" and 72h+ indicator
 *
 * 72-hour indicator: If published_at is >72h ago, a "72h+ posted" pill appears.
 * This is VISUAL ONLY — jobs are never auto-removed. Admin must unpublish to remove.
 *
 * Application flow: "Apply Now" opens an application modal (not the contact page).
 * The modal collects: name, email, phone, cover note, and CV/resume file upload.
 * Submission sends to the email configured for the job (fallback: info@exxonim.co.tz).
 * Backend endpoint: POST /api/public/jobs/{id}/apply
 */
export const fallbackJobs: ApiCareerJob[] = [
  {
    id: 1,
    title: "Client Operations Coordinator",
    slug: "client-operations-coordinator",
    department: "Operations",
    employment_type: "Full-time",
    location_mode: "hybrid",
    city: "Dar es Salaam",
    country: "Tanzania",
    compensation_label: null,
    experience_label: "Mid-level",
    summary:
      "Coordinate internal follow-through, document readiness, and status visibility across active client work.",
    description:
      "Coordinate internal follow-through, document readiness, and status visibility across active client work. You will be the connective tissue between case managers, compliance officers, and clients — making sure nothing falls through the cracks.",
    requirements: [
      "Comfort working with operational checklists",
      "Clear written communication",
      "Confidence handling structured follow-up work",
    ],
    responsibilities: [
      "Track active workstreams",
      "Coordinate next actions with the team",
      "Help keep filing and follow-up work organized",
    ],
    status: "published",
    is_published: true,
    published_at: "2026-04-01T00:00:00Z",
    created_at: "2026-04-01T00:00:00Z",
    updated_at: "2026-04-01T00:00:00Z",
  },
  {
    id: 2,
    title: "Compliance Support Analyst",
    slug: "compliance-support-analyst",
    department: "Compliance",
    employment_type: "Full-time",
    location_mode: "on-site",
    city: "Dar es Salaam",
    country: "Tanzania",
    compensation_label: null,
    experience_label: "Entry-level",
    summary:
      "Assist with regulatory filings, license renewals, and compliance deadline tracking for Exxonim clients.",
    description:
      "Support the compliance team by preparing filing documents, tracking renewal deadlines, and following up with regulatory bodies. Ideal for someone starting their career in regulatory operations.",
    requirements: [
      "Degree in business, law, or related field",
      "Attention to detail and deadline awareness",
      "Ability to follow structured processes",
    ],
    responsibilities: [
      "Prepare and review filing documents",
      "Track compliance deadlines and send reminders",
      "Follow up with regulatory authorities on pending applications",
    ],
    status: "published",
    is_published: true,
    published_at: "2026-04-02T00:00:00Z",
    created_at: "2026-04-02T00:00:00Z",
    updated_at: "2026-04-02T00:00:00Z",
  },
  {
    id: 3,
    title: "Tax & Filing Assistant",
    slug: "tax-filing-assistant",
    department: "Accounting",
    employment_type: "Full-time",
    location_mode: "on-site",
    city: "Dar es Salaam",
    country: "Tanzania",
    compensation_label: null,
    experience_label: "Entry-level",
    summary:
      "Support TIN applications, VAT filings, and tax registration workflows for new and existing entities.",
    description:
      "Work alongside the accounting team to process tax registration applications, prepare VAT returns, and maintain accurate filing records. A great starting role for someone interested in Tanzanian tax operations.",
    requirements: [
      "Basic understanding of tax concepts (TIN, VAT)",
      "Organized and comfortable with numbers",
      "Willingness to learn TRA processes",
    ],
    responsibilities: [
      "Process TIN and VAT registration applications",
      "Prepare monthly VAT return drafts",
      "Maintain filing records and client tax schedules",
    ],
    status: "published",
    is_published: true,
    published_at: "2026-04-03T00:00:00Z",
    created_at: "2026-04-03T00:00:00Z",
    updated_at: "2026-04-03T00:00:00Z",
  },
  {
    id: 4,
    title: "Business Setup Consultant",
    slug: "business-setup-consultant",
    department: "Advisory",
    employment_type: "Full-time",
    location_mode: "hybrid",
    city: "Dar es Salaam",
    country: "Tanzania",
    compensation_label: null,
    experience_label: "Senior",
    summary:
      "Lead entity registration engagements — from entity type selection through to authority submission and certificate delivery.",
    description:
      "Guide clients through company, NGO, and business name registration from start to certificate. You will manage the full engagement cycle, advise on entity structures, and ensure every submission is complete and timely.",
    requirements: [
      "3+ years in business registration or legal advisory",
      "Deep knowledge of Tanzanian entity types and registration procedures",
      "Strong client communication and case management skills",
    ],
    responsibilities: [
      "Advise clients on entity type and registration path",
      "Manage end-to-end registration engagements",
      "Review all submissions before authority filing",
    ],
    status: "published",
    is_published: true,
    published_at: "2026-03-28T00:00:00Z",
    created_at: "2026-03-28T00:00:00Z",
    updated_at: "2026-03-28T00:00:00Z",
  },
  {
    id: 5,
    title: "Systems & Tools Coordinator",
    slug: "systems-tools-coordinator",
    department: "IT",
    employment_type: "Part-time",
    location_mode: "remote",
    city: "Dar es Salaam",
    country: "Tanzania",
    compensation_label: null,
    experience_label: "Mid-level",
    summary:
      "Maintain internal tools, manage system workflows, and support digital operations across the consulting team.",
    description:
      "Keep Exxonim's digital tools running smoothly — from case tracking systems to internal dashboards. You will coordinate with vendors, troubleshoot issues, and help improve how the team uses technology day-to-day.",
    requirements: [
      "Experience with SaaS tools and workflow automation",
      "Problem-solving mindset and clear communication",
      "Comfort working independently in a remote setup",
    ],
    responsibilities: [
      "Maintain and configure internal tools and dashboards",
      "Troubleshoot technical issues and coordinate with vendors",
      "Document workflows and suggest process improvements",
    ],
    status: "published",
    is_published: true,
    published_at: "2026-04-04T00:00:00Z",
    created_at: "2026-04-04T00:00:00Z",
    updated_at: "2026-04-04T00:00:00Z",
  },
  {
    id: 6,
    title: "Document Readiness Associate",
    slug: "document-readiness-associate",
    department: "Operations",
    employment_type: "Full-time",
    location_mode: "on-site",
    city: "Dar es Salaam",
    country: "Tanzania",
    compensation_label: null,
    experience_label: "Entry-level",
    summary:
      "Ensure client documents are complete, properly formatted, and ready for submission before filing deadlines.",
    description:
      "Review incoming client documents for completeness, flag missing items, and prepare document packages for the filing team. A detail-oriented role ideal for someone who enjoys structured, methodical work.",
    requirements: [
      "Strong attention to detail",
      "Comfort reviewing and organizing paperwork",
      "Reliable and consistent follow-through",
    ],
    responsibilities: [
      "Review client documents for completeness and accuracy",
      "Flag missing or incorrect items for follow-up",
      "Prepare organized document packages for submission",
    ],
    status: "published",
    is_published: true,
    published_at: "2026-04-05T00:00:00Z",
    created_at: "2026-04-05T00:00:00Z",
    updated_at: "2026-04-05T00:00:00Z",
  },
  {
    id: 7,
    title: "Regulatory Renewals Officer",
    slug: "regulatory-renewals-officer",
    department: "Compliance",
    employment_type: "Full-time",
    location_mode: "hybrid",
    city: "Dar es Salaam",
    country: "Tanzania",
    compensation_label: null,
    experience_label: "Mid-level",
    summary:
      "Own the renewals pipeline — track deadlines, prepare submissions, and ensure no client obligation lapses.",
    description:
      "Manage Exxonim's renewals pipeline end-to-end: track upcoming deadlines across all clients, prepare renewal applications, submit on time, and confirm outcomes. You will be the person who makes sure nothing expires unnoticed.",
    requirements: [
      "1-2 years in compliance, licensing, or regulatory operations",
      "Strong organizational and deadline management skills",
      "Comfort working with government portals and processes",
    ],
    responsibilities: [
      "Track all upcoming license and permit renewals",
      "Prepare and submit renewal applications on schedule",
      "Confirm outcomes and update client records",
    ],
    status: "published",
    is_published: true,
    published_at: "2026-04-06T00:00:00Z",
    created_at: "2026-04-06T00:00:00Z",
    updated_at: "2026-04-06T00:00:00Z",
  },
];

export const fallbackBrandSetting = createFallbackSiteSetting<BrandAssets>(
  "brand",
  fallbackBrand
);

export const fallbackCompanyInfoSetting = createFallbackSiteSetting<CompanyInfo>(
  "company_info",
  fallbackCompanyInfo
);

export const fallbackFooterSetting =
  createFallbackSiteSetting<SiteSettingFooterValue>("footer", fallbackFooter);

export function getFallbackSiteSetting(key: string) {
  switch (key) {
    case "brand":
      return fallbackBrandSetting;
    case "company_info":
      return fallbackCompanyInfoSetting;
    case "footer":
      return fallbackFooterSetting;
    default:
      return undefined;
  }
}

/* ── Support page fallback ── */
export const fallbackSupportPage: PageRecord<InfoPageContent> = createFallbackPage(
  "support",
  "Support",
  {
    hero: {
      eyebrow: "Support",
      title: "Get direct help from Exxonim Consult.",
      description:
        "Reach out via WhatsApp, email, or phone during business hours. We respond promptly to every inquiry.",
    },
    sections: [
      {
        title: "How to reach us",
        paragraphs: [
          "Use WhatsApp for quick questions, email for structured details, or phone when you need a direct conversation.",
          "Our team responds during East African business hours (Mon–Fri, 8:00–16:30).",
        ],
      },
      {
        title: "What happens after you reach out",
        paragraphs: [
          "Your inquiry is logged, reviewed, and you receive a reference ID to track your consultation from intake to resolution.",
          "Proactive updates are sent via your preferred channel at every milestone.",
        ],
      },
    ],
    next_step: {
      title: "Need immediate help?",
      description: "Contact us directly and the Exxonim Consult team will follow up promptly.",
      primary_action: {
        label: "Contact Exxonim",
        href: routes.contact,
      },
      secondary_action: {
        label: "Track consultation",
        href: routes.trackConsultation,
      },
    },
  }
);

/* ── Terms page fallback ── */
export const fallbackTermsPage: PageRecord<InfoPageContent> = createFallbackPage(
  "terms",
  "Terms of Service",
  {
    hero: {
      eyebrow: "Terms",
      title: "Terms governing the use of Exxonim Consult services.",
      description:
        "These terms outline the responsibilities and expectations for clients engaging Exxonim Consult for registration, licensing, and compliance support.",
    },
    sections: [
      {
        title: "Service scope",
        paragraphs: [
          "Exxonim Consult provides advisory and operational support for business registration, tax applications, licensing, and compliance follow-through.",
          "Services are structured around clear milestones with proactive tracking and communication at every stage.",
        ],
      },
      {
        title: "Client responsibilities",
        paragraphs: [
          "Clients are expected to provide accurate information and required documents in a timely manner to avoid unnecessary delays.",
          "Exxonim Consult is not liable for delays caused by incomplete or incorrect client submissions.",
        ],
      },
    ],
    next_step: {
      title: "Questions about these terms?",
      description: "Reach out and the Exxonim Consult team will clarify any details.",
      primary_action: {
        label: "Contact Exxonim",
        href: routes.contact,
      },
      secondary_action: {
        label: "Privacy policy",
        href: routes.privacy,
      },
    },
  }
);

export function getFallbackPage(slug: string) {
  switch (slug) {
    case "home":
      return fallbackHomePage;
    case "about":
      return fallbackAboutPage;
    case "faq":
      return fallbackFaqPage;
    case "services":
      return fallbackServicesPage;
    case "career":
      return fallbackCareerPage;
    case "contact":
      return fallbackContactPage;
    case "resources":
      return fallbackResourcesPage;
    case "privacy":
      return fallbackPrivacyPage;
    case "cookies":
      return fallbackCookiePage;
    case "data-rights":
      return fallbackDataRightsPage;
    case "support":
      return fallbackSupportPage;
    case "terms":
      return fallbackTermsPage;
    case "track-consultation":
      return fallbackTrackConsultationPage;
    default:
      return undefined;
  }
}

export const fallbackTrackConsultationPage: PageRecord<InfoPageContent> = createFallbackPage(
  "track-consultation",
  "Track Your Consultation | Exxonim Consult",
  {
    hero: {
      eyebrow: "Consultation tracking",
      title: "Never ask \"What's happening?\" again",
      description:
        "Automated updates at every milestone — via WhatsApp, email, or SMS. Enter your tracking number for an instant status check.",
    },
    sections: [
      {
        title: "How it works",
        paragraphs: [
          "Every consultation is assigned a unique tracking number. At every key milestone, Exxonim sends you an update via your preferred channel.",
          "You can also look up your status on the website anytime, no login required.",
        ],
      },
      {
        title: "Update channels",
        paragraphs: [
          "Choose how you receive updates: WhatsApp, email, or SMS. Every milestone update is delivered there automatically.",
        ],
      },
    ],
    next_step: {
      title: "Ready to experience proactive consulting?",
      description:
        "Contact Exxonim and receive a tracking number that keeps you informed at every step.",
      primary_action: {
        label: "Request a Consultation",
        href: routes.contact,
      },
      secondary_action: {
        label: "View All Services",
        href: routes.services,
      },
    },
  },
  "Track Your Consultation | Exxonim Consult",
  "Look up your Exxonim Consult consultation status anytime using your tracking reference ID. No login required."
);

export { fallbackBlogCategories, fallbackNavigationItems };
