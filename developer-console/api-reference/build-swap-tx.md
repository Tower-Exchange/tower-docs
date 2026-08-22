---
icon: file-code
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

# Swap Engine — Build Unsigned Swap Transaction

### `POST` `/api/public/swap/build-tx`

Constructs unsigned transaction calldata (`to`, `data`, `value`, `gasLimit`) for ERC-20 token approval and atomic trade execution via the `TowerSwapExecutor` contract on the Arc blockchain.

---

### Request Details

* **Method:** `POST`
* **Path:** `/api/public/swap/build-tx`
* **Authentication:** Required (`Bearer <API_KEY>` or `x-api-key: <API_KEY>`)
* **Required Scope:** `swaps`
* **Compute Cost:** `3 CU`

---

### Request Parameters (JSON Body)

| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `quote` | object | **Required** | The complete quote payload returned from `POST /api/public/swap/quote`. |
| `userAddress` | string | **Required** | The EVM or Arc wallet address executing and signing the swap. |

---

### Request Body Example

```json
{
  "quote": {
    "inputToken": "0x3600000000000000000000000000000000000000",
    "outputToken": "0x89B50855Aa3bE2F677cD6303Cec089B5F319D72a",
    "inputAmount": "100000000",
    "outputAmount": "92450000000000000000",
    "dexId": "tower-dex"
  },
  "userAddress": "0xa54FFd258815Ee711bA0d3Dbb7fA786AEA6095Fb"
}
```

---

### Response Example (`200 OK`)

```json
{
  "success": true,
  "data": {
    "approval": {
      "to": "0x3600000000000000000000000000000000000000", // Token contract being approved
      "data": "0x095ea7b30000000000000000000000002de8906a641d65d490bc60a4179d961d59742bcb0000000000000000000000000000000000000000000000000000000005f5e100", // ERC-20 approve(spender, amount) calldata
      "from": "0xa54FFd258815Ee711bA0d3Dbb7fA786AEA6095Fb", // User wallet address
      "gasLimit": "100000" // Estimated gas limit for approval
    },
    "swap": {
      "to": "0x2De8906a641d65d490bC60A4179d961d59742bCb", // TowerSwapExecutor contract on Arc
      "data": "0xcd6267d50000000000000000000000003600000000000000000000000000000000000000", // Swap calldata
      "value": "0", // Native value in wei (0 for token swaps)
      "from": "0xa54FFd258815Ee711bA0d3Dbb7fA786AEA6095Fb", // User wallet address
      "gasLimit": "500000", // Estimated gas limit for swap execution
      "chainId": 5042002 // Arc network chain ID
    }
  }
}
```

{% hint style="info" %}
**Conditional Approval:** If `data.approval` is `null`, the user's wallet already holds an active token allowance for `TowerSwapExecutor`, meaning your application only needs to sign and broadcast `data.swap`.
{% endhint %}

---

### Code Examples

#### cURL
```bash
curl -X POST "https://www.tower.exchange/api/public/swap/build-tx" \
  -H "Authorization: Bearer sk_live_********************" \
  -H "Content-Type: application/json" \
  -d '{
    "quote": {
      "inputToken": "0x3600000000000000000000000000000000000000",
      "outputToken": "0x89B50855Aa3bE2F677cD6303Cec089B5F319D72a",
      "inputAmount": "100000000",
      "outputAmount": "92450000000000000000",
      "dexId": "tower-dex"
    },
    "userAddress": "0xa54FFd258815Ee711bA0d3Dbb7fA786AEA6095Fb"
  }'
```

#### JavaScript (Fetch)
```javascript
const response = await fetch("https://www.tower.exchange/api/public/swap/build-tx", {
  method: "POST",
  headers: {
    "Authorization": "Bearer sk_live_********************",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    quote: quoteObject,
    userAddress: "0xa54FFd258815Ee711bA0d3Dbb7fA786AEA6095Fb"
  })
});
const txPayload = await response.json();
console.log("Unsigned swap payload:", txPayload.data.swap);
```

---

### Error Responses

| Status Code | Description | Example Payload |
| :--- | :--- | :--- |
| **`400 Bad Request`** | Missing `quote` or `userAddress` in request payload. | `{"success": false, "error": "Missing userAddress"}` |
| **`401 Unauthorized`** | Missing or invalid Developer API key. | `{"success": false, "error": "Invalid API key"}` |
| **`403 Forbidden`** | API key lacks the `swaps` scope. | `{"success": false, "error": "Scope 'swaps' is required"}` |
| **`429 Too Many Requests`** | Rate limit quota exceeded. | `{"success": false, "error": "Rate limit exceeded"}` |
