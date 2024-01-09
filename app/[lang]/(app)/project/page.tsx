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

import { ProjectType, Project, PrivacyType } from "@/lib/interfaces";
import { Suspense } from "react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProjectItem from "./project-item";

export default async function ProjectListPage({
  searchParams,
  params,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
  params: { lang: Locale };
}) {
  const projects = await getProjects();

  const searchItem = searchParams.search as string;

  let filteredData = projects?.filter((item: any) => {
    const matchesSearch = searchParams.search
      ? item.name.toLowerCase().includes(searchItem.toLowerCase())
      : true;

    // const matchesScope = searchParams.scope
    //   ? item.scope === searchParams.scope || item.scope === null
    //   : true;

    // return matchesSearch && matchesScope;
    return matchesSearch;
  });

  const dictionary = (await getDictionary(params.lang)) as any;

  return (
    <main className="flex flex-col w-full gap-6 p-4 mx-auto my-4">
      <Card className="flex justify-between gap-5 px-8 pb-8 pt-7">
        <h1 className="text-subhead_s">{dictionary.project.list.projects}</h1>
        <div className="flex flex-col justify-between sm:flex-row">
          <div className="flex flex-col items-center gap-5 sm:flex-row">
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
          <Link href="/project/create" role="link"
            className="flex items-center justify-center px-5 py-2 rounded-full bg-accent-secondary text-accent-primary text-title_m"
          >
            {dictionary.project.list.create_project}
          </Link>
        </div>
      </Card>

      <Suspense fallback={<div>Loading...</div>}>
        <section className="grid w-full gap-4 md:grid-cols-2">
          {filteredData.length > 0 ? (
            filteredData.map((item: Project) => (
              <ProjectItem key={item.id} details={item} lang={dictionary.project.list}/>
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
