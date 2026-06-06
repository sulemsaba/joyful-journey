"use client";

import { useState, useCallback, useMemo } from "react";
import { Breadcrumb } from "@/exxonim/components/Breadcrumb";
import { Button } from "@/exxonim/components/primitives/Button";
import { LoadBoundary } from "@/exxonim/components/LoadBoundary";
import { NewsletterSection } from "@/exxonim/components/NewsletterSection";
import { usePage } from "@/exxonim/hooks/usePage";
import { useResolvedPageSeo } from "@/exxonim/hooks/useResolvedSeo";
import { routes } from "@/exxonim/routes";
import { Home, MessageCircle, Search, ChevronDown } from "lucide-react";
import type { FaqPageContent } from '@/exxonim/types';

/* ═══════════════════════════════════════════════════════════════
 * FaqStructuredData — JSON-LD for Google rich results
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
 * FAQ CATEGORIES — grouped by topic for the filter pills
 *
 * BACKEND / ADMIN NOTE:
 * When FAQ items come from the database, each item should have
 * a `category` field (e.g., "registration", "licensing", "tax",
 * "tracking", "general"). Admin can assign categories when
 * creating/editing FAQ items. The categories below define the
 * display order and labels.
 * ═══════════════════════════════════════════════════════════════ */
const FAQ_CATEGORIES = [
  { id: "all", label: "All Questions" },
  { id: "registration", label: "Registration" },
  { id: "licensing", label: "Licensing" },
  { id: "tax", label: "Tax & TIN" },
  { id: "tracking", label: "Tracking" },
  { id: "general", label: "General" },
] as const;

type FaqCategoryId = typeof FAQ_CATEGORIES[number]["id"];

/**
 * Assigns a category to a FAQ item based on keyword matching.
 *
 * BACKEND NOTE: When FAQ items are stored in the database with a
 * `category` column, this function becomes unnecessary — the
 * category will come directly from the API response.
 */
function inferCategory(question: string, _answer: string): FaqCategoryId {
  const q = question.toLowerCase();
  if (q.includes("register") || q.includes("entity") || q.includes("company") || q.includes("brela")) return "registration";
  if (q.includes("licenc") || q.includes("license") || q.includes("renewal") || q.includes("permit")) return "licensing";
  if (q.includes("tin") || q.includes("tax")) return "tax";
  if (q.includes("track") || q.includes("status") || q.includes("consultation")) return "tracking";
  return "general";
}

/* ═══════════════════════════════════════════════════════════════
 * FaqAccordionItem — single expandable FAQ item
 *
 * Design: Clean card with numbered badge, smooth grid-rows
 * animation, and a subtle accent left border when expanded.
 * ═══════════════════════════════════════════════════════════════ */
function FaqAccordionItem({
  index,
  question,
  answer,
  category,
  isOpen,
  onToggle,
}: {
  index: number;
  question: string;
  answer: string;
  category: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`group relative rounded-2xl border transition-all duration-300 ${
        isOpen
          ? "border-accent/30 bg-surface shadow-sm shadow-accent/5"
          : "border-border-soft bg-surface/60 hover:border-border-strong hover:bg-surface/90"
      }`}
    >
      {/* Left accent bar when expanded */}
      <div
        className={`absolute left-0 top-4 bottom-4 w-[3px] rounded-full transition-all duration-300 ${
          isOpen ? "bg-accent opacity-100" : "bg-accent opacity-0"
        }`}
      />

      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-start gap-4 p-5 sm:p-6 text-left cursor-pointer"
        aria-expanded={isOpen}
      >
        {/* Number badge */}
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-sm font-bold transition-all duration-300 ${
            isOpen
              ? "bg-accent text-accent-contrast"
              : "bg-accent-soft/60 text-accent group-hover:bg-accent group-hover:text-accent-contrast"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="flex-1 min-w-0">
          <h3
          className={`text-[0.9375rem] sm:text-base leading-snug transition-colors duration-200 ${
            isOpen ? "font-semibold text-text" : "font-medium text-text-muted group-hover:text-text"
          }`}
        >
          {question}
        </h3>
          {/* Category pill — visible when collapsed */}
          {!isOpen && (
            <span className="mt-1.5 inline-flex items-center rounded-md bg-accent-soft/40 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-accent/70">
              {category}
            </span>
          )}
        </div>

        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
            isOpen
              ? "bg-accent/10 text-accent"
              : "bg-transparent text-text-soft group-hover:bg-accent-soft group-hover:text-accent"
          }`}
          aria-hidden="true"
        >
          <ChevronDown
            className="w-4 h-4 transition-transform duration-300"
            style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        </span>
      </button>

      {/* Expandable answer */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 sm:px-6 pb-5 sm:pb-6 pl-[4.5rem] sm:pl-[5rem]">
            <div className="h-px bg-border-soft mb-4" />
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
 * SearchBar — filter FAQ items by question/answer text
 * ═══════════════════════════════════════════════════════════════ */
function FaqSearchBar({
  value,
  onChange,
  resultCount,
  totalCount,
}: {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
  totalCount: number;
}) {
  return (
    <div className="relative w-full max-w-lg">
      <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-text-soft" />
      <input
        type="search"
        placeholder="Search questions..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-11 pl-11 pr-20 rounded-xl border border-border-soft bg-surface text-text placeholder:text-text-soft text-sm outline-none transition-all focus:border-accent/40 focus:ring-2 focus:ring-accent/15"
        aria-label="Search FAQ questions"
      />
      {value && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[0.7rem] font-semibold text-text-soft">
          {resultCount}/{totalCount}
        </span>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
 * CategoryPills — filter pills for FAQ categories
 * ═══════════════════════════════════════════════════════════════ */
function CategoryPills({
  categories,
  selected,
  onSelect,
  counts,
}: {
  categories: readonly { id: string; label: string }[];
  selected: FaqCategoryId;
  onSelect: (id: FaqCategoryId) => void;
  counts: Record<string, number>;
}) {
  return (
    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="FAQ categories">
      {categories.map((cat) => {
        const isActive = selected === cat.id;
        return (
          <button
            key={cat.id}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => onSelect(cat.id as FaqCategoryId)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-semibold transition-all ${
              isActive
                ? "bg-accent text-accent-contrast border-accent shadow-sm shadow-accent/20"
                : "border-border-soft bg-surface/60 text-text-muted hover:bg-surface hover:text-text hover:border-border-strong"
            }`}
          >
            {cat.label}
            <span className={`text-[0.65rem] font-bold px-1.5 py-0.5 rounded-full ${
              isActive
                ? "bg-accent-contrast/20 text-accent-contrast"
                : "bg-surface-soft text-text-soft"
            }`}>
              {counts[cat.id] ?? 0}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
 * EmptyState — shown when search/filter returns no results
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
        Try different keywords or browse all questions by category.
      </p>
      <Button size="standard" variant="primary" onClick={onClear}>
        Clear search
      </Button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
 * FaqPage — Full page with hero, search, categories, accordion
 *
 * ═══════════════════════════════════════════════════════════════
 * BACKEND / ADMIN INTEGRATION NOTES
 * ═══════════════════════════════════════════════════════════════
 *
 * DATABASE SCHEMA (Prisma):
 *   model FaqItem {
 *     id         String   @id @default(cuid())
 *     question   String   // max 120 chars — backend must validate
 *     answer     String   // max 500 chars — backend must validate
 *     category   String   // "registration" | "licensing" | "tax" | "tracking" | "general"
 *     sort_order Int      @default(0) // lower = shown first
 *     is_active  Boolean  @default(true) // only active items appear publicly
 *     createdAt  DateTime @default(now())
 *     updatedAt  DateTime @updatedAt
 *   }
 *
 * API ENDPOINTS:
 *   GET    /api/v1/faq              — List all active FAQ items (public)
 *   GET    /api/v1/faq/:id          — Get single FAQ item
 *   POST   /api/v1/faq              — Create FAQ item (admin only)
 *   PUT    /api/v1/faq/:id          — Update FAQ item (admin only)
 *   DELETE /api/v1/faq/:id          — Delete FAQ item (admin only)
 *   PATCH  /api/v1/faq/reorder      — Reorder items (admin only)
 *
 * ADMIN FORM:
 *   question   — Text input, required, max 120 chars
 *   answer     — Textarea, required, max 500 chars
 *   category   — Select dropdown (registration, licensing, tax, tracking, general)
 *   sort_order — Number input (drag-and-drop reorder in admin UI)
 *   is_active  — Toggle switch
 *
 * MIGRATION PATH:
 *   1. Add FaqItem model to prisma/schema.prisma
 *   2. Run `bun run db:push` to create the table
 *   3. Seed with existing fallback FAQ items
 *   4. Add GET /api/v1/faq endpoint to the catch-all API route
 *   5. Create useFaqItems() hook (React Query) to fetch from API
 *   6. Replace the usePage<FaqPageContent>("faq") call with the new hook
 *   7. Remove the inferCategory() function — category comes from DB
 * ═══════════════════════════════════════════════════════════════ */
export function FaqPage() {
  const { data: page, isPending, error } = usePage<FaqPageContent>("faq");
  useResolvedPageSeo(page, routes.faq);

  const content = page?.content;
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<FaqCategoryId>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleToggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  /* ── Enrich items with categories ── */
  const enrichedItems = useMemo(() => {
    if (!content) return [];
    return content.items.map((item) => ({
      ...item,
      category: inferCategory(item.question, item.answer),
    }));
  }, [content]);

  /* ── Category counts ── */
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: enrichedItems.length };
    for (const item of enrichedItems) {
      counts[item.category] = (counts[item.category] ?? 0) + 1;
    }
    return counts;
  }, [enrichedItems]);

  /* ── Filter items ── */
  const filteredItems = useMemo(() => {
    let items = enrichedItems;
    if (selectedCategory !== "all") {
      items = items.filter((item) => item.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.question.toLowerCase().includes(q) ||
          item.answer.toLowerCase().includes(q)
      );
    }
    return items;
  }, [enrichedItems, selectedCategory, searchQuery]);

  /* ── Reset open index when filters change ── */
  const handleCategorySelect = useCallback((id: FaqCategoryId) => {
    setSelectedCategory(id);
    setOpenIndex(null);
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    setOpenIndex(null);
  }, []);

  return (
    <LoadBoundary
      error={error}
      errorDetail="The FAQ content could not be loaded right now."
      errorTitle="Unable to load the FAQ."
      isPending={isPending}
      isReady={Boolean(content)}
      loadingLabel="Loading FAQ..."
    >
      {() => {
        if (!content) return null;
        return (
          <>
            <FaqStructuredData items={content.items} />

            {/* ─── Breadcrumb ─── */}
            <div className="max-w-[min(1240px,calc(100%-2rem))] mx-auto px-4 sm:px-6 lg:px-8 pt-4">
              <Breadcrumb items={[{ label: "Home", href: routes.home, icon: Home }, { label: "Resources", href: routes.resources }, { label: "FAQ" }]} />
            </div>

            {/* ─── Hero Section ─── */}
            <section className="relative overflow-hidden">
              {/* Decorative gradient background */}
              <div
                className="absolute inset-0 -z-10 opacity-60"
                style={{
                  background:
                    "radial-gradient(50% 60% at 80% 0%, hsl(var(--accent) / 0.12), transparent 70%), radial-gradient(30% 40% at 10% 20%, hsl(var(--accent) / 0.06), transparent 70%)",
                }}
              />

              <div className="w-[min(1240px,calc(100%-2rem))] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 md:pt-16 md:pb-16" data-reveal>
                <div className="max-w-2xl">
                  <p className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-soft text-[0.7rem] font-extrabold uppercase tracking-[0.14em] text-accent mb-5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    {content.hero.eyebrow}
                  </p>
                  <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-bold tracking-tight text-text leading-[1.1]">
                    {content.hero.title}
                  </h1>
                  <p className="mt-4 text-base sm:text-lg text-text-muted leading-relaxed max-w-xl">
                    {content.hero.description}
                  </p>
                </div>

                {/* Search bar */}
                <div className="mt-8">
                  <FaqSearchBar
                    value={searchQuery}
                    onChange={handleSearchChange}
                    resultCount={filteredItems.length}
                    totalCount={enrichedItems.length}
                  />
                </div>
              </div>
            </section>

            {/* ─── Stats Bar ─── */}
            <div className="border-b border-border-soft bg-surface-elevated/50">
              <div className="w-[min(1240px,calc(100%-2rem))] mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex flex-wrap items-center gap-6 sm:gap-10 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-accent">{content.items.length}</span>
                    <span className="text-text-muted">Questions answered</span>
                  </div>
                  <div className="hidden sm:block h-6 w-px bg-border-soft" />
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-text">{FAQ_CATEGORIES.length - 1}</span>
                    <span className="text-text-muted">Categories</span>
                  </div>
                  <div className="hidden sm:block h-6 w-px bg-border-soft" />
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-accent" />
                    <span className="text-text-muted">Updated regularly</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ─── FAQ Accordion Section ─── */}
            <section className="pb-16 md:pb-24">
              <div className="w-[min(1240px,calc(100%-2rem))] mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
                {/* Category pills */}
                <div className="mb-8">
                  <CategoryPills
                    categories={FAQ_CATEGORIES}
                    selected={selectedCategory}
                    onSelect={handleCategorySelect}
                    counts={categoryCounts}
                  />
                </div>

                <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-12">
                  {/* ─── FAQ Accordion List ─── */}
                  <div className="flex flex-col gap-3">
                    {filteredItems.length > 0 ? (
                      filteredItems.map((item, index) => (
                        <FaqAccordionItem
                          key={item.question}
                          index={index}
                          question={item.question}
                          answer={item.answer}
                          category={FAQ_CATEGORIES.find(c => c.id === item.category)?.label ?? item.category}
                          isOpen={openIndex === index}
                          onToggle={() => handleToggle(index)}
                        />
                      ))
                    ) : (
                      <EmptyState
                        searchQuery={searchQuery}
                        onClear={() => handleSearchChange("")}
                      />
                    )}
                  </div>

                  {/* ─── Right Sidebar (desktop) ─── */}
                  <aside className="hidden lg:block">
                    <div className="sticky top-28 space-y-6">
                      {/* Contact CTA card */}
                      <div className="relative overflow-hidden rounded-2xl border border-accent/15 bg-gradient-to-br from-accent/5 via-accent/[0.02] to-transparent p-6">
                        <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-accent/5" />
                        <div className="absolute -left-2 -bottom-2 w-14 h-14 rounded-full bg-accent/[0.03]" />
                        <div className="relative">
                          <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-accent/10 text-accent mb-4">
                            <MessageCircle className="w-5 h-5" />
                          </span>
                          <p className="text-sm font-bold text-text mb-2">
                            Can&apos;t find your answer?
                          </p>
                          <p className="text-xs text-text-muted mb-5 leading-relaxed">
                            Reach out to our team and we&apos;ll get back to you within one business day.
                          </p>
                          <Button size="standard" variant="primary" href={routes.contact} className="w-full">
                            Contact Exxonim
                          </Button>
                        </div>
                      </div>

                      {/* Helpful links */}
                      <div className="rounded-2xl border border-border-soft bg-surface/60 p-5">
                        <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-text-soft mb-3">
                          Helpful links
                        </p>
                        <nav className="flex flex-col gap-2">
                          <a href={routes.services} className="text-sm text-text-muted hover:text-accent transition-colors">
                            Our Services &rarr;
                          </a>
                          <a href={routes.trackConsultation} className="text-sm text-text-muted hover:text-accent transition-colors">
                            Track Consultation &rarr;
                          </a>
                          <a href={routes.resources} className="text-sm text-text-muted hover:text-accent transition-colors">
                            Resources & Guides &rarr;
                          </a>
                        </nav>
                      </div>
                    </div>
                  </aside>
                </div>

                {/* ─── Mobile: Contact CTA ─── */}
                <div className="lg:hidden mt-8 p-5 rounded-2xl bg-gradient-to-br from-accent/5 via-accent/[0.02] to-transparent border border-accent/15">
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
                    <Button size="compact" variant="primary" href={routes.contact} className="shrink-0">
                      Contact us
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            {/* ─── Newsletter / Still have questions ─── */}
            <section className="pb-16 md:pb-24">
              <div className="w-[min(1240px,calc(100%-2rem))] mx-auto px-4 sm:px-6 lg:px-8">
                <NewsletterSection
                  heading="Still have questions?"
                  description="Get answers to new compliance questions delivered to your inbox as we publish them. No spam — just what matters for your business in Tanzania."
                />
              </div>
            </section>
          </>
        );
      }}
    </LoadBoundary>
  );
}
