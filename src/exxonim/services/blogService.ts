/**
 * FASTAPI BACKEND ENDPOINTS:
 * ──────────────────────────
 * GET    /api/v1/blog/posts                   — List blog posts (public, published only)
 * GET    /api/v1/blog/posts/{slug}            — Get single blog post by slug (public)
 * GET    /api/v1/blog/categories              — List blog categories (public)
 *
 * CACHING: TanStack Query handles caching via persistQueryClient.
 * Hooks use placeholderData from fallbackPublicContent.ts.
 */
import { api } from "@/exxonim/app/apiClient";
import { apiRoutes } from "@/exxonim/shared/api/routes";
import { mapBlogCategory, mapBlogPost } from "@/exxonim/utils/contentMappers";
import type { BlogCategory, BlogPost } from '@/exxonim/types';
import type {
  ApiBlogCategory,
  ApiBlogPost,
  ApiPublicBlogPostListParams,
  ApiPublicBlogPostListResponse,
} from "@/exxonim/types/api";

export async function listPublicBlogPosts() {
  const params: ApiPublicBlogPostListParams & {
    skip?: number;
    featured_on_home?: boolean;
  } = {
    page: 1,
    limit: 50,
    skip: 0,
  };

  const response = await api.get<ApiPublicBlogPostListResponse | ApiBlogPost[]>(
    apiRoutes.public.blog.posts.list,
    { params }
  );

  if (Array.isArray(response.data)) {
    return response.data.map(mapBlogPost);
  }

  return response.data.items.map(mapBlogPost);
}

export async function getPublicBlogPostBySlug(slug: string) {
  const response = await api.get<ApiBlogPost>(apiRoutes.public.blog.posts.bySlug(slug));
  return mapBlogPost(response.data);
}

export async function listFeaturedPublicBlogPosts(limit: number = 3) {
  const posts = await listPublicBlogPosts();
  return posts.filter((post) => post.featuredOnHome).slice(0, limit);
}

export async function listPublicBlogCategories() {
  const response = await api.get<ApiBlogCategory[]>(apiRoutes.public.blog.categories.list);
  return response.data.map(
    (category): BlogCategory => mapBlogCategory(category) as BlogCategory
  );
}
