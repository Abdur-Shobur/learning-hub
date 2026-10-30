# Day 13 — Groups & Tags

Complex test organize করুন।

```javascript
import { group } from 'k6';

export default function () {

  group('Authentication', () => {
    // login
  });

  group('Products', () => {
    // product APIs
  });

  group('Checkout', () => {
    // checkout APIs
  });
}
```

Groups request/user actions organize করতে সাহায্য করে এবং tags results filter করতে কাজে লাগে।

Tags:

```javascript
http.get(`${BASE_URL}/products`, {
  tags: {
    endpoint: 'products',
  },
});
```
