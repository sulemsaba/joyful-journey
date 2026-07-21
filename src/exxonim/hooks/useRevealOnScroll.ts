import { useEffect, useRef } from "react";

export function useRevealOnScroll(pathname?: string) {
  const observerRef = useRef<IntersectionObserver | null>(null);

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
      // Reveal well ahead of the viewport so a fast scroll never outruns it.
      { threshold: 0, rootMargin: "0px 0px 2000px 0px" }
    );
    observerRef.current = observer;

    document.querySelectorAll("[data-reveal]:not(.revealed)").forEach((el) => {
      observer.observe(el);
    });

    // Synchronous fail-safe: IntersectionObserver is async and can lag behind a
    // hard/fling scroll, leaving a section at opacity:0 (a black void on the dark
    // theme). On scroll (rAF-throttled) we directly reveal anything within ~1.5
    // viewports of the top, guaranteeing content is painted before you reach it.
    let scrollTicking = false;
    const revealNearby = () => {
      scrollTicking = false;
      // Reveal ~2.5 viewports ahead so the 0.5s fade-in fully completes before
      // the element actually enters view — no near-zero opacity is ever visible,
      // even on a hard fling (critical on the dark theme, where opacity:0 = black).
      const limit = window.innerHeight * 2.5;
      document.querySelectorAll("[data-reveal]:not(.revealed)").forEach((el) => {
        if ((el as HTMLElement).getBoundingClientRect().top < limit) {
          el.classList.add("revealed");
          observer.unobserve(el);
        }
      });
    };
    const onScroll = () => {
      if (scrollTicking) return;
      scrollTicking = true;
      requestAnimationFrame(revealNearby);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    let debounceTimer: ReturnType<typeof setTimeout> | null = null;
    const mainEl = document.querySelector("main");
    const mutationObserver = new MutationObserver(() => {
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        document.querySelectorAll("[data-reveal]:not(.revealed)").forEach((el) => {
          observer.observe(el);
        });
      }, 100);
    });

    if (mainEl) {
      mutationObserver.observe(mainEl, {
        childList: true,
        subtree: true,
      });
    }

    const autoDisconnectTimer = setTimeout(() => {
      mutationObserver.disconnect();
      if (debounceTimer) {
        clearTimeout(debounceTimer);
        debounceTimer = null;
      }
    }, 3000);

    const safetyTimer = setTimeout(() => {
      document.querySelectorAll("[data-reveal]:not(.revealed)").forEach((el) => {
        el.classList.add("revealed");
      });
      observer.disconnect();
    }, 3000);

    return () => {
      window.removeEventListener("scroll", onScroll);
      mutationObserver.disconnect();
      observer.disconnect();
      observerRef.current = null;
      if (debounceTimer) clearTimeout(debounceTimer);
      clearTimeout(autoDisconnectTimer);
      clearTimeout(safetyTimer);
    };
  }, []);

  useEffect(() => {
    if (!pathname || !observerRef.current) return;

    const html = document.documentElement;
    html.classList.add("reveal-instant");

    const handle = requestAnimationFrame(() => {
      document.querySelectorAll("[data-reveal]:not(.revealed)").forEach((el) => {
        observerRef.current?.observe(el);
      });

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
