# Day 20 — Load Test

Expected normal traffic simulate করুন।

ধরুন production expected:

```text
100 concurrent users
```

Test:

```text
0 → 50 users
50 → 100 users
100 users hold
100 → 0
```

Example:

```javascript
stages: [
  { duration: '1m', target: 50 },
  { duration: '1m', target: 100 },
  { duration: '5m', target: 100 },
  { duration: '1m', target: 0 },
]
```

Analyse:

```text
RPS
p95
p99
Error Rate
CPU
RAM
DB
```
