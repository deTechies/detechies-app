import Loading from "@/components/loading";
import { Suspense } from "react";
import PackageList from "./_components/package-list";

export default function Package() {
  return (
    <div className="m-10 lg:mx-20">
      <Suspense fallback={<Loading />}> 
        <PackageList />
      </Suspense>
    </div>
  )
}
