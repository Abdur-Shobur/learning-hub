# Day 22 — Real User Journey

এখন শুধু endpoint test করবেন না।

একজন ecommerce user:

```text
Login
 ↓
Products
 ↓
Search
 ↓
Product Details
 ↓
Add Cart
 ↓
Checkout
 ↓
Order
```

k6:

```javascript
export default function () {

  group('Browse', () => {
    // products
  });

  group('Cart', () => {
    // add cart
  });

  group('Checkout', () => {
    // checkout
  });

}
```
