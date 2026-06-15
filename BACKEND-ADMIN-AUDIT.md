# Exxonim Consult — Backend & Admin Panel Audit Report

> **Date:** June 2025  
> **Scope:** Every page, component, content field, and data flow — what needs a backend API, what needs an admin panel, and why.

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Current Architecture](#2-current-architecture)
3. [Page-by-Page Breakdown](#3-page-by-page-breakdown)
4. [Component-by-Component Data Needs](#4-component-by-component-data-needs)
5. [What Already Has a Backend](#5-what-already-has-a-backend)
6. [What Is Missing a Backend](#6-what-is-missing-a-backend)
7. [Admin Panel Entities Required](#7-admin-panel-entities-required)
8. [Database Schema Needed](#8-database-schema-needed)
9. [API Endpoints to Build](#9-api-endpoints-to-build)
10. [Priority Matrix](#10-priority-matrix)
11. [Appendix: Full Navigation Structure](#11-appendix-full-navigation-structure)

---

## 1. Executive Summary

The Exxonim Consult website is a **Vite + React + TypeScript SPA** with a 5-layer data fallback system. Currently, **95% of all content is hardcoded** in TypeScript fallback files. Only the FAQ items and Service Catalog have real database-backed APIs.

### Current State
- **17 pages/routes** defined
- **40+ components** across all pages
- **~107KB of hardcoded fallback content** in a single TypeScript file
- **2 working database-backed APIs** (FAQ + Service Catalog via Hono/Prisma)
- **14 mock API endpoints** that return hardcoded data, not from a database
- **0 admin panel features** — all content changes require code deployment

### What Needs to Be Built
- **17 admin entity types** with full CRUD operations
- **50+ API endpoints** for both public and admin access
- **A complete admin panel UI** with auth, roles, and permissions
- **Database schema expansion** from 7 tables to ~30+ tables
- **Content management workflow** (draft → review → publish)

---

## 2. Current Architecture

### Data Flow (5-Layer Fallback)

```
User Request
    ↓
Layer 0: TanStack Query memory cache (instant for SPA navigation)
    ↓ miss
Layer 1: persistQueryClient / localStorage (instant for returning visitors)
    ↓ miss
Layer 2: Live API → /api/v1/* (fresh data from DB)
    ↓ fail
Layer 3: /fallback/*.json (emergency server-side JSON)
    ↓ fail
Layer 4: placeholderData in TypeScript (hardcoded, always available)
```

### Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend | Vite + React 19 + TypeScript |
| Styling | Tailwind CSS 4 |
| State | TanStack Query + Zustand |
| Backend (partial) | Next.js API routes + Hono mini-service |
| Database | SQLite via Prisma ORM |
| Admin (planned) | FastAPI + React |

### Key Files
| File | Purpose | Size |
|------|---------|------|
| `src/exxonim/content/fallbackPublicContent.ts` | ALL page content + blog + testimonials + pricing + jobs | ~107KB |
| `src/exxonim/content/fallbackShell.ts` | Brand, company info, footer, navigation | ~8KB |
| `src/exxonim/content/fallbackServiceCatalog.ts` | 15 services + 4 categories + 4 segments | ~12KB |
| `src/exxonim/content/staticNavigation.ts` | Complete navigation tree | ~6KB |
| `src/exxonim/shared/contracts/` | 17 API contract definition files | ~40KB |
| `src/exxonim/shared/api/routes.ts` | All planned API route definitions | ~8KB |

---

## 3. Page-by-Page Breakdown

### 3.1 Home Page (`/`)

**Component:** `src/exxonim/pages/HomePage.tsx`

| Section | Component | Content Source | Needs Backend? | Needs Admin? | Why |
|---------|-----------|---------------|----------------|-------------|-----|
| Hero | `ReferenceHero` | `usePage("home") → content.hero` | YES | YES | Hero eyebrow, title, description, CTAs — must be editable without code deploy |
| Aurora background | `HeroAurora` | Static canvas animation | NO | NO | Pure visual, no content |
| Google review bar | `HeroRibbon` | Hardcoded (5.0 rating, 8 reviews) | YES | YES | Real Google rating should be fetched/stored, review count updates |
| Provider logos | `ProviderSection` | `usePage("home") → content.provider_section` | YES | YES | Logo images + names change as partners are added/removed |
| Stack section | `StackSection` | `usePage("home") → content.stack_section` | YES | YES | Stack items (title, subtitle, description, video, features) — key marketing content |
| Service plans | `ServicePlansSection` | `usePricingPlans()` + `useTestimonials()` | YES | YES | Pricing tiers, features, testimonials change regularly |
| Insights/blog | `InsightsSection` | `useBlogPosts()` | YES | YES | Blog posts are published/updated regularly |
| Newsletter CTA | `NewsletterForm` | **SIMULATED** (no API) | **YES — URGENT** | YES | Email addresses submitted now go NOWHERE — data is lost |
| Bottom CTA | `UnifiedCtaSection` | Static props | YES | YES | CTA text and links should be editable |

**Admin Needs for Home Page:**
- Edit hero text (eyebrow, title, subtitle, description, CTA labels/links)
- Manage provider/partner logos (add/remove/reorder)
- Manage stack items (add/remove, edit video sources, feature rows)
- Manage Google review display (fetch schedule, fallback rating)
- Manage newsletter subscriber list
- Edit bottom CTA section

---

### 3.2 About Page (`/about`)

**Component:** `src/exxonim/pages/AboutPage.tsx`

| Section | Component | Content Source | Needs Backend? | Needs Admin? | Why |
|---------|-----------|---------------|----------------|-------------|-----|
| Hero | `ReferenceHero` | `usePage("about") → content.hero` | YES | YES | Hero text + image |
| Company profile | `ExxonimApartSection` | `usePage("about") → content.company_profile` | YES | YES | Company description, values, stats — updates with company growth |
| Support profiles | Custom section | `usePage("about") → content.support_profiles` | YES | YES | Team member photos, names, roles, bios — changes with hires |
| Service scope | Custom section | `usePage("about") → content.service_scope` | YES | YES | Scope description, icons, items — evolves with service expansion |
| Operating model | `EngineSection` | `usePage("about") → content.operating_model` | YES | YES | Process steps, descriptions — refined over time |
| Client expectations | `HowItWorksSection` | `usePage("about") → content.client_expectations` | YES | YES | Expectation items — marketing copy that gets refined |
| CTA | `UnifiedCtaSection` | Static props | YES | YES | CTA text/links should be editable |

**Admin Needs for About Page:**
- Edit all hero text
- Manage company profile (description, stats counters, values)
- Manage team/support profiles (add/remove/reorder, photo upload, name, role, bio)
- Edit service scope items (icon, title, description)
- Edit operating model steps (icon, title, description)
- Edit client expectations
- Edit CTA section

---

### 3.3 Services Page (`/services`)

**Component:** `src/exxonim/pages/ServicesPage.tsx`

| Section | Component | Content Source | Needs Backend? | Needs Admin? | Why |
|---------|-----------|---------------|----------------|-------------|-----|
| Hero | `ReferenceHero` | `usePage("services") → content.hero` | YES | YES | Hero text |
| Service catalog | `ServiceCatalogSection` | `useServiceCatalog()` (Hono API ✅) | ✅ EXISTS | **YES** | Need admin UI for existing CRUD API |
| Segment filter | `SegmentFilterBar` | From service catalog | ✅ EXISTS | YES | Segments managed with services |
| Compliance calendar | `ComplianceCalendarSection` | **HARDCODED** (8 deadlines) | **YES** | YES | Deadlines change quarterly, must be managed without code deploy |
| Service plans | `ServicePlansSection` | `usePricingPlans()` | YES | YES | Pricing changes regularly |
| CTA | `UnifiedCtaSection` | Static props | YES | YES | CTA text/links |

**Admin Needs for Services Page:**
- **Service catalog admin UI** — CRUD already exists in Hono API, needs admin frontend
- **Compliance calendar management** — Add/edit/archive quarterly deadlines (currently 8 items hardcoded)
- **Service segment management** — Add/edit/reorder segments
- **Service category management** — Add/edit/reorder categories
- Edit hero text and CTA

**Compliance Calendar — Currently Hardcoded:**
```
Q1: Business License Renewal (Jan 31), TRA Monthly Returns (Jan 15)
Q2: TIN Filing Deadline (Apr 30), NEMC Compliance Report (Jun 30)
Q3: OSHA Certification Renewal (Aug 31), Tax Return Filing (Sep 30)
Q4: Annual Return Filing (Nov 30), BRELA Compliance (Dec 15)
```

---

### 3.4 Resources / Blog Page (`/resources`)

**Component:** `src/exxonim/pages/ResourcesPage.tsx`

| Section | Component | Content Source | Needs Backend? | Needs Admin? | Why |
|---------|-----------|---------------|----------------|-------------|-----|
| Hero + search | Custom hero | `usePage("resources") → content.hero_title` | YES | YES | Hero text, search bar labels |
| Quick-access cards | Custom cards | `usePage("resources") → content.top_media` | YES | YES | Featured/pinned articles |
| Trending reads | Custom section | `usePage("resources") → content.trending_label` | YES | YES | Trending label, article selection |
| Category filter + grid | Blog grid | `useBlogCategories()` + `useBlogPosts()` | YES | YES | Blog posts and categories managed regularly |
| Article sidebar | Custom | `usePage("resources") → content.article_sidebar` | YES | YES | Sidebar labels, CTA |
| Newsletter | `NewsletterForm` | **SIMULATED** | **YES — URGENT** | YES | Same as home page — emails go nowhere |
| CTA | `UnifiedCtaSection` | Static props | YES | YES | CTA text/links |

**Admin Needs for Resources/Blog:**
- **Blog post management** — Full CRUD with rich text editor
  - Title, slug, excerpt, featured image
  - Full article content (introduction, highlights, sections with headings + HTML body)
  - Category assignment
  - Author assignment
  - Related posts linking
  - Featured on homepage toggle
  - SEO fields (meta title, description, OG image)
  - Publish/draft/schedule workflow
- **Blog category management** — CRUD with name, slug, description
- **Blog author management** — CRUD with name, role, avatar upload, bio
- **Trending/featured article selection** — Pin articles to trending section
- **Quick-access card management** — Select and order featured articles
- Edit hero text, sidebar labels, empty state text

---

### 3.5 Resource Article / Blog Post Page (`/resources/:slug`)

**Component:** `src/exxonim/pages/ResourceArticlePage.tsx`

| Section | Component | Content Source | Needs Backend? | Needs Admin? | Why |
|---------|-----------|---------------|----------------|-------------|-----|
| Article header | Custom | `useBlogPost(slug)` | YES | YES | Title, date, category, author, cover image |
| Table of contents | `ReadingProgressBar` | From article content | YES | YES | Auto-generated from headings |
| Article body | Custom renderer | `useBlogPost(slug) → content` | YES | YES | Full HTML content |
| Author box | Custom | `useBlogPost(slug) → author` | YES | YES | Author name, role, avatar, bio |
| Related posts | Custom | `useBlogPost(slug) → relatedSlugs` | YES | YES | Related article links |
| Share buttons | Custom | Static (page URL) | NO | NO | Just shares current URL |
| Newsletter | `NewsletterForm` | **SIMULATED** | YES | YES | Same issue |
| CTA | `UnifiedCtaSection` | Static props | YES | YES | CTA text/links |

**Admin Needs for Article Page:**
- All blog post management (listed above)
- Author profile management with photo upload
- Related posts configuration
- Cover image upload and management

---

### 3.6 FAQ Page (`/faq`)

**Component:** `src/exxonim/pages/FaqPage.tsx`

| Section | Component | Content Source | Needs Backend? | Needs Admin? | Why |
|---------|-----------|---------------|----------------|-------------|-----|
| Hero | `ReferenceHero` | `usePage("faq") → content.hero` | YES | YES | Hero text |
| Search bar | Custom | Static | NO | NO | Just filters local items |
| FAQ accordion | Custom accordion | `usePage("faq") → content.items[]` | ✅ PARTIAL | YES | Questions are in Prisma DB but admin UI missing |
| Newsletter | `NewsletterForm` | **SIMULATED** | YES | YES | Same issue |

**Admin Needs for FAQ:**
- **FAQ item management** — CRUD already in DB, needs admin UI
  - Question, answer (rich text)
  - Category grouping
  - Sort order (drag-and-drop reorder)
  - Active/inactive toggle
- Edit hero text

---

### 3.7 Career Page (`/career`)

**Component:** `src/exxonim/pages/CareerPage.tsx`

| Section | Component | Content Source | Needs Backend? | Needs Admin? | Why |
|---------|-----------|---------------|----------------|-------------|-----|
| Hero + banner | Custom | `usePage("career") → content.hero` | YES | YES | Hero text + banner image |
| Focus areas | Custom grid | `usePage("career") → content.focus_areas[]` | YES | YES | Focus area items (icon, title, description) |
| Job listings | Custom cards | `getPublishedJobs()` | YES | YES | Jobs posted/updated regularly |
| Apply modal | Custom modal | Static form → **NO API** | **YES** | YES | Job applications go NOWHERE |
| Newsletter | `NewsletterForm` | **SIMULATED** | YES | YES | Same issue |

**Admin Needs for Career Page:**
- **Job listing management** — CRUD
  - Title, department, location, type (full-time/part-time/contract)
  - Description, requirements, responsibilities
  - Application deadline
  - Publish/draft/archive status
- **Job application management** — View received applications
  - Applicant name, email, phone, CV upload
  - Applied date, job title
  - Status (new, reviewing, shortlisted, rejected, hired)
- Edit focus areas (icon, title, description)
- Edit hero text and banner image

---

### 3.8 Contact Page (`/contact`)

**Component:** `src/exxonim/pages/ContactPage.tsx`

| Section | Component | Content Source | Needs Backend? | Needs Admin? | Why |
|---------|-----------|---------------|----------------|-------------|-----|
| Hero | `ReferenceHero` | `usePage("contact") → content.hero` | YES | YES | Hero text |
| Contact cards | Custom cards | `usePage("contact") → content.cards[]` + `usePublicShell() → company` | YES | YES | Phone, email, address, WhatsApp — changes |
| Consultation form | Custom form | `submitPublicConsultation()` | **YES — URGENT** | YES | Consultation submissions are currently MOCK — no real DB persistence |
| WhatsApp button | `WhatsAppButton` | `company.whatsapp` | YES | YES | WhatsApp number changes |

**Admin Needs for Contact Page:**
- **Consultation management** — View, assign, update status
  - Applicant name, email, phone, company
  - Service type, message
  - Tracking code (auto-generated)
  - Status (received, in-review, accepted, in-progress, completed)
  - Internal notes, assigned admin
- Edit contact cards (phone numbers, emails, addresses, WhatsApp)
- Edit hero text

---

### 3.9 Track Consultation Page (`/track-consultation`)

**Component:** `src/exxonim/pages/TrackConsultationPage.tsx`

| Section | Component | Content Source | Needs Backend? | Needs Admin? | Why |
|---------|-----------|---------------|----------------|-------------|-----|
| Hero | Custom | Static text | YES | YES | Hero text |
| Tracking form | Custom form | `lookupTrackingCode()` | **YES — URGENT** | YES | Currently returns 4 MOCK cases — no real data |
| Results card | Custom milestone view | From tracking lookup | YES | YES | Milestones should be real |
| Demo codes | Custom | Hardcoded | YES | YES | Demo should be manageable |

**Admin Needs for Tracking:**
- **Consultation case management** — Full lifecycle
  - Status milestones (received → reviewing → accepted → in-progress → completed)
  - Internal notes per milestone
  - Document attachments
  - Communication thread (admin ↔ client)
  - Timeline view
- Tracking code generation and lookup

---

### 3.10 Info Pages (`/support`, `/terms`, `/privacy`, `/cookies`, `/data-rights`)

**Component:** `src/exxonim/pages/InfoPages.tsx` (shared template)

All 5 pages use the same layout: eyebrow → title → description → content sections → next step CTA.

| Section | Content Source | Needs Backend? | Needs Admin? | Why |
|---------|---------------|----------------|-------------|-----|
| Hero text | `usePage(slug) → content.hero` | YES | YES | Titles, descriptions change |
| Content sections | `usePage(slug) → content.sections[]` | YES | YES | Legal text updates, support info changes |
| Next step CTA | `usePage(slug) → content.next_step` | YES | YES | CTA link and text |

**Admin Needs for Info Pages:**
- **Page content management** — Rich text editor for each section
  - Section title, body (HTML)
  - Section ordering
  - Next step CTA configuration
- **Legal pages** especially need versioning (terms, privacy updates)

---

## 4. Component-by-Component Data Needs

### Shell Components (Every Page)

| Component | Data It Shows | Backend Needed | Admin Needed | Details |
|-----------|-------------|----------------|-------------|---------|
| `Navigation` | Logo, menu items, phone CTA, theme toggle | YES | YES | Logo images, phone number, menu structure all need editing |
| `Footer` | Links, tagline, copyright, social, contact | YES | YES | Footer content changes (new social links, updated tagline) |
| `WhatsAppButton` | WhatsApp URL | YES | YES | Number changes |
| `PrivacyConsentBanner` | Cookie consent state | ✅ EXISTS | NO | Already has API |
| `ScrollToTopButton` | Just a button | NO | NO | Static |
| `ShellStatusNotice` | Status banner | NO | MAYBE | Could be admin-controlled for maintenance mode |

### Shared Components

| Component | Data It Shows | Backend Needed | Admin Needed | Details |
|-----------|-------------|----------------|-------------|---------|
| `Breadcrumb` | Page hierarchy | NO | NO | Auto-generated from route |
| `NewsletterForm` | Email input + submit | **YES — URGENT** | YES | No API exists — submissions are LOST |
| `UnifiedCtaSection` | CTA with eyebrow/heading/desc | YES | YES | Text and links should be editable |
| `ComplianceCalendarSection` | 8 compliance deadlines | **YES** | YES | Hardcoded in component, must be editable |
| `ReadingProgressBar` | Scroll progress | NO | NO | Just visual |
| `CardDeckCarousel` | Carousel layout | NO | NO | Just layout wrapper |
| `StickyMobileCta` | Sticky call button | NO | NO | Uses Navigation's phone number |
| `StructuredData` | JSON-LD for SEO | YES | YES | Should reflect actual page content dynamically |

---

## 5. What Already Has a Backend

### ✅ Fully Working (Database + API + Frontend)

| Feature | API | Database | Admin UI |
|---------|-----|----------|----------|
| FAQ items | Next.js route → Prisma | `FaqItem` table | ❌ None |
| Service catalog | Hono API (port 3031) → Prisma | `Service`, `ServiceCategory`, `ServiceSegment`, `ServiceToSegment` | ❌ None |

### ✅ API Exists But Returns Mock/Fallback Data

| Feature | API Route | What It Returns | Database? |
|---------|----------|----------------|-----------|
| Page content | `GET /api/v1/pages/{slug}` | Hardcoded JSON from fallback | ❌ No |
| Blog posts | `GET /api/v1/blog/posts` | Hardcoded 16 posts | ❌ No |
| Blog single | `GET /api/v1/blog/posts/{slug}` | Hardcoded single post | ❌ No |
| Blog categories | `GET /api/v1/blog/categories` | Hardcoded 5 categories | ❌ No |
| Testimonials | `GET /api/v1/testimonials` | Empty `[]` | ❌ No |
| Pricing plans | `GET /api/v1/pricing/plans` | Empty | ❌ No |
| Jobs | `GET /api/v1/jobs` | Hardcoded 6 jobs | ❌ No |
| Site settings | `GET /api/v1/site-settings/{key}` | Hardcoded brand/company/footer | ❌ No |
| Navigation | `GET /api/v1/navigation` | Empty `[]` (using static file) | ❌ No |
| Google reviews | `GET /api/v1/google-reviews` | ZAI web search SDK (not real) | ❌ No |
| Consultation submit | `POST /api/v1/consultations` | Mock tracking code | ❌ No |
| Track lookup | `POST /api/v1/track` | 4 hardcoded cases | ❌ No |
| Privacy consent | `GET/POST /api/v1/privacy/consent` | Cookie-based | ⚠️ Partial |

---

## 6. What Is Missing a Backend

### ❌ No API At All

| Feature | Impact | Priority |
|---------|--------|----------|
| **Newsletter subscription** | Email addresses submitted by visitors go NOWHERE — data is lost | **CRITICAL** |
| **Job application submission** | Applicants fill forms but data disappears | **CRITICAL** |
| **Compliance calendar** | 8 deadlines hardcoded in React component — requires code deploy to update | **HIGH** |
| **Blog author profiles** | Author info (name, role, avatar, bio) embedded in blog post fallbacks | **MEDIUM** |

### ❌ API Returns Mock Data (No Real Database)

| Feature | What's Mocked | Priority |
|---------|-------------|----------|
| **Consultation submission** | Returns fake tracking code, nothing saved to DB | **CRITICAL** |
| **Consultation tracking** | 4 hardcoded demo cases only | **CRITICAL** |
| **All page content** | 13 pages of content from TypeScript fallback | **HIGH** |
| **Blog posts** | 16 full articles from TypeScript fallback | **HIGH** |
| **Testimonials** | API returns empty, frontend shows 8 fallback testimonials | **HIGH** |
| **Pricing plans** | API returns empty, frontend shows 3 fallback plans | **HIGH** |
| **Job listings** | 6 jobs from TypeScript fallback | **HIGH** |
| **Site settings** | Brand/company/footer from TypeScript fallback | **HIGH** |
| **Google reviews** | Uses web search SDK, not real Google Business API | **MEDIUM** |
| **Navigation** | Static TypeScript file, API returns empty | **LOW** |

---

## 7. Admin Panel Entities Required

### Tier 1 — Core Content Management (MUST HAVE)

| # | Entity | Description | Fields | Key Workflows |
|---|--------|-------------|--------|--------------|
| 1 | **Blog Posts** | Article management | title, slug, excerpt, content (HTML), cover_image, category_id, author_id, featured, related_slugs, meta_title, meta_description, published_at, status | Draft → Review → Publish → Archive |
| 2 | **Blog Categories** | Topic categories | name, slug, description, sort_order | CRUD |
| 3 | **Blog Authors** | Article writers | name, role, avatar_url, bio, social_links | CRUD |
| 4 | **Pages** | All site page content | title, slug, content (JSON), meta_title, meta_description, status | Draft → Review → Publish |
| 5 | **Testimonials** | Client testimonials | eyebrow, quote, name, role, initials, avatar_url | Draft → Approve → Publish |
| 6 | **Pricing Plans** | Service packages | name, badge, description, notes, recommended, features[], sort_order | Draft → Publish |
| 7 | **Jobs** | Career listings | title, department, location, type, description, requirements[], responsibilities[], deadline, status | Draft → Publish → Close → Archive |

### Tier 2 — Operations & Communication (HIGH PRIORITY)

| # | Entity | Description | Fields | Key Workflows |
|---|--------|-------------|--------|--------------|
| 8 | **Consultations** | Client service requests | tracking_code, name, email, phone, company, service_type, message, status, assigned_to, notes[], documents[] | Received → Reviewing → Accepted → In Progress → Completed |
| 9 | **Job Applications** | Career applicants | job_id, name, email, phone, cv_url, cover_letter, status | New → Reviewing → Shortlisted → Interview → Hired/Rejected |
| 10 | **Newsletter Subscribers** | Email list | email, source_page, subscribed_at, status, unsubscribed_at | Subscribe → Active → Unsubscribed |
| 11 | **Compliance Deadlines** | Regulatory calendar | title, description, due_date, quarter, category, status | Draft → Active → Expired |
| 12 | **Service Requests** | Extended consultation tracking | Same as consultations + milestones[], thread[], assignments | Full case management |

### Tier 3 — Site Configuration (MEDIUM PRIORITY)

| # | Entity | Description | Fields | Key Workflows |
|---|--------|-------------|--------|--------------|
| 13 | **Site Settings** | Brand, company, footer | key, value (JSON), updated_by | Edit → Save |
| 14 | **Navigation** | Menu structure | label, url, kind, parent_id, sort_order, is_active | Edit → Publish |
| 15 | **FAQ Items** | Questions & answers | question, answer (HTML), category, sort_order, is_active | CRUD (DB exists, needs admin UI) |
| 16 | **Service Catalog** | Services CRUD | (already in Hono API) | CRUD (API exists, needs admin UI) |
| 17 | **Media Library** | File management | file_url, alt_text, type, size, uploaded_by, folder | Upload → Organize → Use |

### Tier 4 — System & Analytics (LOWER PRIORITY)

| # | Entity | Description | Fields | Key Workflows |
|---|--------|-------------|--------|--------------|
| 18 | **Admin Users** | Staff accounts | email, name, role, avatar, last_login | Invite → Activate → Suspend |
| 19 | **Roles & Permissions** | Access control | name, permissions[] | CRUD |
| 20 | **Notifications** | In-app alerts | user_id, type, title, message, read, link | Auto-generate → Read → Dismiss |
| 21 | **Activity Log** | Audit trail | user_id, action, entity_type, entity_id, changes, timestamp | Auto-generated |
| 22 | **Dashboard Metrics** | Site analytics | (aggregated from other entities) | Auto-calculated |
| 23 | **Privacy Requests** | Data subject rights | type, email, status, notes | Received → Processing → Completed |
| 24 | **SEO Defaults** | Meta tag templates | page_type, title_template, description_template | Edit → Save |

---

## 8. Database Schema Needed

### Existing Tables (Keep)
```sql
User        -- id, email, name
Post        -- id, title, content, published, authorId (unused scaffold)
FaqItem     -- id, question, answer, category, sort_order, is_active ✅
ServiceCategory -- id, name, slug, sort_order ✅
ServiceSegment  -- id, name, slug, sortOrder ✅
Service         -- id, title, slug, categoryId, badge, shortDescription, 
                   deliverables, deliverablesFull, ctaText, ctaLink, status, sortOrder ✅
ServiceToSegment -- junction table ✅
```

### New Tables Needed

```sql
-- ═══════════════════════════════════════
-- TIER 1: Core Content Management
-- ═══════════════════════════════════════

BlogAuthor
  id            Int       @id @default(autoincrement())
  name          String
  slug          String    @unique
  role          String?   -- "Managing Director", "Compliance Officer", etc.
  avatarUrl     String?
  bio           String?   -- Rich text/HTML
  socialLinks   Json?     -- { twitter?, linkedin? }
  isActive      Boolean   @default(true)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

BlogCategory
  id            Int       @id @default(autoincrement())
  name          String
  slug          String    @unique
  description   String?
  color         String?   -- Accent color hex
  sortOrder     Int       @default(0)
  isActive      Boolean   @default(true)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

BlogPost
  id            Int       @id @default(autoincrement())
  title         String
  slug          String    @unique
  excerpt       String?   -- Short summary for cards
  content       String    -- Full HTML article body
  coverImage    String?   -- URL to cover image
  categoryId    Int?      @map("category_id")
  authorId      Int?      @map("author_id")
  featured      Boolean   @default(false)  -- Show on homepage
  relatedSlugs  Json?     -- ["slug1", "slug2"]
  metaTitle     String?
  metaDescription String?
  ogImage       String?
  status        PostStatus @default(DRAFT)
  publishedAt   DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  category      BlogCategory? @relation(fields: [categoryId], references: [id])
  author        BlogAuthor?  @relation(fields: [authorId], references: [id])

enum PostStatus {
  DRAFT
  IN_REVIEW
  PUBLISHED
  ARCHIVED
}

Page
  id            Int       @id @default(autoincrement())
  title         String
  slug          String    @unique  -- "home", "about", "services", etc.
  content       Json      -- { hero: {...}, sections: [...], ... }
  metaTitle     String?
  metaDescription String?
  status        PageStatus @default(DRAFT)
  publishedAt   DateTime?
  createdBy     Int?
  updatedBy     Int?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

enum PageStatus {
  DRAFT
  IN_REVIEW
  PUBLISHED
}

Testimonial
  id            Int       @id @default(autoincrement())
  eyebrow       String?   -- "Business Registration"
  quote         String    -- The testimonial text
  name          String    -- Person's name
  role          String    -- "CEO, TechCo"
  initials      String?   -- "AB" (fallback if no avatar)
  avatarUrl     String?
  status        TestimonialStatus @default(PENDING)
  sortOrder     Int       @default(0)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

enum TestimonialStatus {
  PENDING
  APPROVED
  REJECTED
  ARCHIVED
}

PricingPlan
  id            Int       @id @default(autoincrement())
  name          String    -- "Starter", "Growth", "Premium"
  badge         String?   -- "Most Popular"
  description   String
  notes         String?   -- "Starting from..."
  recommended   Boolean   @default(false)
  features      Json      -- ["Feature 1", "Feature 2", ...]
  sortOrder     Int       @default(0)
  isActive      Boolean   @default(true)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

Job
  id            Int       @id @default(autoincrement())
  title         String    -- "Senior Compliance Officer"
  department    String?   -- "Compliance"
  location      String?   -- "Dar es Salaam"
  type          JobType   @default(FULL_TIME)  -- full-time, part-time, contract
  description   String    -- HTML
  requirements  Json      -- ["Requirement 1", ...]
  responsibilities Json   -- ["Responsibility 1", ...]
  deadline      DateTime?
  status        JobStatus @default(DRAFT)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

enum JobType {
  FULL_TIME
  PART_TIME
  CONTRACT
  INTERNSHIP
}

enum JobStatus {
  DRAFT
  PUBLISHED
  CLOSED
  ARCHIVED
}

-- ═══════════════════════════════════════
-- TIER 2: Operations & Communication
-- ═══════════════════════════════════════

Consultation
  id            Int       @id @default(autoincrement())
  trackingCode  String    @unique  -- Auto-generated "EXC-XXXXX"
  name          String
  email         String
  phone         String?
  company       String?
  serviceType   String?   -- "Company Registration", etc.
  message       String?
  status        ConsultationStatus @default(RECEIVED)
  assignedTo    Int?      -- Admin user ID
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  milestones    ConsultationMilestone[]
  notes         ConsultationNote[]
  documents     ConsultationDocument[]

enum ConsultationStatus {
  RECEIVED
  REVIEWING
  ACCEPTED
  IN_PROGRESS
  COMPLETED
  CANCELLED
}

ConsultationMilestone
  id              Int       @id @default(autoincrement())
  consultationId  Int
  status          ConsultationStatus
  note            String?
  completedAt     DateTime  @default(now())

ConsultationNote
  id              Int       @id @default(autoincrement())
  consultationId  Int
  authorId        Int?      -- Admin user
  content         String
  isInternal      Boolean   @default(true)  -- True = admin only
  createdAt       DateTime  @default(now())

ConsultationDocument
  id              Int       @id @default(autoincrement())
  consultationId  Int
  fileName        String
  fileUrl         String
  fileSize        Int?
  uploadedBy      Int?      -- Admin user
  createdAt       DateTime  @default(now())

JobApplication
  id            Int       @id @default(autoincrement())
  jobId         Int
  name          String
  email         String
  phone         String?
  cvUrl         String?   -- Uploaded CV
  coverLetter   String?
  status        ApplicationStatus @default(NEW)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  job           Job       @relation(fields: [jobId], references: [id])

enum ApplicationStatus {
  NEW
  REVIEWING
  SHORTLISTED
  INTERVIEW
  OFFERED
  HIRED
  REJECTED
}

NewsletterSubscriber
  id            Int       @id @default(autoincrement())
  email         String    @unique
  sourcePage    String?   -- Which page they subscribed from
  status        SubscriberStatus @default(ACTIVE)
  subscribedAt  DateTime  @default(now())
  unsubscribedAt DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

enum SubscriberStatus {
  ACTIVE
  UNSUBSCRIBED
  BOUNCED
}

ComplianceDeadline
  id            Int       @id @default(autoincrement())
  title         String    -- "Business License Renewal"
  description   String?
  dueDate       DateTime
  quarter       Int       -- 1, 2, 3, 4
  category      String?   -- "Registration", "Tax", "Compliance"
  isActive      Boolean   @default(true)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

-- ═══════════════════════════════════════
-- TIER 3: Site Configuration
-- ═══════════════════════════════════════

SiteSetting
  id            Int       @id @default(autoincrement())
  key           String    @unique  -- "brand", "company_info", "footer", "seo"
  value         Json      -- Arbitrary JSON value
  updatedBy     Int?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

NavigationItem
  id            Int       @id @default(autoincrement())
  label         String
  url           String
  kind          NavItemKind @default(PRIMARY)  -- primary, group, secondary, highlight
  parentId      Int?      @map("parent_id")
  sortOrder     Int       @default(0)
  isActive      Boolean   @default(true)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  parent        NavigationItem?  @relation("NavChildren", fields: [parentId], references: [id])
  children      NavigationItem[] @relation("NavChildren")

enum NavItemKind {
  PRIMARY
  GROUP
  SECONDARY
  HIGHLIGHT
}

MediaFile
  id            Int       @id @default(autoincrement())
  fileName      String
  filePath      String    -- Storage path/URL
  fileType      String    -- "image/png", "application/pdf"
  fileSize      Int
  altText       String?
  folder        String?   -- "blog", "team", "branding"
  uploadedBy    Int?
  createdAt     DateTime  @default(now())

-- ═══════════════════════════════════════
-- TIER 4: System & Analytics
-- ═══════════════════════════════════════

AdminUser
  id            Int       @id @default(autoincrement())
  email         String    @unique
  name          String
  passwordHash  String
  role          AdminRole @default(EDITOR)
  avatarUrl     String?
  isActive      Boolean   @default(true)
  lastLoginAt   DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

enum AdminRole {
  SUPER_ADMIN
  ADMIN
  EDITOR
  VIEWER
}

Notification
  id            Int       @id @default(autoincrement())
  userId        Int       -- AdminUser ID
  type          String    -- "consultation.new", "job_application", etc.
  title         String
  message       String
  link          String?   -- URL to relevant admin page
  isRead        Boolean   @default(false)
  createdAt     DateTime  @default(now())

ActivityLog
  id            Int       @id @default(autoincrement())
  userId        Int?
  action        String    -- "blog.post.published", "consultation.status_changed"
  entityType    String    -- "BlogPost", "Consultation", etc.
  entityId      Int?
  changes       Json?     -- { field: { old, new } }
  ipAddress     String?
  createdAt     DateTime  @default(now())

PrivacyRequest
  id            Int       @id @default(autoincrement())
  type          PrivacyRequestType
  email         String
  status        PrivacyRequestStatus @default(RECEIVED)
  notes         String?
  completedAt   DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

enum PrivacyRequestType {
  ACCESS
  DELETION
  CORRECTION
  PORTABILITY
  OBJECTION
}

enum PrivacyRequestStatus {
  RECEIVED
  PROCESSING
  COMPLETED
  DENIED
}

GoogleReview
  id            Int       @id @default(autoincrement())
  author        String
  rating        Int       -- 1-5
  text          String?
  date          DateTime
  source        String    @default("google")
  createdAt     DateTime  @default(now())
```

---

## 9. API Endpoints to Build

### Public API Endpoints

#### Blog
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/v1/blog/posts` | List published posts (paginated, filterable by category) | No |
| GET | `/api/v1/blog/posts/:slug` | Get single published post by slug | No |
| GET | `/api/v1/blog/categories` | List all active categories | No |
| GET | `/api/v1/blog/authors` | List all active authors | No |

#### Pages
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/v1/pages/:slug` | Get published page content | No |

#### Consultations
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/v1/consultations` | Submit new consultation request | No |
| POST | `/api/v1/track` | Lookup consultation by tracking code | No |

#### Jobs
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/v1/jobs` | List published jobs | No |
| POST | `/api/v1/jobs/:id/apply` | Submit job application (with CV upload) | No |

#### Testimonials
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/v1/testimonials` | List approved testimonials | No |

#### Pricing
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/v1/pricing/plans` | List active pricing plans | No |

#### FAQ
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/v1/faq` | List active FAQ items | No |

#### Compliance
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/v1/compliance/deadlines` | List active compliance deadlines | No |

#### Newsletter
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/v1/newsletter/subscribe` | Subscribe email | No |

#### Site Settings
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/v1/site-settings/brand` | Get brand assets | No |
| GET | `/api/v1/site-settings/company_info` | Get company info | No |
| GET | `/api/v1/site-settings/footer` | Get footer content | No |
| GET | `/api/v1/site-settings/navigation` | Get navigation tree | No |

#### Services (Already Exists)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/services` | List services | No |
| GET | `/api/services/:slug` | Get service by slug | No |
| GET | `/api/categories` | List service categories | No |
| GET | `/api/segments` | List service segments | No |

### Admin API Endpoints

#### Authentication
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/admin/auth/login` | Login (email + password) | No |
| POST | `/api/admin/auth/refresh` | Refresh JWT token | Token |
| POST | `/api/admin/auth/logout` | Invalidate session | Token |
| GET | `/api/admin/auth/me` | Get current user profile | Token |

#### Blog Management
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/admin/blog/posts` | List all posts (including drafts) | Editor+ |
| POST | `/api/admin/blog/posts` | Create new post | Editor+ |
| GET | `/api/admin/blog/posts/:id` | Get post (any status) | Editor+ |
| PUT | `/api/admin/blog/posts/:id` | Update post | Editor+ |
| DELETE | `/api/admin/blog/posts/:id` | Archive post | Admin+ |
| POST | `/api/admin/blog/posts/:id/publish` | Publish post | Editor+ |
| POST | `/api/admin/blog/posts/:id/unpublish` | Revert to draft | Editor+ |
| GET | `/api/admin/blog/categories` | List categories | Editor+ |
| POST | `/api/admin/blog/categories` | Create category | Editor+ |
| PUT | `/api/admin/blog/categories/:id` | Update category | Editor+ |
| DELETE | `/api/admin/blog/categories/:id` | Delete category | Admin+ |
| GET | `/api/admin/blog/authors` | List authors | Editor+ |
| POST | `/api/admin/blog/authors` | Create author | Editor+ |
| PUT | `/api/admin/blog/authors/:id` | Update author | Editor+ |
| DELETE | `/api/admin/blog/authors/:id` | Delete author | Admin+ |

#### Page Management
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/admin/pages` | List all pages | Editor+ |
| POST | `/api/admin/pages` | Create page | Editor+ |
| GET | `/api/admin/pages/:id` | Get page (any status) | Editor+ |
| PUT | `/api/admin/pages/:id` | Update page content | Editor+ |
| POST | `/api/admin/pages/:id/publish` | Publish page | Admin+ |

#### Consultation Management
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/admin/consultations` | List consultations (filterable) | Editor+ |
| GET | `/api/admin/consultations/:id` | Get consultation detail | Editor+ |
| PUT | `/api/admin/consultations/:id/status` | Update status | Editor+ |
| PUT | `/api/admin/consultations/:id/assign` | Assign to admin | Admin+ |
| POST | `/api/admin/consultations/:id/notes` | Add internal note | Editor+ |
| POST | `/api/admin/consultations/:id/documents` | Upload document | Editor+ |
| GET | `/api/admin/consultations/:id/timeline` | Get status timeline | Editor+ |

#### Job Management
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/admin/jobs` | List all jobs | Editor+ |
| POST | `/api/admin/jobs` | Create job | Editor+ |
| GET | `/api/admin/jobs/:id` | Get job detail | Editor+ |
| PUT | `/api/admin/jobs/:id` | Update job | Editor+ |
| DELETE | `/api/admin/jobs/:id` | Archive job | Admin+ |
| GET | `/api/admin/jobs/:id/applications` | List applications | Editor+ |
| GET | `/api/admin/applications/:id` | Get application detail | Editor+ |
| PUT | `/api/admin/applications/:id/status` | Update application status | Editor+ |

#### Testimonial Management
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/admin/testimonials` | List all testimonials | Editor+ |
| POST | `/api/admin/testimonials` | Create testimonial | Editor+ |
| PUT | `/api/admin/testimonials/:id` | Update testimonial | Editor+ |
| DELETE | `/api/admin/testimonials/:id` | Archive testimonial | Admin+ |
| POST | `/api/admin/testimonials/:id/approve` | Approve testimonial | Admin+ |
| POST | `/api/admin/testimonials/:id/reject` | Reject testimonial | Admin+ |

#### Pricing Management
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/admin/pricing/plans` | List all plans | Editor+ |
| POST | `/api/admin/pricing/plans` | Create plan | Editor+ |
| PUT | `/api/admin/pricing/plans/:id` | Update plan | Editor+ |
| DELETE | `/api/admin/pricing/plans/:id` | Delete plan | Admin+ |

#### Newsletter Management
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/admin/newsletter/subscribers` | List subscribers | Editor+ |
| DELETE | `/api/admin/newsletter/subscribers/:id` | Remove subscriber | Admin+ |
| POST | `/api/admin/newsletter/broadcast` | Send newsletter email | Admin+ |

#### Compliance Calendar Management
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/admin/compliance/deadlines` | List all deadlines | Editor+ |
| POST | `/api/admin/compliance/deadlines` | Create deadline | Editor+ |
| PUT | `/api/admin/compliance/deadlines/:id` | Update deadline | Editor+ |
| DELETE | `/api/admin/compliance/deadlines/:id` | Archive deadline | Admin+ |

#### Site Settings Management
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/admin/site-settings` | List all settings | Editor+ |
| PUT | `/api/admin/site-settings/:key` | Update setting | Admin+ |
| GET | `/api/admin/navigation` | Get navigation tree | Editor+ |
| PUT | `/api/admin/navigation` | Update navigation tree | Admin+ |

#### Service Catalog Management (Partially Exists)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/admin/services` | Create service | ✅ Exists |
| PUT | `/api/admin/services/:id` | Update service | ✅ Exists |
| DELETE | `/api/admin/services/:id` | Archive service | ✅ Exists |
| POST | `/api/admin/categories` | Create category | Needs building |
| PUT | `/api/admin/categories/:id` | Update category | Needs building |
| POST | `/api/admin/segments` | Create segment | Needs building |
| PUT | `/api/admin/segments/:id` | Update segment | Needs building |

#### Media Management
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/admin/media` | List media files | Editor+ |
| POST | `/api/admin/media/upload` | Upload file(s) | Editor+ |
| DELETE | `/api/admin/media/:id` | Delete file | Admin+ |

#### User Management
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/admin/users` | List admin users | Super Admin |
| POST | `/api/admin/users` | Invite admin user | Super Admin |
| PUT | `/api/admin/users/:id` | Update user | Super Admin |
| DELETE | `/api/admin/users/:id` | Suspend user | Super Admin |

#### Dashboard & Reports
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/admin/dashboard` | Summary metrics | Editor+ |
| GET | `/api/admin/reports/consultations` | Consultation report | Admin+ |
| GET | `/api/admin/reports/activity` | Activity log | Admin+ |

#### Notifications
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/admin/notifications` | List user notifications | Token |
| PUT | `/api/admin/notifications/:id/read` | Mark as read | Token |
| PUT | `/api/admin/notifications/read-all` | Mark all as read | Token |

#### Privacy Requests
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/admin/privacy-requests` | List requests | Admin+ |
| PUT | `/api/admin/privacy-requests/:id` | Update request | Admin+ |

---

## 10. Priority Matrix

### Phase 1 — Critical (Data Loss Risk)
These features are currently losing data — visitor submissions go nowhere.

| # | Feature | Impact | Effort |
|---|---------|--------|--------|
| 1 | Newsletter subscription API + DB | Emails submitted are LOST | Small |
| 2 | Consultation submission to real DB | Tracking codes are fake | Medium |
| 3 | Consultation tracking from real DB | 4 hardcoded mock cases | Medium |
| 4 | Job application submission + DB | Applications are LOST | Medium |

### Phase 2 — High (Content Management)
These are needed so non-technical staff can update the site.

| # | Feature | Impact | Effort |
|---|---------|--------|--------|
| 5 | Blog post CRUD + admin UI | 16 articles hardcoded | Large |
| 6 | Blog category CRUD + admin UI | 5 categories hardcoded | Medium |
| 7 | Blog author CRUD + admin UI | Author data in fallbacks | Medium |
| 8 | Page content CRUD + admin UI | 13 pages hardcoded | Large |
| 9 | Testimonial CRUD + admin UI | 8 testimonials hardcoded | Medium |
| 10 | Pricing plan CRUD + admin UI | 3 plans hardcoded | Medium |
| 11 | Job listing CRUD + admin UI | 6 jobs hardcoded | Medium |
| 12 | Site settings CRUD + admin UI | Brand/company/footer hardcoded | Medium |
| 13 | Admin authentication | No admin panel access control | Large |

### Phase 3 — Medium (Configuration)
These allow fine-tuning the site without code changes.

| # | Feature | Impact | Effort |
|---|---------|--------|--------|
| 14 | Compliance calendar CRUD + API | 8 deadlines hardcoded | Small |
| 15 | FAQ admin UI | DB exists, no UI | Small |
| 16 | Service catalog admin UI | API exists, no UI | Medium |
| 17 | Navigation CRUD + admin UI | Static TypeScript file | Medium |
| 18 | Media library + upload | No file management | Medium |
| 19 | Google reviews storage | Uses web search SDK | Small |

### Phase 4 — Lower (System & Analytics)
These improve operations but aren't blocking content management.

| # | Feature | Impact | Effort |
|---|---------|--------|--------|
| 20 | Admin user management | Multi-admin support | Medium |
| 21 | Roles & permissions | Access control granularity | Medium |
| 22 | In-app notifications | Real-time awareness | Medium |
| 23 | Activity/audit log | Change tracking | Medium |
| 24 | Dashboard metrics | At-a-glance status | Medium |
| 25 | Privacy request management | GDPR compliance | Medium |
| 26 | Reports | Analytics | Large |

---

## 11. Appendix: Full Navigation Structure

### Desktop Navigation
```
┌──────────────────────────────────────────────────────────────────────────────┐
│ [Logo]   Home | About | [Services ▼] | [Resources ▼] | Career | Contact  │
│                                                              [📞 Call] [🌓] │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Services Dropdown (Split Layout — 50/50)
```
┌─────────────────────────┬──────────────────────────┐
│ Registration & Setup    │ Compliance & Operations   │
│  ├ Entity Registration  │  ├ Statutory Filings      │
│  ├ Tax & Licensing      │  ├ Regulatory Renewals    │
│  └ Work Permits         │  └ Operational Advisory  │
└─────────────────────────┴──────────────────────────┘
```

### Resources Dropdown (Feature Layout — 60/40)
```
┌─────────────────────────┬──────────────────────────┐
│ Learn                   │ ┌──────────────────────┐ │
│  ├ Blog                 │ │ Latest insights      │ │
│  ├ FAQ                  │ │ Practical compliance │ │
│ Get Help                │ │ updates...           │ │
│  ├ Support              │ │ [Browse resources]   │ │
│  └ Contact Us           │ └──────────────────────┘ │
│                         │ Browse Resources | Ask Q  │
└─────────────────────────┴──────────────────────────┘
```

### Highlight Link
- **Track Consultation** — accent pill + animated dot

### Footer Navigation
```
Navigation              Resources & Legal         Contact Us
├ About                 ├ Resources               ├ Address
├ Services              ├ FAQ                     ├ info@exxonim.tz
├ Track Consultation    ├ Support                 ├ md@exxonim.tz
├ Careers               ├ Privacy Policy          ├ +255 794 689 099
└ Contact               └ Terms of Service        └ +255 685 525 224

Social: X | LinkedIn | Instagram
© 2025 Exxonim Company Limited
"Where Innovation Meets Efficiency"
```

---

## Summary Count

| Category | Count |
|----------|-------|
| Total pages/routes | 17 |
| Total components | 40+ |
| Current DB tables | 7 |
| New DB tables needed | 20+ |
| Public API endpoints needed | 20+ |
| Admin API endpoints needed | 60+ |
| Admin entity types | 17 |
| Currently hardcoded content files | 4 (~133KB) |
| **Features losing data** | **3** (newsletter, consultation, job applications) |

---

*This report should be used as the blueprint for building the backend API and admin panel. Start with Phase 1 to stop data loss, then Phase 2 to enable content management.*
