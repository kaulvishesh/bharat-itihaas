# Contributing to Bharat Itihaas (भारत इतिहास)

<p align="left"><strong>English</strong> · <a href="README.md">README</a> · <a href="README_HI.md">हिन्दी README</a></p>

Thank you for your interest in the atlas. It is a static, zero-build interactive map of India from 500 BCE to today (Leaflet and vanilla JavaScript), in English and Hindi, drawn in the style of an engraved atlas.

Contributions that help most:

- **Historical corrections**: a wrong year, place, person, event or description. Please open a [data correction issue](https://github.com/kaulvishesh/bharat-itihaas/issues/new?template=data-error.yml) and cite a source (work plus chapter or page, or a link).
- **Hindi**: better phrasing for the interface, era and realm names, narratives and captions. The Hindi text was drafted with machine assistance and has not had a native-speaker edit, so review is very welcome.
- **Content**: events, places, routes, people, journeys, landmark drawings, zoom-detail items.
- **UI, accessibility and performance**: keyboard and screen-reader behaviour, small-screen layout, rendering speed.

## Run and check

There is nothing to install. Serve the repository root with any static server:

```bash
git clone https://github.com/kaulvishesh/bharat-itihaas.git
cd bharat-itihaas
python -m http.server 8011        # then open http://localhost:8011
```

Before opening a pull request:

```bash
node scripts/validate.js          # data integrity: Hindi coverage, coordinates, sorting (warnings are fine, errors are not)
node scripts/export_geojson.js    # regenerate geojson/ (one file per era)
node scripts/export_data.js       # regenerate data/atlas.json
node scripts/build_topics.js --base https://kaulvishesh.github.io/bharat-itihaas/   # regenerate topics/, sitemap.xml, robots.txt
node scripts/test_mcp.js          # MCP server smoke test
```

CI (`.github/workflows/ci.yml`) runs the first, the last, and fails if `geojson/` or `data/` is out of date. When you change any JS or CSS file, bump the `?v=` number in `index.html` **and** `sw.js` (the `atlas-vN` cache name) together, otherwise returning visitors keep the old files from the service worker.

## Where things live

| To change | Edit |
|---|---|
| Eras, places, events (English) | `js/data.js`. Coordinates are `[lat, lon]`. Years before the common era are negative. |
| The same in Hindi | `js/data_hi.js`, aligned with `data.js` **by index**: add or remove items in both, in the same position. `validate.js` checks coverage. |
| Realm notes shown on click | `js/realm_notes.js` (matched by lowercase substring of the English realm name) |
| Routes, rivers, roads/canals/dams, people | `js/routes.js`, `js/rivers.js`, `js/works.js`, `js/people.js` (schematic polylines, not surveyed) |
| Battles and landmark drawings | `js/battles.js`, `js/landmarks.js` (matched to events **by event title**) |
| Wikipedia article for an event | `js/event_wiki.js` (keyed by event title) |
| Zoom-detail drawings (forts, temples, markets, mountains) | `js/detail.js` |
| Cinematic journeys | `js/journeys_data.js` (pure data: scenes with English and Hindi captions) |
| Ambient music scales and mood | `js/music.js` |
| Boundaries | generated, see below; do not edit `js/geo.js` by hand |

Event titles are used as keys by journeys, landmarks, battles and the narration clips, so **renaming an event title means updating every place that refers to it**. The player logs a console warning for a journey scene that points at an unknown event, so open a journey after renaming.

## Journeys and narration

Each journey scene has an English and a Hindi caption. The English narration is a pre-rendered clip (`audio/en/<journey>-<n>.mp3`) matched to its caption by a hash in `audio/manifest.json`. If you edit a caption, the clip no longer matches and the player falls back to the browser's voice for that scene until you re-render:

```bash
NARRATION_MODULES=/path/to/tools node scripts/make_narration.js    # see the header of that file for the one-time setup
```

## Boundaries

`js/geo.js` is generated from the historical-basemaps GeoJSON snapshots (not committed here; see `scripts/build_geo.py`), then `scripts/apply_india_claim.js` redraws present-day India (the 1960 and 2010 eras) from Natural Earth's "India point of view" and removes the same area from Pakistan's shape. Always run them in that order, then re-run the export scripts above. Borders are approximate and illustrative; when you propose a boundary change, cite the reference map (title, plate or page) in your pull request.

## Conventions

- **No build step, no runtime dependencies.** Plain scripts loaded from `index.html`; Leaflet comes from cdnjs with a pinned version.
- **Strict Content-Security-Policy** (in `index.html`). A new external host needs a deliberate entry there. Fonts are self-hosted; do not add Google Fonts or other third-party requests, and do not add analytics.
- **Keep the house style**: one hand-drawn pictogram set (`js/icons.js`), the parchment palette in `css/style.css`, English **and** Hindi for every visible string.
- **Respect `prefers-reduced-motion`** for new animation, and keep new controls keyboard-reachable with accessible names.
- **Licensing**: the project is GPL-3.0. Add every new third-party source (data, fonts, audio, imagery, code) to `NOTICE.md` with its licence, and only use material you may redistribute.

## Pull requests

Keep a pull request focused on one thing. Describe what changed and why, cite sources for historical changes, say how you checked it (the commands above, and a look at the map in English and Hindi), and attach a screenshot for visual changes.
