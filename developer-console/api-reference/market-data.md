---
icon: chart-line
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
  actions:
    visible: true
---

# Fetch Token Prices

### `GET` `/api/public/prices`

Get real-time spot market exchange rates in USD for supported stablecoins (**USDC**, **EURC**, **USDT**) aggregated from reliable market feeds.

---

### Request Details

* **Method:** `GET`
* **Path:** `/api/public/prices`
* **Authentication:** Required (`Bearer <API_KEY>` or `x-api-key: <API_KEY>`)
* **Required Scope:** `read`
* **Compute Cost:** `1 CU`

---

### Query / Request Parameters

This endpoint requires no query parameters or request body payload.

---

### Response Headers

| Header | Type | Description |
| :--- | :--- | :--- |
| `X-RateLimit-Limit` | integer | Total permitted requests in the active 60-second window. |
| `X-RateLimit-Remaining` | integer | Number of remaining requests in the active window. |

---

### Response Example (`200 OK`)

```json
{
  "usd-coin": {
    "usd": 1.0 // USDC spot price in USD
  },
  "eurc": {
    "usd": 1.082 // EURC spot price in USD
  },
  "tether": {
    "usd": 1.001 // USDT spot price in USD
  }
}
```

#### Response Schema

| Property | Type | Description |
| :--- | :--- | :--- |
| `usd-coin.usd` | number | Real-time spot price of USD Coin in USD. |
| `eurc.usd` | number | Real-time spot price of Euro Coin in USD. |
| `tether.usd` | number | Real-time spot price of Tether in USD. |

---

### Code Examples

#### cURL
```bash
curl -X GET "https://tower-devapi.up.railway.app/api/public/prices" \
  -H "Authorization: Bearer sk_live_********************"
```

#### JavaScript (Fetch)
```javascript
const response = await fetch("https://tower-devapi.up.railway.app/api/public/prices", {
  method: "GET",
  headers: {
    "Authorization": "Bearer sk_live_********************"
  }
});
const prices = await response.json();
console.log(prices);
```

#### Python (Requests)
```python
import requests

headers = {
    "Authorization": "Bearer sk_live_********************"
}
response = requests.get("https://tower-devapi.up.railway.app/api/public/prices", headers=headers)
print(response.json())
```

---

### Error Responses

| Status Code | Description | Example Payload |
| :--- | :--- | :--- |
| **`401 Unauthorized`** | Missing, invalid, or revoked Developer API key. | `{"success": false, "error": "Invalid API key"}` |
| **`429 Too Many Requests`** | Rate limit quota exceeded. | `{"success": false, "error": "Rate limit exceeded"}` |
| **`502 Bad Gateway`** | Upstream pricing feed failed to respond. | `{"success": false, "error": "Failed to reach upstream pricing feed"}` |
