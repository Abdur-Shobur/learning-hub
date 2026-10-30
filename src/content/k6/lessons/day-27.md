# Day 27 — Grafana + Prometheus

Architecture:

```text
        k6
         │
         ▼
    Prometheus
         │
         ▼
      Grafana
         │
         ▼
     Dashboard
```

k6 results external time-series system-এ stream করা যায়; official outputs-এর মধ্যে Prometheus, Grafana Cloud Prometheus, JSON, CSV, InfluxDB ইত্যাদি রয়েছে।

Dashboard:

```text
Request Rate

Response Time

p95

p99

Errors

Active VUs

Iterations
```

এর পাশাপাশি server:

```text
CPU
RAM
Disk
Network
Database
Redis
```
