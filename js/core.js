/*
 * Pure geometry/lookup helpers shared by the browser app and the Node tools (MCP server, GeoJSON export).
 * Coordinates are [lat, lon]. A polity's `polys` = array of polygons; each polygon = [outerRing, ...holes].
 */
(function (root) {
  'use strict';

  function ringContains(ring, lat, lon) {
    let inside = false;
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const yi = ring[i][0], xi = ring[i][1], yj = ring[j][0], xj = ring[j][1];
      if ((yi > lat) !== (yj > lat) && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) inside = !inside;
    }
    return inside;
  }

  function polyContains(poly, lat, lon) {
    if (!ringContains(poly[0], lat, lon)) return false;
    for (let h = 1; h < poly.length; h++) if (ringContains(poly[h], lat, lon)) return false;
    return true;
  }

  function polityContains(p, lat, lon) {
    return p.polys.some((poly) => polyContains(poly, lat, lon));
  }

  function haversine(a, b) {
    const R = 6371, rad = Math.PI / 180;
    const dLat = (b[0] - a[0]) * rad, dLon = (b[1] - a[1]) * rad;
    const x = Math.sin(dLat / 2) ** 2 + Math.cos(a[0] * rad) * Math.cos(b[0] * rad) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(x));
  }

  /** Approximate distance (km) from a point to the nearest edge of a polity (planar, fine at this scale). */
  function distToPolityKm(p, lat, lon) {
    const kx = 111.32 * Math.cos((lat * Math.PI) / 180), ky = 110.57;
    let best = Infinity;
    p.polys.forEach((poly) => {
      const ring = poly[0];
      for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
        const ax = (ring[j][1] - lon) * kx, ay = (ring[j][0] - lat) * ky, bx = (ring[i][1] - lon) * kx, by = (ring[i][0] - lat) * ky;
        const dx = bx - ax, dy = by - ay, l2 = dx * dx + dy * dy;
        const t = l2 ? Math.max(0, Math.min(1, -(ax * dx + ay * dy) / l2)) : 0;
        const d = Math.hypot(ax + t * dx, ay + t * dy);
        if (d < best) best = d;
      }
    });
    return best;
  }

  /** Which polities covered [lat, lon] in each era; plus the nearest known place (any era).
   *  Boundaries are generalised, so a point within COAST_KM of a realm's edge counts as "near" (flagged). */
  const COAST_KM = 45;
  function traceAt(eras, geo, lat, lon) {
    const rows = eras.map((e, i) => {
      let hits = geo[e.geo].polities.filter((p) => polityContains(p, lat, lon));
      if (!hits.length) {
        let nb = null;
        geo[e.geo].polities.forEach((p) => { const d = distToPolityKm(p, lat, lon); if (d <= COAST_KM && (!nb || d < nb.km)) nb = { p, km: d }; });
        if (nb) hits = [Object.assign({}, nb.p, { near: true, nearKm: Math.round(nb.km) })];
      }
      const near = e.places
        .map((pl) => ({ pl, d: haversine([lat, lon], pl.ll) }))
        .filter((x) => x.d < 80).sort((a, b) => a.d - b.d)[0];
      return { era: i, polities: hits, place: near ? near.pl : null };
    });
    let best = null;
    eras.forEach((e) => e.places.forEach((pl) => {
      const d = haversine([lat, lon], pl.ll);
      if (!best || d < best.d) best = { pl, d };
    }));
    const events = [];
    eras.forEach((e, i) => e.events.forEach((v) => {
      const d = haversine([lat, lon], v.ll);
      if (d < 60) events.push({ era: i, event: v, km: Math.round(d) });
    }));
    const names = new Set();
    rows.forEach((r) => r.polities.forEach((p) => names.add(p.name)));
    return { lat, lon, rows, nearest: best && best.d < 60 ? best.pl : null, nearestKm: best ? Math.round(best.d) : null, distinctRealms: names.size, events };
  }

  const api = { ringContains, polyContains, polityContains, distToPolityKm, haversine, traceAt };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.ATLAS_CORE = api;
})(typeof window !== 'undefined' ? window : globalThis);
