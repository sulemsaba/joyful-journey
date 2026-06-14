/**
 * Navigation Performance Measurement Harness
 * ══════════════════════════════════════════════
 *
 * PURPOSE: Measure "click → first visible content" timing
 * for SPA route navigation AFTER deployment.
 *
 * USAGE (paste into browser console on deployed site):
 *
 *   // Start measuring
 *   NavPerf.start()
 *
 *   // Then navigate normally. Each click on a navigation link
 *   // will be instrumented automatically.
 *
 *   // After navigating, get results:
 *   NavPerf.results()
 *
 *   // Or run the automated 3-route test:
 *   NavPerf.runAll()
 *
 *   // Clear results:
 *   NavPerf.reset()
 *
 * WHAT IT MEASURES:
 *   click_ts           → performance.now() when nav link clicked
 *   first_content_ts   → first mutation in main content area
 *   first_visible_ts   → first element with non-zero opacity/size in viewport
 *   route_changed_ts   → React Router pathname change detected
 *
 * METRIC: "click → first visible content" (what users perceive)
 * NOT: "click → animation finished" (irrelevant to perceived speed)
 *
 * CONDITIONS TO TEST:
 *   - Cold cache (Incognito / clear site data)
 *   - Warm cache (normal session, already visited)
 *   - Throttled: Fast 4G (DevTools → Network → Fast 4G)
 *   - Throttled: Slow 3G (DevTools → Network → Slow 3G)
 *
 * ROUTES TO MEASURE:
 *   Home → Services
 *   Home → About
 *   About → Contact
 */

(function () {
  "use strict";

  const RESULTS_KEY = "__nav_perf_results";
  const ROUTES = ["/services", "/about", "/contact"];
  let measuring = false;
  let clickTs = null;
  let observer = null;
  let pathnameObserver = null;
  let lastPathname = location.pathname;
  const results = [];

  // ── Helpers ────────────────────────────────────────────
  function now() {
    return performance.now();
  }

  function isElementVisible(el) {
    if (!el || el === document.body || el === document.documentElement) return false;
    const style = getComputedStyle(el);
    if (style.opacity === "0") return false;
    if (style.display === "none") return false;
    if (style.visibility === "hidden") return false;
    if (style.visibility === "collapse") return false;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) return false;
    // Must be in viewport
    if (rect.top > window.innerHeight || rect.bottom < 0) return false;
    return true;
  }

  function findMainContentContainer() {
    // Try common content containers
    const selectors = ["main", "[role='main']", "#root", "#app"];
    for (const sel of selectors) {
      const el = document.querySelector(sel);
      if (el) return el;
    }
    return document.body;
  }

  function storeResult(result) {
    results.push(result);
    try {
      const stored = JSON.parse(sessionStorage.getItem(RESULTS_KEY) || "[]");
      stored.push(result);
      sessionStorage.setItem(RESULTS_KEY, JSON.stringify(stored));
    } catch {
      // sessionStorage not available
    }
  }

  // ── Measurement Core ──────────────────────────────────

  function startMeasurement(label) {
    clickTs = now();
    const result = {
      label: label || "manual",
      from: lastPathname,
      to: null,
      click_ts: clickTs,
      first_content_ts: null,
      first_visible_ts: null,
      route_changed_ts: null,
      cache_state: null,
      click_to_first_content_ms: null,
      click_to_first_visible_ms: null,
      click_to_route_change_ms: null,
    };

    // Watch for DOM mutations in content area
    const container = findMainContentContainer();
    let firstContentSeen = false;
    let firstVisibleSeen = false;

    if (observer) observer.disconnect();

    observer = new MutationObserver((mutations) => {
      const ts = now();
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node.nodeType !== Node.ELEMENT_NODE) continue;

          // First content added
          if (!firstContentSeen && result.first_content_ts === null) {
            firstContentSeen = true;
            result.first_content_ts = ts;
            result.click_to_first_content_ms = Math.round(ts - clickTs);
          }

          // First VISIBLE content (non-zero opacity, in viewport)
          if (!firstVisibleSeen && isElementVisible(node)) {
            firstVisibleSeen = true;
            result.first_visible_ts = ts;
            result.click_to_first_visible_ms = Math.round(ts - clickTs);
          }

          // Check children too
          if (!firstVisibleSeen && node.querySelectorAll) {
            const children = node.querySelectorAll("*");
            for (const child of children) {
              if (isElementVisible(child)) {
                firstVisibleSeen = true;
                result.first_visible_ts = ts;
                result.click_to_first_visible_ms = Math.round(ts - clickTs);
                break;
              }
            }
          }
        }
      }

      // If we found visible content, we can stop observing
      if (firstVisibleSeen) {
        observer.disconnect();
      }
    });

    observer.observe(container, {
      childList: true,
      subtree: true,
    });

    // Watch for pathname change (React Router)
    let checkPathInterval = null;
    checkPathInterval = setInterval(() => {
      if (location.pathname !== lastPathname) {
        const ts = now();
        result.to = location.pathname;
        result.route_changed_ts = ts;
        result.click_to_route_change_ms = Math.round(ts - clickTs);
        lastPathname = location.pathname;
        clearInterval(checkPathInterval);

        // Wait a bit more for content to appear, then finalize
        setTimeout(() => {
          if (observer) observer.disconnect();
          if (!result.first_content_ts) {
            result.first_content_ts = now();
            result.click_to_first_content_ms = Math.round(now() - clickTs);
          }
          if (!result.first_visible_ts) {
            result.first_visible_ts = now();
            result.click_to_first_visible_ms = Math.round(now() - clickTs);
          }
          storeResult(result);
          console.log(
            `%c[NavPerf] ${result.label}: click→visible ${result.click_to_first_visible_ms}ms | click→content ${result.click_to_first_content_ms}ms | click→route ${result.click_to_route_change_ms}ms`,
            "color: #10b981; font-weight: bold"
          );
        }, 2000); // 2s grace period for slow connections
      }
    }, 10);

    return result;
  }

  // ── Instrument Navigation Links ───────────────────────

  function instrumentLinks() {
    document.querySelectorAll("a[href^='/']").forEach((link) => {
      if (link.__navPerfInstrumented) return;
      link.__navPerfInstrumented = true;

      link.addEventListener("click", (e) => {
        if (!measuring) return;
        const href = link.getAttribute("href");
        const label = `${lastPathname} → ${href}`;
        startMeasurement(label);
      }, true); // capture phase to fire before React
    });
  }

  // Re-instrument when DOM changes (React re-renders nav)
  const linkInstrumenter = new MutationObserver(() => {
    if (measuring) instrumentLinks();
  });

  // ── Public API ────────────────────────────────────────

  const NavPerf = {
    /**
     * Start measuring. All nav link clicks will be instrumented.
     */
    start() {
      measuring = true;
      instrumentLinks();
      linkInstrumenter.observe(document.body, { childList: true, subtree: true });
      console.log(
        "%c[NavPerf] ✅ Measuring started. Navigate normally. Call NavPerf.results() when done.",
        "color: #10b981; font-weight: bold"
      );
    },

    /**
     * Stop measuring.
     */
    stop() {
      measuring = false;
      if (observer) observer.disconnect();
      linkInstrumenter.disconnect();
      console.log("%c[NavPerf] ⏹ Measuring stopped.", "color: #f59e0b");
    },

    /**
     * Print all results in a readable table.
     */
    results() {
      const stored = JSON.parse(sessionStorage.getItem(RESULTS_KEY) || "[]");
      const all = [...results, ...stored];

      if (all.length === 0) {
        console.log("%c[NavPerf] No measurements yet.", "color: #f59e0b");
        return all;
      }

      console.log("%c[NavPerf] Results (click → first visible content)", "color: #10b981; font-weight: bold; font-size: 14px");
      console.table(
        all.map((r) => ({
          label: r.label,
          from: r.from,
          to: r.to || "?",
          "click→content (ms)": r.click_to_first_content_ms ?? "—",
          "click→visible (ms)": r.click_to_first_visible_ms ?? "—",
          "click→route (ms)": r.click_to_route_change_ms ?? "—",
        }))
      );

      console.log("%cKey metric: click→visible (what users perceive)", "color: #6366f1; font-style: italic");
      return all;
    },

    /**
     * Clear all stored results.
     */
    reset() {
      results.length = 0;
      try {
        sessionStorage.removeItem(RESULTS_KEY);
      } catch {}
      console.log("%c[NavPerf] 🗑 Results cleared.", "color: #ef4444");
    },

    /**
     * Automated test: navigate to each target route and measure.
     * Requires being on the home page first.
     *
     * @param {object} options
     * @param {number} options.delay - ms between navigations (default 3000)
     * @param {string[]} options.routes - routes to test (default: /services, /about, /contact)
     */
    async runAll(options = {}) {
      const delay = options.delay || 3000;
      const routes = options.routes || ROUTES;

      console.log(
        `%c[NavPerf] 🚀 Running automated test: ${routes.join(", ")}`,
        "color: #10b981; font-weight: bold"
      );

      measuring = true;
      instrumentLinks();
      linkInstrumenter.observe(document.body, { childList: true, subtree: true });

      // Go to home first
      console.log("[NavPerf] Navigating to / first...");
      window.location.hash = "";
      // We can't programatically navigate via React Router from here,
      // so we'll use click simulation

      for (const route of routes) {
        // Find a link to this route
        const link = document.querySelector(`a[href="${route}"]`);
        if (!link) {
          console.warn(`[NavPerf] No link found for ${route}, using location`);
          startMeasurement(`/${lastPathname.split("/")[1] || ""} → ${route}`);
          window.location.href = route;
          await new Promise((r) => setTimeout(r, delay));
          continue;
        }

        const label = `${lastPathname} → ${route}`;
        console.log(`[NavPerf] Clicking link to ${route}...`);
        startMeasurement(label);
        link.click();
        await new Promise((r) => setTimeout(r, delay));
      }

      console.log(
        "%c[NavPerf] ✅ Automated test complete. Call NavPerf.results() to see data.",
        "color: #10b981; font-weight: bold"
      );
      measuring = false;
      linkInstrumenter.disconnect();

      return this.results();
    },

    /**
     * Print measurement instructions for manual testing.
     */
    guide() {
      console.log(`
%c═══════════════════════════════════════════════════════
  NAVIGATION PERFORMANCE MEASUREMENT GUIDE
═══════════════════════════════════════════════════════

1. Open DevTools → Console on your DEPLOYED site

2. Start measuring:
   NavPerf.start()

3. Navigate normally. Click:
   Home → Services
   Home → About
   About → Contact

4. Check results:
   NavPerf.results()

5. For different conditions, repeat:
   - Cold cache: Open in Incognito window
   - Warm cache: Normal browser session
   - Fast 4G: DevTools → Network → "Fast 4G"
   - Slow 3G: DevTools → Network → "Slow 3G"

KEY METRIC: click → first visible content
            (NOT click → animation finished)

═══════════════════════════════════════════════════════
      `, "font-family: monospace; color: #10b981");
    },
  };

  // Expose globally
  window.NavPerf = NavPerf;

  console.log(
    "%c[NavPerf] Loaded. Call NavPerf.start() to begin measuring, or NavPerf.guide() for instructions.",
    "color: #10b981"
  );
})();
