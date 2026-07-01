| model                          |       size |     params | backend    | ngl |  fa |            test |                  t/s |
| ------------------------------ | ---------: | ---------: | ---------- | --: | --: | --------------: | -------------------: |
| qwen35moe 35B.A3B Q5_K - Medium |  23.02 GiB |    34.66 B | SYCL       |  99 |   1 |    tg128 @ d805 |         81.67 ± 0.03 |
| qwen35moe 35B.A3B Q5_K - Medium |  23.02 GiB |    34.66 B | SYCL       |  99 |   1 |   tg128 @ d3313 |         80.00 ± 0.02 |
| qwen35moe 35B.A3B Q5_K - Medium |  23.02 GiB |    34.66 B | SYCL       |  99 |   1 |   tg128 @ d6963 |         77.53 ± 0.06 |
| qwen35moe 35B.A3B Q5_K - Medium |  23.02 GiB |    34.66 B | SYCL       |  99 |   1 |  tg128 @ d14563 |         72.96 ± 0.00 |
| qwen35moe 35B.A3B Q5_K - Medium |  23.02 GiB |    34.66 B | SYCL       |  99 |   1 |  tg128 @ d29713 |         66.58 ± 0.05 |
| qwen35moe 35B.A3B Q5_K - Medium |  23.02 GiB |    34.66 B | SYCL       |  99 |   1 |  tg128 @ d61341 |         55.69 ± 0.06 |
| qwen35moe 35B.A3B Q5_K - Medium |  23.02 GiB |    34.66 B | SYCL       |  99 |   1 | tg128 @ d129325 |         41.45 ± 0.02 |

build: 885e3e325 (44)
