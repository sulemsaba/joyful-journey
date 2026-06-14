# Exxonim API Design Document

Backend: **FastAPI + PostgreSQL**
Frontend: **React (Vite SPA)**
Date: 2025-06-13

---

## Overview

This document maps every piece of the Exxonim website to its data source. It tells the FastAPI team exactly what endpoints to build, what data shapes to return, and what's already in place vs. what's missing.

### Key Principles

- Every response includes a `success: boolean` field
- All lists are paginated with `{success, data: {items, total, page, per_page}}`
- Fallback data lives in `src/exxonim/content/fallbackPublicContent.ts` — the frontend never breaks if the API is down
- The frontend uses **service layers** (`src/exxonim/services/`) that handle caching, retries, and fallbacks
- All public endpoints are under `/api/v1/`

---

## 1. ENDPOINTS ALREADY IN PLACE (frontend services exist)

These endpoints have working frontend service layers. The FastAPI backend must implement them to match the expected response shapes.

### 1.1 Pages — `GET /api/v1/pages/{slug}`

**Frontend service:** `src/exxonim/services/pageService.ts`
**Frontend hook:** `usePage<T>(slug)`

Returns a generic page record. The `content` field shape depends on the slug.

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Home",
    "slug": "home",
    "content": { ... },       // shape varies by slug (see below)
    "meta_title": "...",
    "meta_description": "...",
    "og_image_url": "...",
    "is_published": true
  }
}
```

**Page slug → content shapes:**

| Slug | Content Type | Key Fields |
|------|-------------|------------|
| `home` | `HomePageContent` | overview (hero), provider_section, stack_section, insights_section |
| `about` | `AboutPageContent` | hero, company_profile, support_profiles, service_scope, operating_model, client_expectations, cta |
| `services` | `ServicesPageContent` | overview (eyebrow, title, description, service_nav_groups) |
| `resources` | `ResourcesPageContent` | hero_title, trending_label, top_media, article_sidebar, empty_state |
| `career` | `CareerPageContent` | hero (eyebrow, title, description, banner_image), focus_areas[], status |
| `contact` | `ContactPageContent` | hero, cards[] |
| `faq` | `FaqPageContent` | hero, items[] (question, answer) |
| `support` | `InfoPageContent` | hero, sections[], next_step |
| `terms` | `InfoPageContent` | hero, sections[], next_step |
| `privacy` | `InfoPageContent` | hero, sections[], next_step |
| `cookies` | `InfoPageContent` | hero, sections[], next_step |
| `data-rights` | `InfoPageContent` | hero, sections[], next_step |

### 1.2 Blog Posts — `GET /api/v1/blog/posts`

**Frontend service:** `src/exxonim/services/blogService.ts`
**Frontend hooks:** `useBlogPosts()`, `useBlogPost(slug)`

```json
// GET /api/v1/blog/posts
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 1,
        "title": "How to Register a Company in Tanzania",
        "slug": "how-to-register-company-tanzania",
        "excerpt": "...",
        "cover_image_url": "/images/blog/...",
        "category": { "id": 1, "name": "Registration", "slug": "registration" },
        "author": { "id": 1, "name": "Exxonim Team", "avatar_url": "..." },
        "published_at": "2025-01-15T10:00:00Z",
        "featured_on_home": true,
        "tags": ["brela", "registration"],
        "reading_time_minutes": 5
      }
    ],
    "total": 16,
    "page": 1,
    "per_page": 20
  }
}

// GET /api/v1/blog/posts/{slug}
{
  "success": true,
  "data": {
    "id": 1,
    "title": "...",
    "slug": "...",
    "html_content": "<h2>...</h2><p>...</p>",
    "cover_image_url": "...",
    "category": { ... },
    "author": { ... },
    "published_at": "...",
    "related_slugs": ["slug-2", "slug-3"],
    "tags": [...],
    "meta_title": "...",
    "meta_description": "..."
  }
}

// GET /api/v1/blog/categories
{
  "success": true,
  "data": {
    "items": [
      { "id": 1, "name": "Registration", "slug": "registration", "post_count": 5 }
    ]
  }
}
```

### 1.3 Pricing Plans — `GET /api/v1/pricing/plans`

**Frontend service:** `src/exxonim/services/pricingService.ts`
**Frontend hook:** `usePricingPlans()`

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 1,
        "name": "Starter",
        "segment": "local_entrepreneurs",
        "badge": null,
        "description": "Essential registration and compliance.",
        "notes": null,
        "recommended": false,
        "sort_order": 0,
        "features": [
          { "text": "Company registration with BRELA", "included": true },
          { "text": "TIN application", "included": true },
          { "text": "Dedicated advisor", "included": false }
        ]
      }
    ]
  }
}
```

### 1.4 Testimonials — `GET /api/v1/testimonials`

**Frontend service:** `src/exxonim/services/testimonialService.ts`
**Frontend hook:** `useTestimonials()`

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 1,
        "eyebrow": "Operations Team",
        "headline": "Seamless Process",
        "support": "From start to finish, the team handled everything.",
        "quote": "Exxonim made our company registration completely stress-free.",
        "name": "Amina J.",
        "role": "Operations Manager",
        "initials": "AJ",
        "sort_order": 0
      }
    ]
  }
}
```

### 1.5 Consultations — `POST /api/v1/consultations`

**Frontend service:** `src/exxonim/services/consultationService.ts`

```json
// POST /api/v1/consultations
// Request:
{
  "full_name": "John Doe",
  "email": "john@example.com",
  "phone": "+255700000000",
  "company": "Acme Ltd",
  "service_type_code": "company-registration",
  "message": "I need help with...",
  "idempotency_key": "uuid-v4",
  "source_channel": "website"
}

// Response:
{
  "success": true,
  "data": {
    "id": 1,
    "tracking_code": "EXC-2025-0001",
    "status": "received",
    "created_at": "2025-06-13T10:00:00Z"
  }
}
```

### 1.6 Tracking — `POST /api/v1/track`

```json
// POST /api/v1/track
// Request:
{ "tracking_code": "EXC-2025-0001" }

// Response:
{
  "success": true,
  "data": {
    "tracking_code": "EXC-2025-0001",
    "service_type": "Company Registration",
    "milestone": "documents_submitted",
    "visible_milestones": [
      { "key": "received", "label": "Received", "completed": true },
      { "key": "documents_submitted", "label": "Documents Submitted", "completed": true },
      { "key": "in_processing", "label": "In Processing", "completed": false },
      { "key": "completed", "label": "Completed", "completed": false }
    ],
    "completed_steps": 2,
    "total_steps": 4
  }
}
```

### 1.7 Jobs — `GET /api/v1/jobs`

**Frontend service:** `src/exxonim/services/jobsService.ts`
**Frontend hook:** uses `getPublishedJobs()`

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 1,
        "title": "Compliance Officer",
        "department": "Operations",
        "employment_type": "full_time",
        "location_mode": "on_site",
        "city": "Dar es Salaam",
        "country": "Tanzania",
        "summary": "...",
        "requirements": ["...", "..."],
        "responsibilities": ["...", "..."],
        "compensation_label": "Competitive",
        "experience_label": "3+ years",
        "is_published": true,
        "published_at": "2025-06-01T00:00:00Z"
      }
    ]
  }
}
```

**Job Applications — `POST /api/v1/jobs/{id}/apply`**

Multipart form data:
- `name` (string)
- `email` (string)
- `phone` (string)
- `cover_note` (string)
- `resume` (file, PDF/DOCX, max 5MB)
- `academics` (file, optional)
- `cover_letter` (file, optional)

### 1.8 Site Settings — `GET /api/v1/site-settings/{key}`

**Frontend service:** `src/exxonim/services/siteSettingsService.ts`
**Frontend hook:** `usePublicShell()` (fetches brand + company_info + footer)

| Key | Shape |
|-----|-------|
| `brand` | `{ name, light_logo_src, dark_logo_src }` |
| `company_info` | `{ name, phones[], emails[], address, whatsapp }` |
| `footer` | `{ quick_links[], other_resources[], tagline, primary_cta, social_links[], copyright }` |
| `seo_defaults` | `{ title_template, default_description, default_og_image }` |
| `office_hours` | `{ schedule[], timezone }` |
| `office` | `{ locations[] }` |
| `contact_map` | `{ embed_url, lat, lng }` |

```json
// Example: GET /api/v1/site-settings/brand
{
  "success": true,
  "data": {
    "id": 1,
    "key": "brand",
    "value": {
      "name": "Exxonim Consult",
      "light_logo_src": "/images/logo-light.svg",
      "dark_logo_src": "/images/logo-dark.svg"
    }
  }
}
```

### 1.9 Privacy Consent — `GET /api/v1/privacy/consent`

**Frontend service:** `src/exxonim/services/privacyService.ts`

```json
{
  "success": true,
  "data": {
    "categories": [
      { "key": "essential", "label": "Essential", "description": "...", "required": true, "enabled": true },
      { "key": "analytics", "label": "Analytics", "description": "...", "required": false, "enabled": false },
      { "key": "marketing", "label": "Marketing", "description": "...", "required": false, "enabled": false }
    ]
  }
}
```

### 1.10 Service Catalog — `GET /api/services`

**Note:** Currently on a separate microservice (port 3031). Should be migrated to `/api/v1/services`.

**Frontend hook:** `useServiceCatalog()`

```json
{
  "success": true,
  "data": {
    "services": [
      {
        "id": "company-registration",
        "title": "Company Registration",
        "slug": "company-registration",
        "category": "Business Setup",
        "primary_segment": "local_entrepreneurs",
        "badge": "Most Popular",
        "short_description": "Register your company with BRELA and TRA.",
        "deliverables": ["BRELA name search & reservation", "Certificate of Incorporation", "TIN Application"],
        "deliverables_full": ["Business License Assistance", "Shareholder resolutions"],
        "cta_text": "Get Started",
        "cta_link": "/contact"
      }
    ],
    "total": 15,
    "categories": [
      { "key": "Business Setup", "label": "Business Setup", "icon": "briefcase" },
      { "key": "Compliance Support", "label": "Compliance", "icon": "shield" },
      { "key": "Work Permits & Foreign Investment", "label": "Work Permits", "icon": "plane" },
      { "key": "NGOs & Non-Profits", "label": "NGOs & Non-Profits", "icon": "heart" }
    ]
  }
}
```

---

## 2. ENDPOINTS NEEDED (frontend hooks exist but unused or missing)

### 2.1 FAQ — `GET /api/v1/faq`

**Status:** Hook `useFaqItems()` exists but FaqPage still uses `usePage("faq")`. Migrate to dedicated endpoint for category-based filtering.

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 1,
        "question": "How long does company registration take?",
        "answer": "Typically 7-14 business days...",
        "category": "Registration",
        "sort_order": 0,
        "is_published": true
      }
    ],
    "total": 8,
    "categories": ["Registration", "Compliance", "Work Permits", "General"]
  }
}
```

**Migration plan:**
1. FastAPI builds the endpoint
2. Frontend switches FaqPage from `usePage("faq")` to `useFaqItems()`
3. FAQ content becomes admin-manageable with categories

### 2.2 Google Reviews — `GET /api/v1/google-reviews`

**Status:** Hook `useGoogleReviews()` exists but is unused. Rating and count are hardcoded.

```json
{
  "success": true,
  "data": {
    "rating": 4.9,
    "review_count": 58,
    "source": "google",
    "last_updated": "2025-06-13T00:00:00Z"
  }
}
```

**Places currently hardcoded:**
- `AboutPage.tsx`: `GOOGLE_REVIEW_RATING = 4.9`, `REVIEW_COUNT = 58`
- `ReferenceHero.tsx`: Rating `5.0` in review bar

**Migration plan:**
1. FastAPI scrapes or proxies Google Business Profile API
2. Frontend replaces hardcoded values with `useGoogleReviews()` hook
3. Rating displays update automatically

### 2.3 Navigation — `GET /api/v1/navigation`

**Status:** Hook `useNavigation()` exists but navigation is fully static via `staticNavigation.ts`. Low priority for v1.

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "label": "Home",
        "href": "/",
        "children": null
      },
      {
        "label": "Services",
        "href": "/services",
        "children": {
          "columns": [
            {
              "title": "Registration",
              "items": [
                { "label": "Company Registration", "href": "/services#company-registration", "description": "..." }
              ]
            }
          ]
        }
      }
    ]
  }
}
```

**Priority:** Low. Static nav works fine for now. Only needed if non-technical staff need to update menu items.

---

## 3. HARDCODED CONTENT THAT NEEDS ADMIN ENDPOINTS

These are currently baked into the frontend code and have NO API service yet. They need new endpoints.

### 3.1 Company Stats — NEW: `GET /api/v1/site-settings/stats`

**Where hardcoded:** `AboutPage.tsx` (120+, 100%, 5+, 50+)

```json
{
  "success": true,
  "data": {
    "id": 1,
    "key": "stats",
    "value": {
      "items": [
        { "value": "120+", "label": "Companies Registered" },
        { "value": "100%", "label": "Tracked & Updated" },
        { "value": "5+", "label": "Years Experience" },
        { "value": "50+", "label": "Satisfied Clients" }
      ]
    }
  }
}
```

### 3.2 Service Categories — Extend `/api/v1/services` response

**Where hardcoded:** `ServiceCatalogSection.tsx` (categoryTabs array with icons)

Currently the service catalog returns categories, but the **tab definitions** (label, icon) are hardcoded. The API should return the full category definition:

```json
{
  "categories": [
    { "key": "all", "label": "All Services", "icon": "briefcase" },
    { "key": "Business Setup", "label": "Business Setup", "icon": "briefcase" },
    { "key": "Compliance Support", "label": "Compliance", "icon": "shield" },
    { "key": "Work Permits & Foreign Investment", "label": "Work Permits", "icon": "plane" },
    { "key": "NGOs & Non-Profits", "label": "NGOs & Non-Profits", "icon": "heart" }
  ]
}
```

### 3.3 Service Type Options — Extend site-settings

**Where hardcoded:** `ContactPage.tsx` (SERVICE_OPTIONS array for the consultation form dropdown)

Add to site-settings or include in the services API response:

```json
{
  "service_type_options": [
    { "label": "Company Registration", "code": "company-registration" },
    { "label": "Business Name Registration", "code": "business-name" },
    { "label": "Trademark Registration", "code": "trademark" },
    { "label": "Work Permit Application", "code": "work-permit" },
    { "label": "Annual Returns Filing", "code": "annual-returns" }
  ]
}
```

### 3.4 Track Consultation Page Content — NEW: page content or site-setting

**Where hardcoded:** `TrackConsultationPage.tsx` (hero text, how-it-works steps, CTA text)

Option A: Make it a page in the pages API (`GET /api/v1/pages/track-consultation`)
Option B: Add to site-settings

Recommendation: Use the pages API since the content is structured like other pages.

```json
{
  "hero": {
    "eyebrow": "TRANSPARENCY",
    "title": "Track every consultation",
    "description": "Enter your tracking code to see real-time progress."
  },
  "how_it_works": {
    "steps": [
      { "number": 1, "title": "Submit", "description": "Fill out the consultation form" },
      { "number": 2, "title": "Track", "description": "Use your tracking code" },
      { "number": 3, "title": "Complete", "description": "Receive your documents" }
    ]
  },
  "cta": {
    "title": "Need help?",
    "primary": { "label": "Contact Us", "href": "/contact" },
    "secondary": { "label": "Book Consultation", "href": "/contact" }
  }
}
```

### 3.5 Newsletter Subscription — NEW: `POST /api/v1/newsletter/subscribe`

**Where hardcoded:** `NewsletterForm` component submits nowhere (placeholder)

```json
// POST /api/v1/newsletter/subscribe
// Request:
{ "email": "user@example.com" }

// Response:
{
  "success": true,
  "data": {
    "subscribed": true,
    "message": "You have been subscribed successfully."
  }
}
```

---

## 4. PAGES THAT NEED NO API (fully static)

| Page/Component | Why No API |
|----------------|------------|
| `NotFoundPage` (404) | Purely code-driven, no admin content needed |
| `Navigation` (desktop & mobile menus) | Static via `staticNavigation.ts`, admin nav hook exists but unused |
| `Footer` navigation links | Duplicated from nav data; once nav is dynamic, footer inherits |
| Business hours logic | Client-side EAT timezone calculation, no backend needed |
| `PrivacyConsentBanner` | Uses existing privacy API already |

---

## 5. PRIORITY ORDER FOR FASTAPI TEAM

### Phase 1: Core (website doesn't work without these)
1. `GET /api/v1/pages/{slug}` — all page content
2. `GET /api/v1/services` — service catalog (migrate from port 3031)
3. `POST /api/v1/consultations` — consultation form
4. `POST /api/v1/track` — tracking lookup
5. `GET /api/v1/site-settings/brand` — brand/logo
6. `GET /api/v1/site-settings/company_info` — company info
7. `GET /api/v1/site-settings/footer` — footer content

### Phase 2: Content (website is usable but content is stale)
8. `GET /api/v1/blog/posts` + `/categories` — blog
9. `GET /api/v1/pricing/plans` — pricing packages
10. `GET /api/v1/testimonials` — testimonials
11. `GET /api/v1/jobs` — job listings
12. `POST /api/v1/jobs/{id}/apply` — job applications

### Phase 3: Dynamic (replace hardcoded values)
13. `GET /api/v1/faq` — dedicated FAQ endpoint
14. `GET /api/v1/google-reviews` — live review stats
15. `GET /api/v1/site-settings/stats` — company stats
16. `POST /api/v1/newsletter/subscribe` — newsletter
17. Service type options (extend services or site-settings)
18. Track consultation page content (add to pages API)

### Phase 4: Nice-to-have
19. `GET /api/v1/navigation` — dynamic navigation
20. `GET /api/v1/privacy/consent` — consent management
21. Admin endpoints for content management

---

## 6. DATABASE TABLES NEEDED

### Core Tables

```sql
-- Pages (generic content storage)
pages (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(100) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  content JSONB NOT NULL,        -- flexible per-page schema
  meta_title VARCHAR(255),
  meta_description TEXT,
  og_image_url VARCHAR(500),
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
)

-- Blog
blog_posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  html_content TEXT,
  cover_image_url VARCHAR(500),
  category_id INT REFERENCES blog_categories(id),
  author_id INT REFERENCES blog_authors(id),
  status VARCHAR(20) DEFAULT 'draft',
  featured_on_home BOOLEAN DEFAULT false,
  tags TEXT[],
  related_slugs TEXT[],
  reading_time_minutes INT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
)

blog_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT
)

blog_authors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  avatar_url VARCHAR(500),
  bio TEXT
)

-- Services
services (
  id VARCHAR(100) PRIMARY KEY,   -- e.g. "company-registration"
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  category VARCHAR(100) NOT NULL,
  primary_segment VARCHAR(100),
  badge VARCHAR(50),
  short_description TEXT,
  deliverables TEXT[],
  deliverables_full TEXT[],
  cta_text VARCHAR(50) DEFAULT 'Get Started',
  cta_link VARCHAR(255) DEFAULT '/contact',
  sort_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT true
)

service_categories (
  key VARCHAR(100) PRIMARY KEY,  -- e.g. "Business Setup"
  label VARCHAR(100) NOT NULL,
  icon VARCHAR(50) NOT NULL,     -- lucide icon name
  sort_order INT DEFAULT 0
)

-- Pricing
pricing_plans (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  segment VARCHAR(100) NOT NULL, -- local_entrepreneurs, foreign_investors, enterprises, ngos
  badge VARCHAR(50),
  description TEXT,
  notes TEXT,
  recommended BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0
)

pricing_plan_features (
  id SERIAL PRIMARY KEY,
  plan_id INT REFERENCES pricing_plans(id),
  text TEXT NOT NULL,
  included BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0
)

-- Testimonials
testimonials (
  id SERIAL PRIMARY KEY,
  eyebrow VARCHAR(100),
  headline VARCHAR(255),
  support TEXT,
  quote TEXT NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255),
  initials VARCHAR(5),
  sort_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT true
)

-- Consultations
consultations (
  id SERIAL PRIMARY KEY,
  tracking_code VARCHAR(20) UNIQUE NOT NULL,  -- EXC-2025-0001
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),
  service_type_code VARCHAR(100),
  message TEXT,
  source_channel VARCHAR(50) DEFAULT 'website',
  status VARCHAR(30) DEFAULT 'received',
  idempotency_key VARCHAR(100) UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
)

consultation_status_history (
  id SERIAL PRIMARY KEY,
  consultation_id INT REFERENCES consultations(id),
  status VARCHAR(30) NOT NULL,
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
)

-- Jobs
jobs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  department VARCHAR(100),
  employment_type VARCHAR(50),
  location_mode VARCHAR(50),     -- on_site, remote, hybrid
  city VARCHAR(100),
  country VARCHAR(100),
  summary TEXT,
  requirements TEXT[],
  responsibilities TEXT[],
  compensation_label VARCHAR(100),
  experience_label VARCHAR(100),
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
)

job_applications (
  id SERIAL PRIMARY KEY,
  job_id INT REFERENCES jobs(id),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  cover_note TEXT,
  resume_url VARCHAR(500),
  academics_url VARCHAR(500),
  cover_letter_url VARCHAR(500),
  created_at TIMESTAMPTZ DEFAULT NOW()
)

-- FAQ
faq_items (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category VARCHAR(100),
  sort_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
)

-- Site Settings (generic key-value)
site_settings (
  id SERIAL PRIMARY KEY,
  key VARCHAR(100) UNIQUE NOT NULL,  -- brand, company_info, footer, stats, seo_defaults, etc.
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
)

-- Newsletter
newsletter_subscribers (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true
)
```

---

## 7. FRONTEND FALLBACK STRATEGY

When the API is down or returns an error, the frontend falls back to hardcoded data. These fallbacks live in:

- `src/exxonim/content/fallbackPublicContent.ts` (~107KB of content)
- `src/exxonim/content/fallbackShell.ts` (brand, company, nav, footer)
- `src/exxonim/content/fallbackServiceCatalog.ts` (15 services, categories, segments)

Each service layer follows this pattern:
1. Try API call
2. If API fails, try local cache (localStorage with TTL)
3. If no cache, use static fallback JSON
4. Never show a broken page

The FastAPI team does NOT need to worry about the fallback system. Just make sure the API responses match the shapes documented above.
