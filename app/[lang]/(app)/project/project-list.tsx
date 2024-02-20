import ShowMoreButton from "@/components/extra/show-more-button";
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
  const limit_number = searchParams.limit ? parseInt(searchParams.limit) : 10;

  return (
    <>
      <section className="grid w-full gap-4 truncate md:grid-cols-2">
        {projects.length > 0 &&
          projects.map((item: Project) => (
            <ProjectItem key={item.id} details={item} lang={dictionary} />
          ))}
      </section>

      {projects?.length > 0 && projects.length >= limit_number && (
        <ShowMoreButton lang={dictionary} />
      )}
    </>
  );
}
