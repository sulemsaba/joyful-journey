"use client";

import { useState } from "react";
import { fallbackBlogPosts, fallbackBlogCategories, fallbackResourcesPage } from "@/lib/exxonim-data";
import type { BlogPost, BlogCategory, ResourcesPageContent } from "@/lib/exxonim-types";
import { cn } from "@/lib/cn";
import { Container } from "@/components/exxonim/Container";
import { routes } from "@/lib/exxonim-router";
import { ArrowRight, Calendar, Tag, BookOpen } from "lucide-react";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

export function ResourcesPage() {
  const content: ResourcesPageContent = fallbackResourcesPage.content;
  const posts = fallbackBlogPosts;
  const categories = fallbackBlogCategories;

  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredPosts = activeCategory
    ? posts.filter((p) => p.category?.id === activeCategory)
    : posts;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-12 md:py-20">
        {/* Hero */}
        <section className="mb-12 md:mb-16">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-text mb-4">
            {content.hero_title}
          </h1>
        </section>

        {/* Category Filter Pills */}
        {categories && categories.length > 0 && (
          <section className="mb-10">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveCategory(null)}
                className={cn(
                  "inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                  activeCategory === null
                    ? "bg-accent text-accent-contrast"
                    : "border border-border-soft bg-surface text-text-muted hover:border-border-strong hover:text-text"
                )}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                    activeCategory === cat.id
                      ? "bg-accent text-accent-contrast"
                      : "border border-border-soft bg-surface text-text-muted hover:border-border-strong hover:text-text"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Blog Grid + Sidebar */}
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* Blog Posts */}
          <div>
            {filteredPosts.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                {filteredPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="flex flex-col items-center justify-center py-16 text-center rounded-2xl border border-dashed border-border-soft bg-surface-soft">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface mb-4">
                  <BookOpen className="h-7 w-7 text-text-soft" />
                </div>
                <h3 className="text-xl font-semibold text-text mb-2">
                  {content.empty_state.title}
                </h3>
                <p className="text-text-muted max-w-md">
                  {content.empty_state.description}
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-6">
            {/* CTA Card */}
            <div className="rounded-2xl bg-gradient-to-br from-accent to-accent-hover p-6 shadow-card sticky top-24">
              <h3 className="text-lg font-semibold text-accent-contrast mb-2">
                {content.article_sidebar.title}
              </h3>
              <p className="text-sm text-accent-contrast/80 leading-relaxed mb-6">
                {content.article_sidebar.description}
              </p>
              <a
                href={content.article_sidebar.primary_cta.href}
                className="inline-flex h-11 items-center justify-center rounded-full bg-surface px-6 text-sm font-extrabold text-accent hover:bg-surface-soft transition-all hover:-translate-y-0.5"
              >
                {content.article_sidebar.primary_cta.label}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function BlogCard({ post }: { post: BlogPost }) {
  const hasImage = Boolean(post.coverImageSrc);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border-soft bg-surface shadow-card transition-all hover:border-border-strong hover:-translate-y-0.5">
      {/* Image / Gradient Area */}
      <div className="relative h-48 overflow-hidden">
        {hasImage ? (
          <img
            src={post.coverImageSrc}
            alt={post.coverAlt || post.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="relative flex h-full w-full items-end p-6 bg-[radial-gradient(circle_at_15%_18%,var(--color-accent-soft-strong),transparent_28%),radial-gradient(circle_at_88%_82%,var(--color-surface-elevated),transparent_24%),linear-gradient(150deg,var(--color-accent-soft),var(--color-page-strong))]">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-accent">
              {post.mediaLabel || "Article"}
            </span>
          </div>
        )}
        {/* Category badge */}
        {post.category && (
          <span className="absolute top-4 left-4 inline-flex items-center gap-1 rounded-full bg-surface/90 px-3 py-1 text-xs font-semibold text-text backdrop-blur-sm">
            <Tag className="h-3 w-3" />
            {post.category.label}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-6">
        {/* Date */}
        <div className="flex items-center gap-1.5 text-xs text-text-soft">
          <Calendar className="h-3 w-3" />
          {dateFormatter.format(new Date(post.publishedAt))}
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold leading-snug text-text line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-text-muted leading-relaxed line-clamp-3 flex-1">
          {post.excerpt}
        </p>

        {/* Read more */}
        <a
          href={`${routes.resources}/${post.slug}`}
          className="inline-flex items-center text-sm font-bold text-accent hover:underline mt-auto pt-3 border-t border-border-soft"
        >
          Read more
          <ArrowRight className="ml-1 h-3.5 w-3.5" />
        </a>
      </div>
    </article>
  );
}
