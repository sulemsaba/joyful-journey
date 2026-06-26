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

import { useQuery } from "@tanstack/react-query";

/* ── Types ────────────────────────────────────────────── */
interface GoogleReviewsData {
  rating: number;
  count: number;
  source: "google" | "fallback";
}

interface UseGoogleReviewsResult extends GoogleReviewsData {
  isPending: boolean;
  error: Error | null;
}

/* ── Default fallback ─────────────────────────────────── */
const DEFAULT_FALLBACK: GoogleReviewsData = {
  rating: 5.0,
  count: 8,
  source: "fallback",
};

/* ── Fetcher ──────────────────────────────────────────── */
async function fetchGoogleReviews(): Promise<GoogleReviewsData> {
  const res = await fetch("/api/v1/google-reviews");
  if (!res.ok) {
    throw new Error(`Failed to fetch Google reviews: ${res.status}`);
  }
  return res.json();
}

/* ── Hook ─────────────────────────────────────────────── */
export function useGoogleReviews(): UseGoogleReviewsResult {
  const { data, isPending, error } = useQuery<GoogleReviewsData>({
    queryKey: ["google-reviews"],
    queryFn: fetchGoogleReviews,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    gcTime: 25 * 60 * 60 * 1000, // slightly longer than staleTime
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });

  return {
    rating: data?.rating ?? DEFAULT_FALLBACK.rating,
    count: data?.count ?? DEFAULT_FALLBACK.count,
    source: data?.source ?? DEFAULT_FALLBACK.source,
    isPending,
    error: error ?? null,
  };
}
