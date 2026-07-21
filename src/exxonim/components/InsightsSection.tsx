/**
 * FASTAPI BACKEND ENDPOINTS USED BY THIS COMPONENT:
 * ──────────────────────────────────────────────────
 * Blog Posts (via parent page → blogService → useBlogPosts hook):
 *   GET    /api/v1/blog/posts                 - List blog posts (public, published only)
 *     Query params: page, limit, featured_on_home, sort
 *   GET    /api/v1/blog/posts/{slug}          - Get single blog post by slug (public)
 *
 * Blog Categories:
 *   GET    /api/v1/blog/categories            - List blog categories (public)
 *
 * PostgreSQL Tables:
 *   blog_posts - id, slug, title, excerpt, published_at, featured_on_home,
 *                category_id, author_id, cover_image_url, media_label
 *   blog_categories - id, label, description, slug
 *   blog_authors - id, name, slug, role, avatar_url
 *
 * This component displays featured blog posts filtered by featuredOnHome=true,
 * sorted by publishedAt (newest first), limited to 4 posts.
 *
 * See: src/exxonim/services/blogService.ts for full endpoint documentation.
 */

import { routes } from "@/exxonim/routes";
import type { BlogPost, HomeInsightsContent } from '@/exxonim/types';
import { Container } from "./primitives/Container";
import { Button } from "./primitives/Button";
import { BlogCard } from "./BlogCard";
import { useViewportPreloadMany } from "@/exxonim/hooks/useViewportPreload";

/**
 * Homepage "Latest insights" section - up to 4 featured blog cards in a
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
 *   - Single-row rail - cards NEVER wrap.
 *   - Desktop (xl+): rail spans full viewport, cards are centred with
 *     justify-center. All 4 visible at once. Arrow buttons hidden (no scroll).
 *   - Mobile/tablet (<xl): same card size, rail scrolls horizontally with
 *     snap. Users can swipe or tap ← → arrows.
 *   - Card width: clamp(240px,20vw,320px) - compact, sized so 4 fit on ≥1280px.
 *     Mobile cards: min(76vw, 300px) for comfortable swipe width.
 *
 * ADMIN - HOW MANY POSTS TO FEATURE:
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
}

export function InsightsSection({ content, posts }: InsightsSectionProps) {
  // Viewport-based preloading: when the blog section becomes visible,
  // preload the ResourceArticlePage chunk so mobile taps are instant.
  // All article slugs share the same chunk, so we only need one preload.
  // Using a 2-segment path triggers preloadRoute()'s dynamic article
  // detection, which loads loadResourceArticlePage (not loadResourcesPage).
  const sectionRef = useViewportPreloadMany(["/resources/_article"]);


  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
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
          <p className="m-0 max-w-[34rem] text-base leading-relaxed text-text-muted">
            {content.intro}
          </p>
        </div>

        {/* ── Horizontal rail (full-viewport breakout) ──
         * Breaks out of Container so cards can centre across the full viewport.
         * Desktop (xl+): justify-center centres all 4 cards.
         * Mobile: scrollable with snap + arrow buttons. */}
        <div className="full-bleed overflow-x-clip" data-reveal>
          <div
            className="flex gap-5 overflow-x-auto pl-[clamp(24px,5vw,48px)] pr-[clamp(24px,5vw,48px)] py-2 [scrollbar-width:none] [scroll-snap-type:x_mandatory] [scroll-padding-left:clamp(24px,5vw,48px)] [overscroll-behavior-x:contain] [&::-webkit-scrollbar]:hidden xl:justify-center xl:px-0"
          >
            {posts.map((post) => (
              <div
                key={post.slug}
                className="flex-[0_0_clamp(260px,20vw,340px)] max-xl:flex-[0_0_min(80vw,340px)] [scroll-snap-align:start]"
              >
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Section footer ──
         * One navigation affordance per platform: swipe moves the rail on
         * mobile, "See more" is the exit. (The old prev/next arrows were a
         * third, redundant way to move the same four cards.) */}
        <div className="flex items-center justify-between gap-3" data-reveal>
          <p className="m-0 text-sm leading-relaxed text-text-soft max-sm:hidden">
            {content.footer_copy}
          </p>
          <Button size="standard" variant="outline" href={routes.resources}>
            See more
          </Button>
        </div>
      </Container>
    </section>
  );
}
