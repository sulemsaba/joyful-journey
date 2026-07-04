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
import { useResolvedPageSeo } from "@/exxonim/hooks/useResolvedSeo";
import { routes } from "@/exxonim/routes";
import { getHomeBlogPosts } from "@/exxonim/utils/blog";
import { fallbackHomePage } from "@/exxonim/content/fallbackPublicContent";

/**
 * Homepage — hero, stack cards, and provider logos are static (hardcoded).
 * Blog posts in the insights section are dynamic (API-driven).
 *
 * No API call for page content — the homepage always renders instantly
 * with the approved content from a_content.md decisions.
 */
export function HomePage() {
  const railRef = useRef<HTMLDivElement>(null);
  const { data: blogPosts = [] } = useBlogPosts();

  const homeContent = fallbackHomePage.content!;
  useResolvedPageSeo(fallbackHomePage, routes.home);

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
        heading="Get business tips and deadline reminders"
        description="Practical guides on registration, compliance, and running a business in Tanzania, delivered to your inbox. No spam."
      >
        <NewsletterForm />
      </UnifiedCtaSection>
    </>
  );
}
