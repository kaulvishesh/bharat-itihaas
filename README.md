# Bharat Itihaas · भारत इतिहास

<p align="left">
  <strong>English</strong> · <a href="README_HI.md">हिन्दी (Hindi)</a> · <a href="CONTRIBUTING.md">Contributing</a>
</p>

**An Interactive Historical Atlas of India from the Mahajanapadas (500 BCE) to Today — Scrub Through Time, Ride a Cinematic Journey, and Walk in the Footsteps of History**

[**Play Live Demo → https://kaulvishesh.github.io/bharat-itihaas/**](https://kaulvishesh.github.io/bharat-itihaas/) · [हिन्दी में खोलें](https://kaulvishesh.github.io/bharat-itihaas/#lang=hi)

[![Deploy to GitHub Pages](https://github.com/kaulvishesh/bharat-itihaas/actions/workflows/pages.yml/badge.svg)](https://github.com/kaulvishesh/bharat-itihaas/actions/workflows/pages.yml)
[![Checks](https://github.com/kaulvishesh/bharat-itihaas/actions/workflows/ci.yml/badge.svg)](https://github.com/kaulvishesh/bharat-itihaas/actions/workflows/ci.yml)
[![License: GPL v3](https://img.shields.io/badge/license-GPL--3.0-blue.svg)](LICENSE)

> **Credit where it's due:** Bharat Itihaas is inspired by, and its design language is built on, **[Chronicles of the Realm · 江山时序 (jiangshan-map)](https://github.com/DeanChensj/jiangshan-map)** by **[DeanChensj](https://github.com/DeanChensj)**, an interactive historical atlas of China. Go and star the original. See [Acknowledgements](#acknowledgements).

<p align="center">
  <a href="https://kaulvishesh.github.io/bharat-itihaas/">
    <img src="assets/hero.webp" alt="Bharat Itihaas in 25 seconds: the opening title sequence, the Bodh Gaya scene of The Emperor Who Wept with the Bodhi tree, the Buddha and the Mahabodhi temple drawn on the map, and the Then and Now satellite curtain over the Mughal era" width="100%" />
  </a>
</p>

---

## Why It's Fun to Explore

Have you ever wondered while reading about India's past:
- *"Where exactly are Bodh Gaya, Nalanda and Pataliputra — and how far was the Magadhan heartland from Taxila on the Silk Road?"*
- *"What did the Mauryas, the Guptas, the Cholas and the Mughals each actually hold at their height, and who was next door?"*
- *"How did the map change from the sixteen Mahajanapadas, through Ashoka's empire, the Tripartite Struggle, the Chola sea empire, the Delhi Sultanate, Vijayanagara and the Mughals, to the Company, the Raj, Partition and the Republic?"*

**Bharat Itihaas** brings together **2,500 years** of Indian history across **19 eras** into a single interactive engraved-parchment atlas: **simplified historical boundaries** with a ghost outline of the previous era, **75 events**, **121 places**, **animated travellers and armies**, **five cinematic journeys**, **person chronicles**, and **soft ambient music** — everything in **English and Hindi**. No heavy print atlases required: drag the timeline, click any place, or just press play on a journey.

It is a static site (Leaflet and vanilla JavaScript, no build step, no analytics). The app shell works offline once loaded; map tiles need a connection.

---

### Feature 1: Scrub the Timeline to Watch Realms Rise & Fall, and Compare Then with Now

- **19 Eras on a Single Canvas**: From the Mahajanapadas (500 BCE) through the Mauryas, Kushans and Satavahanas, the Guptas, Harsha, Chalukyas and Pallavas, the Pratiharas, Palas and Rashtrakutas, the Cholas, the Delhi Sultanate, Vijayanagara and the Deccan sultanates, the Mughals, the Marathas, the Company and the Raj, to Independence and South Asia today. A proportional time rail at the bottom is banded by each era's largest realm; click a band, press play, or use the arrow keys.
- **Ghost Boundary of the Previous Era**: Every era shows the outline of the one before it as a faint ghost, so gains and losses are immediately visible. Click any kingdom for a realm card (notes, rough extent, places and events inside, neighbours, the same realm in other eras).
- **Rivers, Roads, Canals and Dams in Their Own Period**: The Uttarapatha and the Grand Trunk Road, the Western Yamuna Canal, the Kallanai, Bhakra and more appear only when they existed; rivers are drawn as schematic courses.
- **A Map That Fills In As You Zoom**: Zoom in and the map is drawn with forts in each realm's colours, market towns, temples, stupas, mosques, harbours, mountain chains and forests, all in one hand-drawn pictogram set.
- **Then & Now Curtain**: Under **Layers**, drag a curtain across the map: the era on parchment on one side, today's satellite imagery with modern borders and cities on the other.
- **Three Base Maps**: the engraved **Antique atlas** (default), a **Relief** map and **Satellite**, all drawn from open data.

> [Try It Live: Maurya Empire under Ashoka (250 BCE) →](https://kaulvishesh.github.io/bharat-itihaas/#era=2&lang=en)

![Then & Now: the Maurya Empire on parchment against today's satellite view](assets/then-and-now.jpg)

---

### Feature 2: Cinematic Journeys — Five Directed Stories

Click **✦ Journeys** in the header (or open a link below). The map takes the whole screen; each scene is a cinematic cut and slow push-in (never a fly-over, so realms are always fully drawn), the era changes underneath, the year rolls like a counter and a lower-third caption narrates:

| Journey | Link |
| :--- | :--- |
| *The Emperor Who Wept* (500 → 250 BCE) | [`#journey=maurya`](https://kaulvishesh.github.io/bharat-itihaas/#journey=maurya) |
| *Eyes on India* (travellers' accounts) | [`#journey=travellers`](https://kaulvishesh.github.io/bharat-itihaas/#journey=travellers) |
| *The Tamil Sea Empire* | [`#journey=chola`](https://kaulvishesh.github.io/bharat-itihaas/#journey=chola) |
| *Sultans, Shahs & Emperors* | [`#journey=sultans`](https://kaulvishesh.github.io/bharat-itihaas/#journey=sultans) |
| *The Road to Independence* | [`#journey=freedom`](https://kaulvishesh.github.io/bharat-itihaas/#journey=freedom) |

- **Illustrated Landmarks Drawn on the Map**: the Bodhi tree with the seated Buddha and the Mahabodhi temple, Nalanda's brick monasteries, Ashoka's lion pillar, the Brihadisvara vimana, the Qutb Minar, the Taj Mahal and the Red Fort. They also appear as engraved plates in those events' popups.
- **Narration** (🔊): pre-rendered neural speech ([Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M)) in English, and the best voice installed on your device for Hindi.
- **Ambient Music** (♪, or press `M`): a tanpura-style drone with slow raga phrases that follow the era (Bhoopali, Yaman, Bhairavi, Bhairav; each journey has its own), synthesised live in your browser with the Web Audio API — no audio files. Off until you switch it on, remembered once chosen, ducks under narration, pauses when the tab is hidden.
- **Share**: the end card of every journey has a Share button (phones open the share sheet, desktops copy the link), and the **Layers → Share** menu item copies the current view. Shared links unfurl with a preview card on WhatsApp, X, Reddit, LinkedIn and Slack.
- **Take the Map Back Any Time**: pause and drag or zoom freely; `←` `→` `Space` `Esc` work. There is also a **full guided tour** of all 93 steps in the Journeys menu.

> [Try It Live: The Emperor Who Wept →](https://kaulvishesh.github.io/bharat-itihaas/#journey=maurya)

![Journey scene at Bodh Gaya: the Bodhi tree, the seated Buddha and the Mahabodhi temple drawn on the map](assets/journey-bodh-gaya.jpg)

---

### Feature 3: Click Any Place or Event (`Trace a Place`)

**Click anything** on the map, or use **Trace a place** (📍) and click any spot:
- **Which Realm Held This Spot, in Every Era**: a card lists the realm covering that point across all 19 eras, plus the events that happened nearby — computed by point-in-polygon against the boundaries.
- **Events with an Engraved Plate and the Wikipedia Article**: an event popup shows an engraved plate (the Bodhi tree for the Buddha's enlightenment, the Lion Capital for Ashoka's pillars...) and the Wikipedia article about the incident itself, fetched live (CC BY-SA, credit shown).
- **Search** (`/`): find places, events, realms, journeys and people in either language.

> [Try It Live: Trace Pataliputra (25.61°N 85.14°E) in the Gupta era →](https://kaulvishesh.github.io/bharat-itihaas/?trace=25.61,85.14#era=4&lang=en)

![Event popup with an engraved plate of the Bodhi tree and a Wikipedia summary](assets/event-popup.jpg)

---

### Feature 4: Person Chronicles, and a Map Quiz

Click **People** (👤) to follow eight lives across changing borders, with animated routes, English and Hindi bios and a **compare** view showing lifespans and overlap:

| Person | Link |
| :--- | :--- |
| Gautama Buddha | [`?person=buddha`](https://kaulvishesh.github.io/bharat-itihaas/?person=buddha#lang=en) |
| Ashoka | [`?person=ashoka`](https://kaulvishesh.github.io/bharat-itihaas/?person=ashoka#lang=en) |
| Xuanzang | [`?person=xuanzang`](https://kaulvishesh.github.io/bharat-itihaas/?person=xuanzang#lang=en) |
| Adi Shankara | [`?person=shankara`](https://kaulvishesh.github.io/bharat-itihaas/?person=shankara#lang=en) |
| Guru Nanak | [`?person=nanak`](https://kaulvishesh.github.io/bharat-itihaas/?person=nanak#lang=en) |
| Akbar | [`?person=akbar`](https://kaulvishesh.github.io/bharat-itihaas/?person=akbar#lang=en) |
| Shivaji | [`?person=shivaji`](https://kaulvishesh.github.io/bharat-itihaas/?person=shivaji#lang=en) |
| Mohandas K. Gandhi | [`?person=gandhi`](https://kaulvishesh.github.io/bharat-itihaas/?person=gandhi#lang=en) |

Think you know the map? Open **Layers → Quiz** for a "locate it on the map" challenge.

---

## Keyboard Shortcuts & Shareable Deep Links

### Keyboard Shortcuts

| Key / Action | Effect |
| :--- | :--- |
| **`/`** | Focus the search box: places, events, realms, journeys, people |
| **`←` / `→`** or bottom **`‹ / ›`** | Previous / next era (inside a journey: previous / next scene) |
| **`Space`** | Pause or resume a journey |
| **`M`** | Ambient music on or off |
| **`Esc`** | Close a popup, the Then & Now curtain or a journey |
| **Click the भारत seal** | Replay the opening title sequence |

### Shareable Deep Links

The address bar mirrors the era and language. Append parameters to share any moment:
- **Open an era** (0 to 18): [`#era=2`](https://kaulvishesh.github.io/bharat-itihaas/#era=2&lang=en) (Maurya Empire under Ashoka) / [`#era=4`](https://kaulvishesh.github.io/bharat-itihaas/#era=4&lang=en) (Gupta Empire) / [`#era=9`](https://kaulvishesh.github.io/bharat-itihaas/#era=9&lang=en) (Chola Empire at its peak) / [`#era=14`](https://kaulvishesh.github.io/bharat-itihaas/#era=14&lang=en) (Mughal Empire at its largest) / [`#era=17`](https://kaulvishesh.github.io/bharat-itihaas/#era=17&lang=en) (Independence & the Republic)
- **Switch language**: `#lang=en` (English) / [`#lang=hi`](https://kaulvishesh.github.io/bharat-itihaas/#lang=hi) (हिन्दी), e.g. `#era=14&lang=hi`
- **Start a journey**: `#journey=maurya`, `travellers`, `chola`, `sultans` or `freedom`
- **Open a person's chronicle**: [`?person=akbar`](https://kaulvishesh.github.io/bharat-itihaas/?person=akbar#lang=en)
- **Trace a point**: `?trace=28.61,77.21` (Delhi)
- **Start the full guided tour**: `?tour=1`
- **Skip or force the title sequence**: `?intro=0` / `?intro=1`

### Embed in Your Page

Put any view of the atlas into a blog post or course site:

1. Open the atlas and set up the view you want.
2. Add `embed=1` to the URL.
3. Paste it into an `<iframe>`:

```html
<iframe
  src="https://kaulvishesh.github.io/bharat-itihaas/?embed=1&person=akbar#lang=en"
  width="100%" height="520" loading="lazy" style="border:0"
  title="Bharat Itihaas · Akbar"></iframe>
```

The embedded map hides the toolbar and info panel. Control it from the parent page with `postMessage` (replies arrive as `{atlasReply, id, result}`, era changes as `{atlasEvent:'era', index}`):

```js
frame.contentWindow.postMessage({ atlas: 'goto', args: [6], id: 1 }, '*');   // use a specific target origin in production
```

| Parameter | Effect |
|---|---|
| `embed=1` | Turn on embed mode (required) |
| `era`, `lang` (in the hash) | Era 0 to 18 and `en` / `hi` |
| `person`, `trace`, `tour`, `journey`, `intro` | Same as the share links above |

---

## AI Agent, MCP & LLM Integration

**Bharat Itihaas** also works as a **historical-geography engine for LLMs, MCP clients and AI agents**: they never need to guess coordinates, and can ask for an era, a realm, a person or a point on the map.

- **Machine-Readable Specification**: [`llms.txt`](llms.txt)
- **Zero-Dependency Local MCP Server (`stdio`)**: [`scripts/mcp_server.js`](scripts/mcp_server.js) — add it to Claude Desktop, Cursor, Windsurf or Gemini CLI `mcpServers`:
  ```json
  {
    "mcpServers": {
      "bharat-itihaas": {
        "command": "node",
        "args": ["/absolute/path/to/bharat-itihaas/scripts/mcp_server.js"]
      }
    }
  }
  ```
  Exposes 7 offline tools (no npm dependencies):
  - `list_eras()` and `get_era({ index? , year? })`: the 19 eras; narrative, realms, rulers, places and events of one era (by index, or by the nearest year, negative = BCE).
  - `search({ query })`: search eras, realms, places, events, journeys and people.
  - `trace_place({ lat, lon })`: which realm covered that point in each era.
  - `list_people()`, `get_person({ id })` and `compare_people({ ids })`: person chronicles with stops, and lifespan overlap or gap.
  - Smoke test: `node scripts/test_mcp.js`.

### Python CLI (standard library only)

```bash
python skills/atlas_cli.py eras
python skills/atlas_cli.py era 400              # by index or nearest year (negative = BCE)
python skills/atlas_cli.py search nalanda
python skills/atlas_cli.py trace 25.61 85.14    # which realm covered a point, in each era
python skills/atlas_cli.py person akbar
python skills/atlas_cli.py render 4 -o gupta.svg --lang hi
```

### Browser JavaScript API (`window.atlasAPI`)

| Call | Returns |
|---|---|
| `eras()` / `era(i)` / `goto(i)` | the era list; one era's narrative, realms, places, events; jump to an era |
| `setLang('en'\|'hi')` / `state()` | switch language; `{era, lang, tour, journey, thenNow}` |
| `search(q)` | `[{kind, era, name}]` (also opens the result list) |
| `trace(lat, lon)` | which realms covered that point in each era |
| `people()` / `showPerson(id)` / `compare([id, id])` | person chronicles |
| `journeys()` / `startJourney(id)` / `stopJourney()` | the five cinematic journeys |
| `thenNow(on)` | show or hide the Then & Now curtain |
| `flyTo(lat, lon, zoom)` / `exportSVG(i?, lang?)` / `territory()` | move the map; the era as an SVG string; largest realm and rough area per era |

Full reference: [`docs/API.md`](docs/API.md).

---

## Run Locally

No dependencies or build steps required. Clone and serve with any static HTTP server:

```bash
git clone https://github.com/kaulvishesh/bharat-itihaas.git
cd bharat-itihaas
python -m http.server 8011
```

Then open `http://localhost:8011` in your browser (internet is needed for Leaflet and the map tiles).

## Run with Docker

No local dependency needed. Build and start with Docker Compose (the author has not tested this setup):

```bash
docker compose up -d --build
```

Then open `http://localhost:8009` (the mapping `8009:80` is set in `docker-compose.yml`). The image is a plain `nginx:alpine` that serves the repository as static files; `.dockerignore` keeps the tooling out (`.git`, `.github`, `scripts/`, `assets/` and the Markdown files), since the site does not need them at runtime.

## Publish Your Own Copy

The site is fully static (relative paths), so it works from a GitHub Pages sub-path. Fork or push this repository, then in **Settings → Pages** set **Source: GitHub Actions**. [`pages.yml`](.github/workflows/pages.yml) validates the data, rebuilds the topic pages and sitemap with your real URL, and publishes the runtime files (everything except `scripts/`, `assets/`, `.github/` and the project docs) to `https://<user>.github.io/<repo>/`. [`ci.yml`](.github/workflows/ci.yml) runs the checks on every push and pull request.

---

## GeoJSON & Data Export (for Leaflet / MapLibre / QGIS)

The app ships its boundaries as a script (`js/geo.js`). To use them elsewhere, generate standard RFC 7946 GeoJSON (EPSG:4326, lon/lat); the output is committed in `geojson/`:

```bash
node scripts/export_geojson.js      # geojson/NN-<snapshot>.geojson, one FeatureCollection per era, plus geojson/index.json
node scripts/export_data.js         # data/atlas.json: eras, routes, people, rivers and works for non-JS tools
```

- `geojson/index.json` lists every era with its `year`, `name`, `polities` count and file.
- Each feature is a realm polygon with `name`, `nameHi`, `color`, `approx`, `era` and `year`.
- The topic pages (`topics/`, English and Hindi, with inline SVG maps), `sitemap.xml` and `robots.txt` are generated by `node scripts/build_topics.js --base https://YOUR-HOST/path/`.

Historical borders are schematic approximations, not surveyed boundaries. The boundary data is GPL-3.0; see [Data Sources & License](#data-sources--license).

---

## Repository Structure

```text
├── index.html                 # the app page (strict Content-Security-Policy, no build step)
├── sw.js · manifest.webmanifest · icon.svg   # offline app shell (PWA); bump ?v= in index.html and sw.js together
├── css/                       # style.css (design system), wow.css (intro, journeys, music, Then & Now), fonts.css
├── fonts/                     # self-hosted fonts with their licence texts (SIL OFL)
├── js/
│   ├── data.js · data_hi.js   # eras, places, events; Hindi aligned with English by index
│   ├── geo.js · land.js       # generated: historical boundaries and the coastline (see scripts/)
│   ├── core.js                # shared geometry/lookup helpers (browser and Node tools)
│   ├── app.js · extras.js     # the app: map, timeline, panels, trace, people, API
│   ├── routes.js · rivers.js · works.js · people.js · battles.js · detail.js · realm_notes.js · event_wiki.js   # map content
│   ├── lod.js · declutter.js · icons.js · landmarks.js   # drawn places, label collision, pictogram and landmark art
│   ├── journeys_data.js · journeys.js · voice.js · music.js   # cinematic journeys, narration, ambient music
│   ├── intro.js · preintro.js · swipe.js   # title sequence, Then & Now curtain
│   ├── terrain.js · wiki.js   # hillshade/relief/satellite surfaces, Wikipedia summaries
│   └── sw-register.js
├── audio/                     # pre-rendered journey narration (Kokoro-82M) + manifest.json
├── data/ · geojson/ · topics/ # generated exports and static topic pages
├── docs/API.md                # developer API, embed, MCP
├── skills/atlas_cli.py        # Python CLI (JSON lookup, SVG rendering)
├── scripts/                   # validation, exports, topic pages, narration and data builders
├── social/preview.jpg         # the 1200x630 link-preview card named in index.html's og:image / twitter:image
├── assets/                    # README banner and screenshots (not part of the deployed site)
├── NOTICE.md · LICENSE        # every source and its licence · GPL-3.0
├── Dockerfile · docker-compose.yml
└── .github/                   # Pages deploy, CI checks, data-correction issue form
```

Build tools, all optional (the outputs are already committed):

```bash
node scripts/validate.js            # data integrity checks (Hindi coverage, coordinates, sorting, ...)
NARRATION_MODULES=/path/to/tools node scripts/make_narration.js   # re-render the journeys' English narration clips (audio/); see the header of that file
python -I scripts/build_geo.py <raw_dir> js/geo.js    # rebuild boundaries from the raw GeoJSON (then run scripts/apply_india_claim.js)
SOCIAL_MODULES=/path/to/tools node scripts/make_social.js   # re-render social/preview.jpg and assets/hero.webp from the running app (needs a local server and Edge/Chrome; setup in the header of that file)
```

If you host your own copy, change the three `kaulvishesh.github.io` addresses in the link-preview tags at the top of `index.html` (they must be absolute).

After editing `js/data.js`, run `validate.js`, then the exports above so the static outputs stay in sync. If you edit a journey caption (`js/journeys_data.js`) re-run `make_narration.js`; until then that caption falls back to the browser voice. When you change any JS/CSS, bump the `?v=` number in `index.html` **and** `sw.js` together so the service worker refreshes. See [CONTRIBUTING.md](CONTRIBUTING.md).

---

## Acknowledgements

**[Chronicles of the Realm · 江山时序 (jiangshan-map)](https://github.com/DeanChensj/jiangshan-map)**, created by **[DeanChensj](https://github.com/DeanChensj)** ([live demo](https://deanchen.me/jiangshan-map/?lang=en)), is the project this atlas grew out of. The idea and the shape of Bharat Itihaas are theirs, and the original creator deserves the credit for them. From it we took:

- **The visual structure**: the warm parchment palette with a vermilion accent, the docked information panel and the banded, scrubbable timeline.
- **The ideas we adapted for India**: tracing a place across eras, person chronicles, a map quiz, shareable deep links, an iframe embed, and the AI-agent integration (`llms.txt`, an MCP server, a CLI and a browser API).
- **The repository layout and the structure of this README.**

The India data, the content in English and Hindi, the cinematic journeys, music and the code for them were written for this project, and the whole repository is released under GPL-3.0, the same licence as the original. If you want an interactive atlas of China, use theirs.

---

## Data Sources & License

Code and the data created by this project are released under **GPL-3.0**.

| Layer | Source | License |
| :-- | :-- | :-- |
| Code (app, scripts, CLI, MCP server) | This project | GPL-3.0 |
| Historical boundaries (`js/geo.js`, `geojson/`) | Simplified from [aourednik/historical-basemaps](https://github.com/aourednik/historical-basemaps), then relabelled and edited by hand | GPL-3.0 |
| Present-day India (the 1960 and 2010 eras) | Redrawn by `scripts/apply_india_claim.js` from [Natural Earth](https://www.naturalearthdata.com) 10m countries, India point of view | Public domain |
| Coastline (`js/land.js`) | Natural Earth 50m land | Public domain |
| Eras, places, events, routes, people, journeys, Hindi text | Compiled by this project | GPL-3.0 |
| Landmark and pictogram art (`js/landmarks.js`, `js/icons.js`) | Drawn for this project | GPL-3.0 |
| Ambient music (`js/music.js`) | Synthesised live in the browser; no recordings or samples | GPL-3.0 |
| Journey narration (`audio/en/`) | Synthesised with [Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M); generated speech, not a recording of a person | Apache-2.0 (model and code) |
| Hillshade and Relief base map | Drawn in the browser from [AWS Terrain Tiles](https://registry.opendata.aws/terrain-tiles/) (SRTM and GMTED2010 from the US Geological Survey, ETOPO1 from NOAA) | Public domain; credit shown on the map |
| Satellite view, "today" side of Then & Now | [NASA Blue Marble](https://visibleearth.nasa.gov/collection/1484/blue-marble) via NASA GIBS | NASA data, no restrictions; credit shown |
| Map engine | [Leaflet](https://leafletjs.com) 1.9.4 from cdnjs, with Subresource Integrity | BSD-2-Clause |
| Event photos and summaries | Wikipedia, fetched live when a popup opens | CC BY-SA 4.0 (credit in each popup) |
| Fonts | Cormorant Garamond, Cinzel, Noto Serif/Sans (+ Devanagari), Amita; self-hosted in `fonts/` | SIL Open Font License 1.1 |
| Design language and repository structure | [jiangshan-map](https://github.com/DeanChensj/jiangshan-map) by [DeanChensj](https://github.com/DeanChensj) (palette structure, docked panel, banded timeline, README and repo layout) | GPL-3.0, Copyright © 2026 DeanChensj |

The full list, with links, is in [`NOTICE.md`](NOTICE.md).

**Approximate boundaries.** Boundaries, routes, rivers and the positions of drawn places are schematic approximations, not surveyed borders; they are for illustration only and are not authoritative or the Survey of India's official map. Do not cite them as precise.

**Present-day India.** The 1960 and 2010 eras draw India as India officially shows itself, including all of Jammu & Kashmir and Ladakh, from Natural Earth's "India point of view". That is an approximation, not the Survey of India's own file, and may differ in small details; other outlines are as the data sources draw them.

**Hindi and narration.** Hindi text was drafted with machine assistance and has not been reviewed by a native-speaker editor; corrections are welcome. The English narration is machine-generated speech.

**Privacy.** No analytics, cookies, accounts or tracking. The one exception is a view counter: each visit adds 1 to a single total kept by [Count API](https://countapi.mileshilliard.com/), a free open-source counter service. A visit is counted once per browser session; nothing about you is sent (no cookie, identifier or page address), and, like any web server, the service sees your IP address in the request and stores only the number. If you block it, the site works the same. The counter is public, so anyone could add to it or reset it: treat the number as a rough figure. Your browser keeps only your music choice, plus a note for the current session that you have seen the intro and been counted. Fonts are self-hosted; the page contacts only its own host, cdnjs (Leaflet), AWS and NASA (map surfaces), Count API (the count) and Wikipedia/Wikimedia (popups, only when you open one).

**Reusing this project.** Credit **Bharat Itihaas** with a link to https://github.com/kaulvishesh/bharat-itihaas, and cite the upstream sources above.

**Rights holders.** If you hold rights in any material here and believe it is used improperly, please [open an issue](https://github.com/kaulvishesh/bharat-itihaas/issues); we will respond and remove it if needed.

**Contributing**: see [CONTRIBUTING.md](CONTRIBUTING.md) for repository structure, data conventions and checks.

**Report a data error**: found a wrong year, place or description? [Open a data correction issue](https://github.com/kaulvishesh/bharat-itihaas/issues/new?template=data-error.yml) and cite a source if you can.

Licensed under GPL-3.0 (see [LICENSE](LICENSE)).
