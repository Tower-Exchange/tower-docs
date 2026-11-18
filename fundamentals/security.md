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

Tower contracts and aggregation routing logic undergo rigorous manual code reviews, automated proof-of-concept testing, and independent third-party audits before and during mainnet deployment.

#### Smart Contract Audits

Independent security reviews and remediation verifications have been conducted by **Olympix**. You can view full vulnerability scans and deployment validation reports on the [Audits](/security/audit) page.

| Auditor | Date | Engagement | Report |
| :--- | :--- | :--- | :--- |
| Olympix | Nov 18, 2026 | Olympix BugPocer Report (Security Assessment) | [Report](/assets/Olympix%20BugPocer%20Report.pdf) |
| Olympix | Nov 18, 2026 | Tower-Exchange-Olympix-Remediation-Report | [Report](/assets/Tower-Exchange-Olympix-Remediation-Report.pdf) |



User funds are always under the user's control. Tower is a routing and aggregation layer, it identifies the best way to trade and routes swaps through optimal paths, but actual execution is always initiated and approved by the user through their own wallet.
