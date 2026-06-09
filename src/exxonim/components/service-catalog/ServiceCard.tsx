import { useState } from 'react';
import { Check, ChevronDown, ArrowRight } from 'lucide-react';
import { cn } from '@/exxonim/utils/cn';
import type { ServiceCatalogItem } from '@/exxonim/types/service-catalog';

interface ServiceCardProps {
  service: ServiceCatalogItem;
  className?: string;
}

function getBadgeColor(badge: string) {
  if (badge === 'Most Popular') return 'bg-[#E67E22] text-white';
  return 'bg-[#0B3B5F] text-white';
}

export function ServiceCard({ service, className }: ServiceCardProps) {
  const [expanded, setExpanded] = useState(false);
  const hasFullDeliverables =
    service.deliverables_full && service.deliverables_full.length > 0;

  return (
    <article
      className={cn(
        'group flex flex-col rounded-4xl sm:rounded-[20px] lg:rounded-[24px]',
        'p-5 sm:p-6 lg:p-7',
        'bg-white dark:bg-surface border border-[#E2E8F0] dark:border-border-soft',
        'shadow-[0_2px_8px_rgba(0,0,0,0.04)]',
        'transition-all duration-200 ease-out',
        'hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:-translate-y-0.5',
        'active:bg-[rgba(0,0,0,0.02)]',
        className
      )}
    >
      {/* Badge */}
      {service.badge && (
        <span
          className={cn(
            'inline-flex self-start items-center rounded-full px-3 py-1 text-xs font-semibold mb-3',
            getBadgeColor(service.badge)
          )}
        >
          {service.badge}
        </span>
      )}

      {/* Title */}
      <h3 className="text-lg font-semibold text-[#1E2A32] dark:text-text leading-snug">
        {service.title}
      </h3>

      {/* Divider */}
      <div className="my-3 h-px bg-[#E2E8F0] dark:bg-border-soft" />

      {/* Description */}
      <p className="text-sm text-[#6B7A8A] dark:text-text-muted leading-relaxed">
        {service.short_description}
      </p>

      {/* Deliverables */}
      <ul className="mt-4 grid gap-2" role="list">
        {service.deliverables.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-[#1E2A32] dark:text-text">
            <Check
              className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#27AE60] dark:text-success"
              aria-hidden="true"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* Expand toggle for full deliverables */}
      {hasFullDeliverables && (
        <>
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[#0B3B5F] dark:text-accent min-h-[44px] transition-colors duration-150 hover:text-[#1E4A6F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B3B5F]"
            aria-expanded={expanded}
            aria-label={
              expanded
                ? `Hide additional features for ${service.title}`
                : `Show all features for ${service.title}`
            }
          >
            <span>{expanded ? 'Hide Features' : 'See All Features'}</span>
            <ChevronDown
              className={cn(
                'w-4 h-4 transition-transform duration-200',
                expanded && 'rotate-180'
              )}
              aria-hidden="true"
            />
          </button>

          {/* Expanded deliverables_full with CSS max-height transition */}
          <div
            className={cn(
              'overflow-hidden transition-all duration-300 ease-out',
              expanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            )}
            aria-hidden={!expanded}
          >
            <ul className="mt-2 grid gap-2" role="list">
              {service.deliverables_full!.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-[#1E2A32] dark:text-text"
                >
                  <Check
                    className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#27AE60] dark:text-success"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {/* Spacer to push CTA to bottom */}
      <div className="flex-1 min-h-4" />

      {/* CTA Button */}
      <a
        href={service.cta_link}
        className={cn(
          'mt-4 inline-flex items-center justify-center gap-2 rounded-full',
          'min-h-[44px] px-6 py-2.5',
          'bg-[#0B3B5F] text-white text-sm font-semibold',
          'transition-all duration-200 ease-out',
          'hover:bg-[#1E4A6F] hover:shadow-md',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B3B5F]',
          'dark:bg-accent dark:text-accent-contrast dark:hover:bg-accent-hover'
        )}
      >
        <span>{service.cta_text}</span>
        <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </a>
    </article>
  );
}

/** Skeleton card used during loading state */
export function ServiceCardSkeleton() {
  return (
    <div
      className={cn(
        'flex flex-col rounded-4xl sm:rounded-[20px] lg:rounded-[24px]',
        'p-5 sm:p-6 lg:p-7',
        'bg-white dark:bg-surface border border-[#E2E8F0] dark:border-border-soft',
        'shadow-[0_2px_8px_rgba(0,0,0,0.04)]'
      )}
      aria-hidden="true"
    >
      {/* Badge skeleton */}
      <div className="h-6 w-24 rounded-full animate-shimmer mb-3" />
      {/* Title skeleton */}
      <div className="h-6 w-3/4 rounded-md animate-shimmer" />
      {/* Divider */}
      <div className="my-3 h-px bg-[#E2E8F0] dark:bg-border-soft" />
      {/* Description skeleton */}
      <div className="h-4 w-full rounded-md animate-shimmer mb-2" />
      <div className="h-4 w-5/6 rounded-md animate-shimmer" />
      {/* Deliverables skeleton */}
      <div className="mt-4 grid gap-2">
        <div className="h-4 w-full rounded-md animate-shimmer" />
        <div className="h-4 w-11/12 rounded-md animate-shimmer" />
        <div className="h-4 w-4/5 rounded-md animate-shimmer" />
        <div className="h-4 w-10/12 rounded-md animate-shimmer" />
      </div>
      {/* CTA skeleton */}
      <div className="flex-1 min-h-4" />
      <div className="mt-4 h-11 w-full rounded-full animate-shimmer" />
    </div>
  );
}
