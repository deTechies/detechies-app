import { Suspense } from "react";

import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { getProjects } from "@/lib/data/project";
import { Project } from "@/lib/interfaces";

import ProjectFilter from "./project-filter";
import ProjectItem from "./project-item";

export default async function ProjectListPage({
  searchParams,
  params,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
  params: { lang: Locale };
}) {
  const { data: projects } = await getProjects();

  const searchItem = searchParams.search as string;

  let filteredData = projects.filter((item: Project) => {
    const matchesSearch = searchParams.search
      ? item.name.toLowerCase().includes(searchItem.toLowerCase())
      : true;

    const projectMatch =
      !searchParams.project || item.type === searchParams.project;
    const privateMatch =
      !searchParams.privacy || item.scope === searchParams.privacy;
    const myProjectMatch = !searchParams.me || item.joined;
    return matchesSearch && projectMatch && privateMatch && myProjectMatch;
  });

  const sortedData = filteredData.sort(
    (a: Project, b: Project) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  const dictionary = (await getDictionary(params.lang)) as any;

  return (
    <main className="flex flex-col w-full gap-6 mx-auto">
      <ProjectFilter lang={dictionary}></ProjectFilter>

      <Suspense fallback={<div>Loading...</div>}>
        <section className="grid w-full gap-4 truncate md:grid-cols-2">
          {sortedData.length > 0 &&
            sortedData.map((item: Project) => (
              <ProjectItem key={item.id} details={item} lang={dictionary} />
            ))}
        </section>

        {sortedData.length < 1 && (
          <div className="text-center text-title_m text-text-secondary">
            {dictionary.project.list.no_projects_found}
          </div>
        )}

        {/* {sortedData.length > 0 && (
          <Button variant="secondary" className="flex w-full mx-auto">
            {dictionary.project.list.view_more}
          </Button>
        )} */}
      </Suspense>
    </main>
  );
}
