---
icon: gauge
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

# Rate Limits & Compute Units

### API Quotas, Compute Unit Costs, and Backoff Strategies

Tower enforces rate limits based on **Compute Units (CU)** consumed per minute and monthly quotas to ensure high availability and fair platform utilization.

---

### Plan Tiers & Quotas

| Plan Tier | Rate Limit (Req / Min) | Monthly Compute Units | Burst Capacity |
| :--- | :--- | :--- | :--- |
| **Developer (Free)** | 60 req / min | 100,000 CU | 10 req / sec |
| **Growth (Paid)** | 600 req / min | 2,000,000 CU | 50 req / sec |
| **Enterprise (Custom)** | Custom | Dedicated Node Pool | Custom |

---

### Compute Unit (CU) Costs by Endpoint

| Endpoint | Method | Compute Cost | Scope Required |
| :--- | :--- | :--- | :--- |
| `/api/public/prices` | `GET` | **1 CU** | `read` |
| `/api/public/wallet/balance` | `POST` | **1 CU** | `read` |
| `/api/public/swap/dexes` | `GET` | **1 CU** | `read` |
| `/api/public/swap/quote` | `POST` | **2 CU** | `swaps` |
| `/api/public/swap/build-tx` | `POST` | **3 CU** | `swaps` |
| `/api/public/rpc/{chainId}` | `POST` | **1 CU** | `read` |
| `/api/public/bridge` | `POST` | **5 CU** | `bridges` |

---

### Rate Limit Response Headers

Every HTTP response from Tower Developer APIs includes standard rate limit headers:

* `X-RateLimit-Limit`: Maximum requests permitted within the active 60-second rolling window.
* `X-RateLimit-Remaining`: Number of requests remaining in the current window.
* `Retry-After`: Seconds to wait before retrying when an HTTP `429 Too Many Requests` is returned.

---

### Handling 429 Responses with Exponential Backoff

When your application hits rate limits (`HTTP 429`), implement exponential backoff with jitter to retry gracefully.

#### JavaScript / TypeScript

```javascript
async function fetchWithRetry(url, options, maxRetries = 4, baseDelayMs = 500) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const response = await fetch(url, options);

    if (response.status !== 429) {
      return response;
    }

    const retryAfter = response.headers.get("Retry-After");
    const delay = retryAfter 
      ? parseInt(retryAfter, 10) * 1000 
      : baseDelayMs * Math.pow(2, attempt);

    console.warn(`Rate limit hit (429). Retrying in ${delay}ms...`);
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  throw new Error("Max retries exceeded for rate-limited endpoint.");
}
```

#### Python

```python
import time
import requests

def request_with_retry(method, url, headers=None, json=None, max_retries=4, base_delay=0.5):
    for attempt in range(max_retries):
        response = requests.request(method, url, headers=headers, json=json)
        
        if response.status_code != 429:
            return response
            
        retry_after = response.headers.get("Retry-After")
        delay = float(retry_after) if retry_after else base_delay * (2 ** attempt)
        
        print(f"Rate limit hit (429). Retrying in {delay}s...")
        time.sleep(delay)
        
    raise Exception("Max retries exceeded for rate-limited endpoint.")
```
