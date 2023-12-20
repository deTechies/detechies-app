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
          <Link href="/project/create" role="link"
            className="px-5 py-2 bg-accent-secondary text-accent-primary rounded-full text-title_m flex items-center justify-center"
          >
            {dictionary.project.list.create_project}
          </Link>
        </div>
      </Card>

      <Suspense fallback={<div>Loading...</div>}>
        <section className="w-full grid md:grid-cols-2 gap-4">
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
