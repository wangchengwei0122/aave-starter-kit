export const colors = {
  // Application Backgrounds
  bg: {
    app: "var(--bg-app)",
    surface: "var(--bg-surface)",
    panel: "var(--bg-panel)",
    elevated: "var(--bg-elevated)",
    primary: "var(--bg-primary)",
    secondary: "var(--bg-secondary)",
    muted: "var(--bg-muted)",
    accent: "var(--bg-accent)",
  },

  // Text Colors
  text: {
    primary: "var(--text-primary)",
    secondary: "var(--text-secondary)",
    muted: "var(--text-muted)",
    inverted: "var(--text-inverted)",
  },

  // Borders
  border: {
    default: "var(--border-default)",
    subtle: "var(--border-subtle)",
    strong: "var(--border-strong)",
  },

  // State
  state: {
    success: "var(--state-success)",
    warning: "var(--state-warning)",
    danger: "var(--state-danger)",
    info: "var(--state-info)",
  },

  // DeFi Specific
  defi: {
    apy: {
      pos: "var(--defi-apy-pos)",
      neg: "var(--defi-apy-neg)",
    },
    risk: {
      low: "var(--defi-risk-low)",
      mid: "var(--defi-risk-mid)",
      high: "var(--defi-risk-high)",
    },
    health: {
      safe: "var(--defi-health-safe)",
      warn: "var(--defi-health-warn)",
      liq: "var(--defi-health-liq)",
    },
  },
} as const;
