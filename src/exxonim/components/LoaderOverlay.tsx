/* ═══════════════════════════════════════════════════════════════════════════
 * LOADER CATALOG — All project loaders in one file
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Every loader in the project is defined here with:
 *   - A unique LABEL name (used in comments & debugging)
 *   - POSITION: where it appears in the UI
 *   - STATUS: "active" | "disabled" | "deleted"
 *
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │  LOADER REGISTRY                                                    │
 * ├──────┬──────────────────────┬─────────────────────┬─────────────────┤
 * │  #   │ LABEL                │ POSITION            │ STATUS          │
 * ├──────┼──────────────────────┼─────────────────────┼─────────────────┤
 * │  L1  │ FAVICON_DOTS_LOADER  │ Full page center    │ disabled        │
 * │  L2  │ SKELETON_BARS        │ Inside page header  │ disabled        │
 * │  L3  │ SKELETON_CARDS       │ Inside page body    │ disabled        │
 * │  L4  │ PAGE_OVERLAY         │ Full page overlay   │ disabled        │
 * │  L5  │ SECTION_OVERLAY      │ Section overlay     │ disabled        │
 * │  L6  │ COMPACT_OVERLAY      │ 60vh compact center │ disabled        │
 * │  L7  │ HOME_PAGE_SKELETON   │ Full page (home)    │ disabled (LoadBoundary.tsx) │
 * │  L8  │ SERVICE_CARD_SKELETON│ Service grid cards  │ disabled (ServiceCard.tsx)  │
 * │  L9  │ TRACKING_SKELETON    │ Tracking page card  │ disabled (TrackConsultationPage.tsx) │
 * │  L10 │ BUTTON_SPINNER       │ Inside Button CTA   │ disabled (Button.tsx) │
 * │  L11 │ SUSPENSE_FALLBACK    │ <main> area         │ active (renders null) │
 * └──────┴──────────────────────┴─────────────────────┴─────────────────┘
 *
 * DELETED (removed from globals.css):
 *   - @keyframes shimmer
 *   - @keyframes loader-pulse
 *   - @keyframes loader-fade
 *   - .loader-dots + @keyframes loader-dot
 *   - .animate-shimmer
 *
 * RE-ENABLEMENT INSTRUCTIONS:
 *   1. Set the loader's STATUS to "active" in the table above
 *   2. Uncomment the component code below
 *   3. Re-add the required CSS keyframes to globals.css
 *   4. Test one loader at a time
 *
 * PRIORITY ORDER (test these first):
 *   L1 (FAVICON_DOTS_LOADER) → L4 (PAGE_OVERLAY) → L2/L3 (SKELETONS)
 * ═══════════════════════════════════════════════════════════════════════════ */

type LoaderOverlayVariant = "page" | "section" | "compact";

interface LoaderOverlayProps {
  variant?: LoaderOverlayVariant;
}

/* ─── L1: FAVICON_DOTS_LOADER ───────────────────────────────────────────
 * POSITION: Full page center / overlay center
 * APPEARANCE: Pulsing favicon image + "Loading" text + 3 animated dots
 * STATUS: disabled
 * CSS REQUIRED: @keyframes loader-pulse, .loader-dots, @keyframes loader-dot
 *               (add back to globals.css when re-enabling)
 */
export function LoaderIndicator() {
  return null;
  // ── Re-enable by uncommenting below + adding CSS to globals.css ──
  // return (
  //   <div className="flex flex-col items-center gap-4">
  //     {/* Pulsing favicon */}
  //     <div className="relative animate-[loader-pulse_2s_ease-in-out_infinite]">
  //       <img
  //         src="/branding/exxonim-favicon-light.png"
  //         alt=""
  //         width="48"
  //         height="48"
  //         className="logo-light block w-12 h-12 object-contain opacity-40"
  //       />
  //       <img
  //         src="/branding/exxonim-favicon-dark.png"
  //         alt=""
  //         width="48"
  //         height="48"
  //         className="logo-dark w-12 h-12 object-contain opacity-40"
  //       />
  //     </div>
  //     {/* "Loading" + three animated dots */}
  //     <div className="flex items-center opacity-30">
  //       <span className="font-sans text-sm font-medium text-text-muted tracking-[0.08em] uppercase">
  //         Loading
  //       </span>
  //       <span className="loader-dots font-sans text-sm font-medium text-text-muted" aria-hidden="true">
  //         <span>.</span><span>.</span><span>.</span>
  //       </span>
  //     </div>
  //   </div>
  // );
}

/* ─── L2: SKELETON_BARS ────────────────────────────────────────────────
 * POSITION: Inside page header area (part of L4/L5)
 * APPEARANCE: 4 horizontal gray bars of varying width with pulse animation
 * STATUS: disabled
 * CSS REQUIRED: animate-pulse (built-in Tailwind — always available)
 */
// function SkeletonBars() {
//   return (
//     <div className="grid gap-3" aria-hidden="true">
//       <div className="h-4 w-28 rounded-full bg-accent-soft animate-pulse" />
//       <div className="h-11 w-[min(30rem,88%)] rounded-full bg-accent-soft animate-pulse" />
//       <div className="h-4 w-[min(36rem,100%)] rounded-full bg-accent-soft animate-pulse" />
//       <div className="h-4 w-[min(28rem,80%)] rounded-full bg-accent-soft animate-pulse" />
//     </div>
//   );
// }

/* ─── L3: SKELETON_CARDS ───────────────────────────────────────────────
 * POSITION: Inside page body area (part of L4 only)
 * APPEARANCE: 3 placeholder cards in a grid with pulse animation
 * STATUS: disabled
 * CSS REQUIRED: animate-pulse (built-in Tailwind — always available)
 */
// function SkeletonCards() {
//   return (
//     <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4" aria-hidden="true">
//       <div className="min-h-[9rem] rounded-[1.25rem] bg-accent-soft/70 animate-pulse" />
//       <div className="min-h-[9rem] rounded-[1.25rem] bg-accent-soft/70 animate-pulse" />
//       <div className="min-h-[9rem] rounded-[1.25rem] bg-accent-soft/70 animate-pulse" />
//     </div>
//   );
// }

/* ─── L4: PAGE_OVERLAY ─────────────────────────────────────────────────
 * POSITION: Full page (variant="page") — covers main content area
 * APPEARANCE: SkeletonBars + SkeletonCards + centered LoaderIndicator on top
 * STATUS: disabled
 * CSS REQUIRED: L1 + L2 + L3 CSS
 */
/* ─── L5: SECTION_OVERLAY ──────────────────────────────────────────────
 * POSITION: Section-level (variant="section") — 15rem min-height
 * APPEARANCE: SkeletonBars only + centered LoaderIndicator on top
 * STATUS: disabled
 * CSS REQUIRED: L1 + L2 CSS
 */
/* ─── L6: COMPACT_OVERLAY ──────────────────────────────────────────────
 * POSITION: Compact center (variant="compact") — 60vh centered
 * APPEARANCE: LoaderIndicator only
 * STATUS: disabled
 * CSS REQUIRED: L1 CSS
 */
export function LoaderOverlay({ variant: _variant = "page" }: LoaderOverlayProps) {
  return null;
  // ── Re-enable by uncommenting below + enabling L1/L2/L3 ──
  // if (variant === "compact") {
  //   return (
  //     <div
  //       className="flex items-center justify-center min-h-[60vh] w-full"
  //       role="status"
  //       aria-live="polite"
  //     >
  //       <LoaderIndicator />
  //     </div>
  //   );
  // }
  // const isSection = variant === "section";
  // return (
  //   <div
  //     className="relative isolate overflow-hidden flex items-center w-full"
  //     style={{ minHeight: isSection ? "15rem" : "clamp(24rem,48vh,34rem)" }}
  //     role="status"
  //     aria-live="polite"
  //   >
  //     <div
  //       className="w-[min(1180px,calc(100%-2rem))] mx-auto"
  //       style={{ padding: isSection ? "1.25rem" : "2rem", marginTop: isSection ? 0 : "1.5rem" }}
  //       aria-hidden="true"
  //     >
  //       <SkeletonBars />
  //       {!isSection && <SkeletonCards />}
  //     </div>
  //     <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
  //       <LoaderIndicator />
  //     </div>
  //   </div>
  // );
}
