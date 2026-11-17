#!/usr/bin/env node
/*
 * Pre-renders the Journeys' narration with Kokoro-82M (Apache-2.0), a neural text-to-speech model from Hugging Face,
 * and writes small MP3 clips to india-atlas/audio/en/ plus audio/manifest.json. The player (js/voice.js) plays a clip
 * when its text hash matches the manifest and falls back to the browser's own voice otherwise, so editing a caption
 * never breaks narration: it just needs this script re-run. Only changed captions are re-rendered.
 *
 *   mkdir "$TMP/atlas-narration" && cp scripts/narration/package.json "$TMP/atlas-narration/" && (cd "$TMP/atlas-narration" && npm i)
 *   NARRATION_MODULES="$TMP/atlas-narration" node scripts/make_narration.js          # add --force to re-render everything
 *
 * (The modules are installed outside the project on purpose: onnxruntime-node and the 325 MB model are build-time only.)
 */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..', 'india-atlas'), OUT = path.join(ROOT, 'audio'), VOICE = 'af_heart', SPEED = 0.95, RATE = 24000;
const MODS = process.env.NARRATION_MODULES || path.join(__dirname, 'narration');
const req = require('module').createRequire(path.join(MODS, 'x.js'));
const { KokoroTTS } = req('kokoro-js');

// the same FNV-1a over UTF-16 code units as js/voice.js: a clip is used only while the caption text is unchanged
const hash = (s) => { let x = 0x811c9dc5; for (let i = 0; i < s.length; i++) { x ^= s.charCodeAt(i); x = Math.imul(x, 0x01000193) >>> 0; } return x.toString(16).padStart(8, '0'); };
const speakable = (t) => t.replace(/\bBCE\b/g, 'B C E').replace(/\bCE\b/g, 'C E').replace(/(\d[\d,]*) km\b/g, '$1 kilometres').replace(/Ibrahim/g, 'Ibraheem').replace(/’/g, "'");

const ctx = { console }; ctx.window = ctx; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'js', 'journeys_data.js'), 'utf8'), ctx);
const jobs = [];
ctx.ATLAS_JOURNEY_DATA.forEach((j) => j.beats.forEach((b, n) => { const text = b.t + '. ' + b.p; jobs.push({ id: j.id + '-' + n, text, hash: hash(text) }); }));

(async () => {
  // lamejs ships as an ES module (its CommonJS entry is a browser global), so import it by path
  const lame = await import(require('url').pathToFileURL(path.join(MODS, 'node_modules', '@breezystack', 'lamejs', 'dist', 'lamejs.js')).href);
  const force = process.argv.includes('--force');
  const mpath = path.join(OUT, 'manifest.json');
  const old = fs.existsSync(mpath) ? JSON.parse(fs.readFileSync(mpath, 'utf8')) : { clips: {} };
  fs.mkdirSync(path.join(OUT, 'en'), { recursive: true });
  const todo = jobs.filter((j) => force || !(old.clips[j.id] && old.clips[j.id].en === j.hash && fs.existsSync(path.join(OUT, 'en', j.id + '.mp3'))));
  console.log(jobs.length + ' captions, ' + todo.length + ' to render');
  const manifest = { voice: 'Kokoro-82M v1.0 (' + VOICE + '), Apache-2.0', rate: RATE, clips: {} };
  jobs.forEach((j) => { if (!todo.includes(j)) manifest.clips[j.id] = old.clips[j.id]; });
  if (todo.length) {
    console.log('loading model (the first run downloads ~325 MB from Hugging Face)…');
    const tts = await KokoroTTS.from_pretrained('onnx-community/Kokoro-82M-v1.0-ONNX', { dtype: 'fp32', device: 'cpu' });
    for (const j of todo) {
      const t0 = Date.now(), parts = speakable(j.text).split(/(?<=[.!?])\s+/).filter(Boolean), chunks = [];
      for (let k = 0; k < parts.length; k++) {
        const a = await tts.generate(parts[k], { voice: VOICE, speed: SPEED });
        if (a.sampling_rate !== RATE) throw new Error('unexpected sample rate ' + a.sampling_rate);
        chunks.push(a.audio, new Float32Array(Math.round(RATE * (k === 0 ? 0.55 : 0.28))));   // a longer beat after the title
      }
      const n = chunks.reduce((s, c) => s + c.length, 0), pcm = new Float32Array(n); let o = 0; chunks.forEach((c) => { pcm.set(c, o); o += c.length; });
      let peak = 0; for (let i = 0; i < n; i++) peak = Math.max(peak, Math.abs(pcm[i]));
      const g = peak > 0 ? 0.9 / peak : 1, i16 = new Int16Array(n); for (let i = 0; i < n; i++) i16[i] = Math.max(-32768, Math.min(32767, Math.round(pcm[i] * g * 32767)));
      const enc = new lame.Mp3Encoder(1, RATE, 56), out = [];
      for (let i = 0; i < n; i += 1152) { const b = enc.encodeBuffer(i16.subarray(i, i + 1152)); if (b.length) out.push(Buffer.from(b)); }
      const tail = enc.flush(); if (tail.length) out.push(Buffer.from(tail));
      const buf = Buffer.concat(out); fs.writeFileSync(path.join(OUT, 'en', j.id + '.mp3'), buf);
      manifest.clips[j.id] = { en: j.hash, s: +(n / RATE).toFixed(1) };
      const words = j.text.split(/\s+/).length;
      console.log(j.id.padEnd(14), (n / RATE).toFixed(1) + 's', Math.round(buf.length / 1024) + 'KB', 'peak ' + peak.toFixed(2), (n / RATE / words).toFixed(2) + ' s/word', ((Date.now() - t0) / 1000).toFixed(1) + 's to render');
    }
  }
  fs.writeFileSync(mpath, JSON.stringify(manifest, null, 1) + '\n');
  console.log('wrote ' + Object.keys(manifest.clips).length + ' clips + manifest');
})().catch((e) => { console.error(e); process.exit(1); });
