import { Moon, Sun } from "lucide-react";
import type { Theme } from '@/exxonim/types';
import { cn } from "@/exxonim/utils/cn";

interface ThemeToggleProps {
  className?: string;
  theme: Theme;
  onToggleTheme: () => void;
}

export function ThemeToggle({
  className,
  theme,
  onToggleTheme,
}: ThemeToggleProps) {
  const isDark = theme === "dark";
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center w-8 h-8 rounded-full text-text-muted hover:text-accent hover:bg-accent/10 transition-all duration-200",
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
