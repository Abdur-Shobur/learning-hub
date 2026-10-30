# Day 3 — k6 Install + First Test

k6 Windows, Linux, macOS, Docker এবং standalone binary দিয়ে চালানো যায়।

### Windows

Winget:

```powershell
winget install k6 --source winget
```

Chocolatey:

```powershell
choco install k6
```

Check:

```bash
k6 version
```

### Ubuntu

```bash
sudo apt-get update
sudo apt-get install k6
```

### Docker

```bash
docker pull grafana/k6
```

### First script

`first-test.js`

```javascript
import http from 'k6/http';

export default function () {
  http.get('https://test.k6.io');
}
```

Run:

```bash
k6 run first-test.js
```

k6-এর standard run syntax `k6 run script.js`।

### Practice

তিনটি GET endpoint call করুন।
