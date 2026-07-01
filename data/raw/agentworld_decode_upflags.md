| model                          |       size |     params | backend    | ngl | n_batch | n_ubatch |  fa |            test |                  t/s |
| ------------------------------ | ---------: | ---------: | ---------- | --: | ------: | -------: | --: | --------------: | -------------------: |
| qwen35moe 35B.A3B Q5_K - Medium |  23.02 GiB |    34.66 B | SYCL       |  99 |    8192 |     4096 |   1 |    tg128 @ d805 |         81.73 ± 0.03 |
| qwen35moe 35B.A3B Q5_K - Medium |  23.02 GiB |    34.66 B | SYCL       |  99 |    8192 |     4096 |   1 |   tg128 @ d3313 |         79.81 ± 0.02 |
| qwen35moe 35B.A3B Q5_K - Medium |  23.02 GiB |    34.66 B | SYCL       |  99 |    8192 |     4096 |   1 |   tg128 @ d6963 |         77.41 ± 0.06 |
| qwen35moe 35B.A3B Q5_K - Medium |  23.02 GiB |    34.66 B | SYCL       |  99 |    8192 |     4096 |   1 |  tg128 @ d14563 |         72.72 ± 0.02 |
| qwen35moe 35B.A3B Q5_K - Medium |  23.02 GiB |    34.66 B | SYCL       |  99 |    8192 |     4096 |   1 |  tg128 @ d29713 |         66.07 ± 0.02 |
| qwen35moe 35B.A3B Q5_K - Medium |  23.02 GiB |    34.66 B | SYCL       |  99 |    8192 |     4096 |   1 |  tg128 @ d61341 |         55.46 ± 0.01 |
| qwen35moe 35B.A3B Q5_K - Medium |  23.02 GiB |    34.66 B | SYCL       |  99 |    8192 |     4096 |   1 | tg128 @ d129325 |         41.28 ± 0.01 |

build: 885e3e325 (44)
