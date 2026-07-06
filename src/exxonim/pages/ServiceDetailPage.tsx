'use client';

import { useState } from 'react';
import { Home, ArrowRight, Plus, X, CheckCircle2, FileText, Phone, ArrowLeft } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { Breadcrumb } from '@/exxonim/components/Breadcrumb';
import { Button } from '@/exxonim/components/primitives/Button';
import { SmartLink } from '@/exxonim/components/primitives/SmartLink';
import { Container } from '@/exxonim/components/primitives/Container';
import { StructuredData } from '@/exxonim/components/StructuredData';
import { useServiceCatalog } from '@/exxonim/hooks/useServiceCatalog';
import { routes, serviceDetailPath } from '@/exxonim/routes';

/**
 * Service Detail Page - dedicated page for each service.
 *
 * SEO: Each service gets its own URL (/services/{slug}/), title, meta description,
 * H1, and structured data (Service schema + BreadcrumbList). This lets Google rank
 * each service page for its own keywords (e.g., "work permit Tanzania").
 *
 * UX: When a user clicks a service in the navigation or on the catalog, they land
 * here - seeing exactly that service's info, no scrolling/searching needed.
 *
 * Content: Pulls from the service catalog (title, description, deliverables).
 * The "What's included" and "Process" sections render from catalog data.
 * FAQ and related services sections are ready for content to be filled in later.
 */
export function ServiceDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const { data: catalog } = useServiceCatalog();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Find this service in the catalog
  const allServices = catalog?.data?.services ?? [];
  const service = allServices.find((s) => s.slug === slug);

  // Find related services (same category, excluding this one)
  const relatedServices = service
    ? allServices.filter((s) => s.category === service.category && s.slug !== service.slug).slice(0, 3)
    : [];

  if (!service) {
    return (
      <Container className="py-20 text-center">
        <h1 className="text-2xl font-bold text-text mb-4">Service not found</h1>
        <p className="text-text-muted mb-8">The service you're looking for doesn't exist or has been moved.</p>
        <Button href={routes.services} variant="primary">Browse all services</Button>
      </Container>
    );
  }

  const allDeliverables = [
    ...(service.deliverables ?? []),
    ...(service.deliverables_full ?? []),
  ];

  const ctaLink = service.cta_link || routes.contact;
  const ctaText = service.cta_text || 'Get Started';

  return (
    <>
      <StructuredData
        heroTitle={service.title}
        heroDescription={service.short_description}
        breadcrumbs={[
          { name: 'Services', path: routes.services },
          { name: service.title, path: serviceDetailPath(service.slug) },
        ]}
      />

      {/* Breadcrumb */}
      <div className="max-w-[1240px] px-8 mx-auto pt-4">
        <Breadcrumb
          items={[
            { label: 'Home', href: routes.home, icon: Home },
            { label: 'Services', href: routes.services },
            { label: service.title },
          ]}
        />
      </div>

      {/* ──────────────────────────────────────────────────────────────
       *  SECTION 1: Hero - service title + short description + CTA
       *  Centered, clean, with badge if present.
       * ────────────────────────────────────────────────────────────── */}
      <section className="relative pt-8 pb-12 md:pt-14 md:pb-20" aria-labelledby="service-hero-title">
        <div className="max-w-[1240px] px-8 mx-auto text-center flex flex-col items-center" data-reveal>
          {service.badge && (
            <span className="inline-flex items-center px-3 py-1 mb-5 text-xs font-extrabold uppercase tracking-[0.14em] rounded-full bg-accent-soft text-accent">
              {service.badge}
            </span>
          )}
          <p className="m-0 mb-4 text-[0.78rem] font-extrabold tracking-[0.16em] uppercase text-accent">
            {service.category}
          </p>
          <h1
            id="service-hero-title"
            className="m-0 text-[clamp(1.9rem,4.5vw,3.4rem)] leading-[1.08] tracking-[-0.03em] text-text font-semibold max-w-[18ch]"
          >
            {service.title}
          </h1>
          <p className="text-base md:text-lg leading-relaxed text-text-muted mt-6 max-w-[58ch]">
            {service.short_description}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button size="standard" variant="primary" href={ctaLink}>
              {ctaText}
              <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
            </Button>
            <Button size="standard" variant="secondary" href={`tel:+255794689099`}>
              <Phone className="mr-1.5 h-4 w-4" aria-hidden="true" />
              Call to ask
            </Button>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
       *  SECTION 2: What's included - simple checkmark list (NOT cards).
       *  Clean list with checkmarks, no boxes/borders.
       *  Pulls from service.deliverables + deliverables_full.
       * ────────────────────────────────────────────────────────────── */}
      {allDeliverables.length > 0 && (
        <section className="py-12 md:py-20 border-t border-border-soft" aria-labelledby="service-includes-title">
          <Container>
            <div className="mb-8 md:mb-12 text-center" data-reveal>
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-accent mb-2">
                What's included
              </p>
              <h2
                id="service-includes-title"
                className="text-[clamp(1.5rem,3vw,2.4rem)] font-semibold leading-tight tracking-tight text-text"
              >
                Everything we handle for you.
              </h2>
            </div>

            {/* Simple list - no cards, no borders. Just checkmarks + text. */}
            <ul className="max-w-2xl mx-auto flex flex-col gap-3" data-reveal>
              {allDeliverables.map((item, i) => (
                <li key={i} className="flex items-start gap-3 py-2">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base text-text leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {/* ──────────────────────────────────────────────────────────────
       *  SECTION 3: Process - how this service works.
       *  Placeholder UI - content to be filled later.
       *  Shows a 3-step timeline structure.
       * ────────────────────────────────────────────────────────────── */}
      <section className="py-12 md:py-20 bg-surface-soft/30" aria-labelledby="service-process-title">
        <Container>
          <div className="mb-10 md:mb-14 text-center" data-reveal>
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-accent mb-2">
              How it works
            </p>
            <h2
              id="service-process-title"
              className="text-[clamp(1.5rem,3vw,2.4rem)] font-semibold leading-tight tracking-tight text-text"
            >
              A clear path from start to finish.
            </h2>
          </div>

          {/* Process timeline - content to be filled per service later */}
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute left-6 top-3 bottom-3 w-0.5 bg-gradient-to-b from-accent via-accent/30 to-transparent" />
            <div className="flex flex-col gap-8">
              {[
                { step: '01', title: 'Submit your request', detail: 'Fill out the contact form or call us. We review your needs and confirm the scope.' },
                { step: '02', title: 'We handle the process', detail: 'Our team manages every filing, submission, and authority interaction on your behalf.' },
                { step: '03', title: 'Track and receive', detail: 'Get updates at every milestone. Receive your final documents and certificates.' },
              ].map((item, i) => (
                <div key={i} className="relative pl-20 flex flex-col gap-2" data-reveal>
                  <div className="absolute left-0 top-0 flex items-center justify-center w-12 h-12 rounded-full bg-accent text-accent-contrast text-base font-bold tabular-nums shadow-lg shadow-accent/20">
                    {item.step}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-text leading-tight pt-1.5">{item.title}</h3>
                  <p className="text-sm md:text-base text-text-muted leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ──────────────────────────────────────────────────────────────
       *  SECTION 4: FAQ - service-specific questions.
       *  Accordion. Content to be filled per service later.
       *  Renders placeholder FAQs until admin content is added.
       * ────────────────────────────────────────────────────────────── */}
      <section className="py-12 md:py-20" aria-labelledby="service-faq-title">
        <Container>
          <div className="mb-10 md:mb-14 text-center" data-reveal>
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-accent mb-2">
              Common questions
            </p>
            <h2
              id="service-faq-title"
              className="text-[clamp(1.5rem,3vw,2.4rem)] font-semibold leading-tight tracking-tight text-text"
            >
              Things people ask about {service.title.toLowerCase()}.
            </h2>
          </div>

          {/* FAQ accordion - flat list with dividers, Plus/X toggle (matches main FAQ page) */}
          <div className="max-w-2xl mx-auto" data-reveal>
            {[
              { q: `How long does ${service.title.toLowerCase()} take?`, a: 'Timelines depend on the service type and authority processing speed. We track every submission and follow up proactively so you always know where things stand.' },
              { q: 'What documents do I need to provide?', a: 'We send you a customized checklist after your initial consultation. Most services require identification, proof of address, and service-specific documents.' },
              { q: 'How do I track the progress?', a: 'You receive a tracking code after submission. Use it on our Track Consultation page to see real-time milestone updates - no login required.' },
              { q: 'What does this cost?', a: 'Pricing depends on your segment and package. Check the Packages section or contact us for a custom quote.' },
            ].map((faq, i) => (
              <div
                key={i}
                className={i < 3 ? "border-b border-border-soft" : ""}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left cursor-pointer group"
                  aria-expanded={openFaq === i}
                >
                  <h3
                    className={`text-[0.9375rem] sm:text-base leading-snug transition-colors duration-200 flex-1 min-w-0 ${
                      openFaq === i ? "font-semibold text-text" : "font-normal text-text-muted group-hover:text-text"
                    }`}
                  >
                    {faq.q}
                  </h3>
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center transition-opacity duration-300 ${
                      openFaq === i ? "text-accent" : "text-accent/50 group-hover:text-accent"
                    }`}
                    aria-hidden="true"
                  >
                    {openFaq === i ? (
                      <X className="w-4 h-4" strokeWidth={2.5} />
                    ) : (
                      <Plus className="w-4 h-4" strokeWidth={2.5} />
                    )}
                  </span>
                </button>
                {/* Expandable answer - grid-rows animation */}
                <div
                  className={`grid transition-transform duration-300 ease-in-out ${
                    openFaq === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="pb-5">
                      <p className="text-sm sm:text-[0.9375rem] leading-relaxed text-text-muted">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ──────────────────────────────────────────────────────────────
       *  SECTION 5: Related services - same category.
       *  Only shows if there are related services in the catalog.
       * ────────────────────────────────────────────────────────────── */}
      {relatedServices.length > 0 && (
        <section className="py-12 md:py-20 bg-surface-soft/30" aria-labelledby="service-related-title">
          <Container>
            <div className="mb-10 md:mb-14 text-center" data-reveal>
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-accent mb-2">
                Related services
              </p>
              <h2
                id="service-related-title"
                className="text-[clamp(1.5rem,3vw,2.4rem)] font-semibold leading-tight tracking-tight text-text"
              >
                More in {service.category}.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {relatedServices.map((rel) => (
                <SmartLink
                  key={rel.id}
                  href={serviceDetailPath(rel.slug)}
                  className="group block p-5 md:p-6 rounded-2xl border border-border-soft bg-surface transition-transform duration-300 hover:-translate-y-1 hover:border-accent/30"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent-soft text-accent mb-4 transition-transform group-hover:scale-110">
                    <FileText className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-text leading-tight mb-2">{rel.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed line-clamp-2">{rel.short_description}</p>
                  <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-accent">
                    Learn more
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </SmartLink>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ──────────────────────────────────────────────────────────────
       *  SECTION 6: Final CTA
       * ────────────────────────────────────────────────────────────── */}
      <section className="py-12 md:py-20" aria-labelledby="service-cta-title">
        <Container>
          <div
            className="max-w-[42rem] mx-auto rounded-2xl md:rounded-[2rem] border border-border-soft bg-surface-elevated p-6 md:p-12 text-center"
            style={{
              background:
                'radial-gradient(80% 100% at 50% 0%, var(--color-accent-gradient-subtle), transparent 70%), var(--color-surface-elevated)',
            }}
            data-reveal
          >
            <h2
              id="service-cta-title"
              className="text-[clamp(1.8rem,3.2vw,2.6rem)] font-semibold leading-tight tracking-tight text-text"
            >
              Ready to start {service.title.toLowerCase()}?
            </h2>
            <p className="mt-3 text-text-muted text-sm leading-relaxed max-w-[min(48ch,90%)] mx-auto">
              Book a free consultation. We'll review your needs and guide you through every step.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button size="standard" variant="primary" href={ctaLink}>
                {ctaText}
                <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
              </Button>
              <Button size="standard" variant="secondary" href={routes.services}>
                <ArrowLeft className="mr-1.5 h-4 w-4" aria-hidden="true" />
                All services
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
