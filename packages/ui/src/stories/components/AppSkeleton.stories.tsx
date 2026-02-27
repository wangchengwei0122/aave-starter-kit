import type { Meta, StoryObj } from "@storybook/react"
import { AppSkeleton } from "../../components/app/app-skeleton"

const meta = {
  title: "Components/AppSkeleton",
  component: AppSkeleton,
  tags: ["autodocs"],
} satisfies Meta<typeof AppSkeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Shapes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[300px]">
      <div className="flex items-center gap-4">
        <AppSkeleton shape="circle" className="size-12" />
        <div className="space-y-2 flex-1">
          <AppSkeleton shape="text" />
          <AppSkeleton shape="text" className="w-[80%]" />
        </div>
      </div>
      <AppSkeleton shape="rectangle" className="h-[125px] w-full rounded-xl" />
    </div>
  ),
}
