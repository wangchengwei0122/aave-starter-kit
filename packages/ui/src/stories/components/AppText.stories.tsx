import type { Meta, StoryObj } from "@storybook/react"
import { AppText } from "../../components/app/app-text"

const meta = {
  title: "Components/AppText",
  component: AppText,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    tone: {
      control: "select",
      options: ["primary", "secondary", "muted", "inverted"],
    },
    intent: {
      control: "select",
      options: ["success", "warning", "danger", "info"],
    },
    size: {
      control: "radio",
      options: ["xs", "sm", "md"],
    },
    as: {
      control: "text",
    },
  },
} satisfies Meta<typeof AppText>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Calculated Health Factor",
  },
}

export const Tones: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground">Primary</span>
        <AppText tone="primary">Total Value Locked</AppText>
      </div>
      
      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground">Secondary</span>
        <AppText tone="secondary">Connect your wallet to view details</AppText>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground">Muted</span>
        <AppText tone="muted">Last updated 5 mins ago</AppText>
      </div>

      <div className="flex flex-col gap-1 p-4 bg-primary rounded-md">
        <span className="text-xs text-muted-foreground">Inverted (on primary bg)</span>
        <AppText tone="inverted">Safe maximum LTV</AppText>
      </div>
    </div>
  ),
}

export const Intents: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground">Success</span>
        <AppText intent="success">Transaction confirmed successfully</AppText>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground">Warning</span>
        <AppText intent="warning">Liquidation risk approaching</AppText>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground">Danger</span>
        <AppText intent="danger">Health factor critical (&lt; 1.0)</AppText>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground">Info</span>
        <AppText intent="info">Voting power delegation active</AppText>
      </div>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground">XS (12px)</span>
        <AppText size="xs">Collateral Composition</AppText>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground">SM (14px)</span>
        <AppText size="sm">Collateral Composition</AppText>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground">MD (16px / Base)</span>
        <AppText size="md">Collateral Composition</AppText>
      </div>
    </div>
  ),
}

export const AsElements: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <span className="text-xs text-muted-foreground block mb-2">As &lt;span&gt; (default)</span>
        <AppText as="span">
          This is an inline span element used for specific words inside sentences.
        </AppText>
      </div>

      <div>
        <span className="text-xs text-muted-foreground block mb-2">As &lt;p&gt;</span>
        <AppText as="p" className="max-w-md">
          This is a paragraph element. It works well for longer blocks of text that need to have their own line and semantic meaning in the document structure.
        </AppText>
      </div>

      <div>
        <span className="text-xs text-muted-foreground block mb-2">As &lt;div&gt;</span>
        <AppText as="div">
          This is a div element, behaving as a block container.
        </AppText>
      </div>
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
       <div>
        <span className="text-xs text-muted-foreground block mb-2">Disabled (aria-disabled)</span>
        <AppText tone="primary" aria-disabled="true">
          Action not authorized
        </AppText>
      </div>
      
      <div>
        <span className="text-xs text-muted-foreground block mb-2">Truncation (with className="truncate")</span>
        <div className="w-48 bg-muted/20 p-2 border border-dashed border-border-default">
           <AppText className="truncate block">
             0x1234567890abcdef1234567890abcdef
           </AppText>
        </div>
      </div>
    </div>
  ),
}
