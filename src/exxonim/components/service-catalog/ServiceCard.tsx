import { useState } from 'react';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/exxonim/utils/cn';
import { Button } from '@/exxonim/components/primitives/Button';
import type { ServiceCatalogItem } from '@/exxonim/types/service-catalog';

interface ServiceCardProps {
  service: ServiceCatalogItem;
  className?: string;
}

export function ServiceCard({ service, className }: ServiceCardProps) {
  const [expanded, setExpanded] = useState(false);
  const hasFullDeliverables =
    service.deliverables_full && service.deliverables_full.length > 0;

  return (
    <article
      className={cn(
        'group flex flex-col rounded-2xl',
        'p-4 md:p-5 lg:p-6',
        'bg-surface',
        'border border-border-soft',
        'transition-all duration-200 ease-out',
        'hover:border-accent/30 hover:shadow-[0_8px_24px_rgba(15,92,99,0.08)]',
        'dark:hover:shadow-[0_8px_24px_rgba(127,188,193,0.06)]',
        'h-full',
        className
      )}
    >
      {/* Header row: Badge + Category indicator */}
      <div className="flex items-start justify-between gap-3 mb-3">
        {/* Badge */}
        {service.badge ? (
          <span
            className={cn(
              'inline-flex self-start items-center rounded-full px-3 py-0.5 text-xs font-semibold',
              'tracking-wide uppercase',
              service.badge === 'Most Popular'
                ? 'bg-accent text-accent-contrast'
                : 'bg-accent-soft text-accent'
            )}
          >
            {service.badge}
          </span>
        ) : (
          <span className="inline-flex self-start items-center rounded-full px-3 py-0.5 text-xs font-medium text-text-soft bg-surface-soft">
            {service.category}
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-text leading-snug mb-3">
        {service.title}
      </h3>

      {/* Deliverables list */}
      <ul className="list-none m-0 p-0 mb-3" role="list">
        {service.deliverables.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2.5 text-sm text-text py-1.5"
          >
            <Check
              className="w-4 h-4 flex-shrink-0 mt-0.5 text-success"
              aria-hidden="true"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* Extra deliverables (collapsible) */}
      {hasFullDeliverables && (
        <>
          <div
            className={cn(
              'overflow-hidden transition-all duration-300 ease-out',
              expanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            )}
            aria-hidden={!expanded}
          >
            <div className="pl-3 border-l-2 border-accent/30 mb-2">
              <ul className="list-none m-0 p-0" role="list">
                {service.deliverables_full!.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-text-muted py-1.5"
                  >
                    <Check
                      className="w-4 h-4 flex-shrink-0 mt-0.5 text-success"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className={cn(
              'inline-flex items-center gap-1 min-h-[36px] text-sm font-medium',
              'text-accent bg-transparent border-none cursor-pointer',
              'mb-3 p-0',
              'transition-opacity duration-150',
              'hover:opacity-80 active:opacity-70',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded'
            )}
            aria-expanded={expanded}
            aria-label={
              expanded
                ? `Hide additional features for ${service.title}`
                : `Show all features for ${service.title}`
            }
          >
            {expanded ? (
              <>
                <ChevronUp className="w-4 h-4" aria-hidden="true" />
                <span>Show less</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" aria-hidden="true" />
                <span>See all features</span>
              </>
            )}
          </button>
        </>
      )}

      {/* CTA Button — uses design system primitive */}
      <div className="mt-auto pt-2">
        <Button
          size="standard"
          variant="primary"
          href={service.cta_link}
          className="w-full"
        >
          {service.cta_text}
        </Button>
      </div>
    </article>
  );
}

/** Skeleton card used during loading state */
export function ServiceCardSkeleton() {
  return (
    <div
      className={cn(
        'flex flex-col rounded-2xl',
        'p-5 md:p-6'
      )}
      aria-hidden="true"
    >
      {/* Badge skeleton */}
      <div className="h-5 w-24 rounded-full animate-shimmer mb-3" />
      {/* Title skeleton */}
      <div className="h-5 w-3/4 rounded-md animate-shimmer mb-2" />
      {/* Description skeleton */}
      <div className="h-4 w-full rounded-md animate-shimmer mb-1.5" />
      <div className="h-4 w-5/6 rounded-md animate-shimmer mb-4" />
      {/* Deliverables skeleton */}
      <div className="space-y-2 mb-4">
        <div className="h-4 w-full rounded-md animate-shimmer" />
        <div className="h-4 w-11/12 rounded-md animate-shimmer" />
        <div className="h-4 w-4/5 rounded-md animate-shimmer" />
        <div className="h-4 w-10/12 rounded-md animate-shimmer" />
      </div>
      {/* CTA skeleton */}
      <div className="mt-auto h-12 w-full rounded-full animate-shimmer" />
    </div>
  );
}
