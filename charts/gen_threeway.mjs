// Renders the honest 3-way decomposition charts (upstream / up+flags / Turbo) to SVG (GitHub-dark).
// Source: qworld_turbo/results/THREEWAY_F16_B70.md, ## AgentWorld-35B-A3B (verbatim).
// Usage: ECHARTS_ESM=/path/to/newjordan-echarts/dist/echarts.esm.min.mjs node charts/gen_threeway.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { GH, base, catAxis, valAxis, logAxis, line, render } from './_theme.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT  = HERE;
const ECHARTS = process.env.ECHARTS_ESM || 'echarts';
const echarts = await import(ECHARTS);
const W = 900, H = 480;

// Series roles are fixed across all three charts:
//   upstream defaults        -> GH.dim,    dashed  (mainline, default flags)
//   upstream + Turbo flags   -> GH.blue,   solid   (mainline, Turbo flags = 100% of the config win)
//   Turbo build (+fusion)    -> GH.orange, dashed  (fork, same flags = the fusion-only delta)
const LEGEND = ['upstream defaults', 'upstream + Turbo flags', 'Turbo build (+fusion)'];

// Legend labels here are long (3 full phrases, not 2 short words like the other charts), so give
// it its own left-aligned row under the title+subtext instead of fighting them for space on one line.
function threewayBase(title, subtext) {
  const b = base(title, subtext);
  return {
    ...b,
    legend: { ...b.legend, data: LEGEND, top: 66, left: 26, right: 'auto' },
    grid: { ...b.grid, top: 132 },
  };
}

// diamond marker riding on top, for the near-coincident series (config win ~= whole win):
// a thin line would be fully hidden under the other series' wider stroke, so widen only the
// marker and keep the line hairline — the diamonds poke out at each point, proving 3 series.
function overlay(name, data, color) {
  return { ...line(name, data, color, { symbolSize: 12, width: 1, z: 5 }), symbol: 'diamond' };
}

// ── 7. Prefill — 3-way decomposition (config win 1.2-1.7x, fusion adds ~nothing) ─
const prefillX  = [805, 3313, 6963, 14563, 29713, 61341, 129325];
const pUpstream = [1099, 1096, 1058, 976, 835, 634, 414];
const pUpFlags  = [1397, 1845, 1736, 1535, 1205, 827, 488];
const pTurbo    = [1405, 1850, 1738, 1537, 1208, 827, 488];
await render(echarts, {
  ...threewayBase('AgentWorld · prefill — 3-way decomposition',
          'single stream · prefill t/s vs prompt tokens · config win 1.2–1.7× · fusion (code win) adds 1.00–1.01× — ~nothing'),
  xAxis: logAxis('prompt tokens'),
  yAxis: valAxis('prefill t/s'),
  series: [
    line(LEGEND[0], prefillX.map((x,i)=>[x,pUpstream[i]]), GH.dim, { dashed: true, symbolSize: 6, width: 2.2, z: 1 }),
    line(LEGEND[1], prefillX.map((x,i)=>[x,pUpFlags[i]]), GH.blue, { area: true, symbolSize: 8, z: 3 }),
    overlay(LEGEND[2], prefillX.map((x,i)=>[x,pTurbo[i]]), GH.orange),
  ],
}, W, H, path.join(OUT, '07_threeway_prefill.svg'), fs);

// ── 8. Decode — 3-way decomposition (config win ~1.00x, fusion +7-14%) ───────────
const decodeX   = [805, 3313, 6963, 14563, 29713, 61341, 129325];
const dUpstream = [81.7, 80.0, 77.5, 73.0, 66.6, 55.7, 41.5];
const dUpFlags  = [81.7, 79.8, 77.4, 72.7, 66.1, 55.5, 41.3];
const dTurbo    = [93.6, 91.3, 88.3, 82.3, 74.1, 61.0, 44.3];
await render(echarts, {
  ...threewayBase('AgentWorld · decode — 3-way decomposition',
          'single stream · decode t/s vs context depth · config ~1.00× (flags do nothing) · fusion +7–14% — the fork-only win'),
  xAxis: logAxis('context tokens'),
  yAxis: valAxis('decode t/s'),
  series: [
    line(LEGEND[0], decodeX.map((x,i)=>[x,dUpstream[i]]), GH.dim, { dashed: true, symbolSize: 6, width: 2.2, z: 1 }),
    line(LEGEND[1], decodeX.map((x,i)=>[x,dUpFlags[i]]), GH.blue, { symbolSize: 7, z: 2 }),
    line(LEGEND[2], decodeX.map((x,i)=>[x,dTurbo[i]]), GH.orange, { area: true, symbolSize: 8, z: 3 }),
  ],
}, W, H, path.join(OUT, '08_threeway_decode.svg'), fs);

// ── 9. Fleet — 3-way decomposition (config win ~1.3-1.4x, fusion neutral/slight cost) ─
const fAgents   = ['1','2','4','8','16','24','32','40','48','56'];
const fUpstream = [78.5, 73.2, 93.3, 102.3, 107.5, 117.6, 125.1, 132.4, 138.2, 142.2];
const fUpFlags  = [79.0, 72.4, 119.0, 142.0, 146.2, 158.2, 168.0, 172.8, 177.6, 181.4];
const fTurbo    = [86.1, 73.9, 120.9, 138.7, 144.0, 158.2, 166.7, 172.0, 177.6, 180.9];
await render(echarts, {
  ...threewayBase('AgentWorld · fleet — 3-way decomposition',
          'aggregate decode t/s vs agents (2048p+256g) · config ~1.3–1.4× · fusion 0.96–1.02× — ~neutral at scale'),
  xAxis: catAxis('concurrent agents', fAgents),
  yAxis: valAxis('aggregate decode t/s'),
  series: [
    line(LEGEND[0], fUpstream, GH.dim, { dashed: true, symbolSize: 6, width: 2.2, z: 1 }),
    line(LEGEND[1], fUpFlags, GH.blue, { area: true, symbolSize: 8, z: 3 }),
    overlay(LEGEND[2], fTurbo, GH.orange),
  ],
}, W, H, path.join(OUT, '09_threeway_fleet.svg'), fs);

console.log('3-way charts rendered ->', OUT);
