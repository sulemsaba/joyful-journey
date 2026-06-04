import { Component, type ErrorInfo, type ReactNode } from "react";
import { cn } from "@/exxonim/utils/cn";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Catches render errors in child components and displays a fallback UI
 * instead of crashing the entire application to a white screen.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (
      typeof console !== "undefined" &&
      typeof console.error === "function"
    ) {
      console.error("[ErrorBoundary] Uncaught render error:", error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          className={cn(
            "c-error-boundary",
            // Layout
            "flex items-center justify-center min-h-[60vh] px-6",
            // Visuals
            "bg-page text-text"
          )}
        >
          <div className="max-w-lg text-center">
            <div
              className={cn(
                // Layout
                "inline-flex items-center justify-center mb-6",
                // Sizing
                "w-16 h-16 rounded-full",
                // Visuals
                "bg-accent-soft text-accent"
              )}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-8 h-8"
                aria-hidden="true"
              >
                <path d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
              </svg>
            </div>

            <h1 className="text-2xl font-bold text-text mb-3">
              Something went wrong
            </h1>
            <p className="text-text-muted leading-relaxed mb-8">
              An unexpected error occurred while rendering this page. You can try
              again or reload the site.
            </p>

            {this.state.error && typeof this.state.error.message === "string" ? (
              <pre className="mb-6 p-4 rounded-xl border border-border-soft bg-surface-soft text-xs text-text-muted text-left overflow-x-auto max-h-32">
                {this.state.error.message}
              </pre>
            ) : null}

            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={this.handleReset}
                className={cn(
                  "inline-flex items-center justify-center",
                  "min-h-[2.75rem] px-6 py-2.5 rounded-full",
                  "border border-border-soft bg-surface text-text font-bold text-sm",
                  "transition-all hover:bg-surface-soft hover:-translate-y-0.5"
                )}
              >
                Try again
              </button>
              <button
                type="button"
                onClick={this.handleReload}
                className={cn(
                  "inline-flex items-center justify-center",
                  "min-h-[2.75rem] px-6 py-2.5 rounded-full",
                  "bg-accent text-accent-contrast font-bold text-sm",
                  "shadow-accent-glow transition-all hover:bg-accent-hover hover:-translate-y-0.5"
                )}
              >
                Reload page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
