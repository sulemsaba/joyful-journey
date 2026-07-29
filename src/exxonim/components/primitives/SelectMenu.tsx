'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/exxonim/utils/cn';

/**
 * SelectMenu - styled dropdown built on Radix Select.
 *
 * Replaces native <select> elements in public forms: the native options popup
 * is unstyled browser chrome (and renders detached/broken in some mobile
 * emulations), while this renders an in-page dropdown that matches the design
 * tokens in both themes. Radix supplies the accessibility contract for free:
 * full keyboard support (arrows, typeahead, Enter/Escape), aria-expanded /
 * listbox roles, focus management, and outside-click dismissal.
 */

export interface SelectMenuOption {
  label: string;
  value: string;
}

interface SelectMenuProps {
  /** id for the trigger button (pairs with a <label htmlFor>). */
  id?: string;
  value: string;
  onValueChange: (value: string) => void;
  options: readonly SelectMenuOption[];
  className?: string;
}

export function SelectMenu({ id, value, onValueChange, options, className }: SelectMenuProps) {
  return (
    <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
      <SelectPrimitive.Trigger
        id={id}
        className={cn(
          'w-full flex items-center justify-between gap-2 px-3.5 py-3 sm:px-4 rounded-xl border border-border-soft bg-page-strong/40 text-left text-text text-base sm:text-sm min-h-[44px] cursor-pointer',
          'focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40 transition-colors',
          'data-[state=open]:border-accent/40',
          className
        )}
      >
        <SelectPrimitive.Value />
        <SelectPrimitive.Icon asChild>
          <ChevronDown
            className="w-4 h-4 shrink-0 text-accent transition-transform duration-200 [[data-state=open]>&]:rotate-180"
            aria-hidden="true"
          />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          sideOffset={6}
          className={cn(
            // Above the fixed header (z-50) and consent banner (z-50).
            'z-[70] w-[var(--radix-select-trigger-width)]',
            'max-h-[min(320px,var(--radix-select-content-available-height))]',
            'rounded-xl border border-border-soft bg-surface shadow-popover overflow-hidden',
            'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95'
          )}
        >
          <SelectPrimitive.Viewport className="p-1">
            {options.map((option) => (
              <SelectPrimitive.Item
                key={option.value}
                value={option.value}
                className={cn(
                  'flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg text-sm text-text cursor-pointer select-none outline-none',
                  'data-[highlighted]:bg-accent-soft/50 data-[state=checked]:font-semibold'
                )}
              >
                <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator>
                  <Check className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
