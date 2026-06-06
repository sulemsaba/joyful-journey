import { Home } from "lucide-react";
import { Breadcrumb } from "@/exxonim/components/Breadcrumb";
import { Button } from "@/exxonim/components/primitives/Button";
import { routes } from "@/exxonim/routes";
import { LoadBoundary } from "@/exxonim/components/LoadBoundary";
import { usePage } from "@/exxonim/hooks/usePage";
import { useResolvedPageSeo } from "@/exxonim/hooks/useResolvedSeo";
import type { AboutPageContent } from '@/exxonim/types';


export function AboutPage() {
  const { data: page, isPending, error } = usePage<AboutPageContent>("about");
  useResolvedPageSeo(page, routes.about);
  const content = page?.content;

  return (
    <LoadBoundary
      error={error}
      errorDetail="The about page content could not be loaded right now."
      errorTitle="Unable to load the about page."
      isPending={isPending}
      isReady={Boolean(content)}
      loadingLabel="Loading about page..."
    >
      {() => { if (!content) return null; return (
        <>
        <div className="max-w-[min(1240px,calc(100%-2rem))] mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <Breadcrumb items={[{ label: "Home", href: routes.home, icon: Home }, { label: "About" }]} />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pt-4 md:pt-8 pb-12 md:pb-20">
            <section className="mb-16">
              <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-elevated text-xs font-bold tracking-widest uppercase text-text-muted">
                <span className="w-2 h-2 rounded-full bg-accent"></span>
                {content.hero.eyebrow}
              </p>
              <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight text-text">{content.hero.title}</h1>
              <p className="mt-4 text-lg text-text-muted max-w-3xl">{content.hero.description}</p>
            </section>

            <div className="space-y-24">
              <section className="grid md:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
                <div>
                  <p className="text-xs font-bold tracking-widest uppercase text-text-soft mb-4">
                    {content.company_profile.eyebrow}
                  </p>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text mb-6">{content.company_profile.title}</h2>
                  {content.company_profile.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-text-muted leading-relaxed mb-4">{paragraph}</p>
                  ))}
                </div>

                <div className="p-8 rounded-2xl border border-border-soft bg-surface/60 backdrop-blur-sm">
                  {content.company_profile.working_style_label ? (
                    <strong className="block text-xs font-bold tracking-widest uppercase text-text-soft mb-2">{content.company_profile.working_style_label}</strong>
                  ) : null}
                  <span className="text-2xl font-bold text-text">{content.company_profile.working_style}</span>
                </div>
              </section>

              <section>
                {content.support_profiles_section ? (
                  <div className="mb-10">
                    <h2 className="text-3xl font-bold tracking-tight text-text mb-4">{content.support_profiles_section.title}</h2>
                    <p className="text-text-muted max-w-2xl">{content.support_profiles_section.description}</p>
                  </div>
                ) : null}

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {content.support_profiles.map((profile) => (
                    <article key={profile.title} className="p-6 rounded-2xl border border-border-soft bg-surface/60 backdrop-blur-sm transition-all hover:-translate-y-1">
                      <strong className="text-xl font-bold text-text">{profile.title}</strong>
                      <p className="mt-3 text-text-muted leading-relaxed">{profile.description}</p>
                    </article>
                  ))}
                </div>
              </section>

              <section>
                {content.service_scope_section ? (
                  <div className="mb-10">
                    <h2 className="text-3xl font-bold tracking-tight text-text mb-4">{content.service_scope_section.title}</h2>
                    <p className="text-text-muted max-w-2xl">{content.service_scope_section.description}</p>
                  </div>
                ) : null}

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {content.service_scope.map((service) => (
                    <article key={service.title} className="p-6 rounded-2xl border border-border-soft bg-surface/60 backdrop-blur-sm transition-all hover:-translate-y-1">
                      <strong className="text-xl font-bold text-text">{service.title}</strong>
                      <p className="mt-3 text-text-muted leading-relaxed">{service.description}</p>
                    </article>
                  ))}
                </div>
              </section>

              <section>
                {content.operating_model_section ? (
                  <div className="mb-10">
                    <h2 className="text-3xl font-bold tracking-tight text-text mb-4">{content.operating_model_section.title}</h2>
                    <p className="text-text-muted max-w-2xl">{content.operating_model_section.description}</p>
                  </div>
                ) : null}

                <div className="grid gap-6 md:grid-cols-2">
                  {content.operating_model.map((item) => (
                    <article key={item.step} className="flex gap-5 p-6 rounded-2xl border border-border-soft bg-surface/60 backdrop-blur-sm">
                      <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent/10 text-accent font-bold text-sm shrink-0">{item.step}</span>
                      <div>
                        <strong className="text-xl font-bold text-text">{item.title}</strong>
                        <p className="mt-2 text-text-muted leading-relaxed">{item.description}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section>
                {content.client_expectations_section ? (
                  <div className="mb-10">
                    <h2 className="text-3xl font-bold tracking-tight text-text mb-4">{content.client_expectations_section.title}</h2>
                    <p className="text-text-muted max-w-2xl">{content.client_expectations_section.description}</p>
                  </div>
                ) : null}

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {content.client_expectations.map((item) => (
                    <article key={item} className="p-5 rounded-2xl border border-border-soft bg-surface/60 backdrop-blur-sm">
                      <div className="flex gap-4 items-start">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/10 text-accent font-bold text-lg shrink-0">+</span>
                        <p className="text-text-muted leading-relaxed">{item}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="p-8 md:p-12 rounded-3xl border border-border-soft bg-gradient-to-br from-accent/5 to-accent/10 backdrop-blur-sm text-center">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text mb-4">{content.cta.title}</h2>
                <p className="text-text-muted max-w-2xl mx-auto mb-8">{content.cta.description}</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button size="hero" variant="primary" href={content.cta.primary.href}>
                    {content.cta.primary.label}
                  </Button>
                  <Button size="hero" variant="secondary" href={content.cta.secondary.href}>
                    {content.cta.secondary.label}
                  </Button>
                </div>
              </section>
            </div>
          </div>
        </div>
        </>
      );}}
    </LoadBoundary>
  );
}
