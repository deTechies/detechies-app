import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva("flex flex-row gap-2 items-center text-2xs", {
  variants: {
    variant: {
      default: "bg-gray-200 text-2xs font-medium",
      info: "border-info-clarity bg-info-light text-info hover:bg-info/80",
      accent:
        "border-primary bg-primary-clarity text-primary hover:bg-accent/80",
      success:
        "border border-success-clarity bg-success-light text-success",
      warning:
        "border-state-warning bg-state-warning-secondary text-state-warning",
      placeholder: "border-border-input text-text-placeholder",
      secondary: "bg-gray-200 text-gray-700",
      tertiary:
        "text-type-purple-primary bg-type-purple-secondary hover:bg-type-purple-secondary/80",
      purple:
        "text-type-purple-primary bg-type-purple-secondary hover:bg-type-purple-secondary/80",
      destructive:
        "bg-destructive text-destructive-foreground hover:bg-destructive/80",
      outline: "text-text-primary",
      ghost:
        "text-text-primary border border-text-secondary hover:bg-background-layer-2/80",
      opacity: "text-text-primary bg-white/50",
    },
    shape: {
      default:
        "rounded-[6px] p-2 transition-colors ",
      md: "py-2 px-2.5 rounded-md text-sm",
      sm: "py-2 px-2.5 rounded-md text-label_s",
      category:
        "py-1.5 px-2.5 rounded-[5px] bg-background-layer-2 text-title_s",
      outline:
        "py-[8px] px-[10px] border rounded-md bg-background-transparent text-title_s",
      outline_sm: "h-[22px] px-2.5 border rounded-full text-label_s",
      icon: "py-[10px] px-[10px] rounded-md text-label_m flex items-center justify-center",
      skill:
        "hexagon text-label_s h-[24px] w-[24px] aspect-square flex justify-center items-center rounded-[3px]",
      loading: "text-title_m rounded-md px-4 py-4",
    },
  },
  defaultVariants: {
    variant: "default",
    shape: "default",
  },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, shape, children, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, shape }), className)}
      {...props}
    >
      <div className="">{children}</div>
    </div>
  );
}

export { Badge, badgeVariants };
