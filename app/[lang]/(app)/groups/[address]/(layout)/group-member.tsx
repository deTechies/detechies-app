"use client";
import MemberCard from "@/components/card/member-card";
import { Address } from "wagmi";


import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  memberId: Address;
  role: string;
  status: any;
  created_at: string;
  verified: boolean;
  user: any[];
}

export default function GroupMember({
  address,
  members,
  isCreator,
  lang,
}: {
  address: any;
  members: any[];
  isCreator?: boolean;
  lang: any;
}) {
  const pathName = usePathname();


  return (
    <div className="overflow-auto max-w-[90vw]">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-subhead_s">
          {lang.group.details.about.latest_member}
        </h3>
        {/* <h3 className="text-subhead_s">Members ({members?.length})</h3> */}
        <Link href={pathName + "/members"} passHref>
          <Button size="sm" variant="secondary">
            {lang.group.details.about.all}
          </Button>
        </Link>
        {/* {
          isCreator && <Link href={pathName + '/members'}>Manage</Link>
        } */}
      </div>

      <div className="grid items-stretch gap-4 grid-cols:2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {members &&
          members.map(
            (item: Member, index: any) => {
              if (index > 4) {
                return;
              }
              return (
                <MemberCard
                  address={item.memberId}
                  info={item.user}
                  key={index}
                  lang={lang}
                />
              );
            }

            // item.tokenboundAccount && (
            //   <MemberCard address={getAddress(item.address)} key={index} />
            // )
          )}
      </div>
    </div>
  );
}
