# Admin Frontend Specification — Testimonial Management

> **Audience:** Admin frontend engineers building the CMS for Exxonim Consult  
> **Scope:** Testimonial CRUD with ordering  
> **Status:** Admin pages not yet built

---

## 1. Overview

### What the Admin Needs to Manage

| Area | Type | Description |
|------|------|-------------|
| **Testimonials** | Collection CRUD | Client quotes displayed in the marquee carousel |

### Where Testimonials Appear Publicly

The testimonials are rendered inside `ServicePlansSection` as an endless-looping marquee carousel. This component appears on:

1. **Services page** — `/services/` (as part of the pricing + testimonials section)
2. **Home page** — `/` (same component, different variant)

### Existing Frontend Components (Public — Do NOT Modify)

| Component | File | Purpose |
|-----------|------|---------|
| `TestimonialCard` | `src/exxonim/components/ServicePlansSection.tsx` | Single testimonial card with star rating, quote, initials avatar |
| `TestimonialMarquee` | Same file | Endless-looping carousel with auto-slide, arrows, drag |
| `ServicePlansSection` | Same file | Container component using `useTestimonials` hook |
| `useTestimonials` | `src/exxonim/hooks/useTestimonials.ts` | React Query hook for fetching testimonials |
| `testimonialService` | `src/exxonim/services/testimonialService.ts` | Cached fetching of testimonials |
| `mapTestimonial` | `src/exxonim/utils/contentMappers.ts` | Maps `ApiTestimonial` → domain `Testimonial` |

### Status Workflow (Same as Blog Posts)

```
draft ──→ pending_review ──→ published
              │                    │
              └──→ rejected     archived
```

---

## 2. Testimonials List View

A table-based listing of all testimonials:

| Column | Type | Notes |
|--------|------|-------|
| Name | Text + link | Click to edit |
| Role | Text | Organization/role, truncated if long |
| Quote | Text | First 80 chars + "…" if longer |
| Rating | Stars | Always ★★★★★ (5) — not editable |
| Order | Number | `sort_order` — lower = shown first |
| Status | Badge | `Draft`, `Pending Review`, `Published`, `Rejected`, `Archived` |
| Active | Badge | `Yes` (green) / `No` (gray) |
| Actions | Icon buttons | Edit, Submit/Approve/Reject, Publish/Unpublish, Archive, Delete |

### Filters & Search

| Filter | Type | Options |
|--------|------|---------|
| Status | Dropdown | All, Draft, Pending Review, Published, Rejected, Archived |
| Active | Dropdown | All, Active, Inactive |
| Search | Text input | Searches name, role, quote text |

### Status Actions

| Current Status | Available Actions |
|---------------|-------------------|
| Draft | Submit for Review, Edit, Delete |
| Pending Review | Approve, Reject (with reason) |
| Published | Unpublish (→ Draft), Archive |
| Rejected | Edit and resubmit, Archive |
| Archived | Restore (→ Draft) |

### Drag-and-Drop Reorder

Testimonials can be reordered by dragging rows. The `sort_order` determines display order in the marquee (lower = first).

### Empty State

```
┌────────────────────────────────────────────────────────────┐
│  ○ No testimonials yet                                      │
│                                                             │
│  Add client testimonials to build trust with visitors       │
│  on the services and home pages.                            │
│                                                             │
│  [+ Create Your First Testimonial]                          │
└────────────────────────────────────────────────────────────┘
```

---

## 3. Create / Edit Testimonial Form

### Form Fields

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `name` | Text input | **Yes** | **Max 50 characters.** Backend MUST reject if exceeded. |
| `role` | Text input | **Yes** | **Max 80 characters.** e.g. "Operations Team, Utec Tanzania" |
| `quote` | Textarea | **Yes** | **Max 250 characters.** Backend MUST reject if exceeded. Admin must shorten if too long — NO UI truncation. |
| `eyebrow` | Text input | No | **Max 30 characters.** Short label above quote, e.g. "Business setup" |
| `headline` | Text input | No | Currently not rendered in marquee card. Kept for future use. |
| `support` | Textarea | No | Currently not rendered in marquee card. Kept for future use. |
| `avatar_url` | Image upload | No | Optional. Falls back to auto-generated initials circle if empty. |
| `sort_order` | Number | No | Controls display order in marquee. Lower = shown first. |
| `is_active` | Toggle | No | Only active testimonials appear publicly. Default: `true`. |

### Auto-Generated Fields

| Field | Source | Notes |
|-------|--------|-------|
| `initials` | Auto-generated from `name` | First letter of first word + first letter of last word. E.g. "Operations Team" → "OT". |
| `rating` | Fixed at 5 | Always ★★★★★. Not editable by admin. |

### Validation Rules (Backend-Enforced — Show Admin When Exceeded)

| Field | Limit | UI Indicator |
|-------|-------|-------------|
| `name` | Max 50 chars | Show `{n}/50` counter; red border if exceeded; block submit |
| `role` | Max 80 chars | Show `{n}/80` counter; red border if exceeded; block submit |
| `quote` | Max 250 chars | Show `{n}/250` counter; red border if exceeded; **block submit** |
| `eyebrow` | Max 30 chars | Show `{n}/30` counter |

> The quote limit is critical: the frontend does NOT truncate. If the backend allows >250 chars, it will break the card layout. Backend MUST reject over-long quotes.

### Form UX

```
Create Testimonial
┌────────────────────────────────────────────────────────────┐
│ Name *                                                      │
│ ┌────────────────────────────────────────────────────────┐ │
│ │ Operations Team                                        │ │
│ └────────────────────────────────────────────────────────┘ │
│ 15/50 chars    Initials preview: OT                      │
│                                                            │
│ Role *                                                     │
│ ┌────────────────────────────────────────────────────────┐ │
│ │ Operations Team, Utec Tanzania                         │ │
│ └────────────────────────────────────────────────────────┘ │
│ 35/80 chars                                               │
│                                                            │
│ Quote *                                                    │
│ ┌────────────────────────────────────────────────────────┐ │
│ │ We knew exactly what to prepare, when to submit, and  │ │
│ │ who to contact if anything was unclear.               │ │
│ └────────────────────────────────────────────────────────┘ │
│ 108/250 chars                                             │
│                                                            │
│ Eyebrow (optional)                                         │
│ ┌────────────────────────────────────────────────────────┐ │
│ │ Business setup                                        │ │
│ └────────────────────────────────────────────────────────┘ │
│ 14/30 chars                                               │
│                                                            │
│ Avatar Image (optional)                                    │
│ ┌────────────────────────────────────────────────────────┐ │
│ │ [Upload Image]  or  [Remove]                           │ │
│ │ Fallback: "OT" initials circle                         │ │
│ └────────────────────────────────────────────────────────┘ │
│                                                            │
│ Sort Order              Active                             │
│ ┌──────┐              [●━━━━━━━━○]                        │
│ │  1   │                                                   │
│ └──────┘                                                   │
│                                                            │
│ [Cancel]  [Save as Draft]  [Save & Publish]                │
└────────────────────────────────────────────────────────────┘
```

---

## 4. API Contract

### Admin Testimonial Endpoints

#### `GET /admin/testimonials`

List all testimonials with pagination, filtering, and search.

**Query Parameters:**
| Param | Type | Required | Default |
|-------|------|----------|---------|
| `page` | number | No | 1 |
| `page_size` | number | No | 25 |
| `status` | string | No | — (all) |
| `is_active` | boolean | No | — (all) |
| `search` | string | No | — searches name, role, quote |

**Response:**
```typescript
interface ApiTestimonialListResponse {
  items: ApiTestimonial[];
  total: number;
  page: number;
  page_size: number;
}
```

#### `GET /admin/testimonials/:id`

Get a single testimonial.

#### `POST /admin/testimonials`

Create a new testimonial.

**Request Body:**
```typescript
interface CreateTestimonialPayload {
  name: string;              // max 50 chars
  role: string;              // max 80 chars
  quote: string;             // max 250 chars — CRITICAL LIMIT
  eyebrow?: string;          // max 30 chars
  headline?: string;         // max 80 chars (future use)
  support?: string;          // max 200 chars (future use)
  avatar_url?: string;       // CDN URL from media upload
  sort_order?: number;       // auto-assigned if omitted
  is_active?: boolean;       // default: true
}
```

**Response:** `201 Created` with the created `ApiTestimonial`.

**Backend auto-generates:** `initials` from name, `rating` = 5.

#### `PUT /admin/testimonials/:id`

Update an existing testimonial.

**Request Body:** Same as create payload (partial allowed).

**Response:** `200 OK` with the updated `ApiTestimonial`.

#### `DELETE /admin/testimonials/:id`

Delete a testimonial.

**Response:** `204 No Content`

#### Status Transition Endpoints

| Endpoint | Transition | Notes |
|----------|-----------|-------|
| `POST /admin/testimonials/:id/submit` | Draft → Pending Review | |
| `POST /admin/testimonials/:id/approve` | Pending → Published | |
| `POST /admin/testimonials/:id/reject` | Pending → Rejected | Body: `{ reason: string }` |
| `POST /admin/testimonials/:id/publish` | Draft/Approved → Published | Direct publish |
| `POST /admin/testimonials/:id/archive` | Any → Archived | |

#### `PATCH /admin/testimonials/reorder`

Bulk reorder testimonials.

**Request Body:**
```typescript
interface ReorderTestimonialsPayload {
  items: Array<{ id: number; sort_order: number }>;
}
```

**Response:** `200 OK`

### Public Testimonial Endpoints (Frontend Already Consumes)

#### `GET /testimonials`

List active, published testimonials sorted by sort_order ascending.

**Response:** `ApiTestimonial[]` (array)

> The `testimonialService.ts` already calls this endpoint and maps results via `mapTestimonial()`.

### TypeScript Types Reference

```typescript
// src/exxonim/shared/contracts/testimonials.ts
export interface ApiTestimonial {
  id: number;
  eyebrow?: string | null;       // max 30 chars
  headline?: string | null;      // max 80 chars (future use)
  support?: string | null;       // max 200 chars (future use)
  author: string;                // name — max 50 chars
  author_role?: string | null;   // role — max 80 chars
  initials?: string | null;      // auto-generated
  content: string;               // quote — max 250 chars (CRITICAL)
  rating?: number | null;        // always 5
  sort_order: number;            // display order
  status?: ApiContentStatus;     // 'draft' | 'pending_review' | 'published' | 'rejected' | 'archived'
  is_active?: boolean;           // only active shown publicly
  created_at: string;
  updated_at: string;
}

// src/exxonim/types/domain.ts
export interface Testimonial {
  id: number;
  eyebrow: string;               // max 30 chars
  headline: string;              // future use
  support: string;               // future use
  quote: string;                 // max 250 chars — NOT truncated in UI
  name: string;                  // max 50 chars
  role: string;                  // max 80 chars
  initials: string;              // auto-generated from name
}
```

---

## 5. How Testimonials Display Publicly

### Marquee Carousel Behavior

The `TestimonialMarquee` component displays testimonials as an endless-looping carousel:

1. **Static on arrival** — Paused when visitor first scrolls into view
2. **Auto-slide after ~3 seconds** — Slides left endlessly via `requestAnimationFrame`
3. **Arrow navigation** — Left/right buttons (desktop only, hidden on mobile)
4. **Drag/swipe** — Mouse drag and touch swipe
5. **Pause on interaction** — Auto-slide pauses on hover/drag/arrow click, resumes 3s after last interaction
6. **Edge fade masks** — 15%/85% fade on left/right edges

### Card Display

```
┌──────────────────────┐
│ ★★★★★               │  ← Always 5 stars
│                      │
│ "We knew exactly     │  ← Quote (max 250 chars)
│ what to prepare..."  │
│                      │
│ ┌──┐                 │
│ │OT│ Operations Team │  ← Initials avatar + name + role
│ └──┘ Utec Tanzania   │
└──────────────────────┘
```

Cards have uniform height (`h-[220px]`). Short quotes are fine — they don't stretch.

---

## 6. Build Priority

### P0 — Must Have

| Item | Notes |
|------|-------|
| Testimonials list table | With status/active filters, search |
| Create testimonial form | All fields with character counters |
| Edit testimonial form | Pre-filled, same form |
| Publish/Unpublish actions | Quick status toggle |
| Delete with confirmation | |
| Character counters (name, role, quote, eyebrow) | Live counters, block submit over limit |

### P1 — Important

| Item | Notes |
|------|-------|
| Status workflow buttons | Submit/Approve/Reject/Archive |
| Rejection modal with reason | Required when rejecting |
| Drag-and-drop reorder | With PATCH reorder endpoint |
| Toggle active/inactive | Quick switch without opening edit |
| Avatar image upload | With preview and fallback initials display |

### P2 — Nice to Have

| Item | Notes |
|------|-------|
| Quote preview card | Show how the testimonial card will look |
| Bulk actions | Multi-select + batch status change |
| Initials auto-preview | Show "OT" as admin types the name |

---

## Appendix: Key Files Reference

| File | Purpose |
|------|---------|
| `src/exxonim/components/ServicePlansSection.tsx` | `TestimonialCard` + `TestimonialMarquee` components |
| `src/exxonim/hooks/useTestimonials.ts` | React Query hook for fetching testimonials |
| `src/exxonim/services/testimonialService.ts` | Cached fetching with fallback |
| `src/exxonim/shared/contracts/testimonials.ts` | `ApiTestimonial` type |
| `src/exxonim/utils/contentMappers.ts` | `mapTestimonial()` — API → domain mapping |
| `src/exxonim/types/domain.ts` | `Testimonial` type with full validation notes |
| `src/exxonim/shared/api/routes.ts` | All admin/public testimonial routes |
| `src/exxonim/content/fallbackPublicContent.ts` | Fallback testimonial data (3 items) |

---

*End of specification.*
