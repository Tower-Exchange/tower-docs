---
icon: calculator
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

# Swap Engine — Get Optimal Swap Quote

### `POST` `/api/public/swap/quote`

Queries liquidity across all connected decentralized exchanges on Arc simultaneously to determine the optimal execution route, projected output amount, price impact, and fee structure.

---

### Request Details

* **Method:** `POST`
* **Path:** `/api/public/swap/quote`
* **Authentication:** Required (`Bearer <API_KEY>` or `x-api-key: <API_KEY>`)
* **Required Scope:** `swaps`
* **Compute Cost:** `2 CU`

---

### Request Parameters (JSON Body)

| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `inputToken` | string | **Required** | Symbol or contract address of input token (e.g. `USDC` or `0x3600000000000000000000000000000000000000`). |
| `outputToken` | string | **Required** | Symbol or contract address of desired output token (e.g. `EURC` or `0x89B50855Aa3bE2F677cD6303Cec089B5F319D72a`). |
| `inputAmount` | string | **Required** | Raw input volume in base atomic units (e.g. `100000000` for 100 USDC with 6 decimals). |
| `slippageTolerance` | number | Optional | Maximum acceptable slippage in basis points (default is `50` for 0.5%). |
| `dexId` | string | Optional | Target a specific DEX venue (`synthra`, `unitflow`, or `tower-dex`). Omit to route across all pools for the best price. |

---

### Request Body Example

```json
{
  "inputToken": "USDC",
  "outputToken": "EURC",
  "inputAmount": "100000000",
  "slippageTolerance": 50
}
```

---

### Response Example (`200 OK`)

```json
{
  "success": true,
  "data": {
    "inputToken": "0x3600000000000000000000000000000000000000",
    "outputToken": "0x89B50855Aa3bE2F677cD6303Cec089B5F319D72a",
    "inputAmount": "100000000",
    "outputAmount": "92450000000000000000",
    "minOut": "91987750000000000000",
    "priceImpact": 0.02,
    "gasEstimate": "200000",
    "feeBps": 25,
    "platformFeeAmount": "250000000000000",
    "dexId": "tower-dex",
    "dexName": "Tower",
    "route": {
      "type": "single",
      "hops": [
        {
          "dexId": "tower-dex",
          "amountIn": "100000000",
          "amountOut": "92450000000000000000",
          "priceImpact": 0.02
        }
      ]
    },
    "routeOptions": []
  }
}
```

#### Response Property Definitions

| Field | Type | Description |
| :--- | :--- | :--- |
| `data.inputToken` | string | Smart contract address of the sold asset. |
| `data.outputToken` | string | Smart contract address of the purchased asset. |
| `data.inputAmount` | string | Input volume in base atomic units. |
| `data.outputAmount` | string | Anticipated return in base atomic units (18 decimals for EURC). |
| `data.minOut` | string | Guaranteed floor payout based on configured slippage tolerance. |
| `data.priceImpact` | number | Price impact percentage relative to pool reserves. |
| `data.gasEstimate` | string | Estimated computational gas units for swap execution. |
| `data.feeBps` | number | Total protocol and liquidity provider fee in basis points. |
| `data.dexId` | string | Identifier of the DEX router providing the best execution. |
| `data.dexName` | string | Human-readable name of the selected DEX. |
| `data.route` | object | Details of individual hops and routing topology. |

---

### Code Examples

#### cURL
```bash
curl -X POST "https://www.tower.exchange/api/public/swap/quote" \
  -H "Authorization: Bearer sk_live_********************" \
  -H "Content-Type: application/json" \
  -d '{
    "inputToken": "USDC",
    "outputToken": "EURC",
    "inputAmount": "100000000",
    "slippageTolerance": 50
  }'
```

#### JavaScript (Fetch)
```javascript
const response = await fetch("https://www.tower.exchange/api/public/swap/quote", {
  method: "POST",
  headers: {
    "Authorization": "Bearer sk_live_********************",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    inputToken: "USDC",
    outputToken: "EURC",
    inputAmount: "100000000",
    slippageTolerance: 50
  })
});
const quoteResult = await response.json();
console.log("Optimal Quote:", quoteResult.data);
```

---

### Error Responses

| Status Code | Description | Example Payload |
| :--- | :--- | :--- |
| **`400 Bad Request`** | Missing `inputToken`, `outputToken`, or `inputAmount`. | `{"success": false, "error": "Missing required fields"}` |
| **`401 Unauthorized`** | Missing or invalid Developer API key. | `{"success": false, "error": "Invalid API key"}` |
| **`403 Forbidden`** | API key lacks the `swaps` scope. | `{"success": false, "error": "Scope 'swaps' is required"}` |
| **`404 Not Found`** | No route found or insufficient liquidity for trade size. | `{"success": false, "error": "No valid route found"}` |
| **`429 Too Many Requests`** | Rate limit quota exceeded. | `{"success": false, "error": "Rate limit exceeded"}` |
