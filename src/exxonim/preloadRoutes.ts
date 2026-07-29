/**
 * Route preloader registry - shared between App.tsx and Navigation.tsx.
 *
 * Each lazy page has a preload function that triggers the Vite chunk
 * download without mounting the component. Navigation links call these
 * on mouseenter (hover), so the chunk is already cached by click time.
 *
 * ARCHITECTURE:
 *   - App.tsx imports these for idle-time preloading (requestIdleCallback)
 *   - Leaf components (SmartLink, Button, navigation menus) call
 *     preloadRoute() from preloadRegistry.ts for hover-based preloading.
 *     This module registers the concrete loaders into that registry at
 *     startup, so those leaf components never import the page graph.
 *   - Each function is idempotent - calling it multiple times is safe
 *     because Vite caches the module after the first import()
 */

import {
  registerRoutePreloader,
  registerPrefixPreloader,
} from "@/exxonim/preloadRegistry";

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
 *
 * Trailing slashes are stripped to match normalizePathname() behavior.
 */
const routePreloadMap: Record<string, () => Promise<unknown>> = {
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

/*
 * Register every preloader into the dependency-free preloadRegistry at module
 * load. This runs when App.tsx first imports this module (app boot), so the
 * registry is populated well before any hover fires. Leaf components import
 * only preloadRegistry.ts and stay clear of the page import graph.
 *
 * Dynamic article paths (/resources/<slug>, /blog/<slug>) all preload the same
 * ResourceArticlePage chunk; /services/<slug> preloads ServiceDetailPage.
 */
for (const [path, fn] of Object.entries(routePreloadMap)) {
  registerRoutePreloader(path, fn);
}
registerPrefixPreloader("resources", loadResourceArticlePage);
registerPrefixPreloader("blog", loadResourceArticlePage);
registerPrefixPreloader("services", loadServiceDetailPage);
