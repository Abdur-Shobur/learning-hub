# Day 30 — Final Real-World Project

এটাই আপনার Final Exam.

Project:

```text
Frontend
   ↓
REST API
   ↓
Database
   ↓
Redis
```

আপনি k6 দিয়ে test করবেন।

### Scenario 1 — Browsing

```text
100 users
Product listing
Product details
Search
```

### Scenario 2 — Authentication

```text
50 users
Login
Profile
```

### Scenario 3 — Cart

```text
30 users
Add Cart
Update Cart
Remove Cart
```

### Scenario 4 — Checkout

```text
10 users
Checkout
Order
```

## Final Project Structure

আমি এই structure recommend করি:

```text
k6-performance-testing/
│
├── tests/
│   ├── smoke.js
│   ├── load.js
│   ├── stress.js
│   ├── spike.js
│   └── soak.js
│
├── scenarios/
│   ├── auth.js
│   ├── products.js
│   ├── cart.js
│   └── checkout.js
│
├── helpers/
│   ├── auth.js
│   └── utils.js
│
├── data/
│   ├── users.json
│   └── products.json
│
├── config/
│   └── thresholds.js
│
├── docker-compose.yml
│
└── README.md
```

## Final Load Model

```text
                    Users
                      │
          ┌───────────┴──────────┐
          │                      │
       Browse                  Login
        60%                     20%
          │                      │
          ├──── Search           │
          │                      │
       Product                  Profile
          │
       Add Cart
         12%
          │
       Checkout
          6%
          │
       Purchase
          2%
```

## Final Thresholds

শুরুতে realistic target হিসেবে practice project-এ ধরতে পারেন:

```javascript
export const options = {

  thresholds: {

    http_req_failed: [
      'rate<0.01'
    ],

    http_req_duration: [
      'p(90)<300',
      'p(95)<500',
      'p(99)<1000',
    ],

    checks: [
      'rate>0.99'
    ],

  },

};
```

এগুলো universal production requirement নয়। আপনার actual SLO/SLA অনুযায়ী thresholds নির্ধারণ করবেন। k6 thresholds মূলত SLO-type pass/fail criteria codify করার জন্যই ব্যবহার করা হয়।
