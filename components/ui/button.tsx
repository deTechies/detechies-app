import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { Loader2 } from "lucide-react"

const buttonVariants = cva(
  "inline-flex hover:opacity-90 active:scale-95 transition-all items-center justify-center ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-accent-secondary",
        primary: "bg-accent-secondary",
        success: "bg-accent-primary ",
        error: "bg-state-error-secondary text-state-error",
        destructive: "bg-state-error-secondary text-state-error hover:bg-destructive/20",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-button-secondary",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        inactive: "text-text-secondary bg-background-layer-1",
      },
      size: {
        default: "px-6 py-[17px] rounded-full truncate text-sm ",
        sm: "rounded-[6px] px-3 py-[10px] text-sm",
        md: "rounded-[6px] px-4 py-[13px] truncate",
        lg: "py-[15.5px] px-4 rounded-full max-w-[212px] w-full grow truncate",
        icon: "h-12 w-12 shrink-0 rounded-md p-2 truncate",
        icon_circle: "h-12 w-12 shrink-0 rounded-full p-2 truncate",
        image: "h-fit w-fit p-0 bg-transparent hover:shadow-none truncate",
        ts: "pt-1 pb-[6px] px-[10px] text-title_s rounded-[14px] truncate",
        square: " p-2 rounded-[6px]",
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
      <button className="flex items-center gap-4 " disabled>
        {/* Replace with your spinning icon component */}
        <Loader2 size={16} className="animate-spin" />
        {size !== "icon" && "Loading..."}
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
