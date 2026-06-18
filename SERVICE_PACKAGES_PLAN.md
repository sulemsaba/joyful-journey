# Service Packages — Complete Admin Plan

> **The complete plan for admin-managed service packages (pricing plans).**
> Covers: data model, APIs, admin form, smart limits, the 4-segment system,
> tick/included logic, truncation prevention, and the public display rules.

---

## Table of Contents

1. [The Problem We're Solving](#1-the-problem-were-solving)
2. [The 4-Segment System](#2-the-4-segment-system)
3. [Data Model](#3-data-model)
4. [Smart Field Limits](#4-smart-field-limits)
5. [Admin Form Design](#5-admin-form-design)
6. [APIs](#6-apis)
7. [Truncation Prevention (no "...")](#7-truncation-prevention-no-)
8. [Public Display Rules](#8-public-display-rules)
9. [Workflow & Status](#9-workflow--status)
10. [Validation Rules Summary](#10-validation-rules-summary)

---

## 1. The Problem We're Solving

The current pricing system has 3 flat plans (Foundation, Operating, Continuity) with no segment separation. But Exxonim serves **4 distinct customer segments**, each needing different packages at different price points:

- Local Entrepreneurs
- Foreign Investors
- Enterprises
- NGOs & Non-Profits

Without segment separation, the admin can't create segment-specific packages, and visitors see a confusing mix of plans that may not apply to them. This plan solves that.

**Goals:**
- Admin can create packages per segment (or shared across all segments)
- Smart limits prevent broken layouts (no truncated "..." text)
- The form clearly shows what's included (tick) vs not included (cross/blank)
- Visitors select their segment and see only relevant packages
- Everything is admin-managed — no code changes needed to add/edit packages

---

## 2. The 4-Segment System

### Segments (managed in Settings → Pricing → Segments)

```
1. Local Entrepreneurs    — Tanzanian individuals and small businesses
2. Foreign Investors      — International businesses entering Tanzania
3. Enterprises            — Larger established companies
4. NGOs & Non-Profits     — Non-governmental organizations and charities
```

Each segment has:
```
Segment ID
Name (e.g., "Local Entrepreneurs")
Slug (e.g., "local-entrepreneurs")
Description (optional — shown on the pricing page tab)
Icon (optional — shown on the tab)
Sort order
Is active
```

### How segments relate to packages

A package belongs to **one segment**. The public pricing page shows **tabs for each segment**; visitors click a tab and see only that segment's packages.

```
[ Local Entrepreneurs ] [ Foreign Investors ] [ Enterprises ] [ NGOs & Non-Profits ]
─────────────────────────────────────────────────────────────────────────────────────
 (shows 3 packages for the selected segment)
```

**Why one-segment-per-package (not multi-segment):** If a package could belong to multiple segments, the admin would have to manage price/feature differences per segment within one package — that's confusing. One package = one segment = one clean set of features and one price. If the same service applies to multiple segments, create separate packages per segment (they can have different prices and features).

---

## 3. Data Model

### Package (the main entity)

```
Package ID (auto)
Name (string, min 3, max 30 chars)           — e.g., "Starter", "Growth", "Premium"
Segment (link to Segment)                     — which segment this package belongs to
Badge (string, optional, max 20 chars)        — e.g., "Recommended", "Most popular"
Description (string, min 20, max 120 chars)   — one-line summary
Price (string, max 30 chars)                  — e.g., "TZS 450,000", "From TZS 300,000", "Custom"
Price period (string, optional, max 20 chars) — e.g., "/ service", "/ year", "one-time"
Features (array, min 3, max 8 items)          — the checklist items
Notes (string, optional, max 100 chars)       — small print below features
Recommended (boolean)                         — highlight this package
Sort order (integer)                          — within the segment
Status: draft / pending_review / published / archived
Is active (boolean)
Created by, created at
Updated by, updated at
```

### Feature (nested in package)

```
Label (string, min 5, max 80 chars)    — e.g., "Company registration filed on your behalf"
Included (boolean)                      — true = tick (✓), false = cross (✗) or blank
```

The `included` boolean is the "tick" — the admin checks a box per feature to show whether it's included in this package.

### Why these limits (see §4 for detail)

- **Name max 30**: prevents wrapping on mobile cards
- **Description max 120**: one clean line, no truncation
- **Features 3–8**: enough to show value, not so many the card becomes a wall
- **Feature label max 80**: fits one line on mobile, two on desktop

---

## 4. Smart Field Limits

These limits are **enforced by the backend** (API rejects if exceeded) AND **enforced by the admin form** (input maxLength + character counter).

| Field | Min | Max | Why |
|---|---|---|---|
| Package name | 3 chars | 30 chars | Prevents wrapping on mobile cards; long names break the card layout |
| Badge | — (optional) | 20 chars | Short labels only ("Recommended", "Popular") |
| Description | 20 chars | 120 chars | One clean line; prevents truncation ("...") |
| Price | 1 char | 30 chars | Allows "TZS 450,000" or "Custom" or "From TZS 300,000" |
| Price period | — (optional) | 20 chars | "/ service", "/ year", "one-time" |
| Features (count) | 3 items | 8 items | Min 3 to show value; max 8 to prevent card-wall |
| Feature label | 5 chars | 80 chars | Fits one line mobile, two desktop; no truncation |
| Notes | — (optional) | 100 chars | Small print; one line |
| Segments (total) | 1 | 12 | Admin can add custom segments beyond the default 4 |

### Character counters in the form

Every text field shows a live counter: `12 / 30`. The counter turns amber at 80% of max, red at 100%. The form **prevents typing beyond max** (hard limit, not just validation).

### Why min 3 features?

A package with 1–2 features looks empty and unprofessional. 3 features minimum ensures every package looks substantial. If a package genuinely has fewer than 3 features, the admin should reconsider whether it's a real package.

### Why max 8 features?

More than 8 features makes the card a wall of text, especially on mobile. The visitor can't scan it. 8 features × 80 chars = a card that fits comfortably on a 390px mobile screen without scrolling within the card.

---

## 5. Admin Form Design

### The package editor form (`/admin/pricing/plans/:id/edit`)

```
┌──────────────────────────────────────────────────────────────────────────┐
│  ← Back to Packages              Edit Package: Starter          [Save]   │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  Segment *                                                               │
│  ┌──────────────────────────────────────┐                                │
│  │  Local Entrepreneurs              ▾  │                                │
│  └──────────────────────────────────────┘                                │
│  (dropdown — selects which segment this package belongs to)              │
│                                                                          │
│  Package name *                                                          │
│  ┌──────────────────────────────────────┐   7 / 30                      │
│  │  Starter                              │                              │
│  └──────────────────────────────────────┘                                │
│                                                                          │
│  Badge (optional)                                                        │
│  ┌──────────────────────────────────────┐   0 / 20                      │
│  │  e.g., "Recommended"                  │                              │
│  └──────────────────────────────────────┘                                │
│                                                                          │
│  Description *                                                           │
│  ┌──────────────────────────────────────┐   45 / 120                    │
│  │  Registration and first-step          │                              │
│  │  compliance for new businesses.       │                              │
│  └──────────────────────────────────────┘                                │
│  (one-line summary; shows on the card below the name)                    │
│                                                                          │
│  Price *                                                                 │
│  ┌──────────────────────┐  Period (optional)                            │
│  │  TZS 450,000         │  ┌──────────────────┐  0 / 20                │
│  └──────────────────────┘  │  / service       │                          │
│  (string — allows "Custom", "From TZS 300,000", etc.)  └──────────────────┘│
│                                                                          │
│  Recommended?                                                            │
│  ☐  Highlight this package as "Recommended" on the pricing page          │
│  (only one package per segment can be recommended — auto-unchecks others)│
│                                                                          │
│  ── Features (3–8) ────────────────────────────────────────────────      │
│                                                                          │
│  ☑  ┌────────────────────────────────────────────────┐  45 / 80  [×]   │
│     │  Company registration filed on your behalf       │                │
│     └────────────────────────────────────────────────┘                  │
│     ✓ Included (ticked on the card)                                      │
│                                                                          │
│  ☑  ┌────────────────────────────────────────────────┐  18 / 80  [×]   │
│     │  TIN application included                        │                │
│     └────────────────────────────────────────────────┘                  │
│     ✓ Included                                                           │
│                                                                          │
│  ☐  ┌────────────────────────────────────────────────┐  22 / 80  [×]   │
│     │  Annual return filing                            │                │
│     └────────────────────────────────────────────────┘                  │
│     ✗ Not included (crossed out on the card)                             │
│                                                                          │
│  ☐  ┌────────────────────────────────────────────────┐  20 / 80  [×]   │
│     │  Trademark registration                          │                │
│     └────────────────────────────────────────────────┘                  │
│     ✗ Not included                                                       │
│                                                                          │
│  [+ Add feature]   (4 / 8 features)                                      │
│                                                                          │
│  ── Notes (optional) ──────────────────────────────────────────────      │
│  ┌──────────────────────────────────────┐   0 / 100                      │
│  │  Small print below features           │                              │
│  └──────────────────────────────────────┘                                │
│                                                                          │
│  ── Display ───────────────────────────────────────────────────────      │
│  Sort order: [ 1 ]   (within this segment)                               │
│  Status:     [ Draft ▾ ]  (draft / pending_review / published / archived)│
│                                                                          │
│                                                    [Cancel]  [Save]      │
└──────────────────────────────────────────────────────────────────────────┘
```

### The "tick" logic (included vs not included)

Each feature row has:
- **A checkbox** on the left (☑ included / ☐ not included)
- **A text input** for the label
- **A delete button** [×]
- **A character counter** (X / 80)
- **A live preview indicator**: "✓ Included" or "✗ Not included"

When `included = true`, the feature shows on the public card with a **green tick (✓)**.
When `included = false`, the feature shows with a **muted cross (✗)** or is greyed out.

**Why show not-included features?** This is standard pricing-page design (see most SaaS pricing pages). Showing what's NOT included helps visitors compare packages and choose the right tier. The admin controls this per-feature via the checkbox.

### Add/remove features

- **[+ Add feature]** button adds a new row (max 8; button disables at 8)
- **[×]** removes a feature (min 3; button disables at 3)
- Features can be **drag-reordered** (drag handle on the left of each row)

### Recommended package logic

- Only **one package per segment** can be `recommended = true`
- When admin checks "Recommended" on a package, the system **auto-unchecks** any other package in the same segment that was previously recommended
- This prevents two "Recommended" badges in the same segment (confusing)

### Segment selector

- Dropdown of all active segments (from Settings → Pricing → Segments)
- Required field — every package must belong to a segment
- If the admin needs a package that applies to all segments, they create **4 copies** (one per segment) — this is intentional, so each can have its own price/features

---

## 6. APIs

### Public APIs (no auth)

```
GET /api/v1/pricing
  → Returns all published packages, grouped by segment
  → Response: { segments: [{ id, name, slug, icon, packages: [Package] }] }

GET /api/v1/pricing?segment=local-entrepreneurs
  → Returns packages for one segment only
  → Response: { packages: [Package] }

GET /api/v1/pricing/segments
  → Returns all active segments
  → Response: { segments: [{ id, name, slug, description, icon, sort_order }] }
```

### Admin APIs (auth required)

```
GET    /api/v1/admin/pricing/segments
  → List all segments (including inactive)

POST   /api/v1/admin/pricing/segments
  → Create a segment
  → Body: { name, slug, description, icon, sort_order, is_active }
  → Validation: name 3–40 chars, slug unique

GET    /api/v1/admin/pricing/segments/:id
  → Get one segment

PUT    /api/v1/admin/pricing/segments/:id
  → Update a segment
  → Same validation as POST

DELETE /api/v1/admin/pricing/segments/:id
  → Delete a segment (soft delete)
  → Blocks if packages exist in this segment (must reassign or delete first)

GET    /api/v1/admin/pricing/plans
  → List all packages (all segments, all statuses)
  → Query params: segment, status, search, page, limit

POST   /api/v1/admin/pricing/plans
  → Create a package
  → Body: { name, segment_id, badge, description, price, price_period,
            features: [{ label, included }], notes, recommended, sort_order, status }
  → Validation: see §4 limits
  → If recommended=true, auto-unsets other recommended in same segment

GET    /api/v1/admin/pricing/plans/:id
  → Get one package (full detail)

PUT    /api/v1/admin/pricing/plans/:id
  → Update a package
  → Same validation as POST

DELETE /api/v1/admin/pricing/plans/:id
  → Delete a package (soft delete)

PUT    /api/v1/admin/pricing/plans/:id/reorder
  → Reorder packages within a segment
  → Body: { new_sort_order: 2 }

POST   /api/v1/admin/pricing/plans/bulk
  → Bulk actions: publish, archive, delete, change segment
  → Body: { ids: [1,2,3], action: "publish" }
```

### Validation error response (example)

```json
{
  "error": "validation_failed",
  "details": [
    { "field": "name", "message": "Name must be between 3 and 30 characters" },
    { "field": "features", "message": "Features must have between 3 and 8 items" },
    { "field": "features[2].label", "message": "Feature label must be at most 80 characters" }
  ]
}
```

The admin form displays these errors inline next to the relevant fields.

---

## 7. Truncation Prevention (no "...")

### The rule

**No text on the public pricing card should ever be truncated with "...".** If text is too long, it wraps to a new line — never gets cut off.

### How this is achieved

1. **Backend enforces max lengths** (see §4). The API rejects any package with text exceeding limits. This is the primary defense.

2. **Admin form has maxLength on every input.** The admin literally cannot type beyond the limit. Character counters show how close they are.

3. **CSS uses `line-clamp: none`** (or no line-clamp at all) on the public card. Text wraps naturally:

```css
.package-name { /* no line-clamp — wraps if needed */ }
.package-description { /* no line-clamp — wraps if needed */ }
.feature-label { /* no line-clamp — wraps if needed */ }
```

4. **Limits are calibrated to fit** — a 30-char name fits one line on mobile; a 120-char description fits 2 lines on mobile; an 80-char feature fits one line on desktop, two on mobile. So wrapping is rare, and when it happens, it's clean (not truncated).

5. **Card height is `auto`** (not fixed). Cards grow to fit their content. If one package has 8 features and another has 3, the cards in that segment's row have different heights — that's fine (use `align-items: stretch` or `align-items: start` on the grid so cards don't force-equal-height with empty space).

### What NOT to do

- ❌ `line-clamp-2` on the description (truncates with "...")
- ❌ `truncate` on the name (single-line truncation)
- ❌ Fixed-height cards with `overflow: hidden`
- ❌ `text-overflow: ellipsis` anywhere on pricing cards

---

## 8. Public Display Rules

### The pricing page (`/services` or a dedicated `/pricing` section)

**Top: Segment tabs**
```
[ Local Entrepreneurs ] [ Foreign Investors ] [ Enterprises ] [ NGOs & Non-Profits ]
```
- Default tab: the first active segment
- Clicking a tab shows that segment's packages (smooth transition)
- Tabs are sticky to the top of the pricing section on scroll
- On mobile: tabs become a horizontal scroll rail

**Below tabs: Package cards (for the selected segment)**
```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│  Starter     │  │  Growth     │  │  Premium    │
│  [badge]     │  │ Recommended │  │  [badge]     │
│              │  │              │  │              │
│  Description │  │  Description │  │  Description │
│  text here   │  │  text here   │  │  text here   │
│              │  │              │  │              │
│  TZS 450,000 │  │  TZS 850,000 │  │  Custom      │
│  / service   │  │  / service   │  │              │
│              │  │              │  │              │
│  ✓ Feature 1 │  │  ✓ Feature 1 │  │  ✓ Feature 1 │
│  ✓ Feature 2 │  │  ✓ Feature 2 │  │  ✓ Feature 2 │
│  ✗ Feature 3 │  │  ✓ Feature 3 │  │  ✓ Feature 3 │
│  ✗ Feature 4 │  │  ✗ Feature 4 │  │  ✓ Feature 4 │
│              │  │              │  │              │
│  Notes here  │  │  Notes here  │  │  Notes here  │
│              │  │              │  │              │
│ [Get Started]│  │ [Get Started]│  │ [Get Started]│
└─────────────┘  └─────────────┘  └─────────────┘
```

### Card display rules

- **Name**: bold, one line (wraps if needed, no truncation)
- **Badge**: small pill above or next to the name, accent color
- **Description**: muted text, 2 lines max (wraps, no truncation)
- **Price**: large, bold; period in smaller muted text
- **Features**: list with ✓ (green, included) or ✗ (muted, not included)
- **Notes**: small muted text below features
- **CTA button**: "Get Started" → links to `/contact?plan={package-id}`
- **Recommended**: card gets a subtle accent border/glow + the "Recommended" badge

### Mobile display

- Cards stack vertically (one column)
- All the same rules apply — just stacked
- The segment tabs become a horizontal scroll rail at the top

### When a segment has no published packages

- Show a friendly message: "Packages for {segment} coming soon. [Contact us] for a custom quote."
- Don't show an empty grid (looks broken)

### When there are no segments at all

- Show the fallback packages (the current 3: Foundation, Operating, Continuity) without tabs
- This is the degradation mode — the site never breaks

---

## 9. Workflow & Status

### Package status flow

```
draft → pending_review → published → archived
                ↓              ↓
            rejected       (unpublish → back to draft)
```

- **Draft**: admin is editing; not shown publicly
- **Pending review**: submitted for approval (if workflow enabled); not shown publicly
- **Published**: shown on the public pricing page
- **Archived**: hidden from public; kept for reference

### Review queue

Packages with `status = pending_review` appear in the **Review Queue** (sidebar → Review Queue). A reviewer can approve (→ published) or reject (→ draft with reason).

### Bulk actions

- Publish multiple drafts at once
- Archive multiple packages
- Move multiple packages to a different segment (reassign)
- Delete multiple packages (soft delete)

---

## 10. Validation Rules Summary

### On create/update package

| Field | Rule | Error message |
|---|---|---|
| name | 3–30 chars, required | "Name must be between 3 and 30 characters" |
| segment_id | required, must exist | "Segment is required" |
| badge | max 20 chars, optional | "Badge must be at most 20 characters" |
| description | 20–120 chars, required | "Description must be between 20 and 120 characters" |
| price | 1–30 chars, required | "Price is required" |
| price_period | max 20 chars, optional | "Price period must be at most 20 characters" |
| features | 3–8 items, required | "Features must have between 3 and 8 items" |
| features[].label | 5–80 chars, required | "Feature label must be between 5 and 80 characters" |
| notes | max 100 chars, optional | "Notes must be at most 100 characters" |
| recommended | boolean | — |
| sort_order | integer, ≥ 0 | — |
| status | enum (draft/pending_review/published/archived) | "Invalid status" |

### On create/update segment

| Field | Rule | Error message |
|---|---|---|
| name | 3–40 chars, required | "Name must be between 3 and 40 characters" |
| slug | 3–50 chars, required, unique | "Slug must be unique and 3–50 characters" |
| description | max 120 chars, optional | "Description must be at most 120 characters" |
| sort_order | integer, ≥ 0 | — |
| is_active | boolean | — |

### On delete segment

- **Block** if packages exist in the segment: "Cannot delete segment with existing packages. Reassign or delete the packages first."
- **Soft delete** the segment (kept for audit)

### On recommended

- If `recommended = true`, auto-unset all other packages in the same segment
- This is a **server-side trigger**, not just client-side — ensures consistency even if two admins edit simultaneously

---

## Implementation Notes

### Database tables needed

```
pricing_segments (
  id, name, slug, description, icon, sort_order, is_active,
  created_at, updated_at, deleted_at
)

pricing_packages (
  id, name, segment_id (FK), badge, description, price, price_period,
  notes, recommended, sort_order, status, is_active,
  created_by, created_at, updated_by, updated_at, deleted_at
)

pricing_package_features (
  id, package_id (FK), label, included, sort_order,
  created_at, updated_at
)
```

### Why features are a separate table

Features are a separate table (not a JSON column on packages) so the admin can:
- Reorder features independently (sort_order)
- Add/remove features without rewriting the whole package
- Query features individually if needed (e.g., "which packages include trademark registration?")

### Fallback behavior

The public site's `usePricingPlans` hook already has a fallback (the 3 flat plans). When the new segment-based system is live, the fallback should be updated to include segment data. Until then, the fallback degrades gracefully to the flat 3-plan display.

### Migration path

1. **Phase 1**: Build the admin (segments + packages CRUD) and APIs
2. **Phase 2**: Update the public `ServicePlansSection` component to show segment tabs
3. **Phase 3**: Migrate the existing 3 fallback plans into the new segment-based structure (assign them to a default segment, or create a "General" segment)
4. **Phase 4**: Admin populates real packages per segment

---

*End of plan. This covers the complete admin system for service packages — data model, APIs, form, limits, tick logic, truncation prevention, and the 4-segment system.*
