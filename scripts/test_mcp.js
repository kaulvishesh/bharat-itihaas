// Smoke test for the MCP server: node scripts/test_mcp.js
'use strict';
const { spawn } = require('child_process');
const path = require('path');

const child = spawn(process.execPath, [path.join(__dirname, 'mcp_server.js')]);
const msgs = [
  { jsonrpc: '2.0', id: 1, method: 'initialize', params: { protocolVersion: '2024-11-05' } },
  { jsonrpc: '2.0', method: 'notifications/initialized' },
  { jsonrpc: '2.0', id: 2, method: 'tools/list' },
  { jsonrpc: '2.0', id: 3, method: 'tools/call', params: { name: 'trace_place', arguments: { lat: 28.61, lon: 77.21 } } },
  { jsonrpc: '2.0', id: 4, method: 'tools/call', params: { name: 'compare_people', arguments: { ids: ['akbar', 'shivaji', 'gandhi'] } } },
  { jsonrpc: '2.0', id: 5, method: 'tools/call', params: { name: 'get_era', arguments: { year: -250 } } },
  { jsonrpc: '2.0', id: 6, method: 'tools/call', params: { name: 'search', arguments: { query: 'nalanda' } } }
];
let buf = '', got = 0;
child.stdout.on('data', (d) => {
  buf += d;
  let i;
  while ((i = buf.indexOf('\n')) >= 0) {
    const m = JSON.parse(buf.slice(0, i)); buf = buf.slice(i + 1); got++;
    if (m.id === 2) console.log('tools:', m.result.tools.map((t) => t.name).join(', '));
    else if (m.result && m.result.content) console.log('id', m.id, m.result.content[0].text.replace(/\s+/g, ' ').slice(0, 220));
    else console.log('id', m.id, 'ok');
    if (got === 6) { clearTimeout(timer); child.kill(); console.log('MCP smoke test passed'); }
  }
});
msgs.forEach((m) => child.stdin.write(JSON.stringify(m) + '\n'));
const timer = setTimeout(() => { console.log('timeout; received', got); child.kill(); process.exit(1); }, 8000);
