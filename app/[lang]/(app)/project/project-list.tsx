import { Button } from "@/components/ui/button";
import { serverApi } from "@/lib/data/general";
import { Project } from "@/lib/interfaces";
import ProjectItem from "./project-item";

export default async function ProjectList({
    dictionary,
    }: {
    dictionary: any;
}) {
  const getProjects = await serverApi("/projects");

  if (!getProjects.data) {
    return <div>{JSON.stringify(getProjects)}</div>;
  }

  const projects = getProjects.data;
  return (
    <>
      <section className="grid w-full gap-4 truncate md:grid-cols-2">
        {projects.length > 0 &&
          projects.map((item: Project) => (
            <ProjectItem key={item.id} details={item} lang={dictionary} />
          ))}
      </section>

      {projects.length > 0 && (
        <Button variant="secondary" className="flex w-full mx-auto">
          {dictionary.project.list.view_more}
        </Button>
      )}
    </>
  );
}
