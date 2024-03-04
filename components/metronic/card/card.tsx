import { cn } from "@/lib/utils";
import * as React from "react";
//box-shadow: 0px 3px 4px 0px #00000008;

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-[12px] bg-background-layer-1 border flex flex-col shadow-card",
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
    className={cn("w-full p-[30px]",
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
  <div
    ref={ref}
    className={cn("flex rounded-t-[12px] border-b py-5 px-[30px] justify-between items-center w-full text-md font-medium",
    className
  )}
    {...props}
  />
))

CardHeader.displayName = "CardHeader"


export { Card, CardContent, CardHeader };

