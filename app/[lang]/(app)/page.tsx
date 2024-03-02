import { Locale } from "@/i18n.config";
import Dashboard from "./mypage/page";

import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

import LoadingProfileCard from "./mypage/_components/loading/loading-profile-card";
import MyPageMenu from "./mypage/mypage-menu";
import ProfilePageCard from "./mypage/profile-page-card";

export default async function ProfileDashboard({
  params,
}: {
  params: { lang: Locale };
}) {
  return (
    <div className="flex flex-col gap-10">
      <div>
      <Suspense fallback={<LoadingProfileCard />}>
          <ProfilePageCard lang={params.lang} />
        </Suspense>
      </div>
      <div className="flex flex-col sm:flex-row gap-10" >
      <div className="md:w-[250px] shrink-0 flex flex-col ">
        <Suspense
          fallback={
            <Skeleton className="animate-pulse bg-background-layer-1" />
          }
        >
          <MyPageMenu />
        </Suspense>
      </div>
      <Suspense
        fallback={
          <Skeleton className="h-24 grow shrink animate-pulse bg-background-layer-1" />
        }
      >
        <div className="grow shrink">
          <Dashboard params={params} />
        </div>
      </Suspense>
      </div>
    </div>
  );
}
