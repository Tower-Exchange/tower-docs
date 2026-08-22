---
icon: box-archive
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

# SDKs & Helper Clients

### Client Libraries and Wrapper Classes

Official SDKs for TypeScript and Python are under active development. You can easily integrate Tower APIs directly into your software using the reusable client wrappers below.

---

### JavaScript / TypeScript Client

```typescript
export class TowerClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string, baseUrl: string = "https://www.tower.exchange/api/public") {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      "Authorization": `Bearer ${this.apiKey}`,
      "Content-Type": "application/json",
      ...(options.headers || {})
    };

    const response = await fetch(url, { ...options, headers });
    const data = await response.json();

    if (!response.ok || data.success === false) {
      const errorMsg = data.error || `HTTP Error ${response.status}`;
      throw new Error(`Tower API Error [${response.status}]: ${errorMsg}`);
    }

    return data;
  }

  // 1. Market Data
  async getPrices() {
    return this.request("/prices", { method: "GET" });
  }

  // 2. Wallet Indexer
  async getWalletBalance(params: {
    address: string;
    chainId: string;
    rpcUrl: string;
    tokenAddress?: string;
    balanceType?: "token" | "native";
  }) {
    return this.request("/wallet/balance", {
      method: "POST",
      body: JSON.stringify(params)
    });
  }

  // 3. Swap Engine
  async getSwapDexes() {
    return this.request("/swap/dexes", { method: "GET" });
  }

  async getSwapQuote(params: {
    inputToken: string;
    outputToken: string;
    inputAmount: string;
    slippageTolerance?: number;
    dexId?: string;
  }) {
    return this.request("/swap/quote", {
      method: "POST",
      body: JSON.stringify(params)
    });
  }

  async buildSwapTransaction(quote: any, userAddress: string) {
    return this.request("/swap/build-tx", {
      method: "POST",
      body: JSON.stringify({ quote, userAddress })
    });
  }

  // Helper high-level swap workflow
  async swap(params: {
    inputToken: string;
    outputToken: string;
    inputAmount: string;
    userAddress: string;
    slippageTolerance?: number;
  }) {
    const quoteRes: any = await this.getSwapQuote({
      inputToken: params.inputToken,
      outputToken: params.outputToken,
      inputAmount: params.inputAmount,
      slippageTolerance: params.slippageTolerance ?? 50
    });

    const txRes: any = await this.buildSwapTransaction(quoteRes.data, params.userAddress);
    return {
      quote: quoteRes.data,
      transactions: txRes.data
    };
  }

  // 4. RPC Node Proxy
  async proxyRpc(chainId: string | number, payload: { jsonrpc: string; method: string; params: any[]; id: number }) {
    return this.request(`/rpc/${chainId}`, {
      method: "POST",
      body: JSON.stringify(payload)
    });
  }

  // 5. Cross-Chain Bridge
  async initiateBridge(params: {
    fromChainId: number;
    toChainId: number;
    amount: string;
    token: string;
    recipientAddress: string;
    senderAddress?: string;
    useForwarder?: boolean;
  }) {
    return this.request("/bridge", {
      method: "POST",
      body: JSON.stringify(params)
    });
  }
}
```

#### Usage Example:
```typescript
async function run() {
  const tower = new TowerClient("sk_live_********************");
  
  // Fetch real-time market prices
  const prices = await tower.getPrices();
  console.log("Prices:", prices);

  // Quote and build swap calldata
  const result = await tower.swap({
    inputToken: "USDC",
    outputToken: "EURC",
    inputAmount: "100000000",
    userAddress: "0xa54FFd258815Ee711bA0d3Dbb7fA786AEA6095Fb"
  });

  console.log("Optimal DEX:", result.quote.dexName);
  console.log("Swap Target:", result.transactions.swap.to);
  console.log("Swap Calldata:", result.transactions.swap.data);
}

run().catch(console.error);
```

---

### Python Helper Class

```python
import requests

class TowerClient:
    def __init__(self, api_key: str, base_url: str = "https://www.tower.exchange/api/public"):
        self.api_key = api_key
        self.base_url = base_url

    def _request(self, endpoint: str, method: str = "GET", payload: dict = None):
        url = f"{self.base_url}{endpoint}"
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        response = requests.request(method, url, headers=headers, json=payload)
        data = response.json()
        
        if not response.ok or not data.get("success", True):
            error_msg = data.get("error", f"HTTP Error {response.status_code}")
            raise Exception(f"Tower API Error [{response.status_code}]: {error_msg}")
            
        return data

    def get_prices(self):
        return self._request("/prices", method="GET")

    def get_wallet_balance(self, address: str, chain_id: str, rpc_url: str, token_address: str = None, balance_type: str = "token"):
        payload = {
            "address": address,
            "chainId": chain_id,
            "rpcUrl": rpc_url,
            "tokenAddress": token_address,
            "balanceType": balance_type
        }
        return self._request("/wallet/balance", method="POST", payload=payload)

    def get_swap_quote(self, input_token: str, output_token: str, input_amount: str, slippage_tolerance: int = 50, dex_id: str = None):
        payload = {
            "inputToken": input_token,
            "outputToken": output_token,
            "inputAmount": input_amount,
            "slippageTolerance": slippage_tolerance
        }
        if dex_id:
            payload["dexId"] = dex_id
        return self._request("/swap/quote", method="POST", payload=payload)

    def build_swap_transaction(self, quote: dict, user_address: str):
        payload = {
            "quote": quote,
            "userAddress": user_address
        }
        return self._request("/swap/build-tx", method="POST", payload=payload)
```
