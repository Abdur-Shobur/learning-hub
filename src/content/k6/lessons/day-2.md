# Day 2 — JavaScript for k6

k6-এর জন্য পুরো JavaScript শেখার দরকার নেই।

শিখুন:

```javascript
const
let

function

if / else

for

array

object

JSON

template literals

import/export
```

### Example

```javascript
const user = {
  email: 'test@example.com',
  password: '123456',
};

console.log(user.email);
```

Array:

```javascript
const products = [1, 2, 3, 4];

for (const product of products) {
  console.log(product);
}
```

Function:

```javascript
function getUser() {
  return {
    id: 1,
    name: 'Test User',
  };
}
```

### Practice

একটি object বানান:

```javascript
const testConfig = {
  users: 10,
  duration: '30s',
  baseUrl: 'https://example.com',
};
```
