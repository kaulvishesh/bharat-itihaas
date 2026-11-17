(function () {
  'use strict';
  window.ATLAS_INITIAL_URL = location.href; // captured before the app rewrites the hash
  const ERAS = window.ATLAS_DATA.ERAS;
  const GEO = window.ATLAS_GEO;
  const ROUTES = window.ATLAS_ROUTES || {};
  const polities = (e) => GEO[e.geo].polities;
  const routesOf = (e) => ROUTES[e.geo] || [];

  const UI = {
    en: {
      title: 'Atlas of India', subtitle: 'Atlas of India · 500 BCE → Today', moreLabel: 'Layers', reset: 'Reset view', listen: 'Listen',
      stage: (n, m) => 'Era ' + n + ' of ' + m, vs: 'Vikram Samvat', saka: 'Saka',
      play: 'Play', pause: 'Pause', tour: 'Guided tour', quiz: 'Quiz', exitQuiz: 'Exit quiz', share: 'Share', copied: 'Link copied',
      search: 'Search places, events, empires…',
      rulers: 'Rulers & figures', realms: 'Realms', events: 'Key events', places: 'Places', journeys: 'Journeys & campaigns', trace: 'Trace',
      source: (snap) => 'Boundaries: data-source snapshot of ' + snap + ' (approximate).',
      approx: 'Dashed fill = hand-drawn sketch, very approximate.', ghost: 'Dashed grey outline = previous era.',
      disclaimer: 'Boundaries are simplified, approximate and for illustration only; they are not authoritative and not for any political or legal purpose. India’s present-day outline follows India’s official position (Natural Earth, India point of view). Data: historical-basemaps (GPL-3.0).',
      cal: (ce, vs, sk) => 'Vikram Samvat ' + vs + (sk ? ' · Saka ' + sk : ''),
      calBce: 'Dates are approximate (BCE).',
      round: (r, n, s) => 'Round ' + r + ' of ' + n + ' · Score ' + s,
      clueHint: 'Click the map where this happened.', next: 'Next', finish: 'Finish', again: 'Play again',
      era: 'Era', result: (d, p) => d < 1 ? 'Bullseye!  +' + p : Math.round(d) + ' km away  +' + p,
      final: (s, max) => 'Final score: ' + s + ' / ' + max, lang: 'हिन्दी',
      kEra: 'Era', kEvent: 'Event', kPlace: 'Place', kRealm: 'Realm', kRoute: 'Journey', none: 'No matches',
      traceBtn: 'Trace through time', speakOn: 'Narration on', speakOff: 'Narration off',
      tourOf: (n, m) => 'Step ' + n + ' of ' + m, tourEra: 'New era', tourPause: 'Pause', tourResume: 'Resume', tourStop: 'Exit tour'
    },
    hi: {
      title: 'भारत का मानचित्र-इतिहास', subtitle: 'भारत का मानचित्र-इतिहास · 500 ई.पू. → आज', moreLabel: 'परतें', reset: 'दृश्य रीसेट', listen: 'सुनें',
      stage: (n, m) => 'युग ' + n + '/' + m, vs: 'विक्रम संवत', saka: 'शक',
      play: 'चलाएँ', pause: 'रोकें', tour: 'निर्देशित यात्रा', quiz: 'प्रश्नोत्तरी', exitQuiz: 'बाहर निकलें', share: 'साझा करें', copied: 'लिंक कॉपी हुआ',
      search: 'स्थान, घटनाएँ, साम्राज्य खोजें…',
      rulers: 'शासक और व्यक्तित्व', realms: 'राज्य', events: 'प्रमुख घटनाएँ', places: 'स्थान', journeys: 'यात्राएँ और अभियान', trace: 'देखें',
      source: (snap) => 'सीमाएँ: डेटा-स्रोत का ' + snap + ' का स्नैपशॉट (अनुमानित)।',
      approx: 'धराशायी रंग = हाथ से बनाया गया अनुमानित रेखाचित्र।', ghost: 'धूसर धराशायी रेखा = पिछला युग।',
      disclaimer: 'सीमाएँ सरलीकृत, अनुमानित और केवल चित्रण हेतु हैं; ये प्रामाणिक नहीं हैं और किसी राजनीतिक या कानूनी प्रयोजन के लिए नहीं हैं। भारत की वर्तमान रूपरेखा भारत की आधिकारिक स्थिति के अनुसार है (नेचुरल अर्थ, भारत का दृष्टिकोण)। डेटा: historical-basemaps (GPL-3.0)।',
      cal: (ce, vs, sk) => 'विक्रम संवत ' + vs + (sk ? ' · शक ' + sk : ''),
      calBce: 'तिथियाँ अनुमानित (ई.पू.)।',
      round: (r, n, s) => 'दौर ' + r + '/' + n + ' · अंक ' + s,
      clueHint: 'नक्शे पर वह जगह क्लिक करें जहाँ यह हुआ।', next: 'अगला', finish: 'समाप्त', again: 'फिर खेलें',
      era: 'युग', result: (d, p) => d < 1 ? 'बिल्कुल सही!  +' + p : Math.round(d) + ' कि.मी. दूर  +' + p,
      final: (s, max) => 'कुल अंक: ' + s + ' / ' + max, lang: 'English',
      kEra: 'युग', kEvent: 'घटना', kPlace: 'स्थान', kRealm: 'राज्य', kRoute: 'यात्रा', none: 'कोई परिणाम नहीं',
      traceBtn: 'समय के पार देखें', speakOn: 'वाचन चालू', speakOff: 'वाचन बंद',
      tourOf: (n, m) => 'चरण ' + n + '/' + m, tourEra: 'नया युग', tourPause: 'रोकें', tourResume: 'चलाएँ', tourStop: 'यात्रा समाप्त'
    }
  };

  const state = { i: 0, lang: 'en', playing: false, timer: null, quiz: null, legendOpen: false, realm: null };
  const tour = { on: false, steps: [], n: 0, timer: null, paused: false };
  const $ = (id) => document.getElementById(id);
  const t = () => UI[state.lang];
  const hi = () => state.lang === 'hi';
  const pick = (o, k) => (hi() && o[k + 'Hi']) ? o[k + 'Hi'] : o[k];
  const escapeHtml = (x) => String(x).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // ---- map & basemaps ----
    const map = L.map('map', { zoomControl: true, zoomSnap: 0.1, zoomDelta: 0.5, minZoom: 3, maxZoom: 10, worldCopyJump: false, renderer: L.svg({ padding: 0.5 }) }).setView([22, 80], 4.6);
  // home view = the whole subcontinent, fitted to whatever space the map actually has
  const INDIA_BOUNDS = L.latLngBounds([[6, 67], [36.8, 97.5]]);
  const narrowScreen = () => window.innerWidth <= 800;
  // leave room for the bottom sheet on phones; on desktop the side panel is outside the map
  const homeOpts = (o) => Object.assign({ paddingTopLeft: [narrowScreen() ? 8 : 24, 58], paddingBottomRight: [narrowScreen() ? 8 : 24, narrowScreen() ? Math.round(map.getSize().y * 0.45) : 30], maxZoom: 6 }, o || {});
  const goHome = (o) => map.fitBounds(INDIA_BOUNDS, homeOpts(o));
  const flyHome = (d) => (REDUCE ? goHome({ animate: false }) : map.flyToBounds(INDIA_BOUNDS, homeOpts({ duration: d || 0.8 })));
  goHome({ animate: false });
  // respect "reduce motion": no fly animations, static route lines
  const REDUCE = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  if (REDUCE) { const _fly = map.flyTo.bind(map); map.flyTo = (ll, z) => map.setView(ll, z == null ? map.getZoom() : z, { animate: false }); map.flyToBounds = (b, o) => map.fitBounds(b, Object.assign({ animate: false }, o)); void _fly; }
  // open, keyless map surfaces (js/terrain.js): relief and hillshade are drawn from public elevation data, satellite is NASA Blue Marble
  const relief = ATLAS_TERRAIN.relief();
  const imagery = ATLAS_TERRAIN.imagery();
  // ── custom "antique atlas" basemap: engraved sea, water-lined coasts, shaded hills, graticule ──
  map.createPane('landPane').style.zIndex = 210;
  const shadePane = map.createPane('shadePane'); shadePane.style.zIndex = 215; shadePane.classList.add('leaflet-shade-pane');
  map.createPane('gridPane').style.zIndex = 218;
  map.getPane('gridPane').style.pointerEvents = 'none';
  const landRenderer = L.svg({ pane: 'landPane', padding: 0.6 });
  const gridRenderer = L.svg({ pane: 'gridPane', padding: 0.6 });
  const antique = L.layerGroup();
  const hill = ATLAS_TERRAIN.shade({ pane: 'shadePane' });
  const LAND = window.ATLAS_LAND || [];
  [[36, 0.05], [25, 0.07], [16, 0.1], [9, 0.16], [4, 0.26]].forEach(([w, o]) => {   // water-lining: soft concentric ripples
    LAND.forEach((poly) => antique.addLayer(L.polygon(poly, { renderer: landRenderer, fill: false, color: '#bfd9df', weight: w, opacity: o, lineJoin: 'round', interactive: false })));
  });
  LAND.forEach((poly) => antique.addLayer(L.polygon(poly, { renderer: landRenderer, color: '#6f5a38', weight: 0.9, opacity: 0.9, fillColor: '#eee2c0', fillOpacity: 1, lineJoin: 'round', interactive: false })));
  antique.addLayer(hill);
  const gridLines = L.layerGroup(), gridLabels = L.layerGroup();
  for (let la = 0; la <= 40; la += 10) gridLines.addLayer(L.polyline([[la, 40], [la, 130]], { renderer: gridRenderer, color: '#efe5c6', weight: 0.8, opacity: 0.28, dashArray: '2 7', interactive: false }));
  for (let lo = 60; lo <= 110; lo += 10) gridLines.addLayer(L.polyline([[-5, lo], [45, lo]], { renderer: gridRenderer, color: '#efe5c6', weight: 0.8, opacity: 0.28, dashArray: '2 7', interactive: false }));
  antique.addLayer(gridLines); antique.addLayer(gridLabels);
  // sea names (tracked italic caps) and a few galleons, as on a printed atlas
  const SEAS = [
    { ll: [15.2, 66.6], en: 'Arabian Sea', hi: 'अरब सागर', minZ: 4 },
    { ll: [14.8, 88.6], en: 'Bay of Bengal', hi: 'बंगाल की खाड़ी', minZ: 4 },
    { ll: [2.6, 79.5], en: 'Indian Ocean', hi: 'हिंद महासागर', minZ: 4 },
    { ll: [10.8, 54.8], en: 'Arabian Sea', hi: '', minZ: 99 }
  ].filter((x) => x.minZ < 99);
  const seaMarkers = SEAS.map((sea) => {
    const m = L.marker(sea.ll, { icon: L.divIcon({ className: 'sea-label', html: '', iconSize: [0, 0] }), interactive: false, keyboard: false });
    antique.addLayer(m); return { m, sea };
  });
  function setSeaLabels() {
    seaMarkers.forEach(({ m, sea }) => m.setIcon(L.divIcon({ className: 'sea-label', html: '<span>' + escapeHtml(hi() ? sea.hi : sea.en) + '</span>', iconSize: [0, 0] })));
  }
  [[13.2, 69.8, 1], [10.4, 85.4, -1]].forEach(([la, lo, flip]) => {
    antique.addLayer(L.marker([la, lo], { icon: L.divIcon({ className: 'ship' + (flip < 0 ? ' flip' : ''), html: atlasIcon('ship'), iconSize: [46, 40], iconAnchor: [23, 20] }), interactive: false, keyboard: false, zIndexOffset: -100 }));
  });
  function updateGrid() {
    gridLabels.clearLayers();
    if (!map.hasLayer(antique)) return;
    const b = map.getBounds(), sz = map.getSize(), c = map.getCenter();
    for (let la = 10; la <= 40; la += 10) {
      const y = map.latLngToContainerPoint([la, c.lng]).y;
      if (y > 60 && y < sz.y - 60) gridLabels.addLayer(L.marker(map.containerPointToLatLng([34, y - 7]), { icon: L.divIcon({ className: 'graticule-label', html: la + '°N', iconSize: [40, 12] }), interactive: false, keyboard: false }));
    }
    for (let lo = 60; lo <= 110; lo += 10) {
      const x = map.latLngToContainerPoint([c.lat, lo]).x;
      if (x > 90 && x < sz.x - 90) gridLabels.addLayer(L.marker(map.containerPointToLatLng([x - 14, sz.y - 22]), { icon: L.divIcon({ className: 'graticule-label', html: lo + '°E', iconSize: [40, 12] }), interactive: false, keyboard: false }));
    }
  }
  map.on('moveend zoomend layeradd', (ev) => { if (ev.type !== 'layeradd' || ev.layer === antique) updateGrid(); });
  antique.addTo(map);
  map.getContainer().classList.add('base-antique');
  L.control.layers({ 'Antique atlas': antique, 'Relief': relief, 'Satellite': imagery }, null, { position: 'bottomright', collapsed: true }).addTo(map);
  map.on('baselayerchange', (ev) => {
    const c = map.getContainer();
    c.classList.toggle('base-relief', ev.layer === relief);
    c.classList.toggle('base-antique', ev.layer === antique);
  });
  map.zoomControl.setPosition('bottomright');
  L.control.scale({ position: 'bottomleft', imperial: false, maxWidth: 110 }).addTo(map);

  const ghostLayer = L.layerGroup().addTo(map);
  const polityLayer = L.layerGroup().addTo(map);
  const routeLayer = L.layerGroup().addTo(map);
  const eventLayer = L.layerGroup().addTo(map);
  const placeLayer = L.layerGroup().addTo(map);
  const quizLayer = L.layerGroup().addTo(map);
  const tourLayer = L.layerGroup().addTo(map);
  const KIND = { capital: 32, city: 25, site: 27, port: 27 };
  const symIcon = (name, n) => L.divIcon({ className: 'mk', html: atlasIcon(name), iconSize: [n, n], iconAnchor: [n / 2, n * 0.88], popupAnchor: [0, -n * 0.8], tooltipAnchor: [n / 2, -n * 0.3] });
  const MODE_OF = { alexander: 'army', mahinda: 'walker', faxian: 'walker', xuanzang: 'walker', shankara: 'walker', ganga: 'army', somnath: 'army', srivijaya: 'fleet', bakhtiyar: 'army', battuta: 'horse', daulatabad: 'crowd', babur: 'army', deccan: 'army', plassey: 'army', panipat: 'army', dandi: 'crowd', partition: 'crowd', gq: 'lorry' };
  // formations: a large leader with many small followers in two columns
  const FORM = { army: { lead: 'horse', n: 10, kinds: ['horse', 'soldier'], scale: 0.5 }, crowd: { lead: 'walker', n: 14, kinds: ['walker'], scale: 0.5 }, fleet: { lead: 'ship', n: 4, kinds: ['ship'], scale: 0.55 } };
  const TRAV = { horse: [42, 38, 0.9], walker: [24, 33, 0.95], ship: [38, 32, 0.78], lorry: [42, 28, 0.9] };
  let polyById = {};
  let polyMeta = {};
  let placeMarkers = [];
  let routeObjs = [];
  let routeAnims = [];

  // Muted palette: pull saturated source colours toward the parchment so fills read like washes.
  function hexToHsl(hex) {
    const n = parseInt(hex.slice(1), 16), r = ((n >> 16) & 255) / 255, g = ((n >> 8) & 255) / 255, b = (n & 255) / 255;
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b); let h = 0, sat = 0; const l = (mx + mn) / 2;
    if (mx !== mn) {
      const d = mx - mn; sat = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
      h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h *= 60;
    }
    return [h, sat, l];
  }
  function hslToHex(h, sat, l) {
    const c = (1 - Math.abs(2 * l - 1)) * sat, x = c * (1 - Math.abs(((h / 60) % 2) - 1)), m = l - c / 2;
    const [r, g, b] = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
    return '#' + [r, g, b].map((v) => Math.round((v + m) * 255).toString(16).padStart(2, '0')).join('');
  }
  const muteCache = {};
  function mute(hex, kind) {
    const key = hex + kind; if (muteCache[key]) return muteCache[key];
    const [h, sat, l] = hexToHsl(hex);
    const out = kind === 'line' ? hslToHex(h, Math.min(sat, 0.5) * 0.9, Math.min(l, 0.5) * 0.82)
      : kind === 'band' ? hslToHex(h, Math.min(sat, 0.55) * 0.8, 0.36)
      : hslToHex(h, Math.min(sat, 0.62) * 0.8, Math.min(0.62, l * 0.92 + 0.06));
    return (muteCache[key] = out);
  }

  // fade a polygon in with requestAnimationFrame (reliable across browsers, unlike SVG attribute transitions)
  function fadeIn(poly, fillTo, lineTo) {
    if (REDUCE) { poly.setStyle({ fillOpacity: fillTo, opacity: lineTo }); return; }
    const t0 = performance.now(), D = 520;
    (function step(now) {
      const k = Math.min(1, (now - t0) / D), e = 1 - Math.pow(1 - k, 3);
      if (!poly._map) return;
      poly.setStyle({ fillOpacity: fillTo * e, opacity: lineTo * e });
      if (k < 1) requestAnimationFrame(step);
    })(t0);
  }

  function formatYear(e) { return pick(e, 'yearLabel'); }
  function datingPills(e) {
    if (e.year < 0) return '<span class="pill soft">' + t().calBce + '</span>';
    const vs = e.year + 57, sk = e.year - 78;
    return '<span class="pill">' + t().vs + ' ' + vs + '</span>' + (sk > 0 ? '<span class="pill soft">' + t().saka + ' ' + sk + '</span>' : '');
  }
  function area(b) { return Math.abs((b.getNorth() - b.getSouth()) * (b.getEast() - b.getWest())); }
  function haversine(a, b) {
    const R = 6371, rad = Math.PI / 180;
    const dLat = (b[0] - a[0]) * rad, dLon = (b[1] - a[1]) * rad;
    const x = Math.sin(dLat / 2) ** 2 + Math.cos(a[0] * rad) * Math.cos(b[0] * rad) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(x));
  }
  const padTL = () => [24, 70];
  const padBR = () => [24, window.innerWidth > 800 ? 40 : 230];

  // ---- animated routes ----
  function clearRoutes() {
    routeAnims.forEach((a) => a.stop());
    routeAnims = []; routeObjs = []; routeLayer.clearLayers();
  }
  function makeRoute(r, layer, opts) {
    opts = opts || {};
    L.polyline(r.pts, { color: '#f6efdc', weight: 6.5, opacity: 0.6, lineCap: 'round', interactive: false }).addTo(layer);
    const full = L.polyline(r.pts, { color: r.color, weight: 2.6, opacity: 0.75, className: 'route-full' }).addTo(layer);
    full.bindTooltip(pick(r, 'n'), { sticky: true, className: 'plabel' });
    full.on('click', (ev) => L.popup().setLatLng(ev.latlng).setContent('<b>' + escapeHtml(pick(r, 'n')) + '</b><br>' + escapeHtml(pick(r, 'note'))).openOn(map));
    const trail = L.polyline([r.pts[0]], { color: r.color, weight: 3.4, opacity: 0.95, lineCap: 'round', dashArray: '1 7', interactive: false }).addTo(layer);
    const mode0 = r.mode || MODE_OF[r.id] || 'horse', form = FORM[mode0], mode = form ? form.lead : mode0, tv = TRAV[mode] || TRAV.horse;
    const trav = L.marker(r.pts[0], { icon: L.divIcon({ className: 'traveler ' + mode, html: '<span class="tv">' + atlasIcon(mode) + '</span>', iconSize: [tv[0], tv[1]], iconAnchor: [tv[0] / 2, tv[1] * tv[2]] }), interactive: false, keyboard: false, zIndexOffset: 500 }).addTo(layer);
    let facing = 1;
    trav.bindTooltip('', { permanent: true, direction: 'top', offset: [0, -Math.round(tv[1] * tv[2]) - 2], className: 'trav-label', opacity: 1 });
    const shortName = pick(r, 'n').replace(/\s*\([^)]*\)/g, '').trim();
    const setLabel = (ll) => trav.setTooltipContent('<b>' + escapeHtml(shortName) + '</b>');
    setLabel(r.pts[0]);
    const cum = [0];
    for (let i = 1; i < r.pts.length; i++) cum.push(cum[i - 1] + haversine(r.pts[i - 1], r.pts[i]));
    const total = cum[cum.length - 1];
    const dur = Math.min(16, Math.max(5, total / 350)) * 1000, hold = 1600;
    // followers trail behind the leader in a double column
    const followers = [];
    if (form && !REDUCE) {
      for (let i = 0; i < form.n; i++) {
        const kind = form.kinds[i % form.kinds.length], base = TRAV[kind] || TRAV.horse, w = Math.round(base[0] * form.scale), h = Math.round(base[1] * form.scale);
        const m = L.marker(r.pts[0], { icon: L.divIcon({ className: 'traveler follower ' + kind, html: '<span class="tv" style="animation-delay:' + ((i * 0.13) % 0.6).toFixed(2) + 's">' + atlasIcon(kind) + '</span>', iconSize: [w, h], iconAnchor: [w / 2, h * base[2]] }), interactive: false, keyboard: false, zIndexOffset: 400 }).addTo(layer);
        m._hide = true; if (m.getElement()) m.getElement().style.display = 'none';
        followers.push({ m, row: Math.floor(i / 2) + 1, side: i % 2 ? 1 : -1, facing: 1 });
      }
    }
    function at(d) { // position on the line after travelling d km
      d = Math.max(0, Math.min(total, d));
      let k = 1; while (k < cum.length - 1 && cum[k] < d) k++;
      const seg = (d - cum[k - 1]) / Math.max(1e-6, cum[k] - cum[k - 1]);
      return { k, ll: [r.pts[k - 1][0] + (r.pts[k][0] - r.pts[k - 1][0]) * seg, r.pts[k - 1][1] + (r.pts[k][1] - r.pts[k - 1][1]) * seg], east: r.pts[k][1] >= r.pts[k - 1][1] };
    }
    function placeFollowers(d) {
      const z = map.getZoom(), mpp = (156543.03 * Math.cos((r.pts[0][0] * Math.PI) / 180)) / Math.pow(2, z), gapKm = Math.max(6, (22 * mpp) / 1000);
      followers.forEach((f) => {
        const dd = d - f.row * gapKm, el = f.m.getElement();
        if (dd <= 0) { if (el) el.style.display = 'none'; return; }
        const a = at(dd), b = at(Math.min(total, dd + gapKm * 0.4));
        const pa = map.latLngToContainerPoint(a.ll), pb = map.latLngToContainerPoint(b.ll);
        let dx = pb.x - pa.x, dy = pb.y - pa.y; const len = Math.hypot(dx, dy) || 1; dx /= len; dy /= len;
        const off = 10 * f.side, pos = map.containerPointToLatLng(L.point(pa.x - dy * off, pa.y + dx * off));
        f.m.setLatLng(pos);
        if (el) { el.style.display = ''; if ((a.east ? 1 : -1) !== f.facing) { f.facing = a.east ? 1 : -1; el.classList.toggle('flip', f.facing < 0); } }
      });
    }
    let t0 = null, raf = 0, dead = false;
    if (REDUCE) { trail.setLatLngs(r.pts); trav.setLatLng(r.pts[r.pts.length - 1]); setLabel(r.pts[r.pts.length - 1]); return { full, stop: () => {} }; }
    function frame(ts) {
      if (dead) return;
      if (t0 === null) t0 = ts;
      const el = (ts - t0) % (dur + hold);
      const p = Math.min(1, el / dur), d = p * total;
      let k = 1; while (k < cum.length - 1 && cum[k] < d) k++;
      const seg = (d - cum[k - 1]) / Math.max(1e-6, cum[k] - cum[k - 1]);
      const pos = [r.pts[k - 1][0] + (r.pts[k][0] - r.pts[k - 1][0]) * seg, r.pts[k - 1][1] + (r.pts[k][1] - r.pts[k - 1][1]) * seg];
      trail.setLatLngs(r.pts.slice(0, k).concat([pos]));
      trav.setLatLng(pos);
      if (followers.length) placeFollowers(d);
      const dir = r.pts[k][1] >= r.pts[k - 1][1] ? 1 : -1;
      if (dir !== facing) { facing = dir; const el = trav.getElement(); if (el) el.classList.toggle('flip', dir < 0); }
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    return { full, stop: () => { dead = true; cancelAnimationFrame(raf); } };
  }
  function drawRoute(r) {
    const o = makeRoute(r, routeLayer);
    routeAnims.push({ stop: o.stop });
    routeObjs.push({ r, full: o.full });
  }
  function focusRoute(i) {
    const o = routeObjs[i]; if (!o) return;
    map.fitBounds(o.full.getBounds(), { paddingTopLeft: padTL(), paddingBottomRight: padBR(), maxZoom: 8 });
    const mid = o.r.pts[Math.floor(o.r.pts.length / 2)];
    L.popup({ autoPan: false }).setLatLng(mid).setContent('<b>' + escapeHtml(pick(o.r, 'n')) + '</b><br>' + escapeHtml(pick(o.r, 'note'))).openOn(map);
  }

  // keep tall popups clear of the floating search/ribbon and the dock: pan with padding and scroll inside if needed
  const POP = { maxWidth: 290, minWidth: 230, maxHeight: Math.max(240, Math.round(window.innerHeight - 340)), autoPanPaddingTopLeft: [24, 92], autoPanPaddingBottomRight: [24, 70] };
  const wikiSlot = (n, h, x) => '<div class="wk-slot" data-n="' + escapeHtml(n || '') + '" data-h="' + escapeHtml(h || '') + '"' + (x ? ' data-w="' + escapeHtml(x.w || '') + '" data-et="' + escapeHtml(x.et || '') + '" data-ht="' + escapeHtml(x.ht || '') + '"' : '') + '></div>';
  function traceBtn(ll) { return '<br><button class="trace-btn" data-lat="' + ll[0] + '" data-lon="' + ll[1] + '">' + t().traceBtn + '</button>'; }

  // ---- render ----
  function render() {
    const e = ERAS[state.i];
    const ps = polities(e);
    document.title = pick(e, 'name') + ' — ' + t().title;
    ghostLayer.clearLayers(); polityLayer.clearLayers(); eventLayer.clearLayers(); placeLayer.clearLayers(); clearRoutes();
    polyById = {}; polyMeta = {}; state.realm = null; placeMarkers = [];

    if (state.i > 0) {
      polities(ERAS[state.i - 1]).forEach((p) => {
        L.polygon(p.polys, { color: '#4b3b28', weight: 1.1, dashArray: '5 5', fill: false, interactive: false, className: 'ghost' }).addTo(ghostLayer);
      });
    }
    const sized = ps.map((p, i) => ({ p, i, a: area(L.polygon(p.polys).getBounds()) })).sort((x, y) => y.a - x.a);
    const topN = new Set(sized.slice(0, ps.length <= 4 ? ps.length : 4).map((o) => o.i));
    const maxA = sized.length ? sized[0].a : 1;
    sized.forEach(({ p, i, a }) => {
      const base = p.approx ? 0.2 : 0.52, line = mute(p.color, 'line');
      if (!p.approx) { // soft coloured halo along the border, like a hand-tinted outline
        const halo = L.polygon(p.polys, { color: mute(p.color, 'fill'), weight: 10, opacity: 0, fill: false, lineJoin: 'round', interactive: false }).addTo(polityLayer);
        fadeIn(halo, 0, 0.26);
      }
      const poly = L.polygon(p.polys, {
        color: line, weight: p.approx ? 1.3 : 1.6, fillColor: mute(p.color, 'fill'), fillOpacity: 0, opacity: 0,
        dashArray: p.approx ? '6 4' : null, lineJoin: 'round', className: 'polity'
      }).addTo(polityLayer);
      polyMeta[i] = { poly, base, line, p };
      fadeIn(poly, base, 0.95);
      poly.on('mouseover', () => { if (state.realm == null || state.realm === i) poly.setStyle({ fillOpacity: Math.min(0.85, base + 0.2), weight: 2.6 }); });
      poly.on('mouseout', () => restyleRealms());
      poly.on('click', (ev) => {
        if ($('btnTrace') && $('btnTrace').classList.contains('on')) return; // let trace mode take the click
        L.DomEvent.stopPropagation(ev); selectRealm(i);
      });
      const r = a / maxA, size = r >= 0.55 ? 'rl-lg' : r >= 0.2 ? 'rl-md' : 'rl-sm';
      poly.bindTooltip(pick(p, 'name'), { permanent: topN.has(i), sticky: !topN.has(i), direction: 'center', className: 'plabel realm ' + size });
      polyById[i] = poly;
    });

    routesOf(e).forEach(drawRoute);

    if (!state.quiz) {
      e.places.forEach((pl) => {
        const kind = KIND[pl.k] ? pl.k : 'city';
        const m = L.marker(pl.ll, { icon: symIcon(kind, KIND[kind]), dcPrio: kind === 'capital' ? 1 : 2, zIndexOffset: 200 })
          .bindPopup('<b>' + escapeHtml(pick(pl, 'n')) + '</b>' + escapeHtml(pick(pl, 'note') || '') + wikiSlot(pl.n, pl.nHi) + traceBtn(pl.ll), POP);
        m.options.label = pick(pl, 'n');
        placeMarkers.push({ m, kind });
      });
      applyPlaceLOD();
      e.events.forEach((ev) => {
        // a place drawn under an event seal is folded into the seal's popup, so nothing becomes unreachable
        const also = e.places.filter((pl) => Math.abs(pl.ll[0] - ev.ll[0]) < 0.09 && Math.abs(pl.ll[1] - ev.ll[1]) < 0.09).map((pl) => '<div class="also"><b>' + escapeHtml(pick(pl, 'n')) + '</b> ' + escapeHtml(pick(pl, 'note') || '') + '</div>').join('');
        L.marker(ev.ll, { icon: symIcon('seal', 28), zIndexOffset: 300, dcPrio: 0 })
          .bindPopup((window.ATLAS_LM ? window.ATLAS_LM.plate(ev.title) : '') + '<b>' + pick(ev, 'title') + '</b><i>' + pick(ev, 'label') + ' · ' + pick(ev, 'place') + '</i><br>' + pick(ev, 'text') + also + wikiSlot(ev.place, ev.placeHi, { w: (window.ATLAS_EVENT_WIKI || {})[ev.title], et: ev.title, ht: ev.titleHi }) + traceBtn(ev.ll), POP)
          .addTo(eventLayer);
      });
    }
    if (!state.quiz) { // very small wars beside their event seals
      (window.ATLAS_BATTLES || []).forEach((b) => {
        const ev = e.events.find((v) => v.title === b.ev); if (!ev) return;
        const win = b.w === 0 ? b.a : b.b, lose = b.w === 0 ? b.b : b.a;
        const line = hi() ? pick(win, 'n') + ' ने ' + pick(lose, 'n') + ' को हराया' : pick(win, 'n') + ' defeated ' + pick(lose, 'n');
        L.marker(ev.ll, { icon: L.divIcon({ className: 'bt', html: atlasBattle(b.a.c, b.b.c, b.w), iconSize: [76, 46], iconAnchor: [-21, 44] }), zIndexOffset: 250, dcPrio: 0.5 })
          .bindPopup('<b>' + escapeHtml(pick(ev, 'title')) + '</b><div class="war"><span style="color:' + b.a.c + '">' + escapeHtml(pick(b.a, 'n')) + '</span> <em>' + (hi() ? 'बनाम' : 'vs') + '</em> <span style="color:' + b.b.c + '">' + escapeHtml(pick(b.b, 'n')) + '</span></div><div class="victor">' + (hi() ? 'विजेता: ' : 'Victor: ') + '<strong>' + escapeHtml(pick(win, 'n')) + '</strong></div>' + escapeHtml((hi() ? b.noteHi : b.note) || ''), POP)
          .bindTooltip(line, { direction: 'top', className: 'plabel place', offset: [0, -4] })
          .addTo(eventLayer);
      });
    }
    const ct = $('cartouche'); ct.style.display = state.quiz ? 'none' : '';
    ct.innerHTML = '<div class="ct-year">' + escapeHtml(formatYear(e)) + '</div>';
    $('yearBig').innerHTML = '<span class="y">' + escapeHtml(formatYear(e)) + '</span><span class="n">' + escapeHtml(pick(e, 'name')) + '</span>';
    renderPanel(e);
    renderLegend(e);
    renderTimeline();
    try { history.replaceState(null, '', '#era=' + state.i + '&lang=' + state.lang); } catch (_) {}
    document.dispatchEvent(new CustomEvent('atlas:render', { detail: { i: state.i } }));
  }

  // Few symbols when zoomed out (capitals only), more as you zoom in; labels follow the same rule.
  function applyPlaceLOD() {
    const z = map.getZoom();
    placeMarkers.forEach(({ m, kind }) => {
      const showIcon = kind === 'capital' || z >= 5.5;
      const showLabel = kind === 'capital' ? z >= 5.1 : z >= 6.3;
      if (showIcon && !placeLayer.hasLayer(m)) placeLayer.addLayer(m);
      if (!showIcon && placeLayer.hasLayer(m)) placeLayer.removeLayer(m);
      m.unbindTooltip();
      if (showIcon && showLabel && m.options.label) m.bindTooltip(m.options.label, { permanent: true, direction: 'right', offset: [2, 0], className: 'plabel place' });
    });
  }
  map.on('zoomend', applyPlaceLOD);

  // ---- realm selection (click a kingdom) ----
  function restyleRealms() {
    const sel = state.realm;
    Object.keys(polyMeta).forEach((k) => {
      const { poly, base, p } = polyMeta[k], on = sel === +k, dim = sel != null && !on;
      poly.setStyle({ fillOpacity: on ? Math.min(0.78, base + 0.2) : dim ? base * 0.3 : base, opacity: dim ? 0.5 : 0.95, weight: on ? 3.2 : (p.approx ? 1.3 : 1.6) });
      if (on) poly.bringToFront();
    });
  }
  function selectRealm(i, opts) {
    if (!polyMeta[i]) return;
    state.realm = i; restyleRealms();
    map.closePopup();
    document.dispatchEvent(new CustomEvent('atlas:realm', { detail: { i, fit: !(opts && opts.nofit) } }));
  }
  function clearRealm() {
    if (state.realm == null) return;
    state.realm = null; restyleRealms();
    document.dispatchEvent(new CustomEvent('atlas:realm', { detail: { i: null } }));
  }
  map.on('click', () => { if (state.realm != null && !state.quiz) clearRealm(); });

  function renderLegend(e) {
    const lg = $('legend');
    if (state.quiz || tour.on) { lg.hidden = true; return; }
    lg.hidden = false;
    const ps = polities(e);
    lg.classList.toggle('collapsed', !state.legendOpen);
    let h = '<button class="lg-head" type="button" aria-expanded="' + state.legendOpen + '"><span class="lg-title">' + t().realms + ' · ' + ps.length + '</span><span class="lg-caret" aria-hidden="true">' + (state.legendOpen ? '▾' : '▸') + '</span></button><div class="lg-body">';
    h += '<ul class="lg-list">' + ps.map((p, i) => '<li data-p="' + i + '" tabindex="0"><span class="chip" style="background:' + mute(p.color, 'fill') + (p.approx ? ';opacity:.6' : '') + '"></span>' + escapeHtml(pick(p, 'name')) + (p.approx ? ' ◌' : '') + '</li>').join('') + '</ul>';
    if (ps.some((p) => p.approx)) h += '<p class="lg-note">' + t().approx + '</p>';
    h += '</div>';
    lg.innerHTML = h;
    lg.querySelector('.lg-head').addEventListener('click', () => { state.legendOpen = !state.legendOpen; renderLegend(ERAS[state.i]); });
    lg.querySelectorAll('.lg-list li').forEach((li) => {
      const go2 = () => selectRealm(+li.dataset.p);
      li.addEventListener('click', go2);
      li.addEventListener('keydown', (ev) => { if (ev.key === 'Enter') go2(); });
    });
  }

  function renderPanel(e) {
    const panel = $('panel'), stage = $('stage'), hide = !!(state.quiz || tour.on || document.body.classList.contains('cinema'));
    if (stage.classList.contains('no-panel') !== hide) { stage.classList.toggle('no-panel', hide); setTimeout(() => map.invalidateSize({ animate: false }), 0); }
    if (hide) { panel.style.display = 'none'; return; }
    panel.style.display = '';
    const rs = routesOf(e);
    let h = '<div class="p-head"><h2>' + pick(e, 'name') + '</h2><div class="p-years">' + formatYear(e) + '</div></div>';
    h += '<div class="p-tags">' + datingPills(e) + '</div>';
    h += '<p class="p-tag">' + pick(e, 'tag') + '</p>';
    h += '<div class="p-tools"><button class="mini-btn" id="btnSpeak" type="button">' + t().listen + '</button></div>';
    if (e.story) h += '<p class="p-story">' + pick(e, 'story') + '</p>';
    h += '<h3>' + t().events + '</h3>';
    e.events.forEach((ev, idx) => {
      h += '<button class="ev" data-i="' + idx + '"><span class="yr">' + pick(ev, 'label') + '</span><span class="tx"><b>' + pick(ev, 'title') + '</b><span>' + pick(ev, 'place') + '</span></span></button>';
    });
    if (rs.length) {
      h += '<details class="sec"><summary>' + t().journeys + ' <em>' + rs.length + '</em></summary>';
      rs.forEach((r, i) => {
        h += '<button class="route" data-r="' + i + '"><span class="chip" style="background:' + mute(r.color, 'line') + '"></span><span class="tx"><b>' + escapeHtml(pick(r, 'n')) + '</b><span>' + escapeHtml(pick(r, 'note')) + '</span></span></button>';
      });
      h += '</details>';
    }
    h += '<details class="sec"><summary>' + t().rulers + '</summary><ul class="rulers">' + (hi() && e.rulersHi ? e.rulersHi : e.rulers).map((r) => '<li>' + r + '</li>').join('') + '</ul></details>';
    h += '<details class="sec"><summary>' + t().places + ' <em>' + e.places.length + '</em></summary><ul class="places">' + e.places.map((pl, i) =>
      '<li data-pl="' + i + '"><b>' + escapeHtml(pick(pl, 'n')) + '</b> — ' + escapeHtml(pick(pl, 'note') || '') + '</li>').join('') + '</ul></details>';
    h += '<div class="p-foot">' + t().disclaimer + '</div>';
    panel.innerHTML = h;
    panel.scrollTop = 0;
    $('btnSpeak').addEventListener('click', () => { speak(pick(e, 'name') + '. ' + pick(e, 'tag') + ' ' + (pick(e, 'story') || '')); });
    panel.querySelectorAll('.ev').forEach((b) => b.addEventListener('click', () => {
      const ev = e.events[+b.dataset.i];
      map.flyTo(ev.ll, 7, { duration: 0.8 });
      eventLayer.eachLayer((m) => { if (m.getLatLng().lat === ev.ll[0] && m.getLatLng().lng === ev.ll[1]) m.openPopup(); });
    }));
    panel.querySelectorAll('.route').forEach((b) => b.addEventListener('click', () => focusRoute(+b.dataset.r)));
    panel.querySelectorAll('.places li').forEach((li) => li.addEventListener('click', () => {
      const pl = e.places[+li.dataset.pl];
      map.flyTo(pl.ll, 8, { duration: 0.8 });
      placeMarkers.forEach(({ m }) => { if (m.getLatLng().lat === pl.ll[0] && m.getLatLng().lng === pl.ll[1]) { if (!placeLayer.hasLayer(m)) placeLayer.addLayer(m); m.openPopup(); } });
    }));
  }
  function focusPoly(i) {
    const poly = polyById[i]; if (!poly) return;
    map.fitBounds(poly.getBounds(), { paddingTopLeft: padTL(), paddingBottomRight: padBR(), maxZoom: 8 });
    if (poly.openTooltip) poly.openTooltip(poly.getBounds().getCenter());
  }

  // ---- timeline: proportional bands, coloured by each era's largest realm ----
  const eraColor = ERAS.map((e) => {
    let best = null, ba = -1;
    polities(e).forEach((p) => { const a = area(L.polygon(p.polys).getBounds()); if (a > ba && !p.approx) { ba = a; best = p; } });
    return best ? mute(best.color, 'band') : '#8a7a68';
  });
  function tlEdges() {
    const ys = ERAS.map((e) => e.year), n = ys.length, ed = [ys[0] - (ys[1] - ys[0]) / 2];
    for (let i = 1; i < n; i++) ed.push((ys[i - 1] + ys[i]) / 2);
    ed.push(ys[n - 1] + (ys[n - 1] - ys[n - 2]) / 2);
    return ed;
  }
  function yearText(y) { return y < 0 ? (-y) + (hi() ? ' ई.पू.' : ' BCE') : (y === 0 ? '0' : y + ''); }
  function renderTimeline() {
    const tl = $('timeline'), ed = tlEdges(), span = ed[ed.length - 1] - ed[0];
    const wpx = tl.getBoundingClientRect().width || 800;
    tl.innerHTML = '';
    ERAS.forEach((e, idx) => {
      const pct = ((ed[idx + 1] - ed[idx]) / span) * 100;
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'band' + (idx === state.i ? ' on' : idx < state.i ? ' past' : '');
      b.style.width = pct + '%'; b.style.background = eraColor[idx];
      b.title = formatYear(e) + ' — ' + pick(e, 'name');
      b.textContent = (pct / 100) * wpx >= 64 ? formatYear(e) : '';
      if (idx === state.i) b.setAttribute('aria-current', 'true');
      b.addEventListener('click', () => { if (idx !== state.i) { stopPlay(); if (tour.on) stopTour(); go(idx); } });
      tl.appendChild(b);
    });
    // axis ticks
    const axis = $('tlAxis'); axis.innerHTML = '';
    [-500, 0, 500, 1000, 1500, 2000].forEach((y) => {
      const sp = document.createElement('span'); sp.textContent = yearText(y); sp.style.left = (((y - ed[0]) / span) * 100) + '%'; axis.appendChild(sp);
    });
    // tooltip over the current band
    const tip = $('tlTip'), cur = ERAS[state.i];
    tip.textContent = formatYear(cur) + ' · ' + pick(cur, 'name');
    const wrap = tl.parentElement.getBoundingClientRect().width, tw = tip.offsetWidth || 160;
    const center = (((ed[state.i] + ed[state.i + 1]) / 2 - ed[0]) / span) * wrap;
    tip.style.left = Math.max(tw / 2, Math.min(wrap - tw / 2, center)) + 'px';
    $('yearBox').textContent = formatYear(cur);
  }
  // click-and-drag scrubbing across the bands
  (function () {
    const tl = $('timeline'); let down = false;
    function pick2(ev) {
      const r = tl.getBoundingClientRect(), ed = tlEdges(), span = ed[ed.length - 1] - ed[0];
      const y = ed[0] + Math.max(0, Math.min(1, (ev.clientX - r.left) / r.width)) * span;
      let idx = 0; while (idx < ERAS.length - 1 && y >= ed[idx + 1]) idx++;
      if (idx !== state.i) { stopPlay(); if (tour.on) stopTour(); if (state.quiz) endQuiz(); go(idx); }
    }
    tl.addEventListener('pointerdown', (ev) => { down = true; try { tl.setPointerCapture(ev.pointerId); } catch (_) {} pick2(ev); });
    tl.addEventListener('pointermove', (ev) => { if (down) pick2(ev); });
    tl.addEventListener('pointerup', () => { down = false; });
    tl.addEventListener('pointercancel', () => { down = false; });
    window.addEventListener('resize', () => renderTimeline());
  })();
  function go(i) { state.i = (i + ERAS.length) % ERAS.length; render(); }

  const ICON_PLAY = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.5v11l9-5.5z"/></svg>', ICON_PAUSE = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 2.5h3v11h-3zM9.5 2.5h3v11h-3z"/></svg>';
  function setPlayIcon() { const b = $('btnPlay'); b.innerHTML = state.playing ? ICON_PAUSE : ICON_PLAY; b.setAttribute('aria-label', state.playing ? t().pause : t().play); b.title = state.playing ? t().pause : t().play; }
  function stopPlay() { state.playing = false; clearInterval(state.timer); setPlayIcon(); }
  function togglePlay() {
    if (tour.on) stopTour();
    if (state.playing) return stopPlay();
    state.playing = true; setPlayIcon();
    state.timer = setInterval(() => { if (state.i >= ERAS.length - 1) return stopPlay(); go(state.i + 1); }, 3600);
  }

  // ---- narration (Web Speech API) ----
  const speech = { on: false };
  function speak(text) {
    if (window.ATLAS_VOICE) { if (text) window.ATLAS_VOICE.say(text); else window.ATLAS_VOICE.stop(); return; }
    try {
      if (!('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();
      if (!text) return;
      const u = new SpeechSynthesisUtterance(text);
      u.lang = hi() ? 'hi-IN' : 'en-IN'; u.rate = 0.95;
      window.speechSynthesis.speak(u);
    } catch (_) {}
  }
  function stopSpeak() { if (window.ATLAS_VOICE) { window.ATLAS_VOICE.stop(); return; } try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (_) {} }

  // ---- guided tour ----
  function buildSteps() {
    tour.steps = [];
    ERAS.forEach((e, i) => { tour.steps.push({ t: 'era', i }); e.events.forEach((_, k) => tour.steps.push({ t: 'ev', i, k })); });
  }
  function startTour() {
    stopPlay(); if (state.quiz) endQuiz();
    tour.on = true; tour.paused = false; tour.n = 0; buildSteps();
    $('btnTour').classList.add('on');
    state.i = 0; render(); showStep();
  }
  function stopTour() {
    clearTimeout(tour.timer); stopSpeak(); tour.on = false; tourLayer.clearLayers();
    $('tourBox').hidden = true; $('btnTour').classList.remove('on');
    map.closePopup(); render();
    goHome({ animate: false });
  }
  function schedule(ms) { clearTimeout(tour.timer); if (!tour.paused) tour.timer = setTimeout(() => { tour.n++; showStep(); }, ms); }
  function showStep() {
    const s = tour.steps[tour.n];
    if (!s) return stopTour();
    tourLayer.clearLayers(); map.closePopup();
    if (state.i !== s.i) { state.i = s.i; render(); } else { renderPanel(ERAS[s.i]); }
    const e = ERAS[s.i], box = $('tourBox');
    let head, body, ms;
    if (s.t === 'era') {
      head = formatYear(e) + ' · ' + pick(e, 'name'); body = pick(e, 'tag') + (hi() || !e.story ? '' : '');
      flyHome(1.4); ms = 5200;
    } else {
      const ev = e.events[s.k];
      head = pick(ev, 'label') + ' · ' + pick(ev, 'title'); body = pick(ev, 'text') + ' — ' + pick(ev, 'place');
      map.flyTo(ev.ll, 6.5, { duration: 1.6 });
      L.marker(ev.ll, { icon: L.divIcon({ className: 'pulse', html: '<span></span>', iconSize: [34, 34] }), interactive: false }).addTo(tourLayer);
      ms = 7800;
    }
    box.hidden = false;
    box.innerHTML = '<div class="q-meta">' + t().tourOf(tour.n + 1, tour.steps.length) + (s.t === 'era' ? ' · ' + t().tourEra : '') + '</div>' +
      '<h4>' + escapeHtml(head) + '</h4><p>' + escapeHtml(body) + '</p>' +
      '<div class="bar"><i style="animation-duration:' + ms + 'ms;' + (tour.paused ? 'animation-play-state:paused' : '') + '"></i></div>' +
      '<div class="row"><button id="tSpeak">' + (speech.on ? t().speakOn : t().speakOff) + '</button><button id="tPrev" aria-label="Previous">‹</button><button id="tPause">' + (tour.paused ? t().tourResume : t().tourPause) + '</button><button id="tNext" aria-label="Next">›</button><button id="tStop" class="on">' + t().tourStop + '</button></div>';
    $('tPrev').addEventListener('click', () => { tour.n = Math.max(0, tour.n - 1); showStep(); });
    $('tNext').addEventListener('click', () => { tour.n++; showStep(); });
    $('tStop').addEventListener('click', stopTour);
    $('tSpeak').addEventListener('click', () => { speech.on = !speech.on; $('tSpeak').textContent = speech.on ? t().speakOn : t().speakOff; if (speech.on) speak(head + '. ' + body); else stopSpeak(); });
    if (speech.on) speak(head + '. ' + body);
    $('tPause').addEventListener('click', () => { tour.paused = !tour.paused; if (tour.paused) clearTimeout(tour.timer); if (tour.paused) stopSpeak(); resumeStep(ms); });
    schedule(ms);
  }
  function resumeStep(ms) {
    const bar = document.querySelector('#tourBox .bar i');
    if (tour.paused) { if (bar) bar.style.animationPlayState = 'paused'; $('tPause').textContent = t().tourResume; }
    else { if (bar) bar.style.animationPlayState = 'running'; $('tPause').textContent = t().tourPause; schedule(ms * 0.6); }
  }

  // ---- search ----
  let index = [];
  function buildIndex() {
    index = [];
    ERAS.forEach((e, i) => {
      const yr = e.yearLabel;
      index.push({ k: 'kEra', i, o: e, f: 'name', ya: yr, hay: [e.name, e.nameHi, e.yearLabel, e.yearLabelHi].join(' ') });
      polities(e).forEach((p, pi) => index.push({ k: 'kRealm', i, o: p, f: 'name', pi, hay: [p.name, p.nameHi].join(' ') }));
      e.places.forEach((p) => index.push({ k: 'kPlace', i, o: p, f: 'n', ll: p.ll, hay: [p.n, p.nHi, p.note, p.noteHi].join(' ') }));
      e.events.forEach((v) => index.push({ k: 'kEvent', i, o: v, f: 'title', ll: v.ll, hay: [v.title, v.titleHi, v.text, v.textHi, v.place, v.placeHi, v.label].join(' ') }));
      routesOf(e).forEach((r, ri) => index.push({ k: 'kRoute', i, o: r, f: 'n', ri, hay: [r.n, r.nHi].join(' ') }));
    });
    index.forEach((x) => { x.hay = x.hay.toLowerCase(); });
  }
  function runSearch(q) {
    const box = $('results');
    q = q.trim().toLowerCase();
    if (!q) { box.hidden = true; box.innerHTML = ''; return; }
    const toks = q.split(/\s+/);
    const hits = index.filter((x) => toks.every((tk) => x.hay.indexOf(tk) >= 0));
    // prefer title matches, then realms/places
    hits.sort((a, b) => (+(b.hay.indexOf(q) >= 0)) - (+(a.hay.indexOf(q) >= 0)));
    const top = hits.slice(0, 12);
    box.innerHTML = top.length ? top.map((x, n) =>
      '<button data-n="' + n + '"><b>' + escapeHtml(pick(x.o, x.f)) + '</b><span>' + t()[x.k] + ' · ' + escapeHtml(pick(ERAS[x.i], 'yearLabel')) + '</span></button>').join('')
      : '<div class="none">' + t().none + '</div>';
    box.hidden = false;
    box.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => pickResult(top[+b.dataset.n])));
    box._top = top;
  }
  function pickResult(x) {
    $('results').hidden = true; $('search').value = '';
    stopPlay(); if (tour.on) stopTour(); if (state.quiz) endQuiz();
    go(x.i);
    if (x.ll) { map.flyTo(x.ll, 7, { duration: 0.9 }); }
    else if (x.pi !== undefined) focusPoly(x.pi);
    else if (x.ri !== undefined) focusRoute(x.ri);
  }
  $('search').addEventListener('input', (e) => runSearch(e.target.value));
  $('search').addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { $('results').hidden = true; e.target.blur(); }
    if (e.key === 'Enter') { const top = $('results')._top; if (top && top[0]) pickResult(top[0]); }
    e.stopPropagation();
  });
  document.addEventListener('click', (e) => { if (!e.target.closest('.search')) $('results').hidden = true; });

  // ---- quiz ----
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function startQuiz() {
    stopPlay(); if (tour.on) stopTour();
    const all = [];
    ERAS.forEach((e) => e.events.forEach((ev) => all.push({ ev, era: e })));
    state.quiz = { rounds: shuffle(all).slice(0, 5), r: 0, score: 0, answered: false };
    $('btnQuiz').classList.add('on'); $('btnQuiz').textContent = t().exitQuiz;
    ghostLayer.clearLayers(); polityLayer.clearLayers(); eventLayer.clearLayers(); placeLayer.clearLayers(); clearRoutes();
    renderPanel(ERAS[state.i]); renderLegend(ERAS[state.i]);
    goHome({ animate: false });
    quizRound();
  }
  function endQuiz() {
    state.quiz = null; quizLayer.clearLayers(); $('quizBox').hidden = true;
    $('btnQuiz').classList.remove('on'); $('btnQuiz').textContent = t().quiz;
    render();
  }
  function quizRound() {
    const q = state.quiz; quizLayer.clearLayers(); q.answered = false;
    const { ev, era } = q.rounds[q.r];
    const box = $('quizBox'); box.hidden = false;
    box.innerHTML = '<div class="q-meta">' + t().round(q.r + 1, q.rounds.length, q.score) + ' · ' + t().era + ': ' + pick(era, 'name') + ' (' + formatYear(era) + ')</div>' +
      '<p>' + pick(ev, 'clue') + '</p><p class="hint">' + t().clueHint + '</p>';
  }
  map.on('click', (me) => {
    const q = state.quiz; if (!q || q.answered) return;
    q.answered = true;
    const { ev } = q.rounds[q.r];
    const d = haversine([me.latlng.lat, me.latlng.lng], ev.ll);
    const pts = Math.round(1000 * Math.exp(-d / 500));
    q.score += pts;
    L.circleMarker(me.latlng, { radius: 7, color: '#fff', weight: 2, fillColor: '#2563eb', fillOpacity: 1 }).addTo(quizLayer);
    L.circleMarker(ev.ll, { radius: 8, color: '#fff', weight: 2, fillColor: '#15803d', fillOpacity: 1 }).addTo(quizLayer)
      .bindTooltip(pick(ev, 'place'), { permanent: true, direction: 'top' });
    L.polyline([[me.latlng.lat, me.latlng.lng], ev.ll], { color: '#2a1f14', weight: 2, dashArray: '4 4' }).addTo(quizLayer);
    const last = q.r === q.rounds.length - 1;
    const box = $('quizBox');
    box.innerHTML = '<div class="q-meta">' + t().result(d, pts) + '</div><p><b>' + pick(ev, 'title') + '</b> — ' + pick(ev, 'place') + '<br>' + pick(ev, 'text') + '</p>' +
      '<div class="row"><button id="qNext" class="on">' + (last ? t().finish : t().next) + '</button></div>';
    $('qNext').addEventListener('click', () => {
      if (last) {
        box.innerHTML = '<div class="q-meta">' + t().final(q.score, q.rounds.length * 1000) + '</div>' +
          '<div class="row"><button id="qAgain">' + t().again + '</button><button id="qExit">' + t().exitQuiz + '</button></div>';
        $('qAgain').addEventListener('click', startQuiz); $('qExit').addEventListener('click', endQuiz);
      } else { q.r++; quizRound(); }
    });
  });

  // ---- chrome ----
  function toast(msg) {
    const el = $('toast'); el.textContent = msg; el.classList.add('show');
    clearTimeout(toast._t); toast._t = setTimeout(() => el.classList.remove('show'), 1800);
  }
  function applyLang() {
    document.documentElement.lang = state.lang;
    $('title').textContent = t().title; $('subtitle').textContent = t().subtitle;
    $('btnLang').textContent = t().lang;
    setPlayIcon();
    $('moreLabel').textContent = t().moreLabel; $('btnReset').textContent = t().reset;
    $('btnQuiz').textContent = state.quiz ? t().exitQuiz : t().quiz;
    $('btnTour').textContent = t().tour; $('btnShare').textContent = t().share;
    $('search').placeholder = t().search;
    $('disclaimer').textContent = t().disclaimer;
    setSeaLabels();
    document.dispatchEvent(new CustomEvent('atlas:lang', { detail: { lang: state.lang } }));
  }

  $('btnPlay').addEventListener('click', () => { if (state.quiz) return; togglePlay(); });
  $('btnPrev').addEventListener('click', () => { stopPlay(); if (tour.on) stopTour(); if (state.quiz) endQuiz(); go(Math.max(0, state.i - 1)); });
  $('btnNext').addEventListener('click', () => { stopPlay(); if (tour.on) stopTour(); if (state.quiz) endQuiz(); go(Math.min(ERAS.length - 1, state.i + 1)); });
  $('btnReset').addEventListener('click', () => flyHome(0.8));
  $('btnTour').addEventListener('click', () => (tour.on ? stopTour() : startTour()));
  $('btnQuiz').addEventListener('click', () => (state.quiz ? endQuiz() : startQuiz()));
  $('btnShare').addEventListener('click', () => {
    const url = location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(() => toast(t().copied), () => toast(url));
    else toast(url);
  });
  $('btnLang').addEventListener('click', () => {
    state.lang = hi() ? 'en' : 'hi'; applyLang(); buildIndex();
    if (state.quiz) { quizLayer.clearLayers(); quizRound(); }
    else if (tour.on) { render(); showStep(); }
    else render();
  });
  document.addEventListener('keydown', (e) => {
    if (state.quiz) return;
    if (tour.on) { if (e.key === 'ArrowRight') { tour.n++; showStep(); } if (e.key === 'ArrowLeft') { tour.n = Math.max(0, tour.n - 1); showStep(); } if (e.key === 'Escape') stopTour(); return; }
    if (e.key === 'ArrowRight') { stopPlay(); go(state.i + 1); }
    if (e.key === 'ArrowLeft') { stopPlay(); go(state.i - 1); }
    if (e.key === '/') { e.preventDefault(); $('search').focus(); }
  });

  window.ATLAS_APP = {
    map, state, tour, ERAS, GEO, polities, pick, t, hi, escapeHtml, haversine, makeRoute, padTL, padBR, speak, stopSpeak, formatYear,
    go: (i) => { stopPlay(); if (tour.on) stopTour(); if (state.quiz) endQuiz(); go(i); },
    setLang: (l) => { if ((l === 'hi') !== hi()) $('btnLang').click(); },
    startTour: () => { if (!tour.on) startTour(); }, stopTour: () => { if (tour.on) stopTour(); },
    search: (q) => { runSearch(q); return ($('results')._top || []).map((x) => ({ kind: x.k, era: x.i, name: x.o[x.f] })); },
    mute, traceBtn, wikiSlot, POP, selectRealm, clearRealm, focusPoly, getPoly: (i) => polyById[i], realm: () => state.realm,
    toast, stopPlay, renderTimeline, isBusy: () => !!(state.quiz || tour.on)
  };

  // deep link: #era=3&lang=hi
  const m = /era=(\d+)/.exec(location.hash); if (m && +m[1] < ERAS.length) state.i = +m[1];
  if (/lang=hi/.test(location.hash)) state.lang = 'hi';
  applyLang(); buildIndex(); render();
  if (/[?&#]tour=1/.test(window.ATLAS_INITIAL_URL)) startTour();
})();
