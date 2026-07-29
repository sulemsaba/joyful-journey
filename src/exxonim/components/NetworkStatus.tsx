/**
 * NetworkStatus — monitors browser connectivity and ongoing API errors.
 *
 * Shows a dismissible banner when:
 *   1. The browser reports offline (navigator.onLine === false)
 *   2. A TanStack Query has failed and there's no cached data to show
 *
 * The banner auto-dismisses when connectivity is restored or queries recover.
 * It uses the existing Tailwind design tokens (bg-page, text-text, etc.)
 * so it respects dark mode automatically.
 */
import { useIsFetching, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/exxonim/utils/cn";

type BannerKind = "offline" | "api-error" | null;

export function NetworkStatus() {
  const [online, setOnline] = useState(
    typeof navigator !== "undefined" ? navigator.onLine : true
  );
  const [dismissed, setDismissed] = useState(false);
  const isFetching = useIsFetching();
  const queryClient = useQueryClient();

  // Track if the initial hydration has settled (we've had at least one
  // successful or failed fetch attempt). Until then, queries returning
  // placeholderData is expected — not an error.
  const [settled, setSettled] = useState(false);
  const settledOnce = useRef(false);

  useEffect(() => {
    if (settledOnce.current) return;
    // After a brief delay, consider the app settled — queries have either
    // resolved from cache/API or failed.
    const timer = setTimeout(() => {
      settledOnce.current = true;
      setSettled(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  // ── Browser online/offline events ────────────────────────────────
  useEffect(() => {
    const goOnline = () => {
      setOnline(true);
      setDismissed(false);
      // Refetch all stale queries when coming back online
      queryClient.refetchQueries({ type: "active" });
    };
    const goOffline = () => setOnline(false);

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, [queryClient]);

  // ── Determine which banner to show ───────────────────────────────
  const determineBanner = useCallback((): BannerKind => {
    if (!online) return "offline";

    // Only show API error banner after initial settlement (avoids flash
    // during hydration) AND when NOT currently fetching (if it's still
    // fetching, the query might succeed).
    if (settled && !dismissed) {
      // Check for any query that is currently in error state (has no data)
      const queries = queryClient.getQueryCache().getAll();
      const hasFailedQueries = queries.some(
        (q) =>
          q.state.status === "error" &&
          // Only consider queries that were actually attempted (not just
          // placeholderData that hasn't fetched yet)
          q.state.fetchStatus !== "idle" &&
          // Exclude queries that still have data from cache/fallback
          q.state.data === undefined
      );
      if (hasFailedQueries) return "api-error";
    }

    return null;
  }, [online, settled, dismissed, queryClient]);

  // Only show banner for API errors when not actively fetching
  const banner = online ? (isFetching > 0 ? null : determineBanner()) : "offline";

  // Auto-dismiss offline banner when coming back online
  useEffect(() => {
    if (online) {
      const timer = setTimeout(() => setDismissed(true), 5000);
      return () => clearTimeout(timer);
    }
  }, [online]);

  const handleDismiss = useCallback(() => {
    setDismissed(true);
  }, []);

  if (!banner || (banner === "api-error" && dismissed)) return null;

  return (
    <div
      role="alert"
      aria-live="polite"
      className={cn(
        "fixed top-20 left-1/2 -translate-x-1/2 z-[999]",
        "w-[90vw] max-w-lg",
        "animate-in fade-in slide-in-from-top-2 duration-300 ease-out",
        "pointer-events-auto"
      )}
    >
      <div
        className={cn(
          "flex items-start gap-3 px-4 py-3 rounded-xl shadow-lg",
          "border backdrop-blur-sm",
          banner === "offline"
            ? "bg-destructive/10 border-destructive/30 text-destructive"
            : "bg-warning/10 border-warning/30 text-warning-foreground"
        )}
      >
        {/* Icon */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 mt-0.5 shrink-0"
          aria-hidden="true"
        >
          {banner === "offline" ? (
            // Wifi-off icon
            <>
              <path d="M12 18h.01" />
              <path d="M9.172 15.172a4 4 0 0 1 5.656 0" />
              <path d="M6.343 12.343a8 8 0 0 1 11.314 0" />
              <path d="M23 1 1 23" />
            </>
          ) : (
            // Alert-triangle icon
            <>
              <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </>
          )}
        </svg>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold">
            {banner === "offline"
              ? "No internet connection"
              : "Some content couldn't load"}
          </p>
          <p className="text-xs mt-0.5 opacity-80">
            {banner === "offline"
              ? "Showing cached content where available. We'll refresh automatically when you're back online."
              : "We're having trouble reaching our servers. Cached content is shown instead."}
          </p>
        </div>

        {/* Dismiss button */}
        <button
          type="button"
          onClick={handleDismiss}
          className="shrink-0 p-2 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          aria-label="Dismiss"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
