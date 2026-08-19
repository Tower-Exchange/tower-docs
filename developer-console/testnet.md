---
icon: flask
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

# Testnet & Faucet

### Testing and Sandbox Development

Tower provides a full testnet environment that mirrors the mainnet REST API architecture.

---

### Environment Endpoints

| Environment | Base URL | Network / Chain ID | Notes |
| :--- | :--- | :--- | :--- |
| **Testnet Gateway** | `https://tower-devapi.up.railway.app/api/public` | Arc Testnet (`5042002`) | Live testing & staging sandbox. |
| **Production Mainnet** | `https://www.tower.exchange/api/public` | Arc Mainnet | Real asset settlements. |

You can use the same API key on testnet as you do on mainnet. Testnet transactions execute entirely on the Arc Testnet and do not consume real-world capital.

---

### Getting Testnet Tokens (Faucet)

To test swap quotes, transaction execution, and wallet balances:

1. Navigate to the official Tower Faucet at [tower.exchange/faucet](https://tower.exchange/faucet).
2. Connect your Web3 wallet or enter your Arc wallet address.
3. Request testnet **USDC**, **EURC**, and native gas tokens.
4. Tokens are credited to your address within seconds.

---

### Key Arc Testnet Token Contracts

| Token Symbol | Asset Name | Decimals | Smart Contract Address |
| :--- | :--- | :--- | :--- |
| **USDC** | USD Coin (Gas Token) | 6 | `0x3600000000000000000000000000000000000000` |
| **EURC** | Euro Coin | 6 | `0x89B50855Aa3bE2F677cD6303Cec089B5F319D72a` |

---

### Switching Environments in Code

To toggle between Testnet and Mainnet, simply update your base URL initialization:

```typescript
// Testnet Client
const testnetClient = new TowerClient(
  process.env.TOWER_API_KEY!,
  "https://tower-devapi.up.railway.app/api/public"
);

// Production Mainnet Client
const mainnetClient = new TowerClient(
  process.env.TOWER_API_KEY!,
  "https://www.tower.exchange/api/public"
);
```
