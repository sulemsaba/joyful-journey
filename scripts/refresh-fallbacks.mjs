#!/usr/bin/env node

/**
 * refresh-fallbacks.mjs
 * ─────────────────────
 * Fetches fresh data from the FastAPI backend and writes it to
 * /public/fallback/*.json so the frontend always has up-to-date
 * static fallback files available.
 *
 * TRIGGER: This script runs when admin saves changes (webhook),
 * NOT on a timer. When admin updates content in the admin panel,
 * the backend calls a webhook that triggers this script.
 *
 * ARCHITECTURE:
 *   Admin saves → FastAPI sends webhook → this script runs
 *   → fetches all API endpoints → writes JSON files to /public/fallback/
 *   → next visitor gets fresh fallback data even if API is temporarily down
 *
 * These JSON files are read by staticFallbackService.ts as Layer 3
 * emergency content (between the live API and the hardcoded TypeScript
 * placeholderData defaults).
 *
 * KEY NAMING: Keys must match the fallbackKey strings used in
 * fetchWithJsonFallback() calls in the hooks.
 *
 * USAGE:
 *   node scripts/refresh-fallbacks.mjs                    # production
 *   node scripts/refresh-fallbacks.mjs --api http://localhost:8000  # dev
 */

import { writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const FALLBACK_DIR = join(__dirname, "..", "public", "fallback");

// Parse --api flag for custom API base URL
const args = process.argv.slice(2);
let API_BASE = process.env.API_URL || "http://127.0.0.1:8000";
const apiFlagIdx = args.indexOf("--api");
if (apiFlagIdx !== -1 && args[apiFlagIdx + 1]) {
  API_BASE = args[apiFlagIdx + 1];
}

/**
 * Endpoints to fetch and save as fallback JSON.
 * Keys MUST match the fallbackKey in fetchWithJsonFallback() calls in hooks.
 */
const ENDPOINTS = [
  // Site settings (key prefix "site-settings-" matches usePublicShell/useSiteSetting hooks)
  { key: "site-settings-brand", path: "/api/v1/site-settings/brand" },
  { key: "site-settings-company_info", path: "/api/v1/site-settings/company_info" },
  { key: "site-settings-footer", path: "/api/v1/site-settings/footer" },
  { key: "site-settings-seo_defaults", path: "/api/v1/site-settings/seo_defaults" },
  { key: "site-settings-social_links", path: "/api/v1/site-settings/social_links" },
  { key: "site-settings-office_hours", path: "/api/v1/site-settings/office_hours" },
  { key: "site-settings-policy_versions", path: "/api/v1/site-settings/policy_versions" },
  { key: "site-settings-contact_map", path: "/api/v1/site-settings/contact_map" },

  // Lists (keys match hook fallbackKey strings)
  { key: "blog-posts", path: "/api/v1/blog/posts?page=1&limit=50" },
  { key: "blog-categories", path: "/api/v1/blog/categories" },
  { key: "pricing-plans", path: "/api/v1/pricing/plans" },
  // The admin-driven plan section (ServicePackagesSection). Key MUST be
  // "service-packages" to match useServicePackages' fetchWithJsonFallback().
  // Without this, the packages path had no Layer-3 snapshot and fell straight
  // through to the hardcoded bundled defaults when the API/DB was down.
  { key: "service-packages", path: "/api/v1/pricing/packages" },
  { key: "testimonials", path: "/api/v1/testimonials" },
  { key: "faq-items", path: "/api/v1/faq" },
  { key: "navigation", path: "/api/v1/navigation" },
  { key: "services", path: "/api/v1/services?status=published" },
];

async function fetchEndpoint(path) {
  const url = `${API_BASE}${path}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });
    clearTimeout(timeout);

    if (!response.ok) {
      console.error(`  ✗ ${path} → HTTP ${response.status}`);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    clearTimeout(timeout);
    console.error(`  ✗ ${path} → ${error.message}`);
    return null;
  }
}

function writeFallbackJson(key, data) {
  const filePath = join(FALLBACK_DIR, `${key}.json`);
  const envelope = {
    _meta: {
      generatedAt: new Date().toISOString(),
      source: "refresh-fallbacks",
    },
    data,
  };

  writeFileSync(filePath, JSON.stringify(envelope, null, 2), "utf-8");
  return filePath;
}

/**
 * Fetch a list endpoint and write per-item files.
 * For blog posts: writes blog-post-{slug}.json for each post.
 * For pages: writes pages-{slug}.json for each page.
 */
async function fetchAndSplitList({ listPath, itemKey, slugField, keyPrefix }) {
  const data = await fetchEndpoint(listPath);
  if (!data) return { succeeded: 0, failed: 0 };

  // Handle both array and { items: [...] } responses
  const items = Array.isArray(data) ? data : data.items || data.data?.services || [];

  let succeeded = 0;
  for (const item of items) {
    const slug = item[slugField];
    if (!slug) continue;

    const filePath = writeFallbackJson(`${keyPrefix}${slug}`, item);
    succeeded++;
    console.log(`  ✓ ${keyPrefix}${slug} → ${filePath}`);
  }

  return { succeeded, failed: 0 };
}

async function main() {
  console.log("═══════════════════════════════════════════════════");
  console.log("  Refresh Fallback JSON Files");
  console.log(`  API: ${API_BASE}`);
  console.log(`  Output: ${FALLBACK_DIR}`);
  console.log("═══════════════════════════════════════════════════\n");

  // Ensure output directory exists
  mkdirSync(FALLBACK_DIR, { recursive: true });

  let succeeded = 0;
  let failed = 0;

  // Fetch and write main endpoint files
  for (const { key, path } of ENDPOINTS) {
    const data = await fetchEndpoint(path);

    if (data === null) {
      // Don't overwrite existing fallback if API is unreachable
      failed++;
      console.log(`  ⚠ ${key} — skipped (API unavailable)`);
      continue;
    }

    const filePath = writeFallbackJson(key, data);
    succeeded++;
    console.log(`  ✓ ${key} → ${filePath}`);
  }

  // Fetch pages list and write per-slug files
  console.log("\n  Writing per-slug page files...");
  const pageResult = await fetchAndSplitList({
    listPath: "/api/v1/pages",
    slugField: "slug",
    keyPrefix: "pages-",
  });
  succeeded += pageResult.succeeded;
  failed += pageResult.failed;

  // Fetch blog posts list and write per-slug files
  console.log("\n  Writing per-slug blog post files...");
  const blogResult = await fetchAndSplitList({
    listPath: "/api/v1/blog/posts?page=1&limit=50",
    slugField: "slug",
    keyPrefix: "blog-post-",
  });
  succeeded += blogResult.succeeded;
  failed += blogResult.failed;

  console.log("\n───────────────────────────────────────────────────");
  console.log(`  Done: ${succeeded} updated, ${failed} skipped`);
  console.log("───────────────────────────────────────────────────\n");

  if (failed > 0 && succeeded === 0) {
    console.error("ERROR: All endpoints failed. Is the API running?");
    process.exit(1);
  }
}

main();
