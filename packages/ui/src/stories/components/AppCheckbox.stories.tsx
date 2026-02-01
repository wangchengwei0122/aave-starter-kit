import type { Meta, StoryObj } from "@storybook/react"
import { AppCheckbox } from "../../components/app/app-checkbox"

const meta = {
  title: "Components/AppCheckbox",
  component: AppCheckbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    indeterminate: {
      control: "boolean",
    },
    label: {
      control: "text",
    },
    description: {
      control: "text",
    },
    intent: {
      control: "select",
      options: ["default", "success", "warning", "danger"],
    },
  },
} satisfies Meta<typeof AppCheckbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: "Accept terms and conditions",
    defaultChecked: false,
  },
}

export const Checked: Story = {
  args: {
    label: "Subscribe to newsletter",
    defaultChecked: true,
  },
}

export const Indeterminate: Story = {
  args: {
    label: "Select all items",
    indeterminate: true,
  },
}

export const Disabled: Story = {
  args: {
    label: "Unavailable option",
    disabled: true,
  },
}

export const DisabledChecked: Story = {
  args: {
    label: "Already agreed",
    disabled: true,
    defaultChecked: true,
  },
}

export const WithDescription: Story = {
  args: {
    label: "Enable notifications",
    description: "Receive updates about your account activity and security alerts.",
  },
}

export const IntentSuccess: Story = {
  args: {
    label: "Transaction Verified",
    defaultChecked: true,
    intent: "success",
  },
}

export const IntentWarning: Story = {
  args: {
    label: "High slippage tolerance",
    defaultChecked: true,
    intent: "warning",
    description: "Your transaction may be front-run.",
  },
}

export const IntentDanger: Story = {
  args: {
    label: "Delete account permanently",
    defaultChecked: true,
    intent: "danger",
    description: "This action cannot be undone.",
  },
}

export const LongLabel: Story = {
  render: (args) => (
    <div className="w-[300px]">
      <AppCheckbox {...args} />
    </div>
  ),
  args: {
    label: "I acknowledge that I have read and understood the risk disclosure statement regarding the potential loss of funds in decentralized finance protocols.",
    description: "Please read carefully before proceeding.",
  },
}
