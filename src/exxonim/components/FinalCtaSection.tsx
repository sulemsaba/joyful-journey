'use client';

import { ArrowRight, Phone } from 'lucide-react';
import { Button } from '@/exxonim/components/primitives/Button';
import { UnifiedCtaSection } from '@/exxonim/components/UnifiedCtaSection';
import { routes } from '@/exxonim/routes';

/* ─────────────────────────────────────────────────────────────────────────────
 * FinalCtaSection - Strong final call-to-action block.
 *
 * Thin wrapper over the shared UnifiedCtaSection (teal banner) so it stays
 * consistent with every other CTA on the site.
 * ──────────────────────────────────────────────────────────────────────────── */

export function FinalCtaSection() {
  return (
    <UnifiedCtaSection
      ariaLabel="Get started with Exxonim"
      heading="Ready to get started?"
      description="Book a free consultation and receive a tracking code that keeps you informed at every step."
    >
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <Button size="standard" variant="inverse" href={routes.contact}>
          Book a Free Consultation
          <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
        </Button>
        <Button size="standard" variant="inverseOutline" href="tel:+255794689099">
          <Phone className="mr-1.5 h-4 w-4" aria-hidden="true" />
          Call +255 794 689 099
        </Button>
      </div>
    </UnifiedCtaSection>
  );
}
