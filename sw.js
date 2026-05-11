/* GymTracker Service Worker
 * Strategy:
 *   - Precache: shell app (HTML, manifest, icons) on install
 *   - Runtime: stale-while-revalidate for static assets (React CDN, Google Fonts)
 *   - Bypass: GitHub API calls (Gist sync, PDF storage) — must always be fresh
 *
 * To force update: bump CACHE_VERSION below.
 */

const CACHE_VERSION = 'gymtracker-v1.0.0';
const CACHE_RUNTIME = 'gymtracker-runtime-v1';

const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './icons/icon-maskable-192.png',
  './icons/icon-maskable-512.png'
];

// Domains we never cache (always go to network)
const BYPASS_HOSTS = [
  'api.github.com',
  'gist.githubusercontent.com'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((k) => k !== CACHE_VERSION && k !== CACHE_RUNTIME)
          .map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Only GET requests are cached
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Bypass: GitHub API must always hit network (sync/PDF uploads)
  if (BYPASS_HOSTS.some((h) => url.hostname.includes(h))) {
    return;
  }

  // App shell: cache-first for precached items
  if (PRECACHE_URLS.some((p) => url.pathname.endsWith(p.replace('./', '')))) {
    event.respondWith(
      caches.match(req).then((cached) => cached || fetch(req))
    );
    return;
  }

  // CDN assets (React, Google Fonts, pdf.js): stale-while-revalidate
  event.respondWith(
    caches.open(CACHE_RUNTIME).then((cache) =>
      cache.match(req).then((cached) => {
        const networkFetch = fetch(req)
          .then((response) => {
            // Only cache successful, basic/cors responses
            if (response && response.status === 200 &&
                (response.type === 'basic' || response.type === 'cors')) {
              cache.put(req, response.clone());
            }
            return response;
          })
          .catch(() => cached); // offline fallback
        return cached || networkFetch;
      })
    )
  );
});

// Allow page to trigger immediate update
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
