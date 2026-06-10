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
