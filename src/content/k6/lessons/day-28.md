# Day 28 — Docker + k6

Docker image:

```bash
docker pull grafana/k6
```

Run:

```bash
docker run --rm -i grafana/k6 run - < script.js
```

Official k6 distribution-এ Docker image supported।

নিজের lab বানান:

```text
docker-compose
│
├── API
├── Database
├── Redis
├── Prometheus
├── Grafana
└── k6
```

এটা performance engineering শেখার জন্য দারুণ project।
