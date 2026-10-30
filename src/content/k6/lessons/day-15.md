# Day 15 — Scenarios

Basic:

```javascript
vus: 100,
duration: '5m'
```

এর চেয়ে professional approach:

```javascript
export const options = {
  scenarios: {
    browsing_users: {
      executor: 'constant-vus',
      vus: 20,
      duration: '1m',
    },
  },
};
```

Scenarios দিয়ে আলাদা traffic pattern এবং আলাদা test function model করা যায়।
