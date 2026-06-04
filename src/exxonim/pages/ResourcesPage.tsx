/**
 * Resources landing page — the hub for ALL Exxonim resources.
 *
 * LAYOUT:
 * ─────────
 * ┌───────────────────────────────────────────────────────────┐
 * │  Hero: "Resources" title + description + SEARCH BAR      │
 * ├───────────────────────────────────────────────────────────┤
 * │  Quick-access cards (3: Guides & Articles, FAQ, Support) │
 * ├───────────────────────────────────────────────────────────┤
 * │  Trending reads (hero post + 3 rail items)                │
 * │  (hidden when search is active)                           │
 * ├───────────────────────────────────────────────────────────┤
 * │  Category filter pills + Sort toggle + Result count      │
 * │  ┌──────────┐ ┌──────────┐ ┌──────────┐                  │
 * │  │  card 1  │ │  card 2  │ │  card 3  │                  │
 * │  └──────────┘ └──────────┘ └──────────┘                  │
 * │              [See more]                                    │
 * ├───────────────────────────────────────────────────────────┤
 * │  Newsletter subscription (email input + subscribe button)  │
 * ├───────────────────────────────────────────────────────────┤
 * │  CTA: "Can't find what you need?"                         │
 * └───────────────────────────────────────────────────────────┘
 *
 * FEATURES:
 * ─────────
 * 1. SEARCH: Filters posts by title and excerpt (case-insensitive).
 *    When search is active, the trending section is hidden.
 * 2. SORT: Toggle between "Latest" (newest first) and "Popular"
 *    (heuristic: featuredSlot posts first, then by readTimeMinutes).
 * 3. NEWSLETTER: Email subscription section with inline input + button.
 * 4. QUICK-ACCESS: 3 cards only (Guides & Articles, FAQ, Support).
 *    Track Consultation is NOT a resource — it's a service feature
 *    already prominent in the navigation.
 * 5. EMPTY STATES: Friendly "No results" when search/filter returns nothing.
 * 6. SEARCH + FILTER: Search works together with category filter.
 *
 * BACKEND / ADMIN INTEGRATION NOTES:
 * ──────────────────────────────────
 * 1. SEARCH: Client-side filtering only. For larger post counts,
 *    move to server-side search via blog posts API with ?q= parameter.
 *
 * 2. SORT: "Popular" uses a heuristic (featuredSlot weighting +
 *    readTimeMinutes). Replace with real view counts from analytics
 *    when available via the API.
 *
 * 3. NEWSLETTER: Currently a UI placeholder. Wire to a real email
 *    subscription endpoint (e.g., POST /api/newsletter/subscribe).
 *
 * 4. QUICK-ACCESS CARDS: Static links to key resource pages.
 *    Admin can manage these via the pages API in the future.
 *
 * 5. TRENDING SECTION: hero post + 3 rail items determined by
 *    featuredSlot ("hero", "popular", "editors-pick").
 *
 * 6. CATEGORY FILTER + GRID: Categories from blog_categories API,
 *    posts from blog posts API. INITIAL_VISIBLE_COUNT = 6 cards,
 *    "See more" adds 6 more.
 *
 * 7. This page lives at /resources/. The /blog/ route is an alias.
 *    Individual articles live at /resources/{slug}/.
 */

import { useMemo, useState } from "react";
import { Breadcrumb } from "@/exxonim/components/Breadcrumb";
import { LoadBoundary } from "@/exxonim/components/LoadBoundary";
import { NewsletterSection } from "@/exxonim/components/NewsletterSection";
import { useBlogCategories } from "@/exxonim/hooks/useBlogCategories";
import { useBlogPosts } from "@/exxonim/hooks/useBlogPosts";
import { usePage } from "@/exxonim/hooks/usePage";
import { useResolvedPageSeo } from "@/exxonim/hooks/useResolvedSeo";
import { resourceArticlePath, routes } from "@/exxonim/routes";
import type {
  BlogCategoryId,
  BlogFeaturedSlot,
  BlogPost,
  ResourcesPageContent,
} from '@/exxonim/types';
import { buildResourcesBlogLayout, getVisibleBlogPosts } from "@/exxonim/utils/blog";

const INITIAL_VISIBLE_COUNT = 6;
type ActiveCategory = BlogCategoryId | "all";
type SortMode = "latest" | "popular";

const blogDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

function formatBlogDate(date: string) {
  return blogDateFormatter.format(new Date(`${date}T00:00:00Z`));
}

function getAuthorInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

/* ── Popular sort heuristic ── */
function comparePostsPopularFirst(left: BlogPost, right: BlogPost) {
  // Featured posts come first (hero > popular > editors-pick)
  const slotWeight: Record<string, number> = { hero: 3, popular: 2, "editors-pick": 1 };
  const leftWeight = left.featuredSlot ? (slotWeight[left.featuredSlot] ?? 0) : 0;
  const rightWeight = right.featuredSlot ? (slotWeight[right.featuredSlot] ?? 0) : 0;
  if (leftWeight !== rightWeight) return rightWeight - leftWeight;

  // Then by read time (longer reads assumed more substantive/popular)
  const leftRead = left.readTimeMinutes ?? 0;
  const rightRead = right.readTimeMinutes ?? 0;
  if (rightRead !== leftRead) return rightRead - leftRead;

  // Tie-break by date
  return new Date(`${right.publishedAt}T00:00:00Z`).getTime() - new Date(`${left.publishedAt}T00:00:00Z`).getTime();
}

/* ── Quick-access resource cards (3 only — Track Consultation is a service, not a resource) ── */
const RESOURCE_CARDS = [
  {
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    title: "Guides & Articles",
    description: "Step-by-step guides, checklists, and practical notes for registration, compliance, and operations.",
    href: "#articles",
    accent: "bg-accent/10 text-accent",
  },
  {
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
      </svg>
    ),
    title: "FAQ",
    description: "Quick answers to the most common questions about business setup, licensing, and compliance in Tanzania.",
    href: routes.faq,
    accent: "bg-accent/10 text-accent",
  },
  {
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
    title: "Support",
    description: "Get direct help from Exxonim — WhatsApp, email, or phone. We respond during business hours.",
    href: routes.support,
    accent: "bg-accent/10 text-accent",
  },
];

/* ── Shared card components ── */

function Tag({ label }: { label: string }) {
  return (
    <span className="absolute left-4 top-4 z-[2] inline-flex min-h-[28px] items-center rounded-full border border-accent-contrast/20 bg-accent-contrast/40 px-3 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-accent-contrast/90">
      {label}
    </span>
  );
}

function MediaOverlay({ category, label }: { category?: string; label: string }) {
  return (
    <div className="absolute inset-x-4 bottom-4 z-[2] grid gap-1.5 text-accent-contrast/90">
      {category ? (
        <span className="text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-accent-contrast/75">
          {category}
        </span>
      ) : null}
      <strong className="text-sm font-bold leading-snug">{label}</strong>
    </div>
  );
}

function renderCardMedia(post: BlogPost, categoryLabel?: string) {
  if (post.coverImageSrc) {
    return (
      <>
        {categoryLabel ? <Tag label={categoryLabel} /> : null}
        <img
          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
          src={post.coverImageSrc}
          alt={post.coverAlt ?? post.title}
          loading="lazy"
        />
        <MediaOverlay category={categoryLabel} label={post.mediaLabel || post.title} />
      </>
    );
  }

  return (
    <>
      {categoryLabel ? <Tag label={categoryLabel} /> : null}
      <div className="relative flex h-full w-full items-end p-5 bg-[radial-gradient(circle_at_15%_18%,var(--color-accent-soft-strong),transparent_28%),radial-gradient(circle_at_88%_82%,var(--color-surface-elevated),transparent_24%),linear-gradient(150deg,var(--color-accent-soft),var(--color-page-strong))]">
        <span
          aria-hidden="true"
          className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-accent-contrast/20 bg-accent-contrast/30 text-lg font-bold tracking-tight text-accent-contrast/90"
        >
          E
        </span>
        <span aria-hidden="true" className="absolute left-5 top-16 h-3.5 w-24 rounded-full bg-accent-contrast/15" />
        <span aria-hidden="true" className="absolute left-5 top-[84px] h-3.5 w-16 rounded-full bg-accent-contrast/15" />
        <div className="relative z-[1] grid max-w-[70%] gap-2 text-accent-contrast/90">
          {categoryLabel ? (
            <span className="text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-accent-contrast/75">
              {categoryLabel}
            </span>
          ) : null}
          <strong className="text-sm font-bold leading-snug">
            {post.mediaLabel || post.title}
          </strong>
        </div>
      </div>
    </>
  );
}

function renderAuthor(post: BlogPost) {
  if (!post.author) return null;
  return (
    <div className="inline-flex min-w-0 items-center gap-2.5">
      {post.author.avatarSrc ? (
        <img className="w-8 h-8 rounded-full object-cover" src={post.author.avatarSrc} alt={post.author.name} loading="lazy" />
      ) : (
        <span
          className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-accent/15 to-accent/30 text-[0.75rem] font-bold text-text"
          aria-hidden="true"
        >
          {getAuthorInitials(post.author.name)}
        </span>
      )}
      <span className="grid min-w-0 gap-[2px]">
        <span className="truncate text-[0.82rem] font-bold text-text">{post.author.name}</span>
        {post.author.role ? (
          <span className="truncate text-[0.72rem] text-text-soft">{post.author.role}</span>
        ) : null}
      </span>
    </div>
  );
}

/* ── Grid card ── */
function renderGridCard(post: BlogPost) {
  const categoryLabel = post.category?.label;
  const articleLink = resourceArticlePath(post.slug);
  const metaParts = [formatBlogDate(post.publishedAt)];
  if (categoryLabel) metaParts.push(categoryLabel);

  return (
    <article className="group relative flex min-w-0 flex-col overflow-hidden rounded-[24px] border border-border-soft bg-surface shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-border-strong hover:shadow-card">
      <div className="relative isolate aspect-[16/10] overflow-hidden after:pointer-events-none after:absolute after:inset-0 after:bg-gradient-to-b after:from-transparent after:from-30% after:to-overlay/50 bg-[radial-gradient(circle_at_top_right,var(--color-accent-soft-strong),transparent_48%),linear-gradient(160deg,var(--color-page-strong),var(--color-accent-soft-strong))]">
        {renderCardMedia(post, categoryLabel)}
      </div>
      <div className="flex flex-1 flex-col bg-surface p-5 pb-[18px]">
        <span className="mb-2.5 text-[0.72rem] font-bold uppercase tracking-[0.09em] text-text-soft">
          {metaParts.join(" | ")}
        </span>
        <h3 className="m-0 mb-2 text-[clamp(1.1rem,1.8vw,1.35rem)] font-medium leading-tight tracking-tight text-text line-clamp-2">
          {post.title}
        </h3>
        <p className="m-0 text-[0.9rem] leading-relaxed text-text-muted line-clamp-2">
          {post.excerpt}
        </p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-4 max-md:flex-col max-md:items-start max-md:gap-3">
          {renderAuthor(post)}
          <a
            href={articleLink}
            className="inline-flex items-center gap-1.5 whitespace-nowrap text-[0.85rem] font-bold text-accent transition-colors hover:text-accent-hover"
          >
            Learn more
            <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-[2px]">
              &rarr;
            </span>
          </a>
        </div>
      </div>
    </article>
  );
}

/* ── Top section: hero post + trending rail ── */
function renderTopHeroByline(post: BlogPost) {
  const metaParts = [formatBlogDate(post.publishedAt)];
  if (post.readTimeMinutes) metaParts.push(`${post.readTimeMinutes} min read`);

  return (
    <div className="flex flex-wrap items-center gap-3 mt-4 text-sm text-text-soft">
      {post.author ? (
        <div className="flex items-center gap-2.5">
          {post.author.avatarSrc ? (
            <img className="w-8 h-8 rounded-full object-cover" src={post.author.avatarSrc} alt={post.author.name} loading="lazy" />
          ) : (
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-accent font-bold text-xs" aria-hidden="true">
              {getAuthorInitials(post.author.name)}
            </span>
          )}
          <span className="text-sm font-semibold text-text">{post.author.name}</span>
        </div>
      ) : null}
      {post.author?.role ? (
        <span className="text-xs text-text-soft">{post.author.role}</span>
      ) : null}
      <span className="text-xs text-text-soft">{metaParts.join(" | ")}</span>
    </div>
  );
}

function renderTopListItem(post: BlogPost, index: number, trendingMedia: string[] = []) {
  const categoryLabel = post.category?.label;
  const articleLink = resourceArticlePath(post.slug);
  const metaParts = [formatBlogDate(post.publishedAt)];
  const thumbnailSrc = post.coverImageSrc ?? trendingMedia[index] ?? trendingMedia[trendingMedia.length - 1];
  if (post.readTimeMinutes) metaParts.push(`${post.readTimeMinutes} min`);

  return (
    <a href={articleLink} className="group flex gap-3.5 p-3 rounded-xl border border-border-soft bg-surface/60 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:shadow-panel">
      <div className="w-20 h-16 rounded-lg overflow-hidden shrink-0">
        <img className="w-full h-full object-cover" src={thumbnailSrc} alt={post.coverAlt ?? post.title} loading="lazy" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-bold text-text line-clamp-2 group-hover:text-accent transition-colors">{post.title}</h3>
        <div className="flex flex-wrap items-center gap-2 mt-1.5">
          <span className="text-xs text-text-soft">{metaParts.join(" | ")}</span>
          {categoryLabel ? (
            <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-[0.65rem] font-bold uppercase tracking-wider">{categoryLabel}</span>
          ) : null}
        </div>
      </div>
    </a>
  );
}

/* ── Category filter pills ── */
function CategoryFilter({
  categories,
  selectedCategory,
  onSelect,
}: {
  categories: { id: ActiveCategory; label: string }[];
  selectedCategory: ActiveCategory;
  onSelect: (id: ActiveCategory) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2.5" aria-label="Blog categories">
      {categories.map((cat) => {
        const isActive = selectedCategory === cat.id;
        return (
          <button
            key={cat.id}
            type="button"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold transition-all ${
              isActive
                ? "bg-accent text-accent-contrast border-accent"
                : "border-border-soft bg-surface/60 text-text-muted hover:bg-surface hover:text-text"
            }`}
            aria-pressed={isActive}
            onClick={() => onSelect(cat.id)}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}

/* ── Sort toggle ── */
function SortToggle({
  sortMode,
  onChange,
}: {
  sortMode: SortMode;
  onChange: (mode: SortMode) => void;
}) {
  return (
    <div className="inline-flex items-center rounded-full border border-border-soft bg-surface/60 p-0.5" role="radiogroup" aria-label="Sort articles">
      <button
        type="button"
        role="radio"
        aria-checked={sortMode === "latest"}
        className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
          sortMode === "latest"
            ? "bg-accent text-accent-contrast shadow-sm"
            : "text-text-muted hover:text-text"
        }`}
        onClick={() => onChange("latest")}
      >
        Latest
      </button>
      <button
        type="button"
        role="radio"
        aria-checked={sortMode === "popular"}
        className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
          sortMode === "popular"
            ? "bg-accent text-accent-contrast shadow-sm"
            : "text-text-muted hover:text-text"
        }`}
        onClick={() => onChange("popular")}
      >
        Popular
      </button>
    </div>
  );
}

/* ── Search bar ── */
function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative w-full max-w-sm">
      <svg
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-soft"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <input
        type="search"
        placeholder="Search articles..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-9 pl-10 pr-4 rounded-full border border-border-soft bg-surface-elevated text-text placeholder:text-text-soft text-sm outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/20"
        aria-label="Search articles by title or content"
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-6 h-6 rounded-full hover:bg-accent/10 text-text-soft hover:text-text transition-colors"
          aria-label="Clear search"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      ) : null}
    </div>
  );
}

/* ── Empty search results ── */
function EmptySearchState({ searchQuery, onClear }: { searchQuery: string; onClear: () => void }) {
  return (
    <article className="p-10 md:p-12 rounded-2xl border border-border-soft bg-surface/60 text-center">
      <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 text-accent mb-4">
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
          <path d="M8 11h6" />
        </svg>
      </span>
      <h3 className="m-0 text-xl font-bold text-text">
        No results for &ldquo;{searchQuery}&rdquo;
      </h3>
      <p className="mt-3 m-0 text-text-muted max-w-md mx-auto text-sm leading-relaxed">
        We couldn&rsquo;t find any articles matching your search. Try different keywords or browse all articles by category.
      </p>
      <button
        type="button"
        onClick={onClear}
        className="mt-5 inline-flex items-center justify-center min-h-[2.75rem] px-6 rounded-full bg-accent text-accent-contrast font-bold text-sm transition-all hover:-translate-y-0.5 hover:bg-accent-hover"
      >
        Clear search
      </button>
    </article>
  );
}

/* ── Main ResourcesPage component ── */
export function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState<ActiveCategory>("all");
  const [sortMode, setSortMode] = useState<SortMode>("latest");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  const {
    data: posts = [],
    isPending: postsPending,
    error: postsError,
  } = useBlogPosts();
  const {
    data: categories = [],
    isPending: categoriesPending,
    error: categoriesError,
  } = useBlogCategories();
  const {
    data: page,
    isPending: pagePending,
    error: pageError,
  } = usePage<ResourcesPageContent>("resources");

  useResolvedPageSeo(page, routes.resources);

  const isSearchActive = searchQuery.trim().length > 0;
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const topMedia = page?.content.top_media;
  const { heroPost, topRailPosts, topSectionSlugs: defaultTopSectionSlugs } =
    buildResourcesBlogLayout(posts);

  // When search is active, don't exclude top-section slugs (show all matching posts)
  const topSectionSlugs =
    selectedCategory === "all" && !isSearchActive ? defaultTopSectionSlugs : [];

  // Get posts filtered by category (and search)
  const categoryFilteredPosts = getVisibleBlogPosts({
    posts,
    categoryId: selectedCategory,
    excludeSlugs: topSectionSlugs,
  });

  // Apply search filter on top of category filter
  const searchFilteredPosts = useMemo(() => {
    if (!isSearchActive) return categoryFilteredPosts;
    return categoryFilteredPosts.filter((post) => {
      const titleMatch = post.title.toLowerCase().includes(normalizedQuery);
      const excerptMatch = post.excerpt.toLowerCase().includes(normalizedQuery);
      return titleMatch || excerptMatch;
    });
  }, [categoryFilteredPosts, isSearchActive, normalizedQuery]);

  // Apply sort
  const filteredPosts = useMemo(() => {
    if (sortMode === "popular") {
      return [...searchFilteredPosts].sort(comparePostsPopularFirst);
    }
    // "latest" — already sorted newest-first from getVisibleBlogPosts
    return searchFilteredPosts;
  }, [searchFilteredPosts, sortMode]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMorePosts = filteredPosts.length > visiblePosts.length;
  const activeCategory =
    selectedCategory === "all"
      ? null
      : categories.find((category) => category.id === selectedCategory);
  const heroMediaSrc = heroPost?.coverImageSrc ?? topMedia?.hero;
  const heroMediaAlt = heroPost?.coverAlt ?? heroPost?.title ?? page?.content.hero_title;

  // Only show trending section when no search is active and "all" category
  const showTopSection = selectedCategory === "all" && !isSearchActive && heroPost;

  const categoryOptions: { id: ActiveCategory; label: string }[] = [
    { id: "all", label: "All" },
    ...categories.map((cat) => ({ id: cat.id, label: cat.label })),
  ];

  const handleSelectCategory = (categoryId: ActiveCategory) => {
    setSelectedCategory(categoryId);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  const handleSortChange = (mode: SortMode) => {
    setSortMode(mode);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  return (
    <LoadBoundary
      error={postsError || categoriesError || pageError}
      errorDetail="The resources content could not be loaded right now."
      errorTitle="Unable to load resources."
      isPending={postsPending || categoriesPending || pagePending}
      isReady={Boolean(page)}
      loadingLabel="Loading resources..."
    >
      {() => {
        if (!page) return null;
        return (
          <div>
            {/* ── Hero ── */}
            <section className="relative overflow-hidden pb-12 md:pb-16">
              <div
                className="absolute inset-0 -z-10 opacity-50"
                style={{
                  background:
                    "radial-gradient(50% 60% at 80% 0%, hsl(var(--accent) / 0.14), transparent 70%), radial-gradient(30% 40% at 10% 20%, hsl(var(--accent) / 0.08), transparent 70%)",
                }}
              />
              <div className="max-w-[min(1240px,calc(100%-2rem))] mx-auto px-4 sm:px-6 lg:px-8 pt-4">
                <Breadcrumb items={[{ label: "Home", href: routes.home }, { label: "Resources" }]} />
              </div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
                <h1 className="text-[clamp(2rem,4vw,3.2rem)] font-semibold tracking-tight text-text leading-[1.1]">
                  {page.content.hero_title}
                </h1>
                <p className="mt-4 text-text-muted text-lg max-w-[42rem] leading-relaxed">
                  Everything you need to navigate Tanzanian business processes — guides, checklists, FAQs, and real-time consultation tracking.
                </p>
              </div>
            </section>

            {/* ── Quick-access resource cards (3 items) ── */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-16">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {RESOURCE_CARDS.map((card) => (
                  <a
                    key={card.title}
                    href={card.href}
                    className="group p-5 rounded-[1.35rem] border border-accent/10 bg-accent/[0.04] text-center transition-all duration-300 hover:bg-accent/[0.12] hover:border-accent/25 hover:-translate-y-0.5 flex flex-col items-center gap-2.5"
                  >
                    <span className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${card.accent} transition-transform duration-300 group-hover:scale-110`}>
                      {card.icon}
                    </span>
                    <strong className="text-text text-base">{card.title}</strong>
                    <p className="m-0 text-text-muted text-sm leading-relaxed line-clamp-2 max-w-[26ch]">
                      {card.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-accent text-sm font-bold group-hover:gap-2 transition-all">
                      Go <span aria-hidden="true">&rarr;</span>
                    </span>
                  </a>
                ))}
              </div>
            </section>

            {/* ── Trending section: Hero + Rail (hidden during search) ── */}
            {showTopSection ? (
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 md:mb-16">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[0.72rem] font-extrabold tracking-[0.2em] uppercase text-accent">
                    {page.content.trending_label ?? "Trending reads"}
                  </span>
                  <span className="flex-1 h-px bg-border-soft" />
                </div>
                <div className="grid lg:grid-cols-[1.3fr_1fr] gap-6 lg:gap-8 items-start">
                  {/* Hero post */}
                  <a
                    href={resourceArticlePath(heroPost!.slug)}
                    className="group block rounded-[24px] overflow-hidden border border-border-soft bg-surface/60 backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-card"
                  >
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                        src={heroMediaSrc}
                        alt={heroMediaAlt}
                      />
                    </div>
                    <div className="p-5 md:p-7">
                      <h2 className="text-xl md:text-2xl font-bold text-text group-hover:text-accent transition-colors leading-snug">
                        {heroPost!.title}
                      </h2>
                      <p className="mt-2.5 text-text-muted leading-relaxed text-sm md:text-base line-clamp-2">
                        {heroPost!.excerpt}
                      </p>
                      {renderTopHeroByline(heroPost!)}
                    </div>
                  </a>

                  {/* Trending rail */}
                  <aside className="space-y-3" aria-label={page.content.trending_label ?? "Trending articles"}>
                    {topRailPosts.map((post, index) => (
                      <div key={post.slug}>
                        {renderTopListItem(post, index, topMedia?.trending)}
                      </div>
                    ))}
                  </aside>
                </div>
              </section>
            ) : null}

            {/* ── Articles section with filter + sort ── */}
            <section id="articles" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-20">
              <div className="flex flex-col gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <h2 className="text-[clamp(1.5rem,2.5vw,2rem)] font-semibold tracking-tight text-text">
                    {isSearchActive ? "Search Results" : "All Articles"}
                  </h2>
                  <span className="flex-1 h-px bg-border-soft" />
                  <span className="text-sm text-text-muted font-mono whitespace-nowrap">
                    {filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <SearchBar value={searchQuery} onChange={handleSearchChange} />
                </div>
              </div>

              {/* Category filter + Sort toggle */}
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <CategoryFilter
                  categories={categoryOptions}
                  selectedCategory={selectedCategory}
                  onSelect={handleSelectCategory}
                />
                <div className="ml-auto">
                  <SortToggle sortMode={sortMode} onChange={handleSortChange} />
                </div>
              </div>

              {/* Grid cards or empty state */}
              {visiblePosts.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {visiblePosts.map((post) => (
                    <div key={post.slug}>{renderGridCard(post)}</div>
                  ))}
                </div>
              ) : isSearchActive ? (
                <EmptySearchState
                  searchQuery={searchQuery}
                  onClear={() => handleSearchChange("")}
                />
              ) : (
                <article className="p-10 md:p-12 rounded-2xl border border-border-soft bg-surface/60 text-center">
                  <span className="text-xs text-text-soft font-medium uppercase tracking-wider">No posts in view</span>
                  <h3 className="mt-4 text-xl font-bold text-text">
                    {activeCategory
                      ? `${activeCategory.label} posts will appear here.`
                      : page.content.empty_state.title}
                  </h3>
                  <p className="mt-3 m-0 text-text-muted max-w-md mx-auto text-sm leading-relaxed">
                    {activeCategory?.description ??
                      page.content.empty_state.description}
                  </p>
                </article>
              )}

              {/* See more */}
              {hasMorePosts ? (
                <div className="flex justify-center mt-10">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center min-h-[3rem] px-8 py-2.5 rounded-full bg-accent text-accent-contrast font-bold text-sm transition-all hover:-translate-y-0.5 hover:bg-accent-hover"
                    onClick={() =>
                      setVisibleCount((currentCount) => currentCount + INITIAL_VISIBLE_COUNT)
                    }
                  >
                    See more
                  </button>
                </div>
              ) : null}
            </section>

            {/* ── Newsletter subscription ── */}
            <NewsletterSection />

            {/* ── CTA (compact) ── */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
              <div className="relative overflow-hidden rounded-2xl border border-border-soft bg-surface-elevated">
                <div className="flex flex-col sm:flex-row items-center gap-4 px-6 py-5 sm:px-8">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-xl bg-accent/10 text-accent">
                      <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                      </svg>
                    </span>
                    <div className="min-w-0">
                      <h2 className="m-0 text-sm font-semibold tracking-tight text-text">
                        Can&rsquo;t find what you need?
                      </h2>
                      <p className="m-0 text-text-muted text-xs leading-relaxed truncate">
                        Contact Exxonim Consult directly for personalised guidance.
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <a
                      className="inline-flex items-center justify-center h-8 px-4 rounded-full bg-accent text-accent-contrast text-xs font-bold transition-all hover:bg-accent-hover"
                      href={routes.contact}
                    >
                      Contact Exxonim
                    </a>
                    <a
                      className="inline-flex items-center gap-1.5 justify-center h-8 px-4 rounded-full border border-border-soft bg-surface/70 text-text text-xs font-bold transition-all hover:bg-accent-soft"
                      href={`tel:+255794689099`}
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      Call Us Now
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        );
      }}
    </LoadBoundary>
  );
}
