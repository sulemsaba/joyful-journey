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
      { threshold: 0.05, rootMargin: "300px 0px" }
    );
    observerRef.current = observer;

    document.querySelectorAll("[data-reveal]:not(.revealed)").forEach((el) => {
      observer.observe(el);
    });

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
