# Notices and attributions

Atlas of India is free software released under the **GNU General Public License v3.0** (see `LICENSE`).
It builds on and ships the following third-party material:

| What | Source | Licence / terms |
|---|---|---|
| Historical boundaries (`js/geo.js`, `geojson/`) | [aourednik/historical-basemaps](https://github.com/aourednik/historical-basemaps), simplified | GPL-3.0 |
| Coastline (`js/land.js`) | [Natural Earth](https://www.naturalearthdata.com) 50m land | Public domain |
| Design language (palette structure, docked panel, banded timeline) | [jiangshan-map](https://github.com/DeanChensj/jiangshan-map) | GPL-3.0 |
| Map engine | [Leaflet](https://leafletjs.com) 1.9.4, loaded from cdnjs with Subresource Integrity | BSD-2-Clause |
| Hillshade / relief / imagery tiles | Esri (World Hillshade, World Shaded Relief, World Imagery) | Esri terms of use — attribution shown on the map; review them for your traffic |
| "Modern map" tiles | OpenStreetMap contributors | ODbL; see the OSM tile usage policy before heavy use |
| Place and event photos and summaries | Wikipedia, fetched live when a popup opens | CC BY-SA 4.0 (credit shown in each popup) |
| Journey narration audio (`audio/en/`) | Synthesised with [Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M) (ONNX build by onnx-community) via `kokoro-js`; generated speech, not a recording of a person | Apache-2.0 (model weights and code) |
| Landmark illustrations (`js/landmarks.js`) | Drawn for this project, in the house style of `js/icons.js` | GPL-3.0 with the rest of the code |
| Fonts: Cormorant Garamond, Cinzel, Noto Serif / Sans (+ Devanagari), Amita | Google Fonts | SIL Open Font License 1.1 |

Boundaries, routes, rivers, roads and the positions of drawn places are **approximate, simplified and for illustration only**.
They are not authoritative and are not intended for any political or legal purpose. Disputed borders are shown as the data
sources and basemaps depict them; this project takes no position on them.

The English narration is machine-generated speech. Translations (Hindi) were drafted with machine assistance and have not been reviewed by a native-speaker editor.
