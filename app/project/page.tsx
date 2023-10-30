
// Library imports

// Relative imports

// Component imports
import Search from "@/components/extra/search";
import { getProjects } from "@/lib/data/project";
import CreateProject from "./create-project";
import ProjectItem from "./project-item";

interface ProjectItemProps {
  id: string;
  name: string;
  image: string;
  description: string;
  status: string;
  location: string;
  introduction:string;
  creator: string;
  members: string[];
}

export default async function ProjectListPage() {


  
  const projects = await getProjects();
  
/*   const filteredData = search 
    ? data?.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())) 
    : data; */

  return (
    <main className="flex flex-col gap-8 w-full max-w-6xl p-8 mx-auto">
      <div className="my-12 flex gap-3 justify-between">
        <Search placeholder="search" />
        <CreateProject />
      </div>

      <section className="grid md:grid-cols-2  gap-4">
        {projects.length > 0 ? (
          projects.map((item: ProjectItemProps) => (
            <ProjectItem key={item.id} details={item} />
          ))
        ) : (
          <div>No projects found</div>
        )}
      </section>
    </main>
  );
}
