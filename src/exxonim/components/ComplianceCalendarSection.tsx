'use client';

import { routes } from '@/exxonim/routes';
import { Button } from '@/exxonim/components/primitives/Button';

/**
 * ComplianceCalendarSection - visual compliance calendar for Tanzania businesses.
 *
 * Shows a vertical timeline of 8 key Tanzania compliance deadlines grouped by
 * quarter, with a sticky CTA card on desktop. This is a key value-add feature
 * for the Services page - demonstrates Exxonim's deep knowledge of local
 * regulatory requirements and positions the firm as a compliance partner.
 *
 * BACKEND / ADMIN INTEGRATION NOTES (FastAPI):
 * ─────────────────────────────────────────────
 * Currently all deadlines are hardcoded. To make this dynamic:
 *   1. Create a `compliance_deadlines` table with columns:
 *      - id (UUID PK)
 *      - title (VARCHAR, e.g. "WCF Annual Return")
 *      - due_date_description (VARCHAR, e.g. "Due March 31")
 *      - description (TEXT, e.g. "Workers' Compensation Fund annual filing")
 *      - quarter (SMALLINT, 1-4)
 *      - sort_order (SMALLINT)
 *      - is_active (BOOLEAN DEFAULT TRUE)
 *   2. API endpoint: GET /api/v1/compliance/deadlines
 *   3. Admin UI should allow reordering, toggling visibility, and editing text.
 *   4. Consider adding a `jurisdiction` column if expanding beyond Tanzania.
 */

/* ── Deadline data ─────────────────────────────────────────── */

interface Deadline {
  title: string;
  dueDate: string;
  description: string;
}

interface QuarterGroup {
  label: string;
  deadlines: Deadline[];
}

const QUARTER_GROUPS: QuarterGroup[] = [
  {
    label: 'Q1',
    deadlines: [
      {
        title: 'WCF Annual Return',
        dueDate: 'Due March 31',
        description: "Workers' Compensation Fund annual filing",
      },
      {
        title: 'NSSF Employer Return',
        dueDate: 'Due March 31',
        description:
          'National Social Security Fund employer contribution reconciliation',
      },
    ],
  },
  {
    label: 'Q2',
    deadlines: [
      {
        title: 'BRELA Annual Returns',
        dueDate: 'Due within 42 days of company anniversary',
        description:
          'Business Registration and Licensing Agency annual filing',
      },
      {
        title: 'Business License Renewal',
        dueDate: 'Due before fiscal year start',
        description:
          'Annual business license renewal with local authority',
      },
    ],
  },
  {
    label: 'Q3',
    deadlines: [
      {
        title: 'TRA Provisional Tax Return',
        dueDate: 'Due within 3 months of year-end',
        description:
          'Tanzania Revenue Authority provisional tax assessment',
      },
      {
        title: 'OSHA Registration Renewal',
        dueDate: 'Due annually',
        description:
          'Occupational Safety and Health Authority workplace compliance',
      },
    ],
  },
  {
    label: 'Q4',
    deadlines: [
      {
        title: 'TRA Final Tax Return',
        dueDate: 'Due 6 months after year-end',
        description:
          'Final corporate income tax return filing',
      },
      {
        title: 'Beneficial Ownership Update',
        dueDate: 'Due with BRELA annual return',
        description:
          'Update beneficial ownership information with BRELA',
      },
    ],
  },
];

/* ── Inline SVG icons ──────────────────────────────────────── */

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

function BellIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function ShieldCheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

/* ── Sub-components ─────────────────────────────────────────── */

function QuarterLabel({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center justify-center min-h-[2rem] min-w-[2.5rem] px-3 rounded-full bg-accent-soft text-accent text-[0.78rem] font-extrabold tracking-[0.14em] uppercase">
      {label}
    </span>
  );
}

function DeadlineItem({ deadline }: { deadline: Deadline }) {
  return (
    <div className="flex items-start gap-4">
      {/* Dot on the timeline */}
      <span
        className="relative z-[1] mt-1.5 flex-shrink-0 w-3 h-3 rounded-full bg-accent ring-[3px] ring-accent/20"
        aria-hidden="true"
      />
      {/* Content */}
      <div className="flex-1 min-w-0">
        <strong className="block text-text text-[0.95rem] leading-tight font-semibold">
          {deadline.title}
        </strong>
        <span className="block mt-1 font-mono text-sm text-accent leading-relaxed">
          {deadline.dueDate}
        </span>
        <span className="block mt-0.5 text-text-muted text-sm leading-relaxed">
          {deadline.description}
        </span>
      </div>
    </div>
  );
}

function ReminderBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-accent text-[0.7rem] font-extrabold uppercase tracking-[0.1em]">
      <BellIcon className="h-3 w-3" />
      Ongoing reminders
    </span>
  );
}

function CTACard() {
  return (
    <div className="rounded-2xl md:rounded-[2rem] border border-border-soft bg-surface-elevated p-5 md:p-8 grid gap-4 md:gap-5 content-start">
      {/* Icon + heading */}
      <div className="flex items-start gap-3">
        <span className="inline-flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-xl bg-accent-soft text-accent flex-shrink-0">
          <ShieldCheckIcon className="h-4.5 w-4.5 md:h-5 md:w-5" />
        </span>
        <div>
          <h3 className="m-0 text-text text-lg font-semibold leading-tight tracking-tight">
            Never miss a deadline again
          </h3>
          <p className="m-0 mt-2 text-text-muted text-sm leading-relaxed">
            We track every regulatory deadline for your business and send you
            advance reminders so you&apos;re always prepared - never caught off
            guard.
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-border-soft" aria-hidden="true" />

      {/* Quick stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-accent-soft/60 p-3.5 text-center">
          <span className="block text-accent text-xl font-extrabold leading-none">8</span>
          <span className="block mt-1 text-text-muted text-xs leading-tight">Key deadlines tracked</span>
        </div>
        <div className="rounded-xl bg-accent-soft/60 p-3.5 text-center">
          <span className="block text-accent text-xl font-extrabold leading-none">∞</span>
          <span className="block mt-1 text-text-muted text-xs leading-tight">Unlimited reminders</span>
        </div>
      </div>

      {/* CTA buttons */}
      <div className="grid gap-3">
        <Button
          size="standard"
          variant="primary"
          href={routes.contact}
        >
          Get compliance support
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
        <Button
          size="standard"
          variant="secondary"
          href={routes.trackConsultation}
        >
          Track your consultation
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

/* ── Main component ────────────────────────────────────────── */

export function ComplianceCalendarSection() {
  return (
    <section
      aria-labelledby="compliance-calendar-title"
      className="py-10 md:py-24"
    >
      <div className="max-w-[1240px] px-4 sm:px-6 lg:px-8 mx-auto">
        {/* ── Section header ── */}
        <div className="grid gap-2.5 md:gap-3 mb-8 md:mb-14">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[0.78rem] font-extrabold tracking-[0.16em] uppercase text-text-soft">
              Compliance calendar
            </span>
            <ReminderBadge />
          </div>
          <h2
            id="compliance-calendar-title"
            className="m-0 text-[clamp(1.9rem,4vw,3rem)] font-medium leading-[1.05] tracking-tight text-text max-w-[28ch]"
          >
            Compliance deadlines you can&apos;t afford to miss
          </h2>
          <p className="m-0 max-w-[42rem] text-base leading-relaxed text-text-muted">
            We track these deadlines for our clients and send timely advance
            reminders so you&apos;re always prepared - no time limit.
          </p>
        </div>

        {/* ── Two-column layout on desktop ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 lg:gap-10 items-start">
          {/* Left: Timeline */}
          <div className="relative">
            {QUARTER_GROUPS.map((group, qi) => (
              <div key={group.label} className={qi > 0 ? 'mt-6 md:mt-8' : ''}>
                {/* Quarter heading */}
                <div className="flex items-center gap-3 mb-3 md:mb-4">
                  <QuarterLabel label={group.label} />
                  <span className="text-text-soft text-sm font-medium">
                    {qi === 0 && 'Jan – Mar'}
                    {qi === 1 && 'Apr – Jun'}
                    {qi === 2 && 'Jul – Sep'}
                    {qi === 3 && 'Oct – Dec'}
                  </span>
                </div>

                {/* Timeline items for this quarter */}
                <div className="relative ml-1.5 pl-5 md:pl-6 border-l-2 border-accent/30">
                  <div className="grid gap-4 md:gap-5">
                    {group.deadlines.map((deadline) => (
                      <DeadlineItem key={deadline.title} deadline={deadline} />
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Timeline end cap */}
            <div className="relative ml-1.5 pl-6 border-l-2 border-accent/30 mt-2">
              <span
                className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-accent/30"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Right: Sticky CTA card (desktop) */}
          <div className="hidden lg:block lg:sticky lg:top-[calc(var(--header-height,68px)+1.5rem)]">
            <CTACard />
          </div>

          {/* Mobile: CTA card below timeline */}
          <div className="lg:hidden">
            <CTACard />
          </div>
        </div>
      </div>
    </section>
  );
}
