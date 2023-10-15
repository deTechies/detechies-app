import { cn } from "@/lib/utils";
import * as React from "react";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-sm bg-background-layer-1 shadow p-6 flex flex-col gap-md",
    className
  )}
    {...props}
  />
))

Card.displayName = "Card"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("w-full",
    className
  )}
    {...props}
  />
))

CardContent.displayName = "CardContent"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <h1
    ref={ref}
    className={cn("text-normal font-medium w-full  leading-3 tracking-wide",
    className
  )}
    {...props}
  />
))

CardHeader.displayName = "CardHeader"


export { Card, CardContent, CardHeader };

