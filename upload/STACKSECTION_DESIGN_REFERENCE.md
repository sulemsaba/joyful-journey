# StackSection — Visual Halves Design Reference

> **Purpose:** Complete design specification for the "StackSection" component — a two-column layout with text content on the left and a video placeholder surface on the right. This is the exact design extracted from the Mobbin-style reference, with every rule, token, and responsive behavior documented.

---

## Table of Contents

1. [Overview & Anatomy](#1-overview--anatomy)
2. [Section Container](#2-section-container)
3. [Grid Layout](#3-grid-layout)
4. [Left Half — Text Content](#4-left-half--text-content)
5. [Right Half — Video Placeholder Surface](#5-right-half--video-placeholder-surface)
6. [CSS Custom Properties System](#6-css-custom-properties-system)
7. [Responsive Breakpoint Rules](#7-responsive-breakpoint-rules)
8. [Color Palette](#8-color-palette)
9. [Typography](#9-typography)
10. [Spacing & Sizing](#10-spacing--sizing)
11. [Shadows & Borders](#11-shadows--borders)
12. [Animations](#12-animations)
13. [Video Element Rules](#13-video-element-rules)
14. [Accessibility Notes](#14-accessibility-notes)
15. [Full Component Code](#15-full-component-code)
16. [Visual Diagram](#16-visual-diagram)

---

## 1. Overview & Anatomy

The section is a **two-column split** (stacked on mobile, side-by-side on md+):

```
┌──────────────────────────────────────────────────────────────┐
│  SECTION (bg: gray-50/50, py-16 md:py-24, px-6)            │
│  ┌──────────────────── max-w-[1280px] ────────────────────┐ │
│  │                                                        │ │
│  │  ┌─── TEXT HALF ───┐   ┌── VIDEO SURFACE HALF ──────┐ │ │
│  │  │                  │   │                            │ │ │
│  │  │  [Badge pill]    │   │  ┌──────────────────────┐  │ │ │
│  │  │                  │   │  │                      │  │ │ │
│  │  │  H2 Heading      │   │  │   VIDEO (floating)   │  │ │ │
│  │  │                  │   │  │   aspect-ratio 0.462 │  │ │ │
│  │  │  Body paragraph  │   │  │                      │  │ │ │
│  │  │                  │   │  └──────────────────────┘  │ │ │
│  │  │                  │   │                            │ │ │
│  │  └──────────────────┘   └────────────────────────────┘ │ │
│  │                                                        │ │
│  └────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

**Key concept:** The right half is NOT a simple video embed. It is a **gray surface** (the "placeholder") with a **video floating inside it**, absolutely positioned and centered. The video is smaller than the surface — like a phone screen sitting on a desk.

---

## 2. Section Container

### Outer `<section>`

| Property | Value | Notes |
|----------|-------|-------|
| Background | `bg-gray-50/50` | 50% opacity gray-50 over white = very subtle warm tint |
| Padding X | `px-6` (24px) | Consistent horizontal gutters |
| Padding Y (default) | `py-16` (64px) | Mobile vertical spacing |
| Padding Y (md) | `md:py-24` (96px) | Tablet+ vertical spacing |

### Inner wrapper

| Property | Value | Notes |
|----------|-------|-------|
| Max width | `max-w-[1280px]` | Hard-coded max content width |
| Centering | `mx-auto` | Auto margins to center |
| Margin X | Inherited from section `px-6` | No extra margins needed |

---

## 3. Grid Layout

The two-column layout uses CSS Grid:

| Property | Default | md (768px+) | xl (1280px+) |
|----------|---------|-------------|--------------|
| Columns | `1` (stacked) | `md:grid-cols-2` | `grid-cols-2` |
| Gap | `gap-12` (48px) | `md:gap-12` (48px) | `xl:gap-20` (80px) |
| Alignment | `items-center` | `items-center` | `items-center` |

```
grid items-center gap-12 md:grid-cols-2 md:gap-12 xl:gap-20
```

**Rule:** On mobile, the text half stacks ABOVE the video surface. On md+ they sit side by side. The `items-center` vertically centers both halves against each other.

---

## 4. Left Half — Text Content

### Container

```
space-y-6 md:pr-4
```

| Property | Value | Notes |
|----------|-------|-------|
| Vertical gap between children | `space-y-6` (24px) | Between badge, heading, paragraph |
| Right padding (md+) | `md:pr-4` (16px) | Breathing room before grid gap |

### Badge Pill

```
inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-200
```

| Property | Value | Notes |
|----------|-------|-------|
| Display | `inline-flex items-center` | Flex for vertical centering |
| Shape | `rounded-full` | Fully rounded (pill shape) |
| Background | `bg-emerald-50` (#ecfdf5) | Very light emerald tint |
| Text color | `text-emerald-700` (#047857) | Dark emerald for readability |
| Padding | `px-3 py-1` (12px horizontal, 4px vertical) | Compact pill |
| Font size | `text-xs` (12px / 0.75rem) | Small label |
| Font weight | `font-medium` (500) | Semi-bold for emphasis |
| Border | `ring-1 ring-inset ring-emerald-200` | 1px inset ring in light emerald |

> **Design rule:** The badge uses emerald (green) tones, NOT indigo/blue. The ring is `ring-inset` so it sits inside the element boundary (doesn't add outer dimension).

### Heading (H2)

```
text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl
```

| Property | Default | sm (640px+) |
|----------|---------|-------------|
| Font size | `text-3xl` (30px / 1.875rem) | `sm:text-4xl` (36px / 2.25rem) |
| Font weight | `font-bold` (700) | — |
| Letter spacing | `tracking-tight` (-0.025em) | — |
| Color | `text-gray-900` (#111827) | — |

### Body Paragraph

```
text-lg leading-relaxed text-gray-600
```

| Property | Value | Notes |
|----------|-------|-------|
| Font size | `text-lg` (18px / 1.125rem) | Comfortable reading size |
| Line height | `leading-relaxed` (1.625) | ~29px — generous for readability |
| Color | `text-gray-600` (#4b5563) | Soft, not harsh |

---

## 5. Right Half — Video Placeholder Surface

This is the **core design element**. It is NOT a simple video container. It's a two-layer system:

### Layer 1: The Surface (outer gray container)

```
relative w-full overflow-hidden rounded-[16px] bg-gray-100/80 ring-1 ring-gray-900/5
```

| Property | Default | md (768px+) | xl (1280px+) |
|----------|---------|-------------|--------------|
| Aspect ratio | `aspect-[0.8]` | `md:aspect-[0.72]` | `xl:aspect-[1.22]` |
| | Portrait-ish | More portrait | **Landscape** |

| Property | Value | Notes |
|----------|-------|-------|
| Position | `relative` | Anchor for absolutely-positioned video child |
| Width | `w-full` | Fills its grid column |
| Overflow | `overflow-hidden` | Clips the video rounded corners |
| Border radius | `rounded-[16px]` | Custom radius (not a Tailwind preset) |
| Background | `bg-gray-100/80` | 80% opacity gray-100 — soft warm gray |
| Border ring | `ring-1 ring-gray-900/5` | Ultra-subtle 5% gray ring |

> **CRITICAL RULE:** The surface aspect ratio CHANGES per breakpoint. On mobile it's portrait (0.8), on desktop it's landscape (1.22). This is intentional — the surface adapts its shape to the column width, while the video inside maintains its own fixed proportions.

### Layer 2: Inner wrapper

```
relative size-full
```

A simple `position: relative; width: 100%; height: 100%` wrapper that fills the surface. Needed as a positioning context for the absolutely-positioned video.

### Layer 3: The Video (floating inside the surface)

The video is **absolutely positioned** inside the surface — it does NOT fill it. It floats with gray space visible around it, like a phone screen on a desk.

```
pointer-events-none absolute rounded-[20px] object-cover object-top
shadow-[0px_8px_40px_0px_rgba(0,0,0,0.06)] border border-gray-900/5
```

Inline styles (via CSS custom properties):

```css
top: var(--video-y-offset);
left: calc((100% - var(--video-width)) / 2);
width: var(--video-width);
aspect-ratio: 0.462;
```

| Property | Value | Notes |
|----------|-------|-------|
| Position | `absolute` | Removed from flow, positioned relative to surface |
| Aspect ratio | `0.462` (ALWAYS FIXED) | Tall phone screen shape — **never changes** |
| Horizontal centering | `left: calc((100% - var(--video-width)) / 2)` | Dynamically centered |
| Top offset | `var(--video-y-offset)` | Small gap from top edge |
| Width | `var(--video-width)` | Controlled by CSS custom property per breakpoint |
| Border radius | `rounded-[20px]` | Slightly more rounded than the surface (16px) |
| Object fit | `object-cover` | Video fills the container, crops overflow |
| Object position | `object-top` | Anchor to top when cropping |
| Shadow | `0px 8px 40px 0px rgba(0,0,0,0.06)` | Ultra-soft elevation shadow |
| Border | `border border-gray-900/5` | 5% gray hairline border |
| Pointer events | `pointer-events-none` | Video is not interactive |
| Rounded corners | `rounded-[20px]` | More rounded than the surface — creates depth illusion |

> **CRITICAL RULE:** The video's `aspect-ratio: 0.462` is CONSTANT across all breakpoints. Only its width and y-offset change. This ensures the video always looks like a tall phone screen.

---

## 6. CSS Custom Properties System

The responsive positioning of the video is controlled by **CSS custom properties** set on the video's grandparent wrapper. This is the elegant way to make inline styles responsive in Tailwind:

### Wrapper element classes:

```
relative w-full
[--video-width:65%] [--video-y-offset:8.5%]
md:[--video-width:63%] md:[--video-y-offset:7.5%]
xl:[--video-width:37%] xl:[--video-y-offset:8.75%]
```

### Variable values per breakpoint:

| Variable | Default (mobile) | md (768px+) | xl (1280px+) |
|----------|-----------------|-------------|--------------|
| `--video-width` | `65%` | `63%` | `37%` |
| `--video-y-offset` | `8.5%` | `7.5%` | `8.75%` |

### How they work:

- `--video-width`: What percentage of the surface width the video occupies
  - Mobile: 65% (large, fills most of the portrait surface)
  - Desktop: 37% (small, sits centered in the wide landscape surface)
- `--video-y-offset`: How far from the top the video sits (as % of surface height)
  - ~8% across all breakpoints — small gap from top edge

### Why CSS custom properties?

Tailwind can't do responsive inline styles. By setting CSS variables with responsive `md:` / `xl:` prefixes on the parent, then using those variables in inline `style={{}}` on the child, we get responsive inline styles. This is the recommended pattern.

---

## 7. Responsive Breakpoint Rules

### Summary table

| Element | Property | Default (<768px) | md (≥768px) | xl (≥1280px) |
|---------|----------|-------------------|-------------|---------------|
| **Section** | padding-y | `py-16` (64px) | `md:py-24` (96px) | — |
| **Grid** | columns | 1 (stacked) | 2 (side by side) | 2 |
| **Grid** | gap | `gap-12` (48px) | `md:gap-12` (48px) | `xl:gap-20` (80px) |
| **Text half** | padding-right | none | `md:pr-4` (16px) | — |
| **H2** | font-size | `text-3xl` (30px) | — | `sm:text-4xl` (36px) |
| **Surface** | aspect-ratio | `0.8` | `0.72` | `1.22` |
| **Video** | width | `65%` | `63%` | `37%` |
| **Video** | y-offset | `8.5%` | `7.5%` | `8.75%` |
| **Video** | aspect-ratio | `0.462` (fixed) | `0.462` (fixed) | `0.462` (fixed) |

### Layout behavior:

1. **Mobile (<768px):** Single column. Text on top, surface below. Surface is portrait (0.8). Video fills 65% of surface width.
2. **Tablet (768-1279px):** Two columns. Surface is more portrait (0.72). Video fills 63% of surface width.
3. **Desktop (≥1280px):** Two columns with wider gap. Surface becomes **landscape** (1.22). Video shrinks to 37% of surface width — appearing as a small phone screen floating on a wide gray surface.

---

## 8. Color Palette

| Token | Tailwind Class | Hex Value | Usage |
|-------|---------------|-----------|-------|
| Surface background | `bg-gray-100/80` | #f3f4f6 @ 80% | Video placeholder surface fill |
| Surface ring | `ring-gray-900/5` | #111827 @ 5% | Surface hairline border |
| Video border | `border-gray-900/5` | #111827 @ 5% | Video hairline border |
| Video shadow | — | rgba(0,0,0,0.06) | Soft elevation under video |
| Badge background | `bg-emerald-50` | #ecfdf5 | Badge pill fill |
| Badge text | `text-emerald-700` | #047857 | Badge label |
| Badge ring | `ring-emerald-200` | #a7f3d0 | Badge pill border |
| Heading text | `text-gray-900` | #111827 | Section heading |
| Body text | `text-gray-600` | #4b5563 | Paragraph text |
| Section background | `bg-gray-50/50` | #f9fafb @ 50% | Subtle section tint |
| Page background | `bg-white` | #ffffff | White page base |

> **Color rule:** The palette is strictly gray + emerald accent. No indigo, no blue. The grays use very low opacity (5%) for borders/rings — they're felt, not seen.

---

## 9. Typography

| Element | Font | Size | Weight | Line Height | Tracking | Color |
|---------|------|------|--------|-------------|----------|-------|
| Badge | Inter | 12px (`text-xs`) | 500 (`font-medium`) | — | — | emerald-700 |
| H2 | Inter | 30px → 36px (`text-3xl sm:text-4xl`) | 700 (`font-bold`) | — | -0.025em (`tracking-tight`) | gray-900 |
| Body | Inter | 18px (`text-lg`) | 400 | 1.625 (`leading-relaxed`) | — | gray-600 |

**Font family:** `Inter` (variable font, 14-32px optical size range, weights 300-700). Loaded via `next/font/google` with CSS variable `--font-inter`.

---

## 10. Spacing & Sizing

| Element | Property | Value |
|---------|----------|-------|
| Section horizontal padding | `px-6` | 24px |
| Section vertical padding (mobile) | `py-16` | 64px top + bottom |
| Section vertical padding (md+) | `md:py-24` | 96px top + bottom |
| Content max-width | `max-w-[1280px]` | 1280px |
| Grid gap (default/md) | `gap-12` | 48px |
| Grid gap (xl) | `xl:gap-20` | 80px |
| Text half internal spacing | `space-y-6` | 24px between children |
| Text half right padding (md+) | `md:pr-4` | 16px |
| Badge horizontal padding | `px-3` | 12px |
| Badge vertical padding | `py-1` | 4px |
| Surface border radius | `rounded-[16px]` | 16px |
| Video border radius | `rounded-[20px]` | 20px |

> **Sizing rule:** The video `rounded-[20px]` is intentionally LARGER than the surface `rounded-[16px]`. This creates a subtle depth illusion — the inner element appears to have softer curves, reinforcing the "floating" effect.

---

## 11. Shadows & Borders

### Video shadow

```css
box-shadow: 0px 8px 40px 0px rgba(0, 0, 0, 0.06);
```

| Parameter | Value | Notes |
|-----------|-------|-------|
| X offset | 0px | No horizontal shift |
| Y offset | 8px | Casts downward |
| Blur | 40px | Very soft, wide spread |
| Spread | 0px | No expansion |
| Color | rgba(0,0,0,0.06) | Ultra-subtle — 6% black |

> **Shadow rule:** The shadow is barely visible — it's meant to create a sense of elevation, not draw attention. If you can clearly see the shadow, it's too strong.

### Surface ring

```css
ring-1 ring-gray-900/5
/* Compiles to: box-shadow: 0 0 0 1px rgba(17, 24, 39, 0.05) */
```

A 1px inset shadow in 5% gray — defines the surface edge without a hard border.

### Video border

```css
border border-gray-900/5
/* 1px solid rgba(17, 24, 39, 0.05) */
```

Same 5% gray as the surface ring. Consistent hairline treatment.

---

## 12. Animations

### Entry animations (Framer Motion)

**Text half — slide from left:**

```typescript
initial={{ opacity: 0, x: -32 }}
whileInView={{ opacity: 1, x: 0 }}
viewport={{ once: true, margin: "-80px" }}
transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
```

| Parameter | Value | Notes |
|-----------|-------|-------|
| Start | opacity 0, x -32px | Invisible, 32px left |
| End | opacity 1, x 0 | Natural position |
| Duration | 600ms | Smooth but not slow |
| Easing | [0.25, 0.4, 0.25, 1] | Custom cubic-bezier — ease-out-ish |
| Trigger | `whileInView` | Plays when scrolled into view |
| Fire once | `viewport.once: true` | Doesn't replay on scroll back |
| Margin | `-80px` | Triggers 80px before fully in view |

**Video half — slide from right:**

```typescript
initial={{ opacity: 0, x: 32 }}
whileInView={{ opacity: 1, x: 0 }}
viewport={{ once: true, margin: "-80px" }}
transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
```

Same as text half but slides from the RIGHT (x: 32). Both halves enter simultaneously from opposite sides.

### Easing curve

```
cubic-bezier(0.25, 0.4, 0.25, 1.0)
```

This is a smooth ease-out curve — starts quick, decelerates gently. Not as aggressive as `ease-out` (0, 0, 0.2, 1) but more dynamic than `ease` (0.25, 0.1, 0.25, 1).

---

## 13. Video Element Rules

### Required attributes

```html
<video
  autoPlay
  muted
  loop
  playsInline
  disablePictureInPicture
  disableRemotePlayback
>
```

| Attribute | Why | Notes |
|-----------|-----|-------|
| `autoPlay` | Video plays on load | REQUIRED to also have `muted` for browser policy |
| `muted` | Required for autoplay | Browsers block unmuted autoplay |
| `loop` | Video loops infinitely | No start/end, continuous motion |
| `playsInline` | iOS inline playback | Prevents fullscreen on iPhone |
| `disablePictureInPicture` | No PiP button | Cleaner UI — this is decorative, not user-controlled |
| `disableRemotePlayback` | No AirPlay/cast | Same reason — not interactive |

### Styling rules

| Rule | Value | Why |
|------|-------|-----|
| `pointer-events: none` | `pointer-events-none` | Video is decorative, not interactive |
| `object-fit: cover` | `object-cover` | Fill the container, crop overflow |
| `object-position: top` | `object-top` | Anchor crop to top (faces/content usually at top) |
| No controls | No `controls` attribute | Hide play/pause/seek — it's a visual element |

### Video source

```html
<source src="/showcase.mp4" type="video/mp4" />
```

- Served locally from `/public/showcase.mp4`
- Format: MP4 (ISO 14496-14)
- Video is ~24.5 seconds, looped
- Resolution: 840×1904 native (portrait, ~0.44 ratio — close to our 0.462 display ratio)

---

## 14. Accessibility Notes

1. **Video has no audio** (`muted`) — no accessibility concern
2. **Video is decorative** (`pointer-events-none`, no controls) — consider adding `aria-hidden="true"` to the video element
3. **Badge uses color + text** — not color alone, so it passes WCAG
4. **Heading hierarchy** — H2 used for section heading (proper document outline)
5. **Text contrast** — gray-600 on white = ~5.7:1 ratio (passes AA)
6. **Reduced motion** — The Framer Motion animations should respect `prefers-reduced-motion`. Wrap animation logic in a check:
   ```typescript
   const prefersReducedMotion = 
     typeof window !== 'undefined' && 
     window.matchMedia('(prefers-reduced-motion: reduce)').matches;
   ```

---

## 15. Full Component Code

### StackSection.tsx (copy-paste ready)

```tsx
'use client'

import { motion } from "framer-motion";

export function StackSection() {
  return (
    <section className="px-6 py-16 md:py-24 bg-gray-50/50">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-12 xl:gap-20">

          {/* ─── Text Half ─── */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            className="space-y-6 md:pr-4"
          >
            {/* Badge */}
            <div className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-200">
              Watch the magic
            </div>

            {/* Heading */}
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              See interactions come alive
            </h2>

            {/* Description */}
            <p className="text-lg leading-relaxed text-gray-600">
              Short, looped videos without voiceover or long intros. Just pure
              motion, micro-interactions, and real-world flows—exactly like
              Mobbin does it.
            </p>
          </motion.div>

          {/* ─── Video Surface Half ─── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            className="relative w-full
                       [--video-width:65%] [--video-y-offset:8.5%]
                       md:[--video-width:63%] md:[--video-y-offset:7.5%]
                       xl:[--video-width:37%] xl:[--video-y-offset:8.75%]"
          >
            {/* Surface (gray background) */}
            <div className="relative w-full overflow-hidden rounded-[16px] bg-gray-100/80 ring-1 ring-gray-900/5 aspect-[0.8] md:aspect-[0.72] xl:aspect-[1.22]">
              <div className="relative size-full">
                {/* Video (floating inside surface) */}
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  disablePictureInPicture
                  disableRemotePlayback
                  aria-hidden="true"
                  className="pointer-events-none absolute rounded-[20px] object-cover object-top shadow-[0px_8px_40px_0px_rgba(0,0,0,0.06)] border border-gray-900/5"
                  style={{
                    top: "var(--video-y-offset)",
                    left: "calc((100% - var(--video-width)) / 2)",
                    width: "var(--video-width)",
                    aspectRatio: "0.462",
                  }}
                >
                  <source src="/showcase.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
```

### Props interface (suggested)

```tsx
interface StackSectionProps {
  /** Badge label text */
  badge?: string;
  /** Section heading */
  heading: string;
  /** Section description */
  description: string;
  /** Video source URL */
  videoSrc: string;
  /** Video MIME type (default: "video/mp4") */
  videoType?: string;
  /** Surface aspect ratio per breakpoint (default: { base: "0.8", md: "0.72", xl: "1.22" }) */
  surfaceAspect?: { base: string; md: string; xl: string };
  /** Video width per breakpoint as % of surface (default: { base: "65%", md: "63%", xl: "37%" }) */
  videoWidth?: { base: string; md: string; xl: string };
  /** Video y-offset per breakpoint as % of surface height (default: { base: "8.5%", md: "7.5%", xl: "8.75%" }) */
  videoYOffset?: { base: string; md: string; xl: string };
}
```

---

## 16. Visual Diagram

### Mobile (<768px) — Stacked

```
┌──────────────────────┐
│                      │
│   [Watch the magic]  │  ← badge pill
│                      │
│   See interactions   │  ← h2
│   come alive         │
│                      │
│   Short, looped      │  ← paragraph
│   videos without...  │
│                      │
├──────────────────────┤  ← 48px gap
│                      │
│  ┌────────────────┐  │
│  │                │  │
│  │    VIDEO       │  │  ← 65% width, 0.462 AR
│  │                │  │     floating in surface
│  │                │  │     surface AR: 0.8
│  └────────────────┘  │
│                      │
└──────────────────────┘
```

### Desktop (≥1280px) — Side by Side

```
┌─────────────────┐  ┌──────────────────────────────────────┐
│                 │  │                                      │
│ [Watch the      │  │      ┌──────────────────────┐        │
│  magic]         │  │      │                      │        │
│                 │  │      │                      │        │
│ See             │  │      │      VIDEO           │        │
│ interactions    │  │      │      37% width       │        │
│ come alive      │  │      │      0.462 AR        │        │
│                 │  │      │                      │        │
│ Short, looped   │  │      │                      │        │
│ videos without  │  │      └──────────────────────┘        │
│ voiceover...    │  │                                      │
│                 │  │     surface AR: 1.22 (landscape)     │
└─────────────────┘  └──────────────────────────────────────┘
        ← 80px gap (xl) →
```

---

## Quick Reference Cheat Sheet

```
SECTION:  px-6 py-16 md:py-24 bg-gray-50/50
WRAPPER:  mx-auto max-w-[1280px]
GRID:     items-center gap-12 md:grid-cols-2 md:gap-12 xl:gap-20

TEXT HALF:
  Badge:  inline-flex rounded-full bg-emerald-50 px-3 py-1
          text-xs font-medium text-emerald-700
          ring-1 ring-inset ring-emerald-200
  H2:     text-3xl sm:text-4xl font-bold tracking-tight text-gray-900
  P:      text-lg leading-relaxed text-gray-600
  Space:  space-y-6 md:pr-4

VIDEO HALF:
  Surface:  w-full rounded-[16px] bg-gray-100/80 ring-1 ring-gray-900/5
            aspect-[0.8] md:aspect-[0.72] xl:aspect-[1.22]
  Video:    absolute rounded-[20px] object-cover object-top
            shadow-[0px_8px_40px_0px_rgba(0,0,0,0.06)]
            border border-gray-900/5
            aspect-ratio: 0.462
  Position: --video-width: 65% / 63% / 37%
            --video-y-offset: 8.5% / 7.5% / 8.75%
            left: calc((100% - var(--video-width)) / 2)

ANIMATION:
  Text:  x: -32 → 0, opacity: 0 → 1
  Video: x: 32 → 0, opacity: 0 → 1
  Duration: 0.6s, Ease: cubic-bezier(0.25, 0.4, 0.25, 1)
  Trigger: whileInView (once, margin -80px)
```

---

*Document generated from the live implementation at /src/app/page.tsx*
*Video source: /public/showcase.mp4 (3.4MB, 840×1904, ~24.5s loop)*
