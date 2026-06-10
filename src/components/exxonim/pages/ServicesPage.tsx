"use client";

import { fallbackServicesPage } from "@/lib/exxonim-data";
import type { ServicesPageContent, ServiceCatalogGroup } from "@/lib/exxonim-types";
import { cn } from "@/lib/cn";
import { Container } from "@/components/exxonim/Container";
import { routes } from "@/lib/exxonim-router";
import { ServicePlansSection } from "@/components/exxonim/ServicePlansSection";
import { ArrowRight, Building, Shield, Calculator, Users, Briefcase, FileCheck, Scale, HeartHandshake } from "lucide-react";

const featureIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  building: Building,
  shield: Shield,
  calculator: Calculator,
  users: Users,
  briefcase: Briefcase,
  "file-check": FileCheck,
  scale: Scale,
  "heart-handshake": HeartHandshake,
};

const groupIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  formation: Building,
  licensing: Shield,
  tax: Calculator,
  support: Users,
};

function getGroupIcon(title: string) {
  const lower = title.toLowerCase();
  for (const [key, Icon] of Object.entries(groupIconMap)) {
    if (lower.includes(key)) return Icon;
  }
  return Briefcase;
}

export function ServicesPage() {
  const content: ServicesPageContent = fallbackServicesPage.content;
  const { overview, catalog } = content;

  return (
    <>
      {/* Overview Hero */}
      <section className="relative overflow-hidden bg-[radial-gradient(120%_80%_at_15%_20%,var(--color-accent-soft-strong),transparent_55%),radial-gradient(90%_70%_at_85%_90%,var(--color-accent-soft),transparent_60%)] pt-[calc(var(--header-height,70px)+1rem)] animate-page-enter">
        <Container className="pb-16 pt-8 lg:pb-24 lg:pt-16">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-accent mb-4">
              <span className="inline-block h-px w-5 bg-accent" />
              {overview.eyebrow}
            </span>
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-text mb-4">
              {overview.title}
            </h1>
            <p className="text-lg text-text-muted leading-relaxed mb-10">
              {overview.description}
            </p>
          </div>

          {/* Feature Cards */}
          {overview.features && overview.features.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {overview.features.map((feature, i) => {
                const Icon = featureIconMap[feature.icon] || Building;
                return (
                  <div
                    key={i}
                    className="rounded-2xl bg-gradient-to-br from-accent/20 via-accent/5 to-transparent p-px transition-all hover:-translate-y-1 hover:shadow-accent-glow"
                  >
                    <div className="flex flex-col gap-3 rounded-2xl bg-surface p-6 h-full">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft text-accent">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-base font-semibold text-text">
                        {feature.label}
                      </h3>
                      <p className="text-sm text-text-muted leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Container>
      </section>

      {/* Service Catalog */}
      {catalog.groups && catalog.groups.length > 0 && (
        <section className="py-16 lg:py-24 bg-page">
          <Container>
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-surface-soft px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-accent mb-4">
                Catalog
              </span>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-text mb-3">
                {catalog.title}
              </h2>
              <p className="text-text-muted max-w-lg mx-auto">
                {catalog.description}
              </p>
            </div>

            <div className="flex flex-col gap-12">
              {catalog.groups.map((group, gi) => (
                <ServiceCatalogGroup key={gi} group={group} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Service Packages */}
      <ServicePlansSection />
    </>
  );
}

function GroupIconDisplay({ title }: { title: string }) {
  const lower = title.toLowerCase();
  for (const [key, Icon] of Object.entries(groupIconMap)) {
    if (lower.includes(key)) return <Icon className="h-5 w-5" />;
  }
  return <Briefcase className="h-5 w-5" />;
}

function ServiceCatalogGroup({ group }: { group: ServiceCatalogGroup }) {
  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-hover text-accent-contrast shadow-sm">
          <GroupIconDisplay title={group.title} />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-text">{group.title}</h3>
          <div className="mt-2 h-0.5 w-16 bg-gradient-to-r from-accent to-transparent rounded-full" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {group.items.map((item, i) => (
          <div
            key={i}
            className="flex flex-col gap-4 rounded-2xl border border-border-soft bg-surface p-6 shadow-card transition-all duration-300 hover:border-border-strong hover:-translate-y-1 hover:shadow-accent-glow"
          >
            <div className="flex flex-col gap-2 flex-1">
              <h4 className="text-lg font-semibold text-text">
                {item.title}
              </h4>
              <p className="text-sm text-text-muted leading-relaxed">
                {item.description}
              </p>
            </div>
            <a
              href={item.cta_href}
              className="inline-flex items-center text-sm font-bold text-accent hover:underline self-start group/link"
            >
              {item.cta_label}
              <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
