---
icon: user-shield
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

# Security

### Tower's approach to keeping user funds safe.

#### Non-Custodial by Design

Tower Exchange is fully non-custodial. At no point does Tower hold, control, or have access to user funds. Every transaction is signed client-side through the user's own wallet. Private keys never touch Tower's servers.

#### Wallet Security

Tower integrates wallet connections through RainbowKit, a robust and widely adopted wallet connection solution. This integration supports a wide range of wallet types, including hardware wallets (Ledger) for users who require maximum security.

#### Code Security

Tower has completed manual code reviews of its smart contract and platform code. Smart contract audits by third-party security firms are planned and will be completed before mainnet launch.



User funds are always under the user's control. Tower is a routing and aggregation layer, it identifies the best way to trade and routes swaps through optimal paths, but actual execution is always initiated and approved by the user through their own wallet.
