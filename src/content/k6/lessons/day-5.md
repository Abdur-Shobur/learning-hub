# Day 5 — k6 Metrics বুঝুন

k6 automatically built-in metrics collect করে এবং metrics broadly Counter, Gauge, Rate ও Trend ধরনের হতে পারে।

সবচেয়ে গুরুত্বপূর্ণ:

```text
http_reqs
http_req_duration
http_req_failed
iteration_duration
iterations
vus
vus_max
```

Request timing:

```text
http_req_blocked
http_req_connecting
http_req_tls_handshaking
http_req_sending
http_req_waiting
http_req_receiving
```

### সবচেয়ে গুরুত্বপূর্ণ

```text
http_req_duration
```

এবং:

```text
p(90)
p(95)
p(99)
```

ধরুন:

```text
avg = 200ms
p95 = 900ms
p99 = 2500ms
```

Average ভালো মনে হলেও কিছু user খুব slow response পাচ্ছে।

### Practice

একটি test run করে লিখুন:

```text
Requests:
Average:
p90:
p95:
Error rate:
```
