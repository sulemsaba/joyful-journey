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
  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center w-12 h-7 rounded-full border border-border-soft bg-surface-soft transition-all",
        "hover:border-accent/50",
        className
      )}
      type="button"
      aria-pressed={theme === "dark"}
      onClick={onToggleTheme}
      aria-label={`Toggle theme. Current theme is ${theme}.`}
    >
      <span
        className={cn(
          "absolute top-1 w-5 h-5 rounded-full bg-surface transition-transform duration-300 flex items-center justify-center",
          theme === "dark" ? "translate-x-2.5" : "-translate-x-2.5"
        )}
        aria-hidden="true"
      >
        <Sun
          className={cn(
            "w-3 h-3 text-accent transition-opacity",
            theme === "dark" ? "opacity-0" : "opacity-100"
          )}
        />
        <Moon
          className={cn(
            "absolute w-3 h-3 text-accent transition-opacity",
            theme === "dark" ? "opacity-100" : "opacity-0"
          )}
        />
      </span>
    </button>
  );
}
