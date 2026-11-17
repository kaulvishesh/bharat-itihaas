/* Extras: Trace-a-place, person chronicles + compare, rivers overlay, embed mode, public API. */
(function () {
  'use strict';
  const A = window.ATLAS_APP;
  if (!A) return;
  const { map, ERAS, GEO, pick, hi, escapeHtml } = A;
  const CORE = window.ATLAS_CORE;
  const PEOPLE = window.ATLAS_PEOPLE || [];
  const RIVERS = window.ATLAS_RIVERS || [];
  const WORKS = window.ATLAS_WORKS || [];
  const $ = (id) => document.getElementById(id);
  const sheet = $('sheet');

  const X = {
    en: {
      realmArea: 'Rough extent', realmPlaces: 'Places within', realmEvents: 'Events within', realmNear: 'Neighbours', realmThen: 'Elsewhere in time', realmZoom: 'Zoom to realm', realmClear: 'Clear', realmGeneric: (snap) => 'Drawn from the ' + snap + ' data snapshot; boundaries are approximate.',
      chart: 'Territory', chartTitle: 'Size of the largest mapped realm', chartHint: 'The biggest single realm in each era (generic buckets such as "other kingdoms" excluded). Click a bar to jump to that era.', chartNote: 'Areas are rough estimates clipped to South Asia, from simplified approximate boundaries — compare orders of magnitude, not exact figures.', svgSaved: 'SVG saved', saveSvg: 'Save SVG', svgTip: 'Download this era as SVG',
      people: 'People', trace: 'Trace', rivers: 'Rivers', works: 'Roads & canals', worksOn: 'Roads, canals and dams shown', worksOff: 'Roads, canals and dams hidden',
      close: 'Close', clear: 'Clear map',
      peopleTitle: 'Person chronicles', peopleHint: 'Pick someone to follow their journey, or tick two or more to compare.',
      compare: (n) => 'Compare selected (' + n + ')', show: 'Show on map', stops: 'Stops',
      traceTitle: 'Trace a place through time', traceHint: 'Click anywhere on the map to see which realms ruled that spot in each era.',
      nearest: (n, km) => 'Nearest known place: ' + n + (km ? ' (~' + km + ' km)' : ''),
      distinct: (n) => 'Covered by ' + n + ' distinct realm' + (n === 1 ? '' : 's') + ' across the snapshots.',
      outside: 'No realm recorded here', now: 'current era', here: 'Events here through time', nearTip: (km) => 'Just outside the generalised boundary (~' + km + ' km); counted as near',
      lifespans: 'Lifespans', overlap: (a, b, y0, y1) => a + ' and ' + b + ' were contemporaries for about ' + (y1 - y0) + ' years (' + ys(y0) + ' – ' + ys(y1) + ').',
      gap: (a, b, n) => 'About ' + n + ' years separate ' + a + ' and ' + b + '.',
      bce: ' BCE', ce: ' CE', riversOn: 'Rivers shown', riversOff: 'Rivers hidden', traceOn: 'Trace mode: click the map', traceOff: 'Trace mode off',
      sources: 'Dates for ancient figures are traditional; routes are schematic.'
    },
    hi: {
      realmArea: 'मोटा विस्तार', realmPlaces: 'भीतर के स्थान', realmEvents: 'भीतर की घटनाएँ', realmNear: 'पड़ोसी', realmThen: 'समय में अन्यत्र', realmZoom: 'राज्य पर जाएँ', realmClear: 'हटाएँ', realmGeneric: (snap) => 'डेटा-स्नैपशॉट ' + snap + ' से बना; सीमाएँ अनुमानित हैं।',
      chart: 'क्षेत्रफल', chartTitle: 'सबसे बड़े मानचित्रित राज्य का आकार', chartHint: 'हर युग का सबसे बड़ा एकल राज्य ("अन्य राज्य" जैसे सामान्य समूह छोड़कर)। उस युग पर जाने के लिए पट्टी पर क्लिक करें।', chartNote: 'क्षेत्रफल दक्षिण एशिया तक काटे गए, सरलीकृत अनुमानित सीमाओं से निकाले मोटे अनुमान हैं — परिमाण की तुलना करें, सटीक आँकड़ों की नहीं।', svgSaved: 'SVG सहेजा गया', saveSvg: 'SVG सहेजें', svgTip: 'इस युग को SVG के रूप में डाउनलोड करें',
      people: 'व्यक्तित्व', trace: 'खोजें', rivers: 'नदियाँ', works: 'मार्ग और नहरें', worksOn: 'मार्ग, नहरें और बाँध दिख रहे हैं', worksOff: 'मार्ग, नहरें और बाँध छिपे हैं',
      close: 'बंद करें', clear: 'नक्शा साफ़ करें',
      peopleTitle: 'व्यक्तित्व-वृत्त', peopleHint: 'किसी की यात्रा देखने के लिए चुनें, या तुलना के लिए दो या अधिक पर टिक करें।',
      compare: (n) => 'चयनित की तुलना (' + n + ')', show: 'नक्शे पर दिखाएँ', stops: 'पड़ाव',
      traceTitle: 'किसी स्थान को समय के पार देखें', traceHint: 'नक्शे पर कहीं भी क्लिक करें और देखें कि हर युग में वह स्थान किन राज्यों के अधीन था।',
      nearest: (n, km) => 'निकटतम ज्ञात स्थान: ' + n + (km ? ' (~' + km + ' कि.मी.)' : ''),
      distinct: (n) => 'स्नैपशॉट में यह स्थान ' + n + ' अलग-अलग राज्यों के अधीन रहा।',
      outside: 'यहाँ कोई राज्य दर्ज नहीं', now: 'वर्तमान युग', here: 'यहाँ की घटनाएँ', nearTip: (km) => 'सामान्यीकृत सीमा के ठीक बाहर (~' + km + ' कि.मी.); निकट माना गया',
      lifespans: 'जीवन-काल', overlap: (a, b, y0, y1) => a + ' और ' + b + ' लगभग ' + (y1 - y0) + ' वर्ष समकालीन थे (' + ys(y0) + ' – ' + ys(y1) + ')।',
      gap: (a, b, n) => a + ' और ' + b + ' के बीच लगभग ' + n + ' वर्ष का अंतर है।',
      bce: ' ई.पू.', ce: ' ई.', riversOn: 'नदियाँ दिख रही हैं', riversOff: 'नदियाँ छिपी हैं', traceOn: 'खोज मोड: नक्शे पर क्लिक करें', traceOff: 'खोज मोड बंद',
      sources: 'प्राचीन व्यक्तित्वों की तिथियाँ परंपरागत हैं; मार्ग योजनात्मक हैं।'
    }
  };
  const x = () => X[A.state.lang];
  function ys(y) { return y < 0 ? (-y) + x().bce : y + x().ce; }

  const mode = { realmI: null, sheet: null, trace: false, rivers: true, works: true, selected: [], current: null, cmp: false };
  const traceLayer = L.layerGroup().addTo(map);
  const peopleLayer = L.layerGroup().addTo(map);
  const riverLayer = L.layerGroup().addTo(map);
  const worksLayer = L.layerGroup().addTo(map);
  let peopleAnims = [];

  // ---------- smoothing ----------
  function smooth(pts, seg) {
    if (pts.length < 3) return pts;
    seg = seg || 8;
    const out = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
      for (let k = 0; k < seg; k++) {
        const t = k / seg, t2 = t * t, t3 = t2 * t;
        const f = (a, b, c, d) => 0.5 * ((2 * b) + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
        out.push([f(p0[0], p1[0], p2[0], p3[0]), f(p0[1], p1[1], p2[1], p3[1])]);
      }
    }
    out.push(pts[pts.length - 1]);
    return out;
  }

  // ---------- rivers ----------
  function drawRivers() {
    riverLayer.clearLayers();
    if (!mode.rivers || A.state.quiz) return;
    const y = ERAS[A.state.i].year;
    RIVERS.filter((r) => (r.from == null || y >= r.from) && (r.to == null || y <= r.to)).forEach((r) => {
      const line = smooth(r.pts);
      L.polyline(line, { color: '#1d4ed8', weight: r.dashed ? 2 : 2.4, opacity: r.dashed ? 0.55 : 0.6, dashArray: r.dashed ? '2 8' : null, interactive: false, lineCap: 'round' }).addTo(riverLayer);
      const mid = line[Math.floor(line.length * 0.45)];
      L.marker(mid, { icon: L.divIcon({ className: 'rlabel', html: '<span>' + escapeHtml(pick(r, 'n')) + '</span>', iconSize: [0, 0] }), interactive: false, keyboard: false }).addTo(riverLayer);
    });
    updateRiverLabels();
  }
  function drawWorks() {
    worksLayer.clearLayers();
    if (!mode.works || A.state.quiz) return;
    const y = ERAS[A.state.i].year;
    WORKS.filter((w) => (w.from == null || y >= w.from) && (w.to == null || y <= w.to)).forEach((w) => {
      const info = '<b>' + escapeHtml(pick(w, 'n')) + '</b><br>' + escapeHtml(pick(w, 'note') || '');
      if (w.pts) {
        const line = w.kind === 'road' ? w.pts : smooth(w.pts, 4);
        const style = w.kind === 'road'
          ? { color: '#7c2d12', weight: 3, opacity: 0.7, dashArray: '9 6' }
          : { color: '#0e7490', weight: 3.5, opacity: 0.85 };
        L.polyline(line, Object.assign({ lineCap: 'round' }, style)).bindPopup(info).addTo(worksLayer);
        const mid = line[Math.floor(line.length * 0.5)];
        L.marker(mid, { icon: L.divIcon({ className: 'rlabel ' + w.kind, html: '<span>' + escapeHtml(pick(w, 'n')) + '</span>', iconSize: [0, 0] }), interactive: false, keyboard: false }).addTo(worksLayer);
      } else if (w.ll) {
        L.marker(w.ll, { icon: L.divIcon({ className: 'mk', html: atlasIcon('dam'), iconSize: [28, 28], iconAnchor: [14, 24], popupAnchor: [0, -20], tooltipAnchor: [14, -8] }) })
          .bindPopup(info + '<br><button class="trace-btn" data-lat="' + w.ll[0] + '" data-lon="' + w.ll[1] + '">' + A.t().traceBtn + '</button>')
          .bindTooltip(pick(w, 'n'), { className: 'plabel place', direction: 'right' }).addTo(worksLayer);
      }
    });
  }
  function updateRiverLabels() { map.getContainer().classList.toggle('hide-rlabels', map.getZoom() < 6); }
  map.on('zoomend', updateRiverLabels);

  // ---------- sheet ----------
  function openSheet(kind) { mode.sheet = kind; sheet.hidden = false; renderSheet(); }
  function closeSheet() {
    const wasRealm = mode.sheet === 'realm';
    mode.sheet = null; sheet.hidden = true; sheet.innerHTML = '';
    if (wasRealm && A.realm() != null) A.clearRealm();
    if (mode.trace) setTrace(false);
  }
  function renderSheet() {
    if (!mode.sheet) return;
    if (mode.sheet === 'trace') renderTrace(mode.lastTrace);
    else if (mode.sheet === 'people') renderPeople();
    else if (mode.sheet === 'chart') renderChart();
    else if (mode.sheet === 'realm') renderRealm();
  }
  function head(title) { return '<div class="shead"><h3>' + escapeHtml(title) + '</h3><button id="sClose" aria-label="' + x().close + '">✕</button></div>'; }
  function bindClose() { const b = $('sClose'); if (b) b.addEventListener('click', closeSheet); }

  // ---------- trace ----------
  function setTrace(on) {
    mode.trace = on;
    $('btnTrace').classList.toggle('on', on);
    map.getContainer().style.cursor = on ? 'crosshair' : '';
    if (on) { A.toast(x().traceOn); if (mode.sheet !== 'trace') openSheet('trace'); }
    else { if (mode.sheet === 'trace' && !mode.lastTrace) closeSheet(); }
  }
  function trace(lat, lon) {
    mode.lastTrace = CORE.traceAt(ERAS, GEO, lat, lon);
    traceLayer.clearLayers();
    L.marker([lat, lon], { icon: L.divIcon({ className: 'pulse', html: '<span></span>', iconSize: [34, 34] }), interactive: false, keyboard: false }).addTo(traceLayer);
    L.circleMarker([lat, lon], { radius: 5, color: '#fff', weight: 2, fillColor: '#2a1f14', fillOpacity: 1, interactive: false }).addTo(traceLayer);
    if (mode.sheet !== 'trace') { mode.sheet = 'trace'; sheet.hidden = false; }
    renderTrace(mode.lastTrace);
  }
  function renderTrace(res) {
    if (!res) {
      sheet.innerHTML = head(x().traceTitle) + '<p class="shint">' + x().traceHint + '</p>'; bindClose(); return;
    }
    const nm = res.nearest ? pick(res.nearest, 'n') : res.lat.toFixed(2) + '°N, ' + res.lon.toFixed(2) + '°E';
    let h = head(nm);
    if (res.nearest) h += '<div class="ssub">' + x().nearest(pick(res.nearest, 'n'), 0) + '</div>';
    else h += '<div class="ssub">' + (res.nearestKm != null ? x().nearest('—', res.nearestKm).replace('— ', '') : '') + '</div>';
    h += '<p class="shint">' + x().distinct(res.distinctRealms) + '</p>';
    h += '<div class="strip">' + res.rows.map((r, i) => {
      const c = r.polities[0] ? r.polities[0].color : '#d6cdbd';
      return '<i data-e="' + i + '" style="background:' + c + '" title="' + escapeHtml(pick(ERAS[i], 'yearLabel')) + '"' + (i === A.state.i ? ' class="cur"' : '') + '></i>';
    }).join('') + '</div>';
    if (res.events && res.events.length) {
      h += '<h4>' + x().here + '</h4><ul class="here">' + res.events.map((o) =>
        '<li data-e="' + o.era + '"><b>' + escapeHtml(pick(o.event, 'label')) + '</b> ' + escapeHtml(pick(o.event, 'title')) + '</li>').join('') + '</ul>';
    }
    h += '<ul class="trows">' + res.rows.map((r, i) => {
      const chips = r.polities.length
        ? r.polities.map((p) => '<span class="tchip"' + (p.near ? ' title="' + x().nearTip(p.nearKm) + '"' : '') + '><i style="background:' + p.color + '"></i>' + (p.near ? '≈ ' : '') + escapeHtml(pick(p, 'name')) + '</span>').join('')
        : '<span class="tnone">' + x().outside + '</span>';
      const pl = r.place ? '<div class="tplace">' + escapeHtml(pick(r.place, 'n')) + ' — ' + escapeHtml(pick(r.place, 'note') || '') + '</div>' : '';
      return '<li data-e="' + i + '"' + (i === A.state.i ? ' class="cur"' : '') + '><b>' + escapeHtml(pick(ERAS[i], 'yearLabel')) + '</b><div>' + chips + pl + '</div></li>';
    }).join('') + '</ul>';
    sheet.innerHTML = h; bindClose();
    sheet.querySelectorAll('[data-e]').forEach((el) => el.addEventListener('click', () => A.go(+el.dataset.e)));
  }
  document.addEventListener('click', (ev) => {
    const b = ev.target.closest && ev.target.closest('.trace-btn');
    if (b) { setTrace(true); trace(+b.dataset.lat, +b.dataset.lon); map.closePopup(); }
  });
  map.on('click', (ev) => { if (mode.trace && !A.isBusy()) trace(ev.latlng.lat, ev.latlng.lng); });

  // ---------- people ----------
  function nearestEra(y) {
    let best = 0, bd = Infinity;
    ERAS.forEach((e, i) => { const d = Math.abs(e.year - y); if (d < bd) { bd = d; best = i; } });
    return best;
  }
  function clearPeople() {
    peopleAnims.forEach((a) => a.stop()); peopleAnims = []; peopleLayer.clearLayers();
  }
  function drawPerson(p) {
    const pts = p.stops.map((s) => s.ll);
    const rt = { pts: smooth(pts, 6), color: p.color, n: pick(p, 'name'), note: pick(p, 'role'), mode: ({ ashoka: 'horse', akbar: 'horse', shivaji: 'horse' })[p.id] || 'walker' };
    const o = A.makeRoute(rt, peopleLayer, { noStart: true });
    peopleAnims.push(o);
    p.stops.forEach((s, i) => {
      L.marker(s.ll, { icon: L.divIcon({ className: 'stopnum', html: '<span style="background:' + p.color + '">' + (i + 1) + '</span>', iconSize: [22, 22] }) })
        .bindPopup('<b>' + escapeHtml(pick(p, 'name')) + ' · ' + (i + 1) + '. ' + escapeHtml(pick(s, 'n')) + '</b><br><i>' + escapeHtml(pick(s, 'l')) + '</i><br>' + escapeHtml(pick(s, 'note') || ''))
        .addTo(peopleLayer);
    });
    return pts;
  }
  function showPeople(ids, doGo) {
    clearPeople();
    const ps = ids.map((id) => PEOPLE.find((p) => p.id === id)).filter(Boolean);
    if (!ps.length) return;
    if (doGo && ps.length === 1) A.go(nearestEra(ps[0].focus));
    let all = [];
    ps.forEach((p) => { all = all.concat(drawPerson(p)); });
    map.fitBounds(L.latLngBounds(all), { paddingTopLeft: A.padTL(), paddingBottomRight: [20, window.innerWidth > 800 ? 40 : 230], maxZoom: 8 });
  }
  function renderPeople() {
    if (mode.cmp && mode.selected.length > 1) return renderCompare();
    if (mode.current) return renderPerson(PEOPLE.find((p) => p.id === mode.current));
    let h = head(x().peopleTitle) + '<p class="shint">' + x().peopleHint + '</p><ul class="plist">';
    PEOPLE.forEach((p) => {
      h += '<li data-id="' + p.id + '"><input type="checkbox" class="pck" data-id="' + p.id + '"' + (mode.selected.includes(p.id) ? ' checked' : '') + '>' +
        '<span class="chip" style="background:' + p.color + '"></span><div><b>' + escapeHtml(pick(p, 'name')) + '</b><span>' + escapeHtml(pick(p, 'yearsLabel')) + ' · ' + escapeHtml(pick(p, 'role')) + '</span></div></li>';
    });
    h += '</ul><div class="srow"><button id="pCompare"' + (mode.selected.length > 1 ? '' : ' disabled') + '>' + x().compare(mode.selected.length) + '</button><button id="pClear">' + x().clear + '</button></div><p class="shint small">' + x().sources + '</p>';
    sheet.innerHTML = h; bindClose();
    sheet.querySelectorAll('.plist li').forEach((li) => li.addEventListener('click', (ev) => {
      if (ev.target.classList.contains('pck')) return;
      mode.current = li.dataset.id; showPeople([mode.current], true); renderPeople();
    }));
    sheet.querySelectorAll('.pck').forEach((c) => c.addEventListener('change', () => {
      const id = c.dataset.id;
      mode.selected = c.checked ? mode.selected.concat([id]) : mode.selected.filter((v) => v !== id);
      $('pCompare').disabled = mode.selected.length < 2; $('pCompare').textContent = x().compare(mode.selected.length);
    }));
    $('pCompare').addEventListener('click', () => { mode.cmp = true; showPeople(mode.selected, false); renderPeople(); });
    $('pClear').addEventListener('click', () => { clearPeople(); mode.selected = []; mode.current = null; mode.cmp = false; renderPeople(); });
  }
  function backBtn() { return '<button id="pBack">← ' + x().people + '</button>'; }
  function bindBack() { const b = $('pBack'); if (b) b.addEventListener('click', () => { mode.current = null; mode.cmp = false; clearPeople(); renderPeople(); }); }
  function renderPerson(p) {
    let h = head(pick(p, 'name')) + '<div class="ssub">' + escapeHtml(pick(p, 'yearsLabel')) + ' · ' + escapeHtml(pick(p, 'role')) + '</div>';
    h += '<p class="sbio">' + escapeHtml(pick(p, 'bio')) + '</p><h4>' + x().stops + '</h4><ol class="stops">';
    p.stops.forEach((s, i) => {
      h += '<li data-i="' + i + '"><span class="sn" style="background:' + p.color + '">' + (i + 1) + '</span><div><b>' + escapeHtml(pick(s, 'n')) + '</b> <em>' + escapeHtml(pick(s, 'l')) + '</em><div>' + escapeHtml(pick(s, 'note') || '') + '</div></div></li>';
    });
    h += '</ol><div class="srow">' + backBtn() + '<button id="pRe">↻ ' + x().show + '</button></div><p class="shint small">' + x().sources + '</p>';
    sheet.innerHTML = h; bindClose(); bindBack();
    sheet.querySelectorAll('.stops li').forEach((li) => li.addEventListener('click', () => {
      const s = p.stops[+li.dataset.i]; map.flyTo(s.ll, 8, { duration: 0.8 });
    }));
    $('pRe').addEventListener('click', () => showPeople([p.id], true));
  }
  function renderCompare() {
    const ps = mode.selected.map((id) => PEOPLE.find((p) => p.id === id)).filter(Boolean);
    const lo = Math.min.apply(null, ps.map((p) => p.from)), hiY = Math.max.apply(null, ps.map((p) => p.to)), span = hiY - lo || 1;
    let h = head(x().lifespans) + '<div class="axis"><span>' + ys(lo) + '</span><span>' + ys(hiY) + '</span></div><div class="bars">';
    ps.forEach((p) => {
      h += '<div class="brow"><div class="bl">' + escapeHtml(pick(p, 'name')) + '</div><div class="btrack"><i style="left:' + (((p.from - lo) / span) * 100) + '%;width:' + Math.max(1.5, ((p.to - p.from) / span) * 100) + '%;background:' + p.color + '"></i></div><div class="by">' + escapeHtml(pick(p, 'yearsLabel')) + '</div></div>';
    });
    h += '</div>';
    if (ps.length === 2) {
      const [a, b] = ps, o0 = Math.max(a.from, b.from), o1 = Math.min(a.to, b.to);
      h += '<p class="shint">' + (o1 > o0 ? x().overlap(pick(a, 'name'), pick(b, 'name'), o0, o1) : x().gap(pick(a, 'name'), pick(b, 'name'), Math.round(Math.max(a.from, b.from) - Math.min(a.to, b.to)))) + '</p>';
    }
    h += '<ul class="plist small">' + ps.map((p) => '<li data-id="' + p.id + '"><span class="chip" style="background:' + p.color + '"></span><div><b>' + escapeHtml(pick(p, 'name')) + '</b><span>' + escapeHtml(pick(p, 'role')) + '</span></div></li>').join('') + '</ul>';
    h += '<div class="srow">' + backBtn() + '</div>';
    sheet.innerHTML = h; bindClose(); bindBack();
    sheet.querySelectorAll('.plist li').forEach((li) => li.addEventListener('click', () => { mode.cmp = false; mode.current = li.dataset.id; showPeople([mode.current], true); renderPeople(); }));
  }

  // ---------- buttons ----------
  function applyLang() {
    $('btnPeople').textContent = x().people; $('btnTrace').textContent = x().trace; $('btnChart').textContent = x().chart; $('btnRivers').textContent = x().rivers; $('btnWorks').textContent = x().works;
    renderSheet(); drawRivers(); drawWorks();
  }
  $('btnPeople').addEventListener('click', () => { if (mode.sheet === 'people') closeSheet(); else { if (mode.trace) setTrace(false); openSheet('people'); } });
  $('btnTrace').addEventListener('click', () => setTrace(!mode.trace));
  $('btnChart').addEventListener('click', () => { if (mode.sheet === 'chart') closeSheet(); else { if (mode.trace) setTrace(false); openSheet('chart'); } });
  $('btnRivers').addEventListener('click', () => { mode.rivers = !mode.rivers; $('btnRivers').classList.toggle('on', mode.rivers); drawRivers(); A.toast(mode.rivers ? x().riversOn : x().riversOff); });
  $('btnWorks').addEventListener('click', () => { mode.works = !mode.works; $('btnWorks').classList.toggle('on', mode.works); drawWorks(); A.toast(mode.works ? x().worksOn : x().worksOff); });
  $('btnRivers').classList.add('on'); $('btnWorks').classList.add('on');
  document.addEventListener('atlas:render', () => { if (mode.sheet === 'realm') { mode.sheet = null; sheet.hidden = true; sheet.innerHTML = ''; } addPanelButtons(); if (mode.sheet === 'chart') renderChart(); drawRivers(); drawWorks(); if (mode.sheet === 'trace' && mode.lastTrace) renderTrace(mode.lastTrace); });
  document.addEventListener('atlas:lang', applyLang);

  // ---------- realm card (click a kingdom) ----------
  const NOTES = window.ATLAS_REALM_NOTES || [];
  function realmNote(p) {
    const n = p.name.toLowerCase(), f = NOTES.find((x) => n.indexOf(x.k) >= 0);
    return f ? (hi() ? f.hi : f.en) : null;
  }
  const STOP = /^(empire|kingdom|kingdoms|states|state|other|early|late|declining|resurgent|fading|approx|core|founded|from|the|and|of|new|northern|southern|eastern|western)$/;
  function keyWords(p) { return p.name.toLowerCase().replace(/[^a-z ]/g, ' ').split(/\s+/).filter((w) => w.length >= 5 && !STOP.test(w)); }
  function realmKm(p) { const km = polityKm2(p); return km >= 1e6 ? (km / 1e6).toFixed(2) + ' M km²' : Math.round(km / 1000) + ' k km²'; }
  function renderRealm() {
    const e = ERAS[A.state.i], ps = A.polities(e), p = ps[mode.realmI];
    if (!p) { closeSheet(); return; }
    const L2 = [];
    const inside = (ll) => CORE.polityContains(p, ll[0], ll[1]);
    const places = e.places.filter((pl) => inside(pl.ll)), events = e.events.filter((ev) => inside(ev.ll));
    const poly = A.getPoly(mode.realmI), bounds = poly && poly.getBounds();
    const near = ps.map((q, j) => ({ q, j })).filter((o) => o.j !== mode.realmI && A.getPoly(o.j) && bounds && bounds.intersects(A.getPoly(o.j).getBounds()));
    const kw = keyWords(p), then = [];
    ERAS.forEach((er, ei) => { if (ei === A.state.i) return; A.polities(er).forEach((q, qj) => { if (kw.some((w) => q.name.toLowerCase().indexOf(w) >= 0)) then.push({ ei, qj, q }); }); });
    let h = head(pick(p, 'name')) + '<div class="ssub">' + escapeHtml(pick(e, 'yearLabel')) + ' · ' + escapeHtml(pick(e, 'name')) + '</div>';
    h += '<div class="rstat"><span class="swatch" style="background:' + A.mute(p.color, 'fill') + '"></span><span>' + x().realmArea + ' <b>' + realmKm(p) + '</b></span></div>';
    h += '<p class="sbio">' + escapeHtml(realmNote(p) || x().realmGeneric(GEO[e.geo].snapshot)) + '</p>';
    if (places.length) h += '<h4>' + x().realmPlaces + '</h4><ul class="here rp">' + places.map((pl, k) => '<li data-pl="' + k + '"><b>' + escapeHtml(pick(pl, 'n')) + '</b> ' + escapeHtml(pick(pl, 'note') || '') + '</li>').join('') + '</ul>';
    if (events.length) h += '<h4>' + x().realmEvents + '</h4><ul class="here re">' + events.map((ev, k) => '<li data-ev="' + k + '"><b>' + escapeHtml(pick(ev, 'label')) + '</b> ' + escapeHtml(pick(ev, 'title')) + '</li>').join('') + '</ul>';
    if (near.length) h += '<h4>' + x().realmNear + '</h4><div class="chips2">' + near.map((o) => '<button type="button" data-j="' + o.j + '"><i style="background:' + A.mute(o.q.color, 'fill') + '"></i>' + escapeHtml(pick(o.q, 'name')) + '</button>').join('') + '</div>';
    if (then.length) h += '<h4>' + x().realmThen + '</h4><ul class="here rt">' + then.slice(0, 8).map((o, k) => '<li data-k="' + k + '"><b>' + escapeHtml(pick(ERAS[o.ei], 'yearLabel')) + '</b> ' + escapeHtml(pick(o.q, 'name')) + '</li>').join('') + '</ul>';
    h += '<div class="srow"><button id="rZoom" type="button">' + x().realmZoom + '</button><button id="rClear" type="button">' + x().realmClear + '</button></div>';
    sheet.innerHTML = h; bindClose();
    sheet.querySelectorAll('.rp li').forEach((li) => li.addEventListener('click', () => map.flyTo(places[+li.dataset.pl].ll, 8, { duration: 0.8 })));
    sheet.querySelectorAll('.re li').forEach((li) => li.addEventListener('click', () => map.flyTo(events[+li.dataset.ev].ll, 8, { duration: 0.8 })));
    sheet.querySelectorAll('.chips2 button').forEach((b) => b.addEventListener('click', () => A.selectRealm(+b.dataset.j)));
    sheet.querySelectorAll('.rt li').forEach((li) => li.addEventListener('click', () => { const o = then[+li.dataset.k]; A.go(o.ei); A.selectRealm(o.qj); }));
    $('rZoom').addEventListener('click', () => A.focusPoly(mode.realmI));
    $('rClear').addEventListener('click', () => A.clearRealm());
    void L2;
  }
  document.addEventListener('atlas:realm', (ev) => {
    const i = ev.detail.i;
    if (i == null) { if (mode.sheet === 'realm') closeSheet(); return; }
    if (mode.trace) setTrace(false);
    mode.realmI = i; mode.sheet = 'realm'; sheet.hidden = false; renderRealm();
    if (ev.detail.fit) A.focusPoly(i);
  });

  // ---------- territory chart ----------
  const GENERIC = /kingdoms|cultures|principalities|republics|janapadas|remnants|other |small /i;
  const BOX = { lon0: 59, lon1: 98, lat0: 5, lat1: 38 };

  function clipRing(ring) { // ring = [[lat, lon], ...]; Sutherland–Hodgman against BOX
    let pts = ring.slice(0, ring[0][0] === ring[ring.length - 1][0] && ring[0][1] === ring[ring.length - 1][1] ? -1 : undefined);
    const edges = [
      [(p) => p[1] >= BOX.lon0, (a, b) => { const t = (BOX.lon0 - a[1]) / (b[1] - a[1]); return [a[0] + t * (b[0] - a[0]), BOX.lon0]; }],
      [(p) => p[1] <= BOX.lon1, (a, b) => { const t = (BOX.lon1 - a[1]) / (b[1] - a[1]); return [a[0] + t * (b[0] - a[0]), BOX.lon1]; }],
      [(p) => p[0] >= BOX.lat0, (a, b) => { const t = (BOX.lat0 - a[0]) / (b[0] - a[0]); return [BOX.lat0, a[1] + t * (b[1] - a[1])]; }],
      [(p) => p[0] <= BOX.lat1, (a, b) => { const t = (BOX.lat1 - a[0]) / (b[0] - a[0]); return [BOX.lat1, a[1] + t * (b[1] - a[1])]; }]
    ];
    edges.forEach(([inside, inter]) => {
      const out = [];
      for (let i = 0; i < pts.length; i++) {
        const cur = pts[i], prev = pts[(i + pts.length - 1) % pts.length];
        const ci = inside(cur), pi = inside(prev);
        if (ci !== pi) out.push(inter(prev, cur));
        if (ci) out.push(cur);
      }
      pts = out;
    });
    return pts;
  }
  function ringKm2(ring) {
    if (ring.length < 3) return 0;
    const lat0 = ring.reduce((s, c) => s + c[0], 0) / ring.length, kx = 111.32 * Math.cos((lat0 * Math.PI) / 180), ky = 110.57;
    let a = 0;
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) a += (ring[j][1] * kx) * (ring[i][0] * ky) - (ring[i][1] * kx) * (ring[j][0] * ky);
    return Math.abs(a) / 2;
  }
  function polityKm2(p) {
    let total = 0;
    p.polys.forEach((poly) => { total += ringKm2(clipRing(poly[0])); for (let h = 1; h < poly.length; h++) total -= ringKm2(clipRing(poly[h])); });
    return Math.max(0, total);
  }
  let chartCache = null;
  function chartData() {
    if (chartCache) return chartCache;
    chartCache = ERAS.map((e, i) => {
      const ps = GEO[e.geo].polities.filter((p) => !p.approx && !GENERIC.test(p.name)).map((p) => ({ p, km2: polityKm2(p) })).sort((a, b) => b.km2 - a.km2);
      return { i, top: ps[0] || null };
    });
    return chartCache;
  }
  function renderChart() {
    const d = chartData(), max = Math.max.apply(null, d.map((r) => (r.top ? r.top.km2 : 0))) || 1;
    let h = head(x().chartTitle) + '<p class="shint">' + x().chartHint + '</p><ul class="chart">';
    d.forEach((r) => {
      if (!r.top) return;
      const mk = (r.top.km2 / 1e6).toFixed(1);
      h += '<li data-e="' + r.i + '"' + (r.i === A.state.i ? ' class="cur"' : '') + '><div class="cl"><b>' + escapeHtml(pick(ERAS[r.i], 'yearLabel')) + '</b><span>' + escapeHtml(pick(r.top.p, 'name')) + '</span></div>' +
        '<div class="cbar"><i style="width:' + Math.max(2, (r.top.km2 / max) * 100) + '%;background:' + r.top.p.color + '"></i><em>' + mk + ' M km²</em></div></li>';
    });
    h += '</ul><p class="shint small">' + x().chartNote + '</p>';
    sheet.innerHTML = h; bindClose();
    sheet.querySelectorAll('.chart li').forEach((li) => li.addEventListener('click', () => A.go(+li.dataset.e)));
  }

  // ---------- SVG export ----------
  function eraSvg(i, lang) {
    lang = lang || A.state.lang;
    const e = ERAS[i], g = GEO[e.geo], w = 900, h = Math.round((w * (BOX.lat1 - BOX.lat0)) / (BOX.lon1 - BOX.lon0));
    const pk = (o, k) => (lang === 'hi' && o[k + 'Hi']) ? o[k + 'Hi'] : o[k];
    const pr = (c) => [((c[1] - BOX.lon0) / (BOX.lon1 - BOX.lon0) * w).toFixed(1), ((BOX.lat1 - c[0]) / (BOX.lat1 - BOX.lat0) * h).toFixed(1)].join(',');
    let s = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + w + ' ' + h + '" width="' + w + '" height="' + h + '"><rect width="' + w + '" height="' + h + '" fill="#dbe7ea"/>';
    g.polities.forEach((p) => {
      const d = p.polys.map((poly) => poly.map((ring) => 'M' + ring.map(pr).join('L') + 'Z').join('')).join('');
      s += '<path d="' + d + '" fill="' + p.color + '" fill-opacity="' + (p.approx ? 0.15 : 0.45) + '" fill-rule="evenodd" stroke="' + p.color + '" stroke-width="1.4"' + (p.approx ? ' stroke-dasharray="6 4"' : '') + '><title>' + escapeHtml(pk(p, 'name')) + '</title></path>';
    });
    e.places.forEach((pl) => {
      const q = pr(pl.ll).split(',');
      s += '<circle cx="' + q[0] + '" cy="' + q[1] + '" r="3.2" fill="#2a1f14" stroke="#fff"/><text x="' + (+q[0] + 5) + '" y="' + (+q[1] + 3) + '" font-size="9" font-family="sans-serif" fill="#2a1f14" stroke="#fff" stroke-width="2.2" paint-order="stroke">' + escapeHtml(pk(pl, 'n')) + '</text>';
    });
    s += '<text x="10" y="' + (h - 10) + '" font-size="13" font-family="Georgia,serif" fill="#3b2a18">' + escapeHtml(pk(e, 'yearLabel') + ' — ' + pk(e, 'name')) + '</text></svg>';
    return s;
  }
  function downloadSvg() {
    const svg = eraSvg(A.state.i), blob = new Blob([svg], { type: 'image/svg+xml' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = 'atlas-of-india-' + ERAS[A.state.i].geo + '.svg';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    A.toast(x().svgSaved);
  }
  function addPanelButtons() {
    const yr = document.querySelector('#panel .p-tools');
    if (!yr || yr.querySelector('.dl')) return;
    const b = document.createElement('button');
    b.className = 'mini-btn dl'; b.type = 'button'; b.title = x().svgTip; b.setAttribute('aria-label', x().svgTip); b.textContent = x().saveSvg;
    b.addEventListener('click', downloadSvg);
    yr.appendChild(b);
  }

  // ---------- "more tools" menu ----------
  (function () {
    const btn = $('btnMore'), menu = $('moreMenu');
    const close = () => { menu.hidden = true; btn.setAttribute('aria-expanded', 'false'); btn.classList.remove('on'); };
    btn.addEventListener('click', (e) => { e.stopPropagation(); menu.hidden = !menu.hidden; btn.setAttribute('aria-expanded', String(!menu.hidden)); btn.classList.toggle('on', !menu.hidden); });
    menu.addEventListener('click', close);
    document.addEventListener('click', (e) => { if (!e.target.closest('.more')) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  })();

  // ---------- embed + public API ----------
  if (/[?&#]embed=1/.test(window.ATLAS_INITIAL_URL || location.href)) document.body.classList.add('embed');

  const api = {
    version: '1.0',
    eras: () => ERAS.map((e, i) => ({ index: i, year: e.year, label: e.yearLabel, name: e.name, nameHi: e.nameHi })),
    era: (i) => { const e = ERAS[i]; return e && { index: i, year: e.year, name: e.name, tag: e.tag, story: e.story, realms: GEO[e.geo].polities.map((p) => p.name), places: e.places.map((p) => ({ name: p.n, ll: p.ll })), events: e.events.map((v) => ({ title: v.title, year: v.year, place: v.place, ll: v.ll })) }; },
    goto: (i) => { A.go(i); return A.state.i; },
    setLang: (l) => A.setLang(l),
    search: (q) => A.search(q),
    trace: (lat, lon) => { setTrace(true); trace(lat, lon); const r = mode.lastTrace; return r.rows.map((row) => ({ era: ERAS[row.era].yearLabel, realms: row.polities.map((p) => (p.near ? '≈ ' : '') + p.name) })); },
    people: () => PEOPLE.map((p) => ({ id: p.id, name: p.name, years: p.yearsLabel })),
    showPerson: (id) => { openSheet('people'); mode.cmp = false; mode.current = id; showPeople([id], true); renderPeople(); },
    compare: (ids) => { openSheet('people'); mode.selected = ids; mode.cmp = true; mode.current = null; showPeople(ids, false); renderPeople(); },
    flyTo: (lat, lon, z) => map.flyTo([lat, lon], z || 7),
    exportSVG: (i, lang) => eraSvg(i == null ? A.state.i : i, lang),
    territory: () => chartData().map((r) => ({ era: ERAS[r.i].yearLabel, realm: r.top && r.top.p.name, millionKm2: r.top && +(r.top.km2 / 1e6).toFixed(2) })),
    startTour: () => A.startTour(), stopTour: () => A.stopTour(),
    journeys: () => (window.ATLAS_JOURNEYS ? window.ATLAS_JOURNEYS.list() : []),
    startJourney: (id) => { if (window.ATLAS_JOURNEYS) window.ATLAS_JOURNEYS.start(String(id)); },
    stopJourney: () => { if (window.ATLAS_JOURNEYS) window.ATLAS_JOURNEYS.stop(false); },
    thenNow: (on) => { if (window.ATLAS_NOW) { if (on === false) window.ATLAS_NOW.off(); else window.ATLAS_NOW.on(); } },
    state: () => ({ era: A.state.i, lang: A.state.lang, tour: A.tour.on, journey: window.ATLAS_JOURNEYS ? window.ATLAS_JOURNEYS.state() : null, thenNow: window.ATLAS_NOW ? window.ATLAS_NOW.isOn() : false })
  };
  window.atlasAPI = api;

  window.addEventListener('message', (ev) => {
    const m = ev.data; if (!m || typeof m !== 'object' || !m.atlas) return;
    const fn = api[m.atlas]; if (typeof fn !== 'function') return;
    let out; try { out = fn.apply(null, m.args || []); } catch (e) { out = { error: String(e) }; }
    if (ev.source && ev.source.postMessage) ev.source.postMessage({ atlasReply: m.atlas, id: m.id, result: out }, ev.origin && ev.origin !== 'null' ? ev.origin : '*');
  });
  document.addEventListener('atlas:render', (ev) => {
    if (window.parent !== window) window.parent.postMessage({ atlasEvent: 'era', index: ev.detail.i }, '*');
  });

  applyLang();
  const q = /[?&#]person=(\w+)/.exec(window.ATLAS_INITIAL_URL || location.href); if (q && PEOPLE.some((p) => p.id === q[1])) api.showPerson(q[1]);
  const tr = /[?&#]trace=(-?[\d.]+),(-?[\d.]+)/.exec(window.ATLAS_INITIAL_URL || location.href); if (tr) { setTrace(true); trace(+tr[1], +tr[2]); }
})();
