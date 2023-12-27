"use client";
import MemberCard from "@/components/card/member-card";
import { Address } from "wagmi";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getAddress } from "viem";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Profile {
  id: string;
  name: string;
  role: string;
  email: string;
  username: string;
  avatar: string;
  organisation: string;
  image: string;
  industry: string;
}

export interface Member {
  memberId: Address,
  role: string,
  status: any,
  created_at: string,
  verified: boolean,
  user: any[]
}

export default function GroupMember({
  address,
  members,
  isCreator,
}: {
  address: any;
  members: any[];
  isCreator?: boolean;
}) {
  const pathName = usePathname();

  console.log(members);

  return (
    <div className="overflow-auto max-w-[90vw]">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-subhead_s">최근 가입한 멤버</h3>
        {/* <h3 className="text-subhead_s">Members ({members?.length})</h3> */}

        <Link href={pathName + "/members"} passHref>
          <Button size="sm" variant="secondary">
            전체보기
          </Button>
        </Link>
        {/* {
          isCreator && <Link href={pathName + '/members'}>Manage</Link>
        } */}
      </div>


      <div className="grid w-full gap-4 md:grid-cols-5">
        {
        members &&
          members.map(
            (item: Member, index: any) => {
              if(index > 4) {
                return ;
              }
              return <MemberCard address={item.memberId} info={item.user} key={index} />
            }
              
              // item.tokenboundAccount && (
              //   <MemberCard address={getAddress(item.address)} key={index} />
              // )
          )}
      </div>
    </div>
  );
}
