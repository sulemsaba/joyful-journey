'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { cn } from '@/exxonim/utils/cn';

/**
 * CardDeckCarousel - Swipeable card deck carousel for mobile.
 *
 * BEHAVIOUR:
 * - Shows one card centered, with the previous/next cards peeking
 *   from behind (left and right edges visible).
 * - Peeking cards are scaled down and slightly transparent.
 * - Swipe left/right or tap a peeking card to bring it to center.
 * - Desktop (≥ lg): hidden - parent should use a grid layout instead.
 *
 * DESIGN CONSTRAINTS (for admin-managed content):
 * - Card width is fixed at ~280px on mobile (portrait rectangle).
 * - Cards use flex-col with flex-1 feature list so they stretch
 *   to equal height within a segment set.
 * - Max 8 features recommended per card for visual balance.
 * - Description recommended max ~120 chars for clean card layout.
 */

interface CardDeckCarouselProps {
  /** Each card to display. Must have a stable key. */
  cards: {
    key: string;
    content: ReactNode;
  }[];
  /** Default active index (0-based). Defaults to middle card. */
  defaultIndex?: number;
  /** Additional class on outer wrapper. */
  className?: string;
}

export function CardDeckCarousel({
  cards,
  defaultIndex,
  className,
}: CardDeckCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(
    defaultIndex ?? Math.floor(cards.length / 2)
  );
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragDelta = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  /* ── Reset active index when cards change (e.g. segment switch) ── */
  useEffect(() => {
    setActiveIndex(defaultIndex ?? Math.floor(cards.length / 2));
  }, [cards, defaultIndex]);

  /* ── Navigate ──────────────────────────────────────────────── */
  const goTo = useCallback(
    (index: number) => {
      if (index < 0 || index >= cards.length) return;
      setActiveIndex(index);
    },
    [cards.length]
  );

  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  /* ── Touch / pointer drag ──────────────────────────────────── */
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragDelta.current = 0;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    dragDelta.current = e.clientX - dragStartX.current;
  }, [isDragging]);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
    const threshold = 40;
    if (dragDelta.current < -threshold) goNext();
    else if (dragDelta.current > threshold) goPrev();
    dragDelta.current = 0;
  }, [goNext, goPrev]);

  /* ── Keyboard navigation ───────────────────────────────────── */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    },
    [goPrev, goNext]
  );

  /* ── Dot indicators ────────────────────────────────────────── */
  const showDots = cards.length > 1;

  if (cards.length === 0) return null;

  return (
    <div
      className={cn('relative md:hidden', className)}
      ref={containerRef}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Plan cards carousel"
      aria-roledescription="carousel"
    >
      {/* ── Card deck area ── */}
      <div
        className="relative flex items-center justify-center touch-pan-y"
        style={{ height: '520px', touchAction: 'pan-y' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {cards.map((card, index) => {
          const offset = index - activeIndex; // -1, 0, 1, etc.
          const isCenter = offset === 0;
          const isLeft = offset === -1;
          const isRight = offset === 1;
          const isFar = Math.abs(offset) > 1;

          // Don't render cards that are too far away
          if (isFar) return null;

          return (
            <div
              key={card.key}
              className={cn(
                 'absolute transition-transform transition-opacity duration-300 ease-out cursor-pointer',
                isCenter && 'z-30',
                isLeft && 'z-20 cursor-pointer',
                isRight && 'z-20 cursor-pointer',
              )}
              style={{
                // Card deck positioning - side cards peek from behind
                transform: isCenter
                  ? 'translateX(0) scale(1)'
                  : isLeft
                    ? 'translateX(-62%) scale(0.92)'
                    : 'translateX(62%) scale(0.92)',
                opacity: isCenter ? 1 : 0.85,
                width: '280px',
              }}
              onClick={() => {
                if (!isCenter) goTo(index);
              }}
              role="group"
              aria-roledescription="slide"
              aria-label={`${card.key}, card ${index + 1} of ${cards.length}`}
              aria-hidden={!isCenter}
            >
              {card.content}
            </div>
          );
        })}
      </div>

      {/* ── Dot indicators ── */}
      {showDots && (
        <div className="flex items-center justify-center gap-2 mt-3" role="tablist">
          {cards.map((card, index) => (
            <button
              key={card.key}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Go to card ${index + 1}`}
              onClick={() => goTo(index)}
              className={cn(
                'h-2 rounded-full transition-colors duration-200',
                index === activeIndex
                  ? 'w-5 bg-accent'
                  : 'w-2 bg-border-soft hover:bg-accent/40'
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
