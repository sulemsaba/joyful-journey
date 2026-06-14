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
  loadingLabel?: string;
  variant?: LoadBoundaryVariant;
}

/* ═══════════════════════════════════════════════════════════════════════════
 * L7: HOME_PAGE_SKELETON — LoadBoundary.tsx
 * ═══════════════════════════════════════════════════════════════════════════
 * LABEL:    HOME_PAGE_SKELETON
 * POSITION: Full page (homepage only)
 * APPEARANCE: Full-page skeleton layout (original code in git history)
 * STATUS:   disabled — returns null
 * RE-ENABLE: Uncomment and restore skeleton JSX from git history
 * ═══════════════════════════════════════════════════════════════════════════ */
export function HomePageSkeleton() {
  return null;
  // ── Re-enable: restore original skeleton code from git history ──
}

/* ═══════════════════════════════════════════════════════════════════════════
 * LoadBoundary — Pending/error state gate
 * ═══════════════════════════════════════════════════════════════════════════
 * When isPending && !isReady:
 *   - Previously showed <LoaderOverlay variant={variant} /> (L4/L5)
 *   - Now returns null (no loader)
 *
 * With the 5-layer resilience architecture, isPending is always false
 * when fallback data exists, so this code path is rarely reached.
 *
 * RE-ENABLE: Replace `return null` with:
 *   return <LoaderOverlay variant={variant} />;
 * (Make sure L1/L4/L5 are also enabled in LoaderOverlay.tsx)
 * ═══════════════════════════════════════════════════════════════════════════ */
export function LoadBoundary({
  children,
  error,
  errorDetail = "This section could not be loaded right now. Please try again in a moment.",
  errorTitle = "Unable to load content.",
  isPending,
  isReady = true,
  loadingLabel: _loadingLabel = "Loading content...",
  variant: _variant = "page",
}: LoadBoundaryProps) {
  if (isPending && !isReady) {
    // DISABLED: return <LoaderOverlay variant={variant} />;
    // See L4/L5 in LoaderOverlay.tsx — re-enable both together
    return null;
  }

  if (isReady) {
    return <>{typeof children === "function" ? children() : children}</>;
  }

  if (error || !isReady) {
    return (
      <ErrorMessage
        compact={_variant === "section"}
        detail={errorDetail}
        title={errorTitle}
      />
    );
  }

  return null;
}
