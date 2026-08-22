---
icon: server
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

# Proxy JSON-RPC Node

### `POST` `/api/public/rpc/{chainId}`

Proxies standard JSON-RPC 2.0 requests (such as `eth_sendRawTransaction`, `eth_blockNumber`, `eth_getTransactionReceipt`, `eth_call`) directly to underlying blockchain nodes with automated upstream health checks, rate distribution, and multi-node fallback rotation.

---

### Request Details

* **Method:** `POST`
* **Path:** `/api/public/rpc/{chainId}`
* **Authentication:** Required (`Bearer <API_KEY>` or `x-api-key: <API_KEY>`)
* **Required Scope:** `read`
* **Compute Cost:** `1 CU`

---

### Path Parameters

| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `chainId` | string | **Required** | EVM Chain ID (e.g. `5042002` for Arc Testnet, `84532` for Base Sepolia, `421614` for Arbitrum Sepolia, `1` for Ethereum Mainnet, or `solana`). |

---

### Request Parameters (JSON Body)

| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `jsonrpc` | string | **Required** | JSON-RPC specification version (must be `"2.0"`). |
| `method` | string | **Required** | Standard RPC method name (e.g. `eth_blockNumber`, `eth_sendRawTransaction`, `eth_getBalance`). |
| `params` | array | **Required** | Parameters list required by the specified RPC method. |
| `id` | integer | **Required** | Client request identifier echo. |

---

### Request Body Example

```json
{
  "jsonrpc": "2.0",
  "method": "eth_blockNumber",
  "params": [],
  "id": 1
}
```

---

### Response Example (`200 OK`)

```json
{
  "jsonrpc": "2.0", // JSON-RPC specification version
  "id": 1, // Request identifier echo
  "result": "0x119ffe47" // Hexadecimal block number response
}
```

---

### Code Examples

#### cURL (Query Block Number)
```bash
curl -X POST "https://www.tower.exchange/api/public/rpc/5042002" \
  -H "Authorization: Bearer sk_live_********************" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "eth_blockNumber",
    "params": [],
    "id": 1
  }'
```

#### cURL (Broadcast Signed Raw Transaction)
```bash
curl -X POST "https://www.tower.exchange/api/public/rpc/5042002" \
  -H "Authorization: Bearer sk_live_********************" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "eth_sendRawTransaction",
    "params": ["0x02f873018203e8843b9aca008502540be400825208942de8906a641d65d490bc..."],
    "id": 1
  }'
```

#### JavaScript (Fetch)
```javascript
const response = await fetch("https://www.tower.exchange/api/public/rpc/5042002", {
  method: "POST",
  headers: {
    "Authorization": "Bearer sk_live_********************",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    jsonrpc: "2.0",
    method: "eth_blockNumber",
    params: [],
    id: 1
  })
});
const rpcResult = await response.json();
console.log("Current Block Number (hex):", rpcResult.result);
```

---

### Error Responses

| Status Code | Description | Example Payload |
| :--- | :--- | :--- |
| **`400 Bad Request`** | Unsupported `chainId` or invalid JSON-RPC payload structure. | `{"jsonrpc": "2.0", "id": 1, "error": {"code": -32600, "message": "Invalid Request"}}` |
| **`401 Unauthorized`** | Missing or invalid Developer API key. | `{"success": false, "error": "Invalid API key"}` |
| **`429 Too Many Requests`** | Rate limit quota exceeded. | `{"success": false, "error": "Rate limit exceeded"}` |
| **`502 Bad Gateway`** | Upstream blockchain RPC node failed to respond. | `{"success": false, "error": "Failed to reach upstream RPC endpoint"}` |
