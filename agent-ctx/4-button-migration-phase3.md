# Task 4 — Button Migration Phase 3

**Agent:** Button Migration Agent (Phase 3)
**Task:** Replace hand-coded button classes with `<Button>` primitive from `@/exxonim/components/primitives/Button` — Phase 3 (newsletter, privacy, error, loader)

## Work Done

### NewsletterSection.tsx — 2 replacements
- Mobile "Subscribe" `<button>` → `<Button size="hero" variant="primary" type="submit" className="w-full !rounded-xl">`
- Desktop "Subscribe" `<button>` → `<Button size="hero" variant="primary" type="submit">`
- Left "Use a different email" `<button>` as-is (text link style, not a CTA)
- Added `import { Button } from './primitives/Button'`

### PrivacyConsentBanner.tsx — 2 replacements
- "Necessary only" `<button>` → `<Button size="standard" variant="secondary" onClick={...} disabled={consentMutation.isPending}>`
- "Allow preferences" `<button>` → `<Button size="hero" variant="primary" onClick={...} disabled={consentMutation.isPending}>`
- Added `import { Button } from "./primitives/Button"`

### ErrorBoundary.tsx — 2 replacements
- "Try again" `<button>` → `<Button size="standard" variant="secondary" onClick={this.handleReset}>`
- "Reload page" `<button>` → `<Button size="hero" variant="primary" onClick={this.handleReload}>`
- Added `import { Button } from "./primitives/Button"`
- `cn` import kept (still used for wrapper and icon circle)

### PageLoader.tsx — 1 replacement
- "Try Again" `<button>` → `<Button size="compact" variant="primary" onClick={handleRetry}>`
- Added `import { Button } from "./primitives/Button"`

### Intentionally Skipped
- WhatsAppButton.tsx — floating action button, outside tier system
- ScrollToTopButton.tsx — floating utility button with custom positioning/colors

## Result
- 7 hand-coded button elements replaced across 4 files
- Lint passes cleanly
- No unused imports introduced
