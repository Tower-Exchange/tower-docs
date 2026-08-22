---
icon: network-wired
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

# Swap Engine — List Supported DEX Routers

### `GET` `/api/public/swap/dexes`

Returns the active catalog of DEX routers, factory contracts, quoter addresses, and supported tokens connected to the Tower Swap Engine on Arc (e.g. **Synthra**, **UnitFlow**, **Tower DEX**).

---

### Request Details

* **Method:** `GET`
* **Path:** `/api/public/swap/dexes`
* **Authentication:** Required (`Bearer <API_KEY>` or `x-api-key: <API_KEY>`)
* **Required Scope:** `read`
* **Compute Cost:** `1 CU`

---

### Query / Request Parameters

None.

---

### Response Example (`200 OK`)

```json
{
  "success": true,
  "data": [
    {
      "id": "synthra", // Unique router identifier
      "name": "Synthra", // Display name of the decentralized exchange
      "routerAddress": "0xA545bCB1Bd7985c59ea162aB1748A0803434C31b", // Router contract address on Arc
      "factoryAddress": "0x0fB6EEDA6e90E90797083861A75D15752a27f59c", // Factory contract address
      "quoterAddress": "0x3Ce954107b1A675826B33bF23060Dd655e3758fE", // Quoter contract address
      "type": "v3", // AMM protocol architecture
      "chainId": 5042002, // Arc network chain ID
      "enabled": true, // Operational availability status
      "supportedTokens": [
        "0x3600000000000000000000000000000000000000",
        "0x89B50855Aa3bE2F677cD6303Cec089B5F319D72a"
      ]
    },
    {
      "id": "unitflow",
      "name": "UnitFlow",
      "routerAddress": "0x2De8906a641d65d490bC60A4179d961d59742bCb",
      "factoryAddress": "0x1234567890123456789012345678901234567890",
      "quoterAddress": "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
      "type": "v2",
      "chainId": 5042002,
      "enabled": true,
      "supportedTokens": [
        "0x3600000000000000000000000000000000000000",
        "0x89B50855Aa3bE2F677cD6303Cec089B5F319D72a"
      ]
    },
    {
      "id": "tower-dex",
      "name": "Tower DEX",
      "routerAddress": "0x3600000000000000000000000000000000000000",
      "factoryAddress": "0x4567890123456789012345678901234567890123",
      "quoterAddress": "0x7890123456789012345678901234567890123456",
      "type": "v3",
      "chainId": 5042002,
      "enabled": true,
      "supportedTokens": [
        "0x3600000000000000000000000000000000000000",
        "0x89B50855Aa3bE2F677cD6303Cec089B5F319D72a"
      ]
    }
  ]
}
```

---

### Code Examples

#### cURL
```bash
curl -X GET "https://www.tower.exchange/api/public/swap/dexes" \
  -H "Authorization: Bearer sk_live_********************"
```

#### JavaScript (Fetch)
```javascript
const response = await fetch("https://www.tower.exchange/api/public/swap/dexes", {
  method: "GET",
  headers: {
    "Authorization": "Bearer sk_live_********************"
  }
});
const dexes = await response.json();
console.log("Connected DEXes:", dexes.data);
```

---

### Error Responses

| Status Code | Description | Example Payload |
| :--- | :--- | :--- |
| **`401 Unauthorized`** | Missing or invalid Developer API key. | `{"success": false, "error": "Invalid API key"}` |
| **`429 Too Many Requests`** | Rate limit quota exceeded. | `{"success": false, "error": "Rate limit exceeded"}` |
