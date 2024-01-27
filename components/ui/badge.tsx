import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center whitespace-nowrap",
  {
    variants: {
      variant: {
        default:
          "bg-background-layer-2 text-text-primary text-label_m",
        info: "border-state-info bg-state-info-secondary text-state-info hover:bg-info/80",
        accent: "border-accent-primary bg-accent-secondary text-accent-primary hover:bg-accent/80",
        success: "border-state-success bg-state-success-secondary text-state-success",
        warning: "border-state-warning bg-state-warning-secondary text-state-warning",
        placeholder: "border-border-input text-text-placeholder",
        secondary:
          "bg-button-secondary",
        tertiary: "text-type-purple-primary bg-type-purple-secondary hover:bg-type-purple-secondary/80",
        purple: "text-type-purple-primary bg-type-purple-secondary hover:bg-type-purple-secondary/80",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-text-primary",
        ghost: "text-text-primary border border-text-secondary hover:bg-background-layer-2/80",
      },
      shape: {
        default: "text-label_s rounded-md px-3 py-1 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        md: "py-2 px-2.5 rounded-md text-title_s",
        sm: "py-2 px-2.5 rounded-md text-label_s",
        category: "py-1.5 px-2.5 rounded-[5px] bg-background-layer-2 text-title_s",
        outline: "max-w-[200px] truncate py-[8px] px-[10px] border rounded-md bg-background-transparent text-title_s",
        outline_sm: "h-[22px] px-2.5 border rounded-full text-label_s",
        icon: "py-1.5 px-[10px] rounded-md text-label_m flex items-center justify-center",
        skill: "text-label_s bg-background-layer-2 rounded-[5px] px-2 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
      shape: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, shape, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, shape }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
