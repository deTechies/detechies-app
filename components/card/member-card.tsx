"use client";
import { defaultAvatar } from "@/lib/constants";
// import useFetchData from "@/lib/useFetchData";
import { useRouter } from "next/navigation";
import { Address } from "wagmi";
import { Card } from "../ui/card";
import IPFSImageLayer from "../ui/layer";
import { Skeleton } from "../ui/skeleton";
import { Badge } from "../ui/badge";
import { User } from "@/lib/interfaces";

export default function MemberCard({
  address,
  info,
  lang,
  isOwner,
}: {
  address: Address;
  info: User;
  lang?: any;
  isOwner?: boolean;
}) {
  const router = useRouter();
  // const { data, loading, error } = useFetchData<any>(`/polybase/${address}`);

  // if (error) return <div>{JSON.stringify(error)}</div>;

  // if (loading)
  //   return <Skeleton className="h-[200px] w-[100px] animate-pulse" />;

  // if (!data) return <div>no data</div>;
  return (
    <Card
      className="gap-1 rounded-sm shadow-md border border-border-div bg-background-layer-1 p-0 min-w-[100px] hover:shadow-lg cursor-pointer"
      onClick={() => router.push(`/profiles/${info.id}`)}
    >
      <div className="relative w-full m-0 rounded-t-sm aspect-square bg-accent-secondary">
        <IPFSImageLayer hashes={info.nft ? info.nft : defaultAvatar} />
      </div>

      <div className="flex flex-col p-5">
        <h5 className="mb-3 text-title_l">{info.display_name}</h5>

        <div className="flex gap-1">
          {isOwner && (
            <Badge className="bg-text-secondary text-accent-on-primary">
              {lang && lang.group.member.leader}
            </Badge>
          )}

          <Badge variant={"info"} shape="outline">
            {/* needs role (PM, designer, developer, ) */}
            {info.role ? info.role : "미설정"}
          </Badge>
        </div>
      </div>
    </Card>
  );
}
