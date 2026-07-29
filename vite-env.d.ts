/// <reference types="vite/client" />

interface Window {
  /** Timer ID for the CSS-only boot loader timeout (set in index.html) */
  __bootLoaderTimer?: ReturnType<typeof setTimeout>;
}
