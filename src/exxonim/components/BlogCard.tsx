import { memo } from "react";
import { resourceArticlePath } from "@/exxonim/routes";
import type { BlogPost } from "@/exxonim/types";
import { formatBlogDate, getAuthorInitials } from "@/exxonim/utils/blog";
import { SmartLink } from "./primitives/SmartLink";

/**
 * BlogCard — the single, shared blog card used by BOTH the Resources grid
 * and the Home "Latest insights" rail. One implementation, so the two
 * surfaces can never drift apart again.
 *
 * EQUAL HEIGHT — every card is the same size regardless of content:
 *   - `h-full` + `flex flex-col` → the card fills its grid cell / rail slot,
 *     so a stretching grid or flex row makes every card in a row match.
 *   - Title and excerpt each hold a FIXED 2-line box (`line-clamp-2` +
 *     `min-h`), so a 1-line and a 2-line title take identical space.
 *   - Fixed 4:3 media ratio → a sensible landscape media that keeps the OVERALL
 *     card gently portrait (once the text block is added) without a tall, empty
 *     cover box on the wide Resources grid. Cover never shifts proportions.
 *   - Footer pinned with `mt-auto` → the author + "Read" row lines up across
 *     every card.
 *
 * IMAGES — when a post has no cover, OR the cover URL fails to load, a branded
 * monogram placeholder shows instead of a broken-image glyph (the placeholder
 * sits underneath and the <img> hides itself onError).
 */

function BlogCardMedia({ post }: { post: BlogPost }) {
  const categoryLabel = post.category?.label;
  return (
    <div className="relative isolate aspect-[4/3] overflow-hidden bg-surface-soft">
      <span
        aria-hidden="true"
        className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_18%_20%,var(--color-accent-soft-strong),transparent_30%),radial-gradient(circle_at_85%_85%,var(--color-surface-elevated),transparent_26%),linear-gradient(150deg,var(--color-accent-soft),var(--color-page-strong))]"
      >
        <span className="grid h-[52px] w-[52px] place-items-center rounded-2xl border border-border-soft bg-surface/60 text-xl font-bold tracking-tight text-accent">
          E
        </span>
      </span>
      {post.coverImageSrc ? (
        <img
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
          src={post.coverImageSrc}
          alt=""
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      ) : null}
      {categoryLabel ? (
        <span className="absolute left-3.5 top-3.5 z-[2] inline-flex items-center rounded-full bg-accent px-3 py-1 text-2xs font-bold uppercase tracking-[0.12em] text-accent-contrast shadow-sm">
          {categoryLabel}
        </span>
      ) : null}
    </div>
  );
}

export const BlogCard = memo(function BlogCard({ post }: { post: BlogPost }) {
  const metaParts = [formatBlogDate(post.publishedAt)];
  if (post.readTimeMinutes) metaParts.push(`${post.readTimeMinutes} min read`);
  const authorName = post.author?.name ?? "Exxonim Team";

  return (
    <SmartLink
      href={resourceArticlePath(post.slug)}
      aria-label={post.title}
      className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-border-soft bg-surface no-underline transition-all duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-lg hover:shadow-accent/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <BlogCardMedia post={post} />
      <div className="flex flex-1 flex-col p-5">
        <p className="m-0 text-2xs font-bold uppercase tracking-[0.12em] text-text-soft">
          {metaParts.join(" · ")}
        </p>
        <h3 className="m-0 mt-2.5 text-lg font-semibold leading-[1.3] tracking-tight text-text line-clamp-2 min-h-[2.6em] break-words">
          {post.title}
        </h3>
        <p className="m-0 mt-2 text-sm leading-[1.55] text-text-muted line-clamp-2 min-h-[2.71em] break-words">
          {post.excerpt}
        </p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <span className="inline-flex min-w-0 items-center gap-2.5">
            {post.author?.avatarSrc ? (
              <img
                className="h-[30px] w-[30px] flex-none rounded-full object-cover"
                src={post.author.avatarSrc}
                alt=""
                loading="lazy"
              />
            ) : (
              <span
                aria-hidden="true"
                className="inline-flex h-[30px] w-[30px] flex-none items-center justify-center rounded-full bg-gradient-to-b from-accent/15 to-accent/30 text-2xs font-bold text-text"
              >
                {getAuthorInitials(authorName)}
              </span>
            )}
            <span className="truncate text-xs font-bold text-text">{authorName}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-bold text-accent">
            Read
            <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-[3px]">
              &rarr;
            </span>
          </span>
        </div>
      </div>
    </SmartLink>
  );
});
