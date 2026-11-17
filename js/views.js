/*
 * View counter: one number, nothing else.
 * A visit is counted once per browser session (sessionStorage), only on the real site (not localhost, forks or embeds), and the
 * running total is shown in the info panel footer and on the title screen. The count comes from the free, open-source Count API
 * (https://countapi.mileshilliard.com/): GET /api/v1/hit/<key> adds one and returns {"value": n}, GET /api/v1/get/<key> only
 * reads. Nothing about the visitor is sent: no cookies, no identifier, no page address (credentials and referrer are omitted).
 * Like any web server, the service sees the request's IP address; it stores only the number.
 * The key is public, as is everything the page does, so anyone could add to the count or reset it: treat it as a rough figure.
 * If the service is down, blocked or slow, the counter just stays hidden.
 * API: ATLAS_VIEWS.paint() · .total() (the number, or null)
 */
(function () {
  'use strict';
  const A = window.ATLAS_APP;
  if (!A) return;
  const SITE = 'kaulvishesh.github.io';   // fill in your own host if you publish a copy; anything else only reads the count
  const API = 'https://countapi.mileshilliard.com/api/v1/', KEY = 'bharat-itihaas-views-7f3c9a21d4e8';   // keys share one namespace, so keep this long and unusual
  const TIMEOUT = 8000;   // give up quietly rather than leave a request hanging
  const embed = /[?&#]embed=1/.test(window.ATLAS_INITIAL_URL || location.href);
  let total = null;

  const fmt = (n) => { try { return n.toLocaleString('en-IN'); } catch (_) { return String(n); } };
  const label = () => (total == null ? '' : A.hi() ? fmt(total) + ' बार देखा गया' : fmt(total) + (total === 1 ? ' view' : ' views'));
  function paint() {
    document.querySelectorAll('[data-views]').forEach((el) => { el.textContent = label(); el.hidden = total == null; });
  }

  function start() {
    let counted = false;
    try { counted = sessionStorage.getItem('atlas-view') === '1'; } catch (_) { /* private mode */ }
    const op = location.hostname === SITE && !embed && !counted ? 'hit' : 'get';
    // mark the visit as counted before asking, so a slow or failed answer can never make a reload count twice
    if (op === 'hit') { try { sessionStorage.setItem('atlas-view', '1'); } catch (_) { /* fine */ } }
    const ctl = window.AbortController ? new AbortController() : null, timer = ctl ? setTimeout(() => ctl.abort(), TIMEOUT) : 0;
    fetch(API + op + '/' + KEY, { cache: 'no-store', credentials: 'omit', referrerPolicy: 'no-referrer', signal: ctl ? ctl.signal : undefined })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        clearTimeout(timer);
        const n = j ? Number(j.value) : NaN;   // the service may send the number as a string
        if (!isFinite(n) || n < 0) return;
        total = Math.floor(n);
        paint();
      })
      .catch(() => { clearTimeout(timer); /* counter stays hidden */ });
  }

  document.addEventListener('atlas:lang', paint);
  window.ATLAS_VIEWS = { paint, total: () => total };
  // a tab opened in the background (or prerendered) is not a view yet
  if (document.visibilityState === 'visible') start();
  else document.addEventListener('visibilitychange', function once() { if (document.visibilityState === 'visible') { document.removeEventListener('visibilitychange', once); start(); } });
})();
