"use client";

import GroupProfileCard from "@/components/card/group-profile-card";
import CreatePushGroup from "@/components/extra/chat/create-push-group";
import PushGroupChat from "@/components/extra/chat/push-group-chat";
import useFetchData from "@/lib/useFetchData";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Address } from "wagmi";
import GroupAchievements from "./group-achievements";
import GroupDetails from "./group-details";
import GroupMember from "./group-member";
import GroupRecruits from "./group-recruits";

export default function GroupProfile() {
  //now we can use all the items here to be displayed
  const { address: contract } = useParams();
  const [details, setDetails] = useState<any>({});

  const { data, loading, error } = useFetchData<any | null>(
    `/group/single/${contract}`
  );

  if (loading) return <div>Loading...</div>;
  

  console.log(data)
  return (
    <main className="grid md:grid-cols-3 gap-md m-8 w-full ">
      <div className="col-span-1">
        {data && (
          <GroupProfileCard profile={data} image={data.details?.image} />
        )}
      </div>
      <div className="col-span-2 flex flex-col gap-md">
        <GroupDetails details={data.details} />
        <GroupAchievements />
        {contract && <GroupRecruits address={contract.toString()} />}
        {contract && (
          <GroupMember address={contract.toString()} owners={details.owner} />
        )}
        {
          data.chat?.chatId ? 
          <PushGroupChat contract={contract as Address} chatId={data.chat.chatId} /> :
          <CreatePushGroup image={data.details?.image} members={[]} />
          
        }
      </div>
    </main>
  );
}
