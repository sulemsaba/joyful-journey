"use client";

import React from "react";
import { App } from "@/exxonim/app/App";
import { AppProviders } from "@/exxonim/app/providers/AppProviders";

/**
 * Catch-all route — serves the SPA for all public paths.
 *
 * The Exxonim site is a client-side SPA that uses history.pushState for
 * navigation. This catch-all ensures that any direct URL access (e.g.,
 * /about, /services, /track-consultation) serves the same App shell,
 * which then renders the correct page based on window.location.pathname.
 *
 * The slug is passed as `initialPathname` to avoid hydration mismatches —
 * the server render needs to know which page is being requested so that
 * path-dependent UI (e.g., navigation transparency, active links) renders
 * correctly on first paint.
 */
interface CatchAllPageProps {
  params: Promise<{ slug?: string[] }>;
}

export default function CatchAllPage({ params }: CatchAllPageProps) {
  // In Next.js 16, params is a Promise — we read it via React.use()
  // during the server render. On the client, window.location is the
  // source of truth, so initialPathname is only used for SSR.
  const { slug } = React.use(params);
  const initialPathname = slug ? `/${slug.join("/")}` : "/";

  return (
    <AppProviders>
      <App initialPathname={initialPathname} />
    </AppProviders>
  );
}
