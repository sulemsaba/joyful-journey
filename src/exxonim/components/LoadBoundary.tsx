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

interface SkeletonProps {
  label: string;
  variant: LoadBoundaryVariant;
}

function ContentSkeleton({ label, variant }: SkeletonProps) {
  const isSection = variant === "section";

  return (
    <div
      className={[
        "grid border border-border-soft animate-pulse bg-surface-elevated",
        isSection
          ? "gap-4 min-h-[15rem] p-5 rounded-[1.35rem] w-full"
          : "gap-6 min-h-[clamp(24rem,48vh,34rem)] p-8 rounded-[1.8rem] w-[min(1180px,calc(100%-2rem))] mx-auto mt-6",
      ].join(" ")}
      role="status"
      aria-live="polite"
    >
      <div className="grid gap-3">
        <div className="h-4 w-28 rounded-full bg-accent-soft" />
        <div className="h-11 w-[min(30rem,88%)] rounded-full bg-accent-soft" />
        <div className="h-4 w-[min(36rem,100%)] rounded-full bg-accent-soft" />
        <div className="h-4 w-[min(36rem,100%)] rounded-full bg-accent-soft" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4" aria-hidden="true">
        <div className="min-h-[9rem] rounded-[1.25rem] bg-accent-soft/70 border border-accent-soft/50" />
        <div className="min-h-[9rem] rounded-[1.25rem] bg-accent-soft/70 border border-accent-soft/50" />
        <div className="min-h-[9rem] rounded-[1.25rem] bg-accent-soft/70 border border-accent-soft/50" />
      </div>
      <p className="m-0 text-text-muted text-sm">{label}</p>
    </div>
  );
}

export function LoadBoundary({
  children,
  error,
  errorDetail = "This section could not be loaded right now. Please try again in a moment.",
  errorTitle = "Unable to load content.",
  isPending,
  isReady = true,
  loadingLabel = "Loading content...",
  variant = "page",
}: LoadBoundaryProps) {
  if (isPending && !isReady) {
    return <ContentSkeleton label={loadingLabel} variant={variant} />;
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
