/*
 * Runs in <head>, before first paint: decides whether to show the opening title sequence, so returning
 * visitors (same browser session), deep links and embeds never see a flash of it.
 *   ?intro=0 skips it · ?intro=1 forces it
 */
(function () {
  'use strict';
  var u = location.href, show = true;
  try {
    if (/[?&#](era|tour|journey|person|trace|embed)\b/.test(u) || /[?&]intro=0/.test(u)) show = false;
    if (/[?&]intro=1/.test(u)) show = true;
    else if (show && sessionStorage.getItem('atlas-intro') === '1') show = false;
  } catch (_) { /* storage blocked: just show it */ }
  window.ATLAS_INTRO = show;
  if (show) {
    document.documentElement.classList.add('intro-on');
    // failsafe: if the intro script never builds the overlay, never leave the app covered
    setTimeout(function () {
      var el = document.getElementById('intro');
      if (!el || !el.firstChild) document.documentElement.classList.remove('intro-on');
    }, 7000);
  }
})();
