"use client"
// Library imports
import { useSearchParams } from "next/navigation";

// Relative imports
import useFetchData from "@/lib/useFetchData";

// Component imports
import Search from "@/components/extra/search";
import Loading from "@/components/loading";
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

export default function ProjectListPage() {
  const { data, loading, error } = useFetchData<ProjectItemProps[]>("/project/all");
  const searchParams = useSearchParams()!;
  const search = searchParams.get("search");

  if (loading) return <Loading />;
  if (error) return <div>{JSON.stringify(error)}</div>;
  
  const filteredData = search 
    ? data?.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())) 
    : data;

  return (
    <main className="flex flex-col gap-8 w-full max-w-6xl p-8 mx-auto">
      <div className="my-12 flex gap-3 justify-between">
        <Search placeholder="search" />
        <CreateProject />
      </div>

      <section className="grid md:grid-cols-2  gap-4">
        {filteredData && filteredData.length > 0 ? (
          filteredData.map((item: ProjectItemProps) => (
            <ProjectItem key={item.id} details={item} />
          ))
        ) : (
          <div>No projects found</div>
        )}
      </section>
    </main>
  );
}
