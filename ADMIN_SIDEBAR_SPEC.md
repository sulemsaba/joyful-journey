# Exxonim Admin Panel — Sidebar Specification

> **For developers building the admin frontend.**
> This document specifies the complete sidebar navigation structure, visual design,
> interactive behavior, and technical requirements. The entire public-site project
> is available at `https://github.com/sulemsaba/joyful-journey.git` (branch `nextjs-wip`)
> as a reference for design tokens, entity types, and content structure.

---

## Table of Contents

1. [Sidebar Structure](#1-sidebar-structure)
2. [Menu Item Details](#2-menu-item-details)
3. [Visual Design Specifications](#3-visual-design-specifications)
4. [Interactive Behavior](#4-interactive-behavior)
5. [Badge & Notification Indicators](#5-badge--notification-indicators)
6. [Mobile & Responsive Behavior](#6-mobile--responsive-behavior)
7. [Technical Implementation Notes](#7-technical-implementation-notes)
8. [Reference Implementations](#8-reference-implementations)

---

## 1. Sidebar Structure

### Full Layout

```
┌──────────────────────────────────┐
│  🔍 Search...              ⌘K   │  ← Command palette trigger
├──────────────────────────────────┤
│  OVERVIEW                        │  ← Group label
│    📊 Dashboard                  │
│                                  │
│  OPERATIONS                      │
│    📋 Service Requests    ③      │  ← Badge: pending count
│    💬 Consultations       ⑤      │  ← Badge: unread count
│    👥 Customers                  │
│    🏷️ Service Types              │
│                                  │
│  CONTENT                         │
│    📄 Pages                      │
│    📝 Blog Posts                 │
│    📂 Blog Categories            │
│    ✍️ Authors                    │
│    💬 Testimonials               │
│    ❓ FAQ                        │
│    🔍 Review Queue        ②      │  ← Badge: pending reviews
│                                  │
│  CAREERS                         │
│    💼 Job Postings               │
│                                  │
│  MEDIA                           │
│    🖼️ Media Library              │
│                                  │
│  REPORTS                         │
│    📈 Operations                 │
│    👤 Admin Activity             │
│    📰 Content Activity           │
│                                  │
│  SETTINGS                        │
│    🏢 Brand & Logo               │
│    📞 Company Info               │
│    🧭 Navigation                 │
│    🦶 Footer                     │
│    🔎 SEO Defaults               │
│    🌐 Offices & Hours            │
│    🔗 Social Links               │
│    📜 Policy Versions            │
│                                  │
│  COMPLIANCE                      │
│    🛡️ Privacy Requests    ①      │  ← Badge: open requests
│                                  │
│  PEOPLE                          │
│    👤 Staff & Roles              │
├──────────────────────────────────┤
│  🟢 Admin Name            ▾     │  ← User menu (bottom-pinned)
│     admin@exxonim.tz            │
└──────────────────────────────────┘
```

### When Sidebar is Collapsed (Icon-Only Rail)

```
┌────────┐
│  🔍    │
├────────┤
│  📊    │  ← Hover tooltip: "Dashboard"
│        │
│  📋 ③  │
│  💬 ⑤  │
│  👥    │
│  🏷️    │
│        │
│  📄    │
│  📝    │
│  📂    │
│  ✍️    │
│  💬    │
│  ❓    │
│  🔍 ②  │
│        │
│  💼    │
│        │
│  🖼️    │
│        │
│  📈    │
│  👤    │
│  📰    │
│        │
│  ⚙️    │  ← Settings group collapses to a single gear icon
│        │     Clicking opens a secondary panel
│        │
│  🛡️ ①  │
│        │
│  👤    │
├────────┤
│  🟢 ▾  │
└────────┘
```

---

## 2. Menu Item Details

### OVERVIEW Group

| Item | Route | Icon | Description |
|------|-------|------|-------------|
| Dashboard | `/admin` | `LayoutDashboard` | Summary metrics, alerts, recent activity, content pipeline, open consultations, open jobs. Shows `ApiAdminDashboardSummary` data. |

### OPERATIONS Group

| Item | Route | Icon | Badge | Description |
|------|-------|------|-------|-------------|
| Service Requests | `/admin/requests` | `ClipboardList` | Count of requests with status `new` or `unread` | The operational heart. Queue views: All Active, Mine, Unassigned, Unread, Completed. Supports bulk operations (assign, status, priority, mark-read). Each request has: inbox threads/messages, notes, documents, timeline, status history, assignments. |
| Consultations | `/admin/consultations` | `MessageSquare` | Count with status `pending` | Incoming public form submissions. Status: pending → contacted → completed / cancelled. Links to Customer and ServiceRequest. |
| Customers | `/admin/customers` | `Users` | — | Customer directory. Fields: name, email, phone, company, kind (individual/organization). Has timeline, notes, documents. |
| Service Types | `/admin/service-types` | `Tag` | — | CRUD for service type catalog (code, label, is_active, sort_order). Used by Service Requests and Consultations. |

### CONTENT Group

| Item | Route | Icon | Badge | Description |
|------|-------|------|-------|-------------|
| Pages | `/admin/pages` | `FileText` | — | 12 page types (home, about, services, faq, resources, career, contact, privacy, cookies, data-rights, support, terms). Each has a structured content editor based on its content type (e.g., `HomePageContent`, `AboutPageContent`). Content status workflow: draft → pending_review → published / rejected → archived. |
| Blog Posts | `/admin/blog` | `PenLine` | Count with status `pending_review` | Full CRUD + workflow. Revision system (working draft → ready_for_review). Fields: title, slug, excerpt, content (introduction, highlights, sections, html), featured image, cover alt, media label, featured slot, featured on home, read time, related slugs, meta data, category, author. |
| Blog Categories | `/admin/blog/categories` | `FolderOpen` | — | CRUD for blog categories. Fields: name, slug, description. |
| Authors | `/admin/blog/authors` | `UserPen` | — | CRUD for blog authors. Fields: name, slug, role, avatar (96×96px), bio. |
| Testimonials | `/admin/testimonials` | `Quote` | — | CRUD + workflow + drag-and-drop reorder (sort_order). **Strict limits**: eyebrow max 30 chars, author max 50, role max 80, content max 250 — backend MUST reject if exceeded. Rating always 5. |
| FAQ | `/admin/faq` | `HelpCircle` | — | CRUD + drag-and-drop reorder (sort_order). Fields: question (max 120), answer (max 500), category, is_active. |
| Review Queue | `/admin/reviews` | `ScanSearch` | Count of items `pending_review` | Centralized review queue across pages, blog posts, and testimonials. Shows content type, title, submitted by, submitted at. Actions: approve, reject, edit. |

### CAREERS Group

| Item | Route | Icon | Badge | Description |
|------|-------|------|-------|-------------|
| Job Postings | `/admin/careers` | `Briefcase` | Count of published jobs | CRUD + workflow. Fields: title, slug, department, employment type, location mode, city, country, compensation, experience, summary, description, requirements[], responsibilities[], status, is_published. |

### MEDIA Group

| Item | Route | Icon | Description |
|------|-------|------|-------------|
| Media Library | `/admin/media` | `Image` | Upload, browse, manage images. Upload endpoint: `/admin/media/upload`. Image specs: blog covers 1344×768px WebP ≤500KB, avatars 96×96px, career banner 1344×768px, logos light/dark, service icons SVG 24×24px. |

### REPORTS Group

| Item | Route | Icon | Description |
|------|-------|------|-------------|
| Operations | `/admin/reports/operations` | `TrendingUp` | Enquiry series, source channel breakdown, service type breakdown, open vs resolved trend, aging buckets, staff workload, funnel, repeat customer breakdown, response times. Filters: date range, grain, timezone, service type, assignee, source channel, status. |
| Admin Activity | `/admin/reports/admin-activity` | `UserCheck` | Activity series, actor breakdown, action breakdown. |
| Content Activity | `/admin/reports/content-activity` | `Newspaper` | Activity series, content type breakdown (page/blog/testimonial), action breakdown (create/submit/approve/reject/publish/archive). |

### SETTINGS Group

Settings uses a **secondary detail panel** pattern (see Section 4). Clicking "Settings" opens the first setting page. A secondary vertical tab or top tab bar navigates between setting pages.

| Item | Route | Icon | Description |
|------|-------|------|-------------|
| Brand & Logo | `/admin/settings/brand` | `Palette` | Site setting key `brand`. Fields: name, companyShortName, tagline, lightLogoSrc, darkLogoSrc, faviconUrl, brandColors (primary/secondary). |
| Company Info | `/admin/settings/company` | `Building2` | Site setting key `company_info`. Fields: name, legalCompanyName, companyShortName, phones[], emails[], address, whatsapp. |
| Navigation | `/admin/settings/navigation` | `Navigation` | Tree editor for navigation items. 3-level hierarchy: primary → group → secondary. Max 7 top-level items, max 2 groups per dropdown, max 5 secondary per group. Drag-and-drop reorder. Currently static in code but API contract exists. |
| Footer | `/admin/settings/footer` | `PanelBottom` | Site setting key `footer`. Fields: quick_links[], other_resources[], tagline, primary_cta, social_links[], copyright. |
| SEO Defaults | `/admin/settings/seo` | `SearchCode` | Site setting key `seo_defaults`. Fields: siteName, canonicalBaseUrl, defaultMetaTitle, defaultMetaDescription, defaultShareImageUrl, robotsIndex, robotsFollow. |
| Offices & Hours | `/admin/settings/offices` | `MapPin` | Site setting key `contact_map`. Fields: officeHours[] (day/open/close/closed), offices[] (name/address/city/country/googleMapsUrl/embedUrl/lat/lng/isPrimary). |
| Social Links | `/admin/settings/social` | `Link2` | Part of `contact_map.socialLinks`. Fields per link: platform (facebook/instagram/linkedin/x/youtube/tiktok), label, url, isActive. |
| Policy Versions | `/admin/settings/policies` | `FileCheck2` | Site setting key `policy_versions`. Fields: privacy_policy version, cookie_notice version, data_rights_notice version. |

### COMPLIANCE Group

| Item | Route | Icon | Badge | Description |
|------|-------|------|-------|-------------|
| Privacy Requests | `/admin/privacy` | `ShieldCheck` | Count with status `received` or `verifying` | Workflow: received → verifying → in_progress → completed / rejected. Fields: request type (access/correction/deletion), requester name/email, summary, internal notes, resolution notes. |

### PEOPLE Group

| Item | Route | Icon | Description |
|------|-------|------|-------------|
| Staff & Roles | `/admin/users` | `UserCog` | CRUD for admin users. Fields: email, full_name, role (superuser/administrator/editor/reviewer/viewer/admin/author), permissions[], is_active, last_login_at. |

---

## 3. Visual Design Specifications

### Layout Dimensions

| Property | Value | Notes |
|----------|-------|-------|
| Expanded width | `240px` (15rem) | Standard SaaS sidebar width |
| Collapsed width | `56px` (3.5rem) | Icon-only rail |
| Mobile drawer width | `288px` (18rem) | Sheet overlay |
| Mobile breakpoint | `1024px` | Below this: hidden sidebar + hamburger |
| Menu item height | `36px` | Clickable target |
| Icon size | `16px` | Lucide icon default |
| Font size (items) | `14px` | Standard body size |
| Font size (group labels) | `11px` | Uppercase, letter-spacing 0.08em |
| Border radius (items) | `6px` | `rounded-md` |
| Horizontal padding | `12px` | Inside sidebar container |
| Group gap | `16px` | Between groups |
| Item gap | `2px` | Between items within a group |

### Color & Style

**Background:**
- Sidebar background: `var(--color-surface)` with a **1px right border** using `var(--color-border-soft)`
- This creates a subtle visual separation without a different bg color
- Do NOT use a brand-colored or accent-colored sidebar background

**Group Labels:**
- Color: `var(--color-text-soft)` (muted)
- Style: `11px`, `font-weight: 600`, `letter-spacing: 0.08em`, `uppercase`
- Padding: `12px 12px 6px 12px`

**Menu Items — Default State:**
- Background: transparent
- Text color: `var(--color-text-muted)`
- Icon color: `var(--color-text-soft)`
- Font weight: `400`
- Padding: `0 12px`
- Border radius: `6px`

**Menu Items — Hover State:**
- Background: `var(--color-accent-soft)` (or `accent/8` mix)
- Text color: `var(--color-text)`
- Icon color: `var(--color-text)`
- Transition: `150ms ease`

**Menu Items — Active State:**
- Background: `var(--color-accent-soft)` (or `accent/12` mix)
- Text color: `var(--color-accent)`
- Icon color: `var(--color-accent)`
- Font weight: `600`
- Optional: `2px left border` in accent color (if not using background pill)

**Badge Colors:**
- Default badge: `var(--color-accent)` bg with `var(--color-accent-contrast)` text
- Warning badge: `var(--color-warning)` bg with `var(--color-warning-contrast)` text

### User Section (Bottom-Pinned)

```
┌──────────────────────────────────┐
│  [Avatar] Admin Name       ▾    │
│           admin@exxonim.tz       │
└──────────────────────────────────┘
```

- Separator: 1px top border `var(--color-border-soft)`
- Avatar: 32px circle with initials (accent bg + accent-contrast text)
- Name: `14px`, `font-weight: 500`, `var(--color-text)`
- Email: `12px`, `var(--color-text-soft)`
- Dropdown items: Profile, Settings, Sign Out
- Collapsed mode: Avatar only, centered

### Search Trigger (Top)

```
┌──────────────────────────────────┐
│  🔍  Search...            ⌘K    │
└──────────────────────────────────┘
```

- Styled as a muted button/input appearance
- Border: `1px solid var(--color-border-soft)`
- Background: `var(--color-surface)` or slightly lighter
- Text: `var(--color-text-soft)`, `14px`
- Shortcut badge: `⌘K` in a small rounded box, `var(--color-text-soft)`
- Clicking opens a **Command Palette** (⌘K dialog)
- The command palette should search across: pages, blog posts, customers, service requests, settings, navigation items

---

## 4. Interactive Behavior

### Sidebar Toggle (Collapsible)

- **Trigger**: A small toggle button at the top-right edge of the sidebar (or bottom of sidebar)
- **Keyboard shortcut**: `⌘B` (or `Ctrl+B`) to toggle expanded/collapsed
- **State persistence**: Store in cookie (`sidebar_state`, max-age 7 days) so it survives page refresh
- **Animation**: Smooth width transition (`200ms ease`)
- **Collapsed behavior**:
  - Show icons only, centered
  - Hover on an item shows a **tooltip** with the item label
  - Group labels are hidden
  - Search trigger shrinks to just the magnifying glass icon
  - User section shows avatar only
  - Settings group: single `⚙️` gear icon — clicking opens the Settings page (sub-items accessed via the settings page's own secondary navigation)

### Settings — Secondary Navigation Pattern

Settings should NOT have all 8 items as separate sidebar entries (too cluttered). Instead:

**Approach: In-page tab navigation**

When the user navigates to `/admin/settings/brand`, the settings page shows a **vertical tab list** on the left (or horizontal tabs at top) with all 8 setting sections:

```
┌──────────────────────────────────────────────┐
│  Brand & Logo  │  [Form content here]        │
│  Company Info  │                              │
│  Navigation  ◀ │  Currently selected          │
│  Footer        │                              │
│  SEO Defaults  │                              │
│  Offices       │                              │
│  Social Links  │                              │
│  Policies      │                              │
└──────────────────────────────────────────────┘
```

This is the pattern used by **Vercel** and **Stripe** — settings pages have their own internal navigation, keeping the sidebar clean.

### Sidebar Item Click Behavior

- Single-click navigates to the route
- No expand/collapse accordion on sidebar items — all items are **flat links**
- The sidebar does NOT nest sub-items under parent items
- If a section needs sub-navigation (like Settings), it uses **in-page tabs** instead

### Scroll Behavior

- If the sidebar content exceeds viewport height, the sidebar body **scrolls independently** with a subtle scrollbar
- The search trigger at top and user section at bottom are **fixed** (do not scroll)
- Use `overflow-y: auto` on the middle section only

---

## 5. Badge & Notification Indicators

### Badge Types

| Type | Visual | When to Show |
|------|--------|--------------|
| **Count badge** | Small pill: `3` or `12+` (if >99) | When there are actionable items requiring attention |
| **Dot indicator** | Small 6px dot | When there are new/unread items but exact count isn't critical |

### Badge Values by Menu Item

| Menu Item | Badge Source | Condition |
|-----------|-------------|-----------|
| Service Requests | `ApiAdminDashboardSummary.worklists` | Count of requests with status `new` or `unread` |
| Consultations | Consultation count | Count with status `pending` |
| Review Queue | `ApiReviewQueueItem` count | Items with status `pending_review` |
| Privacy Requests | Privacy request count | Status `received` or `verifying` |
| Job Postings | Career job count | Published jobs count (informational) |

### Badge API Pattern

The dashboard summary API (`/admin/dashboard`) should return badge counts as part of its response so the sidebar can render badges without N+1 API calls:

```json
{
  "sidebar_badges": {
    "service_requests": 3,
    "consultations": 5,
    "review_queue": 2,
    "privacy_requests": 1
  }
}
```

---

## 6. Mobile & Responsive Behavior

### Breakpoints

| Breakpoint | Behavior |
|------------|----------|
| **Desktop (≥1024px)** | Full sidebar, persistent. Toggle between expanded (240px) and collapsed (56px). |
| **Tablet (768–1023px)** | Collapsed by default (icon-only rail). Tap an icon to navigate. Can expand temporarily. |
| **Mobile (<768px)** | Sidebar completely hidden. Hamburger button in top-left header opens a **Sheet/Drawer** overlay from the left. |

### Mobile Sheet/Drawer

- Full-height sheet sliding from left
- Width: `288px` (18rem)
- Semi-transparent backdrop (click to close)
- Contains the full expanded sidebar content
- Close button (X) at top-right of sheet
- No collapse/expand toggle on mobile — always fully expanded in the sheet
- Route change auto-closes the sheet

### Mobile Header (When Sidebar Hidden)

```
┌──────────────────────────────────────┐
│  ☰  │  🏢 Exxonim Admin             │
│      │                               │
└──────────────────────────────────────┘
```

- Hamburger (`☰`) button in top-left
- Admin logo/brand name next to it
- The hamburger opens the sidebar Sheet

---

## 7. Technical Implementation Notes

### Recommended Component Stack

| Component | Library | Notes |
|-----------|---------|-------|
| Sidebar component | **shadcn/ui Sidebar** | Install via `npx shadcn@latest add sidebar`. Supports: collapsible, floating, inset variants. Has built-in toggle, keyboard shortcut, cookie persistence. |
| Command Palette | **cmdk** (via `npx shadcn@latest add command`) | For ⌘K search. Searches across all entities. |
| Icons | **Lucide React** | Already used in the public site. Use the same icon set for consistency. |
| Sheet/Drawer | **shadcn/ui Sheet** | For mobile sidebar overlay. |
| Tooltip | **shadcn/ui Tooltip** | For collapsed sidebar item labels on hover. |
| Avatar | **shadcn/ui Avatar** | For user section at bottom. |

### shadcn/ui Sidebar Component

The shadcn sidebar component provides:

```
<SidebarProvider>
  <Sidebar>
    <SidebarHeader>    → Search trigger
    <SidebarContent>   → Scrollable menu groups
      <SidebarGroup>
        <SidebarGroupLabel>OVERVIEW</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>Dashboard</SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>    → User section
  </Sidebar>
  <main>{children}</main>
</SidebarProvider>
```

### Route Structure

```
/admin                          → Dashboard
/admin/requests                 → Service Requests list
/admin/requests/:id             → Service Request detail
/admin/consultations            → Consultations list
/admin/customers                → Customers list
/admin/customers/:id            → Customer detail
/admin/service-types            → Service Types CRUD
/admin/pages                    → Pages list (12 page types)
/admin/pages/:slug/edit         → Page editor (slug determines content type)
/admin/blog                     → Blog Posts list
/admin/blog/new                 → New blog post
/admin/blog/:id/edit            → Edit blog post
/admin/blog/categories          → Blog Categories
/admin/blog/authors             → Blog Authors
/admin/testimonials             → Testimonials list
/admin/faq                      → FAQ items list
/admin/reviews                  → Review Queue
/admin/careers                  → Job Postings list
/admin/careers/:id/edit         → Edit job posting
/admin/media                    → Media Library
/admin/reports/operations       → Operations Report
/admin/reports/admin-activity   → Admin Activity Report
/admin/reports/content-activity → Content Activity Report
/admin/settings/brand           → Brand & Logo settings
/admin/settings/company         → Company Info settings
/admin/settings/navigation      → Navigation tree editor
/admin/settings/footer          → Footer settings
/admin/settings/seo             → SEO Defaults settings
/admin/settings/offices         → Offices & Hours settings
/admin/settings/social          → Social Links settings
/admin/settings/policies        → Policy Versions settings
/admin/privacy                  → Privacy Requests list
/admin/users                    → Staff & Roles list
```

### Icon Mapping (Lucide)

```tsx
import {
  LayoutDashboard,   // Dashboard
  ClipboardList,     // Service Requests
  MessageSquare,     // Consultations
  Users,             // Customers
  Tag,               // Service Types
  FileText,          // Pages
  PenLine,           // Blog Posts
  FolderOpen,        // Blog Categories
  UserPen,           // Authors
  Quote,             // Testimonials
  HelpCircle,        // FAQ
  ScanSearch,        // Review Queue
  Briefcase,         // Job Postings
  Image,             // Media Library
  TrendingUp,        // Operations Report
  UserCheck,         // Admin Activity Report
  Newspaper,         // Content Activity Report
  Palette,           // Brand & Logo
  Building2,         // Company Info
  Navigation,        // Navigation
  PanelBottom,       // Footer
  SearchCode,        // SEO Defaults
  MapPin,            // Offices & Hours
  Link2,             // Social Links
  FileCheck2,        // Policy Versions
  ShieldCheck,       // Privacy Requests
  UserCog,           // Staff & Roles
  Search,            // Search trigger
  Settings,          // Settings group (collapsed)
} from 'lucide-react';
```

### Key Entity Types (from the project)

The admin frontend should import types from the Exxonim project's type definitions:

```tsx
// These types are defined in src/exxonim/types/domain.ts and src/exxonim/types/api.ts
import type {
  AboutPageContent,
  ApiBlogPost,
  ApiBlogCategory,
  ApiBlogAuthor,
  ApiCareerJob,
  ApiConsultation,
  ApiCustomer,
  ApiAdminDashboardSummary,
  ApiAdminNotification,
  ApiInboxThread,
  ApiInboxMessage,
  ApiMedia,
  ApiPage,
  ApiPricingPlan,
  ApiPrivacyRequest,
  ApiRecordDocument,
  ApiRecordNote,
  ApiReviewQueueItem,
  ApiServiceRequest,
  ApiServiceRequestAssignment,
  ApiServiceRequestStatusHistory,
  ApiServiceType,
  ApiTimelineEvent,
  ApiTestimonial,
  ApiAdminUser,
  ApiNavigationItem,
  FaqPageContent,
  HomePageContent,
  ServicesPageContent,
  // ... etc
} from '@/exxonim/types';
```

### Content Status Workflow (shared across Pages, Blog Posts, Testimonials)

```
  draft ──▶ pending_review ──▶ published
    │              │
    │              └──▶ rejected ──▶ draft (re-edit)
    │
    └──▶ archived
```

The Review Queue aggregates all items with status `pending_review` across content types.

### Blog Post Revision System

```
  Published Post (id: 42)
       │
       └──▶ Working Revision (id: 87, revision_of_id: 42, revision_state: "working")
                │
                └──▶ Ready for Review (revision_state: "ready_for_review")
                         │
                         └──▶ Published → replaces original (id: 42 content updated)
```

---

## 8. Reference Implementations

### Must-Reference (Code-Level)

| Resource | URL | What to Study |
|----------|-----|---------------|
| **shadcn/ui Sidebar Docs** | https://ui.shadcn.com/docs/components/sidebar | Component API, variants (sidebar/floating/inset), collapsible behavior, cookie persistence |
| **shadcn-admin** | https://github.com/satnaing/shadcn-admin | Full admin template with sidebar + command palette + 10+ page templates. **Clone this as a starting point.** |
| **shadcn Sidebar Blocks** | https://ui.shadcn.com/blocks/sidebar | Pre-built sidebar layout patterns |
| **Achromatic Sidebar Guide** | https://www.achromatic.dev/blog/shadcn-sidebar | Production shadcn sidebar with double-sidebar for settings pages |

### Design Inspiration (UX Patterns)

| Resource | What to Study |
|----------|---------------|
| **Linear** (https://linear.app) | Sidebar organization, active state, icon consistency, minimal color approach |
| **Vercel Dashboard** (https://vercel.com) | Scope switcher at top, resizable sidebar, collapsible groups |
| **Stripe Dashboard** (https://stripe.com) | Settings page with secondary navigation, flat sidebar groups, badge indicators |
| **Notion** (https://notion.so) | Collapsible sections, favorites/pinned items, search integration |

### Key UX Articles

| Article | URL | Key Takeaway |
|---------|-----|--------------|
| Sidebar UX Best Practices | https://uxplanet.org/best-ux-practices-for-designing-a-sidebar-9174ee0ecaa2 | Keep flat, group with labels, badge indicators |
| 2026 Sidebar Guide | https://www.alfdesigngroup.com/post/improve-your-sidebar-design-for-web-apps | Personalization, command palette, responsive patterns |
| Linear Personalized Sidebar | https://linear.app/changelog/2024-12-18-personalized-sidebar | Reorder/hide items, configurable badge style |

---

## Quick-Start Checklist for Developers

- [ ] Install shadcn sidebar component: `npx shadcn@latest add sidebar`
- [ ] Install command palette: `npx shadcn@latest add command`
- [ ] Install sheet (for mobile): `npx shadcn@latest add sheet`
- [ ] Install tooltip: `npx shadcn@latest add tooltip`
- [ ] Install avatar: `npx shadcn@latest add avatar`
- [ ] Clone and study https://github.com/satnaing/shadcn-admin as a reference architecture
- [ ] Set up `SidebarProvider` in the admin layout
- [ ] Build the sidebar menu groups from the structure above
- [ ] Add ⌘K command palette with search across entities
- [ ] Add ⌘B keyboard shortcut for sidebar toggle
- [ ] Add cookie persistence for sidebar state
- [ ] Add badge indicators from dashboard API
- [ ] Add mobile Sheet/Drawer for sidebar on <768px
- [ ] Build Settings page with internal tab navigation
- [ ] Import entity types from the public site's `src/exxonim/types/`
