"use client";
import App from "@/app/[lang]/app";
import React from "react";

interface MyPageLayoutProps {
  children: React.ReactNode;
}

export default function MyPageLayout({
  children,
}: MyPageLayoutProps): JSX.Element {
  return (
    <App>
      <main className="h-[100vh] w-[100vw] bg-background-layer-1 z-10 ">
        <div>{children}</div>
      </main>
    </App>
  );
}
