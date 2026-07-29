'use client';

import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { Search, X } from 'lucide-react';
import { ServiceSearchBox, type FlatService } from '@/exxonim/components/ServiceSearchBox';
import { cn } from '@/exxonim/utils/cn';

interface StickyServiceSearchProps {
  services: FlatService[];
  /** id of the section holding the in-page search — the lens appears once it
   * scrolls above the viewport. */
  watchId: string;
}

/**
 * StickyServiceSearch - on-demand search for the long services page (mobile).
 *
 * A small lens button floats in from the top-right (below the header) once the
 * overview section's own search has scrolled out of view. Tapping it expands a
 * search panel under the header — auto-focused, dismissed by the X, an outside
 * tap, Escape, or picking a result. Collapsed by default so it never obscures
 * the catalog content the visitor is reading.
 *
 * Visibility is driven by an IntersectionObserver (no scroll listener), and
 * all show/hide animation is transform + opacity only (GPU-composited).
 */
export function StickyServiceSearch({ services, watchId }: StickyServiceSearchProps) {
  const [available, setAvailable] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* flushSync so the panel is VISIBLE before we focus — and the focus stays
   * inside the tap's user gesture, which is what makes iOS open the keyboard.
   * (A hidden input can't be focused, and a deferred focus won't raise the
   * keyboard on iOS.) */
  const openAndFocus = () => {
    flushSync(() => setOpen(true));
    inputRef.current?.focus();
  };

  useEffect(() => {
    const target = document.getElementById(watchId);
    if (!target || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only once the watched section has scrolled ABOVE the viewport
        // (not while it is still below, before the visitor reaches it).
        const past = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        setAvailable(past);
        if (!past) setOpen(false);
      },
      { rootMargin: '-60px 0px 0px 0px' }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [watchId]);

  /* Close on outside tap or Escape while the panel is open. */
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('touchstart', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('touchstart', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      {/* ── Collapsed: lens button, top-right below the header ── */}
      <button
        type="button"
        aria-label="Search services"
        aria-expanded={open}
        onClick={openAndFocus}
        tabIndex={available && !open ? undefined : -1}
        aria-hidden={!available || open || undefined}
        className={cn(
          'fixed right-4 top-[68px] z-30 inline-flex h-11 w-11 items-center justify-center',
          'rounded-full border border-border-soft bg-surface text-accent shadow-md',
          // visibility is NOT transitioned: it must flip instantly so the
          // synchronous focus hand-off in openAndFocus() sees a visible input.
          'transition-[transform,opacity] duration-300 ease-out',
          available && !open
            ? 'visible translate-y-0 opacity-100'
            : 'invisible -translate-y-3 opacity-0 pointer-events-none'
        )}
      >
        <Search className="h-5 w-5" aria-hidden="true" />
      </button>

      {/* ── Expanded: search panel under the header ── */}
      <div
        ref={panelRef}
        aria-hidden={!open}
        className={cn(
          'fixed inset-x-3 top-[66px] z-30 origin-top-right',
          'rounded-2xl border border-border-soft bg-surface shadow-xl p-2',
          // Only transform + opacity animate; a transitioned visibility would
          // still compute as hidden at the moment of the tap, making the
          // in-gesture focus() (openAndFocus) fail and the keyboard not open.
          'transition-[transform,opacity] duration-200 ease-out',
          open
            ? 'visible scale-100 opacity-100'
            : 'invisible scale-95 opacity-0 pointer-events-none'
        )}
      >
        <div className="flex items-center gap-1.5">
          <div className="flex-1 min-w-0">
            <ServiceSearchBox
              services={services}
              compact
              inputRef={inputRef}
              onNavigate={() => setOpen(false)}
            />
          </div>
          <button
            type="button"
            aria-label="Close search"
            onClick={() => setOpen(false)}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-text-muted hover:text-accent hover:bg-accent-soft/40 transition-colors"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
