# Task 2 — Button Migration Agent

## Summary
Replaced 7 hand-coded button/link elements with the `<Button>` primitive from `@/exxonim/components/primitives/Button` across 4 navigation files.

## Files Modified
1. **`src/exxonim/components/primitives/Button.tsx`** — Enhanced primitive:
   - `onClick` now works on both `<button>` and `<a>` elements (`React.MouseEventHandler<HTMLElement>`)
   - Added `...rest` spread for passthrough of ARIA and other HTML attributes
   - Split types into `ButtonOwnProps` + `ButtonRestProps` for proper TS support
   - Passed `onClick` and `{...rest}` to `<a>` render path

2. **`src/exxonim/components/Navigation.tsx`** — 2 replacements:
   - Call Now `<a>` → `<Button size="hero" variant="ghost">` with className overrides
   - Mobile hamburger `<button>` → `<Button size="icon" variant="ghost">` with rest props for ARIA

3. **`src/exxonim/components/navigation/DesktopNavigation.tsx`** — 2 replacements:
   - Track Consultation pill → `<Button size="compact" variant="primary">` with animated dot + active state
   - "See All Services" link → `<Button size="compact" variant="primary">`

4. **`src/exxonim/components/navigation/MobileNavigationPanel.tsx`** — 2 replacements:
   - Accordion CTA → `<Button size="compact" variant="primary">`
   - Track Consultation pill → `<Button size="standard" variant="primary">` with animated dot + active state
   - Removed unused `normalizePathname` import

5. **`src/exxonim/components/navigation/MegaMenuColumns.tsx`** — 1 replacement:
   - Footer CTA → `<Button size="compact" variant="primary">`

## Elements Intentionally Left As-Is
- Regular nav links (navigation, not CTAs)
- Mobile Call Now FAB (outside tier system, h-14)
- Accordion toggle buttons (not CTAs)
- Feature Box CTA (not in task spec, different styling)

## Verification
- `bun run lint` passes cleanly
- Dev server compiles successfully (GET / 200)
