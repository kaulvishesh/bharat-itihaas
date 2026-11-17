#!/usr/bin/env node
/*
 * Writes the "Sources, AI use and corrections" page: sources.html (linked from the site) and docs/SOURCES.md (for GitHub).
 * It lists how the atlas was made, how it was checked, the Wikipedia article behind every event, reference works to verify against,
 * and where the data and images come from. The results of the last fact check are read from data/fact_check.json.
 *   node scripts/build_sources.js
 */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const { load } = require('./atlas_data');
const { ERAS } = load();
const ROOT = path.join(__dirname, '..');
const ctx = {}; ctx.window = ctx; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'js', 'event_wiki.js'), 'utf8'), ctx);
const WIKI = ctx.ATLAS_EVENT_WIKI;
const CHECK = fs.existsSync(path.join(ROOT, 'data', 'fact_check.json')) ? JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'fact_check.json'), 'utf8')) : null;
const REPO = 'https://github.com/kaulvishesh/bharat-itihaas';
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const wikiUrl = (t) => 'https://en.wikipedia.org/wiki/' + encodeURIComponent(t.replace(/ /g, '_')).replace(/%2C/g, ',').replace(/%28/g, '(').replace(/%29/g, ')').replace(/%27/g, "'");

// Reference works a reader can check the atlas against. The atlas text was NOT drafted from these books (see "How it was made");
// they are standard, widely held works for the periods it covers. Author, title, publisher, year: no page numbers are claimed.
const R = {
  thapar: 'Romila Thapar, <i>Early India: From the Origins to AD 1300</i> (Allen Lane / University of California Press, 2002)',
  singh: 'Upinder Singh, <i>A History of Ancient and Early Medieval India: From the Stone Age to the 12th Century</i> (Pearson Education, 2008)',
  sastri: 'K. A. Nilakanta Sastri, <i>A History of South India: From Prehistoric Times to the Fall of Vijayanagar</i> (Oxford University Press, 1955)',
  sircar: 'D. C. Sircar, <i>Select Inscriptions Bearing on Indian History and Civilization</i> (University of Calcutta, 1942; 2nd ed. 1965)',
  asher: 'Catherine B. Asher and Cynthia Talbot, <i>India Before Europe</i> (Cambridge University Press, 2006)',
  eaton: 'Richard M. Eaton, <i>A Social History of the Deccan, 1300–1761: Eight Indian Lives</i> (Cambridge University Press, 2005)',
  habib: 'Irfan Habib, <i>An Atlas of the Mughal Empire</i> (Oxford University Press, Delhi, 1982)',
  stein: 'Burton Stein, <i>A History of India</i> (Blackwell, 1998; 2nd ed., ed. David Arnold, Wiley-Blackwell, 2010)',
  metcalf: 'Barbara D. Metcalf and Thomas R. Metcalf, <i>A Concise History of Modern India</i> (Cambridge University Press, 2002; 3rd ed. 2012)',
  chandra: 'Bipan Chandra et al., <i>India’s Struggle for Independence</i> (Penguin Books India, 1989)',
  guha: 'Ramachandra Guha, <i>India After Gandhi: The History of the World’s Largest Democracy</i> (Ecco / Picador India, 2007)',
  bose: 'Sumantra Bose, <i>Kashmir: Roots of Conflict, Paths to Peace</i> (Harvard University Press, 2003)',
  evans: 'Alexander Evans, “A Departure from History: Kashmiri Pandits, 1990–2001”, <i>Contemporary South Asia</i> 11(1), 2002',
  pandita: 'Rahul Pandita, <i>Our Moon Has Blood Clots: The Exodus of the Kashmiri Pandits</i> (Random House India, 2013), a Kashmiri Pandit’s account',
  schwartzberg: 'Joseph E. Schwartzberg (ed.), <i>A Historical Atlas of South Asia</i> (University of Chicago Press, 1978; 2nd impression 1992)'
};
const BIB = [
  ['General histories', ['thapar', 'singh', 'stein', 'asher']],
  ['South India and the Deccan', ['sastri', 'eaton']],
  ['Inscriptions and primary texts', ['sircar']],
  ['Mughal and early modern India', ['habib', 'asher', 'eaton']],
  ['Colonial India and the freedom movement', ['metcalf', 'chandra']],
  ['India since 1947', ['guha']],
  ['Kashmir and the 1990 exodus', ['bose', 'evans', 'pandita']],
  ['Historical atlases', ['schwartzberg', 'habib']]
];
const PRIMARY = [
  'Ashokan edicts, as edited and translated in Romila Thapar, <i>Asoka and the Decline of the Mauryas</i> (Oxford University Press, 1961), and in Sircar (above)',
  'Xuanzang (Hiuen Tsiang), <i>Si-Yu-Ki: Buddhist Records of the Western World</i>, trans. Samuel Beal (1884)',
  'Al-Biruni, <i>Alberuni’s India</i>, trans. Edward C. Sachau (1888)',
  'Ibn Battuta, <i>The Travels of Ibn Battuta</i>, trans. H. A. R. Gibb (Hakluyt Society, 1958–2000)',
  'Babur, <i>The Baburnama</i>, trans. Wheeler M. Thackston (Modern Library, 2002)'
];
// the period-specific places to look first
const WHERE = (i) => (i <= 5 ? ['thapar', 'singh', 'sircar'] : i <= 9 ? ['thapar', 'singh', 'sastri'] : i <= 12 ? ['asher', 'eaton', 'stein'] : i <= 14 ? ['habib', 'asher', 'stein'] : i <= 17 ? ['metcalf', 'chandra', 'guha'] : ['guha', 'metcalf']);
const short = { thapar: 'Thapar', singh: 'Singh', sastri: 'Nilakanta Sastri', sircar: 'Sircar', asher: 'Asher & Talbot', eaton: 'Eaton', habib: 'Habib', stein: 'Stein', metcalf: 'Metcalf & Metcalf', chandra: 'Chandra et al.', guha: 'Guha', bose: 'Bose', evans: 'Evans', pandita: 'Pandita', schwartzberg: 'Schwartzberg' };
const whereFor = (i, v) => { const w = WHERE(i).slice(); if (/Kashmiri/.test(v.title)) return ['bose', 'evans', 'pandita']; return w; };

const AI_PARAS = [
  'This atlas was built with Claude Code, an AI coding assistant from Anthropic, directed and tested by the project’s author. The code, the era summaries, the event descriptions, the place notes and the Hindi text were written with AI assistance, from the model’s general knowledge, not copied from particular books. The English narration is synthetic speech and the ambient music is synthesised in the browser.',
  'It has not been reviewed by a professional historian. AI-written history can contain errors, oversimplifications and gaps, and the atlas is a simplified overview of 2,500 years, not a scholarly work. Please treat it as a starting point and check anything that matters against the references below.'
];
const CHECK_PARAS = () => {
  const out = [
    'Every event on the map links, in its popup, to the Wikipedia article about that event, fetched live. The table below lists the article behind each of the ' + ERAS.reduce((s, e) => s + e.events.length, 0) + ' events so you can compare the atlas text with it. Wikipedia is a starting point, not a final authority; for scholarship, use the reference works further down.'
  ];
  if (CHECK) out.push('A script (<code>scripts/check_facts.js</code>) compares every year and figure in each event with the text of its Wikipedia article. On ' + esc(CHECK.date) + ' it checked ' + CHECK.events + ' events; ' + CHECK.allFound + ' had every number present in the article, and ' + CHECK.flagged + ' were flagged for a person to look at. ' + esc(CHECK.summary));
  out.push('This kind of check cannot judge wording, emphasis or what is left out, so it is no substitute for a historian’s review. If you find a mistake, please <a href="' + REPO + '/issues/new?template=data-error.yml">open a correction</a> with a source: it will be fixed.');
  return out;
};
const DATA_ROWS = [
  ['Historical boundaries', 'Simplified from the <a href="https://github.com/aourednik/historical-basemaps">historical-basemaps</a> dataset (Aourednik), then relabelled and edited by hand. Schematic: not surveyed or authoritative.'],
  ['Present-day India (1960 and 2010 eras)', 'Natural Earth, “India point of view” (public domain), applied by <code>scripts/apply_india_claim.js</code>. An approximation, not the Survey of India’s official map.'],
  ['Coastline', 'Natural Earth 50m land (public domain).'],
  ['Routes, rivers, roads, canals and dams', 'Schematic polylines through known waypoints, drawn by this project. Not surveyed.'],
  ['Event and place summaries (popups)', 'Wikipedia, fetched live when you open a popup, with the article’s own licence (CC BY-SA 4.0).'],
  ['Photographs in popups', 'Wikimedia Commons, through the Wikipedia article’s lead image, fetched live. Each photo keeps its own licence and author, shown on its Commons page. The atlas stores no photographs.'],
  ['Illustrations on the map (landmarks, pictograms, engraved plates)', 'Original vector drawings generated as code (<code>js/landmarks.js</code>, <code>js/icons.js</code>) with AI assistance. They are stylised and illustrative, not reconstructions or copies of any artwork or photograph.'],
  ['Hillshade, Relief and Satellite', 'USGS (SRTM, GMTED2010) and NOAA (ETOPO1) elevation via AWS Terrain Tiles; NASA Blue Marble imagery. Public domain / NASA open data.'],
  ['Narration and music', 'English narration: Kokoro-82M text-to-speech (Apache-2.0), generated speech. Music: synthesised live in the browser, no recordings.']
];

// ---------------------------------------------------------------------------------------------- HTML
function html() {
  const nEvents = ERAS.reduce((s, e) => s + e.events.length, 0);
  let h = '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n' +
    '<title>Sources, AI use and corrections — Bharat Itihaas</title>\n<meta name="description" content="How the atlas was made, how it was checked, the Wikipedia article behind each event, reference works to verify against, and where the data and images come from.">\n' +
    '<link rel="stylesheet" href="topics/topics.css">\n<style>.src-table{width:100%;border-collapse:collapse;font-size:.95em}.src-table td,.src-table th{border-bottom:1px solid rgba(0,0,0,.15);padding:.45em .6em;vertical-align:top;text-align:left}.src-where{font-size:.9em;opacity:.8}.src-note{border-left:4px solid #b8892f;padding:.2em 1em;background:rgba(184,137,47,.1)}ol.bib li,ul.bib li{margin:.35em 0}</style>\n</head>\n<body>\n' +
    '<header><a href="index.html">Atlas of India</a> · <a href="topics/index.html">Topics</a> · <a href="' + REPO + '">Source code</a></header>\n<main>\n' +
    '<h1>Sources, AI use and corrections</h1>\n<p class="lead">How this atlas was made, how it was checked, and where you can verify it.</p>\n' +
    '<h2>How it was made</h2>\n<div class="src-note">' + AI_PARAS.map((p) => '<p>' + esc(p) + '</p>').join('') + '</div>\n' +
    '<h2>How it was checked</h2>\n' + CHECK_PARAS().map((p) => '<p>' + p + '</p>').join('\n') + '\n' +
    '<h2>Data and images</h2>\n<table class="src-table"><tbody>' + DATA_ROWS.map((r) => '<tr><th>' + esc(r[0]) + '</th><td>' + r[1] + '</td></tr>').join('') + '</tbody></table>\n' +
    '<p>Every dataset and its licence is listed in <a href="NOTICE.md">NOTICE.md</a>.</p>\n' +
    '<h2>Reference works to verify against</h2>\n<p>These are standard, widely held works for the periods the atlas covers. <b>The atlas text was not drafted from them</b>; they are where a reader can check it. No page numbers are claimed.</p>\n' +
    BIB.map((b) => '<h3>' + esc(b[0]) + '</h3>\n<ul class="bib">' + b[1].map((k) => '<li>' + R[k] + '</li>').join('') + '</ul>').join('\n') +
    '\n<h3>Primary texts the events draw on</h3>\n<ul class="bib">' + PRIMARY.map((p) => '<li>' + p + '</li>').join('') + '</ul>\n' +
    '<h2>Every event, with the article behind it</h2>\n<p>' + nEvents + ' events in ' + ERAS.length + ' eras. “Where to check” points to the references above that cover that period.</p>\n';
  ERAS.forEach((e, i) => {
    h += '<h3>' + esc(e.yearLabel) + ' · ' + esc(e.name) + ' <a class="alt" href="index.html#era=' + i + '&amp;lang=en">open on the map</a></h3>\n<table class="src-table"><tbody>' +
      e.events.map((v) => '<tr><td>' + esc(v.label) + '</td><td><b>' + esc(v.title) + '</b><div class="src-where">Where to check: ' + whereFor(i, v).map((k) => short[k]).join(', ') + '</div></td><td><a href="' + wikiUrl(WIKI[v.title]) + '">' + esc(WIKI[v.title]) + ' (Wikipedia)</a></td></tr>').join('') + '</tbody></table>\n';
  });
  h += '<h2>Corrections</h2>\n<p>Found a mistake, or want a source cited more precisely? <a href="' + REPO + '/issues/new?template=data-error.yml">Open a correction</a> (English or Hindi) and, if you can, name a source. Corrections are made in the open on GitHub.</p>\n' +
    '</main>\n</body>\n</html>\n';
  return h;
}

// ---------------------------------------------------------------------------------------------- Markdown
const md = (s) => String(s).replace(/<i>(.*?)<\/i>/g, '*$1*').replace(/<b>(.*?)<\/b>/g, '**$1**').replace(/<code>(.*?)<\/code>/g, '`$1`').replace(/<a href="([^"]*)">(.*?)<\/a>/g, '[$2]($1)').replace(/&amp;/g, '&');
function markdown() {
  const nEvents = ERAS.reduce((s, e) => s + e.events.length, 0);
  let m = '# Sources, AI use and corrections\n\nHow this atlas was made, how it was checked, and where you can verify it. (Also on the site: [sources.html](https://kaulvishesh.github.io/bharat-itihaas/sources.html).)\n\n';
  m += '## How it was made\n\n' + AI_PARAS.join('\n\n') + '\n\n## How it was checked\n\n' + CHECK_PARAS().map(md).join('\n\n') + '\n\n';
  m += '## Data and images\n\n| Layer | Source |\n|---|---|\n' + DATA_ROWS.map((r) => '| ' + r[0] + ' | ' + md(r[1]) + ' |').join('\n') + '\n\nEvery dataset and its licence is listed in [NOTICE.md](../NOTICE.md).\n\n';
  m += '## Reference works to verify against\n\nThese are standard, widely held works for the periods the atlas covers. **The atlas text was not drafted from them**; they are where a reader can check it. No page numbers are claimed.\n\n';
  BIB.forEach((b) => { m += '### ' + b[0] + '\n\n' + b[1].map((k) => '- ' + md(R[k])).join('\n') + '\n\n'; });
  m += '### Primary texts the events draw on\n\n' + PRIMARY.map((p) => '- ' + md(p)).join('\n') + '\n\n';
  m += '## Every event, with the article behind it\n\n' + nEvents + ' events in ' + ERAS.length + ' eras.\n\n';
  ERAS.forEach((e, i) => {
    m += '### ' + e.yearLabel + ' · ' + e.name + '\n\n| Date | Event | Wikipedia article | Where to check |\n|---|---|---|---|\n' +
      e.events.map((v) => '| ' + v.label + ' | ' + v.title + ' | [' + WIKI[v.title] + '](' + wikiUrl(WIKI[v.title]) + ') | ' + whereFor(i, v).map((k) => short[k]).join(', ') + ' |').join('\n') + '\n\n';
  });
  m += '## Corrections\n\nFound a mistake, or want a source cited more precisely? [Open a correction](' + REPO + '/issues/new?template=data-error.yml) (English or Hindi) and, if you can, name a source. Corrections are made in the open on GitHub.\n';
  return m;
}

fs.writeFileSync(path.join(ROOT, 'sources.html'), html());
fs.mkdirSync(path.join(ROOT, 'docs'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'docs', 'SOURCES.md'), markdown());
console.log('wrote sources.html and docs/SOURCES.md (' + ERAS.reduce((s, e) => s + e.events.length, 0) + ' events)');
