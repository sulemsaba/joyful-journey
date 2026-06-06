import { useEffect } from "react";
import { applyResolvedSeo, createFallbackSeo } from '@/exxonim/seo';
import { Button } from '@/exxonim/components/primitives/Button';
import { normalizePathname, routes } from "@/exxonim/routes";
const lightLogo = "/branding/exxonimLogoLight.webp";
const darkLogo = "/branding/logo-dark.png";


interface NotFoundPageProps {
  pathname?: string;
}

export function NotFoundPage({ pathname }: NotFoundPageProps) {
  const normalizedPathname = normalizePathname(pathname);
  const showRequestedPath =
    Boolean(normalizedPathname) &&
    normalizedPathname !== normalizePathname(routes.home) &&
    normalizedPathname !== normalizePathname(routes.notFound);

  useEffect(() => {
    applyResolvedSeo(
      createFallbackSeo(routes.notFound, {
        title: "Page not found | Exxonim",
        description: "The Exxonim page you requested could not be found.",
        robots: "noindex,follow",
      })
    );
  }, []);

  return (
    <>
<section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[linear-gradient(180deg,var(--color-surface)_0%,var(--color-page)_100%)]">
        <div className="w-[min(1240px,calc(100%-2rem))] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-12 items-center min-h-[70vh]">
            <div className="max-w-lg">
              <div className="relative mb-8">
                <img
                  className="logo-light h-10 w-auto"
                  src={lightLogo}
                  alt="Exxonim"
                />
                <img
                  className="logo-dark h-10 w-auto"
                  src={darkLogo}
                  alt=""
                  aria-hidden="true"
                />
              </div>

              <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-elevated text-xs font-bold tracking-widest uppercase text-text-muted">
                <span className="w-2 h-2 rounded-full bg-accent"></span>
                Page not found
              </p>

              <p className="mt-8 text-7xl md:text-8xl font-black text-text/10 select-none">404</p>

              <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-text">We lost this route.</h1>

              <p className="mt-4 text-lg text-text-muted leading-relaxed">
                The Exxonim page you requested is not available. Start from the main site or jump
                straight to the next useful section.
              </p>

              {showRequestedPath ? (
                <p className="mt-6 text-sm text-text-soft">
                  Requested path
                  <code className="ml-2 px-2 py-0.5 rounded bg-accent/10 text-accent font-mono">{pathname}</code>
                </p>
              ) : null}

              <div className="mt-10 flex flex-wrap gap-4">
                <Button size="hero" variant="primary" href={routes.home}>
                  Go home
                </Button>
                <Button size="hero" variant="secondary" href={routes.services}>
                  See services
                </Button>
                <Button size="hero" variant="secondary" href={routes.contact}>
                  Contact Exxonim
                </Button>
              </div>
            </div>

            <div className="hidden lg:flex items-center justify-center relative" aria-hidden="true">
              <div className="absolute w-72 h-72 rounded-full bg-accent/5 blur-3xl"></div>
              <div className="absolute w-56 h-56 rounded-full border-2 border-accent/10"></div>

              <div className="relative p-6 rounded-2xl border border-border-soft bg-surface/60 backdrop-blur-sm max-w-xs">
                <strong className="block text-sm font-bold text-text mb-1">Contact</strong>
                <span className="text-xs text-text-muted">Use the direct Exxonim contact route instead.</span>
              </div>

              <div className="absolute top-12 right-8 p-5 rounded-2xl border border-border-soft bg-surface/60 backdrop-blur-sm max-w-[200px] -z-10">
                <strong className="block text-sm font-bold text-text mb-1">Services</strong>
                <span className="text-xs text-text-muted">Company setup, tax support, licensing, and filings.</span>
              </div>

              <div className="absolute bottom-12 left-8 p-5 rounded-2xl border border-border-soft bg-surface/60 backdrop-blur-sm max-w-[200px] -z-10">
                <strong className="block text-sm font-bold text-text mb-1">Home</strong>
                <span className="text-xs text-text-muted">Start again from the main Exxonim front page.</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
