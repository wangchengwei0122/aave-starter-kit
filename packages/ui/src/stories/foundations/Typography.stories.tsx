import type { Meta, StoryObj } from "@storybook/react";
import { TypeScale } from "../components/TokenShowcase";

const meta: Meta = {
  title: "Foundations/Typography",
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj;

export const Scale: Story = {
  render: () => (
    <div className="max-w-4xl space-y-8">
       <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Typography</h1>
        <p className="text-muted-foreground">Type scale and hierarchies.</p>
      </div>

      <div className="rounded-lg border border-border p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-foreground">Headings</h2>
        <TypeScale role="Display / H1" sizeClass="text-4xl" weightClass="font-extrabold" />
        <TypeScale role="H2" sizeClass="text-3xl" weightClass="font-bold" />
        <TypeScale role="H3" sizeClass="text-2xl" weightClass="font-semibold" />
        <TypeScale role="H4" sizeClass="text-xl" weightClass="font-semibold" />
      </div>

       <div className="rounded-lg border border-border p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-foreground">Body & UI</h2>
        <TypeScale role="Body Large / Lead" sizeClass="text-lg" weightClass="font-normal" />
        <TypeScale role="Body Base" sizeClass="text-base" weightClass="font-normal" />
        <TypeScale role="Body Small" sizeClass="text-sm" weightClass="font-normal" />
        <TypeScale role="Caption / XS" sizeClass="text-xs" weightClass="font-normal" />
      </div>
      
       <div className="rounded-lg border border-border p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-foreground">Weights</h2>
        <TypeScale role="Regular" sizeClass="text-base" weightClass="font-normal" />
        <TypeScale role="Medium" sizeClass="text-base" weightClass="font-medium" />
        <TypeScale role="Semibold" sizeClass="text-base" weightClass="font-semibold" />
        <TypeScale role="Bold" sizeClass="text-base" weightClass="font-bold" />
      </div>
    </div>
  ),
};
