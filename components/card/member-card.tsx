"use client"
import useFetchData from "@/lib/useFetchData";
import { useRouter } from "next/navigation";
import { Address } from "wagmi";
import IPFSImageLayer from "../ui/layer";
import { Skeleton } from "../ui/skeleton";

export default function MemberCard({address}: {address: Address}) {
    const router = useRouter();
    const {data, loading, error} = useFetchData<any>(`/polybase/profile/tba/${address}`);
    
    if(error) return <div>{JSON.stringify(error)}</div>

    if(loading) return <Skeleton className="h-[200px] w-[100px] animate-pulse" />
  return (
    <section
      className="rounded-sm shadow-custom bg-background-layer-1 p-0 min-w-[100px] max-w-[250px] hover:shadow-lg cursor-pointer"
      onClick={() => router.push(`/profiles/${data.id}`)}
    >
      <div className="w-[64] aspect-square relative bg-accent-secondary  m-0">
        <IPFSImageLayer hashes={data?.nft} />
      </div>
      <div className="p-3">
        <div className="grid grid-cols-2 gap-[1px] ">
          <span
            className="text-accent-primary text-sm col-span-1 flex-grow h-4"
            style={{
              background: "linear-gradient(180deg, #66FB4D, #16ACCD)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            {data.industry ? data.industry : "Industry"}
          </span>
        </div>
        <h5 className="font-semibold text-md capitalize">{data.username}</h5>
      </div>
    </section>
  )
}
