# Transaction Flows Spec

## Status

`TODO`

## Feature Scope

### Must Do

- Build UI Modal skeletons for core interactions:
  - Supply Modal
  - Withdraw Modal
  - Borrow Modal
  - Repay Modal
- Integrate modals into existing buttons (e.g., Asset Detail page actions).
- Implement Web3 transaction adapters (e.g., `useSupplyTx`, `useBorrowTx`) to interact with Aave Pool contracts.
- Handle and display UI transaction states:
  - Idle (input amount)
  - Pending approval (if ERC20 allowance needed)
  - Pending Tx confirmation
  - Success / Fail

### Out of Scope

- E-Mode transactions.
- Permit/EIP-712 offline signatures (standard approve + tx is sufficient).
- Advanced repay with collateral flows.

### Explicitly Forbidden

- Hardcoding contract addresses in UI files.
- Simulating fake transactions in production.
- Direct ethers.js/viem contract writes in standard UI components (must go through `packages/web3` adapter hooks).

---

## Data Sources

- Source Type: AAVE Pool Contract writes via Wagmi / viem.

### SDK Adapter

- We will utilize `wagmi` hooks (`useWriteContract`, `useSimulateContract`) wrapped inside custom hooks in `@workspace/web3` (e.g., `useSupplyReserve`).
- Aave Pool ABI will be used.

### Contract Reads / Writes

- Target Contract: Aave V3 Pool (address maintained in constants).
- Action methods: `supply`, `borrow`, `withdraw`, `repay`.
- Target Contract: ERC20 tokens (for `approve` calls).

### Fallback Policy

- If wallet is not connected, the Modal should prompt user to connect wallet or immediately close.
- If network is incorrect, Wagmi handles switching.

### Blockers

- Need an Ethereum wallet connection (Phase 6/7 preamble) before writes can actually be tested on an active network (e.g., testnet or mainnet fork).

---

## Allowed UI Components

Only components exported from `packages/ui` App layer are allowed.

- `AppDialog`, `AppDialogContent`, `AppDialogHeader`, `AppDialogTitle`
- `AppButton`
- `AppInput` (for token amount)
- `AppText`
- `AppAlert` (for errors or warnings during tx)

---

## Forbidden Patterns

- No direct primitive imports from `packages/ui/src/components/*` in page code.
- No raw Tailwind colors for states (Success/Error must use semantic tokens like `bg-success`, `text-destructive`).

---

## Definition of Done

1. Supply, Borrow, Withdraw, and Repay modals exist.
2. Users can input an amount and trigger the appropriate transaction flow.
3. ERC-20 Approval sequence is handled for Supply/Repay.
4. Transaction states (pending, success) are visually represented.
5. `packages/web3` exposes the cleanly wrapped transaction hooks.
