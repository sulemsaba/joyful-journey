"use client";

import {
  fallbackPrivacyPage,
  fallbackTermsPage,
  fallbackCookiePage,
  fallbackDataRightsPage,
  fallbackCompanyInfo,
} from "@/lib/exxonim-data";
import type { InfoPageContent, PageRecord } from "@/lib/exxonim-types";
import { cn } from "@/lib/cn";
import { Container } from "@/components/exxonim/Container";
import { routes } from "@/lib/exxonim-router";
import { ArrowRight, CheckCircle2, FileText, Mail, Phone, MessageCircle } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Shared Layout                                                       */
/* ------------------------------------------------------------------ */

function InfoPageLayout({ data }: { data: PageRecord<InfoPageContent> }) {
  const content = data.content;
  const { hero, sections, next_step } = content;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-12 md:py-20">
        {/* Hero */}
        <section className="mb-12 md:mb-16">
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
        </section>

        {/* Content Sections */}
        <section className="flex flex-col gap-10 mb-16">
          {sections.map((section, i) => (
            <div key={i} className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-text">
                {section.title}
              </h2>
              {section.paragraphs.map((paragraph, pi) => (
                <p key={pi} className="text-text-muted leading-relaxed">
                  {paragraph}
                </p>
              ))}
              {section.bullets && section.bullets.length > 0 && (
                <ul className="flex flex-col gap-2 mt-2">
                  {section.bullets.map((bullet, bi) => (
                    <li key={bi} className="flex items-start gap-3">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent mt-0.5">
                        <CheckCircle2 className="h-3 w-3" />
                      </div>
                      <span className="text-sm text-text-muted leading-relaxed">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>

        {/* Next Step CTA Card */}
        {next_step && (
          <section className="rounded-2xl border border-border-soft bg-surface-soft p-8 md:p-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold text-text">
                  {next_step.title}
                </h3>
                <p className="text-text-muted max-w-lg">
                  {next_step.description}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a
                  href={next_step.primary_action.href}
                  className="inline-flex h-11 items-center justify-center rounded-full bg-accent px-6 text-sm font-extrabold text-accent-contrast hover:bg-accent-hover transition-all hover:-translate-y-0.5"
                >
                  {next_step.primary_action.label}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <a
                  href={next_step.secondary_action.href}
                  className="inline-flex h-11 items-center justify-center rounded-full border border-border-soft px-6 text-sm font-semibold text-text-muted hover:text-text hover:border-border-strong transition-colors"
                >
                  {next_step.secondary_action.label}
                </a>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Named Page Exports                                                  */
/* ------------------------------------------------------------------ */

export function PrivacyPage() {
  return <InfoPageLayout data={fallbackPrivacyPage} />;
}

export function TermsPage() {
  return <InfoPageLayout data={fallbackTermsPage} />;
}

export function CookiePage() {
  return <InfoPageLayout data={fallbackCookiePage} />;
}

export function DataRightsPage() {
  return <InfoPageLayout data={fallbackDataRightsPage} />;
}

export function SupportPage() {
  const companyInfo = fallbackCompanyInfo;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-12 md:py-20">
        {/* Hero */}
        <section className="mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-accent mb-4">
            <span className="inline-block h-px w-5 bg-accent" />
            Support
          </span>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-text mb-4">
            How Can We Help?
          </h1>
          <p className="text-lg text-text-muted max-w-2xl leading-relaxed">
            Our support team is available to assist you with any questions about our services, your account, or business compliance matters.
          </p>
        </section>

        {/* Contact Options */}
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          <div className="flex flex-col gap-4 rounded-2xl border border-border-soft bg-surface p-6 shadow-card">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft text-accent">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text mb-1">Call Us</h3>
              <p className="text-sm text-text-muted mb-3">
                Available Mon–Fri, 8:00 AM – 5:00 PM EAT
              </p>
              {companyInfo.phones.map((phone, i) => (
                <a
                  key={i}
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="text-sm font-semibold text-accent hover:underline block"
                >
                  {phone}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-2xl border border-border-soft bg-surface p-6 shadow-card">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft text-accent">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text mb-1">Email Us</h3>
              <p className="text-sm text-text-muted mb-3">
                We typically respond within 24 hours
              </p>
              {companyInfo.emails.map((email, i) => (
                <a
                  key={i}
                  href={`mailto:${email}`}
                  className="text-sm font-semibold text-accent hover:underline block"
                >
                  {email}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-2xl border border-border-soft bg-surface p-6 shadow-card">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft text-accent">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text mb-1">WhatsApp</h3>
              <p className="text-sm text-text-muted mb-3">
                Quick questions? Chat with us
              </p>
              <a
                href={`https://wa.me/${companyInfo.whatsapp}`}
                className="text-sm font-semibold text-accent hover:underline"
              >
                +{companyInfo.whatsapp}
              </a>
            </div>
          </div>
        </section>

        {/* FAQ Link */}
        <section className="rounded-2xl border border-border-soft bg-surface-soft p-8 text-center">
          <h3 className="text-xl font-semibold text-text mb-2">
            Looking for quick answers?
          </h3>
          <p className="text-text-muted max-w-md mx-auto mb-6">
            Check our frequently asked questions for instant answers to common queries.
          </p>
          <a
            href={routes.faq}
            className="inline-flex h-11 items-center justify-center rounded-full bg-accent px-6 text-sm font-extrabold text-accent-contrast hover:bg-accent-hover transition-all hover:-translate-y-0.5"
          >
            Visit FAQ
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </section>
      </div>
    </div>
  );
}
