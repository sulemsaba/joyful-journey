import { useState } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/exxonim/utils/cn';
import type { ServiceCatalogItem } from '@/exxonim/types/service-catalog';

interface ServiceCardProps {
  service: ServiceCatalogItem;
  className?: string;
}

/**
 * Badge color logic matching the HTML blueprint:
 * - "Most Popular" → highlight style (orange bg, white text)
 * - All others → warm style (#FEF3E2 bg, #E67E22 text)
 */
function getBadgeStyles(badge: string) {
  if (badge === 'Most Popular') {
    return 'bg-[#E67E22] text-white';
  }
  return 'bg-[#FEF3E2] text-[#E67E22] dark:bg-[rgba(230,126,34,0.15)] dark:text-[#E67E22]';
}

export function ServiceCard({ service, className }: ServiceCardProps) {
  const [expanded, setExpanded] = useState(false);
  const hasFullDeliverables =
    service.deliverables_full && service.deliverables_full.length > 0;

  return (
    <article
      className={cn(
        'group flex flex-col rounded-[20px]',
        'p-5 md:p-6',
        'bg-white dark:bg-surface',
        'border border-[#EDF2F7] dark:border-border-soft',
        'shadow-[0_4px_12px_rgba(0,0,0,0.03),0_1px_2px_rgba(0,0,0,0.05)]',
        'dark:shadow-[0_4px_12px_rgba(0,0,0,0.15)]',
        'transition-[transform,box-shadow] duration-200 ease-out',
        'hover:-translate-y-0.5 hover:shadow-[0_20px_25px_-12px_rgba(0,0,0,0.08),0_8px_10px_-6px_rgba(0,0,0,0.02)]',
        'dark:hover:shadow-[0_20px_25px_-12px_rgba(0,0,0,0.3)]',
        'h-full',
        className
      )}
    >
      {/* Badge */}
      {service.badge && (
        <span
          className={cn(
            'inline-flex self-start items-center rounded-[40px] px-3 py-1 text-xs font-semibold mb-3',
            'tracking-[0.3px]',
            getBadgeStyles(service.badge)
          )}
        >
          {service.badge}
        </span>
      )}

      {/* Title */}
      <h3 className="text-[1.25rem] font-bold text-[#0B3B5F] dark:text-accent leading-[1.3] mb-3">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-[#334155] dark:text-text-muted leading-relaxed mb-5 flex-1">
        {service.short_description}
      </p>

      {/* Deliverables list with separator borders */}
      <ul className="list-none m-0 p-0 mb-4" role="list">
        {service.deliverables.map((item) => (
          <li
            key={item}
            className="flex items-center gap-2 text-[0.8125rem] text-[#1E2A32] dark:text-text py-1.5 border-b border-[#F1F5F9] dark:border-border-soft last:border-b-0"
          >
            <Check
              className="w-4 h-4 flex-shrink-0 text-[#27AE60] dark:text-success"
              aria-hidden="true"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* Extra deliverables (collapsible) */}
      {hasFullDeliverables && (
        <>
          {/* Expandable area with left border accent */}
          <div
            className={cn(
              'overflow-hidden transition-all duration-300 ease-out',
              expanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            )}
            aria-hidden={!expanded}
          >
            <div className="mt-1 pl-2 border-l-2 border-[#E2E8F0] dark:border-border-soft mb-2">
              <ul className="list-none m-0 p-0" role="list">
                {service.deliverables_full!.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-[0.8125rem] text-[#1E2A32] dark:text-text py-1.5 border-b border-[#F1F5F9] dark:border-border-soft last:border-b-0"
                  >
                    <Check
                      className="w-4 h-4 flex-shrink-0 text-[#27AE60] dark:text-success"
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
              'inline-flex items-center justify-center gap-1.5 min-h-[44px]',
              'text-xs font-medium text-[#0B3B5F] dark:text-accent',
              'bg-transparent border-none cursor-pointer',
              'mt-1 mb-3 p-0',
              'underline underline-offset-[3px]',
              'transition-opacity duration-150',
              'hover:opacity-80 active:opacity-70',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B3B5F]'
            )}
            aria-expanded={expanded}
            aria-label={
              expanded
                ? `Hide additional features for ${service.title}`
                : `Show all features for ${service.title}`
            }
          >
            <span>{expanded ? '➖ Show less' : '➕ See all features'}</span>
          </button>
        </>
      )}

      {/* CTA Button */}
      <a
        href={service.cta_link}
        className={cn(
          'block w-full text-center rounded-[40px]',
          'min-h-[44px] px-4 py-3',
          'bg-[#0B3B5F] dark:bg-accent text-white dark:text-accent-contrast text-sm font-semibold',
          'transition-all duration-200 ease-out',
          'hover:bg-[#1E4A6F] dark:hover:bg-accent-hover',
          'active:scale-[0.98]',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B3B5F]',
          'mt-auto'
        )}
      >
        {service.cta_text}
      </a>
    </article>
  );
}

/** Skeleton card used during loading state */
export function ServiceCardSkeleton() {
  return (
    <div
      className={cn(
        'flex flex-col rounded-[20px]',
        'p-5 md:p-6',
        'bg-white dark:bg-surface',
        'border border-[#EDF2F7] dark:border-border-soft',
        'shadow-[0_4px_12px_rgba(0,0,0,0.03),0_1px_2px_rgba(0,0,0,0.05)]'
      )}
      aria-hidden="true"
    >
      {/* Badge skeleton */}
      <div className="h-6 w-24 rounded-full animate-shimmer mb-3" />
      {/* Title skeleton */}
      <div className="h-6 w-3/4 rounded-md animate-shimmer mb-3" />
      {/* Description skeleton */}
      <div className="h-4 w-full rounded-md animate-shimmer mb-2" />
      <div className="h-4 w-5/6 rounded-md animate-shimmer mb-5" />
      {/* Deliverables skeleton */}
      <div className="space-y-2 mb-4">
        <div className="h-4 w-full rounded-md animate-shimmer" />
        <div className="h-4 w-11/12 rounded-md animate-shimmer" />
        <div className="h-4 w-4/5 rounded-md animate-shimmer" />
        <div className="h-4 w-10/12 rounded-md animate-shimmer" />
      </div>
      {/* CTA skeleton */}
      <div className="mt-auto h-11 w-full rounded-full animate-shimmer" />
    </div>
  );
}
