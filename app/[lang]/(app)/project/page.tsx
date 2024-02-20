import { Suspense } from "react";

import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";


import { serverApi } from "@/lib/data/general";
import { auth } from "@/lib/helpers/authOptions";
import { Session } from "next-auth";
import ProfilesLoading from "../profiles/profiles-loading";
import ProjectFilter from "./project-filter";
import ProjectList from "./project-list";

export default async function ProjectListPage({
  searchParams,
  params,
}: {
  searchParams: { [key: string]: string | undefined };
  params: { lang: Locale };
}) {
  const profile = await auth() as Session;
  const getProjects = await serverApi('/projects');

  if(!getProjects.data){
    return <div>{JSON.stringify(getProjects)}</div>
  }
  const projects = getProjects.data;

  const searchItem = searchParams.search as string;

  let filteredData = projects.filter((item: any) => {
    const matchesSearch = searchParams.search
      ? item.name.toLowerCase().includes(searchItem.toLowerCase())
      : true;

    const projectMatch =
      !searchParams.project || item.type === searchParams.project;
    const privateMatch =
      !searchParams.privacy || item.scope === searchParams.privacy;
    const myProjectMatch = !searchParams.me || item.joined;
    return matchesSearch && projectMatch && privateMatch && myProjectMatch;
  });

  const dictionary = (await getDictionary(params.lang)) as any;

  return (
    <main className="flex flex-col w-full gap-6 mx-auto">
      <ProjectFilter lang={dictionary}></ProjectFilter>

      <Suspense fallback={<ProfilesLoading />}>
         <ProjectList dictionary={dictionary} searchParams={searchParams}/>
      </Suspense>
    </main>
  );
}
