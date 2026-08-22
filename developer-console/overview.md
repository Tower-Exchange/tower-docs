---
icon: code
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

# Developer Console Overview

### The Developer Platform and REST API for Tower Exchange

Tower Console is the developer platform and REST API for Tower Exchange. It allows you to integrate stablecoin trading, cross-chain transfers, automated recurring orders, wallet indexing, and AI trade execution directly into your decentralized and Web3 applications.

With a single integration point, you connect your software to deep stablecoin liquidity pools across the Arc blockchain ecosystem.

---

### Key Capabilities

* **Multi-DEX Smart Routing:** Query real-time quotes and optimal trade routes across all connected DEXes on Arc (including Synthra, UnitFlow, and Tower DEX) to minimize price impact and slippage.
* **Unsigned Transaction Calldata Construction:** Generate execution-ready transaction payloads (`to`, `data`, `gasLimit`, `value`) for non-custodial wallet signing.
* **Circle CCTP Cross-Chain Transfers:** Trigger programmatic, 1:1 cross-chain USDC transfers between Arc and major EVM networks as well as Solana via Circle Cross-Chain Transfer Protocol.
* **Real-Time Spot Market Data:** Fetch real-time market exchange rates and USD spot prices for supported stablecoins (USDC, EURC, USDT).
* **Multi-Chain Wallet Balance Indexing:** Look up on-chain ERC-20, SPL, and native gas balances for any wallet across supported EVM networks and Solana.
* **High-Availability RPC Node Proxy:** Proxy JSON-RPC requests directly to Arc and connected networks with automatic health check rotation and fallback handling.

---

### Use Cases

* **Corporate Treasury & Institutional Settlement:** Automate stablecoin conversions, payouts, and multi-chain liquidity rebalancing.
* **Payment Gateways & Mobile Apps:** Accept stablecoins and automatically route swaps to target settlement currencies (e.g. USDC to EURC) in seconds.
* **Arbitrage Bots & Market Makers:** Execute programmatic trades and capture liquidity opportunities on Arc DEXes via low-latency REST calls.
* **Autonomous AI Trading Agents:** Empower AI agents with programmatic capabilities to quote, build, and broadcast transactions non-custodially.

---

### Non-Custodial Architecture

{% hint style="info" %}
**Non-Custodial Design:** Tower operates entirely non-custodially. The Tower API never requires or stores private keys. All transaction-building endpoints return unsigned calldata that your application signs locally before broadcasting to the network.
{% endhint %}

---

### API Gateways

Tower provides consistent API endpoints across mainnet and testnet environments:

| Environment | Base URL | Network / Chain ID |
| :--- | :--- | :--- |
| **Mainnet & Testnet** | `https://www.tower.exchange/api/public` | Arc Mainnet & Testnet |

---

### Next Steps

* [Authentication](authentication.md) — Learn how to obtain and pass API keys.
* [Quickstart Guide](quickstart.md) — Execute your first swap quote and transaction build in 5 minutes.
* [Core Concepts](core-concepts.md) — Understand smart routing, slippage, and calldata execution.
* [API Reference](api-reference/market-data.md) — Explore the complete endpoint documentation.
