import { ArrowRight, Phone } from "lucide-react";
import { ServiceCatalogSection } from "@/exxonim/components/service-catalog";
import { UnifiedCtaSection } from "@/exxonim/components/UnifiedCtaSection";
import { Button } from "@/exxonim/components/primitives/Button";
import { ServicePackagesSection } from "@/exxonim/components/ServicePlansSection";
import { usePage } from "@/exxonim/hooks/usePage";
import { useResolvedPageSeo } from "@/exxonim/hooks/useResolvedSeo";
import { routes } from "@/exxonim/routes";
import type { ServicesPageContent } from '@/exxonim/types';
import { StructuredData } from '@/exxonim/components/StructuredData';

/**
 * Services page — concise 3-section layout:
 *   1. Compact hero + Service Catalog (merged)
 *   2. Packages (admin/DB-driven)
 *   3. Final CTA
 *
 * NO FULL-PAGE LOADER: The usePage hook guarantees fallback data via
 * the Fallback Guarantee pattern (data: query.data ?? fallback).
 * Pages render instantly with cached/fallback content while the API
 * refreshes in the background.
 */
export function ServicesPage() {
  const { data: page } = usePage<ServicesPageContent>("services");
  useResolvedPageSeo(page, routes.services);

  if (!page) return null;

  return (
    <>
      <StructuredData heroTitle={page.content.overview.title} heroDescription={page.content.overview.description} breadcrumbs={[{ name: 'Services', path: routes.services }]} />

      {/* 1. Compact hero + Catalog */}
      <ServiceCatalogSection
        heroEyebrow={page.content.overview.eyebrow}
        heroTitle={page.content.overview.title}
      />

      {/* 2. Packages — admin/DB-driven */}
      <ServicePackagesSection variant="page" />

      {/* 3. Final CTA */}
      <UnifiedCtaSection heading="Ready to get started?">
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
  );
}
