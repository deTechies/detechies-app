import { Locale } from "@/i18n.config";

import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import LoadingProfileCard from "./_components/loading/loading-profile-card";
import ProfilePageCard from "./profile-page-card";
export default async function MyPageLayout({
  params,
  children,
}: {
  params: { lang: Locale };
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 md:gap-8 ">
      <Suspense fallback={<LoadingProfileCard />}>
        <ProfilePageCard lang={params.lang} />
      </Suspense>

      <Suspense
        fallback={
          <Skeleton className="h-24 grow shrink animate-pulse bg-background-layer-1" />
        }
      >
        <div className="grow shrink">{children}</div>
      </Suspense>
    </div>
  );
}
