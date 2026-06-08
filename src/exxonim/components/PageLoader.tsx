import { useEffect, useState, useCallback, useRef } from "react";
import { Button } from "./primitives/Button";

interface PageLoaderProps {
  isLoading?: boolean;
}

/* ── Full-screen page loader ──────────────────────────
 * Uses the actual Exxonim favicon image with a smooth
 * scale-in/scale-out pulse — no rotation. The light
 * favicon shows in light mode, dark favicon in dark mode,
 * matching the same crossfade pattern as the nav logos.
 *
 * SPEED: Dismisses the instant the app is ready — no
 * artificial delay. A fast 250ms fade-out keeps it smooth.
 *
 * TIMEOUT: After 5 seconds, shows a "Try Again" button
 * so the user is never stuck loading forever.
 */
const LOADER_TIMEOUT = 5_000; // 5 seconds
const FADE_OUT_MS = 250;

export function PageLoader({ isLoading = true }: PageLoaderProps) {
  const [showLoader, setShowLoader] = useState(isLoading);
  const [isHidden, setIsHidden] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const removeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Dismiss loader immediately with fast fade-out */
  const dismissLoader = useCallback(() => {
    setIsHidden(true);
    removeRef.current = setTimeout(() => {
      setShowLoader(false);
      setTimedOut(false);
    }, FADE_OUT_MS);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      /* Dismiss on the next animation frame — no artificial delay.
       * requestAnimationFrame ensures we sync with the browser's
       * paint cycle so the fade-out looks smooth. */
      const raf = requestAnimationFrame(() => {
        dismissLoader();
      });
      return () => {
        cancelAnimationFrame(raf);
        if (removeRef.current) clearTimeout(removeRef.current);
      };
    } else {
      setShowLoader(true);
      setIsHidden(false);
      setTimedOut(false);
    }
  }, [isLoading, dismissLoader]);

  /* Timeout watchdog — if loading takes too long, show retry */
  useEffect(() => {
    if (!isLoading) return;

    const timer = setTimeout(() => {
      setTimedOut(true);
    }, LOADER_TIMEOUT);

    return () => clearTimeout(timer);
  }, [isLoading]);

  /* Handle retry */
  const handleRetry = () => {
    setTimedOut(false);
    window.location.reload();
  };

  if (!showLoader) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[linear-gradient(135deg,var(--color-page)_0%,var(--color-page-strong)_100%)] transition-opacity duration-250 ease-[cubic-bezier(0.25,1,0.25,1)] ${isHidden ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"}`}
      aria-hidden={isHidden}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Favicon image with smooth pulse animation */}
        <div className="relative animate-[loader-pulse_2s_ease-in-out_infinite]">
          {/* Light mode favicon */}
          <img
            src="/branding/exxonim-favicon-light.png"
            alt=""
            width="56"
            height="56"
            className="logo-light block w-14 h-14 object-contain"
          />
          {/* Dark mode favicon */}
          <img
            src="/branding/exxonim-favicon-dark.png"
            alt=""
            width="56"
            height="56"
            className="logo-dark w-14 h-14 object-contain"
          />
        </div>

        {/* Loading text with animated dots */}
        <div className="flex items-center">
          <span className="font-sans text-sm font-medium text-text-muted tracking-[0.08em] uppercase">Loading</span>
          <span className="loader-dots font-sans text-sm font-medium text-text-muted" aria-hidden="true">
            <span>.</span><span>.</span><span>.</span>
          </span>
        </div>

        {/* Timeout: Try Again button */}
        {timedOut && (
          <div className="flex flex-col items-center gap-3 animate-[loader-fade_0.4s_ease_forwards]">
            <p className="text-xs text-text-soft">Taking longer than expected</p>
            <Button
              size="standard"
              variant="primary"
              onClick={handleRetry}
            >
              Try Again
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
