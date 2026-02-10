import type { Meta, StoryObj } from "@storybook/react"
import { AppHeader } from "../../components/app/app-header"
import { AppButton } from "../../components/app/app-button"

const meta = {
  title: "Components/AppHeader",
  component: AppHeader,
  parameters: {
    layout: "fullscreen",
    // Set background to dark to visualize the dark header better, 
    // or keep default to see how it contrasts with light page
    backgrounds: {
      default: "light",
    },
  },
  tags: ["autodocs"],
  argTypes: {
    navItems: {
      control: "object",
      description: "Array of navigation items",
    },
    activeHref: {
      control: "text",
      description: "Active navigation item href",
    },
    actions: {
      description: "Right-aligned actions",
    },
  },
} satisfies Meta<typeof AppHeader>

export default meta
type Story = StoryObj<typeof meta>

const defaultNavItems = [
  { label: "Dashboard", href: "/" },
  { label: "Markets", href: "/markets" },
  { label: "Stake", href: "/stake" },
  { label: "Governance", href: "/governance" },
]

export const Default: Story = {
  args: {
    navItems: defaultNavItems,
    activeHref: "/",
  },
}

export const ActiveNav: Story = {
  args: {
    navItems: defaultNavItems,
    activeHref: "/markets",
  },
}

export const WithActions: Story = {
  args: {
    navItems: defaultNavItems,
    activeHref: "/",
    actions: (
      <div className="flex gap-2">
        <AppButton variant="secondary" size="sm">
          Settings
        </AppButton>
        <AppButton variant="primary" size="sm">
          Connect Wallet
        </AppButton>
      </div>
    ),
  },
}

export const ManyItems: Story = {
  args: {
    navItems: [
      ...defaultNavItems,
      { label: "More", href: "/more" },
      { label: "Docs", href: "/docs" },
      { label: "FAQ", href: "/faq" },
    ],
    activeHref: "/",
    actions: <AppButton size="sm">Connect</AppButton>,
  },
}
