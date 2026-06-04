import { Breadcrumb } from "@/exxonim/components/Breadcrumb";
import { LoadBoundary } from "@/exxonim/components/LoadBoundary";
import { NewsletterSection } from "@/exxonim/components/NewsletterSection";
import { usePage } from "@/exxonim/hooks/usePage";
import { useResolvedPageSeo } from "@/exxonim/hooks/useResolvedSeo";
import { routes } from "@/exxonim/routes";
import type { FaqPageContent } from '@/exxonim/types';

/** Renders FAQPage JSON-LD structured data for Google rich results. */
function FaqStructuredData({ items }: { items: Array<{ question: string; answer: string }> }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FaqPage() {
  const { data: page, isPending, error } = usePage<FaqPageContent>("faq");
  useResolvedPageSeo(page, routes.faq);

  const content = page?.content;

  return (
    <LoadBoundary
      error={error}
      errorDetail="The FAQ content could not be loaded right now."
      errorTitle="Unable to load the FAQ."
      isPending={isPending}
      isReady={Boolean(content)}
      loadingLabel="Loading FAQ..."
    >
      {() => { if (!content) return null; return (
        <>
        <FaqStructuredData items={content.items} />
        <section className="pt-4 md:pt-8 pb-[5.5rem] relative bg-[linear-gradient(180deg,var(--color-surface)_0%,var(--color-page)_100%)] backdrop-blur-[8px]">
          <div className="max-w-[min(1240px,calc(100%-2rem))] mx-auto px-4 sm:px-6 lg:px-8 pt-4" id="faq" data-reveal>
            <Breadcrumb items={[{ label: "Resources", href: routes.resources }, { label: "FAQ" }]} />
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" data-reveal>
              <div className="mb-12">
                <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-elevated text-xs font-bold tracking-widest uppercase text-text-muted">
                  <span className="w-2 h-2 rounded-full bg-accent"></span>
                  {content.hero.eyebrow}
                </p>
                <h1 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight text-text">{content.hero.title}</h1>
                <p className="mt-4 text-lg text-text-muted max-w-3xl">{content.hero.description}</p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {content.items.map((item) => (
                  <article key={item.question} className="p-6 rounded-2xl border border-border-soft bg-surface/60 backdrop-blur-sm" data-reveal>
                    <h3 className="text-lg font-bold text-text mb-3">{item.question}</h3>
                    <p className="text-text-muted leading-relaxed">{item.answer}</p>
                  </article>
                ))}
              </div>

              <div className="mt-12">
                <NewsletterSection
                  heading="Still have questions?"
                  description="Get answers to new compliance questions delivered to your inbox as we publish them. No spam — just what matters for your business in Tanzania."
                />
              </div>
            </div>
        </section>
        </>
      );}}
    </LoadBoundary>
  );
}
