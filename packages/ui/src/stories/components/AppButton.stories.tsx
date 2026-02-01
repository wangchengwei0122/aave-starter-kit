import type { Meta, StoryObj } from "@storybook/react"
import { AppButton } from "../../components/app/app-button"

const meta = {
  title: "Components/AppButton",
  component: AppButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "destructive"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    loading: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof AppButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Button",
    variant: "primary",
    size: "md",
  },
}

export const Variants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <AppButton variant="primary">Primary</AppButton>
      <AppButton variant="secondary">Secondary</AppButton>
      <AppButton variant="ghost">Ghost</AppButton>
      <AppButton variant="destructive">Destructive</AppButton>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <AppButton size="sm">Small</AppButton>
      <AppButton size="md">Medium</AppButton>
      <AppButton size="lg">Large</AppButton>
    </div>
  ),
}

export const States: Story = {
  args: {
    size: "lg"
  },

  render: () => (
    <div className="flex items-center gap-4">
      <AppButton loading>Loading</AppButton>
      <AppButton disabled>Disabled</AppButton>
      <AppButton variant="secondary" loading>Loading Secondary</AppButton>
      <AppButton variant="destructive" disabled>Disabled Destructive</AppButton>
    </div>
  )
}
