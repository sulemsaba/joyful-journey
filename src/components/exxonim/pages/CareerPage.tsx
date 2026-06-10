"use client";

import { fallbackCareerPage, fallbackJobs } from "@/lib/exxonim-data";
import type { CareerPageContent, ApiCareerJob } from "@/lib/exxonim-types";
import { cn } from "@/lib/cn";
import { Container } from "@/components/exxonim/Container";
import { routes } from "@/lib/exxonim-router";
import { ArrowRight, MapPin, Clock, Building2, Briefcase, Users, Wifi, Search, Calculator, Scale, Settings, Code } from "lucide-react";

const focusAreaIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  advisory: Briefcase,
  tax: Calculator,
  legal: Scale,
  "client relations": Users,
  "client relation": Users,
  operations: Settings,
  technology: Code,
  tech: Code,
};

function getFocusAreaIcon(area: string) {
  const lower = area.toLowerCase();
  for (const [key, Icon] of Object.entries(focusAreaIconMap)) {
    if (lower.includes(key)) return Icon;
  }
  return Briefcase;
}

export function CareerPage() {
  const content: CareerPageContent = fallbackCareerPage.content;
  const jobs: ApiCareerJob[] = fallbackJobs;
  const { hero, focus_areas, status } = content;

  const openRolesCount = jobs.filter((j) => j.status === "open").length;
  const departments = [...new Set(jobs.filter((j) => j.status === "open").map((j) => j.department))];
  const workModes = [...new Set(jobs.filter((j) => j.status === "open").map((j) => j.location_mode))];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-12 md:py-20">
        {/* Hero */}
        <section className="relative mb-16 md:mb-24 animate-page-enter">
          <div className="absolute inset-0 -mx-[calc((100vw-100%)/2)] -my-8 bg-[radial-gradient(120%_80%_at_15%_20%,var(--color-accent-soft-strong),transparent_55%),radial-gradient(90%_70%_at_85%_90%,var(--color-accent-soft),transparent_60%)] pointer-events-none" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-accent mb-4">
              <span className="inline-block h-px w-5 bg-accent" />
              {hero.eyebrow}
            </span>
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-text mb-4">
              {hero.title}
            </h1>
            <p className="text-lg text-text-muted max-w-2xl leading-relaxed mb-8">
              {hero.description}
            </p>

            {/* Stats Cards */}
            <div className="grid gap-4 sm:grid-cols-3 max-w-xl">
              <div className="relative flex flex-col items-center gap-1 rounded-2xl border border-border-soft bg-gradient-to-br from-accent/10 to-accent/5 p-5 shadow-card overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent to-accent-hover opacity-[0.07]" />
                <span className="relative text-2xl font-bold bg-gradient-to-r from-accent to-accent-hover bg-clip-text text-transparent">{openRolesCount}</span>
                <span className="relative text-xs text-text-muted font-medium">Open Roles</span>
              </div>
              <div className="relative flex flex-col items-center gap-1 rounded-2xl border border-border-soft bg-gradient-to-br from-accent/10 to-accent/5 p-5 shadow-card overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent to-accent-hover opacity-[0.07]" />
                <span className="relative text-2xl font-bold bg-gradient-to-r from-accent to-accent-hover bg-clip-text text-transparent">{departments.length}</span>
                <span className="relative text-xs text-text-muted font-medium">Teams Hiring</span>
              </div>
              <div className="relative flex flex-col items-center gap-1 rounded-2xl border border-border-soft bg-gradient-to-br from-accent/10 to-accent/5 p-5 shadow-card overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent to-accent-hover opacity-[0.07]" />
                <span className="relative text-2xl font-bold bg-gradient-to-r from-accent to-accent-hover bg-clip-text text-transparent">{workModes.length}</span>
                <span className="relative text-xs text-text-muted font-medium">Work Modes</span>
              </div>
            </div>
          </div>
        </section>

        {/* Focus Areas */}
        {focus_areas && focus_areas.length > 0 && (
          <section className="mb-16 md:mb-24">
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-surface-soft px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-accent mb-4">
                Focus Areas
              </span>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-text">
                Where You Can Make an Impact
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {focus_areas.map((area, i) => {
                const Icon = getFocusAreaIcon(area);
                return (
                  <div
                    key={i}
                    className="flex items-center gap-4 rounded-2xl border border-border-soft bg-surface p-5 shadow-card transition-all hover:border-border-strong hover:-translate-y-1 hover:shadow-accent-glow"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-hover text-accent-contrast shadow-sm">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-semibold text-text">{area}</span>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Open Roles */}
        <section id="positions" className="mb-16 md:mb-24">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-surface-soft px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-accent mb-4">
              {status.label}
            </span>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-text mb-3">
              Open Positions
            </h2>
            <p className="text-text-muted max-w-lg mx-auto">
              {status.description}
            </p>
          </div>

          {jobs.length > 0 ? (
            <div className="flex flex-col gap-4">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-soft mb-4">
                <Search className="h-7 w-7 text-text-soft" />
              </div>
              <h3 className="text-xl font-semibold text-text mb-2">
                No open positions right now
              </h3>
              <p className="text-text-muted max-w-md">
                We&apos;re always looking for talented people. Send us your CV and we&apos;ll reach out when a suitable role opens up.
              </p>
              <a
                href={routes.contact}
                className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-accent px-6 text-sm font-extrabold text-accent-contrast hover:bg-accent-hover transition-all hover:-translate-y-0.5"
              >
                Send Your CV
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent to-accent-hover p-8 md:p-12 lg:p-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.12),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.08),transparent_50%)]" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-contrast/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-contrast/5 rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, var(--color-accent-contrast) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

          <div className="relative z-10 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-accent-contrast mb-4">
              {status.label}
            </h2>
            <p className="text-accent-contrast/80 max-w-lg mx-auto mb-8 leading-relaxed">
              {status.description}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={status.primary.href}
                className="inline-flex h-12 items-center justify-center rounded-full bg-surface px-8 text-sm font-extrabold text-accent hover:bg-surface-soft transition-all hover:-translate-y-0.5 shadow-lg"
              >
                {status.primary.label}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a
                href={status.secondary.href}
                className="inline-flex h-12 items-center justify-center rounded-full border border-accent-contrast/30 px-8 text-sm font-extrabold text-accent-contrast hover:bg-accent-contrast/10 transition-all hover:-translate-y-0.5"
              >
                {status.secondary.label}
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function JobCard({ job }: { job: ApiCareerJob }) {
  const isOpen = job.status === "open";

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border-soft bg-surface p-6 shadow-card transition-all duration-300 hover:border-border-strong hover:-translate-y-0.5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          {isOpen && (
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </span>
          )}
          <h3 className="text-lg font-semibold text-text">{job.title}</h3>
        </div>
        <p className="text-sm text-text-muted line-clamp-2">{job.summary}</p>
        <div className="flex flex-wrap items-center gap-2 mt-1">
          <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
            <Building2 className="h-3 w-3" />
            {job.department}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-surface-soft px-3 py-1 text-xs font-semibold text-text-muted">
            <Clock className="h-3 w-3" />
            {job.employment_type}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-surface-soft px-3 py-1 text-xs font-semibold text-text-muted">
            <MapPin className="h-3 w-3" />
            {job.location_mode} · {job.city}
          </span>
        </div>
      </div>
      <a
        href={routes.contact}
        className="group inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-accent px-6 text-sm font-extrabold text-accent-contrast hover:bg-accent-hover transition-all hover:-translate-y-0.5 hover:shadow-accent-glow self-start sm:self-center"
      >
        Apply Now
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </a>
    </div>
  );
}
