import type { ReactNode } from "react";
import { ErrorMessage } from "./ErrorMessage";

type LoadBoundaryVariant = "page" | "section";
type LoadBoundaryChildren = ReactNode | (() => ReactNode);

interface LoadBoundaryProps {
  children: LoadBoundaryChildren;
  error?: unknown;
  errorDetail?: string;
  errorTitle?: string;
  isPending: boolean;
  isReady?: boolean;
  variant?: LoadBoundaryVariant;
}

/* ═══════════════════════════════════════════════════════════════════════════
 * LoadBoundary — Pending/error state gate
 * ═══════════════════════════════════════════════════════════════════════════
 * With the 5-layer resilience architecture (memory → localStorage → API →
 * JSON fallback → hardcoded), isPending is almost never true when fallback
 * data exists. When there IS genuinely no data yet (e.g. tracking lookup),
 * the component using LoadBoundary handles loading in its own UI.
 *
 * LOADER POLICY:
 *   ✅ Button loaders — for mutations (Sending..., Searching...)
 *   ✅ Boot/emergency loader — CSS-only in index.html (favicon + dots)
 *   ❌ Route-transition loaders — permanently retired
 *   ❌ Skeleton loaders — permanently retired
 * ═══════════════════════════════════════════════════════════════════════════ */
export function LoadBoundary({
  children,
  error,
  errorDetail = "This section could not be loaded right now. Please try again in a moment.",
  errorTitle = "Unable to load content.",
  isPending,
  isReady = true,
  variant = "page",
}: LoadBoundaryProps) {
  if (isPending && !isReady) {
    // No loader — fallback data renders immediately via the resilience architecture
    return null;
  }

  if (isReady) {
    return <>{typeof children === "function" ? children() : children}</>;
  }

  if (error || !isReady) {
    return (
      <ErrorMessage
        compact={variant === "section"}
        detail={errorDetail}
        title={errorTitle}
      />
    );
  }

  return null;
}
