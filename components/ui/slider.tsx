"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => {
  // Create step markers
  const stepMarkers = [];
  
  let steps = 10;
  if(props.step) steps =  100 / props.step;
  for (let i = 1; i < steps; i++) {
    stepMarkers.push(
      <div
        key={i}
        className="absolute h-4 w-1 bg-background-layer-1"
        style={{ left: `${i * (100/steps)}%` }}
      />
    );
  }
  
  let bg = props.color ? props.color : "bg-accent-primary";

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      {...props}
    > 
      <SliderPrimitive.Track className="relative h-4 w-full grow overflow-hidden rounded-full bg-background-layer-2">
        <SliderPrimitive.Range className={`absolute h-full ${bg}`} />
        {/* Insert step markers */}
        {stepMarkers}
      </SliderPrimitive.Track>
      
    </SliderPrimitive.Root>
  );
});

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
