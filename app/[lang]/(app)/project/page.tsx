import { Suspense } from "react";

import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";


import ProfilesLoading from "../profiles/profiles-loading";
import ProjectFilter from "./project-filter";
import ProjectList from "./project-list";

export default async function ProjectListPage({
  searchParams,
  params,
}: {
  searchParams: { [key: string]: string | undefined };
  params: { lang: Locale };
}) {

  const dictionary = (await getDictionary(params.lang)) as any;

  return (
    <main className="flex flex-col w-full gap-6 mx-auto">
      <ProjectFilter lang={dictionary}></ProjectFilter>

      <Suspense fallback={<ProfilesLoading />}>
         <ProjectList dictionary={dictionary} searchParams={searchParams}/>
      </Suspense>
    </main>
  );
}
