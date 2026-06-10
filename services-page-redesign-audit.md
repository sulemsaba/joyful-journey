# Exxonim Consult — Services Page Redesign Audit & Decision Document

> **Status**: PRE-IMPLEMENTATION — Merged research, audit, and decisions. No code changes yet.
> **Date**: June 5, 2025
> **Stakeholders**: Design & Development

---

## 1. Current State Audit

### Current Page Architecture (What Exists Today)

| # | Section | Component File | What It Does | Problems |
|---|---------|---------------|-------------|----------|
| 1 | Breadcrumb | `Breadcrumb.tsx` | Home > Services nav | Fine — keep as-is |
| 2 | Services Overview Hero | `ServicesOverviewSection.tsx` | Eyebrow + title + description + CTAs + accent panel with signals + nav group cards + flow steps + promises | **Laundry list hero** — dumps everything at once. Process-focused headline. No empathy. Weak CTAs. Too many sub-sections crammed in. |
| 3 | Service Catalog (Engine) | `EngineSection.tsx` | 3 group cards (Business Setup, Compliance, Work Permits) with service lists | **Flat service cards** — no outcomes, no tags, no visual hierarchy. "Inquire" link hidden on hover. No search/filter. |
| 4 | Exxonim Apart | `ExxonimApartSection.tsx` | 4 differentiator cards (Tracking, Reminders, Liaison, Document Review) | Good concept but **lacks outcome specificity**. No visual proof. Static links. |
| 5 | Compliance Calendar | `ComplianceCalendarSection.tsx` | Quarterly timeline + sticky CTA card | **Best section** — well designed. Minor improvements only. |
| 6 | Service Packages | `ServicePlansSection.tsx` | 3 plan tiers + testimonials | Testimonials buried AFTER packages. Generic CTA "Contact Exxonim". |

### What's Missing (Based on Research)

| Missing Element | Why It Matters | Research Source |
|----------------|---------------|-----------------|
| Empathy-driven introduction | Users decide in 5-8s if they're in the right place — show you understand their pain | NNG + Your research |
| Quick search/filter for services | 27% of users prefer search over browsing | Baymard Institute |
| Service outcome tags | Tag-based browsing increases engagement 18% | Awwwards analysis |
| FAQ section (collapsible) | Reduces objections, answers "Can I trust them?" | Your research + NNG: 30-40% fewer support requests |
| Sticky mobile CTA | 53%+ traffic is mobile, sticky CTAs boost conversions 13-28% | Unbounce + Your mobile-first point |
| Visual proof cards | Your reference image shows numbered step cards with icons — much more scannable | Your uploaded reference |
| Action-specific CTAs | "Ask a Question — Free" vs "Contact Exxonim" = 202% better conversion | HubSpot + Your suggestion |

---

## 2. Merged Research Findings

### Your Research (Knapsack Creative + Pharma Consultancy Example)

**Key Principles You Identified:**
1. Service pages are **mini-homepages** — landing pages designed to convert
2. Answer 3 questions in order: "Am I in the right place?" → "Do they understand my problem?" → "Can I trust them?"
3. **7 Must-Have Elements**: Benefit-driven headline, Value-driven intro, Defined outcomes, 3-4 step process, Social proof, FAQ, Strong CTA
4. **Common Mistakes**: Laundry lists, jargon overload, no outcomes, weak CTAs, lack of proof, one-size-fits-all
5. **Case study result**: Bounce rate dropped from 82% → 45%, inquiries doubled after fixing
6. **Pharma example**: Search + category filter + tag-based service cards = excellent UX

**Your Pharma Example Key Patterns:**
- 🔍 **Quick search** at the top — "Find your service in seconds"
- 🏷️ **Category filter tabs** — Consultancy | Audits & Gap Assessments | Training courses
- 📋 **Service cards with tags** — Each service has category tags (GDP, Manufacturing, GMP)
- 📄 **"View service" CTAs** on each card — not hidden on hover
- 🏢 **Service categories section** at the bottom for broader browsing

### My Research (Awwwards + NNG + ConversionXL)

**Additional Findings:**
1. **F-pattern reading** — Users scan in F-shape; put key info at top-left
2. **Progressive disclosure** — Don't show everything at once; use accordion/collapsible for FAQ
3. **Specific social proof** — "Saved $500k" beats "great service" (specificity = credibility)
4. **Mobile-first** — 53% abandon sites taking >3s on mobile; min 44px touch targets
5. **Visual hierarchy** — Headlines → outcomes bolded → CTAs distinct → details last
6. **Scroll depth** — Average user scrolls 50-60% of page; put CTA before the fold and mid-page

---

## 3. Visual Reference Analysis

### Your Uploaded Image: "What to Look for in Compliance Consulting Services?"

**Pattern**: 4 numbered horizontal cards with:
- Colored card backgrounds (brand color)
- Numbered steps (01, 02, 03, 04)
- Simple icons for each criterion
- White text on colored background
- Clean, scannable horizontal flow
- Each card asks ONE question

**What We Can Adapt for Exxonim:**
This pattern is perfect for our "How It Works" (4-step process) section AND our "What Sets Exxonim Apart" (4 differentiators) section. Instead of flat text, we use:
- Numbered accent-colored cards
- Icons + short question/statement
- Horizontal scroll on mobile, grid on desktop
- Much more visual and engaging than current text-heavy approach

---

## 4. Decisions & Rationale

### Decision 1: New Page Architecture

**Current order**: Breadcrumb → Hero (bloated) → Engine → Apart → Calendar → Packages

**New order**:

| # | Section | Purpose | Mobile Priority |
|---|---------|---------|-----------------|
| 1 | Breadcrumb | Wayfinding | Keep as-is |
| 2 | **Benefit-Driven Hero** | "Am I in the right place?" + CTA | HIGH — above the fold |
| 3 | **Quick Find Services** | Search + filter + tagged service cards | HIGH — key interaction |
| 4 | **How It Works** (Visual Steps) | "Do they understand my problem?" — 4-step process with icons/numbers | MEDIUM — builds trust |
| 5 | **What Sets Us Apart** | "Can I trust them?" — 4 differentiators with outcomes | MEDIUM — proof |
| 6 | Compliance Calendar | Deadlines tracker (mostly keep current) | LOW — secondary info |
| 7 | **Social Proof FIRST** | Testimonials moved UP before packages | HIGH — reduces risk |
| 8 | Service Packages | Plans with stronger CTAs | MEDIUM — conversion |
| 9 | **Services FAQ** (Collapsible) | Objection handling | MEDIUM — addresses doubts |
| 10 | **Final CTA Section** | Strong closing action | HIGH — last push |
| 11 | **Sticky Mobile CTA** | Floating "Ask a Question" bar on mobile | HIGH — always accessible |

### Decision 2: CTA Language

| Current CTA | Problem | New CTA | Rationale |
|------------|---------|---------|-----------|
| "See package plans" | Passive, vague | "Explore Our Services" | Action-specific, tells them what they'll get |
| "Contact Exxonim" | Corporate, cold | **"Ask a Question — Free"** | Your suggestion — more approachable, removes commitment fear |
| "Get compliance support" | Okay but generic | **"Get Your Compliance Check"** | More specific, implies value |
| "Learn More" | Worst CTA ever | Never use | Your research: "Learn More" doesn't inspire action |

**Primary CTA everywhere**: **"Ask a Question — Free"** (or "Ask Free Question")
- Removes friction (it's free!)
- Feels approachable (question, not commitment)
- Specific (they know exactly what happens)
- Works for both mobile and desktop

### Decision 3: FAQ Strategy

**Problem**: We already have a dedicated `/faq/` page. Duplicating all FAQs on the services page is bad for:
- SEO (duplicate content)
- Maintenance (two places to update)
- User confusion (which FAQ to read?)

**Decision**: **Services-specific mini FAQ only**

| Approach | Details |
|----------|---------|
| **What goes on Services page** | 4-5 service-specific questions that address buying objections: timelines, cost approach, entity types, what happens after inquiry |
| **Format** | Collapsible accordion (click to expand, NOT expanded by default) — your requirement |
| **What stays on FAQ page** | General company questions (6 items already there) |
| **Cross-link** | Services FAQ ends with: "More questions? → Visit our full FAQ" linking to `/faq/` |
| **No overlap** | Services FAQ questions are DIFFERENT from the general FAQ page questions |
| **SEO** | Only the FAQ page gets FAQ schema markup; services FAQ is for UX only |

**Proposed Services FAQ Questions** (all collapsible/accordion):

1. **"How long does company registration take?"** → Timeline expectations + "we track and follow up"
2. **"What does it cost to work with Exxonim?"** → No hidden fees, structured packages, free initial question
3. **"What entity type is right for my business?"** → We guide you through the decision
4. **"What happens after I ask a question?"** → 4-step process explained briefly
5. **"Do you handle licensing renewals?"** → Yes, with proactive reminders + link to compliance calendar

### Decision 4: Mobile-First Design Principles

Since **most users will be mobile**, every design decision must be validated on mobile FIRST:

| Principle | Implementation |
|-----------|---------------|
| **Touch targets ≥ 44px** | All buttons, links, accordion triggers |
| **Single column on mobile** | Hero stacks vertically; cards stack; no side-by-side |
| **Horizontal scroll for visual steps** | Your reference image pattern — 4 numbered cards scroll horizontally on mobile |
| **Sticky CTA bar at bottom** | Fixed bottom bar on mobile with "Ask a Question — Free" button |
| **Collapsible FAQ** | Accordion saves vertical space — only expanded items take room |
| **Search bar prominent** | Full-width search input at top of service catalog on mobile |
| **Service cards stack vertically** | One card per row on mobile, 2-3 columns on desktop |
| **No hidden hover interactions** | "Inquire" links visible always, not just on hover (hover doesn't exist on touch) |
| **Fast loading** | No heavy images; use CSS patterns and icons instead |
| **Swipe-friendly** | Horizontal card scroll should work with touch swipe |

### Decision 5: Visual Reference Application

**Your uploaded image shows**: 4 numbered colored cards in horizontal flow with icons and questions.

**Where we apply this pattern**:

1. **"How It Works" Section** — 4 numbered step cards
   - 01: Intake → "We confirm your entity type and filing sequence"
   - 02: Preparation → "Documents reviewed, submission path mapped"
   - 03: Submission → "Application filed with the relevant authority"
   - 04: Follow-through → "We track, follow up, and confirm the outcome"
   - Horizontal scroll on mobile, 4-column grid on desktop
   - Each card: accent-colored with icon + number + title + detail

2. **"What Sets Us Apart" Section** — 4 differentiator cards
   - Same visual pattern but with outcome-focused copy
   - Each card has icon + short statement + brief explanation
   - Accent background, white text (matching your reference image style)

### Decision 6: Search & Filter for Services

**Your pharma example pattern**: Quick search + category filter + tagged service cards

**Our implementation**:

```
┌─────────────────────────────────────────────┐
│  🔍 Search services...                       │
│                                               │
│  [All] [Business Setup] [Compliance] [Permits]│
│                                               │
│  ┌─────────────────────────────────────────┐ │
│  │ Company Registration    [Setup] [BRELA] │ │
│  │ Incorporation and first-step authority  │ │
│  │ submissions.                     [Ask] │ │
│  └─────────────────────────────────────────┘ │
│  ┌─────────────────────────────────────────┐ │
│  │ TIN Application         [Setup] [TRA]   │ │
│  │ Tax Identification Number registration  │ │
│  │ and account setup.               [Ask] │ │
│  └─────────────────────────────────────────┘ │
│  ... more cards ...                          │
└─────────────────────────────────────────────┘
```

- **Search**: Filters service cards by label/detail text
- **Category tabs**: All | Business Setup | Compliance Support | Work Permits
- **Tags on each card**: Authority tags (BRELA, TRA, TIC, OSHA) + Category tags
- **CTA on each card**: "Ask a Question" link (always visible, not hidden on hover)
- **Mobile**: Full-width search, horizontally scrollable category tabs

---

## 5. Content Changes Required

### Hero Section — Copy Rewrite

| Element | Current | New (Outcome-Focused) |
|---------|---------|----------------------|
| Eyebrow | "Our services" | "Business consulting — Tanzania" |
| Title | "Registration, licensing, and compliance support — structured and followed through" | **"Business Setup & Compliance — Handled and Tracked for You"** |
| Description | "Exxonim provides practical guidance across the main operational areas where organisations need reliable follow-through" | **"Navigating Tanzania's regulatory landscape shouldn't feel like guesswork. Missed deadlines, unclear processes, and avoidable delays cost businesses time and money. Exxonim handles the complexity so you can focus on running your business."** |
| Primary CTA | "See package plans" | **"Ask a Question — Free"** → links to `/contact/` |
| Secondary CTA | "Contact Exxonim" | **"Explore Our Services"** → scrolls to service catalog |

### Service Cards — Add Outcomes & Tags

| Service | Current Detail | New Outcome + Tags |
|---------|---------------|-------------------|
| Company Registration | "Incorporation and first-step authority submissions" | "Trade legally within 5-10 business days" `Setup` `BRELA` |
| Business Name Registration | "Sole proprietorship and trading name registration through BRELA" | "Register your trading name with BRELA clearance" `Setup` `BRELA` |
| TIN Application | "Tax Identification Number registration and account setup" | "Get your tax ID sorted — required for all registered entities" `Setup` `TRA` |
| Annual Returns | "BRELA annual return filing and beneficial ownership updates" | "Stay compliant — avoid penalties and late fees" `Compliance` `BRELA` |
| Work Permit Applications | "Residence and work permit processing" | "Legally work and reside in Tanzania" `Permits` `Immigration` |

### Differentiators — Add Outcomes

| Differentiator | Current | New (With Outcome) |
|---------------|---------|-------------------|
| Live Consultation Tracking | "Track every consultation from intake to resolution" | **"Always know where your case stands"** — Track every consultation with a unique ID. No login required. |
| Ongoing Compliance Reminders | "We send timely reminders ahead of every compliance deadline" | **"Never miss a deadline again"** — Advance reminders for BRELA, TRA, NSSF, WCF, OSHA. No time limit. |
| Authority Liaison | "We communicate directly with regulators on your behalf" | **"No more office visits or queue chasing"** — We deal with BRELA, TRA, NSSF so you don't have to. |
| Document Readiness Review | "Before any filing, we review your documents for completeness" | **"Get it right the first time"** — Document checks prevent rejections, delays, and costly resubmissions. |

---

## 6. Implementation Todo List

> **NOTE**: These are the implementation tasks to be done AFTER this document is approved. Do NOT start coding until the user approves.

### Phase 1: Core Components (Frontend First)

| Task ID | Task | Depends On | Estimated Complexity |
|---------|------|-----------|---------------------|
| 1a | Rewrite `ServicesOverviewSection.tsx` — benefit-driven hero with empathy, strong CTAs, signal badges | — | Medium |
| 1b | Create `ServiceSearchSection.tsx` — searchable/filterable service catalog with tags | — | High |
| 1c | Create `HowItWorksSection.tsx` — 4-step visual process (numbered cards pattern from reference image) | — | Medium |
| 1d | Rewrite `ExxonimApartSection.tsx` — outcome-focused differentiators in visual card format | — | Medium |
| 1e | Create `ServicesFaqSection.tsx` — collapsible accordion FAQ (5 service-specific questions) | — | Medium |
| 1f | Create `StickyMobileCta.tsx` — fixed bottom "Ask a Question — Free" bar on mobile | — | Low |
| 1g | Create `FinalCtaSection.tsx` — strong closing CTA section at page bottom | — | Low |

### Phase 2: Page Composition

| Task ID | Task | Depends On | Estimated Complexity |
|---------|------|-----------|---------------------|
| 2a | Update `ServicesPage.tsx` — compose all new sections in correct order | 1a-1g | Low |
| 2b | Update `ServicePlansSection.tsx` — move testimonials before packages, update CTAs | — | Low |
| 2c | Minor improvements to `ComplianceCalendarSection.tsx` — update CTAs | — | Low |

### Phase 3: Content Updates

| Task ID | Task | Depends On | Estimated Complexity |
|---------|------|-----------|---------------------|
| 3a | Update fallback content in `fallbackPublicContent.ts` — benefit-driven copy, outcomes, tags | 1b | Medium |
| 3b | Add services FAQ data to fallback content | 1e | Low |

### Phase 4: Verification

| Task ID | Task | Depends On | Estimated Complexity |
|---------|------|-----------|---------------------|
| 4a | Lint check | 2a, 2b, 2c | Low |
| 4b | Agent browser verification — mobile + desktop | 4a | Medium |
| 4c | Cross-check FAQ overlap with `/faq/` page | 1e | Low |

---

## 7. Open Questions for User Decision

| # | Question | Options | Recommendation |
|---|----------|---------|---------------|
| 1 | Should the visual step cards (How It Works) use accent-colored backgrounds (like reference image) or light surface backgrounds? | A) Accent-colored (bold, matches reference) / B) Light surface (softer, matches current site feel) | **A) Accent-colored** — more visual impact, matches research |
| 2 | Should we keep the "Service Nav Group" cards (Business Setup / Compliance / Work Permits) in the hero, or remove them since the new search section handles navigation? | A) Keep in hero / B) Remove (search replaces them) / C) Move them to between hero and search | **B) Remove** — the search + filter section makes them redundant |
| 3 | For the sticky mobile CTA, should it be a full bar at the bottom or a floating button? | A) Full bar with text "Ask a Question — Free" / B) Floating circular button with chat icon | **A) Full bar** — more descriptive, higher conversion |
| 4 | Should the services FAQ include pricing information or keep it high-level? | A) Include indicative pricing / B) "Contact for pricing" approach / C) Reference the packages section | **C) Reference packages** — "See our service packages for structured support levels" |

---

## 8. What We're NOT Changing

| Component | Why Keep As-Is |
|-----------|---------------|
| Breadcrumb | Works fine, consistent across all pages |
| Navigation | Separate component, not part of services page |
| Footer | Separate component |
| Compliance Calendar core structure | Well-designed — only CTA text updates |
| Plan cards structure | Good — only CTA text and testimonial position updates |
| FAQ page (`/faq/`) | Separate page, stays as-is. Services FAQ is different content. |

---

*Document ends. Awaiting user review and approval before any implementation begins.*
