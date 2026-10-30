# Day 12 — Environment Variables

Hardcode করবেন না:

```javascript
const BASE_URL = 'https://production.com';
```

বরং:

```javascript
const BASE_URL = __ENV.BASE_URL;
```

Run:

```bash
k6 run -e BASE_URL=https://staging.example.com test.js
```

k6 script environment variables `__ENV` object দিয়ে access করতে পারে।

Example:

```javascript
const BASE_URL = __ENV.BASE_URL;
const EMAIL = __ENV.EMAIL;
const PASSWORD = __ENV.PASSWORD;
```
