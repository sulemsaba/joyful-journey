/**
 * Service Index - barrel file for all API service modules.
 *
 * FASTAPI BACKEND MODULES COVERED:
 * ────────────────────────────────
 * blogService          → /api/v1/blog/posts, /api/v1/blog/categories, /api/v1/blog/authors
 * consultationService  → /api/v1/consultations, /api/v1/track
 * jobsService          → /api/v1/jobs
 * pageService          → /api/v1/pages
 * pricingService       → /api/v1/pricing/plans
 * privacyService       → /api/v1/privacy/consent, /api/v1/privacy-requests
 * siteSettingsService  → /api/v1/site-settings
 * staticFallbackService → /fallback/*.json (server-side emergency content)
 * testimonialService   → /api/v1/testimonials
 *
 * ARCHITECTURE:
 *   All caching is handled by TanStack Query + persistQueryClient.
 *   Hooks use placeholderData for instant rendering. No manual cache management.
 *   JSON fallback (Layer 3) is handled by fetchWithJsonFallback in staticFallbackService.
 */
export {
  getPublicBlogPostBySlug,
  listFeaturedPublicBlogPosts,
  listPublicBlogCategories,
  listPublicBlogPosts,
} from "./blogService";
export { lookupTrackingCode, submitPublicConsultation } from "./consultationService";
export { getPublishedJobs } from "./jobsService";
export { getPageBySlug } from "./pageService";
export { getPricingPlans } from "./pricingService";
export {
  PRIVACY_CONSENT_EVENT,
  getPrivacyConsent,
  updatePrivacyConsent,
} from "./privacyService";
export { getSiteSetting } from "./siteSettingsService";
export {
  fetchWithJsonFallback,
  getStaticFallback,
  loadStaticFallback,
  preloadStaticFallback,
} from "./staticFallbackService";
export { getTestimonials } from "./testimonialService";
