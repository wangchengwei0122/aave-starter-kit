import type { Meta, StoryObj } from "@storybook/react"
import { AppInput } from "../../components/app/app-input"

const meta = {
  title: "Components/AppInput",
  component: AppInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
    },
    error: {
      control: "boolean",
    },
    loading: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    placeholder: {
      control: "text",
    },
  },
} satisfies Meta<typeof AppInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: "Enter amount",
  },
  render: (args) => (
    <div className="w-[300px]">
      <AppInput {...args} />
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[300px]">
      <div className="flex flex-col gap-2">
        <span className="text-xs text-muted-foreground">Small (sm)</span>
        <AppInput size="sm" placeholder="Search..." />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs text-muted-foreground">Medium (md - Default)</span>
        <AppInput size="md" placeholder="Enter amount" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs text-muted-foreground">Large (lg)</span>
        <AppInput size="lg" placeholder="0.00" />
      </div>
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[300px]">
      <div className="flex flex-col gap-2">
        <span className="text-xs text-muted-foreground">Disabled</span>
        <AppInput disabled placeholder="Cannot type here" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs text-muted-foreground">Error</span>
        <AppInput error placeholder="Invalid input" defaultValue="Invalid value" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs text-muted-foreground">Loading</span>
        <AppInput loading placeholder="Calculating..." />
      </div>
       <div className="flex flex-col gap-2">
        <span className="text-xs text-muted-foreground">Loading + Value</span>
        <AppInput loading defaultValue="100.00" />
      </div>
    </div>
  ),
}

export const NumericStressTest: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[300px]">
      <div className="flex flex-col gap-2">
        <span className="text-xs text-muted-foreground">Long Value (Truncation check)</span>
        <AppInput 
          defaultValue="115792089237316195423570985008687907853269984665640564039457584007913129639935" 
          placeholder="Amount" 
        />
      </div>
    </div>
  ),
}
