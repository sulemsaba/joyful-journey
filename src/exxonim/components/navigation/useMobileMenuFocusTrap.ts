import { useEffect, type RefObject } from "react";

function isVisible(element: HTMLElement) {
  // checkVisibility covers display:none AND visibility:hidden ancestors;
  // getClientRects is the fallback for older engines (display:none only).
  return typeof element.checkVisibility === "function"
    ? element.checkVisibility()
    : element.getClientRects().length > 0;
}

function getFocusableElements(node: HTMLElement) {
  return Array.from(
    node.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  ).filter((element) => !element.hasAttribute("disabled") && isVisible(element));
}

export function useMobileMenuFocusTrap(
  isOpen: boolean,
  panelRef: RefObject<HTMLDivElement | null>,
  fallbackRef: RefObject<HTMLButtonElement | null>
) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const panel = panelRef.current;
    const previousActiveElement =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    if (!panel) {
      return;
    }

    /* Initial focus waits for the open animation (400ms) to finish first:
     * focus() and the visibility checks both force style/layout, and doing
     * that mid-animation stole frames from the very first open. The panel
     * is non-inert as soon as it opens, so the first attempt lands; the
     * bounded retry is a safety net for engine quirks. */
    let focusTimer = 0;
    let focusTries = 0;
    const tryInitialFocus = () => {
      const focusableElements = getFocusableElements(panel);
      const target = focusableElements[0] ?? panel;
      target.focus({ preventScroll: true });
      if (document.activeElement === target || focusTries >= 6) {
        return;
      }
      focusTries += 1;
      focusTimer = window.setTimeout(tryInitialFocus, 50);
    };
    focusTimer = window.setTimeout(tryInitialFocus, 420);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") {
        return;
      }

      /* Re-queried on every Tab, and filtered to VISIBLE elements: the
       * accordions expand/collapse while the menu is open, so a list captured
       * once would either trap focus on hidden sub-links or let Tab escape
       * past a hidden "last" element. */
      const focusableElements = getFocusableElements(panel);

      if (!focusableElements.length) {
        event.preventDefault();
        panel.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      // Focus drifted outside the open menu (e.g. the initial focus was
      // interrupted) — pull it back in instead of letting Tab walk the page.
      if (!(document.activeElement && panel.contains(document.activeElement))) {
        event.preventDefault();
        firstElement.focus();
        return;
      }

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);

      if (
        previousActiveElement &&
        typeof previousActiveElement.focus === "function"
      ) {
        previousActiveElement.focus();
      } else {
        fallbackRef.current?.focus();
      }
    };
  }, [fallbackRef, isOpen, panelRef]);
}
