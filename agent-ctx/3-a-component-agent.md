# Task 3-a: ExxonimApartSection Component

## Summary
Created `/home/z/my-project/src/exxonim/components/ExxonimApartSection.tsx` — a "What sets Exxonim apart" differentiator grid section for the Services page.

## What was built
- A `'use client'` component with 4 differentiator cards in a responsive 2×2 grid
- Cards: Live Consultation Tracking, 5-Month Compliance Reminders, Authority Liaison, Document Readiness Review
- Each card has an inline SVG icon, title, description, and optional "Learn more →" link
- Uses Exxonim design tokens: bg-page-strong, bg-surface/88, border-border-soft, shadow-card, accent-soft, text-text, text-text-muted
- Container pattern: `w-[min(1240px,calc(100%-2rem))] mx-auto`
- Hover animations: `-translate-y-1 hover:border-accent/30`

## Integration Point
This component should be imported and rendered in `ServicesPage.tsx`, likely between `EngineSection` and `ServicePackagesSection`:
```tsx
<ExxonimApartSection />
```

## Key Decisions
- Used inline SVGs instead of lucide-react (per spec — self-contained)
- Only the "Live Consultation Tracking" card links to `routes.trackConsultation`
- No props — all content is static (designed for future CMS integration with JSDoc notes)
- No shadcn/ui — pure Tailwind + custom markup
