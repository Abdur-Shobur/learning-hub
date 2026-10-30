# Day 9 — POST Request

```javascript
import http from 'k6/http';
import { check } from 'k6';

export default function () {

  const payload = JSON.stringify({
    email: 'test@example.com',
    password: 'password123',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(
    'https://api.example.com/login',
    payload,
    params
  );

  check(res, {
    'login success': (r) => r.status === 200,
  });
}
```

শিখুন:

```text
GET
POST
PUT
PATCH
DELETE
```
