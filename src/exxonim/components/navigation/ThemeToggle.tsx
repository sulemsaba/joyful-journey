import { Moon, Sun } from "lucide-react";
import type { Theme } from '@/exxonim/types';
import { cn } from "@/exxonim/utils/cn";

interface ThemeToggleProps {
  className?: string;
  theme: Theme;
  onToggleTheme: () => void;
  compact?: boolean;
}

export function ThemeToggle({
  className,
  theme,
  onToggleTheme,
  compact = false,
}: ThemeToggleProps) {
  const isDark = theme === "dark";
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full text-text-muted hover:text-accent hover:bg-accent/10 transition-all duration-200",
        compact ? "w-9 h-9" : "w-12 h-12",
        className
      )}
      type="button"
      aria-pressed={isDark}
      onClick={onToggleTheme}
      aria-label={`Toggle theme. Current theme is ${theme}.`}
    >
      {isDark ? (
        <Sun className={cn("transition-opacity", compact ? "w-[14px] h-[14px]" : "w-[16px] h-[16px]")} aria-hidden="true" />
      ) : (
        <Moon className={cn("transition-opacity", compact ? "w-[14px] h-[14px]" : "w-[16px] h-[16px]")} aria-hidden="true" />
      )}
    </button>
  );
}
