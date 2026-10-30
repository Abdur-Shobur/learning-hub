# Day 10 — JSON Response Parsing

API:

```json
{
  "user": {
    "id": 25
  },
  "token": "abc123"
}
```

k6:

```javascript
const body = response.json();

console.log(body.token);
```

অথবা:

```javascript
const token = response.json('token');
```

Check:

```javascript
check(response, {
  'token returned': (r) => r.json('token') !== undefined,
});
```
