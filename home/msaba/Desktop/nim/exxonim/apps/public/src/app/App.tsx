import { lazy, Suspense, useEffect, useState } from "react";
import { Footer, Navigation } from "../features/site-shell";
import { PageLoader } from "../components/PageLoader";
import { PrivacyConsentBanner } from "../components/PrivacyConsentBanner";
import { ShellStatusNotice } from "../components/ShellStatusNotice";
import { usePublicRouter } from "./usePublicRouter";
import { usePublicShell } from "../hooks/usePublicShell";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";
import { useStackCardDepth } from "../hooks/useStackCardDepth";
import { useTheme } from "../hooks/useTheme";
import { getResourcePostSlug } from "./routes";

/* ═══════════════════════════════════════════════════════════
 * LAZY-LOADED PAGE COMPONENTS
 * ═══════════════════════════════════════════════════════════
 *
 * WHY LAZY LOADING?
 * -----------------
 * The Vite dev server was eagerly bundling ALL page components
 * into the initial chunk — every import was resolved upfront
 * even though only ONE page is visible at a time. This caused:
 *
 *   1. LARGE INITIAL BUNDLE → slow first paint & laggy scroll
 *      on the home page (unused page CSS/JS bloat the render tree)
 *
 *   2. SLOW FILE-TO-FILE NAVIGATION → every route change forced
 *      React to reconcile ALL component trees, even those not
 *      visible, because they were all part of the same module
 *      graph
 *
 *   3. NO CODE SPLITTING → no parallel chunk loading, no caching
 *      of individual pages
 *
 * SOLUTION
 * --------
 * Each page is wrapped in React.lazy() which tells Vite to
 * code-split them into separate chunks. The page chunk is only
 * fetched when the user navigates to that route.
 *
 * To hide the chunk-load delay from the user, we also preload
 * pages during browser idle time (see preloadPages below).
 *
 * ⚠️ IMPORTANT FOR FUTURE DEVELOPERS:
 *    NEVER revert to static imports for page components.
 *    If you add a new page, add its lazy() here following the
 *    same pattern. See the PRECOMPILATION section below.
 */

// ── Lazy loader functions ───────────────────────────
// Each function returns a dynamic import() promise. We define
// them as standalone functions (not inline arrow literals) so
// we can reuse them for both lazy() creation AND idle-time
// preloading without duplicating the import path strings.

const loadHomePage = () =>
  import("../features/home").then((m) => ({ default: m.HomePage }));

const loadAboutPage = () =>
  import("../features/pages").then((m) => ({ default: m.AboutPage }));

const loadCareerPage = () =>
  import("../features/pages").then((m) => ({ default: m.CareerPage }));

const loadContactPage = () =>
  import("../features/pages").then((m) => ({ default: m.ContactPage }));

const loadFaqPage = () =>
  import("../features/pages").then((m) => ({ default: m.FaqPage }));

const loadNotFoundPage = () =>
  import("../features/pages").then((m) => ({ default: m.NotFoundPage }));

const loadResourceArticlePage = () =>
  import("../features/resources").then((m) => ({
    default: m.ResourceArticlePage,
  }));

const loadResourcesPage = () =>
  import("../features/resources").then((m) => ({ default: m.ResourcesPage }));

const loadServicesPage = () =>
  import("../features/services").then((m) => ({ default: m.ServicesPage }));

const loadSupportPage = () =>
  import("../features/pages").then((m) => ({ default: m.SupportPage }));

const loadTermsPage = () =>
  import("../features/pages").then((m) => ({ default: m.TermsPage }));

const loadPrivacyPage = () =>
  import("../features/pages").then((m) => ({ default: m.PrivacyPage }));

const loadCookiePage = () =>
  import("../features/pages").then((m) => ({ default: m.CookiePage }));

const loadDataRightsPage = () =>
  import("../features/pages").then((m) => ({ default: m.DataRightsPage }));

// ── Lazy components ─────────────────────────────────
// These won't be fetched until the first render of each route.
// React.lazy() expects a function returning a Promise<{ default: Component }>.
// Our loader functions above satisfy this exactly, so we pass
// them directly — no wrapper arrow needed.

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

// ── Preloader registry ──────────────────────────────
// All lazy-loader functions collected in one array so we can
// preload every page during browser idle time (see preloadPages
// call in the App component below).
//
// ⚠️  WHEN ADDING A NEW PAGE:
//     Add its loader function to this array so it gets
//     preloaded during idle time. Otherwise the first user
//     to navigate there will experience a chunk-load delay.

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
];

// ── Type helper for requestIdleCallback ─────────────
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
 *     that blocks the entire viewport. During lazy navigation
 *     we want the nav and footer to REMAIN VISIBLE so the user
 *     doesn't think the app crashed. This inline fallback sits
 *     inside <main> and just fills the content area.
 *
 *     Visual style is kept consistent with PageLoader's spinner
 *     so there is no jarring visual discontinuity.
 */

function PageSuspenseFallback() {
  return (
    <div
      className="flex items-center justify-center py-24"
      aria-label="Loading page"
    >
      <div className="page-loader__content">
        <div className="page-loader__spinner">
          <div className="page-loader__ring" />
          <div className="page-loader__ring" />
          <div className="page-loader__ring" />
        </div>
        <p className="page-loader__text">Loading</p>
      </div>
    </div>
  );
}

/* ── ScrollToTop on route change ───────────────────────
 * The custom SPA router (usePublicRouter) intercepts clicks
 * and updates `pathname` via pushState. It does NOT scroll
 * to top — that's this component's job.
 *
 * Without this, navigating from a long page (e.g. FAQ) to
 * another page would leave the user scrolled halfway down,
 * which feels broken.
 */

function ScrollToTop({ pathname }: { pathname: string }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

/* ── PRECOMPILATION / COLD-START NOTE ──────────────────
 * On a fresh Vite dev server start (or after clearing the
 * browser cache / running in incognito), the FIRST navigation
 * to ANY lazy page will show the Suspense fallback briefly
 * while Vite compiles that chunk.
 *
 * This is EXPECTED BEHAVIOR — it only happens once per page
 * per session. Subsequent navigations are instant because
 * Vite caches the compiled chunk in memory.
 *
 * In production (vite build), all chunks are pre-compiled
 * and served as static files, so the fallback is never seen.
 *
 * Do NOT remove lazy loading thinking it's "slower" during
 * dev — the alternative (eager loading) makes EVERY page
 * slow all the time, which is far worse.
 */

interface AppProps {
  initialPathname?: string;
}

export default function App({ initialPathname }: AppProps) {
  const { theme, toggleTheme } = useTheme();
  const { pathname } = usePublicRouter({ initialPathname });
  const shell = usePublicShell();
  const [isPageLoading, setIsPageLoading] = useState(true);

  useRevealOnScroll();
  useStackCardDepth(pathname);

  /* ── Initial load & idle preloading ─────────────────
   *
   * WHY requestIdleCallback?
   * -------------------------
   * We kick off preloading ALL page chunks after the first
   * render. requestIdleCallback() schedules the work during
   * browser idle periods so it does NOT compete with:
   *   - The initial paint / LCP
   *   - User interactions (scroll, click, type)
   *   - Hydration of the first page
   *
   * If the browser does not support requestIdleCallback
   * (Safari didn't until recently, some embedded browsers),
   * we fall back to setTimeout with a generous 1.2s delay.
   *
   * BENEFIT:
   *   - First-page experience is FAST (only one chunk loaded)
   *   - Subsequent pages are INSTANT (already cached by Vite)
   *   - No network waterfalls during navigation
   */

  useEffect(() => {
    setIsPageLoading(false);
    document.documentElement.classList.add("js");

    // ── Preload all lazy chunks during idle time ─────
    const preloadPages = () => {
      void Promise.allSettled(
        publicPagePreloaders.map((preloadPage) => preloadPage())
      );
    };

    const idleWindow = window as IdleWindow;

    if (idleWindow.requestIdleCallback) {
      const handle = idleWindow.requestIdleCallback(preloadPages, {
        timeout: 2500, // force-run after 2.5s even if browser is never idle
      });
      return () => idleWindow.cancelIdleCallback?.(handle);
    }

    // Fallback for browsers without requestIdleCallback support
    const handle = window.setTimeout(preloadPages, 1200);
    return () => window.clearTimeout(handle);
  }, []);

  const articleSlug = getResourcePostSlug(pathname);
  const whatsappUrl = shell.company.whatsapp;

  // ── Route matching ─────────────────────────────────
  // The custom SPA router (usePublicRouter) intercepts <a> clicks
  // and updates `pathname` via pushState. We match the pathname
  // to a lazy component and render it inside a <Suspense> boundary.
  //
  // ⚠️  The Suspense boundary is placed INSIDE <main> so that
  //     the Navigation and Footer (the "shell") stay mounted and
  //     visible while the page chunk loads. If Suspense wrapped
  //     the whole return, the shell would unmount on every route
  //     change — causing a flash and losing scroll position.

  const page = pathname === "/" ? (
    <HomePage />
  ) : pathname === "/about" ? (
    <AboutPage />
  ) : pathname === "/faq" ? (
    <FaqPage />
  ) : pathname === "/services" ? (
    <ServicesPage />
  ) : pathname === "/resources" ? (
    <ResourcesPage />
  ) : pathname === "/career" ? (
    <CareerPage />
  ) : pathname === "/contact" ? (
    <ContactPage />
  ) : pathname === "/support" ? (
    <SupportPage />
  ) : pathname === "/terms" ? (
    <TermsPage />
  ) : pathname === "/privacy" ? (
    <PrivacyPage />
  ) : pathname === "/cookies" ? (
    <CookiePage />
  ) : pathname === "/data-rights" ? (
    <DataRightsPage />
  ) : articleSlug ? (
    <ResourceArticlePage slug={articleSlug} />
  ) : (
    <NotFoundPage pathname={pathname} />
  );

  return (
    <div className="site-shell">
      {/*
        ── Full-screen initial loader ──────────────────
        Only shown on very first load (while shell data resolves).
        Hidden after the first useEffect fires (above).
        This is DIFFERENT from the Suspense fallback — this one
        blocks the ENTIRE viewport including nav/footer.
      */}
      <PageLoader isLoading={isPageLoading} delay={300} />

      {/*
        ── Scroll restoration ──────────────────────────
        Renders null; fires effect on pathname change.
      */}
      <ScrollToTop pathname={pathname} />

      <div className="cinematic-bg" aria-hidden="true">
        <div className="cinematic-bg__orb cinematic-bg__orb--one"></div>
        <div className="cinematic-bg__orb cinematic-bg__orb--two"></div>
      </div>

      <Navigation
        brand={shell.brand}
        company={shell.company}
        navigationItems={shell.navigationItems}
        onToggleTheme={toggleTheme}
        pathname={pathname}
        theme={theme}
      />

      <ShellStatusNotice />

      {/*
        ── Page content with Suspense ──────────────────
        Suspense boundary wraps only the page content so the
        shell (nav + footer) stays mounted during lazy loads.
        The fallback shows a spinner matching PageLoader's style.
      */}
      <main id="top" className="site-main">
        <Suspense fallback={<PageSuspenseFallback />}>
          {page}
        </Suspense>
      </main>

      <Footer
        brand={shell.brand}
        company={shell.company}
        footer={shell.footer}
      />

      <PrivacyConsentBanner pathname={pathname} />

      {!whatsappUrl ? null : (
        <a
          className="fixed right-6 bottom-6 z-[30] inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#25d366] text-white shadow-[0_18px_40px_rgba(37,211,102,0.28)] transition-transform duration-150 ease-out hover:scale-110"
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
        >
          <span
            className="absolute inset-0 rounded-full bg-[#25d366]/50 animate-whatsapp-pulse"
            aria-hidden="true"
          />
          <svg
            className="relative z-10 w-[1.9rem] h-[1.9rem]"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12.01 2.014a9.96 9.96 0 0 0-8.52 15.11L2 22l4.985-1.465a9.961 9.961 0 1 0 5.025-18.52Zm0 18.067a8.093 8.093 0 0 1-4.14-1.134l-.297-.176-3.082.906.924-2.977-.193-.306A8.098 8.098 0 1 1 12.01 20.08Zm4.437-6.042c-.244-.122-1.439-.711-1.662-.793-.223-.081-.385-.122-.547.122-.162.244-.628.793-.77.955-.142.162-.284.183-.528.061-1.18-.56-2.072-1.1-2.884-2.522-.083-.146-.01-.223.111-.345.11-.11.244-.284.366-.427.122-.142.162-.244.244-.407.081-.162.041-.305-.02-.427-.061-.122-.547-1.32-.75-1.808-.198-.475-.399-.411-.547-.419-.142-.008-.305-.008-.468-.008-.162 0-.427.061-.65.305-.223.244-.852.833-.852 2.032s.873 2.358.995 2.522c.122.162 1.714 2.628 4.153 3.67.58.24 1.033.383 1.385.49.582.185 1.112.158 1.531.096.47-.07 1.439-.588 1.642-1.157.203-.569.203-1.056.142-1.157-.061-.101-.223-.162-.468-.284Z" />
          </svg>
        </a>
      )}
    </div>
  );
}
