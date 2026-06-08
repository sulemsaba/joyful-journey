/**
 * FASTAPI BACKEND ENDPOINTS:
 * ──────────────────────────
 * GET    /api/v1/blog/posts                   — List blog posts (public, published only)
 *   Query params: page, limit, category, featured_on_home, sort
 * GET    /api/v1/blog/posts/{slug}            — Get single blog post by slug (public)
 * POST   /api/v1/blog/posts                   — Create blog post (admin only)
 * PUT    /api/v1/blog/posts/{id}              — Update blog post (admin only)
 * DELETE /api/v1/blog/posts/{id}              — Delete blog post (admin only)
 * POST   /api/v1/blog/posts/{id}/submit       — Submit for review (admin)
 * POST   /api/v1/blog/posts/{id}/approve      — Approve blog post (admin)
 * POST   /api/v1/blog/posts/{id}/reject       — Reject blog post (admin)
 * POST   /api/v1/blog/posts/{id}/publish      — Publish blog post (admin)
 * POST   /api/v1/blog/posts/{id}/archive      — Archive blog post (admin)
 * POST   /api/v1/blog/posts/{id}/preview-token — Generate preview token (admin)
 *
 * GET    /api/v1/blog/categories              — List blog categories (public)
 * POST   /api/v1/blog/categories              — Create category (admin only)
 * PUT    /api/v1/blog/categories/{id}         — Update category (admin only)
 * DELETE /api/v1/blog/categories/{id}         — Delete category (admin only)
 *
 * GET    /api/v1/blog/authors                 — List blog authors (public)
 * GET    /api/v1/blog/authors/{slug}          — Get author by slug (public)
 * GET    /api/v1/blog/authors/me              — Get current admin author (admin)
 * POST   /api/v1/blog/authors                 — Create author (admin only)
 * PUT    /api/v1/blog/authors/{id}            — Update author (admin only)
 *
 * PostgreSQL Tables:
 *   blog_posts — id, slug (UNIQUE), title, excerpt, body, cover_image_url, cover_alt,
 *                media_label, featured_slot, featured_on_home, read_time_minutes,
 *                category_id, author_id, status, meta_title, meta_description,
 *                published_at, created_at, updated_at
 *   blog_categories — id, label, description, slug, created_at
 *   blog_authors — id, name, slug, role, avatar_url, bio, created_at
 *   blog_post_related — post_id, related_post_id
 *
 * Request Schema — Create Post (POST):
 *   { title: str, slug: str, excerpt: str, body: str, cover_image_url: str | None,
 *     category_id: int | None, author_id: int | None, featured_on_home: bool,
 *     meta_title: str | None, meta_description: str | None }
 *
 * Response Schema — Post:
 *   { id: int, slug: str, title: str, excerpt: str, publishedAt: datetime,
 *     category: { id: str, label: str } | None, author: { id: str, name: str, role: str | None } | None,
 *     coverImageSrc: str | None, coverAlt: str | None, mediaLabel: str,
 *     featuredOnHome: bool, readTimeMinutes: int | None, relatedSlugs: str[] }
 *
 * Response Schema — Post List (paginated):
 *   { items: ApiBlogPost[], total: int, page: int, limit: int }
 */
import { api } from "@/exxonim/app/apiClient";
import { apiRoutes } from "@/exxonim/shared/api/routes";
import {
  fetchWithFallback,
  getCachedPublicContent,
} from "@/exxonim/shared/publicContentCache";
import { mapBlogCategory, mapBlogPost } from "@/exxonim/utils/contentMappers";
import type { BlogCategory, BlogPost } from '@/exxonim/types';
import type {
  ApiBlogCategory,
  ApiBlogPost,
  ApiPublicBlogPostListParams,
  ApiPublicBlogPostListResponse,
} from "@/exxonim/types/api";
import {
  preloadStaticFallback,
  getStaticFallback,
} from "./staticFallbackService";
import {
  fallbackBlogCategories,
  fallbackBlogPosts,
} from "@/exxonim/content/fallbackPublicContent";

preloadStaticFallback<BlogPost[]>("blog-posts");
preloadStaticFallback<BlogCategory[]>("blog-categories");

const BLOG_POSTS_CACHE_KEY = "blog:posts";
const BLOG_CATEGORIES_CACHE_KEY = "blog:categories";
const BLOG_POSTS_TTL_MS = 1000 * 60 * 30;
const BLOG_CATEGORIES_TTL_MS = 1000 * 60 * 60 * 24;
const BLOG_POST_TTL_MS = 1000 * 60 * 60 * 6;

function blogPostCacheKey(slug: string) {
  return `blog:post:${slug}`;
}

function isBlogPostCollection(value: BlogPost[]) {
  return Array.isArray(value) && value.length > 0;
}

function isBlogCategoryCollection(value: BlogCategory[]) {
  return Array.isArray(value) && value.length > 0;
}

function isBlogPostRecord(value: BlogPost | undefined): value is BlogPost {
  return Boolean(value && typeof value.slug === "string");
}

function findFallbackBlogPost(slug: string) {
  return fallbackBlogPosts.find((post) => post.slug === slug);
}

function mapPostsResponse(responseData: ApiPublicBlogPostListResponse | ApiBlogPost[]) {
  if (Array.isArray(responseData)) {
    return responseData.map(mapBlogPost);
  }

  return responseData.items.map(mapBlogPost);
}

export async function fetchFreshPublicBlogPosts() {
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
    {
      params,
    }
  );

  return mapPostsResponse(response.data);
}

export function getCachedPublicBlogPosts() {
  return getCachedPublicContent<BlogPost[]>(BLOG_POSTS_CACHE_KEY, getStaticFallback<BlogPost[]>("blog-posts") ?? fallbackBlogPosts);
}

export async function listPublicBlogPosts() {
  return fetchWithFallback<BlogPost[]>({
    cacheKey: BLOG_POSTS_CACHE_KEY,
    fallbackValue: getStaticFallback<BlogPost[]>("blog-posts") ?? fallbackBlogPosts,
    fetcher: fetchFreshPublicBlogPosts,
    ttlMs: BLOG_POSTS_TTL_MS,
    validate: isBlogPostCollection,
    warningLabel: "Using cached or default blog posts.",
  });
}

export async function listFeaturedPublicBlogPosts(limit: number = 3) {
  const posts = await listPublicBlogPosts();
  return posts.filter((post) => post.featuredOnHome).slice(0, limit);
}

export async function getPublicBlogPostBySlug(slug: string) {
  return fetchWithFallback<BlogPost>({
    cacheKey: blogPostCacheKey(slug),
    fallbackValue: findFallbackBlogPost(slug),
    fetcher: async () => {
      const response = await api.get<ApiBlogPost>(apiRoutes.public.blog.posts.bySlug(slug));
      return mapBlogPost(response.data);
    },
    ttlMs: BLOG_POST_TTL_MS,
    validate: isBlogPostRecord,
    warningLabel: `Using cached or default blog article content for "${slug}".`,
  });
}

export function getCachedPublicBlogPostBySlug(slug: string) {
  const cachedPost = getCachedPublicContent<BlogPost | undefined>(
    blogPostCacheKey(slug)
  );
  if (cachedPost) {
    return cachedPost;
  }

  const cachedPosts = getCachedPublicContent<BlogPost[]>(
    BLOG_POSTS_CACHE_KEY,
    getStaticFallback<BlogPost[]>("blog-posts") ?? fallbackBlogPosts
  );
  const cachedCollectionMatch = cachedPosts?.find((post) => post.slug === slug);

  return getCachedPublicContent<BlogPost | undefined>(
    blogPostCacheKey(slug),
    cachedCollectionMatch ?? findFallbackBlogPost(slug)
  );
}

async function fetchFreshPublicBlogCategories() {
  const response = await api.get<ApiBlogCategory[]>(apiRoutes.public.blog.categories.list);
  return response.data.map(
    (category): BlogCategory => mapBlogCategory(category) as BlogCategory
  );
}

export function getCachedPublicBlogCategories() {
  return getCachedPublicContent<BlogCategory[]>(
    BLOG_CATEGORIES_CACHE_KEY,
    getStaticFallback<BlogCategory[]>("blog-categories") ?? fallbackBlogCategories
  );
}

export async function listPublicBlogCategories() {
  return fetchWithFallback<BlogCategory[]>({
    cacheKey: BLOG_CATEGORIES_CACHE_KEY,
    fallbackValue: getStaticFallback<BlogCategory[]>("blog-categories") ?? fallbackBlogCategories,
    fetcher: fetchFreshPublicBlogCategories,
    ttlMs: BLOG_CATEGORIES_TTL_MS,
    validate: isBlogCategoryCollection,
    warningLabel: "Using cached or default blog categories.",
  });
}
