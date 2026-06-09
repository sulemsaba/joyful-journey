import { cn } from '@/exxonim/utils/cn';
import type { SegmentFilter } from '@/exxonim/types/service-catalog';

interface SegmentFilterBarProps {
  activeSegment: SegmentFilter;
  onSegmentChange: (segment: SegmentFilter) => void;
  className?: string;
}

const segments: { label: string; value: SegmentFilter }[] = [
  { label: 'All Services', value: 'all' },
  { label: 'Local Entrepreneurs', value: 'local-entrepreneurs' },
  { label: 'Foreign Investors', value: 'foreign-investors' },
  { label: 'Enterprises', value: 'enterprises' },
  { label: 'NGOs', value: 'ngos' },
];

export function SegmentFilterBar({
  activeSegment,
  onSegmentChange,
  className,
}: SegmentFilterBarProps) {
  return (
    <div className={cn('relative', className)}>
      {/* Scrollable container with right-edge gradient fade */}
      <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1 pr-8">
        {segments.map((seg) => {
          const isActive = activeSegment === seg.value;
          return (
            <button
              key={seg.value}
              type="button"
              onClick={() => onSegmentChange(seg.value)}
              className={cn(
                'flex-shrink-0 rounded-full px-4 min-h-[44px] text-sm font-medium transition-all duration-150 ease-out whitespace-nowrap',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B3B5F]',
                isActive
                  ? 'bg-[#0B3B5F] text-white shadow-sm'
                  : 'bg-white text-[#1E2A32] border border-[#E2E8F0] hover:border-[#0B3B5F]/30 hover:bg-[#F8FAFE]',
                'dark:bg-surface dark:border-border-soft dark:text-text dark:hover:border-accent/30 dark:hover:bg-accent-soft'
              )}
              aria-pressed={isActive}
              aria-label={`Filter by ${seg.label}`}
            >
              {seg.label}
            </button>
          );
        })}
      </div>
      {/* Right-edge gradient fade to indicate more items */}
      <div
        className="pointer-events-none absolute right-0 top-0 bottom-1 w-8 bg-gradient-to-l from-page to-transparent"
        aria-hidden="true"
      />
    </div>
  );
}
