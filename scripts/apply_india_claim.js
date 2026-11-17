#!/usr/bin/env node
/*
 * Draws the present-day India (the 1960 and 2010 eras) as India officially shows itself: all of Jammu & Kashmir and
 * Ladakh, including Gilgit-Baltistan, the area Pakistan administers and Aksai Chin. In India, maps are expected to follow the
 * Survey of India's depiction of the external boundary, and the generic world datasets draw these areas differently.
 *
 * It uses Natural Earth's own "India point of view" country file (public domain): inside a box around Kashmir, India is
 * redrawn from that file, and the same area is cut out of Pakistan's polygon, so the two never overlap.
 * Natural Earth is an approximation, not the Survey of India's official file, and it may differ in small details (for
 * example the Kalapani area on the Nepal border), so check it against the official outline if exactness matters.
 *
 * Run it AFTER scripts/build_geo.py (that script regenerates geo.js from the raw snapshots and would undo this):
 *   mkdir "$TMP/claim-tools" && echo '{"dependencies":{"polygon-clipping":"0.15.7"}}' > "$TMP/claim-tools/package.json" && (cd "$TMP/claim-tools" && npm i)
 *   curl -L -o raw-data/ne/ne_10m_admin_0_countries_ind.geojson https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_0_countries_ind.geojson
 *   CLAIM_MODULES="$TMP/claim-tools" node scripts/apply_india_claim.js
 * Then re-run export_geojson.js, export_data.js and build_topics.js so the static outputs match.
 */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..'), GEO = path.join(ROOT, 'india-atlas', 'js', 'geo.js'), NE = path.join(ROOT, 'raw-data', 'ne');
const pc = require('module').createRequire(path.join(process.env.CLAIM_MODULES || path.join(__dirname, 'claim'), 'x.js'))('polygon-clipping');

const MARK = '/* India (1960, 2010): redrawn to India\'s official position by scripts/apply_india_claim.js (Natural Earth, India point of view). */';
const ERAS = { '1960': { india: 'Republic of India', neighbour: 'Pakistan (West & East)' }, '2010': { india: 'India', neighbour: 'Pakistan' } };
const BOX = [[[[72.7, 32.4], [81.6, 32.4], [81.6, 37.6], [72.7, 37.6], [72.7, 32.4]]]];   // [lon, lat]: Jammu & Kashmir, Ladakh, Gilgit-Baltistan, Aksai Chin

const indMP = (() => { const g = JSON.parse(fs.readFileSync(path.join(NE, 'ne_10m_admin_0_countries_ind.geojson'), 'utf8')).features.find((f) => f.properties.ADMIN === 'India').geometry; return g.type === 'Polygon' ? [g.coordinates] : g.coordinates; })();
const claim = pc.intersection(indMP, BOX);

const ours2pc = (polys) => polys.map((poly) => poly.map((ring) => ring.map(([la, lo]) => [lo, la])));
const area = (ring) => { let a = 0; for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) a += (ring[j][0] + ring[i][0]) * (ring[j][1] - ring[i][1]); return Math.abs(a / 2); };
const mpArea = (mp) => mp.reduce((s, p) => s + p.reduce((t, r, k) => t + (k ? -area(r) : area(r)), 0), 0);
function dp(pts, tol) { // Douglas-Peucker on an open polyline
  if (pts.length < 3) return pts;
  const keep = new Uint8Array(pts.length); keep[0] = keep[pts.length - 1] = 1; const st = [[0, pts.length - 1]];
  while (st.length) {
    const [a, b] = st.pop(); let dmax = 0, im = -1;
    const [x1, y1] = pts[a], [x2, y2] = pts[b], dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1e-12;
    for (let i = a + 1; i < b; i++) { const d = Math.abs(dy * (pts[i][0] - x1) - dx * (pts[i][1] - y1)) / L; if (d > dmax) { dmax = d; im = i; } }
    if (dmax > tol) { keep[im] = 1; st.push([a, im], [im, b]); }
  }
  return pts.filter((_, i) => keep[i]);
}
const r2 = (n) => Math.round(n * 100) / 100;
function simplifyRing(open, tol) { // a closed ring has identical ends, so split it at the point farthest from the start first
  let m = 1, best = -1; open.forEach((p, i) => { const d = Math.hypot(p[0] - open[0][0], p[1] - open[0][1]); if (d > best) { best = d; m = i; } });
  const a = dp(open.slice(0, m + 1), tol), b = dp(open.slice(m).concat([open[0]]), tol);
  return a.slice(0, -1).concat(b.slice(0, -1));
}
function pc2ours(mp) {
  const out = [];
  mp.forEach((poly) => {
    const rings = poly.map((ring) => { const open = ring.slice(0, -1).map(([lo, la]) => [la, lo]); const pts = (open.length > 8 ? simplifyRing(open, 0.012) : open).map(([la, lo]) => [r2(la), r2(lo)]); const c = pts.filter((p, i) => i === 0 || p[0] !== pts[i - 1][0] || p[1] !== pts[i - 1][1]); c.push(c[0]); return c; }).filter((r) => r.length >= 4);
    if (rings.length && area(rings[0]) > 0.002) out.push(rings);   // drop slivers smaller than ~20 km2
  });
  return out;
}

const src = fs.readFileSync(GEO, 'utf8'), head = src.split('\n')[0];
const ctx = {}; ctx.window = ctx; vm.createContext(ctx); vm.runInContext(src, ctx);
const G = ctx.ATLAS_GEO, rep = [];
Object.keys(ERAS).forEach((k) => {
  const ps = G[k].polities, ind = ps.find((p) => p.name === ERAS[k].india), nb = ps.find((p) => p.name === ERAS[k].neighbour);
  if (!ind || !nb) throw new Error('era ' + k + ': expected polities not found');
  const a0 = mpArea(ours2pc(ind.polys)), b0 = mpArea(ours2pc(nb.polys));
  const indNew = pc.union(ours2pc(ind.polys), claim), nbNew = pc.difference(ours2pc(nb.polys), claim);
  ind.polys = pc2ours(indNew); nb.polys = pc2ours(nbNew);
  rep.push(k + ': India ' + a0.toFixed(1) + ' -> ' + mpArea(indNew).toFixed(1) + ' sq deg; ' + ERAS[k].neighbour + ' ' + b0.toFixed(1) + ' -> ' + mpArea(nbNew).toFixed(1) +
    '; overlap India/neighbour ' + mpArea(pc.intersection(indNew, nbNew)).toFixed(4));
});
fs.writeFileSync(GEO, head + '\n' + MARK + '\nwindow.ATLAS_GEO = ' + JSON.stringify(G) + ';\n');
console.log(rep.join('\n')); console.log('claimed area (box) ' + mpArea(claim).toFixed(1) + ' sq deg; geo.js now ' + Math.round(fs.statSync(GEO).size / 1024) + ' KB');
