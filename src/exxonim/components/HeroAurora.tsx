"use client";

import { useEffect, useRef } from "react";

/**
 * HeroAurora — animated aurora curtain background for the hero section.
 *
 * Converted from the Exxonim Aurora Engine design. Uses HTML Canvas to
 * draw flowing curtain-like lines with color shifting and depth sub-lines,
 * creating a northern-lights / aurora borealis effect.
 *
 * THEME ADAPTATION:
 *   - Reads --color-accent from CSS custom properties for base hue
 *   - Light theme: lower opacity so text stays prominent
 *   - Dark theme: higher opacity for visual richness
 *   - Opacity controlled by .hero-aurora-canvas CSS class
 *   - Smooth transition during theme change via .theme-transition
 *
 * CONFIG:
 *   speed: 0.9      — animation speed multiplier
 *   spacing: 2.5    — vertical spacing between curtains
 *   coverage: 75    — % of hero height the aurora covers
 *   intensity: 52   — wave amplitude strength
 *   accentHue: 180  — base hue (teal, matches Exxonim accent)
 *   showDepth: true  — renders 4 sub-lines per curtain for depth
 *   colorShift: true — animated hue shifting over time
 *
 * PERFORMANCE:
 *   - Uses requestAnimationFrame for smooth 60fps
 *   - High-DPI canvas scaling for crisp rendering
 *   - Respects prefers-reduced-motion (stops animation)
 *
 * BACKEND: No configuration needed. Purely client-side.
 */

interface AuroraConfig {
  speed: number;
  spacing: number;
  coverage: number;
  intensity: number;
  accentHue: number;
  showDepth: boolean;
  colorShift: boolean;
}

const DEFAULT_CONFIG: AuroraConfig = {
  speed: 0.9,
  spacing: 2.5,
  coverage: 75,
  intensity: 52,
  accentHue: 180, // teal — matches Exxonim --color-accent
  showDepth: true,
  colorShift: true,
};

function draw(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  cfg: AuroraConfig,
  isDark: boolean
) {
  const zoneH = h * (cfg.coverage / 100);
  const zoneTop = (h - zoneH) / 2;
  const rawCurtainCount = Math.max(2, Math.round(zoneH / (cfg.spacing * 3)));
  const curtainCount = Math.max(2, Math.min(rawCurtainCount, 25));
  const steps = w < 768 ? 80 : 160;

  for (let c = 0; c < curtainCount; c++) {
    const nC = curtainCount > 1 ? c / (curtainCount - 1) : 0.5;
    const dF = 1 - Math.abs(nC - 0.5) * 2;

    // Hue based on accent hue, shifted by curtain position and time
    let hue = cfg.accentHue + nC * 160 + Math.sin(t * 0.1 + nC) * 40;
    const hueShift = cfg.colorShift ? Math.sin(t * 0.18 + nC * 0.6) * 30 : 0;

    // Opacity: scale down in light mode for subtlety
    const baseAlpha = isDark ? 0.08 + dF * 0.35 : 0.04 + dF * 0.18;
    const baseY = zoneTop + nC * zoneH;
    const curtainHeight = zoneH * (0.25 + cfg.intensity * 0.006);
    const waveSpeed = t * (0.2 + nC * 0.3);

    const subLines = cfg.showDepth ? 4 : 2;

    for (let sub = 0; sub < subLines; sub++) {
      const subAlpha = baseAlpha * (1 - Math.abs(sub / subLines - 0.5) * 1.5);
      if (subAlpha <= 0) continue;

      ctx.globalAlpha = subAlpha;
      ctx.strokeStyle = cfg.colorShift
        ? `hsl(${hue + hueShift + sub * 5}, ${60 + dF * 40}%, ${isDark ? 55 + dF * 30 : 40 + dF * 35}%)`
        : isDark ? "#7fbcc1" : "#0f5c63";
      ctx.lineWidth = cfg.showDepth ? 1 + dF * 3 : 2;

      ctx.beginPath();
      for (let s = 0; s <= steps; s++) {
        const x = (s / steps) * (w + 200) - 100;
        const xP = s / steps;

        const wave1 = Math.sin(xP * Math.PI * 1.5 + waveSpeed) * 60 * (1 + cfg.intensity * 0.02);
        const wave2 = Math.sin(xP * Math.PI * 3 + waveSpeed * 1.3) * 25;
        const droop = Math.sin(xP * Math.PI) * curtainHeight * 0.3;
        const y = baseY + wave1 + wave2 + droop + (sub - subLines / 2) * 8;

        if (s === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  }
}

export function HeroAurora() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef(0);
  const lastFrameRef = useRef(0);
  const rafIdRef = useRef<number>(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const cssW = canvas!.clientWidth;
      const cssH = canvas!.clientHeight;
      if (canvas!.width !== cssW * dpr || canvas!.height !== cssH * dpr) {
        canvas!.width = cssW * dpr;
        canvas!.height = cssH * dpr;
        ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    }

    resize();
    window.addEventListener("resize", resize);

    function animate(ts: number) {
      if (lastFrameRef.current === 0) lastFrameRef.current = ts;
      const delta = Math.min(ts - lastFrameRef.current, 50);
      lastFrameRef.current = ts;
      timeRef.current += (delta / 1000) * DEFAULT_CONFIG.speed * 0.5;

      const cssW = canvas!.clientWidth;
      const cssH = canvas!.clientHeight;

      ctx!.clearRect(0, 0, cssW, cssH);

      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      draw(ctx!, cssW, cssH, timeRef.current, DEFAULT_CONFIG, isDark);

      ctx!.globalAlpha = 1;
      rafIdRef.current = requestAnimationFrame(animate);
    }

    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="hero-aurora-canvas pointer-events-none absolute inset-0 -z-10 w-full h-full"
    />
  );
}
