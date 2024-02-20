"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";


// ===================================
// Tabs
const Tabs = TabsPrimitive.Root;


// ===================================
// TabsList
const TabsListVariants = cva("items-center", {
  variants: {
    variant: {
      default:
        "flex justify-start gap-2 border-b border-background-layer-1 text-text-secondary",
      button1: "flex justify-start gap-2 ",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
    variant?: "default" | "button1";
  }
>(({ className, variant, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn("overflow-x-auto", TabsListVariants({ variant }), className)}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

// ===================================
// TabsTrigger

const TabsTriggerVariants = cva("", {
  variants: {
    variant: {
      default:`p-2 text-title_m disabled:pointer-events-none whitespace-nowrap border-b-2 border-transparent
      disabled:opacity-50 data-[state=active]:text-text-primary data-[state=active]:border-accent-primary data-[state=active]:border-b-2 `,
      button1: "p-3 rounded-full text-title_m data-[state=active]:bg-background-base",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
    variant?: "default" | "button1";
  }
>(({ className, variant, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(TabsTriggerVariants({ variant }), className)}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;


// ======================================
// TabContent

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-fo:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsContent, TabsList, TabsTrigger };
