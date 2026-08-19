---
icon: compass-drafting
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

# Architecture

### System Architecture

Tower Exchange is built as a modular system with six distinct layers:

#### **Aggregation Layer**

The foundation. This layer connects to multiple DEX smart contracts across Arc, continuously fetching liquidity data, pricing information, and pool states. It maintains a real-time picture of all available liquidity in the ecosystem.

#### **Routing Engine**

Sits on top of the aggregation layer. Using the live data, it calculates optimal execution paths by analyzing liquidity depth, slippage impact, gas efficiency, and trade splitting opportunities. It returns the best possible route for each swap.

#### **Blockchain Interaction Layer**

Handles all communication with the Arc blockchain. Tower interacts directly with smart contracts using secure wallet connections. All transactions are signed client-side, ensuring users maintain full custody of their funds. The layer is modular, allowing easy integration with additional DEXs as they launch.

#### **Data Indexing and Processing**

This layer indexes on-chain data including transaction history, token balances, and trade performance. The data is processed, structured, and made available to the AI system for analysis.

#### **AI Intelligence Layer**

The differentiator. Sitting on top of the data and routing systems, this layer provides portfolio analysis, trade explanations, performance insights, and natural language interaction. It translates raw data into clear, human-readable answers.

#### **Frontend and UX**

Built with Next.js, React, and TypeScript. The frontend provides a seamless, responsive experience designed for both beginners and experienced traders. Simplicity is the guiding principle.
