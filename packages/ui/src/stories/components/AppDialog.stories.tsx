import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import {
  AppDialog,
  AppDialogBody,
  AppDialogContent,
  AppDialogDescription,
  AppDialogFooter,
  AppDialogHeader,
  AppDialogTitle,
  AppDialogTrigger,
} from "../../components/app/app-dialog"
import { AppButton } from "../../components/app/app-button"
import { AppInput } from "../../components/app/app-input"
import { AppText } from "../../components/app/app-text"

const meta = {
  title: "Components/AppDialog",
  component: AppDialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof AppDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <AppDialog>
      <AppDialogTrigger asChild>
        <AppButton>Open Dialog</AppButton>
      </AppDialogTrigger>
      <AppDialogContent>
        <AppDialogHeader>
          <AppDialogTitle>Supply Assets</AppDialogTitle>
          <AppDialogDescription>
            Choose how much you want to supply to the Aave protocol.
          </AppDialogDescription>
        </AppDialogHeader>
        <AppDialogBody>
          <div className="flex flex-col gap-4">
            <AppInput placeholder="Amount to supply" />
            <div className="p-3 bg-muted/30 rounded-md border border-border-subtle">
              <AppText size="sm" tone="muted">
                Transaction simulation will run automatically.
              </AppText>
            </div>
          </div>
        </AppDialogBody>
        <AppDialogFooter>
          <AppButton variant="ghost" className="mr-2">Cancel</AppButton>
          <AppButton>Supply</AppButton>
        </AppDialogFooter>
      </AppDialogContent>
    </AppDialog>
  ),
}

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div className="flex flex-col gap-4 items-center">
        <AppText tone="muted">State: {open ? "Open" : "Closed"}</AppText>
        <AppDialog open={open} onOpenChange={setOpen}>
          <AppDialogTrigger asChild>
            <AppButton variant="secondary">Open Controlled Dialog</AppButton>
          </AppDialogTrigger>
          <AppDialogContent>
            <AppDialogHeader>
              <AppDialogTitle>Confirm Action</AppDialogTitle>
              <AppDialogDescription>
                Are you sure you want to proceed with this operation?
              </AppDialogDescription>
            </AppDialogHeader>
            <AppDialogFooter>
              <AppButton variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </AppButton>
              <AppButton onClick={() => setOpen(false)}>Confirm</AppButton>
            </AppDialogFooter>
          </AppDialogContent>
        </AppDialog>
      </div>
    )
  },
}

export const LongContent: Story = {
  render: () => (
    <AppDialog>
      <AppDialogTrigger asChild>
        <AppButton variant="outline">View Terms</AppButton>
      </AppDialogTrigger>
      <AppDialogContent>
        <AppDialogHeader>
          <AppDialogTitle>Terms of Service</AppDialogTitle>
          <AppDialogDescription>
            Please review the protocol terms carefully.
          </AppDialogDescription>
        </AppDialogHeader>
        <AppDialogBody className="max-h-[300px] overflow-y-auto pr-2">
          <div className="flex flex-col gap-4">
             {Array.from({ length: 10 }).map((_, i) => (
              <AppText key={i} as="p" size="sm" tone="secondary">
                {i + 1}. The protocol is decentralized and strictly non-custodial. Use at your own risk. 
                Liquidation penalties may apply if health factor drops below 1.0. 
                Governance votes determine parameter updates.
              </AppText>
            ))}
          </div>
        </AppDialogBody>
        <AppDialogFooter>
          <AppButton className="w-full">Agreed</AppButton>
        </AppDialogFooter>
      </AppDialogContent>
    </AppDialog>
  ),
}

export const DestructiveAction: Story = {
  render: () => (
    <AppDialog>
      <AppDialogTrigger asChild>
        <AppButton variant="destructive">Disconnect</AppButton>
      </AppDialogTrigger>
      <AppDialogContent>
        <AppDialogHeader>
          <AppDialogTitle className="text-state-danger">Disconnect Wallet</AppDialogTitle>
          <AppDialogDescription>
            This action will disconnect your current session. You will need to reconnect to sign transactions.
          </AppDialogDescription>
        </AppDialogHeader>
        <AppDialogFooter>
          <AppButton variant="ghost">Cancel</AppButton>
          <AppButton variant="destructive">Disconnect</AppButton>
        </AppDialogFooter>
      </AppDialogContent>
    </AppDialog>
  ),
}
