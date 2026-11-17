// Generates static, crawlable topic pages (one per era and person, English + Hindi), sitemap.xml and robots.txt.
// Usage: node scripts/build_topics.js [--base https://your-host.example/atlas/]
'use strict';
const fs = require('fs');
const path = require('path');
const { load } = require('./atlas_data');
const { renderEra } = require('./svg_render');

const args = process.argv.slice(2);
const bi = args.indexOf('--base');
const BASE = (bi >= 0 ? args[bi + 1] : 'https://your-host.example/atlas/').replace(/\/?$/, '/');
const { ERAS, GEO, ROUTES, PEOPLE } = load();
const root = path.join(__dirname, '..');
const out = path.join(root, 'topics');

const T = {
  en: {
    dir: 'ltr', home: 'Atlas of India', topics: 'Topics', eras: 'Eras', people: 'People', open: 'Open on the interactive map',
    realms: 'Realms', rulers: 'Rulers and figures', events: 'Key events', places: 'Places', journeys: 'Journeys and campaigns', stops: 'Stops',
    disc: 'Boundaries are simplified and approximate, for illustration only. India’s present-day outline follows India’s official position (Natural Earth, India point of view). Data derived from historical-basemaps (GPL-3.0).', other: 'हिन्दी में पढ़ें',
    snapshot: (s) => 'Boundary snapshot: ' + s + '.'
  },
  hi: {
    dir: 'ltr', home: 'भारत का मानचित्र-इतिहास', topics: 'विषय', eras: 'युग', people: 'व्यक्तित्व', open: 'इंटरैक्टिव नक्शे पर खोलें',
    realms: 'राज्य', rulers: 'शासक और व्यक्तित्व', events: 'प्रमुख घटनाएँ', places: 'स्थान', journeys: 'यात्राएँ और अभियान', stops: 'पड़ाव',
    disc: 'सीमाएँ सरलीकृत और अनुमानित हैं, केवल चित्रण हेतु। भारत की वर्तमान रूपरेखा भारत की आधिकारिक स्थिति के अनुसार है (नेचुरल अर्थ, भारत का दृष्टिकोण)। डेटा historical-basemaps (GPL-3.0) से।', other: 'Read in English',
    snapshot: (s) => 'सीमा-स्नैपशॉट: ' + s + '।'
  }
};

const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const pick = (o, k, lang) => (lang === 'hi' && o[k + 'Hi']) ? o[k + 'Hi'] : o[k];
const slug = (e) => 'era-' + e.geo;

function page(lang, title, desc, bodyHtml, selfName, otherName) {
  const t = T[lang];
  const pre = lang === 'hi' ? '../../' : '../';
  return '<!doctype html>\n<html lang="' + lang + '">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n' +
    '<title>' + esc(title) + ' — ' + esc(t.home) + '</title>\n<meta name="description" content="' + esc(desc) + '">\n' +
    '<link rel="alternate" hreflang="' + (lang === 'en' ? 'hi' : 'en') + '" href="' + (lang === 'en' ? 'hi/' : '../') + otherName + '">\n' +
    '<link rel="stylesheet" href="' + (lang === 'hi' ? '../' : '') + 'topics.css">\n</head>\n<body>\n' +
    '<header><a href="' + pre + 'index.html">' + esc(t.home) + '</a> · <a href="index.html">' + esc(t.topics) + '</a>' +
    '<a class="alt" href="' + (lang === 'en' ? 'hi/' : '../') + otherName + '">' + esc(t.other) + '</a></header>\n<main>\n' + bodyHtml +
    '\n<p class="disc">' + esc(t.disc) + '</p>\n</main>\n</body>\n</html>\n';
}

function eraBody(e, i, lang) {
  const t = T[lang], g = GEO[e.geo];
  let h = '<h1>' + esc(pick(e, 'yearLabel', lang)) + ' · ' + esc(pick(e, 'name', lang)) + '</h1>\n<p class="lead">' + esc(pick(e, 'tag', lang)) + '</p>\n';
  h += '<figure>' + renderEra(e, g, { lang, width: 720 }) + '<figcaption>' + esc(t.snapshot(g.snapshot)) + '</figcaption></figure>\n';
  if (e.story) h += '<p>' + esc(pick(e, 'story', lang)) + '</p>\n';
  h += '<p><a class="btn" href="' + (lang === 'hi' ? '../../' : '../') + 'index.html#era=' + i + '&lang=' + lang + '">' + esc(t.open) + ' →</a></p>\n';
  h += '<h2>' + esc(t.realms) + '</h2>\n<ul class="chips">' + g.polities.map((p) => '<li><i style="background:' + p.color + '"></i>' + esc(pick(p, 'name', lang)) + (p.approx ? ' (approx.)' : '') + '</li>').join('') + '</ul>\n';
  h += '<h2>' + esc(t.rulers) + '</h2>\n<ul>' + ((lang === 'hi' && e.rulersHi) ? e.rulersHi : e.rulers).map((r) => '<li>' + esc(r) + '</li>').join('') + '</ul>\n';
  h += '<h2>' + esc(t.events) + '</h2>\n' + e.events.map((v) => '<article><h3>' + esc(pick(v, 'label', lang)) + ' · ' + esc(pick(v, 'title', lang)) + '</h3><p>' + esc(pick(v, 'text', lang)) + ' <em>— ' + esc(pick(v, 'place', lang)) + '</em></p></article>').join('\n') + '\n';
  const rs = ROUTES[e.geo] || [];
  if (rs.length) h += '<h2>' + esc(t.journeys) + '</h2>\n<ul>' + rs.map((r) => '<li><b>' + esc(pick(r, 'n', lang)) + '</b> — ' + esc(pick(r, 'note', lang)) + '</li>').join('') + '</ul>\n';
  h += '<h2>' + esc(t.places) + '</h2>\n<ul>' + e.places.map((p) => '<li><b>' + esc(pick(p, 'n', lang)) + '</b> — ' + esc(pick(p, 'note', lang)) + '</li>').join('') + '</ul>\n';
  return h;
}

function personBody(p, lang) {
  const t = T[lang];
  let h = '<h1>' + esc(pick(p, 'name', lang)) + '</h1>\n<p class="lead">' + esc(pick(p, 'yearsLabel', lang)) + ' · ' + esc(pick(p, 'role', lang)) + '</p>\n<p>' + esc(pick(p, 'bio', lang)) + '</p>\n';
  h += '<p><a class="btn" href="' + (lang === 'hi' ? '../../' : '../') + 'index.html?person=' + p.id + '#lang=' + lang + '">' + esc(t.open) + ' →</a></p>\n';
  h += '<h2>' + esc(t.stops) + '</h2>\n<ol>' + p.stops.map((s) => '<li><b>' + esc(pick(s, 'n', lang)) + '</b> <em>' + esc(pick(s, 'l', lang)) + '</em> — ' + esc(pick(s, 'note', lang)) + '</li>').join('') + '</ol>\n';
  return h;
}

const CSS = 'body{font:16px/1.6 system-ui,"Segoe UI","Noto Sans Devanagari",sans-serif;color:#2a1f14;background:#fbf6ea;margin:0}header{padding:10px 18px;background:#fff8ea;border-bottom:1px solid #e4d6bd}header a{color:#c2410c;text-decoration:none;margin-right:6px}header .alt{float:right}main{max-width:820px;margin:0 auto;padding:18px}h1{font:700 30px/1.2 "Palatino Linotype",Palatino,"Noto Serif Devanagari",serif;margin:.4em 0 .2em}h2{font-size:13px;text-transform:uppercase;letter-spacing:.08em;color:#7a6a58;margin-top:1.6em}h3{margin:.8em 0 .1em;font-size:16px}.lead{font-size:18px;color:#5a4630}figure{margin:1em 0}figure svg{width:100%;height:auto;border:1px solid #e4d6bd;border-radius:10px}figcaption,.disc{font-size:12px;color:#7a6a58}.btn{display:inline-block;background:#c2410c;color:#fff;padding:8px 14px;border-radius:9px;text-decoration:none}.chips{list-style:none;padding:0;display:flex;flex-wrap:wrap;gap:6px 14px}.chips i{display:inline-block;width:11px;height:11px;border-radius:3px;margin-right:5px}ul,ol{padding-left:1.2em}li{margin:.2em 0}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:10px;list-style:none;padding:0}.grid li{background:#fff;border:1px solid #e4d6bd;border-radius:10px;padding:10px}.grid a{color:#2a1f14;text-decoration:none;font-weight:600}.grid span{display:block;font-size:12px;color:#7a6a58;font-weight:400}\n';

fs.mkdirSync(path.join(out, 'hi'), { recursive: true });
fs.writeFileSync(path.join(out, 'topics.css'), CSS);
const urls = [];

['en', 'hi'].forEach((lang) => {
  const dir = lang === 'hi' ? path.join(out, 'hi') : out;
  const t = T[lang];
  ERAS.forEach((e, i) => {
    const file = slug(e) + '.html';
    fs.writeFileSync(path.join(dir, file), page(lang, pick(e, 'yearLabel', lang) + ' · ' + pick(e, 'name', lang), pick(e, 'tag', lang), eraBody(e, i, lang), file, file));
    urls.push('topics/' + (lang === 'hi' ? 'hi/' : '') + file);
  });
  PEOPLE.forEach((p) => {
    const file = 'person-' + p.id + '.html';
    fs.writeFileSync(path.join(dir, file), page(lang, pick(p, 'name', lang), pick(p, 'role', lang) + ' · ' + pick(p, 'yearsLabel', lang), personBody(p, lang), file, file));
    urls.push('topics/' + (lang === 'hi' ? 'hi/' : '') + file);
  });
  let idx = '<h1>' + esc(t.home) + ' — ' + esc(t.topics) + '</h1>\n<h2>' + esc(t.eras) + '</h2>\n<ul class="grid">' +
    ERAS.map((e) => '<li><a href="' + slug(e) + '.html">' + esc(pick(e, 'name', lang)) + '<span>' + esc(pick(e, 'yearLabel', lang)) + '</span></a></li>').join('') + '</ul>\n' +
    '<h2>' + esc(t.people) + '</h2>\n<ul class="grid">' + PEOPLE.map((p) => '<li><a href="person-' + p.id + '.html">' + esc(pick(p, 'name', lang)) + '<span>' + esc(pick(p, 'yearsLabel', lang)) + '</span></a></li>').join('') + '</ul>\n';
  fs.writeFileSync(path.join(dir, 'index.html'), page(lang, t.topics, t.home, idx, 'index.html', 'index.html'));
  urls.push('topics/' + (lang === 'hi' ? 'hi/' : '') + 'index.html');
});

urls.unshift('index.html');
fs.writeFileSync(path.join(root, 'sitemap.xml'), '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + urls.map((u) => '  <url><loc>' + BASE + u + '</loc></url>').join('\n') + '\n</urlset>\n');
fs.writeFileSync(path.join(root, 'robots.txt'), 'User-agent: *\nAllow: /\nSitemap: ' + BASE + 'sitemap.xml\n');
console.log('wrote', urls.length, 'pages (+ sitemap.xml, robots.txt); base =', BASE);
