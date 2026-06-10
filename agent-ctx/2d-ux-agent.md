# Task 2d — Hick's Law UX Standard

## Agent: UX Agent

## Summary
Applied Hick's Law to the homepage hero by creating a clear visual hierarchy between the two CTAs — making "Get Started" the single dominant primary action and demoting "Explore Services" to a subtle text link.

## Changes Made

### File: `/home/z/my-project/src/exxonim/components/ReferenceHero.tsx`
- Added `import { ArrowRight } from "lucide-react"` 
- Primary CTA: `size="standard"` → `size="hero"`, added ArrowRight icon after label
- Secondary CTA: Replaced `<Button variant="secondary">` with a subtle `<a>` text link with muted styling and small arrow
- Updated section comment to reference Hick's Law

### File: `/home/z/my-project/worklog.md`
- Appended task 2d work log entry

## Result
- Lint passes clean
- Visual hierarchy is now unambiguous — the large hero button with arrow naturally draws the eye, while the secondary option is available but not competing for attention
