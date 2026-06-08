# Task 1: Replace all hardcoded colors with design tokens

## Work Done

### Footer.tsx
- `border-white/10` → `border-accent-contrast/10`
- `text-white/70` → `text-accent-contrast/70`
- `text-white/90` → `text-accent-contrast/90` (3 instances: Follow Us, Navigation, Resources & Legal)
- `bg-white/10` → `bg-accent-contrast/10` (social icons, 4 instances)
- `text-white/70` → `text-accent-contrast/70` (social icons, 4 instances)
- `hover:text-white` → `hover:text-accent-contrast` (social icons, 4 instances)
- `hover:bg-white/20` → `hover:bg-accent-contrast/20` (social icons, 4 instances)
- `text-white/50` → `text-accent-contrast/50` (social description, SVG icons)
- `text-white/60` → `text-accent-contrast/60` (nav links, resource links, contact info)
- `hover:text-white` → `hover:text-accent-contrast` (nav links, email links, phone links)
- `bg-white/60` → `bg-accent-contrast/60` (underline hover effects)
- `text-white/40` → `text-accent-contrast/40` (copyright)
- Kept all existing `dark:` variants that already use design tokens

### ContactPage.tsx
- `fill="white"` → `fill="var(--color-accent-contrast)"` (2 cloud SVGs)
- `fill="rgba(255,255,255,0.08)"` → `fill="var(--color-accent-contrast)" opacity="0.08"`
- `fill="rgba(255,255,255,0.05)"` → `fill="var(--color-accent-contrast)" opacity="0.05"`
- `bg-white dark:bg-surface` → `bg-surface`

### ReferenceHero.tsx
- `dark:border-white/20` → `dark:border-accent-contrast/20`
- `dark:bg-white/10` → `dark:bg-accent-contrast/10`
- `dark:text-white` → `dark:text-accent-contrast`
- `dark:hover:border-white/40` → `dark:hover:border-accent-contrast/40`
- `dark:hover:bg-white/20` → `dark:hover:bg-accent-contrast/20`
- Google brand colors (#4285F4, #34A853, #FBBC05, #EA4335) and `text-[#fbbc05]` kept as-is

### CareerPage.tsx
- `border-white/20` → `border-accent-contrast/20` (4 share buttons)
- `text-white/60` → `text-accent-contrast/60` (4 share buttons)
- `hover:bg-white/10` → `hover:bg-accent-contrast/10` (4 share buttons)
- `hover:text-white` → `hover:text-accent-contrast` (4 share buttons)
- `bg-black/50` → `bg-overlay` (modal backdrop)
- `dark:from-[#00111F]/95` → `dark:from-page/95`
- `dark:via-[#00111F]/80` → `dark:via-page/80`
- `dark:to-[#00111F]/55` → `dark:to-page/55`
- `text-white` → `text-accent-contrast` (hero heading)
- `text-white/70` → `text-accent-contrast/70` (hero description)
- `text-white/50` → `text-accent-contrast/50` (stats)
- `bg-white/40` → `bg-accent-contrast/40` (dot separator)
- `border-white/30` → `border-accent-contrast/30` (About button)
- `text-white` (About button) → `text-accent-contrast`
- `hover:bg-white/10` → `hover:bg-accent-contrast/10` (About button)

### JobApplyModal.tsx
- `bg-black/60` → `bg-overlay`

### InsightsSection.tsx
- `border-white/20` → `border-accent-contrast/20` (Tag, placeholder icon)
- `bg-overlay/40` → `bg-accent-contrast/30` (Tag - on accent background)
- `bg-overlay/30` → `bg-accent-contrast/30` (placeholder icon - on accent background)

### ResourcesPage.tsx
- `border-white/20` → `border-accent-contrast/20` (Tag, placeholder icon)
- `bg-overlay/40` → `bg-accent-contrast/40` (Tag - on accent background)
- `bg-overlay/30` → `bg-accent-contrast/30` (placeholder icon - on accent background)

### DesktopNavigation.tsx
- `shadow-[0_24px_48px_-12px_rgba(0,0,0,0.12)]` → `shadow-panel`
- `dark:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.4)]` → `dark:shadow-panel-strong`

## Verification
- Lint: PASS on all modified files (pre-existing ServicesPage error unrelated)
- Dev server: Compiling successfully
- No remaining hardcoded colors (white/black/rgba) in modified files
