"use client";

import GroupProfileCard from "@/components/card/group-profile-card";
import CreatePushGroup from "@/components/extra/chat/create-push-group";
import PushGroupChat from "@/components/extra/chat/push-group-chat";
import Loading from "@/components/loading";
import useFetchData from "@/lib/useFetchData";
import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Address, useAccount } from "wagmi";
import GroupAchievements from "./group-achievements";
import GroupDetails from "./group-details";
import GroupMember, { Member } from "./group-member";

export interface GroupDetailProps {
  name: string;
  achievements: any[];
  details: any;
  members: Member[];
  chat: any;
  image: string;
  address: string;
}

export default function GroupProfile() {
  //now we can use all the items here to be displayed
  const { address: contract } = useParams();
  const [details, setDetails] = useState<any>({});
  const { address } = useAccount();
  
  const searchParams = useSearchParams();
  
  const chat = searchParams.get("chat");


  const { data, loading, error } = useFetchData<GroupDetailProps>(
    `/group/single/${contract}`
  );

  if (loading) return <Loading />;
  if (!data) {
    return <div>Group not found</div>;
  }

  const isMember = data.members.some((item: Member) => {
    return item.address === address;
  });
  return (
    <main className="grid md:grid-cols-2 lg:grid-cols-3 gap-md m-8">
      <div className="col-span-1">
          <GroupProfileCard
            profile={data}
            image={data.details?.image}
            isMember={isMember}
          />
      </div>
      <div className="lg:col-span-2 flex flex-col gap-md">
        {
          chat ?
          data.chat?.chatId ? (
            <PushGroupChat
              contract={contract as Address}
              chatId={data.chat.chatId}
            />
          ) : (
            <CreatePushGroup image={data.details?.image} members={[]} />
          ) : (
            <>
            <GroupDetails details={data.details} />
            <GroupAchievements />
            <GroupMember address={contract.toString()} owners={data.members} />
            </>
          )
        }

      
      </div>
    </main>
  );
}
