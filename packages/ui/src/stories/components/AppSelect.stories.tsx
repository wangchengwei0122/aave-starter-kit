import type { Meta, StoryObj } from "@storybook/react"
import { AppSelect, AppSelectItem } from "../../components/app/app-select"

const meta = {
  title: "Components/AppSelect",
  component: AppSelect,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
    },
    placeholder: {
      control: "text",
    },
  },
} satisfies Meta<typeof AppSelect>

export default meta
type Story = StoryObj<typeof meta>

// Reuse items for stories
const items = (
  <>
    <AppSelectItem value="eth">Ethereum</AppSelectItem>
    <AppSelectItem value="btc">Bitcoin</AppSelectItem>
    <AppSelectItem value="usdc">USDC</AppSelectItem>
    <AppSelectItem value="aave">Aave</AppSelectItem>
    <AppSelectItem value="uni">Uniswap</AppSelectItem>
  </>
)

export const Default: Story = {
  render: (args) => (
    <div className="w-[200px]">
      <AppSelect {...args}>
        {items}
      </AppSelect>
    </div>
  ),
  args: {
    placeholder: "Select Label",
  },
}

export const WithPlaceholder: Story = {
  render: (args) => (
    <div className="w-[200px]">
      <AppSelect {...args}>
        {items}
      </AppSelect>
    </div>
  ),
  args: {
    placeholder: "Choose a token...",
    value: undefined,
  },
}

export const Disabled: Story = {
  render: (args) => (
    <div className="w-[200px]">
      <AppSelect {...args}>
        {items}
      </AppSelect>
    </div>
  ),
  args: {
    placeholder: "Select Label",
    disabled: true,
  },
}

export const LongList: Story = {
  render: (args) => (
    <div className="w-[200px]">
      <AppSelect {...args}>
        <AppSelectItem value="1">Item 1</AppSelectItem>
        <AppSelectItem value="2">Item 2</AppSelectItem>
        <AppSelectItem value="3">Item 3</AppSelectItem>
        <AppSelectItem value="4">Item 4</AppSelectItem>
        <AppSelectItem value="5">Item 5</AppSelectItem>
        <AppSelectItem value="6">Item 6</AppSelectItem>
        <AppSelectItem value="7">Item 7</AppSelectItem>
        <AppSelectItem value="8">Item 8</AppSelectItem>
        <AppSelectItem value="9">Item 9</AppSelectItem>
        <AppSelectItem value="10">Item 10</AppSelectItem>
        <AppSelectItem value="11">Item 11</AppSelectItem>
        <AppSelectItem value="12">Item 12</AppSelectItem>
      </AppSelect>
    </div>
  ),
  args: {
    placeholder: "Scrollable List",
  },
}

export const ValueControlled: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [val, setVal] =  React.useState("usdc")
    return (
      <div className="flex flex-col gap-4 w-[200px]">
        <AppSelect
          {...args}
          value={val}
          onValueChange={setVal}
        >
          {items}
        </AppSelect>
        <div className="text-sm text-text-muted">
          Selected: {val}
        </div>
      </div>
    )
  },
  args: {
    placeholder: "Select Label",
  },
}

import * as React from "react"
