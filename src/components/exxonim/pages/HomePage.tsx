"use client";

import { fallbackHomePage, fallbackBlogPosts } from "@/lib/exxonim-data";
import { ReferenceHero } from "@/components/exxonim/ReferenceHero";
import { ProviderSection } from "@/components/exxonim/ProviderSection";
import { StackSection } from "@/components/exxonim/StackSection";
import { ServicePlansSection as ServicePackagesSection } from "@/components/exxonim/ServicePlansSection";
import { InsightsSection } from "@/components/exxonim/InsightsSection";

export function HomePage() {
  const homeContent = fallbackHomePage.content;
  const blogPosts = fallbackBlogPosts;
  const featuredPosts = blogPosts.filter((post) => post.featuredOnHome).slice(0, 6);
  const displayPosts = featuredPosts.length > 0 ? featuredPosts : blogPosts.slice(0, 6);

  return (
    <>
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
      {homeContent.insights_section && displayPosts.length > 0 ? (
        <InsightsSection
          content={homeContent.insights_section}
          posts={displayPosts}
        />
      ) : null}
    </>
  );
}
