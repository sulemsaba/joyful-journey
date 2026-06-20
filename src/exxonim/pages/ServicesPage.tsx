import { ArrowRight, Phone, Home } from "lucide-react";
import { ServiceCatalogSection } from "@/exxonim/components/service-catalog";
import { UnifiedCtaSection } from "@/exxonim/components/UnifiedCtaSection";
import { ServicesOverviewSection } from "@/exxonim/components/ServicesOverviewSection";
import { ServicesFaqSection } from "@/exxonim/components/ServicesFaqSection";
import { Breadcrumb } from "@/exxonim/components/Breadcrumb";
import { Button } from "@/exxonim/components/primitives/Button";
import { ServicePackagesSection } from "@/exxonim/components/ServicePlansSection";
import { usePage } from "@/exxonim/hooks/usePage";
import { useResolvedPageSeo } from "@/exxonim/hooks/useResolvedSeo";
import { routes } from "@/exxonim/routes";
import type { ServicesPageContent } from '@/exxonim/types';
import { StructuredData } from '@/exxonim/components/StructuredData';

/**
 * Services page — clean 5-section layout:
 *   1. Overview hero (description, stats, search, service nav)
 *   2. Service Catalog (card grid with category tabs)
 *   3. Packages (pricing)
 *   4. FAQ
 *   5. Final CTA
 *
 * Removed (redundant / overloaded):
 *   - Problem framing (pain points implied by services)
 *   - How it works (overlaps with tracking page)
 *   - Service promises (covered on About page differentiators)
 *   - Tracking section (belongs on Track Consultation page)
 *
 * NO FULL-PAGE LOADER: The usePage hook guarantees fallback data via
 * the Fallback Guarantee pattern (data: query.data ?? fallback).
 */
export function ServicesPage() {
  const { data: page } = usePage<ServicesPageContent>("services");
  useResolvedPageSeo(page, routes.services);

  if (!page) return null;

  const { overview, catalog, faq } = page.content;

  return (
    <>
      <StructuredData heroTitle={overview.title} heroDescription={overview.description} breadcrumbs={[{ name: 'Services', path: routes.services }]} />

      {/* Breadcrumb — matches About/Contact pattern */}
      <div className="w-[min(1240px,calc(100%-2rem))] mx-auto">
        <Breadcrumb items={[{ label: 'Home', href: routes.home, icon: Home }, { label: 'Services' }]} />
      </div>

      {/* 1. Overview hero — description, stats, search, service nav groups */}
      <ServicesOverviewSection content={overview} />

      {/* 2. Service Catalog — card grid with category tabs */}
      <ServiceCatalogSection
        heroEyebrow={catalog.eyebrow}
        heroTitle={catalog.title}
      />

      {/* 3. Packages — pricing */}
      <ServicePackagesSection variant="page" />

      {/* 4. FAQ */}
      {faq && faq.length > 0 && (
        <ServicesFaqSection items={faq} />
      )}

      {/* 5. Final CTA */}
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
