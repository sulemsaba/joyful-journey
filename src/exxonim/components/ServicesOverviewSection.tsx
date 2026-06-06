import { ShieldCheck, Star } from 'lucide-react';
import { routes } from '@/exxonim/routes';
import { Button } from '@/exxonim/components/primitives/Button';
import type { ServicesOverviewContent } from '@/exxonim/types';


interface ServicesOverviewSectionProps {
  content: ServicesOverviewContent;
}

export function ServicesOverviewSection({
  content,
}: ServicesOverviewSectionProps) {
  return (
    <section
      className="relative overflow-hidden pt-4 pb-16"
      aria-labelledby="services-overview-title"
    >
      {/* Decorative background gradients */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,var(--color-accent-soft)_0,transparent_24%),radial-gradient(circle_at_85%_14%,var(--color-accent-soft-strong)_0,transparent_22%)]" />
        <div className="absolute inset-0 opacity-90 bg-[linear-gradient(180deg,var(--color-accent-soft)_0%,transparent_24%),radial-gradient(460px_circle_at_50vw_30vh,var(--color-accent-soft)_0%,transparent_58%)]" />
      </div>

      <div className="w-[min(1240px,calc(100%-2rem))] mx-auto relative z-10">
        {/* Breadcrumb */}
        <nav className="mb-5 text-text-soft text-xs font-semibold tracking-[0.1em] uppercase" aria-label="Breadcrumb">
          <span>Home</span>
          <span className="mx-2 opacity-40">›</span>
          <span>Services</span>
        </nav>

        {/* Hero grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-5 items-stretch">
          {/* Left column — benefit headline */}
          <article
            className="rounded-[2rem] p-6 md:p-8 border border-border-soft bg-surface/82"
            data-reveal
          >
            <p className="m-0 mb-3 text-[0.78rem] font-extrabold tracking-[0.16em] uppercase text-text-soft">
              {content.eyebrow}
            </p>
            <h2
              id="services-overview-title"
              className="m-0 text-[clamp(2.2rem,4.5vw,3.8rem)] leading-[0.96] tracking-[-0.04em] text-text font-semibold"
            >
              {content.title}
            </h2>
            <p className="text-base leading-relaxed text-text-muted mt-4">
              {content.description}
            </p>
          </article>

          {/* Right column — trust panel */}
          <aside
            className="relative overflow-hidden rounded-[2rem] p-6 md:p-8 border border-border-soft bg-gradient-to-b from-accent/10 to-accent/90 text-accent-contrast"
            data-reveal
          >
            {/* Decorative blur circle */}
            <div
              className="pointer-events-none absolute -bottom-[28%] -right-[12%] w-56 h-56 rounded-full bg-accent-secondary/20 blur-2xl"
              aria-hidden="true"
            />

            <div className="relative z-10">
              {/* Star rating */}
              <div className="flex items-center gap-2 text-accent-contrast/90 text-sm font-semibold mb-4">
                <Star className="w-4 h-4 fill-current" aria-hidden="true" />
                <span>4.9/5</span>
                <span className="text-accent-contrast/60">·</span>
                <span>45 Google reviews</span>
              </div>

              {/* Panel title & body */}
              <strong className="text-lg font-semibold leading-relaxed">
                {content.panel_title}
              </strong>
              <p className="m-0 mt-2 text-accent-contrast/80 leading-relaxed">
                {content.panel_body}
              </p>

              {/* Trust signals */}
              <div className="grid gap-3 mt-5">
                {content.service_signals.map((signal) => (
                  <article
                    key={signal.label}
                    className="grid grid-cols-[auto_1fr] gap-3 items-center p-3.5 rounded-xl bg-accent-contrast/10 border border-accent-contrast/20"
                  >
                    <span className="inline-flex items-center justify-center min-h-[2.5rem] px-3 rounded-full bg-accent-contrast/15 text-accent-contrast font-extrabold text-sm">
                      {signal.value}
                    </span>
                    <div>
                      <strong className="block text-sm leading-tight">{signal.label}</strong>
                      <span className="block mt-1 text-sm text-accent-contrast/75 leading-relaxed">
                        {signal.detail}
                      </span>
                    </div>
                  </article>
                ))}
              </div>

              {/* No office visits badge */}
              <div className="inline-flex items-center gap-2 mt-5 px-3 py-2 rounded-full bg-accent-contrast/10 border border-accent-contrast/20 text-accent-contrast/90 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                No office visits required
              </div>
            </div>
          </aside>
        </div>

        {/* Single CTA — below the grid, right-aligned under the trust panel */}
        <div className="flex justify-end mt-5">
          <Button
            size="standard"
            variant="primary"
            href={routes.contact}
          >
            Book a Free Consultation
          </Button>
        </div>
      </div>
    </section>
  );
}
