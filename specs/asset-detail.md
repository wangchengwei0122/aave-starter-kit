# Asset Detail Spec

## Status

`TODO`

## Feature Scope

### Must Do

- Build Asset Detail page skeleton layout (`/reserve-overview/[assetId]`).
- Render Reserve Overview block:
  - Total Supplied, APY, Supply Cap
  - Total Borrowed, APY, Borrow Cap
  - Collateral parameters (Max LTV, Liquidation threshold, Liquidation penalty)
- Render User Info block (if wallet connected):
  - Supplied balance
  - Borrowed balance
  - Collateral usage toggle
- Provide UI Action buttons entry points:
  - Supply, Withdraw, Borrow, Repay
- Connect values to the approved data-source pipeline (`packages/web3` hooks).

### Out of Scope

- Historical APY/Rate charts.
- Actual Transaction Execution flows (Supply/Borrow/Repay modals) — these belong to Phase 7.
- Cross-chain asset switching on this specific page.

### Explicitly Forbidden

- Hardcoded reserve metrics or APYs.
- Formula implementation in page/component layer (e.g., ray math, LTV calculation).
- Fetching directly via wagmi/viem inside the page component.

---

## Data Sources

- Source Policy: AAVE Official SDK + AAVE Pool contract reads are the only allowed data sources.

### SDK Adapter

- Required Hook: `useReserveDetail(assetId)` from `@workspace/web3` (To be implemented).
- Required fields for Reserve:
  - Asset symbol, name, icon, underlying token address
  - Supply APY, Total Supplied, Supply Cap
  - Borrow APY (Variable/Stable), Total Borrowed, Borrow Cap
  - Collateral metrics (LTV, Liquidation Threshold, Bonus)
- Required Hook: `useUserReserve(assetId)` from `@workspace/web3` (To be implemented).
- Required fields for User:
  - Underlying balance, Supplied balance, Borrowed balance, usageAsCollateralEnabled.

### Contract Reads

- Read via `packages/web3` exported adapters only. No direct contract calls in page file.

### Fallback Policy

- If a specific metric is not available in the SDK result, display `—` or skeleton.
- Do not ship mocked financial values as fallback for production.

---

## Allowed UI Components

Only components exported from `packages/ui` App layer are allowed.

Recommended for this feature:

- `AppCard`, `AppCardHeader`, `AppCardTitle`, `AppCardContent`
- `AppText`, `AppTokenIcon`
- `AppButton` (for Supply/Borrow/Repay actions)
- `AppSkeleton` (for loading state)
- `AppBadge`
- `AppTabs` (optional, if split into Overview/Information)
- `AppSwitch` (for collateral toggle display)

Rules:

- Prefer imports from `@workspace/ui/components/app`.
- No direct primitive imports from shadcn in page code.
- Styling must use semantic design tokens.

---

## Forbidden Patterns

- No hardcoded numbers for metrics.
- No APY/Health Factor/Ray/LTV formatting formulas in `apps/web` components.
- No mocked protocol metrics.
- No ABI/address literals inside page or UI component files.

---

## Definition of Done

1. Asset Detail page `/reserve-overview/[assetId]` skeleton renders the required blocks.
2. The page is wired to `useReserveDetail` and `useUserReserve` hooks.
3. UI is composed entirely of `App*` components.
4. No formula logic exists in the page/layer.
5. No hardcoded financial values exist in the render path.
