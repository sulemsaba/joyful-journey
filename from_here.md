# From Here — Admin System Design Decisions

> **This document records ONLY what we discussed in our conversation.**
> It is the authoritative record of the admin system design decisions we made together.
> The build team should read this as the source of truth for what was agreed.

---

## Table of Contents

1. [Design Principles](#1-design-principles)
2. [Sidebar Structure](#2-sidebar-structure)
3. [The Merges We Agreed On](#3-the-merges-we-agreed-on)
4. [Calendar](#4-calendar)
5. [Cases](#5-cases)
6. [Customers](#6-customers)
7. [The 4-Layer Document System](#7-the-4-layer-document-system)
8. [Reminders & Notifications](#8-reminders--notifications)
9. [Fees, Invoices, Quotations, Payments](#9-fees-invoices-quotations-payments)
10. [Accounting Module](#10-accounting-module)
11. [Blog](#11-blog)
12. [Settings](#12-settings)
13. [Roles — Parked](#13-roles--parked)
14. [Caveats](#14-caveats)

---

## 1. Design Principles

1. **General and reusable.** The system must not be bounded to Exxonim or one company. Another compliance firm, a law office, an accounting practice, or an HR consultancy should be able to adopt the operations module and feel the product was built for them. No industry assumptions are hardcoded. All workflows are admin-configurable.

2. **Anything bounded by time appears in the Calendar.** The Calendar is the operational heartbeat. Case deadlines, document expiry, recurring compliance, reminders, scheduled messages, meetings — all appear in the calendar.

3. **Cases are THE core entity.** Every piece of work is a case. The old "Service Request" and "Consultation" entities are merged into Cases. A consultation is just a new case. A service request was the same thing with a different name.

4. **Settings holds all configuration.** Anything configured once and rarely changed goes in Settings. Anything created or updated daily goes in Operations. Stages, milestones, document types, blueprints, pre-messages — all live in Settings.

5. **Do NOT remove existing admin features.** This discussion defines the minimum. If the admin already has a feature not mentioned here, keep it. Only add what's missing; never remove what exists.

6. **The sidebar is navigation only.** No search box inside the sidebar. Global search, if implemented, lives in the top header bar.

7. **No double-nav.** Do not have both a sidebar pop-out panel and an in-page tab nav for the same content. Pick one pattern per section.

8. **Roles are parked.** We will discuss roles and permissions separately with the developer team. Do not build role filtering yet.

---

## 2. Sidebar Structure

```
Dashboard
Calendar
Messages ▸            Inbox, Notifications, Reminders, Bulk Messaging
My Work ▸             Daily Notes, Weekly Reports, Team Reports
─── (section divider) ───
Operations ▸          Cases, Customers
People ▸              Staff & Roles, Team Members
─── (section divider) ───
Blog ▸                Posts, Categories, Authors
Pages
FAQ
Careers ▸             Job Postings, Applications
Testimonials
Review Queue
Pricing ▸             Plans, Segments
Media
─── (section divider) ───
Accounting ▸          Overview, Quotations, Proformas, Invoices, Payments,
                        Expenses, Reconciliation, Reports, Deadlines
Settings ▸            Brand, Company Info, Navigation, Footer, SEO, Offices,
                        Social Links, Policies, Services (+ stages + milestones
                        + pre-messages), Service Types, Document Library
                        (+ blueprints), Email Identities, Reminder Templates,
                        Message Templates
Privacy Requests
```

**16 top-level entries:** 4 flat items + 10 pop-out groups + 3 section dividers.

The 3 section dividers create 4 visual chapters:

| Chapter | Question | Items |
|---|---|---|
| Daily | What do I do every day? | Dashboard, Calendar, Messages, My Work |
| Operations + People | What do I manage? | Operations (Cases, Customers), People (Staff, Team) |
| Content | What content do I publish? | Blog, Pages, FAQ, Careers, Testimonials, Review Queue, Pricing, Media |
| Finance + System | What money am I tracking? What settings do I control? | Accounting, Settings, Privacy Requests |

### Pop-out group behavior

When you click a pop-out group (e.g., "Operations ▸"):
1. A secondary panel slides out showing the group's children
2. The panel persists — you can click between children without it closing
3. Clicking the group again, or clicking outside, closes the panel
4. Auto-open on navigation: if you navigate to a route belonging to a pop-out group, the panel auto-opens

### Settings navigation

Settings does NOT list all 14 sub-items as separate sidebar entries. The Settings pop-out opens a secondary panel with all setting sections. Use ONE navigation pattern (the pop-out panel). Do not also add in-page tab navigation — that would be redundant double-nav.

---

## 3. The Merges We Agreed On

We identified 5 "eat each other" overlaps in the earlier proposal and merged them.

| Earlier proposal | Merged into | Reason |
|---|---|---|
| Operations + Tracking (separate) | → **Operations** (one group) | Cases = Case Queue. Milestones and Audit Trail belong with cases. |
| Setup + Settings (separate) | → **Settings** (one group) | All configuration in one place. |
| My Team + My Work | → split: **My Work** (personal productivity) + **People** (staff management) | "My daily notes" is not the same as "manage staff." |
| FAQ Page Editor (in FAQ group) | → dropped (lives in **Pages**) | The FAQ page is one of 12 page types. Edit it in Pages. |
| Career Page (in Careers group) | → dropped (lives in **Pages**) | Same — Career page is a page type. |
| Segments (flat) | → inside **Pricing** | Segments organize pricing plans; not a peer. |

We also analyzed the 6 items originally proposed under Operations and reduced them to 2:

| Original Operations item | Decision | Reason |
|---|---|---|
| Cases | ✅ Keep | The core entity. Every piece of work is a case. |
| Service Requests | ❌ Merge into Cases | Same entity, different name. Eliminates duplication. |
| Consultations | ❌ Merge into Cases (as a status/filter) | A consultation is just a new case. |
| Customers | ✅ Keep | The CRM side. The people/orgs you serve. |
| Milestones | ❌ Move to Settings → Services | Configuration, not daily work. Shown inside each Case. |
| Audit Trail | ❌ Move to Case Detail (bottom) + Reports → Activity Log | Per-case history at the bottom of the case. Global audit in Reports. |

**Result: Operations = Cases + Customers only.** 2 items, not 6.

---

## 4. Calendar

The Calendar is a top-level nav item. Anything bounded by time appears here.

### What appears in the Calendar

- Case deadlines (BRELA submission date, TRA filing date, court dates)
- Document expiry dates (business licence expiring, work permit expiring)
- Recurring compliance deadlines (annual returns, quarterly filings)
- Scheduled customer reminders (call John tomorrow, send certificate Friday)
- Internal reminders assigned to staff (follow up with BRELA on Case #1042)
- Scheduled message sends (WhatsApp message queued for 9am Monday)
- Meeting/appointment bookings (client consultation at 2pm Thursday)

### Calendar views

- **Day** — hour-by-hour, today's items
- **Week** — 7-day grid, the default view
- **Month** — overview of upcoming deadlines
- **Agenda** — flat list of next 30 items, sorted by date

### Calendar entry fields

```
Calendar entry ID
Title (e.g., "BRELA submission — Case #1042")
Type: case_deadline / document_expiry / recurring_compliance /
      customer_reminder / internal_reminder / scheduled_message / meeting
Linked to: Case / Customer / Document / Reminder (polymorphic link)
Date + time (start)
Duration (for meetings) or instant (for deadlines)
Assigned to (staff member — who's responsible)
Source: auto-generated (from case/milestone) / manual
Recurrence: none / daily / weekly / monthly / yearly
Status: upcoming / due / overdue / completed / snoozed
Color (auto by type, or manual override)
Notes
```

### Manager → staff assignment

A manager can:
- Create a calendar entry and assign it to a staff member
- Drag-assign (drag a case deadline onto Sarah's row in week view)
- Reassign (if Sarah is out, move the entry to Joseph)
- Bulk-assign (select 5 entries → assign all to Joseph)

Each staff member sees their own calendar by default. Managers see a team view (toggle between "Mine" / "Team" / "Everyone").

### Smart behaviors

- Overdue items auto-escalate to red + bubble up to Dashboard
- Conflicts flagged (two deadlines same day → warning)
- Auto-create from milestones — when a case milestone has a due date, it auto-appears in the calendar
- Auto-create from document expiry — 60 days before a document expires, a renewal entry appears
- Snooze — push any item to tomorrow/next week/custom date

---

## 5. Cases

A Case is THE core entity. Every piece of work is a case.

### Cases List view

**Top bar:**
```
[ + New Case ]   [Filter ▾]   [Sort ▾]   [Search...]   [Bulk Actions ▾]
```

**Filter tabs:**
- All / New / In Progress / Waiting Customer / Completed / Cancelled / Mine / Unassigned / Overdue

**Filters:**
- Status, Priority, Assigned to, Service type, Customer type, Source, Date range

**Table columns:**
```
☐ | Case # | Tracking | Customer | Service | Status | Priority | Assignee | Fee | Balance | Updated
```

**Bulk actions** (select multiple rows):
- Assign to staff
- Change status
- Change priority
- Create invoices (bulk — one invoice per selected case)
- Export (CSV/Excel)
- Archive

### New Case form

```
Customer:          [search existing or create new ▾]
Service type:      [dropdown — from Settings → Services]
Source:            [website / walk-in / referral / phone / migration]
Priority:          [low / normal / high / urgent]
Assigned to:       [staff dropdown]
Title/Summary:     [free text]
KYC checklist:     [auto-renders based on selected service type]
Fee:               [auto-filled from service base, editable]
Amount paid now:   [TZS ___ — if any deposit collected, flows to Accounting]
Opening notes:     [free text]
[ Create Case ]
```

When the case is created:
- Tracking code auto-generated (6-char: 5 digits + 1 uppercase letter, e.g., "84729A")
- Milestone sequence auto-applied (from the service's template)
- KYC checklist auto-attached (from the service's doc requirements)
- If "amount paid now" > 0, an invoice + payment record auto-creates in Accounting
- Calendar entry auto-creates for the first milestone due date
- A welcome message can auto-send to the customer (if configured)

### Case detail view (sections, top to bottom)

1. **Header bar** — Case #, tracking code, Edit/Print/Close buttons
2. **Case overview** — Customer, service type, status, priority, assignee, source, dates
3. **KYC & Document checklist** — stages with required documents (see §7)
4. **Milestones** — progress bar + timeline
5. **Messages** — inbox thread with customer
6. **Documents** — all uploaded files, organized by stage
7. **Internal notes** — staff-only, with @mentions
8. **Fee & Payment** — linked to Accounting (invoice, quotation, payment links)
9. **Reminders & Deadlines** — this case's time-bound items
10. **Activity / Audit Trail** — at the bottom (who changed what, when)
11. **Sidebar actions** — quick status, assign, print, duplicate, merge, archive

### Case fields (complete)

```
Case ID (auto)
Tracking code (6-char) — public-facing, unique
Customer (link)
Service type (link)
Status: new / in_progress / waiting_customer / completed / cancelled
Priority: low / normal / high / urgent
Assigned to (staff)
Source: website_form / walk_in / referral / phone / migration / admin_created
Title/Summary
Opened date, Closed date, Last activity
Milestones, Messages, Internal notes, Public notes
Documents, Timeline, Status history (audit trail)
Fee, Discount, Total, Amount paid, Balance, Payment status
Invoice link, Quotation link, Proforma link
Reminders, Calendar entries
Created by/at, Updated by/at
```

### Tracking code format

- 6 characters: 5 digits + 1 uppercase letter (e.g., `84729A`)
- Display: space-separated groups of 2 → `84 72 9A`
- Keyspace: 2.6 million combinations
- Cryptographically secure generation
- Security: generic 404 for invalid codes (no info leakage)
- Rate limiting: 20 failed lookups/min per IP → 5min block; 10 fails per code → 24h lock

---

## 6. Customers

### Customer fields (complete)

```
Customer ID
Name (individual or company)
Type: individual / company / ngo / institution / foreign_business
Email, Phone, Alt phone, Address, WhatsApp
WhatsApp opt-in, Email opt-in, SMS opt-in
Preferred contact medium: WhatsApp / Email / SMS / Phone call
Preferred contact time: Morning / Afternoon / Evening
Industry (optional)
Notes
KYC documents (reusable across cases)
Cases (list, with status)
Total cases count, First engagement date, Last activity
Payment history, Total outstanding balance
Source/referral
Created at, updated at
```

### Customer detail view

- Header: Name, type, contact info, preferred medium
- Cases: All their cases (current + historical), with status + balance
- Documents: Reusable KYC docs
- Payment history: All invoices + payments + total outstanding
- Reminders: Reminders tied to this customer
- Timeline: All activity
- Notes: Internal notes
- Actions: New case, create quotation, send message

---

## 7. The 4-Layer Document System

This is the most important system in the admin. It makes case workflows dynamic, admin-configurable, and reusable across industries.

### The 4 layers

```
LAYER 1: Document Types        (Settings → Document Library)
  e.g., "Memorandum of Articles", "National ID", "TIN Certificate"

LAYER 2: Document Blueprints   (attached to each Document Type)
  e.g., the MEMART template file + notes on how to fill it

LAYER 3: Service Stages        (Settings → Services → [service] → stages)
  e.g., Company Registration has 10 stages (BRELA name search → ... → final delivery)

LAYER 4: Stage Document Requirements  (each stage lists required doc types)
  e.g., Stage 1 requires: MEMART, National IDs, Proof of address
```

When a case is created with a service type, Layers 3 + 4 collapse into the case as a checklist.

### Layer 1: Document Types

```
Document Type ID
Name, Short code, Category, Description
Blueprint file, Blueprint notes, Required fields
Validity period (optional — does this doc expire?)
Is reusable across customers?
Tags, Is active
```

**Why a library:** If MEMART is needed by 5 different services, you define it ONCE. Update the blueprint once, all services benefit.

### Layer 2: Document Blueprints

Each Document Type can have:
- A template file (DOCX, PDF, or web form) with `{{placeholders}}`
- Filling notes (step-by-step)
- Common mistakes
- Required info checklist
- Version history

When a staff member needs to fill a MEMART for Case #1042:
1. Open the case → stage 1 → click "Generate MEMART"
2. System pulls the blueprint + auto-fills `{{company_name}}`, `{{directors}}`
3. Staff reviews, completes remaining fields, downloads/signs

### Layer 3: Service Stages

Each service type has an ordered list of stages. Admin can create/edit/reorder — fully dynamic, no code.

**Example: Company Registration stages**
```
1. BRELA Name Search
2. Submit to BRELA
3. Download forms
4. Fill & sign forms (MEMART, Form A, Form B)
5. Submit consolidation document (Form 92, 97 — signed)
6. Pay BRELA fees
7. Wait for certificate
8. Receive certificate of incorporation
9. [internal] Issue invoice
10. [internal] Final delivery to client
```

**Stage fields:**
```
Stage ID, Service type (link), Name, Description, Sequence order
Visibility: external (client sees it) / internal (staff-only)
Estimated duration
Auto-advance rule (auto-complete when all docs uploaded?)
Pre-message template, Completion message template
Required documents (array of Document Type IDs)
Is active
```

### Layer 4: Stage Document Requirements

When admin edits a stage, they see the required documents and can add/remove doc types, set pre-message and completion templates, and toggle auto-advance.

### How it renders inside a Case

```
✅ Stage 1: BRELA Name Search                    [Complete]
   ✅ Memorandum of Articles (MEMART)  — uploaded Jun 10
   ✅ Directors' National IDs          — uploaded Jun 10

🔄 Stage 2: Submit to BRELA                  [In progress]
   ✅ Form A — Application             — uploaded Jun 12
   ⏳ Form B — Declaration              — pending (blueprint available)

🔒 Stage 3: Wait for certificate            [Locked — Stage 2 incomplete]
```

**Behaviors:**
- Locked stages can't start until previous stage's docs are uploaded (configurable)
- Blueprint button generates the document from template, auto-filled
- Upload auto-matches to the required doc slot
- Stage complete when all docs uploaded (or manual)
- Milestone sync: when a stage completes, the corresponding milestone auto-completes + customer notification
- Reordering: existing cases keep their original sequence (snapshot at creation)

### Why this design is general (not industry-specific)

- A law firm: Service = "Litigation", Stages = "Filing → Discovery → Trial → Judgment"
- An accounting firm: Service = "Annual Audit", Stages = "Engagement → Fieldwork → Report → Filing"
- An HR consultancy: Service = "Work Permit", Stages = "Document collection → Application → Follow-up → Approval"

All admin-configured — no industry assumptions hardcoded.

---

## 8. Reminders & Notifications

### Two types of reminders

**Internal reminders** (staff-only):
- "Follow up with BRELA on Case #1042" — assigned to Sarah, due Jun 25
- Shown on Dashboard, in case detail, and in Messages → Reminders

**Customer reminders** (sent to the customer):
- "Your certificate is ready" — via WhatsApp (customer's preferred medium)
- "Annual return due in 30 days" — via Email
- "Payment balance due" — via SMS

### Reminder fields (complete)

```
Reminder ID
Type: internal / customer
Title, Description
Linked to: Case / Customer / Document / standalone
Assigned to (staff) / Recipient (customer)
Due date/time
Recurrence: none / daily / weekly / monthly / yearly / custom
Recurrence end: never / on date / after X occurrences
Medium: WhatsApp / Email / SMS / in-app / phone (customer only)
Template (link, optional)
Status: pending / sent / snoozed / completed / cancelled / failed
Snoozed to, Escalation level, Quiet-hours aware, Urgent
Auto-generated, Created by/at, Sent at, Delivery log
```

### Smart behaviors (researched best practices)

| Feature | Behavior |
|---|---|
| Escalation | Overdue → notify assignee → 24h notify manager → 48h Dashboard flag |
| Auto-reassign on leave | If assignee on leave, reassign to backup |
| Smart timing | Customer reminders respect preferred contact time + timezone |
| Quiet hours | Staff reminders don't fire during off-hours; queue for morning |
| Batching | Multiple reminders due same day → ONE digest message |
| Daily digest | Configurable 8am email: "You have 5 reminders today..." |
| Focus mode | Snooze all non-urgent for 2hr; urgent break through |
| Auto-complete overdue | After 3 days, auto-complete or auto-snooze + escalate |
| Priority colors | Red (urgent) / Amber (high) / Blue (normal) |
| Snooze options | 5min / 15min / 1hr / tomorrow 9am / next week / custom |

### Multi-channel delivery (customer reminders)

- WhatsApp (if opt-in + preferred)
- Email (if opt-in)
- SMS (if opt-in)
- In-app notification (always)
- Phone call reminder (manual — creates task for staff)

### Reminder templates (in Settings)

- Pre-written templates per service type
- Variables: `{{customer_name}}`, `{{case_id}}`, `{{tracking_code}}`, `{{milestone}}`, `{{due_date}}`, `{{balance}}`
- Per-medium templates (WhatsApp longer; SMS ≤160 chars)

### Where reminders appear

1. Dashboard — today's pending reminders
2. Messages → Reminders — full list
3. Case Detail → Reminders section
4. Customer Detail → Reminders section
5. Calendar — all time-bound reminders

### Recurring reminders (critical for compliance business)

- "Annual return due for Levo Ltd" — yearly, auto-creates reminder + case each year
- "Tax filing due Q3" — quarterly
- "Business licence renewal" — annual

Connects to the Compliance Calendar on the public site.

---

## 9. Fees, Invoices, Quotations, Payments

### The complete money flow

```
SETTINGS (one-time, per service)
  Service: Company Registration
  Base fee: TZS 450,000
        │
        ▼ (copied when case created)
CASE #1042
  Fee: TZS 450,000, Paid: 225,000, Balance: 225,000
        │           │           │
  [Quotation]  [Invoice]  [Payment]
        ▼           ▼           ▼
  QUO-1042    INV-1042    PAY-1042a
        │           │           │
        └───────────┴───────────┘
                    │
                    ▼
              ACCOUNTING
```

### The 3 financial documents, fully linked

**Quotation (QUO-XXXX)**
- Created FROM a case
- Pre-invoice — sent for approval
- Fields: line items, subtotal, discount, tax (VAT 18%), total, validity, terms
- Status: draft → sent → approved / rejected / expired
- When approved → convert to Invoice (one click)

**Proforma Invoice (PRO-XXXX)**
- Formal "please pay this" document
- For advance payments before work starts
- When paid → converts to Invoice + Payment record

**Invoice (INV-XXXX)**
- The official accounting document
- Created FROM a case OR from approved quotation OR from proforma
- Status: draft → sent → partially_paid → paid / overdue / void
- Links to: Case, Customer, Payments, Quotation

### Smart wiring rules

1. **Case carries the fee** — service's base fee copies to case at creation; admin can override
2. **If case has no fee** — invoice/proforma carries the price; backfills to case
3. **Payment from case creation** — "amount paid now" > 0 auto-creates invoice + payment + links
4. **Partial payments** — multiple payments per case; balance = total − sum(payments)
5. **Refunds** — negative payment record linked to original; accounting stays balanced
6. **Quotation → Invoice** — one click; line items carry over
7. **Accounting ↔ Case** — bidirectional navigation (invoice → case, case → invoice)
8. **Overdue invoices** — auto-flag red + create reminder + Dashboard
9. **Tax (VAT)** — configurable per service; auto-calculates if VAT-able
10. **Currency** — TZS default; multi-currency (USD, EUR) for foreign investors

---

## 10. Accounting Module

### Nav items

```
Accounting ▸
  Overview, Quotations, Proformas, Invoices, Payments,
  Expenses, Reconciliation, Reports, Deadlines
```

### Overview dashboard

- Revenue this month / quarter / year
- Outstanding, Overdue, Expense summary, Net profit
- Charts: revenue trend, expense breakdown, top customers

### Reports

- Revenue by service type / customer / month
- Tax report (VAT, PAYE, SDL)
- Profit & Loss (P&L)
- Outstanding balances (aged: 0-30 / 31-60 / 61-90 / 90+ days)
- Expense report by category

---

## 11. Blog

### ⚠️ Caveat — Blog spec completeness rule

The fields below are the MINIMUM. If the admin already has a feature not mentioned here (article reading flow with scroll-based progress, etc.), **keep it**. Only ADD what's missing; never remove what exists.

### Blog Post fields

```
ID, Title (max 120), Slug, Excerpt (max 280)
Status: draft / pending_review / published / rejected / archived
Content: Introduction, Highlights[], Sections[], HTML (optional)
Featured image (1344×768px WebP ≤500KB), Alt text, Media label
Author, Category, Tags[]
Featured slot, Featured on home, Read time
Related posts[]
SEO: Meta title, Meta description, Canonical, OG image, Robots
Publishing: Published at/by, Updated at/by
Workflow: Created by/at, Edited by/at, Submitted by/at, Approved/rejected by/at, Rejection reason, Revision count
```

### Blog Categories fields

```
ID, Name, Slug, Description, Parent category (nesting), Sort order, Is active
```

### Blog Authors fields

```
ID, Name, Slug, Role, Bio, Avatar (96×96px), Is active
```

### Blog functionality

- CRUD, workflow (draft → review → publish → archive)
- Schedule posts, drag-and-drop featured slots
- Revision history, bulk actions, filtering, search
- Preview before publish, auto-slug, auto-read-time
- Article reading flow (scroll-based progress) — preserved from existing admin

---

## 12. Settings

Settings holds ALL configuration. Uses the pop-out panel (NOT in-page tabs — no double-nav).

### Setting sections

| Section | What it configures |
|---|---|
| Brand & Logo | name, tagline, logos, favicon, brandColors |
| Company Info | name, phones[], emails[], address, whatsapp |
| Navigation | Tree editor, 3-level hierarchy, drag-and-drop |
| Footer | quick_links[], resources[], tagline, cta, social_links[] |
| SEO Defaults | siteName, canonical, metaTitle, metaDescription, shareImage, robots |
| Offices & Hours | officeHours[], offices[] (with maps) |
| Social Links | platform, label, url, isActive |
| Policy Versions | privacy/cookie/data-rights versions |
| Services | The big one — see below |
| Service Types | CRUD (code, label, is_active, sort_order) |
| Document Library | 4-layer system — Document Types + Blueprints (see §7) |
| Email Identities | from-addresses, SMTP, sender names |
| Reminder Templates | Pre-written templates per service (see §8) |
| Message Templates | Opening/closing/milestone message templates |

### Services settings (the big one)

Each service type has:

```
Service ID, Name, Slug, Description, Category
Base fee, Fee breakdown (govt + org fee), VAT-able?, Tax rate

Stages (Layer 3 — drag-and-drop, admin-editable):
  Name, description, sequence, visibility (external/internal)
  Estimated duration, pre-message, completion message
  Required documents (Layer 4), auto-advance rule

Milestones (auto-generated from external stages):
  Name, client label, sequence
  Auto-notify on complete?, medium, reminder days

Opening message template, Closing message template
Is active, Sort order
```

---

## 13. Roles — Parked

**STATUS: PARKED.** Roles and permissions will be discussed separately with the developer team. Do NOT build role filtering yet.

### Design principles (for when this is unparked)

1. Roles are per-employee, not fixed classes — one employee can have multiple roles
2. Role library is flexible — admin can create/edit roles
3. Row-level filtering — some roles see only their own assigned cases (API-enforced)
4. Nav filtering — sidebar shows only items the employee's roles permit

### Draft role library (for discussion, NOT final)

```
superadmin, manager, consultant, accountant,
blog_writer, blog_editor, content_editor, reviewer,
media_manager, settings_manager, viewer
```

These are illustrative. The final role model will be decided with the developer team.

---

## 14. Caveats

1. **Do NOT remove existing admin features.** This is the minimum. Keep what exists; only add what's missing.
2. **General/generic design.** Reusable by other companies. No industry assumptions hardcoded.
3. **Settings vs. Operations separation.** Config = Settings. Daily work = Operations.
4. **No double-nav.** One navigation pattern per section.
5. **No search box inside the sidebar.** Sidebar is navigation only.
6. **Parking lot.** Roles parked. Service Requests/Consultations merged into Cases.
7. **Tracking code security.** Generic 404, POST not GET, rate limiting.
8. **Existing API contracts.** `src/exxonim/shared/contracts/` is the source of truth. Extend, don't remove.

---

*End of document. This records only what we discussed. It does not include styling specs, component recommendations, or implementation details — those are for the build team to decide.*
