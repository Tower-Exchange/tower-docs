---
icon: wallet
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

# Get Wallet Balance

### `POST` `/api/public/wallet/balance`

Query the on-chain token balance (ERC-20 / SPL) or native gas asset balance for any wallet address across supported EVM networks and Solana.

---

### Request Details

* **Method:** `POST`
* **Path:** `/api/public/wallet/balance`
* **Authentication:** Required (`Bearer <API_KEY>` or `x-api-key: <API_KEY>`)
* **Required Scope:** `read`
* **Compute Cost:** `1 CU`

---

### Request Parameters (JSON Body)

| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `address` | string | **Required** | Target wallet address (`0x` EVM address or base58 Solana address). |
| `chainId` | string | **Required** | Network identifier (e.g. `arc-testnet`, `base-sepolia`, `arbitrum-sepolia`, `solana`). |
| `rpcUrl` | string | **Required** | Blockchain RPC node endpoint used to query on-chain state. |
| `tokenAddress` | string | Optional | Smart contract address of the token. Ignored if `balanceType` is `native`. |
| `balanceType` | string | Optional | Query mode: `token` (default, checks ERC-20 / SPL) or `native` (checks native gas balance). |

---

### Request Body Example

```json
{
  "address": "0xa54FFd258815Ee711bA0d3Dbb7fA786AEA6095Fb",
  "chainId": "arc-testnet",
  "rpcUrl": "https://rpc.testnet.arc.network",
  "tokenAddress": "0x3600000000000000000000000000000000000000",
  "balanceType": "token"
}
```

---

### Response Example (`200 OK`)

```json
{
  "balance": "100.500000" // Human-readable token balance normalized with asset decimal precision
}
```

---

### Code Examples

#### cURL
```bash
curl -X POST "https://tower-devapi.up.railway.app/api/public/wallet/balance" \
  -H "Authorization: Bearer sk_live_********************" \
  -H "Content-Type: application/json" \
  -d '{
    "address": "0xa54FFd258815Ee711bA0d3Dbb7fA786AEA6095Fb",
    "chainId": "arc-testnet",
    "rpcUrl": "https://rpc.testnet.arc.network",
    "tokenAddress": "0x3600000000000000000000000000000000000000",
    "balanceType": "token"
  }'
```

#### JavaScript (Fetch)
```javascript
const response = await fetch("https://tower-devapi.up.railway.app/api/public/wallet/balance", {
  method: "POST",
  headers: {
    "Authorization": "Bearer sk_live_********************",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    address: "0xa54FFd258815Ee711bA0d3Dbb7fA786AEA6095Fb",
    chainId: "arc-testnet",
    rpcUrl: "https://rpc.testnet.arc.network",
    tokenAddress: "0x3600000000000000000000000000000000000000",
    balanceType: "token"
  })
});
const balanceData = await response.json();
console.log("Balance:", balanceData.balance);
```

---

### Error Responses

| Status Code | Description | Example Payload |
| :--- | :--- | :--- |
| **`400 Bad Request`** | Missing `address`, `chainId`, or `rpcUrl`. | `{"success": false, "error": "Missing required field: address"}` |
| **`401 Unauthorized`** | Missing or invalid Developer API key. | `{"success": false, "error": "Invalid API key"}` |
| **`429 Too Many Requests`** | Rate limit quota exceeded. | `{"success": false, "error": "Rate limit exceeded"}` |
