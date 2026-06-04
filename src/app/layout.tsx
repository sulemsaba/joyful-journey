import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

/* ── Font loading via next/font ──────────────────────
 * Preloads Geist Sans + Mono at build time, eliminates
 * FOIT/FOUT and improves LCP. CSS variables are set on
 * the <body> element so Tailwind can reference them.
 */
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Business Registration & Compliance Tanzania | Exxonim Consult",
  description:
    "Exxonim Consult helps organizations move through registration, licensing, and regulatory follow-through with a clearer process and fewer avoidable delays.",
  keywords: [
    "Exxonim Consult",
    "business advisory",
    "Tanzania",
    "company registration",
    "compliance",
    "licensing",
    "tax support",
  ],
  authors: [{ name: "Exxonim Consult" }],
  openGraph: {
    title: "Business Registration & Compliance Tanzania | Exxonim Consult",
    description:
      "Registration, licensing, and practical compliance support for businesses, NGOs, and institutions.",
    type: "website",
    siteName: "Exxonim Consult",
    url: "https://exxonim.tz",
  },
  twitter: {
    card: "summary_large_image",
    site: "@exxonim",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        {/* Blocking script: read saved theme from localStorage and set data-theme
            BEFORE first paint, preventing a flash of the wrong theme. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('exxonim-theme')||localStorage.getItem('koro-theme');if(t==='light'||t==='dark'){document.documentElement.dataset.theme=t}}catch(e){}})()`,
          }}
        />
        {/* Preload hero background image for LCP — WebP format (65% smaller than PNG) */}
        <link
          rel="preload"
          as="image"
          href="/hero-bg.webp"
          fetchPriority="high"
        />
        {/* Appearance-aware favicons: browser picks the right one based on OS preference.
            JS in useTheme also swaps these when the user toggles the theme manually. */}
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/branding/exxonim-favicon-light.png"
          id="favicon-light"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/branding/exxonim-favicon-dark.png"
          media="(prefers-color-scheme: dark)"
          id="favicon-dark"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-page text-text font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
