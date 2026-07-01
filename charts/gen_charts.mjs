// Renders all AgentWorld-35B-A3B B70 Turbo benchmark charts to SVG (GitHub-dark).
// Usage: ECHARTS_ESM=/path/to/newjordan-echarts/dist/echarts.esm.min.mjs node charts/gen_charts.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { GH, base, catAxis, valAxis, logAxis, line, render } from './_theme.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT  = HERE;
const ECHARTS = process.env.ECHARTS_ESM || 'echarts';
const echarts = await import(ECHARTS);
const W = 860, H = 460;

// ── 1. Concurrency Pareto (offline llama-batched-bench, 2048p+256g) ──────────
const cAgents = ['1','2','4','8','16','24','32','40','48','56'];
const cAgg  = [76.39,68.50,90.31,107.77,127.80,146.32,159.94,169.62,178.25,10.05];
const cPer  = [76.39,34.25,22.58,13.47,7.99,6.10,5.00,4.24,3.71,0.18];
await render(echarts, {
  ...base('AgentWorld · concurrency Pareto',
          'aggregate vs per-agent decode · 2048-tok prompt + 256 gen · knee @ 32 · memory cliff @ 56'),
  legend: { ...base('','').legend, data: ['aggregate t/s','per-agent t/s'] },
  xAxis: catAxis('concurrent agents (-np)', cAgents),
  yAxis: [ valAxis('aggregate decode t/s', { max: 200 }),
           valAxis('per-agent t/s', { position: 'right', splitLine: { show: false }, max: 80 }) ],
  series: [
    line('aggregate t/s', cAgg, GH.blue, { area: true, symbolSize: 8,
      markLine: { silent: true, symbol: 'none',
        lineStyle: { color: GH.green, type: 'dashed', width: 1.4 },
        label: { color: GH.green, fontFamily: '-apple-system', formatter: 'knee', position: 'insideEndTop' },
        data: [{ xAxis: '32' }] },
      markPoint: { symbol: 'pin', symbolSize: 46, data: [
        { coord: ['56', 10.05], value: 'cliff', itemStyle: { color: GH.red },
          label: { color: '#fff', fontSize: 10 } } ] } }),
    line('per-agent t/s', cPer, GH.orange, { yAxisIndex: 1, dashed: true, symbolSize: 6 }),
  ],
}, W, H, path.join(OUT, '01_concurrency_pareto.svg'), fs);

// ── 2. Turbo vs Stock — fleet throughput (live server, tool class) ───────────
const fAgents = ['1','2','4','8','16','24','32'];
const fStock  = [62.31,67.94,95.68,125.12,146.78,168.97,186.85];
const fTurbo  = [62.59,null,null,141.49,163.35,null,223.95];
await render(echarts, {
  ...base('AgentWorld · Turbo vs Stock — fleet decode',
          'live server · aggregate decode t/s vs concurrent agents · same weights, same GPU'),
  legend: { ...base('','').legend, data: ['Stock','Turbo'] },
  xAxis: catAxis('concurrent agents', fAgents),
  yAxis: valAxis('aggregate decode t/s'),
  series: [
    line('Stock', fStock, GH.dim, { symbolSize: 6, width: 2.2 }),
    line('Turbo', fTurbo, GH.blue, { area: true, symbolSize: 8,
      label: true, labelFmt: (p) => p.value != null ? p.value : '' }),
  ],
}, W, H, path.join(OUT, '02_turbo_vs_stock_fleet.svg'), fs);

// ── 3. Turbo vs Stock — prefill throughput vs prompt size ────────────────────
const pStock = [[805,635],[3313,856],[6963,849],[14563,813],[29713,712],[61341,561],[129325,381]];
const pTurbo = [[805,832],[3313,1522],[6963,1577],[14563,1452],[29713,1171],[61341,818],[129325,487]];
await render(echarts, {
  ...base('AgentWorld · Turbo vs Stock — prefill',
          'single stream · prefill t/s vs prompt tokens · Turbo = -ub 4096 + DNN-off · peak 1.86× @ ~7k'),
  legend: { ...base('','').legend, data: ['Stock','Turbo'] },
  xAxis: logAxis('prompt tokens'),
  yAxis: valAxis('prefill t/s'),
  series: [
    line('Stock', pStock, GH.dim, { symbolSize: 6, width: 2.2 }),
    line('Turbo', pTurbo, GH.green, { area: true, symbolSize: 8 }),
  ],
}, W, H, path.join(OUT, '03_turbo_vs_stock_prefill.svg'), fs);

// ── 4. Turbo vs Stock — decode vs context depth (KV dtype exposed) ───────────
const dStockF16 = [[805,80.3],[3313,78.9],[6963,76.5],[14563,72.0],[29713,65.5],[61341,55.3],[129325,41.3]];
const dTurboF16 = [[805,91.7],[3313,89.3],[6963,86.4],[14563,81.1],[29713,73.3],[61341,60.6],[129325,44.0]];
const dTurboQ8  = [[805,84.9],[3313,74.1],[6963,62.7],[14563,47.0],[29713,32.1],[61341,19.3],[129325,10.4]];
await render(echarts, {
  ...base('AgentWorld · decode t/s vs context depth',
          'single stream · shipped Turbo (f16 KV) beats stock at every depth · q8_0 KV collapses ↓4.2× @129k'),
  legend: { ...base('','').legend, data: ['Stock (f16)','Turbo shipped (f16)','Turbo q8_0 KV'] },
  xAxis: logAxis('context tokens'),
  yAxis: valAxis('decode t/s'),
  series: [
    line('Stock (f16)', dStockF16, GH.dim, { symbolSize: 6, width: 2.2 }),
    line('Turbo shipped (f16)', dTurboF16, GH.blue, { area: true, symbolSize: 8 }),
    line('Turbo q8_0 KV', dTurboQ8, GH.red, { dashed: true, symbolSize: 6 }),
  ],
}, W, H, path.join(OUT, '04_decode_vs_context.svg'), fs);

// ── 5. Accuracy (lm-eval, Q5_K_M) ────────────────────────────────────────────
const accPairs = [['GSM8K',97.0],['HellaSwag',81.9],['Winogrande',75.6],
                  ['ARC-Challenge',55.2],['MMLU',41.5],['TruthfulQA-MC1',37.6]]
                  .sort((a,b)=>a[1]-b[1]);
await render(echarts, {
  ...base('AgentWorld · accuracy (Q5_K_M)',
          'lm-eval harness · Wikitext-2 PPL 5.96 (lower better) · % accuracy'),
  grid: { left: 130, right: 60, top: 84, bottom: 44 },
  xAxis: valAxis('accuracy %', { max: 100 }),
  yAxis: catAxis('', accPairs.map(p=>p[0])),
  series: [{
    type: 'bar', barWidth: 16,
    data: accPairs.map((p,i)=>({ value: p[1],
      itemStyle: { color: GH.palette[i % GH.palette.length], borderRadius: [0,3,3,0] } })),
    label: { show: true, position: 'right', color: GH.fg, fontFamily: '-apple-system',
             fontSize: 12, formatter: '{c}%' },
  }],
}, W, H, path.join(OUT, '05_accuracy.svg'), fs);

// ── 6. Quant game-quality — Q5 vs Q6 (source-review /50) ──────────────────────
await render(echarts, {
  ...base('AgentWorld · quant game-quality',
          'source-review /50 · agentic-arcade teamwork builds · Q5↔Q6 within run-to-run noise → ship Q5'),
  legend: { ...base('','').legend, data: ['Q6_K · run 1','Q6_K · run 2','Q5_K_M'] },
  xAxis: catAxis('', ['Frogger','Maze']),
  yAxis: valAxis('score / 50', { max: 50 }),
  series: [
    { name:'Q6_K · run 1', type:'bar', barGap:'20%', data:[34,40],
      itemStyle:{ color: GH.purple, borderRadius:[3,3,0,0] },
      label:{ show:true, position:'top', color:GH.dim, fontSize:11 } },
    { name:'Q6_K · run 2', type:'bar', data:[35,40],
      itemStyle:{ color: GH.cyan, borderRadius:[3,3,0,0] },
      label:{ show:true, position:'top', color:GH.dim, fontSize:11 } },
    { name:'Q5_K_M', type:'bar', data:[34,40],
      itemStyle:{ color: GH.green, borderRadius:[3,3,0,0] },
      label:{ show:true, position:'top', color:GH.dim, fontSize:11 } },
  ],
}, W, H, path.join(OUT, '06_quant_games.svg'), fs);

console.log('AgentWorld charts rendered ->', OUT);
