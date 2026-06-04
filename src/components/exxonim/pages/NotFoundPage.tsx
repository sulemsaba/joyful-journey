"use client";

import { routes } from "@/lib/exxonim-router";

export function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-accent mb-4">404</h1>
        <p className="text-xl font-semibold text-text mb-2">Page not found</p>
        <p className="text-text-muted mb-8">The page you are looking for does not exist or has been moved.</p>
        <a
          href={routes.home}
          className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 text-sm font-extrabold text-accent-contrast hover:bg-accent-hover transition-all hover:-translate-y-0.5"
        >
          Back to home
        </a>
      </div>
    </div>
  );
}
