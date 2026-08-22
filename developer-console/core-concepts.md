---
icon: lightbulb
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

# Core Concepts

### Fundamental Architecture of Tower Developer APIs

Understanding these core concepts ensures reliable, efficient, and secure integrations with Tower Developer APIs.

---

### 1. Smart Routing Engine

Smart routing is Tower's automated algorithmic engine that simultaneously scans and splits trade volume across all connected decentralized exchanges on Arc (including **Synthra**, **UnitFlow**, and **Tower DEX**).

#### Why Smart Routing Matters:
* **Minimal Price Impact:** Distributes large orders across multiple pools to avoid draining liquidity in any single venue.
* **Best Net Execution:** Evaluates protocol fees, pool depths, and estimated gas costs to guarantee the highest output amount.
* **Single Hop & Multi-Hop Optimization:** Automatically calculates intermediate hops if swapping through an intermediate asset yields a higher return.

---

### 2. Token Addresses vs. Token Symbols

* **Token Symbols:** Human-readable aliases (e.g. `USDC`, `EURC`, `USDT`). You can use standard symbols in swap and quote requests for quick prototyping.
* **Token Contract Addresses:** 42-character hexadecimal identifiers on EVM networks (e.g. `0x3600000000000000000000000000000000000000`).

{% hint style="tip" %}
**Best Practice:** For programmatic settlement, automated trading bots, and balance lookups, **always supply explicit contract addresses** to prevent symbol collisions or ambiguity.
{% endhint %}

---

### 3. Slippage Tolerance & Basis Points

Slippage represents the difference between the quoted price and the executed price on-chain caused by market volatility while your transaction is pending confirmation.

Slippage tolerance is expressed in **basis points (bps)**, where $1\text{ bps} = 0.01\%$:

| Basis Points (bps) | Percentage | Common Usage |
| :--- | :--- | :--- |
| `10` | 0.10% | Institutional size trades, low-volatility stablecoin pairs. |
| `50` | 0.50% | **Standard Default** for most stablecoin swaps on Arc. |
| `100` | 1.00% | High-volatility market conditions or congested networks. |

If market conditions move the return below `minOut` (calculated based on your configured `slippageTolerance`), the smart contract automatically reverts the transaction to protect your funds.

---

### 4. Non-Custodial Transaction Signing

Tower operates on a strictly non-custodial model. Tower provides routing and compiles optimized calldata bytecode, but **never manages or stores user private keys**.

1. When you call `/api/public/swap/build-tx`, Tower computes the optimal route, packs the ABI calldata, and returns the target contract address (`TowerSwapExecutor`), calldata, and gas estimates.
2. Your application or wallet signs the transaction locally using its private key.
3. The signed raw transaction is broadcast to the Arc network via Tower's RPC proxy (`POST /api/public/rpc/{chainId}`) or directly through a blockchain node.

---

### 5. Supported Networks & Cross-Chain CCTP

Tower natively orchestrates swaps and liquidity on the **Arc blockchain** (Arc Mainnet and Arc Testnet `chainId: 5042002`).

For cross-chain USDC bridging via **Circle Cross-Chain Transfer Protocol (CCTP)**, Tower connects Arc with:
* Ethereum Mainnet & Sepolia
* Base & Base Sepolia
* Arbitrum One & Arbitrum Sepolia
* Optimism & Optimism Sepolia
* Avalanche & Avalanche Fuji
* Polygon & Polygon Amoy
* Linea & Linea Sepolia
* Sonic Testnet
* Unichain Sepolia
* Solana Mainnet & Devnet
