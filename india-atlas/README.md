# Atlas of India (Bharat Itihaas)

**Live: <https://kaulvishesh.github.io/bharat-itihaas/>** · source: <https://github.com/kaulvishesh/bharat-itihaas>

An interactive historical map of India, inspired by [jiangshan-map](https://github.com/DeanChensj/jiangshan-map).
A fresh, lightweight codebase (Leaflet + vanilla JS, no build step) — not a patched copy of the China app.

**Features**
- **19 eras** (500 BCE → today) with real simplified boundaries, a ghost outline of the previous era, and a proportional time rail.
- **Trace a place** (📍): click anywhere to see which realm covered that spot in every era, plus the events that happened near it — computed by point-in-polygon against the boundaries.
- **Person chronicles** (👤): Buddha, Ashoka, Xuanzang, Adi Shankara, Guru Nanak, Akbar, Shivaji and Gandhi, with animated routes, English/Hindi bios and a **compare** view (lifespans and overlap).
- **Opening title sequence** — the subcontinent is inked onto the page, trade roads light up, the numbers count up (once per session; `?intro=0` skips, `?intro=1` forces, click the भारत seal to replay).
- **Cinematic Journeys** (✦ in the header): five directed stories — *The Emperor Who Wept*, *Eyes on India*, *The Tamil Sea Empire*, *Sultans, Shahs & Emperors*, *The Road to Independence* — where each scene is a cinematic cut and slow push-in (never a fly-over, so realms are always fully drawn), the era changes underneath, the year rolls like a counter and a lower-third caption narrates. Key moments carry **illustrated landmarks** drawn on the map (the Bodhi tree with the seated Buddha and the Mahabodhi temple, Nalanda's brick monasteries, Ashoka's lion pillar, the Brihadisvara vimana, the Qutb Minar, the Taj Mahal, the Red Fort), which also appear as engraved plates in those events' popups. **Narration** (🔊) plays pre-rendered neural speech (Kokoro-82M) in English and the best voice installed on the device for Hindi. Pause to take the map in your own hands; ← → Space Esc work. Link straight to one with `#journey=maurya`.
- **Then & Now** (under Layers): drag a curtain across the map — the era on parchment on one side, today's satellite imagery with modern borders and cities on the other.
- **Full guided tour** (all 93 steps, from the Journeys menu), with optional **voice narration** (browser speech synthesis).
- **Animated journeys** (`js/routes.js`), **rivers** (`js/rivers.js`) and **roads, canals and dams that appear in their own period** (`js/works.js`: Uttarapatha, Grand Trunk Road, Western Yamuna Canal, Kallanai, Bhakra…).
- **Search** (press `/`), relief/satellite/modern basemaps, a "locate it on the map" quiz, shareable links, full English/Hindi UI.
- **Territory chart** (📊, under ⋯): size of the largest mapped realm in every era (rough estimates), and **download any era as SVG** (⬇ in the info panel).
- **Installable and offline-capable** (PWA: the app shell and Leaflet are cached; map tiles still need a network). Respects `prefers-reduced-motion`.
- **Click a kingdom** for a realm card (notes, rough extent, places and events inside, neighbours, the same realm in other eras). **Zoom in** and the map fills with drawn forts, market towns, temples, stupas, mosques, harbours, mountain chains and forests.
- One hand-drawn pictogram set (`js/icons.js`) is used everywhere, including the travellers (rider, pilgrim, ship, lorry) that walk the routes.
- **Static topic pages** (`topics/`, English + Hindi, with inline SVG maps), `sitemap.xml` and `robots.txt` for search engines.
- **For developers:** `window.atlasAPI`, iframe embed (`?embed=1`) with `postMessage`, a zero-dependency **MCP server**, **GeoJSON/JSON export**, a **Python CLI** (`skills/atlas_cli.py`, includes SVG rendering), and Docker — see `docs/API.md`.

## Deploy to GitHub Pages
The site is fully static (relative paths, no build step), so it works from a GitHub Pages sub-path.
1. In the folder that contains `india-atlas/` and `scripts/`: `git init`, commit, and push to a new GitHub repository (branch `main`).
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. The included workflow `.github/workflows/pages.yml` validates the data, rebuilds the topic pages and sitemap with your real URL, and publishes `india-atlas/` to `https://<user>.github.io/<repo>/`.
Notes: the large `upstream/` and `raw-data/` folders are git-ignored; map tiles come from Esri (check their terms for your traffic); the fonts are self-hosted, so no visitor data goes to Google.

## Look and feel
The visual system follows the design language of the original jiangshan-map (GPL-3.0): a warm parchment palette with a vermilion accent, serif body text with a sans-serif UI (Noto Serif / Noto Sans with Devanagari companions), a calligraphic seal mark (Amita) in the header, pill controls, hairline borders, a docked side panel with event cards, a floating legend card with era-progress dots, a sepia-toned relief basemap with an aged-paper vignette, muted watercolour-style realm fills, and a banded timeline coloured by each era's largest realm. Fonts load from Google Fonts.

## Run
```
python -m http.server 8011
```
from this folder, then open http://localhost:8011 (needs internet for Leaflet and map tiles).

Docker (untested here): `docker compose up -d --build`, then open http://localhost:8009.

## Data
- Boundaries: [aourednik/historical-basemaps](https://github.com/aourednik/historical-basemaps) (GPL-3.0), snapshot years
  500 BCE … 2010, filtered to South Asia and simplified by `../scripts/build_geo.py` into `js/geo.js`.
  Each era names the snapshot it uses; snapshots are not always the era's exact year.
- Era text, places and events: `js/data.js`. To change which polities appear (names, Hindi names, colours), edit `S` in `scripts/build_geo.py` and re-run:
  `python -I scripts/build_geo.py <raw_dir> india-atlas/js/geo.js` (raw GeoJSON is in `raw-data/hb`).
- The Maratha heartland at 1700 is a hand-drawn sketch (dashed).

## Caveats
- Borders are approximate; the source's names/polygons can be generic ("Hindu kingdoms") — some were relabelled by hand.
- Hindi covers everything: UI, era and realm names, narratives, rulers, places, events and quiz clues (`js/data_hi.js`, aligned by index with `js/data.js` — keep them in sync when adding items). Translations are machine-drafted; a native-speaker review is recommended.
- Basemap tiles come from Esri (World Shaded Relief / Imagery, attribution shown). Check Esri's terms and use a keyed or open tile provider for production traffic.
- Journey paths in `routes.js` are schematic polylines through known waypoints, not surveyed routes.
- Present-day India (the 1960 and 2010 eras) is drawn as India officially depicts itself, including all of Jammu & Kashmir and Ladakh, from Natural Earth's "India point of view" data (`scripts/apply_india_claim.js`). That is an approximation, not the Survey of India's official map; other outlines are as the data sources draw them.
- Licence: GPL-3.0 (see LICENSE), because it ships GPL-3.0-derived data.

## Build tools (all optional; outputs are already committed to the folder)
```
node scripts/export_geojson.js      # geojson/ (one file per era)
node scripts/export_data.js         # data/atlas.json (for the Python CLI)
node scripts/build_topics.js --base https://YOUR-HOST/atlas/   # topics/, sitemap.xml, robots.txt
node scripts/test_mcp.js            # MCP smoke test
node scripts/validate.js            # data integrity checks (Hindi coverage, coordinates, sorting, ...)
NARRATION_MODULES=/path/to/tools node scripts/make_narration.js   # re-render the Journeys' English narration clips (audio/); see the header of that file
python -I scripts/build_geo.py <raw_dir> india-atlas/js/geo.js   # rebuild boundaries from the raw GeoJSON
python india-atlas/skills/atlas_cli.py render 4 -o gupta.svg
```
After editing `js/data.js`, run `validate.js`, then the first three so the static outputs stay in sync. If you edit a Journey caption (`js/journeys_data.js`) re-run `make_narration.js`; until then that caption falls back to the browser voice. When you change any JS/CSS, bump the `?v=` number in `index.html` **and** `sw.js` together so the service worker refreshes.
