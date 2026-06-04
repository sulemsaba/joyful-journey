const fallbackShareImage = "/branding/exxonimLogoLight.webp";

export const siteOrigin = "https://exxonim.tz";

export function getDefaultShareImageUrl(baseUrl: string = siteOrigin) {
  return new URL(fallbackShareImage, baseUrl).toString();
}
