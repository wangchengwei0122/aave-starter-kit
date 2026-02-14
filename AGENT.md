# AGENT.md — AAVE Interface Engineering Constitution

## 0. Purpose

This repository is a production-grade AAVE-like DeFi Lending frontend.
It is not a demo and not a playground.

This file is the highest-priority constraint for all AI contributors.
When a request conflicts with this document, AI must pause and ask before coding.

---

## 1. Current Repository Snapshot (Fact-Based)

Current verified structure:

- `apps/web`: Next.js App Router application.
- `packages/ui`: design system package (shadcn primitives + `App*` wrappers + Storybook + tokens).
- `packages/shared`: currently a placeholder package.
- `packages/web3`: not created yet.
- `packages/domain`: not created yet.

Current verified implementation facts:

1. App-level components already exist under `packages/ui/src/components/app`.
2. Primitive shadcn-based components exist under `packages/ui/src/components`.
3. Token source of truth is `packages/ui/src/styles/globals.css`, consumed by `apps/web/app/globals.css`.
4. Wallet/chains/provider setup currently lives in `apps/web/app/providers.tsx` (`wagmi` + `viem` + `rainbowkit`).
5. APY/HF/Ray/LTV formulas are not centralized in a dedicated domain package yet.

---

## 2. Architecture Target (Long-Term Canonical)

The preferred long-term monorepo package layout is:

- `packages/ui`: pure presentation and design system
- `packages/web3`: chain config, clients, contract access, on-chain adapters
- `packages/domain`: pure DeFi business math and protocol rules
- `packages/config`: shared runtime config and env schema (zod)
- `packages/types`: shared cross-package types (minimal and stable)

`packages/shared` should not grow as a miscellaneous bucket.
New shared logic should be placed into explicit packages above.

---

## 3. Non-Negotiable Rules

1. Do not introduce new UI libraries without explicit approval.
2. Do not use primitive shadcn components directly in app/business code.
3. Product UI must go through `App*` components.
4. No inline style for presentation.
5. No raw colors (`#hex`, `rgb`, `hsl`, or `text-blue-500` style classes).
6. All colors must come from existing design tokens.
7. Do not invent new tokens unless explicitly requested.
8. Do not place business math in UI components.
9. Do not place ABI/address literals in page files.
10. Do not do unrelated refactors in scoped tasks.

Violation is a blocking error.

---

## 4. Layer Contracts

### 4.1 Page Layer (`apps/web/app/**`)

Allowed:

- route entry
- composition
- interaction orchestration

Forbidden:

- financial formula implementation
- ABI/address constants
- direct low-level contract calls

### 4.2 UI Layer (`packages/ui/**`)

Allowed:

- pure presentation
- semantic variants and visual states

Forbidden:

- wallet/chain state logic
- contract reads/writes
- APY/HF/LTV/Ray calculations

### 4.3 Web3 Layer (`packages/web3/**`, target)

Responsibilities:

- chain registry and transports
- wagmi/viem clients
- contract metadata (abi/address maps)
- read/write adapters and query wrappers

Constraint:

- app layer consumes exported APIs only
- no deep import into private internals

### 4.4 Domain Layer (`packages/domain/**`, target)

Responsibilities:

- APY/APR calculations
- Ray/Wad conversion
- Health Factor
- LTV/Liquidation Threshold logic
- risk/position pure computations

Constraint:

- pure functions only
- no React, no wagmi, no DOM

### 4.5 Config/Types Layers (`packages/config`, `packages/types`, target)

Responsibilities:

- environment schema and parsing
- chain/app feature flags
- stable shared type contracts

Constraint:

- do not move business logic into these packages

---

## 5. DeFi Formula Red Lines

AI must never guess protocol formulas.

The following must be centralized in `packages/domain` and reusable:

1. APY/APR formula logic
2. Ray/Wad unit conversions (`1e27`, `1e18`)
3. Health Factor formula
4. Liquidation Threshold and LTV logic
5. utilization/interest related calculations

If protocol source/spec is missing, AI must stop and ask.
No approximate formula is allowed in production code.

---

## 6. UI & Token Rules

1. Token source of truth: `packages/ui/src/styles/globals.css`.
2. Use semantic token classes only.
3. App-level UI APIs should be semantic (`intent`, `size`, `variant`) and deterministic.
4. Every new `App*` component must include Storybook stories for variants/sizes/states.
5. Pages/features should not style around tokens with one-off visual hacks.

---

## 7. AI Execution Workflow (Mandatory)

For every coding task, AI must:

1. provide a short plan first
2. explicitly list files to modify
3. avoid out-of-scope refactors
4. implement minimal necessary diff
5. return change summary + TODO/follow-ups

If blocked by architecture conflict, ask first.

---

## 8. Skills Policy (Mandatory Use)

When applicable, AI must prioritize built-in skills over ad-hoc implementation:

1. `app-design-system`
- for new/updated `App*` components and Storybook

2. `page-composer`
- for static DeFi page composition and block decomposition

3. `frontend-design` / `ui-ux-pro-max`
- only when user explicitly requests visual redesign/exploration
- cannot bypass token and architecture constraints

---

## 9. Definition of Done

A change is complete only if:

1. layer boundaries remain clean
2. no token violations are introduced
3. no primitive bypass is introduced
4. formulas are centralized or explicitly marked blocked
5. output includes diff summary and TODO items

---

## 10. Transition Guardrails

Before `packages/web3` and `packages/domain` are created:

1. do not spread new chain logic across page files
2. place new helpers in migration-friendly modules
3. keep extraction path explicit and low-risk

After those packages are created:

1. migrate imports to package entrypoints
2. remove legacy page-level formula/web3 logic
3. keep `apps/web` as orchestrator only

---

## 11. Companion Document

`STRUCTURE.md` is the operational directory blueprint and migration plan.
If AGENT rules and STRUCTURE details conflict, AGENT rules take precedence.
