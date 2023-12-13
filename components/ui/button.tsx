import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

const buttonVariants = cva(
  "bg-accent-secondary text-accent-primary hover:bg-accent-secondary inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "text-accent-primary bg-accent-secondary hover:bg-accent/90",
        default: "bg-accent-secondary text-accent-primary hover:bg-accent-secondary",
        destructive:
          "bg-state-error-secondary text-state-error hover:bg-destructive/20",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-background-layer-2 text-text-primary hover:bg-background-layer-2/90 cursor:pointer",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "px-6 py-4 rounded-full",
        sm: "text-sm rounded-md px-3 py-2",
        lg: "px-[62.50px] py-[15.50px] rounded-md ",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const content = loading ? (
      <button className="flex gap-4 items-center animate-pulse">
        {/* Replace with your spinning icon component */}
        <Loader2 size={16} className="animate-spin" />
        Loading...
      </button>
    ) : (
      props.children
    );
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {content}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
