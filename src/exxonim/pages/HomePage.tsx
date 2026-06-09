import { useCallback, useRef } from "react";
import { InsightsSection } from "@/exxonim/components/InsightsSection";
import { LoadBoundary } from "@/exxonim/components/LoadBoundary";
import { HomePageSkeleton } from "@/exxonim/components/LoadBoundary";
import { NewsletterSection } from "@/exxonim/components/NewsletterSection";
import { ReferenceHero } from "@/exxonim/components/ReferenceHero";
import { ServicePackagesSection } from "@/exxonim/components/ServicePlansSection";
import { ProviderSection } from "@/exxonim/components/ProviderSection";
import { ServiceCatalogSection } from "@/exxonim/components/service-catalog";
import { StackSection } from "@/exxonim/components/StackSection";
import { StructuredData } from "@/exxonim/components/StructuredData";
import { useBlogPosts } from "@/exxonim/hooks/useBlogPosts";
import { usePage } from "@/exxonim/hooks/usePage";
import { useResolvedPageSeo } from "@/exxonim/hooks/useResolvedSeo";
import { routes } from "@/exxonim/routes";
import { getHomeBlogPosts } from "@/exxonim/utils/blog";
import type { HomePageContent } from '@/exxonim/types';

export function HomePage() {
  const railRef = useRef<HTMLDivElement>(null);
  const {
    data: page,
    isPending: pagePending,
    error: pageError,
  } = usePage<HomePageContent>("home");
  const { data: blogPosts = [] } = useBlogPosts();

  useResolvedPageSeo(page, routes.home);

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

  if (pagePending && !page) {
    return <HomePageSkeleton />;
  }

  return (
    <>
      <LoadBoundary
        error={pageError}
        errorDetail="The homepage content could not be loaded right now."
        errorTitle="Unable to load the homepage."
        isPending={false}
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

          {/* Service Catalog — segment-filtered cards, self-contained */}
          <ServiceCatalogSection />

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
    </>
  );
}
