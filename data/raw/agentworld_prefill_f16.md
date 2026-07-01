| model                          |       size |     params | backend    | ngl | n_batch | n_ubatch |  fa |            test |                  t/s |
| ------------------------------ | ---------: | ---------: | ---------- | --: | ------: | -------: | --: | --------------: | -------------------: |
| qwen35moe 35B.A3B Q5_K - Medium |  23.02 GiB |    34.66 B | SYCL       |  99 |    8192 |     4096 |   1 |           pp805 |       1404.71 ± 4.00 |
| qwen35moe 35B.A3B Q5_K - Medium |  23.02 GiB |    34.66 B | SYCL       |  99 |    8192 |     4096 |   1 |          pp3313 |       1850.13 ± 2.79 |
| qwen35moe 35B.A3B Q5_K - Medium |  23.02 GiB |    34.66 B | SYCL       |  99 |    8192 |     4096 |   1 |          pp6963 |       1738.13 ± 0.62 |
| qwen35moe 35B.A3B Q5_K - Medium |  23.02 GiB |    34.66 B | SYCL       |  99 |    8192 |     4096 |   1 |         pp14563 |       1536.87 ± 1.36 |
| qwen35moe 35B.A3B Q5_K - Medium |  23.02 GiB |    34.66 B | SYCL       |  99 |    8192 |     4096 |   1 |         pp29713 |       1207.88 ± 0.73 |
| qwen35moe 35B.A3B Q5_K - Medium |  23.02 GiB |    34.66 B | SYCL       |  99 |    8192 |     4096 |   1 |         pp61341 |        827.47 ± 0.01 |
| qwen35moe 35B.A3B Q5_K - Medium |  23.02 GiB |    34.66 B | SYCL       |  99 |    8192 |     4096 |   1 |        pp129325 |        488.29 ± 0.18 |

build: 0b98ca1b4 (48)
