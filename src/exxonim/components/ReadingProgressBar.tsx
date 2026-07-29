
import { useEffect, useState } from "react";

/**
 * Reading progress bar - a thin accent-colored bar fixed at the bottom of the
 * navigation header that fills proportionally as the user scrolls through an article.
 *
 * SCOPING:
 *   - The progress is calculated relative to the [data-article-content] element
 *     rather than the entire page. This prevents the footer, related articles,
 *     newsletter section, and CTA banner from inflating the progress calculation.
 *   - Falls back to full document height if no article element is found.
 *
 * BEHAVIOUR:
 *   - Hidden when scroll progress is 0% (page top).
 *   - Opacity fade-in during the first 3% of progress.
 *   - Full opacity from 3%–100%.
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
      // Scope progress to the article content element, not the full page
      const articleEl = document.querySelector("[data-article-content]");
      const scrollTop = window.scrollY;

      let start: number;
      let end: number;

      if (articleEl) {
        const articleRect = articleEl.getBoundingClientRect();
        const articleTop = articleRect.top + scrollTop; // absolute top of article
        const articleBottom = articleTop + articleRect.height; // absolute bottom of article

        // Reading starts when the article top reaches the nav bottom (68px)
        start = articleTop - 68;
        // Reading ends when the article bottom reaches the nav bottom
        end = articleBottom - window.innerHeight;
      } else {
        // Fallback: use full document height
        start = 0;
        end = document.documentElement.scrollHeight - window.innerHeight;
      }

      if (end <= start) {
        setProgress(0);
        return;
      }

      const range = end - start;
      const pct = Math.min(100, Math.max(0, ((scrollTop - start) / range) * 100));
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
      className="fixed top-[60px] xl:top-[68px] left-0 right-0 z-[60] h-[3px]"
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
