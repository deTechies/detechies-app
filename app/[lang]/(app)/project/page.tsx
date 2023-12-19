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

import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";

import { ProjectType, PrivacyType } from "@/lib/interfaces";
import { Suspense, useEffect } from "react";

import CreateProject from "./create-project";
import ProjectItem from "./project-item";
import { Button } from "@/components/ui/button";

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
  params,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
  params: { lang: Locale };
}) {
  const projects = await getProjects();

  const searchItem = searchParams.search as string;
  let filteredData = searchParams.search
    ? projects?.filter((item: any) =>
        item.name.toLowerCase().includes(searchItem.toLowerCase())
      )
    : projects;

  const dictionary = (await getDictionary(params.lang)) as any;

  return (
    <main className="flex flex-col gap-6 w-full my-4 p-4 mx-auto">
      <Card className="flex gap-5 justify-between pt-7 px-8 pb-8">
        <h1 className="text-subhead_s">{dictionary.project.list.projects}</h1>
        <div className="flex justify-between sm:flex-row flex-col">
          <div className="flex gap-5 items-center sm:flex-row flex-col">
            <Select>
              <SelectTrigger className="w-[180px] px-3 py-3.5">
                <SelectValue
                  placeholder={dictionary.project.list.all_project}
                />
              </SelectTrigger>

              <SelectContent>
                {Object.values(ProjectType).map((type) => (
                  <SelectItem key={type} value={type}>
                    {dictionary.project.list.project_type[type]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[180px] px-3 py-3.5">
                <SelectValue
                  placeholder={dictionary.project.list.scope_of_disclosure}
                />
              </SelectTrigger>

              <SelectContent>
                {Object.values(PrivacyType).map((type) => (
                  <SelectItem key={type} value={type}>
                    {dictionary.project.list.privacy_type[type]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Search placeholder={dictionary.project.list.search} />
            <div className="flex items-center gap-3">
              <Checkbox />
              <Label className="text-title_m">
                {dictionary.project.list.my_project}
              </Label>
            </div>
          </div>
          <CreateProject />
        </div>
      </Card>

      <Suspense fallback={<div>Loading...</div>}>
        <section className="w-full grid md:grid-cols-2 gap-4">
          {filteredData.length > 0 ? (
            filteredData.map((item: ProjectItemProps) => (
              <ProjectItem key={item.id} details={item} />
            ))
          ) : (
            <div>{dictionary.project.list.no_projects_found}</div>
          )}
        </section>

        {filteredData.length > 0 && (
          <Button size="lg" variant="secondary">
            {dictionary.project.list.view_more}
          </Button>
        )}
      </Suspense>
    </main>
  );
}
