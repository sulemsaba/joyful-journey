# JOTOFA GROUP — Complete Design System Transfer Guide

> **Purpose:** This document captures the complete design, styling, component architecture, and source code of the JOTOFA GROUP website's **Blog Detail** page and **Careers** page. Use this as a blueprint to replicate the exact same look, feel, and UX in a **React (Vite)** project with Tailwind CSS v4.
>
> **Date:** May 30, 2026
> **Source project:** `/home/msaba/Desktop/jotofa` (Next.js 15) — converted below to plain React
> **Target:** React 18/19 + Vite + react-router-dom v7 + Tailwind CSS v4

---

## Table of Contents

1. [Prerequisites & Dependencies](#1-prerequisites--dependencies)
2. [Design Tokens (Theme)](#2-design-tokens-theme)
3. [Utility CSS Classes](#3-utility-css-classes)
4. [Next.js → React Conversion Cheat Sheet](#4-nextjs--react-conversion-cheat-sheet)
5. [Shared Category Color Map](#5-shared-category-color-map)
6. [API Layer & Type Definitions](#6-api-layer--type-definitions)
7. [Blog Detail Page — Full Architecture (React)](#7-blog-detail-page--full-architecture-react-version)
8. [Careers Page — Full Architecture (React)](#8-careers-page--full-architecture-react-version)
9. [Job Apply Modal](#9-job-apply-modal)
10. [Responsive Breakpoints](#10-responsive-breakpoints)
11. [Dark Mode Strategy](#11-dark-mode-strategy)
12. [Migration Checklist (React/Vite)](#12-migration-checklist-reactvite)

---

## 1. Prerequisites & Dependencies

```json
{
  "dependencies": {
    "react": "^18.3.0 || ^19.0.0",
    "react-dom": "^18.3.0 || ^19.0.0",
    "react-router-dom": "^7.0.0",
    "react-helmet-async": "^2.0.0",
    "lucide-react": "^0.400.0",
    "framer-motion": "^11.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.0",
    "vite": "^6.0.0",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/vite": "^4.0.0",
    "tw-animate-css": "^1.0.0",
    "typescript": "^5.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0"
  }
}
```

**Vite config** (`vite.config.ts`):
```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

**Required:** Tailwind CSS v4 with `tw-animate-css`. The `@tailwindcss/vite` plugin handles CSS imports — no PostCSS config needed.

---

## 2. Design Tokens (Theme)

This is the complete `globals.css`. Copy this into your new project's global stylesheet.

### 2.1 Tailwind Import & Custom Variant

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));
```

### 2.2 Theme Inline Variables

```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar: var(--sidebar);
  --color-chart-5: var(--chart-5);
  --color-chart-4: var(--chart-4);
  --color-chart-3: var(--chart-3);
  --color-chart-2: var(--chart-2);
  --color-chart-1: var(--chart-1);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);

  /* ── JOTOFA Brand Tokens ── */
  --color-jotofa-accent: #00BFFF;
  --color-jotofa-accent-light: #4DD4FF;
  --color-jotofa-accent-dark: #0099CC;
  --color-jotofa-hover-accent: #33CCFF;

  /* Primary (navy) */
  --color-jotofa-navy: #002040;
  --color-jotofa-navy-deep: #00111F;
  --color-jotofa-navy-mid: #001826;
  --color-jotofa-navy-card: #0A2A40;
  --color-jotofa-navy-sidebar: #000D18;

  /* Text hierarchy */
  --color-jotofa-text-secondary: #5E6A75;
  --color-jotofa-text-muted: #999DA0;

  /* Subsidiary colors */
  --color-utec-cyan: #00d4ff;
  --color-courier-orange: #ff8c00;
  --color-cleaning-green: #00d68f;
  --color-security-red: #ff3d57;
  --color-staffing-purple: #a855f7;

  /* Legacy aliases */
  --color-jotofa-gold: #00BFFF;
  --color-jotofa-gold-light: #4DD4FF;
  --color-jotofa-gold-dark: #0099CC;
  --color-dark-bg: #002040;
  --color-dark-card: #0A2A40;
  --color-dark-card-hover: #0E3350;
  --color-dark-border: rgba(255, 255, 255, 0.08);
}
```

### 2.3 Light Mode CSS Variables

```css
:root {
  --radius: 0.625rem;
  --background: #FFFFFF;
  --foreground: #002040;
  --card: #FFFFFF;
  --card-foreground: #002040;
  --popover: #FFFFFF;
  --popover-foreground: #002040;
  --primary: #002040;
  --primary-foreground: #FFFFFF;
  --secondary: #F5F9FC;
  --secondary-foreground: #002040;
  --muted: #F5F9FC;
  --muted-foreground: #5E6A75;
  --accent: #00BFFF;
  --accent-foreground: #FFFFFF;
  --destructive: oklch(0.577 0.245 27.325);
  --border: rgba(0, 32, 64, 0.08);
  --input: rgba(0, 32, 64, 0.12);
  --ring: #00BFFF;
  --chart-1: #00BFFF;
  --chart-2: #ff8c00;
  --chart-3: #00d68f;
  --chart-4: #ff3d57;
  --chart-5: #a855f7;
  --sidebar: #002040;
  --sidebar-foreground: #FFFFFF;
  --sidebar-primary: #00BFFF;
  --sidebar-primary-foreground: #002040;
  --sidebar-accent: #003060;
  --sidebar-accent-foreground: #FFFFFF;
  --sidebar-border: rgba(255, 255, 255, 0.08);
  --sidebar-ring: #00BFFF;
}
```

### 2.4 Dark Mode CSS Variables

```css
.dark {
  --background: #00111F;
  --foreground: #FFFFFF;
  --card: #0A2A40;
  --card-foreground: #FFFFFF;
  --popover: #0A2A40;
  --popover-foreground: #FFFFFF;
  --primary: #002040;
  --primary-foreground: #FFFFFF;
  --secondary: #001826;
  --secondary-foreground: #FFFFFF;
  --muted: #001826;
  --muted-foreground: #C7D1DA;
  --accent: #00BFFF;
  --accent-foreground: #00111F;
  --destructive: oklch(0.704 0.191 22.216);
  --border: rgba(255, 255, 255, 0.08);
  --input: rgba(255, 255, 255, 0.12);
  --ring: #00BFFF;
  --chart-1: #00BFFF;
  --chart-2: #ff8c00;
  --chart-3: #00d68f;
  --chart-4: #ff3d57;
  --chart-5: #a855f7;
  --sidebar: #000D18;
  --sidebar-foreground: #FFFFFF;
  --sidebar-primary: #00BFFF;
  --sidebar-primary-foreground: #00111F;
  --sidebar-accent: #0A2A40;
  --sidebar-accent-foreground: #FFFFFF;
  --sidebar-border: rgba(255, 255, 255, 0.08);
  --sidebar-ring: #00BFFF;
}
```

### 2.5 Base Styles

```css
@layer base {
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
    font-family: var(--font-inter), 'Inter', var(--font-geist-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  html {
    scroll-behavior: smooth;
  }
}
```

---

## 3. Utility CSS Classes

### 3.1 Gradient Text (used for "JOTOFA GROUP" brand name)

```css
.text-gold-gradient {
  background: linear-gradient(135deg, #4DD4FF, #00BFFF, #0099CC);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### 3.2 Grid Pattern Background

```css
.bg-grid-pattern {
  background-image:
    linear-gradient(rgba(0, 191, 255, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 191, 255, 0.04) 1px, transparent 1px);
  background-size: 60px 60px;
}
```

### 3.3 Glass Morphism Navbar

```css
.glass {
  background: rgba(10, 42, 64, 0.5);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
```

### 3.4 Card Glow Effect

```css
.card-glow {
  position: relative;
  overflow: hidden;
}
.card-glow::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  opacity: 0;
  transition: opacity 0.4s ease;
  border-radius: inherit;
  pointer-events: none;
}
.card-glow:hover::before {
  opacity: 1;
}
```

### 3.5 Selection Color

```css
::selection {
  background: rgba(0, 191, 255, 0.3);
  color: #ffffff;
}
```

### 3.6 Custom Scrollbars

```css
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: #00111F; }
::-webkit-scrollbar-thumb { background: #0A2A40; border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: #0E3350; }
```

### 3.7 Sidebar Thin Scrollbar (for blog detail)

```css
.sidebar-scroll::-webkit-scrollbar { width: 4px; }
.sidebar-scroll::-webkit-scrollbar-track { background: transparent; }
.sidebar-scroll::-webkit-scrollbar-thumb {
  background: rgba(0, 191, 255, 0.15);
  border-radius: 2px;
}
.sidebar-scroll::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 191, 255, 0.3);
}
```

### 3.8 Pill Navigation Hover Underline

```css
.pill-nav-link { position: relative; overflow: visible !important; }
.pill-nav-link::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  border-radius: 2px;
  background: #002040;
  transition: width 0.3s cubic-bezier(0.25, 0.4, 0.25, 1);
  z-index: 10;
  pointer-events: none;
}
.pill-nav-link:hover::after { width: 60%; }
.dark .pill-nav-link::after { background: rgba(255, 255, 255, 0.5); }
```

### 3.9 Phone Ring Animation

```css
@keyframes phone-ring {
  0% { transform: rotate(0deg); }
  10% { transform: rotate(14deg); }
  20% { transform: rotate(-12deg); }
  30% { transform: rotate(10deg); }
  40% { transform: rotate(-8deg); }
  50% { transform: rotate(4deg); }
  60% { transform: rotate(0deg); }
  100% { transform: rotate(0deg); }
}
.animate-phone-ring {
  animation: phone-ring 2s ease-in-out infinite;
  transform-origin: 50% 0%;
}
```

### 3.10 Vertical Scroll Ticker

```css
@keyframes scrollVertical {
  0% { transform: translateY(0); }
  100% { transform: translateY(-50%); }
}
```

### 3.11 Light Mode Overrides

```css
:root:not(.dark) .glass {
  background: rgba(255, 255, 255, 0.7);
  border-bottom: 1px solid rgba(0, 32, 64, 0.08);
}
:root:not(.dark) .text-gold-gradient {
  background: linear-gradient(135deg, #0099CC, #00BFFF, #4DD4FF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
:root:not(.dark) ::-webkit-scrollbar-track { background: #F5F9FC; }
:root:not(.dark) ::-webkit-scrollbar-thumb { background: #c0c8d0; }
:root:not(.dark) ::-webkit-scrollbar-thumb:hover { background: #a0acb8; }
:root:not(.dark) ::selection {
  background: rgba(0, 191, 255, 0.2);
  color: #002040;
}
```

### 3.12 News Hero Responsive Breakpoint

```css
@media (max-width: 810px) {
  .news-hero h1 {
    font-size: 44px !important;
    letter-spacing: -1.5px !important;
  }
  .news-hero p {
    font-size: 16px !important;
  }
}
```

---

## 4. Next.js → React Conversion Cheat Sheet

Since the original project is Next.js, here are all the replacements needed:

| Next.js | React (Vite) |
|---|---|
| `next/link` → `<Link href="/news">` | `react-router-dom` → `<Link to="/news">` |
| `next/navigation` → `useRouter()` | `react-router-dom` → `useNavigate()` |
| `next/navigation` → `useParams()` | `react-router-dom` → `useParams()` |
| `next/navigation` → `notFound()` | Conditional render: `if (!article) return <NotFound />` |
| `next/font` → `Inter()` | CSS `@import url('https://fonts.googleapis.com/css2?family=Inter:...')` |
| `next/image` → `<Image>` | Plain `<img>` tag |
| `generateMetadata()` (server) | `<Helmet>` from `react-helmet-async` (client) |
| `dynamic(() => import(...), { ssr: true })` | `React.lazy(() => import(...))` + `<Suspense>` |
| Server Component data fetching (`async function Page()`) | `useEffect()` + `useState()` in client component |
| `params: Promise<{ slug: string }>` (server) | `const { slug } = useParams<{ slug: string }>()` (client) |
| `layout.tsx` (nested layouts) | Flat route components, wrap manually |
| `sitemap.ts`, `robots.txt` (built-in) | Manual static files in `public/` |

---

## 5. Shared Category Color Map

This map is used by BOTH the blog listing page (`news.tsx`) and the blog detail page (`news-detail.tsx`). It translates human-readable category names into color classes and filter keys.

```typescript
const CATEGORY_MAP: Record<string, {
  key: string;
  color: string;
  bg: string;
  border: string;
  label: string;
}> = {
  "Company News":   { key: "group",      color: "text-jotofa-gold",     bg: "bg-jotofa-accent/10",   border: "border-jotofa-accent/20",   label: "Group Update" },
  "Group Update":   { key: "group",      color: "text-jotofa-gold",     bg: "bg-jotofa-accent/10",   border: "border-jotofa-accent/20",   label: "Group Update" },
  "UTEC Solutions": { key: "utec",       color: "text-utec-cyan",      bg: "bg-utec-cyan/10",       border: "border-utec-cyan/20",       label: "UTEC Solutions" },
  "Technology":     { key: "utec",       color: "text-utec-cyan",      bg: "bg-utec-cyan/10",       border: "border-utec-cyan/20",       label: "UTEC Solutions" },
  "CSR":            { key: "csr",        color: "text-cleaning-green", bg: "bg-cleaning-green/10",  border: "border-cleaning-green/20",  label: "CSR" },
  "Innovation":     { key: "innovation", color: "text-staffing-purple", bg: "bg-staffing-purple/10", border: "border-staffing-purple/20", label: "Innovation" },
  "Logistics":      { key: "logistics",  color: "text-courier-orange", bg: "bg-courier-orange/10",  border: "border-courier-orange/20",  label: "Logistics" },
  "Partnerships":   { key: "group",      color: "text-jotofa-gold",     bg: "bg-jotofa-accent/10",   border: "border-jotofa-accent/20",   label: "Partnerships" },
};
const DEFAULT_CATEGORY = {
  key: "group", color: "text-jotofa-gold", bg: "bg-jotofa-accent/10",
  border: "border-jotofa-accent/20", label: "Company News"
};
```

**Subsidiary Hero Data Map** (used by careers page):

```typescript
const subsidiaryHeroData: Record<string, {
  name: string;
  tagline: string;
  logo: string;
  heroImage: string;
  stats: { label: string; value: string }[];
}> = {
  jotofa: {
    name: "JOTOFA Group",
    tagline: "Powering progress across Tanzania through diversified excellence",
    logo: "/images/jotofa-logo.webp",
    heroImage: "/images/jotofa-hero-1.webp",
    stats: [
      { label: "Employees", value: "1,200+" },
      { label: "Subsidiaries", value: "5" },
      { label: "Country", value: "Tanzania" },
    ],
  },
  // ... utec, courier, cleaning, security, staffing, all
};
```

**Helper functions** (shared across blog pages):

```typescript
function computeReadTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  return `${Math.max(1, Math.ceil(words / 200))} MIN READ`;
}

function formatDate(isoString: string | null | undefined): string {
  if (!isoString) return "RECENTLY";
  const d = new Date(isoString);
  const month = d.toLocaleDateString("en-US", { month: "short" }).toUpperCase().replace(".", "");
  return `${month} ${d.getDate()}, ${d.getFullYear()}`;
}
```

---

## 6. API Layer & Type Definitions

File: `src/lib/api.ts`

```typescript
const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api").replace(/\/$/, "");

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...(options?.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
      ...(options?.headers || {}),
    },
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Request failed" }));
    throw new Error(error.detail || `HTTP ${response.status}`);
  }
  return response.json();
}

// ─── Public Job ───
export interface PublicJobDetail {
  id: string;
  section: string;      // "qualifications", "responsibilities", "requirements", "benefits"
  content: string;
  sort_order: number;
}
export interface PublicJob {
  id: string;
  job_id: string;
  title: string;
  company_name: string;
  location: string;
  remote: boolean;
  type: string;
  description?: string | null;
  deadline?: string | null;
  category_name?: string | null;
  subsidiary_key?: string | null;
  subsidiary_name?: string | null;
  details: PublicJobDetail[];
}

// ─── Public Subsidiary ───
export interface PublicSubsidiaryStat {
  id: string;
  label: string;
  value: string;
  sort_order: number;
}
export interface PublicSubsidiary {
  id: string;
  key: string;
  label: string;
  name: string;
  tagline?: string | null;
  logo?: string | null;
  hero_image?: string | null;
  is_active: boolean;
  sort_order: number;
  stats: PublicSubsidiaryStat[];
}

// ─── Public News ───
export interface PublicNewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  image?: string | null;
  author: string;
  category?: string | null;
  published_at?: string | null;
  created_at: string;
}

// ─── Contact ───
export interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  subsidiary?: string;
  message: string;
}

// ─── API Functions ───
export async function getJobs(): Promise<PublicJob[]> {
  return request<PublicJob[]>("/public/jobs?page_size=100");
}
export async function getSubsidiaries(): Promise<PublicSubsidiary[]> {
  return request<PublicSubsidiary[]>("/public/subsidiaries");
}
export async function submitApplication(formData: FormData) {
  return request("/public/applications", { method: "POST", body: formData });
}
export async function submitContact(payload: ContactPayload) {
  return request("/public/contacts", { method: "POST", body: JSON.stringify(payload) });
}
export async function getNews(): Promise<PublicNewsArticle[]> {
  return request<PublicNewsArticle[]>("/public/news");
}
```

---

## 7. Blog Detail Page — Full Architecture (React Version)

### 7.1 File Structure

```
src/
├── pages/
│   ├── NewsList.tsx                   # Listing page
│   └── NewsDetail.tsx                 # Detail page — fetches data, renders everything
├── components/
│   ├── news.tsx                       # Listing grid component
│   ├── news-detail.tsx                # Detail UI component — THE MAIN DESIGN (unchanged from Next.js)
│   ├── navbar.tsx
│   ├── footer.tsx
│   └── whatsapp-button.tsx
├── lib/
│   └── api.ts                         # API types + functions (unchanged)
├── App.tsx                            # Router setup
└── main.tsx                           # Entry point
```

### 7.2 Router Setup (`src/App.tsx`)

```typescript
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { NewsList } from "./pages/NewsList";
import { NewsDetail } from "./pages/NewsDetail";
import { CareersPage } from "./pages/CareersPage";

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/news" element={<NewsList />} />
          <Route path="/news/:slug" element={<NewsDetail />} />
          <Route path="/careers" element={<CareersPage />} />
          {/* ... other routes */}
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
```

### 7.3 Entry Point (`src/main.tsx`)

```typescript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### 7.4 Page Flow (React)

```
User visits /news/:slug
  → src/pages/NewsDetail.tsx
    → useParams<{ slug: string }>() to get slug from URL
    → useEffect: calls getNews() → maps to ArticleUI
    → Finds matching article by slug → conditional render if not found
    → Finds 3 related articles (excluding current)
    → <Helmet> sets page title + meta
    → Returns JSX: <Navbar /> <NewsDetailUI article={} relatedArticles={} onBack={} /> <Footer /> <WhatsAppButton />

      → src/components/news-detail.tsx (UNCHANGED from Next.js version)
        → The same 500+ line component works as-is:
          - Back button (motion.button with ArrowLeft)
          - 2-column grid: main (2fr) | sidebar (1fr)
          - Category badge
          - Title, meta row (author, category, read time, date, heart/like)
          - Hero image (rounded-2xl, object-cover, gradient overlay)
          - Article body (structured fallback or HTML content)
          - Sidebar: social share, tags, related blogs, newsletter
          - CTA banner at bottom
```

### 7.5 Detail Page: `src/pages/NewsDetail.tsx` (React — replaces server page + client wrapper)

```typescript
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { NewsDetail as NewsDetailUI } from "@/components/news-detail";
import { getNews, type PublicNewsArticle } from "@/lib/api";

// ─── CATEGORY_MAP, helpers, FALLBACK_ARTICLES (same as original — see Section 5) ───

const CATEGORY_MAP: Record<string, { key: string; color: string; bg: string; border: string; label: string }> = {
  "Company News":   { key: "group",      color: "text-jotofa-gold",     bg: "bg-jotofa-accent/10",   border: "border-jotofa-accent/20",   label: "Group Update" },
  "Group Update":   { key: "group",      color: "text-jotofa-gold",     bg: "bg-jotofa-accent/10",   border: "border-jotofa-accent/20",   label: "Group Update" },
  "UTEC Solutions": { key: "utec",       color: "text-utec-cyan",      bg: "bg-utec-cyan/10",       border: "border-utec-cyan/20",       label: "UTEC Solutions" },
  "Technology":     { key: "utec",       color: "text-utec-cyan",      bg: "bg-utec-cyan/10",       border: "border-utec-cyan/20",       label: "UTEC Solutions" },
  "CSR":            { key: "csr",        color: "text-cleaning-green", bg: "bg-cleaning-green/10",  border: "border-cleaning-green/20",  label: "CSR" },
  "Innovation":     { key: "innovation", color: "text-staffing-purple", bg: "bg-staffing-purple/10", border: "border-staffing-purple/20", label: "Innovation" },
  "Logistics":      { key: "logistics",  color: "text-courier-orange", bg: "bg-courier-orange/10",  border: "border-courier-orange/20",  label: "Logistics" },
  "Partnerships":   { key: "group",      color: "text-jotofa-gold",     bg: "bg-jotofa-accent/10",   border: "border-jotofa-accent/20",   label: "Partnerships" },
};
const DEFAULT_CATEGORY = { key: "group", color: "text-jotofa-gold", bg: "bg-jotofa-accent/10", border: "border-jotofa-accent/20", label: "Company News" };

function computeReadTime(content: string): string {
  return `${Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200))} MIN READ`;
}
function formatDate(isoString: string | null | undefined): string {
  if (!isoString) return "RECENTLY";
  const d = new Date(isoString);
  const month = d.toLocaleDateString("en-US", { month: "short" }).toUpperCase().replace(".", "");
  return `${month} ${d.getDate()}, ${d.getFullYear()}`;
}

function mapArticle(api: PublicNewsArticle) {
  const catName = api.category || "Company News";
  const cat = CATEGORY_MAP[catName] || DEFAULT_CATEGORY;
  return {
    id: api.id, slug: api.slug, category: cat.label, categoryKey: cat.key,
    categoryColor: cat.color, categoryBg: cat.bg, categoryBorder: cat.border,
    title: api.title, excerpt: api.excerpt || "", content: api.content || "",
    author: api.author || "JOTOFA Group", date: formatDate(api.published_at),
    readTime: computeReadTime(api.content || ""),
    image: api.image || "/images/jotofa-hero-1.webp",
  };
}
type ArticleUI = ReturnType<typeof mapArticle>;

// FALLBACK_ARTICLES (14 articles — same as Next.js version, omitted for brevity)
const FALLBACK_ARTICLES: ArticleUI[] = [ /* ... same as original ... */ ];

// ─── THE PAGE COMPONENT ───
export function NewsDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [article, setArticle] = useState<ArticleUI | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<ArticleUI[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const data = await getNews();
        if (cancelled) return;
        const allArticles = data.length > 0 ? data.map(mapArticle) : FALLBACK_ARTICLES;
        const found = allArticles.find((a) => a.slug === slug) ?? null;
        if (!found) { setNotFound(true); return; }
        setArticle(found);
        setRelatedArticles(allArticles.filter((a) => a.slug !== slug).slice(0, 3));
      } catch {
        if (!cancelled) {
          const allArticles = FALLBACK_ARTICLES;
          const found = allArticles.find((a) => a.slug === slug) ?? null;
          if (!found) { setNotFound(true); return; }
          setArticle(found);
          setRelatedArticles(allArticles.filter((a) => a.slug !== slug).slice(0, 3));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [slug]);

  const handleBack = useCallback(() => {
    navigate("/news");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [navigate]);

  const handleArticleClick = useCallback((clickedArticle: ArticleUI) => {
    navigate(`/news/${clickedArticle.slug}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [navigate]);

  // ─── Loading ───
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 pt-16 flex items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-jotofa-accent/20 border-t-jotofa-gold" />
        </main>
        <Footer />
      </div>
    );
  }

  // ─── Not Found ───
  if (notFound || !article) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 pt-16 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Article Not Found</h1>
            <Link to="/news" className="text-jotofa-accent hover:underline">Back to News</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // ─── Success ───
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>{article.title}</title>
        <meta name="description" content={article.excerpt || article.title} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt || article.title} />
        <meta property="og:image" content={article.image} />
      </Helmet>
      <Navbar />
      <main className="flex-1 pt-16">
        <NewsDetailUI
          article={article}
          relatedArticles={relatedArticles}
          onBack={handleBack}
          onArticleClick={handleArticleClick}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
```

### 7.6 News Listing Page: `src/pages/NewsList.tsx` (React version)

```typescript
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { News } from "@/components/news";
import { getNews, type PublicNewsArticle } from "@/lib/api";

export function NewsList() {
  const [articles, setArticles] = useState<PublicNewsArticle[] | null>(null);

  useEffect(() => {
    getNews().then(setArticles).catch(() => setArticles(null));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>News & Insights — JOTOFA GROUP</title>
        <meta name="description" content="Stay updated with the latest news from JOTOFA GROUP..." />
      </Helmet>
      <Navbar />
      <main className="flex-1 pt-16">
        <News initialArticles={articles} />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
```

### 6.7 Main Detail UI: `src/components/news-detail.tsx` (UNCHANGED)

This is the core design component. Here is the complete annotated source:

```typescript
"use client";

import {
  ArrowLeft, Calendar, Clock, User, Heart, ArrowRight, Quote, Phone,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useCallback } from "react";

/* ── Types ── */
interface NewsArticle {
  category: string;
  categoryKey: string;
  categoryColor: string;
  categoryBg: string;
  categoryBorder: string;
  title: string;
  excerpt: string;
  author?: string;
  date: string;
  readTime: string;
  image: string;
  content?: string;
}

interface NewsDetailProps {
  article: NewsArticle;
  relatedArticles: NewsArticle[];
  onBack: () => void;
  onArticleClick?: (article: NewsArticle) => void;
}

/* ── Tags per category ── */
const categoryTags: Record<string, string[]> = {
  group: ["Corporate Strategy", "East Africa", "Growth", "Holding Company", "Diversified Portfolio"],
  utec: ["ICT", "Smart City", "5G", "Telecommunications", "Digital Infrastructure"],
  csr: ["Sustainability", "Reforestation", "Community Impact", "Environmental", "Green Initiative"],
  innovation: ["Digital Transformation", "Technology", "AI & ML", "Cloud", "Innovation"],
  logistics: ["Same-Day Delivery", "Logistics", "E-Commerce", "Fleet Management", "Supply Chain"],
};

/* ── Social Share Icons ── */
function SocialIconButtons() {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* fallback */ }
  }, []);

  return (
    <div className="flex gap-3">
      {/* Twitter/X Share */}
      <button
        onClick={() => {
          const url = encodeURIComponent(window.location.href);
          const text = encodeURIComponent(document.title);
          window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
        }}
        className="w-9 h-9 rounded-full border border-border flex items-center justify-center
                   text-muted-foreground hover:bg-secondary hover:border-jotofa-accent/30
                   hover:text-jotofa-accent transition-all duration-200"
        aria-label="Share on Twitter"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </button>

      {/* LinkedIn Share */}
      <button
        onClick={() => {
          const url = encodeURIComponent(window.location.href);
          window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
        }}
        className="w-9 h-9 rounded-full border border-border flex items-center justify-center
                   text-muted-foreground hover:bg-secondary hover:border-jotofa-accent/30
                   hover:text-jotofa-accent transition-all duration-200"
        aria-label="Share on LinkedIn"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      </button>

      {/* Copy Link */}
      <button
        onClick={handleCopyLink}
        className="w-9 h-9 rounded-full border border-border flex items-center justify-center
                   text-muted-foreground hover:bg-secondary hover:border-jotofa-accent/30
                   hover:text-jotofa-accent transition-all duration-200"
        aria-label="Copy link"
      >
        {copied ? (
          <svg className="w-4 h-4 text-cleaning-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
        ) : (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
            <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
          </svg>
        )}
      </button>
    </div>
  );
}

/* ── Fallback content generator ── */
function generateFallbackContent(article: NewsArticle) {
  return {
    lead: article.excerpt || `${article.title} — JOTOFA GROUP continues to strengthen its position...`,
    paragraphs: [
      `This development reflects JOTOFA GROUP's unwavering commitment to operational excellence...`,
      `The initiative is expected to create new employment opportunities...`,
      `Looking ahead, JOTOFA GROUP remains focused on its strategic priorities...`,
    ],
    pullQuote: "Our strength lies in our ability to deliver comprehensive, end-to-end solutions...",
    pullQuoteAuthor: "JOTOFA GROUP",
    subheading1: "Strategic Growth Fundamentals",
    subheading2: "Future Outlook",
    bulletList1: [
      "Document and standardize operational workflows",
      "Automate repetitive and manual tasks",
      "Implement scalable software and digital tools",
      "Define measurable KPIs across departments",
      "Create structured onboarding and training systems",
    ],
    bulletList2: [
      "Set realistic, data-driven growth targets",
      "Monitor financial performance regularly",
      "Strengthen cash flow management",
      "Align leadership on long-term objectives",
      "Review and refine strategy quarterly",
    ],
  };
}

/* ── Helper: get image for article ── */
function getArticleImage(article: NewsArticle): string {
  if (article.image) return article.image;
  const imageMap: Record<string, string> = {
    utec: "/images/utec.webp",
    csr: "/images/cleaning.webp",
    innovation: "/images/jotofa-hero-2.webp",
    logistics: "/images/courier.webp",
    group: "/images/jotofa-hero-1.webp",
  };
  return imageMap[article.categoryKey] || "/images/jotofa-hero-3.webp";
}

/* ── Animation variants ── */
const fadeUp = {
  initial: { y: 20 },
  animate: { y: 0, transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] } },
  style: { willChange: "transform" },
};

const fadeSlide = {
  initial: { x: -10 },
  animate: { x: 0, transition: { duration: 0.4 } },
  style: { willChange: "transform" },
};

/* ══════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════ */
export function NewsDetail({ article, relatedArticles, onBack, onArticleClick }: NewsDetailProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [liked, setLiked] = useState(false);

  const content = generateFallbackContent(article);
  const heroImage = getArticleImage(article);
  const tags = categoryTags[article.categoryKey] || categoryTags.group;

  const handleSubscribe = useCallback(() => {
    if (email.trim()) { setSubscribed(true); setEmail(""); }
  }, [email]);

  return (
    <div className="bg-background min-h-screen">

      {/* ═══ MAIN CONTENT GRID ═══ */}
      <div className="mx-auto max-w-[1260px] px-4 sm:px-6 pt-8 sm:pt-12 pb-16">

        {/* Back button */}
        <motion.button
          onClick={onBack}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground
                     hover:text-jotofa-accent transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
          Back to News & Insights
        </motion.button>

        {/* ─── 2-Column Grid: Article (2fr) | Sidebar (1fr) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 lg:gap-12">

          {/* ═══ LEFT COLUMN: Article Content ═══ */}
          <motion.main className="min-w-0" {...fadeUp}>

            {/* Category badge */}
            <span className={`inline-block px-3 py-0.5 rounded-full text-xs font-medium mb-4
              ${article.categoryBg} ${article.categoryBorder} border ${article.categoryColor}`}>
              {article.category}
            </span>

            {/* Article Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-5">
              {article.title}
            </h1>

            {/* Article Meta Row */}
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-muted-foreground mb-7">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                {article.author || "JOTOFA Group"}
              </span>
              <span className={`px-3 py-0.5 rounded-full text-xs font-medium
                ${article.categoryBg} ${article.categoryBorder} border ${article.categoryColor}`}>
                {article.category}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {article.readTime}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {article.date}
              </span>
              <button
                onClick={() => setLiked(!liked)}
                className="ml-auto text-muted-foreground hover:text-security-red transition-colors"
                aria-label="Like article"
              >
                <Heart className={`w-4 h-4 ${liked ? "fill-security-red text-security-red" : ""}`} />
              </button>
            </div>

            {/* Featured Image */}
            <div className="relative w-full rounded-2xl overflow-hidden mb-8">
              <img
                src={heroImage}
                alt={article.title}
                className="w-full h-[250px] sm:h-[350px] lg:h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>

            {/* Article Body */}
            <div className="article-body">
              {article.content ? (
                <div
                  className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-none"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              ) : (
                /* Fallback: generated structured content */
                <>
                  <p className="text-base sm:text-lg text-foreground/85 leading-relaxed mb-6 font-medium">
                    {content.lead}
                  </p>

                  <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-4 mt-10">
                    {content.subheading1}
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                    {content.paragraphs[0]}
                  </p>

                  <ul className="list-disc pl-6 mb-6 space-y-2.5">
                    {content.bulletList1.map((item, i) => (
                      <li key={i} className="text-sm sm:text-base text-foreground/75 leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Pull Quote Blockquote */}
                  <blockquote className="my-8 p-5 sm:p-6 rounded-xl bg-jotofa-accent/[0.04]
                    border border-jotofa-accent/15 relative overflow-hidden">
                    <Quote className="absolute top-3 left-3 w-6 h-6 text-jotofa-accent/15" />
                    <p className="text-sm sm:text-base text-foreground leading-relaxed italic mb-3 pl-6">
                      &ldquo;{content.pullQuote}&rdquo;
                    </p>
                    <footer className="flex items-center gap-2 text-xs text-jotofa-accent font-medium">
                      <div className="w-5 h-0.5 bg-jotofa-accent rounded-full" />
                      {content.pullQuoteAuthor}
                    </footer>
                  </blockquote>

                  <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-4 mt-10">
                    {content.subheading2}
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                    {content.paragraphs[1]}
                  </p>

                  <ul className="list-disc pl-6 mb-6 space-y-2.5">
                    {content.bulletList2.map((item, i) => (
                      <li key={i} className="text-sm sm:text-base text-foreground/75 leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>

                  {content.paragraphs.slice(2).map((paragraph, index) => (
                    <p key={index} className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </>
              )}
            </div>
          </motion.main>

          {/* ═══ RIGHT COLUMN: Sidebar ═══ */}
          <motion.aside
            className="space-y-8 lg:space-y-10 lg:sticky lg:top-20 lg:self-start
                       lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto lg:pr-2 sidebar-scroll"
            {...fadeUp}
          >
            {/* Share on Social Media */}
            <section>
              <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">
                Share on Social Media
              </h4>
              <SocialIconButtons />
            </section>

            {/* All Tags */}
            <section>
              <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">
                All Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span key={tag}
                    className="px-3 py-1.5 rounded-full text-xs font-medium border border-border
                               bg-secondary/50 text-foreground/80 hover:bg-jotofa-accent/10
                               hover:border-jotofa-accent/20 hover:text-jotofa-accent
                               transition-all duration-200 cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>

            {/* Related Blogs */}
            <section>
              <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-4">
                Related Blogs
              </h4>
              <div className="space-y-4">
                {relatedArticles.map((related) => {
                  const relImage = getArticleImage(related);
                  return (
                    <Link key={related.title}
                      to={`/news/${related.slug || ""}`}
                      className="flex gap-3 group"
                    >
                      <div className="w-[70px] h-[60px] rounded-lg overflow-hidden shrink-0 bg-card">
                        <img src={relImage} alt={related.title}
                          className="w-full h-full object-cover" loading="lazy" />
                      </div>
                      <div className="min-w-0">
                        <h5 className="text-sm font-medium text-foreground leading-snug mb-1
                                       group-hover:text-jotofa-accent transition-colors line-clamp-2">
                          {related.title}
                        </h5>
                        <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {related.date}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>

            {/* Newsletter Box */}
            <section className="p-5 rounded-2xl border border-border bg-card">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Join Our Newsletter
              </h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Get expert insights on business strategy, growth frameworks, and performance
                delivered to your inbox.
              </p>
              {subscribed ? (
                <div className="flex items-center gap-2 text-cleaning-green text-sm font-medium
                                p-3 rounded-lg bg-cleaning-green/10">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                  You&apos;re subscribed!
                </div>
              ) : (
                <>
                  <input
                    type="email"
                    placeholder="example@yourmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm
                               text-foreground placeholder:text-muted-foreground focus:outline-none
                               focus:ring-2 focus:ring-jotofa-accent/30 focus:border-jotofa-accent
                               transition-all mb-3"
                  />
                  <button
                    onClick={handleSubscribe}
                    className="w-full py-2.5 rounded-lg border border-border bg-background text-sm
                               font-medium text-foreground hover:bg-secondary
                               hover:border-jotofa-accent/30 transition-all duration-200"
                  >
                    Subscribe
                  </button>
                </>
              )}
            </section>
          </motion.aside>
        </div>
      </div>

      {/* ═══ CTA BANNER ═══ */}
      <div className="mx-auto max-w-[1120px] px-6 mb-12">
        <div className="relative rounded-3xl overflow-hidden min-h-[260px] sm:min-h-[300px] flex items-center">
          {/* Background image */}
          <div className="absolute inset-0">
            <img src="/images/jotofa-hero-3.webp" alt=""
              className="w-full h-full object-cover" loading="lazy" />
          </div>
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-jotofa-navy/90 via-jotofa-navy/70 to-jotofa-navy/30" />

          <div className="relative z-10 p-8 sm:p-10 lg:p-12 max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Prefer to Talk to Us Directly?
            </h2>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-6">
              Get tailored support from our team for specific inquiries or quick questions.
              We&apos;re here to help you find the right solutions.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white
                           text-jotofa-navy font-semibold text-sm hover:bg-white/90
                           transition-all duration-200 hover:shadow-lg"
              >
                Contact Us
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="tel:+255794974996"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full
                           border border-white/30 text-white font-medium text-sm
                           hover:bg-white/10 transition-all duration-200"
              >
                <Phone className="w-4 h-4" />
                Call Us Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### 6.6 Blog Detail Layout Diagram

```
┌──────────────────────────────────────────────────────────┐
│  ← Back to News & Insights                               │
├───────────────────────────────┬──────────────────────────┤
│  MAIN (2fr)                   │  SIDEBAR (1fr)           │
│                               │  lg:sticky lg:top-20     │
│  [Category badge pill]        │                          │
│  Title (h1, 2xl→4xl, bold)    │  ┌────────────────────┐  │
│                               │  │ Share on Social    │  │
│  Meta row:                    │  │ Media              │  │
│   👤 Author · 🏷 Category ·   │  │ [𝕏] [in] [🔗]     │  │
│   🕐 Read Time · 📅 Date · ❤️  │  └────────────────────┘  │
│                               │                          │
│  ┌─────────────────────────┐  │  ┌────────────────────┐  │
│  │ Hero Image              │  │  │ All Tags           │  │
│  │ rounded-2xl             │  │  │ [pill] [pill] ...  │  │
│  │ h-[250-450px]           │  │  └────────────────────┘  │
│  │ object-cover            │  │                          │
│  │ gradient overlay        │  │  ┌────────────────────┐  │
│  └─────────────────────────┘  │  │ Related Blogs      │  │
│                               │  │ ┌──┐ Title+date    │  │
│  Article Body:                │  │ │  │ ...            │  │
│  • Lead paragraph (lg, med)   │  │ └──┘               │  │
│  • H2 subheadings             │  └────────────────────┘  │
│  • Body paragraphs            │                          │
│  • Bullet lists               │  ┌────────────────────┐  │
│  • Pull quote blockquote      │  │ Join Our           │  │
│    (Quote icon, accent border)│  │ Newsletter         │  │
│                               │  │ [email input]      │  │
│                               │  │ [Subscribe btn]    │  │
│                               │  └────────────────────┘  │
└───────────────────────────────┴──────────────────────────┘
│  CTA BANNER (full-width, rounded-3xl)                    │
│  ┌────────────────────────────────────────────────────┐  │
│  │ [bg image + navy gradient overlay]                 │  │
│  │ "Prefer to Talk to Us Directly?"                   │  │
│  │ [Contact Us] [Call Us Now]                         │  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

---

## 8. Careers Page — Full Architecture (React Version)

### 8.1 File Structure

```
src/
├── pages/
│   └── CareersPage.tsx               # Page wrapper — metadata + layout shell
├── components/
│   ├── careers.tsx                   # Main careers UI — THE MAIN DESIGN (unchanged from Next.js)
│   └── job-apply-modal.tsx           # Application modal (unchanged)
└── lib/
    └── api.ts                        # API types + functions (unchanged)
```

### 8.2 Page Flow (React)

```
User visits /careers
  → src/pages/CareersPage.tsx
    → <Helmet> sets page title + meta
    → Returns: <Navbar /> <Careers /> <Footer /> <WhatsAppButton />

      → src/components/careers.tsx (UNCHANGED from Next.js — already "use client")
        → useEffect: calls getJobs() + getSubsidiaries() in parallel
        → Renders 6 vertical sections:
          1. Hero Banner (per-subsidiary, max-w-6xl)
          2. Sub Navigation Tabs (horizontal scroll, active underline)
          3. Search Card (keyword + category dropdown + Find Jobs button)
          4. Filter Bar (categories dropdown + company dropdown + clear)
          5. Job Listings (single container, 3-state accordion, pagination)
          6. Talent Community (full-width navy section)
        → JobApplyModal on apply click
```

### 8.3 Page Wrapper: `src/pages/CareersPage.tsx` (React version)

```typescript
import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";

// Lazy-load the heavy careers component
const Careers = lazy(() =>
  import("@/components/careers").then((m) => ({ default: m.Careers }))
);

function CareersSkeleton() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4
                        border-jotofa-accent/20 border-t-jotofa-gold" />
        <p className="text-muted-foreground text-sm">Loading opportunities...</p>
      </div>
    </div>
  );
}

export function CareersPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Careers — JOTOFA GROUP</title>
        <meta name="description" content="Join JOTOFA GROUP — explore career opportunities across our five subsidiaries in ICT, logistics, cleaning, security, and staffing." />
        <meta property="og:title" content="Careers — JOTOFA GROUP" />
        <meta property="og:description" content="Explore career opportunities across our five subsidiaries." />
        <meta property="og:image" content="/images/jotofa-hero-1.webp" />
        <link rel="canonical" href="/careers" />
      </Helmet>
      <Navbar />
      <main className="flex-1 pt-16">
        <Suspense fallback={<CareersSkeleton />}>
          <Careers />
        </Suspense>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
```

### 8.4 Main Careers UI: `src/components/careers.tsx` (UNCHANGED)

This is the full annotated source of the careers component (1500+ lines). Key structural parts:

#### 7.4.1 Types & Data

```typescript
"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import {
  Search, ChevronDown, ChevronRight, ChevronLeft,
  MapPin, Briefcase, Building2, Clock, Users, ArrowRight,
  X, Globe, Filter, Share2, Bookmark, Check,
  ListChecks, GraduationCap, ShieldCheck, Heart, Calendar,
  AlertTriangle, Home, Info,
} from "lucide-react";
import { Link } from "react-router-dom";
import { JobApplyModal } from "@/components/job-apply-modal";
import { getJobs, getSubsidiaries, type PublicJob, type PublicSubsidiary } from "@/lib/api";

interface Job {
  id: string;
  backendId?: string;
  title: string;
  category: string;
  company: string;
  location: string;
  remote: boolean;
  type: string;
  description: string;
  qualifications: string[];
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  deadline: string;
}

interface SubsidiaryTab {
  key: string;
  label: string;
}
```

#### 7.4.2 Default Subsidiary Tabs

```typescript
const defaultSubsidiaryTabs: SubsidiaryTab[] = [
  { key: "jotofa", label: "JOTOFA Group" },
  { key: "utec", label: "UTEC Solutions" },
  { key: "courier", label: "Courier & Logistics" },
  { key: "cleaning", label: "Cleaning & Maids" },
  { key: "security", label: "Security" },
  { key: "staffing", label: "Staffing & Labour" },
  { key: "all", label: "All Jobs" },
];
```

#### 7.4.3 Component Structure (Sections)

The `Careers()` component renders these sections in order:

1. **HERO BANNER** — `max-w-6xl`, `h-[180px] sm:h-[220px] rounded-2xl`, background image with `bg-gradient-to-r from-[#002040]/90 via-[#002040]/75 to-[#002040]/50`, logo in frosted glass container (`bg-white/10 backdrop-blur-sm border border-white/20`), company name + tagline + stats + "About" link

2. **SUB NAVIGATION TABS** — White/dark bar with `overflow-x-auto scrollbar-hide`, active tab has `absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-[#002040] dark:bg-white`, mobile right-edge fade gradient

3. **SEARCH CARD** — `rounded-xl shadow-sm`, `rounded-full` input with Search icon, category dropdown, navy "Find Jobs" button

4. **FILTER BAR** — Pill-shaped dropdowns (`rounded-full border`) with ChevronDown, category + company filters, clear button

5. **JOB LISTINGS** — Single `rounded-lg border overflow-hidden` container:
   - **Results header:** "N Positions Found"
   - **Collapsed row:** Chevron toggle, title, remote badge, deadline badge (color-coded), Req ID, Location/Categories/Company columns, Apply Now button
   - **Preview (first expand):** Description (2-line clamp), metadata row, deadline badge, [Apply Now] [See More ▼]
   - **Full details (second expand):** Remote info banner (amber, if applicable), full description, 4 detail sections (Responsibilities, Qualifications, Requirements, Benefits), deadline indicator, [Apply Now] [Save Job] [Share]
   - **Pagination:** `[10▼ per page] 1-10 of 36 [◀ 1 2 ▶]`

6. **TALENT COMMUNITY SECTION** — `bg-[#002040]` full-width, 2-col grid (text + image), white text, white rounded-full button

#### 7.4.4 Job Row States Diagram

```
COLLAPSED:
┌──────────────────────────────────────────────────────┐
│ [▶] Title · [Remote] · [Urgent]    Loc | Cat | Co   │
│     Req ID: JTG-XXX                    [Apply Now]   │
└──────────────────────────────────────────────────────┘

PREVIEW (1st click):
┌──────────────────────────────────────────────────────┐
│ Description (2-line clamp)...                        │
│ 📍Location · 💼Category · 🏢Company · 🕐Type · 📅D/L │
│ [Apply Now]  [See More ▼]                            │
└──────────────────────────────────────────────────────┘

FULL DETAILS (2nd click — "See More"):
┌──────────────────────────────────────────────────────┐
│ ⚠️ This is a remote role... (amber banner)          │
│ Full description text...                             │
│                                                      │
│ 📋 Position Responsibilities                         │
│   • Item 1                                           │
│   • Item 2                                           │
│                                                      │
│ 🎓 Qualifications                                    │
│   • Item 1                                           │
│                                                      │
│ 🛡️ Requirements                                      │
│   • Item 1                                           │
│                                                      │
│ ❤️ Benefits (green checkmarks)                       │
│   ✓ Item 1                                           │
│                                                      │
│ ─── Deadline: Closes 15 June 2026                    │
│ [Apply Now]  [Save Job]  [Share]                     │
└──────────────────────────────────────────────────────┘
```

#### 7.4.5 Key Styling Patterns in Careers

| Element | Classes |
|---|---|
| Hero banner | `relative w-full h-[180px] sm:h-[220px] rounded-2xl overflow-hidden` |
| Hero overlay | `absolute inset-0 bg-gradient-to-r from-[#002040]/90 via-[#002040]/75 to-[#002040]/50` |
| Logo container | `w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20` |
| Sub-nav bar | `bg-white dark:bg-[#0a1e30] border-b border-border` |
| Active tab indicator | `absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-[#002040] dark:bg-white` |
| Search card | `bg-white dark:bg-[#0a1e30] rounded-xl shadow-sm p-5 sm:p-6 border border-border` |
| Search input | `w-full pl-10 pr-4 py-2.5 rounded-full border border-input` |
| Navy button | `rounded-full bg-[#002040] text-white hover:bg-[#001826]` |
| Filter pills | `rounded-full border border-input bg-background hover:border-[#002040]/30` |
| Job container | `bg-white dark:bg-[#0a1e30] rounded-lg border border-border shadow-sm overflow-hidden` |
| Job row (collapsed) | `flex flex-col lg:flex-row lg:items-center px-5 sm:px-6 py-4 cursor-pointer hover:bg-muted/30 dark:hover:bg-[#002040]/20` |
| Section icon container | `w-6 h-6 rounded-md bg-[#002040]/10 dark:bg-white/10 flex items-center justify-center` |
| Benefits checkmark | `text-green-600 dark:text-green-400` (different from other bullet dots) |
| Deadline badge (open) | `bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200` |
| Deadline badge (urgent ≤7d) | `bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-200` |
| Deadline badge (closed) | `bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200` |
| Pagination active | `bg-[#002040] text-white` |
| Pagination inactive | `text-foreground hover:bg-secondary dark:hover:bg-[#002040]/50` |
| Talent community bg | `bg-[#002040]` |
| Talent community button | `rounded-full bg-white text-[#002040] hover:bg-white/90` |
| Loading spinner | `h-10 w-10 animate-spin rounded-full border-4 border-[#002040]/20 border-t-[#002040]` |
| Empty state icon | `w-16 h-16 rounded-full bg-secondary dark:bg-[#002040]` |
| Error state icon | `w-16 h-16 rounded-full bg-red-50 dark:bg-red-900/20` |

---

## 9. Job Apply Modal

File: `src/components/job-apply-modal.tsx`

### 8.1 Modal Structure

```
┌─────────────────────────────────────────────┐
│ HEADER (sticky)                             │
│ Apply: {job.title}                    [✕]   │
│ Req ID: JTG-XXX · Company                   │
├──────────────────────┬──────────────────────┤
│ FORM (desktop 2-col) │ SIDEBAR (280px)      │
│                      │ Position Summary:    │
│ First Name*  Last*   │ 📍 Location          │
│ Email*               │ 💼 Category          │
│ Phone*               │ 🏢 Company           │
│ Current Location     │ 🕐 Job Type          │
│                      │ 📅 Deadline          │
│ CV/Resume* [upload]  │ [Deadline Badge]     │
│                      │                      │
│ Cover Letter         │                      │
│ [upload] — OR —      │                      │
│ [textarea]           │                      │
│                      │                      │
│ Academic Certs       │                      │
│ [upload multi-file]  │                      │
│                      │                      │
│ [Submit] [Cancel]    │                      │
└──────────────────────┴──────────────────────┘

SUCCESS STATE:
┌─────────────────────────────────────────────┐
│               ✓ (green circle)              │
│         Thank you for applying!             │
│   Your application has been received...     │
│           [Browse More Jobs]                │
└─────────────────────────────────────────────┘
```

### 8.2 Modal Styling Key Classes

| Element | Classes |
|---|---|
| Backdrop | `fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm` |
| Modal container | `w-full max-w-2xl lg:max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-[#0a1e30] shadow-2xl border border-border` |
| Header | `sticky top-0 z-10 bg-white dark:bg-[#0a1e30] border-b border-border px-5 sm:px-6 py-4` |
| Close button | `w-8 h-8 rounded-full hover:bg-secondary` |
| Form inputs | `w-full px-3 py-2 rounded-lg border text-sm bg-background focus:ring-2 focus:ring-[#002040]/20 focus:border-[#002040]/40` |
| Submit button | `flex-1 py-3 text-sm font-semibold rounded-full bg-[#002040] text-white hover:bg-[#001826]` |
| Cancel button | `px-6 py-3 text-sm font-medium rounded-full border border-input hover:bg-secondary` |
| File upload zone | `rounded-lg border-2 border-dashed border-input cursor-pointer hover:bg-secondary/50` |
| File uploaded state | `rounded-lg border-2 border-green-500/50 bg-green-50/50 dark:bg-green-900/10` |
| Success icon | `w-16 h-16 rounded-full bg-green-50 dark:bg-green-900/20` |
| Deadline error | `rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800` |
| Summary card | `p-4 rounded-xl bg-secondary/50 dark:bg-[#002040]/30 border border-border` |
| Animation | `framer-motion` AnimatePresence with `initial={{ opacity: 0, y: 40, scale: 0.97 }}` |

---

## 10. Responsive Breakpoints

| Breakpoint | Width | Blog Detail Behavior | Careers Behavior |
|---|---|---|---|
| Default (mobile) | <640px | Single column, image h-[250px] | Hero h-[180px], job rows vertical |
| `sm` | ≥640px | Image h-[350px] | Hero h-[220px], search card horizontal |
| `md` | ≥768px | — | Talent community 2-col grid |
| `lg` | ≥1024px | 2-col grid (2fr+1fr), sticky sidebar, image h-[450px] | Job rows horizontal with labeled columns, modal 2-col |
| Custom | ≤810px | News hero title 44px (from CSS) | — |

---

## 11. Dark Mode Strategy

The design uses a hybrid approach:

1. **Semantic CSS variables** (`--background`, `--foreground`, `--border`, etc.) handle most cases — they automatically switch between light/dark via `.dark` class.

2. **Explicit `dark:` Tailwind variants** are used for:
   - Card backgrounds: `bg-white dark:bg-[#0a1e30]`
   - Navy elements that need to remain dark: `bg-[#002040]` (no dark variant needed)
   - Hover states: `hover:bg-muted/30 dark:hover:bg-[#002040]/20`
   - Text on dark backgrounds: `text-white` (already light on navy)
   - Deadline badges: separate dark variants for each color

3. **Light mode overrides** use `:root:not(.dark)` selectors in CSS for:
   - Glass effect background
   - Gradient text direction (reversed in light mode)
   - Grid pattern opacity
   - Scrollbar colors
   - Selection colors

**Pattern to follow:** When using a background color, always provide both `bg-white dark:bg-[#0a1e30]` unless it's specifically navy (`bg-[#002040]`) which looks fine in both modes.

---

## 12. Migration Checklist (React/Vite)

### Phase 1: Project Scaffold
- [ ] `npm create vite@latest my-project -- --template react-ts`
- [ ] Install: `react-router-dom`, `react-helmet-async`, `lucide-react`, `framer-motion`
- [ ] Install dev: `tailwindcss`, `@tailwindcss/vite`, `tw-animate-css`
- [ ] Configure `vite.config.ts` with `@vitejs/plugin-react` + `@tailwindcss/vite`
- [ ] Copy `globals.css` in full (Sections 2.1–2.5, 3.1–3.12)
- [ ] Set up Inter font via Google Fonts CSS `@import` in `globals.css`:
  ```css
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
  ```
- [ ] Copy API layer (`src/lib/api.ts`) — Section 6 (identical to Next.js)

### Phase 2: Router & App Shell
- [ ] Create `src/App.tsx` with `BrowserRouter`, `Routes`, `HelmetProvider` (Section 7.2)
- [ ] Update `src/main.tsx` to render `<App />` (Section 7.3)
- [ ] Copy Navbar, Footer, WhatsAppButton components
- [ ] Copy CATEGORY_MAP and helper functions (Section 5)
- [ ] Verify all image paths (`/images/*.webp`) are in `public/images/`

### Phase 3: Blog Pages (React)
- [ ] Copy `src/components/news.tsx` (listing grid — works as-is!)
- [ ] Copy `src/components/news-detail.tsx` (detail UI — works as-is!)
- [ ] Replace `next/link` → `react-router-dom` Link in news.tsx and news-detail.tsx
- [ ] Replace `next/navigation` useRouter → useNavigate in news-detail.tsx  
  (or keep the `onBack`/`onArticleClick` callback pattern — already prop-driven!)
- [ ] Create `src/pages/NewsList.tsx` (React wrapper — Section 7.6)
- [ ] Create `src/pages/NewsDetail.tsx` (React wrapper — Section 7.5)
- [ ] Add routes to `App.tsx`

### Phase 4: Careers Pages (React)
- [ ] Copy `src/components/careers.tsx` (main UI — works as-is! It's already "use client")
- [ ] Copy `src/components/job-apply-modal.tsx` (modal — works as-is!)
- [ ] Create `src/pages/CareersPage.tsx` (React wrapper — Section 8.3)
- [ ] Add route to `App.tsx`

### Phase 5: Next.js → React Cleanup
- [ ] Replace all `next/link` imports with `react-router-dom` Link
- [ ] Replace all `next/navigation` imports with `react-router-dom`
- [ ] Replace `notFound()` calls with conditional rendering
- [ ] Replace `next/image` `<Image>` with plain `<img>` tags
- [ ] Replace `generateMetadata` / `Metadata` with `<Helmet>`
- [ ] Replace `dynamic(() => import(...))` with `React.lazy()` + `<Suspense>`
- [ ] Remove `"use client"` directives (all components are client components in React)
- [ ] Remove `layout.tsx` files — use flat page structure

### Phase 6: Validation
- [ ] `npm run dev` — app starts without errors
- [ ] Test light mode (all pages)
- [ ] Test dark mode (all pages)
- [ ] Test mobile responsiveness (375px, 414px, 768px, 1024px, 1440px)
- [ ] Test blog detail with real API data
- [ ] Test blog detail with fallback content (no API)
- [ ] Test careers with real API data
- [ ] Test careers with fallback (no API — should show 8 hardcoded jobs)
- [ ] Test job apply modal (open, fill, submit, close, mobile layout)
- [ ] Test pagination (page size change, prev/next, boundary cases)
- [ ] Test category/company filters
- [ ] Test keyword search
- [ ] Test save job toggle
- [ ] Test share functionality
- [ ] Test newsletter subscribe
- [ ] Test like button on blog
- [ ] Test social share buttons on blog
- [ ] Test copy link on blog
- [ ] Test related articles navigation
- [ ] Test back button navigation
- [ ] Test direct URL access (e.g., `/news/some-slug` refresh)
- [ ] Verify all animations (framer-motion) are smooth
- [ ] Verify no layout shift on page load
- [ ] `npm run build` — production build succeeds
- [ ] Run Lighthouse audit (target ≥90)

---

## Appendix: Image Assets Required

```
/public/images/
├── jotofa-hero-1.webp
├── jotofa-hero-2.webp
├── jotofa-hero-3.webp
├── jotofa-logo.webp
├── utec.webp
├── courier.webp
├── cleaning.webp
├── security.webp
├── staffing.webp
```

---

## Appendix: Color Quick Reference

| Token | Hex | Usage |
|---|---|---|
| `jotofa-navy` | `#002040` | Primary buttons, headings, dark sections |
| `jotofa-accent` | `#00BFFF` | CTAs, links, highlights, badges |
| `background` (light) | `#FFFFFF` | Page background |
| `background` (dark) | `#00111F` | Page background |
| `card` (dark) | `#0A2A40` | Card backgrounds in dark mode |
| `secondary` (light) | `#F5F9FC` | Subtle backgrounds |
| `secondary` (dark) | `#001826` | Subtle backgrounds |
| `muted-foreground` (light) | `#5E6A75` | Secondary text |
| `muted-foreground` (dark) | `#C7D1DA` | Secondary text |
| `utec-cyan` | `#00d4ff` | UTEC category |
| `courier-orange` | `#ff8c00` | Courier category |
| `cleaning-green` | `#00d68f` | Cleaning/CSR category |
| `security-red` | `#ff3d57` | Security category |
| `staffing-purple` | `#a855f7` | Staffing category |

---

*End of Design Transfer Guide*
