const fallbackShareImage = "/og-image.png";

// This site is consult.exxonim.tz (the parent exxonim.tz is a separate site).
// Used for canonical URLs, OG/Twitter share URLs, sitemap, and JSON-LD.
export const siteOrigin = "https://consult.exxonim.tz";

export function getDefaultShareImageUrl(baseUrl: string = siteOrigin) {
  return new URL(fallbackShareImage, baseUrl).toString();
}
