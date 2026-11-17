/*
 * Click a place's drawing and its popup fills in with a photo and a short description from Wikipedia
 * (CC BY-SA), looked up live. Popups carry a <div class="wk-slot" data-n data-h> placeholder; this file
 * fills it when the popup opens. Works offline gracefully (shows a note instead).
 */
(function () {
  'use strict';
  const A = window.ATLAS_APP;
  if (!A) return;
  const { map, hi, escapeHtml } = A;

  // article titles where the plain place name would miss or hit the wrong page
  const OVERRIDE = {
    'Chittorgarh': 'Chittorgarh Fort', 'Gwalior': 'Gwalior Fort', 'Kalinjar': 'Kalinjar Fort', 'Daulatabad': 'Daulatabad Fort', 'Golconda': 'Golconda Fort', 'Raigad': 'Raigad Fort',
    'Kangra': 'Kangra Fort', 'Ranthambore': 'Ranthambore Fort', 'Jaisalmer': 'Jaisalmer Fort', 'Gingee': 'Gingee Fort', 'Bidar': 'Bidar Fort', 'Bijapur Citadel': 'Bijapur Fort',
    'Asirgarh': 'Asirgarh Fort', 'Rohtasgarh': 'Rohtasgarh Fort', 'Torna': 'Torna Fort', 'Fort William': 'Fort William, India', 'Fort St George': 'Fort St. George, Chennai',
    'Brihadisvara': 'Brihadisvara Temple, Thanjavur', 'Khajuraho': 'Khajuraho Group of Monuments', 'Konark': 'Konark Sun Temple', 'Kailasa, Ellora': 'Kailasa temple, Ellora',
    'Meenakshi, Madurai': 'Meenakshi Temple', 'Somnath': 'Somnath temple', 'Jagannath, Puri': 'Jagannath Temple, Puri', 'Virupaksha, Hampi': 'Virupaksha Temple, Hampi',
    'Dilwara': 'Dilwara Temples', 'Belur': 'Chennakeshava Temple, Belur', 'Halebidu': 'Hoysaleswara Temple', 'Badrinath': 'Badrinath Temple', 'Kedarnath': 'Kedarnath Temple',
    'Lingaraja, Bhubaneswar': 'Lingaraja Temple', 'Dwarkadhish': 'Dwarkadhish Temple', 'Deogarh (Dashavatara)': 'Dashavatara Temple, Deogarh', 'Tirupati': 'Tirumala Venkateswara Temple',
    'Rameswaram': 'Ramanathaswamy Temple', 'Sanchi': 'Sanchi Stupa', 'Bodh Gaya': 'Mahabodhi Temple', 'Amaravati': 'Amaravati Stupa', 'Ajanta': 'Ajanta Caves',
    'Taxila Dharmarajika': 'Dharmarajika Stupa', 'Jama Masjid, Delhi': 'Jama Masjid, Delhi', 'Atala Masjid, Jaunpur': 'Atala Mosque', 'Sher Shah Suri Tomb': 'Tomb of Sher Shah Suri',
    'Sopara': 'Nala Sopara', 'Kaveripattinam': 'Poompuhar', 'Tranquebar': 'Tharangambadi', 'Diu': 'Diu, India', 'Daman': 'Daman, India', 'Bombay Harbour': 'Mumbai Port',
    'Calcutta Ghats': 'Port of Kolkata', 'Anuradhapura Port (Mantai)': 'Mantai', 'Chandni Chowk, Delhi': 'Chandni Chowk', 'Pune (Peth)': 'Pune', 'Burrabazar, Calcutta': 'Burrabazar',
    'Bombay Bazaar': 'Mumbai', 'Black Town, Madras': 'Chennai', 'Hampi Bazaar': 'Hampi', 'Pushkar fair': 'Pushkar Camel Fair', 'Barygaza (Bharuch)': 'Bharuch', 'Khambhat (Cambay)': 'Khambhat',
    'Shahjahanabad (Delhi)': 'Old Delhi', 'Delhi (Lal Kot / Mehrauli)': 'Qila Rai Pithora', 'Hampi (Vijayanagara)': 'Hampi', 'Hampi': 'Hampi', 'Narmada frontier': 'Narmada River',
    'Himalaya': 'Himalayas', 'Aravalli': 'Aravalli Range', 'Vindhya': 'Vindhya Range', 'Satpura': 'Satpura Range', 'Sulaiman': 'Sulaiman Mountains', 'Arakan Yoma': 'Arakan Mountains',
    'Dandakaranya': 'Dandakaranya', 'Gondwana forests': 'Gondwana region', 'Malabar forests': 'Western Ghats', 'Assam jungle': 'Assam', 'Odisha forests': 'Odisha', 'Gir': 'Gir National Park',
    'Gangaikonda Cholapuram': 'Gangaikonda Cholapuram', 'Delhi (Red Fort)': 'Red Fort', 'Pataliputra': 'Pataliputra', 'Madras (Fort St George)': 'Fort St. George, Chennai'
  };
  const cache = new Map();
  const get = async (url) => { const r = await fetch(url, { headers: { Accept: 'application/json' } }); if (!r.ok) throw new Error(r.status); return r.json(); };

  async function summary(lang, title) {
    const j = await get('https://' + lang + '.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(title.replace(/ /g, '_')) + '?redirect=true');
    if (j.type === 'disambiguation' || !j.extract || j.extract.length < 40) throw new Error('weak');
    return j;
  }
  async function viaSearch(lang, q) {
    const j = await get('https://' + lang + '.wikipedia.org/w/api.php?action=query&list=search&srsearch=' + encodeURIComponent(q) + '&srlimit=1&format=json&origin=*');
    const hit = j.query && j.query.search && j.query.search[0];
    if (!hit) throw new Error('none');
    return summary(lang, hit.title);
  }
  function candidates(name) {
    const out = [], base = name.replace(/\s*\([^)]*\)\s*/g, ' ').replace(/ sarai$/i, '').trim(), inner = (/\(([^)]+)\)/.exec(name) || [])[1];
    if (OVERRIDE[name]) out.push(OVERRIDE[name]);
    out.push(base); if (inner && inner.indexOf('/') < 0) out.push(inner);
    return out.filter((v, i, a) => v && a.indexOf(v) === i);
  }
  async function lookup(name, nameHi, wantHi) {
    const key = (wantHi ? 'h:' : 'e:') + name;
    if (cache.has(key)) return cache.get(key);
    const p = (async () => {
      const tries = [];
      if (wantHi && nameHi) tries.push(['hi', nameHi.replace(/\s*\([^)]*\)\s*/g, ' ').trim()]);
      candidates(name).forEach((c) => tries.push(['en', c]));
      for (const [lang, t] of tries) { try { return await summary(lang, t); } catch (_) { /* next */ } }
      try { return await viaSearch(wantHi ? 'hi' : 'en', (wantHi && nameHi ? nameHi : name) + ' India'); } catch (_) { /* give up */ }
      throw new Error('not found');
    })();
    cache.set(key, p);
    p.catch(() => cache.delete(key));
    return p;
  }

  // an event: its own article first (curated title, then a search on the event's name); only then the place
  async function lookupEvent(w, et, ht, wantHi, n, nHi) {
    const key = 'ev:' + (wantHi ? 'h:' : 'e:') + et;
    if (cache.has(key)) return cache.get(key);
    const p = (async () => {
      if (wantHi && ht) { try { return await viaSearch('hi', ht); } catch (_) { /* fall through to English */ } }
      if (w) { try { return await summary('en', w); } catch (_) { /* fall through */ } }
      try { return await viaSearch('en', et + ' India'); } catch (_) { /* fall through */ }
      return lookup(n, nHi, wantHi);
    })();
    cache.set(key, p);
    p.catch(() => cache.delete(key));
    return p;
  }

  const T = {
    en: { loading: 'Loading details…', more: 'Read more on Wikipedia', fail: 'No further details available right now.', credit: 'Text and image: Wikipedia, CC BY-SA' },
    hi: { loading: 'विवरण लोड हो रहा है…', more: 'विकिपीडिया पर और पढ़ें', fail: 'अभी और विवरण उपलब्ध नहीं है।', credit: 'पाठ व चित्र: विकिपीडिया, CC BY-SA' }
  };
  function clip(t, n) { if (t.length <= n) return t; const c = t.slice(0, n), i = Math.max(c.lastIndexOf('. '), c.lastIndexOf('। ')); return (i > 120 ? c.slice(0, i + 1) : c.replace(/\s+\S*$/, '') + '…'); }

  // relayout(popup) would rebuild the popup from its original HTML and wipe the filled slot, so only re-measure
  const relayout = (popup) => { try { popup._updateLayout(); popup._updatePosition(); popup._adjustPan(); } catch (_) { /* older/newer Leaflet: fine */ } };
  async function fill(slot, popup) {
    if (slot.dataset.done) return;
    slot.dataset.done = '1';
    const L2 = T[hi() ? 'hi' : 'en'];
    slot.innerHTML = '<div class="wk-load">' + L2.loading + '</div>';
    try {
      const d = slot.dataset;
      const j = d.et ? await lookupEvent(d.w, d.et, d.ht, hi(), d.n, d.h) : await lookup(d.n, d.h, hi());
      const img = j.thumbnail && j.thumbnail.source ? '<img src="' + escapeHtml(j.thumbnail.source) + '" alt="' + escapeHtml(j.title) + '" loading="lazy" referrerpolicy="no-referrer">' : '';
      const url = j.content_urls && j.content_urls.desktop && j.content_urls.desktop.page;
      slot.innerHTML = '<div class="wk"><div class="wk-t">' + escapeHtml(j.title) + '</div>' + img + '<p>' + escapeHtml(clip(j.extract, 380)) + '</p>' +
        (url ? '<a href="' + escapeHtml(url) + '" target="_blank" rel="noopener noreferrer">' + L2.more + ' ↗</a>' : '') + '<small>' + L2.credit + '</small></div>';
      const im = slot.querySelector('img');
      if (im) { im.addEventListener('load', () => relayout(popup)); im.addEventListener('error', () => { im.remove(); relayout(popup); }); }
    } catch (_) {
      slot.innerHTML = '<div class="wk-load">' + L2.fail + '</div>';
    }
    relayout(popup);
  }
  map.on('popupopen', (ev) => {
    const el = ev.popup.getElement(), slot = el && el.querySelector('.wk-slot');
    if (slot) fill(slot, ev.popup);
  });
})();
