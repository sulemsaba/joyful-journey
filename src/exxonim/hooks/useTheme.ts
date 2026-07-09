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

/** Document augmented with the View Transitions API (not in every TS lib yet). */
type ViewTransitionHandle = { finished: Promise<unknown> };
type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => ViewTransitionHandle;
};

/** Class on <html> while a theme view-transition is in flight (see globals.css). */
const SWAP_CLASS = "theme-swapping";

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
    // elements - #favicon-light and #favicon-dark - and the browser picks the
    // right one based on OS preference via the media attribute.
    // We restore the original attributes so the media-query switching stays active
    // (in case anything rewrites them elsewhere).
    const lightHrefs: Record<string, string> = {
      "favicon-light": "/branding/exxonim-favicon-light.png",
    };
    const darkHrefs: Record<string, string> = {
      "favicon-dark": "/branding/exxonim-favicon-dark.png",
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
      const next: Theme = theme === "dark" ? "light" : "dark";
      const root = document.documentElement;

      // data-theme drives every colour token in CSS. Set it imperatively (not
      // only via React state) so the change is applied synchronously — that's
      // what lets the View Transition capture the new colours in its callback.
      const applyTheme = () => {
        root.dataset.theme = next;
        setTheme(next);
      };

      const doc = document as ViewTransitionDocument;
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // View Transitions API: the browser crossfades a snapshot of the whole
      // page on the compositor — uniform AND cheap (no per-element transitions).
      // Falls back to an instant swap where unsupported (Firefox) or reduced-motion.
      if (typeof doc.startViewTransition === "function" && !prefersReducedMotion) {
        // Suppress per-element colour transitions for the duration of the swap
        // (SWAP_CLASS → transition:none in globals.css). Otherwise elements with
        // their own transition-colors/transition-all (blog card borders, links,
        // inputs) would still show the OLD colour when the view transition
        // snapshots the new state, then finish changing after the crossfade —
        // appearing to switch a beat late / inconsistently.
        root.classList.add(SWAP_CLASS);
        const clearSwap = () => root.classList.remove(SWAP_CLASS);
        const transition = doc.startViewTransition(applyTheme);
        transition.finished.finally(clearSwap);
        // Safety net: if `finished` never settles (some engines/headless), remove
        // the class anyway so `transition: none` is never left on the page —
        // otherwise all hover/colour transitions would be dead after one toggle.
        setTimeout(clearSwap, 500);
      } else {
        applyTheme();
      }
    },
  };
}
