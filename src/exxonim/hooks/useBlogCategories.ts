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

/**
 * Blog categories hook.
 *
 * ARCHITECTURE:
 *   Layer 0: Memory cache (current session)
 *   Layer 1: persistQueryClient (localStorage) - returning visitors see cache instantly
 *   Layer 2: Live API → JSON fallback (if API fails)
 *   Layer 3: Hardcoded fallback (always available, built into JS bundle)
 *
 * FALLBACK GUARANTEE:
 *   Always returns hardcoded fallback as `data` when no real data is available.
 */
import { useQuery } from "@tanstack/react-query";
import { fetchPublicBlogCategoriesRaw } from "@/exxonim/services/blogService";
import { fetchWithJsonFallback } from "@/exxonim/services/staticFallbackService";
import { mapBlogCategory } from "@/exxonim/utils/contentMappers";
import type { BlogCategory } from "@/exxonim/types";
import { fallbackBlogCategories } from "@/exxonim/content/fallbackPublicContent";

export function useBlogCategories() {
  const query = useQuery({
    queryKey: ["blog", "categories"],
    // Map both the API and the Layer-3 snapshot (both raw ApiBlogCategory[])
    // through mapBlogCategory so a populated snapshot applies identically.
    queryFn: async () => {
      const raw = await fetchWithJsonFallback(fetchPublicBlogCategoriesRaw, "blog-categories");
      const arr = Array.isArray(raw) ? raw : [];
      return arr.map((c) => mapBlogCategory(c) as BlogCategory);
    },
    placeholderData: fallbackBlogCategories,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });

  // FALLBACK GUARANTEE: same as useBlogPosts — an empty resolved array
  // ([] from an empty /fallback/blog-categories.json) is not nullish, so
  // `?? fallback` won't catch it and the category chips flash then vanish.
  // Keep the hardcoded fallback whenever the resolved list is empty.
  const resolved = query.data;
  const hasCategories = Array.isArray(resolved) && resolved.length > 0;

  return {
    ...query,
    data: hasCategories ? resolved : fallbackBlogCategories,
    isPending: query.isPending && !fallbackBlogCategories.length,
  };
}
