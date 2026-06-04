import { resolveApiBaseUrl } from "@/exxonim/shared/api/baseUrl";
import { createHttpClient } from "@/exxonim/shared/api/http";

function getApiUrl(): string | undefined {
  if (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  return undefined;
}

export const api = createHttpClient(resolveApiBaseUrl(getApiUrl()));
