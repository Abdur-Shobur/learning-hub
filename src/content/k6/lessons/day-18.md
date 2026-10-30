# Day 18 — Arrival Rate Testing

এখন VUs না, request/work rate দিয়ে load model করবেন।

Example target:

```text
100 iterations/sec
```

```javascript
export const options = {
  scenarios: {
    api_load: {
      executor: 'constant-arrival-rate',

      rate: 100,
      timeUnit: '1s',

      duration: '1m',

      preAllocatedVUs: 50,
      maxVUs: 200,
    },
  },
};
```

এখানে লক্ষ্য:

```text
প্রতি second প্রায় 100 iterations start করা
```

এটি অনেক API workload-এর জন্য VU-only modelling-এর চেয়ে useful হতে পারে।
