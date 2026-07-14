import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/exxonim/app/queryClient";
import { App } from "@/exxonim/app/App";
import "@/styles/globals.css";

/**
 * Dismiss the CSS-only boot loader.
 *
 * The boot loader is a fixed overlay (z-9999) that covers the page
 * from the first HTML paint until React has mounted AND the first
 * page content has rendered. We delay dismissal by one animation
 * frame so the browser has painted the real content underneath
 * before we start the fade-out.
 */
function dismissBootLoader() {
  // Clear the 8-second timeout
  if (typeof window.__bootLoaderTimer !== "undefined") {
    clearTimeout(window.__bootLoaderTimer);
  }
  // Reset the auto-reload counter - React mounted successfully, so the
  // next stuck page (if any) is allowed to auto-reload again.
  try { sessionStorage.removeItem("__bootReload"); } catch { /* ignore */ }
  // Start the CSS fade-out immediately — the transition handles smoothness.
  // The old requestAnimationFrame delay was removed because on slow devices
  // it added visible boot-loader time before any content appeared.
  // Content renders underneath the fading overlay (not after it).
  const el = document.getElementById("boot-loader");
  if (el) {
    el.classList.add("boot-loader--hidden");
    setTimeout(() => el.remove(), 300);
  }
}

/**
 * Keep the browser's NATIVE scroll restoration on, so a refresh (or back /
 * forward) returns the visitor to exactly where they were. The previous
 * "top → jump" bounce was NOT the browser — it was <ScrollToTop> resetting to
 * 0 on every mount and fighting the restore. That component is now
 * navigation-aware (it only scrolls to top on a real forward navigation, i.e.
 * navigationType !== "POP"), so nothing competes with the native restore here.
 */
if (typeof history !== "undefined" && "scrollRestoration" in history) {
  history.scrollRestoration = "auto";
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App onReady={dismissBootLoader} />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

// Register service worker for static asset caching (instant reload)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}
