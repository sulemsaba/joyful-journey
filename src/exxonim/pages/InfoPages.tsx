import { routes } from "@/exxonim/routes";
import { Button } from "@/exxonim/components/primitives/Button";
import { Breadcrumb, type BreadcrumbItem } from "@/exxonim/components/Breadcrumb";
import { LoadBoundary } from "@/exxonim/components/LoadBoundary";
import { usePage } from "@/exxonim/hooks/usePage";
import { useResolvedPageSeo } from "@/exxonim/hooks/useResolvedSeo";
import type { ContentSection, InfoPageContent } from '@/exxonim/types';


interface ContentPageProps {
  eyebrow: string;
  title: string;
  description: string;
  sections: ContentSection[];
  nextStep?: InfoPageContent["next_step"];
  breadcrumbItems?: BreadcrumbItem[];
}

function ContentPage({
  eyebrow,
  title,
  description,
  sections,
  nextStep,
  breadcrumbItems,
}: ContentPageProps) {
  return (
    <>
<section className="pt-4 md:pt-8 pb-16 relative bg-[linear-gradient(180deg,var(--color-surface)_0%,var(--color-page)_100%)] backdrop-blur-[8px]">
        <div className="max-w-[min(1240px,calc(100%-2rem))] mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          {breadcrumbItems && breadcrumbItems.length > 0 && (
            <Breadcrumb items={breadcrumbItems} />
          )}
          <header className="mb-16">
            <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-elevated text-xs font-bold tracking-widest uppercase text-text-muted">
              <span className="w-2 h-2 rounded-full bg-accent"></span>
              {eyebrow}
            </p>
            <h1 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight text-text">{title}</h1>
            <p className="mt-4 text-lg text-text-muted max-w-3xl">{description}</p>
          </header>

          <div className="grid gap-16 max-w-4xl">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-2xl font-bold text-text mb-4">{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-text-muted leading-relaxed mb-4">{paragraph}</p>
                ))}
                {section.bullets?.length ? (
                  <ul className="space-y-2 pl-6 list-disc text-text-muted">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            {nextStep ? (
              <section className="p-8 rounded-2xl border border-border-soft bg-surface/60">
                <h2 className="text-2xl font-bold text-text mb-4">{nextStep.title}</h2>
                <p className="text-text-muted leading-relaxed mb-6">{nextStep.description}</p>
                <div className="flex flex-wrap gap-4">
                  {nextStep.primary_action ? (
                    <Button
                      size="hero"
                      variant="primary"
                      href={nextStep.primary_action.href}
                    >
                      {nextStep.primary_action.label}
                    </Button>
                  ) : null}
                  {nextStep.secondary_action ? (
                    <Button
                      size="hero"
                      variant="secondary"
                      href={nextStep.secondary_action.href}
                    >
                      {nextStep.secondary_action.label}
                    </Button>
                  ) : null}
                </div>
              </section>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}

interface InfoPageRouteProps {
  slug: string;
  canonicalPath: string;
  loadingLabel: string;
  breadcrumbItems: BreadcrumbItem[];
}

function InfoPageRoute({
  slug,
  canonicalPath,
  loadingLabel,
  breadcrumbItems,
}: InfoPageRouteProps) {
  const { data: page, isPending, error } = usePage<InfoPageContent>(slug);
  useResolvedPageSeo(page, canonicalPath);

  return (
    <LoadBoundary
      error={error}
      errorDetail="This page could not be loaded right now."
      errorTitle="Unable to load the page."
      isPending={isPending}
      isReady={Boolean(page)}
      loadingLabel={loadingLabel}
    >
      {() => { if (!page) return null; return (
        <ContentPage
          eyebrow={page?.content.hero.eyebrow}
          title={page?.content.hero.title}
          description={page?.content.hero.description}
          sections={page?.content.sections}
          nextStep={page?.content.next_step}
          breadcrumbItems={breadcrumbItems}
        />
      );}}
    </LoadBoundary>
  );
}

export function SupportPage() {
  return (
    <InfoPageRoute
      slug="support"
      canonicalPath={routes.support}
      loadingLabel="Loading support page..."
      breadcrumbItems={[{ label: "Resources", href: routes.resources }, { label: "Support" }]}
    />
  );
}

export function TermsPage() {
  return (
    <InfoPageRoute
      slug="terms"
      canonicalPath={routes.terms}
      loadingLabel="Loading terms..."
      breadcrumbItems={[{ label: "Resources", href: routes.resources }, { label: "Terms" }]}
    />
  );
}

export function PrivacyPage() {
  return (
    <InfoPageRoute
      slug="privacy"
      canonicalPath={routes.privacy}
      loadingLabel="Loading privacy policy..."
      breadcrumbItems={[{ label: "Resources", href: routes.resources }, { label: "Privacy" }]}
    />
  );
}

export function CookiePage() {
  return (
    <InfoPageRoute
      slug="cookies"
      canonicalPath={routes.cookies}
      loadingLabel="Loading cookie notice..."
      breadcrumbItems={[{ label: "Resources", href: routes.resources }, { label: "Cookie Notice" }]}
    />
  );
}

export function DataRightsPage() {
  return (
    <InfoPageRoute
      slug="data-rights"
      canonicalPath={routes.dataRights}
      loadingLabel="Loading data rights..."
      breadcrumbItems={[{ label: "Resources", href: routes.resources }, { label: "Data Rights" }]}
    />
  );
}
