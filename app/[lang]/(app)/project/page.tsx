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

import { PrivacyType, Project, ProjectType } from "@/lib/interfaces";
import { Suspense } from "react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProjectItem from "./project-item";

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
    <main className="flex flex-col gap-6 w-full my-4 p-4 mx-auto">
      <Card className="flex gap-5 justify-between pt-7 px-8 pb-8">
        <h1 className="text-subhead_s">Projects</h1>
        <div className="flex justify-between sm:flex-row flex-col items-center">
          <div className="flex gap-5 items-center sm:flex-row flex-col">
            <Select>
              <SelectTrigger className="w-[180px] px-3 py-3.5">
                <SelectValue placeholder="All projects" />
              </SelectTrigger>

              <SelectContent>
                {Object.values(ProjectType).map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[180px] px-3 py-3.5">
                <SelectValue placeholder="Public" />
              </SelectTrigger>

              <SelectContent>
                {Object.values(PrivacyType).map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Search placeholder="search" />
            <div className="flex items-center gap-3">
              <Checkbox />
              <Label className="text-title_m">My Projects</Label>
            </div>
          </div>
          <Link href="/project/create" role="link"
            className="px-3 py-2 bg-accent-secondary text-accent-primary rounded-md text-title_m "
          >
            Create Project
          </Link>
        </div>
      </Card>
      <Suspense fallback={<div>Loading...</div>}>
        <section className="w-full grid md:grid-cols-2 gap-4">
          {filteredData.length > 0 ? (
            filteredData.map((item: Project) => (
              <ProjectItem key={item.id} details={item} />
            ))
          ) : (
            <div>No projects found</div>
          )}
        </section>

        {filteredData.length > 0 && (
          <Button size="lg" variant="secondary">
            View More
          </Button>
        )}
      </Suspense>
    </main>
  );
}
