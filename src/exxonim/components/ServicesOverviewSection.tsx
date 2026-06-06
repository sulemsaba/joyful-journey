import { routes } from "@/exxonim/routes";
import { Button } from "@/exxonim/components/primitives/Button";
import type { ServicesOverviewContent } from '@/exxonim/types';


interface ServicesOverviewSectionProps {
  content: ServicesOverviewContent;
}

export function ServicesOverviewSection({
  content,
}: ServicesOverviewSectionProps) {
  const serviceSignals = content.service_signals;
  const serviceNavGroups = content.service_nav_groups;
  const serviceFlow = content.service_flow;
  const servicePromises = content.service_promises;

  return (
    <>
      <section
        className="relative overflow-hidden pt-4 pb-16"
        aria-labelledby="services-overview-title"
      >
        {/* Decorative background gradients */}
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,var(--color-accent-soft)_0,transparent_24%),radial-gradient(circle_at_85%_14%,var(--color-accent-soft-strong)_0,transparent_22%)]" />
          <div className="absolute inset-0 opacity-90 bg-[linear-gradient(180deg,var(--color-accent-soft)_0%,transparent_24%),radial-gradient(460px_circle_at_50vw_30vh,var(--color-accent-soft)_0%,transparent_58%)]" />
        </div>

        <div className="w-[min(1240px,calc(100%-2rem))] mx-auto relative z-10 grid gap-5">
          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-5 items-stretch">
            <article className="rounded-[2rem] p-6 border border-border-soft bg-surface/82" data-reveal>
              <p className="m-0 mb-3 text-[0.78rem] font-extrabold tracking-[0.16em] uppercase text-text-soft">
                {content.eyebrow}
              </p>
              <h2 id="services-overview-title" className="m-0 max-w-[13ch] text-[clamp(2.6rem,5vw,5rem)] leading-[0.94] tracking-[-0.06em] text-text">
                {content.title}
              </h2>
              <p className="mt-4 max-w-[42rem] text-base leading-relaxed text-text-muted">
                {content.description}
              </p>

              <div className="flex flex-wrap gap-3 mt-6">
                <Button
                  size="standard"
                  variant="primary"
                  href="#packages"
                >
                  See package plans
                </Button>
                <Button
                  size="standard"
                  variant="secondary"
                  href={routes.contact}
                >
                  Contact Exxonim
                </Button>
              </div>
            </article>

            <aside
              className="relative overflow-hidden rounded-[2rem] p-6 border border-border-soft grid gap-4 content-start bg-gradient-to-b from-accent/10 to-accent/90 text-accent-contrast"
              data-reveal
            >
              <div className="pointer-events-none absolute -bottom-[28%] -right-[12%] w-56 h-56 rounded-full bg-accent-secondary/20 blur-2xl" aria-hidden="true" />
              <div className="relative z-10">
                <strong className="text-lg leading-relaxed">{content.panel_title}</strong>
                <p className="m-0 mt-2 text-accent-contrast/80 leading-relaxed">{content.panel_body}</p>

                <div className="grid gap-3 mt-4">
                  {serviceSignals.map((signal) => (
                    <article
                      key={signal.label}
                      className="grid grid-cols-[72px_1fr] gap-3 items-start p-3.5 rounded-xl bg-accent-contrast/10 border border-accent-contrast/20"
                    >
                      <span className="inline-flex items-center justify-center min-h-[3rem] px-2.5 rounded-full bg-accent-contrast/15 text-accent-contrast font-extrabold text-sm uppercase tracking-[0.08em]">
                        {signal.value}
                      </span>
                      <div>
                        <strong className="block text-sm leading-tight">{signal.label}</strong>
                        <span className="block mt-1 text-sm text-accent-contrast/75 leading-relaxed">{signal.detail}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </aside>
          </div>

          {/* Nav Groups */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-4">
            {serviceNavGroups.map((group) => (
              <a
                key={group.title}
                className="grid gap-3 p-5 rounded-[1.6rem] border border-border-soft bg-surface/82 text-inherit no-underline transition-all hover:-translate-y-1 hover:border-border-strong"
                href={group.href}
                data-reveal
              >
                <div className="flex items-start justify-between gap-3">
                  <strong className="text-text text-base leading-tight">{group.title}</strong>
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-accent-soft text-accent text-base flex-shrink-0">
                    {"\u2192"}
                  </span>
                </div>
                <p className="m-0 text-text-muted text-sm leading-relaxed">{group.summary}</p>
                <ul className="m-0 p-0 list-none grid gap-2">
                  {group.items.slice(0, 3).map((item) => (
                    <li key={item} className="flex items-start gap-2 text-text-soft text-sm">
                      <span className="w-[0.45rem] h-[0.45rem] mt-1.5 rounded-full bg-accent/50 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </a>
            ))}
          </div>

          {/* Flow Section */}
          <div className="grid grid-cols-1 lg:grid-cols-[0.82fr_1.18fr] gap-4 items-start">
            <article className="p-5 rounded-[1.8rem] border border-border-soft bg-surface/82 grid gap-4" data-reveal>
              <p className="m-0 text-[0.78rem] font-extrabold tracking-[0.16em] uppercase text-text-soft">How the work moves</p>
              <h2 className="m-0 text-[clamp(2rem,3vw,3rem)] leading-none tracking-[-0.05em] text-text">Less friction. Better preparation. Clearer follow-through.</h2>
              <p className="m-0 text-text-muted leading-relaxed">
                Good service support is not just about submitting forms. It is
                about knowing the requirement, organizing the right documents,
                and keeping the next action visible when the process is active.
              </p>

              <div className="grid gap-2.5">
                {servicePromises.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-2.5 p-3 rounded-[1rem] bg-surface-strong/70 border border-border-soft text-text text-sm leading-relaxed"
                  >
                    <span className="w-2 h-2 mt-1.5 rounded-full bg-accent flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </article>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {serviceFlow.map((item) => (
                <article
                  key={item.step}
                  className="p-5 rounded-[1.5rem] border border-border-soft bg-surface/82 grid gap-3 content-start"
                  data-reveal
                >
                  <span className="inline-flex items-center justify-center w-fit min-h-[2rem] px-3 rounded-full bg-accent-soft text-accent text-[0.78rem] font-extrabold tracking-[0.14em]">
                    {item.step}
                  </span>
                  <strong className="text-text text-base leading-tight">{item.title}</strong>
                  <p className="m-0 text-text-muted leading-relaxed">{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
