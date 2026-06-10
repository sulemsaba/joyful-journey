import { Home, ArrowRight, Phone } from "lucide-react";
import { Breadcrumb } from "@/exxonim/components/Breadcrumb";
import { Container } from "@/exxonim/components/primitives/Container";
import { ComplianceCalendarSection } from "@/exxonim/components/ComplianceCalendarSection";
import { ServiceCatalogSection } from "@/exxonim/components/service-catalog";
import { ExxonimApartSection } from "@/exxonim/components/ExxonimApartSection";
import { UnifiedCtaSection } from "@/exxonim/components/UnifiedCtaSection";
import { Button } from "@/exxonim/components/primitives/Button";
import { LoadBoundary } from "@/exxonim/components/LoadBoundary";
import { ProblemFramingSection } from "@/exxonim/components/ProblemFramingSection";
import { ServicePackagesSection } from "@/exxonim/components/ServicePlansSection";
import { ServicesFaqSection } from "@/exxonim/components/ServicesFaqSection";
import { ServicesOverviewSection } from "@/exxonim/components/ServicesOverviewSection";
import { usePage } from "@/exxonim/hooks/usePage";
import { useResolvedPageSeo } from "@/exxonim/hooks/useResolvedSeo";
import { routes } from "@/exxonim/routes";
import type { ServicesPageContent } from '@/exxonim/types';
import { StructuredData } from '@/exxonim/components/StructuredData';

/**
 * Services page — the primary service listing and conversion page for Exxonim.
 *
 * PAGE STRUCTURE (research-backed 10-section B2B conversion flow):
 *   1. Hero — benefit headline + trust panel + single CTA
 *   2. Problem Framing — relatable pain points
 *   3. Service Catalog — benefit-framed groups with pricing
 *   4. What Sets Us Apart — differentiators (incl. "No Office Visits")
 *   5. Compliance Calendar — quarterly deadline timeline
 *   6. Packages + Pricing — testimonials + comparison plans
 *   7. FAQ — objection handling with micro-CTAs
 *   8. Final CTA — one strong action
 *
 * EVIDENCE:
 *   - B2B pages with 5-8 structured sections convert 2-3x higher
 *   - Single CTA focus converts at 13.5% vs 10.5% for 5+ links
 *   - Personalized CTAs convert 202% better than generic (WordStream)
 *   - 70% of B2B buyers abandon if pricing is hidden
 *   - Benefit-driven copy outperforms feature listing (Digital Freak)
 */
export function ServicesPage() {
  const { data: page, isPending, error } = usePage<ServicesPageContent>("services");
  useResolvedPageSeo(page, routes.services);

  return (
    <LoadBoundary
      error={error}
      errorDetail="The services page content could not be loaded right now."
      errorTitle="Unable to load services."
      isPending={isPending}
      isReady={Boolean(page)}
      loadingLabel="Loading services..."
    >
      {() => { if (!page) return null; return (
        <>
          <StructuredData heroTitle={page.content.overview.title} heroDescription={page.content.overview.description} breadcrumbs={[{ name: 'Services', path: routes.services }]} />
          {/* Breadcrumb */}
          <Container>
            <Breadcrumb items={[{ label: "Home", href: routes.home, icon: Home }, { label: "Services" }]} />
          </Container>

          {/* 1. Hero — benefit headline + trust panel */}
          <ServicesOverviewSection content={page.content.overview} />

          {/* 2. Problem Framing — relatable pain points */}
          {page.content.problem_framing && page.content.problem_framing.length > 0 && (
            <ProblemFramingSection items={page.content.problem_framing} />
          )}

          {/* 3. Service Catalog — segment-filtered cards with deliverables */}
          <ServiceCatalogSection />

          {/* 4. What Sets Us Apart — differentiators */}
          <ExxonimApartSection />

          {/* 5. Compliance Calendar — quarterly deadline timeline */}
          <ComplianceCalendarSection />

          {/* 6. Packages + Pricing — testimonials + comparison plans */}
          <ServicePackagesSection variant="page" />

          {/* 7. FAQ — objection handling with micro-CTAs */}
          {page.content.faq && page.content.faq.length > 0 && (
            <ServicesFaqSection items={page.content.faq} />
          )}

          {/* 8. Final CTA — one strong action */}
          <UnifiedCtaSection
            heading="Ready to get started?"
            description="Book a free consultation and receive a tracking code that keeps you informed at every step."
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button size="standard" variant="primary" href={routes.contact}>
                Book a Free Consultation
                <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
              </Button>
              <Button
                size="standard"
                variant="secondary"
                href="tel:+255794689099"
              >
                <Phone className="mr-1.5 h-4 w-4" aria-hidden="true" />
                Call +255 794 689 099
              </Button>
            </div>
          </UnifiedCtaSection>
        </>
      );}}
    </LoadBoundary>
  );
}
