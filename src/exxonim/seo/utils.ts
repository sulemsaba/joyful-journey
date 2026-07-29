import { normalizePathname, routes } from "@/exxonim/routes";
import { siteOrigin } from "./constants";

export function buildAbsoluteUrl(path: string, baseUrl: string = siteOrigin) {
  return new URL(path, baseUrl).toString();
}

export function toCanonicalPath(pathname: string | undefined) {
  const normalizedPathname = normalizePathname(pathname);

  if (normalizedPathname === normalizePathname(routes.home)) {
    return routes.home;
  }

  if (normalizedPathname === normalizePathname(routes.notFound)) {
    return routes.notFound;
  }

  return `${normalizedPathname}/`;
}
