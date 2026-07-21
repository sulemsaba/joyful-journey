import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Routes, Route, useLocation, useNavigationType, useParams } from "react-router-dom";
import { Footer } from "@/exxonim/components/Footer";
import { Navigation } from "@/exxonim/components/Navigation";
import { ShellStatusNotice } from "@/exxonim/components/ShellStatusNotice";
import { NetworkStatus } from "@/exxonim/components/NetworkStatus";
import { WhatsAppButton } from "@/exxonim/components/WhatsAppButton";
import { ScrollToTopButton } from "@/exxonim/components/ScrollToTopButton";
import { ErrorBoundary } from "@/exxonim/components/ErrorBoundary";
import { Toaster } from "sonner";
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
  loadCookiesPage,
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
const CookiesPage = lazy(loadCookiesPage);
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

/* ── ScrollToTop on route change (hash-aware) ──────────────────── */
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();
  const isFirstNavigation = useRef(true);
  const prevPathname = useRef<string | null>(null);

  useEffect(() => {
    const wasFirst = isFirstNavigation.current;
    isFirstNavigation.current = false;
    const pathChanged = prevPathname.current !== pathname;
    prevPathname.current = pathname;

    // On POP — refresh and browser back/forward — leave the scroll alone so
    // the browser's native scrollRestoration returns the visitor to exactly
    // where they were. Exception: the very first load of a hash deep-link
    // (e.g. /contact#inquiry) — the target lives in a lazy chunk, so the
    // browser's own anchor scroll fires before the element exists.
    if (navigationType === "POP" && !(wasFirst && hash)) return;

    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    // Hash navigation (e.g. a CTA to /contact#inquiry): the target page may
    // still be downloading its chunk, so retry until the anchor exists, then
    // scroll it just below the fixed header instead of landing at page top.
    // (Same-page hash clicks skip the reset-to-top so they glide directly.)
    if (pathChanged) window.scrollTo(0, 0);
    const id = hash.slice(1);
    let attempts = 0;
    let timer = 0;
    let cancelled = false;
    const tryScroll = () => {
      if (cancelled) return;
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 84;
        window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
      } else if (attempts < 40) {
        attempts += 1;
        timer = window.setTimeout(tryScroll, 100);
      }
    };
    tryScroll();
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [pathname, hash, navigationType]);
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

  /* ── Boot loader dismissal ─────────────────────────────
   * The boot loader is dismissed by <PageReady> (rendered INSIDE <Routes>, see
   * handlePageReady below) — i.e. only once the actual PAGE CONTENT has mounted,
   * not just the nav + footer shell.
   *
   * We deliberately do NOT dismiss on the shell's first commit. The home page is
   * eager, so its content commits together with the shell (fast). But every
   * OTHER page is lazy — dismissing on the shell commit left those pages showing
   * a blank middle (nav + footer, empty content) while the route chunk was still
   * downloading. Waiting for PageReady keeps the branded loader up until the page
   * is actually there. The 8s safety timeout in index.html still covers a stuck
   * chunk. */

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
   * VISIBILITY SAFEGUARD: We add .js immediately, but delay
   * .reveal-ready by one frame so IntersectionObserver in
   * useRevealOnScroll can reveal in-viewport elements before
   * the CSS starts hiding unrevealed (below-fold) ones. This
   * eliminates the flash-of-invisible-content risk. */
  useEffect(() => {
    document.documentElement.classList.add("js");
    const handle = requestAnimationFrame(() => {
      document.documentElement.classList.add("reveal-ready");
    });
    return () => cancelAnimationFrame(handle);
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
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[999] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-contrast focus:text-sm focus:font-semibold focus:shadow-lg"
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

        <NetworkStatus />
        <ShellStatusNotice />

        {/*
          Page content with Suspense for lazy loading.
          Suspense only wraps <main> so the nav + footer shell
          stays mounted during chunk loading.
        */}
        <main id="top" className={`relative isolate overflow-x-clip flex-1 min-h-screen pt-[60px] xl:pt-[68px]${pageAnimating ? " page-transition-enter" : ""}`}>
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
                <Route path="/cookies" element={<><PageReady onReady={handlePageReady} /><CookiesPage /></>} />
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

        {whatsappUrl && (
          <WhatsAppButton phoneNumber={whatsappUrl} />
        )}
        <ScrollToTopButton />

        {/* App-wide toast host — inquiry/contact feedback surfaces here instead
            of native browser popups. */}
        <Toaster
          position="top-center"
          richColors
          closeButton
          theme={theme === "dark" ? "dark" : "light"}
        />
      </div>
    </ErrorBoundary>
  );
}
