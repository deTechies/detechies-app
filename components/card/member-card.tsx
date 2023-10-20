"use client"
import { defaultAvatar } from "@/lib/constants";
import useFetchData from "@/lib/useFetchData";
import { useRouter } from "next/navigation";
import { Address } from "wagmi";
import { Card } from "../ui/card";
import IPFSImageLayer from "../ui/layer";
import { Skeleton } from "../ui/skeleton";

export default function MemberCard({address}: {address: Address}) {
    const router = useRouter();
    const {data, loading, error} = useFetchData<any>(`/polybase/${address}`);
    
    if(error) return <div>{JSON.stringify(error)}</div>

    if(loading) return <Skeleton className="h-[200px] w-[100px] animate-pulse" />
    
    if(!data) return <div>no data</div>
  return (
    <Card
      className="gap-1 rounded-sm shadow-md border border-border-div bg-background-layer-1 p-0 min-w-[100px] max-w-[250px] hover:shadow-lg cursor-pointer"
      onClick={() => router.push(`/profiles/${data.message.id}`)}
    >
      <div className="w-full aspect-square relative bg-accent-secondary rounded-t-sm  m-0">
        <IPFSImageLayer hashes={data?.message.nft ? data.message.nft : defaultAvatar} />
      </div>

        <div className="flex flex-col p-2">
          <span
            className="text-accent-primary text-sm col-span-1 flex-grow h-4"
            style={{
              background: "linear-gradient(180deg, #66FB4D, #16ACCD)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            {data.message.industry ? data.message.industry : "Industry"}
          </span>
          <h5 className="font-semibold text-md capitalize">{data.message.username}</h5>
        </div>
       
    </Card>
  )
}
