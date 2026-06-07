"use client";

import { useEffect, useState } from "react";

/**
 * Reading progress bar — a thin accent-colored bar fixed at the bottom of the
 * navigation header that fills proportionally as the user scrolls through an article.
 *
 * BEHAVIOUR:
 *   - Hidden when scroll progress is 0% (page top).
 *   - Opacity fade-in during the first 3% of progress.
 *   - Full opacity from 3%–100%.
 *   - Uses `window.scrollY` + `scrollHeight` for calculation.
 *   - Sits just below the fixed 70px navigation header for visibility.
 *
 * ACCESSIBILITY:
 *   - `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`.
 *   - `aria-hidden="true"` on the decorative container (screen readers use
 *     the progressbar role on the inner bar).
 *
 * BACKEND: No configuration needed. Purely client-side.
 */
export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setProgress(0);
        return;
      }
      const pct = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
      setProgress(pct);
    }

    // Initial calculation
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide when at the top
  if (progress < 0.5) return null;

  return (
    <div
      className="fixed top-[70px] left-0 right-0 z-[60] h-[3px]"
      aria-hidden="true"
    >
      <div
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
        className="h-full bg-accent transition-[width] duration-150 ease-out"
        style={{
          width: `${progress}%`,
          opacity: progress < 3 ? progress / 3 : 1,
        }}
      />
    </div>
  );
}
