import type { Meta, StoryObj } from "@storybook/react";
import { ColorPalette } from "../components/TokenShowcase";

const meta: Meta = {
  title: "Foundations/Colors",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj;

export const SemanticColors: Story = {
  render: () => (
    <div className="min-h-screen bg-background p-8 text-foreground transition-colors duration-300">
      <div className="mb-10 border-b border-border pb-6">
        <h1 className="text-4xl font-bold tracking-tight">Design Tokens / Colors</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Semantic color system adapting to light and dark modes.
        </p>
      </div>

      <ColorPalette
        title="Backgrounds"
        colors={[
          { name: "App Background", variable: "--color-background" },
          { name: "Card Surface", variable: "--color-card" },
          { name: "Secondary / Panel", variable: "--color-secondary" },
          { name: "Popover / Elevated", variable: "--color-popover" },
          { name: "Muted", variable: "--color-muted" },
          { name: "Accent / Hover", variable: "--color-accent" },
        ]}
      />

      <ColorPalette
        title="Text & Foreground"
        colors={[
          { name: "Primary Text", variable: "--color-foreground" },
          { name: "Secondary Text", variable: "--color-secondary-foreground" },
          { name: "Muted Text", variable: "--color-muted-foreground" },
          { name: "Inverted Text", variable: "--color-primary-foreground" },
          { name: "Accent Text", variable: "--color-accent-foreground" },
        ]}
      />

      <ColorPalette
        title="Borders & UI Elements"
        colors={[
          { name: "Default Border", variable: "--color-border" },
          { name: "Input Border", variable: "--color-input" },
          { name: "Ring / Focus", variable: "--color-ring" },
        ]}
      />

      <ColorPalette
        title="States"
        colors={[
          { name: "Destructive", variable: "--color-destructive" },
          { name: "Success", variable: "--state-success" },
          { name: "Warning", variable: "--state-warning" },
          { name: "Info", variable: "--state-info" },
        ]}
      />
      
      <ColorPalette
        title="DeFi / Financial"
        colors={[
          { name: "APY Positive", variable: "--color-defi-apy-pos" },
          { name: "APY Negative", variable: "--color-defi-apy-neg" },
          { name: "Health: Safe", variable: "--color-defi-health-safe" },
          { name: "Health: Warning", variable: "--color-defi-health-warn" },
          { name: "Health: Liquidate", variable: "--color-defi-health-liq" },
          { name: "Risk: Low", variable: "--color-defi-risk-low" },
          { name: "Risk: Mid", variable: "--color-defi-risk-mid" },
          { name: "Risk: High", variable: "--color-defi-risk-high" },
        ]}
      />
    </div>
  ),
};
