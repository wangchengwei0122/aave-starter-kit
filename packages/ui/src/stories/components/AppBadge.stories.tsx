import type { Meta, StoryObj } from "@storybook/react"
import { AppBadge } from "../../components/app"

const meta = {
  title: "Components/AppBadge",
  component: AppBadge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    intent: {
      control: "select",
      options: ["neutral", "success", "warning", "danger", "info"],
    },
    variant: {
      control: "radio",
      options: ["solid", "outline"],
    },
    size: {
      control: "radio",
      options: ["sm", "md"],
    },
  },
} satisfies Meta<typeof AppBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Neutral Badge",
    intent: "neutral",
  },
}

export const Intents: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <AppBadge intent="neutral">Neutral</AppBadge>
        <AppBadge intent="success">Success</AppBadge>
        <AppBadge intent="warning">Warning</AppBadge>
        <AppBadge intent="danger">Danger</AppBadge>
        <AppBadge intent="info">Info</AppBadge>
      </div>
      <div className="flex gap-2">
        <AppBadge intent="neutral" variant="outline">Neutral</AppBadge>
        <AppBadge intent="success" variant="outline">Success</AppBadge>
        <AppBadge intent="warning" variant="outline">Warning</AppBadge>
        <AppBadge intent="danger" variant="outline">Danger</AppBadge>
        <AppBadge intent="info" variant="outline">Info</AppBadge>
      </div>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <AppBadge size="sm">Small</AppBadge>
      <AppBadge size="md">Medium</AppBadge>
    </div>
  ),
}

export const DeFiStates: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="text-sm text-text-secondary">Health Factor:</span>
        <AppBadge intent="success" size="sm">Safe (2.45)</AppBadge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-text-secondary">Risk Level:</span>
        <AppBadge intent="warning" size="sm">Medium</AppBadge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-text-secondary">Liquidation:</span>
        <AppBadge intent="danger" variant="outline" size="sm">Imminent</AppBadge>
      </div>
    </div>
  ),
}
