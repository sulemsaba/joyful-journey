"use client";

import { App } from "@/exxonim/app/App";
import { AppProviders } from "@/exxonim/app/providers/AppProviders";

/**
 * Catch-all route — serves the SPA for all public paths.
 *
 * The Exxonim site is a client-side SPA that uses history.pushState for
 * navigation. This catch-all ensures that any direct URL access (e.g.,
 * /about, /services, /track-consultation) serves the same App shell,
 * which then renders the correct page based on window.location.pathname.
 */
export default function CatchAllPage() {
  return (
    <AppProviders>
      <App />
    </AppProviders>
  );
}
