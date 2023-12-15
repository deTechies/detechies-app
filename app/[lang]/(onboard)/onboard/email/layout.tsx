import React from "react";

export default function VerificationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="max-w-[400px] mx-auto py-8">{children}</main>;
}
