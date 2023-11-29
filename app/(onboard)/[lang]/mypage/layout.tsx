"use client";
import App from "@/app/[lang]/app";
import { SessionProvider } from "next-auth/react";
import React from "react";

interface MypageLayoutProps {
  children: React.ReactNode;
}

export default function MypageLayout({
  children,
}: MypageLayoutProps): JSX.Element {
  return (
    <App>
      <SessionProvider>
        <main className="flex items-center justify-center h-[100vh] w-[100vw] bg-background-layer-1 z-10 ">
          <div>{children}</div>
        </main>
      </SessionProvider>
    </App>
  );
}
