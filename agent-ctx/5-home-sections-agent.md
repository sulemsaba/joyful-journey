# Task 5 — Build All Home Page Section Components

## Agent: Home Sections Agent

## Work Log

### 1. ReferenceHero.tsx
- Created `/src/components/exxonim/ReferenceHero.tsx`
- Props: `{ content: HomeHeroContent }`
- Features implemented:
  - Background radial gradient using CSS custom properties (`--color-accent-soft-strong`, `--color-accent-soft`)
  - `splitIntoPhrases()` function that splits title into 3 phrases for visual impact
  - Eyebrow text with decorative line
  - Large title: `text-[clamp(2.8rem,6vw,5.5rem)]` with semibold and tight tracking
  - Description paragraph
  - CTA button with full spec: `h-14 rounded-full bg-accent px-8 shadow-accent-glow hover:-translate-y-0.5`
  - "Get started" callout card with Phone icon, rounded-2xl border
  - Trust strip with star ratings showing highlight stats (500+, 98%, 10+)
  - Hero image on the right (`/hero-person.jpg`) with shadow-hero
  - Floating highlight chips positioned on the hero image
  - Responsive: single column on mobile, `lg:grid-cols-[1fr_minmax(0,1fr)]` on desktop

### 2. ProviderSection.tsx
- Created `/src/components/exxonim/ProviderSection.tsx`
- Props: `{ content: ProviderSectionContent }`
- Features implemented:
  - Kicker badge and title
  - Full-width marquee with `animate-provider-marquee` CSS animation
  - Hover pauses marquee via `hover:[animation-play-state:paused]`
  - Edge mask gradient: `[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]`
  - Full-width strip: `w-screen -ml-[50vw] left-1/2`
  - Logo images with `resolveLogoSrc()` helper and fallback to `/placeholder.svg` on error
  - Logos repeated 4x for seamless loop
  - LogoItem sub-component with useState for error tracking

### 3. StackSection.tsx
- Created `/src/components/exxonim/StackSection.tsx`
- Props: `{ items: StackItem[]; defaultFeatureRows?: FeatureRow[]; featureVisualContentMap?: Record<string, FeatureVisualContent> }`
- Features implemented:
  - Section background gradient: `bg-[linear-gradient(180deg,var(--color-surface)_0%,var(--color-page)_52%,var(--color-page-strong)_100%)]`
  - StatementCard sub-component exactly per spec
  - Desktop: sticky stacking cards that pile on top as user scrolls
  - Mobile: simple vertical stack
  - Each card shows windowTag + index, title, subtitle, description, CTA link
  - CTA button with ArrowRight icon

### 4. ServicePlansSection.tsx
- Created `/src/components/exxonim/ServicePlansSection.tsx`
- Self-contained (no props), uses fallback data directly
- Features implemented:
  - Left side: Testimonial card with auto-rotation (4.8s interval via useEffect)
  - Testimonial navigation dots (active dot wider) + prev/next buttons
  - Quote icon, eyebrow, headline, support text, quote body, author with initials avatar
  - Right side: 3 pricing plan cards in sm:grid-cols-3
  - Featured plan gets inverted color scheme: `bg-text text-surface`
  - Plan cards show features with Check/X icons from lucide-react
  - Features not included get line-through styling
  - Grid layout: `lg:grid-cols-[minmax(280px,360px)_1fr]`
  - Badge, description, notes, and CTA for each plan

### 5. InsightsSection.tsx
- Created `/src/components/exxonim/InsightsSection.tsx`
- Props: `{ content: HomeInsightsContent; posts: BlogPost[] }`
- Features implemented:
  - Section title and intro text with kicker badge
  - Horizontally scrollable card rail with snap scrolling
  - Rail: `flex gap-6 overflow-x-auto [scrollbar-width:none] [scroll-snap-type:x_proximity]`
  - Navigation arrows with scroll state tracking (canScrollLeft/canScrollRight)
  - Card: `rounded-[30px]` with hover lift (`hover:-translate-y-1`), snap align start
  - Card flex: `flex-[0_0_clamp(312px,31vw,392px)]` on desktop, `max-md:flex-[0_0_min(84vw,340px)]`
  - Image area with gradient placeholder for posts without cover images
  - Category badge overlay on image
  - Date formatter using `Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" })`
  - Title, excerpt (line-clamp-3), author, "Learn more" link
  - "See more" CTA button at bottom
  - Scroll event listener with cleanup for arrow state updates

## Verification
- ESLint: ✅ PASS (zero errors)
- TypeScript: ✅ Zero errors in src/ directory (only pre-existing errors in examples/ and skills/)
- Dev server: ✅ Running normally

## File Summary
All 5 files created with `"use client"` directive, proper TypeScript types from `@/lib/exxonim-types`, data from `@/lib/exxonim-data`, `cn` from `@/lib/cn`, `Container` from `@/components/exxonim/Container`, and `routes` from `@/lib/exxonim-router`.
