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
  // Remove overflow:hidden from body (was set to prevent scrollbar during boot)
  document.body.style.overflow = "";
  // Wait one frame so the real content is painted, then fade out
  requestAnimationFrame(() => {
    const el = document.getElementById("boot-loader");
    if (el) {
      el.classList.add("boot-loader--hidden");
      // Remove from DOM after fade-out completes (250ms)
      setTimeout(() => el.remove(), 300);
    }
  });
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
