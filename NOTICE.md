# Notices and attributions

Atlas of India is free software released under the **GNU General Public License v3.0** (see `LICENSE`).
It builds on and ships the following third-party material:

| What | Source | Licence / terms |
|---|---|---|
| Historical boundaries (`js/geo.js`, `geojson/`) | [aourednik/historical-basemaps](https://github.com/aourednik/historical-basemaps), simplified | GPL-3.0 |
| Coastline (`js/land.js`) and the present-day outline of India (`scripts/apply_india_claim.js`) | [Natural Earth](https://www.naturalearthdata.com) 50m land; 10m countries, India point of view | Public domain |
| Design language and repository structure (palette structure, docked panel, banded timeline, README and repository layout; the idea of this atlas) | **[Chronicles of the Realm · 江山时序 (jiangshan-map)](https://github.com/DeanChensj/jiangshan-map)** by [DeanChensj](https://github.com/DeanChensj), Copyright © 2026 DeanChensj | GPL-3.0 |
| Map engine | [Leaflet](https://leafletjs.com) 1.9.4, loaded from cdnjs with Subresource Integrity | BSD-2-Clause |
| Hillshade and Relief base map (`js/terrain.js`) | Drawn in the visitor's browser from the public [Terrain Tiles](https://registry.opendata.aws/terrain-tiles/) dataset on AWS Open Data (Mapzen), which for this region is built mainly from SRTM and GMTED2010 (US Geological Survey) and ETOPO1 sea-floor depths (NOAA) | US Government data, public domain; credit shown on the map. Not for navigation |
| Satellite view and the "today" side of Then & Now | [NASA Blue Marble, Next Generation](https://visibleearth.nasa.gov/collection/1484/blue-marble) served by [NASA GIBS](https://www.earthdata.nasa.gov/engage/open-data-services-software-policies/gibs) | NASA data, CC0 / no restrictions; credit shown on the map |
| Place and event photos and summaries | Wikipedia, fetched live when a popup opens | CC BY-SA 4.0 (credit shown in each popup) |
| Journey narration audio (`audio/en/`) | Synthesised with [Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M) (ONNX build by onnx-community) via `kokoro-js`; generated speech, not a recording of a person | Apache-2.0 (model weights and code) |
| Ambient music (`js/music.js`) | Synthesised live in the browser with the Web Audio API: a tanpura-style drone, a soft pad and sparse bell notes in raga scales (just intonation). No recordings, samples or downloaded audio | GPL-3.0 with the rest of the code |
| Landmark illustrations (`js/landmarks.js`) | Drawn for this project, in the house style of `js/icons.js` | GPL-3.0 with the rest of the code |
| Fonts: Cormorant Garamond, Cinzel, Noto Serif / Sans (+ Devanagari), Amita | Copies of the Google Fonts files, self-hosted in `fonts/` so visitors' browsers never contact Google (`scripts/fetch_fonts.js`); licence texts in `fonts/licenses/` | SIL Open Font License 1.1 |

Boundaries, routes, rivers, roads and the positions of drawn places are **approximate, simplified and for illustration only**.
They are not authoritative and are not intended for any political or legal purpose. The present-day outline of India (the 1960 and 2010
eras) follows India's official position, including all of Jammu & Kashmir and Ladakh: it is redrawn from Natural Earth's "India point of view" country
data (public domain) by `scripts/apply_india_claim.js`, and the same areas are removed from Pakistan's shape. That is an approximation, not the
Survey of India's official map, and may differ in small details. Other borders are shown as the data sources depict them.

The English narration is machine-generated speech. Translations (Hindi) were drafted with machine assistance and have not been reviewed by a native-speaker editor.
