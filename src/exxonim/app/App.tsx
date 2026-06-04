import { lazy, Suspense, useEffect, useState } from "react";
import { Footer } from "@/exxonim/components/Footer";
import { Navigation } from "@/exxonim/components/Navigation";
import { PageLoader } from "@/exxonim/components/PageLoader";
import { PrivacyConsentBanner } from "@/exxonim/components/PrivacyConsentBanner";
import { ShellStatusNotice } from "@/exxonim/components/ShellStatusNotice";
import { WhatsAppButton } from "@/exxonim/components/WhatsAppButton";
import { ScrollToTopButton } from "@/exxonim/components/ScrollToTopButton";
import { ErrorBoundary } from "@/exxonim/components/ErrorBoundary";
import { usePublicRouter } from "@/exxonim/app/usePublicRouter";
import { usePublicShell } from "@/exxonim/hooks/usePublicShell";
import { useRevealOnScroll } from "@/exxonim/hooks/useRevealOnScroll";
import { useTheme } from "@/exxonim/hooks/useTheme";
import { getResourcePostSlug, routes } from "@/exxonim/routes";

/* ── Code-split page components ────────────────────────
 * Each page is loaded on demand so the initial bundle only
 * contains the shell (nav + footer) and the active page.
 */
const HomePage = lazy(() =>
  import("@/exxonim/pages/HomePage").then((m) => ({ default: m.HomePage }))
);
const AboutPage = lazy(() =>
  import("@/exxonim/pages/AboutPage").then((m) => ({ default: m.AboutPage }))
);
const CareerPage = lazy(() =>
  import("@/exxonim/pages/CareerPage").then((m) => ({ default: m.CareerPage }))
);
const ContactPage = lazy(() =>
  import("@/exxonim/pages/ContactPage").then((m) => ({ default: m.ContactPage }))
);
const FaqPage = lazy(() =>
  import("@/exxonim/pages/FaqPage").then((m) => ({ default: m.FaqPage }))
);
const NotFoundPage = lazy(() =>
  import("@/exxonim/pages/NotFoundPage").then((m) => ({ default: m.NotFoundPage }))
);
const ResourceArticlePage = lazy(() =>
  import("@/exxonim/pages/ResourceArticlePage").then((m) => ({
    default: m.ResourceArticlePage,
  }))
);
const ResourcesPage = lazy(() =>
  import("@/exxonim/pages/ResourcesPage").then((m) => ({ default: m.ResourcesPage }))
);
const ServicesPage = lazy(() =>
  import("@/exxonim/pages/ServicesPage").then((m) => ({ default: m.ServicesPage }))
);
const InfoPages = lazy(() =>
  import("@/exxonim/pages/InfoPages").then((m) => ({
    default: function InfoPagesWrapper() {
      // InfoPages exports multiple components; the route map handles which one to render
      return null;
    },
  }))
);
const SupportPage = lazy(() =>
  import("@/exxonim/pages/InfoPages").then((m) => ({ default: m.SupportPage }))
);
const TermsPage = lazy(() =>
  import("@/exxonim/pages/InfoPages").then((m) => ({ default: m.TermsPage }))
);
const PrivacyPage = lazy(() =>
  import("@/exxonim/pages/InfoPages").then((m) => ({ default: m.PrivacyPage }))
);
const CookiePage = lazy(() =>
  import("@/exxonim/pages/InfoPages").then((m) => ({ default: m.CookiePage }))
);
const DataRightsPage = lazy(() =>
  import("@/exxonim/pages/InfoPages").then((m) => ({ default: m.DataRightsPage }))
);
const TrackConsultationPage = lazy(() =>
  import("@/exxonim/pages/TrackConsultationPage").then((m) => ({ default: m.TrackConsultationPage }))
);

/* ── Config-driven route map ───────────────────────────
 * Replaces the 13-branch ternary chain with a simple lookup.
 * Dynamic routes (blog articles) are handled after the static lookup.
 */
import type { ComponentType } from "react";

interface RouteEntry {
  pathname: string;
  component: ComponentType;
}

const staticRoutes: RouteEntry[] = [
  { pathname: "/", component: HomePage },
  { pathname: "/about", component: AboutPage },
  { pathname: "/faq", component: FaqPage },
  { pathname: "/services", component: ServicesPage },
  { pathname: "/resources", component: ResourcesPage },
  { pathname: "/blog", component: ResourcesPage },  // Alias — same page
  { pathname: "/career", component: CareerPage },
  { pathname: "/contact", component: ContactPage },
  { pathname: "/support", component: SupportPage },
  { pathname: "/terms", component: TermsPage },
  { pathname: "/privacy", component: PrivacyPage },
  { pathname: "/cookies", component: CookiePage },
  { pathname: "/data-rights", component: DataRightsPage },
  { pathname: "/track-consultation", component: TrackConsultationPage },
];

function resolvePage(pathname: string) {
  const match = staticRoutes.find(
    (route) => route.pathname === pathname
  );
  if (match) {
    return <match.component />;
  }

  const articleSlug = getResourcePostSlug(pathname);
  if (articleSlug) {
    return <ResourceArticlePage slug={articleSlug} />;
  }

  return <NotFoundPage pathname={pathname} />;
}

/* ── Page-level Suspense fallback ──────────────────────
 * Same visual language as the full-screen PageLoader
 * (favicon image + animated dots), but rendered inline
 * inside <main> so the shell (nav + footer) stays visible.
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

/* ── App ─────────────────────────────────────────────── */
interface AppProps {
  initialPathname?: string;
}

export function App({ initialPathname }: AppProps) {
  const { theme, toggleTheme } = useTheme();
  const { pathname } = usePublicRouter({ initialPathname });
  const shell = usePublicShell();
  const [isPageLoading, setIsPageLoading] = useState(true);

  useRevealOnScroll();

  useEffect(() => {
    document.documentElement.classList.add("js");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: dismiss page loader after first paint
    setIsPageLoading(false);
  }, []);

  const whatsappUrl = shell.company.whatsapp;

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-page text-text">
        <PageLoader isLoading={isPageLoading} />

        <a
          href="#top"
          className="pointer-events-none opacity-0 focus:pointer-events-auto focus:opacity-100 fixed left-4 top-2 z-[100] inline-flex h-12 items-center rounded-full bg-accent px-6 text-sm font-extrabold text-accent-contrast shadow-accent-glow transition-all focus:outline-2 focus:outline-accent"
        >
          Skip to content
        </a>

        <Navigation
          brand={shell.brand}
          company={shell.company}
          onToggleTheme={toggleTheme}
          pathname={pathname}
          theme={theme}
        />

        <ShellStatusNotice />

        <main id="top" className="relative isolate overflow-x-clip flex-1 pt-[68px]">
          <ErrorBoundary>
            <Suspense fallback={<PageSuspenseFallback />}>
              {resolvePage(pathname)}
            </Suspense>
          </ErrorBoundary>
        </main>

        <Footer
          brand={shell.brand}
          company={shell.company}
          footer={shell.footer}
        />

        <PrivacyConsentBanner pathname={pathname} />

        {whatsappUrl && <WhatsAppButton phoneNumber={whatsappUrl} />}
        <ScrollToTopButton />
      </div>
    </ErrorBoundary>
  );
}
