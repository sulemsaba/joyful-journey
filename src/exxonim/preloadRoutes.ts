/**
 * Route preloader registry - shared between App.tsx and Navigation.tsx.
 *
 * Each lazy page has a preload function that triggers the Vite chunk
 * download without mounting the component. Navigation links call these
 * on mouseenter (hover), so the chunk is already cached by click time.
 *
 * ARCHITECTURE:
 *   - App.tsx imports these for idle-time preloading (requestIdleCallback)
 *   - Navigation.tsx imports routePreloadMap for hover-based preloading
 *   - Each function is idempotent - calling it multiple times is safe
 *     because Vite caches the module after the first import()
 */

export const loadAboutPage = () =>
  import("@/exxonim/pages/AboutPage").then((m) => ({ default: m.AboutPage }));
export const loadCareerPage = () =>
  import("@/exxonim/pages/CareerPage").then((m) => ({ default: m.CareerPage }));
export const loadContactPage = () =>
  import("@/exxonim/pages/ContactPage").then((m) => ({ default: m.ContactPage }));
export const loadFaqPage = () =>
  import("@/exxonim/pages/FaqPage").then((m) => ({ default: m.FaqPage }));
export const loadNotFoundPage = () =>
  import("@/exxonim/pages/NotFoundPage").then((m) => ({ default: m.NotFoundPage }));
export const loadResourceArticlePage = () =>
  import("@/exxonim/pages/ResourceArticlePage").then((m) => ({
    default: m.ResourceArticlePage,
  }));
export const loadResourcesPage = () =>
  import("@/exxonim/pages/ResourcesPage").then((m) => ({ default: m.ResourcesPage }));
export const loadServicesPage = () =>
  import("@/exxonim/pages/ServicesPage").then((m) => ({ default: m.ServicesPage }));
export const loadServiceDetailPage = () =>
  import("@/exxonim/pages/ServiceDetailPage").then((m) => ({ default: m.ServiceDetailPage }));
export const loadSupportPage = () =>
  import("@/exxonim/pages/InfoPages").then((m) => ({ default: m.SupportPage }));
export const loadTermsPage = () =>
  import("@/exxonim/pages/InfoPages").then((m) => ({ default: m.TermsPage }));
export const loadPrivacyPage = () =>
  import("@/exxonim/pages/InfoPages").then((m) => ({ default: m.PrivacyPage }));
export const loadCookiesPage = () =>
  import("@/exxonim/pages/InfoPages").then((m) => ({ default: m.CookiesPage }));
export const loadDataRightsPage = () =>
  import("@/exxonim/pages/InfoPages").then((m) => ({ default: m.DataRightsPage }));
export const loadTrackConsultationPage = () =>
  import("@/exxonim/pages/TrackConsultationPage").then((m) => ({ default: m.TrackConsultationPage }));

/**
 * All preload functions for idle-time preloading in App.tsx.
 * Order matters: high-priority pages first.
 */
export const publicPagePreloaders = [
  loadAboutPage,
  loadCareerPage,
  loadContactPage,
  loadFaqPage,
  loadNotFoundPage,
  loadResourceArticlePage,
  loadResourcesPage,
  loadServicesPage,
  loadServiceDetailPage,
  loadSupportPage,
  loadTermsPage,
  loadPrivacyPage,
  loadCookiesPage,
  loadDataRightsPage,
  loadTrackConsultationPage,
];

/**
 * High-priority preloaders - loaded first during idle time.
 * These are the most likely navigation targets.
 */
export const highPriorityPreloaders = [
  loadAboutPage,
  loadServicesPage,
  loadContactPage,
];

/**
 * Map from normalized route path to preload function.
 * Used by Navigation.tsx for hover-based preloading.
 *
 * Trailing slashes are stripped to match normalizePathname() behavior.
 */
export const routePreloadMap: Record<string, () => Promise<unknown>> = {
  "/about": loadAboutPage,
  "/career": loadCareerPage,
  "/contact": loadContactPage,
  "/faq": loadFaqPage,
  "/services": loadServicesPage,
  "/resources": loadResourcesPage,
  "/blog": loadResourcesPage,
  "/support": loadSupportPage,
  "/terms": loadTermsPage,
  "/privacy": loadPrivacyPage,
  "/cookies": loadCookiesPage,
  "/data-rights": loadDataRightsPage,
  "/track-consultation": loadTrackConsultationPage,
};

/**
 * Preload a route chunk by path. Safe to call multiple times.
 * Returns void - errors are silently caught (chunk will load on navigation instead).
 *
 * Handles both static routes ("/about", "/services") and dynamic article
 * routes ("/resources/my-article-slug", "/blog/my-article-slug").
 * Dynamic article paths all preload the same ResourceArticlePage chunk.
 */
export function preloadRoute(path: string) {
  // Direct lookup for static routes
  const fn = routePreloadMap[path];
  if (fn) {
    void fn().catch(() => {});
    return;
  }

  // Dynamic article paths: /resources/<slug> or /blog/<slug>
  // These all map to loadResourceArticlePage (same chunk)
  const segments = path.split("/").filter(Boolean);
  if (
    segments.length === 2 &&
    (segments[0] === "resources" || segments[0] === "blog")
  ) {
    void loadResourceArticlePage().catch(() => {});
  }

  // Dynamic service detail paths: /services/<slug>
  if (segments.length === 2 && segments[0] === "services") {
    void loadServiceDetailPage().catch(() => {});
  }
}
