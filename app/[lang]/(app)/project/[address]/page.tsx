import { Skeleton } from "@/components/ui/skeleton";
import { getSingleProject } from "@/lib/data/project";
import { Project } from "@/lib/interfaces";
import ProjectDetail from "./project-detail";
import ProjectInfo from "./project-info";
import ProjectMembers from "./project-members";
import ProjectNfts from "./project-nfts";

export default async function ProjectDetailPage({
  params,
}: {
  params: { address: string };
}) {
  //get the params for checking the profile details page.
  /*   const { data, loading, error } = useFetchData<any>(
    `/project/single/${address}`
  ); */

  const data: Project = await getSingleProject(params.address);
  //check if we can fetch this without doing it on the client side.

  if (!data)
    return (
      <main className="grid md:grid-cols-3 m-8 gap-6">
        <section className="md:col-span-2 flex flex-col gap-8">
          <Skeleton className="h-96 w-full" />
          <Skeleton className="h-96 w-full" />
        </section>
        <section className="col-span-1 flex flex-col gap-8">
          <Skeleton className="h-[25vh] w-[20vw] animate-pulse" />
          <Skeleton className="h-[25vh] w-full animate-pulse" />
        </section>
      </main>
    );

  return (
    <main className="flex m-8 gap-6">
      <section className="grow flex flex-col gap-8">
        <ProjectDetail details={data} />
        <ProjectMembers
          members={data.members}
          userRole={data.userRole}
          projectId={params.address}
        />
      </section>
      <section className="flex flex-col gap-8 w-[250px]">
        <ProjectInfo info={data} />
        <ProjectNfts address={data.id} isCreator={data.isCreator} />
      </section>
    </main>
  );
}
