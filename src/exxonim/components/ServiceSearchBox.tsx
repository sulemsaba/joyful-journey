'use client';

import { useState, useCallback, useId, useMemo, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { SmartLink } from '@/exxonim/components/primitives/SmartLink';
import type { ServiceNavGroup } from '@/exxonim/types';
import { cn } from '@/exxonim/utils/cn';

/**
 * ServiceSearchBox - self-contained service search input + results dropdown.
 *
 * Extracted from ServicesOverviewSection so the same search (state, filtering,
 * scroll-to-anchor behaviour) can also live in the sticky mobile bar
 * (StickyServiceSearch) without duplicating logic.
 *
 * Selecting a result scrolls to the matching service card anchor
 * (id = service name slug) in the catalog section.
 */

export interface FlatService {
  name: string;
  group: string;
  href: string;
}

/**
 * Canonical anchor id for a service name. Used by BOTH the search results
 * (scroll target) and the catalog cards (element id) so the two sides can
 * never drift apart on spacing/punctuation ("TIC / TISEZA Registration" →
 * "tic-tiseza-registration").
 */
export function serviceAnchorId(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Flatten nav groups into the searchable [{name, group, href}] list. */
export function flattenServiceNavGroups(
  groups: ServiceNavGroup[] | undefined
): FlatService[] {
  if (!groups) return [];
  return groups.flatMap((group) =>
    (group?.items ?? []).map((item) => ({
      name: item,
      group: group.title ?? '',
      href: group.href ?? '',
    }))
  );
}

interface ServiceSearchBoxProps {
  services: FlatService[];
  /** Tighter input for the sticky mobile bar. */
  compact?: boolean;
  /** Exposes the input so a revealer can focus it inside the tap gesture
   * (iOS only opens the keyboard for focus within the user gesture). */
  inputRef?: React.Ref<HTMLInputElement>;
  /** Called after a result is chosen and the page scrolls to it. */
  onNavigate?: () => void;
  className?: string;
}

export function ServiceSearchBox({ services, compact = false, inputRef, onNavigate, className }: ServiceSearchBoxProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  // Unique per instance — the overview search and the sticky lens search can
  // both be mounted, and duplicate DOM ids are invalid.
  const dropdownId = useId();

  // Filter services by search query
  const filteredServices = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return services.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.group.toLowerCase().includes(q)
    );
  }, [searchQuery, services]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    setIsDropdownOpen(true);
  }, []);

  /* ── Click-outside handler to close dropdown ────────────────── */
  useEffect(() => {
    function handleDocumentMouseDown(e: MouseEvent) {
      if (!searchContainerRef.current) return;
      if (!searchContainerRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleDocumentMouseDown);
    return () => document.removeEventListener('mousedown', handleDocumentMouseDown);
  }, []);

  const handleResultClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, serviceName: string) => {
    e.preventDefault();
    const anchorId = serviceAnchorId(serviceName);
    let card = document.getElementById(anchorId);

    if (!card) {
      // Card titles are admin-managed and can drift from the search list —
      // fall back to a normalized match over the rendered cards.
      const cards = Array.from(
        document.querySelectorAll<HTMLElement>('[data-service-title]')
      );
      card =
        cards.find((c) => {
          const slug = serviceAnchorId(c.dataset.serviceTitle ?? '');
          return slug === anchorId || slug.includes(anchorId) || anchorId.includes(slug);
        }) ?? null;
    }

    if (card) {
      // inline:'center' also scrolls the card's horizontal rail so the card
      // isn't left off-screen inside its category row.
      card.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
      card.classList.add('service-card-highlight');
      window.setTimeout(() => card?.classList.remove('service-card-highlight'), 2000);
    } else {
      // Never a silent no-op: land at the catalog section at minimum.
      document
        .getElementById('service-catalog')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    setIsDropdownOpen(false);
    setSearchQuery('');
    onNavigate?.();
  }, [onNavigate]);

  const hasResults = searchQuery.trim().length > 0 && filteredServices.length > 0;
  const noResults = searchQuery.trim().length > 0 && filteredServices.length === 0;
  const showDropdown = isDropdownOpen || searchQuery.trim().length > 0;

  return (
    <div ref={searchContainerRef} className={cn('relative', className)}>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-soft" />
        <input
          ref={inputRef}
          type="search"
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          onFocus={() => setIsDropdownOpen(true)}
          placeholder="Search for a service..."
          aria-label="Search services"
          className={cn(
            // text-base (16px) so iOS Safari never zoom-jumps on focus.
            'w-full pl-10 pr-4 rounded-xl border border-border-soft bg-surface/50 text-text text-base placeholder:text-text-soft focus:outline-none focus:ring-2 focus:ring-accent/25 focus:border-accent/40 focus:bg-surface transition-colors',
            compact ? 'py-2' : 'py-2.5'
          )}
        />
      </div>

      {/* Search results dropdown
          ── Absolute positioned so it overlays content below instead of
          pushing it down. The wrapper is `relative`, so `absolute top-full
          left-0 right-0` anchors the dropdown to the search input's bounds
          and floats it on top of whatever follows. z-50 ensures it sits
          above sibling sections. */}
      {showDropdown && (
        <div
          id={dropdownId}
          className="absolute top-full left-0 right-0 mt-2 z-50 rounded-xl border border-border-soft bg-surface shadow-xl overflow-hidden max-h-[320px] overflow-y-auto"
        >
          {hasResults && (
            <ul className="grid gap-0">
              {filteredServices.slice(0, 6).map((service) => (
                <li key={service.name}>
                  <SmartLink
                    href={`${service.href}#${serviceAnchorId(service.name)}`}
                    onClick={(e) => handleResultClick(e, service.name)}
                    className="flex items-center justify-between gap-2 px-3 py-2.5 text-sm text-text hover:bg-accent-soft/50 transition-colors group"
                  >
                    <span className="flex items-center gap-2">
                      <Search className="w-3 h-3 text-text-soft group-hover:text-accent" aria-hidden="true" />
                      <span className="font-medium">{service.name}</span>
                    </span>
                    <span className="text-xs text-text-soft">{service.group}</span>
                  </SmartLink>
                </li>
              ))}
            </ul>
          )}
          {noResults && (
            <p className="px-3 py-2.5 text-sm text-text-muted">
              No services found for &ldquo;{searchQuery}&rdquo;
            </p>
          )}
          {searchQuery.trim().length === 0 && (
            <div className="grid gap-0">
              <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-text-soft border-b border-border-soft">
                Popular services
              </p>
              {services.slice(0, 4).map((service) => (
                <SmartLink
                  key={service.name}
                  href={`${service.href}#${serviceAnchorId(service.name)}`}
                  onClick={(e) => handleResultClick(e, service.name)}
                  className="flex items-center gap-2 px-3 py-2.5 text-sm text-text hover:bg-accent-soft/50 transition-colors"
                >
                  <Search className="w-3 h-3 text-text-soft" aria-hidden="true" />
                  <span>{service.name}</span>
                </SmartLink>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
