# Day 26 — Result Analysis

এটি সবচেয়ে গুরুত্বপূর্ণ দিনগুলোর একটি।

ধরুন:

```text
VUs          200

RPS          500

avg          300ms

p95          850ms

p99          2400ms

error rate   3.5%
```

Questions:

```text
p95 কেন বেড়েছে?

কোন endpoint slow?

CPU কি 100%?

Database connections শেষ?

Slow query আছে?

Redis issue?

Network?

Application worker exhausted?
```

Rule:

```text
k6 বলে:
WHAT happened

Monitoring বলে:
WHY happened
```
