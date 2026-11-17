/*
 * Collision avoidance for map pictograms and their labels.
 * Markers with options.dcPrio (lower = more important) are tested in screen space after every pan, zoom and redraw:
 * a marker that would overlap a more important one is faded out; if only its label collides, just the label goes.
 * Zoom in and the hidden ones reappear as soon as there is room.
 */
(function () {
  'use strict';
  const A = window.ATLAS_APP;
  if (!A) return;
  const map = A.map;
  const PAD = 3;
  const hit = (a, b) => a.left < b.right + PAD && a.right + PAD > b.left && a.top < b.bottom + PAD && a.bottom + PAD > b.top;
  const union = (a, b) => ({ left: Math.min(a.left, b.left), top: Math.min(a.top, b.top), right: Math.max(a.right, b.right), bottom: Math.max(a.bottom, b.bottom) });

  function run() {
    const items = [];
    map.eachLayer((l) => { if (l instanceof L.Marker && l.options.dcPrio != null && l._icon) items.push(l); });
    items.forEach((m) => {
      m._icon.classList.remove('dc-hide');
      const tt = m.getTooltip && m.getTooltip();
      if (tt && tt._container) tt._container.classList.remove('dc-hide');
    });
    const open = map._popup && map._popup._source;
    items.sort((a, b) => a.options.dcPrio - b.options.dcPrio || a._icon.getBoundingClientRect().top - b._icon.getBoundingClientRect().top);
    const taken = [];
    items.forEach((m) => {
      const ir = m._icon.getBoundingClientRect();
      const tt = m.getTooltip && m.getTooltip(), tel = tt && tt._container;
      const tr = tel ? tel.getBoundingClientRect() : null;
      const iconBox = { left: ir.left, top: ir.top, right: ir.right, bottom: ir.bottom };
      const full = tr && tr.width ? union(iconBox, { left: tr.left, top: tr.top, right: tr.right, bottom: tr.bottom }) : iconBox;
      const keep = m === open;
      if (!keep && taken.some((t) => hit(iconBox, t))) { m._icon.classList.add('dc-hide'); if (tel) tel.classList.add('dc-hide'); return; }
      if (!keep && tel && taken.some((t) => hit(full, t))) { tel.classList.add('dc-hide'); taken.push(iconBox); return; }
      taken.push(full);
    });
  }

  let timer = 0;
  const sched = (ms) => { clearTimeout(timer); timer = setTimeout(run, ms || 220); };
  map.on('moveend zoomend popupclose layeradd layerremove', () => sched(260));
  document.addEventListener('atlas:render', () => sched(400));
  document.addEventListener('atlas:lang', () => sched(400));
  A.declutter = run;
  sched(500);
})();
