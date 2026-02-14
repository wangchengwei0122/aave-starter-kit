# STRUCTURE.md — Monorepo Target Structure Blueprint

## 1. Goal

Define a scalable directory structure for this AAVE-like frontend so later features can be added without architecture drift.

This file is a practical blueprint.
Policy constraints still come from `AGENT.md`.

---

## 2. Current vs Target

## Current (verified)

- `apps/web`
- `packages/ui`
- `packages/shared`

## Target (recommended)

- `apps/web`
- `packages/ui`
- `packages/web3`
- `packages/domain`
- `packages/config`
- `packages/types`

`packages/shared` should be gradually reduced and eventually retired (or kept extremely thin).

---

## 3. Recommended Tree

```txt
apps/
  web/
    app/
    src/
      components/
      features/
      hooks/
      lib/

packages/
  ui/
    src/
      components/
        app/
      stories/
      styles/
      tokens/

  web3/
    src/
      config/
        chains.ts
        transports.ts
      clients/
        public-client.ts
        wallet-client.ts
      contracts/
        abis/
        addresses/
        registry.ts
      adapters/
        aave/
          reads.ts
          writes.ts
      queries/
      hooks/
      index.ts

  domain/
    src/
      math/
        fixed-point/
          ray.ts
          wad.ts
      risk/
        health-factor.ts
        liquidation-threshold.ts
        ltv.ts
      rates/
        apy.ts
        apr.ts
      positions/
        collateral.ts
        borrow.ts
      types/
      index.ts

  config/
    src/
      env/
        schema.ts
        runtime.ts
      chains/
        supported.ts
      features/
        flags.ts
      index.ts

  types/
    src/
      common.ts
      defi.ts
      web3.ts
      index.ts
```

---

## 4. Dependency Direction (Must Follow)

```txt
apps/web -> packages/ui
apps/web -> packages/web3
apps/web -> packages/domain
apps/web -> packages/config
apps/web -> packages/types

packages/web3 -> packages/config
packages/web3 -> packages/types

packages/domain -> packages/types

packages/ui -> (no dependency on web3/domain)
```

Forbidden:

- `packages/domain` depending on `packages/web3`
- `packages/ui` depending on `packages/web3` or `packages/domain`
- `apps/web` importing deep private internals from packages

---

## 5. Package Responsibilities

## `packages/ui`

- Presentational components only.
- Design tokens and Storybook source of truth.

## `packages/web3`

- On-chain integration only.
- No DeFi formula ownership.

## `packages/domain`

- DeFi calculations and rule engine only.
- Pure functions, deterministic, testable.

## `packages/config`

- Runtime/env/chains/feature flags.
- Central place for project-wide configuration contracts.

## `packages/types`

- Stable shared interfaces and value-object types.
- Keep small and explicit.

---

## 6. Migration Plan (Incremental)

1. Create `packages/web3` and move `providers`-related chain config from `apps/web/app/providers.tsx` into web3 exports.
2. Create `packages/domain` and move all new formula work there first.
3. Create `packages/config` for env schema (`zod`) and supported chain config.
4. Introduce `packages/types` only for actually shared contracts; avoid dumping types.
5. Shrink `packages/shared` by moving code to explicit owners.
6. Enforce entrypoint imports (`@workspace/web3`, `@workspace/domain`, etc.).

---

## 7. File Naming Conventions

1. Use kebab-case filenames for modules (e.g. `health-factor.ts`).
2. Keep one primary responsibility per file.
3. Export from package-level `index.ts` only for public APIs.
4. Keep internal-only modules unexported.

---

## 8. Testing Strategy by Layer

1. `packages/domain`: dense unit tests for math/risk edge cases.
2. `packages/web3`: adapter integration tests with mocked clients.
3. `packages/ui`: Storybook + component interaction tests where needed.
4. `apps/web`: page composition and smoke flows.

---

## 9. Anti-Patterns to Reject

1. Page files containing APY/HF formulas.
2. ABI/address constants inside React components.
3. UI components with wagmi/viem hooks.
4. Generic helpers accumulating in `shared` without ownership.
5. Adding new feature folders without mapping to layer responsibilities first.
