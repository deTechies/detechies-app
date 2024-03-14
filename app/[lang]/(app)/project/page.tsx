import { Suspense } from "react";

import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";

import ProfilesLoading from "../profiles/_components/profiles-loading";
import ProjectFilter from "./_components/project-filter";
import ProjectList from "./_components/project-list";

export default async function ProjectListPage({
  searchParams,
  params,
}: {
  searchParams: { [key: string]: string | undefined };
  params: { lang: Locale };
}) {
  const dictionary = (await getDictionary(params.lang)) as any;

  return (
    <main className="flex flex-col gap-10">
      <ProjectFilter lang={dictionary}></ProjectFilter>
      <div className="mx-2 md:mx-10">
        <Suspense fallback={<ProfilesLoading />}>
          <ProjectList dictionary={dictionary} searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}
