# Task 4-5: Service Catalog Section Component

## Summary
Created a complete service catalog section component with segment filtering, category grouping, and fallback data for the Exxonim project. All 7 new files created, no existing files modified.

## Files Created

1. **`/src/exxonim/types/service-catalog.ts`** — Type definitions for ServiceCatalogItem, ServiceCategory, ServiceSegment, ServicesResponse, SegmentFilter
2. **`/src/exxonim/content/fallbackServiceCatalog.ts`** — All 15 services from blueprint with exact data, 4 segments, 4 categories
3. **`/src/exxonim/hooks/useServiceCatalog.ts`** — useServiceCatalog hook with API fetch via Caddy gateway (XTransformPort=3031) + fallback, useServiceSegments hook
4. **`/src/exxonim/components/service-catalog/SegmentFilterBar.tsx`** — Horizontal scrollable filter chips with active/inactive states, right-edge gradient fade
5. **`/src/exxonim/components/service-catalog/ServiceCard.tsx`** — Card with badge, title, description, deliverables, expandable full deliverables, CTA button + skeleton variant
6. **`/src/exxonim/components/service-catalog/ServiceCatalogSection.tsx`** — Full section with heading, filter bar, category grouping, responsive grid, loading/empty/error states
7. **`/src/exxonim/components/service-catalog/index.ts`** — Barrel export

## Design Decisions
- Used `fetch` directly with Caddy gateway pattern (`/api/services?XTransformPort=3031`) instead of axios client (different port than FastAPI backend)
- Dark mode support via existing theme tokens (bg-surface, text-text, border-border-soft, bg-accent, etc.)
- Badge colors: "Most Popular" = orange (#E67E22), all others = dark blue (#0B3B5F)
- Check icon color for deliverables: #27AE60 (success green)
- Category headings with accent line dividers on both sides
- Categories with no matching services are hidden when filtering by segment

## Verification
- ESLint: passes clean (zero errors)
- TypeScript: no errors in new files
- Dev server: running on port 3000
