"use client";
import { defaultAvatar } from "@/lib/constants";
// import useFetchData from "@/lib/useFetchData";
import { User } from "@/lib/interfaces";
import { useRouter } from "next/navigation";
import { Address } from "wagmi";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import IPFSImageLayer from "../ui/layer";

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
  return (
    <Card
      className="gap-1 rounded-sm shadow-md border border-border-div bg-background-layer-1 p-0 min-w-[100px] hover:shadow-lg cursor-pointer"
      onClick={() => router.push(`/profiles/${info.wallet}`)}
    >
      <div className="relative w-full m-0 overflow-hidden rounded-t-sm aspect-square bg-background-layer-2">
        <IPFSImageLayer hashes={info.avatar ? info.avatar : defaultAvatar} />
      </div>

      <div className="flex flex-col p-5">
        <h5 className="mb-3 text-title_l">{info.display_name}</h5>

        <div className="flex gap-1">
          {isOwner && (
            <Badge className="bg-text-secondary text-accent-on-primary text-title_s">
              {lang && lang.group.member.leader}
            </Badge>
          )}

          <Badge variant={"info"} shape="outline">
            {(info.profile_details?.profession &&
              lang.interface.profession_type[
                info.profile_details.profession
              ]) ||
              "미설정"}
          </Badge>
        </div>
      </div>
    </Card>
  );
}
