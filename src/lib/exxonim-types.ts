/**
 * Domain types for the Exxonim public website.
 *
 * These types align with the FastAPI backend response schemas.
 * When the backend is connected, API responses will be cast to these types.
 * The shared/contracts directory in the original project maps to these.
 */

export type Theme = "dark" | "light";

export interface NavigationItem {
  id: number;
  title: string;
  url: string;
  description?: string;
  kind: string;
  order: number;
  isActive: boolean;
  parentId: number | null;
  createdAt: string;
  updatedAt: string;
  children: NavigationItem[];
}

export interface NavLink {
  label: string;
  href: string;
}

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

export interface HomeHeroHighlight {
  title: string;
  detail: string;
}

export interface HomeHeroContent {
  eyebrow: string;
  title: string;
  description: string;
  cta: { label: string; href: string };
  highlights: HomeHeroHighlight[];
}

export interface ProviderLogo {
  alt: string;
  src: string;
}

export interface ProviderSectionContent {
  kicker: string;
  title: string;
  logos: ProviderLogo[];
}

export interface FeatureVisualContent {
  workstreamValue: string;
  counterpartLabel: string;
  counterpartValue: string;
  focusValue: string;
  summaryTitle: string;
  summaryBody: string;
}

export interface FeatureRow {
  title: string;
  description: string;
  visualKey: string;
}

export interface StackItem {
  title: string;
  subtitle: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  windowTitle: string;
  windowTag: string;
  videoSrc: string;
}

export interface StackSectionContent {
  items: StackItem[];
  default_feature_rows: FeatureRow[];
  feature_visual_content: Record<string, FeatureVisualContent>;
}

export interface HomeInsightsContent {
  title: string;
  intro: string;
  footer_copy: string;
}

export interface HomePageContent {
  hero: HomeHeroContent;
  provider_section: ProviderSectionContent;
  stack_section: StackSectionContent;
  insights_section: HomeInsightsContent;
}

export interface PricingFeature {
  label: string;
  included: boolean;
}

export interface PricingPlan {
  id: number;
  name: string;
  badge: string;
  description: string;
  notes: string;
  recommended: boolean;
  features: PricingFeature[];
}

export interface Testimonial {
  id: number;
  eyebrow: string;
  headline: string;
  support: string;
  quote: string;
  name: string;
  role: string;
  initials: string;
}

export interface BlogCategory {
  id: string;
  label: string;
  description: string;
}

export interface BlogAuthor {
  name: string;
  role?: string;
  avatar?: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  category: BlogCategory | null;
  mediaLabel: string;
  coverImageSrc?: string;
  coverAlt?: string;
  featuredSlot?: string;
  featuredOnHome: boolean;
  relatedSlugs: string[];
  author?: BlogAuthor;
  content?: {
    introduction: string;
    highlights: string[];
    sections: { heading: string; paragraphs: string[] }[];
  };
}

export interface PageRecord<TContent> {
  id: number;
  title: string;
  slug: string;
  content: TContent;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SiteSetting<TValue> {
  id: number;
  key: string;
  value: TValue;
  createdAt: string;
  updatedAt: string;
}

/* Footer value type — matches SiteSettingFooterValue in the API contracts */
export interface FooterQuickLink {
  label: string;
  href: string;
}

export interface FooterSocialLink {
  platform: string;
  url: string;
  label?: string;
  isActive: boolean;
}

export interface FooterContent {
  quick_links: FooterQuickLink[];
  other_resources: FooterQuickLink[];
  tagline: string;
  primary_cta: FooterQuickLink;
  social_links: FooterSocialLink[];
  copyright: string;
}

/* About page */
export interface AboutHeroContent {
  eyebrow: string;
  title: string;
  description: string;
}

export interface SupportProfile {
  title: string;
  description: string;
}

export interface ServiceScopeItem {
  title: string;
  description: string;
}

export interface OperatingModelItem {
  step: string;
  title: string;
  description: string;
}

export interface AboutPageContent {
  hero: AboutHeroContent;
  company_profile: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    working_style_label?: string;
    working_style: string;
  };
  support_profiles_section?: { title: string; description: string };
  support_profiles: SupportProfile[];
  service_scope_section?: { title: string; description: string };
  service_scope: ServiceScopeItem[];
  operating_model_section?: { title: string; description: string };
  operating_model: OperatingModelItem[];
  client_expectations_section?: { title: string; description: string };
  client_expectations: string[];
  cta: {
    title: string;
    description: string;
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
  };
}

/* Services page */
export interface ServicesOverviewContent {
  eyebrow: string;
  title: string;
  description: string;
  features: { icon: string; label: string; description: string }[];
}

export interface ServiceCatalogItem {
  title: string;
  description: string;
  cta_label: string;
  cta_href: string;
}

export interface ServiceCatalogGroup {
  title: string;
  items: ServiceCatalogItem[];
}

export interface ServicesCatalogContent {
  title: string;
  description: string;
  groups: ServiceCatalogGroup[];
}

export interface ServicesPageContent {
  overview: ServicesOverviewContent;
  catalog: ServicesCatalogContent;
}

/* Career page */
export interface CareerPageContent {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  focus_areas: string[];
  status: {
    label: string;
    description: string;
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
  };
}

/* Contact page */
export interface ContactCardContent {
  label: string;
  value: string;
  description: string;
  action: { label: string; href: string };
}

export interface ContactPageContent {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  cards: ContactCardContent[];
}

/* FAQ page */
export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqPageContent {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  items: FaqItem[];
}

/* Resources page */
export interface ResourcesPageContent {
  hero_title: string;
  trending_label: string;
  top_media: Record<string, string>;
  article_sidebar: {
    title: string;
    description: string;
    primary_cta: { label: string; href: string };
  };
  empty_state: {
    title: string;
    description: string;
  };
}

/* Info pages (Privacy, Terms, Cookies, Data Rights) */
export interface InfoPageSection {
  title: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface InfoPageContent {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  sections: InfoPageSection[];
  next_step: {
    title: string;
    description: string;
    primary_action: { label: string; href: string };
    secondary_action: { label: string; href: string };
  };
}

/* API types for backend integration — matches FastAPI response schemas */
export interface ApiCareerJob {
  id: number;
  title: string;
  slug: string;
  department: string;
  employment_type: string;
  location_mode: string;
  city: string;
  country: string;
  compensation_label: string | null;
  experience_label: string | null;
  summary: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  status: string;
  is_published: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface ApiPublicConsultationSubmission {
  full_name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service_type_code: string;
  message: string;
  idempotency_key: string;
  source_channel: string;
}

export interface ApiPublicConsultationSubmissionResponse {
  tracking_id: string;
  status: string;
  message: string;
}
