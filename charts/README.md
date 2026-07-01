# charts

Benchmark charts, rendered **server-side to static SVG** (no scripts) from the
[`newjordan/echarts`](https://github.com/newjordan/echarts) fork, themed to GitHub's dark Primer palette.

```bash
# needs the fork's prebuilt ESM dist (or any echarts >=5 with SSR)
ECHARTS_ESM=/path/to/newjordan-echarts/dist/echarts.esm.min.mjs node gen_charts.mjs
ECHARTS_ESM=/path/to/newjordan-echarts/dist/echarts.esm.min.mjs node gen_threeway.mjs
```

`_theme.mjs` holds the GitHub-dark theme + axis/line/render helpers; `gen_charts.mjs` holds the
per-chart data + specs. `gen_threeway.mjs` renders the honest 3-way decomposition charts (07-09:
upstream / upstream+flags / Turbo) from `THREEWAY_F16_B70.md` — kept separate since its legend
(3 full-phrase labels) needs its own layout, not the 2-word legends the other charts use. Data
lives in `../data/`.
