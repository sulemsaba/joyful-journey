import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Routes, Route, useLocation, useParams } from "react-router-dom";
import { Footer } from "@/exxonim/components/Footer";
import { Navigation } from "@/exxonim/components/Navigation";
import { PrivacyConsentBanner } from "@/exxonim/components/PrivacyConsentBanner";
import { ShellStatusNotice } from "@/exxonim/components/ShellStatusNotice";
import { NetworkStatus } from "@/exxonim/components/NetworkStatus";
import { WhatsAppButton } from "@/exxonim/components/WhatsAppButton";
import { ScrollToTopButton } from "@/exxonim/components/ScrollToTopButton";
import { ErrorBoundary } from "@/exxonim/components/ErrorBoundary";
import { usePublicShell } from "@/exxonim/hooks/usePublicShell";
import { useContentVersion } from "@/exxonim/hooks/useContentVersion";
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
  loadServiceDetailPage,
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
const ServiceDetailPage = lazy(loadServiceDetailPage);
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
 * The boot loader overlay stays visible until actual page
 * content renders (see PageReady component below). So the
 * Suspense fallback can safely be null - the boot loader
 * covers the gap during lazy chunk download.
 * ═══════════════════════════════════════════════════════════════════════════ */

/* ── ScrollToTop on route change ──────────────────── */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/* ── Page content readiness signal ────────────────────
 * Rendered INSIDE <Routes> so it only fires after the
 * route chunk has loaded and the page component has
 * mounted. This keeps the boot loader visible during
 * the gap between shell render and page content render.
 *
 * For eager-loaded pages (HomePage), this fires in the
 * same render cycle as the shell - no perceptible delay.
 * For lazy-loaded pages, this fires after the chunk
 * downloads and the component mounts. */
function PageReady({ onReady }: { onReady: () => void }) {
  const called = useRef(false);
  useLayoutEffect(() => {
    if (!called.current) {
      called.current = true;
      onReady();
    }
  }, [onReady]);
  return null;
}

/* ── Resource Article wrapper ─────────────────────── */
function ResourceArticleRoute() {
  const { slug } = useParams<{ slug: string }>();
  return <ResourceArticlePage slug={slug!} />;
}

/* ═══════════════════════════════════════════════════════════
 * APP - ROOT COMPONENT
 * ═══════════════════════════════════════════════════════════
 *
 * No full-screen loader overlay: the body background (bg-page)
 * provides the correct theme color instantly via the blocking
 * <script> in <head>. React renders content immediately.
 */
export function App({ onReady }: { onReady?: () => void }) {
  const { theme, toggleTheme } = useTheme();
  const shell = usePublicShell();
  useContentVersion();
  const location = useLocation();
  const readyFired = useRef(false);

  /* ── Dismiss boot loader IMMEDIATELY on mount ─────────
   * Before: waited for PageReady inside <Routes> which required the
   * entire page component tree (HomePage → ReferenceHero → etc.) to
   * commit before firing. On 6x CPU this added seconds of loader time.
   *
   * Now: dismisses on the FIRST commit of the <App> shell itself.
   * The CSS fade-out runs while React continues rendering the page
   * content underneath — the correct bg-color is already set via
   * the blocking <style> in <head>, so no white flash.
   *
   * For lazy-loaded route changes, PageReady still fires from inside
   * <Routes> to dismiss any subsequent loading state. */
  useLayoutEffect(() => {
    if (!readyFired.current && onReady) {
      readyFired.current = true;
      onReady();
    }
  }, [onReady]);

  /* ── Page transition animation ─────────────────────────
   * On route change, trigger a subtle opacity dip on
   * the <main> element. This is purely CSS - no layout
   * thrashing, no JS-driven animations, no Framer Motion.
   *
   * DESIGN DECISION: We use a very short (120ms) opacity
   * dip (1 → 0.92 → 1) instead of a slide or fade.
   * Slides and longer fades add perceived delay, which
   * we spent effort eliminating. This gives polish
   * without feeling slow.
   *
   * PERFORMANCE: Single CSS animation, opacity only
   * (GPU-composited). Zero impact on Core Web Vitals. */
  const [pageAnimating, setPageAnimating] = useState(false);
  const prevPathname = useRef(location.pathname);

  useEffect(() => {
    // Skip animation on initial load (boot loader handles that)
    if (prevPathname.current === location.pathname) return;
    prevPathname.current = location.pathname;

    setPageAnimating(true);
    const timer = setTimeout(() => setPageAnimating(false), 150);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  useRevealOnScroll(location.pathname);

  /* ── Signal page readiness ─────────────────────────────
   * Called by <PageReady> which lives INSIDE <Routes>.
   * This guarantees the boot loader stays visible until
   * the actual page component has rendered - not just
   * the nav + footer shell. */
  const handlePageReady = useCallback(() => {
    if (!readyFired.current && onReady) {
      readyFired.current = true;
      onReady();
    }
  }, [onReady]);

  /* ── Enable scroll-reveal system ────────────────────
   * Adding .js to <html> activates the CSS transition
   * system for [data-reveal] elements. Without .js, text
   * is always visible (progressive enhancement for no-JS).
   *
   * TIMING: This MUST run AFTER useRevealOnScroll has
   * synchronously revealed all in-viewport elements.
   * Since useRevealOnScroll is called BEFORE this effect,
   * and its scanAndObserve() runs synchronously with
   * .revealed class additions, by the time this effect
   * fires, all in-viewport elements already have .revealed
   * and will stay visible when html.js activates opacity:0
   * on unrevealed (below-fold) elements. */
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

        <NetworkStatus />
        <ShellStatusNotice />

        {/*
          Page content with Suspense for lazy loading.
          Suspense only wraps <main> so the nav + footer shell
          stays mounted during chunk loading.
        */}
        <main id="top" className={`relative isolate overflow-x-clip flex-1 pt-[60px] xl:pt-[68px]${pageAnimating ? " page-transition-enter" : ""}`}>
          <ScrollToTop />
          <ErrorBoundary>
            <Suspense fallback={null}>
              <Routes>
                <Route path="/" element={<><PageReady onReady={handlePageReady} /><HomePage /></>} />
                <Route path="/about" element={<><PageReady onReady={handlePageReady} /><AboutPage /></>} />
                <Route path="/faq" element={<><PageReady onReady={handlePageReady} /><FaqPage /></>} />
                <Route path="/services" element={<><PageReady onReady={handlePageReady} /><ServicesPage /></>} />
                <Route path="/services/:slug" element={<><PageReady onReady={handlePageReady} /><ServiceDetailPage /></>} />
                <Route path="/resources" element={<><PageReady onReady={handlePageReady} /><ResourcesPage /></>} />
                <Route path="/blog" element={<><PageReady onReady={handlePageReady} /><ResourcesPage /></>} />
                <Route path="/resources/:slug" element={<><PageReady onReady={handlePageReady} /><ResourceArticleRoute /></>} />
                <Route path="/blog/:slug" element={<><PageReady onReady={handlePageReady} /><ResourceArticleRoute /></>} />
                <Route path="/career" element={<><PageReady onReady={handlePageReady} /><CareerPage /></>} />
                <Route path="/contact" element={<><PageReady onReady={handlePageReady} /><ContactPage /></>} />
                <Route path="/support" element={<><PageReady onReady={handlePageReady} /><SupportPage /></>} />
                <Route path="/terms" element={<><PageReady onReady={handlePageReady} /><TermsPage /></>} />
                <Route path="/privacy" element={<><PageReady onReady={handlePageReady} /><PrivacyPage /></>} />
                <Route path="/cookies" element={<><PageReady onReady={handlePageReady} /><CookiePage /></>} />
                <Route path="/data-rights" element={<><PageReady onReady={handlePageReady} /><DataRightsPage /></>} />
                <Route path="/track-consultation" element={<><PageReady onReady={handlePageReady} /><TrackConsultationPage /></>} />
                <Route path="*" element={<><PageReady onReady={handlePageReady} /><NotFoundPage pathname={location.pathname} /></>} />
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
