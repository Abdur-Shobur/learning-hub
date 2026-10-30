# Day 29 — CI/CD + Automated Performance Gate

Target architecture:

```text
Developer
   │
   ▼
Git Push
   │
   ▼
GitHub Actions
   │
   ▼
Deploy Staging
   │
   ▼
k6 Smoke Test
   │
   ├── PASS → Continue
   │
   └── FAIL → Pipeline Fail
```

Threshold:

```javascript
export const options = {
  thresholds: {

    http_req_failed: [
      'rate<0.01'
    ],

    http_req_duration: [
      'p(95)<500'
    ],

  },
};
```

এটাই performance gate।
