"use client";

import { useEffect, useRef } from "react";

/**
 * HeroRibbon — animated 3D-style ribbon canvas background for the hero section.
 *
 * Adapted from the "Dynamic 3D Ribbon Engine" design concept.
 * Uses HTML Canvas to draw flowing ribbon lines that create
 * an organic, fluid depth effect behind the hero content.
 *
 * THEME ADAPTATION:
 *   - Reads --color-accent from CSS custom properties for line color
 *   - Light theme: subtle accent ribbons at low opacity
 *   - Dark theme: brighter accent ribbons at higher opacity
 *   - Opacity controlled by .hero-ribbon-canvas CSS class
 *   - Smooth transition during theme change via .theme-transition
 *
 * PERFORMANCE:
 *   - Uses requestAnimationFrame for smooth 60fps animation
 *   - High-DPI canvas scaling for crisp rendering
 *   - Respects prefers-reduced-motion (stops animation)
 *
 * BACKEND: No configuration needed. Purely client-side.
 */

/* ── Organic motion drivers ──
 * These create unpredictable, non-repeating movement patterns
 * by combining multiple sine/cosine waves at different frequencies. */
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
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);
  const rafIdRef = useRef<number>(0);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function draw() {
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

      // Read theme-aware accent color from CSS custom properties
      const style = getComputedStyle(document.documentElement);
      const accentColor = style.getPropertyValue("--color-accent").trim();

      // Determine current theme for line opacity
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";

      // Line styling
      ctx!.globalAlpha = isDark ? 0.35 : 0.18;
      ctx!.strokeStyle = accentColor;
      ctx!.lineWidth = 1.2;

      // Ribbon configuration
      const lineCount = 80;
      const spacingY = 1.2;
      const ribbonCenterY = cssH / 2;

      // Organic shape morphing
      const twistStrength = 90 + driverA(timeRef.current * 0.5) * 40;
      const waveCycles = 1.2 + driverB(timeRef.current * 0.3) * 0.3;

      for (let i = 0; i < lineCount; i++) {
        const baseY = ribbonCenterY + (i - lineCount / 2) * spacingY;

        const steps = 250;
        const drawWidth = cssW + 300;
        const stepSizeX = drawWidth / steps;

        ctx!.beginPath();
        for (let s = 0; s <= steps; s++) {
          const x = s * stepSizeX - 150;
          const xProgress = s / steps;

          // 2D field displacement — curvature strongest in middle, pinches at edges
          const curvature = Math.sin(xProgress * Math.PI) * twistStrength;

          // Wave depends on X position, time, AND line index for depth
          const wave =
            Math.sin(
              xProgress * waveCycles * Math.PI +
                timeRef.current * 1.5 +
                i * 0.1
            ) * curvature;

          // Gentle vertical sway for the entire ribbon
          const sway = Math.sin(timeRef.current * 0.5 + xProgress) * 30;

          const y = baseY + wave + sway;

          if (s === 0) ctx!.moveTo(x, y);
          else ctx!.lineTo(x, y);
        }
        ctx!.stroke();
      }

      // Slow time increment for fluid, non-frantic motion
      timeRef.current += 0.003;
      rafIdRef.current = requestAnimationFrame(draw);
    }

    // Start animation
    rafIdRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
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
