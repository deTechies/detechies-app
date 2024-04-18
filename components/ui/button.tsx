import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"
import { ArrowsCircle } from "detechies-icons"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-2sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-light-active bg-text-gray-800 hover:bg-primary/90 border border-gray-300",
        primary: "bg-primary text-light hover:bg-primary-active",
        destructive:
          "bg-danger text-light hover:bg-danger-active",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary border-gray-300 text-gray-900 hover:bg-secondary-active",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 py-2.5 rounded-md px-3",
        lg: "h-12 rounded-md px-8",
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
  ({ className, variant, size, loading =false,  asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    const content = loading ? (
      <button className="flex items-center gap-4 " disabled>
        {/* Replace with your spinning icon component */}
        <ArrowsCircle fontSize={16} className="animate-spin" />
        {size !== "icon" && "Loading..."}
      </button>
    ) : (
      props.children
    );
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
