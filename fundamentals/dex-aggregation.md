---
icon: arrow-progress
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

# DEX Aggregation

When multiple DEXs exist on a blockchain, liquidity gets fragmented. Each DEX has its own set of pools with its own liquidity. Token A might be cheap on DEX 1 but expensive on DEX 2. Without aggregation, users have to manually check each exchange and most don't bother, settling for whatever price their default DEX offers.

This is the exact problem Tower solves on Arc.

#### How Tower Aggregates

Tower's aggregation layer connects directly to the smart contracts of every DEX on Arc. It continuously fetches:

* **Real-time pricing** from every pool
* **Liquidity depth** (how much is available before significant price impact)
* **Pool states** (active, paused, or low liquidity)

#### The User Experience

From the user's perspective, aggregation is invisible. There is one swap interface, one quote, one button. Behind the scenes, Tower has compared every possible option and surfaces the best one. Users never need to think about which DEX to use.
