# Day 25 — Custom Metrics

k6 custom metrics types:

```text
Counter
Gauge
Rate
Trend
```

Example:

```javascript
import { Trend } from 'k6/metrics';

const loginDuration =
  new Trend('login_duration');

export default function () {

  const res = http.post(...);

  loginDuration.add(
    res.timings.duration
  );
}
```

Threshold:

```javascript
thresholds: {
  login_duration: [
    'p(95)<500'
  ],
}
```
