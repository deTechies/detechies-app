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
  if (props.step) steps = 100 / props.step;
  for (let i = 1; i < steps; i++) {
    stepMarkers.push(
      <div
        key={i}
        className="absolute w-1 h-4 bg-background-layer-1"
        style={{ left: `${i * (100 / steps)}%` }}
      />
    );
  }

  const numMarkers = (
    <div>
      <div className="flex justify-between -mb-2 text-label_s">
        <span>0</span>
        <span>50</span>
        <span>100</span>
      </div>
    </div>
  );

  let bg = props.color ? props.color : "bg-accent-primary";

  return (
    <>
      {numMarkers}

      <SliderPrimitive.Root
        ref={ref}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          className
        )}
        {...props}
      >
        <SliderPrimitive.Track className="relative w-full h-4 overflow-hidden rounded-full grow bg-background-layer-2">
          <SliderPrimitive.Range className={`absolute h-full ${bg}`} />
          {/* Insert step markers */}
          {stepMarkers}
        </SliderPrimitive.Track>
      </SliderPrimitive.Root>
    </>
  );
});

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
