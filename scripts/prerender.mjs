/**
 * Targeted prerender for the STABLE marketing routes.
 *
 * Runs the built app (dist/) in headless Chrome, lets the client-side SEO apply
 * per-route <head> tags (title, meta description, OG/Twitter, canonical), then
 * writes a per-route dist/<route>/index.html whose <head> is that route's real
 * head and whose <body> is the normal CSR shell (empty #root + boot-loader).
 *
 * Why head-only: social crawlers (WhatsApp/LinkedIn/X/Slack) don't run JS, so
 * they now get the correct per-page share card. The body stays the CSR shell, so
 * there's no hydration/flash risk (the app boots normally on top).
 *
 * Dynamic routes (blog articles, service details) and the blog listing are NOT
 * prerendered — they change with content and would go stale.
 *
 * Requires: a `vite build` first, Chromium at CHROMIUM_PATH, puppeteer-core.
 */
import { spawn } from "node:child_process";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");
const PORT = 4188;
const CHROMIUM_PATH = process.env.CHROMIUM_PATH || "/usr/bin/chromium-browser";

// Stable marketing routes only (trailing slash matches the app's routes).
const ROUTES = [
  "/",
  "/about/",
  "/services/",
  "/contact/",
  "/faq/",
  "/career/",
  "/track-consultation/",
  "/support/",
  "/terms/",
  "/privacy/",
  "/cookies/",
  "/data-rights/",
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitForServer(url, timeoutMs = 20000) {
  const end = Date.now() + timeoutMs;
  while (Date.now() < end) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch { /* not up yet */ }
    await sleep(250);
  }
  throw new Error(`preview server did not start at ${url}`);
}

function routeToFile(route) {
  if (route === "/") return join(DIST, "index.html");
  return join(DIST, route.replace(/^\/|\/$/g, ""), "index.html");
}

async function main() {
  const shell = await readFile(join(DIST, "index.html"), "utf8");
  const beforeHead = shell.split("<head>")[0]; // <!doctype> + <html ...>
  const afterHeadClose = "</head>" + shell.split("</head>")[1]; // </head> + <body>...</html>

  const preview = spawn(
    "npx",
    ["vite", "preview", "--port", String(PORT), "--strictPort"],
    { cwd: ROOT, stdio: "ignore" }
  );

  const browser = await puppeteer.launch({
    executablePath: CHROMIUM_PATH,
    headless: "new",
    args: ["--no-sandbox"],
  });

  try {
    await waitForServer(`http://localhost:${PORT}/`);
    const page = await browser.newPage();

    for (const route of ROUTES) {
      await page.goto(`http://localhost:${PORT}${route}`, {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      });
      // Wait until the client-side SEO has run (title set + tags it manages present).
      await page
        .waitForFunction(
          () => document.title && document.querySelector("meta[data-exxonim]"),
          { timeout: 20000 }
        )
        .catch(() => {});
      await sleep(400); // settle any remaining OG/twitter tags

      const headInner = await page.evaluate(() => document.head.innerHTML);
      const html = `${beforeHead}<head>${headInner}${afterHeadClose}`;

      const file = routeToFile(route);
      await mkdir(dirname(file), { recursive: true });
      await writeFile(file, html, "utf8");
      const title = await page.title();
      console.log(`  prerendered ${route.padEnd(22)} -> ${file.replace(DIST + "/", "dist/")}  [${title}]`);
    }
  } finally {
    await browser.close();
    preview.kill("SIGTERM");
  }
  console.log(`Prerendered ${ROUTES.length} routes.`);
}

// Best-effort: never break the build. If Chromium/puppeteer isn't available (or
// anything else fails), warn and leave the plain SPA build in place.
main().catch((err) => {
  console.warn("⚠ prerender skipped (build still valid):", err?.message || err);
  process.exit(0);
});
