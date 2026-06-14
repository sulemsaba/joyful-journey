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
import { publicPagePreloaders, highPriorityPreloaders } from "@/exxonim/preloadRoutes";

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
 * Preload functions are defined in preloadRoutes.ts (shared
 * with Navigation.tsx for hover-based preloading).
 */

// ── Lazy loader functions (imported from shared registry) ─────
import {
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
} from "@/exxonim/preloadRoutes";

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

// ── Type helper for requestIdleCallback ────────────────
type IdleWindow = typeof window & {
  requestIdleCallback?: (
    callback: IdleRequestCallback,
    options?: IdleRequestOptions
  ) => number;
  cancelIdleCallback?: (handle: number) => void;
};

/* ── Page-level Suspense fallback ──────────────────────
 * L11: SUSPENSE_FALLBACK
 * LABEL:    SUSPENSE_FALLBACK
 * POSITION: <main> area — shown during lazy-loaded chunk download
 * APPEARANCE: Nothing (renders null). The bg-page background color
 *             provides the correct theme color via inline styles
 *             in index.html. No flash, no flicker.
 * STATUS:   active — renders null (no visual loader)
 * CSS REQUIRED: None (relies on bg-page background from index.html)
 * RE-ENABLE: Replace `fallback={null}` with a loader component
 * ═══════════════════════════════════════════════════════════════════════════ */

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

  useRevealOnScroll(location.pathname);

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
      const lowPriority = publicPagePreloaders.filter(
        (p) => !highPriorityPreloaders.includes(p)
      );

      void Promise.allSettled(highPriorityPreloaders.map((fn) => fn()));

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
        <main id="top" className="relative isolate overflow-x-clip flex-1 pt-[60px] xl:pt-[68px]">
          <ScrollToTop />
          <ErrorBoundary>
            <Suspense fallback={null}>
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
