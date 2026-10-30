# Day 4 — VUs, Duration এবং sleep()

```javascript
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
};

export default function () {
  http.get('https://test.k6.io');

  sleep(1);
}
```

এখানে:

```text
vus: 10
```

মানে 10 Virtual Users।

```text
duration: 30s
```

মানে 30 seconds test চলবে।

### `sleep(1)` কেন?

Real user সাধারণত:

```text
Page open
↓
কিছু পড়ে
↓
Next action
```

এক milliseconds-এর মধ্যে একের পর এক click করে না।

এজন্য think time simulate করা হয়।

### Practice

চালান:

```text
1 VU
10 VU
20 VU
50 VU
```

Output compare করুন।
