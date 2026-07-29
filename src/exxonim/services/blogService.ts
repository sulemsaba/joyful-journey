/**
 * FASTAPI BACKEND ENDPOINTS:
 * ──────────────────────────
 * GET    /api/v1/blog/posts                   - List blog posts (public, published only)
 * GET    /api/v1/blog/posts/{slug}            - Get single blog post by slug (public)
 * GET    /api/v1/blog/categories              - List blog categories (public)
 *
 * CACHING: TanStack Query handles caching via persistQueryClient.
 * Hooks use placeholderData from fallbackPublicContent.ts.
 */
import { api } from "@/exxonim/app/apiClient";
import { apiRoutes } from "@/exxonim/shared/api/routes";
import type {
  ApiBlogCategory,
  ApiBlogPost,
  ApiPublicBlogPostListResponse,
} from "@/exxonim/types/api";

/**
 * Raw (unmapped) fetchers — used by the fallback-aware hooks so that BOTH the
 * live API response AND the Layer-3 snapshot (public/fallback/blog-*.json, which
 * stores the same raw public API shape) flow through ONE mapping step. Without
 * this, the API path was mapped but the snapshot path was not, so a populated
 * snapshot arrived in the wrong shape and got dropped.
 */
export async function fetchPublicBlogPostsRaw(): Promise<
  ApiPublicBlogPostListResponse | ApiBlogPost[]
> {
  const response = await api.get<ApiPublicBlogPostListResponse | ApiBlogPost[]>(
    apiRoutes.public.blog.posts.list,
    { params: { page: 1, limit: 50, skip: 0 } }
  );
  return response.data;
}

export async function fetchPublicBlogCategoriesRaw(): Promise<ApiBlogCategory[]> {
  const response = await api.get<ApiBlogCategory[]>(apiRoutes.public.blog.categories.list);
  return response.data;
}

export async function fetchPublicBlogPostBySlugRaw(slug: string): Promise<ApiBlogPost> {
  const response = await api.get<ApiBlogPost>(apiRoutes.public.blog.posts.bySlug(slug));
  return response.data;
}
