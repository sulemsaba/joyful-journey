'use client';

import { useState, useEffect } from 'react';
import { routes } from '@/exxonim/routes';
import { SmartLink } from '@/exxonim/components/primitives/SmartLink';

/**
 * StickyMobileCta - fixed bottom bar on mobile with "Ask a Question - Free" CTA.
 * (CRO audit Problem 1: action-oriented primary CTA)
 *
 * Only appears on mobile viewports (below md breakpoint) after the user
 * has scrolled past the hero section (200px threshold). Disappears near
 * the bottom of the page so it doesn't overlap with the footer.
 */
export function StickyMobileCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const nearBottom = scrollY + winHeight > docHeight - 300;

      // Show after scrolling 200px, hide near the bottom of the page
      setVisible(scrollY > 200 && !nearBottom);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 md:hidden transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      role="complementary"
      aria-label="Quick action"
    >
      <div className="px-4 pb-safe bg-surface/95 backdrop-blur-md border-t border-border-soft">
        <div className="py-3 flex gap-3">
          <SmartLink
            href={`${routes.contact}#inquiry`}
            className="flex-1 inline-flex h-12 items-center justify-center rounded-full bg-accent text-accent-contrast text-sm font-extrabold transition-all hover:bg-accent-hover active:scale-[0.98]"
          >
            Ask a Question - Free
          </SmartLink>
          <SmartLink
            href={routes.trackConsultation}
            className="inline-flex h-12 items-center justify-center rounded-full border border-border-soft bg-surface text-text text-sm font-semibold px-4 transition-all hover:bg-surface-soft active:scale-[0.98]"
          >
            Track
          </SmartLink>
        </div>
      </div>
    </div>
  );
}
