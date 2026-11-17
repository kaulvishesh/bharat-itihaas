/*
 * Level of detail: as you zoom in, little drawings fill the map — a fort with each realm's colours,
 * rows of mountains, forests, market towns, temples, stupas, forts, mosques, harbours and rest-houses.
 * Everything uses the shared pictograms in icons.js. Only features that existed in the current era appear.
 */
(function () {
  'use strict';
  const A = window.ATLAS_APP, D = window.ATLAS_DETAIL;
  if (!A || !D) return;
  const { map, ERAS, hi, pick, escapeHtml } = A;
  const layer = L.layerGroup().addTo(map);
  const S = {
    en: { hint: 'Zoom in for towns, forts, temples, mountains and forests', open: (a, b) => (a == null ? 'since earliest times' : 'from ' + yr(a)) + (b == null ? '' : ' to ' + yr(b)) },
    hi: { hint: 'कस्बे, दुर्ग, मंदिर, पर्वत और वन देखने के लिए ज़ूम करें', open: (a, b) => (a == null ? 'आरंभ से' : yr(a) + ' से') + (b == null ? '' : ' ' + yr(b) + ' तक') }
  };
  const s = () => S[hi() ? 'hi' : 'en'];
  function yr(y) { return y < 0 ? (-y) + (hi() ? ' ई.पू.' : ' BCE') : y + (hi() ? ' ई.' : ' CE'); }

  // deterministic pseudo-random so drawings stay put between redraws
  function rnd(seed) { let t = (seed + 0x6D2B79F5) | 0; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }
  const iconAt = (name, w, h, anchorY, cls) => L.divIcon({ className: 'dg ' + (cls || ''), html: atlasIcon(name), iconSize: [w, h], iconAnchor: [w / 2, anchorY == null ? h * 0.9 : anchorY], popupAnchor: [0, -h * 0.8], tooltipAnchor: [w / 2, -h * 0.3] });

  function centroid(p) { // planar centroid of the largest outer ring
    let best = null, ba = -1;
    p.polys.forEach((poly) => {
      const r = poly[0]; let a = 0;
      for (let i = 0, j = r.length - 1; i < r.length; j = i++) a += r[j][1] * r[i][0] - r[i][1] * r[j][0];
      a = Math.abs(a) / 2; if (a > ba) { ba = a; best = r; }
    });
    let cx = 0, cy = 0, A2 = 0;
    for (let i = 0, j = best.length - 1; i < best.length; j = i++) {
      const f = best[j][1] * best[i][0] - best[i][1] * best[j][0];
      cx += (best[j][1] + best[i][1]) * f; cy += (best[j][0] + best[i][0]) * f; A2 += f;
    }
    return A2 ? [cy / (3 * A2), cx / (3 * A2)] : best[0];
  }
  const CRIM = '#a3302a';
  const emblemIcon = (color) => L.divIcon({ className: 'dg emblem', html: atlasIcon('fort').split(CRIM).join(color), iconSize: [40, 40], iconAnchor: [20, 46], tooltipAnchor: [0, 6] });

  let pending = false;
  function refresh() {
    // never rebuild while one of our popups is open (the pan that opens it would otherwise close it again)
    const src = map._popup && map._popup._source;
    if (src && layer.hasLayer(src)) { pending = true; return; }
    pending = false;
    layer.clearLayers();
    if (A.state.quiz) return;
    const z = map.getZoom();
    if (z < 5.5) return;
    const b = map.getBounds().pad(0.15), e = ERAS[A.state.i], y = e.year;
    const size = Math.round(Math.max(22, Math.min(46, 12 + (z - 5) * 8)));
    const used = e.places.concat(e.events).map((o) => o.ll);
    const taken = []; const near = (ll, list, d) => list.some((q) => Math.abs(q[0] - ll[0]) < d && Math.abs(q[1] - ll[1]) < d * 1.1);

    // realm emblems: a small fort flying the realm's colours
    if (z < 7.8) {
      const ps = A.polities(e), maxA = Math.max.apply(null, ps.map((p) => { const bb = L.polygon(p.polys).getBounds(); return Math.abs((bb.getNorth() - bb.getSouth()) * (bb.getEast() - bb.getWest())); }));
      ps.forEach((p, i) => {
        if (p.approx) return;
        const bb = L.polygon(p.polys).getBounds(), a = Math.abs((bb.getNorth() - bb.getSouth()) * (bb.getEast() - bb.getWest()));
        if (a / maxA < 0.06) return;
        const c = centroid(p); if (!b.contains(c)) return;
        L.marker(c, { icon: emblemIcon(A.mute(p.color, 'band')), zIndexOffset: -200, dcPrio: 3 }).bindTooltip(pick(p, 'name'), { direction: 'bottom', className: 'plabel place' }).on('click', () => A.selectRealm(i)).addTo(layer);
      });
    }

    // mountain chains as rows of peaks
    let count = 0;
    D.ranges.forEach((rg, ri) => {
      const pts = rg.pts.map((q) => map.latLngToContainerPoint(q));
      if (!rg.big && z < 6.4) return;                        // minor ranges only when well zoomed in
      const gw = Math.round(size * (rg.big ? 1.15 : 0.95)), step = gw * 2.1;   // fewer, smaller peaks with air between
      let carry = 0, k = 0;
      for (let i = 1; i < pts.length && count < 70; i++) {
        const dx = pts[i].x - pts[i - 1].x, dy = pts[i].y - pts[i - 1].y, len = Math.hypot(dx, dy);
        let d = step - carry;
        for (; d <= len && count < 70; d += step) {
          const t = d / len, jit = (rnd(ri * 991 + k) - 0.5) * gw * 0.3, sc = 0.8 + rnd(ri * 313 + k * 7) * 0.4;
          const pt = L.point(pts[i - 1].x + dx * t + (-dy / len) * jit, pts[i - 1].y + dy * t + (dx / len) * jit);
          const ll = map.containerPointToLatLng(pt);
          k++;
          if (!b.contains(ll)) continue;
          const w = Math.round(gw * sc), h = Math.round(gw * 0.75 * sc);
          L.marker(ll, { icon: iconAt('mountain', w, h, h * 0.92, 'dg-mtn'), zIndexOffset: Math.round(pt.y) - 600 }).bindPopup('<b>' + escapeHtml(hi() ? rg.nHi : rg.n) + '</b><i>' + (hi() ? 'पर्वत-श्रेणी' : 'Mountain range') + '</i>' + A.wikiSlot(rg.n, rg.nHi), A.POP).addTo(layer); count++;
        }
        carry = (carry + len) % step;
      }
      const mid = rg.pts[Math.floor(rg.pts.length / 2)];
      if (b.contains(mid)) L.marker(mid, { icon: L.divIcon({ className: 'range-label', html: '<span>' + escapeHtml(hi() ? rg.nHi : rg.n) + '</span>', iconSize: [0, 0] }), interactive: false, keyboard: false, zIndexOffset: -300 }).addTo(layer);
    });

    // forests
    if (z >= 6.2) {
      D.forests.forEach((f, fi) => {
        if (!b.contains(f.c)) return;
        const n = Math.min(26, Math.round(8 + (z - 6) * 5)), tw = Math.round(size * 0.78);
        for (let i = 0; i < n; i++) {
          const ang = rnd(fi * 77 + i) * 6.283, rad = Math.sqrt(rnd(fi * 131 + i * 3)) * f.r, dLat = (rad * Math.sin(ang)) / 111, dLon = (rad * Math.cos(ang)) / (111 * Math.cos((f.c[0] * Math.PI) / 180));
          const ll = [f.c[0] + dLat, f.c[1] + dLon]; if (!b.contains(ll)) continue;
          const sc = 0.75 + rnd(fi * 17 + i * 5) * 0.45;
          L.marker(ll, { icon: iconAt('tree', Math.round(tw * sc), Math.round(tw * sc), tw * sc * 0.92, 'dg-tree'), zIndexOffset: -650 }).bindPopup('<b>' + escapeHtml(hi() ? f.nHi : f.n) + '</b><i>' + (hi() ? 'वन' : 'Forest') + '</i>' + A.wikiSlot(f.n, f.nHi), A.POP).addTo(layer);
        }
        if (z >= 6.6) L.marker(f.c, { icon: L.divIcon({ className: 'range-label forest', html: '<span>' + escapeHtml(hi() ? f.nHi : f.n) + '</span>', iconSize: [0, 0] }), interactive: false, keyboard: false }).addTo(layer);
      });
    }

    // towns, forts, shrines, harbours
    const min = { sarai: 7.2 };
    let shown = 0;
    D.items.forEach((it) => {
      const [kind, name, nameHi, la, lo, from, to] = it, ll = [la, lo];
      if ((from != null && y < from) || (to != null && y > to)) return;
      if (z < (min[kind] || 6.3) || !b.contains(ll) || shown > 170) return;
      if (near(ll, used, 0.07) || near(ll, taken, 0.05)) return;
      taken.push(ll); shown++;
      const sz = Math.round(size * (kind === 'sarai' ? 0.78 : 0.9)), kl = D.kinds[kind] || ['', ''];
      const m = L.marker(ll, { icon: iconAt(kind, sz, sz), zIndexOffset: 50 + Math.round(map.latLngToContainerPoint(ll).y) / 20, dcPrio: kind === 'sarai' ? 6 : (kind === 'market' || kind === 'port') ? 5 : 4 })
        .bindPopup('<b>' + escapeHtml(hi() ? nameHi : name) + '</b><i>' + escapeHtml(hi() ? kl[1] : kl[0]) + ' · ' + escapeHtml(s().open(from, to)) + '</i>' + A.wikiSlot(name, nameHi) + A.traceBtn(ll), A.POP)
        .addTo(layer);
      m.bindTooltip(hi() ? nameHi : name, { permanent: z >= 7.4, direction: 'right', offset: [2, 0], className: 'plabel place' });
    });
  }

  let timer = 0;
  const sched = () => { clearTimeout(timer); timer = setTimeout(refresh, 90); };
  map.on('zoomend moveend', sched);
  map.on('popupclose', () => { if (pending) sched(); });
  document.addEventListener('atlas:render', refresh);
  document.addEventListener('atlas:lang', sched);
  refresh();
  try {
    if (!sessionStorage.getItem('atlas-zoom-hint')) {
      sessionStorage.setItem('atlas-zoom-hint', '1');
      setTimeout(() => { if (map.getZoom() < 5.5 && !A.isBusy()) A.toast(s().hint); }, 2600);
    }
  } catch (_) {}
})();
