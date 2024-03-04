import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex w-full tracking-[0.4px] ring-offset-background focus-visible:outline focus-visible:outline-border-div  disabled:cursor-not-allowed disabled:opacity-50 valid:bg-background-transparent",
  {
    variants: {
      variant: {
        default:
          "bg-background-layer-2 placeholder:text-text-placeholder file:border-0 file:bg-transparent rounded-[6px]",
      },
      size: {
        default:
          "text-sm px-[12px] py-[13px]  placeholder:text-title_m file:text-sm", // lg
        md: "text-sm px-[12px] py-[13px]  placeholder:text-title_m file:text-sm",
        sm: "p-10 text-xs", 
        lg: "py-[17px] px-[16px]"
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
