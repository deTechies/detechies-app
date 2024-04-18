import { Skeleton } from "@/components/ui/skeleton";

import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";

import AcceptInvitation from "./_components/accept-invitation";
import PendingMemberList from "./_components/pending-members-list";

import { serverApi } from "@/lib/data/general";
import ContributorsCard from "./_components/dashboard/contributors-card";
import ProjectDescription from "./_components/dashboard/project-description";
import ProjectLinks from "./_components/dashboard/project-links";
import ProjectPackages from "./_components/dashboard/project-packages";
import GroupProject from "./_components/group-project";
import PrivateProject from "./_components/private-project";
import ProjectLanguages from "./_components/project-languages";

export default async function ProjectDetailPage({
  params,
}: {
  params: { address: string; lang: Locale };
}) {
  //get the params for checking the profile details page.
  /*   const { data, loading, error } = useFetchData<any>(
    `/project/single/${address}`
  ); */

  const { data } = await serverApi(`/projects/${params.address}`);

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

  if (
    data.scope === "group" &&
    (data.userRole === "none" || data.userRole === "joined")
  ) {
    return <GroupProject lang={dictionary} groups={data.club} />;
  }

  if (
    data.scope === "private" &&
    (data.userRole === "none" || data.userRole === "joined")
  ) {
    return (
      <PrivateProject
        lang={dictionary}
        projectId={params.address}
        isJoined={data.userRole === "joined"}
      />
    );
  }

  if (data.userRole == "invited")
    return (
      <AcceptInvitation
        name={data.name}
        image={data.image}
        projectId={data.id}
        lang={dictionary}
      />
    );

  return (
    <main className="grid w-full gap-6 grid-cols-1 md:grid-cols-3">
      <div className="flex flex-col gap-10">
        <ProjectLinks details={data} />

        <ContributorsCard projectId={params.address} />
        <ProjectPackages projectId={params.address} />
        {/* <ProjectEvaluation details={data} lang={dictionary} /> */}
        {data?.userRole === "admin" && (
          <PendingMemberList projectId={params.address} lang={dictionary} />
        )}
      </div>

      <div className="md:col-span-2 flex flex-col gap-10">
        <ProjectDescription description={data.description} />

        <ProjectLanguages projectId={params.address} />
      </div>
    </main>
  );
}
