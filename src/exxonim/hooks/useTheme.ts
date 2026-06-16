/**
 * FASTAPI ENDPOINT DEPENDENCY (indirect):
 * ─────────────────────────────────────────
 * This hook does NOT make direct API calls. It listens for the
 * PRIVACY_CONSENT_EVENT dispatched by the privacy consent API
 * (GET/POST /api/v1/privacy/consent) to determine whether theme
 * preference can be persisted to localStorage.
 *
 * When the user disables "preferences" consent, the stored theme
 * is cleared and subsequent changes are kept only in memory.
 *
 * See: src/exxonim/services/privacyService.ts for privacy consent endpoints.
 */
import { useEffect, useState } from "react";
import type { Theme } from '@/exxonim/types';
import { PRIVACY_CONSENT_EVENT } from "@/exxonim/services/privacyService";

const STORAGE_KEY = "exxonim-theme";
const LEGACY_STORAGE_KEY = "koro-theme";
const TRANSITION_CLASS = "theme-transition";
const TRANSITION_DURATION = 400; // ms — must match globals.css

function getStoredTheme(): Theme | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const storedTheme =
      localStorage.getItem(STORAGE_KEY) ?? localStorage.getItem(LEGACY_STORAGE_KEY);

    return storedTheme === "dark" || storedTheme === "light"
      ? storedTheme
      : null;
  } catch {
    return null;
  }
}

function clearStoredTheme() {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(LEGACY_STORAGE_KEY);
  } catch {
    // Ignore storage failures and continue with in-memory theme state.
  }
}

function getInitialTheme(): Theme {
  if (typeof document === "undefined") {
    return "dark";
  }

  const storedTheme = getStoredTheme();

  if (storedTheme) {
    return storedTheme;
  }

  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [canPersistPreference, setCanPersistPreference] = useState(true);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;

    // The favicon follows the system/browser theme (prefers-color-scheme),
    // NOT the website's manual theme toggle. The <head> contains two <link>
    // elements — #favicon-light and #favicon-dark — and the browser picks the
    // right one based on OS preference via the media attribute.
    // We restore the original attributes so the media-query switching stays active
    // (in case anything rewrites them elsewhere).
    const lightHrefs: Record<string, string> = {
      "favicon-light": "/branding/exxonimLogoLight.webp",
    };
    const darkHrefs: Record<string, string> = {
      "favicon-dark": "/branding/logo-dark.png",
    };

    for (const id of Object.keys(lightHrefs)) {
      const el = document.getElementById(id) as HTMLLinkElement | null;
      if (el) {
        el.href = lightHrefs[id];
        el.media = "";
      }
    }
    for (const id of Object.keys(darkHrefs)) {
      const el = document.getElementById(id) as HTMLLinkElement | null;
      if (el) {
        el.href = darkHrefs[id];
        el.media = "(prefers-color-scheme: dark)";
      }
    }
  }, [theme]);

  useEffect(() => {
    const handleConsentChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ preferencesEnabled?: boolean }>;
      const preferencesEnabled = Boolean(customEvent.detail?.preferencesEnabled);
      setCanPersistPreference(preferencesEnabled);

      if (!preferencesEnabled) {
        clearStoredTheme();
      }
    };

    window.addEventListener(PRIVACY_CONSENT_EVENT, handleConsentChange as EventListener);

    return () => {
      window.removeEventListener(PRIVACY_CONSENT_EVENT, handleConsentChange as EventListener);
    };
  }, []);

  useEffect(() => {
    if (!canPersistPreference) {
      clearStoredTheme();
      return;
    }

    try {
      localStorage.setItem(STORAGE_KEY, theme);
      localStorage.removeItem(LEGACY_STORAGE_KEY);
    } catch {
      // Ignore storage failures and keep the active theme in memory.
    }
  }, [canPersistPreference, theme]);

  return {
    theme,
    toggleTheme: () => {
      const next = theme === "dark" ? "light" : "dark";

      // Smooth theme switch using CSS transitions instead of View Transitions.
      // We temporarily add a class that enables color transitions on ALL
      // elements, change the theme, then remove the class after the
      // transition completes. This way every element — toggle knob,
      // text, buttons, backgrounds — smoothly morphs to the new colors.
      const root = document.documentElement;

      // Add transition class — enables smooth color interpolation
      root.classList.add(TRANSITION_CLASS);

      // Apply the theme change
      setTheme(next);

      // Remove the class after transition completes so it doesn't
      // interfere with hover effects, animations, or the hero shrink
      setTimeout(() => {
        root.classList.remove(TRANSITION_CLASS);
      }, TRANSITION_DURATION);
    },
  };
}
