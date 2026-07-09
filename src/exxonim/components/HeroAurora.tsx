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
  const curtainCount = Math.max(2, Math.min(rawCurtainCount, 20));
  const steps = w < 768 ? 64 : 128;

  for (let c = 0; c < curtainCount; c++) {
    const nC = curtainCount > 1 ? c / (curtainCount - 1) : 0.5;
    const dF = 1 - Math.abs(nC - 0.5) * 2;
    const baseAlpha = isDark ? 0.07 + dF * 0.28 : 0.06 + dF * 0.24;
    const baseY = zoneTop + nC * zoneH;
    const curtainHeight = zoneH * (0.25 + cfg.intensity * 0.006);
    const waveSpeed = t * (0.2 + nC * 0.3);
    const subLines = cfg.showDepth ? 4 : 2;

    for (let sub = 0; sub < subLines; sub++) {
      const subAlpha = baseAlpha * (1 - Math.abs(sub / subLines - 0.5) * 1.5);
      if (subAlpha <= 0) continue;
      ctx.globalAlpha = subAlpha;
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
  const isVisibleRef = useRef(true);
  const isScrollingRef = useRef(false);

  const cachedAccentRef = useRef("#0f5c63");
  const cachedIsDarkRef = useRef(false);

  const refreshCache = useCallback(() => {
    const style = getComputedStyle(document.documentElement);
    cachedAccentRef.current = style.getPropertyValue("--color-accent").trim() || "#0f5c63";
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
        // Animate only while the hero is the primary focus (>=40% in view). Once
        // you scroll down to the sections below, the hero is still partly visible
        // but the aurora would keep redrawing at 30fps and steal main-thread
        // frames from the trusted-by marquee just below it (measured: still 960
        // draws/s at 37% visible). Pausing below 40% keeps that region smooth; a
        // barely-visible frozen aurora strip is imperceptible.
        const active = entry.isIntersecting && entry.intersectionRatio >= 0.4;
        isVisibleRef.current = active;
        if (active) {
          if (!rafIdRef.current) {
            lastFrameRef.current = 0;
            rafIdRef.current = requestAnimationFrame(animate);
          }
        } else if (rafIdRef.current) {
          cancelAnimationFrame(rafIdRef.current);
          rafIdRef.current = 0;
        }
      },
      { threshold: [0, 0.4, 1] }
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

      // Freeze the aurora during active scroll: redrawing the canvas on the main
      // thread while scrolling is what makes scroll-up feel laggy. Holding the
      // last frame frees the main thread for a smooth scroll; it resumes the
      // instant scrolling stops (imperceptible pause given the slow drift).
      if (isScrollingRef.current) {
        lastFrameRef.current = ts;
        return;
      }

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
        cachedAccentRef.current,
        cachedIsDarkRef.current
      );
      ctx!.globalAlpha = 1;
    }

    rafIdRef.current = requestAnimationFrame(animate);

    // Mark active scrolling so animate() can freeze; clear shortly after scroll
    // stops and make sure the loop is running again.
    let scrollIdleTimer: ReturnType<typeof setTimeout> | null = null;
    const onScroll = () => {
      isScrollingRef.current = true;
      if (scrollIdleTimer) clearTimeout(scrollIdleTimer);
      scrollIdleTimer = setTimeout(() => {
        isScrollingRef.current = false;
        if (isVisibleRef.current && !document.hidden && !rafIdRef.current) {
          lastFrameRef.current = 0;
          rafIdRef.current = requestAnimationFrame(animate);
        }
      }, 140);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      if (scrollIdleTimer) clearTimeout(scrollIdleTimer);
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
    // Manual theme toggle flips data-theme on <html> without a resize or a
    // system-scheme change — observe it so the aurora re-reads accent + isDark
    // immediately (otherwise it keeps drawing with stale colours until a resize).
    const themeObserver = new MutationObserver(refreshCache);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => {
      mql.removeEventListener("change", handler);
      window.removeEventListener("resize", refreshCache);
      themeObserver.disconnect();
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
