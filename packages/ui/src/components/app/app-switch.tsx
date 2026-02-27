import * as React from "react"
import { Switch } from "../switch"

export interface AppSwitchProps {
  /**
   * The controlled state of the switch.
   */
  checked?: boolean
  /**
   * Event handler when the checked state changes.
   */
  onCheckedChange?: (checked: boolean) => void
  /**
   * Whether the switch is disabled
   */
  disabled?: boolean
  /**
   * ID for form label association
   */
  id?: string
  /**
   * Accessible label (usually not visible, but read by screen readers if no label is associated)
   */
  "aria-label"?: string
}

export function AppSwitch({
  checked,
  onCheckedChange,
  disabled,
  id,
  "aria-label": ariaLabel,
}: AppSwitchProps) {
  return (
    <Switch
      id={id}
      checked={checked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      aria-label={ariaLabel}
    />
  )
}
