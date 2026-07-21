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
        "inline-flex items-center justify-center rounded-full text-text-muted hover:text-accent hover:bg-accent/10 transition-colors duration-200",
        compact ? "w-11 h-11" : "w-12 h-12",
        className
      )}
      type="button"
      aria-pressed={isDark}
      onClick={onToggleTheme}
      aria-label={`Toggle theme. Current theme is ${theme}.`}
    >
      {isDark ? (
        <Sun className="w-[16px] h-[16px] transition-opacity" aria-hidden="true" />
      ) : (
        <Moon className="w-[16px] h-[16px] transition-opacity" aria-hidden="true" />
      )}
    </button>
  );
}
