/* GymTracker Service Worker — v1.7.1
 * Strategy:
 *   - Precache: shell app (manifest, icons) on install
 *   - HTML (index.html, /): NETWORK-FIRST so updates propagate immediately;
 *     fallback alla cache solo se offline.
 *   - Runtime: stale-while-revalidate per asset statici (React CDN, Google Fonts)
 *   - Bypass: GitHub API (Gist sync) + Supabase API/auth — sempre fresco
 *   - v1.4.0: rest timer notifications che sopravvivono al lock screen
 *   - v1.5.0: sync conflict resolution + B2/B4/C5/C7
 *   - v1.5.1: fix recovery timer (useEffect dep array)
 *   - v1.6.0: catalogo esercizi per gruppo muscolare + modifica scheda + fix toggle attiva
 *             + network-first per HTML (niente più "vedo la vecchia versione")
 *   - v1.7.0: cloud DB Supabase con auth (magic link / password / Google),
 *             offline-first con sync automatica, migrazione una-tantum da localStorage
 *   - v1.7.1: fix ProfileSetup che si chiudeva da solo subito dopo il login
 *             (la riga profilo auto-creata dal trigger DB veniva interpretata come profilo valido)
 *   - v1.7.2: rimosso magic link dalla LoginScreen (rate limit Supabase free tier 4/ora);
 *             fix overflow del date input su iOS Safari (-webkit-appearance:none)
 *   - v1.7.3: bottone Google disabilitato con badge "Presto disponibile" finch\xe9 non
 *             configuriamo OAuth Google (richiede verifica + dominio per uso pubblico)
 *   - v1.7.4: fix reset password — intercetta evento PASSWORD_RECOVERY e mostra
 *             schermata "Imposta nuova password" invece di mandare l'utente in home
 *   - v1.8.0: Admin Panel per lucvgar@gmail.com — vista read-only di tutti gli utenti,
 *             schede, sessioni, feedback. Protezione doppia: lista email in client +
 *             RLS policy DB-side (la vera barriera di sicurezza).
 *   - v1.8.1: Admin write/delete — edit profilo utenti, soft-delete schede/sessioni,
 *             delete feedback, delete account completo via Edge Function admin-delete-user.
 *   - v1.8.2: CSP meta tag, font preload, fix versione feedback, fix Stats MEV/MAV/MRV,
 *             accessibilità (aria-label, nav semantico, aria-pressed mood),
 *             fix wake lock memory leak, TimerBar floating overlay (C6),
 *             fix flash ProfileSetup al login (attende cloud load prima di mostrarlo).
 *   - v1.8.3: scroll lock iOS modali, anti-double-click save, badge sync offline/errore
 *             tappabile, avviso localStorage pieno, fallback SW registration failure.
 *   - v1.8.4: log diagnostico in-memory con export, UI in Settings per copia/invio email.
 *   - v1.8.5: fix cross-user contamination — al primo login chiediamo conferma prima
 *             di migrare i dati localStorage sul nuovo account cloud (evita che chi
 *             si registra su un device già usato erediti le schede di un altro).
 *   - v1.8.6: rimozione completa del livello localStorage per i dati utente.
 *             Il cloud Supabase è ora l'unica sorgente di verità: niente più
 *             migrazione, niente Gist legacy, niente snapshot locali, niente
 *             persistenza React→localStorage. Sopravvivono solo tema (TK) e
 *             frequenza esercizi (FK) come preferenze di device. One-shot
 *             cleanup all'avvio rimuove chiavi residue da installazioni vecchie.
 *   - v1.8.7: design refresh — Login con claim "ALLENA · TRACCIA · CRESCI" e
 *             logo che respira; Home empty state più motivazionale; stats Home
 *             con streak 🔥, trend vs settimana scorsa e tooltip esplicativi;
 *             pill sync più visibile; scheda attiva con badge "IN USO" e glow;
 *             Stats con explainer MEV/MAV/MRV plain-Italian; "Log" → "Storico"
 *             in nav, "Log diagnostico" → "Segnala un problema" in Settings.
 *
 * Per forzare update: bump CACHE_VERSION qui sotto.
 */

const CACHE_VERSION = 'gymtracker-v1.8.7';
const CACHE_RUNTIME = 'gymtracker-runtime-v3';

/* HTML escluso dalla precache: viene preso network-first. */
const PRECACHE_URLS = [
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './icons/icon-maskable-192.png',
  './icons/icon-maskable-512.png'
];

/* HTML paths: trattati network-first */
const HTML_PATHS = ['/', '/index.html'];
function isHtmlRequest(url, req){
  if(req && req.mode === 'navigate') return true;
  const p = url.pathname;
  return HTML_PATHS.some((h) => p === h || p.endsWith(h));
}

const BYPASS_HOSTS = [
  /* Supabase: auth + REST API + realtime — sempre fresco, mai in cache */
  '.supabase.co',
  '.supabase.in'
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

  /* NETWORK-FIRST per HTML: prova rete, fallback su cache se offline. */
  if (isHtmlRequest(url, req)) {
    event.respondWith(
      fetch(req)
        .then((response) => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(req, copy)).catch(() => {});
          }
          return response;
        })
        .catch(() => caches.match(req).then((cached) => cached || caches.match('./index.html')))
    );
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
