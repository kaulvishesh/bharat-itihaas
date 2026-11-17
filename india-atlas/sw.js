/* Service worker: offline app shell + Leaflet from the CDN. Map tiles are NOT cached (they need a network). */
const VERSION = 'atlas-v59';
const SHELL = [
  './', 'index.html', 'css/fonts.css?v=59', 'css/style.css?v=59', 'css/wow.css?v=59',
  'js/data.js?v=59', 'js/data_hi.js?v=59', 'js/geo.js?v=59', 'js/land.js?v=59', 'js/icons.js?v=59', 'js/detail.js?v=59', 'js/realm_notes.js?v=59', 'js/lod.js?v=59', 'js/wiki.js?v=59', 'js/declutter.js?v=59', 'js/routes.js?v=59', 'js/people.js?v=59', 'js/rivers.js?v=59', 'js/works.js?v=59',
  'js/core.js?v=59', 'js/event_wiki.js?v=59', 'js/battles.js?v=59', 'js/landmarks.js?v=59', 'js/app.js?v=59', 'js/extras.js?v=59', 'js/preintro.js?v=59', 'js/voice.js?v=59', 'js/journeys_data.js?v=59', 'js/journeys.js?v=59', 'js/swipe.js?v=59', 'js/intro.js?v=59', 'js/sw-register.js?v=59', 'icon.svg', 'manifest.webmanifest'
];
const CDN = ['https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css', 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => Promise.all([
    c.addAll(SHELL),
    ...CDN.map((u) => fetch(u, { mode: 'cors' }).then((r) => r.ok && c.put(u, r)).catch(() => {}))
  ])).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const isShell = url.origin === location.origin && !url.pathname.includes('/topics/') && !url.pathname.includes('/geojson/') && !url.pathname.includes('/data/') && !url.pathname.includes('/audio/'); // clips: let the browser stream them (range requests)
  const isCdn = CDN.includes(req.url);
  if (!isShell && !isCdn) return; // tiles, topic pages etc.: default network behaviour
  if (req.mode === 'navigate') { // page loads: network first so updates show up, cache as the offline fallback
    e.respondWith(fetch(req).then((res) => { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); return res; })
      .catch(() => caches.match(req).then((hit) => hit || caches.match('index.html'))));
    return;
  }
  e.respondWith(caches.match(req, { ignoreSearch: false }).then((hit) => hit || fetch(req).then((res) => {
    if (res.ok) { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); }
    return res;
  }).catch(() => caches.match('index.html'))));
});
