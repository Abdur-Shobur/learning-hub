# Day 11 — Authentication

Real-world flow:

```text
Login
 ↓
Get Token
 ↓
Profile
 ↓
Products
```

Example:

```javascript
const loginRes = http.post(
  `${BASE_URL}/login`,
  JSON.stringify({
    email: 'test@example.com',
    password: '123456',
  }),
  {
    headers: {
      'Content-Type': 'application/json',
    },
  }
);

const token = loginRes.json('token');

const params = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

http.get(`${BASE_URL}/profile`, params);
```

### Practice flow

```text
Login
→ Profile
→ Orders
```
