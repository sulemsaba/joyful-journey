/// <reference lib="webworker" />
/// <reference types="vite/client" />

/**
 * Exxonim Service Worker — caches static assets for instant reload.
 *
 * Caches:
 * - JS/CSS bundles (Vite assets with hashed names — cache forever)
 * - Images (logos, blog covers, client logos — cache for 30 days)
 * - Videos (track-consultation — cache for 30 days)
 * - Fonts (Google Fonts CSS + woff2 — cache for 30 days)
 * - Favicon images
 *
 * Does NOT cache:
 * - API calls (/api/*) — always fetched fresh
 * - HTML pages — always fetched fresh (stale-while-revalidate)
 */

const CACHE_NAME = 'exxonim-v1';
const STATIC_CACHE = 'exxonim-static-v1';
const IMAGE_CACHE = 'exxonim-images-v1';

// Assets to cache immediately on install (critical path)
const PRECACHE_URLS = [
  '/',
  '/hero-bg.webp',
  '/branding/exxonimLogoLight.webp',
  '/branding/logo-dark.png',
  '/branding/exxonim-favicon-light.png',
  '/branding/exxonim-favicon-dark.png',
  '/videos/track-consultation-poster.webp',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(PRECACHE_URLS).catch(() => {}))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== STATIC_CACHE && key !== IMAGE_CACHE && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Never cache API calls
  if (request.url.includes('/api/')) {
    return;
  }

  // Never cache non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  const url = new URL(request.url);

  // Same-origin static assets (JS, CSS, images, videos, fonts)
  if (url.origin === self.location.origin) {
    // Hashed assets (Vite /assets/*) — cache forever (stale-while-revalidate)
    if (url.pathname.startsWith('/assets/')) {
      event.respondWith(
        caches.match(request).then((cached) => {
          const fetchPromise = fetch(request).then((response) => {
            if (response.ok) {
              const clone = response.clone();
              caches.open(STATIC_CACHE).then((cache) => cache.put(request, clone));
            }
            return response;
          }).catch(() => cached);
          return cached || fetchPromise;
        })
      );
      return;
    }

    // Images and videos — cache with stale-while-revalidate
    if (request.destination === 'image' || request.destination === 'video') {
      event.respondWith(
        caches.match(request).then((cached) => {
          const fetchPromise = fetch(request).then((response) => {
            if (response.ok) {
              const clone = response.clone();
              caches.open(IMAGE_CACHE).then((cache) => cache.put(request, clone));
            }
            return response;
          }).catch(() => cached);
          return cached || fetchPromise;
        })
      );
      return;
    }

    // HTML pages — network first, fallback to cache
    if (request.destination === 'document') {
      event.respondWith(
        fetch(request).then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        }).catch(() => caches.match(request))
      );
      return;
    }
  }

  // Cross-origin (Google Fonts) — cache with stale-while-revalidate
  if (url.hostname.includes('fonts.googleapis.com') || url.hostname.includes('fonts.gstatic.com')) {
    event.respondWith(
      caches.match(request).then((cached) => {
        const fetchPromise = fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(STATIC_CACHE).then((cache) => cache.put(request, clone));
          }
          return response;
        }).catch(() => cached);
        return cached || fetchPromise;
      })
    );
    return;
  }
});
