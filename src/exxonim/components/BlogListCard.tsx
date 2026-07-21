import { memo } from "react";
import { resourceArticlePath } from "@/exxonim/routes";
import type { BlogPost } from "@/exxonim/types";
import { formatBlogDate, getAuthorInitials } from "@/exxonim/utils/blog";
import { SmartLink } from "./primitives/SmartLink";

/**
 * BlogListCard — a horizontal "list row" blog card: rounded thumbnail on the
 * left, bold title + author (avatar + name) + date on the right. BORDERLESS by
 * design (the "World of AI" reference), so it can sit inside a `divide-y` list.
 *
 * ONE implementation used by BOTH:
 *   - the Resources "Trending" rail (3 rows beside the hero), and
 *   - the article page's "Continue reading" footer (2 rows, one per edge).
 *
 * HEIGHT: the row height comes from the fixed SQUARE thumbnail; the text column
 * stretches to it (title pinned top, meta pinned bottom via `mt-auto`) so the
 * title lines up with the thumbnail's top and the meta with its bottom.
 *
 * IMAGES: no cover, or a cover that fails to load, falls back to the same
 * branded monogram as BlogCard (placeholder underneath, <img> hides onError).
 */
function ListThumb({ post }: { post: BlogPost }) {
  return (
    <div className="relative aspect-square w-full self-start overflow-hidden rounded-xl bg-surface-soft">
      <span
        aria-hidden="true"
        className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_18%_20%,var(--color-accent-soft-strong),transparent_30%),radial-gradient(circle_at_85%_85%,var(--color-surface-elevated),transparent_26%),linear-gradient(150deg,var(--color-accent-soft),var(--color-page-strong))]"
      >
        <span className="grid h-9 w-9 place-items-center rounded-lg border border-border-soft bg-surface/60 text-sm font-bold text-accent">
          E
        </span>
      </span>
      {post.coverImageSrc ? (
        <img
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={post.coverImageSrc}
          alt=""
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      ) : null}
    </div>
  );
}

export const BlogListCard = memo(function BlogListCard({ post }: { post: BlogPost }) {
  const authorName = post.author?.name ?? "Exxonim Team";

  return (
    <SmartLink
      href={resourceArticlePath(post.slug)}
      aria-label={post.title}
      className="group grid grid-cols-[150px_1fr] gap-3.5 rounded-xl no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <ListThumb post={post} />
      <div className="flex min-w-0 flex-col">
        <h3 className="m-0 text-base font-bold leading-[1.3] tracking-tight text-text line-clamp-3 break-words transition-colors group-hover:text-accent">
          {post.title}
        </h3>
        <div className="mt-auto flex min-w-0 items-center gap-1.5 pt-2 text-2xs">
          {post.author?.avatarSrc ? (
            <img
              className="h-4 w-4 flex-none rounded-full object-cover"
              src={post.author.avatarSrc}
              alt=""
              loading="lazy"
            />
          ) : (
            <span
              aria-hidden="true"
              className="inline-flex h-4 w-4 flex-none items-center justify-center rounded-full bg-gradient-to-b from-accent/15 to-accent/30 text-2xs font-bold text-text"
            >
              {getAuthorInitials(authorName)}
            </span>
          )}
          <span className="truncate font-semibold text-text-muted">{authorName}</span>
          <span aria-hidden="true" className="text-text-soft">·</span>
          <span className="whitespace-nowrap text-text-soft">{formatBlogDate(post.publishedAt)}</span>
        </div>
      </div>
    </SmartLink>
  );
});
