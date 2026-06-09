import { cn } from '@/exxonim/utils/cn';
import type { SegmentFilter } from '@/exxonim/types/service-catalog';

interface SegmentFilterBarProps {
  activeSegment: SegmentFilter;
  onSegmentChange: (segment: SegmentFilter) => void;
  className?: string;
}

const segments: { label: string; emoji: string; value: SegmentFilter }[] = [
  { label: 'All Services', emoji: '', value: 'all' },
  { label: 'Local Entrepreneurs', emoji: '🇹🇿', value: 'local-entrepreneurs' },
  { label: 'Foreign Investors', emoji: '🌍', value: 'foreign-investors' },
  { label: 'Enterprises', emoji: '🏢', value: 'enterprises' },
  { label: 'NGOs & Non-Profits', emoji: '🤝', value: 'ngos' },
];

export function SegmentFilterBar({
  activeSegment,
  onSegmentChange,
  className,
}: SegmentFilterBarProps) {
  return (
    <div className={cn('relative', className)}>
      {/* Scrollable container with right-edge gradient fade */}
      <div className="flex gap-3 overflow-x-auto scrollbar-none pb-2 pr-8">
        {segments.map((seg) => {
          const isActive = activeSegment === seg.value;
          const displayLabel = seg.emoji ? `${seg.emoji} ${seg.label}` : seg.label;
          return (
            <button
              key={seg.value}
              type="button"
              onClick={() => onSegmentChange(seg.value)}
              className={cn(
                'flex-shrink-0 rounded-[60px] px-5 min-h-[44px] text-sm font-medium',
                'transition-all duration-200 ease-out whitespace-nowrap',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B3B5F]',
                'inline-flex items-center justify-center',
                isActive
                  ? 'bg-[#0B3B5F] text-white shadow-[0_2px_8px_rgba(11,59,95,0.2)] border border-[#0B3B5F]'
                  : 'bg-white text-[#1E2A32] border border-[#E2E8F0] hover:bg-[#F1F5F9] hover:border-[#CBD5E1]'
              )}
              aria-pressed={isActive}
              aria-label={`Filter by ${seg.label}`}
            >
              {displayLabel}
            </button>
          );
        })}
      </div>
      {/* Right-edge gradient fade to indicate more items */}
      <div
        className="pointer-events-none absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-[#F8FAFE] to-transparent"
        aria-hidden="true"
      />
    </div>
  );
}
