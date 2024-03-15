import { Locale } from "@/i18n.config";

import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

import Searchbar from "@/components/extra/search-bar";

export default async function ProfileDashboard({
  params,
}: {
  params: { lang: Locale };
}) {
  return (
    <div className="flex flex-col gap-10 m-2 md:m-10 lg:m-20">
      <Suspense
        fallback={
          <Skeleton className="h-24 grow shrink animate-pulse bg-background-layer-1" />
        }
      >
        <Searchbar placeholder="Start search for projects, profile or users" className="rounded-full bg-background-layer-1 "/>

      </Suspense>
    </div>
  );
}
