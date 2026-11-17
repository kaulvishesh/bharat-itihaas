/*
 * Illustrated landmarks for the atlas' great moments: the Bodhi tree with the seated Buddha and the Mahabodhi
 * temple, Nalanda's brick monasteries, Ashoka's lion pillar, the Brihadisvara vimana, the Qutb Minar, the Taj Mahal,
 * the Red Fort, a Lankan dagoba. Same hand-drawn house style as icons.js (warm ink outline, parchment / sandstone
 * fills, accents of gold and crimson). Used as engraved "plates" in event popups and drawn large on the map during
 * a Journey. Art is built lazily, the first time it is asked for.
 */
(function () {
  'use strict';
  const INK = '#2b2640', PAPER = '#f4ebcf', STONE = '#dccb9c', STONE2 = '#cdbb8c', GOLD = '#c1932f', CRIM = '#a3302a', LAPIS = '#34528c', WHITE = '#fbf4e0';
  const LEAF = '#86a874', LEAFD = '#6b8f5e', LEAFL = '#a9c493', BARK = '#8c6c4c', ROBE = '#d9822b', ROBED = '#a85f17', SKIN = '#e3b98a', HAIR = '#3b2f4a';
  const BRICK = '#c47b56', BRICKD = '#8f4f33', SAND = '#b5603d';
  const f1 = (n) => (+n).toFixed(1);
  const svg = (vb, body) => '<svg class="lm-svg" viewBox="' + vb + '" preserveAspectRatio="xMidYMax meet" aria-hidden="true"><g fill="none" stroke="' + INK + '" stroke-width="1.1" stroke-linejoin="round" stroke-linecap="round">' + body + '</g></svg>';
  const ground = (cx, cy, rx) => '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + f1(rx * 0.085) + '" fill="' + INK + '" fill-opacity=".22" stroke="none"/>';
  const arch = (x, y, w, h, fill, op) => '<path d="M' + x + ' ' + y + ' v-' + (h - w / 2) + ' a' + (w / 2) + ' ' + (w / 2) + ' 0 0 1 ' + w + ' 0 v' + (h - w / 2) + 'z" fill="' + (fill || INK) + '"' + (op ? ' fill-opacity="' + op + '"' : '') + ' stroke="none"/>';
  const star = (x, y, s) => '<path class="lm-tw" transform="translate(' + x + ' ' + y + ') scale(' + (s || 1) + ')" d="M0-4 L1 -1 L4 0 L1 1 L0 4 L-1 1 L-4 0 L-1 -1Z" fill="' + GOLD + '" stroke="none"/>';
  const hline = (x1, x2, y, c, w, o) => '<path d="M' + x1 + ' ' + y + 'H' + x2 + '" stroke="' + (c || INK) + '" stroke-width="' + (w || 0.6) + '"' + (o ? ' opacity="' + o + '"' : '') + '/>';

  // ----------------------------------------------------------------- Bodh Gaya: Bodhi tree, seated Buddha, Mahabodhi temple
  function bodhi() {
    let s = ground(105, 151, 96);
    s += '<circle cx="108" cy="112" r="44" fill="#f6d87a" fill-opacity=".3" stroke="none"/>';
    // Mahabodhi temple: tapering tower of tiers and niches, four small corner spires
    s += '<path d="M2 151 L6 128 L9 112 L12 128 L16 151Z" fill="' + STONE2 + '"/><path d="M56 151 L60 128 L63 112 L66 128 L70 151Z" fill="' + STONE2 + '"/>';
    s += '<path d="M14 151 L33 16 L36 6 L39 16 L58 151Z" fill="' + STONE + '"/>';
    const lx = (y) => 33 - (y - 16) * (19 / 135), rx = (y) => 39 + (y - 16) * (19 / 135);
    [130, 108, 88, 68, 50, 34].forEach((y) => { s += hline(f1(lx(y)), f1(rx(y)), y); });
    [[140, 4], [118, 3], [98, 3], [78, 3], [58, 2], [42, 2]].forEach(([y, n]) => {
      const a = lx(y) + 4, b = rx(y) - 4;
      for (let k = 0; k < n; k++) s += arch(f1(a + (n === 1 ? 0 : (b - a - 4) * k / (n - 1))), y, 4, 7, INK, 0.72);
    });
    s += '<ellipse cx="36" cy="14" rx="6" ry="3.2" fill="' + GOLD + '"/><path d="M36 11 V3"/><circle cx="36" cy="2.6" r="1.9" fill="' + GOLD + '"/>';
    s += arch(30, 151, 12, 14, INK, 0.78);
    // the Bodhi (pipal) tree: buttressed trunk, a canopy of leaf clusters, heart-shaped drip-tip leaves
    s += '<path d="M126 151 C134 143 136 132 136 120 C136 104 137 88 140 70 L160 70 C163 88 163 104 163 120 C163 132 166 143 176 151 Z" fill="' + BARK + '"/>';
    s += '<path d="M144 78 C143 96 144 112 143 130 M152 74 C153 94 152 112 153 132 M158 82 C158 100 159 116 158 134 M132 146 C138 142 141 138 142 132 M170 146 C165 142 162 138 161 132" stroke="#5a4330" stroke-width=".9"/>';
    const blobs = [[84, 58, 14], [96, 44, 20], [116, 28, 22], [140, 22, 24], [164, 28, 22], [184, 42, 18], [192, 60, 12], [104, 62, 16], [128, 50, 22], [154, 52, 22], [176, 64, 15], [142, 70, 14], [116, 72, 10]];
    blobs.forEach(([x, y, r]) => { s += '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + LEAF + '"/>'; });
    blobs.forEach(([x, y, r]) => { s += '<circle cx="' + (x + r * 0.28) + '" cy="' + (y + r * 0.34) + '" r="' + f1(r * 0.5) + '" fill="' + LEAFD + '" fill-opacity=".5" stroke="none"/><circle cx="' + (x - r * 0.3) + '" cy="' + (y - r * 0.34) + '" r="' + f1(r * 0.5) + '" fill="' + LEAFL + '" fill-opacity=".85" stroke="none"/>'; });
    const heart = (x, y, k, r) => '<path transform="translate(' + x + ' ' + y + ') rotate(' + r + ') scale(' + k + ')" d="M0 -3 C-2 -6 -7 -3 -4 1 C-3 3 -1 5 0 10 C1 5 3 3 4 1 C7 -3 2 -6 0 -3Z" fill="' + LEAFL + '" stroke-width=".7"/>';
    [[80, 70, 0.9, 12], [92, 78, 0.9, -8], [104, 84, 0.8, 8], [118, 86, 0.9, -6], [130, 82, 0.8, 10], [150, 86, 0.8, 6], [168, 82, 0.9, -8], [184, 76, 0.8, 10], [76, 60, 0.8, 16], [196, 70, 0.7, -10]].forEach((h) => { s += heart(...h); });
    // the Buddha, seated in meditation on the vajrasana: halo, saffron robe, folded legs, hands in his lap
    let rays = '';
    for (let k = 0; k < 14; k++) { const a = k * Math.PI * 2 / 14; rays += 'M' + f1(108 + Math.cos(a) * 19.5) + ' ' + f1(89 + Math.sin(a) * 19.5) + 'L' + f1(108 + Math.cos(a) * 25) + ' ' + f1(89 + Math.sin(a) * 25); }
    s += '<path d="' + rays + '" stroke="' + GOLD + '" stroke-width="1"/><circle cx="108" cy="89" r="16" fill="#fff0b8" fill-opacity=".7" stroke="' + GOLD + '" stroke-width="1.8"/>';
    s += '<path d="M80 151 L84 138 H132 L136 151Z" fill="' + STONE + '"/><path d="M86 143 H130" stroke-width=".6"/>';
    s += '<path d="M84 138 C82 127 94 121 108 121 C122 121 134 127 132 138Z" fill="' + ROBE + '"/><path d="M90 135 C100 129 116 129 126 135" stroke="' + ROBED + '" stroke-width=".9"/>';
    s += '<path d="M94 125 C93 109 98 99 108 99 C118 99 123 109 122 125Z" fill="' + ROBE + '"/><path d="M100 105 C104 113 108 120 112 125 M115 103 C113 111 111 118 109 125" stroke="' + ROBED + '" stroke-width=".8"/>';
    s += '<path d="M96 119 C93 125 98 128 106 126 M120 119 C123 125 118 128 110 126" fill="none"/><ellipse cx="108" cy="125" rx="9" ry="3.6" fill="' + SKIN + '"/>';
    s += '<circle cx="108" cy="90" r="8.5" fill="' + SKIN + '"/><path d="M99.6 89 C99 80 104 77 108 77 C112 77 117 80 116.4 89 C113 85 103 85 99.6 89Z" fill="' + HAIR + '"/><circle cx="108" cy="75.6" r="3.2" fill="' + HAIR + '"/>';
    s += '<path d="M104.5 91.4 q1.7 1.4 3.4 0 M109 91.4 q1.7 1.4 3.4 0 M106.6 95.4 q1.4 1 2.8 0 M99.6 90 q-2 3 0 6 M116.4 90 q2 3 0 6" stroke-width=".8"/>';
    s += star(76, 100, 1.1) + star(140, 104, 1.3) + star(92, 64, 0.9) + star(126, 70, 1) + star(60, 80, 0.8);
    return s;
  }

  // ----------------------------------------------------------------- Nalanda: terraced brick stupa and monastery blocks, scholar-monks
  function nalanda(fire) {
    let s = ground(105, 151, 100);
    const courses = (x1, x2, y1, y2) => { let c = ''; for (let y = y1 + 5; y < y2; y += 5) c += hline(x1, x2, y, BRICKD, 0.5, 0.55); return c; };
    const vihara = (x, w) => { // a two-storey monastery block: cells with arched doorways, parapet
      let b = '<rect x="' + x + '" y="98" width="' + w + '" height="53" fill="' + BRICK + '"/>' + courses(x, x + w, 98, 151) + hline(x, x + w, 124, INK, 0.9);
      for (let m = x; m < x + w - 3; m += 7) b += '<rect x="' + m + '" y="93" width="4" height="5" fill="' + BRICK + '"/>';
      const n = Math.floor((w - 6) / 12);
      for (let k = 0; k < n; k++) { const ax = x + 5 + k * 12; b += arch(ax, 151, 8, 17, INK, 0.8) + '<rect x="' + (ax + 1.5) + '" y="104" width="5" height="9" fill="' + INK + '" fill-opacity=".6" stroke="none"/>'; }
      return b;
    };
    s += vihara(3, 48) + vihara(159, 48);
    // the great stupa: three brick terraces with stairs and niches, a small shrine and a pennant above
    s += '<path d="M50 151 H160 L151 118 H59Z" fill="' + BRICK + '"/><path d="M66 118 H144 L137 92 H73Z" fill="' + BRICK + '"/><path d="M78 92 H132 L126 70 H84Z" fill="' + BRICK + '"/>';
    s += courses(59, 151, 118, 151) + courses(73, 137, 92, 118) + courses(84, 126, 70, 92);
    s += '<path d="M92 151 H118 L114 118 H96Z" fill="' + STONE + '"/>';
    for (let y = 124; y < 150; y += 5) s += hline(f1(97 - (y - 118) * 0.1), f1(113 + (y - 118) * 0.1), y, INK, 0.6);
    [67, 78, 132, 143].forEach((x) => { s += arch(x, 143, 6, 12, INK, 0.7); });
    [80, 91, 114, 125].forEach((x) => { s += arch(x, 114, 5, 10, INK, 0.7); });
    s += '<rect x="94" y="46" width="22" height="24" fill="' + STONE + '"/>' + arch(101, 70, 8, 16, INK, 0.8) + '<path d="M90 48 L105 30 L120 48Z" fill="' + BRICKD + '"/><path d="M105 30 V17"/><path d="M105 17 L114 20 L105 23Z" fill="' + CRIM + '"/><circle cx="105" cy="30" r="1.8" fill="' + GOLD + '"/>';
    const monk = (x, y) => '<path d="M' + (x - 6) + ' ' + y + ' L' + (x - 4) + ' ' + (y - 17) + ' Q' + x + ' ' + (y - 21) + ' ' + (x + 4) + ' ' + (y - 17) + ' L' + (x + 6) + ' ' + y + 'Z" fill="' + ROBE + '"/><circle cx="' + x + '" cy="' + (y - 23) + '" r="4" fill="' + SKIN + '"/><path d="M' + (x + 4) + ' ' + (y - 14) + ' l9 -3 v5 l-9 3z" fill="' + PAPER + '"/><path d="M' + (x + 6) + ' ' + (y - 13.5) + ' l6 -2" stroke-width=".5"/>';
    s += monk(38, 158) + monk(176, 158);
    if (fire) { // Nalanda sacked: flames and smoke
      const flame = (x, y, k) => '<path transform="translate(' + x + ' ' + y + ') scale(' + k + ')" d="M0 0 C-7 -4 -5 -13 0 -20 C1 -13 7 -11 7 -4 C7 -1 4 0 0 0Z" fill="' + CRIM + '"/><path transform="translate(' + x + ' ' + y + ') scale(' + k * 0.55 + ')" d="M0 0 C-7 -4 -5 -13 0 -20 C1 -13 7 -11 7 -4 C7 -1 4 0 0 0Z" fill="#f0b43c" stroke="none"/>';
      [[20, 98, 1.2], [38, 98, 1], [175, 98, 1.2], [192, 98, 1], [105, 46, 1.3], [88, 72, 1], [122, 72, 1]].forEach(([x, y, k]) => { s += flame(x, y, k); });
      [[30, 66, 9], [26, 48, 12], [185, 66, 9], [190, 46, 12], [108, 24, 10], [112, 8, 13]].forEach(([x, y, r]) => { s += '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="#6b6477" fill-opacity=".5" stroke="none"/>'; });
    }
    return s;
  }

  // ----------------------------------------------------------------- Ashoka's pillar with the lion capital (Sarnath)
  function pillar() {
    let s = ground(60, 173, 38);
    s += '<rect x="36" y="160" width="48" height="13" fill="' + STONE2 + '"/><rect x="43" y="152" width="34" height="8" fill="' + STONE + '"/>';
    s += '<path d="M52 152 L54 68 H66 L68 152Z" fill="' + STONE + '"/><path d="M57 150 L58 70" stroke-width=".6" opacity=".6"/>';
    s += '<path d="M54 68 C47 64 43 60 43 55 H77 C77 60 73 64 66 68Z" fill="' + STONE + '"/><path d="M48 57 q3 7 6 11 M56 57 q1 6 2 11 M64 57 q-1 6 -2 11 M72 57 q-3 7 -6 11" stroke-width=".8"/>';
    s += '<rect x="40" y="44" width="40" height="11" rx="2" fill="' + PAPER + '"/><circle cx="60" cy="49.5" r="4.2" fill="none" stroke="' + LAPIS + '" stroke-width="1"/>';
    let sp = ''; for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; sp += 'M60 49.5L' + f1(60 + Math.cos(a) * 4.2) + ' ' + f1(49.5 + Math.sin(a) * 4.2); }
    s += '<path d="' + sp + '" stroke="' + LAPIS + '" stroke-width=".6"/><path d="M46 51 q2 -3 4 0 M70 51 q2 -3 4 0" stroke-width=".8"/>';
    // lions: two seen at an angle, the third facing out with a scalloped mane
    s += '<path d="M33 44 V33 C33 27 38 24 44 25 L51 28 V44Z" fill="' + STONE + '"/><circle cx="39" cy="24" r="8" fill="' + STONE2 + '"/><path d="M87 44 V33 C87 27 82 24 76 25 L69 28 V44Z" fill="' + STONE + '"/><circle cx="81" cy="24" r="8" fill="' + STONE2 + '"/>';
    s += '<path d="M48 44 V32 C48 25 53 22 60 22 C67 22 72 25 72 32 V44Z" fill="' + STONE + '"/>';
    let mane = ''; for (let k = 0; k < 14; k++) { const a = k * Math.PI * 2 / 14; mane += '<circle cx="' + f1(60 + Math.cos(a) * 11) + '" cy="' + f1(20 + Math.sin(a) * 11) + '" r="3.6" fill="#e6cf8a"/>'; }
    s += mane + '<circle cx="60" cy="20" r="10" fill="#e6cf8a"/><circle cx="60" cy="21" r="6.8" fill="' + STONE + '"/>';
    s += '<circle cx="57.3" cy="19.4" r=".9" fill="' + INK + '" stroke="none"/><circle cx="62.7" cy="19.4" r=".9" fill="' + INK + '" stroke="none"/><path d="M58.4 22.4 h3.2 l-1.6 2 z M60 24.4 v1.6 M57.4 26.3 q2.6 1.4 5.2 0" stroke-width=".7" fill="' + INK + '"/><path d="M53 22.5 l-4 -1 M53 24 l-4 1 M67 22.5 l4 -1 M67 24 l4 1" stroke-width=".5"/>';
    s += '<circle cx="53" cy="13.8" r="2.4" fill="' + STONE + '"/><circle cx="67" cy="13.8" r="2.4" fill="' + STONE + '"/>';
    return s;
  }

  // ----------------------------------------------------------------- Brihadisvara vimana: thirteen tiers, domed cap, golden finial
  function vimana() {
    let s = ground(105, 163, 96) + '<rect x="40" y="150" width="130" height="12" fill="' + STONE2 + '"/>';
    // small gopuram at the entrance (left)
    for (let i = 0; i < 5; i++) { const w = 34 - i * 5, y = 148 - i * 12, x = 22 - w / 2; s += '<rect x="' + f1(x) + '" y="' + y + '" width="' + w + '" height="12" fill="' + (i % 2 ? STONE : STONE2) + '"/>' + arch(f1(x + w / 2 - 2), y + 12, 4, 7, INK, 0.5); }
    s += '<path d="M22 88 V80 M22 80 l-3 3 h6z" stroke="' + GOLD + '"/>';
    // the main tower
    for (let i = 0; i < 13; i++) {
      const w = 78 - i * 3.9, y = 143 - i * 7, x = 105 - w / 2;
      s += '<rect x="' + f1(x) + '" y="' + y + '" width="' + f1(w) + '" height="7.4" fill="' + (i % 2 ? STONE : STONE2) + '"/>';
      for (let k = x + 3; k < x + w - 5; k += 8) s += '<rect x="' + f1(k) + '" y="' + (y + 1.2) + '" width="4.4" height="3.4" fill="' + GOLD + '" fill-opacity=".55" stroke-width=".5"/>';
    }
    s += '<path d="M72 150 V132 H138 V150Z" fill="' + STONE + '"/>';
    for (let k = 78; k < 136; k += 8) s += '<path d="M' + k + ' 132 V150" stroke-width=".6"/>';
    s += arch(98, 150, 14, 18, INK, 0.78);
    s += '<ellipse cx="105" cy="46" rx="17" ry="10" fill="' + STONE + '"/><path d="M96 41 q9 -6 18 0" stroke-width=".7"/><path d="M105 36 V25"/><ellipse cx="105" cy="31" rx="3.6" ry="2.4" fill="' + GOLD + '"/><path d="M105 25 L102 31 H108Z" fill="' + GOLD + '"/><circle cx="105" cy="22" r="1.7" fill="' + GOLD + '"/>';
    // Nandi, the bull, keeping watch
    s += '<path d="M168 150 V143 C168 139 174 138 180 139 L188 139 C192 139 194 143 193 150Z" fill="' + STONE + '"/><circle cx="190" cy="136" r="3.4" fill="' + STONE + '"/>';
    return s;
  }

  // ----------------------------------------------------------------- Qutb Minar: five tapering storeys, balconies, flutes
  function qutb() {
    let s = ground(60, 183, 40) + '<rect x="34" y="172" width="52" height="10" fill="' + STONE2 + '"/>';
    const st = [[172, 126, 36, 31, SAND], [126, 90, 31, 27, SAND], [90, 64, 27, 23, SAND], [64, 48, 23, 20, '#e7d3a6'], [48, 36, 20, 17, '#efe2c0']];
    st.forEach(([y1, y2, w1, w2, fill], i) => {
      s += '<path d="M' + f1(60 - w1 / 2) + ' ' + y1 + ' L' + f1(60 - w2 / 2) + ' ' + y2 + ' H' + f1(60 + w2 / 2) + ' L' + f1(60 + w1 / 2) + ' ' + y1 + 'Z" fill="' + fill + '"/>';
      const n = i < 3 ? 7 : 5;
      for (let k = 1; k < n; k++) { const t = k / n; s += '<path d="M' + f1(60 - w1 / 2 + w1 * t) + ' ' + y1 + ' L' + f1(60 - w2 / 2 + w2 * t) + ' ' + y2 + '" stroke="#7a3b22" stroke-width=".5" opacity=".6"/>'; }
      s += hline(f1(60 - (w1 + w2) / 4 + 1), f1(60 + (w1 + w2) / 4 - 1), f1(y2 + (y1 - y2) * 0.45), '#7a3b22', 0.6, 0.7);
      const bw = w2 + 8; // balcony with brackets
      s += '<rect x="' + f1(60 - bw / 2) + '" y="' + (y2 - 3) + '" width="' + f1(bw) + '" height="3.4" fill="' + STONE2 + '"/>';
      for (let k = 0; k < 5; k++) s += '<path d="M' + f1(60 - bw / 2 + 1 + k * (bw - 2) / 4) + ' ' + (y2 + 0.4) + ' l1.6 3.6 h-3.2z" fill="' + STONE + '" stroke-width=".5"/>';
    });
    s += '<path d="M52 36 a8 7 0 0 1 16 0Z" fill="#efe2c0"/><path d="M60 29 V20"/><circle cx="60" cy="19" r="1.8" fill="' + GOLD + '"/><path d="M52 36 v-3 M68 36 v-3" stroke-width=".8"/>';
    s += arch(55, 182, 10, 11, INK, 0.7);
    return s;
  }

  // ----------------------------------------------------------------- Taj Mahal
  function taj() {
    let s = ground(115, 143, 104);
    s += '<path d="M72 124 H158 V143 H72Z" fill="#9db9d6" fill-opacity=".7"/><path d="M78 128 h74 M82 133 h66 M88 138 h54" stroke="' + LAPIS + '" stroke-width=".6" opacity=".7"/>'; // reflecting pool
    s += '<path d="M56 130 C52 118 54 110 56 104 C58 110 60 118 56 130Z" fill="#5f8a5f"/><path d="M174 130 C170 118 172 110 174 104 C176 110 178 118 174 130Z" fill="#5f8a5f"/>';
    s += '<rect x="26" y="112" width="178" height="10" fill="' + WHITE + '"/><rect x="48" y="122" width="134" height="3" fill="' + STONE + '"/>';
    const minaret = (x) => '<rect x="' + (x - 4.5) + '" y="52" width="9" height="60" fill="' + WHITE + '"/><path d="M' + (x - 4.5) + ' 66 h9 M' + (x - 4.5) + ' 84 h9 M' + (x - 4.5) + ' 100 h9" stroke-width=".7"/><rect x="' + (x - 6.5) + '" y="64" width="13" height="3" fill="' + WHITE + '"/><rect x="' + (x - 6.5) + '" y="82" width="13" height="3" fill="' + WHITE + '"/><path d="M' + (x - 5) + ' 52 a5 5 0 0 1 10 0Z" fill="' + WHITE + '"/><path d="M' + x + ' 47 v-5" /><circle cx="' + x + '" cy="41" r="1.2" fill="' + GOLD + '"/>';
    s += minaret(36) + minaret(194);
    s += '<rect x="56" y="88" width="26" height="24" fill="' + WHITE + '"/><rect x="148" y="88" width="26" height="24" fill="' + WHITE + '"/>';
    s += arch(64, 112, 10, 15, INK, 0.28) + arch(156, 112, 10, 15, INK, 0.28);
    s += '<path d="M82 112 V70 H148 V112Z" fill="' + WHITE + '"/>';
    s += '<path d="M104 112 V80 Q115 60 126 80 V112Z" fill="#cfc6b0"/><path d="M109 112 V86 Q115 74 121 86 V112Z" fill="' + INK + '" fill-opacity=".35" stroke="none"/>';
    [[88, 58], [142, 58], [100, 64], [130, 64]].forEach(([x, y]) => { s += '<rect x="' + (x - 3) + '" y="' + y + '" width="6" height="8" fill="' + WHITE + '"/><path d="M' + (x - 4.5) + ' ' + y + ' a4.5 4.5 0 0 1 9 0Z" fill="' + WHITE + '"/><path d="M' + x + ' ' + (y - 4.4) + ' v-3" stroke-width=".7"/>'; });
    s += '<path d="M92 70 C86 50 98 26 115 26 C132 26 144 50 138 70Z" fill="' + WHITE + '"/><path d="M115 26 C106 40 104 56 106 70 M115 26 C124 40 126 56 124 70 M115 26 C112 42 112 56 112 70 M115 26 C118 42 118 56 118 70" stroke-width=".5" opacity=".6"/>';
    s += '<path d="M115 26 V12"/><circle cx="115" cy="21" r="2" fill="' + GOLD + '"/><circle cx="115" cy="16" r="1.5" fill="' + GOLD + '"/><path d="M115 12 l-2 4 h4z" fill="' + GOLD + '"/>';
    return s;
  }

  // ----------------------------------------------------------------- Red Fort: Lahori Gate, bastions, the national flag
  function redfort() {
    let s = ground(110, 142, 104);
    s += '<rect x="8" y="94" width="204" height="48" fill="' + SAND + '"/>';
    for (let y = 99; y < 142; y += 6) s += hline(8, 212, y, '#7a3b22', 0.5, 0.5);
    for (let x = 8; x < 208; x += 11) s += '<path d="M' + x + ' 94 v-6 h6 v6" fill="' + SAND + '"/>';
    const tower = (x) => '<rect x="' + x + '" y="60" width="22" height="82" fill="' + SAND + '"/><path d="M' + x + ' 76 h22 M' + x + ' 100 h22" stroke="#7a3b22" stroke-width=".8"/><rect x="' + (x + 2) + '" y="54" width="18" height="6" fill="' + WHITE + '"/><path d="M' + (x + 4) + ' 54 v-6 h3 v6 M' + (x + 15) + ' 54 v-6 h3 v6" stroke-width=".8"/><path d="M' + (x + 4) + ' 48 a3 3 0 0 1 6 0Z M' + (x + 12) + ' 48 a3 3 0 0 1 6 0Z" fill="' + WHITE + '"/>' + arch(x + 8, 96, 6, 10, INK, 0.7);
    s += tower(78) + tower(120);
    s += '<rect x="98" y="66" width="22" height="76" fill="' + SAND + '"/><rect x="96" y="60" width="26" height="7" fill="' + WHITE + '"/>';
    [[101, 60], [109, 60], [117, 60]].forEach(([x, y]) => { s += '<path d="M' + (x - 3) + ' ' + y + ' v-6 h6 v6" fill="' + WHITE + '"/><path d="M' + (x - 4) + ' ' + (y - 6) + ' a4 4 0 0 1 8 0Z" fill="' + WHITE + '"/><circle cx="' + x + '" cy="' + (y - 11) + '" r="1" fill="' + GOLD + '" stroke="none"/>'; });
    s += arch(103, 142, 14, 34, INK, 0.82) + '<path d="M103 142 V114 a7 7 0 0 1 14 0 V142" stroke="' + GOLD + '" stroke-width=".8"/>';
    s += '<path d="M109 59 V10" stroke-width="1.2"/><circle cx="109" cy="9" r="1.6" fill="' + GOLD + '"/>';
    s += '<path d="M110 11 C120 8 128 14 138 11 V19 C128 22 120 16 110 19Z" fill="#e8892f"/><path d="M110 19 C120 16 128 22 138 19 V27 C128 30 120 24 110 27Z" fill="#fff"/><path d="M110 27 C120 24 128 30 138 27 V35 C128 38 120 32 110 35Z" fill="#2f7f4a"/><circle cx="124" cy="23.4" r="2.6" fill="none" stroke="' + LAPIS + '" stroke-width=".9"/>';
    s += '<path d="M30 142 C34 132 34 126 32 120 M180 142 C184 132 184 126 182 120" stroke="#5f8a5f" stroke-width="3" opacity=".0"/>';
    return s;
  }

  // ----------------------------------------------------------------- a Lankan dagoba with a Bodhi sapling (Mahinda's mission)
  function dagoba() {
    let s = ground(80, 131, 70);
    s += '<path d="M12 130 H148 V122 H12Z" fill="' + STONE2 + '"/><path d="M22 122 H138 V114 H22Z" fill="' + STONE + '"/><path d="M30 114 H130 V108 H30Z" fill="' + STONE2 + '"/>';
    s += '<path d="M34 108 C34 62 126 62 126 108Z" fill="#f6f1e2"/><path d="M48 98 C56 78 72 70 80 69" stroke-width=".6" opacity=".5"/>';
    s += '<rect x="68" y="52" width="24" height="9" fill="' + PAPER + '"/><path d="M71 52 V42 h18 V52" fill="' + STONE + '"/>';
    for (let i = 0; i < 6; i++) s += '<rect x="' + (72 + i * 0.7) + '" y="' + (40 - i * 4.4) + '" width="' + (16 - i * 1.4) + '" height="4" fill="' + (i % 2 ? STONE : PAPER) + '"/>';
    s += '<path d="M80 14 V6"/><circle cx="80" cy="5" r="1.8" fill="' + GOLD + '"/>';
    for (let x = 36; x < 126; x += 9) s += '<path d="M' + x + ' 108 v-5" stroke-width=".7"/>';
    // the sapling in its railing
    s += '<path d="M10 124 V104" stroke="' + BARK + '" stroke-width="2.2"/><path d="M10 104 C6 98 2 98 1 92 M10 108 C14 102 18 100 20 94" stroke="' + BARK + '" stroke-width="1.2"/>';
    [[2, 90], [-1, 98], [10, 98], [18, 92], [22, 100], [6, 106]].forEach(([x, y]) => { s += '<path transform="translate(' + (x + 4) + ' ' + y + ') scale(.8)" d="M0 -3 C-2 -6 -7 -3 -4 1 C-3 3 -1 5 0 10 C1 5 3 3 4 1 C7 -3 2 -6 0 -3Z" fill="' + LEAFL + '" stroke-width=".7"/>'; });
    s += '<path d="M2 124 V116 M18 124 V116 M2 118 H18" stroke-width=".8"/>';
    return s;
  }

  const ART = {
    bodhi: { vb: '0 0 210 160', w: 250, h: 190, build: bodhi },
    nalanda: { vb: '0 0 210 162', w: 236, h: 182, build: () => nalanda(false) },
    nalanda_fire: { vb: '0 0 210 162', w: 236, h: 182, build: () => nalanda(true) },
    pillar: { vb: '0 0 120 178', w: 112, h: 166, build: pillar },
    vimana: { vb: '0 0 210 168', w: 210, h: 168, build: vimana },
    qutb: { vb: '0 0 120 188', w: 108, h: 170, build: qutb },
    taj: { vb: '0 0 230 148', w: 230, h: 148, build: taj },
    redfort: { vb: '0 0 220 148', w: 220, h: 148, build: redfort },
    dagoba: { vb: '-4 0 168 136', w: 168, h: 136, build: dagoba }
  };
  const BY_EVENT = {
    'Buddha attains enlightenment': 'bodhi',
    'Nalanda mahavihara founded': 'nalanda', 'Xuanzang studies at Nalanda': 'nalanda', 'Nalanda sacked': 'nalanda_fire',
    'Ashokan pillars and the Lion Capital': 'pillar', 'Mahinda takes Buddhism to Sri Lanka': 'dagoba',
    'Brihadisvara Temple completed': 'vimana', 'Gangaikonda Cholapuram founded': 'vimana',
    'Qutb Minar begun': 'qutb', 'Taj Mahal completed': 'taj',
    'Red Fort completed at Shahjahanabad': 'redfort', 'Independence and Partition': 'redfort'
  };
  const cache = {};
  function art(title) {
    const k = BY_EVENT[title], a = k && ART[k]; if (!a) return null;
    return cache[k] || (cache[k] = { key: k, w: a.w, h: a.h, html: svg(a.vb, a.build()) });
  }
  window.ATLAS_LM = {
    art, has: (t) => !!BY_EVENT[t], names: () => Object.keys(ART),
    plate: (title) => { const a = art(title); return a ? '<div class="lm-plate">' + a.html + '</div>' : ''; }
  };
})();
