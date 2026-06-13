import { ArrowRight, Phone } from "lucide-react";
import { ServiceCatalogSection } from "@/exxonim/components/service-catalog";
import { UnifiedCtaSection } from "@/exxonim/components/UnifiedCtaSection";
import { Button } from "@/exxonim/components/primitives/Button";
import { LoadBoundary } from "@/exxonim/components/LoadBoundary";
import { ServicePackagesSection } from "@/exxonim/components/ServicePlansSection";
import { ServicesOverviewSection } from "@/exxonim/components/ServicesOverviewSection";
import { usePage } from "@/exxonim/hooks/usePage";
import { useResolvedPageSeo } from "@/exxonim/hooks/useResolvedSeo";
import { routes } from "@/exxonim/routes";
import type { ServicesPageContent } from '@/exxonim/types';
import { StructuredData } from '@/exxonim/components/StructuredData';

/**
 * Services page — the primary service listing and conversion page for Exxonim.
 *
 * PAGE STRUCTURE (4-section conversion flow):
 *   1. Hero — benefit headline + trust panel + CTA
 *   2. Service Catalog — category-filtered cards with deliverables
 *   3. Packages — testimonials + comparison plans
 *   4. Final CTA — one strong action
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
          {/* 1. Hero — benefit headline + trust panel */}
          <ServicesOverviewSection content={page.content.overview} />

          {/* 2. Service Catalog — category-filtered cards with deliverables */}
          <ServiceCatalogSection />

          {/* 3. Packages — testimonials + comparison plans */}
          <ServicePackagesSection variant="page" />

          {/* 4. Final CTA — one strong action */}
          <UnifiedCtaSection
            heading="Ready to get started?"
            description="Book a free consultation and get a tracking code to stay informed."
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
