/* GymTracker Service Worker — v1.5.1
 * Strategy:
 *   - Precache: shell app (HTML, manifest, icons) on install
 *   - Runtime: stale-while-revalidate for static assets (React CDN, Google Fonts)
 *   - Bypass: GitHub API calls (Gist sync) — must always be fresh
 *   - v1.4.0: rest timer notifications that survive screen lock
 *   - v1.5.0: sync conflict resolution + B2/B4/C5/C7 improvements
 *   - v1.5.1: fix recovery timer (useEffect dep array)
 *
 * To force update: bump CACHE_VERSION below.
 */

const CACHE_VERSION = 'gymtracker-v1.5.1';
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
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  if (BYPASS_HOSTS.some((h) => url.hostname.includes(h))) {
    return;
  }

  if (PRECACHE_URLS.some((p) => url.pathname.endsWith(p.replace('./', '')))) {
    event.respondWith(
      caches.match(req).then((cached) => cached || fetch(req))
    );
    return;
  }

  event.respondWith(
    caches.open(CACHE_RUNTIME).then((cache) =>
      cache.match(req).then((cached) => {
        const networkFetch = fetch(req)
          .then((response) => {
            if (response && response.status === 200 &&
                (response.type === 'basic' || response.type === 'cors')) {
              cache.put(req, response.clone());
            }
            return response;
          })
          .catch(() => cached);
        return cached || networkFetch;
      })
    )
  );
});

// === REST TIMER NOTIFICATIONS (v1.4.0) ===
// La pagina chiede "manda una notifica fra X secondi" e il SW lo fa,
// anche se l'utente blocca lo schermo o cambia app.
// Una sola notifica attiva alla volta: ogni nuovo timer cancella il precedente.

let _restTimerHandle = null;

function clearRestTimer(){
  if(_restTimerHandle){
    clearTimeout(_restTimerHandle);
    _restTimerHandle = null;
  }
  if(self.registration && self.registration.getNotifications){
    self.registration.getNotifications({tag: 'rest-timer'}).then((notifs) => {
      notifs.forEach((n) => n.close());
    }).catch(() => {});
  }
}

self.addEventListener('message', (event) => {
  if(!event.data) return;

  if(event.data.type === 'SKIP_WAITING'){
    self.skipWaiting();
    return;
  }

  if(event.data.type === 'START_REST_TIMER'){
    clearRestTimer();
    const seconds = Math.max(1, Math.min(3600, event.data.seconds || 90));
    const label = event.data.label || 'Recupero finito';
    _restTimerHandle = setTimeout(() => {
      _restTimerHandle = null;
      if(self.registration && self.registration.showNotification){
        self.registration.showNotification('GymTracker', {
          body: label,
          icon: './icons/icon-192.png',
          badge: './icons/icon-96.png',
          vibrate: [200, 100, 200, 100, 400],
          tag: 'rest-timer',
          renotify: true,
          requireInteraction: false,
          silent: false
        }).catch(() => {});
      }
    }, seconds * 1000);
    return;
  }

  if(event.data.type === 'CANCEL_REST_TIMER'){
    clearRestTimer();
    return;
  }
});

// Tap sulla notifica: focus o riapri l'app
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({type: 'window', includeUncontrolled: true}).then((clients) => {
      for(const client of clients){
        if('focus' in client){ return client.focus(); }
      }
      if(self.clients.openWindow){
        return self.clients.openWindow('./');
      }
    })
  );
});
