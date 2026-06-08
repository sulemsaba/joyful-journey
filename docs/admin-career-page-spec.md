# Admin Frontend Specification — Career Page & Job Management

> **Audience:** Admin frontend engineers building the CMS for Exxonim Consult  
> **Scope:** Career page content editing + Job listing CRUD + Application management  
> **Status:** Admin pages not yet built — this document defines what needs to be built

---

## Table of Contents

1. [Overview & Architecture](#1-overview--architecture)
2. [Career Page Content Editor](#2-career-page-content-editor)
3. [Job Listings Management](#3-job-listings-management)
4. [Create / Edit Job Form](#4-create--edit-job-form)
5. [Job Application Inbox](#5-job-application-inbox)
6. [API Contract](#6-api-contract)
7. [Build Priority](#7-build-priority)

---

## 1. Overview & Architecture

### What the Admin Needs to Manage

| Area | Type | Description |
|------|------|-------------|
| **Career page content** | Single page (slug: `career`) | Hero banner, focus areas, CTA buttons |
| **Job listings** | Collection (CRUD) | Create, edit, publish/unpublish, delete job postings |
| **Job applications** | Collection (Read-only + export) | View applications submitted via the public Apply Modal |

### Existing Frontend Components (Public — Do NOT Modify)

| Component | File | Purpose |
|-----------|------|---------|
| `CareerPage` | `src/exxonim/pages/CareerPage.tsx` | Full public career page rendering |
| `ApplyModal` | Same file (internal component) | Application form with file uploads |
| `SocialShareButtons` | Same file | X, LinkedIn, WhatsApp, Copy Link |
| `CareerCTABanner` | Same file | "Don't see the right role?" CTA |
| `jobsService` | `src/exxonim/services/jobsService.ts` | Fetches published jobs from `/api/public/jobs` |

### Status Workflow

Jobs follow a simpler workflow than blog posts:

```
draft ──→ published ──→ draft (unpublish)
  │                        │
  └──→ archived         archived
```

- **Draft** — Not visible on the public career page
- **Published** — Visible on the public career page
- **Archived** — Hidden from public, preserved in admin

> No review/approve/reject workflow for jobs. Jobs are created by admins and published directly.

---

## 2. Career Page Content Editor

The career page is a single page record (slug: `career`) with `CareerPageContent`. The admin needs a form to edit its content.

### Page Record Fields

| Field | Type | Notes |
|-------|------|-------|
| `title` | Text | SEO title, e.g. "Careers at Exxonim Consult | Tanzania" |
| `metaTitle` | Text | Optional, overrides title in `<title>` tag |
| `metaDescription` | Textarea | SEO meta description, max ~160 chars |

### Hero Section

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `hero.eyebrow` | Text | Yes | Short label above title, e.g. "Join the team" |
| `hero.title` | Text | Yes | Main heading, e.g. "Build your career at Exxonim." |
| `hero.description` | Textarea | Yes | Sub-heading text |
| `hero.banner_image` | Image upload | No | ~~1344×768px (16:9)~~ **See image guidelines below** |

#### Banner Image Guidelines

| Rule | Value |
|------|-------|
| Recommended dimensions | **1344×768px** (16:9 landscape) |
| Minimum dimensions | 800×450px |
| Maximum file size | **500KB** |
| Preferred format | WebP (better compression) |
| Acceptable formats | WebP, PNG, JPEG |
| Aspect ratio | 16:9 (cropped via `object-cover` in CSS) |
| Dark overlay | Applied via CSS gradient for text readability — no need to pre-darken |
| **Notification to display to admin** | Show a badge/pill next to the uploaded image: `1344×768px · WebP · 240KB` with a warning if dimensions or size exceed limits |

#### Image Upload UX

```
┌──────────────────────────────────────────────────────────────┐
│  Banner Image                                                │
│  ┌──────────────────────────────────────────────────────────┐│
│  │                                                          ││
│  │   [Current image preview — 16:9 aspect ratio box]       ││
│  │                                                          ││
│  │   ┌──────────────┐ ┌──────────────┐                     ││
│  │   │  1344×768px  │ │   WebP       │ │   240KB           ││
│  │   │  Recommended │ │  Preferred   │ │   ✓ OK            ││
│  │   └──────────────┘ └──────────────┘ └──────────────┘   ││
│  │                                                          ││
│  │   [Replace Image] [Remove]                                ││
│  └──────────────────────────────────────────────────────────┘│
│  Fallback: /careers/banner-enhanced.png if none uploaded      │
└──────────────────────────────────────────────────────────────┘
```

**Validation notifications to display:**
- If image < 800×450px: ⚠️ "Image is too small. Minimum 800×450px recommended."
- If file > 500KB: ⚠️ "File size exceeds 500KB. Larger images increase page load time."
- If not WebP: ℹ️ "WebP format is recommended for better performance."

### Focus Areas Section

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `focus_areas` | Reorderable list of text items | No | 3 items shown in the fallback. Each is a short phrase. |

**UX:** A sortable list where admin can add, edit, reorder, and remove items.

```
Focus Areas
┌─────────────────────────────────────────────────┐
│ ☰ Client operations and workflow coordination   │
│ ☰ Regulatory and compliance support             │
│ ☰ Structured follow-up and document readiness   │
│                                                  │
│ [+ Add focus area]                               │
└─────────────────────────────────────────────────┘
```

### Status / CTA Section

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `status.label` | Text | Yes | Section heading, e.g. "Current opportunities" |
| `status.description` | Textarea | Yes | Section body text |
| `status.primary.label` | Text | Yes | Primary CTA button text |
| `status.primary.href` | URL | Yes | Primary CTA link (can be page selector) |
| `status.secondary.label` | Text | Yes | Secondary CTA button text |
| `status.secondary.href` | URL | Yes | Secondary CTA link |

> The primary CTA appears in two places: (1) the status section below job listings, (2) the CTA banner at the bottom of the page.

### Career Page Preview

The admin should be able to preview the full career page to see how edits look before publishing. For the scope of this document, the page uses the standard page publish workflow (save → publish).

---

## 3. Job Listings Management

### Jobs List View

A table-based listing of all jobs with the following columns:

| Column | Type | Notes |
|--------|------|-------|
| Title | Text + link | Click to edit, shows slug below |
| Department | Badge | Pills like "Operations", "Compliance" |
| Employment Type | Badge | "Full-time", "Part-time", "Contract", "Internship" |
| Location | Text | City, Country |
| Status | Badge | `Draft` (gray), `Published` (green), `Archived` (muted) |
| Posted | Date | `published_at` date |
| Applications | Count | Number of applications received |
| Actions | Icon buttons | Edit, Unpublish/Publish, Archive, Delete |

#### Filters & Search

| Filter | Type | Options |
|--------|------|---------|
| Status | Dropdown | All, Draft, Published, Archived |
| Department | Dropdown | Populated from existing jobs' departments |
| Employment Type | Dropdown | All, Full-time, Part-time, Contract, Internship |
| Search | Text input | Searches title, department, summary |

#### Bulk Actions

- **Bulk publish** — Publish selected draft jobs
- **Bulk archive** — Archive selected published/draft jobs
- **Bulk delete** — Delete selected drafts (guard: cannot delete published jobs)

#### Empty State

```
┌────────────────────────────────────────────────────────────┐
│  ○ No jobs yet                                              │
│                                                             │
│  Create your first job posting to start receiving           │
│  applications through the Exxonim career page.              │
│                                                             │
│  [+ Create Your First Job]                                   │
└────────────────────────────────────────────────────────────┘
```

### Job Detail View / Edit

Clicking a job title opens the edit form (see Section 4).

### Job Status Actions

| Current Status | Available Actions |
|---------------|-------------------|
| Draft | Publish, Edit, Delete |
| Published | Unpublish (→ Draft), Archive |
| Archived | Restore (→ Draft), Delete (with confirmation) |

---

## 4. Create / Edit Job Form

### Form Sections

The form is divided into collapsible sections:

#### 4.1 Basic Information

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `title` | Text input | Yes | Max 60 chars. Clear, specific role title. |
| `slug` | Text input | Yes | Auto-generated from title, editable. Unique. |
| `department` | Text input | Yes | Short, 1-2 words. Used for pills and filtering. |
| `employment_type` | Select | Yes | Options: `Full-time`, `Part-time`, `Contract`, `Internship` |
| `experience_label` | Select | No | Options: `Entry-level`, `Mid-level`, `Senior`, `Lead` |
| `status` | Toggle/Switch | No | Draft/Published toggle |

#### 4.2 Location

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `location_mode` | Select | Yes | Options: `on-site`, `hybrid`, `remote` |
| `city` | Text | Yes | Physical location city |
| `country` | Text | Yes | Default: "Tanzania" |

#### 4.3 Summary & Description

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `summary` | Textarea | Yes | 1-sentence overview. Shown in collapsed/preview mode. Max ~200 chars. |
| `description` | Textarea | No | 1-2 sentence full description. Shown in full details mode. Max ~500 chars. |

#### 4.4 Responsibilities

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `responsibilities` | Reorderable list | No | 3-5 action-oriented bullet points. Each max ~200 chars. |

**UX:**
```
Responsibilities
┌────────────────────────────────────────────────────────────┐
│ ☰ Track active workstreams                                 │
│ ☰ Coordinate next actions with the team                    │
│ ☰ Help keep filing and follow-up work organized            │
│                                                             │
│ [+ Add responsibility]                                      │
└────────────────────────────────────────────────────────────┘
```

#### 4.5 Requirements

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `requirements` | Reorderable list | No | 3-5 qualification bullet points. Each max ~200 chars. |

**UX:** Same pattern as Responsibilities.

#### 4.6 Optional Fields

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `compensation_label` | Text | No | Optional salary range, e.g. "TZS 1.5M–2.5M/mo". **Not displayed on public page.** |
| `published_at` | Date picker | No | ISO date. Auto-set to current date when status changes to Published. |

#### 4.7 Publishing

| Field | Action |
|-------|--------|
| **Save as Draft** | Saves with `status: 'draft'`. Not visible publicly. |
| **Publish** | Sets `status: 'published'` and `published_at` to now. Visible publicly. |
| **Save & Publish** | Saves and publishes in one action. |

---

## 5. Job Application Inbox

### Applications List View

A table of applications submitted via the public Apply Modal.

| Column | Type | Notes |
|--------|------|-------|
| Job Title | Text + link | Link to the job edit form |
| Applicant Name | Text | Full name |
| Email | Text | Click to open `mailto:` |
| Phone | Text | |
| Submitted | Date | When the application was submitted |
| CV/Resume | Download link | PDF, DOC, DOCX |
| Academics | Download link | If uploaded |
| Cover Letter | Download link or text | If file or textarea was used |
| Actions | Button | Mark as read, Delete |

#### Application Detail View

Clicking an application row opens a detail panel showing:

- All form data (name, email, phone, cover note text)
- Download buttons for all uploaded files (CV, academics, cover letter)
- Status: New / Read / Reviewed / Contacted / Rejected

#### Application Status Workflow

```
new ──→ read ──→ reviewed ──→ contacted
  │                            │
  └──→ rejected            rejected
```

#### Export

- **Export all as CSV** — Downloads a CSV with all application data
- **Export job-specific** — Filter by job, then export

---

## 6. API Contract

### Admin Job Endpoints

#### `GET /admin/jobs`

List all jobs with pagination, filtering, and search.

**Query Parameters:**

| Param | Type | Required | Default |
|-------|------|----------|---------|
| `page` | number | No | 1 |
| `page_size` | number | No | 25 |
| `status` | string | No | — (all) |
| `department` | string | No | — (all) |
| `employment_type` | string | No | — (all) |
| `search` | string | No | — (searches title, department, summary) |

**Response:**
```typescript
interface ApiPaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

interface ApiCareerJobListResponse extends ApiPaginatedResponse<ApiCareerJob> {}
```

#### `GET /admin/jobs/:slug`

Get a single job by slug.

**Response:**
```typescript
type ApiCareerJobDetailResponse = ApiCareerJob;
```

#### `POST /admin/jobs`

Create a new job.

**Request Body:**
```typescript
interface ApiCreateCareerJobPayload {
  title: string;
  slug: string;
  department: string;
  employment_type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  location_mode: 'on-site' | 'hybrid' | 'remote';
  city: string;
  country: string;
  compensation_label?: string | null;
  experience_label?: 'Entry-level' | 'Mid-level' | 'Senior' | 'Lead' | null;
  summary: string;
  description?: string;
  requirements: string[];
  responsibilities: string[];
  status?: 'draft' | 'published';
  published_at?: string | null;
}
```

**Response:** `201 Created` with the created `ApiCareerJob`.

#### `PUT /admin/jobs/:slug`

Update an existing job.

**Request Body:** Same as create payload (partial allowed).

**Response:** `200 OK` with the updated `ApiCareerJob`.

#### `DELETE /admin/jobs/:slug`

Delete a job.

**Query Parameters:**
| Param | Type | Required | Notes |
|-------|------|----------|-------|
| `force` | boolean | No | Set to `true` to delete published jobs. Default `false`. |

**Response:** `204 No Content`

> **Guard:** If `force` is not `true` and the job is published, return `409 Conflict` with a message: "Cannot delete a published job. Unpublish it first or use `?force=true`."

#### `PATCH /admin/jobs/:slug/status`

Change job status.

**Request Body:**
```typescript
interface ApiChangeJobStatusPayload {
  status: 'draft' | 'published' | 'archived';
}
```

**Response:** `200 OK` with the updated `ApiCareerJob`.

### Public Job Endpoints (Frontend Already Consumes)

#### `GET /jobs`

List published jobs. Used by `jobsService.ts`.

**Response:** `ApiCareerJob[]` (array — not paginated, only published)

#### `GET /jobs/:slug`

Get a single published job.

**Response:** `ApiCareerJob`

#### `POST /jobs/:id/apply`

Submit a job application.

**Request Body:** `multipart/form-data`

| Field | Type | Required |
|-------|------|----------|
| `name` | string | Yes |
| `email` | string | Yes |
| `phone` | string | No |
| `cover_note` | string | No |
| `resume` | file | Yes |
| `academics` | file | No |
| `cover_letter` | file | No |

**File Constraints:**
| Rule | Value |
|------|-------|
| Max file size | 5MB |
| Accepted formats | PDF, DOC, DOCX |

**Response:** `201 Created` with application confirmation data.

### Admin Application Endpoints

#### `GET /admin/jobs/:slug/applications`

List applications for a specific job.

**Query Parameters:**
| Param | Type | Required | Default |
|-------|------|----------|---------|
| `page` | number | No | 1 |
| `page_size` | number | No | 25 |
| `status` | string | No | — (all) |

**Response:**
```typescript
interface ApiJobApplication {
  id: number;
  job_id: number;
  job_title: string;
  name: string;
  email: string;
  phone?: string;
  cover_note?: string;
  resume_url: string;
  academics_url?: string;
  cover_letter_url?: string;
  status: 'new' | 'read' | 'reviewed' | 'contacted' | 'rejected';
  created_at: string;
}
```

#### `GET /admin/jobs/:slug/applications/:id`

Get a single application detail.

#### `PATCH /admin/jobs/:slug/applications/:id/status`

Update application status.

**Request Body:**
```typescript
interface ApiChangeApplicationStatusPayload {
  status: 'read' | 'reviewed' | 'contacted' | 'rejected';
}
```

#### `GET /admin/jobs/:slug/applications/export`

Export applications as CSV.

### TypeScript Types Reference

```typescript
// src/exxonim/shared/contracts/jobs.ts
export interface ApiCareerJob {
  id: number;
  title: string;
  slug: string;
  department: string;
  employment_type: string;
  location_mode: string;
  city: string;
  country: string;
  compensation_label?: string | null;
  experience_label?: string | null;
  summary: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  status?: ApiContentStatus;        // 'draft' | 'published' | 'rejected' | 'archived'
  is_published?: boolean;
  published_at?: string | null;
  created_at: string;
  updated_at: string;
}

// src/exxonim/types/domain.ts
export interface CareerPageContent {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    banner_image?: string;
  };
  focus_areas: string[];
  status: {
    label: string;
    description: string;
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
  };
}
```

---

## 7. Public Career Page Reference

### How Jobs Appear Publicly

Understanding the public page helps the admin know what their edits look like:

1. **Department Tabs** — Auto-generated from all published jobs' `department` values. Alphabetically sorted + "All Jobs" tab.
2. **Job Cards** — All jobs inside ONE big card. Three expand states:
   - **Collapsed:** Title, department/type pills, location, posted date, Apply Now button
   - **Preview:** Summary text appears, Read More link
   - **Full details:** Description, meta grid, responsibilities, requirements, Apply Now + Share
3. **Empty State** — When no published jobs exist: "No positions available. New roles are posted regularly — check back soon or reach out to express your interest."
4. **Newsletter Section** — "Never miss a new role" with job alert subscription
5. **CTA Banner** — "Don't see the right role?" with links to contact and resources

### Key Public Page Behaviors

| Behavior | Notes |
|----------|-------|
| Compensation NOT displayed | `compensation_label` is stored but never rendered on public |
| Jobs never auto-removed | No 72h expiry. Admin must unpublish/archive to remove. |
| Apply Modal close | ONLY via X button — no backdrop click close |
| File upload max | 5MB, PDF/DOC/DOCX only |
| Search filters | Keyword searches title, department, employment_type, summary |
| Pagination | Configurable per page (10, 25, 50) |

---

## 8. Build Priority

### P0 — Must Have (Core Job CRUD)

| Item | Notes |
|------|-------|
| Jobs list table with filters/search/sort | All columns, status badges, pagination |
| Create job form (sections 4.1–4.7) | All fields, validation, slug auto-generation |
| Edit job form (pre-filled) | Same form as create, pre-populated |
| Publish / Unpublish / Archive actions | Status management buttons |
| Career page content editor | Hero, focus areas, CTA sections |
| Delete guard for published jobs | Show confirmation, require force flag |

### P1 — Important

| Item | Notes |
|------|-------|
| Application inbox list | Table with applicant info, download links, status |
| Application detail panel | Full application view |
| Application status management | Mark as read/reviewed/contacted/rejected |
| Image upload for hero banner | With validation notifications (size/dimensions/format) |
| Slug validation | Ensure unique slug on create/edit |
| Bulk actions (publish, archive) | Multi-select checkboxes in table |

### P2 — Nice to Have

| Item | Notes |
|------|-------|
| CSV export of applications | Download all or per-job |
| Reorder responsibilities/requirements | Drag and drop in form |
| Department autocomplete | Suggest existing departments on input |
| Application count badge on jobs list | Quick glance at how many applications per job |
| Duplicate job | Quick-clone an existing job posting |

### P3 — Future

| Item | Notes |
|------|-------|
| Job application analytics | Trends over time, per-job stats |
| Email notification on application | Notify admin when new application comes in |
| Cover note character count | Show remaining chars in admin form |
| Job expiration date | Optional auto-archive on a set date |

---

## Appendix: Key Files Reference

| File | Purpose |
|------|---------|
| `src/exxonim/pages/CareerPage.tsx` | Public career page — full rendering logic |
| `src/exxonim/types/domain.ts` | `CareerPageContent` type |
| `src/exxonim/shared/contracts/jobs.ts` | `ApiCareerJob` and API types |
| `src/exxonim/shared/api/routes.ts` | All admin/public route constants |
| `src/exxonim/services/jobsService.ts` | Public jobs fetching (cached) |
| `src/exxonim/content/fallbackPublicContent.ts` | Fallback career page content + fallback jobs |
| `src/exxonim/routes.ts` | Public route paths |

---

*End of specification.*
