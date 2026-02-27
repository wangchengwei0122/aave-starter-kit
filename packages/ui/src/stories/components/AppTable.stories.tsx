import type { Meta, StoryObj } from "@storybook/react"
import {
  AppTable,
  AppTableHeader,
  AppTableBody,
  AppTableHead,
  AppTableRow,
  AppTableCell,
} from "../../components/app/app-table"

const meta = {
  title: "Components/AppTable",
  component: AppTable,
  tags: ["autodocs"],
} satisfies Meta<typeof AppTable>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: <></> },
  render: () => (
    <div className="w-[800px]">
      <AppTable>
        <AppTableHeader>
          <AppTableRow>
            <AppTableHead>Asset</AppTableHead>
            <AppTableHead align="right">Balance</AppTableHead>
            <AppTableHead align="right" sortable sortDirection="desc">
              APY
            </AppTableHead>
            <AppTableHead align="center">Collateral</AppTableHead>
          </AppTableRow>
        </AppTableHeader>
        <AppTableBody>
          <AppTableRow>
            <AppTableCell>USDC</AppTableCell>
            <AppTableCell align="right">
              <div>100.06</div>
              <div className="text-muted-foreground text-xs">$100.05</div>
            </AppTableCell>
            <AppTableCell align="right">0.45 %</AppTableCell>
            <AppTableCell align="center">Yes</AppTableCell>
          </AppTableRow>
          <AppTableRow>
            <AppTableCell>USDT</AppTableCell>
            <AppTableCell align="right">
              <div>10,000.00</div>
              <div className="text-muted-foreground text-xs">$9,999.00</div>
            </AppTableCell>
            <AppTableCell align="right">&lt; 0.01 %</AppTableCell>
            <AppTableCell align="center">Yes</AppTableCell>
          </AppTableRow>
        </AppTableBody>
      </AppTable>
    </div>
  ),
}

export const InteractiveRows: Story = {
  args: { children: <></> },
  render: () => (
    <div className="w-[800px]">
      <AppTable>
        <AppTableHeader>
          <AppTableRow>
            <AppTableHead>Market</AppTableHead>
            <AppTableHead align="right">Total Supplied</AppTableHead>
            <AppTableHead align="right">Supply APY</AppTableHead>
          </AppTableRow>
        </AppTableHeader>
        <AppTableBody>
          <AppTableRow onClick={() => console.log("Clicked USDC")}>
            <AppTableCell>USDC</AppTableCell>
            <AppTableCell align="right">5.98M</AppTableCell>
            <AppTableCell align="right">0.45%</AppTableCell>
          </AppTableRow>
          <AppTableRow onClick={() => console.log("Clicked ETH")}>
            <AppTableCell>Ethereum</AppTableCell>
            <AppTableCell align="right">115.00</AppTableCell>
            <AppTableCell align="right">64.46%</AppTableCell>
          </AppTableRow>
        </AppTableBody>
      </AppTable>
    </div>
  ),
}
