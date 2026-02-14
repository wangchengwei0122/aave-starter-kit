# MIGRATION.md — Transition Guardrails for Pre-Web3/Domain Phase

## 0. Scope

This document defines mandatory development rules during the transition period before `packages/web3` and `packages/domain` are created.

It is derived from `AGENT.md` section 10 (Transition Guardrails) and is enforceable for all AI and human contributors.

---

## 1. Single Allowed Drop Zone for Transitional Code

During the transition period, new temporary protocol-related logic is allowed only in:

- `apps/web/src/migration/`

No other directory is allowed for newly added temporary web3/domain logic.

Suggested substructure:

- `apps/web/src/migration/web3/`
- `apps/web/src/migration/domain/`
- `apps/web/src/migration/adapters/`

---

## 2. Temporary Naming Convention (Mandatory)

All transitional files must use one of these suffixes:

- `*_pending_web3.ts`
- `*_pending_domain.ts`

Rules:

1. No exceptions for temporary logic files.
2. Suffix must reflect ownership target (`web3` or `domain`).
3. Temporary React hooks must still follow the same suffix contract where applicable.

Examples:

- `aave_pool_reads_pending_web3.ts`
- `dashboard_metrics_pending_domain.ts`
- `user_position_mapper_pending_web3.ts`

---

## 3. Explicitly Forbidden During Transition

The following are strictly prohibited:

1. Contract address or ABI literals inside any `page.tsx` file.
2. `wagmi` hooks inside UI components (especially in `packages/ui/**`).
3. Financial formulas in page/component files (APY, Health Factor, Ray/Wad conversions, LTV, Liquidation Threshold).

Additional hard stop rules:

1. No direct contract read/write logic in `apps/web/app/**` page files.
2. No protocol math mixed into presentational components.
3. No bypass of `App*` UI component layer.

---

## 4. Migration Trigger and PR Obligation

Migration trigger condition:

- Once `packages/web3` or `packages/domain` is created in the repository.

Mandatory action:

1. In the very next PR touching related logic, move transitional code from `apps/web/src/migration/` into the new target package(s).
2. Delete migrated `*_pending_web3.ts` and/or `*_pending_domain.ts` files in the same PR.
3. Update imports to package entrypoints.
4. Do not leave duplicated logic in both temporary and target locations.

Non-compliant PRs must be considered blocked.

---

## 5. Transitional Coding Checklist (Per PR)

1. New temporary logic is only under `apps/web/src/migration/`.
2. File names match required pending suffix.
3. No forbidden patterns appear in pages/UI components.
4. Migration trigger was checked (`packages/web3`/`packages/domain` existence).
5. If trigger is met, migration + deletion occurred in current PR.

---

## 6. Sunset Rule

This document is temporary by nature.

When both `packages/web3` and `packages/domain` are established and migration is completed, this file should be updated to:

1. mark transition phase as closed, or
2. be removed and replaced by steady-state rules in `AGENT.md` and `STRUCTURE.md`.
