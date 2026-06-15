import { useCallback, useRef } from "react";
import { InsightsSection } from "@/exxonim/components/InsightsSection";
import { UnifiedCtaSection } from "@/exxonim/components/UnifiedCtaSection";
import { NewsletterForm } from "@/exxonim/components/NewsletterForm";
import { Sparkles } from "lucide-react";
import { ReferenceHero } from "@/exxonim/components/ReferenceHero";
import { ServicePackagesSection } from "@/exxonim/components/ServicePlansSection";
import { ProviderSection } from "@/exxonim/components/ProviderSection";
import { StackSection } from "@/exxonim/components/StackSection";
import { StructuredData } from "@/exxonim/components/StructuredData";
import { useBlogPosts } from "@/exxonim/hooks/useBlogPosts";
import { usePage } from "@/exxonim/hooks/usePage";
import { useResolvedPageSeo } from "@/exxonim/hooks/useResolvedSeo";
import { routes } from "@/exxonim/routes";
import { getHomeBlogPosts } from "@/exxonim/utils/blog";
import type { HomePageContent } from '@/exxonim/types';

/**
 * Homepage — instant rendering, no full-page loader.
 *
 * The usePage hook guarantees fallback data via the Fallback Guarantee
 * pattern (data: query.data ?? fallback). The homepage renders instantly
 * with cached/fallback content while the API refreshes in the background.
 *
 * Returning visitors see cached data from localStorage immediately.
 * First-time visitors see hardcoded fallback content immediately.
 * Either way, no loader, no waiting.
 */
export function HomePage() {
  const railRef = useRef<HTMLDivElement>(null);
  const { data: page } = usePage<HomePageContent>("home");
  const { data: blogPosts = [] } = useBlogPosts();

  useResolvedPageSeo(page, routes.home);

  const homeContent = page?.content;
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
      <UnifiedCtaSection
        eyebrow={{ icon: <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />, text: "Stay Updated" }}
        heading="Stay ahead on compliance"
        description="Regulatory changes and practical guides for your business in Tanzania — delivered to your inbox. No spam, just what matters."
      >
        <NewsletterForm />
      </UnifiedCtaSection>
    </>
  );
}
