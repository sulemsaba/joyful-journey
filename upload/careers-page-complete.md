# JOTOFA GROUP Careers Page — Complete Source & Design

> **Self-contained document.** Every line of code, every style, every asset needed to build the exact same Careers page in a **React (Vite) + Tailwind CSS v4** project.
>
> **Date:** May 30, 2026
> **Source project:** `/home/msaba/Desktop/jotofa` (converted from Next.js → React)

---

## Table of Contents

1. [Dependencies & Setup](#1-dependencies--setup)
2. [Complete `globals.css`](#2-complete-globalscss)
3. [Complete `src/lib/api.ts`](#3-complete-srclibapits)
4. [Complete `src/App.tsx` (Router)](#4-complete-srcapptsx-router)
5. [Complete `src/main.tsx` (Entry Point)](#5-complete-srcmaintsx-entry-point)
6. [Complete `src/pages/CareersPage.tsx` (Page Wrapper)](#6-complete-srcpagescareerspagetsx-page-wrapper)
7. [Complete `src/components/careers.tsx` (Main UI)](#7-complete-srccomponentscareerstsx-main-ui)
8. [Complete `src/components/job-apply-modal.tsx` (Modal)](#8-complete-srccomponentsjob-apply-modaltsx-modal)
9. [Layout Diagram](#9-layout-diagram)
10. [Styling Quick Reference](#10-styling-quick-reference)
11. [Required Image Assets](#11-required-image-assets)
12. [Step-by-Step Migration](#12-step-by-step-migration)

---

## 1. Dependencies & Setup

### 1.1 Create the Vite project
```bash
npm create vite@latest my-project -- --template react-ts
cd my-project
```

### 1.2 Install packages
```bash
npm install react-router-dom react-helmet-async lucide-react framer-motion
npm install -D tailwindcss @tailwindcss/vite tw-animate-css
```

### 1.3 `vite.config.ts`
```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

### 1.4 `package.json` (relevant deps only)
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
    "typescript": "^5.0.0"
  }
}
```

---

## 2. Complete `globals.css`

**File:** `src/globals.css`  
**Import this in `main.tsx`:** `import "./globals.css";`

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

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

  /* JOTOFA Brand Tokens */
  --color-jotofa-accent: #00BFFF;
  --color-jotofa-accent-light: #4DD4FF;
  --color-jotofa-accent-dark: #0099CC;
  --color-jotofa-hover-accent: #33CCFF;
  --color-jotofa-navy: #002040;
  --color-jotofa-navy-deep: #00111F;
  --color-jotofa-navy-mid: #001826;
  --color-jotofa-navy-card: #0A2A40;
  --color-jotofa-navy-sidebar: #000D18;
  --color-jotofa-text-secondary: #5E6A75;
  --color-jotofa-text-muted: #999DA0;
  --color-utec-cyan: #00d4ff;
  --color-courier-orange: #ff8c00;
  --color-cleaning-green: #00d68f;
  --color-security-red: #ff3d57;
  --color-staffing-purple: #a855f7;
  --color-jotofa-gold: #00BFFF;
  --color-jotofa-gold-light: #4DD4FF;
  --color-jotofa-gold-dark: #0099CC;
  --color-dark-bg: #002040;
  --color-dark-card: #0A2A40;
  --color-dark-card-hover: #0E3350;
  --color-dark-border: rgba(255, 255, 255, 0.08);
}

/* ─── LIGHT MODE ─── */
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

/* ─── DARK MODE ─── */
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

/* ─── BASE ─── */
@layer base {
  *, *::before, *::after {
    margin: 0; padding: 0; box-sizing: border-box;
  }
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  html { scroll-behavior: smooth; }
}

/* ─── SCROLLBAR ─── */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: #00111F; }
::-webkit-scrollbar-thumb { background: #0A2A40; border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: #0E3350; }

/* ─── SELECTION ─── */
::selection { background: rgba(0, 191, 255, 0.3); color: #ffffff; }

/* ─── LIGHT MODE OVERRIDES ─── */
:root:not(.dark) ::-webkit-scrollbar-track { background: #F5F9FC; }
:root:not(.dark) ::-webkit-scrollbar-thumb { background: #c0c8d0; }
:root:not(.dark) ::-webkit-scrollbar-thumb:hover { background: #a0acb8; }
:root:not(.dark) ::selection { background: rgba(0, 191, 255, 0.2); color: #002040; }
```

---

## 3. Complete `src/lib/api.ts`

```typescript
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api").replace(/\/$/, "");

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

export interface PublicJobDetail {
  id: string;
  section: string;
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

export async function getJobs(): Promise<PublicJob[]> {
  return request<PublicJob[]>("/public/jobs?page_size=100");
}

export async function getSubsidiaries(): Promise<PublicSubsidiary[]> {
  return request<PublicSubsidiary[]>("/public/subsidiaries");
}

export async function submitApplication(formData: FormData) {
  return request("/public/applications", {
    method: "POST",
    body: formData,
  });
}
```

> **Note for Vite:** Environment variables use `VITE_` prefix. Replace `NEXT_PUBLIC_API_BASE_URL` with `VITE_API_BASE_URL`.

---

## 4. Complete `src/App.tsx` (Router)

```typescript
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { CareersPage } from "./pages/CareersPage";

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/careers" element={<CareersPage />} />
          {/* Add other routes here */}
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
```

---

## 5. Complete `src/main.tsx` (Entry Point)

```typescript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./globals.css";

// Import Inter font in your index.html:
// <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

**In `index.html` `<head>`:**
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
```

---

## 6. Complete `src/pages/CareersPage.tsx` (Page Wrapper)

```typescript
import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import { WhatsAppButton } from "../components/whatsapp-button";

const Careers = lazy(() =>
  import("../components/careers").then((m) => ({ default: m.Careers }))
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
        <meta name="description"
          content="Join JOTOFA GROUP — explore career opportunities across our five subsidiaries in ICT, logistics, cleaning, security, and staffing." />
        <meta property="og:title" content="Careers — JOTOFA GROUP" />
        <meta property="og:description"
          content="Explore career opportunities across our five subsidiaries. Build your future with Tanzania's premier diversified holding company." />
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

---

## 7. Complete `src/components/careers.tsx` (Main UI)

> **Note:** The original file uses `next/link`. For React, replace:
> - `import Link from "next/link"` → `import { Link } from "react-router-dom"`
> - `<Link href="/about">` → `<Link to="/about">`
> - `<Link href="/contact">` → `<Link to="/contact">`

```typescript
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

/* ─────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────
   DEFAULT DATA
   ───────────────────────────────────────────── */
const defaultSubsidiaryTabs: SubsidiaryTab[] = [
  { key: "jotofa", label: "JOTOFA Group" },
  { key: "utec", label: "UTEC Solutions" },
  { key: "courier", label: "Courier & Logistics" },
  { key: "cleaning", label: "Cleaning & Maids" },
  { key: "security", label: "Security" },
  { key: "staffing", label: "Staffing & Labour" },
  { key: "all", label: "All Jobs" },
];

const subsidiaryHeroData: Record<string, {
  name: string; tagline: string; logo: string; heroImage: string;
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
  utec: {
    name: "UTEC Solutions",
    tagline: "Driving digital transformation through innovative technology solutions",
    logo: "/images/utec.webp",
    heroImage: "/images/jotofa-hero-2.webp",
    stats: [
      { label: "Employees", value: "200+" },
      { label: "Focus", value: "IT & Tech" },
      { label: "Country", value: "Tanzania" },
    ],
  },
  courier: {
    name: "Courier & Logistics",
    tagline: "Delivering reliability — connecting businesses across Tanzania every day",
    logo: "/images/courier.webp",
    heroImage: "/images/jotofa-hero-3.webp",
    stats: [
      { label: "Employees", value: "300+" },
      { label: "Focus", value: "Logistics" },
      { label: "Country", value: "Tanzania" },
    ],
  },
  cleaning: {
    name: "Cleaning & Maids",
    tagline: "Setting the standard for professional cleaning services across the region",
    logo: "/images/cleaning.webp",
    heroImage: "/images/jotofa-hero-1.webp",
    stats: [
      { label: "Employees", value: "250+" },
      { label: "Focus", value: "Facility Services" },
      { label: "Country", value: "Tanzania" },
    ],
  },
  security: {
    name: "JOTOFA Security",
    tagline: "Protecting businesses, assets, and people with trusted security solutions",
    logo: "/images/security.webp",
    heroImage: "/images/jotofa-hero-2.webp",
    stats: [
      { label: "Employees", value: "350+" },
      { label: "Focus", value: "Security" },
      { label: "Country", value: "Tanzania" },
    ],
  },
  staffing: {
    name: "Staffing & Labour",
    tagline: "Connecting talent with opportunity — powering Tanzania's workforce",
    logo: "/images/staffing.webp",
    heroImage: "/images/jotofa-hero-3.webp",
    stats: [
      { label: "Employees", value: "150+" },
      { label: "Focus", value: "HR & Staffing" },
      { label: "Country", value: "Tanzania" },
    ],
  },
  all: {
    name: "JOTOFA Group",
    tagline: "Explore career opportunities across all our subsidiaries",
    logo: "/images/jotofa-logo.webp",
    heroImage: "/images/jotofa-hero-1.webp",
    stats: [
      { label: "Employees", value: "1,200+" },
      { label: "Subsidiaries", value: "5" },
      { label: "Country", value: "Tanzania" },
    ],
  },
};

/* ── 8 FALLBACK JOBS (used when API unavailable) ── */
const FALLBACK_JOBS: Job[] = [
  {
    id: "JTG-001", title: "Network Engineer", category: "Information Technology",
    company: "UTEC Solutions", location: "Dar es Salaam", remote: false, type: "Full-time",
    description: "Join UTEC Solutions as a Network Engineer and play a pivotal role in designing, implementing, and maintaining enterprise-grade network infrastructure. You will be responsible for ensuring network reliability, security, and performance across all JOTOFA GROUP operations, supporting our mission to power progress through technology across Tanzania.",
    qualifications: [
      "Bachelor's degree in Computer Science, IT, or related field",
      "CCNA/CCNP certification preferred",
      "3+ years of enterprise network engineering experience",
      "Strong knowledge of TCP/IP, routing protocols (OSPF, BGP), VPNs",
      "Experience with Cisco, Juniper, or Fortinet equipment",
    ],
    responsibilities: [
      "Design and implement scalable network architectures",
      "Monitor network performance and troubleshoot issues",
      "Manage firewall configurations and security policies",
      "Plan and execute network upgrades and expansions",
      "Provide technical guidance to junior team members",
    ],
    requirements: [
      "Proficiency in network monitoring tools (SolarWinds, PRTG)",
      "Experience with SD-WAN and cloud networking",
      "Strong analytical and problem-solving skills",
      "Excellent communication and documentation abilities",
      "Ability to work on-call for critical incidents",
    ],
    benefits: [
      "Competitive salary with annual performance bonus",
      "Health insurance for employee and dependents",
      "Professional development and certification sponsorship",
      "Flexible work arrangements", "22 days annual leave",
    ],
    deadline: "2026-06-15",
  },
  {
    id: "JTG-002", title: "Logistics Coordinator", category: "Supply Chain & Logistics",
    company: "Courier & Logistics", location: "Dar es Salaam", remote: false, type: "Full-time",
    description: "As a Logistics Coordinator at Courier & Logistics, you will oversee the efficient movement of goods across our distribution network. You'll coordinate between suppliers, warehouses, and delivery teams to ensure timely and cost-effective service delivery that keeps Tanzania's businesses running smoothly.",
    qualifications: [
      "Bachelor's degree in Logistics, Supply Chain, or Business Administration",
      "2+ years in logistics or supply chain coordination",
      "Knowledge of warehouse management systems",
      "Understanding of Tanzanian transport regulations",
      "Proficiency in MS Excel and logistics software",
    ],
    responsibilities: [
      "Coordinate daily shipment scheduling and route planning",
      "Monitor inventory levels and manage stock replenishment",
      "Liaise with transport providers and negotiate rates",
      "Track and report on key logistics KPIs",
      "Resolve delivery issues and customer complaints promptly",
    ],
    requirements: [
      "Strong organizational and multitasking skills",
      "Excellent interpersonal and negotiation abilities",
      "Experience with ERP systems (SAP, Oracle preferred)",
      "Ability to work under pressure and meet tight deadlines",
      "Valid driver's license",
    ],
    benefits: [
      "Competitive salary with performance incentives",
      "Health and life insurance coverage",
      "Career advancement opportunities across the group",
      "Transport allowance", "20 days annual leave",
    ],
    deadline: "2026-06-20",
  },
  {
    id: "JTG-003", title: "Operations Supervisor", category: "Operations",
    company: "Cleaning & Maids", location: "Arusha", remote: false, type: "Full-time",
    description: "Lead field operations for Cleaning & Maids in Arusha, ensuring our professional cleaning services meet the highest standards. You'll manage teams, maintain client relationships, and drive operational excellence that makes a tangible difference in workplaces and homes across the region.",
    qualifications: [
      "Diploma or Bachelor's in Business Management or related field",
      "2+ years supervisory experience in service operations",
      "Knowledge of cleaning industry standards and safety protocols",
      "Experience managing teams of 15+ personnel",
      "Strong customer service orientation",
    ],
    responsibilities: [
      "Supervise and schedule cleaning teams across assigned sites",
      "Conduct quality inspections and ensure compliance with standards",
      "Train and onboard new cleaning staff",
      "Manage client relationships and address service concerns",
      "Control operational costs and manage supplies inventory",
    ],
    requirements: [
      "Strong leadership and team management skills",
      "Excellent time management and organizational abilities",
      "Basic proficiency in reporting tools and spreadsheets",
      "Willingness to work flexible hours including weekends",
      "Own reliable transport preferred",
    ],
    benefits: [
      "Competitive salary with site performance bonuses",
      "Health insurance coverage", "Uniform and equipment provided",
      "Training and professional development programs", "18 days annual leave",
    ],
    deadline: "2026-05-31",
  },
  {
    id: "JTG-004", title: "Security Operations Manager", category: "Security & Safety",
    company: "JOTOFA Security", location: "Dar es Salaam", remote: false, type: "Full-time",
    description: "Take command of security operations at JOTOFA Security, where you'll lead a team protecting businesses, assets, and people across Dar es Salaam. This role combines strategic planning with hands-on operational management in one of Tanzania's fastest-growing security companies.",
    qualifications: [
      "Bachelor's degree in Security Management, Criminology, or related field",
      "5+ years in security operations, 2+ in management",
      "Military or law enforcement background preferred",
      "Certification in security management (CPP, PSP, or equivalent)",
      "Knowledge of Tanzanian security regulations",
    ],
    responsibilities: [
      "Oversee all security operations in the Dar es Salaam region",
      "Develop and implement security protocols and emergency response plans",
      "Manage and train security personnel across multiple sites",
      "Conduct risk assessments and vulnerability analyses",
      "Maintain client relationships and prepare operational reports",
    ],
    requirements: [
      "Strong leadership and decision-making under pressure",
      "Excellent written and verbal communication skills",
      "Experience with electronic security systems (CCTV, access control)",
      "Ability to manage multiple priorities simultaneously",
      "Clean criminal record and background check",
    ],
    benefits: [
      "Competitive salary with operational performance bonus",
      "Comprehensive health and life insurance",
      "Company vehicle for operational use",
      "Advanced security training and certifications sponsored", "25 days annual leave",
    ],
    deadline: "2026-07-01",
  },
  {
    id: "JTG-005", title: "HR & Recruitment Specialist", category: "Human Resources",
    company: "Staffing & Labour", location: "Dar es Salaam", remote: true, type: "Full-time",
    description: "Join Staffing & Labour as an HR & Recruitment Specialist and be the bridge between talented professionals and their dream careers. You'll manage the full recruitment lifecycle for JOTOFA GROUP, identifying top talent that will help power progress across Tanzania. This role offers remote flexibility.",
    qualifications: [
      "Bachelor's degree in Human Resources, Business Administration, or Psychology",
      "3+ years in HR with strong recruitment focus",
      "CHRP certification or equivalent preferred",
      "Knowledge of Tanzanian labor laws and employment regulations",
      "Experience with applicant tracking systems (ATS)",
    ],
    responsibilities: [
      "Manage end-to-end recruitment for positions across all subsidiaries",
      "Develop job descriptions and person specifications",
      "Screen candidates, conduct interviews, and coordinate hiring processes",
      "Maintain and develop the talent pipeline and candidate database",
      "Ensure compliance with labor laws and company policies",
    ],
    requirements: [
      "Strong interpersonal and communication skills",
      "Proficiency in HR software and Microsoft Office Suite",
      "Ability to handle confidential information with discretion",
      "Excellent organizational and time management skills",
      "Self-motivated with ability to work independently (remote role)",
    ],
    benefits: [
      "Competitive salary with placement performance bonus",
      "Remote work flexibility", "Health insurance for employee and dependents",
      "Professional development and certification sponsorship", "24 days annual leave",
    ],
    deadline: "2026-06-10",
  },
  {
    id: "JTG-006", title: "Software Developer", category: "Information Technology",
    company: "UTEC Solutions", location: "Dar es Salaam", remote: true, type: "Full-time",
    description: "Build the future with UTEC Solutions as a Software Developer. You'll design and develop innovative software solutions that power JOTOFA GROUP's digital transformation, from enterprise applications to smart city platforms. This role offers remote flexibility for developers anywhere in Tanzania.",
    qualifications: [
      "Bachelor's degree in Computer Science, Software Engineering, or related field",
      "3+ years of professional software development experience",
      "Proficiency in TypeScript/JavaScript, Python, or Java",
      "Experience with React, Next.js, or similar frameworks",
      "Understanding of RESTful APIs and database design",
    ],
    responsibilities: [
      "Design, develop, and maintain web and mobile applications",
      "Write clean, testable, and well-documented code",
      "Collaborate with cross-functional teams on product development",
      "Participate in code reviews and maintain code quality standards",
      "Troubleshoot and resolve software defects and performance issues",
    ],
    requirements: [
      "Experience with Git version control and CI/CD pipelines",
      "Familiarity with cloud platforms (AWS, Azure, or GCP)",
      "Strong problem-solving and analytical thinking",
      "Excellent communication skills for remote collaboration",
      "Portfolio of shipped projects or open-source contributions",
    ],
    benefits: [
      "Competitive salary with technology skills allowance",
      "Remote work with flexible hours", "Latest hardware and development tools provided",
      "Conference attendance and learning budget", "22 days annual leave",
    ],
    deadline: "2026-06-25",
  },
  {
    id: "JTG-007", title: "Fleet Manager", category: "Supply Chain & Logistics",
    company: "Courier & Logistics", location: "Mwanza", remote: false, type: "Full-time",
    description: "Manage the vehicle fleet that keeps Tanzania moving. As Fleet Manager at Courier & Logistics in Mwanza, you'll oversee vehicle procurement, maintenance, and driver management to ensure our logistics operations run efficiently and safely across the Lake Zone region.",
    qualifications: [
      "Bachelor's degree in Logistics, Transport Management, or related field",
      "4+ years in fleet management or transport operations",
      "Knowledge of vehicle maintenance and fleet tracking systems",
      "Understanding of Tanzanian transport regulations and compliance",
      "Experience managing fleets of 30+ vehicles",
    ],
    responsibilities: [
      "Oversee fleet procurement, allocation, and disposal",
      "Implement and manage GPS tracking and fleet telematics systems",
      "Coordinate vehicle maintenance schedules and repairs",
      "Manage driver recruitment, training, and performance monitoring",
      "Ensure regulatory compliance and vehicle documentation",
    ],
    requirements: [
      "Strong analytical skills for fleet cost optimization",
      "Experience with fleet management software",
      "Excellent vendor and supplier management abilities",
      "Budget management and cost control experience",
      "Valid driver's license with clean record",
    ],
    benefits: [
      "Competitive salary with fleet performance bonus",
      "Health and accident insurance coverage", "Company vehicle for operational use",
      "Career growth within the logistics division", "20 days annual leave",
    ],
    deadline: "2026-07-15",
  },
  {
    id: "JTG-008", title: "Facility Inspector", category: "Quality Assurance",
    company: "Cleaning & Maids", location: "Dodoma", remote: false, type: "Full-time",
    description: "Ensure excellence at every site as a Facility Inspector for Cleaning & Maids in Dodoma. You'll conduct quality audits, implement improvement plans, and verify that our cleaning services consistently exceed client expectations across government buildings, offices, and residential properties.",
    qualifications: [
      "Diploma in Quality Management, Facilities Management, or related field",
      "2+ years in quality inspection or facilities management",
      "Knowledge of cleaning standards and health & safety regulations",
      "Strong attention to detail and documentation skills",
      "Experience with quality management systems (ISO 9001 preferred)",
    ],
    responsibilities: [
      "Conduct regular site inspections and quality audits",
      "Document findings and prepare detailed inspection reports",
      "Follow up on corrective actions and improvement plans",
      "Train cleaning teams on quality standards and best practices",
      "Maintain inspection schedules and client communication",
    ],
    requirements: [
      "Meticulous attention to detail", "Strong written reporting skills",
      "Ability to work independently across multiple sites",
      "Proficiency in mobile inspection tools and apps",
      "Reliable transport for site visits",
    ],
    benefits: [
      "Competitive salary with inspection quality bonus",
      "Health insurance coverage", "Transport allowance for site visits",
      "Training and career development opportunities", "18 days annual leave",
    ],
    deadline: "2026-06-30",
  },
];

const fallbackCompanyToSubKey: Record<string, string> = {
  "UTEC Solutions": "utec",
  "Courier & Logistics": "courier",
  "Cleaning & Maids": "cleaning",
  "JOTOFA Security": "security",
  "Staffing & Labour": "staffing",
};

const PAGE_SIZE_OPTIONS = [10, 50, 100] as const;

/* ─────────────────────────────────────────────
   HELPERS
   ───────────────────────────────────────────── */
function uniqueSorted(values: string[]) {
  return Array.from(new Set(values.filter(Boolean))).sort((a, b) => a.localeCompare(b));
}

function detailsFor(job: PublicJob, section: string) {
  return job.details
    .filter((detail) => detail.section.toLowerCase() === section)
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((detail) => detail.content);
}

function mapPublicJob(job: PublicJob): Job {
  return {
    id: job.job_id,
    backendId: job.id,
    title: job.title,
    category: job.category_name || "Uncategorized",
    company: job.company_name,
    location: job.location,
    remote: job.remote,
    type: job.type,
    description: job.description || "",
    qualifications: detailsFor(job, "qualifications"),
    responsibilities: detailsFor(job, "responsibilities"),
    requirements: detailsFor(job, "requirements"),
    benefits: detailsFor(job, "benefits"),
    deadline: job.deadline || "",
  };
}

/* ═════════════════════════════════════════════
   MAIN COMPONENT
   ═════════════════════════════════════════════ */
export function Careers() {
  /* ── State ── */
  const [activeTab, setActiveTab] = useState("jotofa");
  const [keyword, setKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedCompany, setSelectedCompany] = useState("All Companies");
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [expandedFullJob, setExpandedFullJob] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);
  const [showSearchCategory, setShowSearchCategory] = useState(false);
  const [applyJob, setApplyJob] = useState<Job | null>(null);
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());
  const [jobsData, setJobsData] = useState<Job[]>([]);
  const [apiSubsidiaries, setApiSubsidiaries] = useState<PublicSubsidiary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  /* ── Data Loading ── */
  useEffect(() => {
    let cancelled = false;
    async function loadCareers() {
      setIsLoading(true);
      setLoadError("");
      try {
        const [jobList, subsidiaryList] = await Promise.all([
          getJobs(), getSubsidiaries(),
        ]);
        if (cancelled) return;
        setJobsData(jobList.length > 0 ? jobList.map(mapPublicJob) : FALLBACK_JOBS);
        setApiSubsidiaries(subsidiaryList);
      } catch {
        if (!cancelled) {
          setJobsData(FALLBACK_JOBS);
          setApiSubsidiaries([]);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    loadCareers();
    return () => { cancelled = true; };
  }, []);

  /* ── Derived Data ── */
  const subsidiaryTabs = useMemo<SubsidiaryTab[]>(() => {
    if (!apiSubsidiaries.length) return defaultSubsidiaryTabs;
    return [
      { key: "jotofa", label: "JOTOFA Group" },
      ...apiSubsidiaries.filter((s) => s.key !== "jotofa")
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((s) => ({ key: s.key, label: s.label })),
      { key: "all", label: "All Jobs" },
    ];
  }, [apiSubsidiaries]);

  const categories = useMemo(
    () => ["All Categories", ...uniqueSorted(jobsData.map((j) => j.category))],
    [jobsData]
  );

  const companies = useMemo(
    () => ["All Companies", ...uniqueSorted(jobsData.map((j) => j.company))],
    [jobsData]
  );

  const companyToSubKey = useMemo(() => {
    const map: Record<string, string> = { ...fallbackCompanyToSubKey };
    apiSubsidiaries.forEach((sub) => { map[sub.name] = sub.key; map[sub.label] = sub.key; });
    return map;
  }, [apiSubsidiaries]);

  const heroDataByKey = useMemo(() => {
    const data = { ...subsidiaryHeroData };
    apiSubsidiaries.forEach((sub) => {
      const fb = subsidiaryHeroData[sub.key] || subsidiaryHeroData.jotofa;
      data[sub.key] = {
        name: sub.name, tagline: sub.tagline || fb.tagline,
        logo: sub.logo || fb.logo, heroImage: sub.hero_image || fb.heroImage,
        stats: sub.stats?.length ? [...sub.stats].sort((a, b) => a.sort_order - b.sort_order)
          .map((s) => ({ label: s.label, value: s.value })) : fb.stats,
      };
    });
    return data;
  }, [apiSubsidiaries]);

  const activeHeroKey = useMemo(() => {
    if (selectedCompany !== "All Companies") return companyToSubKey[selectedCompany] || activeTab;
    return activeTab;
  }, [activeTab, selectedCompany, companyToSubKey]);

  /* ── Filtered Jobs ── */
  const filteredJobs = useMemo(() => {
    let result = [...jobsData];
    if (activeTab !== "jotofa" && activeTab !== "all")
      result = result.filter((j) => companyToSubKey[j.company] === activeTab);
    if (keyword.trim()) {
      const kw = keyword.toLowerCase();
      result = result.filter((j) =>
        j.title.toLowerCase().includes(kw) || j.category.toLowerCase().includes(kw) ||
        j.company.toLowerCase().includes(kw) || j.id.toLowerCase().includes(kw));
    }
    if (selectedCategory !== "All Categories") result = result.filter((j) => j.category === selectedCategory);
    if (selectedCompany !== "All Companies") result = result.filter((j) => j.company === selectedCompany);
    return result;
  }, [activeTab, keyword, selectedCategory, selectedCompany, companyToSubKey, jobsData]);

  /* ── Pagination ── */
  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / pageSize));
  const paginatedJobs = filteredJobs.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  /* ── Handlers ── */
  const resetExpansion = useCallback(() => { setExpandedJob(null); setExpandedFullJob(null); }, []);
  const resetAndGoToPage1 = useCallback(() => { setCurrentPage(1); resetExpansion(); }, [resetExpansion]);

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab); resetAndGoToPage1();
  }, [resetAndGoToPage1]);
  const handleSearch = useCallback(() => resetAndGoToPage1(), [resetAndGoToPage1]);
  const handleCategorySelect = useCallback((cat: string) => {
    setSelectedCategory(cat); setShowCategoryDropdown(false); setShowSearchCategory(false); resetAndGoToPage1();
  }, [resetAndGoToPage1]);
  const handleCompanySelect = useCallback((comp: string) => {
    setSelectedCompany(comp); setShowCompanyDropdown(false); resetAndGoToPage1();
  }, [resetAndGoToPage1]);
  const handleKeywordChange = useCallback((val: string) => { setKeyword(val); setCurrentPage(1); }, []);
  const handlePageSizeChange = useCallback((size: number) => { setPageSize(size); setCurrentPage(1); }, []);

  const toggleSaveJob = useCallback((jobId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedJobs((prev) => { const next = new Set(prev); next.has(jobId) ? next.delete(jobId) : next.add(jobId); return next; });
  }, []);

  const closeAllDropdowns = useCallback(() => {
    setShowCategoryDropdown(false); setShowCompanyDropdown(false); setShowSearchCategory(false);
  }, []);

  const getDeadlineInfo = useCallback((deadline: string) => {
    const daysLeft = Math.ceil((new Date(deadline).getTime() - Date.now()) / 86400000);
    if (daysLeft < 0) return { status: "closed" as const, daysLeft, label: "Closed" };
    if (daysLeft <= 7) return { status: "urgent" as const, daysLeft, label: `${daysLeft}d left` };
    return { status: "open" as const, daysLeft, label: new Date(deadline).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) };
  }, []);

  const heroData = heroDataByKey[activeHeroKey] || heroDataByKey.jotofa;

  /* ═════════════════════════════════════════════
     RENDER
     ═════════════════════════════════════════════ */
  return (
    <section className="relative min-h-screen bg-background" onClick={closeAllDropdowns}>

      {/* ═══ 1. HERO BANNER ═══ */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-4">
        <div className="relative w-full h-[180px] sm:h-[220px] rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${heroData.heroImage}')` }} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#002040]/90 via-[#002040]/75 to-[#002040]/50" />
          <div className="relative z-10 flex items-center h-full px-6 sm:px-8">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 shrink-0">
                <img src={heroData.logo} alt={heroData.name}
                  className="w-9 h-9 sm:w-10 sm:h-10 object-contain brightness-0 invert" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1">{heroData.name}</h1>
                <p className="text-sm text-white/70 leading-snug max-w-md hidden sm:block">{heroData.tagline}</p>
                <div className="flex items-center gap-2 sm:gap-3 mt-1.5 flex-wrap">
                  {heroData.stats.map((stat, idx) => (
                    <span key={stat.label} className="contents">
                      <div className="flex items-center gap-1.5 text-white/50 text-xs">
                        {idx === 0 && <Users className="w-3.5 h-3.5" />}
                        <span>{stat.value} {stat.label}</span>
                      </div>
                      {idx < heroData.stats.length - 1 && <span className="w-1 h-1 rounded-full bg-white/40" />}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="ml-auto hidden md:block">
              <Link to="/about"
                className="px-5 py-2 text-sm font-medium rounded-full border border-white/30 text-white hover:bg-white/10 transition-colors inline-block">
                About {heroData.name}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ 2. SUB NAVIGATION TABS ═══ */}
      <div className="bg-white dark:bg-[#0a1e30] border-b border-border mt-6 relative">
        <div className="mx-auto max-w-5xl px-2 sm:px-6 lg:px-8">
          <div className="flex items-center overflow-x-auto scrollbar-hide -mx-1 py-0">
            {subsidiaryTabs.map((sub) => {
              const isActive = activeTab === sub.key;
              return (
                <button key={sub.key} onClick={(e) => { e.stopPropagation(); handleTabChange(sub.key); }}
                  className={`relative flex items-center gap-2 px-3 sm:px-4 py-3 text-[13px] sm:text-sm font-medium whitespace-nowrap transition-colors shrink-0 ${
                    isActive ? "text-[#002040] dark:text-white" : "text-[#002040]/40 dark:text-white/40 hover:text-[#002040] dark:hover:text-white/70"}`}>
                  <span>{sub.label}</span>
                  {isActive && <span className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-[#002040] dark:bg-white" />}
                </button>
              );
            })}
          </div>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white dark:from-[#0a1e30] to-transparent pointer-events-none sm:hidden" />
      </div>

      {/* ═══ 3. SEARCH CARD ═══ */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-white dark:bg-[#0a1e30] rounded-xl shadow-sm p-5 sm:p-6 border border-border">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="text" placeholder="Search keyword, category, or job title"
                value={keyword} onChange={(e) => handleKeywordChange(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#002040]/20 focus:border-[#002040]/40 transition-all" />
            </div>
            <div className="relative sm:w-48">
              <button onClick={(e) => { e.stopPropagation(); setShowSearchCategory(!showSearchCategory); setShowCategoryDropdown(false); setShowCompanyDropdown(false); }}
                className="w-full flex items-center justify-between gap-2 px-4 py-2.5 rounded-full border border-input bg-background text-sm text-foreground hover:border-[#002040]/30 transition-colors">
                <span className="truncate">{selectedCategory === "All Categories" ? "Category" : selectedCategory}</span>
                <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
              </button>
              {showSearchCategory && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-[#0a1e30] rounded-lg shadow-lg border border-border z-50 max-h-60 overflow-y-auto">
                  {categories.map((cat) => (
                    <button key={cat} onClick={(e) => { e.stopPropagation(); handleCategorySelect(cat); }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-secondary dark:hover:bg-[#002040] transition-colors ${
                        selectedCategory === cat ? "text-[#002040] dark:text-white font-medium" : "text-foreground"}`}>{cat}</button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={handleSearch}
              className="flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-full bg-[#002040] text-white hover:bg-[#001826] transition-colors shrink-0">
              <Search className="w-4 h-4" /><span>Find Jobs</span>
            </button>
          </div>
        </div>
      </div>

      {/* ═══ 4. FILTER BAR ═══ */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
            <Filter className="w-4 h-4" /><span>Filters</span>
          </div>
          {/* Category filter */}
          <div className="relative">
            <button onClick={(e) => { e.stopPropagation(); setShowCategoryDropdown(!showCategoryDropdown); setShowCompanyDropdown(false); setShowSearchCategory(false); }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-input bg-background text-sm text-foreground hover:border-[#002040]/30 transition-colors">
              <Briefcase className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="truncate max-w-[140px]">{selectedCategory === "All Categories" ? "Categories" : selectedCategory}</span>
              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
            {showCategoryDropdown && (
              <div className="absolute top-full left-0 mt-1 w-56 bg-white dark:bg-[#0a1e30] rounded-lg shadow-lg border border-border z-50 max-h-60 overflow-y-auto">
                {categories.map((cat) => (
                  <button key={cat} onClick={(e) => { e.stopPropagation(); handleCategorySelect(cat); }}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-secondary dark:hover:bg-[#002040] transition-colors ${
                      selectedCategory === cat ? "text-[#002040] dark:text-white font-medium" : "text-foreground"}`}>{cat}</button>
                ))}
              </div>
            )}
          </div>
          {/* Company filter */}
          <div className="relative">
            <button onClick={(e) => { e.stopPropagation(); setShowCompanyDropdown(!showCompanyDropdown); setShowCategoryDropdown(false); setShowSearchCategory(false); }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-input bg-background text-sm text-foreground hover:border-[#002040]/30 transition-colors">
              <Globe className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="truncate max-w-[140px]">{selectedCompany === "All Companies" ? "Company" : selectedCompany}</span>
              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
            {showCompanyDropdown && (
              <div className="absolute top-full left-0 mt-1 w-56 bg-white dark:bg-[#0a1e30] rounded-lg shadow-lg border border-border z-50 max-h-60 overflow-y-auto">
                {companies.map((comp) => (
                  <button key={comp} onClick={(e) => { e.stopPropagation(); handleCompanySelect(comp); }}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-secondary dark:hover:bg-[#002040] transition-colors ${
                      selectedCompany === comp ? "text-[#002040] dark:text-white font-medium" : "text-foreground"}`}>{comp}</button>
                ))}
              </div>
            )}
          </div>
          {/* Clear */}
          {(selectedCategory !== "All Categories" || selectedCompany !== "All Companies" || keyword.trim()) && (
            <button onClick={() => { setSelectedCategory("All Categories"); setSelectedCompany("All Companies"); setKeyword(""); setCurrentPage(1); }}
              className="flex items-center gap-1 px-3 py-1.5 text-sm text-[#002040] dark:text-white hover:text-[#002040]/70 dark:hover:text-white/70 transition-colors">
              <X className="w-3.5 h-3.5" />Clear
            </button>
          )}
        </div>
      </div>

      {/* ═══ 5. JOB LISTINGS ═══ */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-6 mb-20 sm:mb-12">
        {isLoading ? (
          /* ── LOADING ── */
          <div className="bg-white dark:bg-[#0a1e30] rounded-2xl border border-border shadow-sm p-10 sm:p-16 text-center">
            <div className="mx-auto mb-5 h-10 w-10 rounded-full border-4 border-[#002040]/20 border-t-[#002040] animate-spin" />
            <h3 className="text-xl font-bold text-foreground mb-2">Loading open positions</h3>
            <p className="text-sm text-muted-foreground">Fetching the latest career opportunities from the backend.</p>
          </div>
        ) : loadError ? (
          /* ── ERROR ── */
          <div className="bg-white dark:bg-[#0a1e30] rounded-2xl border border-red-200 dark:border-red-900/50 shadow-sm p-10 sm:p-16 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 dark:bg-red-900/20 mb-5">
              <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Careers could not load</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">{loadError}</p>
          </div>
        ) : filteredJobs.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{filteredJobs.length}</span> Position{filteredJobs.length !== 1 ? "s" : ""} Found
              </p>
            </div>

            {/* Job list container */}
            <div className="bg-white dark:bg-[#0a1e30] rounded-lg border border-border shadow-sm overflow-hidden">
              {paginatedJobs.map((job, jobIdx) => {
                const isPreview = expandedJob === job.id;
                const isFullExpanded = expandedFullJob === job.id;
                const isExpanded = isPreview || isFullExpanded;
                const isSaved = savedJobs.has(job.id);
                const deadlineInfo = job.deadline ? getDeadlineInfo(job.deadline) : null;
                const isLast = jobIdx === paginatedJobs.length - 1;

                return (
                  <div key={job.id} className={!isLast ? "border-b border-border" : ""}>

                    {/* ─── COLLAPSED ROW ─── */}
                    <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-0 px-5 sm:px-6 py-4 cursor-pointer hover:bg-muted/30 dark:hover:bg-[#002040]/20 transition-colors"
                      onClick={() => {
                        if (isFullExpanded) { setExpandedFullJob(null); setExpandedJob(null); }
                        else if (isPreview) { setExpandedJob(null); }
                        else { setExpandedJob(job.id); setExpandedFullJob(null); }
                      }}>
                      <div className="flex items-start lg:items-center gap-3 lg:flex-1 lg:min-w-0">
                        <div className="pt-0.5 lg:pt-0 shrink-0">
                          {isExpanded ? <ChevronDown className="w-4 h-4 text-[#002040] dark:text-white" />
                            : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[15px] font-semibold text-[#002040] dark:text-white leading-tight">{job.title}</span>
                            {job.remote && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-medium rounded-full bg-[#002040]/10 dark:bg-[#002040]/30 text-[#002040] dark:text-white border border-[#002040]/20 dark:border-[#002040]/50">
                                <Home className="w-3 h-3" />Remote
                              </span>
                            )}
                            {deadlineInfo?.status === "closed" && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800">Closed</span>
                            )}
                            {deadlineInfo?.status === "urgent" && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">{deadlineInfo.label}</span>
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground mt-0.5 block">Req ID: {job.id}</span>
                        </div>
                      </div>
                      {/* Desktop info columns */}
                      <div className="hidden lg:grid lg:grid-cols-3 lg:gap-8 lg:flex-none">
                        <div><span className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">Location</span><p className="text-sm text-foreground mt-0.5">{job.location}</p></div>
                        <div><span className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">Categories</span><p className="text-sm text-foreground mt-0.5">{job.category}</p></div>
                        <div><span className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">Company</span><p className="text-sm text-foreground mt-0.5">{job.company}</p></div>
                      </div>
                      {/* Mobile info */}
                      <div className="lg:hidden flex flex-wrap items-center gap-x-4 gap-y-1 pl-7">
                        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground"><MapPin className="w-3 h-3 shrink-0" />{job.location}</span>
                        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground"><Briefcase className="w-3 h-3 shrink-0" />{job.category}</span>
                        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground"><Building2 className="w-3 h-3 shrink-0" />{job.company}</span>
                      </div>
                      {!isExpanded && (
                        <div className="flex items-center gap-2 lg:shrink-0 lg:ml-6 pl-7 lg:pl-0 self-end lg:self-auto">
                          <button onClick={(e) => { e.stopPropagation(); setApplyJob(job); }}
                            className="px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-full bg-[#002040] text-white hover:bg-[#001826] transition-colors">Apply Now</button>
                        </div>
                      )}
                    </div>

                    {/* ─── PREVIEW MODE ─── */}
                    {isPreview && !isFullExpanded && (
                      <div className="border-t border-border">
                        <div className="px-5 sm:px-6 py-4">
                          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">{job.description}</p>
                          <div className="flex flex-wrap items-center gap-3 mb-4 text-sm">
                            <span className="inline-flex items-center gap-1.5 text-muted-foreground"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
                            <span className="inline-flex items-center gap-1.5 text-muted-foreground"><Briefcase className="w-3.5 h-3.5" />{job.category}</span>
                            <span className="inline-flex items-center gap-1.5 text-muted-foreground"><Building2 className="w-3.5 h-3.5" />{job.company}</span>
                            <span className="inline-flex items-center gap-1.5 text-muted-foreground"><Clock className="w-3.5 h-3.5" />{job.type}</span>
                            {deadlineInfo && (
                              <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
                                deadlineInfo.status === "closed" ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
                                : deadlineInfo.status === "urgent" ? "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400"
                                : "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"}`}>
                                {deadlineInfo.status === "closed" ? <><AlertTriangle className="w-3 h-3" />Closed</>
                                : deadlineInfo.status === "urgent" ? <><AlertTriangle className="w-3 h-3" />{deadlineInfo.label}</>
                                : <><Calendar className="w-3 h-3" />Closes {deadlineInfo.label}</>}
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-3">
                            <button onClick={(e) => { e.stopPropagation(); setApplyJob(job); }}
                              className="px-5 py-2 text-sm font-semibold rounded-full bg-[#002040] text-white hover:bg-[#001826] transition-colors">Apply Now</button>
                            <button onClick={(e) => { e.stopPropagation(); setExpandedFullJob(job.id); }}
                              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#002040] dark:text-white hover:underline">See More<ChevronDown className="w-3.5 h-3.5" /></button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ─── FULL DETAILS MODE ─── */}
                    {isFullExpanded && (
                      <div className="border-t border-border">
                        <div className="px-5 sm:px-6 py-5">
                          {job.remote && (
                            <div className="flex items-start gap-3 mb-5 px-4 py-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                              <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                              <p className="text-sm text-amber-800 dark:text-amber-200">This is a remote role. You can work from anywhere in Tanzania with reliable internet access. Occasional travel to the {job.location} office may be required for team meetings and collaboration.</p>
                            </div>
                          )}
                          <p className="text-sm text-muted-foreground leading-relaxed mb-6">{job.description}</p>
                          <div className="space-y-6">
                            {/* Responsibilities */}
                            <div>
                              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                                <div className="w-6 h-6 rounded-md bg-[#002040]/10 dark:bg-white/10 flex items-center justify-center shrink-0"><ListChecks className="w-3.5 h-3.5 text-[#002040] dark:text-white" /></div>
                                Position Responsibilities
                              </h4>
                              <ul className="space-y-2 ml-8">
                                {job.responsibilities.map((r, i) => (
                                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#002040] dark:bg-white/60 mt-1.5 shrink-0" /><span>{r}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            {/* Qualifications */}
                            <div>
                              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                                <div className="w-6 h-6 rounded-md bg-[#002040]/10 dark:bg-white/10 flex items-center justify-center shrink-0"><GraduationCap className="w-3.5 h-3.5 text-[#002040] dark:text-white" /></div>
                                Qualifications
                              </h4>
                              <ul className="space-y-2 ml-8">
                                {job.qualifications.map((q, i) => (
                                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#002040] dark:bg-white/60 mt-1.5 shrink-0" /><span>{q}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            {/* Requirements */}
                            <div>
                              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                                <div className="w-6 h-6 rounded-md bg-[#002040]/10 dark:bg-white/10 flex items-center justify-center shrink-0"><ShieldCheck className="w-3.5 h-3.5 text-[#002040] dark:text-white" /></div>
                                Requirements
                              </h4>
                              <ul className="space-y-2 ml-8">
                                {job.requirements.map((r, i) => (
                                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#002040] dark:bg-white/60 mt-1.5 shrink-0" /><span>{r}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            {/* Benefits */}
                            <div>
                              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                                <div className="w-6 h-6 rounded-md bg-[#002040]/10 dark:bg-white/10 flex items-center justify-center shrink-0"><Heart className="w-3.5 h-3.5 text-[#002040] dark:text-white" /></div>
                                Benefits
                              </h4>
                              <ul className="space-y-2 ml-8">
                                {job.benefits.map((b, i) => (
                                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <Check className="w-3.5 h-3.5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" /><span>{b}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          {/* Deadline indicator */}
                          {deadlineInfo && (
                            <div className="mt-6 pt-4 border-t border-border/50">
                              <div className="flex items-center gap-2">
                                {deadlineInfo.status === "closed" ? (
                                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800"><AlertTriangle className="w-3.5 h-3.5" />Application closed</span>
                                ) : deadlineInfo.status === "urgent" ? (
                                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800"><AlertTriangle className="w-3.5 h-3.5" />Closes in {deadlineInfo.daysLeft} day{deadlineInfo.daysLeft !== 1 ? "s" : ""}</span>
                                ) : (
                                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800"><Calendar className="w-3.5 h-3.5" />Closes {deadlineInfo.label}</span>
                                )}
                              </div>
                            </div>
                          )}
                          {/* Action buttons */}
                          <div className="mt-4 flex flex-wrap items-center gap-3">
                            <button onClick={(e) => { e.stopPropagation(); setApplyJob(job); }}
                              className="px-5 py-2.5 text-sm font-semibold rounded-full bg-[#002040] text-white hover:bg-[#001826] transition-colors">Apply Now</button>
                            <button onClick={(e) => toggleSaveJob(job.id, e)}
                              className={`px-5 py-2.5 text-sm font-medium rounded-full border transition-colors ${
                                isSaved ? "border-[#002040]/30 bg-[#002040]/5 text-[#002040] dark:text-white" : "border-input text-foreground hover:border-[#002040]/30"}`}>
                              {isSaved ? <span className="flex items-center gap-1.5"><Bookmark className="w-3.5 h-3.5 fill-current" />Saved</span>
                                : <span className="flex items-center gap-1.5"><Bookmark className="w-3.5 h-3.5" />Save Job</span>}
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); navigator.share ? navigator.share({ title: `${job.title} at ${job.company}`, text: `Check out this role: ${job.title} at ${job.company} - JOTOFA GROUP`, url: window.location.href }).catch(() => {}) : navigator.clipboard.writeText(window.location.href); }}
                              className="px-5 py-2.5 text-sm font-medium rounded-full border border-input text-foreground hover:border-[#002040]/30 transition-colors">
                              <span className="flex items-center gap-1.5"><Share2 className="w-3.5 h-3.5" />Share</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* ═══ PAGINATION ═══ */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6 pt-4 border-t border-border">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Items per page:</span>
                <select value={pageSize} onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                  className="px-2 py-1 text-sm rounded border border-input bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-[#002040]/20">
                  {PAGE_SIZE_OPTIONS.map((size) => (<option key={size} value={size}>{size}</option>))}
                </select>
              </div>
              <span className="text-sm text-muted-foreground">{(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, filteredJobs.length)} of {filteredJobs.length}</span>
              <div className="flex items-center gap-1">
                <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}
                  className="p-2 rounded-lg hover:bg-secondary dark:hover:bg-[#002040]/50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"><ChevronLeft className="w-4 h-4 text-foreground" /></button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button key={page} onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 text-sm font-medium rounded-lg transition-colors ${currentPage === page ? "bg-[#002040] text-white" : "text-foreground hover:bg-secondary dark:hover:bg-[#002040]/50"}`}>{page}</button>
                ))}
                <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
                  className="p-2 rounded-lg hover:bg-secondary dark:hover:bg-[#002040]/50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"><ChevronRight className="w-4 h-4 text-foreground" /></button>
              </div>
            </div>
          </div>
        ) : (
          /* ── EMPTY STATE ── */
          <div className="bg-white dark:bg-[#0a1e30] rounded-2xl border border-border shadow-sm p-10 sm:p-16 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary dark:bg-[#002040] mb-5">
              <Briefcase className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">No positions found</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6 leading-relaxed">We couldn&apos;t find any positions matching your criteria. Try adjusting your filters or search terms.</p>
            <button onClick={() => { setSelectedCategory("All Categories"); setSelectedCompany("All Companies"); setKeyword(""); handleTabChange("all"); }}
              className="px-6 py-2.5 text-sm font-semibold rounded-full bg-[#002040] text-white hover:bg-[#001826] transition-colors">View All Positions</button>
          </div>
        )}
      </div>

      {/* ═══ 6. TALENT COMMUNITY ═══ */}
      <div id="talent-community" className="bg-[#002040]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-4">Join Our Talent Community</h2>
              <p className="text-white/70 leading-relaxed mb-8 text-sm sm:text-base">Stay connected with JOTOFA GROUP and be the first to know about new opportunities across our five subsidiaries. Whether you&apos;re an experienced professional or just starting your career, we want to hear from you.</p>
              <Link to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-full bg-white text-[#002040] hover:bg-white/90 transition-colors">
                Join Now<ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <img src="/images/jotofa-hero-3.webp" alt="JOTOFA GROUP team" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002040]/40 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* ═══ 7. APPLY MODAL ═══ */}
      {applyJob && <JobApplyModal job={applyJob} isOpen={!!applyJob} onClose={() => setApplyJob(null)} />}
    </section>
  );
}
```

---

## 8. Complete `src/components/job-apply-modal.tsx` (Modal)

```typescript
import { useState, useCallback } from "react";
import {
  X, MapPin, Briefcase, Building2, Clock, Upload, FileText,
  Check, AlertCircle, Calendar, AlertTriangle, Trash2, Plus,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { submitApplication } from "@/lib/api";

/* ── TYPES ── */
interface Job {
  id: string;
  backendId?: string;
  title: string;
  category: string;
  company: string;
  location: string;
  remote: boolean;
  type: string;
  deadline: string;
}

interface JobApplyModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
}

/* ── HELPERS ── */
function formatDeadline(deadline: string) {
  return new Date(deadline).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
function getDaysUntilDeadline(deadline: string): number {
  return Math.ceil((new Date(deadline).getTime() - Date.now()) / 86400000);
}

/* ── DEADLINE BADGE ── */
function DeadlineBadge({ deadline }: { deadline: string }) {
  const daysUntil = getDaysUntilDeadline(deadline);
  const isPassed = daysUntil < 0;
  const isSoon = daysUntil >= 0 && daysUntil <= 7;
  return (
    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
      isPassed ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800"
      : isSoon ? "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800"
      : "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800"}`}>
      {isPassed || isSoon ? <AlertTriangle className="w-3.5 h-3.5" /> : <Calendar className="w-3.5 h-3.5" />}
      <span>{isPassed ? "Deadline passed" : isSoon ? `Closes in ${daysUntil} day${daysUntil !== 1 ? "s" : ""}` : `Closes ${formatDeadline(deadline)}`}</span>
    </div>
  );
}

/* ── FILE UPLOAD FIELD ── */
function FileUploadField({ label, required, accept, file, onFileChange, onFileRemove, error, helperText, allowMultiple, files, onRemoveCertificate }: {
  label: string; required?: boolean; accept: string; file?: File | null;
  onFileChange?: (f: File) => void; onFileRemove?: () => void; error?: string; helperText: string;
  allowMultiple?: boolean; files?: File[]; onRemoveCertificate?: (index: number) => void;
}) {
  const displayFiles = allowMultiple && files ? files : file ? [file] : [];
  return (
    <div>
      {label && <label className="block text-xs font-medium text-foreground mb-1.5">{label} {required && <span className="text-red-500">*</span>}</label>}
      {displayFiles.length > 0 ? (
        <div className="space-y-2">
          {displayFiles.map((f, i) => (
            <div key={`file-${i}-${f.name}`} className="flex items-center gap-3 p-3 rounded-lg border-2 border-green-500/50 bg-green-50/50 dark:bg-green-900/10">
              <FileText className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0" />
              <div className="min-w-0 flex-1">
                <span className="text-sm font-medium text-foreground truncate block">{f.name}</span>
                <span className="text-xs text-muted-foreground">({(f.size / 1024).toFixed(0)} KB)</span>
              </div>
              <button type="button" onClick={() => { if (allowMultiple && onRemoveCertificate) onRemoveCertificate(i); else if (onFileRemove) onFileRemove(); }}
                className="w-6 h-6 rounded-full flex items-center justify-center text-muted-foreground hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20 transition-colors shrink-0"><X className="w-3.5 h-3.5" /></button>
            </div>
          ))}
          {allowMultiple && (
            <label className="flex items-center gap-2 p-2.5 rounded-lg border-2 border-dashed border-input cursor-pointer hover:bg-secondary/50 transition-colors">
              <Plus className="w-4 h-4 text-muted-foreground shrink-0" /><span className="text-xs text-muted-foreground">Add another file</span>
              <input type="file" accept={accept} className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) onFileChange?.(f); }} />
            </label>
          )}
        </div>
      ) : (
        <label className={`flex items-center gap-3 p-4 rounded-lg border-2 border-dashed cursor-pointer hover:bg-secondary/50 transition-colors ${error ? "border-red-500" : "border-input"}`}>
          <Upload className="w-5 h-5 text-muted-foreground shrink-0" /><span className="text-sm text-muted-foreground">{helperText}</span>
          <input type="file" accept={accept} className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) onFileChange?.(f); }} />
        </label>
      )}
      {error && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{error}</p>}
    </div>
  );
}

/* ── JOB SUMMARY SIDEBAR ── */
function JobSummarySidebar({ job }: { job: Job }) {
  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl bg-secondary/50 dark:bg-[#002040]/30 border border-border">
        <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">Position Summary</h4>
        <div className="space-y-3">
          <div className="flex items-start gap-2"><MapPin className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" /><div><span className="text-xs text-muted-foreground">Location</span><p className="text-sm font-medium text-foreground">{job.location}, Tanzania{job.remote && <span className="ml-1.5 text-xs text-green-600 dark:text-green-400 font-medium">(Remote)</span>}</p></div></div>
          <div className="flex items-start gap-2"><Briefcase className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" /><div><span className="text-xs text-muted-foreground">Category</span><p className="text-sm font-medium text-foreground">{job.category}</p></div></div>
          <div className="flex items-start gap-2"><Building2 className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" /><div><span className="text-xs text-muted-foreground">Company</span><p className="text-sm font-medium text-foreground">{job.company}</p></div></div>
          <div className="flex items-start gap-2"><Clock className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" /><div><span className="text-xs text-muted-foreground">Job Type</span><p className="text-sm font-medium text-foreground">{job.type}</p></div></div>
          {job.deadline && <div className="flex items-start gap-2"><Calendar className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" /><div><span className="text-xs text-muted-foreground">Deadline</span><p className="text-sm font-medium text-foreground">{formatDeadline(job.deadline)}</p></div></div>}
        </div>
      </div>
      {job.deadline && <DeadlineBadge deadline={job.deadline} />}
    </div>
  );
}

/* ── MOBILE JOB SUMMARY ── */
function MobileJobSummary({ job }: { job: Job }) {
  return (
    <div className="space-y-3 mb-5">
      <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 dark:bg-[#002040]/30 border border-border">
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-foreground truncate">{job.title}</h4>
          <p className="text-xs text-muted-foreground mt-0.5">{job.company} · {job.location}{job.remote && " · Remote"} · {job.type}</p>
        </div>
      </div>
      {job.deadline && <DeadlineBadge deadline={job.deadline} />}
    </div>
  );
}

/* ═════════════════════════════════════════════
   MAIN MODAL COMPONENT
   ═════════════════════════════════════════════ */
export function JobApplyModal({ job, isOpen, onClose }: JobApplyModalProps) {
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", phone: "", location: "", coverLetterText: "" });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null);
  const [certificateFiles, setCertificateFiles] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");
  const isDeadlinePassed = job.deadline ? getDaysUntilDeadline(job.deadline) < 0 : false;

  const validate = useCallback(() => {
    const e: Record<string, string> = {};
    if (!formData.firstName.trim()) e.firstName = "First name is required";
    if (!formData.lastName.trim()) e.lastName = "Last name is required";
    if (!formData.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Invalid email address";
    if (!formData.phone.trim()) e.phone = "Phone number is required";
    if (!cvFile) e.cv = "CV/Resume is required";
    if (isDeadlinePassed) e.deadline = "The application deadline has passed";
    setErrors(e);
    return Object.keys(e).length === 0;
  }, [formData, cvFile, isDeadlinePassed]);

  const handleSubmit = useCallback(async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true); setSubmitError("");
    try {
      const payload = new FormData();
      payload.append("job_id", job.backendId || job.id);
      payload.append("first_name", formData.firstName);
      payload.append("last_name", formData.lastName);
      payload.append("email", formData.email);
      payload.append("phone", formData.phone);
      if (cvFile) payload.append("resume", cvFile);
      if (coverLetterFile) payload.append("cover_letter", coverLetterFile);
      if (formData.coverLetterText.trim()) payload.append("cover_letter_text", formData.coverLetterText.trim());
      certificateFiles.forEach((f) => payload.append("certificates", f));
      await submitApplication(payload);
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Could not submit your application. Please try again.");
    } finally { setIsSubmitting(false); }
  }, [certificateFiles, coverLetterFile, cvFile, formData, job.backendId, job.id, validate]);

  const handleReset = useCallback(() => {
    setFormData({ firstName: "", lastName: "", email: "", phone: "", location: "", coverLetterText: "" });
    setCvFile(null); setCoverLetterFile(null); setCertificateFiles([]);
    setSubmitted(false); setSubmitError(""); setErrors({});
  }, []);

  const handleClose = useCallback(() => { onClose(); setTimeout(handleReset, 300); }, [onClose, handleReset]);
  const addCertificateFile = useCallback((f: File) => setCertificateFiles((p) => [...p, f]), []);
  const removeCertificateFile = useCallback((i: number) => setCertificateFiles((p) => p.filter((_, idx) => idx !== i)), []);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm" onClick={handleClose} />
          <motion.div initial={{ opacity: 0, y: 40, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[61] flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && handleClose()}>
            <div className="relative w-full max-w-2xl lg:max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-[#0a1e30] shadow-2xl border border-border">

              {/* Header */}
              <div className="sticky top-0 z-10 bg-white dark:bg-[#0a1e30] border-b border-border px-5 sm:px-6 py-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-foreground">{submitted ? "Application Submitted" : `Apply: ${job.title}`}</h2>
                  {!submitted && <p className="text-xs text-muted-foreground mt-0.5">Req ID: {job.id} · {job.company}</p>}
                </div>
                <button onClick={handleClose} className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:bg-secondary transition-colors"><X className="w-4 h-4" /></button>
              </div>

              {/* Content */}
              {submitted ? (
                <div className="p-8 sm:p-12 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 dark:bg-green-900/20 mb-5"><Check className="w-8 h-8 text-green-600 dark:text-green-400" /></div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Thank you for applying!</h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6 leading-relaxed">Your application for <strong>{job.title}</strong> at <strong>{job.company}</strong> has been received. Our HR team will review it and get back to you soon.</p>
                  <button onClick={handleClose} className="px-6 py-2.5 text-sm font-semibold rounded-full bg-[#002040] text-white hover:bg-[#001826] transition-colors">Browse More Jobs</button>
                </div>
              ) : (
                <div className="p-5 sm:p-6">
                  {/* Desktop 2-col */}
                  <div className="hidden lg:grid lg:grid-cols-[280px_1fr] gap-6">
                    <JobSummarySidebar job={job} />
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {submitError && <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800"><AlertCircle className="w-4 h-4 text-red-500 shrink-0" /><span className="text-sm text-red-600 dark:text-red-400">{submitError}</span></div>}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-foreground mb-1.5">First Name <span className="text-red-500">*</span></label>
                          <input type="text" autoComplete="given-name" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            className={`w-full px-3 py-2 rounded-lg border text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#002040]/20 focus:border-[#002040]/40 transition-all ${errors.firstName ? "border-red-500" : "border-input"}`} placeholder="John" />
                          {errors.firstName && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.firstName}</p>}
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-foreground mb-1.5">Last Name <span className="text-red-500">*</span></label>
                          <input type="text" autoComplete="family-name" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            className={`w-full px-3 py-2 rounded-lg border text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#002040]/20 focus:border-[#002040]/40 transition-all ${errors.lastName ? "border-red-500" : "border-input"}`} placeholder="Doe" />
                          {errors.lastName && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.lastName}</p>}
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-foreground mb-1.5">Email Address <span className="text-red-500">*</span></label>
                        <input type="email" autoComplete="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={`w-full px-3 py-2 rounded-lg border text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#002040]/20 focus:border-[#002040]/40 transition-all ${errors.email ? "border-red-500" : "border-input"}`} placeholder="john.doe@email.com" />
                        {errors.email && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-foreground mb-1.5">Phone Number <span className="text-red-500">*</span></label>
                        <input type="tel" autoComplete="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={`w-full px-3 py-2 rounded-lg border text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#002040]/20 focus:border-[#002040]/40 transition-all ${errors.phone ? "border-red-500" : "border-input"}`} placeholder="+255 7XX XXX XXX" />
                        {errors.phone && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.phone}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-foreground mb-1.5">Current Location</label>
                        <input type="text" autoComplete="address-level2" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-input text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#002040]/20 focus:border-[#002040]/40 transition-all" placeholder="Dar es Salaam, Tanzania" />
                      </div>
                      <FileUploadField label="CV / Resume" required accept=".pdf,.doc,.docx" file={cvFile} onFileChange={(f) => setCvFile(f)} onFileRemove={() => setCvFile(null)} error={errors.cv} helperText="Click to upload PDF, DOC, or DOCX (max 5MB)" />
                      <div>
                        <label className="block text-xs font-medium text-foreground mb-1.5">Cover Letter</label>
                        <div className="space-y-3">
                          <FileUploadField label="" accept=".pdf,.doc,.docx" file={coverLetterFile} onFileChange={(f) => setCoverLetterFile(f)} onFileRemove={() => setCoverLetterFile(null)} helperText="Upload cover letter (PDF, DOC, or DOCX, max 5MB)" />
                          <div className="flex items-center gap-3"><div className="flex-1 h-px bg-border" /><span className="text-xs text-muted-foreground font-medium">OR</span><div className="flex-1 h-px bg-border" /></div>
                          <textarea value={formData.coverLetterText} onChange={(e) => setFormData({ ...formData, coverLetterText: e.target.value })} rows={4}
                            className="w-full px-3 py-2 rounded-lg border border-input text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#002040]/20 focus:border-[#002040]/40 transition-all resize-none" placeholder="Type your cover letter here..." />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-foreground mb-1.5">Academic Certificates</label>
                        {certificateFiles.length > 0 ? (
                          <div className="space-y-2">
                            {certificateFiles.map((f, i) => (
                              <div key={`cert-${i}-${f.name}`} className="flex items-center gap-3 p-2.5 rounded-lg border border-green-200 dark:border-green-800 bg-green-50/30 dark:bg-green-900/5">
                                <FileText className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0" />
                                <div className="min-w-0 flex-1"><span className="text-sm font-medium text-foreground truncate block">{f.name}</span><span className="text-xs text-muted-foreground">({(f.size / 1024).toFixed(0)} KB)</span></div>
                                <button type="button" onClick={() => removeCertificateFile(i)} className="w-6 h-6 rounded-full flex items-center justify-center text-muted-foreground hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20 transition-colors shrink-0"><Trash2 className="w-3.5 h-3.5" /></button>
                              </div>
                            ))}
                            <label className="flex items-center gap-2 p-2.5 rounded-lg border-2 border-dashed border-input cursor-pointer hover:bg-secondary/50 transition-colors"><Plus className="w-4 h-4 text-muted-foreground shrink-0" /><span className="text-xs text-muted-foreground">Add another certificate</span><input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) addCertificateFile(f); }} /></label>
                          </div>
                        ) : (
                          <label className="flex items-center gap-3 p-4 rounded-lg border-2 border-dashed border-input cursor-pointer hover:bg-secondary/50 transition-colors"><Upload className="w-5 h-5 text-muted-foreground shrink-0" /><span className="text-sm text-muted-foreground">Upload academic certificates (PDF, DOC, DOCX, JPG, PNG, max 5MB each)</span><input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) addCertificateFile(f); }} /></label>
                        )}
                      </div>
                      {errors.deadline && <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800"><AlertTriangle className="w-4 h-4 text-red-500 shrink-0" /><span className="text-sm text-red-600 dark:text-red-400">{errors.deadline}</span></div>}
                      <div className="flex items-center gap-3 pt-2">
                        <button type="submit" disabled={isSubmitting || isDeadlinePassed}
                          className="flex-1 py-3 text-sm font-semibold rounded-full bg-[#002040] text-white hover:bg-[#001826] transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
                          {isSubmitting ? "Submitting..." : isDeadlinePassed ? "Deadline Passed" : "Submit Application"}
                        </button>
                        <button type="button" onClick={handleClose} className="px-6 py-3 text-sm font-medium rounded-full border border-input text-foreground hover:bg-secondary transition-colors">Cancel</button>
                      </div>
                    </form>
                  </div>

                  {/* Mobile single-col (abbreviated — uses same form fields, no sidebar) */}
                  <div className="lg:hidden">
                    <MobileJobSummary job={job} />
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {submitError && <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800"><AlertCircle className="w-4 h-4 text-red-500 shrink-0" /><span className="text-xs text-red-600 dark:text-red-400">{submitError}</span></div>}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-foreground mb-1">First Name <span className="text-red-500">*</span></label>
                          <input type="text" autoComplete="given-name" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            className={`w-full px-3 py-2.5 rounded-lg border text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#002040]/20 transition-all ${errors.firstName ? "border-red-500" : "border-input"}`} placeholder="John" />
                          {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-foreground mb-1">Last Name <span className="text-red-500">*</span></label>
                          <input type="text" autoComplete="family-name" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            className={`w-full px-3 py-2.5 rounded-lg border text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#002040]/20 transition-all ${errors.lastName ? "border-red-500" : "border-input"}`} placeholder="Doe" />
                          {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-foreground mb-1">Email <span className="text-red-500">*</span></label>
                        <input type="email" autoComplete="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={`w-full px-3 py-2.5 rounded-lg border text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#002040]/20 transition-all ${errors.email ? "border-red-500" : "border-input"}`} placeholder="john@email.com" />
                        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-foreground mb-1">Phone <span className="text-red-500">*</span></label>
                        <input type="tel" autoComplete="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={`w-full px-3 py-2.5 rounded-lg border text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#002040]/20 transition-all ${errors.phone ? "border-red-500" : "border-input"}`} placeholder="+255 7XX XXX XXX" />
                        {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                      </div>
                      <FileUploadField label="CV / Resume" required accept=".pdf,.doc,.docx" file={cvFile} onFileChange={(f) => setCvFile(f)} onFileRemove={() => setCvFile(null)} error={errors.cv} helperText="Upload PDF/DOC (max 5MB)" />
                      <div>
                        <label className="block text-xs font-medium text-foreground mb-1">Cover Letter</label>
                        <div className="space-y-3">
                          <FileUploadField label="" accept=".pdf,.doc,.docx" file={coverLetterFile} onFileChange={(f) => setCoverLetterFile(f)} onFileRemove={() => setCoverLetterFile(null)} helperText="Upload cover letter (PDF, DOC, DOCX)" />
                          <div className="flex items-center gap-3"><div className="flex-1 h-px bg-border" /><span className="text-xs text-muted-foreground font-medium">OR</span><div className="flex-1 h-px bg-border" /></div>
                          <textarea value={formData.coverLetterText} onChange={(e) => setFormData({ ...formData, coverLetterText: e.target.value })} rows={3}
                            className="w-full px-3 py-2.5 rounded-lg border border-input text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#002040]/20 transition-all resize-none" placeholder="Type your cover letter here..." />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-foreground mb-1">Academic Certificates</label>
                        {certificateFiles.length > 0 ? (
                          <div className="space-y-2">
                            {certificateFiles.map((f, i) => (
                              <div key={`cert-m-${i}-${f.name}`} className="flex items-center gap-2 p-2 rounded-lg border border-green-200 dark:border-green-800 bg-green-50/30 dark:bg-green-900/5">
                                <FileText className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0" />
                                <div className="min-w-0 flex-1"><span className="text-xs font-medium text-foreground truncate block">{f.name}</span></div>
                                <button type="button" onClick={() => removeCertificateFile(i)} className="w-5 h-5 rounded-full flex items-center justify-center text-muted-foreground hover:text-red-500 transition-colors shrink-0"><X className="w-3 h-3" /></button>
                              </div>
                            ))}
                            <label className="flex items-center gap-2 p-2 rounded-lg border-2 border-dashed border-input cursor-pointer hover:bg-secondary/50 transition-colors"><Plus className="w-3.5 h-3.5 text-muted-foreground shrink-0" /><span className="text-xs text-muted-foreground">Add more</span><input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) addCertificateFile(f); }} /></label>
                          </div>
                        ) : (
                          <label className="flex items-center gap-2 p-3 rounded-lg border-2 border-dashed border-input cursor-pointer hover:bg-secondary/50 transition-colors"><Upload className="w-4 h-4 text-muted-foreground shrink-0" /><span className="text-xs text-muted-foreground">Upload certificates (PDF, DOCX, JPG, PNG)</span><input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) addCertificateFile(f); }} /></label>
                        )}
                      </div>
                      {errors.deadline && <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800"><AlertTriangle className="w-4 h-4 text-red-500 shrink-0" /><span className="text-xs text-red-600 dark:text-red-400">{errors.deadline}</span></div>}
                      <button type="submit" disabled={isSubmitting || isDeadlinePassed}
                        className="w-full py-3 text-sm font-semibold rounded-full bg-[#002040] text-white hover:bg-[#001826] transition-colors disabled:opacity-60">
                        {isSubmitting ? "Submitting..." : isDeadlinePassed ? "Deadline Passed" : "Submit Application"}
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

---

## 9. Layout Diagram

```
┌──────────────────────────────────────────────────────────────┐
│  NAVBAR (fixed, glass effect, pt-16 offset)                  │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  1. HERO BANNER (max-w-6xl, rounded-2xl)                     │
│  ┌──────────────────────────────────────────────────────────┐│
│  │ [bg image + navy gradient overlay]                       ││
│  │ ┌────┐  Company Name                                     ││
│  │ │Logo│  Tagline                                          ││
│  │ └────┘  👥 1,200+ Employees · 5 Subsidiaries · Tanzania  ││
│  │                              [About Company →]           ││
│  └──────────────────────────────────────────────────────────┘│
│                                                              │
│  2. SUB NAV TABS (bg-white, border-b, scrollable on mobile)  │
│  ┌──────────────────────────────────────────────────────────┐│
│  │ JOTOFA Group │ UTEC │ Courier │ Cleaning │ Security │ ... ││
│  │ ▔▔▔▔▔▔▔▔▔▔▔                                              ││
│  └──────────────────────────────────────────────────────────┘│
│                                                              │
│  3. SEARCH CARD (max-w-5xl, rounded-xl, shadow-sm)          │
│  ┌──────────────────────────────────────────────────────────┐│
│  │ [🔍 Search keywords...] [Category ▼] [Find Jobs]         ││
│  └──────────────────────────────────────────────────────────┘│
│                                                              │
│  4. FILTER BAR                                               │
│  ┌──────────────────────────────────────────────────────────┐│
│  │ [Filters] [💼 Categories ▼] [🌐 Company ▼] [✕ Clear]    ││
│  └──────────────────────────────────────────────────────────┘│
│                                                              │
│  5. JOB LISTINGS (max-w-5xl)                                 │
│  ┌──────────────────────────────────────────────────────────┐│
│  │ 8 Positions Found                                        ││
│  │ ┌──────────────────────────────────────────────────────┐ ││
│  │ │ ▶ Network Engineer              DAR | IT | UTEC      │ ││
│  │ │   Req ID: JTG-001                       [Apply Now] │ ││
│  │ ├──────────────────────────────────────────────────────┤ ││
│  │ │ ▼ Network Engineer  ← EXPANDED (preview)             │ ││
│  │ │   Description (2-line clamp)...                      │ ││
│  │ │   📍DAR · 💼IT · 🏢UTEC · 🕐Full-time · 📅15 Jun    │ ││
│  │ │   [Apply Now] [See More ▼]                           │ ││
│  │ ├──────────────────────────────────────────────────────┤ ││
│  │ │ ▼ Network Engineer  ← FULL DETAILS                   │ ││
│  │ │   ⚠️ Remote info banner (amber)                      │ ││
│  │ │   Full description...                                │ ││
│  │ │   📋 Responsibilities  🎓 Qualifications             │ ││
│  │ │   🛡️ Requirements     ❤️ Benefits (green ✓)         │ ││
│  │ │   ───────────────────────────────                    │ ││
│  │ │   📅 Closes 15 June 2026                             │ ││
│  │ │   [Apply Now] [Save Job] [Share]                     │ ││
│  │ └──────────────────────────────────────────────────────┘ ││
│  │ ... more jobs ...                                        ││
│  │ ───────────────────────────────────────────────────────  ││
│  │ [10▼ per page]      1-8 of 8      [◀ 1 ▶]              ││
│  └──────────────────────────────────────────────────────────┘│
│                                                              │
│  6. TALENT COMMUNITY (full-width bg-[#002040])               │
│  ┌──────────────────────────────────────────────────────────┐│
│  │ "Join Our Talent Community"         ┌──────────────────┐ ││
│  │ Description text...                 │ Team image       │ ││
│  │ [Join Now →] (white button)         │                  │ ││
│  │                                     └──────────────────┘ ││
│  └──────────────────────────────────────────────────────────┘│
│                                                              │
│  7. APPLY MODAL (overlay, triggered by [Apply Now])          │
│  ┌──────────────────────────────────────────────────────────┐│
│  │ Apply: Network Engineer                            [✕]   ││
│  │ Req ID: JTG-001 · UTEC Solutions                        ││
│  ├──────────────────────┬───────────────────────────────────┤│
│  │ FORM (2-col desktop) │ SIDEBAR: Position Summary         ││
│  │ First* Last*         │ 📍 Location · 💼 Category         ││
│  │ Email*  Phone*       │ 🏢 Company  · 🕐 Type             ││
│  │ Location             │ 📅 Deadline · [Deadline Badge]    ││
│  │ CV/Resume* [upload]  │                                   ││
│  │ Cover Letter [up/OR] │                                   ││
│  │ Certs [upload multi] │                                   ││
│  │ [Submit] [Cancel]    │                                   ││
│  └──────────────────────┴───────────────────────────────────┘│
│                                                              │
├──────────────────────────────────────────────────────────────┤
│  FOOTER                                                      │
│  WHATSAPP BUTTON (fixed, bottom-right)                       │
└──────────────────────────────────────────────────────────────┘
```

---

## 10. Styling Quick Reference

| Element | Key Classes |
|---|---|
| **Hero banner** | `h-[180px] sm:h-[220px] rounded-2xl overflow-hidden` |
| **Hero overlay** | `bg-gradient-to-r from-[#002040]/90 via-[#002040]/75 to-[#002040]/50` |
| **Logo container** | `w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20` |
| **Logo image** | `brightness-0 invert` (makes any logo white) |
| **Sub-nav bar** | `bg-white dark:bg-[#0a1e30] border-b border-border` |
| **Active tab indicator** | `absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-[#002040] dark:bg-white` |
| **Search card** | `bg-white dark:bg-[#0a1e30] rounded-xl shadow-sm p-5 sm:p-6 border border-border` |
| **Search input** | `rounded-full border border-input` |
| **All buttons (primary)** | `rounded-full bg-[#002040] text-white hover:bg-[#001826]` |
| **Filter pills** | `rounded-full border border-input bg-background hover:border-[#002040]/30` |
| **Dropdown menus** | `absolute top-full left-0 mt-1 bg-white dark:bg-[#0a1e30] rounded-lg shadow-lg border border-border z-50 max-h-60 overflow-y-auto` |
| **Job list container** | `bg-white dark:bg-[#0a1e30] rounded-lg border border-border shadow-sm overflow-hidden` |
| **Job row** | `px-5 sm:px-6 py-4 cursor-pointer hover:bg-muted/30 dark:hover:bg-[#002040]/20` |
| **Job title** | `text-[15px] font-semibold text-[#002040] dark:text-white` |
| **Badge (remote)** | `rounded-full bg-[#002040]/10 dark:bg-[#002040]/30 text-[#002040] dark:text-white` |
| **Badge (closed)** | `rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200` |
| **Badge (urgent)** | `rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-200` |
| **Badge (open deadline)** | `rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200` |
| **Section icon box** | `w-6 h-6 rounded-md bg-[#002040]/10 dark:bg-white/10 flex items-center justify-center` |
| **Bullet dot** | `w-1.5 h-1.5 rounded-full bg-[#002040] dark:bg-white/60` |
| **Benefits checkmark** | `text-green-600 dark:text-green-400` (green, not navy) |
| **Pagination active** | `bg-[#002040] text-white` |
| **Pagination inactive** | `text-foreground hover:bg-secondary dark:hover:bg-[#002040]/50` |
| **Talent community** | `bg-[#002040]` (full width navy) |
| **Talent community btn** | `rounded-full bg-white text-[#002040] hover:bg-white/90` |
| **Loading spinner** | `animate-spin rounded-full border-4 border-[#002040]/20 border-t-[#002040]` |
| **Empty state icon** | `w-16 h-16 rounded-full bg-secondary dark:bg-[#002040]` |
| **Error icon** | `w-16 h-16 rounded-full bg-red-50 dark:bg-red-900/20` |
| **Modal backdrop** | `fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm` |
| **Modal container** | `rounded-2xl bg-white dark:bg-[#0a1e30] shadow-2xl border border-border max-h-[90vh] overflow-y-auto` |
| **Modal header** | `sticky top-0 z-10 bg-white dark:bg-[#0a1e30] border-b border-border` |
| **Form input** | `rounded-lg border text-sm bg-background focus:ring-2 focus:ring-[#002040]/20 focus:border-[#002040]/40` |
| **File upload zone** | `rounded-lg border-2 border-dashed border-input cursor-pointer hover:bg-secondary/50` |
| **File uploaded** | `rounded-lg border-2 border-green-500/50 bg-green-50/50 dark:bg-green-900/10` |
| **Success check** | `w-16 h-16 rounded-full bg-green-50 dark:bg-green-900/20` |

---

## 11. Required Image Assets

Place these in `public/images/`:

```
public/images/
├── jotofa-hero-1.webp      # JOTOFA Group hero
├── jotofa-hero-2.webp      # UTEC hero
├── jotofa-hero-3.webp      # Courier / talent community
├── jotofa-logo.webp        # JOTOFA logo
├── utec.webp               # UTEC logo
├── courier.webp            # Courier logo
├── cleaning.webp           # Cleaning logo
├── security.webp           # Security logo
├── staffing.webp           # Staffing logo
```

---

## 12. Step-by-Step Migration

1. **Scaffold:** `npm create vite@latest my-project -- --template react-ts`
2. **Install deps:** `npm install react-router-dom react-helmet-async lucide-react framer-motion && npm install -D tailwindcss @tailwindcss/vite tw-animate-css`
3. **Vite config:** Copy `vite.config.ts` from Section 1.3
4. **CSS:** Copy `src/globals.css` from Section 2 — entire file
5. **Font:** Add Inter Google Fonts link to `index.html` `<head>`
6. **API:** Copy `src/lib/api.ts` from Section 3 — change `NEXT_PUBLIC_` → `VITE_`
7. **Router:** Copy `src/App.tsx` from Section 4
8. **Entry:** Copy `src/main.tsx` from Section 5
9. **Page wrapper:** Copy `src/pages/CareersPage.tsx` from Section 6
10. **Main component:** Copy `src/components/careers.tsx` from Section 7
11. **Modal:** Copy `src/components/job-apply-modal.tsx` from Section 8
12. **Navbar/Footer/WhatsApp:** Copy those components from the original project (or the transfer guide)
13. **Images:** Copy all images from Section 11 to `public/images/`
14. **Run:** `npm run dev` → visit `http://localhost:5173/careers`

---

*End of Careers Page Complete Source & Design*
