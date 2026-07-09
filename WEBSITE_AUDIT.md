# Public Website Audit — Exxonim Consult (2026-07-09)

Vite + React + react-router, **pure client-side rendered** (CSR), served on :3001. Three
audits: performance, technical/rendering/SEO, design/UX (+ live screenshots desktop+mobile).

## Verdict in one line
Well-engineered SPA (clean code-split bundle, robust API-down fallbacks, error boundaries,
working contact/track forms, good a11y basics) — but it has **one strategic weakness (CSR
kills SEO/social sharing)**, a **home page with empty visual slots + voids**, and a set of
**quick performance + polish wins**. The inner pages (Services, About, etc.) are polished.

## FINDINGS BY SEVERITY

### 🔴 BLOCKER — the defining weakness
- **CSR, no prerender/SSG.** `curl /` returns an empty `#root` + boot-loader; ALL content,
  titles, meta, OG tags, JSON-LD are injected client-side. Googlebot copes, but
  **WhatsApp / Facebook / LinkedIn / X / Slack don't run JS** → every shared link shows the
  generic shell with no title/description/image. For a firm that grows via search + WhatsApp
  shares, this is the #1 issue. **Fix:** build-time prerender the marketing routes
  (`vite-react-ssg` or a puppeteer prerender step) so real HTML + per-page OG ship in the
  response. (`index.html`, `seo/apply-seo.ts`, `StructuredData.tsx`.)

### 🟠 HIGH
- **Home page: 2 empty visual slots + big voids.** Stack items 1 "Registration & Licensing"
  and 2 "Annual Compliance & Renewals" have `videoSources: []` → blank windows (item 3
  "Live Case Tracking" has a video). These are the **2 placeholders the owner will supply
  media for** (`content/fallbackPublicContent.ts:221,236`). The section also renders large
  empty vertical gaps. **Fix:** drop in the owner's 2 images/videos + tighten the layout.
- **sitemap.xml / blog/rss.xml advertised but 404** (robots.txt + `<link rel=alternate>`
  point at them; both fall back to SPA HTML). **Fix:** generate real files at build.
- **og:image broken** — no `og:image` in static HTML; API default `/og-image.png` doesn't
  exist. Link previews show no image. **Fix:** add a real `og-image.png` + static default.
- **Never-idle / perpetual load** (perf): `useContentVersion.ts:46` polls every 30s forever
  + `index.html` auto-reloads at 20s + aggressive react-query refetch. Symptom: page "always
  loading", broke automated measurement. **Fix:** drop the 30s poll (on-focus or 5min),
  remove/lengthen the 20s reload, raise `staleTime`.

### 🟡 MEDIUM
- **896 KB stack video autoplays below the fold** on home (`StackSection.tsx:117`,
  `preload="metadata"` overridden by `autoPlay`). **Fix:** `preload="none"` + play on
  IntersectionObserver.
- **Newsletter form is a stub** — `NewsletterForm.tsx:31` fakes "Subscribed!" with a
  setTimeout, no POST. **Fix:** wire to a real subscribe endpoint (or the SMS/email list).
- **800 ms API timeout too aggressive** (`shared/api/http.ts:9`) — any slower response is
  treated as "down" and silently swapped for stale/fallback content. **Fix:** 3–5s.
- **Broken `/resources/hero.jpg`** (404 → SPA HTML). Add the asset or fix the content field.
- **Blank main area on lazy route nav** (`App.tsx:268` `Suspense fallback={null}`). Add a
  skeleton.
- **No analytics** at all — can't measure traffic/conversions (consent banner exists).
- **Dead assets shipped:** `exxonm-tracking.mp4` (2.9 MB) + `hero-bg.png` (718 KB) unused;
  2.4 MB prod sourcemaps (`build.sourcemap:true`).

### 🟢 LOW / polish
- 0 `<img>` set width/height (CLS); 15/17 lack `loading="lazy"`.
- Google Fonts from CDN (FOUT + external dep); `public/fonts/` on disk but unused.
- Boot-loader auto-reload can mask JS errors; stale "8s" comments (really 10s/20s).
- Track-404 shape mismatch (`consultationService.ts:114`).
- Legacy Next/Prisma cruft in the repo root.

## PER-PAGE DESIGN STATUS (from live screenshots)
- **Home** ▶ hero strong, but empty hero-right (`hero-person.jpg` unused), 2 blank stack
  windows + voids, insights section empty when no posts. **Needs the most work.**
- **Services** ✅ polished — categorized catalog, packages w/ segment tabs, FAQ, CTA.
- **About / FAQ / Contact / Track / Service-detail** — captured, generally polished/on-brand
  (dark + teal, consistent header/footer). Service cards are icon-only (lots of empty space
  — could add imagery later).
- **Resources (Blog)** — renders posts; the `/resources/hero.jpg` asset 404s.

## THE 2 HOME IMAGE PLACEHOLDERS (owner providing media)
1. **Stack item 1 — "Registration & Licensing"** window (`fallbackPublicContent.ts:221`,
   `videoSources: []`).
2. **Stack item 2 — "Annual Compliance & Renewals"** window (`:236`, `videoSources: []`).
(Optionally the hero-right could use the existing `public/hero-person.jpg`.)

## SYSTEMATIC PLAN (page priority order)
The home page earns first slot (highest traffic + it has the visible gaps). Order:
1. **Home** — drop in the owner's 2 images (stack 1 & 2) + optional hero visual; fix the
   voids/layout; defer the autoplay video; then re-check top-to-bottom.
2. **Cross-cutting SEO/perf** (benefits every page): prerender + sitemap/rss + og-image;
   kill the 30s poll + 20s reload; raise API timeout; wire the newsletter.
3. **Services** (polish only) → **About** → **Contact/Track** (forms already work) →
   **Resources/Blog** (fix hero asset) → **FAQ / Support / Terms / Career** → **404**.
4. **Perf hygiene sweep**: lazy/width-height on images, delete dead assets, sourcemaps off,
   self-host fonts.

## Start: HOME PAGE — awaiting the owner's 2 images for the stack windows.
