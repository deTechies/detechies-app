import { Suspense } from "react";

import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { getProjects } from "@/lib/data/project";
import { Project } from "@/lib/interfaces";


import { auth } from "@/lib/helpers/authOptions";
import ProjectFilter from "./project-filter";
import ProjectItem from "./project-item";

export default async function ProjectListPage({
  searchParams,
  params,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
  params: { lang: Locale };
}) {
  const {data:profile} = await auth() as any;
  const {data:projects} = await getProjects()


  const searchItem = searchParams.search as string;

  let filteredData = projects.filter((item: any) => {
    const matchesSearch = searchParams.search
      ? item.name.toLowerCase().includes(searchItem.toLowerCase())
      : true;

    const projectMatch =
      !searchParams.project || item.type === searchParams.project;
    const privateMatch =
      !searchParams.privacy || item.scope === searchParams.privacy;
    const myProjectMatch = !searchParams.me || item.owner === profile.web3?.user.wallet;
    return matchesSearch && projectMatch && privateMatch && myProjectMatch;
  });

  const dictionary = (await getDictionary(params.lang)) as any;

  return (
    <main className="flex flex-col w-full gap-6 p-4 mx-auto my-4">
      <ProjectFilter lang={dictionary}></ProjectFilter>

      <Suspense fallback={<div>Loading...</div>}>
        <section className="grid w-full gap-4 md:grid-cols-2 truncate">
          {filteredData.length > 0 &&
            filteredData.map((item: Project) => (
              <ProjectItem key={item.id} details={item} lang={dictionary} />
            ))}
        </section>

        {filteredData.length < 1 && (
          <div className="text-center text-title_m text-text-secondary">
            {dictionary.project.list.no_projects_found}
          </div>
        )}

        {/* {filteredData.length > 0 && (
          <Button variant="secondary" className="flex w-full mx-auto">
            {dictionary.project.list.view_more}
          </Button>
        )} */}
      </Suspense>
    </main>
  );
}
