"use client"


import { useTheme } from "next-themes"

import { Select } from "@radix-ui/react-select"
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  

  return (
    <Select
    onValueChange={(value) => setTheme(value)}
    defaultValue={theme}
  >
    <SelectTrigger className="w-[105px] bg-background-layer-1 border">
      <SelectValue placeholder="Lang" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="light">Light</SelectItem>
      <SelectItem value="dark">Dark</SelectItem>
      <SelectItem value="system">System</SelectItem>
    </SelectContent>
  </Select>

  )
}