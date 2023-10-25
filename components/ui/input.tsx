import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex  w-full max-w-lg rounded-[8px] text-text-primary border border-border-div bg-background-layer-1 px-4 py-3  tracking-[0.4px] leading-4  ring-offset-background file:border-0 file:bg-transparent file:text-sm placeholder:font-light  placeholder:text-text-placeholder focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref} 
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
