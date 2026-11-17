/*
 * Soft ambient music, synthesised live in the browser with the Web Audio API: no recordings, no samples, no downloads,
 * nothing to license, and it works offline.
 *
 * What you hear: a tanpura-like drone (four plucked strings in the classic Pa-Sa-Sa-Sa cycle, with the buzzing "jawari"
 * brightness that fades as each string rings out), a warm slow-breathing pad on Sa and Pa, and now and then a short,
 * unhurried phrase of bell-like notes with a little glide, all wrapped in a long, dark reverb. Notes come from a raga scale
 * in just intonation, so everything is consonant; the scale follows the story (ancient eras: Bhoopali, golden ages: Yaman,
 * the medieval centuries: Bhairavi, the modern age: Bhairav; each journey has its own). Narration ducks the music.
 *
 * Off by default (browsers do not allow sound before a click anyway). The choice is remembered; if it was on last time, the
 * music starts at your first click or key press. Button in the header, on the opening screen and in the journey controls;
 * press M to toggle. Music pauses when the tab is hidden.
 * API: ATLAS_MUSIC.on() / .off() / .toggle() / .isOn() / .duck(bool) / .mood(name) / .bind(button)
 */
(function () {
  'use strict';
  const A = window.ATLAS_APP;
  if (!A) return;
  const AC = window.AudioContext || window.webkitAudioContext;
  const KEY = 'atlas-music', VOL = 1, DUCK = 0.38;
  const SA = 146.83;   // D3, a comfortable tanpura pitch
  const SCALES = {     // just-intonation ratios above Sa; all of them contain Pa, which the drone sounds
    bhoopali: [1, 9 / 8, 5 / 4, 3 / 2, 5 / 3],
    yaman: [1, 9 / 8, 5 / 4, 45 / 32, 3 / 2, 5 / 3, 15 / 8],
    bhairavi: [1, 16 / 15, 6 / 5, 4 / 3, 3 / 2, 8 / 5, 9 / 5],
    bhairav: [1, 16 / 15, 5 / 4, 4 / 3, 3 / 2, 8 / 5, 15 / 8]
  };
  const JOURNEY_MOOD = { maurya: 'bhairavi', travellers: 'yaman', chola: 'bhoopali', sultans: 'bhairavi', freedom: 'bhairav' };
  const STRINGS = [SA * 0.75, SA * 2, SA * 2, SA];   // Pa, Sa', Sa', Sa

  const mulberry = (a) => () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };

  // a long, dark, slightly diffuse room made from decaying noise
  function impulse(ctx, secs, rnd) {
    const rate = ctx.sampleRate, len = Math.floor(rate * secs), buf = ctx.createBuffer(2, len, rate);
    for (let c = 0; c < 2; c++) {
      const d = buf.getChannelData(c); let lp = 0;
      for (let i = 0; i < len; i++) {
        const k = i / len, env = Math.pow(1 - k, 2.4) * (i < rate * 0.025 ? i / (rate * 0.025) : 1);
        lp += ((rnd() * 2 - 1) - lp) * (0.55 - 0.46 * k);   // the tail darkens as it fades
        d[i] = lp * env;
      }
    }
    return buf;
  }

  /*
   * The synth. `ctx` is any AudioContext (live or Offline), `out` the node to feed. schedule(until) queues every event up
   * to that time, so it can be driven by a timer live or called once for a rendered test.
   */
  function engine(ctx, out, seed) {
    const rnd = mulberry(seed || 7);
    const bus = ctx.createGain(), dry = ctx.createGain(), wet = ctx.createGain(), conv = ctx.createConvolver(), master = ctx.createGain();
    dry.gain.value = 0.6; wet.gain.value = 0.75; master.gain.value = 1;
    conv.buffer = impulse(ctx, 3.4, rnd);
    bus.connect(dry); bus.connect(conv); conv.connect(wet); dry.connect(master); wet.connect(master); master.connect(out);

    // A string = a warm body (low harmonics, rings for seconds) plus a buzzy "jawari" layer (harmonics 4-22, gone within ~2 s).
    // Two fixed layers with their own fades are far cheaper than sweeping a filter, which the browser recomputes every sample.
    const wv = (from, to, w) => { const re = new Float32Array(to + 1), im = new Float32Array(to + 1); for (let n = from; n <= to; n++) im[n] = w(n); return ctx.createPeriodicWave(re, im); };
    const bodyWave = wv(1, 5, (n) => 1 / Math.pow(n, 0.9)), buzzWave = wv(4, 22, (n) => (1 / Math.pow(n, 0.7)) * (n <= 9 ? 1.4 : 1));

    function layer(t, f, wave, amp, dur) {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.setPeriodicWave(wave); o.frequency.value = f; o.detune.value = (rnd() - 0.5) * 7;
      g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(amp, t + 0.014); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g); g.connect(bus); o.start(t); o.stop(t + dur + 0.1);
    }
    function pluck(t, f, amp) { layer(t, f, bodyWave, amp, 7); layer(t, f, buzzWave, amp * 0.55, 2.4); }

    let pad = null;
    function startPad(t0) {   // a quiet bed on Sa, Pa and the octave, breathing slowly
      const padGain = ctx.createGain(), lp = ctx.createBiquadFilter(), lfo = ctx.createOscillator(), lfoG = ctx.createGain(), oscs = [lfo];
      lp.type = 'lowpass'; lp.frequency.value = 520; lp.Q.value = 0.5; lfo.frequency.value = 0.045; lfoG.gain.value = 170;
      lfo.connect(lfoG); lfoG.connect(lp.frequency);
      padGain.gain.setValueAtTime(0, t0); padGain.gain.linearRampToValueAtTime(0.05, t0 + 6);
      [[SA, 'triangle', 0.5], [SA * 1.0008, 'triangle', 0.5], [SA * 1.5, 'sine', 0.34], [SA * 2, 'sine', 0.3], [SA * 2.0014, 'sine', 0.24]].forEach(([f, type, a]) => {
        const o = ctx.createOscillator(), g = ctx.createGain(); o.type = type; o.frequency.value = f; g.gain.value = a; o.connect(g); g.connect(lp); o.start(t0); oscs.push(o);
      });
      lp.connect(padGain); padGain.connect(bus); lfo.start(t0);
      pad = { oscs, padGain };
    }

    function bell(t, f, amp, pan) {   // a soft, glassy note with a small glide up into pitch
      const sum = ctx.createGain(), flt = ctx.createBiquadFilter(); flt.type = 'lowpass'; flt.frequency.value = Math.min(4200, f * 6);
      sum.connect(flt);
      let tail = flt;
      if (ctx.createStereoPanner) { const p = ctx.createStereoPanner(); p.pan.value = pan; flt.connect(p); tail = p; }
      tail.connect(bus);
      [[1, 1, 5.4], [2, 0.26, 2.8], [3.01, 0.09, 1.5], [0.5, 0.16, 5.4]].forEach(([m, a, d]) => {
        const o = ctx.createOscillator(), g = ctx.createGain(); o.type = 'sine';
        o.frequency.setValueAtTime(f * m * 0.988, t); o.frequency.exponentialRampToValueAtTime(f * m, t + 0.14);
        g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(amp * a, t + 0.022); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
        o.connect(g); g.connect(sum); o.start(t); o.stop(t + d + 0.1);
      });
    }

    let mood = 'bhoopali', notes = [], ni = 0, nextPluck = 0, pi = 0, nextPhrase = 0;
    function setMood(name) {
      if (!SCALES[name]) return;
      mood = name; const r = SCALES[name]; notes = [];
      [2, 4].forEach((o) => r.forEach((x) => notes.push(SA * o * x)));
      notes.push(SA * 8); ni = Math.min(ni, notes.length - 1);
    }
    function phrase(t) {
      const r = SCALES[mood], k = rnd() < 0.45 ? 2 : rnd() < 0.2 ? 3 : 1;
      let tt = t;
      for (let i = 0; i < k; i++) {
        ni += [-3, -2, -1, -1, 1, 1, 2, 3][(rnd() * 8) | 0];
        if (ni > notes.length - 3) ni -= 2; if (ni < 1) ni += 2;
        if (i === k - 1 && rnd() < 0.4) ni = rnd() < 0.5 ? 0 : r.length;   // often settle on Sa
        ni = Math.max(0, Math.min(notes.length - 1, ni));
        bell(tt, notes[ni], 0.1 + rnd() * 0.04, (rnd() - 0.5) * 1.1);
        tt += 0.85 + rnd() * 0.5;
      }
      return tt + 2.4 + rnd() * 4.4;   // then a long rest
    }

    setMood('bhoopali');
    return {
      start(t0) { startPad(t0); nextPluck = t0 + 0.3; nextPhrase = t0 + 6; },
      schedule(until) {
        while (nextPluck < until) { pluck(nextPluck, STRINGS[pi % 4], 0.15); nextPluck += (pi % 4 === 3 ? 1.75 : 1.12) + (rnd() - 0.5) * 0.14; pi++; }
        while (nextPhrase < until) nextPhrase = phrase(nextPhrase);
      },
      setMood, mood: () => mood
    };
  }

  // ------------------------------------------------------------------ live playback
  const S = { want: false, ctx: null, eng: null, fade: null, duckG: null, timer: 0, poll: 0, offT: 0, btns: [], armed: false };
  const hi = () => A.hi();
  const load = () => { try { return localStorage.getItem(KEY) === '1'; } catch (_) { return false; } };
  const save = (v) => { try { localStorage.setItem(KEY, v ? '1' : '0'); } catch (_) { /* private mode */ } };

  function ramp(g, to, secs) {
    const t = S.ctx.currentTime; g.gain.cancelScheduledValues(t); g.gain.setValueAtTime(g.gain.value, t); g.gain.linearRampToValueAtTime(to, t + secs);
  }
  function wanted() {
    const j = window.ATLAS_JOURNEYS && window.ATLAS_JOURNEYS.state && window.ATLAS_JOURNEYS.state();
    if (j && j.on && JOURNEY_MOOD[j.journey]) return JOURNEY_MOOD[j.journey];
    const n = A.ERAS.length, k = n > 1 ? A.state.i / (n - 1) : 0;
    return k < 0.3 ? 'bhoopali' : k < 0.55 ? 'yaman' : k < 0.8 ? 'bhairavi' : 'bhairav';
  }
  function build() {
    if (S.ctx) return true;
    if (!AC) return false;
    // the sound is all warm and low (nothing above ~8 kHz), so half the usual sample rate sounds the same and halves the CPU and battery cost
    try { S.ctx = new AC({ latencyHint: 'playback', sampleRate: 22050 }); } catch (_) { try { S.ctx = new AC({ latencyHint: 'playback' }); } catch (__) { return false; } }
    S.fade = S.ctx.createGain(); S.fade.gain.value = 0; S.duckG = S.ctx.createGain(); S.duckG.gain.value = 1;
    S.fade.connect(S.duckG); S.duckG.connect(S.ctx.destination);
    S.eng = engine(S.ctx, S.fade, (Date.now() & 0xffff) | 1); S.eng.start(S.ctx.currentTime + 0.1);
    return true;
  }
  function run() {
    if (!build()) return;
    clearTimeout(S.offT);
    if (S.ctx.state === 'suspended') S.ctx.resume();
    ramp(S.fade, VOL, 3);
    if (!S.timer) S.timer = setInterval(() => S.eng.schedule(S.ctx.currentTime + 1.6), 300);
    if (!S.poll) S.poll = setInterval(() => { if (S.eng) S.eng.setMood(wanted()); }, 2000);
    S.eng.setMood(wanted()); S.eng.schedule(S.ctx.currentTime + 1.6);
  }
  function halt() {
    if (!S.ctx) return;
    ramp(S.fade, 0, 1.2);
    clearTimeout(S.offT);
    S.offT = setTimeout(() => { if (!S.want && S.ctx) { S.ctx.suspend(); clearInterval(S.timer); clearInterval(S.poll); S.timer = S.poll = 0; } }, 1400);
  }

  function paint() {
    const label = hi() ? 'पृष्ठभूमि संगीत' : 'Ambient music', state = hi() ? (S.want ? 'चालू' : 'बंद') : (S.want ? 'on' : 'off');
    S.btns = S.btns.filter((b) => b.isConnected);   // the title screen is rebuilt when the language changes
    S.btns.forEach((b) => {
      b.classList.toggle('on', S.want); b.setAttribute('aria-pressed', S.want ? 'true' : 'false');
      b.setAttribute('aria-label', label); b.title = label + ' · ' + state + ' (M)';
      const t = b.querySelector('.ml'); if (t) t.textContent = hi() ? 'संगीत' : 'Music';
    });
  }
  const ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.2 17.2V6l9-1.8v11.2" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round" stroke-linecap="round"/><circle cx="6.8" cy="17.4" r="2.6" fill="currentColor"/><circle cx="15.8" cy="15.6" r="2.6" fill="currentColor"/><path class="mx" d="M3.2 3.2l17.6 17.6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>';

  function on() { S.want = true; save(true); disarm(); paint(); run(); }
  function off() { S.want = false; save(false); disarm(); paint(); halt(); }
  function toggle() { if (S.want) off(); else on(); }
  function bind(btn) {
    if (!btn || btn._music) return;
    btn._music = true; if (!btn.querySelector('svg')) btn.insertAdjacentHTML('afterbegin', ICON);
    btn.addEventListener('click', (e) => { e.stopPropagation(); toggle(); });
    S.btns.push(btn); paint();
  }
  function duck(on) { if (S.ctx && S.duckG) ramp(S.duckG, on ? DUCK : 1, on ? 0.5 : 1.6); }

  // restored "on": browsers need a gesture before sound, so wait for the first click or key
  function arm() {
    if (S.armed) return; S.armed = true;
    ['pointerdown', 'keydown', 'touchend'].forEach((ev) => document.addEventListener(ev, onGesture, true));
  }
  function disarm() { if (!S.armed) return; S.armed = false; ['pointerdown', 'keydown', 'touchend'].forEach((ev) => document.removeEventListener(ev, onGesture, true)); }
  function onGesture() { disarm(); if (S.want) run(); }

  document.addEventListener('visibilitychange', () => {
    if (!S.ctx || !S.want) return;
    if (document.hidden) S.ctx.suspend(); else S.ctx.resume();
  });
  document.addEventListener('keydown', (e) => {
    if ((e.key !== 'm' && e.key !== 'M') || e.ctrlKey || e.metaKey || e.altKey || e.repeat) return;
    const t = e.target && e.target.tagName; if (t === 'INPUT' || t === 'TEXTAREA' || t === 'SELECT' || (e.target && e.target.isContentEditable)) return;
    toggle();
  });
  new MutationObserver(paint).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

  S.want = load();
  window.ATLAS_MUSIC = { on, off, toggle, isOn: () => S.want, duck, bind, mood: (m) => { if (S.eng) S.eng.setMood(m); }, _engine: engine, _state: S };
  bind(document.getElementById('btnMusic'));
  if (S.want) arm();
})();
