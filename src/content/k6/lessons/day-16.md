# Day 16 — Executors

এগুলো শিখবেন:

```text
shared-iterations

per-vu-iterations

constant-vus

ramping-vus

constant-arrival-rate

ramping-arrival-rate
```

এগুলোই বর্তমান official scenario executor families।

### Example

```javascript
scenarios: {
  users: {
    executor: 'constant-vus',
    vus: 50,
    duration: '2m',
  },
}
```
