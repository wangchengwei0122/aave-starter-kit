import type { Meta, StoryObj } from "@storybook/react"
import {
  AppCard,
  AppCardContent,
  AppCardDescription,
  AppCardFooter,
  AppCardHeader,
  AppCardTitle,
} from "../../components/app"
import { AppButton } from "../../components/app"

const meta = {
  title: "Components/AppCard",
  component: AppCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AppCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <AppCard className="w-[350px]">
      <AppCardHeader>
        <AppCardTitle>Card Title</AppCardTitle>
        <AppCardDescription>Card Description</AppCardDescription>
      </AppCardHeader>
      <AppCardContent>
        <p>Card Content</p>
      </AppCardContent>
      <AppCardFooter>
        <p>Card Footer</p>
      </AppCardFooter>
    </AppCard>
  ),
}

export const Simple: Story = {
  render: () => (
    <AppCard className="w-[350px]">
      <AppCardContent className="pt-6">
        <p>Simple card with only content padding.</p>
      </AppCardContent>
    </AppCard>
  ),
}

export const FinancialExample: Story = {
  render: () => (
    <AppCard className="w-[380px]">
      <AppCardHeader>
        <AppCardTitle>Your Supplies</AppCardTitle>
        <AppCardDescription>Balance: $12,450.23</AppCardDescription>
      </AppCardHeader>
      <AppCardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-border-subtle pb-4 last:border-0 last:pb-0">
            <div className="flex flex-col">
              <span className="font-medium">Ethereum</span>
              <span className="text-xs text-text-secondary">ETH</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-medium">2.4502</span>
              <span className="text-xs text-text-secondary">$4,230.12</span>
            </div>
          </div>
          <div className="flex items-center justify-between border-b border-border-subtle pb-4 last:border-0 last:pb-0">
            <div className="flex flex-col">
              <span className="font-medium">USDC</span>
              <span className="text-xs text-text-secondary">Coins</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-medium">8,220.11</span>
              <span className="text-xs text-text-secondary">$8,220.11</span>
            </div>
          </div>
        </div>
      </AppCardContent>
      <AppCardFooter className="flex justify-between">
        <AppButton variant="ghost" size="sm">View Details</AppButton>
        <AppButton size="sm">Supply</AppButton>
      </AppCardFooter>
    </AppCard>
  ),
}
