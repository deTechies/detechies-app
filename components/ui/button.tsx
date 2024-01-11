import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { Loader2 } from "lucide-react"

const buttonVariants = cva(
  "inline-flex hover:shadow-inner items-center justify-center ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-accent-secondary text-accent-primary",
        default: "bg-accent-secondary text-accent-primary",
        success: "bg-accent-primary text-background-layer-1",
        error: "bg-state-error-secondary text-state-error",
        destructive: "bg-state-error-secondary text-state-error hover:bg-destructive/20",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-background-layer-2 text-[#3B414B] hover:bg-gray-100 cursor:pointer",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "px-6 py-4 rounded-full truncate",
        sm: "rounded-md px-3 py-2 text-title_s h-fit truncate",
        lg: "py-[15.5px] px-4 rounded-full text-title_m max-w-[212px] w-full grow truncate",
        icon: "h-12 w-12 shrink-0 rounded-md p-2 truncate",
        icon_circle: "h-12 w-12 shrink-0 rounded-full p-2 truncate",
        image: "h-fit w-fit p-0 bg-transparent hover:shadow-none truncate"
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
      <button className="flex items-center gap-4 ">
        {/* Replace with your spinning icon component */}
        <Loader2 size={16} className="animate-spin" />
        Loading...
      </button>
    ) : (
      props.children
    );

    return (
      <Comp
        // className={cn(buttonVariants({ variant, size, className }))}
        className={buttonVariants({ variant, size, className })}
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
