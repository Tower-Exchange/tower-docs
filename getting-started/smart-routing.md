---
description: How Tower finds the best price for every trade.
icon: router
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

# Smart Routing

### Routing on Tower

When swapping Token A for Token B, there might be dozens of possible paths across different DEXs and liquidity pools. A direct A→B swap on one DEX might yield a worse price than going A→C→B across two different DEXs. Without an aggregator, users would never know.

Tower's routing engine evaluates every possible path and selects the one that delivers the most output tokens for the given input.

#### What Tower's Router Analyzes

For every trade, the routing engine considers:

* **Liquidity depth across pools:** Deeper pools mean less price impact. The router favors pools with sufficient liquidity for the given trade size.
* **Slippage impact:** Large trades on shallow pools cause significant price movement. The router calculates the actual slippage for each possible path.
* **Gas efficiency:** More complex routes (multi-hop, multi-pool) cost more gas. The router balances better pricing against higher transaction costs.

<figure><img src="../.gitbook/assets/Screenshot 2026-05-17 134206.png" alt=""><figcaption></figcaption></figure>

All of this happens in milliseconds. A trade is entered, and Tower returns the best price it found.
