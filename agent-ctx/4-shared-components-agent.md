# Task 4 — Shared Components Agent

## Task
Build Navigation, Footer, Theme system, and shared primitives for the Exxonim website.

## Files Created

1. **`/src/components/exxonim/Container.tsx`** — Responsive width-constrained wrapper
2. **`/src/components/exxonim/ThemeToggle.tsx`** — Dark/light theme toggle button
3. **`/src/components/exxonim/WhatsAppButton.tsx`** — Floating WhatsApp contact button
4. **`/src/components/exxonim/Navigation.tsx`** — Full navigation bar (desktop + mobile)
5. **`/src/components/exxonim/Footer.tsx`** — Full footer with social icons
6. **`/src/components/exxonim/ErrorBoundary.tsx`** — React error boundary
7. **`/src/components/exxonim/PageLoader.tsx`** — Loading overlay spinner
8. **`/src/components/exxonim/PrivacyConsentBanner.tsx`** — Placeholder consent banner

## Key Decisions

- **Theme-aware logo display**: Uses `style={{ display: theme === "light" ? "block" : "none" }}` instead of `dark:` CSS variant, because the project uses `data-theme` attribute for theme switching (not `.dark` class).
- **PageLoader lint fix**: Used `queueMicrotask(hide)` pattern to avoid the `react-hooks/set-state-in-effect` lint error.
- **Navigation dropdowns**: Desktop uses `DesktopDropdown` sub-component with click-to-toggle + click-outside-to-close. Mobile uses `MobileExpandable` sub-component with accordion-style toggle.
- **Social icons**: Inline SVG paths for linkedin, instagram, x/twitter, facebook, youtube, tiktok in Footer component.
- **CSS theme tokens**: All components use the Exxonim design tokens (bg-surface, text-text, bg-accent, etc.) defined in globals.css.

## Verification
- ESLint: ✅ PASS (zero errors)
- Dev server: ✅ Running normally on port 3000
