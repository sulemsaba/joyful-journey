
import { useState, useEffect } from "react";

/**
 * Floating scroll-to-top button.
 * Stacked directly above the WhatsApp button (same right position).
 * Same size as WhatsApp button (44×44px).
 * Only appears after the user scrolls down 400px.
 */
export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;

    function updateVisibility() {
      frame = 0;
      const nextVisible = window.scrollY > 400;
      setVisible((previous) => (previous === nextVisible ? previous : nextVisible));
    }

    function onScroll() {
      if (frame) return;
      frame = requestAnimationFrame(updateVisibility);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    updateVisibility();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      title="Back to top"
      className="fixed bottom-[4.25rem] right-5 z-[30] inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-soft bg-surface-soft text-text-muted shadow-sm transition-shadow transition-transform duration-200 hover:bg-accent-soft hover:text-accent hover:scale-110"
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m18 15-6-6-6 6" />
      </svg>
    </button>
  );
}
