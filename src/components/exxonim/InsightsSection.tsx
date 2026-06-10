"use client";

import type { HomeInsightsContent, BlogPost } from "@/lib/exxonim-types";
import { cn } from "@/lib/cn";
import { Container } from "@/components/exxonim/Container";
import { routes } from "@/lib/exxonim-router";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";

interface InsightsSectionProps {
  content: HomeInsightsContent;
  posts: BlogPost[];
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

export function InsightsSection({ content, posts }: InsightsSectionProps) {
  const { title, intro, footer_copy } = content;
  const railRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scroll = useCallback((direction: "left" | "right") => {
    const el = railRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.7;
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  }, []);

  if (!posts || posts.length === 0) return null;

  return (
    <section className="relative py-16 lg:py-24 bg-surface">
      <Container>
        {/* Section header */}
        <div className="flex flex-col gap-4 mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-surface-soft px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-accent mb-4">
              Insights
            </span>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-text">
              {title}
            </h2>
            <p className="mt-2 text-text-muted max-w-lg">{intro}</p>
          </div>

          {/* More prominent navigation buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200",
                canScrollLeft
                  ? "border-border-soft bg-surface text-text hover:border-accent hover:text-accent hover:bg-accent-soft/30 hover:shadow-card"
                  : "border-border-soft text-text-soft cursor-not-allowed opacity-50"
              )}
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200",
                canScrollRight
                  ? "border-border-soft bg-surface text-text hover:border-accent hover:text-accent hover:bg-accent-soft/30 hover:shadow-card"
                  : "border-border-soft text-text-soft cursor-not-allowed opacity-50"
              )}
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Container>

      {/* Horizontal scrolling card rail with smoother snap and better scrollbar hiding */}
      <div
        ref={railRef}
        className={cn(
          "flex gap-6 overflow-x-auto px-[clamp(20px,4vw,44px)] py-2",
          "[scrollbar-width:none] [scroll-snap-type:x_mandatory]",
          "[&::-webkit-scrollbar]:hidden",
          "[&>*]:scroll-snap-align:start"
        )}
      >
        {posts.map((post) => (
          <InsightCard key={post.id} post={post} />
        ))}
      </div>

      {/* Footer CTA with better visual treatment */}
      <Container className="mt-10">
        <div className="text-center rounded-2xl bg-surface-soft border border-border-soft p-6 md:p-8">
          <p className="text-text-muted text-sm mb-4">{footer_copy}</p>
          <a
            href={routes.resources}
            className="group inline-flex h-11 items-center justify-center rounded-full bg-accent px-6 text-sm font-extrabold text-accent-contrast hover:bg-accent-hover transition-all hover:-translate-y-0.5"
          >
            See More
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
        </div>
      </Container>
    </section>
  );
}

function InsightCard({ post }: { post: BlogPost }) {
  const hasImage = Boolean(post.coverImageSrc);

  return (
    <article className="group relative flex min-w-0 flex-col overflow-hidden rounded-[30px] border border-border-soft bg-surface shadow-card transition-all duration-300 hover:-translate-y-2 hover:border-border-strong hover:shadow-panel [scroll-snap-align:start] flex-[0_0_clamp(312px,31vw,392px)] max-md:flex-[0_0_min(84vw,340px)] max-md:rounded-[24px]">
      {/* Image / gradient area */}
      <div className="relative h-48 overflow-hidden">
        {hasImage ? (
          <>
            <img
              src={post.coverImageSrc}
              alt={post.coverAlt || post.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            {/* Gradient overlay at bottom for better text contrast */}
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-surface/80 to-transparent" />
          </>
        ) : (
          <div className="relative flex h-full w-full items-end p-6 bg-[radial-gradient(circle_at_15%_18%,var(--color-accent-soft-strong),transparent_28%),radial-gradient(circle_at_88%_82%,var(--color-surface-elevated),transparent_24%),linear-gradient(150deg,var(--color-accent-soft),var(--color-page-strong))]">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-accent">
              {post.mediaLabel || "Article"}
            </span>
          </div>
        )}
        {/* Category badge with backdrop-blur */}
        {post.category && (
          <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-surface/70 px-3 py-1 text-xs font-semibold text-text backdrop-blur-md border border-border-soft/50">
            {post.category.label}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-6">
        {/* Metadata */}
        <p className="text-xs text-text-soft">
          {dateFormatter.format(new Date(post.publishedAt))}
        </p>

        {/* Title */}
        <h3 className="text-lg font-semibold leading-snug text-text line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-text-muted leading-relaxed line-clamp-3 flex-1">
          {post.excerpt}
        </p>

        {/* Author + Learn more with underline animation */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-border-soft">
          {post.author ? (
            <span className="text-xs font-medium text-text-muted">
              {post.author.name}
            </span>
          ) : (
            <span />
          )}
          <a
            href={`${routes.resources}/${post.slug}`}
            className="group/link inline-flex items-center text-xs font-bold text-accent relative"
          >
            <span className="relative">
              Learn more
              {/* Underline animation */}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover/link:w-full" />
            </span>
            <ArrowRight className="ml-1 h-3 w-3 transition-transform duration-200 group-hover/link:translate-x-0.5" />
          </a>
        </div>
      </div>
    </article>
  );
}
