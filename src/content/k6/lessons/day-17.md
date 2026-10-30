# Day 17 — Ramping VUs

Traffic:

```text
0
↓
20
↓
100
↓
200
↓
100
↓
0
```

Script:

```javascript
export const options = {
  scenarios: {
    load_test: {
      executor: 'ramping-vus',

      startVUs: 0,

      stages: [
        { duration: '30s', target: 20 },
        { duration: '1m', target: 100 },
        { duration: '2m', target: 100 },
        { duration: '30s', target: 0 },
      ],
    },
  },
};
```
