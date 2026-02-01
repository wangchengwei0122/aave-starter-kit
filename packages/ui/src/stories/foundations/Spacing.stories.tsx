import type { Meta, StoryObj } from "@storybook/react";
import { SpacingBlock } from "../components/TokenShowcase";

const meta: Meta = {
  title: "Foundations/Spacing",
};

export default meta;
type Story = StoryObj;

export const Scale: Story = {
  render: () => (
    <div className="space-y-8 p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Spacing</h1>
        <p className="text-muted-foreground">Standard spacing scale used for margins, padding, and layout.</p>
      </div>

      <div className="space-y-4 rounded-lg border border-border p-6">
        <SpacingBlock name="w-0.5" size="w-0.5" />
        <SpacingBlock name="w-1" size="w-1" />
        <SpacingBlock name="w-2" size="w-2" />
        <SpacingBlock name="w-3" size="w-3" />
        <SpacingBlock name="w-4" size="w-4" />
        <SpacingBlock name="w-6" size="w-6" />
        <SpacingBlock name="w-8" size="w-8" />
        <SpacingBlock name="w-10" size="w-10" />
        <SpacingBlock name="w-12" size="w-12" />
        <SpacingBlock name="w-16" size="w-16" />
        <SpacingBlock name="w-20" size="w-20" />
        <SpacingBlock name="w-24" size="w-24" />
        <SpacingBlock name="w-32" size="w-32" />
      </div>
    </div>
  ),
};
