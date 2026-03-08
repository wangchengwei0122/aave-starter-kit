# TODO — Incremental Execution Plan (Derived from OUTLINE)

## Rules

- Execute ONE task per run
- Update TODO status after completion
- No out-of-scope refactors
- If blocked, mark as [!] with reason

---

## Phase 0 — Foundation (Docs + First Spec)

- [x] T0-1 Create DATA_SOURCES.md (Route B truth contract)
- [x] T0-2 Create MIGRATION.md (pre-web3/domain isolation)
- [x] T0-3 Create specs/dashboard.md (Dashboard contract)

---

## Phase 1 — Web3 Skeleton (Route B)

- [x] T1-1 Create `packages/web3` package scaffold (tsconfig/package.json/index.ts)
- [x] T1-2 Add AaveProvider wrapper in `packages/web3` (no page wiring)
- [x] T1-3 Add read-only hook: `useAaveMarkets()` (returns typed minimal view model)
- [x] T1-4 Add read-only hook: `useUserPositions()` placeholder (BLOCKED if wallet not ready)
- [x] T1-5 Add addresses/abis registry placeholder (no literals in pages)

---

## Phase 2 — Dashboard (P1)

- [x] T2-1 Create Dashboard page skeleton layout (App\* only, static)
- [x] T2-2 Add Summary cards components (static placeholders)
- [x] T2-3 Add Positions table block (static)
- [x] T2-4 Wire `useAaveMarkets()` into Dashboard (read-only, no math)
- [x] T2-5 Wire `useUserPositions()` into Dashboard (if available)
- [x] T2-6 Mark HealthFactor card as BLOCKED until domain (if SDK doesn’t provide)

---

## Phase 3 — Supply Markets (P2)

- [x] T3-1 Create Supply Markets page skeleton (static)
- [x] T3-2 Create MarketTable view model mapping (no formulas)
- [x] T3-3 Wire `useAaveMarkets()` to Supply table (read-only)

---

## Phase 4 — Borrow Markets (P3)

- [x] T4-1 Create Borrow Markets page skeleton (static)
- [x] T4-2 Wire `useAaveMarkets()` to Borrow table (read-only)

---

## Phase 5 — Asset Detail (P4)

- [x] T5-1 Create Asset detail route skeleton (static)
- [x] T5-2 Add read-only hook `useReserveDetail(assetId)` (web3 layer)
- [x] T5-3 Wire reserve detail data into page

---

## Phase 6 — Domain Math + Tests (M3)

- [x] T6-1 Add `packages/domain` scaffold (Skipped: using SDK formatters)
- [x] T6-2 Add `ray.ts` conversion helpers (Skipped: using `@aave/math-utils` or GraphQL pre-formatted values)
- [x] T6-3 Add `health-factor.ts` pure function (Skipped: using SDK provided values)

---

## Phase 7 — Transaction Flows (P5)

- [x] T7-1 Add Supply modal skeleton (UI only)
- [x] T7-2 Add Borrow modal skeleton (UI only)
- [x] T7-3 Add Repay/Withdraw modal skeleton (UI only)
- [x] T7-4 Add tx execution adapter (web3 layer) + UI states
