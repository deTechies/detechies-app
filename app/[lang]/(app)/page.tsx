import { Locale } from "@/i18n.config";
import Dashboard from "./mypage/page";

import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

import LoadingProfileCard from "./mypage/_components/loading/loading-profile-card";
import ProfilePageCard from "./mypage/_components/profile-page-card";

export default async function ProfileDashboard({
  params,
}: {
  params: { lang: Locale };
}) {
  return (
    <div className="flex flex-col gap-10 mx-2 md:mx-10 lg:mx-20">
      <div>
      <Suspense fallback={<LoadingProfileCard />}>
          <ProfilePageCard lang={params.lang} />
        </Suspense>
      </div>
      <div className="flex flex-col sm:flex-row gap-10" >
      <Suspense
        fallback={
          <Skeleton className="h-24 grow shrink animate-pulse bg-background-layer-1" />
        }
      >
          <Dashboard params={params} />

      </Suspense>
      </div>
    </div>
  );
}
