# Day 23 — Multiple User Behaviours

সব user checkout করবে না।

Realistic model:

```text
60% → Browse

20% → Search

12% → Add Cart

6% → Checkout

2% → Purchase
```

Example:

```javascript
const behaviour = Math.random();

if (behaviour < 0.60) {

  browse();

} else if (behaviour < 0.80) {

  search();

} else if (behaviour < 0.92) {

  addToCart();

} else {

  checkout();

}
```
