#!/usr/bin/env node
/*
 * Makes the two promotional images, by driving the real app in a headless Edge/Chrome:
 *   social/preview.jpg   1200x630 link-preview card (WhatsApp, X, Reddit, LinkedIn...), referenced by the og:image tags in index.html
 *   assets/hero.webp     an animated README banner: title sequence -> a journey scene -> Then & Now
 *
 * One-time setup (the tools are not repository dependencies):
 *   mkdir "$TMP/social-tools" && echo '{"dependencies":{"puppeteer-core":"24.15.0","sharp":"0.34.3"}}' > "$TMP/social-tools/package.json" && (cd "$TMP/social-tools" && npm i)
 * Run with the site served locally (python -m http.server 8011) and a Chromium-based browser installed:
 *   SOCIAL_MODULES="$TMP/social-tools" node scripts/make_social.js [preview|hero|all]
 *   Optional: BROWSER=<path to msedge/chrome>, ATLAS_URL=http://localhost:8011/
 */
'use strict';
const fs = require('fs'), path = require('path');
const req = require('module').createRequire(path.join(process.env.SOCIAL_MODULES || path.join(__dirname, 'social-tools'), 'x.js'));
const puppeteer = req('puppeteer-core'), sharp = req('sharp');
const ROOT = path.join(__dirname, '..');
const BASE = process.env.ATLAS_URL || 'http://localhost:8011/';
const BROWSER = process.env.BROWSER || ['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Google/Chrome/Application/chrome.exe', '/usr/bin/google-chrome', '/usr/bin/chromium'].find((p) => fs.existsSync(p));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const what = process.argv[2] || 'all';

// poll the journey player until its state satisfies `cond` (a source string evaluated against the state object)
const until = (page, cond, ms) => page.waitForFunction('(() => { const s = window.ATLAS_JOURNEYS.state(); return ' + cond + '; })()', { timeout: ms || 30000, polling: 100 });
const press = (page, label) => page.evaluate((l) => { const b = [...document.querySelectorAll('#cine button')].find((x) => x.getAttribute('aria-label') === l); if (b) b.click(); }, label);

async function open(browser, w, h, hash, extra) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
  await page.goto(BASE + '?t=' + Date.now() + (extra || '') + hash, { waitUntil: 'load' });
  await page.waitForFunction('window.ATLAS_APP && window.ATLAS_JOURNEYS', { timeout: 30000 });
  return page;
}

// ------------------------------------------------------------------ link preview card
async function preview(browser) {
  // a clean shot of the Bodh Gaya journey scene (no captions or controls), moved to the right half of the frame
  const page = await open(browser, 1200, 630, '#lang=en', '&intro=0');
  await page.evaluate(() => { const s = document.createElement('style'); s.textContent = '#cine .cine-top,#cine .cine-bot,#cine .cine-veil{display:none!important} .leaflet-control-container{display:none!important}'; document.head.appendChild(s); });
  await page.evaluate(() => window.ATLAS_JOURNEYS.start('maurya'));
  await until(page, 's.on && s.scene === 0 && !s.busy');
  await press(page, 'Next scene');
  await until(page, 's.scene === 1');
  await press(page, 'Pause');   // hold the Bodh Gaya scene while the camera finishes its push-in
  await sleep(9000);            // cut, push-in, landmark drawn
  await page.evaluate(() => window.ATLAS_APP.map.panBy([-330, 20], { animate: false }));
  await sleep(2500);
  const scene = await page.screenshot({ type: 'jpeg', quality: 90 });
  await page.close();

  const card = await browser.newPage();
  await card.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  await card.goto(BASE + 'robots.txt');   // same origin as the fonts, so the card can load them
  const html = '<!doctype html><meta charset="utf-8"><link rel="stylesheet" href="' + BASE + 'css/fonts.css"><style>' +
    'html,body{margin:0;width:1200px;height:630px;overflow:hidden;background:#101a35}' +
    '.bg{position:absolute;inset:0;background:url(data:image/jpeg;base64,' + scene.toString('base64') + ') center/cover}' +
    '.shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(14,22,48,.97) 0%,rgba(14,22,48,.93) 38%,rgba(14,22,48,.55) 62%,rgba(14,22,48,0) 82%)}' +
    '.frame{position:absolute;inset:18px;border:1.5px solid rgba(217,178,90,.65)}.frame:after{content:"";position:absolute;inset:6px;border:1px solid rgba(217,178,90,.3)}' +
    '.copy{position:absolute;left:84px;top:0;bottom:0;width:640px;display:flex;flex-direction:column;justify-content:center;color:#f4ecd8}' +
    '.seal{font-family:Amita,serif;font-size:128px;line-height:1;background:linear-gradient(180deg,#f3d98a,#c99a3d);-webkit-background-clip:text;color:transparent;filter:drop-shadow(0 4px 16px rgba(0,0,0,.45));margin-bottom:6px}' +
    '.title{font-family:Cinzel,serif;font-weight:600;font-size:48px;letter-spacing:.2em;color:#f4ecd8;margin:6px 0 0}' +
    '.rule{width:200px;height:2px;background:linear-gradient(90deg,#d9b25a,transparent);margin:22px 0}' +
    '.tag{font-family:"Cormorant Garamond",serif;font-style:italic;font-weight:500;font-size:35px;line-height:1.25;color:#efe3c2;margin:0 0 30px}' +
    '.chips{font-family:"Noto Sans",sans-serif;font-weight:500;font-size:22px;letter-spacing:.04em;color:#d9b25a}' +
    '.chips b{color:#f4ecd8;font-weight:600}.url{position:absolute;left:84px;bottom:50px;font-family:"Noto Sans",sans-serif;font-size:20px;letter-spacing:.06em;color:rgba(244,236,216,.72)}' +
    '</style><div class="bg"></div><div class="shade"></div><div class="frame"></div>' +
    '<div class="copy"><div class="seal">भारत</div><div class="title">BHARAT ITIHAAS</div><div class="rule"></div>' +
    '<p class="tag">An interactive atlas of India,<br>500 BCE to today</p>' +
    '<div class="chips"><b>19</b> eras &nbsp;·&nbsp; <b>5</b> cinematic journeys &nbsp;·&nbsp; English &amp; हिन्दी</div></div>' +
    '<div class="url">kaulvishesh.github.io/bharat-itihaas</div>';
  await card.evaluate((h) => { document.open(); document.write(h); document.close(); }, html);
  await card.evaluate(() => document.fonts.ready.then(() => Promise.all(['64px Amita', '600 48px Cinzel', 'italic 500 35px "Cormorant Garamond"', '500 22px "Noto Sans"'].map((f) => document.fonts.load(f, 'भारत Aa')))));
  await sleep(800);
  const png = await card.screenshot({ type: 'png' });
  fs.mkdirSync(path.join(ROOT, 'social'), { recursive: true });
  await sharp(png).jpeg({ quality: 84, mozjpeg: true }).toFile(path.join(ROOT, 'social', 'preview.jpg'));
  await card.close();
  console.log('social/preview.jpg', Math.round(fs.statSync(path.join(ROOT, 'social', 'preview.jpg')).size / 1024) + ' KB');
}

// ------------------------------------------------------------------ animated README banner
async function hero(browser) {
  const W = +process.env.HERO_W || 760, H = Math.round(W * 9 / 16);
  const page = await open(browser, 1120, 630, '#era=2&lang=en', '&intro=1');
  const frames = []; const t0 = Date.now();
  // the story: title sequence, then the Bodh Gaya scene of The Emperor Who Wept, then era 14 with the Then & Now curtain
  const sec = () => (Date.now() - t0) / 1000;
  let phase = 0, mark = 0;
  const END = 99;
  while (sec() < END) {
    const now = sec();
    if (phase === 0 && now > 4.6) { await page.click('.in-go'); phase = 1; mark = now; }   // "Begin a journey" opens the picker
    else if (phase === 1 && now > mark + 2.4) { await page.evaluate(() => window.ATLAS_JOURNEYS.start('maurya')); phase = 2; mark = sec(); }
    else if (phase === 2 && now > mark + 3.4) { await until(page, 's.on && s.scene === 0 && !s.busy'); await press(page, 'Next scene'); phase = 3; mark = sec(); }
    else if (phase === 3 && now > mark + 7.6) { await page.evaluate(() => { window.ATLAS_JOURNEYS.stop(); window.ATLAS_APP.go(14); }); phase = 4; mark = sec(); }
    else if (phase === 4 && now > mark + 2.2) { await page.evaluate(() => { window.ATLAS_NOW.on(); setTimeout(() => window.ATLAS_NOW.set(0.5), 1500); }); phase = 5; mark = sec(); }
    else if (phase === 5 && now > mark + 4.2) break;
    const buf = await page.screenshot({ type: 'jpeg', quality: 72 });
    frames.push({ at: Date.now() - t0, buf });
  }
  await page.close();
  console.log(frames.length + ' frames in ' + ((Date.now() - t0) / 1000).toFixed(1) + ' s');

  // thin the stream to ~8 fps, keep real timing, and hold the first and last frames a little
  const kept = []; let last = -1e9;
  frames.forEach((f) => { if (f.at - last >= 115) { kept.push(f); last = f.at; } });
  const delay = kept.map((f, i) => (i + 1 < kept.length ? kept[i + 1].at - f.at : 2200));
  delay[0] = Math.max(delay[0], 1000);
  const raws = await Promise.all(kept.map((f) => sharp(f.buf).resize(W, H).removeAlpha().raw().toBuffer()));
  const out = path.join(ROOT, 'assets', 'hero.webp');
  await sharp(Buffer.concat(raws), { raw: { width: W, height: H * kept.length, channels: 3, pageHeight: H } })
    .webp({ quality: +process.env.HERO_Q || 62, effort: 5, loop: 0, delay }).toFile(out);
  console.log('assets/hero.webp', kept.length + ' frames, ' + Math.round(fs.statSync(out).size / 1024) + ' KB');
}

(async () => {
  if (!BROWSER) throw new Error('No Chromium-based browser found: set BROWSER=<path>');
  const browser = await puppeteer.launch({ executablePath: BROWSER, headless: true, args: ['--hide-scrollbars', '--mute-audio', '--no-first-run', '--disable-extensions'] });
  try {
    if (what === 'preview' || what === 'all') await preview(browser);
    if (what === 'hero' || what === 'all') await hero(browser);
  } finally { await browser.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
