export type Theme = "light" | "dark";
export type BlogCategoryId = string;
export type BlogFeaturedSlot = "hero" | "popular" | "editors-pick" | string;

export interface BrandAssets {
  name: string;
  lightLogoSrc: string;
  darkLogoSrc: string;
}

export interface CompanyInfo {
  name: string;
  phones: string[];
  emails: string[];
  address: string;
  whatsapp: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface FooterContent {
  quickLinks: NavLink[];
  otherResources: NavLink[];
  tagline: string;
  primaryCta: {
    label: string;
    href: string;
  };
  copyright: string;
}

export interface NavigationItem {
  id: number;
  title: string;
  url: string;
  description?: string;
  kind: string;
  order: number;
  isActive: boolean;
  parentId?: number | null;
  createdAt: string;
  updatedAt: string;
  children: NavigationItem[];
}

export interface ServiceNavGroup {
  title: string;
  summary: string;
  href: string;
  items: string[];
}

export interface ProviderLogo {
  alt: string;
  src: string;
  /** "solid" = square/circle icon (constrained to max-h-12 so it doesn't overpower wordmarks).
   *  "wordmark" = wide text-based logo (allowed full h-16 height).
   *  Defaults to "wordmark" if omitted. */
  opticalWeight?: "solid" | "wordmark";
}

export interface StackItem {
  title: string;
  subtitle: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  windowTitle: string;
  windowTag: string;
  /** Video sources in preference order (e.g. webm first for smaller size, mp4 as fallback).
   *  Empty array = no video (shows placeholder graphic). */
  videoSources: { src: string; type: string }[];
  /** Optional photo shown in the media half instead of the placeholder graphic
   *  (takes precedence over the placeholder, but a video still wins). */
  imageSrc?: string;
  imageAlt?: string;
  /** Optional set of photos rendered as an auto-advancing slideshow in the media
   *  half. When two or more are provided they cross-fade; a single entry renders
   *  as a static photo. Takes precedence over imageSrc; a video still wins. */
  images?: { src: string; alt: string }[];
  /** When true, the item is hidden from the stack section (e.g., consultation tracking card) */
  isHidden?: boolean;
  /** Mobile-specific copy (conversational, high clarity). Falls back to desktop copy if not set. */
  mobileTitle?: string;
  mobileDescription?: string;
  mobileCtaLabel?: string;
}

export interface FeatureRow {
  title: string;
  description: string;
  visualKey: string;
}

export interface FeatureVisualContent {
  workstreamValue: string;
  counterpartLabel: string;
  counterpartValue: string;
  focusValue: string;
  summaryTitle: string;
  summaryBody: string;
}

export interface BlogCategory {
  id: BlogCategoryId;
  label: string;
  description?: string;
}

export interface BlogAuthor {
  id: string;
  name: string;
  role?: string;
  avatarSrc?: string;
  bio?: string;
}

export interface BlogArticleSection {
  heading: string;
  paragraphs: string[];
}

export interface BlogArticleContent {
  introduction: string;
  highlights: string[];
  sections: BlogArticleSection[];
  html?: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  category?: BlogCategory;
  author?: BlogAuthor;
  coverImageSrc?: string;
  coverAlt?: string;
  mediaLabel: string;
  featuredSlot?: BlogFeaturedSlot;
  featuredOnHome: boolean;
  readTimeMinutes?: number;
  relatedSlugs: string[];
  metaTitle?: string;
  metaDescription?: string;
  content?: BlogArticleContent;
}

/**
 * Testimonial - a client quote displayed in the marquee slideshow.
 *
 * BACKEND VALIDATION RULES (enforced on create/update):
 *   name:   required, max 50 characters. Backend rejects if exceeded.
 *   role:   required, max 80 characters. Backend rejects if exceeded.
 *   quote:  required, max 250 characters. Admin must shorten if too long - NO UI truncation.
 *   rating: always 5. Not stored in DB; rendered as ★★★★★ on the frontend.
 *   eyebrow: max 30 characters.
 *   sort_order: integer, controls display order. Lower = shown first.
 *   is_active: boolean, only active testimonials appear publicly.
 *   initials: auto-generated from name (first letter of first and last word).
 *   avatar_url: optional. Falls back to initials circle if empty.
 */
export interface Testimonial {
  id: number;
  /** Max 30 chars. Short label above the quote (e.g. "REGISTRATION"). */
  eyebrow: string;
  /** Not currently rendered in the marquee card. Kept for future use. */
  headline: string;
  /** Not currently rendered in the marquee card. Kept for future use. */
  support: string;
  /** Max 250 chars. The testimonial quote text. Backend must reject if exceeded. */
  quote: string;
  /** Max 50 chars. Full name of the person giving the testimonial. */
  name: string;
  /** Max 80 chars. Role/organization (e.g. "Operations Team, Utec Tanzania"). */
  role: string;
  /** Auto-generated from name. Displayed in avatar circle when no avatar_url. */
  initials: string;
}

export interface PricingFeature {
  label: string;
  included: boolean;
}

export interface PricingPlan {
  id: number;
  name: string;
  badge?: string;
  description: string;
  notes: string;
  recommended: boolean;
  features: PricingFeature[];
}

/**
 * A service package (one tier card) as served by the public
 * /pricing/packages endpoint, which reads the admin-managed
 * `service_packages` table. Carries its segment slug so the site can
 * group packages under its fixed segment tabs.
 */
export interface SegmentPackage {
  id: string;
  name: string;
  badge: string | null;
  description: string;
  recommended: boolean;
  cta: string;
  segment_slug: string;
  segment_name: string;
  sort_order: number;
  features: PricingFeature[];
}

export interface ServiceSignal {
  value: string;
  label: string;
  detail: string;
}

export interface ServiceFlowItem {
  step: string;
  title: string;
  detail: string;
}

export interface ServiceCatalogItem {
  id: string;
  label: string;
  detail: string;
  /** Starting price display, e.g. "From TZS 350,000". Omit if not applicable. */
  startingPrice?: string;
}

export interface ServiceCatalogGroup {
  title: string;
  description: string;
  /** Benefit-driven subhead, e.g. "Legally trade within 5–10 business days" */
  benefitHeadline?: string;
  services: ServiceCatalogItem[];
}

export interface TrackingCheckpoint {
  title: string;
  detail: string;
  status: string;
}

export interface TrackingCaseExample {
  title: string;
  detail: string;
}

export interface TrackingWorkflowStep {
  title: string;
  detail: string;
}

export interface ContentSection {
  title: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface PageRecord<TContent = Record<string, unknown>> {
  id: number;
  title: string;
  slug: string;
  content: TContent;
  metaTitle?: string;
  metaDescription?: string;
  ogImageUrl?: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SiteSetting<TValue = unknown> {
  id: number;
  key: string;
  value: TValue;
  createdAt: string;
  updatedAt: string;
}

export interface HomeHeroContent {
  eyebrow: string;
  title: string;
  description: string;
  cta: {
    label: string;
    href: string;
  };
  secondary_cta?: {
    label: string;
    href: string;
  };
  highlights: Array<{
    title: string;
    detail: string;
  }>;
}

export interface ProviderSectionContent {
  kicker: string;
  title: string;
  logos: ProviderLogo[];
}

export interface HomeInsightsContent {
  title: string;
  intro: string;
  footer_copy: string;
}

export interface HomePageContent {
  hero: HomeHeroContent;
  provider_section: ProviderSectionContent;
  stack_section: {
    items: StackItem[];
    default_feature_rows: FeatureRow[];
    feature_visual_content: Record<string, FeatureVisualContent>;
  };
  insights_section: HomeInsightsContent;
}

export interface AboutPageContent {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  company_profile: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    working_style_label?: string;
    working_style: string;
  };
  support_profiles_section?: {
    title: string;
    description: string;
  };
  support_profiles: Array<{
    title: string;
    description: string;
  }>;
  service_scope_section?: {
    title: string;
    description: string;
  };
  service_scope: Array<{
    title: string;
    description: string;
  }>;
  operating_model_section?: {
    title: string;
    description: string;
  };
  operating_model: Array<{
    step: string;
    title: string;
    description: string;
  }>;
  client_expectations_section?: {
    title: string;
    description: string;
  };
  client_expectations: string[];
  mission_vision?: {
    mission: string;
    vision: string;
    global_mission: string;
    global_vision: string;
  };
  who_we_serve?: Array<{
    label: string;
    description: string;
  }>;
  differentiators?: Array<{
    title: string;
    description: string;
  }>;
  cta: {
    title: string;
    description: string;
    primary: {
      label: string;
      href: string;
    };
    secondary: {
      label: string;
      href: string;
    };
  };
}

/**
 * FAQ page content - question/answer pairs displayed on the public FAQ page.
 *
 * ADMIN FRONTEND / API REQUIREMENTS:
 * ─────────────────────────────────
 * API Endpoints:
 *   GET    /api/v1/faq                - List all FAQ items (public, active only)
 *   GET    /api/v1/faq/:id            - Get single FAQ item
 *   POST   /api/v1/faq                - Create FAQ item (admin only)
 *   PUT    /api/v1/faq/:id            - Update FAQ item (admin only)
 *   DELETE /api/v1/faq/:id            - Delete FAQ item (admin only)
 *   PATCH  /api/v1/faq/reorder        - Reorder FAQ items (admin only, body: { id, sort_order }[])
 *
 * Admin Form Fields:
 *   question   - Text input, required, max 120 characters
 *   answer     - Textarea, required, max 500 characters (backend must reject if exceeded)
 *   sort_order - Number input. Controls display order. Lower = shown first.
 *   is_active  - Toggle. Only active items appear on the public FAQ page.
 *
 * The FAQ page renders items sorted by sort_order (ascending).
 * Admin can drag-and-drop to reorder items (PATCH /api/v1/faq/reorder).
 */
export interface FaqPageContent {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  items: Array<{
    /** Max 120 chars. The FAQ question. Backend must reject if exceeded. */
    question: string;
    /** Max 500 chars. The FAQ answer. Backend must reject if exceeded. */
    answer: string;
  }>;
}

export interface CareerPageContent {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    /**
     * BACKEND/ADMIN: Banner image URL for the career page hero.
     * - In production: CDN URL from /media/ endpoint (admin upload).
     * - Fallback: /careers/banner-enhanced.png
     * - Recommended dimensions: 1344×768px (16:9 landscape).
     * - Format: WebP preferred (better compression).
     * - Max file size: 500KB.
     * - The image should have a slight dark overlay applied via CSS for text readability.
     */
    banner_image?: string;
  };
  focus_areas: string[];
  status: {
    label: string;
    description: string;
    primary: {
      label: string;
      href: string;
    };
    secondary: {
      label: string;
      href: string;
    };
  };
}

export interface ContactPageContent {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  cards: Array<{
    label: string;
    value: string;
    description: string;
    action: {
      label: string;
      href: string;
    };
  }>;
}

export interface ServicesOverviewContent {
  eyebrow: string;
  title: string;
  description: string;
  panel_title: string;
  panel_body: string;
  service_signals: ServiceSignal[];
  service_nav_groups: ServiceNavGroup[];
  service_flow: ServiceFlowItem[];
  service_promises: string[];
}

export interface ServicesCatalogContent {
  eyebrow: string;
  title: string;
  description: string;
  service_groups: ServiceCatalogGroup[];
}

export interface TrackingSectionContent {
  eyebrow: string;
  title: string;
  description: string;
  checkpoints: TrackingCheckpoint[];
  case_examples: TrackingCaseExample[];
  workflow_steps: TrackingWorkflowStep[];
}

export interface RequestConsultationPageContent {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  summary: {
    title: string;
    description: string;
    bullets: string[];
  };
}

export interface ServicesFaqItem {
  /** Max 120 chars. The FAQ question. */
  question: string;
  /** Max 500 chars. The FAQ answer. */
  answer: string;
  /** Optional micro-CTA after this answer */
  cta?: {
    label: string;
    href: string;
  };
}

export interface ProblemFramingItem {
  icon: string;
  quote: string;
  description: string;
}

export interface ServicesPageContent {
  overview: ServicesOverviewContent;
  catalog: ServicesCatalogContent;
  tracking_section: TrackingSectionContent;
  problem_framing?: ProblemFramingItem[];
  faq?: ServicesFaqItem[];
}

export interface ResourcesPageContent {
  hero_title: string;
  trending_label?: string;
  top_media: {
    hero: string;
    banner: string;
    trending: string[];
  };
  article_sidebar?: {
    title: string;
    description: string;
    primary_cta?: {
      label: string;
      href: string;
    };
  };
  empty_state: {
    title: string;
    description: string;
  };
}

export interface InfoPageContent {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  sections: ContentSection[];
  next_step?: {
    title: string;
    description: string;
    primary_action?: { href: string; label: string };
    secondary_action?: { href: string; label: string };
  };
}
