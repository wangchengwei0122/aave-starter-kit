# AGENT.md — AAVE Interface Engineering Constitution

## 0. Purpose

This repository is a **production-grade AAVE-like DeFi Lending frontend**, not a demo.

This file is the **highest-priority engineering constraint** for all AI-assisted development.
If any request conflicts with this document, the AI must stop and ask for clarification before coding.

---

## 1. Repository Reality Snapshot (Must Stay Aligned)

Current verified monorepo structure:

- `apps/web`: Next.js app (App Router), wallet connect shell, page composition.
- `packages/ui`: shared UI system (`shadcn` primitives + `App*` wrappers + Storybook + tokens).
- `packages/shared`: placeholder package (no active domain/web3 logic yet).
- `packages/web3`: **not present yet**.
- `packages/domain`: **not present yet**.

Current verified facts:

1. UI system already has `App*` components under `packages/ui/src/components/app`.
2. Primitive components exist under `packages/ui/src/components` (internal layer).
3. Design tokens + CSS variables are centralized in:
- `packages/ui/src/styles/globals.css`
- consumed by `apps/web/app/globals.css`
4. On-chain connectivity currently lives in `apps/web/app/providers.tsx` using:
- `wagmi` (`WagmiProvider`, chains)
- `viem` (`http` transport)
- `@rainbow-me/rainbowkit`
5. Financial formulas (APY/Health Factor/Ray/Liquidation Threshold) are **not centralized in a domain module yet**.

Any future AGENT.md update must re-verify these facts from code before changing constraints.

---

## 2. Non-Negotiable Rules (AI MUST Follow)

1. Do not introduce new UI libraries without explicit approval.
2. Do not use raw `shadcn` primitives directly in `apps/web` pages/features.
3. Do not bypass the `App*` layer for product UI.
4. Do not use inline styles for visual design.
5. Do not use raw colors (hex/rgb/hsl/named Tailwind colors like `text-blue-500`).
6. All colors must come from existing design tokens defined in `globals.css`.
7. Do not invent new tokens unless explicitly requested.
8. Do not mix business logic into UI components.
9. Do not make silent architecture changes.

Violation of any rule above is a blocking error.

---

## 3. Layered Architecture Contract

### 3.1 Page Layer (`apps/web/app/**`)

Responsibilities:

- Route entry and layout composition only.
- Compose existing feature blocks and `App*` components.
- Bind user interaction to hooks/actions.

Forbidden:

- Financial formula implementation.
- Direct contract ABI/address logic.
- Raw primitive UI composition from `shadcn` internals.

### 3.2 UI Layer (`packages/ui/**`)

Responsibilities:

- Pure presentational components.
- Stable, deterministic visual behavior.
- State presentation (`loading`, `disabled`, `active`, `error`) from props.

Forbidden:

- RPC calls / wallet state / chain state.
- APY/HF/risk math.
- Protocol business decisions.

### 3.3 Web3 Layer (Target: `packages/web3/**`)

Current status:

- Not extracted yet; temporary logic exists in `apps/web/app/providers.tsx`.

Required direction:

- Centralize chain config, public/wallet clients, contract read/write wrappers, and address maps.
- Expose typed hooks/services to app layer.
- Keep page/components free from ABI/address literals.

### 3.4 Domain Layer (Target: `packages/domain/**`)

Current status:

- Not extracted yet.

Required direction:

- Centralize all DeFi financial calculations and unit conversions.
- Provide pure, reusable, tested functions.
- Be framework-agnostic (no React, no UI dependency).

---

## 4. DeFi Financial Logic Red Lines

AI must never guess or improvise protocol formulas.

The following must live in domain modules only (reusable + testable):

1. APY/APR related computation
2. Ray/Wad unit conversion (`1e27`, `1e18` scale handling)
3. Health Factor computation
4. Liquidation Threshold / LTV / collateral risk math
5. Interest accrual and utilization-derived values

Hard rules:

- No formula literals scattered in pages/components/hooks.
- No “temporary approximate formula” in product code.
- If official formula source is missing, AI must stop and request spec source.

---

## 5. UI & Design Token Rules

1. Token source of truth is `packages/ui/src/styles/globals.css`.
2. Use semantic token classes only (e.g. `bg-bg-app`, `text-text-primary`, `border-border-subtle`).
3. Keep visual API semantic (`intent`, `size`, `variant`), not arbitrary style props.
4. `App*` components wrap primitives; primitives are internal implementation detail.
5. Any new `App*` component must include Storybook stories:
- variants
- sizes
- states (disabled/loading/interactive)

---

## 6. Import Boundary Rules

1. In `apps/web`, prefer imports from:
- `@workspace/ui/components/app` for app-level components
- `@workspace/ui/components` only when consuming approved app exports
2. Do not import primitive files directly from `packages/ui/src/components/*` in app/business code.
3. Do not import from deep private paths unless no public export exists and user approved.
4. When `packages/web3` and `packages/domain` are created, app code must consume them via package entrypoints, not deep file paths.

---

## 7. AI Development Workflow (Mandatory per Task)

For every coding task, AI must follow this order:

1. Plan first:
- list files to read
- list files to modify
- list files intentionally untouched
2. Scope lock:
- modify only requested or clearly required files
- no opportunistic refactor
3. Implement minimal diff:
- keep behavior focused on requested goal
4. Report:
- provide changed file list
- provide concise diff summary
- provide TODO/follow-up list (if any)

If the request conflicts with architecture boundaries, AI must pause and ask before implementation.

---

## 8. Skills Policy (Built-in Skills Must Be Prioritized)

If the following skills exist in repo/session, AI must use them first instead of inventing ad-hoc implementation patterns.

### 8.1 `app-design-system`

Must be used for:

- creating/updating `App*` components
- defining component API variants/states
- Storybook completion for design system components

### 8.2 `page-composer`

Must be used for:

- static page composition
- decomposing page blocks into App-level vs Business-level components

### 8.3 `frontend-design` / `ui-ux-pro-max`

Use only when user explicitly asks for visual redesign/high-fidelity UI exploration.
Do not use to bypass existing token/component constraints.

Hard rule:

- AI must not bypass applicable skills and directly invent a conflicting architecture.

---

## 9. Definition of Done (DoD)

A change is complete only if:

1. Layer boundaries remain intact.
2. No token violations introduced.
3. No primitive bypass introduced.
4. New UI component changes include/align Storybook coverage.
5. DeFi formulas are centralized (or explicitly marked blocked, not guessed).
6. Output includes diff summary + TODO.

---

## 10. Explicitly Forbidden Behaviors

1. Mixing contract calls directly into presentational UI components.
2. Placing APY/HF calculations in pages or component render logic.
3. Introducing hard-coded addresses/ABIs in page files.
4. Re-styling components with arbitrary colors/shadows outside tokens.
5. Refactoring unrelated modules during a scoped task.
6. Creating duplicate component systems outside `packages/ui`.

---

## 11. Migration Guardrails (Current to Target)

Because `packages/web3` and `packages/domain` are not yet present:

1. New on-chain logic should not further spread across pages.
2. Prefer introducing reusable modules with clear extraction path.
3. Any newly added formula/helper must be placed where it can be moved to `packages/domain` with zero behavior change.
4. Once `packages/web3` / `packages/domain` are created, update imports immediately to enforce boundary.

---

## 12. Enforcement Statement

This AGENT.md is an enforceable engineering contract for AI contributors.

When uncertain:

- prefer strictness over convenience
- prefer consistency over speed
- ask for clarification instead of making protocol assumptions
