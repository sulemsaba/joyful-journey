"use client";

import { Moon, Sun } from "lucide-react";
import type { Theme } from "@/lib/exxonim-types";

interface ThemeToggleProps {
  theme: Theme;
  onToggleTheme: () => void;
}

export function ThemeToggle({ theme, onToggleTheme }: ThemeToggleProps) {
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={onToggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-border-soft bg-surface text-text transition-all hover:border-accent hover:text-accent"
    >
      {isDark ? (
        <Sun className="w-[18px] h-[18px]" aria-hidden="true" />
      ) : (
        <Moon className="w-[18px] h-[18px]" aria-hidden="true" />
      )}
    </button>
  );
}
