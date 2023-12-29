import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center text-sm font-normal rounded-md border px-3 py-1 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-background-layer-2 text-text-primary text-label_m hover:border hover:border-border-div",
        info: "border-transparent bg-state-info-secondary text-state-info hover:bg-info/80",
        accent: "border-transparent bg-accent-secondary text-accent-primary hover:bg-accent/80",
        success: "border-transparent bg-state-success-secondary text-state-success",
        secondary:
          "border-transparent bg-accent-secondary text-accent-on-secondary",
        tertiary: "border-transparent text-purple-600 bg-purple-100 hover:bg-purple-600/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        ghost: "text-text-primary hover:bg-background-layer-2/80",

      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
