import { useCallback, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { resourceArticlePath, routes } from "@/exxonim/routes";
import type { BlogPost, HomeInsightsContent } from '@/exxonim/types';
import { formatBlogDate, getAuthorInitials } from "@/exxonim/utils/blog";
import { Container } from "./primitives/Container";
import { Button } from "./primitives/Button";

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
    <span className="absolute left-[18px] top-[18px] z-[2] inline-flex min-h-[32px] items-center rounded-full border border-accent-contrast/20 bg-accent-contrast/30 px-3.5 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-accent-contrast/90">
      {label}
    </span>
  );
}

function MediaOverlay({ category, label }: { category?: string; label: string }) {
  return (
    <div className="absolute inset-x-[18px] bottom-[18px] z-[2] grid gap-2 text-accent-contrast/90">
      {category ? (
        <span className="text-[0.76rem] font-semibold uppercase tracking-[0.08em] text-accent-contrast/75">
          {category}
        </span>
      ) : null}
      <strong className="text-base font-bold leading-snug">{label}</strong>
    </div>
  );
}

function renderMedia(post: BlogPost, categoryLabel?: string) {
  if (post.coverImageSrc) {
    return (
      <>
        {categoryLabel ? <Tag label={categoryLabel} /> : null}
        <img
          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
          src={post.coverImageSrc}
          alt={post.coverAlt ?? post.title}
          loading="lazy"
        />
        <MediaOverlay category={categoryLabel} label={post.mediaLabel || post.title} />
      </>
    );
  }

  return (
    <>
      {categoryLabel ? <Tag label={categoryLabel} /> : null}
      <div className="relative flex h-full w-full items-end p-6 bg-[radial-gradient(circle_at_15%_18%,var(--color-accent-soft-strong),transparent_28%),radial-gradient(circle_at_88%_82%,var(--color-surface-elevated),transparent_24%),linear-gradient(150deg,var(--color-accent-soft),var(--color-page-strong))]">
        <span
          aria-hidden="true"
          className="absolute right-[22px] top-[22px] inline-flex h-14 w-14 items-center justify-center rounded-[18px] border border-accent-contrast/20 bg-accent-contrast/30 text-2xl font-bold tracking-tight text-accent-contrast/90"
        >
          E
        </span>
        <span
          aria-hidden="true"
          className="absolute left-6 top-[72px] h-[18px] w-[132px] rounded-full bg-accent-contrast/15"
        />
        <span
          aria-hidden="true"
          className="absolute left-6 top-[104px] h-[18px] w-[86px] rounded-full bg-accent-contrast/15"
        />
        <div className="relative z-[1] grid max-w-[70%] gap-2.5 text-accent-contrast/90">
          {categoryLabel ? (
            <span className="text-[0.76rem] font-semibold uppercase tracking-[0.08em] text-accent-contrast/75">
              {categoryLabel}
            </span>
          ) : null}
          <strong className="text-base font-bold leading-snug">
            {post.mediaLabel || post.title}
          </strong>
        </div>
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
      className="relative overflow-clip py-[clamp(80px,10vw,124px)]"
    >
      <span id="blogs" aria-hidden="true" className="block h-0" />
      <Container className="grid gap-7">
        {/* ── Section header ── */}
        <div className="grid gap-3.5" data-reveal>
          <h2 className="m-0 text-[clamp(1.9rem,4vw,3rem)] font-medium leading-none tracking-tight text-text">
            {content.title}
          </h2>
          <p className="m-0 max-w-[34rem] text-[0.98rem] leading-relaxed text-text-muted">
            {content.intro}
          </p>
        </div>

        {/* ── Horizontal rail (full-viewport breakout) ──
         * Breaks out of Container so cards can centre across the full viewport.
         * Desktop (xl+): justify-center centres all 4 cards.
         * Mobile: scrollable with snap + arrow buttons. */}
        <div className="w-screen ml-[calc(50%-50vw)] overflow-x-clip" data-reveal>
          <div
            ref={railRef}
            className="flex gap-6 overflow-x-auto px-[clamp(20px,4vw,44px)] py-2 [scrollbar-width:none] [scroll-snap-type:x_mandatory] [overscroll-behavior-x:contain] [&::-webkit-scrollbar]:hidden xl:justify-center"
          >
            {posts.map((post) => {
              const categoryLabel = post.category?.label;
              const metaParts = [formatBlogDate(post.publishedAt)];
              if (post.readTimeMinutes) metaParts.push(`${post.readTimeMinutes} min read`);
              if (categoryLabel) metaParts.push(categoryLabel);

              return (
                <article
                  key={post.slug}
                  className="group relative flex min-w-0 flex-col overflow-hidden rounded-[30px] border border-border-soft bg-surface transition-all duration-200 hover:-translate-y-1 hover:border-border-strong [scroll-snap-align:start] flex-[0_0_clamp(260px,22vw,360px)] max-xl:flex-[0_0_min(84vw,360px)] max-sm:rounded-[24px]"
                >
                  <div
                    className="relative isolate aspect-[16/10] overflow-hidden after:pointer-events-none after:absolute after:inset-0 after:bg-gradient-to-b after:from-transparent after:from-30% after:to-overlay/50 bg-[radial-gradient(circle_at_top_right,var(--color-accent-soft-strong),transparent_48%),linear-gradient(160deg,var(--color-page-strong),var(--color-accent-soft-strong))]"
                  >
                    {renderMedia(post, categoryLabel)}
                  </div>

                  <div className="flex flex-1 flex-col bg-surface p-6 pb-[22px] max-md:p-5">
                    <span className="mb-3.5 text-[0.76rem] font-bold uppercase tracking-[0.09em] text-text-soft">
                      {metaParts.join(" | ")}
                    </span>
                    <h3 className="m-0 mb-3 text-[clamp(1.15rem,1.6vw,1.45rem)] font-medium leading-tight tracking-tight text-text">
                      {post.title}
                    </h3>
                    <p className="m-0 text-[0.92rem] leading-relaxed text-text-muted line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="mt-auto flex items-center justify-between gap-4 pt-5 max-md:flex-col max-md:items-start max-md:gap-3">
                      {post.author ? (
                        <div className="inline-flex min-w-0 items-center gap-2.5">
                          <span
                            aria-hidden="true"
                            className="inline-flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-accent/15 to-accent/30 text-[0.78rem] font-bold tracking-wide text-text"
                          >
                            {getAuthorInitials(post.author.name)}
                          </span>
                          <span className="grid min-w-0 gap-[2px]">
                            <span className="truncate text-[0.85rem] font-bold text-text">
                              {post.author.name}
                            </span>
                            {post.author.role ? (
                              <span className="truncate text-[0.74rem] text-text-soft">
                                {post.author.role}
                              </span>
                            ) : null}
                          </span>
                        </div>
                      ) : null}

                      <a
                        href={resourceArticlePath(post.slug)}
                        className="inline-flex items-center gap-2 whitespace-nowrap text-[0.88rem] font-bold text-accent transition-colors hover:text-accent-hover"
                      >
                        Learn more
                        <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-[3px]">
                          &rarr;
                        </span>
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* ── Section footer ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 max-sm:flex-col max-sm:items-start" data-reveal>
          <p className="m-0 text-[0.95rem] leading-relaxed text-text-soft">
            {content.footer_copy}
          </p>
          <div className="inline-flex items-center gap-3">
            <RailButton onClick={onPrev} label="Previous insight">
              <ArrowLeft className="h-5 w-5" />
            </RailButton>
            <RailButton onClick={onNext} label="Next insight">
              <ArrowRight className="h-5 w-5" />
            </RailButton>
            <Button size="standard" variant="primary" href={routes.resources}>
              See more
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
