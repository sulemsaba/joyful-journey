import { routes } from '@/exxonim/routes';
import { Button } from '@/exxonim/components/primitives/Button';
import type { ServiceFlowItem } from '@/exxonim/types';

/* ── Inline SVG icons for each step ──────────────────────── */

function IntakeIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function PreparationIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function SubmissionIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 2 11 13" />
      <path d="M22 2 15 22-4-9-9-4z" />
    </svg>
  );
}

function FollowThroughIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

const stepIcons = [
  <IntakeIcon key="0" />,
  <PreparationIcon key="1" />,
  <SubmissionIcon key="2" />,
  <FollowThroughIcon key="3" />,
];

/* ── Component ─────────────────────────────────────────────── */

interface HowItWorksSectionProps {
  flow: ServiceFlowItem[];
}

export function HowItWorksSection({ flow }: HowItWorksSectionProps) {
  return (
    <section
      className="py-16 md:py-24"
      aria-labelledby="how-it-works-title"
    >
      <div className="w-[min(1240px,calc(100%-2rem))] mx-auto">
        {/* Section Header */}
        <div className="grid gap-3 mb-10 md:mb-14 text-center max-w-[min(52ch,90%)] mx-auto">
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-accent">
            How it works
          </p>
          <h2
            id="how-it-works-title"
            className="text-[clamp(1.8rem,3.2vw,2.6rem)] font-semibold leading-tight tracking-tight text-text"
          >
            From first question to final delivery
          </h2>
          <p className="text-text-muted text-lg leading-relaxed">
            A clear, repeatable process that keeps every engagement visible and on track.
          </p>
        </div>

        {/* Step Cards - Horizontal scroll on mobile, grid on desktop */}
        <div className="flex gap-4 overflow-x-auto pb-4 md:pb-0 snap-x snap-mandatory scrollbar-none -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-4 md:overflow-visible">
          {flow.map((item, index) => (
            <article
              key={item.step}
              className="flex-shrink-0 w-[280px] md:w-auto snap-start rounded-[1.6rem] bg-gradient-to-b from-accent/90 to-accent p-6 md:p-7 grid gap-4 content-start text-accent-contrast transition-all duration-300 hover:-translate-y-1"
              data-reveal
            >
              {/* Step number */}
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent-contrast/15">
                  {stepIcons[index] ?? stepIcons[0]}
                </span>
                <span className="text-[0.78rem] font-extrabold tracking-[0.14em] uppercase opacity-80">
                  Step {item.step}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold leading-tight text-accent-contrast">
                {item.title}
              </h3>

              {/* Detail */}
              <p className="text-sm leading-relaxed text-accent-contrast/80">
                {item.detail}
              </p>
            </article>
          ))}
        </div>

        {/* CTA - action-oriented (CRO audit Problem 1) */}
        <div className="mt-10 md:mt-14 text-center flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            size="hero"
            variant="primary"
            href={`${routes.contact}#inquiry`}
          >
            Ask a Question - Free
          </Button>
          <Button
            size="hero"
            variant="secondary"
            href="#packages"
          >
            See Package Plans
          </Button>
        </div>
      </div>
    </section>
  );
}
