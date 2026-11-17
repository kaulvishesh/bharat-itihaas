// Writes one GeoJSON FeatureCollection per era to geojson/. Usage: node scripts/export_geojson.js
'use strict';
const fs = require('fs');
const path = require('path');
const { load } = require('./atlas_data');

const { ERAS, GEO } = load();
const out = path.join(__dirname, '..', 'geojson');
fs.mkdirSync(out, { recursive: true });
const index = [];
ERAS.forEach((e, i) => {
  const g = GEO[e.geo];
  const fc = {
    type: 'FeatureCollection',
    properties: { era: e.name, year: e.year, snapshot: g.snapshot, note: 'Approximate, simplified boundaries from aourednik/historical-basemaps (GPL-3.0).' },
    features: g.polities.map((p) => ({
      type: 'Feature',
      properties: { name: p.name, nameHi: p.nameHi, color: p.color, approx: !!p.approx, era: e.name, year: e.year },
      // internal [lat, lon] -> GeoJSON [lon, lat]
      geometry: { type: 'MultiPolygon', coordinates: p.polys.map((poly) => poly.map((ring) => ring.map((c) => [c[1], c[0]]))) }
    }))
  };
  const file = String(i).padStart(2, '0') + '-' + e.geo + '.geojson';
  fs.writeFileSync(path.join(out, file), JSON.stringify(fc));
  index.push({ index: i, file, year: e.year, name: e.name, polities: g.polities.length });
});
fs.writeFileSync(path.join(out, 'index.json'), JSON.stringify(index, null, 2));
console.log('wrote', index.length, 'files to', out);
