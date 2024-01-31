import { Suspense } from "react";

import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";


import ProjectListLoading from "./profile-list-loading";
import ProjectFilter from "./project-filter";
import ProjectList from "./project-list";

export default async function ProjectListPage({
  searchParams,
  params,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
  params: { lang: Locale };
}) {


  const dictionary = (await getDictionary(params.lang)) as any;

  return (
    <main className="flex flex-col w-full gap-6 p-4 mx-auto my-4">
      <ProjectFilter lang={dictionary}></ProjectFilter>

      <Suspense fallback={<ProjectListLoading />}>
        <ProjectList dictionary={dictionary} searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
