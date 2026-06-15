/**
 * Resource Article Detail Page — Wide reading layout with right-side TOC.
 *
 * ═══════════════════════════════════════════════════════════════════
 * LAYOUT:
 * ─────────
 * ┌───────────────────────────────────────────────────────────────┐
 * │  ← Back to Resources                                          │
 * ├────────────────────────────────────────────┬──────────────────┤
 * │  ARTICLE (wide, left-aligned)             │  Share           │
 * │  [Category badge]                         │  [𝕏] [in] [🔗]  │
 * │  Title (h1)                               │                  │
 * │  Meta: Author · Read · Date               │  In this article │
 * │  ┌──────────────────────────────────┐      │  | Section 1 ←   │
 * │  │ Hero Image (slight rounding)     │      │    Section 2     │
 * │  └──────────────────────────────────┘      │    Section 3     │
 * │  Article Body                              │                  │
 * │  • Lead paragraph                          │  (TOC vertically │
 * │  • H2 subheadings (with IDs for TOC)       │   centered in    │
 * │  • Inline images (real dims, NO rounding)  │   viewport       │
 * │  • Pull quote                              │   height)        │
 * │  ── Tags: [tag] [tag] [tag] [tag] ──       │                  │
 * ├────────────────────────────────────────────┴──────────────────┤
 * │ [Related Card 1]                        [Related Card 2]      │
 * │ LEFT EDGE                               RIGHT EDGE            │
 * ├───────────────────────────────────────────────────────────────┤
 * │  NEWSLETTER CARD (full-width)                                  │
 * │  CTA BANNER (compact, accent-tinted)                           │
 * └───────────────────────────────────────────────────────────────┘
 *
 * ═══════════════════════════════════════════════════════════════════
 * BACKEND / ADMIN INTEGRATION NOTES:
 * ──────────────────────────────────
 * 1. Article content comes from the blog posts API.
 *    - `post.content.html`: Rich-text HTML body (preferred).
 *    - `post.content.sections[]`: Structured sections fallback.
 *    - `post.content.introduction`: Lead paragraph.
 *
 * 2. TABLE OF CONTENTS (TOC):
 *    Auto-generated from <h2> tags in the article HTML body.
 *    No manual TOC management needed — the frontend extracts
 *    headings and injects scrollable IDs automatically.
 *    The TOC is vertically centered in the viewport height
 *    and uses an IntersectionObserver scrollspy to highlight
 *    the currently-visible section with a vertical accent line.
 *    BACKEND: Ensure the CMS rich-text editor produces proper
 *    <h2> heading hierarchy.
 *
 * 3. COVER IMAGE (post.coverImageSrc):
 *    - Displayed with slight rounding (rounded-lg).
 *    - BACKEND: Admin should recommend 16:9 aspect ratio,
 *      min 1200×675px, WebP format preferred.
 *
 * 4. INLINE IMAGES (inside article HTML body):
 *    - Rendered at their natural/intrinsic dimensions.
 *    - NO border-radius (no rounding) — editorial, raw feel.
 *    - Max-width capped at the text column width.
 *
 * 5. TAGS:
 *    Derived from `post.category.label` + `post.content.highlights[]`.
 *    Max 4 tags displayed with "Tags:" label prefix.
 *    BACKEND: The highlights array should contain short phrases
 *    (max 30 chars each). Longer highlights are truncated to
 *    the first 3 words.
 *
 * 6. AUTHOR (post.author):
 *    - `name`: Required for the author card.
 *    - `role`: Optional, shown below the name.
 *    - `avatarSrc`: Optional, falls back to initials badge.
 *
 * 7. SEO:
 *    - `useResolvedBlogSeo(post)` handles meta tags.
 *    - `ArticleStructuredData` renders JSON-LD for Google rich results.
 *    - BACKEND: Ensure `publishedAt` is ISO 8601 date string.
 *
 * 8. RELATED ARTICLES:
 *    - `post.relatedSlugs[]` takes priority if provided.
 *    - Fallback: same-category posts, newest first.
 *    - DISPLAY: Two cards at the bottom of the page — one at
 *      the LEFT edge, one at the RIGHT edge. Both have the
 *      same design (horizontal: image LEFT, content RIGHT).
 *      Reduced border-radius, reduced height, wider.
 *
 * DATABASE:
 *   -- Tags are derived, not stored. No schema changes needed.
 *   -- Consider adding a `toc_visible` boolean to blog_posts
 *   -- if admin wants per-article TOC visibility control.
 *   ALTER TABLE blog_posts ADD COLUMN toc_visible BOOLEAN DEFAULT TRUE;
 * ═══════════════════════════════════════════════════════════════════
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { Home, Sparkles } from "lucide-react";
import { Breadcrumb } from "@/exxonim/components/Breadcrumb";
import { ErrorMessage } from "@/exxonim/components/ErrorMessage";
import { UnifiedCtaSection } from "@/exxonim/components/UnifiedCtaSection";
import { NewsletterForm } from "@/exxonim/components/NewsletterForm";
import { ReadingProgressBar } from "@/exxonim/components/ReadingProgressBar";
import { useBlogPost } from "@/exxonim/hooks/useBlogPost";
import { useBlogPosts } from "@/exxonim/hooks/useBlogPosts";
import { usePage } from "@/exxonim/hooks/usePage";
import { useResolvedBlogSeo } from "@/exxonim/hooks/useResolvedSeo";
import { resourceArticlePath, routes } from "@/exxonim/routes";
import type { BlogPost, ResourcesPageContent } from '@/exxonim/types';
import { siteOrigin } from "@/exxonim/seo/constants";
import { Button } from "@/exxonim/components/primitives/Button";
import { SmartLink } from "@/exxonim/components/primitives/SmartLink";

/** Renders BlogPosting JSON-LD structured data for Google rich results. */
function ArticleStructuredData({ post }: { post: BlogPost }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImageSrc ? `${siteOrigin}${post.coverImageSrc}` : undefined,
    datePublished: post.publishedAt,
    author: post.author
      ? {
          "@type": "Person",
          name: post.author.name,
          jobTitle: post.author.role,
        }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: "Exxonim Consult",
      url: siteOrigin,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteOrigin}/resources/${post.slug}/`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
import {
  getBlogArticleIntro,
  getRelatedBlogPosts,
  getRenderableBlogHtml,
  getRenderableBlogSections,
  hasUsableBlogBody,
  extractTocFromHtml,
  extractTocFromSections,
  type TocItem,
} from "@/exxonim/utils/blog";

/* ── Helpers ── */
function formatBlogDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}


/* ── Table of Contents Sidebar ──────────────────────────────
 * Clean, minimal vertical navigation.
 * Active item highlighted with accent color + vertical line indicator.
 * Clicking smooth-scrolls to the heading.
 *
 * SCROLLSPY: An IntersectionObserver in the parent component
 * watches all <h2> elements in the article body. When an h2
 * enters the viewport, `activeId` updates and the corresponding
 * TOC item gets a vertical accent-colored left border.
 *
 * BACKEND / ADMIN NOTE:
 * The TOC items are auto-extracted from article headings.
 * No manual management needed. If the article has fewer than
 * 2 headings, the TOC is not shown.
 */
function TableOfContents({
  items,
  title,
  activeId,
  onItemClick,
}: {
  items: TocItem[];
  title?: string;
  activeId: string | null;
  onItemClick: (id: string) => void;
}) {
  if (items.length < 2) return null;

  return (
    <section>
      {title && (
        <h4 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-text-soft mb-3">
          {title}
        </h4>
      )}
      <nav aria-label="Table of contents">
        <ol className="list-none m-0 p-0 grid gap-1.5">
          {items.map((item) => {
            const isActive = item.id === activeId;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onItemClick(item.id)}
                  className={`
                    block w-full text-left text-[0.82rem] leading-snug py-1 pl-3 border-l-2
                    transition-colors duration-200
                    ${isActive
                      ? "border-accent text-accent font-medium"
                      : "border-transparent text-text-muted hover:text-text hover:border-border-strong"
                    }
                  `}
                >
                  {item.text}
                </button>
              </li>
            );
          })}
        </ol>
      </nav>
    </section>
  );
}

/* ── Social Share Buttons ── */
function SocialShareButtons() {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* fallback */ }
  }, []);

  return (
    <div className="flex gap-3">
      {/* Twitter/X Share */}
      <Button size="icon" variant="secondary" aria-label="Share on X" onClick={() => {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(document.title);
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
      }}>
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </Button>

      {/* LinkedIn Share */}
      <Button size="icon" variant="secondary" aria-label="Share on LinkedIn" onClick={() => {
        const url = encodeURIComponent(window.location.href);
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
      }}>
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      </Button>

      {/* WhatsApp Share */}
      <Button size="icon" variant="secondary" aria-label="Share on WhatsApp" onClick={() => {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(document.title);
        window.open(`https://wa.me/?text=${text}%20${url}`, "_blank");
      }}>
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.01 2.014a9.96 9.96 0 0 0-8.52 15.11L2 22l4.985-1.465a9.961 9.961 0 1 0 5.025-18.52Zm0 18.067a8.093 8.093 0 0 1-4.14-1.134l-.297-.176-3.082.906.924-2.977-.193-.306A8.098 8.098 0 1 1 12.01 20.08Zm4.437-6.042c-.244-.122-1.439-.711-1.662-.793-.223-.081-.385-.122-.547.122-.162.244-.628.793-.77.955-.142.162-.284.183-.528.061-1.18-.56-2.072-1.1-2.884-2.522-.083-.146-.01-.223.111-.345.11-.11.244-.284.366-.427.122-.142.162-.244.244-.407.081-.162.041-.305-.02-.427-.061-.122-.547-1.32-.75-1.808-.198-.475-.399-.411-.547-.419-.142-.008-.305-.008-.468-.008-.162 0-.427.061-.65.305-.223.244-.852.833-.852 2.032s.873 2.358.995 2.522c.122.162 1.714 2.628 4.153 3.67.58.24 1.033.383 1.385.49.582.185 1.112.158 1.531.096.47-.07 1.439-.588 1.642-1.157.203-.569.203-1.056.142-1.157-.061-.101-.223-.162-.468-.284Z" />
        </svg>
      </Button>

      {/* Copy Link */}
      <Button size="icon" variant="secondary" aria-label="Copy link" onClick={handleCopyLink}>
        {copied ? (
          <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
        ) : (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
            <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
          </svg>
        )}
      </Button>
    </div>
  );
}

/* ── Single Related Article Card (Image Left, Content Right) ──
 *
 * Horizontal flex card with reduced border-radius (rounded-md),
 * reduced height, increased width. Image fills full card height
 * on the LEFT side.
 *
 * BACKEND / ADMIN NOTE:
 * Related articles come from `post.relatedSlugs[]` or same-category
 * fallback. For best results, cover images should be at least 400px
 * wide and 300px tall.
 */
function RelatedArticleCard({ post: relatedPost }: { post: BlogPost }) {
  return (
    <SmartLink
      href={resourceArticlePath(relatedPost.slug)}
      className="group flex overflow-hidden rounded-2xl border border-border-soft border-l-2 border-l-accent/60 bg-surface/50 shadow-card
                 hover:-translate-y-0.5 hover:border-accent/20 hover:shadow-accent-glow
                 transition-all duration-300"
    >
      {/* LEFT: Full-height image */}
      <div className="w-[120px] sm:w-[140px] shrink-0 overflow-hidden bg-accent/5">
        {relatedPost.coverImageSrc ? (
          <img
            src={relatedPost.coverImageSrc}
            alt={relatedPost.coverAlt ?? relatedPost.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full min-h-[90px] flex items-center justify-center
                          bg-[radial-gradient(circle_at_30%_30%,var(--color-accent-soft-strong),transparent_40%),linear-gradient(135deg,var(--color-accent-soft),var(--color-page-strong))]">
            <svg className="w-5 h-5 text-accent/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
        )}
      </div>

      {/* RIGHT: Content */}
      <div className="flex flex-col justify-center min-w-0 flex-1 p-3.5 sm:p-4">
        <h4 className="text-sm sm:text-[0.9375rem] font-semibold text-text leading-snug mb-1
                       group-hover:text-accent transition-colors line-clamp-2">
          {relatedPost.title}
        </h4>
        <p className="text-xs sm:text-sm text-text-muted leading-relaxed line-clamp-2 mb-1">
          {relatedPost.excerpt}
        </p>
        <span className="text-xs text-text-muted mt-auto">
          {formatBlogDate(relatedPost.publishedAt)}
          {relatedPost.readTimeMinutes ? ` · ${relatedPost.readTimeMinutes} min` : ""}
        </span>
      </div>
    </SmartLink>
  );
}

/* ── Bottom CTA Banner (compact) ── */
function BottomCTABanner() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pb-12">
      <div className="relative rounded-2xl overflow-hidden flex items-center px-6 sm:px-8 py-6 sm:py-8">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent/[0.10] via-accent/[0.05] to-transparent" />
        <div className="absolute inset-0 bg-surface-elevated" style={{ zIndex: -1 }} />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full">
          <div className="flex-1 min-w-0">
            <h2 className="text-base sm:text-lg font-bold text-text mb-1">
              Need help with compliance?
            </h2>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
              Get tailored support from Exxonim Consult. We respond during business hours.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5 shrink-0">
            <Button size="standard" variant="primary" href={routes.contact}>Contact Us →</Button>
            <Button size="standard" variant="secondary" href="tel:+255794689099" className="gap-1.5">📞 Call Us</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Props ── */
interface ResourceArticlePageProps {
  slug: string;
}

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════ */
export function ResourceArticlePage({ slug }: ResourceArticlePageProps) {
  const { data: post } = useBlogPost(slug);
  const { data: posts = [] } = useBlogPosts();
  const { data: resourcesPage } = usePage<ResourcesPageContent>("resources");
  useResolvedBlogSeo(post);
  const hasArticleBody = hasUsableBlogBody(post?.content);

  /* ── Scrollspy state: tracks which heading is currently in view ── */
  const [activeHeadingId, setActiveHeadingId] = useState<string | null>(null);

  /* ── Ref for the article body container (scrollspy observer target) ── */
  const articleBodyRef = useRef<HTMLDivElement>(null);

  /* ── Scrollspy: scroll-based heading tracker ──
   * On each scroll event, finds the h2 heading closest to the top
   * of the viewport (accounting for the fixed 70px header) and
   * highlights the corresponding TOC item with a vertical accent line.
   *
   * This replaces the previous IntersectionObserver approach which
   * had issues: (1) the cleanup function was returned from inside
   * setTimeout instead of useEffect, so the observer was never
   * disconnected; (2) IntersectionObserver only fires when elements
   * cross the threshold boundary, making it unreliable for tracking
   * the "current" section during continuous scrolling.
   *
   * BACKEND: No configuration needed. The observer auto-attaches
   * to h2 elements that have IDs (injected by extractTocFromHtml).
   */
  useEffect(() => {
    if (!post?.slug) return;

    const headerOffset = 88; // 60px mobile nav + 28px breathing room

    function updateActiveHeading() {
      const headings = document.querySelectorAll(".article-body h2[id]");
      if (headings.length < 2) return;

      // Find the last heading that has been scrolled past the trigger line.
      // This is the "current" section the user is reading.
      let activeId: string | null = null;

      headings.forEach((heading) => {
        const rect = heading.getBoundingClientRect();
        if (rect.top <= headerOffset) {
          // This heading has been scrolled past — it's a candidate.
          // Since we iterate in order, the last match wins (most recently passed).
          activeId = heading.id;
        }
      });

      // If no heading has been scrolled past yet (page top), default to first heading
      if (!activeId && headings.length > 0) {
        activeId = headings[0].id;
      }

      if (activeId) {
        setActiveHeadingId(activeId);
      }
    }

    // Initial check
    updateActiveHeading();

    window.addEventListener("scroll", updateActiveHeading, { passive: true });
    return () => window.removeEventListener("scroll", updateActiveHeading);
  }, [post?.slug]);

  /* ── Smooth scroll to heading when TOC item is clicked ── */
  const handleTocClick = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <>
        {!post ? null : hasArticleBody ? (
          (() => {
          const article = post.content;
          if (!article) return null;

          /* ── Extract TOC items from article headings ── */
          const rawArticleHtml = getRenderableBlogHtml(article);
          const { htmlWithIds, toc: htmlToc } = rawArticleHtml
            ? extractTocFromHtml(rawArticleHtml)
            : { htmlWithIds: "", toc: [] as TocItem[] };
          const articleSections = getRenderableBlogSections(post);
          const sectionsToc = extractTocFromSections(articleSections);

          const tocItems = htmlToc.length > 0 ? htmlToc : sectionsToc;
          const articleHtml = htmlWithIds || "";
          const introText = getBlogArticleIntro(post);
          const categoryLabel = post.category?.label;
          const relatedPosts = getRelatedBlogPosts(post, posts).slice(0, 2);

          /* ── Tags: derived from category + highlights, max 4 ──
           * BACKEND / ADMIN NOTE:
           * Tags are auto-derived from the article's category label and
           * content highlights array. They are NOT stored as a separate
           * field. If you want tag management, add a `tags` text array
           * column to blog_posts and use that instead.
           */
          const tags: string[] = [];
          if (categoryLabel) tags.push(categoryLabel);
          if (article.highlights?.length) {
            article.highlights.forEach((h) => {
              const shortTag = h.split(/\s+/).slice(0, 3).join(" ");
              if (shortTag.length <= 30 && !tags.includes(shortTag)) tags.push(shortTag);
            });
          }
          const displayTags = tags.slice(0, 4);

          const metaParts = [formatBlogDate(post.publishedAt)];
          if (post.readTimeMinutes) {
            metaParts.push(`${post.readTimeMinutes} min read`);
          }

            return (
            <div className="min-h-screen">
              <ArticleStructuredData post={post} />
              <ReadingProgressBar />

              {/* ── Breadcrumb navigation ── */}
              <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-4">
                <Breadcrumb items={[
                  { label: "Home", href: routes.home, icon: Home },
                  { label: "Resources", href: routes.resources },
                  ...(categoryLabel ? [{ label: categoryLabel, href: `${routes.resources}?category=${encodeURIComponent(categoryLabel)}` }] : []),
                  { label: post.title },
                ]} />
              </div>

              {/* ── 2-Column Grid: Article (wide, left) | Sidebar (right, sticky) ──
               *
               * LAYOUT RATIONALE:
               * The grid uses [1fr_240px] so the article column takes all available
               * space while the TOC sidebar is fixed at 240px. The article text
               * has a max-w-[56rem] (~896px) for comfortable reading width, wider
               * than before. The article stays on the LEFT side of the viewport —
               * it is NOT centered on the full screen.
               *
               * BACKEND: No layout configuration needed. The TOC auto-shows/hides
               * based on the number of h2 headings in the article (min 2 required).
               */}
              <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-8 lg:gap-12">

                  {/* ═══ LEFT: Article Content (wide) ═══ */}
                  <main className="min-w-0">
                    <div className="max-w-[56rem]">
                      {/* Category badge */}
                      {categoryLabel ? (
                        <span className="inline-block px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4
                          bg-accent/10 border border-accent/20 text-accent">
                          {categoryLabel}
                        </span>
                      ) : null}

                      {/* Article Title */}
                      <h1 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-bold text-text leading-tight mb-5">
                        {post.title}
                      </h1>

                      {/* Article Meta Row */}
                      <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-text-muted mb-7">
                        {post.author ? (
                          <span className="flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                              <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                            {post.author.name}
                          </span>
                        ) : null}
                        {post.readTimeMinutes ? (
                          <span className="flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {post.readTimeMinutes} min read
                          </span>
                        ) : null}
                        <span className="flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                          </svg>
                          {metaParts[0]}
                        </span>
                      </div>

                      {/* Featured / Cover Image
                       *  - Slight rounding (rounded-lg) for the hero image.
                       *  - BACKEND: Recommend 16:9 aspect ratio, min 1200×675px, WebP.
                       */}
                      <div className="relative w-full rounded-lg overflow-hidden mb-8">
                        {post.coverImageSrc ? (
                          <>
                            <img
                              src={post.coverImageSrc}
                              alt={post.coverAlt ?? post.title}
                              className="w-full h-[250px] sm:h-[350px] lg:h-[460px] object-cover"
                              loading="eager"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                          </>
                        ) : (
                          <div className="w-full h-[250px] sm:h-[350px] lg:h-[460px] flex items-center justify-center bg-[radial-gradient(circle_at_15%_18%,var(--color-accent-soft-strong),transparent_28%),radial-gradient(circle_at_88%_82%,var(--color-surface-elevated),transparent_24%),linear-gradient(150deg,var(--color-accent-soft),var(--color-page-strong))]">
                            <span className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 text-accent">
                              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                              </svg>
                            </span>
                          </div>
                        )}
                      </div>

                      {/* ── Article Body ──
                       *
                       * INLINE IMAGE RULES:
                       *   - Images render at NATURAL dimensions. No forced aspect ratio.
                       *   - NO border-radius (no rounding) — editorial, raw feel.
                       *   - max-width: 100% so they never exceed the text column.
                       *
                       * HEADING IDs:
                       *   - All <h2> elements get injected IDs so the TOC can link.
                       *   - BACKEND: If the CMS produces <h2 id="meaningful-slug">,
                       *     those IDs are preserved.
                       *
                       * SCROLLSPY:
                       *   - The articleBodyRef is used by the IntersectionObserver
                       *     in the useEffect above to watch h2[id] elements.
                       *   - When a heading enters the viewport, activeHeadingId
                       *     updates and the TOC highlights it with a vertical
                       *     accent line.
                       */}
                      <div className="article-body" ref={articleBodyRef} data-article-content>
                        {articleHtml ? (
                          <div
                            className="text-sm sm:text-base text-text-muted leading-relaxed max-w-none
                              [&_h2]:text-xl [&_h2]:sm:text-2xl [&_h2]:font-semibold [&_h2]:text-text [&_h2]:mt-10 [&_h2]:mb-4
                              [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-text [&_h3]:mt-8 [&_h3]:mb-3
                              [&_p]:mb-4 [&_p]:leading-relaxed
                              [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul]:space-y-2
                              [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_ol]:space-y-2
                              [&_li]:text-text-muted [&_li]:leading-relaxed
                              [&_blockquote]:my-8 [&_blockquote]:p-5 [&_blockquote]:rounded-xl [&_blockquote]:bg-accent/[0.04] [&_blockquote]:border [&_blockquote]:border-accent/15
                              [&_a]:text-accent [&_a]:font-medium [&_a]:hover:text-accent-hover [&_a]:underline [&_a]:decoration-accent/30 [&_a]:underline-offset-2
                              [&_strong]:text-text [&_strong]:font-semibold
                              [&_img]:rounded-none [&_img]:my-6 [&_img]:max-w-full [&_img]:h-auto"
                            dangerouslySetInnerHTML={{ __html: articleHtml }}
                          />
                        ) : (
                          <>
                            {/* Lead paragraph */}
                            <p className="text-base sm:text-lg text-text/85 leading-relaxed mb-6 font-medium">
                              {introText}
                            </p>

                            {/* Structured sections — each heading gets an ID for TOC linking */}
                            {articleSections.map((section, idx) => {
                              const sectionId = `section-${idx + 1}`;
                              return (
                                <section key={sectionId} id={sectionId}>
                                  <h2 className="text-xl sm:text-2xl font-semibold text-text mb-4 mt-10">
                                    {section.heading}
                                  </h2>
                                  {section.paragraphs.map((paragraph) => (
                                    <p key={paragraph} className="text-sm sm:text-base text-text-muted leading-relaxed mb-4">
                                      {paragraph}
                                    </p>
                                  ))}
                                </section>
                              );
                            })}
                          </>
                        )}
                      </div>

                      {/* ── Tags (bottom of article, max 4, with "Tags:" label) ──
                       * BACKEND / ADMIN NOTE:
                       * Tags are auto-derived from category label + highlights.
                       * For manual tag management, add a `tags` column to blog_posts:
                       *   ALTER TABLE blog_posts ADD COLUMN tags TEXT[] DEFAULT '{}';
                       */}
                      {displayTags.length > 0 ? (
                        <div className="mt-10">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-semibold uppercase tracking-wider text-text-muted mr-1">
                              Tags:
                            </span>
                            {displayTags.map((tag) => (
                              <span key={tag}
                                className="px-3 py-1.5 rounded-full text-xs font-medium border border-border-soft
                                           bg-surface/50 text-text-muted hover:bg-accent-soft
                                           hover:border-accent/20 hover:text-accent
                                           transition-all duration-200 cursor-default"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : null}

                      {/* ── Author card removed ──
                       * The author card (EO / Exxonim Operations / Compliance Lead)
                       * has been intentionally removed from the article page.
                       * Author info is still available in the article meta row above.
                       * BACKEND: If author cards are needed in the future, re-enable
                       * using post.author data (name, role, avatarSrc).
                       */}
                    </div>
                  </main>

                  {/* ═══ RIGHT: Sidebar (sticky, below fixed header) ═══
                   *
                   * Contains ONLY:
                   *   1. Share buttons — social sharing + copy link (ABOVE TOC).
                   *   2. Table of Contents — auto-extracted from article headings.
                   *
                   * The sidebar is sticky and positioned just below the fixed
                   * 68px navigation header (top-[84px] with padding). It fills
                   * the available viewport height minus the header offset, and
                   * scrolls internally if the TOC is longer than the viewport.
                   *
                   * SCROLLSPY: The activeId prop comes from the IntersectionObserver
                   * in the parent useEffect. When a section scrolls into view,
                   * the corresponding TOC item gets a vertical accent-colored
                   * left border (border-l-2 border-accent).
                   *
                   * BACKEND: No configuration needed. The TOC auto-generates from
                   * the article's h2 headings. If an article has < 2 headings,
                   * the TOC section is hidden but share buttons remain.
                   */}
                  <aside
                    className="hidden lg:flex flex-col gap-6 lg:sticky lg:top-[76px]
                               lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto lg:pr-2
                               [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent
                               [&::-webkit-scrollbar-thumb]:bg-border-soft [&::-webkit-scrollbar-thumb]:rounded-full"
                  >
                    {/* Share on Social Media (ABOVE TOC) */}
                    <section>
                      <h4 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-text-soft mb-3">
                        Share
                      </h4>
                      <SocialShareButtons />
                    </section>

                    {/* Table of Contents */}
                    <TableOfContents
                      items={tocItems}
                      title="In this article"
                      activeId={activeHeadingId}
                      onItemClick={handleTocClick}
                    />
                  </aside>
                </div>

                {/* ═══ Related Articles: 2 cards, one at LEFT edge, one at RIGHT edge ═══
                 *
                 * Both cards have the SAME design (horizontal: image LEFT, content RIGHT).
                 * They sit at the EDGES of the full-width container — not centered as a group.
                 * One card is at the far LEFT, one at the far RIGHT.
                 *
                 * BACKEND: `post.relatedSlugs[]` takes priority. Fallback: same-category posts.
                 */}
                {relatedPosts.length > 0 && (
                  <div className="mt-8 pt-8 border-t border-border-soft flex items-start justify-between gap-6">
                    {/* LEFT edge: First related card */}
                    {relatedPosts[0] && (
                      <div className="w-[48%] max-w-[420px]">
                        <h4 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-text-soft mb-3">
                          Continue reading
                        </h4>
                        <RelatedArticleCard post={relatedPosts[0]} />
                      </div>
                    )}

                    {/* RIGHT edge: Second related card */}
                    {relatedPosts[1] && (
                      <div className="w-[48%] max-w-[420px]">
                        <h4 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-text-soft mb-3">
                          More like this
                        </h4>
                        <RelatedArticleCard post={relatedPosts[1]} />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* ═══ NEWSLETTER CARD (full-width) ═══ */}
              <UnifiedCtaSection
                eyebrow={{ icon: <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />, text: "Stay Updated" }}
                heading="Stay updated on compliance changes"
                description="Get practical guides and regulatory updates delivered to your inbox. No spam — just what matters for your business in Tanzania."
              >
                <NewsletterForm />
              </UnifiedCtaSection>

              {/* ═══ CTA BANNER (compact) ═══ */}
              <BottomCTABanner />
            </div>
            );
          })()
        ) : (
          <ErrorMessage
            detail="This article is missing its published body content."
            title="Article content is unavailable."
          />
        )}
    </>
  );
}
