---
icon: rocket
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

# Developer Quickstart

### Execute Your First Swap in 5 Minutes

This guide walks you through executing a swap of **100 USDC to EURC** on the Arc network using the Tower Developer REST APIs.

---

### Step 1: Request a Swap Quote

Send a `POST` request to `/api/public/swap/quote` with the input asset, output asset, input amount, and slippage tolerance. 

{% hint style="info" %}
**Atomic Base Units:** Token amounts must be supplied in base atomic integer units. Because USDC uses 6 decimals on Arc, 100 USDC equals `100000000` (i.e. $100 \times 10^6$).
{% endhint %}

---

### Step 2: Build the Swap Transaction Payload

Take the `quote` object returned in Step 1 and pass it alongside your wallet address to `POST /api/public/swap/build-tx`. 

Tower constructs the exact ABI-encoded transaction calldata for:
1. **ERC-20 Approval** (`data.approval`): Required if your wallet has not yet approved the `TowerSwapExecutor` contract to spend the input token. If already approved, this field is `null`.
2. **Swap Execution** (`data.swap`): The atomic swap transaction targeting the `TowerSwapExecutor` contract (`to`, `data`, `value`, `gasLimit`, `chainId`).

---

### Step 3: Sign and Broadcast the Transaction

Your application signs the transaction payload using your private key or Web3 provider (such as Ethers.js, Viem, or RainbowKit) and broadcasts it to the Arc network through the RPC Proxy `/api/public/rpc/5042002` or directly to an Arc RPC node.

---

### Complete Code Samples

#### cURL

```bash
# Step 1: Request Quote for 100 USDC to EURC
curl -X POST "https://www.tower.exchange/api/public/swap/quote" \
  -H "Authorization: Bearer sk_live_********************" \
  -H "Content-Type: application/json" \
  -d '{
    "inputToken": "USDC",
    "outputToken": "EURC",
    "inputAmount": "100000000",
    "slippageTolerance": 50
  }'

# Step 2: Build the unsigned transaction payload
curl -X POST "https://www.tower.exchange/api/public/swap/build-tx" \
  -H "Authorization: Bearer sk_live_********************" \
  -H "Content-Type: application/json" \
  -d '{
    "quote": {
      "inputToken": "0x3600000000000000000000000000000000000000",
      "outputToken": "0x89B50855Aa3bE2F677cD6303Cec089B5F319D72a",
      "inputAmount": "100000000",
      "outputAmount": "92450000000000000000",
      "minOut": "91987750000000000000",
      "priceImpact": 0.02,
      "feeBps": 25,
      "dexId": "tower-dex"
    },
    "userAddress": "0xa54FFd258815Ee711bA0d3Dbb7fA786AEA6095Fb"
  }'

# Step 3: Broadcast signed raw transaction via RPC Proxy
curl -X POST "https://www.tower.exchange/api/public/rpc/5042002" \
  -H "Authorization: Bearer sk_live_********************" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "eth_sendRawTransaction",
    "params": ["0x02f873018203e8843b9aca008502540be400825208942de8906a641d65d490bc60a4179d961d59742bcb8084cd6267d5c080a0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f01234a056789abcdef0123456789abcdef0123456789abcdef0123456789abcdef012345"],
    "id": 1
  }'
```

---

#### JavaScript / TypeScript (Fetch)

```javascript
const API_KEY = "sk_live_********************";
const BASE_URL = "https://www.tower.exchange/api/public";
const WALLET_ADDRESS = "0xa54FFd258815Ee711bA0d3Dbb7fA786AEA6095Fb";

async function executeSwap() {
  const headers = {
    "Authorization": `Bearer ${API_KEY}`,
    "Content-Type": "application/json"
  };

  // Step 1: Request a swap quote for 100 USDC to EURC
  const quoteResponse = await fetch(`${BASE_URL}/swap/quote`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      inputToken: "USDC",
      outputToken: "EURC",
      inputAmount: "100000000",
      slippageTolerance: 50
    })
  });

  const quoteResult = await quoteResponse.json();
  if (!quoteResult.success) {
    throw new Error(`Quote failed: ${quoteResult.error}`);
  }

  const quote = quoteResult.data;
  console.log("Expected output:", quote.outputAmount, "units on", quote.dexName);

  // Step 2: Build the unsigned transaction payload
  const buildTxResponse = await fetch(`${BASE_URL}/swap/build-tx`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      quote: quote,
      userAddress: WALLET_ADDRESS
    })
  });

  const txResult = await buildTxResponse.json();
  if (!txResult.success) {
    throw new Error(`Build transaction failed: ${txResult.error}`);
  }

  console.log("Approval payload required:", txResult.data.approval !== null);
  console.log("Swap target contract:", txResult.data.swap.to);
  console.log("Swap execution calldata:", txResult.data.swap.data);
  return txResult.data;
}

executeSwap().catch(console.error);
```

---

#### Python (Requests)

```python
import requests

API_KEY = "sk_live_********************"
BASE_URL = "https://www.tower.exchange/api/public"
WALLET_ADDRESS = "0xa54FFd258815Ee711bA0d3Dbb7fA786AEA6095Fb"

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

# Step 1: Request a swap quote for 100 USDC to EURC
quote_payload = {
    "inputToken": "USDC",
    "outputToken": "EURC",
    "inputAmount": "100000000",
    "slippageTolerance": 50
}

quote_response = requests.post(f"{BASE_URL}/swap/quote", headers=headers, json=quote_payload)
quote_data = quote_response.json()

if not quote_data.get("success"):
    raise Exception(f"Quote failed: {quote_data.get('error')}")

quote = quote_data["data"]
print(f"Optimal DEX: {quote['dexName']}, Expected Output: {quote['outputAmount']}")

# Step 2: Build unsigned transaction payload
build_payload = {
    "quote": quote,
    "userAddress": WALLET_ADDRESS
}

build_response = requests.post(f"{BASE_URL}/swap/build-tx", headers=headers, json=build_payload)
tx_data = build_response.json()

if not tx_data.get("success"):
    raise Exception(f"Build TX failed: {tx_data.get('error')}")

swap_tx = tx_data["data"]["swap"]
print(f"Target Contract: {swap_tx['to']}")
print(f"Calldata: {swap_tx['data']}")
```

---

### Expected Quote Response Shape

Here is an annotated breakdown of the payload returned by `POST /api/public/swap/quote`:

```json
{
  "success": true,
  "data": {
    "inputToken": "0x3600000000000000000000000000000000000000", // Smart contract address of input token (USDC)
    "outputToken": "0x89B50855Aa3bE2F677cD6303Cec089B5F319D72a", // Smart contract address of output token (EURC)
    "inputAmount": "100000000", // Atomic base units spent (100 USDC with 6 decimals)
    "outputAmount": "92450000000000000000", // Expected output in 18-decimal base units (~92.45 EURC)
    "minOut": "91987750000000000000", // Minimum guaranteed payout at 50 bps (0.5%) slippage
    "priceImpact": 0.02, // Estimated percentage price movement relative to pool depth
    "gasEstimate": "200000", // Gas units estimated for on-chain execution
    "feeBps": 25, // Total liquidity provider and protocol fee in basis points (0.25%)
    "platformFeeAmount": "250000000000000", // Protocol fee component in atomic base units
    "dexId": "tower-dex", // Unique identifier of the DEX offering the best price
    "dexName": "Tower", // Display name of the optimal DEX router
    "route": {
      "type": "single", // Routing topology (single hop, multi hop, or split)
      "hops": [
        {
          "dexId": "tower-dex",
          "amountIn": "100000000",
          "amountOut": "92450000000000000000",
          "priceImpact": 0.02
        }
      ]
    },
    "routeOptions": [] // Ranked alternative routes across competing DEXes
  }
}
```
