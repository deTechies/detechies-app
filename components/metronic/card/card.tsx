import { cn } from "@/lib/utils";
import * as React from "react";
//box-shadow: 0px 3px 4px 0px #00000008;

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-[12px] bg-light border border-border-div flex flex-col shadow-card",
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
    className={cn("flex rounded-t-[12px] border-b border-border-div py-5 px-[30px] justify-between items-center w-full text-md font-medium self-end",
    className
  )}
    {...props}
  />
))

CardHeader.displayName = "CardHeader"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex rounded-b-[12px] border-t border-border-div py-5 px-[30px] justify-between items-center w-full text-md font-medium",
    className
  )}
    {...props}
  />
))

CardFooter.displayName = "CardFooter"


export { Card, CardContent, CardFooter, CardHeader };

