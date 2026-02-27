import type { Meta, StoryObj } from "@storybook/react"
import { AppTooltip } from "../../components/app/app-tooltip"
import { Info } from "lucide-react"

const meta = {
  title: "Components/AppTooltip",
  component: AppTooltip,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="p-20 flex items-center justify-center">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AppTooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    content: "This is a helpful tooltip message explaining APY.",
    children: (
      <button className="flex items-center text-muted-foreground hover:text-foreground hover:bg-muted/50 p-1 rounded-full px-2 gap-1 text-sm bg-transparent border-none">
        Net APY <Info className="size-3" />
      </button>
    ),
  },
}

export const Bottom: Story = {
  args: {
    content: "Bottom placed tooltip",
    side: "bottom",
    children: (
      <span className="underline decoration-dashed cursor-help">Hover me</span>
    ),
  },
}
