# Task 3 — UX Rule 1: Skeleton Screens for Homepage

## Agent: UX Agent (Skeleton Screens)

## Summary
Created a shape-aware `HomePageSkeleton` component that mirrors the real homepage layout, replacing the generic `ContentSkeleton` that didn't match any actual page structure.

## Files Modified
1. **`/home/z/my-project/src/exxonim/components/LoadBoundary.tsx`** — Added `HomePageSkeleton` export alongside existing `ContentSkeleton` and `LoadBoundary`
2. **`/home/z/my-project/src/exxonim/pages/HomePage.tsx`** — Added early return with `HomePageSkeleton` when page data is loading

## Key Decisions
- Skeleton shows 7 sections matching real homepage: hero → review bar → trusted-by logos → features → pricing → blog rail → newsletter
- Favicon pulse loader centered in hero area (same `loader-pulse` animation as `PageSuspenseFallback` in App.tsx and index.html inline skeleton)
- Hero skeleton uses same CSS classes (`hero-section`, `hero-review-bar`) and header offset (`-mt-[60px] sm:-mt-[68px]`) as real content for pixel-perfect layout match
- Middle pricing card uses `bg-text` (dark featured style) matching the real `PlanCard` featured state
- `aria-hidden="true"` on all individual skeleton elements, `role="status" aria-live="polite"` on wrapper
- Used `animate-pulse` consistently (same as existing `ContentSkeleton`)
- No new packages imported — uses existing `cn()` utility

## Lint Status
✅ Passes clean — zero errors
