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
    <main className="flex flex-col gap-6 m-10">
      <ProjectFilter lang={dictionary}></ProjectFilter>

      <Suspense fallback={<ProfilesLoading />}>
         <ProjectList dictionary={dictionary} searchParams={searchParams}/>
      </Suspense>
    </main>
  );
}
