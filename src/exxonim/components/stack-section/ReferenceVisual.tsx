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
    <div className="w-[130px] sm:w-[155px] lg:w-[188px] min-h-[140px] sm:min-h-[170px] lg:min-h-[220px] rounded-2xl lg:rounded-3xl overflow-hidden border border-border-soft p-3 sm:p-4 pb-4 lg:pb-5 bg-surface text-text">
      <div className="w-[2.2rem] lg:w-[3.6rem] h-[2px] rounded-full bg-current opacity-70 mb-3 lg:mb-4" />
      <div className="text-[0.62rem] lg:text-[0.78rem] font-bold tracking-[0.04em] uppercase opacity-90">{brand}</div>
      <div className="mt-1.5 lg:mt-3 text-[0.58rem] lg:text-[0.72rem] leading-relaxed opacity-70">{small}</div>
      <div className="mt-3 sm:mt-5 lg:mt-8 text-[0.8rem] lg:text-[1.08rem] leading-tight font-bold">{big}</div>
      <div className="mt-2 lg:mt-4 text-[0.66rem] lg:text-[0.84rem] leading-relaxed opacity-80">{paragraph}</div>
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
    <div className="w-[136px] sm:w-[162px] lg:w-[198px] min-h-[140px] sm:min-h-[170px] lg:min-h-[220px] rounded-2xl lg:rounded-3xl overflow-hidden border border-border-soft p-3 sm:p-4 pb-4 lg:pb-5 bg-surface-elevated text-text">
      <div className="w-[2.2rem] lg:w-[3.6rem] h-[2px] rounded-full bg-current opacity-70 mb-3 lg:mb-4" />
      <div className="text-[0.62rem] lg:text-[0.78rem] font-bold tracking-[0.04em] uppercase opacity-90">{brand}</div>
      <div className="w-full h-px bg-current opacity-[0.12] my-2.5 lg:my-4" />
      <div className="text-[0.66rem] lg:text-[0.84rem] leading-relaxed opacity-80">{paragraph}</div>
      <div className="w-full h-px bg-current opacity-[0.12] my-2.5 lg:my-4" />
      <span className="inline-flex items-center justify-center min-h-[18px] lg:min-h-[22px] px-[0.35rem] lg:px-[0.45rem] rounded-[4px] lg:rounded-[6px] bg-accent-soft text-accent text-[0.5rem] lg:text-[0.62rem] font-bold uppercase">{tag}</span>
      <div className="mt-1.5 lg:mt-3 grid gap-1.5 lg:gap-3">
        {items.map((item) => (
          <div key={item} className="text-[0.54rem] lg:text-[0.68rem] leading-relaxed opacity-90">• {item}</div>
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
    <div className="hidden sm:block w-[90px] lg:w-[116px] min-h-[140px] sm:min-h-[170px] lg:min-h-[220px] rounded-2xl lg:rounded-3xl overflow-hidden border border-border-soft p-2.5 lg:p-3.5 pb-3 lg:pb-4 bg-surface-elevated text-text">
      <div className="w-[2.2rem] lg:w-[3.6rem] h-[2px] rounded-full bg-current opacity-70 mb-3 lg:mb-4" />
      <div className="text-[0.62rem] lg:text-[0.78rem] font-bold tracking-[0.04em] uppercase opacity-90">{brand}</div>
      <div className="mt-2.5 lg:mt-4 text-[0.72rem] lg:text-[0.9rem] leading-tight font-bold">{title}</div>
      <div className="mt-1.5 lg:mt-2.5 text-[0.52rem] lg:text-[0.66rem] leading-relaxed opacity-80">{copy}</div>
    </div>
  );
}

export function ReferenceVisual({ index }: { index: number }) {
  const shellClasses = "w-full max-w-[560px] p-4 sm:p-5 lg:p-8 transition-all max-lg:max-w-full";

  if (index === 0) {
    return (
      <div className={`${shellClasses} bg-[linear-gradient(180deg,var(--color-surface),var(--color-surface-soft))]`}>
        <div className="w-full flex items-end justify-center gap-2 sm:gap-3 lg:gap-5 overflow-hidden">
          <CardLight brand="" small="" big="" paragraph="" />
          <CardDark brand="" paragraph="" tag="" items={[]} />
          <CardNarrow brand="" title="" copy="" />
        </div>
      </div>
    );
  }

  return (
    <div className={`${shellClasses} bg-[linear-gradient(180deg,var(--color-surface-soft),var(--color-surface))]`}>
      <div className="w-full flex items-end justify-center gap-2 sm:gap-3 lg:gap-5 overflow-hidden">
        <CardLight brand="" small="" big="" paragraph="" />
        <CardDark brand="" paragraph="" tag="" items={[]} />
        <CardNarrow brand="" title="" copy="" />
      </div>
    </div>
  );
}

function ComposeVisual() {
  return (
    <div className="relative w-full max-w-[560px] p-4 sm:p-[1.1rem] lg:p-[1.3rem] bg-surface overflow-hidden max-lg:max-w-full min-h-[140px] sm:min-h-[170px] lg:min-h-[220px]">
      <div className="absolute left-[1.5rem] sm:left-[2rem] lg:left-[2.4rem] top-0 bottom-0 w-[1px] bg-border-soft" aria-hidden="true" />
    </div>
  );
}

export function renderFeatureVisual(
  _visualKey: FeatureVisualKey,
  _featureVisuals: Record<string, FeatureVisualContent>
) {
  return <ComposeVisual />;
}
