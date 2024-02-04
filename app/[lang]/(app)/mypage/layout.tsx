import { Locale } from "@/i18n.config";

import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import LoadingProfileCard from "./_components/loading/loading-profile-card";
import MyPageMenu from "./mypage-menu";
import ProfilePageCard from "./profile-page-card";
export default async function MyPageLayout({
  params,
  children,
}: {
  params: { lang: Locale };
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex flex-col gap-20 m-8 md:flex-row">
        <div className="md:w-[376px] shrink-0 flex flex-col gap-8">
          <Suspense fallback={<LoadingProfileCard />}>
            <ProfilePageCard lang={params.lang}  />
          </Suspense>
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
            <Skeleton className="grow shrink h-24 animate-pulse bg-background-layer-1" />
          }
        >
          <div className="grow shrink">{children}</div>
        </Suspense>
      </div>
    </div>
  );
}
