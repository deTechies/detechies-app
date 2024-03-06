import React from "react";

export default function GroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <div>
      <main className="flex  justify-center items-center m-10">
        {children}
        </main>
    </div>
  );
}
