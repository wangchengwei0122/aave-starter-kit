# OUTLINE — AAVE Web Interface Replica (Route B)

## 0. Purpose

- Build an interview-grade replica of the AAVE V3 web interface (read-first → then tx flows).
- Data source: AAVE official SDK + contracts (no formula guessing).
- Architecture must follow AGENT.md + STRUCTURE.md.

---

## 1. Target Pages (Web)

### P1 Dashboard (Portfolio Overview)

- Summary cards: Net Worth / Supplied / Borrowed / Health Factor
- Positions lists (supplied & borrowed assets)
- Basic wallet connect entry

### P2 Supply Markets

- Market table: asset, supply APY, total supplied, liquidity, wallet balance
- Asset action entry: Supply

### P3 Borrow Markets

- Market table: asset, borrow APY (stable/variable if available), total borrowed, available to borrow
- Asset action entry: Borrow

### P4 Asset Detail

- Reserve overview: rates, caps, collateral parameters
- User position: supplied/borrowed amounts, collateral enabled
- Actions: Supply / Withdraw / Borrow / Repay

### P5 Transaction Flows (Phase 2+)

- Supply flow
- Withdraw flow
- Borrow flow
- Repay flow
- UI states: pending, success, fail, reject

---

## 2. Core Modules / Layers

### M1 UI System (`packages/ui`)

- Use App\* components only (token-driven).
- Dashboard blocks / tables / modals are composed via App\*.

### M2 Web3 / SDK Layer (`packages/web3`)

- AaveProvider wrapper + SDK client init
- Read-only adapters/hooks:
  - markets/reserves list
  - user positions
  - per-asset reserve details
- Centralized addresses/abis registry (no literals in pages)

### M3 Domain Layer (`packages/domain`)

- Only when needed for presentation correctness:
  - ray/wad conversions
  - formatting helpers (bigint normalization)
  - risk metrics aggregation (if SDK doesn’t provide)
- Pure functions only + unit tests

### M4 Specs (`specs/`)

- One spec per page/feature.
- Specs define: scope, data source, UI components, DoD.

---

## 3. Data Source Contract (Route B)

- Source of truth: AAVE SDK (and official contracts if necessary).
- Pages must not call SDK directly — they consume exported hooks from `packages/web3`.
- No hardcoded APY/HF/LTV numbers in pages.

---

## 4. Delivery Strategy (Incremental)

Phase 0: Foundation + P0 docs + first spec  
Phase 1: Web3 skeleton + AaveProvider + first read-only hook  
Phase 2: Dashboard skeleton (static → wired)  
Phase 3: Markets pages skeleton (static → wired)  
Phase 4: Asset detail (static → wired)  
Phase 5: Domain math + tests (only when needed)  
Phase 6: Tx flows

---

## 5. Definition of Done (Interview-Ready)

- AAVE-like layout + theme
- Read-only data works for main pages
- Layer boundaries clean
- Specs + TODO-driven development history (small commits)
