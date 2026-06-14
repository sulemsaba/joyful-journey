/**
 * useViewportPreload — viewport-based route chunk preloading.
 *
 * PROBLEM:
 *   Mobile users don't hover, so onMouseEnter preloading doesn't work.
 *   Every tap starts a cold chunk download, making navigation feel slow.
 *
 * SOLUTION:
 *   When a card with a route link becomes visible in the viewport
 *   (even partially), quietly preload the target page's chunk.
 *   By the time the user taps, the chunk is already cached.
 *
 * USAGE:
 *   Attach the returned ref to the card/article element:
 *
 *     const cardRef = useViewportPreload("/resources");
 *     return <article ref={cardRef}>...</article>;
 *
 * ARCHITECTURE:
 *   - Uses IntersectionObserver with rootMargin: "200px" (start
 *     preloading 200px before the card enters the viewport)
 *   - Disconnects after the first intersection (preload once only)
 *   - Calls preloadRoute() which is idempotent — safe to call
 *     multiple times, Vite caches the module after first import()
 *   - Does NOT mount the page component — only downloads the chunk
 *
 * PERFORMANCE:
 *   - Zero layout impact (observer is passive)
 *   - Minimal CPU (single intersection check, then disconnect)
 *   - Network cost: one chunk download per visible card (~5-15KB)
 *   - Mobile benefit: tap → instant (chunk already downloaded)
 */

import { useEffect, useRef } from "react";
import { preloadRoute } from "@/exxonim/preloadRoutes";

/**
 * Preload a route chunk when the element becomes visible in the viewport.
 *
 * @param routePath - Normalized route path (e.g. "/resources", "/services")
 * @returns ref to attach to the element to observe
 */
export function useViewportPreload(routePath: string) {
  const elementRef = useRef<HTMLElement>(null);
  const hasPreloaded = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || hasPreloaded.current) return;

    // Skip if route doesn't have a preloader registered
    // (preloadRoute silently ignores unknown routes)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPreloaded.current) {
          hasPreloaded.current = true;
          preloadRoute(routePath);
          observer.disconnect();
        }
      },
      {
        // Start preloading 200px before the card enters the viewport.
        // This gives the chunk download a head start before the user
        // can physically tap the card.
        rootMargin: "200px 0px",
        threshold: 0,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [routePath]);

  return elementRef;
}

/**
 * Preload multiple route chunks when the element becomes visible.
 * Useful for card grids where multiple routes should be preloaded
 * when the section scrolls into view.
 *
 * @param routePaths - Array of normalized route paths
 * @returns ref to attach to the container element
 */
export function useViewportPreloadMany(routePaths: string[]) {
  const elementRef = useRef<HTMLElement>(null);
  const hasPreloaded = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || hasPreloaded.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPreloaded.current) {
          hasPreloaded.current = true;
          // Preload all routes at once when the section becomes visible
          routePaths.forEach((path) => preloadRoute(path));
          observer.disconnect();
        }
      },
      {
        rootMargin: "200px 0px",
        threshold: 0,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [routePaths]);

  return elementRef;
}
