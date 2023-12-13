import Search from "@/components/extra/search";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getProjects } from "@/lib/data/project";
import { ProjectType } from "@/lib/interfaces";
import { Suspense } from "react";
import CreateProject from "./create-project";
import ProjectItem from "./project-item";

export interface ProjectItemProps {
  id: string;
  name: string;
  image: string;
  description: string;
  status: string;
  location: string;
  introduction: string;
  category: string;
  type: string;
  works: any[];
  creator: string;
  members: string[];
}

export default async function ProjectListPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const projects = await getProjects();
  const searchItem = searchParams.search as string;
  let filteredData = searchParams.search
    ? projects?.filter((item: any) =>
        item.name.toLowerCase().includes(searchItem.toLowerCase())
      )
    : projects;

  return (
    <main className="flex flex-col gap-4 w-full my-10 min-mx-5 p-4 mx-auto">
      <Card className="flex gap-3 justify-between">
        <h1 className="text-subhead_s">Projects</h1>
        <div className="flex justify-between sm:flex-row flex-col">
          <div className="flex gap-4 items-center sm:flex-row flex-col">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(ProjectType).map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Search placeholder="search" />
            <div className="flex items-center gap-4">
              <Checkbox />
              <Label>My Projects</Label>
            </div>
          </div>
          <CreateProject />
        </div>
      </Card>
      <Suspense fallback={<div>Loading...</div>}>
        <section className="w-full grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 my-8">
          {filteredData.length > 0 ? (
            filteredData.map((item: ProjectItemProps) => (
              <ProjectItem key={item.id} details={item} />
            ))
          ) : (
            <div>No projects found</div>
          )}
        </section>
      </Suspense>
    </main>
  );
}
