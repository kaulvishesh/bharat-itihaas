// Loads the browser data files into Node (no dependencies) for the GeoJSON export and MCP server.
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

function load() {
  const dir = path.join(__dirname, '..', 'js');
  const sandbox = { window: {}, console };
  vm.createContext(sandbox);
  ['data.js', 'data_hi.js', 'geo.js', 'routes.js', 'people.js', 'rivers.js'].forEach((f) => {
    vm.runInContext(fs.readFileSync(path.join(dir, f), 'utf8'), sandbox, { filename: f });
  });
  const w = sandbox.window;
  return {
    ERAS: w.ATLAS_DATA.ERAS, GEO: w.ATLAS_GEO, ROUTES: w.ATLAS_ROUTES, PEOPLE: w.ATLAS_PEOPLE, RIVERS: w.ATLAS_RIVERS,
    core: require(path.join(dir, 'core.js'))
  };
}
module.exports = { load };
