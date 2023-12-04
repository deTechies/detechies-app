"use client";
import App from "@/app/[lang]/app";
import { SessionProvider } from "next-auth/react";
import React from "react";


interface OnboardLayoutProps {
  children: React.ReactNode;
}

export default function OnboardLayout({
  children,
}: OnboardLayoutProps): JSX.Element {
  return (
    <App>
      <SessionProvider>
        <main className=" flex min-h-[100vh] items-center justify-center my-auto border">
          <div className="min-w-[400px] max-w-lg">
            {children}</div>
        </main>
      </SessionProvider>
    </App>
  );
}
