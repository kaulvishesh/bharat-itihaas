/*
 * Then & Now: a draggable curtain. Left of the line is the era you picked, on parchment; right of it is the
 * same ground today, as satellite imagery with modern borders and cities. Opens with a sweep so the gesture
 * teaches itself. Esc closes. Keyboard: focus the handle and use ← → Home End.
 */
(function () {
  'use strict';
  const A = window.ATLAS_APP;
  if (!A) return;
  const { map, ERAS, pick, hi, escapeHtml } = A;
  const $ = (id) => document.getElementById(id);
  const REDUCE = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const wrap = $('map-wrap'), menu = $('moreMenu');

  const NOW = ERAS.find((e) => e.geo === '2010') || ERAS[ERAS.length - 1];
  const LABELS = { India: [22.8, 79.4], Pakistan: [29.6, 69.6], Bangladesh: [23.9, 90.1], Nepal: [28.5, 83.9], Bhutan: [27.45, 90.45], 'Sri Lanka': [7.7, 80.75], Afghanistan: [33.6, 66.3] };
  const CITIES = [
    ['Delhi', 'दिल्ली', 28.61, 77.21], ['Mumbai', 'मुंबई', 19.07, 72.88], ['Kolkata', 'कोलकाता', 22.57, 88.36], ['Chennai', 'चेन्नई', 13.08, 80.27],
    ['Bengaluru', 'बेंगलुरु', 12.97, 77.59], ['Hyderabad', 'हैदराबाद', 17.39, 78.49], ['Dhaka', 'ढाका', 23.81, 90.41], ['Karachi', 'कराची', 24.86, 67.01],
    ['Lahore', 'लाहौर', 31.55, 74.34], ['Kathmandu', 'काठमांडू', 27.72, 85.32], ['Colombo', 'कोलंबो', 6.93, 79.86], ['Islamabad', 'इस्लामाबाद', 33.68, 73.05]
  ];
  const TX = {
    en: { btn: 'Then & Now', then: 'Then', now: 'Today', close: 'Close', drag: 'Drag to compare', hint: 'Drag the line to compare', slider: 'Compare the era with today' },
    hi: { btn: 'तब और अब', then: 'तब', now: 'आज', close: 'बंद करें', drag: 'तुलना के लिए खींचें', hint: 'तुलना के लिए रेखा खींचें', slider: 'युग की आज से तुलना' }
  };
  const T = () => TX[hi() ? 'hi' : 'en'];

  // ---- the "today" layers live in their own pane so a single clip rectangle can hide them left of the line ----
  const pane = map.createPane('nowPane'); pane.style.zIndex = 640; pane.style.pointerEvents = 'none';
  const tiles = ATLAS_TERRAIN.imagery({ pane: 'nowPane' });
  const renderer = L.svg({ pane: 'nowPane', padding: 0.6 });
  const group = L.layerGroup();
  let labelMarkers = [];
  function buildNow() {
    group.clearLayers(); labelMarkers = [];
    A.polities(NOW).forEach((p) => {
      group.addLayer(L.polygon(p.polys, { renderer, pane: 'nowPane', color: '#fff3c4', weight: 1.8, opacity: 0.95, fill: false, dashArray: '7 5', lineJoin: 'round', interactive: false }));
      const ll = LABELS[p.name] || L.polygon(p.polys).getBounds().getCenter();
      const m = L.marker(ll, { pane: 'nowPane', interactive: false, keyboard: false, icon: L.divIcon({ className: 'now-label country', html: '<span>' + escapeHtml(pick(p, 'name')) + '</span>', iconSize: [0, 0] }) });
      group.addLayer(m); labelMarkers.push([m, p]);
    });
    CITIES.forEach((c) => {
      const m = L.marker([c[2], c[3]], { pane: 'nowPane', interactive: false, keyboard: false, icon: L.divIcon({ className: 'now-label city', html: '<i></i><span>' + escapeHtml(hi() ? c[1] : c[0]) + '</span>', iconSize: [0, 0] }) });
      group.addLayer(m); labelMarkers.push([m, null, c]);
    });
  }
  function relabel() {
    labelMarkers.forEach(([m, p, c]) => m.setIcon(L.divIcon(p ? { className: 'now-label country', html: '<span>' + escapeHtml(pick(p, 'name')) + '</span>', iconSize: [0, 0] } : { className: 'now-label city', html: '<i></i><span>' + escapeHtml(hi() ? c[1] : c[0]) + '</span>', iconSize: [0, 0] })));
  }

  // ---- the curtain ----
  const sw = document.createElement('div'); sw.id = 'swipe'; sw.className = 'swipe'; sw.hidden = true;
  sw.innerHTML = '<div class="sw-line"></div><div class="sw-hit"></div><div class="sw-grip" role="slider" tabindex="0" aria-valuemin="0" aria-valuemax="100"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 6l-6 6 6 6M16 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></div>' +
    '<div class="sw-tag then"></div><div class="sw-tag now"></div><button type="button" class="sw-x"></button>';
  wrap.appendChild(sw);
  const grip = sw.querySelector('.sw-grip'), hit = sw.querySelector('.sw-hit'), tThen = sw.querySelector('.sw-tag.then'), tNow = sw.querySelector('.sw-tag.now'), xbtn = sw.querySelector('.sw-x');
  let on = false, frac = 0.5, anim = 0;

  function clip() {
    if (!on) return;
    const sz = map.getSize(), nw = map.containerPointToLayerPoint([0, 0]), se = map.containerPointToLayerPoint(sz), cx = nw.x + frac * sz.x;
    pane.style.clip = 'rect(' + nw.y + 'px,' + (se.x + 2) + 'px,' + (se.y + 2) + 'px,' + cx + 'px)';
  }
  function place() {
    const x = frac * map.getSize().x;
    sw.style.setProperty('--x', x + 'px');
    grip.setAttribute('aria-valuenow', String(Math.round(frac * 100)));
    clip();
  }
  function setFrac(v) { frac = Math.min(0.97, Math.max(0.03, v)); place(); }
  function labels() {
    const e = ERAS[A.state.i], t = T();
    tThen.innerHTML = '<small>' + escapeHtml(t.then) + '</small><b>' + escapeHtml(pick(e, 'yearLabel')) + '</b>';
    tNow.innerHTML = '<small>' + escapeHtml(t.now) + '</small><b>' + escapeHtml(pick(NOW, 'yearLabel')) + '</b>';
    xbtn.textContent = '✕ ' + t.close; grip.setAttribute('aria-label', t.slider); grip.title = t.drag;
  }

  let dragging = false;
  const fromEvent = (ev) => { const r = wrap.getBoundingClientRect(); setFrac((ev.clientX - r.left) / r.width); };
  hit.addEventListener('pointerdown', (ev) => { dragging = true; cancelAnimationFrame(anim); sw.classList.add('drag'); try { hit.setPointerCapture(ev.pointerId); } catch (_) { /* ok */ } fromEvent(ev); ev.preventDefault(); });
  hit.addEventListener('pointermove', (ev) => { if (dragging) fromEvent(ev); });
  const end = () => { dragging = false; sw.classList.remove('drag'); };
  hit.addEventListener('pointerup', end); hit.addEventListener('pointercancel', end);
  grip.addEventListener('keydown', (ev) => {
    const k = ev.key, step = ev.shiftKey ? 0.1 : 0.03;
    if (k === 'ArrowLeft') setFrac(frac - step); else if (k === 'ArrowRight') setFrac(frac + step);
    else if (k === 'Home') setFrac(0.03); else if (k === 'End') setFrac(0.97); else return;
    ev.preventDefault(); ev.stopPropagation();
  });
  xbtn.addEventListener('click', () => off());

  function sweep(from, to, ms) {
    cancelAnimationFrame(anim);
    if (REDUCE) { setFrac(to); return; }
    const t0 = performance.now();
    (function step(now) {
      const k = Math.min(1, (now - t0) / ms), e = 1 - Math.pow(1 - k, 3);
      setFrac(from + (to - from) * e);
      if (k < 1 && !dragging) anim = requestAnimationFrame(step);
    })(t0);
  }

  function turnOn() {
    if (on) return;
    if (A.state.quiz) { const bq = $('btnQuiz'); if (bq) bq.click(); }
    if (window.ATLAS_JOURNEYS && window.ATLAS_JOURNEYS.state().on) return;
    on = true; buildNow(); tiles.addTo(map); group.addTo(map);
    document.body.classList.add('now-on'); sw.hidden = false;
    $('btnNow').classList.add('on'); labels(); frac = 0.985; place();
    map.on('move zoom viewreset resize', place);
    sweep(0.985, 0.5, 1500);
    A.toast(T().hint);
  }
  function off() {
    if (!on) return;
    on = false; cancelAnimationFrame(anim);
    map.off('move zoom viewreset resize', place);
    map.removeLayer(tiles); map.removeLayer(group); pane.style.clip = '';
    document.body.classList.remove('now-on'); sw.hidden = true; $('btnNow').classList.remove('on');
  }

  // ---- menu entry ----
  const btn = document.createElement('button'); btn.id = 'btnNow'; btn.type = 'button'; btn.textContent = T().btn;
  menu.insertBefore(btn, menu.firstChild);
  btn.addEventListener('click', () => (on ? off() : turnOn()));
  document.addEventListener('atlas:render', () => { if (on) labels(); });
  document.addEventListener('atlas:lang', () => { btn.textContent = T().btn; relabel(); if (on) labels(); });
  document.addEventListener('keydown', (e) => { if (on && e.key === 'Escape' && !document.body.classList.contains('cinema')) off(); });

  window.ATLAS_NOW = { on: turnOn, off, toggle: () => (on ? off() : turnOn()), isOn: () => on, set: (v) => setFrac(v) };
})();
