import type {
  BlogArticleContent,
  BlogAuthor,
  BlogCategory,
  BlogPost,
  NavigationItem,
  PageRecord,
  SiteSetting,
  Testimonial,
} from '@/exxonim/types';
import type {
  ApiBlogAuthor,
  ApiBlogCategory,
  ApiBlogPost,
  ApiNavigationItem,
  ApiPage,
  ApiSiteSetting,
  ApiTestimonial,
} from "@/exxonim/types/api";

function toDateOnly(value?: string | null) {
  if (!value) {
    return "";
  }

  return new Date(value).toISOString().slice(0, 10);
}

function mapBlogAuthor(author?: ApiBlogAuthor | null): BlogAuthor | undefined {
  if (!author) {
    return undefined;
  }

  return {
    id: author.slug,
    name: author.name,
    role: author.role ?? undefined,
    avatarSrc: author.avatar_src ?? undefined,
    bio: author.bio ?? undefined,
  };
}

export function mapBlogCategory(
  category?: ApiBlogCategory | null
): BlogCategory | undefined {
  if (!category) {
    return undefined;
  }

  return {
    id: category.slug,
    label: category.name,
    description: category.description ?? undefined,
  };
}

/**
 * BlogArticleContent declares introduction/highlights/sections as required, but the
 * value arrives from JSON — the API or a Layer-3 snapshot can omit or null any of
 * them. TypeScript then believes reads like `content.sections.length` are safe when
 * they are not, so guarantee the shape once here rather than at each reader.
 */
function mapBlogArticleContent(content?: BlogArticleContent | null): BlogArticleContent | undefined {
  if (!content || typeof content !== "object") {
    return undefined;
  }

  return {
    introduction: typeof content.introduction === "string" ? content.introduction : "",
    highlights: Array.isArray(content.highlights) ? content.highlights.filter(Boolean) : [],
    sections: Array.isArray(content.sections)
      ? content.sections.filter(Boolean).map((section) => ({
          ...section,
          heading: typeof section.heading === "string" ? section.heading : "",
          paragraphs: Array.isArray(section.paragraphs) ? section.paragraphs.filter(Boolean) : [],
        }))
      : [],
    ...(typeof content.html === "string" && content.html ? { html: content.html } : {}),
  };
}

export function mapBlogPost(post: ApiBlogPost): BlogPost {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt ?? "",
    publishedAt: toDateOnly(post.published_at),
    category: mapBlogCategory(post.category),
    author: mapBlogAuthor(post.author),
    coverImageSrc: post.featured_image_url ?? undefined,
    coverAlt: post.cover_alt ?? undefined,
    mediaLabel: post.media_label ?? post.title,
    featuredSlot: post.featured_slot ?? undefined,
    featuredOnHome: post.featured_on_home,
    readTimeMinutes: post.read_time_minutes ?? undefined,
    relatedSlugs: post.related_slugs ?? [],
    metaTitle: post.meta_title ?? undefined,
    metaDescription: post.meta_description ?? undefined,
    content: mapBlogArticleContent(post.content),
  };
}

export function mapPage<TContent>(page: ApiPage<TContent>): PageRecord<TContent> {
  return {
    id: page.id,
    title: page.title,
    slug: page.slug,
    content: page.content,
    metaTitle: page.meta_title ?? undefined,
    metaDescription: page.meta_description ?? undefined,
    ogImageUrl: page.og_image_url ?? undefined,
    isPublished: page.status === "published" || page.is_published === true,
    createdAt: page.created_at,
    updatedAt: page.updated_at,
  };
}

function mapNavigationItem(item: ApiNavigationItem): NavigationItem {
  return {
    id: item.id,
    title: item.title,
    url: item.url,
    description: item.description ?? undefined,
    kind: item.kind,
    order: item.order,
    isActive: item.status === "published" || item.is_active === true,
    parentId: item.parent_id ?? null,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
    children: item.children.map(mapNavigationItem),
  };
}

export function mapTestimonial(testimonial: ApiTestimonial): Testimonial {
  return {
    id: testimonial.id,
    eyebrow: testimonial.eyebrow ?? "",
    headline: testimonial.headline ?? "",
    support: testimonial.support ?? "",
    quote: testimonial.content,
    name: testimonial.author,
    role: testimonial.author_role ?? "",
    initials: testimonial.initials ?? "",
  };
}

export function mapSiteSetting<TValue>(
  setting: ApiSiteSetting<TValue>
): SiteSetting<TValue> {
  return {
    id: setting.id,
    key: setting.key,
    value: setting.value,
    createdAt: setting.created_at,
    updatedAt: setting.updated_at,
  };
}
