import Image from "next/image";
import React from "react";

export default function EmptyState({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2.5 justify-center mx-auto ">
      <div className="relative w-[20vw] mx-auto aspect-square m-10">
        <Image src="/images/empty-state.png" alt="Empty State" fill />
      </div>
      <div className="mx-auto flex flex-col text-center">

          <h1 className="text-lg font-semibold">{title}</h1>
          <span className="text-sm font-medium text-text-secondary">{subtitle}</span>
      </div>
    </div>
  );
}
