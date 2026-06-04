"use client";

import type { ProviderSectionContent } from "@/lib/exxonim-types";
import { cn } from "@/lib/cn";
import { Container } from "@/components/exxonim/Container";
import { routes } from "@/lib/exxonim-router";
import { useState, useCallback } from "react";

interface ProviderSectionProps {
  content: ProviderSectionContent;
}

function resolveLogoSrc(src: string) {
  if (!src || !src.trim()) return "/placeholder.svg";
  if (/^(https?:)?\/\//i.test(src)) return src;
  if (/^(data|blob):/i.test(src)) return src;
  return src;
}

export function ProviderSection({ content }: ProviderSectionProps) {
  const { kicker, title, logos } = content;

  // Repeat logos 4x for seamless marquee loop
  const repeatedLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <section className="relative py-16 lg:py-24 bg-page">
      <Container className="mb-10 text-center">
        {/* Kicker badge */}
        <span className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-surface-soft px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-accent mb-4">
          {kicker}
        </span>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-text max-w-xl mx-auto">
          {title}
        </h2>
      </Container>

      {/* Full-width marquee strip */}
      <div className="overflow-hidden relative w-screen -ml-[50vw] left-1/2 py-4 bg-page [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex items-center gap-[clamp(1.6rem,3vw,2.6rem)] w-max animate-provider-marquee hover:[animation-play-state:paused]">
          {repeatedLogos.map((logo, i) => (
            <LogoItem key={`${logo.alt}-${i}`} logo={logo} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LogoItem({ logo }: { logo: { alt: string; src: string } }) {
  const [hasError, setHasError] = useState(false);

  const handleError = useCallback(() => {
    setHasError(true);
  }, []);

  const src = hasError ? "/placeholder.svg" : resolveLogoSrc(logo.src);

  return (
    <div className="flex h-14 w-32 shrink-0 items-center justify-center rounded-xl border border-border-soft bg-surface px-4 py-2">
      <img
        src={src}
        alt={logo.alt}
        onError={handleError}
        className="max-h-8 max-w-full object-contain"
        loading="lazy"
      />
    </div>
  );
}
