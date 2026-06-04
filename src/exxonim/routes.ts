/**
 * Route constants for the Exxonim public website and admin panel.
 *
 * BACKEND / ADMIN INTEGRATION NOTES (FastAPI):
 * ─────────────────────────────────────────────
 * These routes must match the URL patterns defined in the FastAPI router.
 * When the admin creates a new navigation item, the `url` field should
 * reference one of these paths OR be a valid external URL (https://...).
 *
 * IMPORTANT: All internal routes have trailing slashes. The `normalizePathname()`
 * function strips the trailing slash for comparison, so "/about/" and "/about"
 * are treated as the same route.
 *
 * If the admin adds a new page (e.g., "/partners/"), they must also:
 *   1. Add the route constant here.
 *   2. Create a page component in src/exxonim/pages/.
 *   3. Add the route to the `staticRoutes` array in src/exxonim/app/App.tsx.
 *   4. Add fallback content in src/exxonim/content/fallbackPublicContent.ts.
 * The admin UI should provide a warning that new routes require a code deploy
 * unless the page is purely content-driven (fetched from the pages API).
 */
export const routes = {
  home: "/",
  admin: "/admin/",
  adminLogin: "/admin/login/",
  about: "/about/",
  faq: "/faq/",
  services: "/services/",
  resources: "/resources/",
  blog: "/resources/",  // Alias — blog lives under /resources/ (same page)
  career: "/career/",
  contact: "/contact/",
  trackConsultation: "/track-consultation/",
  support: "/support/",
  terms: "/terms/",
  privacy: "/privacy/",
  cookies: "/cookies/",
  dataRights: "/data-rights/",
  notFound: "/404/",
} as const;

export const staticRoutePaths = Object.values(routes);

export function resourceArticlePath(slug: string) {
  return `${routes.resources}${slug}/`;
}

export function resourcePost(slug: string) {
  return resourceArticlePath(slug);
}

export function legacyBlogArticlePath(slug: string) {
  return `/blog/${slug}/`;
}

export function legacyBlogPost(slug: string) {
  return legacyBlogArticlePath(slug);
}

export function normalizePathname(pathname: string | undefined) {
  if (!pathname || pathname === "/") {
    return "/";
  }

  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

export function getResourcePostSlug(pathname: string | undefined) {
  const normalizedPathname = normalizePathname(pathname);
  const segments = normalizedPathname.split("/").filter(Boolean);

  if (
    segments.length === 2 &&
    (segments[0] === "resources" || segments[0] === "blog")
  ) {
    return segments[1];
  }

  return null;
}

export function isPublicAppRoute(pathname: string | undefined) {
  const normalizedPathname = normalizePathname(pathname);

  if (
    normalizedPathname === normalizePathname(routes.admin) ||
    normalizedPathname === normalizePathname(routes.adminLogin)
  ) {
    return false;
  }

  return (
    staticRoutePaths
      .filter((route) => route !== routes.admin && route !== routes.adminLogin)
      .map((route) => normalizePathname(route))
      .includes(normalizedPathname) || Boolean(getResourcePostSlug(normalizedPathname))
  );
}
