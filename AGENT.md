# AGENT.md — Design System & UI Generation Rules

## Project Stage

This project is currently in **Design System Construction Phase**.

### Current Allowed Scope

- Build **App-level UI components** only
- Maintain strict visual and semantic consistency
- All UI must be validated through Storybook

### NOT allowed at this stage

- ❌ Business logic components
- ❌ Feature-specific components (SupplyModal, BorrowPanel, etc.)
- ❌ Page-level layout or routing
- ❌ Arbitrary UI decisions outside the design system

---

## Component Architecture Rules

### Component Layers

1. **shadcn/ui**
   - Internal implementation only
   - MUST NOT be used directly by business or pages

2. **app/** (Design System Layer)
   - The ONLY components allowed for usage later
   - Examples:
     - AppButton
     - AppCard
     - AppBadge
     - AppText
     - AppDialog

3. **features/** (Business Layer)
   - NOT allowed to be created yet

---

## Styling & Token Rules (STRICT)

### Mandatory Rules

- ✅ Use semantic Tailwind tokens ONLY
- ✅ Use CSS variables defined in `globals.css`
- ✅ Use Tailwind utility classes mapped to tokens

### Forbidden

- ❌ Raw colors (hex, rgb, named colors)
- ❌ Arbitrary spacing values
- ❌ Inline styles (unless token-based and justified)
- ❌ Custom shadow definitions outside tokens

---

## Component Design Rules

### App Components MUST:

- Wrap or extend shadcn/ui primitives
- Expose a **clean, minimal API**
- Have explicit variants (no free-form props)
- Handle states (disabled, loading, active) internally
- Be visually deterministic

### App Components MUST NOT:

- Know about business concepts
- Fetch data
- Contain conditional UI logic tied to DeFi rules

---

## Storybook Rules

- Every App component MUST have Storybook stories
- Stories must cover:
  - Variants
  - Sizes
  - States (loading, disabled, etc.)
- Storybook is the **source of truth** for UI behavior

---

## Generation Instructions for AI

When generating code:

1. Follow this document strictly
2. Ask for clarification if a request violates scope
3. Prefer consistency over creativity
4. Never invent new design tokens
5. Never bypass the App component layer

Failure to follow these rules is considered an error.
