import type { Meta, StoryObj } from "@storybook/react"
import { AppTokenIcon } from "../../components/app/app-token-icon"

const meta = {
  title: "Components/AppTokenIcon",
  component: AppTokenIcon,
  tags: ["autodocs"],
} satisfies Meta<typeof AppTokenIcon>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-4 p-4">
      <AppTokenIcon symbol="usdc" />
      <AppTokenIcon symbol="usdt" />
      <AppTokenIcon symbol="dai" />
      <AppTokenIcon symbol="eth" />
      <AppTokenIcon symbol="wbtc" />
      <AppTokenIcon symbol="link" />
      <AppTokenIcon symbol="unknown" />
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4 p-4">
      <AppTokenIcon symbol="usdc" size="sm" />
      <AppTokenIcon symbol="usdc" size="md" />
      <AppTokenIcon symbol="usdc" size="lg" />
      <AppTokenIcon symbol="usdc" size="xl" />
    </div>
  ),
}
