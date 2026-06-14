/**
 * FASTAPI ENDPOINT DEPENDENCY: None
 * ─────────────────────────────
 * This is a purely client-side animation hook with no backend API dependency.
 *
 * Scroll-reveal animation using CSS classes instead of Tailwind manipulation.
 *
 * PERFORMANCE OPTIMIZATIONS (v2):
 *   - Debounced MutationObserver (100ms) to avoid layout thrashing on rapid DOM changes
 *   - Batch reveals in a single rAF instead of one per element
 *   - Auto-disconnects MutationObserver after 15s (all lazy pages will have loaded by then)
 *   - Skips already-revealed elements during scans
 *
 * iOS SAFARI FIXES (v3):
 *   - Removed negative rootMargin which can prevent IntersectionObserver from
 *     firing on iOS Safari when combined with overflow-x:clip on body
 *   - Added 5s safety fallback: any unrevealed elements get revealed automatically
 *   - Use simpler threshold (0.05) for more reliable iOS triggering
 *
 * ROUTE-CHANGE FIX (v4):
 *   - Accepts `pathname` parameter to re-scan on SPA route changes
 *   - On route change, immediately calls scanAndObserve() to find new
 *     data-reveal elements without recreating observers
 *   - Fixes bug where MutationObserver missed new elements after
 *     React Router replaced <Routes> content
 */

import { useEffect, useRef } from "react";

export function useRevealOnScroll(pathname?: string) {
  // Stable refs to observers and scanAndObserve so the pathname
  // effect can call scan without recreating observers.
  const observerRef = useRef<IntersectionObserver | null>(null);
  const scanAndObserveRef = useRef<(() => void) | null>(null);

  // ── Main effect: set up observers once ──────────────────────
  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll("[data-reveal]").forEach((el) => {
        el.classList.add("revealed");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      // Use simple threshold without negative rootMargin —
      // negative rootMargin can fail on iOS Safari with overflow-x:clip
      { threshold: 0.05 }
    );
    observerRef.current = observer;

    // Batch reveal elements that are already in viewport
    const scanAndObserve = () => {
      const revealElements = document.querySelectorAll("[data-reveal]:not(.revealed)");
      const toReveal: Element[] = [];

      revealElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const inViewport = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;

        if (inViewport) {
          toReveal.push(el);
        } else {
          observer.observe(el);
        }
      });

      // Batch all immediate reveals in a single rAF
      if (toReveal.length > 0) {
        requestAnimationFrame(() => {
          toReveal.forEach((el) => el.classList.add("revealed"));
        });
      }
    };
    scanAndObserveRef.current = scanAndObserve;

    scanAndObserve();

    // Debounced MutationObserver — coalesces rapid DOM mutations
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;
    let autoDisconnectTimer: ReturnType<typeof setTimeout> | null = null;

    const mutationObserver = new MutationObserver(() => {
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(scanAndObserve, 100);
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Auto-disconnect MutationObserver after 15s — by then all lazy pages
    // will have loaded, so there's no need to keep watching DOM changes
    autoDisconnectTimer = setTimeout(() => {
      mutationObserver.disconnect();
      if (debounceTimer) {
        clearTimeout(debounceTimer);
        debounceTimer = null;
      }
    }, 15000);

    // iOS SAFETY FALLBACK: After 5 seconds, reveal any elements that
    // are still hidden. This catches cases where IntersectionObserver
    // failed to fire on iOS Safari (e.g., due to overflow-x:clip or
    // other iOS rendering quirks). Better to show content without
    // animation than to leave it invisible forever.
    const safetyTimer = setTimeout(() => {
      document.querySelectorAll("[data-reveal]:not(.revealed)").forEach((el) => {
        el.classList.add("revealed");
      });
      observer.disconnect();
    }, 5000);

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
      observerRef.current = null;
      scanAndObserveRef.current = null;
      if (debounceTimer) clearTimeout(debounceTimer);
      if (autoDisconnectTimer) clearTimeout(autoDisconnectTimer);
      clearTimeout(safetyTimer);
    };
  }, []);

  // ── Route-change effect: re-scan on SPA navigation ──────────
  // When React Router swaps <Routes> content, new data-reveal
  // elements appear that the MutationObserver may miss (e.g. if
  // it auto-disconnected after 15s, or if the DOM mutation
  // coalescing skipped the route-change batch). This effect
  // triggers an immediate scan after each route change.
  //
  // INSTANT REVEAL: We add `reveal-instant` to <html> which
  // disables the 0.7s CSS transition, so in-viewport elements
  // appear instantly on route navigation (no perceived delay).
  // Below-fold elements still animate on scroll as normal.
  useEffect(() => {
    if (!pathname || !scanAndObserveRef.current) return;

    // Add reveal-instant class to skip animation on route change
    const html = document.documentElement;
    html.classList.add("reveal-instant");

    // Delay slightly so React has finished rendering the new page
    const handle = requestAnimationFrame(() => {
      scanAndObserveRef.current?.();

      // Remove reveal-instant after a frame so below-fold elements
      // still get the normal scroll-reveal animation
      requestAnimationFrame(() => {
        html.classList.remove("reveal-instant");
      });
    });
    return () => {
      cancelAnimationFrame(handle);
      html.classList.remove("reveal-instant");
    };
  }, [pathname]);
}
