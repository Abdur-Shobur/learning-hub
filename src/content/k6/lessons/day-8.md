# Day 8 — GET API Testing

Structure করুন:

```text
k6-project/
│
├── tests/
│   └── products.js
│
├── config/
│
└── data/
```

Test:

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = 'https://api.example.com';

export default function () {
  const res = http.get(`${BASE_URL}/products`);

  check(res, {
    'products loaded': (r) => r.status === 200,
  });

  sleep(1);
}
```
