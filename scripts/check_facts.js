#!/usr/bin/env node
/*
 * A consistency check, not a proof: for every event in the atlas it fetches the Wikipedia article the event links to (js/event_wiki.js)
 * and looks for each year and figure used in the event's title, date label, place and text. Numbers that the article does not contain
 * are listed for a person to look at (they may be a real mistake, an approximate or traditional date, or a different spelling of the
 * same thing). It cannot judge wording, emphasis or omissions. Needs network access; not part of CI.
 *   node scripts/check_facts.js            # prints a report
 *   node scripts/check_facts.js --json     # machine-readable
 */
'use strict';
const vm = require('vm'), fs = require('fs'), path = require('path');
const { load } = require('./atlas_data');
const { ERAS } = load();
const ctx = {}; ctx.window = ctx; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'js', 'event_wiki.js'), 'utf8'), ctx);
const MAP = ctx.ATLAS_EVENT_WIKI;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const CACHE = process.env.FACT_CACHE;   // optional file: lets an interrupted run resume without refetching
const disk = CACHE && fs.existsSync(CACHE) ? JSON.parse(fs.readFileSync(CACHE, 'utf8')) : {};

// the REST endpoint serves cached article HTML and is the polite one to use for a batch of ~70 pages
const strip = (h) => h.replace(/<(script|style)[\s\S]*?<\/>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;|&#160;/g, ' ').replace(/&amp;/g, '&').replace(/&#(\d+);/g, (m, n) => String.fromCharCode(+n)).replace(/\s+/g, ' ');
async function article(title) {
  const url = 'https://en.wikipedia.org/api/rest_v1/page/html/' + encodeURIComponent(title.replace(/ /g, '_')) + '?redirect=true';
  for (let attempt = 0; attempt < 4; attempt++) {
    const r = await fetch(url, { headers: { 'User-Agent': 'atlas-fact-check/1.0 (open-source script)', Accept: 'text/html' } });
    if (r.status === 429) { const wait = Math.min(30, (+r.headers.get('retry-after')) || 5); console.error('  429 for ' + title + ', waiting ' + wait + ' s (try ' + (attempt + 1) + ')'); await sleep(wait * 1000); continue; }   // be polite: Wikipedia rate-limits bursts
    if (r.status === 404) return { title, text: '', missing: true };
    if (!r.ok) throw new Error(r.status + ' ' + title);
    return { title, text: strip(await r.text()), missing: false };
  }
  throw new Error('rate limited: ' + title);
}

// every number-like thing worth checking: years (3-4 digits), ranges like 1989–90, and figures with commas
function numbers(s) {
  const out = new Set();
  String(s).replace(/(\d{1,3}(?:,\d{3})+|\d{3,4})(?:\s?[–-]\s?(\d{2,4}))?/g, (m, a, b) => {
    const A = a.replace(/,/g, ''); out.add(A);
    if (b) { const B = b.length === 2 ? A.slice(0, A.length - 2) + b : b; out.add(B); }
    return m;
  });
  return [...out];
}

(async () => {
  const cache = disk, report = []; let fetched = 0;
  for (let i = 0; i < ERAS.length; i++) for (const v of ERAS[i].events) {
    const wiki = MAP[v.title]; let art = cache[wiki];
    if (!art) { try { art = cache[wiki] = await article(wiki); } catch (e) { art = { error: String(e) }; } fetched++; console.error('fetched ' + fetched + ': ' + wiki + (art.error ? '  ' + art.error : '')); if (CACHE && !art.error) fs.writeFileSync(CACHE, JSON.stringify(cache)); await sleep(700); }
    const row = { era: i, event: v.title, article: art.title || wiki, ok: false, notFound: [] };
    if (art.error || art.missing) { row.error = art.error || 'article not found'; report.push(row); continue; }
    const hay = art.text.replace(/,/g, '');
    const claims = numbers([v.label, v.title, v.text, v.place].join(' ')).filter((n) => !/^(1000|2000)$/.test(n) || true);
    row.checked = claims;
    row.notFound = claims.filter((n) => hay.indexOf(n) < 0);
    row.ok = row.notFound.length === 0;
    report.push(row);
  }
  if (process.argv.includes('--json')) { console.log(JSON.stringify(report, null, 1)); return; }
  const bad = report.filter((r) => !r.ok);
  console.log('events checked: ' + report.length + ' · every number found in the article: ' + (report.length - bad.length) + ' · to review: ' + bad.length + '\n');
  bad.forEach((r) => console.log('era ' + r.era + ' · ' + r.event + '  (' + r.article + ')  ' + (r.error ? 'ERROR ' + r.error : 'not found in article: ' + r.notFound.join(', '))));
})().catch((e) => { console.error(e); process.exit(1); });
