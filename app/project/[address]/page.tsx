"use client";
import CreatePushGroup from "@/components/extra/chat/create-push-group";
import PushGroupChat from "@/components/extra/chat/push-group-chat";
import Error from "@/components/screens/error";
import { Skeleton } from "@/components/ui/skeleton";
import useFetchData from "@/lib/useFetchData";
import { useParams } from "next/navigation";
import { Address } from "wagmi";
import ProjectDetail from "./project-detail";
import ProjectInfo from "./project-info";
import ProjectMembers from "./project-members";
import ProjectNfts from "./project-nfts";

export interface ProjectDetailProps {
  image: string;
  name: string;
  description: string;
  url: string;
  timestamp: number;
}
export default function ProjectDetailPage() {
  //get the params for checking the profile details page.
  const { address } = useParams();
  const { data, loading, error } = useFetchData<any>(
    `/project/single/${address}`
  );

  console.log(data);
  if (error) return <Error message={error} />;
  if (loading)
    return (
      <main className="max-w-[2400px] grid md:grid-cols-3 m-8 gap-8">
        <section className="md:col-span-2 flex flex-col gap-8">
          <Skeleton className="h-96 w-full" />
          <Skeleton className="h-96 w-full" />
        </section>
        <section className="col-span-1 flex flex-col gap-8">
          <Skeleton className="h-[25vh] w-[20vw] animate-pulse" />
          <Skeleton className="h-[25vh] w-full animate-pulse" />
          <Skeleton className="h-[25vh] w-full animate-pulse" />
          <Skeleton className="h-[25vh] w-full animate-pulse" />
        </section>
      </main>
    );

  //TODO: build the setup of the page to make it look nice.
  return (
    <main className="max-w-[2400px] grid md:grid-cols-3 m-8 gap-8">
      <section className="md:col-span-2 flex flex-col gap-8">
      
        {data && <ProjectDetail details={data} />}
        
        {data.chatId?.chatId  ? (
          <PushGroupChat
            contract={address as Address}
            chatId={data.chatId.chatId}
          />
        ) : (
          <CreatePushGroup image={data.details?.image} members={data.members} />
        )}
      </section>
      <section className="col-span-1 flex flex-col gap-8">
        {data && <ProjectInfo info={data} />}
        <ProjectNfts workers={data.workers} />
        {data.workers && data.workers.includes(data.owner) && (
          <ProjectNfts workers={data.workers} />
        )}
        <ProjectMembers creator={data.creator} members={data.members} />
        

       
      </section>
    </main>
  );
}
