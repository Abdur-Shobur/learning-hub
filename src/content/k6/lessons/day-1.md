# Day 1 — Performance Testing Fundamentals

আজ coding না করে concept বুঝবেন।

### শিখবেন

* Performance Testing কী
* Load Testing কী
* Stress Testing কী
* Spike Testing কী
* Soak Testing কী
* Smoke Testing কী
* Scalability কী
* Bottleneck কী

### Example

ধরুন আপনার API:

```text
GET /api/products
```

Normal traffic:

```text
20 requests/sec
```

Campaign launch হলে:

```text
500 requests/sec
```

প্রশ্ন হচ্ছে:

```text
Server কি 500 RPS নিতে পারবে?

Response time কত হবে?

Database slow হবে?

Error আসবে?

CPU/RAM কত বাড়বে?
```

### আজকের গুরুত্বপূর্ণ terms

```text
VU = Virtual User
RPS = Requests Per Second
Latency = Delay
Response Time = Request complete হতে সময়
Throughput = System কত কাজ process করছে
Error Rate = কত % request fail করছে
p95 = 95% request এই সময়ের মধ্যে complete
p99 = 99% request এই সময়ের মধ্যে complete
```

### Practice

নিজের ভাষায় লিখুন:

```text
Load Test:
Stress Test:
Spike Test:
Soak Test:
```
