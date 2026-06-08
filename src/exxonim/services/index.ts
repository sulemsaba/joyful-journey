/**
 * Service Index — barrel file for all API service modules.
 *
 * FASTAPI BACKEND MODULES COVERED:
 * ────────────────────────────────
 * blogService          → /api/v1/blog/posts, /api/v1/blog/categories, /api/v1/blog/authors
 * consultationService  → /api/v1/consultations, /api/v1/track
 * jobsService          → /api/v1/jobs
 * navigationService    → /api/v1/navigation
 * pageService          → /api/v1/pages
 * pricingService       → /api/v1/pricing/plans
 * privacyService       → /api/v1/privacy/consent, /api/v1/privacy-requests
 * siteSettingsService  → /api/v1/site-settings
 * staticFallbackService → /fallback/*.json (no API, static assets)
 * testimonialService   → /api/v1/testimonials
 *
 * See individual service files for detailed FastAPI endpoint documentation,
 * request/response schemas, and PostgreSQL table references.
 */
export {
  fetchFreshPublicBlogPosts,
  getCachedPublicBlogCategories,
  getCachedPublicBlogPostBySlug,
  getCachedPublicBlogPosts,
  getPublicBlogPostBySlug,
  listFeaturedPublicBlogPosts,
  listPublicBlogCategories,
  listPublicBlogPosts,
} from "./blogService";
export { lookupTrackingCode, submitPublicConsultation } from "./consultationService";
export { getCachedPublishedJobs, getPublishedJobs } from "./jobsService";
export {
  getCachedNavigation,
  getCachedNavigationResource,
  getNavigation,
  getNavigationResource,
} from "./navigationService";
export { getCachedPageBySlug, getPageBySlug } from "./pageService";
export { getCachedPricingPlans, getPricingPlans } from "./pricingService";
export {
  PRIVACY_CONSENT_EVENT,
  getPrivacyConsent,
  updatePrivacyConsent,
} from "./privacyService";
export {
  getCachedSiteSetting,
  getCachedSiteSettingResource,
  getSiteSetting,
  getSiteSettingResource,
} from "./siteSettingsService";
export {
  getStaticFallback,
  preloadStaticFallback,
} from "./staticFallbackService";
export { getCachedTestimonials, getTestimonials } from "./testimonialService";
