import type { Meta, StoryObj } from "@storybook/react"
import { AppSwitch } from "../../components/app/app-switch"
import { AppText } from "../../components/app/app-text"

const meta = {
  title: "Components/AppSwitch",
  component: AppSwitch,
  tags: ["autodocs"],
} satisfies Meta<typeof AppSwitch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    checked: true,
  },
}

export const Unchecked: Story = {
  args: {
    checked: false,
  },
}

export const Disabled: Story = {
  args: {
    checked: true,
    disabled: true,
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <AppSwitch id="collateral-mode" checked={true} />
      <label htmlFor="collateral-mode" className="cursor-pointer">
        <AppText as="span" size="sm" tone="muted">
          Use as collateral
        </AppText>
      </label>
    </div>
  ),
}
