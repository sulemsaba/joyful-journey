import { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route, useLocation, useParams } from "react-router-dom";
import { Footer } from "@/exxonim/components/Footer";
import { Navigation } from "@/exxonim/components/Navigation";
import { PageLoader } from "@/exxonim/components/PageLoader";
import { PrivacyConsentBanner } from "@/exxonim/components/PrivacyConsentBanner";
import { ShellStatusNotice } from "@/exxonim/components/ShellStatusNotice";
import { WhatsAppButton } from "@/exxonim/components/WhatsAppButton";
import { ScrollToTopButton } from "@/exxonim/components/ScrollToTopButton";
import { ErrorBoundary } from "@/exxonim/components/ErrorBoundary";
import { usePublicShell } from "@/exxonim/hooks/usePublicShell";
import { useRevealOnScroll } from "@/exxonim/hooks/useRevealOnScroll";
import { useTheme } from "@/exxonim/hooks/useTheme";

/* ═══════════════════════════════════════════════════════════
 * LAZY-LOADED PAGE COMPONENTS (CODE SPLITTING)
 * ═══════════════════════════════════════════════════════════
 *
 * WHY LAZY LOADING?
 * -----------------
 * Without this, Vite bundles ALL page components into the
 * initial chunk — every import is resolved upfront even
 * though only ONE page is visible at a time. This caused:
 *
 *   1. LARGE INITIAL BUNDLE → slow first paint & laggy
 *      scrolling (unused page CSS/JS bloat the render tree)
 *
 *   2. SLOW FILE-TO-FILE NAVIGATION → every route change
 *      forces React to reconcile ALL component trees,
 *      even those not visible
 *
 *   3. NO CODE SPLITTING → no parallel chunk loading,
 *      no caching of individual pages
 *
 * SOLUTION
 * --------
 * Each page is wrapped in React.lazy() which tells Vite to
 * code-split them into separate chunks. A page chunk is only
 * fetched when the user navigates to that route.
 *
 * To hide the chunk-load delay, we also preload pages during
 * browser idle time (see requestIdleCallback below).
 *
 * ⚠️  RULE FOR FUTURE DEVELOPERS:
 *     NEVER revert to static imports for page components.
 *     If you add a new page:
 *       1. Add its loader function here
 *       2. Add its lazy() component below
 *       3. Add its loader to publicPagePreloaders array
 *       4. Add its <Route> in the Routes block
 */

// ── Lazy loader functions ──────────────────────────────
// Defined as standalone functions (not inline arrow literals)
// so we can reuse them for BOTH lazy() creation AND idle-time
// preloading without duplicating import path strings.

const loadHomePage = () =>
  import("@/exxonim/pages/HomePage").then((m) => ({ default: m.HomePage }));
const loadAboutPage = () =>
  import("@/exxonim/pages/AboutPage").then((m) => ({ default: m.AboutPage }));
const loadCareerPage = () =>
  import("@/exxonim/pages/CareerPage").then((m) => ({ default: m.CareerPage }));
const loadContactPage = () =>
  import("@/exxonim/pages/ContactPage").then((m) => ({ default: m.ContactPage }));
const loadFaqPage = () =>
  import("@/exxonim/pages/FaqPage").then((m) => ({ default: m.FaqPage }));
const loadNotFoundPage = () =>
  import("@/exxonim/pages/NotFoundPage").then((m) => ({ default: m.NotFoundPage }));
const loadResourceArticlePage = () =>
  import("@/exxonim/pages/ResourceArticlePage").then((m) => ({
    default: m.ResourceArticlePage,
  }));
const loadResourcesPage = () =>
  import("@/exxonim/pages/ResourcesPage").then((m) => ({ default: m.ResourcesPage }));
const loadServicesPage = () =>
  import("@/exxonim/pages/ServicesPage").then((m) => ({ default: m.ServicesPage }));
const loadSupportPage = () =>
  import("@/exxonim/pages/InfoPages").then((m) => ({ default: m.SupportPage }));
const loadTermsPage = () =>
  import("@/exxonim/pages/InfoPages").then((m) => ({ default: m.TermsPage }));
const loadPrivacyPage = () =>
  import("@/exxonim/pages/InfoPages").then((m) => ({ default: m.PrivacyPage }));
const loadCookiePage = () =>
  import("@/exxonim/pages/InfoPages").then((m) => ({ default: m.CookiePage }));
const loadDataRightsPage = () =>
  import("@/exxonim/pages/InfoPages").then((m) => ({ default: m.DataRightsPage }));
const loadTrackConsultationPage = () =>
  import("@/exxonim/pages/TrackConsultationPage").then((m) => ({ default: m.TrackConsultationPage }));

// ── Lazy components ────────────────────────────────────
// React.lazy() expects a function returning Promise<{ default: Component }>.
// Our loader functions above satisfy this exactly.

const HomePage = lazy(loadHomePage);
const AboutPage = lazy(loadAboutPage);
const CareerPage = lazy(loadCareerPage);
const ContactPage = lazy(loadContactPage);
const FaqPage = lazy(loadFaqPage);
const NotFoundPage = lazy(loadNotFoundPage);
const ResourceArticlePage = lazy(loadResourceArticlePage);
const ResourcesPage = lazy(loadResourcesPage);
const ServicesPage = lazy(loadServicesPage);
const SupportPage = lazy(loadSupportPage);
const TermsPage = lazy(loadTermsPage);
const PrivacyPage = lazy(loadPrivacyPage);
const CookiePage = lazy(loadCookiePage);
const DataRightsPage = lazy(loadDataRightsPage);
const TrackConsultationPage = lazy(loadTrackConsultationPage);

// ── Preloader registry ─────────────────────────────────
// All lazy-loader functions collected in one array so we can
// preload every page during browser idle time.
//
// ⚠️  WHEN ADDING A NEW PAGE:
//     Add its loader function to this array too. Otherwise the
//     first user to navigate there will experience a chunk-load
//     delay because it wasn't preloaded during idle time.

const publicPagePreloaders = [
  loadHomePage,
  loadAboutPage,
  loadCareerPage,
  loadContactPage,
  loadFaqPage,
  loadNotFoundPage,
  loadResourceArticlePage,
  loadResourcesPage,
  loadServicesPage,
  loadSupportPage,
  loadTermsPage,
  loadPrivacyPage,
  loadCookiePage,
  loadDataRightsPage,
  loadTrackConsultationPage,
];

// ── Type helper for requestIdleCallback ────────────────
// requestIdleCallback is not in TypeScript's default lib for
// all tsconfig targets, so we extend the Window type to make
// TS happy without forcing a lib update project-wide.

type IdleWindow = typeof window & {
  requestIdleCallback?: (
    callback: IdleRequestCallback,
    options?: IdleRequestOptions
  ) => number;
  cancelIdleCallback?: (handle: number) => void;
};

/* ── Page-level Suspense fallback ──────────────────────
 * Rendered inside <main> so the shell (nav + footer) stays
 * visible while a lazy page chunk loads.
 *
 * ⚠️  Why not reuse <PageLoader /> here?
 *     <PageLoader> is a full-screen overlay (position: fixed)
 *     that blocks the ENTIRE viewport. During lazy navigation
 *     we want the nav and footer to REMAIN VISIBLE so the user
 *     doesn't think the app crashed. This inline fallback sits
 *     inside <main> and just fills the content area.
 *
 *     Same visual language (favicon + animated dots) as the
 *     full-screen loader so there's no jarring discontinuity.
 */
function PageSuspenseFallback() {
  return (
    <div
      className="flex items-center justify-center min-h-[60vh]"
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-4">
        {/* Favicon image with smooth pulse — same as big loader */}
        <div className="relative animate-[loader-pulse_2s_ease-in-out_infinite]">
          {/* Light mode favicon */}
          <img
            src="/branding/exxonim-favicon-light.png"
            alt=""
            width="40"
            height="40"
            className="logo-light block w-10 h-10 object-contain"
          />
          {/* Dark mode favicon */}
          <img
            src="/branding/exxonim-favicon-dark.png"
            alt=""
            width="40"
            height="40"
            className="logo-dark w-10 h-10 object-contain"
          />
        </div>

        {/* Loading text with animated dots — same as big loader */}
        <div className="flex items-center">
          <span className="font-sans text-sm font-medium text-text-muted tracking-[0.08em] uppercase">Loading</span>
          <span className="loader-dots font-sans text-sm font-medium text-text-muted" aria-hidden="true">
            <span>.</span><span>.</span><span>.</span>
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── ScrollToTop on route change ───────────────────────
 * React Router does NOT automatically scroll to top when
 * the route changes. Without this, navigating from a long
 * page (e.g. FAQ) to another page leaves the user scrolled
 * halfway down — which feels broken.
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/* ── Resource Article wrapper ──────────────────────────
 * Extracts the slug from the URL params for React Router.
 *
 * FASTAPI BACKEND:
 *   GET /api/v1/blog/posts?slug={slug}
 */
function ResourceArticleRoute() {
  const { slug } = useParams<{ slug: string }>();
  return <ResourceArticlePage slug={slug!} />;
}

/* ═══════════════════════════════════════════════════════════
 * APP — ROOT COMPONENT
 * ═══════════════════════════════════════════════════════════
 *
 * Renders the site shell (nav + footer) with React Router
 * handling page routing. All page components are lazy-loaded.
 *
 * COLD-START NOTE (important for dev workflow):
 * ---------------------------------------------
 * On a fresh Vite dev server start (or after clearing the
 * browser cache), the FIRST navigation to ANY lazy page will
 * show the Suspense fallback briefly while Vite compiles that
 * chunk. This is EXPECTED BEHAVIOR — it only happens once
 * per page per session. Subsequent navigations are instant.
 *
 * In production (vite build), all chunks are pre-compiled so
 * the fallback is never seen.
 *
 * Do NOT remove lazy loading thinking it's "slower" during
 * dev — the alternative (eager loading) makes EVERY page
 * slow all the time, which is FAR worse.
 */
export function App() {
  const { theme, toggleTheme } = useTheme();
  const shell = usePublicShell();
  const [isPageLoading, setIsPageLoading] = useState(true);
  const location = useLocation();

  useRevealOnScroll();

  useEffect(() => {
    document.documentElement.classList.add("js");
    setIsPageLoading(false);
  }, []);

  /* ── Idle-time preloading ─────────────────────────────────
   *
   * WHY requestIdleCallback?
   * -------------------------
   * We preload ALL page chunks after the first render, but
   * only during browser idle periods (when the browser isn't
   * busy painting, handling user input, or running other
   * critical tasks). This means:
   *
   *   - First page is FAST (only one chunk loaded on demand)
   *   - Subsequent pages are INSTANT (chunk already cached)
   *   - No network waterfalls during navigation
   *   - No competition with initial paint or user interactions
   *
   * requestIdleCallback() schedules low-priority work that the
   * browser can interrupt at any time. If the browser doesn't
   * support it (older Safari, some embedded browsers), we fall
   * back to setTimeout with a generous 1.2s delay.
   */
  useEffect(() => {
    const preloadPages = () => {
      void Promise.allSettled(publicPagePreloaders.map((preloadPage) => preloadPage()));
    };
    const idleWindow = window as IdleWindow;

    if (idleWindow.requestIdleCallback) {
      const handle = idleWindow.requestIdleCallback(preloadPages, { timeout: 2500 });
      return () => idleWindow.cancelIdleCallback?.(handle);
    }

    const handle = window.setTimeout(preloadPages, 1200);
    return () => window.clearTimeout(handle);
  }, []);

  const whatsappUrl = shell.company.whatsapp;

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-page text-text">
        <PageLoader isLoading={isPageLoading} />

        {/*
          Skip-to-content link for keyboard / screen reader users.
          Hidden by default, visible on focus (Tab key).
        */}
        <a
          href="#top"
          className="pointer-events-none opacity-0 focus:pointer-events-auto focus:opacity-100 fixed left-4 top-2 z-[100] inline-flex h-12 items-center rounded-full bg-accent px-6 text-sm font-extrabold text-accent-contrast transition-all focus:outline-2 focus:outline-accent"
        >
          Skip to content
        </a>

        <Navigation
          brand={shell.brand}
          company={shell.company}
          onToggleTheme={toggleTheme}
          pathname={location.pathname}
          theme={theme}
        />

        <ShellStatusNotice />

        {/*
          Page content with Suspense for lazy loading.
          Suspense only wraps <main> so the nav + footer shell
          stays mounted during chunk loading. If Suspense wrapped
          the entire return, the shell would unmount on every
          route change — causing a flash and losing nav state.
        */}
        <main id="top" className="relative isolate overflow-x-clip flex-1 pt-[68px]">
          <ScrollToTop />
          <ErrorBoundary>
            <Suspense fallback={<PageSuspenseFallback />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/resources" element={<ResourcesPage />} />
                <Route path="/blog" element={<ResourcesPage />} />
                <Route path="/resources/:slug" element={<ResourceArticleRoute />} />
                <Route path="/blog/:slug" element={<ResourceArticleRoute />} />
                <Route path="/career" element={<CareerPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/support" element={<SupportPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/cookies" element={<CookiePage />} />
                <Route path="/data-rights" element={<DataRightsPage />} />
                <Route path="/track-consultation" element={<TrackConsultationPage />} />
                <Route path="*" element={<NotFoundPage pathname={location.pathname} />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>

        <Footer
          brand={shell.brand}
          company={shell.company}
          footer={shell.footer}
        />

        <PrivacyConsentBanner pathname={location.pathname} />

        {whatsappUrl && <WhatsAppButton phoneNumber={whatsappUrl} />}
        <ScrollToTopButton />
      </div>
    </ErrorBoundary>
  );
}
