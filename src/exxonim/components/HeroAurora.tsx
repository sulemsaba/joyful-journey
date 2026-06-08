
import { useEffect, useRef } from "react";

/**
 * HeroAurora — animated aurora curtain background for the hero section.
 *
 * Converted from the Exxonim Aurora Engine design. Uses HTML Canvas to
 * draw flowing curtain-like lines with depth sub-lines, creating a
 * northern-lights / aurora borealis effect.
 *
 * BRAND COLORS:
 *   - Lines use the Exxonim brand accent color read from
 *     CSS custom property --color-accent at runtime.
 *   - Light mode: #0f5c63 (deep teal) — lines are subtle, text prominent
 *   - Dark mode: #7fbcc1 (bright teal) — lines are vivid, rich visual
 *   - Depth variation: slight opacity/lightness shifts per sub-line
 *     create a layered look while staying on-brand.
 *
 * THEME ADAPTATION:
 *   - Opacity controlled by .hero-aurora-canvas CSS class
 *   - Smooth transition during theme change via .theme-transition
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
  showDepth: boolean;
}

const DEFAULT_CONFIG: AuroraConfig = {
  speed: 0.9,
  spacing: 2.5,
  coverage: 75,
  intensity: 52,
  showDepth: true,
};

/**
 * Parse a CSS color string into an rgba() string with a given alpha.
 * Handles hex (#0f5c63) and rgb/rgba() formats.
 * Returns the original color with the new alpha if parsing fails.
 */
function withAlpha(color: string, alpha: number): string {
  const trimmed = color.trim();

  // Handle hex: #rgb, #rrggbb, #rrggbbaa
  const hexMatch = trimmed.match(/^#([0-9a-f]{3,8})$/i);
  if (hexMatch) {
    const hex = hexMatch[1];
    let r: number, g: number, b: number;
    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else if (hex.length >= 6) {
      r = parseInt(hex.slice(0, 2), 16);
      g = parseInt(hex.slice(2, 4), 16);
      b = parseInt(hex.slice(4, 6), 16);
    } else {
      return trimmed;
    }
    return `rgba(${r},${g},${b},${alpha})`;
  }

  // Handle rgba()
  const rgbaMatch = trimmed.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (rgbaMatch) {
    return `rgba(${rgbaMatch[1]},${rgbaMatch[2]},${rgbaMatch[3]},${alpha})`;
  }

  return trimmed;
}

function draw(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  cfg: AuroraConfig,
  accentColor: string,
  isDark: boolean
) {
  const zoneH = h * (cfg.coverage / 100);
  const zoneTop = (h - zoneH) / 2;
  const rawCurtainCount = Math.max(2, Math.round(zoneH / (cfg.spacing * 3)));
  const curtainCount = Math.max(2, Math.min(rawCurtainCount, 25));
  const steps = w < 768 ? 80 : 160;

  for (let c = 0; c < curtainCount; c++) {
    const nC = curtainCount > 1 ? c / (curtainCount - 1) : 0.5;
    const dF = 1 - Math.abs(nC - 0.5) * 2; // 0 at edges, 1 at center

    // Brand-colored lines with depth variation
    const baseAlpha = isDark ? 0.08 + dF * 0.35 : 0.04 + dF * 0.2;
    const baseY = zoneTop + nC * zoneH;
    const curtainHeight = zoneH * (0.25 + cfg.intensity * 0.006);
    const waveSpeed = t * (0.2 + nC * 0.3);

    const subLines = cfg.showDepth ? 4 : 2;

    for (let sub = 0; sub < subLines; sub++) {
      const subAlpha = baseAlpha * (1 - Math.abs(sub / subLines - 0.5) * 1.5);
      if (subAlpha <= 0) continue;

      ctx.globalAlpha = subAlpha;
      // Use brand accent color directly — slight opacity variation per sub-line
      ctx.strokeStyle = withAlpha(accentColor, 0.5 + sub * 0.15 + dF * 0.2);
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
      // Cap DPR at 2 to prevent huge buffers on 3x Retina
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
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

    // Cache accent color + theme — only re-read every 500ms, not every frame
    let cachedAccent = "#0f5c63";
    let cachedIsDark = false;
    let lastStyleRead = 0;

    function animate(ts: number) {
      if (lastFrameRef.current === 0) lastFrameRef.current = ts;
      const delta = Math.min(ts - lastFrameRef.current, 50);
      lastFrameRef.current = ts;
      timeRef.current += (delta / 1000) * DEFAULT_CONFIG.speed * 0.5;

      // Throttle expensive getComputedStyle to ~2Hz
      if (ts - lastStyleRead > 500) {
        const style = getComputedStyle(document.documentElement);
        cachedAccent = style.getPropertyValue("--color-accent").trim();
        cachedIsDark = document.documentElement.getAttribute("data-theme") === "dark";
        lastStyleRead = ts;
      }

      const cssW = canvas!.clientWidth;
      const cssH = canvas!.clientHeight;

      ctx!.clearRect(0, 0, cssW, cssH);
      draw(ctx!, cssW, cssH, timeRef.current, DEFAULT_CONFIG, cachedAccent, cachedIsDark);

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
