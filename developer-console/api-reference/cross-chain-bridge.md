---
icon: bridge
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

# Cross-Chain Bridge

### `POST` `/api/public/bridge`

Executes 1:1 cross-chain USDC token transfers across connected EVM networks and Solana using **Circle Cross-Chain Transfer Protocol (CCTP)** and Circle BridgeKit.

---

### Request Details

* **Method:** `POST`
* **Path:** `/api/public/bridge`
* **Authentication:** Required (`Bearer <API_KEY>` or `x-api-key: <API_KEY>`)
* **Required Scope:** `bridges`
* **Compute Cost:** `5 CU`

---

### Request Parameters (JSON Body)

| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `fromChainId` | integer | **Required** | Source blockchain network chain ID (e.g. `5042002` for Arc Testnet). |
| `toChainId` | integer | **Required** | Destination blockchain network chain ID (e.g. `84532` for Base Sepolia). |
| `amount` | string | **Required** | Decimal-formatted transfer amount (e.g. `"10.00"`). |
| `token` | string | **Required** | Token symbol to bridge (must be `"USDC"`). |
| `recipientAddress` | string | **Required** | Destination wallet address receiving the bridged tokens. |
| `senderAddress` | string | Optional | Source wallet address sending the transaction. |
| `useForwarder` | boolean | Optional | Use Circle CCTP forwarder contract for destination gas abstraction (default `true`). |

---

### Request Body Example

```json
{
  "fromChainId": 5042002,
  "toChainId": 84532,
  "amount": "10.00",
  "token": "USDC",
  "recipientAddress": "0xa54FFd258815Ee711bA0d3Dbb7fA786AEA6095Fb",
  "senderAddress": "0xa54FFd258815Ee711bA0d3Dbb7fA786AEA6095Fb",
  "useForwarder": true
}
```

---

### Response Example (`200 OK`)

```json
{
  "success": true, // Operation status indicator
  "transactionHash": "0x4e66c9f7a8b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7", // Source chain transaction hash
  "status": "pending", // Bridge settlement lifecycle status
  "estimatedTime": "2-5 minutes" // Expected duration until funds mint on destination chain
}
```

---

### Code Examples

#### cURL
```bash
curl -X POST "https://www.tower.exchange/api/public/bridge" \
  -H "Authorization: Bearer sk_live_********************" \
  -H "Content-Type: application/json" \
  -d '{
    "fromChainId": 5042002,
    "toChainId": 84532,
    "amount": "10.00",
    "token": "USDC",
    "recipientAddress": "0xa54FFd258815Ee711bA0d3Dbb7fA786AEA6095Fb",
    "senderAddress": "0xa54FFd258815Ee711bA0d3Dbb7fA786AEA6095Fb",
    "useForwarder": true
  }'
```

#### JavaScript (Fetch)
```javascript
const response = await fetch("https://www.tower.exchange/api/public/bridge", {
  method: "POST",
  headers: {
    "Authorization": "Bearer sk_live_********************",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    fromChainId: 5042002,
    toChainId: 84532,
    amount: "10.00",
    token: "USDC",
    recipientAddress: "0xa54FFd258815Ee711bA0d3Dbb7fA786AEA6095Fb",
    senderAddress: "0xa54FFd258815Ee711bA0d3Dbb7fA786AEA6095Fb",
    useForwarder: true
  })
});
const bridgeResult = await response.json();
console.log("Bridge TX Hash:", bridgeResult.transactionHash);
```

---

### Error Responses

| Status Code | Description | Example Payload |
| :--- | :--- | :--- |
| **`400 Bad Request`** | Missing required parameters, unsupported chain, or unsupported token. | `{"success": false, "error": "Token must be USDC for CCTP bridge"}` |
| **`401 Unauthorized`** | Missing or invalid Developer API key. | `{"success": false, "error": "Invalid API key"}` |
| **`403 Forbidden`** | API key lacks the `bridges` scope. | `{"success": false, "error": "Scope 'bridges' is required"}` |
| **`429 Too Many Requests`** | Rate limit quota exceeded. | `{"success": false, "error": "Rate limit exceeded"}` |
| **`500 Internal Server Error`**| Circle BridgeKit execution failure on node. | `{"success": false, "error": "Internal bridge execution failure"}` |
