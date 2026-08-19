---
icon: triangle-exclamation
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

# Errors & Troubleshooting

### Standard Error Payloads and Resolution Strategies

Tower APIs return standard JSON payloads whenever a request fails or cannot be processed.

---

### Standard Error Schema

```json
{
  "success": false,
  "error": "Error message describing the failure condition",
  "status": 400
}
```

---

### Common Error Codes & Troubleshooting

| Error Code | HTTP Status | Root Cause | Resolution |
| :--- | :--- | :--- | :--- |
| `INVALID_API_KEY` | `401 Unauthorized` | Missing, invalid, expired, or revoked Developer API key. | Check that your key starts with `sk_live_` or `sk_test_` and is passed in `Authorization: Bearer <key>` or `x-api-key`. |
| `SCOPE_FORBIDDEN` | `403 Forbidden` | The API key lacks the required permission scope (e.g. `swaps`, `bridges`). | Regenerate or update your API key in the Developer Console to grant the required scope. |
| `INSUFFICIENT_LIQUIDITY` | `404 Not Found` | The requested trade volume exceeds total pool reserves across all Arc DEXes. | Decrease `inputAmount` or split the order into smaller increments over time. |
| `NO_ROUTE_FOUND` | `404 Not Found` | No liquidity pool or multi-hop path exists between the chosen token pair. | Verify that both tokens are active on Arc and have supported liquidity pools. |
| `SLIPPAGE_EXCEEDED` | `400 Bad Request` | Market price moved beyond configured `slippageTolerance` between quote and build steps. | Request a fresh quote or increase `slippageTolerance` (e.g. from 50 to 100 bps). |
| `QUOTE_EXPIRED` | `400 Bad Request` | The quote validity window elapsed before transaction broadcast. | Quotes are time-sensitive. Wrap swap executions in retry logic to fetch a fresh quote if execution takes longer than 60s. |
| `INVALID_TOKEN` | `400 Bad Request` | Supplied token ticker or contract address is unsupported or malformed. | Verify token contract addresses on Arc Testnet (e.g. USDC `0x3600...0000`, EURC `0x89B5...D72a`). |
| `UNSUPPORTED_CHAIN` | `400 Bad Request` | The supplied `chainId` is unrecognized by the RPC proxy or bridge service. | Use valid chain identifiers like `5042002` (Arc Testnet) or `84532` (Base Sepolia). |
| `RATE_LIMIT_EXCEEDED` | `429 Too Many Requests` | Request frequency or monthly compute unit quota exceeded. | Implement exponential backoff and adhere to the `Retry-After` header. |
| `WALLET_NOT_FOUND` | `400 Bad Request` | Malformed wallet address format or invalid checksum. | Verify that wallet address is a valid 42-character hexadecimal EVM address or base58 Solana address. |
| `UPSTREAM_ERROR` | `502 Bad Gateway` | Upstream blockchain RPC node or external price feed failed to respond. | Retry the request after a short interval; Tower's gateway automatically rotates fallback nodes. |

---

### HTTP Status Code Summary

* **`200 OK`**: The request succeeded and the response contains the requested data.
* **`400 Bad Request`**: Missing required parameters, invalid JSON syntax, or unsupported tokens/chains.
* **`401 Unauthorized`**: Authentication failed due to a missing or invalid API key.
* **`403 Forbidden`**: Valid API key provided, but lacks the necessary scope permissions.
* **`404 Not Found`**: Resource, route, or liquidity pair could not be located.
* **`429 Too Many Requests`**: Rate limit exceeded for your tier.
* **`500 Internal Server Error`**: An unexpected server-side execution failure occurred.
* **`502 Bad Gateway`**: Upstream blockchain node or indexing RPC was unreachable.
