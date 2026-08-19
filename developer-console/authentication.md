---
icon: key
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

# Authentication

### Authenticating API Requests to Tower Developer APIs

Tower Console uses API keys to authenticate and authorize all developer API requests. Every request to the public endpoints must include a valid secret key.

---

### Obtaining Your API Key

1. Create a developer account at [Tower Developer Console](https://tower-devapi.up.railway.app/signup).
2. Sign in and navigate to the **API Keys** section in your dashboard.
3. Click **Generate New Key** and select the appropriate environment and permission scopes (`quotes`, `swaps`, `bridges`, `read`).
4. Copy the generated secret key. API keys follow the format:
   * **Live Keys:** `sk_live_<hex>` (e.g. `sk_live_********************`)
   * **Test Keys:** `sk_test_<hex>` (e.g. `sk_test_********************`)

{% hint style="warning" %}
**Keep your secret key secure:** Never expose your API key in client-side code repositories, public websites, or version control. Always store API keys in environment variables on your backend servers.
{% endhint %}

---

### Passing the API Key

You can authenticate requests using either of the following HTTP headers:

#### Option 1: Bearer Token (Standard Authorization Header)
```http
Authorization: Bearer sk_live_********************
```

#### Option 2: Custom API Key Header
```http
x-api-key: sk_live_********************
```

All API communication requires **HTTPS**. The server automatically rejects unencrypted HTTP requests.

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
    "Authorization": "Bearer sk_live_********************",
    "Content-Type": "application/json"
  }
});

const data = await response.json();
console.log(data);
```

#### Python (Requests)
```python
import requests

headers = {
    "Authorization": "Bearer sk_live_********************",
    "Content-Type": "application/json"
}

response = requests.get("https://tower-devapi.up.railway.app/api/public/prices", headers=headers)
print(response.json())
```

---

### API Key Scopes

Some endpoints require specific permission scopes attached to your API key:

| Scope | Description | Associated Endpoints |
| :--- | :--- | :--- |
| `read` | Allows querying general market data, router lists, and public states. | `GET /prices`, `GET /swap/dexes` |
| `swaps` | Allows computing swap routes and building swap calldata. | `POST /swap/quote`, `POST /swap/build-tx` |
| `bridges` | Allows initiating Circle CCTP cross-chain bridge transfers. | `POST /bridge` |

If an endpoint is accessed without the required scope, the API returns an HTTP `403 Forbidden` response:
```json
{
  "success": false,
  "error": "Scope 'swaps' is required for this endpoint. Granted scopes: quotes, read."
}
```
