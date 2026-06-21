
import { useEffect, useRef } from "react";

/**
 * HeroRibbon - animated 3D-style ribbon canvas background for the hero section.
 *
 * PERFORMANCE OPTIMIZATIONS (v2):
 *   - 24 lines × 80 steps (was 80 × 250 = 20,000 → now 1,920 lineTo calls)
 *   - Cached accent color - only reads getComputedStyle on theme change, not every frame
 *   - Throttled to ~30fps for subtle background animation
 *   - Pauses when canvas is off-screen via IntersectionObserver
 *   - Respects prefers-reduced-motion (stops animation)
 */

/* ── Organic motion drivers ── */
function driverA(time: number) {
  return (
    Math.sin(time * 0.31 + 0.7) * 0.7 +
    Math.cos(time * 0.53) * 0.5 +
    Math.sin(time * 0.17) * 0.4
  );
}
function driverB(time: number) {
  return (
    Math.cos(time * 0.41 + 1.1) * 0.65 +
    Math.sin(time * 0.59) * 0.45 +
    Math.cos(time * 0.13) * 0.5
  );
}

export function HeroRibbon() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef(0);
  const rafIdRef = useRef<number>(0);
  const lastFrameRef = useRef(0);
  const isVisibleRef = useRef(true);

  // Cached style values - updated on theme change, not every frame
  const accentColorRef = useRef("");
  const isDarkRef = useRef(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Cache accent color and theme initially
    function cacheStyleValues() {
      const style = getComputedStyle(document.documentElement);
      accentColorRef.current = style.getPropertyValue("--color-accent").trim();
      isDarkRef.current = document.documentElement.getAttribute("data-theme") === "dark";
    }
    cacheStyleValues();

    // Re-cache on theme changes
    const themeObserver = new MutationObserver(() => {
      cacheStyleValues();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    // Pause animation when off-screen
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    visibilityObserver.observe(canvas);

    // Target ~30fps for background animation (33ms between frames)
    const FRAME_INTERVAL = 33;

    function draw(timestamp: number) {
      rafIdRef.current = requestAnimationFrame(draw);

      // Skip if off-screen or not enough time has passed (throttle FPS)
      if (!isVisibleRef.current) return;
      const elapsed = timestamp - lastFrameRef.current;
      if (elapsed < FRAME_INTERVAL) return;
      lastFrameRef.current = timestamp - (elapsed % FRAME_INTERVAL);

      const cssW = canvas!.clientWidth;
      const cssH = canvas!.clientHeight;
      const dpr = window.devicePixelRatio || 1;

      // Resize canvas buffer if needed
      if (canvas!.width !== cssW * dpr || canvas!.height !== cssH * dpr) {
        canvas!.width = cssW * dpr;
        canvas!.height = cssH * dpr;
        ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      ctx!.clearRect(0, 0, cssW, cssH);

      // Use cached values instead of getComputedStyle every frame
      ctx!.globalAlpha = isDarkRef.current ? 0.35 : 0.18;
      ctx!.strokeStyle = accentColorRef.current;
      ctx!.lineWidth = 1.2;

      // Ribbon configuration - reduced for performance
      const lineCount = 24;
      const spacingY = 3.5;
      const ribbonCenterY = cssH / 2;

      // Organic shape morphing
      const twistStrength = 90 + driverA(timeRef.current * 0.5) * 40;
      const waveCycles = 1.2 + driverB(timeRef.current * 0.3) * 0.3;

      // Pre-compute constants outside the loop
      const steps = 80;
      const drawWidth = cssW + 300;
      const stepSizeX = drawWidth / steps;
      const halfLineCount = lineCount / 2;

      for (let i = 0; i < lineCount; i++) {
        const baseY = ribbonCenterY + (i - halfLineCount) * spacingY;

        ctx!.beginPath();
        for (let s = 0; s <= steps; s++) {
          const x = s * stepSizeX - 150;
          const xProgress = s / steps;

          const curvature = Math.sin(xProgress * Math.PI) * twistStrength;

          const wave =
            Math.sin(
              xProgress * waveCycles * Math.PI +
                timeRef.current * 1.5 +
                i * 0.1
            ) * curvature;

          const sway = Math.sin(timeRef.current * 0.5 + xProgress) * 30;

          const y = baseY + wave + sway;

          if (s === 0) ctx!.moveTo(x, y);
          else ctx!.lineTo(x, y);
        }
        ctx!.stroke();
      }

      // Slow time increment for fluid motion
      timeRef.current += 0.004;
    }

    // Start animation
    rafIdRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      themeObserver.disconnect();
      visibilityObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="hero-ribbon-canvas pointer-events-none absolute inset-0 -z-10 w-full h-full"
    />
  );
}
