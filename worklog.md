# Worklog

## Previous Sessions

- FAQ page completely redesigned matching reference image
- Two-column layout with category nav in left column
- Plus/X toggle icons instead of chevrons
- Comprehensive backend notes for DB migration (schema, API, admin form, migration path)
- Breadcrumb alignment is consistent across all pages

---

## Session: Light Theme Logo Fix on Hero Page

Task ID: 1
Agent: main
Task: Audit and fix the light theme logo on the hero page — dark logo showing in light mode on refresh, solid background rectangles visible, hamburger menu wrong color

### Problem Analysis
The root cause was a **React-dependent logo switching system** that caused a flash of the wrong logo on page refresh:

1. **`logo-force-dark` / `logo-force-light` CSS classes** were applied via React state (`theme` prop), which only works AFTER JavaScript hydrates
2. On refresh in light mode, React initially renders with SSR default (`theme="dark"`), causing the dark logo (white text on black rectangle) to briefly flash
3. Logo images have solid colored backgrounds (light logo = white bg, dark logo = black bg) that showed as visible rectangles
4. Hamburger menu icon used React-driven `text-white` class that also flashed wrong on refresh

### Solution
**Made logo visibility purely CSS-driven** using `html[data-theme]` which is set by a blocking `<script>` in `<head>` BEFORE first paint:

1. **Removed `logo-force-*` React classes** from Navigation.tsx — no more React-dependent logo switching
2. **Added `data-over-hero` attribute** on `<header>` for CSS-only nav element styling
3. **Applied `mix-blend-mode: multiply`** to `.logo-light` (eliminates white background)
4. **Applied `mix-blend-mode: screen`** to `.logo-dark` (eliminates black background)
5. **Added CSS rules** for `header[data-over-hero]` + `html[data-theme]` to handle hamburger/icon colors without React
6. **Scoped blend modes** to `header` only so PageLoader and favicons are unaffected

### Files Changed
- `src/exxonim/components/Navigation.tsx` — Removed `logo-force-*` classes, added `data-over-hero` attribute, updated hamburger icon class
- `src/app/globals.css` — Replaced `logo-force-*` CSS with `header[data-over-hero]` CSS, added `mix-blend-mode` for transparent backgrounds
- `src/app/layout.tsx` — Updated blocking script comment to clarify logo flash prevention

### Verification Results
- ✅ Light mode: Only light logo visible, no dark logo flash, no solid rectangle
- ✅ Dark mode: Only dark logo visible, no light logo showing
- ✅ Scrolled: Logo properly visible with solid header background
- ✅ Mobile light: Hamburger icon dark, logo correct
- ✅ Mobile dark: Hamburger icon white, logo correct
- ✅ Theme toggle: Smooth crossfade transition works
- ✅ Page refresh: No flash of wrong logo (CSS-only switching)
