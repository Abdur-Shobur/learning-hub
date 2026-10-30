# Day 24 — Test Data

এক user দিয়ে 500 users simulate করবেন না।

Data:

```json
[
  {
    "email": "user1@example.com",
    "password": "password"
  },
  {
    "email": "user2@example.com",
    "password": "password"
  }
]
```

Random:

```javascript
const user =
  users[Math.floor(Math.random() * users.length)];
```

শিখবেন:

```text
Unique users
Unique products
Dynamic IDs
Random data
CSV/JSON data
```
