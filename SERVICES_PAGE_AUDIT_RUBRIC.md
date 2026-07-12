# Services Page — Audit Rubric & Execution Plan

> **Status:** CRITERIA CAPTURED — collecting rubrics before we run anything.
> **Captured:** 2026-07-12
> **Target under audit:** the public Services page — `src/exxonim/pages/ServicesPage.tsx`,
> route `/services/` (served on :3001). Per-service pages: `ServiceDetailPage.tsx` at `/services/{slug}/`.
> **Scope note:** Framework A (technical) is a site-wide standard we apply *to* the Services
> page; Framework B (consulting content/persuasion) is Services-page-specific.

This doc holds the **standards we will grade against** — not the results. Results get filled
into the scoring tables at the bottom once all rubrics are in and we run the audit.

## Rubric intake

| # | Framework | Source | Status |
|---|-----------|--------|--------|
| A | Technical Quality (Performance, UX, SEO, a11y, Best Practices, Security) | owner, 2026-07-12 | ✅ captured |
| B | Consulting Services Page — Content & Persuasion | owner, 2026-07-12 | ✅ captured |
| C | _(third rubric)_ | owner — pending | ⏳ awaiting |

> **Do not start scoring until C is in.** Owner will provide a third audit, then we run all of
> them together, on this page, honestly.

---

## Ground rules — honest & unbiased (non-negotiable)

The owner asked for this twice. These rules operationalize it:

1. **Evidence or it didn't happen.** Every score cites a source: a Lighthouse/PSI number, an
   axe/WAVE result, a `file:line`, a DOM/network observation, or a screenshot. No score from
   vibes.
2. **No grade inflation.** We built this site — that is exactly why we grade it *harder*, not
   softer. When in doubt, score down and note the doubt.
3. **Separate lab vs field.** Lighthouse/WebPageTest = lab. CrUX/Search Console = field (RUM).
   Field data outranks lab when they disagree. If we have no field data, say "no RUM available"
   — never fabricate or imply it.
4. **Mark unknowns as unknown.** "Not measured" and "can't verify" are valid, required answers.
   Never round an unmeasured item up to a pass.
5. **Mobile is the default lens.** Score mobile first (throttled), desktop second.
6. **Same yardstick for competitors.** Benchmark 3–5 competitor Services pages with the *exact*
   same rubric — no home-cooking our numbers and eyeballing theirs.
7. **Reproducible.** Record tool versions, throttling profile, URL, and date on every run so a
   re-run is comparable.

**Scoring scale (per criterion):** ✅ Pass · ⚠️ Partial · ❌ Fail · ❔ Not measured.
Each framework gets a rolled-up score + a short, blunt verdict.

---

# Framework A — Technical Quality

## A1. Performance & Speed (the foundation)

**Core Web Vitals (Google ranking factors — must pass):**

| Metric | Meaning | Target |
|--------|---------|--------|
| **LCP** — Largest Contentful Paint | loading speed | ≤ **2.5 s** |
| **INP** — Interaction to Next Paint | responsiveness | ≤ **200 ms** |
| **CLS** — Cumulative Layout Shift | visual stability | ≤ **0.1** |
| **Lighthouse Performance score** | overall | ≥ **90** |

**Other key metrics:**

| Metric | Target |
|--------|--------|
| **FCP** — First Contentful Paint | ≤ **1.8 s** |
| **TTFB** — Time to First Byte (server responsiveness) | ≤ **800 ms** |
| **TBT** — Total Blocking Time (lab proxy for INP) | ≤ **300 ms** |

## A2. User Experience (UX) & Interaction

- [ ] **Mobile responsiveness** — renders flawlessly across mobile / tablet / desktop viewports.
- [ ] **Loading states** — every async op (image load, API fetch) shows a skeleton or spinner.
- [ ] **Error handling** — network failures & empty states show friendly, *actionable* messages.
- [ ] **Interaction feedback** — every clickable element has visible hover, active, AND focus states.
- [ ] **Form experience** (if present) — clear labels, inline validation with helpful messages,
      explicit success/failure feedback.

## A3. SEO fundamentals

- [ ] **Semantic HTML** — proper `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`.
- [ ] **Meta data** — unique, descriptive `<title>` (< 60 chars) + `<meta name="description">`
      (< 160 chars) containing core keywords.
- [ ] **Heading structure** — hierarchical `<h1>`–`<h6>`, exactly one `<h1>` per page.
- [ ] **Image optimization** — every `<img>` has a descriptive `alt`.
- [ ] **URL structure** — Services URLs clean, readable, descriptive (e.g. `/services/company-registration`).

## A4. Accessibility (a11y)

- [ ] **Standard** — target **WCAG 2.1 AA** minimum.
- [ ] **Keyboard navigation** — every interactive element operable with Tab alone; focus order logical.
- [ ] **Color contrast** — **4.5:1** normal text, **3:1** large text (WCAG AA).
- [ ] **Focus indicators** — highly visible outline; never `outline: none` without a replacement.
- [ ] **Screen reader support** — ARIA + semantics interpreted correctly (test w/ NVDA/VoiceOver).

## A5. Best Practices & Code Quality

- [ ] **Protocol & compression** — HTTP/2 or HTTP/3, Brotli/Gzip enabled.
- [ ] **Caching** — aggressive long-term `Cache-Control` on static assets (JS/CSS/fonts/images).
- [ ] **JS bundle** — initial JS < **200 KB gzipped**; code-splitting + dynamic imports for
      non-critical features; 3rd-party scripts (analytics, chat) `async`/`defer` or deferred to
      interaction.
- [ ] **CSS** — critical (above-fold) CSS inlined, non-critical loaded async; avoid CSS-in-JS
      runtime recalc overhead where perf is critical.
- [ ] **Images & media** — WebP/AVIF; `srcset` + `sizes` for responsive; explicit `width`/`height`
      to reserve space (prevent CLS).

## A6. Security

- [ ] **HTTPS enforced** everywhere.
- [ ] **XSS prevention** — all dynamic/user content encoded before render.
- [ ] **CSP** — strict Content-Security-Policy header restricting resource origins.
- [ ] **Dependency security** — `npm audit` / Snyk clean; known vulns patched.

## A7. Tools & Process

- **Lab scoring:** Lighthouse (Chrome DevTools). **Field:** PageSpeed Insights (CrUX).
  **Deep-dive:** WebPageTest (waterfall, filmstrip). **a11y:** axe DevTools / WAVE.
  **RUM:** Search Console Core Web Vitals report.
- **Baseline first** — run full Lighthouse on the current page, record every value, *then* change.
- **Prioritize field data (RUM)** over lab when available.
- **Competitor benchmark** — same tools on 3–5 competitor Services pages; compare, find gaps.

---

# Framework B — Consulting Services Page (Content & Persuasion)

> Premise: a consulting Services page is not a brochure or a feature list — it's a
> decision-making tool that builds trust, demonstrates expertise, and filters for the right
> clients. Every element should **reduce risk** and **increase clarity**.

## B1. Positioning, not a list

Before anything, the page must answer:

| Question | Must be answered on page |
|----------|--------------------------|
| Who is this service for? (industry, company size, role) | |
| What problem does it solve? | |
| Why is our approach different from competitors? | |
| What outcome can clients expect? | |

- [ ] Consulting packaged into **1–3 clear services**, each with its **own dedicated page**;
      the overview page lists them briefly and links to the in-depth pages.

## B2. Structure for the B2B buyer journey

High-performing order (serve all decision stages at once):

1. [ ] **Hero** — service name + value proposition + primary CTA, above the fold.
2. [ ] **Problem / pain point** — name the specific challenge the ideal client faces.
3. [ ] **Solution overview & key benefits** — what we do + why it matters (benefits, not features).
4. [ ] **Methodology / process** — how we work (reduces uncertainty & risk).
5. [ ] **Proof, results & trust signals** — case studies, testimonials, metrics, client logos.
6. [ ] **FAQ** — answer common objections before they're asked.
7. [ ] **Strong CTA (repeat)** — never leave them wondering what to do next.

## B3. Write for multiple decision-makers

| Role | Cares about | Page must address |
|------|-------------|-------------------|
| Economic buyer (budget) | ROI, predictable cost, minimal downside | outcomes, metrics, case studies w/ financial impact |
| Internal champion (day-to-day) | easy win, clear scope, looks competent | process, deliverables, what we need from their team |
| Procurement / legal | vendor safety, clean paperwork, compliance | compliance cues, accreditations, clear terms |
| Executives | strategic alignment, reputational safety | services framed as strategic outcomes, not tactics |

- [ ] Every sentence passes: **"Who is this for?"**

## B4. The "before you contact us" rule

Answer the questions people ask on intro calls / emails / procurement, on the page:

- [ ] "Have you done this in a company like ours?"
- [ ] "What's your process and timeline?"
- [ ] "What will you need from our team?"
- [ ] "How do you measure success?"
- [ ] "What could go wrong, and how do you manage it?"

## B5. Trust signals — placed where doubt happens

**Rule: put the trust next to the claim, before the ask.**

| Signal | Why | Placement |
|--------|-----|-----------|
| Case studies | real problem → approach → results, in client's words | near service descriptions, esp. high-ticket |
| Testimonials | relevant clients prove fit | throughout, esp. near CTAs |
| Client logos | similar businesses = social proof | hero / trust bar |
| Metrics | "cut costs by 23%" is memorable | headlines + case-study summaries |
| Accreditations | recognized credentials | footer / dedicated section |

- [ ] Case-study format: **Background → Challenge → Solution → Impact + Metrics + Testimonial.**

## B6. CTAs — make the next step obvious

| Location | CTA type | Purpose |
|----------|----------|---------|
| Hero | primary ("Book a Consultation") | capture high-intent immediately |
| After each service | service-specific ("Learn More About [X]") | keep momentum |
| After proof | trust-reinforced ("See How We Can Help You") | convert skeptics |
| Bottom | bold, repeating primary | don't make them scroll back up |

- [ ] No hidden CTAs; no asking too much too early (a 19-field form kills conversions).

## B7. Content marketing integration

- [ ] Blog / Insights section near the bottom (enterprise buyers read for weeks first).
- [ ] 3–5 content pillars establishing authority.
- [ ] Lead magnets (guides, whitepapers, checklists) capturing email.
- [ ] Internal linking from blog posts back to relevant service pages.
- [ ] Goal = **better** leads (pre-qualified), not just more.

## B8. SEO — match intent, not just keywords

Avoid vague keywords ("consulting services"); target intent-led queries:

| Query type | Example | Page should include |
|------------|---------|---------------------|
| Problem-aware | "[industry] challenges with [X]" | pain points + how we solve them |
| Solution-aware | "[service] consulting" | outcomes + proof + process + CTA above fold |
| Comparison | "[A] vs [B]" | comparison table + FAQs + case studies |
| Sector-specific | "[service] for [industry]" | sector proof + tailored outcomes + compliance cues |

Keyword placement:
- [ ] Primary keyword: H1, first 100 words, meta title.
- [ ] Secondary: H2s, FAQs, image alt text.
- [ ] Related: case studies, supporting resources, internal links.

## B9. Naming — plain over clever

- [ ] "Services" > "Capabilities"
- [ ] "Case Studies" > "Our Impact"
- [ ] "About Us" > "Our Story" (unless the brand demands it)

## B10. Quick audit checklist

| Element | Check |
|---------|-------|
| Positioning | clearly states who we serve + what problem we solve? |
| Structure | Problem → Solution → Process → Proof → CTA? |
| Multiple audiences | speaks to economic buyers, champions, executives? |
| Trust signals | case studies / testimonials / metrics near claims? |
| Objection handling | pre-call questions answered (FAQ or copy)? |
| CTAs | clear, low-friction next step above AND below the fold? |
| SEO intent | matches one primary search intent? |
| Content integration | links to/from blog posts & case studies? |
| Clarity | a stranger on a plane gets what we do in 5 seconds? |

---

# Framework C — _(pending owner)_

_Reserved. Paste the third rubric here, then we score._

---

# Scoring tables — TO FILL DURING EXECUTION (do not fill yet)

## Run metadata
- URL:
- Date / tool versions:
- Throttling profile (mobile):
- RUM available? (Y/N — source):

## Framework A results
| Area | Criterion | Result | Evidence | Notes |
|------|-----------|--------|----------|-------|
| A1 | LCP ≤ 2.5s | ❔ | | |
| A1 | INP ≤ 200ms | ❔ | | |
| A1 | CLS ≤ 0.1 | ❔ | | |
| A1 | Lighthouse Perf ≥ 90 | ❔ | | |
| ... | _(expand to all A1–A6 rows)_ | | | |

**Framework A verdict:** _pending._

## Framework B results
| Section | Criterion | Result | Evidence | Notes |
|---------|-----------|--------|----------|-------|
| B1 | Positioning answers all 4 questions | ❔ | | |
| B2 | Structure = Problem→Solution→Process→Proof→CTA | ❔ | | |
| ... | _(expand to all B1–B10 rows)_ | | | |

**Framework B verdict:** _pending._

## Framework C results
_pending rubric._

## Competitor benchmark (same rubric)
| Competitor | URL | A-score | B-score | Notable gap vs us |
|------------|-----|---------|---------|-------------------|
| 1 | | | | |
| ... | | | | |

## Overall verdict
_pending — written only after all three frameworks are scored with evidence._
