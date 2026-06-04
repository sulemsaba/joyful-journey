import type { FeatureVisualContent, FeatureVisualKey } from "./types";

function CardLight({
  brand,
  small,
  big,
  paragraph,
}: {
  brand: string;
  small: string;
  big: string;
  paragraph: string;
}) {
  return (
    <div className="w-[188px] min-h-[412px] rounded-3xl overflow-hidden border border-border-soft shadow-panel p-4 pb-5 bg-surface text-text max-lg:w-[160px] max-lg:min-h-[360px]">
      <div className="w-[3.6rem] h-[2px] rounded-full bg-current opacity-70 mb-4" />
      <div className="text-[0.78rem] font-bold tracking-[0.04em] uppercase opacity-90">{brand}</div>
      <div className="mt-3 text-[0.72rem] leading-relaxed opacity-70">{small}</div>
      <div className="mt-8 text-[1.08rem] leading-tight font-bold">{big}</div>
      <div className="mt-4 text-[0.84rem] leading-relaxed opacity-80">{paragraph}</div>
    </div>
  );
}

function CardDark({
  brand,
  paragraph,
  tag,
  items,
}: {
  brand: string;
  paragraph: string;
  tag: string;
  items: string[];
}) {
  return (
    <div className="w-[198px] min-h-[432px] rounded-3xl overflow-hidden border border-border-soft shadow-panel p-4 pb-5 bg-surface-elevated text-text max-lg:w-[170px] max-lg:min-h-[380px]">
      <div className="w-[3.6rem] h-[2px] rounded-full bg-current opacity-70 mb-4" />
      <div className="text-[0.78rem] font-bold tracking-[0.04em] uppercase opacity-90">{brand}</div>
      <div className="w-full h-px bg-current opacity-[0.12] my-4" />
      <div className="text-[0.84rem] leading-relaxed opacity-80">{paragraph}</div>
      <div className="w-full h-px bg-current opacity-[0.12] my-4" />
      <span className="inline-flex items-center justify-center min-h-[22px] px-[0.45rem] rounded-[6px] bg-accent-soft text-accent text-[0.62rem] font-bold uppercase">{tag}</span>
      <div className="mt-3 grid gap-3">
        {items.map((item) => (
          <div key={item} className="text-[0.68rem] leading-relaxed opacity-90">• {item}</div>
        ))}
      </div>
    </div>
  );
}

function CardNarrow({
  brand,
  title,
  copy,
}: {
  brand: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="w-[116px] min-h-[430px] rounded-3xl overflow-hidden border border-border-soft shadow-panel p-3.5 pb-4 bg-surface-elevated text-text max-lg:w-[100px] max-lg:min-h-[380px]">
      <div className="w-[3.6rem] h-[2px] rounded-full bg-current opacity-70 mb-4" />
      <div className="text-[0.78rem] font-bold tracking-[0.04em] uppercase opacity-90">{brand}</div>
      <div className="mt-4 text-[0.9rem] leading-tight font-bold">{title}</div>
      <div className="mt-2.5 text-[0.66rem] leading-relaxed opacity-80">{copy}</div>
    </div>
  );
}

export function ReferenceVisual({ index }: { index: number }) {
  const shellClasses = "w-full max-w-[560px] min-h-[520px] p-8 rounded-[34px] border border-border-soft shadow-panel transition-all max-lg:max-w-full max-lg:min-h-auto max-lg:p-5";

  if (index === 0) {
    return (
      <div className={`${shellClasses} bg-[linear-gradient(180deg,var(--color-surface),var(--color-surface-soft))]`}>
        <div className="w-full flex items-end justify-center gap-5 overflow-hidden">
          <CardLight brand="Reference" small="Registration Overview" big="Company, business name, NGO, and trademark setup support." paragraph="Structure first. Delays later become easier to prevent." />
          <CardDark brand="Reference" paragraph="Clear documentation, coordinated follow-up, and fewer avoidable corrections during setup." tag="Launch ready" items={["Company registration support", "Business name registration", "NGO / organization registration", "Trademark filing support"]} />
          <CardNarrow brand="File" title="Next-step visibility" copy="Better preparation before submission, review, and launch." />
        </div>
      </div>
    );
  }

  return (
    <div className={`${shellClasses} bg-[linear-gradient(180deg,var(--color-surface-soft),var(--color-surface))]`}>
      <div className="w-full flex items-end justify-center gap-5 overflow-hidden">
        <CardLight brand="Reference" small="Business Readiness Pack" big="Compliance, licensing, and institutional support you can act on." paragraph="Prepared documents move faster under review." />
        <CardDark brand="Reference" paragraph="Submission-ready support across tax, licensing, registrations, and operating approvals." tag="Operational readiness" items={["TIN application support", "Annual statutory returns", "OSHA / NSSF / WCF support", "Business plan preparation"]} />
        <CardNarrow brand="Review" title="Prepared for decision" copy="Lender, authority, and internal review readiness." />
      </div>
    </div>
  );
}

function ComposeVisual({
  title,
  label,
  pill,
  rows,
  subjectLabel,
  subjectValue,
  messageTitle,
  messageBody,
}: {
  title: string;
  label: string;
  pill: string;
  rows: Array<{ label: string; value: string }>;
  subjectLabel: string;
  subjectValue: string;
  messageTitle: string;
  messageBody: string;
}) {
  return (
    <div className="relative w-full max-w-[560px] min-h-[460px] p-[1.3rem] rounded-[2.2rem] border border-border-soft bg-surface shadow-panel overflow-hidden max-lg:max-w-full max-lg:aspect-[1.15/1]">
      <div className="absolute left-[2.4rem] top-0 bottom-0 w-[1px] bg-border-soft" aria-hidden="true" />

      <div className="relative z-10 grid gap-[1.1rem] max-w-[80%]">
        <div className="text-[1.15rem] font-bold text-text">{title}</div>

        <div>
          <div className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-text-soft mb-1.5">{label}</div>
          <div className="inline-flex items-center min-h-[1.8rem] px-[0.8rem] rounded-[0.6rem] bg-accent-soft text-accent text-[0.78rem] font-bold">{pill}</div>
        </div>

        {rows.map((row) => (
          <div key={row.label} className="grid grid-cols-[1fr_1.8fr] gap-3 items-center">
            <span className="text-[0.72rem] font-bold uppercase tracking-[0.08em] text-text-soft">{row.label}</span>
            <span className="text-[0.82rem] text-text-soft">{row.value}</span>
          </div>
        ))}

        <div className="grid grid-cols-[1fr_1.8fr] gap-3 items-start">
          <span className="text-[0.72rem] font-bold uppercase tracking-[0.08em] text-text-soft">{subjectLabel}</span>
          <span className="inline-flex items-center justify-center min-h-[2rem] px-3 rounded-[0.5rem] border border-border-soft bg-surface-elevated text-text text-[0.8rem]">{subjectValue}</span>
        </div>

        <div className="mt-2 grid gap-1.5">
          <h4 className="m-0 text-[0.92rem] font-bold leading-tight text-text">{messageTitle}</h4>
          <p className="m-0 text-[0.78rem] leading-relaxed text-text-soft">{messageBody}</p>
        </div>
      </div>
    </div>
  );
}

export function renderFeatureVisual(
  visualKey: FeatureVisualKey,
  featureVisuals: Record<string, FeatureVisualContent>
) {
  const content = featureVisuals[visualKey] ?? featureVisuals.tax;

  return (
    <ComposeVisual
      title="Service Coordination"
      label="Current workstream"
      pill={content.workstreamValue}
      rows={[{ label: content.counterpartLabel, value: content.counterpartValue }]}
      subjectLabel="Focus"
      subjectValue={content.focusValue}
      messageTitle={content.summaryTitle}
      messageBody={content.summaryBody}
    />
  );
}
