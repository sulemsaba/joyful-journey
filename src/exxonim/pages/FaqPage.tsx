
import { useState, useCallback, useMemo } from "react";
import { Breadcrumb } from "@/exxonim/components/Breadcrumb";
import { Button } from "@/exxonim/components/primitives/Button";
import { UnifiedCtaSection } from "@/exxonim/components/UnifiedCtaSection";
import { NewsletterForm } from "@/exxonim/components/NewsletterForm";
import { Sparkles, Home, Search, Plus, X, MessageCircle } from "lucide-react";
import { usePage } from "@/exxonim/hooks/usePage";
import { useResolvedPageSeo } from "@/exxonim/hooks/useResolvedSeo";
import { routes } from "@/exxonim/routes";
import type { FaqPageContent } from '@/exxonim/types';
import { StructuredData } from '@/exxonim/components/StructuredData';

/* ═══════════════════════════════════════════════════════════════
 * FaqStructuredData - JSON-LD for Google rich results
 * ═══════════════════════════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════════════════════════
 * FaqAccordionItem - single expandable FAQ item
 *
 * Design: Flat list with straight-line dividers, Plus/X toggle
 * icon. No container card - just clean separator lines between
 * items. Plus icon when collapsed, X icon when expanded.
 * Smooth grid-rows animation for the answer reveal.
 * ═══════════════════════════════════════════════════════════════ */
function FaqAccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
  isLast,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  isLast: boolean;
}) {
  return (
    <div className={!isLast ? "border-b border-border-soft" : ""}>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left cursor-pointer group"
        aria-expanded={isOpen}
      >
        <h3
          className={`text-[0.9375rem] sm:text-base leading-snug transition-colors duration-200 flex-1 min-w-0 ${
            isOpen ? "font-semibold text-text" : "font-normal text-text-muted group-hover:text-text"
          }`}
        >
          {question}
        </h3>

        <span
          className={`flex h-6 w-6 shrink-0 items-center justify-center transition-all duration-300 ${
            isOpen
              ? "text-accent"
              : "text-accent/50 group-hover:text-accent"
          }`}
          aria-hidden="true"
        >
          {isOpen ? (
            <X className="w-4 h-4" strokeWidth={2.5} />
          ) : (
            <Plus className="w-4 h-4" strokeWidth={2.5} />
          )}
        </span>
      </button>

      {/* Expandable answer */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pb-5">
            <p className="text-sm sm:text-[0.9375rem] leading-relaxed text-text-muted">
              {answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
 * EmptyState - shown when search returns no results
 * ═══════════════════════════════════════════════════════════════ */
function EmptyState({ searchQuery, onClear }: { searchQuery: string; onClear: () => void }) {
  return (
    <div className="py-16 text-center">
      <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent-soft/50 text-accent mb-4">
        <Search className="w-6 h-6" />
      </span>
      <h3 className="text-lg font-bold text-text mb-2">
        No results for &ldquo;{searchQuery}&rdquo;
      </h3>
      <p className="text-text-muted text-sm max-w-sm mx-auto mb-5">
        Try different keywords or browse all questions.
      </p>
      <Button size="standard" variant="primary" onClick={onClear}>
        Clear search
      </Button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
 * FaqPage - Two-column layout with flat accordion list
 *
 * ═══════════════════════════════════════════════════════════════
 * BACKEND / ADMIN INTEGRATION NOTES
 * ═══════════════════════════════════════════════════════════════
 *
 * DATABASE SCHEMA (Prisma):
 *   model FaqItem {
 *     id         String   @id @default(cuid())
 *     question   String   // max 200 chars - backend must validate
 *     answer     String   // max 1000 chars - backend must validate
 *     category   String   // "registration" | "licensing" | "tax" | "tracking" | "general"
 *     sort_order Int      @default(0) // lower = shown first
 *     is_active  Boolean  @default(true) // only active items appear publicly
 *     createdAt  DateTime @default(now())
 *     updatedAt  DateTime @updatedAt
 *   }
 *
 * API ENDPOINTS:
 *   GET    /api/v1/faq              - List all active FAQ items (public)
 *     Query params: ?category=<id> - filter by category
 *     Query params: ?search=<q>    - search by question/answer text
 *     Response: { items: FaqItem[], total: number }
 *   GET    /api/v1/faq/:id          - Get single FAQ item
 *   POST   /api/v1/faq              - Create FAQ item (admin only)
 *   PUT    /api/v1/faq/:id          - Update FAQ item (admin only)
 *   DELETE /api/v1/faq/:id          - Delete FAQ item (admin only)
 *   PATCH  /api/v1/faq/reorder      - Reorder items (admin only)
 *     Body: { items: [{ id: string, sort_order: number }] }
 *
 * ADMIN FORM SPECIFICATION:
 *   question   - Text input, required, max 200 chars
 *     Placeholder: "e.g. How do I register a company in Tanzania?"
 *   answer     - Textarea, required, max 1000 chars
 *     Placeholder: "Provide a clear, concise answer..."
 *   category   - Select dropdown, required
 *     Options: registration, licensing, tax, tracking, general
 *   sort_order - Number input (drag-and-drop reorder in admin UI preferred)
 *   is_active  - Toggle switch, default: true
 *
 * DATA STRUCTURE EXPECTED BY THIS COMPONENT:
 *   interface FaqPageContent {
 *     hero: {
 *       eyebrow: string;
 *       title: string;       // e.g. "Questions?"
 *       description: string; // e.g. "If you have questions..."
 *     };
 *     items: Array<{
 *       question: string;
 *       answer: string;
 *     }>;
 *   }
 *
 * MIGRATION PATH (from static to DB-driven):
 *   1. Add FaqItem model to prisma/schema.prisma
 *   2. Run `bun run db:push` to create the table
 *   3. Seed with existing fallback FAQ items
 *   4. Add GET /api/v1/faq endpoint with ?category & ?search support
 *   5. Create useFaqItems() hook (React Query) to fetch from API
 *   6. Replace the usePage<FaqPageContent>("faq") call with the new hook
 *   7. Categories can be re-added as a filter when the DB provides them
 *
 * SEO: FaqStructuredData renders JSON-LD for Google rich results.
 * Keep this even after DB migration - it helps search ranking.
 * ═══════════════════════════════════════════════════════════════ */
export function FaqPage() {
  const { data: page } = usePage<FaqPageContent>("faq");
  useResolvedPageSeo(page, routes.faq);

  const content = page?.content;
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleToggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  /* ── Filter items by search ── */
  const filteredItems = useMemo(() => {
    if (!content) return [];
    let items = content.items;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.question.toLowerCase().includes(q) ||
          item.answer.toLowerCase().includes(q)
      );
    }
    return items;
  }, [content, searchQuery]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    setOpenIndex(null);
  }, []);

  if (!content) return null;

  return (
    <>
            <FaqStructuredData items={content.items} />
            <StructuredData heroTitle={content.hero.title} heroDescription={content.hero.description} breadcrumbs={[{ name: 'FAQ', path: routes.faq }]} pageType="FAQPage" />

            {/* ─── Breadcrumb ─── */}
            <div className="max-w-[min(1240px,calc(100%-2rem))] mx-auto px-4 sm:px-6 lg:px-8 pt-4">
              <Breadcrumb items={[{ label: "Home", href: routes.home, icon: Home }, { label: "Resources", href: routes.resources }, { label: "FAQ" }]} />
            </div>

            {/* ─── Two-Column FAQ Section ─── */}
            <section className="pb-16 md:pb-24">
              <div className="max-w-[min(1240px,calc(100%-2rem))] mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-14">
                <div className="grid lg:grid-cols-[2fr_3fr] lg:gap-16 gap-10 items-start">

                  {/* ═══ LEFT COLUMN: Title + Search + CTA ═══ */}
                  <div className="lg:sticky lg:top-28">
                    {/* Title block */}
                    <h1 className="text-[clamp(2.25rem,5vw,3.5rem)] font-bold tracking-tight text-text leading-[1.05]">
                      {content.hero.title || "Questions?"}
                    </h1>
                    <p className="mt-4 text-base sm:text-[0.9375rem] text-text-muted leading-relaxed max-w-md">
                      {content.hero.description || "If you have questions, we have answers for you here. In case we don't, please feel free to reach out to us."}
                    </p>

                    {/* Search bar */}
                    <div className="mt-6">
                      <div className="relative w-full max-w-sm">
                        <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-soft" />
                        <input
                          type="search"
                          placeholder="Search questions..."
                          value={searchQuery}
                          onChange={(e) => handleSearchChange(e.target.value)}
                          className="w-full h-10 pl-10 pr-4 rounded-xl border border-border-soft bg-surface text-text placeholder:text-text-soft text-sm outline-none transition-all focus:border-accent/40 focus:ring-2 focus:ring-accent/15"
                          aria-label="Search FAQ questions"
                        />
                        {searchQuery && (
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[0.7rem] font-semibold text-text-soft">
                            {filteredItems.length}/{content.items.length}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Contact CTA - left column (desktop) */}
                    <div className="mt-8 hidden lg:block">
                      <div className="rounded-2xl border border-accent/12 bg-gradient-to-br from-accent/[0.04] via-accent/[0.01] to-transparent p-5">
                        <div className="flex items-start gap-3">
                          <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-accent/10 text-accent shrink-0">
                            <MessageCircle className="w-4.5 h-4.5" />
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-text mb-1">
                              Can&apos;t find your answer?
                            </p>
                            <p className="text-xs text-text-muted leading-relaxed">
                              Our team responds within one business day.
                            </p>
                          </div>
                        </div>
                        <Button size="standard" variant="primary" href={routes.contact} className="w-full mt-4">
                          Contact Exxonim
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* ═══ RIGHT COLUMN: FAQ Accordion (flat, no container) ═══ */}
                  <div>
                    {/* Search result count */}
                    {searchQuery && (
                      <p className="mb-4 text-sm text-text-soft">
                        {filteredItems.length} result{filteredItems.length !== 1 ? "s" : ""} found
                      </p>
                    )}

                    {/* FAQ list - flat with straight line dividers, no card wrapper */}
                    <div>
                      {filteredItems.length > 0 ? (
                        filteredItems.map((item, index) => (
                          <FaqAccordionItem
                            key={item.question}
                            question={item.question}
                            answer={item.answer}
                            isOpen={openIndex === index}
                            onToggle={() => handleToggle(index)}
                            isLast={index === filteredItems.length - 1}
                          />
                        ))
                      ) : (
                        <EmptyState
                          searchQuery={searchQuery}
                          onClear={() => handleSearchChange("")}
                        />
                      )}
                    </div>

                    {/* Mobile: Contact CTA */}
                    <div className="lg:hidden mt-6 p-5 rounded-2xl bg-gradient-to-br from-accent/[0.04] via-accent/[0.01] to-transparent border border-accent/12">
                      <div className="flex items-start gap-4">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-accent/10 text-accent shrink-0">
                          <MessageCircle className="w-5 h-5" />
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-text mb-1">
                            Can&apos;t find your answer?
                          </p>
                          <p className="text-xs text-text-muted leading-relaxed">
                            Our team responds within one business day.
                          </p>
                        </div>
                        <Button size="standard" variant="primary" href={routes.contact} className="shrink-0">
                          Contact us
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ─── Newsletter / Still have questions ─── */}
            <UnifiedCtaSection
              eyebrow={{ icon: <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />, text: "Stay Updated" }}
              heading="Still have questions?"
              description="Get answers to new compliance questions delivered to your inbox as we publish them. No spam - just what matters for your business in Tanzania."
            >
              <NewsletterForm />
            </UnifiedCtaSection>
    </>
  );
}
