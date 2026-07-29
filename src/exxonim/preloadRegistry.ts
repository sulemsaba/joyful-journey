/**
 * Route preload registry - runtime, dependency-free.
 *
 * This module holds the hover/viewport preload dispatcher and a mutable
 * lookup table. It intentionally imports NOTHING from pages or the lazy
 * loader functions, so leaf components (SmartLink, Button, navigation menus)
 * can call preloadRoute() without pulling the entire page graph into their
 * own import chain.
 *
 * preloadRoutes.ts owns the concrete loaders and registers them here at
 * startup (it is imported eagerly by App.tsx, so registration runs during
 * initial module evaluation - long before any hover can fire). Until
 * registration has run, unknown paths are silently ignored and the chunk
 * simply loads on navigation instead.
 */

type Preloader = () => Promise<unknown>;

const exactPreloaders = new Map<string, Preloader>();
const prefixPreloaders = new Map<string, Preloader>();

/** Register an exact-path preloader (e.g. "/about"). Called by preloadRoutes.ts. */
export function registerRoutePreloader(path: string, fn: Preloader): void {
  exactPreloaders.set(path, fn);
}

/**
 * Register a first-segment preloader for dynamic two-segment paths
 * (e.g. "resources" -> article loader for "/resources/<slug>").
 */
export function registerPrefixPreloader(segment: string, fn: Preloader): void {
  prefixPreloaders.set(segment, fn);
}

/**
 * Preload a route chunk by path. Safe to call multiple times and before
 * registration has run (unknown paths are silently ignored). Errors are
 * swallowed - the chunk will load on navigation instead.
 *
 * Handles both static routes ("/about", "/services") and dynamic paths
 * ("/resources/<slug>", "/blog/<slug>", "/services/<slug>").
 */
export function preloadRoute(path: string): void {
  const fn = exactPreloaders.get(path);
  if (fn) {
    void fn().catch(() => {});
    return;
  }

  const segments = path.split("/").filter(Boolean);
  if (segments.length === 2) {
    const handler = prefixPreloaders.get(segments[0]);
    if (handler) {
      void handler().catch(() => {});
    }
  }
}
