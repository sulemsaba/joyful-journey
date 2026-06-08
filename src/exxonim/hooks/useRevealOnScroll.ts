import { useEffect } from "react";

/**
 * Scroll-reveal animation using CSS classes instead of Tailwind manipulation.
 *
 * PERFORMANCE OPTIMIZATIONS (v2):
 *   - Debounced MutationObserver (100ms) to avoid layout thrashing on rapid DOM changes
 *   - Batch reveals in a single rAF instead of one per element
 *   - Auto-disconnects MutationObserver after 15s (all lazy pages will have loaded by then)
 *   - Skips already-revealed elements during scans
 */

export function useRevealOnScroll() {
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
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

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

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
      if (debounceTimer) clearTimeout(debounceTimer);
      if (autoDisconnectTimer) clearTimeout(autoDisconnectTimer);
    };
  }, []);
}
