import type { Meta, StoryObj } from "@storybook/react";
import { RadiusBlock } from "../components/TokenShowcase";

const meta: Meta = {
  title: "Foundations/Radius",
};

export default meta;
type Story = StoryObj;

export const Scale: Story = {
  render: () => (
    <div className="space-y-8 p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Radius</h1>
        <p className="text-muted-foreground">Border radius tokens for consistency.</p>
      </div>

      <div className="flex flex-wrap gap-8 rounded-lg border border-border p-6 items-end">
        <RadiusBlock name="Small" variable="--radius-sm" tailwindClass="rounded-sm" />
        <RadiusBlock name="Medium" variable="--radius-md" tailwindClass="rounded-md" />
        <RadiusBlock name="Large" variable="--radius-lg" tailwindClass="rounded-lg" />
        <RadiusBlock name="X-Large" variable="--radius-xl" tailwindClass="rounded-xl" />
        <RadiusBlock name="Card" variable="--radius-card" />
        <RadiusBlock name="Full / Pill" variable="--radius-full" tailwindClass="rounded-full" />
      </div>
    </div>
  ),
};
