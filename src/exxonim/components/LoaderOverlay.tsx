/* ═══════════════════════════════════════════════════════════════
 * LoaderOverlay — the ONE loader for every loading state.
 *
 * Shows skeleton bars + optional card grid, with a centered
 * faded favicon pulse + animated dots overlay. No borders,
 * no white cards, no margins — just skeleton shapes on the
 * page background.
 *
 * USAGE:
 *   <LoaderOverlay />                        → page-level (bars + 3 cards)
 *   <LoaderOverlay variant="section" />       → section-level (bars only)
 *   <LoaderOverlay variant="compact" />       → minimal (favicon + dots only)
 * ═══════════════════════════════════════════════════════════════ */

type LoaderOverlayVariant = "page" | "section" | "compact";

interface LoaderOverlayProps {
  variant?: LoaderOverlayVariant;
}

/* ── Reusable favicon pulse + animated dots ─────────────── *
 * Also exported for direct use (e.g. inside HomePageSkeleton). */
export function LoaderIndicator() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative animate-[loader-pulse_2s_ease-in-out_infinite]">
        <img
          src="/branding/exxonim-favicon-light.png"
          alt=""
          width="48"
          height="48"
          className="logo-light block w-12 h-12 object-contain opacity-40"
        />
        <img
          src="/branding/exxonim-favicon-dark.png"
          alt=""
          width="48"
          height="48"
          className="logo-dark w-12 h-12 object-contain opacity-40"
        />
      </div>
      <div className="flex items-center opacity-30">
        <span className="font-sans text-sm font-medium text-text-muted tracking-[0.08em] uppercase">
          Loading
        </span>
        <span className="loader-dots font-sans text-sm font-medium text-text-muted" aria-hidden="true">
          <span>.</span><span>.</span><span>.</span>
        </span>
      </div>
    </div>
  );
}

/* ── Skeleton pulse bars ────────────────────────────────── */
function SkeletonBars() {
  return (
    <div className="grid gap-3" aria-hidden="true">
      <div className="h-4 w-28 rounded-full bg-accent-soft animate-pulse" />
      <div className="h-11 w-[min(30rem,88%)] rounded-full bg-accent-soft animate-pulse" />
      <div className="h-4 w-[min(36rem,100%)] rounded-full bg-accent-soft animate-pulse" />
      <div className="h-4 w-[min(28rem,80%)] rounded-full bg-accent-soft animate-pulse" />
    </div>
  );
}

/* ── Skeleton card grid ─────────────────────────────────── */
function SkeletonCards() {
  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4" aria-hidden="true">
      <div className="min-h-[9rem] rounded-[1.25rem] bg-accent-soft/70 animate-pulse" />
      <div className="min-h-[9rem] rounded-[1.25rem] bg-accent-soft/70 animate-pulse" />
      <div className="min-h-[9rem] rounded-[1.25rem] bg-accent-soft/70 animate-pulse" />
    </div>
  );
}

export function LoaderOverlay({ variant = "page" }: LoaderOverlayProps) {
  /* Compact: just the favicon + dots, centered */
  if (variant === "compact") {
    return (
      <div
        className="flex items-center justify-center min-h-[60vh] w-full"
        role="status"
        aria-live="polite"
      >
        <LoaderIndicator />
      </div>
    );
  }

  const isSection = variant === "section";

  /* Page / Section: skeleton shapes + centered overlay */
  return (
    <div
      className="relative isolate overflow-hidden flex items-center w-full"
      style={{ minHeight: isSection ? "15rem" : "clamp(24rem,48vh,34rem)" }}
      role="status"
      aria-live="polite"
    >
      {/* Skeleton shapes on page background */}
      <div
        className="w-[min(1180px,calc(100%-2rem))] mx-auto"
        style={{ padding: isSection ? "1.25rem" : "2rem", marginTop: isSection ? 0 : "1.5rem" }}
        aria-hidden="true"
      >
        <SkeletonBars />
        {!isSection && <SkeletonCards />}
      </div>

      {/* Centered favicon + dots overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <LoaderIndicator />
      </div>
    </div>
  );
}
