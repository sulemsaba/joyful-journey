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

---

## Session: Track Your Consultation — Complete Redesign per Technical Design Report v1.0

Task ID: 2
Agent: main
Task: Revamp the Track Your Consultation page to match the new "Exxonim Client Case Tracking System — Technical Design Report v1.0" spec

### What Changed

**Complete redesign of the tracking system from `EXX-{SVC}-{SEQ}` to 6-character alphanumeric codes.**

1. **Tracking Code Format** — Changed from `EXX-REG-00001` to `84729A` (6 chars, A-Z + 0-9, case-insensitive, displayed as `84 72 9A`)
2. **API Endpoint** — New `POST /api/v1/track` endpoint replaces the non-existent `POST /consultations/lookup`
3. **API Response** — New response shape per spec: `{ status, milestone, lastUpdated, nextMilestone }` with optional extended fields for progress bar and milestone timeline
4. **Contact Form** — Now generates 6-char alphanumeric tracking codes instead of `EXX-XXXXX`
5. **Service Layer** — New `lookupTrackingCode()` function with proper 404 handling (Axios throws on non-2xx)
6. **Type Contracts** — New types: `ApiTrackingLookupRequest`, `ApiTrackingLookupResponse`, `ApiTrackingNotFoundResponse`, `ApiTrackingMilestone`, `ApiTrackingCaseStatus`, `ApiTrackingLookupResult`
7. **Barrel Export** — `TrackConsultationPage` now exported from `src/exxonim/pages/index.ts`
8. **Backend Comments** — Extensive inline comments throughout all files for the FastAPI + PostgreSQL backend team, covering:
   - Tracking code generation algorithm (Python secrets.choice)
   - Database schema (cases, milestones, case_milestones tables)
   - Rate limiting rules (20/min per IP, 10 per code)
   - Security architecture (no info leakage, POST not GET, HTTPS)
   - WhatsApp notification templates
   - SQL query patterns for milestone lookup

### Files Changed
- `src/exxonim/shared/contracts/consultations.ts` — Added 6 new tracking types with extensive backend docs
- `src/exxonim/shared/contracts/index.ts` — Added new type exports
- `src/exxonim/types/api.ts` — Added new type re-exports
- `src/exxonim/shared/api/routes.ts` — Added `public.track.lookup` route
- `src/app/api/v1/[...slug]/route.ts` — Added POST /track mock with 3 demo cases, fixed POST /consultations code generation
- `src/exxonim/services/consultationService.ts` — Added `lookupTrackingCode()` using `fetch()` with relative paths (not Axios) to work through caddy gateway
- `src/exxonim/services/index.ts` — Added `lookupTrackingCode` export
- `src/exxonim/pages/TrackConsultationPage.tsx` — Complete rewrite (812→630+ lines, new UI, new code format)
- `src/exxonim/pages/ContactPage.tsx` — Updated success state to display formatted 6-char code
- `src/exxonim/pages/index.ts` — Added TrackConsultationPage export
- `.env` — Added NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1

### Demo Tracking Codes (Mock API)
- `84729A` — Active case (Company Registration, 3/6 milestones done)
- `K5BM3E` — Completed case (TIN Application, all done)
- `P9QX2W` — On hold case (Business Licensing, awaiting documents)
- Any other 6-char code → "not found"

### Verification Results
- ✅ Page loads correctly with new UI
- ✅ Auto-formatting works (84729A → "847 29A")
- ✅ Active case (84729A) shows progress bar, timeline, "In Progress" status
- ✅ Completed case (K5BM3E) shows 100% done, "Completed" status
- ✅ On hold case (P9QX2W) shows "On Hold" with action needed message
- ✅ Invalid code shows "No consultation found" with format hint
- ✅ Contact form generates 6-char codes (e.g., "GA26PF")
- ✅ How It Works, Security, Lost Code, and CTA sections all render
- ✅ Footer sticks to bottom properly

### Bug Fix: Browser API calls failing
- **Issue**: `lookupTrackingCode()` used the shared Axios client with absolute baseURL (`http://localhost:3000/api/v1`), which is unreachable from the browser in the sandbox/proxied environment
- **Fix**: Changed `lookupTrackingCode()` to use native `fetch()` with a relative path (`/api/v1/track`) instead of Axios. Relative paths resolve through the caddy gateway correctly in all environments
- **Why other pages work**: Other pages use SSR where the server can reach `localhost:3000` directly. The tracking lookup is purely client-side (user enters code, clicks button), so it must use relative paths

---
Task ID: 1
Agent: Main Agent
Task: Change tracking code format from 6 alphanumeric to 5 digits + 1 letter, displayed as 3 groups of 2 (e.g. "12 34 5A")

Work Log:
- Updated mock API handler (route.ts): new tracking code generator (5 random digits + 1 random letter), new validation regex `/^[0-9]{5}[A-Z]$/`, replaced demo codes (84729A, 53107B, 46283C)
- Updated TrackConsultationPage.tsx: new validation regex, display format as 3 groups of 2, input auto-formatting with spaces after 2nd and 4th chars, updated hero text, demo hints, security stats (2.6M codes), SEO description, aria-label, not-found format hint (NN NN NA)
- Updated ContactPage.tsx: tracking code display format changed from 2 groups of 3 to 3 groups of 2
- Updated consultations.ts types: tracking code format description updated
- Updated consultationService.ts: backend comments updated for new format
- Updated api routes.ts: added tracking code format description
- All lint checks pass
- Browser verification: all 3 demo codes (84729A, 53107B, 46283C) work correctly for active/completed/on_hold cases; invalid codes show "not found"; display format confirmed as "84 72 9A" (3 groups of 2)

Stage Summary:
- Tracking code format changed from 6 alphanumeric to 5 digits + 1 letter
- Display format changed from "847 29A" (2 groups of 3) to "84 72 9A" (3 groups of 2)
- Old demo codes K5BM3E and P9QX2W replaced with 53107B and 46283C
- P9QX2W on_hold bug is fixed (was caused by old alphanumeric format)
- Keyspace updated from 2.17 billion to 2.6 million
