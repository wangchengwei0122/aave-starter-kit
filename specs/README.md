# Specs System

## Purpose

Specs define the only allowed implementation contract for AI development.
AI contributors must implement by filling spec-defined blanks only, and must not invent scope, data source, formulas, or UI architecture outside the spec.

All implementation work must follow:
- `AGENT.md`
- `STRUCTURE.md`
- feature spec under `specs/*.md`

If a request conflicts with a spec, AI must stop and ask for clarification.

---

## Required Spec Template

Every spec file must use the exact sections below.

### 1. Feature Scope

- Must Do:
- Out of Scope:
- Explicitly Forbidden:

### 2. Data Sources

- Source Type: AAVE Official SDK adapter / Pool contract read only
- SDK Adapter:
- Contract Reads:
- Fallback Policy:
- Blockers:

Rules:
- No mock business values in production code.
- No alternative/off-chain guessed data source.
- If SDK adapter is not integrated, mark `BLOCKED` and stop.

### 3. Allowed UI Components

- Allowed: `packages/ui` exported `App*` components only.
- Disallowed: direct primitive shadcn usage in page/feature code.
- Styling must use existing design tokens only.

### 4. Forbidden Patterns

- No APY/Health Factor/LTV/Ray formulas in page/components.
- No hardcoded financial numbers.
- No fake placeholder protocol data to pass validation.
- No ABI/address literals inside UI/page files.
- No bypassing package boundaries.

### 5. Definition of Done

- Scope is fully delivered and nothing out-of-scope is added.
- All values come from SDK adapter or contract reads.
- UI uses only `App*` components.
- No formula logic appears in page/UI layer.
- Blocked items are explicitly marked with reason and next action.
- Diff summary + TODO are included in delivery output.

---

## Spec Lifecycle

1. Create spec before implementation.
2. Implement strictly against approved spec.
3. Update spec status (`TODO` / `IN_PROGRESS` / `BLOCKED` / `DONE`).
4. Keep spec as historical source of truth for audits and regressions.
