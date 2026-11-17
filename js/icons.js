/*
 * One consistent set of hand-drawn pictograms for the whole atlas: places, markets, forts, temples,
 * mountains, forests, ships and the travellers that walk the routes.
 * House style: warm ink outline (1.2 px, rounded), parchment / sandstone fills, with accents of gold and crimson only.
 * Each icon is a 32-unit square (travellers are wider) so they can share sizes, shadows and CSS.
 */
(function () {
  'use strict';
  const INK = '#2b2640', PAPER = '#f4ebcf', STONE = '#dccb9c', GOLD = '#c1932f', CRIM = '#a3302a', LAPIS = '#34528c', LEAF = '#7f9d6f', SNOW = '#fcf8ea', SADDLE = '#c9a56f';
  const wrap = (vb, body, cls) =>
    '<svg class="ic' + (cls ? ' ' + cls : '') + '" viewBox="' + vb + '" aria-hidden="true"><g fill="none" stroke="' + INK + '" stroke-width="1.2" stroke-linejoin="round" stroke-linecap="round">' + body + '</g></svg>';
  const sq = (body, cls) => wrap('0 0 32 32', body, cls);

  const ICONS = {
    capital: sq(
      '<path d="M5 28V14h22v14z" fill="' + PAPER + '"/>' +
      '<path d="M5 14V11h3v3h3v-3h3v3h4v-3h3v3h3v-3h3v3" fill="' + PAPER + '"/>' +
      '<path d="M12.5 28v-7a3.5 3.5 0 017 0v7z" fill="' + GOLD + '"/>' +
      '<path d="M8 19h2.4M21.6 19H24" /><path d="M16 11V3.5"/><path d="M16 3.5l7 2.4-7 2.4z" fill="' + CRIM + '"/>'),
    city: sq(
      '<path d="M3 28V18l6-5 6 5v10z" fill="' + PAPER + '"/><path d="M15 28V16l6.5-5.5L28 16v12z" fill="' + STONE + '"/>' +
      '<path d="M8 28v-5h3.4v5M20 28v-5h3.4v5" fill="' + GOLD + '"/>'),
    site: sq(
      '<path d="M12.5 28l1-17h5l1 17z" fill="' + PAPER + '"/><path d="M10 28h12"/><path d="M11 11c0-3.4 2.2-6 5-6s5 2.6 5 6z" fill="' + GOLD + '"/>' +
      '<path d="M16 5V2.5"/><path d="M14 17.5h4"/>'),
    port: sq(
      '<circle cx="16" cy="7" r="2.8" fill="' + LAPIS + '"/><path d="M16 9.8V26M10.5 15h11M5.5 19.5C6.5 25 11 27.5 16 27.5S25.5 25 26.5 19.5"/><path d="M5.5 19.5l-2.2 2.6M26.5 19.5l2.2 2.6"/>'),
    seal: sq(
      '<circle cx="16" cy="16" r="11" fill="' + CRIM + '" stroke="' + GOLD + '" stroke-width="1.8"/><circle cx="16" cy="16" r="8.2" stroke="' + GOLD + '" stroke-width=".7"/>' +
      '<path d="M16 7.6l2.4 5.6 6.1.5-4.6 4 1.4 6-5.3-3.2-5.3 3.2 1.4-6-4.6-4 6.1-.5z" fill="' + PAPER + '" stroke="none"/>'),
    market: sq(
      '<path d="M4 13l3-7.5h18l3 7.5z" fill="' + PAPER + '"/><path d="M8.6 5.5L7.8 13M14.6 5.5L14.3 13M20.6 5.5l.3 7.5M26 8.6" stroke="' + CRIM + '" stroke-width="2.6"/>' +
      '<path d="M4 13a3 3 0 006 0 3 3 0 006 0 3 3 0 006 0 3 3 0 006 0" fill="' + PAPER + '"/>' +
      '<path d="M7 16v11M25 16v11"/><path d="M5 27.5h22"/><path d="M9.5 21.5h13v6h-13z" fill="' + STONE + '"/>' +
      '<circle cx="13" cy="19.6" r="1.6" fill="' + GOLD + '"/><circle cx="16.4" cy="19.8" r="1.5" fill="' + CRIM + '"/><circle cx="19.8" cy="19.6" r="1.6" fill="' + GOLD + '"/>'),
    sarai: sq(
      '<path d="M4 28V12.5h24V28z" fill="' + PAPER + '"/><path d="M4 12.5L6.5 9h19l2.5 3.5" fill="' + STONE + '"/><path d="M11 28V19.5a5 5 0 0110 0V28z" fill="' + INK + '" fill-opacity=".75"/>' +
      '<path d="M7 16.5h3M22 16.5h3"/><path d="M16 9V5.5"/><path d="M16 5.5l4 1.4-4 1.4z" fill="' + CRIM + '"/>'),
    fort: sq(
      '<path d="M3.5 28V10h7v3.5h11V10h7v18z" fill="' + STONE + '"/><path d="M3.5 10V7.2h2v1.6h2V7.2h2v2.8M22.5 10V7.2h2v1.6h2V7.2h2v2.8"/>' +
      '<path d="M10.5 13.5V10.8h2.4v1.5h2.2v-1.5h1.8v1.5h2.2v-1.5h2.4v2.7" fill="' + PAPER + '"/><path d="M12.8 28v-6a3.2 3.2 0 016.4 0v6z" fill="' + INK + '" fill-opacity=".8"/>' +
      '<path d="M16 10.8V4"/><path d="M16 4l5.4 1.9L16 7.8z" fill="' + CRIM + '"/>'),
    temple: sq(
      '<path d="M6 28v-5.5h20V28z" fill="' + STONE + '"/><path d="M8.5 22.5V17h15v5.5z" fill="' + PAPER + '"/><path d="M10.5 17c0-6 2.4-9.5 5.5-13.5 3.100 4 5.500 7.500 5.500 13.500z" fill="' + PAPER + '"/>' +
      '<path d="M13 17c.4-4 1.500-7 3-9.500M19 17c-.4-4-1.500-7-3-9.500"/><circle cx="16" cy="3.8" r="1.4" fill="' + GOLD + '"/><path d="M14.300 28v-3.200h3.400V28z" fill="' + INK + '" fill-opacity=".8"/>'),
    stupa: sq(
      '<path d="M4 28.500h24"/><path d="M6.500 28.500v-3.500h19v3.500z" fill="' + STONE + '"/><path d="M8 25c0-8.500 3.800-13.500 8-13.500s8 5 8 13.500z" fill="' + PAPER + '"/>' +
      '<path d="M12 11.500h8V9h-8z" fill="' + STONE + '"/><path d="M16 9V4M12.500 4.800h7"/><path d="M10.500 25c0-5 1.800-8.500 5.500-8.500" stroke-width=".7"/><path d="M14 20.500h4v4.500h-4z" fill="' + INK + '" fill-opacity=".75"/>'),
    mosque: sq(
      '<path d="M8 28V17h16v11z" fill="' + PAPER + '"/><path d="M9.500 17c0-6 2.800-9 6.500-9s6.500 3 6.500 9z" fill="' + STONE + '"/><path d="M16 8V4.300"/><circle cx="16" cy="3.300" r="1.100" fill="' + GOLD + '"/>' +
      '<path d="M2.800 28V11.500l2.200-2.300 2.200 2.300V28zM24.800 28V11.500L27 9.200l2.200 2.300V28z" fill="' + PAPER + '"/><path d="M13 28v-5a3 3 0 016 0v5z" fill="' + INK + '" fill-opacity=".8"/>'),
    mountain: wrap('0 0 40 30',
      '<path d="M2 28L14 5.500l6.500 11L25 9.500 38 28z" fill="' + PAPER + '"/><path d="M14 5.500l-3.800 6.800 3-1.200 1.800 2.200 1.600-2.400 3 1.600z" fill="' + SNOW + '"/>' +
      '<path d="M8 24l5.500-9M12.500 26.500L18 18M24 24l-3.200-5M28.500 26.500l-4.500-7.500M33 26l-3.500-5.500" stroke-width=".75"/>'),
    tree: sq(
      '<path d="M16 28v-8.500" stroke-width="1.7"/><path d="M16 3.500c4.600 0 7.800 3.400 7.800 7.600 3 .4 5 2.700 5 5.400 0 3.200-2.700 5.600-6 5.600H9.200c-3.300 0-6-2.400-6-5.600 0-2.700 2-5 5-5.400C8.200 6.900 11.400 3.500 16 3.500z" fill="' + LEAF + '"/>' +
      '<path d="M10.500 12.500c2-2 4.200-2 5.500 0M16.800 16.500c1.200-2 3.200-2 4.500 0" stroke-width=".8"/>'),
    ship: wrap('0 0 40 34',
      '<path d="M5 24.500h30l-4.500 6.500h-21z" fill="' + STONE + '"/><path d="M20 4v20.500"/><path d="M20 7c8 2.400 12 9 10.800 16.500H20z" fill="' + PAPER + '"/><path d="M20 10.500c-7 2.200-10.400 7-9.400 13H20z" fill="' + PAPER + '"/>' +
      '<path d="M20 4l7 2.200-7 2.200z" fill="' + CRIM + '"/><path d="M2 32c4.500-2.500 8 2 12 0s8 2 12 0 7.500 1.500 12 0" stroke="' + LAPIS + '" stroke-width=".9"/>', 'ic-wide'),
    dam: sq(
      '<path d="M3 9h26v5l-3.500 14h-19L3 14z" fill="' + STONE + '"/><path d="M3 9h26"/><path d="M8 14v14M13 14v14M19 14v14M24 14v14" stroke-width=".7"/>' +
      '<path d="M2 6c3-2 5 2 8 0s5 2 8 0 5 2 8 0 3 1 4 0" stroke="' + LAPIS + '" stroke-width="1"/>'),
    soldier: wrap('0 0 30 42',
      '<path d="M24 3v37" stroke-width="1.100"/><path d="M24 3l-2.600 6h5.200z" fill="' + STONE + '"/>' +
      '<path d="M11 15c-3.200 3-4.200 9-4.200 19h12.400c0-10-1-16-3.800-19z" fill="' + CRIM + '"/><path d="M8 25h10" stroke="' + GOLD + '" stroke-width="1.300"/>' +
      '<circle cx="13" cy="9.500" r="3.600" fill="' + PAPER + '"/><path d="M9.200 9c.2-4.800 7.200-4.800 7.600 0z" fill="' + STONE + '"/><path d="M13 5.500V3.500" stroke="' + CRIM + '" stroke-width="1.600"/>' +
      '<circle cx="19.500" cy="22" r="5.200" fill="' + LAPIS + '"/><circle cx="19.500" cy="22" r="1.600" fill="' + GOLD + '"/><path d="M10 34l-.8 6M16 34l.8 6"/>', 'ic-trav'),
    banner: sq(
      '<path d="M9 29V4" stroke-width="1.5"/><path d="M9 5.500h16l-4 5 4 5H9z" fill="' + CRIM + '"/><circle cx="9" cy="3.500" r="1.600" fill="' + GOLD + '"/><path d="M5 29.500h8" />'),

    // travellers (face right; the map flips them when heading west)
    horse: wrap('0 -6 50 50',
      '<path d="M10.500 20c-4.500 1-7 5-6.500 10" stroke-width="2.200"/>' +
      '<path d="M13 31l-1.500 11M17.500 31l2 10.500M32.500 31l1 11M37.500 29.500l3.500 10" stroke-width="2.200"/>' +
      '<ellipse cx="24" cy="24" rx="14" ry="7.200" fill="' + SADDLE + '"/>' +
      '<path d="M33 20.500L37.500 9l5 1.800L40 24z" fill="' + SADDLE + '"/>' +
      '<path d="M37.500 9l1.500-4.500 5 3.500 3.500 4.200-2.500 2-3-1.600-1.600 3.400z" fill="' + SADDLE + '"/><path d="M38.500 5.200l.5-3 2.500 2.800" fill="' + SADDLE + '"/><path d="M37 9.200l-5.500 9" stroke-width="2"/>' +
      '<path d="M20 17.500h9v6h-9z" fill="' + CRIM + '"/><path d="M20 20.500h9" stroke="' + GOLD + '" stroke-width="1"/>' +
      '<path d="M22.500 17.500l1.800-8 3.200.5.800 7.500z" fill="' + LAPIS + '"/><circle cx="25.500" cy="7.500" r="2.800" fill="' + PAPER + '"/><path d="M22.800 6.500c.6-3 4.800-3.800 5.600 0z" fill="' + GOLD + '"/>' +
      '<path d="M27 11L44 1" stroke-width="1.100"/><path d="M44 1l-1-4.500M44 1l4.300 1.400" stroke="' + CRIM + '"/><path d="M42.400 -1.200l5 1.600-3.800 2.600z" fill="' + CRIM + '" stroke="none"/>', 'ic-trav'),
    walker: wrap('0 0 36 44',
      '<path d="M26 6v36" stroke-width="1.500"/><path d="M24 6h4" /><circle cx="26" cy="5" r="1.600" fill="' + GOLD + '"/>' +
      '<path d="M16 15c-4.500 3.500-6 11-6 22h13c0-11-1.500-18.500-7-22z" fill="' + CRIM + '"/><path d="M16 15c3 2.500 5 6 6 11" stroke-width=".8"/><path d="M11 29c3.500 1.500 7.500 1.500 11 0" stroke="' + GOLD + '" stroke-width="1.400"/>' +
      '<circle cx="16" cy="9.500" r="4.200" fill="' + PAPER + '"/><path d="M11.800 9c.3-4.500 7.700-5.500 8.400 0z" fill="' + GOLD + '"/><path d="M22 18l4 4" stroke-width="1.400"/>' +
      '<ellipse cx="9.500" cy="22" rx="3" ry="4" fill="' + STONE + '"/><path d="M12 42l-1 1.800M20 42l1 1.800"/>', 'ic-trav'),
    lorry: wrap('0 0 50 34',
      '<path d="M3 8h27v18H3z" fill="' + PAPER + '"/><path d="M30 13h9l7 7v6H30z" fill="' + CRIM + '"/><path d="M34 15.500h4l4 4.500h-8z" fill="' + SNOW + '"/><path d="M3 21h27" stroke="' + GOLD + '"/>' +
      '<circle cx="12" cy="27" r="4.200" fill="' + INK + '"/><circle cx="37" cy="27" r="4.200" fill="' + INK + '"/><circle cx="12" cy="27" r="1.500" fill="' + STONE + '"/><circle cx="37" cy="27" r="1.500" fill="' + STONE + '"/>', 'ic-trav')
  };

  // a very small war: two tiny armies in their colours; the winner's banner flies, the loser's is down
  window.atlasBattle = function (ca, cb, w) {
    const fig = (x, dir, col) =>
      '<path d="M' + (x - 3) + ' 36L' + x + ' 23l3 13z" fill="' + col + '" stroke-width=".8"/><circle cx="' + x + '" cy="20.500" r="2.400" fill="' + PAPER + '" stroke-width=".8"/>' +
      '<path d="M' + (x + dir * 4.500) + ' 15v22" stroke-width=".8"/><circle cx="' + (x + dir * 3.200) + '" cy="29" r="2.300" fill="' + STONE + '" stroke-width=".7"/>';
    const flag = (x, dir, col, up) => up
      ? '<path d="M' + x + ' 36V5" stroke-width="1"/><path d="M' + x + ' 5.500h' + (dir * 11) + 'l' + (-dir * 3) + ' 3.800 ' + (dir * 3) + ' 3.800h' + (-dir * 11) + 'z" fill="' + col + '"/>'
      : '<path d="M' + x + ' 36l' + (-dir * 3) + ' -10" stroke-width="1"/><path d="M' + (x - dir * 3) + ' 26l' + (dir * 5) + ' 2.500-' + (dir > 0 ? 0 : 0) + ' 0 ' + (-dir * 5) + ' 2.500z" fill="#9a9488"/>';
    const body =
      '<path d="M2 37h68" stroke-width=".8"/>' +
      fig(13, 1, ca) + fig(22, 1, ca) + fig(59, -1, cb) + fig(50, -1, cb) +
      flag(7, 1, ca, w === 0) + flag(65, -1, cb, w === 1) +
      '<circle cx="36" cy="33" r="4.500" fill="' + PAPER + '" fill-opacity=".75" stroke="none"/><circle cx="31.500" cy="34" r="3" fill="' + PAPER + '" fill-opacity=".6" stroke="none"/><circle cx="40.500" cy="34" r="3" fill="' + PAPER + '" fill-opacity=".6" stroke="none"/>' +
      '<path d="M31 22l10 10M41 22L31 32" stroke-width="1.200"/><path d="M30 21.500l-1.500 1.500M42 21.500l1.500 1.500" stroke="' + GOLD + '" stroke-width="1.600"/>';
    return wrap('0 0 72 44', body, 'ic-battle');
  };

  window.ATLAS_ICONS = ICONS;
  window.atlasIcon = (name, cls) => (ICONS[name] || ICONS.site).replace('class="ic', 'class="ic' + (cls ? ' ' + cls : ''));
})();
