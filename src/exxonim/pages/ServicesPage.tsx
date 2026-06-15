import { ArrowRight, Phone, CheckCircle2, Eye, FileSearch, ClipboardCheck, ArrowRightLeft } from "lucide-react";
import { ServiceCatalogSection } from "@/exxonim/components/service-catalog";
import { UnifiedCtaSection } from "@/exxonim/components/UnifiedCtaSection";
import { ServicesOverviewSection } from "@/exxonim/components/ServicesOverviewSection";
import { ProblemFramingSection } from "@/exxonim/components/ProblemFramingSection";
import { HowItWorksSection } from "@/exxonim/components/HowItWorksSection";
import { ServicesFaqSection } from "@/exxonim/components/ServicesFaqSection";
import { Button } from "@/exxonim/components/primitives/Button";
import { ServicePackagesSection } from "@/exxonim/components/ServicePlansSection";
import { usePage } from "@/exxonim/hooks/usePage";
import { useResolvedPageSeo } from "@/exxonim/hooks/useResolvedSeo";
import { routes } from "@/exxonim/routes";
import type { TrackingSectionContent, ServiceFlowItem } from '@/exxonim/types';
import type { ServicesPageContent } from '@/exxonim/types';
import { StructuredData } from '@/exxonim/components/StructuredData';
import { Container } from '@/exxonim/components/primitives/Container';

/**
 * Services page — full content layout:
 *   1. Overview hero (description, stats, search, service nav)
 *   2. Problem framing (pain points)
 *   3. Service Catalog (merged hero + cards)
 *   4. How it works (service flow steps)
 *   5. Service promises
 *   6. Packages (admin/DB-driven)
 *   7. Tracking section (workflow visualization)
 *   8. FAQ
 *   9. Final CTA
 *
 * NO FULL-PAGE LOADER: The usePage hook guarantees fallback data via
 * the Fallback Guarantee pattern (data: query.data ?? fallback).
 * Pages render instantly with cached/fallback content while the API
 * refreshes in the background.
 */

/* ── Status icon mapping for tracking checkpoints ── */
const statusIconMap: Record<string, React.ReactNode> = {
  complete: <CheckCircle2 className="w-5 h-5 text-success" />,
  in_progress: <ArrowRightLeft className="w-5 h-5 text-accent" />,
  pending: <ClipboardCheck className="w-5 h-5 text-text-soft" />,
};

function TrackingSection({ content }: { content: TrackingSectionContent }) {
  return (
    <section aria-labelledby="tracking-section-title" className="py-10 md:py-16">
      <Container>
        {/* Section Header */}
        <div className="grid gap-2.5 md:gap-3 mb-8 md:mb-12 text-center max-w-[min(52ch,90%)] mx-auto" data-reveal>
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-accent">
            {content.eyebrow}
          </p>
          <h2
            id="tracking-section-title"
            className="text-[clamp(1.6rem,3.2vw,2.4rem)] font-semibold leading-tight tracking-tight text-text"
          >
            {content.title}
          </h2>
          <p className="text-text-muted text-sm leading-relaxed">
            {content.description}
          </p>
        </div>

        {/* Checkpoints — horizontal steps */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8" data-reveal>
          {content.checkpoints.map((cp, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center gap-2 p-4 rounded-xl border border-border-soft bg-surface"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent-soft">
                {statusIconMap[cp.status] ?? <Eye className="w-5 h-5 text-text-soft" />}
              </div>
              <span className="text-sm font-semibold text-text">{cp.title}</span>
              <span className="text-xs text-text-muted leading-relaxed">{cp.detail}</span>
            </div>
          ))}
        </div>

        {/* Case examples */}
        {content.case_examples && content.case_examples.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4" data-reveal>
            {content.case_examples.map((ex, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 rounded-xl border border-border-soft bg-surface"
              >
                <FileSearch className="w-5 h-5 text-accent shrink-0" />
                <div>
                  <span className="text-sm font-semibold text-text">{ex.title}</span>
                  <span className="block text-xs text-text-muted">{ex.detail}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Workflow steps */}
        {content.workflow_steps && content.workflow_steps.length > 0 && (
          <div className="mt-8" data-reveal>
            <h3 className="text-sm font-bold uppercase tracking-wider text-text-soft mb-4 text-center">
              How tracking works
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {content.workflow_steps.map((step, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-xl border border-border-soft bg-surface"
                >
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-accent-soft text-accent text-xs font-bold shrink-0">
                    {i + 1}
                  </span>
                  <div>
                    <span className="text-sm font-semibold text-text">{step.title}</span>
                    <span className="block text-xs text-text-muted leading-relaxed mt-0.5">{step.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}

function ServicePromisesSection({ promises }: { promises: string[] }) {
  return (
    <section aria-labelledby="service-promises-title" className="py-10 md:py-16 bg-surface-soft/40">
      <Container>
        <div className="grid gap-2.5 md:gap-3 mb-8 text-center max-w-[min(52ch,90%)] mx-auto" data-reveal>
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-accent">
            Our commitment
          </p>
          <h2
            id="service-promises-title"
            className="text-[clamp(1.6rem,3.2vw,2.4rem)] font-semibold leading-tight tracking-tight text-text"
          >
            What you can expect from every engagement
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto" data-reveal>
          {promises.map((promise, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-4 rounded-xl border border-border-soft bg-surface"
            >
              <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <p className="text-sm text-text leading-relaxed">{promise}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function ServicesPage() {
  const { data: page } = usePage<ServicesPageContent>("services");
  useResolvedPageSeo(page, routes.services);

  if (!page) return null;

  const { overview, catalog, problem_framing, faq, tracking_section } = page.content;

  return (
    <>
      <StructuredData heroTitle={overview.title} heroDescription={overview.description} breadcrumbs={[{ name: 'Services', path: routes.services }]} />

      {/* 1. Overview hero — description, stats, search, service nav groups */}
      <ServicesOverviewSection content={overview} />

      {/* 2. Problem framing — pain points (if data exists) */}
      {problem_framing && problem_framing.length > 0 && (
        <ProblemFramingSection items={problem_framing} />
      )}

      {/* 3. Service Catalog — card grid with category tabs */}
      <ServiceCatalogSection
        heroEyebrow={catalog.eyebrow}
        heroTitle={catalog.title}
      />

      {/* 4. How it works — service flow steps */}
      {overview.service_flow && overview.service_flow.length > 0 && (
        <HowItWorksSection flow={overview.service_flow} />
      )}

      {/* 5. Service promises */}
      {overview.service_promises && overview.service_promises.length > 0 && (
        <ServicePromisesSection promises={overview.service_promises} />
      )}

      {/* 6. Packages — admin/DB-driven */}
      <ServicePackagesSection variant="page" />

      {/* 7. Tracking section — workflow visualization */}
      {tracking_section && (
        <TrackingSection content={tracking_section} />
      )}

      {/* 8. FAQ */}
      {faq && faq.length > 0 && (
        <ServicesFaqSection items={faq} />
      )}

      {/* 9. Final CTA */}
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
