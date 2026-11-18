---
icon: shield-check
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

# Audits

Tower Exchange is committed to delivering a secure, non-custodial decentralized trading experience. All core smart contracts, aggregation routers, and execution adapters undergo rigorous third-party security audits and automated vulnerability scanning prior to and throughout mainnet deployment.

{% hint style="info" %}
Security audit reports and invariant testing evaluations are published here as they are completed. Independent auditors evaluate contracts on testnets and Arc mainnet.
{% endhint %}

## Protocol

The table below lists the third-party security assessments, automated exploit analyses, and remediation reviews completed for the Tower Exchange protocol contracts.

| Auditor | Date | Engagement | Report |
| :--- | :--- | :--- | :--- |
| Olympix | Nov 18, 2026 | Olympix BugPocer Report (Security Assessment) | [Report](/assets/Olympix%20BugPocer%20Report.pdf) |
| Olympix | Nov 18, 2026 | Tower-Exchange-Olympix-Remediation-Report | [Report](/assets/Tower-Exchange-Olympix-Remediation-Report.pdf) |

### Engagement Summaries

#### Olympix BugPoCer Scan Report
Automated end-to-end vulnerability scanning and verifiable Proof-of-Concept (PoC) exploit generation conducted by Olympix. Using Olympix's agentic AI framework and multi-engine Intermediate Representation (IR) toolchain, the assessment validated router security assumptions, invariant properties, and token transfer mechanics.

#### Tower Exchange Olympix Remediation Report
Comprehensive source-code remediation, Arc mainnet deployment, and post-deployment validation executed in direct response to the initial Olympix contract findings. This includes hardening of `TowerSwapExecutorV2` and the deployment of venue-specific hardened adapters (`KyberSwapAdapterV2`, `UniswapAdapterV2`, `DZapAdapterV2`).

