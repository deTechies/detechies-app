import NextPageButton from "@/components/extra/next-page-button";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { Suspense } from "react";
import ListProfiles from "./list-profiles";
import ProfilesLoading from "./loading";
import ProfileFilter from "./profile-filter";

export default async function ProfilePage({
  params,
  searchParams
}: {
  params: { lang: Locale };
  searchParams: { [key: string]: string | undefined };

}) {

  
  const dictionary = (await getDictionary(params.lang)) as any;
  return (
    <main className="flex flex-col w-full gap-6 p-4 ">
      <ProfileFilter lang={dictionary}></ProfileFilter>
      <div className="w-screen flex flex-col gap-2" >
        <Suspense fallback={<ProfilesLoading />}>
        <ListProfiles  lang={dictionary} searchParams={searchParams}/>
        </Suspense>
      </div>
      <NextPageButton lang={dictionary}/>
    </main>
    
  );
}
