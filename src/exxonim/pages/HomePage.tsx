import { useCallback, useRef } from "react";
import { InsightsSection } from "@/exxonim/components/InsightsSection";
import { LoadBoundary } from "@/exxonim/components/LoadBoundary";
import { NewsletterSection } from "@/exxonim/components/NewsletterSection";
import { ProviderSection } from "@/exxonim/components/ProviderSection";
import { ReferenceHero } from "@/exxonim/components/ReferenceHero";
import { ServicePackagesSection } from "@/exxonim/components/ServicePlansSection";
import { StackSection } from "@/exxonim/components/StackSection";
import { StructuredData } from "@/exxonim/components/StructuredData";
import { useBlogPosts } from "@/exxonim/hooks/useBlogPosts";
import { usePage } from "@/exxonim/hooks/usePage";
import { useResolvedPageSeo } from "@/exxonim/hooks/useResolvedSeo";
import { routes } from "@/exxonim/routes";
import { getHomeBlogPosts } from "@/exxonim/utils/blog";
import type { HomePageContent } from '@/exxonim/types';

/**
 * Homepage — the primary landing page for Exxonim.
 *
 * BACKEND / ADMIN INTEGRATION NOTES (Blog articles on homepage):
 * ─────────────────────────────────────────────────────────────
 * The "Latest insights" section shows up to 4 blog posts in a
 * single-row horizontal rail.
 *
 * SELECTION LOGIC (see utils/blog.ts → getHomeBlogPosts):
 *   1. Filter all blog posts where `featuredOnHome === true`.
 *   2. Sort by `publishedAt` (newest first).
 *   3. Take up to 4 posts.
 *   4. If NO posts have `featuredOnHome === true`, fall back to the
 *      4 newest posts (so the section is never empty).
 *
 * ADMIN CONSIDERATIONS:
 *   - The admin panel should have a "Feature on homepage" toggle on each
 *     blog post edit form. This sets the `featured_on_home` column.
 *   - Recommended: feature exactly 4 posts for the best visual balance.
 *     Fewer than 3 looks sparse; more than 4 is not shown (hard cap).
 *   - On desktop (xl+): all 4 cards fit in one centred row — no scroll.
 *   - On mobile/tablet: cards are the same size, rail scrolls horizontally
 *     with ← → arrow buttons and swipe/touch support.
 *   - The "See more" button links to the Resources/Blog page where all
 *     posts are listed with pagination.
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

export function HomePage() {
  const railRef = useRef<HTMLDivElement>(null);
  const {
    data: page,
    isPending: pagePending,
    error: pageError,
  } = usePage<HomePageContent>("home");
  const { data: blogPosts = [] } = useBlogPosts();

  useResolvedPageSeo(page, routes.home);

  /* Select up to 4 featured posts for the homepage insights rail.
     Priority: posts explicitly marked as featuredOnHome.
     Fallback: 4 newest posts if none are featured. */
  const homePosts = getHomeBlogPosts(blogPosts);
  const featuredPosts = homePosts.length > 0 ? homePosts : blogPosts.slice(0, 4);

  const scrollRail = useCallback((direction: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({
      left: direction * Math.min(rail.clientWidth * 0.85, 420),
      behavior: "smooth",
    });
  }, []);

  return (
    <LoadBoundary
      error={pageError}
      errorDetail="The homepage content could not be loaded right now."
      errorTitle="Unable to load the homepage."
      isPending={pagePending}
      isReady={Boolean(page)}
      loadingLabel="Loading homepage..."
    >
      {() => {
        const homeContent = page?.content;
        if (!homeContent) return null;

        return (
        <>
        <StructuredData
          heroTitle={homeContent.hero.title}
          heroDescription={homeContent.hero.description}
        />
        <ReferenceHero content={homeContent.hero} />
        {homeContent.provider_section && (
          <ProviderSection content={homeContent.provider_section} />
        )}
        {homeContent.stack_section && (
          <StackSection
            items={homeContent.stack_section.items}
            defaultFeatureRows={homeContent.stack_section.default_feature_rows}
            featureVisualContentMap={homeContent.stack_section.feature_visual_content}
          />
        )}
        <ServicePackagesSection />
        {homeContent.insights_section && featuredPosts.length > 0 ? (
          <InsightsSection
            content={homeContent.insights_section}
            posts={featuredPosts}
            railRef={railRef}
            onPrev={() => scrollRail(-1)}
            onNext={() => scrollRail(1)}
          />
        ) : null}
        <NewsletterSection
          heading="Stay ahead on compliance"
          description="Regulatory changes and practical guides for your business in Tanzania — delivered to your inbox. No spam, just what matters."
        />
        </>
        );
      }}
    </LoadBoundary>
  );
}
