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
      className="inline-flex items-center justify-center w-8 h-8 rounded-full text-text-muted hover:text-accent hover:bg-accent/10 transition-all duration-200"
    >
      {isDark ? (
        <Sun className="w-[16px] h-[16px]" aria-hidden="true" />
      ) : (
        <Moon className="w-[16px] h-[16px]" aria-hidden="true" />
      )}
    </button>
  );
}
