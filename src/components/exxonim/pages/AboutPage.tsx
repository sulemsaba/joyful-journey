"use client";

import { fallbackAboutPage } from "@/lib/exxonim-data";
import type { AboutPageContent } from "@/lib/exxonim-types";
import { cn } from "@/lib/cn";
import { Container } from "@/components/exxonim/Container";
import { routes } from "@/lib/exxonim-router";
import { ArrowRight, Users, Briefcase, Search, Target, Shield, Heart, Check } from "lucide-react";

const profileIcons = [Shield, Heart, Users, Target];

export function AboutPage() {
  const content: AboutPageContent = fallbackAboutPage.content;
  const { hero, company_profile, support_profiles_section, support_profiles, service_scope_section, service_scope, operating_model_section, operating_model, client_expectations_section, client_expectations, cta } = content;

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
            <p className="text-lg text-text-muted max-w-2xl leading-relaxed">
              {hero.description}
            </p>
          </div>
        </section>

        {/* Company Profile */}
        <section className="mb-16 md:mb-24">
          <span className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-surface-soft px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-accent mb-4">
            {company_profile.eyebrow}
          </span>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-text mb-6">
            {company_profile.title}
          </h2>
          <div className="flex flex-col gap-4 mb-8">
            {company_profile.paragraphs.map((paragraph, i) => (
              <p key={i} className="text-text-muted leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
          {company_profile.working_style && (
            <div className="rounded-2xl border border-border-soft bg-surface p-6 md:p-8 border-l-4 border-l-accent">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent mb-2">
                {company_profile.working_style_label || "Our Approach"}
              </p>
              <p className="text-text leading-relaxed font-medium">
                {company_profile.working_style}
              </p>
            </div>
          )}
        </section>

        {/* Support Profiles */}
        {support_profiles_section && support_profiles.length > 0 && (
          <section className="mb-16 md:mb-24">
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-surface-soft px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-accent mb-4">
                Values
              </span>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-text mb-3">
                {support_profiles_section.title}
              </h2>
              <p className="text-text-muted max-w-lg mx-auto">
                {support_profiles_section.description}
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {support_profiles.map((profile, i) => {
                const Icon = profileIcons[i % profileIcons.length];
                return (
                  <div
                    key={i}
                    className="rounded-2xl bg-gradient-to-br from-accent/20 via-accent/5 to-transparent p-px transition-all hover:-translate-y-1 hover:shadow-accent-glow"
                  >
                    <div className="flex flex-col gap-4 rounded-2xl bg-surface p-6 h-full">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-accent">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-semibold text-text">
                        {profile.title}
                      </h3>
                      <p className="text-sm text-text-muted leading-relaxed">
                        {profile.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Service Scope */}
        {service_scope_section && service_scope.length > 0 && (
          <section className="mb-16 md:mb-24">
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-surface-soft px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-accent mb-4">
                Services
              </span>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-text mb-3">
                {service_scope_section.title}
              </h2>
              <p className="text-text-muted max-w-lg mx-auto">
                {service_scope_section.description}
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {service_scope.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-3 rounded-2xl border border-border-soft bg-surface p-6 shadow-card transition-all duration-300 hover:border-border-strong hover:-translate-y-1 hover:shadow-accent-glow"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-hover text-accent-contrast text-sm font-bold shadow-sm">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="text-lg font-semibold text-text">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Operating Model */}
        {operating_model_section && operating_model.length > 0 && (
          <section className="mb-16 md:mb-24">
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-surface-soft px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-accent mb-4">
                Process
              </span>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-text mb-3">
                {operating_model_section.title}
              </h2>
              <p className="text-text-muted max-w-lg mx-auto">
                {operating_model_section.description}
              </p>
            </div>
            <div className="relative grid gap-6 md:grid-cols-2">
              {/* Connecting line on desktop */}
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border-strong to-transparent" />
              {operating_model.map((item, i) => (
                <div
                  key={i}
                  className="relative flex gap-5 rounded-2xl border border-border-soft bg-surface p-6 shadow-card z-10"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-hover text-accent-contrast text-lg font-bold shadow-sm">
                    {item.step}
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-semibold text-text">
                      {item.title}
                    </h3>
                    <p className="text-sm text-text-muted leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Client Expectations */}
        {client_expectations_section && client_expectations.length > 0 && (
          <section className="mb-16 md:mb-24">
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-surface-soft px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-accent mb-4">
                Commitment
              </span>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-text mb-3">
                {client_expectations_section.title}
              </h2>
              <p className="text-text-muted max-w-lg mx-auto">
                {client_expectations_section.description}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {client_expectations.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-border-soft bg-surface p-5 shadow-card transition-all hover:border-border-strong hover:-translate-y-0.5"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-accent-contrast">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <p className="text-sm text-text leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent to-accent-hover p-8 md:p-12 lg:p-16">
          {/* Background decorations */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.12),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.08),transparent_50%)]" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-contrast/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-contrast/5 rounded-full blur-3xl" />
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, var(--color-accent-contrast) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

          <div className="relative z-10 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-accent-contrast mb-4">
              {cta.title}
            </h2>
            <p className="text-accent-contrast/80 max-w-lg mx-auto mb-8 leading-relaxed">
              {cta.description}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={cta.primary.href}
                className="inline-flex h-12 items-center justify-center rounded-full bg-surface px-8 text-sm font-extrabold text-accent hover:bg-surface-soft transition-all hover:-translate-y-0.5 shadow-lg"
              >
                {cta.primary.label}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a
                href={cta.secondary.href}
                className="inline-flex h-12 items-center justify-center rounded-full border border-accent-contrast/30 px-8 text-sm font-extrabold text-accent-contrast hover:bg-accent-contrast/10 transition-all hover:-translate-y-0.5"
              >
                {cta.secondary.label}
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
