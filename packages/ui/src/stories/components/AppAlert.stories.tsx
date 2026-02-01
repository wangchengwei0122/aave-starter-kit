import type { Meta, StoryObj } from "@storybook/react"
import { AppAlert } from "../../components/app/app-alert"
import { AppButton } from "../../components/app/app-button"
import { AppText } from "../../components/app/app-text"

const meta = {
  title: "Components/AppAlert",
  component: AppAlert,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "An institutional-style alert component for the Aave-like design system. Supports semantic intents and custom content.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    intent: {
      control: "select",
      options: ["info", "success", "warning", "danger", "neutral"],
      description: "Semantic intent of the alert",
    },
    dismissible: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof AppAlert>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    intent: "neutral",
    title: "Terms of Service",
    description: "Please review the updated terms of service before continuing.",
  },
}

export const Info: Story = {
  args: {
    intent: "info",
    title: "New Feature Available",
    description: "You can now bridge assets directly from the dashboard.",
  },
}

export const Success: Story = {
  args: {
    intent: "success",
    title: "Transaction Successful",
    description: "Your deposit of 10.0 ETH has been confirmed.",
  },
}

export const Warning: Story = {
  args: {
    intent: "warning",
    title: "High Utilization Rate",
    description: "The pool utilization is above 90%. Interest rates may be high.",
  },
}

export const Danger: Story = {
  args: {
    intent: "danger",
    title: "Liquidation Risk",
    description: "Your health factor is below 1.1. You assume risk of liquidation.",
  },
}

export const DescriptionOnly: Story = {
  args: {
    intent: "info",
    description: "This alert has no title, just a simple description line.",
  },
}

export const WithActions: Story = {
  args: {
    intent: "info",
    title: "Action Required",
    description: "Please confirm your email address to continue using the platform.",
    actions: (
      <div className="flex gap-2">
        <AppButton size="sm" variant="ghost">Skip</AppButton>
        <AppButton size="sm" variant="primary">Confirm</AppButton>
      </div>
    ),
  },
}

export const Dismissible: Story = {
  args: {
    intent: "warning",
    title: "System Maintenance",
    description: "Scheduled maintenance will occur on Sunday at 02:00 UTC.",
    dismissible: true,
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [visible, setVisible] = React.useState(true)
    if (!visible) return <AppText>Alert Dismissed (Refresh to reset)</AppText>
    return <AppAlert {...args} onDismiss={() => setVisible(false)} />
  },
}

import * as React from "react"

export const LongContentEdgeCase: Story = {
  args: {
    intent: "neutral",
    title: "Very Long Title That Might Wrap On Smaller Screens And Should Not Break The Layout Of The Component which is designed to be robust",
    description: "This is a very long description that contains a lot of text to test how the component handles wrapping. In a financial application, disclaimers can often be quite long and verbose, so it is critical that this component handles multi-line text gracefully without overflowing or breaking the grid layout layout.",
    dismissible: true,
    actions: (
       <AppButton size="sm" variant="secondary">Read More</AppButton>
    )
  },
}
