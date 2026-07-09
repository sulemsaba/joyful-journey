"use client";

import { useCallback, useEffect, useRef } from "react";

interface AuroraConfig {
  speed: number;
  spacing: number;
  coverage: number;
  intensity: number;
  showDepth: boolean;
}

const DEFAULT_CONFIG: AuroraConfig = {
  speed: 0.5,
  spacing: 3.0,
  coverage: 68,
  intensity: 40,
  showDepth: true,
};

function withAlpha(color: string, alpha: number): string {
  const trimmed = color.trim();
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
  const rgbaMatch = trimmed.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (rgbaMatch) {
    return `rgba(${rgbaMatch[1]},${rgbaMatch[2]},${rgbaMatch[3]},${alpha})`;
  }
  return trimmed;
}

function hexToRgb(hex: string): [number, number, number] {
  const h = (hex || "").trim().replace("#", "");
  const s = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  return [parseInt(s.slice(0, 2) || "0f", 16), parseInt(s.slice(2, 4) || "5c", 16), parseInt(s.slice(4, 6) || "63", 16)];
}

function _toHex(n: number): string {
  return Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0");
}

/** Interpolate two hex colors → hex (so withAlpha still works downstream). */
function lerpColor(a: string, b: string, t: number): string {
  const [ar, ag, ab] = hexToRgb(a);
  const [br, bg, bb] = hexToRgb(b);
  return `#${_toHex(ar + (br - ar) * t)}${_toHex(ag + (bg - ag) * t)}${_toHex(ab + (bb - ab) * t)}`;
}

/** Sample a multi-stop gradient at t∈[0,1) (wraps), returning a hex color. */
function sampleGradient(stops: string[], t: number): string {
  if (stops.length <= 1) return stops[0] || "#0f5c63";
  const clamped = ((t % 1) + 1) % 1;
  const scaled = clamped * (stops.length - 1);
  const i = Math.floor(scaled);
  return lerpColor(stops[i], stops[Math.min(i + 1, stops.length - 1)], scaled - i);
}

function draw(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  cfg: AuroraConfig,
  palette: string[],
  isDark: boolean
) {
  const zoneH = h * (cfg.coverage / 100);
  const zoneTop = (h - zoneH) / 2;
  const rawCurtainCount = Math.max(2, Math.round(zoneH / (cfg.spacing * 3)));
  const curtainCount = Math.max(2, Math.min(rawCurtainCount, 20));
  const steps = w < 768 ? 64 : 128;

  for (let c = 0; c < curtainCount; c++) {
    const nC = curtainCount > 1 ? c / (curtainCount - 1) : 0.5;
    const dF = 1 - Math.abs(nC - 0.5) * 2;
    const baseAlpha = isDark ? 0.20 + dF * 0.55 : 0.14 + dF * 0.40;
    const baseY = zoneTop + nC * zoneH;
    const curtainHeight = zoneH * (0.25 + cfg.intensity * 0.006);
    const waveSpeed = t * (0.2 + nC * 0.3);
    const subLines = cfg.showDepth ? 4 : 2;
    // On-brand aurora: hue is mostly TIME-driven so the bright centre ribbons
    // (not just the faint edges) sweep through teal → light-teal → gold and back,
    // making both brand colors clearly visible as it animates.
    const curtainColor = sampleGradient(palette, t * 0.14 + nC * 0.3);

    for (let sub = 0; sub < subLines; sub++) {
      const subAlpha = baseAlpha * (1 - Math.abs(sub / subLines - 0.5) * 1.5);
      if (subAlpha <= 0) continue;
      ctx.globalAlpha = subAlpha;
      ctx.strokeStyle = withAlpha(curtainColor, 0.5 + sub * 0.15 + dF * 0.2);
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
  const isVisibleRef = useRef(true);

  const cachedPaletteRef = useRef<string[]>(["#0f5c63", "#7fbcc1", "#d4930d"]);
  const cachedIsDarkRef = useRef(false);

  const refreshCache = useCallback(() => {
    const style = getComputedStyle(document.documentElement);
    const teal = style.getPropertyValue("--color-accent").trim() || "#0f5c63";
    const lightTeal = style.getPropertyValue("--color-accent-secondary").trim() || "#7fbcc1";
    const gold = style.getPropertyValue("--color-star").trim() || "#d4930d";
    // Brand aurora ramp: teal → light-teal → gold (and back toward teal so it loops smoothly).
    cachedPaletteRef.current = [teal, lightTeal, gold, lightTeal];
    cachedIsDarkRef.current = document.documentElement.getAttribute("data-theme") === "dark";
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    refreshCache();

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          if (!rafIdRef.current) {
            lastFrameRef.current = 0;
            rafIdRef.current = requestAnimationFrame(animate);
          }
        } else {
          if (rafIdRef.current) {
            cancelAnimationFrame(rafIdRef.current);
            rafIdRef.current = 0;
          }
        }
      },
      { threshold: 0 }
    );
    visibilityObserver.observe(canvas);

    function resize() {
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

    const FRAME_INTERVAL = 33;

    function animate(ts: number) {
      if (!isVisibleRef.current || document.hidden) {
        rafIdRef.current = 0;
        return;
      }
      rafIdRef.current = requestAnimationFrame(animate);

      const elapsed = ts - lastFrameRef.current;
      if (elapsed < FRAME_INTERVAL) return;

      if (lastFrameRef.current === 0) lastFrameRef.current = ts;
      const delta = Math.min(elapsed, 50);
      lastFrameRef.current = ts - (elapsed % FRAME_INTERVAL);
      timeRef.current += (delta / 1000) * DEFAULT_CONFIG.speed * 0.5;

      const cssW = canvas!.clientWidth;
      const cssH = canvas!.clientHeight;

      ctx!.clearRect(0, 0, cssW, cssH);
      draw(
        ctx!,
        cssW,
        cssH,
        timeRef.current,
        DEFAULT_CONFIG,
        cachedPaletteRef.current,
        cachedIsDarkRef.current
      );
      ctx!.globalAlpha = 1;
    }

    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      visibilityObserver.disconnect();
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [refreshCache]);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => refreshCache();
    mql.addEventListener("change", handler);
    window.addEventListener("resize", refreshCache);
    return () => {
      mql.removeEventListener("change", handler);
      window.removeEventListener("resize", refreshCache);
    };
  }, [refreshCache]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="hero-aurora-canvas pointer-events-none absolute inset-0 -z-10 w-full h-full"
    />
  );
}
