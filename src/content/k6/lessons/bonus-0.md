# Bonus — k6 Browser Testing

API/protocol testing শেষ করার পরে browser-level performance testing শিখবেন।

বর্তমান k6-এর `k6/browser` module Chromium browser চালিয়ে page interaction এবং frontend performance test করতে পারে।

Basic:

```javascript
import { browser } from 'k6/browser';

export const options = {
  scenarios: {
    browser_test: {
      executor: 'shared-iterations',

      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
};

export default async function () {

  const page = await browser.newPage();

  try {

    await page.goto(
      'https://test.k6.io/'
    );

  } finally {

    await page.close();

  }

}
```

Browser testingটা **Day 30-এর পরে advanced module** হিসেবে নিন।
