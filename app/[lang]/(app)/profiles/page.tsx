import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";

import PageHeader from "@/components/metronic/header/page-header";
import { Suspense } from "react";
import ListProfiles from "./_components/list-profiles";
import ProfileFilter from "./_components/profile-filter";
import ProfilesLoading from "./_components/profiles-loading";

export default async function ProfilePage({
  params,
  searchParams,
}: {
  params: { lang: Locale };
  searchParams: { [key: string]: string | undefined };
}) {
  const dictionary = (await getDictionary(params.lang)) as any;
  return (
    <main className="flex flex-col gap-10 m-2 md:m-10 ">
      <PageHeader title="Techies" subtitle="Please use the searchbar to find your techie." />
      <ProfileFilter lang={dictionary} />
      <Suspense fallback={<ProfilesLoading />}>
        <div className="">
          <ListProfiles lang={dictionary} searchParams={searchParams} />
        </div>
      </Suspense>
    </main>
  );
}
