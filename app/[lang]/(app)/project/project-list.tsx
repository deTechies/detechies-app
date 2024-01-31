import { getProjects } from "@/lib/data/project";
import { Project } from "@/lib/interfaces";
import { getSession } from "next-auth/react";
import ProjectItem from "./project-item";

export default async function ProjectList({
  searchParams,
  dictionary,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
  dictionary: any;
}) {
  const { data: projects } = await getProjects();
  const profile = await getSession();

  const searchItem = searchParams.search as string;

  let filteredData = projects.filter((item: any) => {
    const matchesSearch = searchParams.search
      ? item.name.toLowerCase().includes(searchItem.toLowerCase())
      : true;

    const projectMatch =
      !searchParams.project || item.type === searchParams.project;
    const privateMatch =
      !searchParams.privacy || item.scope === searchParams.privacy;
    const myProjectMatch =
      !searchParams.me || item.owner === profile?.web3?.address;
    return matchesSearch && projectMatch && privateMatch && myProjectMatch;
  });
  return (
    <>
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
    </>
  );
}
