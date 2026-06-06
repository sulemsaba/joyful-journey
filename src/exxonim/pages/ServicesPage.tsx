import { Home } from "lucide-react";
import { Breadcrumb } from "@/exxonim/components/Breadcrumb";
import { ComplianceCalendarSection } from "@/exxonim/components/ComplianceCalendarSection";
import { EngineSection } from "@/exxonim/components/EngineSection";
import { ExxonimApartSection } from "@/exxonim/components/ExxonimApartSection";
import { LoadBoundary } from "@/exxonim/components/LoadBoundary";
import { ServicePackagesSection } from "@/exxonim/components/ServicePlansSection";
import { ServicesOverviewSection } from "@/exxonim/components/ServicesOverviewSection";
import { usePage } from "@/exxonim/hooks/usePage";
import { useResolvedPageSeo } from "@/exxonim/hooks/useResolvedSeo";
import { routes } from "@/exxonim/routes";
import type { ServicesPageContent } from '@/exxonim/types';

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
        <div className="max-w-[min(1240px,calc(100%-2rem))] mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <Breadcrumb items={[{ label: "Home", href: routes.home, icon: Home }, { label: "Services" }]} />
        </div>
        <ServicesOverviewSection content={page.content.overview} />
        <EngineSection content={page.content.catalog} />
        <ExxonimApartSection />
        <ComplianceCalendarSection />
        <ServicePackagesSection variant="page" />
        </>
      );}}
    </LoadBoundary>
  );
}
