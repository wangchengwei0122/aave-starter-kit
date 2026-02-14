# DATA_SOURCES.md — Protocol Data Source Policy

## 1. Source of Truth

This project allows only the following DeFi data sources:

1. **AAVE Official SDK** (primary source)
2. **AAVE Pool contracts** (supplementary source via adapters)

Hard constraints:

- No page-level hardcoded financial numbers.
- No mock protocol data in production paths.
- No guessed formulas or inferred values without official source backing.

---

## 2. Data Ownership

Data responsibilities by layer:

1. **`apps/web`**
- Consume prepared data only.
- Compose UI and interaction flows.
- Must not own protocol math or raw contract metadata.

2. **`packages/web3`**
- Own SDK client wiring and contract adapters.
- Own protocol read access and normalized raw data mapping.
- Expose typed APIs/hooks for app consumption.

3. **`packages/domain`** (future canonical math layer)
- Own pure financial computations only.
- No React/UI concerns.
- No direct SDK/contract I/O side effects.

4. **`packages/ui`**
- Presentation only.
- No wagmi/viem/SDK calls.
- No protocol calculations.

---

## 3. Contract Metadata Rules

1. ABI and contract addresses must be centralized in `packages/web3` metadata modules.
2. Page files and UI components must not contain address literals.
3. No inline ABI fragments in app/page/component files.
4. Consumers must use exported adapter interfaces, not ad-hoc contract definitions.

---

## 4. Units & Precision

Canonical unit rules:

1. **Ray = `1e27`**
2. **Wad = `1e18`**

Precision rules:

1. All bigint formatting/parsing must go through shared utility wrappers.
2. No scattered manual `Number(...)` conversion for protocol balances/rates.
3. Unit conversion behavior must be deterministic and reusable across features.

---

## 5. Blocked State Policy

If SDK/adapter data source is not integrated yet:

1. The related feature spec must be marked **`BLOCKED`**.
2. Temporary hardcoded financial values are forbidden.
3. Implementation must stop at blocked state documentation, not fake data fallback.
4. Next action must explicitly identify required SDK/adapter integration work.
