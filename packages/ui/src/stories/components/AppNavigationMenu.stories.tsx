import type { Meta, StoryObj } from "@storybook/react"
import { AppNavigationMenu } from "../../components/app/app-navigation-menu"

const meta = {
  title: "Components/AppNavigationMenu",
  component: AppNavigationMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AppNavigationMenu>

export default meta
type Story = StoryObj<typeof meta>

const defaultItems = [
  { label: "Dashboard", href: "/" },
  { label: "Markets", href: "/markets" },
  { label: "Governance", href: "/governance" },
]

export const Default: Story = {
  args: {
    items: defaultItems,
    activeHref: "/",
  },
}

export const ManyItems: Story = {
  args: {
    items: [
      ...defaultItems,
      { label: "Staking", href: "/staking" },
      { label: "Faucet", href: "/faucet" },
      { label: "More", href: "/more" },
    ],
    activeHref: "/markets",
  },
}

export const ActiveState: Story = {
  args: {
    items: defaultItems,
    activeHref: "/governance",
  },
}

export const DisabledItem: Story = {
  args: {
    items: [
      { label: "Dashboard", href: "/" },
      { label: "Markets (Maintenance)", href: "/markets", disabled: true },
      { label: "Governance", href: "/governance" },
    ],
    activeHref: "/",
  },
}
