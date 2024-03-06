import Pagination from "@/components/extra/pagination";
import { serverApi } from "@/lib/data/general";
import { Project } from "@/lib/interfaces";
import ProjectItem from "./project-item";

export default async function ProjectList({
  dictionary,
  searchParams,
}: {
  dictionary: any;
  searchParams: { [key: string]: string | undefined };
}) {
  const newUrl = new URLSearchParams();

  // Loop through searchParams and set them in newUrl
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value) {
      const paramName = key === "search" ? "name" : key;
      newUrl.set(paramName, value);
    }
  });

  const { data: projects } = await serverApi(`/projects`, newUrl.toString());


  return (
    <div className="flex flex-col gap-10">
      <section className="grid w-full gap-4 truncate md:grid-cols-2">
        {projects.data.length > 0 &&
          projects.data.map((item: Project) => (
            <ProjectItem key={item.id} details={item} lang={dictionary} />
          ))}
      </section>

      <Pagination
        total={projects.totalCount}
        limit={searchParams.limit ? parseInt(searchParams.limit) : 20}
        page={searchParams.page ? parseInt(searchParams.page) : 1}
      />
    </div>
  );
}
