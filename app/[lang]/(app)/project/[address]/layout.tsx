import React, { Suspense } from "react";
import LayoutProjectDetail from "./_components/layout-project-detail";
import LayoutProjectDetailLoading from "./_components/loading/layout-project-detail-loading";

export default function ProjectDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { address: string };
}) {
  //make sure to get the data into a good component
  return (
    <div className="flex flex-col gap-10">
      <Suspense fallback={<LayoutProjectDetailLoading />}>
        <LayoutProjectDetail projectId={params.address} />
      </Suspense>
      <div>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </div>
    </div>
  );
}
