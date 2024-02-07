import { Suspense } from "react";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";

import NextPageButton from "@/components/extra/next-page-button";
import ListProfiles from "./list-profiles";
import ProfileFilter from "./profile-filter";
import ProfilesLoading from "./profiles-loading";

export default async function ProfilePage({
  params,
  searchParams,
}: {
  params: { lang: Locale };
  searchParams: { [key: string]: string | undefined };
}) {
  const dictionary = (await getDictionary(params.lang)) as any;
  return (
    <main className="flex flex-col w-full gap-6">
      <ProfileFilter lang={dictionary} />

      <Suspense fallback={<ProfilesLoading />}>
        <ListProfiles lang={dictionary} searchParams={searchParams} />
      </Suspense>

    </main>
  );
}
