import { NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";

/* ── Types ────────────────────────────────────────────── */
interface GoogleReviewsResponse {
  rating: number;
  count: number;
  source: "google" | "fallback";
}

/* ── In-memory cache with TTL ─────────────────────────── */
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

let cachedData: GoogleReviewsResponse | null = null;
let cachedAt: number = 0;

function isCacheValid(): boolean {
  return cachedData !== null && Date.now() - cachedAt < CACHE_TTL_MS;
}

/* ── Fallback response (verified rating) ──────────────── */
const FALLBACK: GoogleReviewsResponse = {
  rating: 5.0,
  count: 8,
  source: "fallback",
};

/* ── Extract rating info from web search results ────────
 * Only accepts ratings that appear to be legitimate Google
 * Business profile ratings for Exxonim Consult specifically.
 * Rejects ratings below 3.0 (likely from unrelated results). */
function extractRatingFromSnippets(
  snippets: string[]
): { rating: number; count: number } | null {
  for (const snippet of snippets) {
    // Only process snippets that mention "Exxonim" to avoid unrelated results
    if (!snippet.toLowerCase().includes("exxonim")) continue;

    // Match patterns like "5/5", "5.0 out of 5", "Rated 5.0", "★★★★★ 5.0"
    const ratingMatch = snippet.match(
      /(\d+\.?\d*)\s*(?:\/5|out of 5|stars?|★)/i
    );
    // Match patterns like "8 reviews", "8 Google reviews", "(8)"
    const countMatch = snippet.match(
      /(\d+)\s*(?:reviews?|google reviews?|ratings?)/i
    );

    if (ratingMatch) {
      const rating = parseFloat(ratingMatch[1]);
      const count = countMatch ? parseInt(countMatch[1], 10) : 8;
      // Only accept plausible ratings (3.0+) and reasonable counts
      if (rating >= 3.0 && rating <= 5.0 && count >= 0 && count <= 500) {
        return { rating: Math.round(rating * 10) / 10, count };
      }
    }
  }
  return null;
}

/* ── Fetch Google reviews using z-ai-web-dev-sdk ─────── */
async function fetchGoogleReviews(): Promise<GoogleReviewsResponse> {
  try {
    const zai = await ZAI.create();

    // Search specifically for Exxonim Consult Google Business profile
    const searchResults = await zai.functions.invoke("web_search", {
      query: "Exxonim Consult Tanzania Google reviews rating site:google.com",
      num: 5,
    });

    if (searchResults && searchResults.length > 0) {
      const snippets = searchResults.map(
        (r: { snippet?: string; name?: string; url?: string }) =>
          `${r.name || ""} ${r.snippet || ""} ${r.url || ""}`
      );

      const extracted = extractRatingFromSnippets(snippets);
      if (extracted) {
        return {
          rating: extracted.rating,
          count: extracted.count,
          source: "google",
        };
      }

      // Try reading a Google Maps/Business page URL for detailed info
      const googleBizUrl = searchResults.find(
        (r: { url?: string }) =>
          r.url &&
          (r.url.includes("google.com/maps") ||
            r.url.includes("google.com/business") ||
            r.url.includes("g.page"))
      )?.url;

      if (googleBizUrl) {
        try {
          const pageResult = await zai.functions.invoke("page_reader", {
            url: googleBizUrl,
          });

          const pageText = pageResult?.data?.html || "";
          // Strip HTML tags for text extraction
          const plainText = pageText.replace(/<[^>]*>/g, " ");
          const pageExtracted = extractRatingFromSnippets([plainText]);

          if (pageExtracted) {
            return {
              rating: pageExtracted.rating,
              count: pageExtracted.count,
              source: "google",
            };
          }
        } catch {
          // page_reader failed, continue to fallback
        }
      }
    }

    // Search succeeded but no Exxonim-specific rating found — return fallback
    return FALLBACK;
  } catch {
    // Web search itself failed — return fallback
    return FALLBACK;
  }
}

/* ── Route handler ────────────────────────────────────── */
export async function GET() {
  // Return cached data if still fresh
  if (isCacheValid()) {
    return NextResponse.json(cachedData);
  }

  // Fetch fresh data
  const data = await fetchGoogleReviews();

  // Update cache
  cachedData = data;
  cachedAt = Date.now();

  return NextResponse.json(data);
}
