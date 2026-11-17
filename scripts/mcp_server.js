#!/usr/bin/env node
// Zero-dependency MCP server (stdio, newline-delimited JSON-RPC) exposing the Atlas of India to AI agents.
// Run: node scripts/mcp_server.js
'use strict';
const readline = require('readline');
const { load } = require('./atlas_data');
const { ERAS, GEO, ROUTES, PEOPLE, core } = load();

const eraSummary = (e, i) => ({ index: i, year: e.year, label: e.yearLabel, name: e.name, snapshot: GEO[e.geo].snapshot });
const findEra = (a) => {
  if (a.index != null) return ERAS[a.index];
  if (a.year != null) {
    let b = 0, d = Infinity;
    ERAS.forEach((e, i) => { const x = Math.abs(e.year - a.year); if (x < d) { d = x; b = i; } });
    return ERAS[b];
  }
  return null;
};

function search(q) {
  const toks = String(q || '').toLowerCase().split(/\s+/).filter(Boolean);
  const res = [];
  const add = (kind, era, name, hay, extra) => {
    const h = hay.join(' ').toLowerCase();
    if (toks.every((t) => h.includes(t))) res.push(Object.assign({ kind, era: ERAS[era].yearLabel, eraIndex: era, name }, extra || {}));
  };
  ERAS.forEach((e, i) => {
    add('era', i, e.name, [e.name, e.nameHi, e.yearLabel, e.tag]);
    GEO[e.geo].polities.forEach((p) => add('realm', i, p.name, [p.name, p.nameHi]));
    e.places.forEach((p) => add('place', i, p.n, [p.n, p.nHi, p.note], { ll: p.ll }));
    e.events.forEach((v) => add('event', i, v.title, [v.title, v.text, v.place, v.label], { ll: v.ll, when: v.label }));
    (ROUTES[e.geo] || []).forEach((r) => add('journey', i, r.n, [r.n, r.nHi, r.note]));
  });
  PEOPLE.forEach((p) => {
    const h = [p.name, p.nameHi, p.role, p.bio].join(' ').toLowerCase();
    if (toks.every((t) => h.includes(t))) res.push({ kind: 'person', id: p.id, name: p.name, years: p.yearsLabel });
  });
  return res.slice(0, 40);
}

const TOOLS = [
  { name: 'list_eras', description: 'List the eras of the Atlas of India (500 BCE to today).', inputSchema: { type: 'object', properties: {} }, run: () => ERAS.map(eraSummary) },
  {
    name: 'get_era',
    description: 'Get an era (by index or nearest year, negative = BCE): narrative, realms, rulers, places, events and journeys.',
    inputSchema: { type: 'object', properties: { index: { type: 'integer' }, year: { type: 'integer' } } },
    run: (a) => {
      const e = findEra(a);
      if (!e) throw new Error('Provide index or year');
      return Object.assign(eraSummary(e, ERAS.indexOf(e)), {
        tag: e.tag, story: e.story, rulers: e.rulers,
        realms: GEO[e.geo].polities.map((p) => ({ name: p.name, approx: !!p.approx })),
        places: e.places.map((p) => ({ name: p.n, kind: p.k, ll: p.ll, note: p.note })),
        events: e.events.map((v) => ({ when: v.label, title: v.title, text: v.text, place: v.place, ll: v.ll })),
        journeys: (ROUTES[e.geo] || []).map((r) => ({ name: r.n, note: r.note, path: r.pts }))
      });
    }
  },
  { name: 'search', description: 'Search eras, realms, places, events, journeys and people.', inputSchema: { type: 'object', properties: { query: { type: 'string' } }, required: ['query'] }, run: (a) => search(a.query) },
  {
    name: 'trace_place',
    description: 'Which realms covered a point (lat, lon) in each era. Boundaries are approximate.',
    inputSchema: { type: 'object', properties: { lat: { type: 'number' }, lon: { type: 'number' } }, required: ['lat', 'lon'] },
    run: (a) => {
      const r = core.traceAt(ERAS, GEO, a.lat, a.lon);
      return { nearest: r.nearest && r.nearest.n, distinctRealms: r.distinctRealms, eras: r.rows.map((x) => ({ era: ERAS[x.era].yearLabel, realms: x.polities.map((p) => p.name) })) };
    }
  },
  { name: 'list_people', description: 'List person chronicles.', inputSchema: { type: 'object', properties: {} }, run: () => PEOPLE.map((p) => ({ id: p.id, name: p.name, years: p.yearsLabel, role: p.role })) },
  {
    name: 'get_person', description: 'Get a person chronicle with stops (id from list_people).',
    inputSchema: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] },
    run: (a) => {
      const p = PEOPLE.find((x) => x.id === a.id);
      if (!p) throw new Error('Unknown id');
      return { id: p.id, name: p.name, years: p.yearsLabel, role: p.role, bio: p.bio, stops: p.stops.map((s) => ({ place: s.n, label: s.l, ll: s.ll, note: s.note })) };
    }
  },
  {
    name: 'compare_people', description: 'Compare lifespans of people; reports overlap or gap.',
    inputSchema: { type: 'object', properties: { ids: { type: 'array', items: { type: 'string' } } }, required: ['ids'] },
    run: (a) => {
      const ps = a.ids.map((id) => PEOPLE.find((x) => x.id === id)).filter(Boolean);
      const out = { people: ps.map((p) => ({ id: p.id, name: p.name, from: p.from, to: p.to })), pairs: [] };
      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const o0 = Math.max(ps[i].from, ps[j].from), o1 = Math.min(ps[i].to, ps[j].to);
          out.pairs.push({ a: ps[i].name, b: ps[j].name, overlapYears: Math.max(0, o1 - o0), gapYears: o1 > o0 ? 0 : Math.round(o0 - o1) });
        }
      }
      return out;
    }
  }
];

function reply(id, result, error) {
  process.stdout.write(JSON.stringify(error ? { jsonrpc: '2.0', id, error } : { jsonrpc: '2.0', id, result }) + '\n');
}

readline.createInterface({ input: process.stdin }).on('line', (line) => {
  if (!line.trim()) return;
  let m;
  try { m = JSON.parse(line); } catch (_) { return reply(null, null, { code: -32700, message: 'Parse error' }); }
  if (m.id === undefined) return; // notification
  switch (m.method) {
    case 'initialize':
      return reply(m.id, { protocolVersion: (m.params && m.params.protocolVersion) || '2024-11-05', capabilities: { tools: {} }, serverInfo: { name: 'atlas-of-india', version: '1.0.0' } });
    case 'ping': return reply(m.id, {});
    case 'tools/list': return reply(m.id, { tools: TOOLS.map(({ name, description, inputSchema }) => ({ name, description, inputSchema })) });
    case 'tools/call': {
      const tool = TOOLS.find((t) => t.name === (m.params || {}).name);
      if (!tool) return reply(m.id, null, { code: -32602, message: 'Unknown tool' });
      try { return reply(m.id, { content: [{ type: 'text', text: JSON.stringify(tool.run(m.params.arguments || {}), null, 2) }] }); }
      catch (e) { return reply(m.id, { isError: true, content: [{ type: 'text', text: String(e.message || e) }] }); }
    }
    default: return reply(m.id, null, { code: -32601, message: 'Method not found' });
  }
});
