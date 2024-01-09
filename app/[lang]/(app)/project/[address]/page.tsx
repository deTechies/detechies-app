import { Skeleton } from "@/components/ui/skeleton";
import { getSingleProject } from "@/lib/data/project";
import { Project } from "@/lib/interfaces";

import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";

import AcceptInvitation from "./_components/accept-invitation";
import PendingMemberList from "./_components/pending-members-list";

import ProjectDetail from "./_components/project-detail";
import ProjectLinks from "./_components/project-links";
import ProjectMembers from "./_components/project-members";
import ProjectEvaluation from "./_components/project-evaluation-by-groups";

export default async function ProjectDetailPage({
  params,
}: {
  params: { address: string; lang: Locale };
}) {
  //get the params for checking the profile details page.
  /*   const { data, loading, error } = useFetchData<any>(
    `/project/single/${address}`
  ); */

  const data: Project = await getSingleProject(params.address);
  //check if we can fetch this without doing it on the client side.

  // console.log(data);

  if (!data)
    return (
      <main className="grid gap-6 mx-5 my-12 md:grid-cols-3">
        <section className="flex flex-col gap-8 md:col-span-2">
          <Skeleton className="w-full h-96" />
          <Skeleton className="w-full h-96" />
        </section>

        <section className="flex flex-col col-span-1 gap-8">
          <Skeleton className="h-[25vh] w-[20vw] animate-pulse" />
          <Skeleton className="h-[25vh] w-full animate-pulse" />
        </section>
      </main>
    );

  const dictionary = (await getDictionary(params.lang)) as any;
  if (data.userRole == "invited")
    return <AcceptInvitation image={data.image} projectId={data.id} />;

  return (
<<<<<<< HEAD
    <main className="grid w-full gap-6 px-4 my-10 md:grid-cols-3">
      <section className="flex flex-col gap-5 md:col-span-2">
        <ProjectDetail
          details={data}
=======
    <main className="flex flex-col mx-5 my-12 md:flex-row gap-7">
      <section className="flex flex-col gap-5 grow">
        <ProjectDetail 
          details={data} 
          userRole={data.userRole}
>>>>>>> ffa0e7705dbc1fe13b69655d5f4927ddde057fe0
          lang={dictionary.project}
        />
        <ProjectMembers
          details={data}
          projectId={params.address}
          lang={dictionary.project}
        />
      </section>

      <section className="flex flex-col gap-5 truncate">
        <ProjectLinks details={data} />
        <ProjectEvaluation details={data} />
        {data.userRole == "admin" && (
          <PendingMemberList
            projectId={params.address}
            userRole={data.userRole}
          />
        )}
      </section>
    </main>
  );
}
