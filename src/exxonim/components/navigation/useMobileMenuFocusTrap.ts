import { useEffect, type RefObject } from "react";

function getFocusableElements(node: HTMLElement) {
  return Array.from(
    node.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  ).filter((element) => !element.hasAttribute("disabled"));
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

    const focusableElements = getFocusableElements(panel);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (firstElement) {
      firstElement.focus();
    } else {
      panel.focus();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") {
        return;
      }

      if (!focusableElements.length) {
        event.preventDefault();
        panel.focus();
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
