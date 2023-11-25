"use client";
import MemberCard from "@/components/card/member-card";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getAddress } from "viem";

import { Link } from "lucide-react";
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
  address: string;
  tokenboundAccount: string;
}
export default function GroupMember({
  address,
  members,
  isCreator,
  
}: {
  address: any;
  members: Member[];
  isCreator?: boolean;
}) {
  
  const pathName= usePathname();


  return (
    <Card className="overflow-auto max-w-[90vw]">
      <CardHeader className="flex items-center justify-between">
        <h3>Members ({members?.length})</h3>
        {
          isCreator && <Link href={pathName + '/members'}>Manage</Link>
        }
      </CardHeader>

      <CardContent className="w-full grid md:grid-cols-6 gap-4">
        {members &&
          members.map(
            (item: Member, index: any) =>
              item.tokenboundAccount && (
                <MemberCard address={getAddress(item.address)} key={index} />
              )
          )}
      </CardContent>
    </Card>
  );
}
