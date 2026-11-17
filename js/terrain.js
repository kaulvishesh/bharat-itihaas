/*
 * Map surfaces that come from open, keyless sources (no vendor terms to worry about):
 *   shade()   - the hillshade under the antique atlas
 *   relief()  - the "Relief" base map: hypsometric tint (sea depth, lowland green, brown hills, white peaks) with shading
 *   imagery() - the "Satellite" view and the "today" side of Then & Now
 *
 * shade() and relief() are drawn in the visitor's browser from the public Terrain Tiles dataset (elevation encoded as
 * RGB "terrarium" PNGs on AWS Open Data; built from SRTM and GMTED2010, US Geological Survey, and ETOPO1, NOAA), so the
 * look is ours to control. A tile needs its eight neighbours so the slope at its edges is right; decoded tiles are
 * cached in memory and shared between neighbours.
 * imagery() is NASA's Blue Marble (Next Generation), served by NASA GIBS (NASA data is CC0).
 */
(function () {
  'use strict';
  if (!window.L) return;

  const TERRAIN = 'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/';
  const GIBS = 'https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/BlueMarble_NextGeneration/default/GoogleMapsCompatible_Level8/{z}/{y}/{x}.jpeg';
  const ATTR_ELEV = 'Elevation: USGS (SRTM, GMTED2010), NOAA (ETOPO1), via Mapzen &amp; AWS Terrain Tiles';
  const ATTR_IMG = 'Imagery: NASA Blue Marble, NASA GIBS';

  // ------------------------------------------------------------------ decoded elevation tiles (LRU)
  const cache = new Map(), CACHE_MAX = 120;
  const scratch = document.createElement('canvas'); scratch.width = scratch.height = 256;
  const sctx = scratch.getContext('2d', { willReadFrequently: true });

  function load(z, x, y) {
    const n = 1 << z;
    if (y < 0 || y >= n) return Promise.resolve(null);
    x = ((x % n) + n) % n;
    const key = z + '/' + x + '/' + y;
    let p = cache.get(key);
    if (p) { cache.delete(key); cache.set(key, p); return p; }
    p = new Promise((resolve) => {
      const im = new Image(); im.crossOrigin = 'anonymous'; im.decoding = 'async';
      im.onload = () => {
        try {
          sctx.clearRect(0, 0, 256, 256); sctx.drawImage(im, 0, 0);
          const d = sctx.getImageData(0, 0, 256, 256).data, e = new Float32Array(65536);
          for (let i = 0, j = 0; j < 65536; i += 4, j++) e[j] = d[i] * 256 + d[i + 1] + d[i + 2] / 256 - 32768;   // metres
          resolve(e);
        } catch (_) { cache.delete(key); resolve(null); }
      };
      im.onerror = () => { cache.delete(key); resolve(null); };
      im.src = TERRAIN + key + '.png';
    });
    cache.set(key, p);
    if (cache.size > CACHE_MAX) cache.delete(cache.keys().next().value);
    return p;
  }

  // ------------------------------------------------------------------ colour ramp for the relief map
  const STOPS = [   // metres -> RGB; soft, a little desaturated so it sits with the parchment UI
    [-8000, [112, 140, 158]], [-4000, [134, 162, 176]], [-1500, [158, 184, 194]], [-300, [186, 208, 211]], [-1, [206, 223, 218]],
    [0, [176, 196, 136]], [250, [196, 208, 146]], [600, [216, 214, 156]], [1100, [224, 205, 150]], [1800, [212, 184, 134]],
    [2800, [190, 158, 120]], [3800, [168, 146, 126]], [4800, [196, 186, 176]], [5800, [234, 231, 226]], [8000, [252, 252, 250]]
  ];
  const LUT_MIN = -9000, LUT_STEP = 20, LUT = new Uint8ClampedArray(((9500 - LUT_MIN) / LUT_STEP + 2) * 3);
  (function build() {
    for (let k = 0; k * LUT_STEP + LUT_MIN <= 9500; k++) {
      const e = LUT_MIN + k * LUT_STEP; let a = STOPS[0], b = STOPS[STOPS.length - 1];
      for (let s = 0; s < STOPS.length - 1; s++) if (e >= STOPS[s][0] && e <= STOPS[s + 1][0]) { a = STOPS[s]; b = STOPS[s + 1]; break; }
      const t = e <= a[0] ? 0 : e >= b[0] ? 1 : (e - a[0]) / (b[0] - a[0]);
      for (let c = 0; c < 3; c++) LUT[k * 3 + c] = a[1][c] + (b[1][c] - a[1][c]) * t;
    }
  })();

  // ------------------------------------------------------------------ drawing one tile
  const AZ = 315 * Math.PI / 180, ALT = 42 * Math.PI / 180;   // light from the north-west, as on a printed atlas
  const LX = Math.sin(AZ) * Math.cos(ALT), LY = Math.cos(AZ) * Math.cos(ALT), LZ = Math.sin(ALT);

  function render(coords, mode, canvas) {
    const z = coords.z, n = 1 << z;
    const nb = [];
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) nb.push(load(z, coords.x + dx, coords.y + dy));
    return Promise.all(nb).then((t) => {
      const c = t[4]; if (!c) return;
      const W = 258, h = new Float32Array(W * W), raw = mode === 'relief' ? c : null;
      for (let j = -1; j <= 256; j++) {
        const ty = j < 0 ? 0 : j > 255 ? 2 : 1, lj = j < 0 ? 255 : j > 255 ? 0 : j;
        for (let i = -1; i <= 256; i++) {
          const tx = i < 0 ? 0 : i > 255 ? 2 : 1, li = i < 0 ? 255 : i > 255 ? 0 : i;
          let T = t[ty * 3 + tx], a = li, b = lj;
          if (!T) { T = c; a = i < 0 ? 0 : i > 255 ? 255 : i; b = j < 0 ? 0 : j > 255 ? 255 : j; }   // missing neighbour: reuse the edge
          const e = T[b * 256 + a]; h[(j + 1) * W + i + 1] = e > 0 ? e : 0;   // the sea is flat, so only land is shaded
        }
      }
      const ex = (mode === 'relief' ? 2 : 2.5) * Math.pow(2, (10 - z) * 0.45);   // vertical exaggeration: broad views have tiny slopes, so lift them
      const ctx = canvas.getContext('2d'), img = ctx.createImageData(256, 256), o = img.data;
      for (let j = 0; j < 256; j++) {
        const lat = Math.atan(Math.sinh(Math.PI * (1 - 2 * (coords.y + (j + 0.5) / 256) / n)));
        const k = 1 / (8 * (40075016.686 / (256 * n)) * Math.cos(lat)) * ex;   // 1 / (8 x metres per pixel), Horn's method
        for (let i = 0; i < 256; i++) {
          const p = (j + 1) * W + i + 1;
          const a = h[p - W - 1], b = h[p - W], cc = h[p - W + 1], d = h[p - 1], f = h[p + 1], g = h[p + W - 1], hh = h[p + W], ii = h[p + W + 1];
          const dzdx = ((cc + 2 * f + ii) - (a + 2 * d + g)) * k, dzdy = ((a + 2 * b + cc) - (g + 2 * hh + ii)) * k;
          const lit = (-dzdx * LX - dzdy * LY + LZ) / Math.sqrt(dzdx * dzdx + dzdy * dzdy + 1);   // 1 on flat ground x sin(altitude)
          const r = lit / LZ, q = (j * 256 + i) * 4;
          if (mode === 'relief') {
            let li = Math.round((raw[j * 256 + i] - LUT_MIN) / LUT_STEP); li = li < 0 ? 0 : li > 718 ? 718 : li;
            let m = 1 + 0.85 * (r - 1); m = m < 0.5 ? 0.5 : m > 1.14 ? 1.14 : m;
            o[q] = LUT[li * 3] * m; o[q + 1] = LUT[li * 3 + 1] * m; o[q + 2] = LUT[li * 3 + 2] * m; o[q + 3] = 255;
          } else {   // grey for a multiply blend: flat ground stays white, shaded slopes darken
            let v = 1 - 1.35 * (1 - r); v = v < 0.14 ? 0.14 : v > 1 ? 1 : v;   // shadows a touch warmer than neutral grey
            o[q] = v * 255; o[q + 1] = Math.pow(v, 1.06) * 255; o[q + 2] = Math.pow(v, 1.16) * 255; o[q + 3] = 255;
          }
        }
      }
      ctx.putImageData(img, 0, 0);
    }).catch(() => { /* leave the tile blank */ });
  }

  const Terrain = L.GridLayer.extend({
    initialize: function (mode, opts) { this._mode = mode; L.GridLayer.prototype.initialize.call(this, opts); },
    createTile: function (coords, done) {
      const c = document.createElement('canvas'); c.width = c.height = 256;
      render(coords, this._mode, c).then(() => done(null, c));
      return c;
    }
  });

  window.ATLAS_TERRAIN = {
    shade: (o) => new Terrain('shade', Object.assign({ maxNativeZoom: 9, maxZoom: 10, attribution: ATTR_ELEV + ' · Coastlines: Natural Earth' }, o)),
    relief: (o) => new Terrain('relief', Object.assign({ maxNativeZoom: 9, maxZoom: 10, attribution: ATTR_ELEV }, o)),
    imagery: (o) => L.tileLayer(GIBS, Object.assign({ maxNativeZoom: 8, maxZoom: 10, attribution: ATTR_IMG }, o))
  };
})();
