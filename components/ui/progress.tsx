"use client"
import { cn } from "@/lib/utils";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import * as React from "react";

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  color?: string;  // Existing color prop
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(
  ({ className, value, color = "bg-primary", ...props }, ref) => {
    return (
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          "relative h-[12px] w-full overflow-hidden rounded-full bg-gray-300",
          className
        )}
        {...props}
      >
        {/* Render step indicators */}
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="absolute h-full bg-gray-300 z-10"
            style={{
              left: `${index * 10}%`,
              width: index === 9 ? '0' : '1px', // Adjust width for the last line
            }}
          />
        ))}
        <ProgressPrimitive.Indicator
          className={cn("h-full w-full flex-1 transition-all", color)}
          style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
      </ProgressPrimitive.Root>
    );
  }
);

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
