/*
 * Opening title sequence: the subcontinent is inked onto the page, trade roads light up between its great
 * cities, and the atlas' numbers count up. Skippable (Esc / button), shown once per browser session,
 * replayable by clicking the "भारत" seal in the header. Respects prefers-reduced-motion.
 */
(function () {
  'use strict';
  const A = window.ATLAS_APP, root = document.getElementById('intro'), html = document.documentElement;
  if (!A || !root) { html.classList.remove('intro-on'); return; }
  const { map, ERAS, hi, escapeHtml } = A;
  const REDUCE = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  const TX = {
    en: { title: 'ATLAS OF INDIA', tag: 'Two and a half thousand years of empires, journeys and turning points, on one living map.', go: 'Begin a journey', skip: 'Explore the map', lang: 'हिन्दी', years: 'years', eras: 'eras', events: 'events', places: 'places' },
    hi: { title: 'भारत का ऐतिहासिक मानचित्र', tag: 'ढाई हज़ार वर्षों के साम्राज्य, यात्राएँ और मोड़ — एक जीवंत नक़्शे पर।', go: 'यात्रा शुरू करें', skip: 'नक़्शा देखें', lang: 'English', years: 'वर्ष', eras: 'युग', events: 'घटनाएँ', places: 'स्थान' }
  };
  const CITIES = [
    ['Taxila', 'तक्षशिला', 33.75, 72.83], ['Delhi', 'दिल्ली', 28.61, 77.21], ['Pataliputra', 'पाटलिपुत्र', 25.6, 85.12], ['Ujjain', 'उज्जैन', 23.18, 75.78],
    ['Hampi', 'हम्पी', 15.33, 76.46], ['Thanjavur', 'तंजावुर', 10.78, 79.14], ['Kolkata', 'कोलकाता', 22.57, 88.36], ['Mumbai', 'मुंबई', 19.07, 72.88]
  ];
  const ROUTES = [[0, 1, 2, 6], [1, 3, 4, 5], [3, 7]];

  // ---- the ink map, projected once from the bundled Natural Earth coastline ----
  const LAT0 = 38.6, LON0 = 59.2, S = 16.4, KX = Math.cos(21 * Math.PI / 180);
  const X = (lo) => (lo - LON0) * KX * S, Y = (la) => (LAT0 - la) * S, f1 = (n) => n.toFixed(1);
  const inb = (la, lo) => la > 2 && la < 40 && lo > 56 && lo < 103;
  const clampP = (p) => [Math.min(40, Math.max(2, p[0])), Math.min(103, Math.max(56, p[1]))];
  let cache = null;
  function shapes() {
    if (cache) return cache;
    let land = ''; const coast = [];
    (window.ATLAS_LAND || []).forEach((poly) => poly.forEach((ring) => {
      if (!ring.some((p) => inb(p[0], p[1]))) return;
      land += 'M' + ring.map((p) => { const c = clampP(p); return f1(X(c[1])) + ' ' + f1(Y(c[0])); }).join('L') + 'Z';
      let cur = [];
      ring.forEach((p, k) => {
        if (inb(p[0], p[1])) { if (!cur.length && k > 0) cur.push(ring[k - 1]); cur.push(p); }
        else if (cur.length) { cur.push(p); coast.push(cur); cur = []; }
      });
      if (cur.length) coast.push(cur);
    }));
    cache = { land, coast: coast.filter((c) => c.length > 3).map((c) => 'M' + c.map((p) => f1(X(p[1])) + ' ' + f1(Y(p[0]))).join('L')) };
    return cache;
  }
  function mapSvg(h) {
    const s = shapes(), cx = X(80), cy = Y(22);
    let g = '';
    for (let la = 10; la <= 30; la += 10) g += '<path d="M0 ' + f1(Y(la)) + 'H640"/>';
    for (let lo = 70; lo <= 100; lo += 10) g += '<path d="M' + f1(X(lo)) + ' 0V592"/>';
    let ticks = '';
    for (let k = 0; k < 48; k++) { const a = k * 7.5, r1 = k % 4 === 0 ? 236 : 244; ticks += '<path d="M0 -' + r1 + 'V-252" transform="rotate(' + a + ')"/>'; }
    const route = ROUTES.map((r, n) => '<path class="rt" style="--d:' + (3.4 + n * 0.5) + 's" pathLength="1" d="M' + r.map((i) => f1(X(CITIES[i][3])) + ' ' + f1(Y(CITIES[i][2]))).join('L') + '"/>').join('');
    const cities = CITIES.map((c, i) => '<g class="city" style="--d:' + (3.6 + i * 0.22) + 's" transform="translate(' + f1(X(c[3])) + ' ' + f1(Y(c[2])) + ')"><circle class="ring" r="3"/><circle class="dot" r="3.2"/><text x="7" y="-6">' + escapeHtml(h ? c[1] : c[0]) + '</text></g>').join('');
    return '<svg class="in-svg" viewBox="0 0 640 592" role="img" aria-label="' + (h ? 'भारतीय उपमहाद्वीप का स्याही से बना नक़्शा' : 'Ink map of the Indian subcontinent') + '">' +
      '<g class="in-rose" transform="translate(' + f1(cx) + ' ' + f1(cy) + ')"><circle r="250"/><circle r="232" class="dash"/><circle r="170" class="dash"/>' + ticks + '</g>' +
      '<g class="in-grat">' + g + '</g><path class="land" d="' + s.land + '"/>' +
      '<g class="coast">' + s.coast.map((d, i) => '<path pathLength="1" style="--d:' + (0.35 + (i % 7) * 0.05) + 's" d="' + d + '"/>').join('') + '</g>' +
      '<g class="routes">' + route + '</g><g class="cities">' + cities + '</g></svg>';
  }

  // ---- numbers ----
  function stats() {
    let ev = 0, pl = 0; ERAS.forEach((e) => { ev += e.events.length; pl += e.places.length; });
    return { years: 2500, eras: ERAS.length, events: ev, places: pl };
  }
  function countUp(el, to, delay) {
    if (REDUCE || root.classList.contains('static')) { el.textContent = to.toLocaleString('en-IN'); return; }
    el.textContent = '0';
    const t0 = performance.now() + delay, D = 1700;
    (function step(now) {
      if (!root.firstChild) return;
      const k = Math.min(1, Math.max(0, (now - t0) / D)), e = 1 - Math.pow(1 - k, 3);
      el.textContent = Math.round(to * e).toLocaleString('en-IN');
      if (k < 1) requestAnimationFrame(step);
    })(performance.now());
  }

  function build(isStatic) {
    const h = hi(), t = TX[h ? 'hi' : 'en'], st = stats();
    root.classList.toggle('static', !!(isStatic || REDUCE));
    root.innerHTML =
      '<div class="frame in-frame" aria-hidden="true"><i class="c tl"></i><i class="c tr"></i><i class="c bl"></i><i class="c br"></i></div>' +
      '<div class="in-copy"><div class="in-seal" aria-hidden="true">भारत</div><h2 id="introTitle" class="in-title">' + escapeHtml(t.title) + '</h2>' +
      '<div class="in-rule" aria-hidden="true"><i></i></div><p class="in-tag">' + escapeHtml(t.tag) + '</p>' +
      '<dl class="in-stats"><div><dt data-n="' + st.years + '">0</dt><dd>' + t.years + '</dd></div><div><dt data-n="' + st.eras + '">0</dt><dd>' + t.eras + '</dd></div><div><dt data-n="' + st.events + '">0</dt><dd>' + t.events + '</dd></div><div><dt data-n="' + st.places + '">0</dt><dd>' + t.places + '</dd></div></dl>' +
      '<div class="in-cta"><button type="button" class="in-go">' + escapeHtml(t.go) + ' <span aria-hidden="true">→</span></button><button type="button" class="in-skip">' + escapeHtml(t.skip) + '</button></div></div>' +
      '<div class="in-art">' + mapSvg(h) + '</div>' +
      '<div class="in-foot"><a class="in-gh" href="' + A.repo + '" target="_blank" rel="noopener noreferrer">' + (h ? 'GitHub पर स्रोत-कोड' : 'Open source on GitHub') + ' ↗</a><a class="in-gh" href="sources.html" target="_blank" rel="noopener">' + (h ? 'स्रोत और AI का उपयोग' : 'Sources & AI use') + ' ↗</a><span class="in-views" data-views hidden></span></div>' +
      '<button type="button" class="in-music"><span class="ml"></span></button>' +
      '<button type="button" class="in-lang" aria-label="Language">' + escapeHtml(t.lang) + '</button>';
    if (window.ATLAS_MUSIC) window.ATLAS_MUSIC.bind(root.querySelector('.in-music')); else root.querySelector('.in-music').remove();
    if (window.ATLAS_VIEWS) window.ATLAS_VIEWS.paint();
    root.querySelectorAll('.in-stats dt').forEach((el, i) => countUp(el, +el.dataset.n, 2000 + i * 160));
    root.querySelector('.in-go').addEventListener('click', () => hide('journeys'));
    root.querySelector('.in-skip').addEventListener('click', () => hide());
    root.querySelector('.in-lang').addEventListener('click', () => { A.setLang(h ? 'en' : 'hi'); build(true); const b = root.querySelector('.in-go'); if (b) b.focus({ preventScroll: true }); });
  }

  function show() {
    html.classList.add('intro-on');
    root.setAttribute('role', 'dialog'); root.setAttribute('aria-modal', 'true'); root.setAttribute('aria-labelledby', 'introTitle');
    build(false);
    const b = root.querySelector('.in-go'); if (b) b.focus({ preventScroll: true });
  }
  function hide(action) {
    if (!html.classList.contains('intro-on') || root.classList.contains('leaving')) return;
    try { sessionStorage.setItem('atlas-intro', '1'); } catch (_) { /* fine */ }
    root.classList.add('leaving');
    const done = () => {
      html.classList.remove('intro-on'); root.classList.remove('leaving', 'static'); root.innerHTML = '';
      if (action === 'journeys' && window.ATLAS_JOURNEYS) window.ATLAS_JOURNEYS.open();
      else if (!REDUCE) { // a gentle push-in as the map is revealed
        const c = map.getCenter(), z = map.getZoom();
        map.setView(c, Math.max(map.getMinZoom(), z - 0.8), { animate: false }); map.flyTo(c, z, { duration: 2 });
      }
    };
    if (REDUCE) done(); else setTimeout(done, 700);
  }

  document.addEventListener('keydown', (e) => {
    if (!html.classList.contains('intro-on') || !root.firstChild) return;
    if (e.key === 'Escape') { e.preventDefault(); e.stopImmediatePropagation(); hide(); }
    else if (e.key === 'Tab') { // keep focus inside the dialog
      const f = [...root.querySelectorAll('button, a[href]')]; if (!f.length) return;
      const i = f.indexOf(document.activeElement), n = e.shiftKey ? (i <= 0 ? f.length - 1 : i - 1) : (i === f.length - 1 ? 0 : i + 1);
      e.preventDefault(); f[n].focus();
    } else if (e.key.indexOf('Arrow') === 0 || e.key === '/') e.stopImmediatePropagation();
  }, true);

  // click the seal in the header to watch it again
  const brand = document.querySelector('.brand-group');
  if (brand) { brand.style.cursor = 'pointer'; brand.setAttribute('title', 'Replay the intro'); brand.addEventListener('click', show); }

  window.atlasIntro = { show, hide };
  if (window.ATLAS_INTRO) show(); else { root.innerHTML = ''; html.classList.remove('intro-on'); }
})();
