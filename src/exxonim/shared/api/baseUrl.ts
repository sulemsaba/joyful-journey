export function resolveApiBaseUrl(explicitBaseUrl?: string) {
  if (explicitBaseUrl) {
    return explicitBaseUrl;
  }

  return "/api/v1";
}
