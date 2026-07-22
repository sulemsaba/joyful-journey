import { ArrowRight, Phone, Home } from "lucide-react";
import { useMemo } from "react";
import { ServiceCatalogSection } from "@/exxonim/components/service-catalog";
import { UnifiedCtaSection } from "@/exxonim/components/UnifiedCtaSection";
import { ServicesOverviewSection } from "@/exxonim/components/ServicesOverviewSection";
import { StickyServiceSearch } from "@/exxonim/components/StickyServiceSearch";
import {
  flattenServiceNavGroups,
  type FlatService,
} from "@/exxonim/components/ServiceSearchBox";
import { useServiceCatalog } from "@/exxonim/hooks/useServiceCatalog";
import { ServicesFaqSection } from "@/exxonim/components/ServicesFaqSection";
import { Breadcrumb } from "@/exxonim/components/Breadcrumb";
import { Button } from "@/exxonim/components/primitives/Button";
import { ServicePackagesSection } from "@/exxonim/components/ServicePlansSection";
import { usePage } from "@/exxonim/hooks/usePage";
import { useFaqItems } from "@/exxonim/hooks/useFaqItems";
import { useResolvedPageSeo } from "@/exxonim/hooks/useResolvedSeo";
import { routes } from "@/exxonim/routes";
import type { ServicesPageContent } from '@/exxonim/types';
import { StructuredData } from '@/exxonim/components/StructuredData';

/**
 * Services page - clean 5-section layout:
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
  // FAQs now come from the single FAQ manager (tagged page="services").
  // Prefer managed FAQ always; if empty, show nothing (no legacy page-content fallback).
  const { items: managedFaq } = useFaqItems("services");

  const faqItems = useMemo(() => {
    if (managedFaq.length > 0) {
      return managedFaq.map((f) => ({ question: f.question, answer: f.answer }));
    }
    return [];
  }, [managedFaq]);

  /* ── Search data = the CATALOG the cards render from ──
   * The search must find exactly what's on the page, so it's fed by the same
   * useServiceCatalog query as ServiceCatalogSection (react-query dedupes the
   * fetch). The page-content nav groups are only a fallback while the catalog
   * is loading/unavailable — feeding the search from them alone broke it
   * whenever the admin-managed page content didn't mirror the live catalog. */
  const { data: catalogData } = useServiceCatalog();
  const searchServices = useMemo<FlatService[]>(() => {
    const catalogServices = catalogData?.data?.services ?? [];
    if (catalogServices.length > 0) {
      return catalogServices.map((s) => ({
        name: s.title,
        group: s.category,
        href: routes.services,
      }));
    }
    return flattenServiceNavGroups(page?.content?.overview?.service_nav_groups);
  }, [catalogData, page]);

  if (!page) return null;
  if (!page.content) return null;

  const { overview, catalog } = page.content;

  return (
    <>
      <StructuredData heroTitle={overview.title} heroDescription={overview.description} breadcrumbs={[{ name: 'Services', path: routes.services }]} />

      {/* Breadcrumb - matches About/Contact pattern */}
      <div className="max-w-[1240px] px-4 sm:px-6 lg:px-8 mx-auto pt-4">
        <Breadcrumb items={[{ label: 'Home', href: routes.home, icon: Home }, { label: 'Services' }]} />
      </div>

      {/* 1. Overview hero - description, stats, search, service nav groups */}
      <ServicesOverviewSection content={overview} services={searchServices} />

      {/* Mobile: the page is long — once the overview's search scrolls out of
          view, a lens button floats in top-right; tapping it expands the
          search on demand (collapsed by default so content stays visible). */}
      <StickyServiceSearch services={searchServices} watchId="services-overview" />

      {/* 2. Service Catalog - card grid with category tabs */}
      <ServiceCatalogSection
        heroEyebrow={catalog?.eyebrow}
        heroTitle={catalog.title}
      />

      {/* 3. Packages - pricing */}
      <ServicePackagesSection variant="page" />

      {/* 4. FAQ */}
      {faqItems.length > 0 && (
        <ServicesFaqSection items={faqItems} />
      )}

      {/* 5. Final CTA */}
      <UnifiedCtaSection heading="Ready to get started?">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <Button size="standard" variant="inverse" href={`${routes.contact}#inquiry`}>
            Book a Free Consultation
            <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            size="standard"
            variant="inverseOutline"
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
