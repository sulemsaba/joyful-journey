# Task 2a: Skeleton Rule — Inline Skeleton in index.html

## Summary
Implemented the "Skeleton Rule" UX expert standard by adding an inline skeleton shell inside `<div id="root">` in `index.html`. The skeleton shows the **shape of what's coming** (header → hero → review bar) while the real React content loads — NOT a full-screen blocker.

## What was changed
**File: `/home/z/my-project/index.html`** (only file modified)

### 1. Added `<style>` block in `<head>` with skeleton-critical CSS
- **Theme tokens** duplicated from globals.css for both `:root` (light) and `html[data-theme="dark"]` (dark) so the skeleton renders with correct colors BEFORE Vite's CSS bundle loads
- **Logo theme visibility** (`.sk-logo-light` / `.sk-logo-dark`) matching the existing `.logo-light`/`.logo-dark` pattern — correct favicon shows based on theme
- **Keyframe animations**: `sk-pulse` (2s scale 1→1.12→1) and `sk-dot` (1.4s staggered opacity)
- **Skeleton layout styles**: `.sk-header` (fixed, 60px mobile / 68px desktop), `.sk-hero` (94.5svh, max-height 600px mobile), `.sk-review-bar` (5.5svh)
- **Placeholder shapes**: `.sk-pill` (accent-soft bg), `.sk-pill-strong` (accent-soft-strong bg)

### 2. Added inline skeleton HTML inside `<div id="root">`
- **Header bar placeholder**: fixed position, faded favicon (theme-aware) + text placeholder on left, faded pill shapes for nav on right
- **Hero section placeholder**: centered favicon pulse animation + "Loading..." with animated dots
- **Review bar placeholder**: faded pill shapes
- All elements have `aria-hidden="true"`
- Favicon images use `.sk-logo-light`/`.sk-logo-dark` classes for theme-based visibility

## Key design decisions
1. **NOT a full-screen overlay** — the skeleton is inline, part of the page flow
2. **Shows structure, not a blank screen** — header bar, hero area, and review bar are all visible
3. **Favicon pulse is INSIDE the hero** — not blocking the entire screen
4. **Auto-hides on hydration** — React replaces `#root` content entirely, so the skeleton disappears naturally
5. **CSS custom properties** used throughout — respects the theme set by the blocking script
6. **`sk-` prefix** on all skeleton class names to avoid conflicts with app CSS

## Verification
- Lint passes clean (`bun run lint`)
- No files modified outside of `index.html`
- Existing `<head>` content preserved (blocking script, preloads, meta tags, etc.)
