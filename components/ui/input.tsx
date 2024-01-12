import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex w-full tracking-[0.4px] ring-offset-background focus-visible:outline focus-visible:outline-border-div  disabled:cursor-not-allowed disabled:opacity-50 valid:bg-background-transparent",
  {
    variants: {
      variant: {
        default:
          "bg-background-layer-2 placeholder:text-text-placeholder file:border-0 file:bg-transparent",
      },
      size: {
        default:
          "rounded-sm text-title_m px-4 py-5 min-h-[60px] placeholder:text-title_m file:text-sm", // lg
        md: "rounded-[8px] text-title_m px-4 py-3 h-12 placeholder:text-title_m file:text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  size?: "default" | "md" | undefined;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
