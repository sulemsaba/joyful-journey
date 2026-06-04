"use client";

import { useState, useEffect } from "react";

/**
 * Floating scroll-to-top button.
 * Positioned above the WhatsApp button (fixed bottom-right).
 * Only appears after the user scrolls down 400px.
 */
export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 400);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      title="Back to top"
      className="fixed bottom-24 right-6 z-[30] inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-soft bg-surface-soft text-text-muted transition-all duration-200 hover:bg-accent-soft hover:text-accent hover:scale-110"
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m18 15-6-6-6 6" />
      </svg>
    </button>
  );
}
