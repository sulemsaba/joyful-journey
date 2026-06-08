# Admin Frontend Specification — FAQ Management

> **Audience:** Admin frontend engineers building the CMS for Exxonim Consult  
> **Scope:** FAQ page content + FAQ item CRUD  
> **Status:** Admin pages not yet built

---

## 1. Overview

### What the Admin Needs to Manage

| Area | Type | Description |
|------|------|-------------|
| **FAQ hero content** | Single page (slug: `faq`) | Eyebrow, title, description (rarely changed) |
| **FAQ items** | Collection CRUD | Question/answer pairs with categories, reorder, activate/deactivate |

### Existing Frontend Components (Public — Do NOT Modify)

| Component | File | Purpose |
|-----------|------|---------|
| `FaqPage` | `src/exxonim/pages/FaqPage.tsx` | Two-column layout with accordion, search, JSON-LD |
| `useFaqItems` | `src/exxonim/hooks/useFaqItems.ts` | Fetches FAQ items from `/api/v1/faq` |
| `usePage` | `src/exxonim/hooks/usePage.ts` | Fetches FAQ page content (hero text) |

---

## 2. FAQ Page Content Editor

The FAQ page is a page record (slug: `faq`). The hero content rarely changes but should be editable.

### Hero Section

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `hero.eyebrow` | Text | Yes | Short label, e.g. "FAQ" |
| `hero.title` | Text | Yes | Main heading, e.g. "Common Questions, Clear Answers" |
| `hero.description` | Textarea | Yes | Sub-heading text |

> The hero content is part of the page record. Items come from the DB via the FAQ API.

---

## 3. FAQ Items CRUD

### Items List View

A table-based listing of all FAQ items:

| Column | Type | Notes |
|--------|------|-------|
| Question | Text + link | Click to edit, truncated to 80 chars |
| Category | Badge | Registration, Licensing, Tax, Tracking, General |
| Order | Number | `sort_order` — lower = shown first |
| Status | Badge | `Active` (green), `Inactive` (gray) |
| Actions | Icon buttons | Edit, Toggle active, Delete |

#### Filters & Search

| Filter | Type | Options |
|--------|------|---------|
| Category | Dropdown | All, Registration, Licensing, Tax, Tracking, General |
| Status | Dropdown | All, Active, Inactive |
| Search | Text input | Searches question and answer text |

#### Drag-and-Drop Reorder

The admin can **drag-and-drop** items to reorder. On drop, send a single `PATCH` request:

```
PATCH /admin/faq/reorder
Body: { items: [{ id: "abc123", sort_order: 1 }, ...] }
```

> The FAQ page renders items sorted by `sort_order` (ascending).

#### Empty State

```
┌────────────────────────────────────────────────────────────┐
│  ○ No FAQ items yet                                         │
│                                                             │
│  Add questions and answers so visitors can find answers     │
│  without contacting support.                                │
│                                                             │
│  [+ Create Your First FAQ Item]                             │
└────────────────────────────────────────────────────────────┘
```

---

## 4. Create / Edit FAQ Item Form

### Form Fields

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `question` | Text input | **Yes** | **Max 120 characters.** Backend MUST reject if exceeded. |
| `answer` | Textarea | **Yes** | **Max 500 characters.** Backend MUST reject if exceeded. |
| `category` | Select | Yes | Options: `registration`, `licensing`, `tax`, `tracking`, `general` |
| `sort_order` | Number | No | Controls display order. Lower = first. Auto-assigned on create. |
| `is_active` | Toggle | No | Only active items appear on the public FAQ page. Default: `true`. |

### UX Notes

```
Create FAQ Item
┌────────────────────────────────────────────────────────────┐
│ Question *                                                  │
│ ┌────────────────────────────────────────────────────────┐ │
│ │ How do I register a company in Tanzania?               │ │
│ └────────────────────────────────────────────────────────┘ │
│ 88/120 chars                                              │
│                                                            │
│ Answer *                                                   │
│ ┌────────────────────────────────────────────────────────┐ │
│ │ Provide a clear, concise answer...                     │ │
│ │                                                        │ │
│ └────────────────────────────────────────────────────────┘ │
│ 245/500 chars                                             │
│                                                            │
│ Category *                                                 │
│ ┌────────────────────────────┐                             │
│ │ Registration        ▼      │                             │
│ └────────────────────────────┘                             │
│                                                            │
│ Active  [●━━━━━━━━○]                                       │
│                                                            │
│ [Cancel]  [Save]  [Save + Add Another]                     │
└────────────────────────────────────────────────────────────┘
```

> **Character counters** should show remaining chars (e.g. "88/120") and turn red when exceeded.

### Validation Rules (Backend-Enforced — Show Admin When Exceeded)

| Field | Limit | UI Indicator |
|-------|-------|-------------|
| `question` | Max 120 chars | Show `{n}/120` counter; red border if exceeded; block submit |
| `answer` | Max 500 chars | Show `{n}/500` counter; red border if exceeded; block submit |

---

## 5. API Contract

### Admin FAQ Endpoints

#### `GET /admin/faq`

List all FAQ items (including inactive).

**Query Parameters:**
| Param | Type | Required | Default |
|-------|------|----------|---------|
| `page` | number | No | 1 |
| `page_size` | number | No | 25 |
| `category` | string | No | — (all) |
| `is_active` | boolean | No | — (all) |
| `search` | string | No | — searches question + answer |

**Response:**
```typescript
interface FaqItemFromApi {
  id: string;         // cuid
  question: string;
  answer: string;
  category: 'registration' | 'licensing' | 'tax' | 'tracking' | 'general';
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface FaqApiResponse {
  items: FaqItemFromApi[];
  total: number;
  page: number;
  page_size: number;
}
```

#### `GET /admin/faq/:id`

Get a single FAQ item by ID.

#### `POST /admin/faq`

Create a new FAQ item.

**Request Body:**
```typescript
interface CreateFaqItemPayload {
  question: string;        // max 120 chars
  answer: string;          // max 500 chars
  category: string;        // registration | licensing | tax | tracking | general
  sort_order?: number;     // optional, auto-assigned if omitted
  is_active?: boolean;     // default: true
}
```

**Response:** `201 Created` with the created `FaqItemFromApi`.

#### `PUT /admin/faq/:id`

Update an existing FAQ item.

**Request Body:** Same as create payload (partial allowed).

**Response:** `200 OK` with the updated `FaqItemFromApi`.

#### `DELETE /admin/faq/:id`

Delete a FAQ item.

**Response:** `204 No Content`

#### `PATCH /admin/faq/reorder`

Bulk reorder FAQ items.

**Request Body:**
```typescript
interface ReorderFaqItemsPayload {
  items: Array<{ id: string; sort_order: number }>;
}
```

**Response:** `200 OK`

### Public FAQ Endpoints (Frontend Already Consumes)

#### `GET /faq`

List active FAQ items, sorted by sort_order ascending.

**Query Parameters:**
| Param | Type | Notes |
|-------|------|-------|
| `category` | string | Optional filter |
| `search` | string | Optional search by question/answer |

**Response:**
```typescript
interface FaqApiResponse {
  items: FaqItemFromApi[];
  total: number;
}
```

> The `useFaqItems()` hook already calls this endpoint.

---

## 6. How FAQ Items Display Publicly

### Public Page Layout

1. **Hero section** — Eyebrow, title, description from page content
2. **Search bar** — Filters items client-side by question/answer text
3. **Accordion list** — Items displayed as flat list with straight-line dividers. Plus/X toggle icons. Only one item open at a time.
4. **JSON-LD structured data** — Auto-generated `FAQPage` schema for Google rich results
5. **Contact CTA** — "Can't find your answer?" sidebar card

### FAQ Categories (Filter/Sort Logic)

| Category | Used For |
|----------|----------|
| `registration` | Entity setup, company registration, business name |
| `licensing` | Business licenses, permits, renewals |
| `tax` | TIN, VAT, tax returns |
| `tracking` | Consultation tracking, status lookup |
| `general` | Everything else |

---

## 7. Build Priority

### P0 — Must Have

| Item | Notes |
|------|-------|
| FAQ items list table | With category/status filter, search |
| Create FAQ item form | All fields with character counters |
| Edit FAQ item form | Pre-filled, same form |
| Toggle active/inactive | Quick switch without opening edit |
| Drag-and-drop reorder | With PATCH /admin/faq/reorder |

### P1 — Important

| Item | Notes |
|------|-------|
| FAQ page hero editor | Eyebrow, title, description |
| Character countdown | Live counter turning red when over limit |
| Delete with confirmation | "Are you sure?" dialog |
| Category filter on list | Dropdown filter |

### P2 — Nice to Have

| Item | Notes |
|------|-------|
| Bulk activate/deactivate | Multi-select + batch action |
| Bulk delete | Multi-select + batch delete |
| Search highlighting | Highlight matching text in results |

---

## Appendix: Key Files Reference

| File | Purpose |
|------|---------|
| `src/exxonim/pages/FaqPage.tsx` | Public FAQ page — accordion, search, JSON-LD |
| `src/exxonim/hooks/useFaqItems.ts` | React Query hook for fetching FAQ items |
| `prisma/schema.prisma` | `FaqItem` model (id, question, answer, category, sort_order, is_active) |
| `src/exxonim/shared/api/routes.ts` | Public FAQ route: `faq: { list: "/faq" }` |
| `src/exxonim/types/domain.ts` | `FaqPageContent` type + full admin integration notes |
| `src/exxonim/content/fallbackPublicContent.ts` | Fallback FAQ page content |

---

*End of specification.*
