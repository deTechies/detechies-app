"use client"

import * as SwitchPrimitives from "@radix-ui/react-switch"
import * as React from "react"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <div className="flex items-center justify-center w-10 h-5">
    <SwitchPrimitives.Root
      className={cn(
        "flex items-center h-3.5 w-[34px] shrink-0 cursor-pointer rounded-full transition-all disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-accent-secondary data-[state=unchecked]:bg-border-input",
        className
      )}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none block h-5 w-5 shadow-switch rounded-full ring-0 transition-all data-[state=checked]:bg-accent-primary data-[state=checked]:translate-x-[17px] data-[state=unchecked]:translate-x-[-3px] data-[state=unchecked]:bg-button-secondary"
        )}
      />
    </SwitchPrimitives.Root>
  </div>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
