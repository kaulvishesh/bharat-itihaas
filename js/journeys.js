/*
 * Cinematic Journeys: short, directed stories told on the map. The camera flies between scenes, the era
 * changes underneath, the year rolls like a counter and a lower-third caption narrates (optionally aloud).
 * Each scene is either an existing event (looked up by title, so places and years always match the atlas)
 * or a whole-era view. English + Hindi throughout. Esc exits, ← → move, Space pauses.
 */
(function () {
  'use strict';
  const A = window.ATLAS_APP;
  if (!A) return;
  const { map, ERAS, pick, hi, escapeHtml } = A;
  const $ = (id) => document.getElementById(id);
  const REDUCE = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const BOUNDS = L.latLngBounds([[6, 67], [36.8, 97.5]]);

  // ---------------------------------------------------------------- content (js/journeys_data.js)
  const JOURNEYS = window.ATLAS_JOURNEY_DATA || [];

  const UI = {
    en: {
      name: 'Journeys', pick: 'Choose a journey', sub: 'Pick a story and sit back. The map does the rest.', full: 'The full tour', fullD: 'Every era and every event, in order.', allEras: (n) => 'All ' + n + ' eras', scenes: (n, m) => n + ' scenes · about ' + m + ' min',
      prev: 'Previous scene', next: 'Next scene', pause: 'Pause', resume: 'Resume', exit: 'Exit', narrate: 'Narrate aloud', fin: 'The journey ends', finD: 'Pick another journey, or take the map into your own hands.',
      replay: 'Replay', more: 'More journeys', explore: 'Explore the map', close: 'Close', of: (n, m) => n + ' / ' + m, bce: 'BCE', ce: 'CE', lang: 'हिन्दी', hint: 'Paused. Drag and zoom the map freely.'
    },
    hi: {
      name: 'यात्राएँ', pick: 'एक यात्रा चुनें', sub: 'एक कहानी चुनें और आराम से बैठें। नक़्शा बाक़ी सब करेगा।', full: 'पूरी यात्रा', fullD: 'हर युग, हर घटना, क्रम से।', allEras: (n) => 'सभी ' + n + ' युग', scenes: (n, m) => n + ' दृश्य · लगभग ' + m + ' मिनट',
      prev: 'पिछला दृश्य', next: 'अगला दृश्य', pause: 'रोकें', resume: 'चलाएँ', exit: 'बाहर', narrate: 'बोलकर सुनाएँ', fin: 'यात्रा समाप्त', finD: 'कोई और यात्रा चुनें, या नक़्शा अपने हाथ में लें।',
      replay: 'फिर से', more: 'और यात्राएँ', explore: 'नक़्शा देखें', close: 'बंद करें', of: (n, m) => n + ' / ' + m, bce: 'ई.पू.', ce: 'ई.', lang: 'English', hint: 'रुका हुआ है। नक़्शे को खींचें और ज़ूम करें।'
    }
  };
  const U = () => UI[hi() ? 'hi' : 'en'];
  const tx = (o, k) => (hi() && o[k + 'h']) ? o[k + 'h'] : o[k];
  const yearStr = (y) => (y < 0 ? (-y) + ' ' + U().bce : Math.max(1, y) + ' ' + U().ce);

  // event title -> {era index, event}
  const EVLOC = {};
  ERAS.forEach((e, i) => e.events.forEach((ev) => { EVLOC[ev.title] = { i, ev }; }));
  JOURNEYS.forEach((j) => j.beats.forEach((b) => { if (b.ev && !EVLOC[b.ev]) console.warn('Journey scene refers to unknown event:', b.ev); }));
  const eraOf = (b) => (b.ev ? EVLOC[b.ev].i : b.era);
  const secs = (b) => Math.min(13, Math.max(7, 5.2 + (b.p.split(/\s+/).length * 0.14)));
  const minutes = (j) => Math.max(1, Math.round(j.beats.reduce((s, b) => s + secs(b), 0) / 60));

  // ---------------------------------------------------------------- DOM
  const stage = $('stage'), wrap = $('map-wrap');
  const fade = document.createElement('div'); fade.id = 'cineFade'; fade.setAttribute('aria-hidden', 'true'); document.body.appendChild(fade);
  const cine = document.createElement('div'); cine.id = 'cine'; cine.setAttribute('role', 'region'); cine.setAttribute('aria-label', 'Journey');
  cine.innerHTML = '<div class="cine-veil"></div><div class="cine-top"><span class="cine-name"></span><span class="cine-right"><button type="button" class="cine-lang"></button><button type="button" class="cine-x"></button></span></div>' +
    '<div class="cine-bot"><div class="cine-cap" aria-live="polite"><div class="cine-year"></div><h2 class="cine-h"></h2><p class="cine-p"></p><div class="cine-end"></div></div>' +
    '<div class="cine-ctl"><div class="cine-seg"></div><div class="cine-btns"><button type="button" class="cine-btn" data-a="prev">‹</button><button type="button" class="cine-btn" data-a="pause"></button><button type="button" class="cine-btn" data-a="next">›</button><button type="button" class="cine-btn" data-a="music"></button><button type="button" class="cine-btn" data-a="say"></button></div></div></div>';
  wrap.appendChild(cine);
  const q = (s) => cine.querySelector(s);
  const el = { name: q('.cine-name'), x: q('.cine-x'), lang: q('.cine-lang'), year: q('.cine-year'), h: q('.cine-h'), p: q('.cine-p'), end: q('.cine-end'), seg: q('.cine-seg'), prev: q('[data-a=prev]'), pause: q('[data-a=pause]'), next: q('[data-a=next]'), say: q('[data-a=say]'), bot: q('.cine-bot'), top: q('.cine-top') };
  if (window.ATLAS_MUSIC) window.ATLAS_MUSIC.bind(q('[data-a=music]')); else q('[data-a=music]').remove();
  const ICON_P = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 2.5h3v11h-3zM9.5 2.5h3v11h-3z"/></svg>', ICON_R = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.5v11l9-5.5z"/></svg>';
  const ICON_S = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 6h2.8L8 3v10L4.8 10H2z"/><path d="M10.5 5.4a3.6 3.6 0 010 5.2M12.3 3.6a6.2 6.2 0 010 8.8" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>';
  const cineLayer = L.layerGroup().addTo(map);

  // ---------------------------------------------------------------- state
  const S = { on: false, j: null, n: 0, paused: false, timer: 0, rem: 0, t0: 0, narrate: false, y: null, raf: 0, minDone: false, voiceDone: true, ending: false, busy: false, tok: 0 };

  function lock(on) {
    ['dragging', 'scrollWheelZoom', 'touchZoom', 'doubleClickZoom', 'boxZoom', 'keyboard'].forEach((h) => { try { map[h][on ? 'disable' : 'enable'](); } catch (_) { /* handler missing */ } });
    document.body.classList.toggle('cine-lock', on);
  }
  function veil(fn) { // fade through black while the layout changes
    if (REDUCE) { fn(); return; }
    fade.classList.add('on');
    setTimeout(() => { fn(); setTimeout(() => fade.classList.remove('on'), 120); }, 380);
  }
  function relayout() { map.invalidateSize({ animate: false, pan: false }); }

  // ---------------------------------------------------------------- camera
  function cam(b, loc) {
    const occ = Math.max(120, el.bot.offsetHeight - 64), top = 48;
    let ll, z, pulse = false;
    if (b.view === 'home' || (!b.view && !loc)) { ll = [21.4, 82.2]; z = Math.min(6, map.getBoundsZoom(BOUNDS, false, L.point(40, top + occ + 24))); }
    else if (b.view) { ll = [b.view[0], b.view[1]]; z = b.view[2]; }
    else { ll = loc.ev.ll; z = b.z || 6.2; pulse = true; }
    const c = map.unproject(map.project(ll, z).add([0, (occ - top) / 2]), z);
    return { c, z, ll, pulse };
  }

  // ---------------------------------------------------------------- caption
  function rollYear(from, to, final) {
    cancelAnimationFrame(S.raf);
    if (REDUCE || from == null || from === to) { el.year.textContent = final; return; }
    const t0 = performance.now(), D = Math.min(1500, 700 + Math.abs(to - from) * 0.9);
    (function step(now) {
      const k = Math.min(1, (now - t0) / D), e = 1 - Math.pow(1 - k, 3);
      el.year.textContent = k < 1 ? yearStr(Math.round(from + (to - from) * e)) : final;
      if (k < 1) S.raf = requestAnimationFrame(step);
    })(t0);
  }
  function yearOf(b, loc) { return b.ev ? loc.ev.year : (b.y != null ? b.y : ERAS[b.era].year); }
  function labelOf(b, loc) { return b.ev ? pick(loc.ev, 'label') : (b.label ? tx(b, 'label') : pick(ERAS[b.era], 'yearLabel')); }

  function paintSegs(dur) {
    const n = S.j.beats.length;
    el.seg.innerHTML = S.j.beats.map((_, k) => '<button type="button" aria-label="' + escapeHtml(U().of(k + 1, n)) + '" class="' + (k < S.n ? 'done' : k === S.n ? 'cur' : '') + '"><i' + (k === S.n && dur ? ' style="animation-duration:' + dur + 'ms"' : '') + '></i></button>').join('');
    el.seg.classList.toggle('paused', S.paused);
    el.seg.querySelectorAll('button').forEach((b, k) => b.addEventListener('click', () => jump(k)));
  }
  function paintChrome() {
    const u = U();
    el.name.textContent = S.j ? tx(S.j, 't') : u.name;
    el.x.textContent = '✕ ' + u.exit; el.lang.textContent = u.lang;
    el.prev.setAttribute('aria-label', u.prev); el.next.setAttribute('aria-label', u.next); el.prev.title = u.prev; el.next.title = u.next;
    el.pause.innerHTML = S.paused ? ICON_R : ICON_P; el.pause.setAttribute('aria-label', S.paused ? u.resume : u.pause); el.pause.title = S.paused ? u.resume : u.pause;
    el.say.innerHTML = ICON_S; el.say.title = u.narrate; el.say.setAttribute('aria-label', u.narrate); el.say.classList.toggle('on', S.narrate);
    el.prev.disabled = S.n === 0 && !S.ending;
  }

  // ---------------------------------------------------------------- narration
  function speakNow(text) {
    S.voiceDone = true;
    if (!S.narrate || !window.ATLAS_VOICE) return;
    S.voiceDone = false;
    const done = () => { S.voiceDone = true; maybeAdvance(); };
    window.ATLAS_VOICE.say(text, { clip: S.j.id + '-' + S.n, onend: done });
    const nx = S.j.beats[S.n + 1]; if (nx) window.ATLAS_VOICE.warm(S.j.id + '-' + (S.n + 1));
    const tok = S.tok;
    setTimeout(() => { if (!S.voiceDone && tok === S.tok) done(); }, 75000); // never stall on a silent voice
  }
  const hush = () => { if (window.ATLAS_VOICE) window.ATLAS_VOICE.stop(); S.voiceDone = true; };

  // ---------------------------------------------------------------- the scene player
  function maybeAdvance() { if (S.on && !S.paused && !S.ending && S.minDone && S.voiceDone) next(); }
  function arm(ms) {
    clearTimeout(S.timer); S.rem = ms; S.t0 = performance.now();
    S.timer = setTimeout(() => { S.minDone = true; maybeAdvance(); }, ms);
  }

  // A scene change is a CUT, not a flight. Leaflet only draws vector layers (realms, coasts) for the area that is on
  // screen when a move starts, so a long fly-over shows half-drawn, hard-edged realms. Instead the picture dips to dark,
  // the era and camera change while it is dark, and the camera then pushes IN: zooming in only ever shows ground that
  // is already drawn.
  const restartBeat = () => { cine.classList.remove('beat'); void cine.offsetWidth; cine.classList.add('beat'); };
  function pushIn(c, wide) {
    map.setView(c.c, Math.max(map.getMinZoom(), c.z - wide), { animate: false });
    if (REDUCE) { map.setView(c.c, c.z, { animate: false }); return; }
    const tok = S.tok;
    setTimeout(() => { if (S.on && tok === S.tok) map.flyTo(c.c, c.z, { duration: 3.8, easeLinearity: 0.25 }); }, 320);
  }
  function addLandmark(ll, lm) {
    const k = window.innerWidth <= 800 ? 0.66 : 1, w = Math.round(lm.w * k), h = Math.round(lm.h * k);
    L.marker(ll, { icon: L.divIcon({ className: 'lm', html: lm.html, iconSize: [w, h], iconAnchor: [Math.round(w / 2), Math.round(h * 0.93)] }), interactive: false, keyboard: false, zIndexOffset: 1200 }).addTo(cineLayer);
  }
  function addPulse(ll) {
    L.marker(ll, { icon: L.divIcon({ className: 'pulse cine-pulse', html: '<span></span>', iconSize: [34, 34], iconAnchor: [17, 28] }), interactive: false, keyboard: false }).addTo(cineLayer);
  }

  function showBeat(first) {
    const b = S.j.beats[S.n]; if (!b) return finish();
    const tok = ++S.tok;
    clearTimeout(S.timer); cancelAnimationFrame(S.raf); hush();
    S.ending = false; S.minDone = false;
    const loc = b.ev ? EVLOC[b.ev] : null, era = eraOf(b);
    const play = () => {
      if (!S.on || tok !== S.tok) return;
      el.end.innerHTML = ''; cine.classList.remove('is-end');
      map.closePopup(); cineLayer.clearLayers();
      if (A.state.i !== era) A.go(era); // redrawn while the picture is dark, so the new realms fade in as it lifts
      const title = tx(b, 't'), body = tx(b, 'p');
      el.h.textContent = title; el.p.textContent = body; // text first: the camera leaves exactly enough room for it
      const c = cam(b, loc), home = b.view === 'home' || (!b.view && !loc);
      pushIn(c, home ? 0.5 : 0.8);
      const lm = b.ev && window.ATLAS_LM ? window.ATLAS_LM.art(b.ev) : null;
      if (lm) setTimeout(() => { if (S.on && tok === S.tok) addLandmark(c.ll, lm); }, 1100);
      else if (c.pulse) setTimeout(() => { if (S.on && tok === S.tok) addPulse(c.ll); }, 1500);
      cine.classList.remove('cut'); restartBeat();
      rollYear(S.y, yearOf(b, loc), labelOf(b, loc)); S.y = yearOf(b, loc);
      const dur = Math.round(secs(b) * 1000);
      paintSegs(dur); paintChrome();
      speakNow(title + '. ' + body);
      if (S.paused) { S.rem = dur; el.seg.classList.add('paused'); } else arm(dur);
    };
    if (first || REDUCE) play(); else { cine.classList.add('cut'); setTimeout(play, 430); }
  }
  function next() { if (!S.on) return; if (S.ending) return; if (S.n >= S.j.beats.length - 1) return finish(); S.n++; showBeat(false); }
  function prev() { if (!S.on) return; if (S.ending) { S.ending = false; showBeat(false); return; } if (S.n > 0) { S.n--; showBeat(false); } }
  function jump(k) { if (!S.on) return; S.n = k; S.ending = false; showBeat(false); }
  function paintEnd() {
    el.year.textContent = ''; el.h.textContent = U().fin; el.p.textContent = U().finD;
    el.end.innerHTML = '<button type="button" class="cine-cta" data-e="replay">' + escapeHtml(U().replay) + '</button><button type="button" class="cine-cta" data-e="more">' + escapeHtml(U().more) + '</button><button type="button" class="cine-cta pri" data-e="explore">' + escapeHtml(U().explore) + '</button>';
    el.end.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => {
      const a = b.dataset.e;
      if (a === 'replay') { S.n = 0; S.y = null; S.ending = false; showBeat(false); } else if (a === 'more') stop(true); else stop(false);
    }));
  }
  function finish() {
    clearTimeout(S.timer); hush(); S.ending = true; S.paused = false; S.minDone = false;
    const tok = ++S.tok;
    S.n = S.j.beats.length; paintSegs(0); paintChrome();
    const done = () => {
      if (!S.on || tok !== S.tok) return;
      cineLayer.clearLayers(); map.closePopup(); cine.classList.add('is-end'); paintEnd();
      pushIn(cam({ view: 'home' }), 0.5); cine.classList.remove('cut'); restartBeat();
      const g = el.end.querySelector('.pri'); if (g) g.focus({ preventScroll: true });
    };
    if (REDUCE) done(); else { cine.classList.add('cut'); setTimeout(done, 430); }
  }
  function setPaused(p) {
    if (!S.on || S.ending) return;
    S.paused = p;
    if (p) { clearTimeout(S.timer); S.rem = Math.max(0, S.rem - (performance.now() - S.t0)); hush(); lock(false); A.toast(U().hint); }
    else { lock(true); arm(Math.max(1200, S.rem)); speakNow(el.h.textContent + '. ' + el.p.textContent); }
    el.seg.classList.toggle('paused', p); paintChrome();
  }

  // ---------------------------------------------------------------- start / stop
  function start(id, at) {
    const j = JOURNEYS.find((x) => x.id === id); if (!j || S.busy) return;
    S.busy = true;
    try { A.stopPlay(); A.stopTour(); } catch (_) { /* nothing running */ }
    if (A.state.quiz) { const bq = $('btnQuiz'); if (bq) bq.click(); }
    if (window.ATLAS_NOW) window.ATLAS_NOW.off();
    closePicker(true); A.clearRealm && A.clearRealm();
    S.j = j; S.n = at || 0; S.paused = false; S.y = null; S.ending = false; S.on = true;
    veil(() => {
      document.body.classList.add('cinema'); stage.classList.add('no-panel'); $('panel').style.display = 'none'; relayout();
      lock(true); paintChrome();
      setTimeout(() => { document.body.classList.add('cine-ready'); showBeat(true); S.busy = false; }, 60); // a timer, not rAF: must not stall in a background tab
    });
  }
  function stop(thenPicker) {
    if (!S.on || S.busy) return;
    S.busy = true; clearTimeout(S.timer); hush(); cancelAnimationFrame(S.raf);
    document.body.classList.remove('cine-ready');
    veil(() => {
      S.on = false; S.j = null; cineLayer.clearLayers(); map.closePopup();
      document.body.classList.remove('cinema'); lock(false); relayout();
      map.fitBounds(BOUNDS, { paddingTopLeft: [24, 58], paddingBottomRight: [24, window.innerWidth <= 800 ? Math.round(map.getSize().y * 0.45) : 30], maxZoom: 6, animate: false }); // while dark: no fly-over
      A.go(A.state.i); // redraws the realms and the side panel now that the cinema layout is gone
      S.busy = false;
      if (thenPicker) openPicker();
    });
  }

  // ---------------------------------------------------------------- picker
  const pick2 = document.createElement('div'); pick2.id = 'jpick'; pick2.className = 'jpick'; pick2.hidden = true;
  pick2.setAttribute('role', 'dialog'); pick2.setAttribute('aria-modal', 'true'); pick2.setAttribute('aria-labelledby', 'jpTitle');
  document.body.appendChild(pick2);
  function paintPicker() {
    const u = U();
    pick2.innerHTML = '<div class="jp-in"><button type="button" class="jp-x" aria-label="' + escapeHtml(u.close) + '">✕</button><div class="jp-kick">' + escapeHtml(u.name) + '</div><h2 id="jpTitle">' + escapeHtml(u.pick) + '</h2><p class="jp-sub">' + escapeHtml(u.sub) + '</p><div class="jp-grid">' +
      JOURNEYS.map((j, i) => '<button type="button" class="jc" data-id="' + j.id + '" style="--i:' + i + '"><span class="jc-ic">' + atlasIcon(j.icon) + '</span><span class="jc-rng">' + escapeHtml(hi() ? j.rngHi : j.rng) + '</span><b class="jc-t">' + escapeHtml(tx(j, 't')) + '</b><span class="jc-d">' + escapeHtml(tx(j, 'd')) + '</span><span class="jc-m">' + escapeHtml(u.scenes(j.beats.length, minutes(j))) + '</span></button>').join('') +
      '<button type="button" class="jc jc-full" data-id="full" style="--i:' + JOURNEYS.length + '"><span class="jc-ic">' + atlasIcon('capital') + '</span><span class="jc-rng">500 BCE → 2010</span><b class="jc-t">' + escapeHtml(u.full) + '</b><span class="jc-d">' + escapeHtml(u.fullD) + '</span><span class="jc-m">' + escapeHtml(u.allEras(ERAS.length)) + '</span></button></div></div>';
    pick2.querySelector('.jp-x').addEventListener('click', () => closePicker());
    pick2.addEventListener('click', (e) => { if (e.target === pick2) closePicker(); });
    pick2.querySelectorAll('.jc').forEach((b) => b.addEventListener('click', () => {
      if (b.dataset.id === 'full') { closePicker(true); A.startTour(); } else start(b.dataset.id);
    }));
  }
  let lastFocus = null;
  function openPicker() {
    if (S.on) return;
    lastFocus = document.activeElement; paintPicker(); pick2.hidden = false;
    requestAnimationFrame(() => pick2.classList.add('open'));
    const b = pick2.querySelector('.jc'); if (b) b.focus({ preventScroll: true });
  }
  function closePicker(quiet) {
    if (pick2.hidden) return;
    pick2.classList.remove('open'); pick2.hidden = true; pick2.innerHTML = '';
    if (!quiet && lastFocus && lastFocus.focus) { try { lastFocus.focus({ preventScroll: true }); } catch (_) { /* gone */ } }
  }

  // ---------------------------------------------------------------- wiring
  el.x.addEventListener('click', () => stop(false));
  el.prev.addEventListener('click', prev); el.next.addEventListener('click', next);
  el.pause.addEventListener('click', () => setPaused(!S.paused));
  el.say.addEventListener('click', () => { if (window.ATLAS_VOICE) window.ATLAS_VOICE.unlock(); S.narrate = !S.narrate; paintChrome(); if (S.narrate && S.on && !S.ending) speakNow(el.h.textContent + '. ' + el.p.textContent); else hush(); });
  el.lang.addEventListener('click', () => {
    A.setLang(hi() ? 'en' : 'hi'); // re-renders the era; the camera stays put
    const b = S.j && S.j.beats[S.n];
    if (S.ending) { paintEnd(); paintChrome(); return; }
    if (b) { const loc = b.ev ? EVLOC[b.ev] : null; el.h.textContent = tx(b, 't'); el.p.textContent = tx(b, 'p'); el.year.textContent = labelOf(b, loc); }
    paintChrome(); hush();
  });
  document.addEventListener('keydown', (e) => {
    if (!pick2.hidden) { if (e.key === 'Escape') { e.preventDefault(); e.stopImmediatePropagation(); closePicker(); } return; }
    if (!S.on) return;
    const k = e.key;
    if (k === 'Escape') { stop(false); }
    else if (k === 'ArrowRight' || k === 'PageDown') next();
    else if (k === 'ArrowLeft' || k === 'PageUp') prev();
    else if (k === ' ' && e.target === document.body) setPaused(!S.paused);
    else return;
    e.preventDefault(); e.stopImmediatePropagation();
  }, true);
  document.addEventListener('atlas:lang', () => { if (S.on) paintChrome(); const bt = $('btnTour'); if (bt) bt.textContent = '✦ ' + U().name; });
  window.addEventListener('resize', () => { if (S.on) relayout(); });

  // the header's "Guided tour" pill becomes the doorway to the journeys (the full tour lives inside the picker)
  const bt = $('btnTour');
  if (bt) {
    bt.textContent = '✦ ' + U().name;
    bt.addEventListener('click', (e) => { if (A.tour.on) return; e.stopImmediatePropagation(); if (pick2.hidden) openPicker(); else closePicker(); }, true);
  }

  window.ATLAS_JOURNEYS = { list: () => JOURNEYS.map((j) => ({ id: j.id, title: j.t, scenes: j.beats.length })), start, stop, open: openPicker, close: closePicker, state: () => ({ on: S.on, journey: S.j && S.j.id, scene: S.n, paused: S.paused, ending: S.ending, busy: S.busy }) };
  const m = /[?&#]journey=([\w-]+)/.exec(window.ATLAS_INITIAL_URL || location.href);
  if (m && JOURNEYS.some((j) => j.id === m[1])) setTimeout(() => start(m[1]), 600);
})();
