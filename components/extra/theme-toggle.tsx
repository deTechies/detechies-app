"use client"


import { useTheme } from "next-themes"

import { Select } from "@radix-ui/react-select"
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

interface IThemeToggleProps {
  text: any
}

export function ThemeToggle({text}: IThemeToggleProps) {
  const { setTheme, theme } = useTheme()
  


  return (
    <Select
    onValueChange={(value) => setTheme(value)}
    defaultValue={theme}
  > 
    <SelectTrigger className="w-fit text-[14px] bg-background-layer-1 border rounded-[5px] !p-[8px]">
      <SelectValue placeholder={text.placeholder} />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="light">{text.light}</SelectItem>
      <SelectItem value="dark">{text.dark}</SelectItem>
      <SelectItem value="system">{text.system}</SelectItem>
    </SelectContent>
  </Select>

  )
}