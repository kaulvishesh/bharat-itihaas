# Atlas of India — API

## Browser: `window.atlasAPI`

| Call | Returns |
|---|---|
| `eras()` | list of `{index, year, label, name, nameHi}` |
| `era(i)` | narrative, realms, places, events for era `i` |
| `goto(i)` | jumps to era `i` |
| `setLang('en'\|'hi')` | switches language |
| `search(q)` | `[{kind, era, name}]` (also opens the result list) |
| `trace(lat, lon)` | which realms covered that point in each era |
| `people()` / `showPerson(id)` / `compare([id, id])` | person chronicles |
| `flyTo(lat, lon, zoom)` | moves the map |
| `exportSVG(i?, lang?)` | the era as an SVG string |
| `territory()` | largest mapped realm and rough area per era |
| `startTour()` / `stopTour()` | full guided tour |
| `journeys()` | list the cinematic journeys `[{id, title, scenes}]` |
| `startJourney(id)` / `stopJourney()` | play / exit a journey (`maurya`, `travellers`, `chola`, `sultans`, `freedom`) |
| `thenNow(on)` | show (default) or hide the Then & Now curtain |
| `state()` | `{era, lang, tour, journey, thenNow}` |

## Embed in an iframe

```html
<iframe src="https://YOUR-HOST/index.html?embed=1#era=3&lang=en" width="100%" height="520"></iframe>
```
`embed=1` hides the toolbar and info panel. Other URL options: `#era=N&lang=hi` in the hash, and `?tour=1`, `#journey=maurya`, `?intro=0`, `?person=akbar`, `?trace=28.61,77.21` in the query string (e.g. `index.html?embed=1&person=akbar#era=14`).

Control it from the parent page (replies arrive as `{atlasReply, id, result}`; era changes as `{atlasEvent:'era', index}`):

```js
frame.contentWindow.postMessage({ atlas: 'goto', args: [6], id: 1 }, '*');
```
Use a specific target origin instead of `'*'` in production.

## MCP server (for AI agents)

```
node scripts/mcp_server.js
```
Zero dependencies, stdio transport. Tools: `list_eras`, `get_era`, `search`, `trace_place`, `list_people`, `get_person`, `compare_people`. Smoke test: `node scripts/test_mcp.js`.

## GeoJSON export

```
node scripts/export_geojson.js
```
Writes `geojson/NN-<snapshot>.geojson` (one FeatureCollection per era) and `geojson/index.json`. Boundaries are approximate (GPL-3.0 source data).
