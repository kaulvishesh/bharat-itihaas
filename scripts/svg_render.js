// Renders an era's boundaries to a standalone SVG (equirectangular). Used by build_topics.js.
'use strict';

const BOX = { lon0: 59, lon1: 98, lat0: 5, lat1: 38 };

function project(lat, lon, w, h) {
  const x = ((lon - BOX.lon0) / (BOX.lon1 - BOX.lon0)) * w;
  const y = ((BOX.lat1 - lat) / (BOX.lat1 - BOX.lat0)) * h;
  return [Math.round(x * 10) / 10, Math.round(y * 10) / 10];
}

function esc(s) { return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }

function renderEra(era, geo, opts) {
  opts = opts || {};
  const w = opts.width || 720;
  const h = Math.round((w * (BOX.lat1 - BOX.lat0)) / (BOX.lon1 - BOX.lon0));
  const lang = opts.lang || 'en';
  const pick = (o, k) => (lang === 'hi' && o[k + 'Hi']) ? o[k + 'Hi'] : o[k];
  let svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="' + esc(pick(era, 'name')) + '">';
  svg += '<rect width="' + w + '" height="' + h + '" fill="#dbe7ea"/>';
  // light graticule every 5 degrees
  for (let lon = 60; lon <= 95; lon += 5) { const a = project(BOX.lat0, lon, w, h), b = project(BOX.lat1, lon, w, h); svg += '<line x1="' + a[0] + '" y1="' + a[1] + '" x2="' + b[0] + '" y2="' + b[1] + '" stroke="#fff" stroke-opacity=".5"/>'; }
  for (let lat = 10; lat <= 35; lat += 5) { const a = project(lat, BOX.lon0, w, h), b = project(lat, BOX.lon1, w, h); svg += '<line x1="' + a[0] + '" y1="' + a[1] + '" x2="' + b[0] + '" y2="' + b[1] + '" stroke="#fff" stroke-opacity=".5"/>'; }
  geo.polities.forEach((p) => {
    const d = p.polys.map((poly) => poly.map((ring) => 'M' + ring.map((c) => project(c[0], c[1], w, h).join(',')).join('L') + 'Z').join('')).join('');
    svg += '<path d="' + d + '" fill="' + p.color + '" fill-opacity="' + (p.approx ? 0.15 : 0.45) + '" fill-rule="evenodd" stroke="' + p.color + '" stroke-width="1.4"' + (p.approx ? ' stroke-dasharray="6 4"' : '') + '><title>' + esc(pick(p, 'name')) + '</title></path>';
  });
  (era.places || []).forEach((pl) => {
    const [x, y] = project(pl.ll[0], pl.ll[1], w, h);
    svg += '<circle cx="' + x + '" cy="' + y + '" r="3.2" fill="#2a1f14" stroke="#fff" stroke-width="1"/>';
    if (opts.labels !== false) svg += '<text x="' + (x + 5) + '" y="' + (y + 3) + '" font-size="9" font-family="sans-serif" fill="#2a1f14" stroke="#fff" stroke-width="2.2" paint-order="stroke">' + esc(pick(pl, 'n')) + '</text>';
  });
  svg += '<text x="10" y="' + (h - 10) + '" font-size="12" font-family="Georgia,serif" fill="#3b2a18">' + esc(pick(era, 'yearLabel')) + ' — ' + esc(pick(era, 'name')) + '</text>';
  svg += '</svg>';
  return svg;
}

module.exports = { renderEra, project, BOX };
