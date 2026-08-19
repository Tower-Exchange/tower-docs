---
icon: arrows-rotate
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

# Swap Engine

### High-Performance DEX Aggregation & Swap Execution

The Tower Swap Engine module unifies liquidity across all decentralized exchanges on the Arc blockchain (including **Synthra**, **UnitFlow**, and **Tower DEX**). It allows you to query active router deployments, compute multi-DEX optimal routes, and generate unsigned transaction payloads for on-chain execution.

---

### Swap Engine Endpoints

The Swap Engine consists of three core endpoints executed in sequence:

| Endpoint | Method | Cost | Description |
| :--- | :--- | :--- | :--- |
| [`/api/public/swap/dexes`](list-dex-routers.md) | `GET` | `1 CU` | List all supported AMM DEX routers and factory deployments. |
| [`/api/public/swap/quote`](get-swap-quote.md) | `POST` | `2 CU` | Compute the optimal routing path, output amount, and price impact. |
| [`/api/public/swap/build-tx`](build-swap-tx.md) | `POST` | `3 CU` | Build unsigned transaction calldata for ERC-20 approval and swap execution. |

---

### Execution Lifecycle

```mermaid
sequenceDiagram
    autonumber
    participant Client as Application / User
    participant SwapEngine as Tower Swap Engine
    participant Blockchain as Arc Blockchain
    
    Client->>SwapEngine: 1. POST /swap/quote (inputToken, outputToken, amount)
    SwapEngine-->>Client: Returns Optimal Route, Expected Output & DEX
    Client->>SwapEngine: 2. POST /swap/build-tx (quote, userAddress)
    SwapEngine-->>Client: Returns ABI Calldata (Approval + Swap)
    Client->>Client: 3. Signs Calldata with Private Key
    Client->>Blockchain: 4. Broadcasts signed transaction on Arc
```

---

### Module Guides

* [List Supported DEX Routers](list-dex-routers.md)
* [Get Optimal Swap Quote](get-swap-quote.md)
* [Build Unsigned Swap Transaction](build-swap-tx.md)
