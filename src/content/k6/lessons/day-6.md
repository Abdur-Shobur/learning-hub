# Day 6 — Checks

Checks functional validation করে।

```javascript
import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const response = http.get('https://test.k6.io');

  check(response, {
    'status is 200': (r) => r.status === 200,
  });
}
```

Multiple:

```javascript
check(response, {
  'status 200': (r) => r.status === 200,
  'body exists': (r) => r.body.length > 0,
  'under 500ms': (r) => r.timings.duration < 500,
});
```

### মনে রাখবেন

```text
Check fail
≠
Automatically entire test fail
```

Test pass/fail policy-এর জন্য Threshold ব্যবহার করবেন।
