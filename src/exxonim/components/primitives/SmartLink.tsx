/**
 * SmartLink - route-aware navigation with automatic chunk preloading.
 *
 * PROBLEM:
 *   Desktop navbar preloads route chunks on mouseenter (hover),
 *   but CTA buttons, breadcrumbs, footer links, service cards,
 *   blog cards, and pricing buttons all use plain <Link> or <a>
 *   with NO preloading. This means:
 *
 *     Navbar → Services  =  instant (chunk preloaded on hover)
 *     Hero CTA → Services  =  slow (chunk downloads on click)
 *
 *   On mobile, mouseenter doesn't exist at all, so there's zero
 *   preloading - every tap starts a cold chunk download.
 *
 * SOLUTION:
 *   SmartLink adds preloading on THREE events:
 *     1. onMouseEnter  - desktop hover (same as navbar)
 *     2. onFocus       - keyboard navigation & mobile accessibility
 *     3. onTouchStart  - mobile tap (fires before click, gives ~300ms head start)
 *
 *   Now every route-changing element behaves consistently:
 *     Navbar → Services  =  instant
 *     Hero CTA → Services  =  instant
 *     Footer → Services  =  instant
 *     Mobile tap → Services  =  fast (onTouchStart head start)
 *
 * USAGE:
 *   Replace <Link to="/services"> with:
 *     <SmartLink to="/services">...</SmartLink>
 *
 *   Replace <a href="/services"> with:
 *     <SmartLink href="/services">...</SmartLink>
 *
 *   The component automatically detects internal routes and
 *   triggers preloadRoute() for them. External links (tel:, mailto:,
 *   https://) are unaffected.
 */

import { forwardRef, type ReactNode, type MouseEventHandler, type TouchEventHandler } from "react";
import { Link } from "react-router-dom";
import { preloadRoute } from "@/exxonim/preloadRoutes";
import { normalizePathname } from "@/exxonim/routes";

/** Check if a URL is an external/non-routable link (tel:, mailto:, https://, #, etc.) */
function isExternalHref(href: string): boolean {
  return /^(tel:|mailto:|https?:\/\/|#|javascript:)/.test(href);
}

/** Extract a normalize-able route path from an href */
function extractPath(href: string): string | null {
  if (isExternalHref(href)) return null;
  // Strip hash and query for preloading purposes
  const pathWithoutHash = href.split("#")[0];
  if (!pathWithoutHash || pathWithoutHash === "/") return null; // Home is always loaded
  return normalizePathname(pathWithoutHash);
}

export interface SmartLinkProps {
  /** Navigation target - used like <Link to={...}> or <a href={...}> */
  to?: string;
  /** Alternative to `to` - same behavior, just different prop name for <a> compat */
  href?: string;
  /** Link content */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Click handler - fires alongside navigation */
  onClick?: MouseEventHandler<HTMLElement>;
  /** ARIA label */
  "aria-label"?: string;
  /** ARIA current */
  "aria-current"?: string;
  /** HTML target attribute (for external links) */
  target?: string;
  /** HTML rel attribute */
  rel?: string;
  /** HTML title attribute */
  title?: string;
  /** Whether to also preload on focus (default: true) */
  preloadOnFocus?: boolean;
  /** Whether to also preload on touchStart (default: true) */
  preloadOnTouch?: boolean;
}

export const SmartLink = forwardRef<HTMLAnchorElement, SmartLinkProps>(
  function SmartLink(
    {
      to,
      href,
      children,
      className,
      onClick,
      "aria-label": ariaLabel,
      "aria-current": ariaCurrent,
      target,
      rel,
      title,
      preloadOnFocus = true,
      preloadOnTouch = true,
      ...rest
    },
    ref,
  ) {
    const destination = to || href || "";
    const path = extractPath(destination);

    /** Preload the route chunk if it's an internal route */
    const handlePreload = () => {
      if (path) {
        preloadRoute(path);
      }
    };

    const handleMouseEnter: MouseEventHandler<HTMLElement> = (e) => {
      handlePreload();
      // Chain to existing onMouseEnter if any (via rest)
      if ("onMouseEnter" in rest && typeof rest.onMouseEnter === "function") {
        (rest as any).onMouseEnter(e);
      }
    };

    const handleFocus: MouseEventHandler<HTMLElement> = (e) => {
      if (preloadOnFocus) handlePreload();
    };

    const handleTouchStart: TouchEventHandler<HTMLElement> = (e) => {
      if (preloadOnTouch) handlePreload();
    };

    // External links: use plain <a>
    if (destination && isExternalHref(destination)) {
      return (
        <a
          ref={ref}
          href={destination}
          className={className}
          onClick={onClick}
          aria-label={ariaLabel}
          aria-current={ariaCurrent}
          target={target}
          rel={rel}
          title={title}
          onMouseEnter={handleMouseEnter}
          onFocus={handleFocus}
          onTouchStart={handleTouchStart}
        >
          {children}
        </a>
      );
    }

    // Internal links: use React Router <Link>
    return (
      <Link
        ref={ref}
        to={destination}
        className={className}
        onClick={onClick}
        aria-label={ariaLabel}
        aria-current={ariaCurrent}
        target={target}
        rel={rel}
        title={title}
        onMouseEnter={handleMouseEnter}
        onFocus={handleFocus}
        onTouchStart={handleTouchStart}
      >
        {children}
      </Link>
    );
  },
);
