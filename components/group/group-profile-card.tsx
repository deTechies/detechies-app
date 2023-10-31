import { ExternalLink } from "lucide-react";


import Image from "next/image";

import { getGroupDetail } from "@/lib/data/groups";
import { truncateMiddle } from "@/lib/utils";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "../ui/card";
import JoinGroup from "./join-group";

interface ProfileProps {
  profile: any;
  image: string;
  isMember: boolean;
}

export default async function GroupProfileCard({ id }: { id: string }) {

  
  const groupDetail = await getGroupDetail(id);





  return (
    <Card className="w-full sticky top-10">
      <CardHeader className="flex justify-between items-center ">
        <div>
          <h3 className="">
            {groupDetail?.name ? groupDetail?.name : "Name not found"}
          </h3>
        </div>
        <Link
          href={`https://mumbai.polygonscan.com/address/${groupDetail.address}`}
          className="flex items-center gap-4 rounded-md font-normal bg-background-layer-2 hover:bg-gray-200 text-sm px-4 py-3"
          target="_blank"
        >
          {groupDetail.address && truncateMiddle(groupDetail.address, 12)}
          <ExternalLink className="text-text-secondary" size={16} />
        </Link>
      </CardHeader>
      <CardContent className="flex flex-col items-center w-full">
        <Image
          src={
            groupDetail.image
              ? `https://ipfs.io/ipfs/${groupDetail.image}`
              : "https://careerzen.org/images/careerzen-logo.png"
          }
          alt={`Layer company image`}
          className="rounded-sm aspect-square  w-full px-4"
          width={200}
          style={{
            objectFit: "scale-down", // cover, contain, none
          }}
          height={200}
        />
        <div className="my-4 w-full">
          <div className="grid grid-cols-2 border rounded-sm">
            <ProfileStat
              name="achievements"
              value={groupDetail.achievements.length}
            />
            <ProfileStat name="members" value={groupDetail?.members?.length} />
          </div>

          <div className="grid gap-2 my-4 items-center">
            {
              groupDetail.isMember ? (
                <Link href={`/group/${groupDetail.address}/chat`}>
                  Group Chat
                </Link>
              ) : (
                <JoinGroup address={groupDetail.address} />
              )
            }
          </div>
          {
            groupDetail.isOwner && (
              <div className="grid gap-2 my-4 items-center">
                  <Link href={`/group/${groupDetail.address}/achievements`}>
                      Manage Achievements
                  </Link>
                  <Link href={`/group/${groupDetail.address}/achievements`}>
                      Manage Members
                  </Link>
              </div>
            )
          }
        </div>
      </CardContent>
    </Card>
  );
}

export function ProfileStat({ name, value }: { name: string; value: number }) {
  return (
    <div className="flex flex-col p-4 px-6 justify-center item-center">
      <h3 className="text-black-normal font-medium text-lg">{value}</h3>
      <span className="text-text-secondary capitalize ">{name}</span>
    </div>
  );
}
