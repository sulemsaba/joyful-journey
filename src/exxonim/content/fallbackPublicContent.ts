import type {
  AboutPageContent,
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

export const fallbackHomePage: PageRecord<HomePageContent> = createFallbackPage(
  "home",
  "Exxonim Consult | Business Setup, Compliance & Permits Tanzania",
  {
    hero: {
      eyebrow: "Business Setup, Compliance & Permits, Tanzania",
      title: "Get Your Company Registered, Licensed & Ready to Operate in Days, Not Weeks.",
      description:
        "In today's fast-paced world, your focus belongs on your business. Let our experts handle everything from setup to annual filings, keeping you informed every step of the way via SMS, WhatsApp, or email.",
      cta: {
        // #inquiry lands the visitor on the contact FORM, not the page top —
        // App.tsx's hash-aware ScrollToTop handles the anchor scroll.
        label: "Start My Registration",
        href: `${routes.contact}#inquiry`,
      },
      secondary_cta: {
        label: "View All Services",
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
      title: "120+ Happy Clients",
      /*
       * ── TRUST-STRIP LOGOS — add / remove partner & client logos here ──
       *
       * ADD A LOGO: (1) drop the file in `public/clients/`, (2) declare it at the
       *   top of this file (e.g. `const acmeLogo = "/clients/acme.webp";`), then
       *   (3) add `{ alt: "Acme", src: acmeLogo, opticalWeight: "wordmark" }`.
       *   Use opticalWeight "solid" for icon/emblem marks (rendered a touch
       *   smaller so they don't overpower) and "wordmark" for text logos.
       *
       * HOW MANY — aim for 8–12.
       *   • MINIMUM ~8: the marquee repeats this list 3× and scrolls by exactly
       *     one copy (see ProviderSection `repeatCount` + the `provider-marquee`
       *     keyframe in globals.css). Fewer than ~8 can leave a visible GAP on
       *     wide / ultrawide screens because one copy won't fill the viewport.
       *   • MAXIMUM ~14: more just lengthens the loop and adds eager-loaded
       *     images. Keep it tasteful.
       *
       * DO NOT add Exxonim's own logo here — this strip is third-party social
       *   proof; the brand mark already appears in the header and footer.
       *   (Removed on 2026-07-13 for exactly this reason.)
       */
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
      ],
    },
    stack_section: {
      items: [
        {
          title: "Registration & Licensing",
          subtitle: "Launch your business legally - zero paperwork headaches.",
          description:
            "We handle full company registration, TIN, licences, work permits & NGO setup from start to finish. Skip government queues, minimize office visits, and get your certificates delivered to your door.",
          ctaLabel: "Start My Company Registration",
          ctaHref: routes.contact,
          windowTitle: "Setup",
          windowTag: "",
          videoSources: [],
          images: [
            {
              src: "/images/home-registration-team.webp",
              alt: "A team of four business owners smiling in their office, each holding their newly issued Tanzanian company registration and licensing certificates",
            },
            {
              src: "/images/home-registration-seated.webp",
              alt: "A business owner seated in her office holding her BRELA Certificate of Incorporation",
            },
            {
              src: "/images/home-registration-office.webp",
              alt: "A business owner standing in her office holding her BRELA Certificate of Incorporation and TRA Taxpayer Identification Number certificate",
            },
            {
              src: "/images/home-registration-outdoor.webp",
              alt: "A business owner standing outside a Dar es Salaam office tower holding her BRELA company incorporation documents",
            },
          ],
          mobileTitle: "Registration & Licensing",
          mobileDescription:
            "Skip the government queues. We register your business, secure licences and permits, and deliver your certificates.",
          mobileCtaLabel: "Start My Registration",
        },
        {
          title: "Annual Compliance & Renewals",
          subtitle: "Avoid costly penalties & stay fully compliant - hands-off.",
          description:
            "We manage all statutory filings, licence renewals & annual returns. With proactive deadline tracking and pre-due-date reminders, you get zero missed filings and absolute peace of mind.",
          ctaLabel: "Secure My Compliance Now",
          ctaHref: routes.services,
          windowTitle: "Compliance",
          windowTag: "",
          videoSources: [],
          images: [
            {
              src: "/images/home-compliance-checklist.webp",
              alt: "An Annual Compliance Checklist stamped Approved and Filed, with a Certificate of Incorporation and Tax Clearance Certificate fanned out on a desk",
            },
          ],
          mobileTitle: "Annual Compliance",
          mobileDescription:
            "Avoid costly late fines. We track deadlines, file your returns, and remind you before every due date.",
          mobileCtaLabel: "Protect My Compliance",
        },
        {
          title: "Live Case Tracking",
          subtitle: "Real-time visibility into your application - via WhatsApp.",
          description:
            "Get instant updates at every milestone (name clearance to final approval). Track progress online 24/7 with a unique code - no logins, no hassle, just total clarity.",
          ctaLabel: "Track My Case in Real Time",
          ctaHref: routes.trackConsultation,
          windowTitle: "Tracking",
          windowTag: "",
          videoSources: [
            { src: "/videos/track-consultation.webm?v=2", type: "video/webm" },
            { src: "/videos/track-consultation.mp4?v=2", type: "video/mp4" },
          ],
          mobileTitle: "Live Case Tracking",
          mobileDescription:
            "Track your case in real time. Get WhatsApp updates and check your progress online anytime.",
          mobileCtaLabel: "Track My Case",
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
      title: "We stand between you and the authorities.",
      description:
        "Registrations, filings, and compliance - all handled.",
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
        "To be Tanzania's most trusted compliance partner - no business ever chases an office.",
      global_mission:
        "To become the regulatory interface for businesses operating across East Africa and beyond \u2014 one trusted partner for every jurisdiction, every filing, every milestone.",
      global_vision:
        "A world where any business can operate in any country without regulatory friction \u2014 where compliance is invisible, tracked, and handled.",
    },
    who_we_serve: [
      { label: "Individuals", description: "Entrepreneurs and professionals starting their first business." },
      { label: "Companies", description: "Local businesses managing registration, tax, and compliance." },
      { label: "Foreign Businesses", description: "Investors entering Tanzania - permits, registration, setup." },
      { label: "NGOs & Non-Profits", description: "Organisations handling registration and statutory obligations." },
      { label: "Institutions", description: "Public and private institutions with regulatory obligations." },
    ],
    differentiators: [
      { title: "Specialists, not generalists", description: "We are experts in the regulatory interface - the space between you and the authorities." },
      { title: "Visibility at every step", description: "WhatsApp, email, or SMS updates at every milestone. Never wonder what's happening." },
      { title: "One partner, every filing", description: "Registration to compliance, all under one roof. No chasing multiple offices." },
      { title: "A progressive partner", description: "We remind you of every deadline and obligation - so you never get fined for missing a filing." },
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
const fallbackFaqPage: PageRecord<FaqPageContent> = createFallbackPage(
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
const fallbackServicesPage: PageRecord<ServicesPageContent> = createFallbackPage(
  "services",
  "Business Registration, Licensing & Compliance Services",
  {
    overview: {
      eyebrow: "Registration & Compliance",
      title: "Your business, registered and kept compliant - without the office visits",
      description:
        "From first registration to recurring filings - all handled.",
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
        answer: "No. We file everything electronically and keep you updated via WhatsApp. Our team liaises with all regulators - BRELA, TRA, NSSF, WCF, OSHA - on your behalf.",
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
        answer: "Yes - every engagement gets a 6-character tracking code. Enter it on our Track Your Consultation page for an instant status check. No login required.",
        cta: { label: "Track your consultation", href: routes.trackConsultation },
      },
      {
        question: "What's included in the compliance reminders?",
        answer: "We track all major compliance deadlines - BRELA returns, TRA filings, WCF, NSSF, OSHA renewals - and send you advance reminders via WhatsApp. No time limit, no cut-off.",
        cta: { label: "Get compliance support", href: routes.contact },
      },
      {
        question: "Do you handle work permits for foreign employees?",
        answer: "Yes. We process work permits, residence permits, and TIC/TISEZA registration for foreign investors and employees. Everything is handled remotely - no office visits needed.",
        cta: { label: "Apply for a work permit", href: routes.contact },
      },
      {
        question: "What are your service fees?",
        answer: "Fees vary by service. Company registration starts from TZS 350,000. We provide a clear quote before any work begins - no hidden charges, no surprises.",
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
        { title: "Company Registration", detail: "EXX-24091 - In submission phase" },
        { title: "TIN Application", detail: "EXX-24088 - Resolved, TIN issued" },
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
const fallbackResourcesPage: PageRecord<ResourcesPageContent> =
  createFallbackPage("resources", "Resources", {
    hero_title: "Guides, updates, and practical notes for setup and compliance work",
    trending_label: "Trending reads",
    top_media: {
      hero: "",
      banner: "",
      trending: [],
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

const fallbackCareerPage: PageRecord<CareerPageContent> = createFallbackPage(
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

const fallbackContactPage: PageRecord<ContactPageContent> = createFallbackPage(
  "contact",
  "Contact Exxonim Consult | Business Advisory Tanzania",
  {
    hero: {
      eyebrow: "Get in touch",
      title: "Reach Exxonim for registration, compliance, and advisory support.",
      description:
        "Use the contact route that works best for you - email, phone, or WhatsApp - and the Exxonim team will follow up promptly.",
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
      "Every consultation came with a tracking reference and milestone updates - no need to call and ask for status.",
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
 *   - published_at: ISO date string - used for "Posted X" and 72h+ indicator
 *
 * 72-hour indicator: If published_at is >72h ago, a "72h+ posted" pill appears.
 * This is VISUAL ONLY - jobs are never auto-removed. Admin must unpublish to remove.
 *
 * Application flow: "Apply Now" opens an application modal (not the contact page).
 * The modal collects: name, email, phone, cover note, and CV/resume file upload.
 * Submission sends to the email configured for the job (fallback: info@exxonim.co.tz).
 * Backend endpoint: POST /api/public/jobs/{id}/apply
 */
export const fallbackJobs: ApiCareerJob[] = [
  {
    id: "fallback-1",
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
      "Coordinate internal follow-through, document readiness, and status visibility across active client work. You will be the connective tissue between case managers, compliance officers, and clients - making sure nothing falls through the cracks.",
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
    id: "fallback-2",
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
    id: "fallback-3",
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
    id: "fallback-4",
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
      "Lead entity registration engagements - from entity type selection through to authority submission and certificate delivery.",
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
    id: "fallback-5",
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
      "Keep Exxonim's digital tools running smoothly - from case tracking systems to internal dashboards. You will coordinate with vendors, troubleshoot issues, and help improve how the team uses technology day-to-day.",
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
    id: "fallback-6",
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
    id: "fallback-7",
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
      "Own the renewals pipeline - track deadlines, prepare submissions, and ensure no client obligation lapses.",
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

const fallbackBrandSetting = createFallbackSiteSetting<BrandAssets>(
  "brand",
  fallbackBrand
);

const fallbackCompanyInfoSetting = createFallbackSiteSetting<CompanyInfo>(
  "company_info",
  fallbackCompanyInfo
);

const fallbackFooterSetting =
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
const fallbackSupportPage: PageRecord<InfoPageContent> = createFallbackPage(
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
const fallbackTermsPage: PageRecord<InfoPageContent> = createFallbackPage(
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

// NOTE: these are only shown if the API is unreachable — the live content comes
// from the DB (pages table, editable in admin) via GET /api/v1/pages/{slug}.
const fallbackPrivacyPage: PageRecord<InfoPageContent> = createFallbackPage(
  "privacy",
  "Privacy Policy",
  {
    hero: {
      eyebrow: "Privacy",
      title: "How Exxonim Consult handles your information.",
      description:
        "We collect only what we need to deliver registration, licensing, and compliance services, and we keep it secure.",
    },
    sections: [
      {
        title: "Information we collect",
        paragraphs: [
          "We collect the contact and business details you provide through our forms and during an engagement, and basic usage data to improve the site.",
        ],
      },
      {
        title: "How we use it",
        paragraphs: [
          "Your information is used to deliver the services you request, communicate with you, and meet our legal and regulatory obligations.",
          "We do not sell your personal information.",
        ],
      },
    ],
    next_step: {
      title: "Questions about your privacy?",
      description: "Contact us and we'll explain how your information is handled.",
      primary_action: { label: "Contact Exxonim", href: routes.contact },
    },
  }
);

const fallbackCookiesPage: PageRecord<InfoPageContent> = createFallbackPage(
  "cookies",
  "Cookie Policy",
  {
    hero: {
      eyebrow: "Cookies",
      title: "How Exxonim Consult uses cookies.",
      description:
        "We use a small number of cookies to keep the site working and to understand how it is used.",
    },
    sections: [
      {
        title: "What cookies we use",
        paragraphs: [
          "Essential cookies keep the site functioning, and optional analytics cookies help us improve it. You can control optional cookies at any time.",
        ],
      },
    ],
    next_step: {
      title: "Questions about cookies?",
      description: "Reach out and we'll help.",
      primary_action: { label: "Contact Exxonim", href: routes.contact },
    },
  }
);

const fallbackDataRightsPage: PageRecord<InfoPageContent> = createFallbackPage(
  "data-rights",
  "Your Data Rights",
  {
    hero: {
      eyebrow: "Data rights",
      title: "Your rights over your information.",
      description:
        "You can request access to, correction of, or deletion of the personal information we hold about you.",
    },
    sections: [
      {
        title: "Exercising your rights",
        paragraphs: [
          "To make a request about your data, contact us and we will respond within a reasonable time in line with applicable law.",
        ],
      },
    ],
    next_step: {
      title: "Make a data request",
      description: "Get in touch and we'll take it from there.",
      primary_action: { label: "Contact Exxonim", href: routes.contact },
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
    case "support":
      return fallbackSupportPage;
    case "terms":
      return fallbackTermsPage;
    case "privacy":
      return fallbackPrivacyPage;
    case "cookies":
      return fallbackCookiesPage;
    case "data-rights":
      return fallbackDataRightsPage;
    case "track-consultation":
      return fallbackTrackConsultationPage;
    default:
      return undefined;
  }
}

const fallbackTrackConsultationPage: PageRecord<InfoPageContent> = createFallbackPage(
  "track-consultation",
  "Track Your Consultation | Exxonim Consult",
  {
    hero: {
      eyebrow: "Consultation tracking",
      title: "Never ask \"What's happening?\" again",
      description:
        "Automated updates at every milestone - via WhatsApp, email, or SMS. Enter your tracking number for an instant status check.",
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
