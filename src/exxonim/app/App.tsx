import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation, useParams } from "react-router-dom";
import { Footer } from "@/exxonim/components/Footer";
import { Navigation } from "@/exxonim/components/Navigation";
import { PrivacyConsentBanner } from "@/exxonim/components/PrivacyConsentBanner";
import { ShellStatusNotice } from "@/exxonim/components/ShellStatusNotice";
import { WhatsAppButton } from "@/exxonim/components/WhatsAppButton";
import { ScrollToTopButton } from "@/exxonim/components/ScrollToTopButton";
import { ErrorBoundary } from "@/exxonim/components/ErrorBoundary";
import { usePublicShell } from "@/exxonim/hooks/usePublicShell";
import { useRevealOnScroll } from "@/exxonim/hooks/useRevealOnScroll";
import { useTheme } from "@/exxonim/hooks/useTheme";

/* ── EAGER-LOADED: HomePage (LCP-critical) ──────────
 * The homepage is the LARGEST CONTENTFUL PAINT element.
 * Lazy-loading it adds a chunk-download waterfall before
 * the hero h1 can render. All other pages remain lazy-loaded
 * since they are not the initial landing page. */
import { HomePage } from "@/exxonim/pages/HomePage";

/* ═══════════════════════════════════════════════════════════
 * LAZY-LOADED PAGE COMPONENTS (CODE SPLITTING)
 * ═══════════════════════════════════════════════════════════
 *
 * Each page is wrapped in React.lazy() which tells Vite to
 * code-split them into separate chunks. A page chunk is only
 * fetched when the user navigates to that route.
 *
 * To hide the chunk-load delay, we also preload pages during
 * browser idle time (see requestIdleCallback below).
 */

// ── Lazy loader functions ──────────────────────────────
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
const publicPagePreloaders = [
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
 * Shows skeleton shapes with a centered faded favicon pulse +
 * animated dots overlay — same visual pattern as HomePageSkeleton
 * and ContentSkeleton. */
function PageSuspenseFallback() {
  return (
    <div
      className="relative isolate overflow-hidden flex items-center min-h-[clamp(24rem,48vh,34rem)] w-full"
      role="status"
      aria-live="polite"
    >
      {/* Skeleton shapes */}
      <div className="w-[min(1180px,calc(100%-2rem))] mx-auto mt-6 p-8" aria-hidden="true">
        <div className="grid gap-3">
          <div className="h-4 w-28 rounded-full bg-accent-soft animate-pulse" />
          <div className="h-11 w-[min(30rem,88%)] rounded-full bg-accent-soft animate-pulse" />
          <div className="h-4 w-[min(36rem,100%)] rounded-full bg-accent-soft animate-pulse" />
          <div className="h-4 w-[min(36rem,100%)] rounded-full bg-accent-soft animate-pulse" />
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="min-h-[9rem] rounded-[1.25rem] bg-accent-soft/70 border border-accent-soft/50 animate-pulse" />
          <div className="min-h-[9rem] rounded-[1.25rem] bg-accent-soft/70 border border-accent-soft/50 animate-pulse" />
          <div className="min-h-[9rem] rounded-[1.25rem] bg-accent-soft/70 border border-accent-soft/50 animate-pulse" />
        </div>
      </div>

      {/* Centered favicon pulse + animated dots overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="flex flex-col items-center gap-4">
          <div className="relative animate-[loader-pulse_2s_ease-in-out_infinite]">
            <img
              src="/branding/exxonim-favicon-light.png"
              alt=""
              width="48"
              height="48"
              className="logo-light block w-12 h-12 object-contain opacity-40"
            />
            <img
              src="/branding/exxonim-favicon-dark.png"
              alt=""
              width="48"
              height="48"
              className="logo-dark w-12 h-12 object-contain opacity-40"
            />
          </div>
          <div className="flex items-center opacity-30">
            <span className="font-sans text-sm font-medium text-text-muted tracking-[0.08em] uppercase">Loading</span>
            <span className="loader-dots font-sans text-sm font-medium text-text-muted" aria-hidden="true">
              <span>.</span><span>.</span><span>.</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── ScrollToTop on route change ──────────────────── */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/* ── Resource Article wrapper ─────────────────────── */
function ResourceArticleRoute() {
  const { slug } = useParams<{ slug: string }>();
  return <ResourceArticlePage slug={slug!} />;
}

/* ═══════════════════════════════════════════════════════════
 * APP — ROOT COMPONENT
 * ═══════════════════════════════════════════════════════════
 *
 * No full-screen loader overlay: the body background (bg-page)
 * provides the correct theme color instantly via the blocking
 * <script> in <head>. React renders content immediately.
 */
export function App() {
  const { theme, toggleTheme } = useTheme();
  const shell = usePublicShell();
  const location = useLocation();

  useRevealOnScroll();

  /* ── Enable scroll-reveal system ────────────────────
   * Adding .js to <html> activates the CSS transition
   * system for [data-reveal] elements. Without .js, text
   * is always visible (progressive enhancement for no-JS). */
  useEffect(() => {
    document.documentElement.classList.add("js");
  }, []);

  /* ── Idle-time preloading ─────────────────────────────────
   * Preload ALL page chunks after the first render during
   * browser idle periods. This means:
   *   - First page is FAST (only one chunk loaded on demand)
   *   - Subsequent pages are INSTANT (chunk already cached) */
  useEffect(() => {
    const preloadPages = () => {
      const highPriority = [loadAboutPage, loadServicesPage, loadContactPage];
      const lowPriority = publicPagePreloaders.filter(
        (p) => !highPriority.includes(p)
      );

      void Promise.allSettled(highPriority.map((fn) => fn()));

      lowPriority.forEach((fn, i) => {
        setTimeout(() => { void fn(); }, 500 * (i + 1));
      });
    };
    const idleWindow = window as IdleWindow;

    if (idleWindow.requestIdleCallback) {
      const handle = idleWindow.requestIdleCallback(preloadPages, { timeout: 3000 });
      return () => idleWindow.cancelIdleCallback?.(handle);
    }

    const handle = window.setTimeout(preloadPages, 2000);
    return () => window.clearTimeout(handle);
  }, []);

  const whatsappUrl = shell.company.whatsapp;

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-page text-text">
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
          stays mounted during chunk loading.
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
