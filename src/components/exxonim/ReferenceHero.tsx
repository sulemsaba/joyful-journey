"use client";

import type { HomeHeroContent } from "@/lib/exxonim-types";
import { cn } from "@/lib/cn";
import { Container } from "@/components/exxonim/Container";
import { routes } from "@/lib/exxonim-router";
import { Phone, ArrowRight, Star } from "lucide-react";

interface ReferenceHeroProps {
  content: HomeHeroContent;
}

/**
 * Splits a title string into phrases for visual impact.
 * E.g. "Your Trusted Business Partner in Tanzania"
 *   → ["Your Trusted", "Business Partner", "in Tanzania"]
 */
function splitIntoPhrases(title: string): string[] {
  const words = title.split(/\s+/).filter(Boolean);
  if (words.length <= 3) return [title];

  const third = Math.ceil(words.length / 3);
  const phrases: string[] = [];
  for (let i = 0; i < words.length; i += third) {
    phrases.push(words.slice(i, i + third).join(" "));
  }
  return phrases;
}

export function ReferenceHero({ content }: ReferenceHeroProps) {
  const { eyebrow, title, description, cta, highlights } = content;
  const phrases = splitIntoPhrases(title);

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden pt-[calc(var(--header-height,70px)+1rem)]",
        "bg-[radial-gradient(120%_80%_at_15%_20%,var(--color-accent-soft-strong),transparent_55%),radial-gradient(90%_70%_at_85%_90%,var(--color-accent-soft),transparent_60%),radial-gradient(60%_50%_at_50%_50%,var(--color-accent-soft),transparent_70%)]"
      )}
    >
      {/* Animated page entrance wrapper */}
      <div className="animate-page-enter">
        <Container className="relative z-10 pb-16 pt-8 lg:pb-24 lg:pt-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_minmax(0,1fr)] lg:gap-16 items-center">
            {/* ── Left column: text content ── */}
            <div className="flex flex-col gap-6">
              {/* Eyebrow */}
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-accent">
                <span className="inline-block h-px w-5 bg-accent" />
                {eyebrow}
              </span>

              {/* Title — split into phrases for visual rhythm; middle phrase gets gradient */}
              <h1 className="text-[clamp(2.8rem,6vw,5.5rem)] font-semibold leading-[0.98] tracking-tight text-text">
                {phrases.map((phrase, i) => (
                  <span key={i} className="block">
                    {i === 1 && phrases.length >= 3 ? (
                      <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
                        {phrase}
                      </span>
                    ) : (
                      phrase
                    )}
                  </span>
                ))}
              </h1>

              {/* Description */}
              <p className="max-w-lg text-base leading-relaxed text-text-muted">
                {description}
              </p>

              {/* CTA button with animated glow ring */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href={cta.href}
                  className={cn(
                    "group relative inline-flex h-14 items-center justify-center rounded-full bg-accent px-8 text-sm font-extrabold tracking-wide text-accent-contrast shadow-accent-glow transition-all hover:-translate-y-0.5 hover:bg-accent-hover",
                    "animate-accent-pulse"
                  )}
                >
                  {cta.label}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>

              {/* Get started callout card with left accent border */}
              <div className="mt-2 flex items-center gap-4 rounded-2xl border border-border-soft border-l-4 border-l-accent bg-surface-soft p-4 shadow-card max-w-md">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-accent-contrast">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text">
                    Need immediate assistance?
                  </p>
                  <p className="text-xs text-text-muted">
                    Call us or book a free consultation today.
                  </p>
                </div>
              </div>

              {/* Trust strip with top border separator and larger stats */}
              {highlights && highlights.length > 0 && (
                <div className="mt-4 flex flex-wrap items-center gap-6 pt-4 border-t border-border-soft">
                  {highlights.map((h, i) => (
                    <div key={i} className="flex flex-col items-start gap-0.5">
                      <span className="text-2xl font-bold text-text">
                        {h.title}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-text-muted">
                        <Star className="h-3 w-3 fill-accent text-accent" />
                        {h.detail}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ── Right column: hero image with floating chips ── */}
            <div className="relative flex items-center justify-center">
              <div className="relative w-full max-w-md lg:max-w-none group">
                {/* Hero image with decorative frame and soft glow */}
                <div className="relative overflow-hidden rounded-3xl shadow-hero ring-1 ring-accent/10 before:absolute before:inset-0 before:rounded-3xl before:shadow-[inset_0_0_30px_rgba(15,92,99,0.08)] before:z-10 before:pointer-events-none">
                  <img
                    src="/hero-person.jpg"
                    alt="Exxonim business consultant"
                    className="h-auto w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  />
                </div>

                {/* Floating highlight chips with bobbing animation */}
                {highlights && highlights.length > 0 && (
                  <>
                    <div className="absolute -left-4 top-1/4 rounded-2xl border border-border-soft bg-surface px-4 py-3 shadow-card animate-float-bob">
                      <p className="text-lg font-bold text-accent">
                        {highlights[0].title}
                      </p>
                      <p className="text-xs text-text-muted">
                        {highlights[0].detail}
                      </p>
                    </div>

                    {highlights.length > 1 && (
                      <div className="absolute -right-2 bottom-1/4 rounded-2xl border border-border-soft bg-surface px-4 py-3 shadow-card animate-float-bob-delayed">
                        <p className="text-lg font-bold text-accent">
                          {highlights[1].title}
                        </p>
                        <p className="text-xs text-text-muted">
                          {highlights[1].detail}
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
