/*
 * View counter: one number, nothing else.
 * A visit is counted once per browser session (sessionStorage), only on the real site (not localhost, forks or embeds), and the
 * running total is shown in the info panel footer and on the title screen. The count comes from Abacus, a free open-source
 * counter service (https://abacus.jasoncameron.dev/): GET /hit/<namespace>/<key> adds one and returns {"value": n}, GET /get/...
 * only reads. Nothing about the visitor is sent: no cookies, no identifier, no page address (credentials and referrer are
 * omitted). Like any web server, the service sees the request's IP address; it stores only the number.
 * If the service is down, blocked or slow, the counter just stays hidden.
 * API: ATLAS_VIEWS.paint() · .total() (the number, or null)
 */
(function () {
  'use strict';
  const A = window.ATLAS_APP;
  if (!A) return;
  const SITE = 'kaulvishesh.github.io';   // fill in your own host if you publish a copy; anything else only reads the count
  const API = 'https://abacus.jasoncameron.dev/', NS = 'bharat-itihaas', KEY = 'views';
  const embed = /[?&#]embed=1/.test(window.ATLAS_INITIAL_URL || location.href);
  let total = null;

  const fmt = (n) => { try { return n.toLocaleString('en-IN'); } catch (_) { return String(n); } };
  const label = () => (total == null ? '' : A.hi() ? fmt(total) + ' बार देखा गया' : fmt(total) + ' views');
  function paint() {
    document.querySelectorAll('[data-views]').forEach((el) => { el.textContent = label(); el.hidden = total == null; });
  }

  function start() {
    let counted = false;
    try { counted = sessionStorage.getItem('atlas-view') === '1'; } catch (_) { /* private mode */ }
    const op = location.hostname === SITE && !embed && !counted ? 'hit' : 'get';
    fetch(API + op + '/' + NS + '/' + KEY, { cache: 'no-store', credentials: 'omit', referrerPolicy: 'no-referrer' })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (!j || typeof j.value !== 'number') return;
        total = j.value;
        if (op === 'hit') { try { sessionStorage.setItem('atlas-view', '1'); } catch (_) { /* fine */ } }
        paint();
      })
      .catch(() => { /* counter stays hidden */ });
  }

  document.addEventListener('atlas:lang', paint);
  window.ATLAS_VIEWS = { paint, total: () => total };
  // a tab opened in the background (or prerendered) is not a view yet
  if (document.visibilityState === 'visible') start();
  else document.addEventListener('visibilitychange', function once() { if (document.visibilityState === 'visible') { document.removeEventListener('visibilitychange', once); start(); } });
})();
