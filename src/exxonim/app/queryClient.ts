/**
 * CACHE ARCHITECTURE (5-layer):
 * ──────────────────────────────
 * Layer 0: TanStack memory cache (in-memory, instant, same session)
 * Layer 1: persistQueryClient (localStorage, instant, 24h max age)
 * Layer 2: Live API (FastAPI backend, background refetch)
 * Layer 3: /fallback/*.json (same server, webhook-updated)
 * Layer 4: Hardcoded placeholderData (in JS bundle, always available)
 *
 * FLOW ON REFRESH:
 *   1. Service Worker serves cached JS/CSS/images instantly
 *   2. persistQueryClient hydrates from localStorage → render instantly
 *   3. API call fires in background → updates if changed (no flicker)
 *   4. If API fails → /fallback/*.json loads → persists to localStorage
 *   5. If fallback missing → hardcoded placeholderData shows (in JS bundle)
 *
 * This file implements Layers 2-4. See queryClient.ts for Layers 0-1.
 */

import { QueryClient } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

/**
 * TanStack Query Client with localStorage persistence.
 *
 * ARCHITECTURE (priority order):
 * ──────────────────────────────
 *
 * Layer 0: TanStack Memory Cache (current session)
 *   → Instant, in-memory. Survives page navigation within the session.
 *   → Cleared on page reload (then Layer 1 takes over).
 *
 * Layer 1: persistQueryClient (localStorage)
 *   → Auto-saves every successful API response to localStorage.
 *   → Auto-loads on next visit - returning visitors see content instantly.
 *   → maxAge: 24 hours (cache discarded if older).
 *   → This is the PRIMARY source for returning visitors. No flicker.
 *
 * Layer 2: Live API (FastAPI backend)
 *   → Fresh data from the database.
 *   → Runs in background after Layer 1 renders.
 *   → Updates cache + localStorage when it responds.
 *
 * ── Emergency layers (only when API is down AND no cache): ──
 *
 * Layer 3: /public/fallback/*.json (server-side)
 *   → Auto-updated by webhook when admin saves changes.
 *   → Served from the same server as the frontend - always available.
 *   → Contains real admin data from the last save.
 *   → When used as fallback, data gets persisted to localStorage for next visit.
 *
 * Layer 4: placeholderData (hardcoded TypeScript defaults)
 *   → Built into the JS bundle. Always available, zero delay.
 *   → Shown briefly during initial load while queryFn runs.
 *   → For returning visitors, never shown (they have cached data).
 *   → Updated by developers when deploying.
 *
 * FLOW - RETURNING VISITOR:
 *   1. persistQueryClient hydrates from localStorage → render instantly
 *   2. API call in background → update if changed
 *   → No flicker. No content jumping. One render update if data changed.
 *
 * FLOW - FIRST VISITOR (API works):
 *   1. No cache → placeholderData renders instantly
 *   2. API responds → real data replaces placeholder → saved to localStorage
 *   → Brief placeholder, then real content. One transition.
 *
 * FLOW - FIRST VISITOR (API down):
 *   1. No cache → placeholderData renders instantly
 *   2. API fails → JSON fallback loads → real admin data replaces placeholder
 *   → JSON data saved to localStorage for next visit.
 *
 * FLOW - FIRST VISITOR (API down, JSON missing):
 *   1. No cache → placeholderData renders instantly
 *   2. API fails → JSON missing → query errors
 *   3. Component falls back to hardcoded defaults via ternary operators
 *   → Extreme disaster scenario. Site still works with hardcoded content.
 */

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60 * 4, // 4 hours - data is fresh for 4h
      gcTime: 1000 * 60 * 60 * 24, // 24 hours - cache kept for 24h
      refetchOnWindowFocus: false,
      refetchOnReconnect: "always",
      retry: (failureCount, error) => {
        // Don't retry 404s - the resource simply doesn't exist
        const status = (error as { response?: { status?: number } } | null)?.response?.status;
        if (status === 404) return false;
        return failureCount < 2;
      },
    },
  },
});

/* ── Persistence setup ────────────────────────────────
 * Only runs in the browser (not during SSR or build).
 * Uses localStorage so cached data survives page reloads
 * and browser restarts. Max age 24h - after that, stale
 * cache is discarded and a fresh fetch is required. */
if (typeof window !== "undefined") {
  try {
    const persister = createSyncStoragePersister({
      key: "exxonim-query-cache",
      storage: window.localStorage,
      serialize: JSON.stringify,
      deserialize: JSON.parse,
    });

    // Bust localStorage cache when content version changes.
    // Increment CACHE_VERSION when fallback content is updated to force
    // returning visitors to see the new content immediately.
    const CACHE_VERSION = "2025-06-26-4";
    const storedVersion = localStorage.getItem("exxonim-cache-version");
    if (storedVersion !== CACHE_VERSION) {
      localStorage.removeItem("exxonim-query-cache");
      localStorage.setItem("exxonim-cache-version", CACHE_VERSION);
    }

    persistQueryClient({
      queryClient,
      persister,
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
    });
  } catch {
    // localStorage may be unavailable (private browsing, quota exceeded, etc.)
    // Silently continue without persistence - placeholderData still works
  }
}
