---
icon: down-up
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

# What is a Swap

A swap is the most fundamental action in DeFi, trading one token for another. When swapping on a decentralized exchange, users are not placing an order on an order book (like on a centralized exchange). Instead, the trade happens against a **liquidity pool**: a smart contract that holds reserves of two tokens and uses a mathematical formula to determine the exchange rate.

#### How It Works On-Chain

When a swap is initiated on Tower:

1. **The user signs a transaction** through their wallet. This transaction contains the instructions for the swap: which tokens, how much, the route, and the minimum acceptable output.
2. **The transaction is broadcast** to the Arc blockchain network.
3. **Validators confirm** the transaction and execute the swap logic in the smart contract.
4. **The tokens are transferred:** input tokens go into the pool, and output tokens are sent to the user's wallet. This happens atomically (all or nothing).

The entire process happens in seconds on Arc, at minimal transaction cost.

