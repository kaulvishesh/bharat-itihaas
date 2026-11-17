// Data integrity checks for the atlas. Usage: node scripts/validate.js   (exit code 1 on errors)
'use strict';
const { load } = require('./atlas_data');

const { ERAS, GEO, ROUTES, PEOPLE, RIVERS, core } = load();
const works = (() => {
  const vm = require('vm'), fs = require('fs'), path = require('path');
  const sb = { window: {} }; vm.createContext(sb);
  vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'js', 'works.js'), 'utf8'), sb);
  return sb.window.ATLAS_WORKS;
})();

const errors = [], warnings = [];
const err = (m) => errors.push(m), warn = (m) => warnings.push(m);
const inBox = (ll) => Array.isArray(ll) && ll.length === 2 && ll[0] > -12 && ll[0] < 40 && ll[1] > 55 && ll[1] < 125;

// eras
const seen = new Set();
let prevYear = -Infinity;
ERAS.forEach((e, i) => {
  const id = 'era[' + i + ' ' + e.geo + ']';
  if (seen.has(e.geo)) err(id + ': duplicate geo key');
  seen.add(e.geo);
  if (e.year <= prevYear) err(id + ': eras must be sorted by year');
  prevYear = e.year;
  if (!GEO[e.geo]) err(id + ': missing geometry');
  ['name', 'nameHi', 'tag', 'tagHi', 'story', 'storyHi', 'yearLabel', 'yearLabelHi'].forEach((k) => { if (!e[k]) err(id + ': missing ' + k); });
  if (!e.rulers || !e.rulersHi || e.rulers.length !== e.rulersHi.length) err(id + ': rulers / rulersHi length mismatch');
  if (e.events.length < 3) warn(id + ': fewer than 3 events');
  if (e.places.length < 4) warn(id + ': fewer than 4 places');
  e.places.forEach((p) => {
    if (!inBox(p.ll)) err(id + ' place ' + p.n + ': bad coordinates');
    if (!p.nHi || !p.noteHi) err(id + ' place ' + p.n + ': missing Hindi');
    if (!['capital', 'city', 'site', 'port'].includes(p.k)) err(id + ' place ' + p.n + ': bad kind ' + p.k);
  });
  e.events.forEach((v) => {
    if (!inBox(v.ll)) err(id + ' event ' + v.title + ': bad coordinates');
    ['titleHi', 'textHi', 'clueHi', 'placeHi', 'labelHi'].forEach((k) => { if (!v[k]) err(id + ' event ' + v.title + ': missing ' + k); });
    if (/[A-Za-z]{4,}/.test(v.labelHi || '')) warn(id + ' event ' + v.title + ': Hindi label still contains Latin text (' + v.labelHi + ')');
    if (v.year == null) err(id + ' event ' + v.title + ': missing numeric year');
  });
  // geometry
  const g = GEO[e.geo];
  if (g) {
    g.polities.forEach((p) => {
      if (!p.nameHi) err(id + ' realm ' + p.name + ': missing Hindi');
      if (!/^#[0-9a-f]{6}$/i.test(p.color)) err(id + ' realm ' + p.name + ': bad colour');
      p.polys.forEach((poly) => poly.forEach((ring) => {
        if (ring.length < 4) err(id + ' realm ' + p.name + ': ring too short');
        ring.forEach((c) => { if (!(c[0] > -15 && c[0] < 60 && c[1] > 40 && c[1] < 130)) err(id + ' realm ' + p.name + ': coordinate out of range ' + c); });
      }));
    });
  }
});

// routes
Object.keys(ROUTES).forEach((k) => {
  if (!GEO[k]) err('routes: unknown era key ' + k);
  ROUTES[k].forEach((r) => {
    if (!r.nHi || !r.noteHi) err('route ' + r.id + ': missing Hindi');
    if (r.pts.length < 2) err('route ' + r.id + ': needs 2+ points');
    r.pts.forEach((c) => { if (!inBox(c)) err('route ' + r.id + ': bad point ' + c); });
  });
});

// people
const ids = new Set();
PEOPLE.forEach((p) => {
  if (ids.has(p.id)) err('person ' + p.id + ': duplicate id');
  ids.add(p.id);
  if (p.to <= p.from) err('person ' + p.id + ': to <= from');
  ['nameHi', 'bioHi', 'roleHi', 'yearsLabelHi'].forEach((k) => { if (!p[k]) err('person ' + p.id + ': missing ' + k); });
  if (p.stops.length < 4) warn('person ' + p.id + ': few stops');
  p.stops.forEach((s) => {
    if (!inBox(s.ll)) err('person ' + p.id + ' stop ' + s.n + ': bad coordinates');
    if (!s.nHi || !s.noteHi || !s.lHi) err('person ' + p.id + ' stop ' + s.n + ': missing Hindi');
  });
});

// rivers + works
RIVERS.forEach((r) => { if (!r.nHi) err('river ' + r.n + ': missing Hindi'); r.pts.forEach((c) => { if (!inBox(c)) err('river ' + r.n + ': bad point ' + c); }); });
works.forEach((w) => {
  if (!w.nHi || !w.noteHi) err('work ' + w.n + ': missing Hindi');
  (w.pts || [w.ll]).forEach((c) => { if (!inBox(c)) err('work ' + w.n + ': bad point ' + c); });
});

// semantic: each event should fall inside some realm of its era or be near a place, else warn (heuristic)
ERAS.forEach((e, i) => {
  e.events.forEach((v) => {
    const covered = GEO[e.geo].polities.some((p) => core.polityContains(p, v.ll[0], v.ll[1]));
    if (!covered) warn('era[' + i + '] event "' + v.title + '" lies outside every drawn realm (approximate boundaries, or a frontier event)');
  });
});

console.log('eras:', ERAS.length, '| realms:', ERAS.reduce((n, e) => n + GEO[e.geo].polities.length, 0), '| events:', ERAS.reduce((n, e) => n + e.events.length, 0),
  '| places:', ERAS.reduce((n, e) => n + e.places.length, 0), '| routes:', Object.values(ROUTES).reduce((n, r) => n + r.length, 0), '| people:', PEOPLE.length);
warnings.forEach((w) => console.log('warn  ', w));
errors.forEach((e) => console.log('ERROR ', e));
console.log(errors.length ? errors.length + ' error(s)' : 'OK — no errors', '(' + warnings.length + ' warning(s))');
process.exit(errors.length ? 1 : 0);
