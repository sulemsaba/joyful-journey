import { cn } from '@/exxonim/utils/cn';
import { Users, Globe, Building2, Heart } from 'lucide-react';
import type { SegmentFilter } from '@/exxonim/types/service-catalog';

interface SegmentFilterBarProps {
  activeSegment: SegmentFilter;
  onSegmentChange: (segment: SegmentFilter) => void;
  className?: string;
}

const segments: {
  label: string;
  value: SegmentFilter;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { label: 'All Services', value: 'all', icon: Users },
  { label: 'Local Entrepreneurs', value: 'local-entrepreneurs', icon: Users },
  { label: 'Foreign Investors', value: 'foreign-investors', icon: Globe },
  { label: 'Enterprises', value: 'enterprises', icon: Building2 },
  { label: 'NGOs & Non-Profits', value: 'ngos', icon: Heart },
];

export function SegmentFilterBar({
  activeSegment,
  onSegmentChange,
  className,
}: SegmentFilterBarProps) {
  return (
    <div className={cn('relative', className)}>
      <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
        {segments.map((seg) => {
          const isActive = activeSegment === seg.value;
          const Icon = seg.icon;
          return (
            <button
              key={seg.value}
              type="button"
              onClick={() => onSegmentChange(seg.value)}
              className={cn(
                'flex-shrink-0 rounded-full px-3 md:px-4 py-2 min-h-[40px] text-xs md:text-sm font-medium',
                'transition-all duration-200 ease-out whitespace-nowrap',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                'inline-flex items-center justify-center gap-2',
                isActive
                  ? 'bg-accent text-accent-contrast shadow-sm'
                  : 'bg-surface text-text-muted border border-border-soft hover:bg-accent-soft hover:text-accent hover:border-accent/30'
              )}
              aria-pressed={isActive}
              aria-label={`Filter by ${seg.label}`}
            >
              <Icon className="w-4 h-4" aria-hidden="true" />
              <span>{seg.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
