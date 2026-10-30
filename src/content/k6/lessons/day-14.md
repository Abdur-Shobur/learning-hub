# Day 14 — Test Lifecycle

k6 lifecycle:

```text
Init
 ↓
setup()
 ↓
VU Code
 ↓
teardown()
```

Official lifecycle-এ init, optional `setup()`, VU execution এবং optional `teardown()` stages আছে।

Example:

```javascript
export function setup() {
  return {
    token: 'example',
  };
}

export default function (data) {
  console.log(data.token);
}

export function teardown(data) {
  console.log('Test completed');
}
```

### Week 2 Project

Test করুন:

```text
Login
↓
Profile
↓
Product List
↓
Product Details
```

Requirements:

```text
20 users
2 minutes
p95 < 500ms
errors < 1%
```
