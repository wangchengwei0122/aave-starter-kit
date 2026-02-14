# Dashboard Spec

## Status

`TODO`

## Feature Scope

### Must Do

- Build Dashboard page skeleton layout.
- Render four required metric blocks:
  - Net Worth
  - Supplied
  - Borrowed
  - Health Factor
- Connect each block to approved data-source pipeline contract (SDK adapter / contract read).
- Keep implementation composition-focused (page orchestration only).

### Out of Scope

- Charts, history, pnl analytics, or transaction lists.
- Supply/Borrow interaction flows.
- Advanced risk simulation.

### Explicitly Forbidden

- Hardcoded metric values (including temporary numbers).
- Formula implementation in page/component layer.
- Any non-AAVE data provider.

---

## Data Sources

- Source Policy: AAVE Official SDK + AAVE Pool contract reads are the only allowed data sources.

### SDK Adapter

- Provider: `BLOCKED` (official SDK adapter wiring not integrated yet in current repo).
- Required fields:
  - user net worth
  - total supplied
  - total borrowed
  - health factor

### Contract Reads

- Pool/DataProvider reads: `BLOCKED` until `packages/web3` contract adapter is created.
- Allowed usage mode after integration:
  - read via `packages/web3` exported adapters only
  - no direct contract call in page file

### Fallback Policy

- If SDK adapter and contract adapter are unavailable, feature remains `BLOCKED`.
- Do not ship mocked financial values as fallback.

### Blockers

1. `packages/web3` package not created yet.
2. AAVE SDK adapter module not implemented yet.
3. Dashboard data contract (typed return shape) not finalized.

---

## Allowed UI Components

Only components exported from `packages/ui` App layer are allowed.

Recommended for this feature:

- `AppCard`
- `AppCardHeader`
- `AppCardTitle`
- `AppCardContent`
- `AppText`
- `AppBadge` (optional for Health Factor state)
- `AppSkeleton` (if App-layer wrapper exists; otherwise BLOCKED for loading placeholder)

Rules:

- Prefer imports from `@workspace/ui/components/app`.
- No direct primitive imports from `packages/ui/src/components/*` in page code.
- Styling must remain token-based.

---

## Forbidden Patterns

- No hardcoded numbers for Net Worth/Supplied/Borrowed/Health Factor.
- No APY/Health Factor/Ray/LTV formulas in `apps/web` page/component files.
- No mocked protocol metrics in production path.
- No ABI/address constants inside page or UI component files.
- No direct wagmi/viem read/write calls inside Dashboard page.

---

## Definition of Done

1. Dashboard skeleton renders the four required blocks.
2. Each block is wired to SDK adapter or contract adapter interface (or clearly marked `BLOCKED`).
3. UI is composed only with `App*` components from `packages/ui`.
4. No formula logic exists in page/UI layer.
5. No hardcoded financial values exist in render path.
6. Blocked reasons and next steps are explicitly documented.
