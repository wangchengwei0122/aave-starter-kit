import type { Meta, StoryObj } from "@storybook/react"
import {
  AppTabs,
  AppTabsList,
  AppTabsTrigger,
  AppTabsContent,
} from "../../components/app/app-tabs"

const meta = {
  title: "Components/AppTabs",
  component: AppTabs,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="p-10">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AppTabs>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultPill: Story = {
  args: { children: <></> },
  render: () => (
    <div className="w-[400px]">
      <AppTabs defaultValue="supply">
        <AppTabsList fullWidth>
          <AppTabsTrigger value="supply">Supply</AppTabsTrigger>
          <AppTabsTrigger value="withdraw">Withdraw</AppTabsTrigger>
        </AppTabsList>
        <AppTabsContent value="supply">
          <div className="p-4 border rounded-md mt-4 text-sm text-muted-foreground">
            Supply panel content
          </div>
        </AppTabsContent>
        <AppTabsContent value="withdraw">
          <div className="p-4 border rounded-md mt-4 text-sm text-muted-foreground">
            Withdraw panel content
          </div>
        </AppTabsContent>
      </AppTabs>
    </div>
  ),
}

export const LineVariant: Story = {
  args: { children: <></> },
  render: () => (
    <div className="w-[800px]">
      <AppTabs defaultValue="overview">
        <AppTabsList variant="line">
          <AppTabsTrigger value="overview">Overview</AppTabsTrigger>
          <AppTabsTrigger value="information">Information</AppTabsTrigger>
        </AppTabsList>
        <AppTabsContent value="overview">
          <div className="mt-4 text-sm text-muted-foreground">
            Overview content detailing the asset reserves.
          </div>
        </AppTabsContent>
        <AppTabsContent value="information">
          <div className="mt-4 text-sm text-muted-foreground">
            More specific parameter information.
          </div>
        </AppTabsContent>
      </AppTabs>
    </div>
  ),
}
