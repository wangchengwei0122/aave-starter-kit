import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import {
  AppPopover,
  AppPopoverContent,
  AppPopoverTrigger,
} from "../../components/app/app-popover"
import { AppButton } from "../../components/app/app-button"
import { AppText } from "../../components/app/app-text"
import { AppInput } from "../../components/app/app-input"

const meta = {
  title: "Components/AppPopover",
  component: AppPopover,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof AppPopover>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <AppPopover>
      <AppPopoverTrigger asChild>
        <AppButton variant="outline">Open Popover</AppButton>
      </AppPopoverTrigger>
      <AppPopoverContent>
        <div className="flex flex-col gap-2">
          <AppText className="font-medium">Popover Header</AppText>
          <AppText tone="secondary" size="sm">
            This is a simple popover content area. It typically contains secondary actions or information.
          </AppText>
        </div>
      </AppPopoverContent>
    </AppPopover>
  ),
}

export const LongContent: Story = {
  render: () => (
    <AppPopover>
      <AppPopoverTrigger asChild>
        <AppButton variant="secondary">View Details</AppButton>
      </AppPopoverTrigger>
      <AppPopoverContent className="w-80">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <AppText className="font-medium">Transaction Details</AppText>
            <AppText tone="muted" size="xs">ID: 0x123...abc</AppText>
          </div>
          
          <div className="flex flex-col gap-2 p-3 bg-muted/30 rounded-md">
             <div className="flex justify-between">
                <AppText size="sm" tone="secondary">Status</AppText>
                <AppText size="sm" intent="success">Confirmed</AppText>
             </div>
             <div className="flex justify-between">
                <AppText size="sm" tone="secondary">Gas Used</AppText>
                <AppText size="sm">21,000</AppText>
             </div>
             <div className="flex justify-between">
                <AppText size="sm" tone="secondary">Block</AppText>
                <AppText size="sm">19283746</AppText>
             </div>
          </div>

          <AppText tone="secondary" size="sm">
             Popovers can contain arbitrary content like this detail view. It should remain clean and focused.
          </AppText>
        </div>
      </AppPopoverContent>
    </AppPopover>
  ),
}

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div className="flex flex-col items-center gap-4">
        <AppText tone="muted">Popover State: {open ? "Open" : "Closed"}</AppText>
        <AppPopover open={open} onOpenChange={setOpen}>
          <AppPopoverTrigger asChild>
            <AppButton>Toggle Controlled Popover</AppButton>
          </AppPopoverTrigger>
          <AppPopoverContent>
             <div className="flex flex-col gap-3">
               <AppText>Calculated value</AppText>
               <AppInput placeholder="Edit value..." size="sm" />
               <AppButton size="sm" onClick={() => setOpen(false)}>Save & Close</AppButton>
             </div>
          </AppPopoverContent>
        </AppPopover>
      </div>
    )
  },
}

export const Placements: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap justify-center p-12">
      <AppPopover>
        <AppPopoverTrigger asChild><AppButton variant="outline" size="sm">Top</AppButton></AppPopoverTrigger>
        <AppPopoverContent side="top"><AppText size="sm">Content on Top</AppText></AppPopoverContent>
      </AppPopover>
      
      <AppPopover>
        <AppPopoverTrigger asChild><AppButton variant="outline" size="sm">Bottom</AppButton></AppPopoverTrigger>
        <AppPopoverContent side="bottom"><AppText size="sm">Content on Bottom</AppText></AppPopoverContent>
      </AppPopover>

      <AppPopover>
        <AppPopoverTrigger asChild><AppButton variant="outline" size="sm">Left</AppButton></AppPopoverTrigger>
        <AppPopoverContent side="left"><AppText size="sm">Content on Left</AppText></AppPopoverContent>
      </AppPopover>

       <AppPopover>
        <AppPopoverTrigger asChild><AppButton variant="outline" size="sm">Right</AppButton></AppPopoverTrigger>
        <AppPopoverContent side="right"><AppText size="sm">Content on Right</AppText></AppPopoverContent>
      </AppPopover>
    </div>
  ),
}

export const InlineTrigger: Story = {
  render: () => (
    <AppText as="p" className="max-w-md leading-relaxed">
      Aave Protocol is a decentralized non-custodial liquidity protocol where users can participate as suppliers or borrowers. Suppliers provide liquidity to the market to earn a passive income, while borrowers are able to borrow in an overcollateralized (perpetually) or undercollateralized (one-block liquidity) fashion. 
      <AppPopover>
        <AppPopoverTrigger asChild>
          <span className="cursor-pointer text-state-info underline decoration-dotted underline-offset-4 hover:text-state-info/80 mx-1">
             Learn more
          </span>
        </AppPopoverTrigger>
        <AppPopoverContent className="w-64">
           <AppText size="sm" tone="secondary">
             Liquidity protocols allow you to earn interest on deposits and borrow assets against them.
           </AppText>
        </AppPopoverContent>
      </AppPopover>
      about the protocol mechanics.
    </AppText>
  ),
}
