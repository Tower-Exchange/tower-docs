---
icon: bridge
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

# Bridging

Bridging allows users to transfer tokens from one blockchain to another. Instead of withdrawing assets to a centralized exchange and redepositing on a different chain, bridging handles the transfer directly on-chain faster, cheaper, and without giving up custody of funds.

Tower integrates bridging directly into the trading interface, so users can move assets across supported chains seamlessly from the same platform they use to swap.

<figure><img src="../.gitbook/assets/Screenshot 2026-04-17 144846.png" alt="" width="563"><figcaption></figcaption></figure>

#### How It Works

To bridge tokens, users select:

* **Source chain:** The blockchain where the tokens currently reside
* **Token: The** asset being bridged.
* **Amount** of the token that is to be bridge.
* **Destination chain:** The blockchain where the tokens should be sent to.

<figure><img src="../.gitbook/assets/Screenshot 2026-04-17 150021.png" alt=""><figcaption></figcaption></figure>

Once the parameters are set, Tower handles the cross-chain transfer. The process involves locking or burning the tokens on the source chain and minting or releasing equivalent tokens on the destination chain. Users simply confirm the transaction through their wallet.

{% hint style="info" %}
Bridging times and fees vary depending on the source and destination chains.
{% endhint %}
