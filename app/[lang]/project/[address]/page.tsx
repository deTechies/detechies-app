import PushGroupChat from "@/components/extra/chat/push-group-chat";
import { Skeleton } from "@/components/ui/skeleton";
import { getSingleProject } from "@/lib/data/project";
import { Address } from "wagmi";
import ProjectDetail from "./project-detail";
import ProjectInfo from "./project-info";
import ProjectMembers from "./project-members";
import ProjectNfts from "./project-nfts";
import ProjectWorks from "./project-works";

export interface ProjectDetailProps {
  id: string;
  image: string;
  name: string;
  description: string;
  creator: string;
  url: string;
  timestamp: number;
  type: string;
  urls: string[];
  location:string;
  chatId: any;
  introduction: string;
  details: any;
  owner: string;
  workers: string[];
  works: any[];
  members: any[];
}
export default async function ProjectDetailPage({ params }: { params: { address: string } }) {
  //get the params for checking the profile details page.
/*   const { data, loading, error } = useFetchData<any>(
    `/project/single/${address}`
  ); */
  
  const data:ProjectDetailProps = await getSingleProject(params.address)
  //check if we can fetch this without doing it on the client side.
  

  
  if (!data)
    return (
      <main className="max-w-[2400px] grid md:grid-cols-3 m-8 gap-8">
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

  const workers = data.members?.map((member: any) => member.address);

  return (
    <main className="max-w-[2400px] grid md:grid-cols-3 m-8 gap-8">
      <section className="md:col-span-2 flex flex-col gap-8">
        {data && <ProjectDetail details={data} />}

        {data && data.chatId?.chatId && (
          <PushGroupChat
            contract={params.address as Address}
            chatId={data.chatId.chatId}
          />
        )}

      </section>
      <section className="col-span-1 flex flex-col gap-8">
        {data && <ProjectInfo info={data} />}

        {data && data.works && data.works.length > 0 && (
          <ProjectWorks works={data.works} />
        )}
        <ProjectNfts workers={data.workers} />
        {data.workers && data.workers.includes(data.owner) && (
          <ProjectNfts workers={data.workers} />
        )}
        <ProjectMembers creator={data.creator} members={data.members} />
      </section>
    </main>
  );
}
