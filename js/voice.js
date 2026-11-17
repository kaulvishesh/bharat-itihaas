/*
 * Narration. Two sources behind one API:
 *   clips  - the Journeys' English narration is pre-rendered with Kokoro-82M (a neural model from Hugging Face,
 *            Apache-2.0) by scripts/make_narration.js and shipped as small MP3s in audio/. Instant, identical on every
 *            device, works offline once cached, no model download in the visitor's browser. A clip is used only while its
 *            caption text still matches the hash in audio/manifest.json.
 *   device - everything else (Hindi, the Listen button, the full tour, or any caption edited since the clips were
 *            rendered): the browser's built-in speech synthesis, choosing the best voice installed (neural "Natural" /
 *            "Online" / Google voices beat the robotic defaults).
 * API: ATLAS_VOICE.say(text, {clip, onend}) · .stop() · .warm(clipId) · .unlock()
 */
(function () {
  'use strict';
  const A = window.ATLAS_APP;
  if (!A) return;
  const { hi } = A;

  // the same FNV-1a over UTF-16 code units as scripts/make_narration.js
  const hash = (s) => { let x = 0x811c9dc5; for (let i = 0; i < s.length; i++) { x ^= s.charCodeAt(i); x = Math.imul(x, 0x01000193) >>> 0; } return x.toString(16).padStart(8, '0'); };
  const S = { gen: 0, audio: null, manifest: null, mp: null };

  function manifest() {
    if (!S.mp) S.mp = fetch('audio/manifest.json').then((r) => (r.ok ? r.json() : null)).then((m) => (S.manifest = m)).catch(() => null);
    return S.mp;
  }

  // ---------------------------------------------------------------- device voice (best one installed)
  function pickDevice(lang) {
    const vs = (window.speechSynthesis && window.speechSynthesis.getVoices()) || [];
    const want = lang === 'hi' ? ['hi-in', 'hi'] : ['en-in', 'en-gb', 'en-us', 'en'];
    let best = null, bs = -1;
    vs.forEach((v) => {
      const l = (v.lang || '').toLowerCase().replace('_', '-');
      const li = want.findIndex((w) => l === w || l.indexOf(w + '-') === 0);
      if (li < 0) return;
      const n = v.name.toLowerCase();
      let s = (want.length - li) * 10;
      if (/natural|neural|online|premium|enhanced|siri/.test(n)) s += 40;
      if (/google/.test(n)) s += 25;
      if (!v.localService) s += 5;
      if (s > bs) { bs = s; best = v; }
    });
    return best;
  }
  function deviceSay(text, id, o) {
    try {
      if (!('speechSynthesis' in window)) { if (o.onend) o.onend(); return; }
      const u = new SpeechSynthesisUtterance(text), lang = hi() ? 'hi' : 'en', v = pickDevice(lang);
      u.lang = v ? v.lang : (lang === 'hi' ? 'hi-IN' : 'en-IN'); if (v) u.voice = v; u.rate = 0.95;
      const done = () => { if (id === S.gen && o.onend) o.onend(); };
      u.onend = done; u.onerror = done;
      window.speechSynthesis.speak(u);
    } catch (_) { if (o.onend) o.onend(); }
  }

  // ---------------------------------------------------------------- pre-rendered clips
  const clipUrl = (id) => 'audio/en/' + encodeURIComponent(id) + '.mp3';
  function playClip(id, gen, text, o) {
    const a = new Audio(clipUrl(id)); S.audio = a;
    a.onended = () => { if (gen === S.gen && o.onend) o.onend(); };
    a.onerror = () => { if (gen === S.gen) deviceSay(text, gen, o); };
    const p = a.play(); if (p && p.catch) p.catch(() => { if (gen === S.gen) deviceSay(text, gen, o); });
  }

  // ---------------------------------------------------------------- public
  const duck = (on) => { if (window.ATLAS_MUSIC) window.ATLAS_MUSIC.duck(on); };   // lower the ambient music while someone is speaking
  function stop() {
    S.gen++; duck(false);
    if (S.audio) { S.audio.onended = null; S.audio.onerror = null; try { S.audio.pause(); } catch (_) { /* gone */ } S.audio = null; }
    try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (_) { /* none */ }
  }
  function say(text, o) {
    o = o || {};
    if (!text) { if (o.onend) o.onend(); return; }
    stop(); const gen = S.gen;
    const end = o.onend; o = Object.assign({}, o, { onend: () => { duck(false); if (end) end(); } }); duck(true);
    if (o.clip && !hi()) {
      manifest().then((m) => {
        if (gen !== S.gen) return;
        const c = m && m.clips && m.clips[o.clip];
        if (c && c.en === hash(text)) playClip(o.clip, gen, text, o); else deviceSay(text, gen, o);
      });
      return;
    }
    deviceSay(text, gen, o);
  }
  // fetch the next scene's clip while this one plays, so it starts instantly
  function warm(id) { if (!id || hi()) return; manifest().then((m) => { if (m && m.clips && m.clips[id]) fetch(clipUrl(id)).catch(() => {}); }); }
  function unlock() { try { window.speechSynthesis && window.speechSynthesis.getVoices(); } catch (_) { /* ok */ } manifest(); }

  window.ATLAS_VOICE = { say, stop, warm, unlock };
})();
