/**
 * FASTAPI BACKEND ENDPOINTS USED BY THIS COMPONENT:
 * ──────────────────────────────────────────────────
 * Blog Posts (via parent page → blogService → useBlogPosts hook):
 *   GET    /api/v1/blog/posts                 — List blog posts (public, published only)
 *     Query params: page, limit, featured_on_home, sort
 *   GET    /api/v1/blog/posts/{slug}          — Get single blog post by slug (public)
 *
 * Blog Categories:
 *   GET    /api/v1/blog/categories            — List blog categories (public)
 *
 * PostgreSQL Tables:
 *   blog_posts — id, slug, title, excerpt, published_at, featured_on_home,
 *                category_id, author_id, cover_image_url, media_label
 *   blog_categories — id, label, description, slug
 *   blog_authors — id, name, slug, role, avatar_url
 *
 * This component displays featured blog posts filtered by featuredOnHome=true,
 * sorted by publishedAt (newest first), limited to 4 posts.
 *
 * See: src/exxonim/services/blogService.ts for full endpoint documentation.
 */

import { useCallback, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { resourceArticlePath, routes } from "@/exxonim/routes";
import type { BlogPost, HomeInsightsContent } from '@/exxonim/types';
import { formatBlogDate, getAuthorInitials } from "@/exxonim/utils/blog";
import { Container } from "./primitives/Container";
import { Button } from "./primitives/Button";
import { SmartLink } from "./primitives/SmartLink";

/**
 * Homepage "Latest insights" section — up to 4 featured blog cards in a
 * single-row horizontal rail.
 *
 * BACKEND / ADMIN INTEGRATION NOTES:
 * ──────────────────────────────────
 * Which posts appear here is controlled by `featuredOnHome` on each BlogPost.
 * The selection logic lives in `getHomeBlogPosts()` (utils/blog.ts):
 *   1. Filter posts where `featuredOnHome === true`.
 *   2. Sort by `publishedAt` (newest first).
 *   3. Take up to 4 posts.
 *   4. If none are featured, the homepage falls back to the 4 newest posts.
 *
 * LAYOUT BEHAVIOUR:
 *   - Single-row rail — cards NEVER wrap.
 *   - Desktop (xl+): rail spans full viewport, cards are centred with
 *     justify-center. All 4 visible at once. Arrow buttons hidden (no scroll).
 *   - Mobile/tablet (<xl): same card size, rail scrolls horizontally with
 *     snap. Users can swipe or tap ← → arrows.
 *   - Card width: clamp(260px,22vw,360px) — sized so 4 fit on ≥1280px.
 *     Mobile cards: min(84vw, 360px) for comfortable swipe width.
 *
 * ADMIN — HOW MANY POSTS TO FEATURE:
 *   - 4 posts = full row on desktop. Best visual balance.
 *   - 3 posts = centred with space on the right. Still clean.
 *   - 2 posts = centred but sparse. Add a third.
 *   - 1 post = not recommended.
 *
 * DATABASE:
 *   ALTER TABLE blog_posts ADD COLUMN featured_on_home BOOLEAN DEFAULT FALSE;
 *   CREATE INDEX idx_blog_posts_featured_on_home
 *     ON blog_posts(featured_on_home) WHERE featured_on_home = TRUE;
 *
 * API:
 *   GET /api/v1/blog/posts?featured_on_home=true&limit=4&sort=-published_at
 *   Or: filter client-side from the full posts list (current approach).
 */

interface InsightsSectionProps {
  content: HomeInsightsContent;
  posts: BlogPost[];
  railRef: React.RefObject<HTMLDivElement>;
  onPrev: () => void;
  onNext: () => void;
}

function Tag({ label }: { label: string }) {
  return (
    <span className="absolute left-[14px] top-[14px] z-[2] inline-flex min-h-[28px] items-center rounded-full bg-accent px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-accent-contrast shadow-sm">
      {label}
    </span>
  );
}



function renderMedia(post: BlogPost, categoryLabel?: string) {
  if (post.coverImageSrc) {
    return (
      <>
        {categoryLabel ? <Tag label={categoryLabel} /> : null}
        <img
          className="img-placeholder h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
          src={post.coverImageSrc}
          alt={post.coverAlt ?? post.title}
          width={360}
          height={225}
          loading="lazy"
        />
      </>
    );
  }

  return (
    <>
      {categoryLabel ? <Tag label={categoryLabel} /> : null}
      <div className="relative flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_15%_18%,var(--color-accent-soft-strong),transparent_28%),radial-gradient(circle_at_88%_82%,var(--color-surface-elevated),transparent_24%),linear-gradient(150deg,var(--color-accent-soft),var(--color-page-strong))]">
        <span
          aria-hidden="true"
          className="absolute right-4 top-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-accent-contrast/20 bg-accent-contrast/30 text-xl font-bold tracking-tight text-accent-contrast/90"
        >
          E
        </span>
        <span
          aria-hidden="true"
          className="absolute left-5 top-16 h-4 w-28 rounded-full bg-accent-contrast/15"
        />
        <span
          aria-hidden="true"
          className="absolute left-5 top-[88px] h-4 w-20 rounded-full bg-accent-contrast/15"
        />
      </div>
    </>
  );
}

function RailButton({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Button
      size="icon"
      variant="secondary"
      className="!w-12 !h-12 xl:hidden"
      onClick={onClick}
      aria-label={label}
    >
      {children}
    </Button>
  );
}

export function InsightsSection({
  content,
  posts,
  railRef,
  onPrev,
  onNext,
}: InsightsSectionProps) {
  return (
    <section
      id="resources"
      aria-label="Latest insights and articles"
      className="relative overflow-clip py-16 md:py-24"
    >
      <span id="blogs" aria-hidden="true" className="block h-0" />
      <Container className="grid gap-7">
        {/* ── Section header ── */}
        <div className="grid gap-3.5" data-reveal>
          <h2 className="m-0 text-[clamp(1.5rem,4vw,2.5rem)] font-semibold leading-tight tracking-tight text-text">
            {content.title}
          </h2>
          <p className="m-0 max-w-[34rem] text-sm leading-relaxed text-text-muted">
            {content.intro}
          </p>
        </div>

        {/* ── Horizontal rail (full-viewport breakout) ──
         * Breaks out of Container so cards can centre across the full viewport.
         * Desktop (xl+): justify-center centres all 4 cards.
         * Mobile: scrollable with snap + arrow buttons. */}
        <div className="full-bleed overflow-x-clip" data-reveal>
          <div
            ref={railRef}
            className="flex gap-5 overflow-x-auto pl-[clamp(24px,5vw,48px)] pr-[clamp(24px,5vw,48px)] py-2 [scrollbar-width:none] [scroll-snap-type:x_mandatory] [scroll-padding-left:clamp(24px,5vw,48px)] [overscroll-behavior-x:contain] [&::-webkit-scrollbar]:hidden xl:justify-center xl:px-0"
          >
            {posts.map((post) => {
              const categoryLabel = post.category?.label;
              const metaParts = [formatBlogDate(post.publishedAt)];
              if (post.readTimeMinutes) metaParts.push(`${post.readTimeMinutes} min read`);

              return (
                <article
                  key={post.slug}
                  className="group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border-soft bg-surface transition-all duration-200 hover:-translate-y-1 hover:border-border-strong [scroll-snap-align:start] flex-[0_0_clamp(260px,22vw,360px)] max-xl:flex-[0_0_min(78vw,320px)]"
                >
                  <div
                    className="relative isolate aspect-[16/10] overflow-hidden after:pointer-events-none after:absolute after:inset-0 after:bg-gradient-to-b after:from-transparent after:from-30% after:to-overlay/50 bg-[radial-gradient(circle_at_top_right,var(--color-accent-soft-strong),transparent_48%),linear-gradient(160deg,var(--color-page-strong),var(--color-accent-soft-strong))]"
                  >
                    {renderMedia(post, categoryLabel)}
                  </div>

                  <div className="flex flex-1 flex-col bg-surface p-5 pb-4 max-md:p-4">
                    <span className="mb-3 text-xs font-bold uppercase tracking-[0.09em] text-text-soft">
                      {metaParts.join(" | ")}
                    </span>
                    <h3 className="m-0 mb-2 text-[clamp(1.05rem,1.4vw,1.3rem)] font-semibold leading-tight tracking-tight text-text">
                      {post.title}
                    </h3>
                    <p className="m-0 text-sm leading-relaxed text-text-muted line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="mt-auto flex items-center justify-between gap-3 pt-4 max-md:flex-col max-md:items-start max-md:gap-2">
                      {post.author ? (
                        <div className="inline-flex min-w-0 items-center gap-2.5">
                          <span
                            aria-hidden="true"
                            className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-accent/15 to-accent/30 text-xs font-bold tracking-wide text-text"
                          >
                            {getAuthorInitials(post.author.name)}
                          </span>
                          <span className="grid min-w-0 gap-[2px]">
                            <span className="truncate text-xs font-bold text-text">
                              {post.author.name}
                            </span>
                            {post.author.role ? (
                              <span className="truncate text-[11px] text-text-soft">
                                {post.author.role}
                              </span>
                            ) : null}
                          </span>
                        </div>
                      ) : null}

                      <SmartLink
                        href={resourceArticlePath(post.slug)}
                        className="inline-flex items-center gap-2 min-h-10 py-1.5 relative before:absolute before:-top-2 before:-bottom-2 before:left-0 before:right-0 whitespace-nowrap text-sm font-bold text-accent transition-colors hover:text-accent-hover"
                      >
                        Learn more
                        <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-[3px]">
                          &rarr;
                        </span>
                      </SmartLink>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* ── Section footer ── */}
        <div className="flex items-center justify-between gap-3" data-reveal>
          <p className="m-0 text-sm leading-relaxed text-text-soft max-sm:hidden">
            {content.footer_copy}
          </p>
          <div className="inline-flex items-center gap-3">
            <RailButton onClick={onPrev} label="Previous insight">
              <ArrowLeft className="h-5 w-5" />
            </RailButton>
            <RailButton onClick={onNext} label="Next insight">
              <ArrowRight className="h-5 w-5" />
            </RailButton>
            <Button size="standard" variant="outline" href={routes.resources}>
              See more
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
