# Day 7 — Thresholds

এটি k6-এর সবচেয়ে গুরুত্বপূর্ণ concepts-এর একটি।

Threshold হচ্ছে performance-এর **pass/fail criteria**। Threshold fail হলে test failed status নিয়ে শেষ হতে পারে।

```javascript
export const options = {
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<500'],
  },
};
```

মানে:

```text
Error rate < 1%

95% requests < 500ms
```

আরও:

```javascript
thresholds: {
  checks: ['rate>0.99'],
  http_req_duration: [
    'p(90)<300',
    'p(95)<500',
    'p(99)<1000',
  ],
}
```

### Week 1 Project

বানান:

```text
GET API Load Test
20 VUs
1 minute

Rules:
p95 < 500ms
error < 1%
status = 200
```
