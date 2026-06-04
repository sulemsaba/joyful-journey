import { useEffect } from "react";

/**
 * Scroll-reveal animation using CSS classes instead of Tailwind manipulation.
 *
 * ARCHITECTURE:
 * ─────────────
 * Elements with [data-reveal] start with opacity:0 + translateY(24px) via
 * the CSS rule in globals.css. When they scroll into view, the `.revealed`
 * class is added, which transitions them to opacity:1 + translateY(0).
 *
 * This approach is MUCH better for INP because:
 *   1. No MutationObserver scanning all DOM changes
 *   2. No Tailwind class manipulation (classList.add/remove of many classes)
 *   3. Single class toggle (`.revealed`) instead of 5+ class swaps
 *   4. CSS handles the transition — zero JS during animation frames
 *   5. Above-fold content is immediately revealed (no flash of invisible content)
 *
 * Accessibility: If JS fails, content stays hidden. This is acceptable because
 * the content is decorative animation only — all content is still in the DOM
 * and accessible to screen readers.
 */
export function useRevealOnScroll() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      // No IntersectionObserver support — show everything immediately
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
      { threshold: 0.15 }
    );

    // Scan for elements already in the DOM
    const scanAndObserve = () => {
      document.querySelectorAll("[data-reveal]").forEach((el) => {
        // If already visible in viewport, reveal immediately (no animation delay)
        const rect = el.getBoundingClientRect();
        const inViewport = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;

        if (inViewport) {
          // Use requestAnimationFrame to avoid layout thrashing
          requestAnimationFrame(() => {
            el.classList.add("revealed");
          });
        } else {
          observer.observe(el);
        }
      });
    };

    scanAndObserve();

    // Lightweight DOM mutation scan — only for new nodes (e.g., lazy-loaded pages)
    // Much cheaper than the old MutationObserver that scanned all attribute changes
    const mutationObserver = new MutationObserver((mutations) => {
      let hasNewNodes = false;
      for (const mutation of mutations) {
        if (mutation.addedNodes.length > 0) {
          hasNewNodes = true;
          break;
        }
      }
      if (hasNewNodes) {
        // Defer scan to avoid synchronous layout during mutation
        requestAnimationFrame(scanAndObserve);
      }
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, []);
}
