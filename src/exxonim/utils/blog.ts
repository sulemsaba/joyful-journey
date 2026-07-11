import type {
  BlogArticleContent,
  BlogArticleSection,
  BlogCategoryId,
  BlogPost,
} from '@/exxonim/types';

function toUtcDateValue(date: string) {
  return new Date(`${date}T00:00:00Z`).getTime();
}

/**
 * Flattens everything searchable about a post — title, excerpt, category label,
 * and the FULL article body (introduction, highlights, every section heading and
 * paragraph, plus any raw HTML with its tags stripped) — into one lowercased
 * string, so search matches terms that appear only inside the article content,
 * not just the title or excerpt.
 */
export function getBlogSearchText(post: BlogPost): string {
  const parts: string[] = [post.title ?? "", post.excerpt ?? ""];
  if (post.category?.label) parts.push(post.category.label);
  const content: BlogArticleContent | undefined = post.content;
  if (content) {
    if (content.introduction) parts.push(content.introduction);
    if (content.highlights?.length) parts.push(content.highlights.join(" "));
    for (const section of content.sections ?? []) {
      if (section.heading) parts.push(section.heading);
      if (section.paragraphs?.length) parts.push(section.paragraphs.join(" "));
    }
    if (content.html) parts.push(content.html.replace(/<[^>]+>/g, " "));
  }
  return parts.join(" ").toLowerCase();
}

/* ── Shared formatters ────────────────────────────────── */

const blogDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

/** Formats a blog publish date string (YYYY-MM-DD) into a human-readable form (e.g., "January 15, 2025"). */
export function formatBlogDate(date: string) {
  return blogDateFormatter.format(new Date(`${date}T00:00:00Z`));
}

/** Extracts initials from an author name (up to 2 words). E.g., "John Smith" → "JS". */
export function getAuthorInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

/* ── HTML sanitization ───────────────────────────────── */

function cleanText(value?: string | null) {
  return typeof value === "string" ? value.trim() : "";
}

function stripHtml(value = "") {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export function sanitizeBlogHtml(value = "") {
  return value
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/\son[a-z]+="[^"]*"/gi, "")
    .replace(/\son[a-z]+='[^']*'/gi, "")
    .replace(/javascript:/gi, "");
}

export function hasUsableBlogBody(content?: BlogArticleContent | null) {
  if (!content) {
    return false;
  }

  if (stripHtml(cleanText(content.html)).length >= 8) {
    return true;
  }

  if (cleanText(content.introduction).length >= 8) {
    return true;
  }

  return content.sections.some((section) => {
    if (cleanText(section.heading).length >= 2) {
      return true;
    }

    return section.paragraphs.some((paragraph) => cleanText(paragraph).length >= 8);
  });
}

export function getRenderableBlogHtml(content?: BlogArticleContent | null) {
  const html = cleanText(content?.html);
  return html ? sanitizeBlogHtml(html) : "";
}

export function getRenderableBlogSections(
  post: Pick<BlogPost, "excerpt" | "content">
): BlogArticleSection[] {
  const content = post.content;
  if (!content) {
    return [];
  }

  if (getRenderableBlogHtml(content)) {
    return [];
  }

  if (content.sections.length > 0) {
    return content.sections;
  }

  const introParagraphs = cleanText(content.introduction)
    .split(/\n\s*\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  if (!introParagraphs.length) {
    return [];
  }

  return [
    {
      heading: "Article",
      paragraphs: introParagraphs,
    },
  ];
}

export function getBlogArticleIntro(post: Pick<BlogPost, "excerpt" | "content">) {
  const content = post.content;
  if (!content) {
    return post.excerpt || "";
  }

  const sections = getRenderableBlogSections(post);
  if (sections.length > 0) {
    return content.sections.length > 0
      ? content.introduction
      : post.excerpt || sections[0]?.paragraphs[0] || content.introduction;
  }

  return post.excerpt || content.introduction;
}

export function comparePostsNewestFirst(left: BlogPost, right: BlogPost) {
  return toUtcDateValue(right.publishedAt) - toUtcDateValue(left.publishedAt);
}

export function getFeaturedBlogPosts(posts: BlogPost[]) {
  const slotOrder = ["hero", "popular", "editors-pick"];

  return posts
    .filter((post) => post.featuredSlot)
    .sort((left, right) => {
      const leftIndex = slotOrder.indexOf(left.featuredSlot ?? "");
      const rightIndex = slotOrder.indexOf(right.featuredSlot ?? "");

      if (leftIndex === rightIndex) {
        return comparePostsNewestFirst(left, right);
      }

      return leftIndex - rightIndex;
    });
}

export function getHomeBlogPosts(posts: BlogPost[]) {
  return posts.filter((post) => post.featuredOnHome).sort(comparePostsNewestFirst).slice(0, 4);
}

export function getVisibleBlogPosts(options: {
  posts: BlogPost[];
  categoryId?: BlogCategoryId | "all";
  limit?: number;
  excludeSlugs?: string[];
}) {
  const { posts, categoryId = "all", limit, excludeSlugs = [] } = options;
  const blockedSlugs = new Set(excludeSlugs);

  const visiblePosts = posts
    .filter((post) => {
      if (blockedSlugs.has(post.slug)) {
        return false;
      }

      if (categoryId === "all") {
        return true;
      }

      return post.category?.id === categoryId;
    })
    .sort(comparePostsNewestFirst);

  return typeof limit === "number" ? visiblePosts.slice(0, limit) : visiblePosts;
}

export function buildResourcesBlogLayout(posts: BlogPost[]) {
  const featuredPosts = getFeaturedBlogPosts(posts);
  const allPostsNewestFirst = getVisibleBlogPosts({ posts, categoryId: "all" });
  const explicitHeroPost = featuredPosts.find((post) => post.featuredSlot === "hero");
  const heroPost = explicitHeroPost ?? allPostsNewestFirst[0] ?? null;
  const prioritizedTopRailPosts = featuredPosts.filter((post) => post.slug !== heroPost?.slug);
  const fallbackTopRailPosts = allPostsNewestFirst.filter((post) => post.slug !== heroPost?.slug);
  const topRailPosts = Array.from(
    new Map(
      [...prioritizedTopRailPosts, ...fallbackTopRailPosts].map((post) => [post.slug, post])
    ).values()
  ).slice(0, 3);

  return {
    heroPost,
    topRailPosts,
    topSectionSlugs: heroPost ? [heroPost.slug, ...topRailPosts.map((post) => post.slug)] : [],
  };
}

/* ── Table of Contents extraction ───────────────────────
 * Extracts h2 headings from article HTML and injects
 * scrollable IDs so the TOC can link to them.
 *
 * BACKEND / ADMIN NOTE:
 * The TOC is auto-generated from <h2> tags in the article
 * HTML body. No manual TOC management is needed - just
 * ensure articles use proper <h2> heading hierarchy.
 *
 * For structured articles (sections-based), the headings
 * come from content.sections[].heading instead.
 */
export interface TocItem {
  id: string;
  text: string;
}

/** Counter for generating unique heading IDs across multiple calls. */
let headingCounter = 0;

/**
 * Processes raw article HTML to:
 *   1. Inject `id` attributes on all <h2> elements (for anchor linking)
 *   2. Return an array of TOC items { id, text } for sidebar navigation
 *
 * If the article already has IDs on h2 elements, those are preserved.
 * Otherwise, auto-generated IDs like `section-1`, `section-2` are added.
 *
 * BACKEND: The CMS/rich-text editor should ideally produce <h2 id="...">
 * elements with meaningful slugs. This function provides a fallback.
 */
export function extractTocFromHtml(html: string): { htmlWithIds: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  headingCounter = 0;

  // Match <h2> tags (with or without existing id attributes)
  const htmlWithIds = html.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/gi, (match, attrs, content) => {
    // Check if an id already exists
    const existingIdMatch = attrs.match(/id=["']([^"']+)["']/i);
    const id = existingIdMatch
      ? existingIdMatch[1]
      : `section-${++headingCounter}`;

    // Strip HTML from heading text for TOC display
    const text = content.replace(/<[^>]+>/g, "").trim();

    if (text) {
      toc.push({ id, text });
    }

    // If id already existed, return as-is; otherwise inject it
    if (existingIdMatch) {
      return match;
    }
    return `<h2 id="${id}"${attrs}>${content}</h2>`;
  });

  return { htmlWithIds, toc };
}

/**
 * Extracts TOC items from structured article sections.
 * Used when the article body is rendered from content.sections[]
 * instead of raw HTML.
 */
export function extractTocFromSections(
  sections: BlogArticleSection[]
): TocItem[] {
  return sections
    .filter((section) => section.heading && section.heading.trim().length >= 2)
    .map((section, index) => ({
      id: `section-${index + 1}`,
      text: section.heading.trim(),
    }));
}

export function getRelatedBlogPosts(currentPost: BlogPost, posts: BlogPost[]) {
  if (currentPost.relatedSlugs.length) {
    return currentPost.relatedSlugs
      .map((slug) => posts.find((post) => post.slug === slug))
      .filter((post): post is BlogPost => Boolean(post))
      .slice(0, 3);
  }

  return posts
    .filter(
      (post) => post.slug !== currentPost.slug && post.category?.id === currentPost.category?.id
    )
    .sort(comparePostsNewestFirst)
    .slice(0, 3);
}
